/* Server-side prices.
   These now come straight from products.js (the same file the website uses),
   so prices, deals and promo sets are only ever edited in ONE place. */

function load() {
  const file = require.resolve('../products.js');
  delete require.cache[file]; // re-run it each time so expired deals and sets drop off
  return require(file);
}
module.exports.load = load;

// cat is optional: pass the result of load() when looking up many items at once
module.exports.getItem = function (id, cat) {
  const { products, bundles } = cat || load();

  const p = products.find(x => x.id === id);
  if (p) return { name: p.name, cents: Math.round(p.price * 100), onOffer: p.originalPrice != null };

  const b = bundles.find(x => x.id === id);
  if (b) return { name: b.name, cents: Math.round(b.price * 100), contents: b.contentsText, onOffer: true };

  return null;
};
