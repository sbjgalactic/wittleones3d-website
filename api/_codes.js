/* DISCOUNT CODES - server side only (api/_codes.js).
   Kept out of products.js on purpose: products.js is downloaded by every visitor,
   so anything in it could be read by anyone. This file never leaves the server.

   FIELDS
     code           what the customer types (not case sensitive)
     percent        e.g. 10 for 10% off
     amountOff      e.g. 5 for $5 off (can be combined with percent)
     freeShipping   true = shipping becomes free
     label          shown to the customer once applied
     minSubtotal    minimum cart subtotal in dollars before the code works
     excludeOffers  true = ignores deal items and promo sets (only discounts regular-price items)
     starts / ends  ISO dates, e.g. '2026-12-31T23:59:59+10:00'
*/
const DISCOUNT_CODES = [
  { code: 'REALLYLONGSUPERDISCOUNTCODEWOWCOOL', percent: 50, label: '50% only for cool ppl', minSubtotal: 5, excludeOffers: true, ends: '2026-12-31T23:59:59+10:00' },
  { code: 'CONAGHANDISCOUNTCODE', percent: 20, label: '20% off your order!', minSubtotal: 5, excludeOffers: false},
  // { code: 'FIVEOFF',   amountOff: 5, label: '$5 off', minSubtotal: 30 },
  //{ code: 'FREESHIP',  freeShipping: true, label: 'Free shipping' },
];

const MIN_CHARGE_CENTS = 50; // Stripe can't charge less than this

function isLive(c, now) {
  const start = c.starts ? Date.parse(c.starts) : -Infinity;
  const end = c.ends ? Date.parse(c.ends) : Infinity;
  return now >= start && now <= end;
}

module.exports.findCode = function (input, now = Date.now()) {
  const wanted = String(input || '').trim().toUpperCase();
  if (!wanted) return null;
  return DISCOUNT_CODES.find(c => c.code.toUpperCase() === wanted && isLive(c, now)) || null;
};

// lines = [{ cents, qty, onOffer }]
module.exports.calcDiscount = function (c, lines) {
  const subtotal = lines.reduce((s, l) => s + l.cents * l.qty, 0);
  const eligible = lines
    .filter(l => !(c.excludeOffers && l.onOffer))
    .reduce((s, l) => s + l.cents * l.qty, 0);

  if (c.minSubtotal && subtotal < Math.round(c.minSubtotal * 100)) {
    return { error: 'Spend $' + c.minSubtotal.toFixed(2) + ' or more to use this code.' };
  }

  let off = 0;
  if (c.percent) off += Math.round(eligible * c.percent / 100);
  if (c.amountOff) off += Math.min(Math.round(c.amountOff * 100), eligible);
  off = Math.min(off, Math.max(0, subtotal - MIN_CHARGE_CENTS));

  if (!off && !c.freeShipping) {
    return { error: 'This code doesn\u2019t apply to anything in your cart.' };
  }
  return { cents: off, freeShipping: !!c.freeShipping };
};