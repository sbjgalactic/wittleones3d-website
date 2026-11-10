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
const PLACEHOLDER_IMG = './images/placeholder.webp';
const CART_KEY = 'wittleones-cart';
const MIN_QTY = 1;
const MAX_QTY = 99;

const productsById = {};
products.forEach(p => { productsById[p.id] = p; });
if (typeof bundles !== 'undefined') bundles.forEach(b => { productsById[b.id] = b; });

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
    // "Keychain: No" is the default, so it's only worth showing when it's a yes
    return Object.keys(options || {})
        .filter(k => !(k === 'Keychain' && options[k] === 'No'))
        .map(k => k + ': ' + options[k]).join(' \u00B7 ');
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

// the choices a product starts with on its page (typed options start empty, Keychain starts on "No")
function defaultOptions(product) {
    const sel = {};
    (product.options || []).forEach(opt => {
        if (opt.type === 'text') return;
        const choices = (opt.choices || []).map(c => typeof c === 'object' ? c : { label: c });
        if (!opt.name || !choices.length) return;
        const no = opt.name === 'Keychain' ? choices.find(c => c.label === 'No') : null;
        sel[opt.name] = (no || choices[0]).label;
    });
    return sel;
}

/* ---------- customer pins ----------
   Shoppers can pin products they like; pinned ones jump to the top of their
   category in the catalogue. Saved in this browser only. */
const PINS_KEY = 'wittleones-pins';
function loadPins() {
    try {
        const ids = JSON.parse(localStorage.getItem(PINS_KEY)) || [];
        return Array.isArray(ids) ? ids.filter(id => productsById[id]) : [];
    } catch (e) {
        return [];
    }
}
function isPinned(id) {
    return loadPins().includes(id);
}
// returns true if the product is now pinned
function togglePin(id) {
    const pins = loadPins();
    const i = pins.indexOf(id);
    if (i >= 0) pins.splice(i, 1); else pins.unshift(id); // newest pin first
    try { localStorage.setItem(PINS_KEY, JSON.stringify(pins)); } catch (e) {}
    return i < 0;
}

// dark or light text, whichever is readable on the given background colour
function readableTextOn(hex) {
    let h = String(hex).replace('#', '');
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    if (!/^[0-9a-f]{6}$/i.test(h)) return '#F5F5F5';
    const [r, g, b] = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
    return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? '#4a2a3d' : '#F5F5F5';
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
function clearCart() {
    saveCart([]);
    refreshCartUI(false);
}

/* ---------- quantity stepper (used on product cards and in the cart) ----------
   Click the number to type an amount (e.g. 99) instead of pressing + lots of times. */
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

    const display = document.createElement('input');
    display.type = 'text';
    display.inputMode = 'numeric';
    display.maxLength = 3;
    display.autocomplete = 'off';
    display.className = 'qty-value';
    display.setAttribute('aria-label', 'Quantity of ' + label + ' (type a number)');

    const plus = document.createElement('button');
    plus.type = 'button';
    plus.className = 'qty-btn';
    plus.textContent = '+';
    plus.setAttribute('aria-label', 'Increase quantity');

    function set(n) {
        value = Math.min(MAX_QTY, Math.max(MIN_QTY, n));
        display.value = value;
        minus.disabled = value === MIN_QTY;
        plus.disabled = value === MAX_QTY;
    }
    // reads whatever has been typed, clamps it to 1-99, and tells the page if it changed
    function commit() {
        const typed = parseInt(display.value, 10);
        const before = value;
        set(isNaN(typed) ? value : typed);
        if (value !== before) onChange(value);
    }

    minus.addEventListener('click', () => { commit(); set(value - 1); onChange(value); });
    plus.addEventListener('click', () => { commit(); set(value + 1); onChange(value); });
    display.addEventListener('focus', () => setTimeout(() => display.select(), 0));
    display.addEventListener('input', () => { display.value = display.value.replace(/\D/g, ''); });
    display.addEventListener('blur', commit);
    display.addEventListener('keydown', e => {
        if (e.key === 'Enter') { e.preventDefault(); commit(); display.blur(); }
    });
    set(value);

    el.append(minus, display, plus);
    return { el, get: () => { commit(); return value; }, set };
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
        '<button type="button" class="clear-cart-btn" id="clear-cart-btn">Clear cart</button>' +
    '</div>';

document.body.append(cartOverlay, drawer);

const itemsList = drawer.querySelector('#cart-items');
const emptyMsg = drawer.querySelector('#cart-empty');
const subtotalEl = drawer.querySelector('#cart-subtotal');
const checkoutBtn = drawer.querySelector('#checkout-btn');
const closeBtn = drawer.querySelector('#cart-close');
const clearBtn = drawer.querySelector('#clear-cart-btn');

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

    if (product.contentsText) {
        const inc = document.createElement('p');
        inc.className = 'cart-item-options';
        inc.textContent = product.contentsText;
        details.appendChild(inc);
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
    clearBtn.hidden = count === 0;
    checkoutBtn.disabled = count === 0;
    updateDeliveryUI();
    refreshDiscount(); // re-checks the discount code against the new cart
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

/* ---------- clear cart (two-step so it can't be hit by accident) ---------- */
let clearTimer;
function resetClearBtn() {
    delete clearBtn.dataset.confirm;
    clearBtn.textContent = 'Clear cart';
}
clearBtn.addEventListener('click', () => {
    if (clearBtn.dataset.confirm === 'true') {
        clearTimeout(clearTimer);
        resetClearBtn();
        clearCart();
        return;
    }
    clearBtn.dataset.confirm = 'true';
    clearBtn.textContent = 'Tap again to confirm';
    clearTimer = setTimeout(resetClearBtn, 3000);
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
        const items = cart.map(i => ({
            ...i,
            expectedCents: Math.round(productsById[i.id].price * 100),
        }));
        const res = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                items,
                delivery,
                code: appliedCode,
                returnTo: location.pathname + location.search,
            }),
        });
        const data = await res.json();
        if (res.status === 409 || res.status === 422) { const e = new Error(data.error); e.show = true; throw e; }
        if (!res.ok || !data.url) throw new Error(data.error || 'Checkout failed');
        window.location.href = data.url;
    } catch (err) {
        console.error(err);
        checkoutError.textContent = err.show ? err.message : 'Sorry, we couldn\u2019t start checkout. Please try again.';
        checkoutError.hidden = false;
        resetCheckoutBtn();
    }
});

/* ---------- discount code ----------
   The codes live on the server (api/_codes.js) so visitors can't read them.
   The page just asks the server whether a code works for this cart. */
const CODE_KEY = 'wittleones-code';
let appliedCode = '';
try { appliedCode = localStorage.getItem(CODE_KEY) || ''; } catch (e) {}
let codeInfo = null;   // last answer from the server: { code, label, cents, freeShipping }
let codeError = '';    // why the applied code isn't currently working (e.g. minimum spend)
let discountTimer;
let discountToken = 0;

function saveCode() {
    try {
        if (appliedCode) localStorage.setItem(CODE_KEY, appliedCode);
        else localStorage.removeItem(CODE_KEY);
    } catch (e) {}
}

async function checkCode(code) {
    const res = await fetch('/api/check-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, items: loadCart() }),
    });
    return res.json();
}

const codeBox = document.createElement('div');
codeBox.className = 'code-box';
codeBox.innerHTML =
    '<div class="code-row">' +
        '<input type="text" class="code-input" id="code-input" placeholder="Discount code" ' +
            'autocomplete="off" autocapitalize="characters" spellcheck="false" aria-label="Discount code">' +
        '<button type="button" class="code-btn" id="code-btn">Apply</button>' +
    '</div>' +
    '<p class="code-msg" id="code-msg" role="status" hidden></p>';
const codeInput = codeBox.querySelector('#code-input');
const codeBtn = codeBox.querySelector('#code-btn');
const codeMsg = codeBox.querySelector('#code-msg');

function setCodeMsg(text, ok) {
    codeMsg.textContent = text || '';
    codeMsg.hidden = !text;
    codeMsg.classList.toggle('ok', !!ok);
}

function updateCodeUI() {
    codeInput.disabled = !!appliedCode;
    codeBtn.textContent = appliedCode ? 'Remove' : 'Apply';
    if (!appliedCode) return;
    codeInput.value = appliedCode;
    if (cartCount() === 0) setCodeMsg('');
    else if (codeInfo) setCodeMsg('\u2713 ' + codeInfo.code + ' applied' + (codeInfo.label ? ': ' + codeInfo.label : ''), true);
    else if (codeError) setCodeMsg(codeError, false);
    else setCodeMsg('');
}

// re-checks the applied code whenever the cart changes (a short delay so typing a quantity isn't spammy)
function refreshDiscount() {
    clearTimeout(discountTimer);
    const token = ++discountToken;
    if (!appliedCode || cartCount() === 0) { codeInfo = null; codeError = ''; return; }
    discountTimer = setTimeout(async () => {
        try {
            const data = await checkCode(appliedCode);
            if (token !== discountToken) return; // a newer check is already on its way
            if (data.ok) { codeInfo = data; codeError = ''; }
            else { codeInfo = null; codeError = data.error || ''; }
        } catch (e) {
            return; // couldn't reach the server: keep showing what we had
        }
        updateDeliveryUI();
    }, 250);
}

codeBtn.addEventListener('click', async () => {
    if (appliedCode) { // "Remove"
        appliedCode = '';
        codeInfo = null;
        codeError = '';
        saveCode();
        codeInput.value = '';
        setCodeMsg('');
        updateDeliveryUI();
        codeInput.focus();
        return;
    }
    const typed = codeInput.value.trim();
    if (!typed) { setCodeMsg('Type a code first.'); return; }

    codeBtn.disabled = true;
    setCodeMsg('Checking\u2026');
    try {
        const data = await checkCode(typed);
        if (data.ok) {
            appliedCode = data.code;
            codeInfo = data;
            codeError = '';
            saveCode();
        } else {
            setCodeMsg(data.error || 'That code isn\u2019t valid.');
        }
    } catch (e) {
        setCodeMsg('Couldn\u2019t check that code. Please try again.');
    }
    codeBtn.disabled = false;
    updateDeliveryUI();
});
codeInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); codeBtn.click(); }
});
codeInput.addEventListener('input', () => setCodeMsg(''));

/* ---------- delivery: ship or pickup ---------- */
const SHIPPING_CENTS = 1500;   // display only; the real charge is set in api/create-checkout-session.js
const FREE_SHIPPING_OVER = 0;  // cents, 0 = never free
let delivery = 'ship';
try { delivery = localStorage.getItem('wittleones-delivery') === 'pickup' ? 'pickup' : 'ship'; } catch (e) {}

const deliveryBox = document.createElement('div');
deliveryBox.className = 'delivery-options';
deliveryBox.innerHTML =
    '<label class="delivery-opt"><input type="radio" name="delivery" value="ship">' +
        '<span>Ship to me</span><span class="delivery-cost" id="ship-cost"></span></label>' +
    '<label class="delivery-opt"><input type="radio" name="delivery" value="pickup">' +
        '<span>Pickup</span><span class="delivery-cost">Free</span></label>' +
    '<div class="delivery-discount" id="cart-discount" hidden>' +
        '<span id="cart-discount-label">Discount</span><span id="cart-discount-amt"></span></div>' +
    '<div class="delivery-total"><span>Total</span><span id="cart-total">$0.00</span></div>';
const cartFoot = drawer.querySelector('.cart-foot');
cartFoot.insertBefore(codeBox, cartFoot.querySelector('.checkout-btn'));
cartFoot.insertBefore(deliveryBox, cartFoot.querySelector('.checkout-btn'));

function shippingCents() {
    const sub = Math.round(cartSubtotal() * 100);
    return (FREE_SHIPPING_OVER > 0 && sub >= FREE_SHIPPING_OVER) ? 0 : SHIPPING_CENTS;
}
function updateDeliveryUI() {
    const d = (appliedCode && codeInfo && cartCount() > 0) ? codeInfo : null;
    let ship = shippingCents();
    if (d && d.freeShipping) ship = 0;

    deliveryBox.querySelector('#ship-cost').textContent = ship ? '+' + formatPrice(ship / 100) : 'Free';
    const extra = (delivery === 'ship' && cartCount() > 0) ? ship / 100 : 0;
    const off = d ? d.cents / 100 : 0;

    const row = deliveryBox.querySelector('#cart-discount');
    row.hidden = !(d && (off > 0 || (d.freeShipping && delivery === 'ship')));
    deliveryBox.querySelector('#cart-discount-label').textContent = 'Discount' + (d ? ' (' + d.code + ')' : '');
    deliveryBox.querySelector('#cart-discount-amt').textContent = off > 0 ? '\u2212' + formatPrice(off) : 'Free shipping';

    deliveryBox.querySelector('#cart-total').textContent = formatPrice(Math.max(0, cartSubtotal() - off + extra));
    deliveryBox.querySelectorAll('input').forEach(r => { r.checked = r.value === delivery; });
    updateCodeUI();
}
deliveryBox.querySelectorAll('input').forEach(r => {
    r.addEventListener('change', () => {
        delivery = r.value;
        try { localStorage.setItem('wittleones-delivery', delivery); } catch (e) {}
        updateDeliveryUI();
    });
});

// pressing Back from Stripe restores this page from cache with the button stuck
window.addEventListener('pageshow', e => {
    if (e.persisted) { resetCheckoutBtn(); refreshCartUI(false); }
});

refreshCartUI(false);

// coming back from Stripe lands on page#cart, so show the cart straight away
if (location.hash === '#cart') {
    history.replaceState(null, '', location.pathname + location.search);
    openCart();
}