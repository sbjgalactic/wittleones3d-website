const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// GET /api/order-summary?session_id=cs_...
// Used by success.html to show the customer what they just bought.
// The session id is a long random value only the buyer is sent back with,
// and only PAID orders are returned.
module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).end();
  res.setHeader('Cache-Control', 'no-store');

  const id = String((req.query && req.query.session_id) || '');
  if (!/^cs_(test|live)_[A-Za-z0-9]{10,200}$/.test(id)) {
    return res.status(400).json({ error: 'Missing order reference' });
  }

  try {
    const s = await stripe.checkout.sessions.retrieve(id, {
      expand: ['line_items.data.price.product'],
    });
    if (s.payment_status !== 'paid' && s.payment_status !== 'no_payment_required') {
      return res.status(404).json({ error: 'Order not found' });
    }

    const meta = s.metadata || {};
    const cust = s.customer_details || {};
    // newer Stripe API versions moved shipping under collected_information
    const ship = (s.collected_information && s.collected_information.shipping_details) || s.shipping_details || null;
    const addr = ship && ship.address;

    const items = ((s.line_items && s.line_items.data) || []).map(li => {
      const prod = li.price && typeof li.price.product === 'object' ? li.price.product : null;
      return {
        id: (prod && prod.metadata && prod.metadata.id) || '',
        name: li.description || (prod && prod.name) || 'Item',
        details: (prod && prod.description) || '',
        qty: li.quantity || 1,
        unitCents: li.price ? li.price.unit_amount : null,
        totalCents: li.amount_subtotal,
      };
    });

    const td = s.total_details || {};
    res.json({
      orderRef: meta.order_ref || ('WO-' + id.slice(-8).toUpperCase()),
      created: s.created, // unix seconds
      delivery: meta.delivery === 'pickup' ? 'pickup' : 'ship',
      email: cust.email || '',
      name: (ship && ship.name) || cust.name || '',
      phone: cust.phone || '',
      address: addr ? {
        line1: addr.line1 || '',
        line2: addr.line2 || '',
        city: addr.city || '',
        state: addr.state || '',
        postcode: addr.postal_code || '',
        country: addr.country || '',
      } : null,
      items,
      currency: (s.currency || 'aud').toUpperCase(),
      subtotalCents: s.amount_subtotal,
      discountCents: td.amount_discount || 0,
      discountCode: meta.discount_code || '',
      shippingCents: td.amount_shipping || 0,
      taxCents: td.amount_tax || 0,
      totalCents: s.amount_total,
    });
  } catch (e) {
    console.error('Order summary error:', e.message);
    res.status(404).json({ error: 'Order not found' });
  }
};
