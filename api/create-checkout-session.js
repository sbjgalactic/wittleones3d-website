const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const { PRICES } = require('./_prices');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    if (!items.length) return res.status(400).json({ error: 'Cart is empty' });

    const line_items = items.map(i => {
      const p = PRICES[i.id];
      if (!p) throw new Error('Unknown product ' + i.id);
      const qty = Math.min(99, Math.max(1, parseInt(i.qty, 10) || 1));
      const opts = Object.entries(i.options || {}).map(([k, v]) => `${k}: ${v}`).join(', ');
      return {
        quantity: qty,
        price_data: {
          currency: 'aud',
          unit_amount: p.cents,
          product_data: { name: p.name, ...(opts && { description: opts.slice(0, 500) }) },
        },
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      shipping_address_collection: { allowed_countries: ['AU'] },
      success_url: `${process.env.SITE_URL}/success.html`,
      cancel_url: `${process.env.SITE_URL}/catalogue.html`,
    });
    res.json({ url: session.url });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: 'Could not start checkout' });
  }
};