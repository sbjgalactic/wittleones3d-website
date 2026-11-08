/* ============================================================
   CART - shared by every page.
   Needs products.js loaded first. Add these to the end of each page:
     <script src="./products.js"></script>
     <script src="./cart.js"></script>
   and <link rel="stylesheet" href="./cart.css"> in the <head>.

   It builds the cart drawer itself, adds the count badge to the header
   cart icon, and makes the cart icon (and any footer "Cart" link) open it.

   Cart lines are { id, qty, options? }. options is an object like
   { Colour: 'Pink', Size: 'Large' }. The same product with different
   options is a separate line in the cart.
   ============================================================ */
const PLACEHOLDER_IMG = './images/placeholder.png';
const CART_KEY = 'wittleones-cart';
const MIN_QTY = 1;
const MAX_QTY = 99;

const productsById = {};
products.forEach(p => { productsById[p.id] = p; });

function formatPrice(n) {
    return '$' + n.toFixed(2);
}

/* ---------- cart lines: same product + same options = same line ---------- */
function optionsKey(options) {
    const o = options || {};
    return Object.keys(o).sort().map(k => k + '=' + o[k]).join('|');
}
function lineKey(item) {
    const k = optionsKey(item.options);
    return k ? item.id + '|' + k : item.id;
}
function optionsText(options) {
    return Object.keys(options || {}).map(k => k + ': ' + options[k]).join(' \u00B7 ');
}

/* ---------- cart data (saved in the browser so it follows you between pages) ---------- */
function loadCart() {
    try {
        const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
        return cart.filter(item => productsById[item.id]); // drop items no longer in the catalogue
    } catch (e) {
        return [];
    }
}
function saveCart(cart) {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) { /* storage blocked: cart just won't persist */ }
}
function cartCount() {
    return loadCart().reduce((sum, item) => sum + item.qty, 0);
}
function cartSubtotal() {
    return loadCart().reduce((sum, item) => sum + productsById[item.id].price * item.qty, 0);
}

function addToCart(id, qty, options) {
    const hasOptions = options && Object.keys(options).length > 0;
    const newItem = hasOptions ? { id, qty, options } : { id, qty };
    const cart = loadCart();
    const existing = cart.find(item => lineKey(item) === lineKey(newItem));
    if (existing) existing.qty = Math.min(MAX_QTY, existing.qty + qty);
    else cart.push(newItem);
    saveCart(cart);
    refreshCartUI(true);
}
function setCartQty(key, qty) {
    const cart = loadCart();
    const item = cart.find(i => lineKey(i) === key);
    if (!item) return;
    item.qty = qty;
    saveCart(cart);
    refreshCartTotals(false);
}
function removeFromCart(key) {
    saveCart(loadCart().filter(item => lineKey(item) !== key));
    refreshCartUI(false);
}

/* ---------- quantity stepper (used on product cards and in the cart) ---------- */
function makeStepper(label, value, onChange) {
    const el = document.createElement('div');
    el.className = 'qty-stepper';
    el.setAttribute('role', 'group');
    el.setAttribute('aria-label', 'Quantity of ' + label);

    const minus = document.createElement('button');
    minus.type = 'button';
    minus.className = 'qty-btn';
    minus.textContent = '\u2212';
    minus.setAttribute('aria-label', 'Decrease quantity');

    const display = document.createElement('span');
    display.className = 'qty-value';
    display.setAttribute('aria-live', 'polite');

    const plus = document.createElement('button');
    plus.type = 'button';
    plus.className = 'qty-btn';
    plus.textContent = '+';
    plus.setAttribute('aria-label', 'Increase quantity');

    function set(n) {
        value = Math.min(MAX_QTY, Math.max(MIN_QTY, n));
        display.textContent = value;
        minus.disabled = value === MIN_QTY;
        plus.disabled = value === MAX_QTY;
    }
    minus.addEventListener('click', () => { set(value - 1); onChange(value); });
    plus.addEventListener('click', () => { set(value + 1); onChange(value); });
    set(value);

    el.append(minus, display, plus);
    return { el, get: () => value, set };
}

/* ---------- build the drawer ---------- */
const cartOverlay = document.createElement('div');
cartOverlay.className = 'cart-overlay';
cartOverlay.id = 'cart-overlay';

const drawer = document.createElement('aside');
drawer.className = 'cart-drawer';
drawer.id = 'cart-drawer';
drawer.setAttribute('aria-label', 'Shopping cart');
drawer.setAttribute('aria-hidden', 'true');
drawer.innerHTML =
    '<div class="cart-head">' +
        '<h2>Your cart</h2>' +
        '<button type="button" class="cart-close" id="cart-close" aria-label="Close cart">&times;</button>' +
    '</div>' +
    '<ul class="cart-items" id="cart-items"></ul>' +
    '<p class="cart-empty" id="cart-empty">Your cart is empty. Add a Wittle One to get started!</p>' +
    '<div class="cart-foot">' +
        '<div class="cart-subtotal"><span>Subtotal</span><span id="cart-subtotal">$0.00</span></div>' +
        '<button type="button" class="checkout-btn" id="checkout-btn">Proceed to checkout</button>' +
    '</div>';

document.body.append(cartOverlay, drawer);

const itemsList = drawer.querySelector('#cart-items');
const emptyMsg = drawer.querySelector('#cart-empty');
const subtotalEl = drawer.querySelector('#cart-subtotal');
const checkoutBtn = drawer.querySelector('#checkout-btn');
const closeBtn = drawer.querySelector('#cart-close');

/* ---------- cart triggers + badge ---------- */
// every header cart icon, plus any footer link that says "Cart"
const cartTriggers = new Set();
document.querySelectorAll('.cart-icon').forEach(icon => {
    const link = icon.closest('a');
    if (link) cartTriggers.add(link);
});
document.querySelectorAll('footer a').forEach(link => {
    if (link.textContent.trim().toLowerCase() === 'cart') cartTriggers.add(link);
});
document.querySelectorAll('.js-cart-open').forEach(el => cartTriggers.add(el));

// the count badge sits on the first header cart link (created if the page doesn't have one)
let badge = document.getElementById('cart-count');
if (!badge) {
    const headerLink = [...cartTriggers].find(el => el.querySelector('.cart-icon'));
    if (headerLink) {
        badge = document.createElement('span');
        badge.className = 'cart-count';
        badge.id = 'cart-count';
        badge.setAttribute('aria-live', 'polite');
        headerLink.appendChild(badge);
    }
}
cartTriggers.forEach(el => {
    if (el.querySelector('.cart-icon')) el.setAttribute('aria-label', 'Open cart');
});

/* ---------- rendering ---------- */
const TRASH_ICON =
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/>' +
    '<path d="M10 11v5"/><path d="M14 11v5"/></svg>';

function buildCartItem(item) {
    const product = productsById[item.id];
    const key = lineKey(item);

    const li = document.createElement('li');
    li.className = 'cart-item';

    const img = document.createElement('img');
    img.src = product.image || PLACEHOLDER_IMG;
    img.alt = '';

    const details = document.createElement('div');
    details.className = 'cart-item-details';

    const name = document.createElement('p');
    name.className = 'cart-item-name';
    name.textContent = product.name;
    details.appendChild(name);

    // chosen options, e.g. "Colour: Pink · Size: Large"
    const optText = optionsText(item.options);
    if (optText) {
        const opts = document.createElement('p');
        opts.className = 'cart-item-options';
        opts.textContent = optText;
        details.appendChild(opts);
    }

    const price = document.createElement('p');
    price.className = 'cart-item-price';
    price.textContent = formatPrice(product.price);

    const stepper = makeStepper(product.name, item.qty, qty => setCartQty(key, qty));

    details.append(price, stepper.el);

    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'cart-delete';
    del.setAttribute('aria-label', 'Remove ' + product.name + ' from cart');
    del.innerHTML = TRASH_ICON;
    del.addEventListener('click', () => removeFromCart(key));

    li.append(img, details, del);
    return li;
}

function renderCartItems() {
    itemsList.replaceChildren();
    loadCart().forEach(item => itemsList.appendChild(buildCartItem(item)));
}

function refreshCartTotals(bump) {
    const count = cartCount();
    if (badge) {
        badge.textContent = count;
        badge.classList.toggle('has-items', count > 0);
        if (bump) {
            badge.classList.remove('bump');
            void badge.offsetWidth; // restart the animation
            badge.classList.add('bump');
        }
    }
    subtotalEl.textContent = formatPrice(cartSubtotal());
    emptyMsg.hidden = count > 0;
    checkoutBtn.disabled = count === 0;
}

function refreshCartUI(bump) {
    renderCartItems();
    refreshCartTotals(bump);
}

/* ---------- open / close ---------- */
let lastFocused = null;

function openCart() {
    lastFocused = document.activeElement;
    refreshCartUI(false);
    drawer.classList.add('open');
    cartOverlay.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cart-open');
    closeBtn.focus();
}
function closeCart() {
    drawer.classList.remove('open');
    cartOverlay.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cart-open');
    if (lastFocused) lastFocused.focus();
}

cartTriggers.forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault();
        openCart();
    });
});
closeBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeCart();
});

// keep other open tabs/pages in sync when the cart changes
window.addEventListener('storage', e => {
    if (e.key === CART_KEY) {
        if (drawer.classList.contains('open')) refreshCartUI(false);
        else refreshCartTotals(false);
    }
});

/* ---------- checkout (Stripe) ---------- */
const checkoutError = document.createElement('p');
checkoutError.className = 'checkout-error';
checkoutError.setAttribute('role', 'alert');
checkoutError.hidden = true;
drawer.querySelector('.cart-foot').appendChild(checkoutError);

function resetCheckoutBtn() {
    checkoutBtn.textContent = 'Proceed to checkout';
    refreshCartTotals(false); // re-enables the button only if the cart has items
}

checkoutBtn.addEventListener('click', async () => {
    const cart = loadCart();
    if (!cart.length) return;

    checkoutError.hidden = true;
    checkoutBtn.disabled = true;
    checkoutBtn.textContent = 'Redirecting to payment…';

    try {
        const res = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: cart }),
        });
        const data = await res.json();
        if (!res.ok || !data.url) throw new Error(data.error || 'Checkout failed');
        window.location.href = data.url;
    } catch (err) {
        console.error(err);
        checkoutError.textContent = 'Sorry, we couldn\u2019t start checkout. Please try again.';
        checkoutError.hidden = false;
        resetCheckoutBtn();
    }
});

// pressing Back from Stripe restores this page from cache with the button stuck
window.addEventListener('pageshow', e => { if (e.persisted) resetCheckoutBtn(); });

refreshCartUI(false);