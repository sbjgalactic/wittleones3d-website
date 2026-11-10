const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const { getItem, load } = require('./_prices');
const { findCode, calcDiscount } = require('./_codes');
const readBody = require('./_body');

const SHIPPING_CENTS = 1500;
const FREE_SHIPPING_OVER_CENTS = 0;
const PICKUP_NOTE = 'Pickup details: we will message you to arrange a time and place.';

// typed text comes from customers, so strip control characters and angle brackets and cap the length
const clean = (s, max) => String(s == null ? '' : s).replace(/[\u0000-\u001f\u007f<>]/g, '').trim().slice(0, max);

// only allow paths on our own site, e.g. /catalogue.html or /product.html?id=critter-3
function safeReturnPath(p) {
  return (typeof p === 'string' && p.length < 300 && /^\/(?![\/\\])/.test(p)) ? p : '/catalogue.html';
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const body = readBody(req);
    const items = Array.isArray(body.items) ? body.items : [];
    if (!items.length) return res.status(400).json({ error: 'Cart is empty' });
    const delivery = body.delivery === 'pickup' ? 'pickup' : 'ship';

    const cat = load();
    let subtotal = 0;
    const lines = []; // for working out the discount code
    const line_items = items.map(i => {
      const p = getItem(i.id, cat);
      if (!p) throw new Error('Unknown product ' + i.id);
      const cents = p.cents;
      if (!Number.isInteger(cents)) throw new Error('Bad price for ' + i.id + ': ' + cents);

      // the price the customer saw must match what we're about to charge
      if (i.expectedCents !== undefined && i.expectedCents !== cents) {
        const err = new Error('Price changed for ' + i.id);
        err.code = 'PRICE_CHANGED';
        throw err;
      }

      const qty = Math.min(99, Math.max(1, parseInt(i.qty, 10) || 1));
      subtotal += cents * qty;
      lines.push({ cents, qty, onOffer: p.onOffer });

      const optsObj = (i.options && typeof i.options === 'object') ? i.options : {};
      const opts = Object.entries(optsObj)
        .slice(0, 20)
        .map(([k, v]) => [clean(k, 60), clean(v, 100)])
        .filter(([k, v]) => k && v)
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ');
      const desc = [p.contents, opts].filter(Boolean).join(' | ').slice(0, 500);
      return {
        quantity: qty,
        price_data: {
          currency: 'aud',
          unit_amount: cents,
          product_data: { name: p.name, ...(desc && { description: desc }) },
        },
      };
    });

    // send people back to the SAME address they came from. If the site is opened as
    // localhost, 127.0.0.1 or www, each has its own separate cart storage, so returning
    // to a different one would show an empty cart.
    const base = String(req.headers.origin || process.env.SITE_URL || '').replace(/\/$/, '');

    const params = {
      mode: 'payment',
      line_items,
      phone_number_collection: { enabled: true },
      metadata: { delivery },
      payment_intent_data: { metadata: { delivery } },
      success_url: `${base}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}${safeReturnPath(body.returnTo)}#cart`, // #cart reopens the cart drawer
    };

    // discount code: checked again here, never trusted from the browser
    let discount = null;
    if (body.code) {
      const c = findCode(body.code);
      if (!c) {
        const err = new Error('Bad code');
        err.code = 'BAD_CODE';
        err.show = 'That discount code isn’t valid any more. Remove it from your cart and try again.';
        throw err;
      }
      const r = calcDiscount(c, lines);
      if (r.error) {
        const err = new Error('Code not usable');
        err.code = 'BAD_CODE';
        err.show = r.error;
        throw err;
      }
      discount = { code: c.code, cents: r.cents, freeShipping: r.freeShipping };
      params.metadata.discount_code = c.code;
      params.payment_intent_data.metadata.discount_code = c.code;
    }

    if (discount && discount.cents > 0) {
      // a one-off Stripe coupon for exactly this amount, usable once
      const coupon = await stripe.coupons.create({
        amount_off: discount.cents,
        currency: 'aud',
        duration: 'once',
        max_redemptions: 1,
        name: discount.code,
      });
      params.discounts = [{ coupon: coupon.id }];
    }

    if (delivery === 'ship') {
      const free = (discount && discount.freeShipping) ||
        (FREE_SHIPPING_OVER_CENTS > 0 && subtotal >= FREE_SHIPPING_OVER_CENTS);
      const amount = free ? 0 : SHIPPING_CENTS;
      params.shipping_address_collection = { allowed_countries: ['AU'] };
      params.shipping_options = [{
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount, currency: 'aud' },
          display_name: amount ? 'Shipping' : 'Free shipping',
        },
      }];
    } else {
      params.custom_text = { submit: { message: PICKUP_NOTE } };
    }

    const session = await stripe.checkout.sessions.create(params);
    res.json({ url: session.url });
  } catch (e) {
    if (e.code === 'BAD_CODE') {
      return res.status(422).json({ error: e.show });
    }
    if (e.code === 'PRICE_CHANGED') {
      return res.status(409).json({ error: 'Prices have just changed. Please refresh the page and check your cart.' });
    }
    console.error('Checkout error:', e.message, e.param || '');
    res.status(400).json({ error: 'Could not start checkout' });
  }
};