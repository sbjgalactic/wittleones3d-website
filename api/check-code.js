const { getItem, load } = require('./_prices');
const { findCode, calcDiscount } = require('./_codes');
const readBody = require('./_body');

// POST { code, items } -> { ok, code, label, cents, freeShipping } or { ok: false, error }
module.exports = function checkCode(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const body = readBody(req);
    const items = Array.isArray(body.items) ? body.items : [];
    const cat = load();
    const lines = [];
    items.forEach(i => {
      const p = getItem(i.id, cat);
      if (!p) return;
      const qty = Math.min(99, Math.max(1, parseInt(i.qty, 10) || 1));
      lines.push({ cents: p.cents, qty, onOffer: p.onOffer });
    });

    const c = findCode(body.code);
    if (!c) return res.json({ ok: false, error: 'That code isn\u2019t valid or has expired.' });

    const r = calcDiscount(c, lines);
    if (r.error) return res.json({ ok: false, error: r.error });

    res.json({ ok: true, code: c.code, label: c.label || '', cents: r.cents, freeShipping: r.freeShipping });
  } catch (e) {
    console.error('Code check error:', e.stack || e.message);
    res.status(400).json({ ok: false, error: 'Could not check that code.' });
  }
};