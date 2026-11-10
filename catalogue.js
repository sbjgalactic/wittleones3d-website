/* Catalogue grid. Needs products.js and cart.js loaded first. */
function productUrl(product) {
    return './product.html?id=' + encodeURIComponent(product.id);
}

function thumbUrl(src) {
    if (!src || /\.gif$/i.test(src)) return src;
    return src.replace(/\.webp$/i, '-thumb.webp');
}

/* ---------- photo rotation settings ----------
   'auto'  = cards with several photos slowly cycle while they are on screen
   'hover' = cycle only while the mouse is over the card (phones still use auto)
   'off'   = no rotation */
const PHOTO_ROTATE = 'auto';
const ROTATE_MS = 3200;        // time each photo is shown in auto mode
const HOVER_ROTATE_MS = 1100;  // time each photo is shown in hover mode
const canHoverDevice = window.matchMedia('(hover: hover)').matches;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// starts and stops auto rotation as cards scroll in and out of view
const rotateObserver = ('IntersectionObserver' in window)
    ? new IntersectionObserver(entries => {
        entries.forEach(en => {
            const r = en.target._rotator;
            if (!r) return;
            if (en.isIntersecting) r.start(); else r.stop();
        });
    }, { rootMargin: '50px' })
    : null;

function setupRotation(card, media, link, baseImg, sources) {
    if (PHOTO_ROTATE === 'hover' && canHoverDevice || reduceMotion || sources.length < 2) return;

    const layers = [baseImg]; // layer 0 is the picture already in the card; the rest load on demand
    let idx = 0, timer = null, settle = null;

    function ensure(i) {
        if (layers[i]) return layers[i];
        const full = sources[i];
        const img = document.createElement('img');
        img.className = 'rotate-img';
        img.alt = '';
        img.width = 600;
        img.height = 600;
        img.decoding = 'async';
        img.style.zIndex = i; // later photos sit on top of earlier ones
        img.addEventListener('error', () => { img.src = full; }, { once: true });
        img.src = thumbUrl(full);
        link.appendChild(img);
        layers[i] = img;
        return img;
    }

    function show(next) {
        idx = next;
        if (next === 0) { // back to the first photo: fade every overlay out
            layers.forEach((l, i) => { if (i) l.classList.remove('is-active'); });
            return;
        }
        const layer = ensure(next);
        const reveal = () => requestAnimationFrame(() => layer.classList.add('is-active'));
        if (layer.complete && layer.naturalWidth) reveal();
        else layer.addEventListener('load', reveal, { once: true });

        // once the new photo is fully in, drop the ones underneath
        clearTimeout(settle);
        settle = setTimeout(() => {
            layers.forEach((l, i) => { if (i && i !== idx) l.classList.remove('is-active'); });
        }, 800);
    }

    function start(ms, firstDelay) {
        if (timer) return;
        const tick = () => { show((idx + 1) % sources.length); timer = setTimeout(tick, ms); };
        timer = setTimeout(tick, firstDelay);
    }
    function stop() { clearTimeout(timer); timer = null; }

    if (PHOTO_ROTATE === 'hover' && canHoverDevice) {
        const begin = () => start(HOVER_ROTATE_MS, 250);
        const end = () => { stop(); show(0); };
        card.addEventListener('mouseenter', begin);
        card.addEventListener('mouseleave', end);
        card.addEventListener('focusin', begin);
        card.addEventListener('focusout', end);
    } else if (rotateObserver) {
        // random first delay so neighbouring cards don't flip at the same moment
        media._rotator = { start: () => start(ROTATE_MS, 800 + Math.random() * ROTATE_MS), stop };
        rotateObserver.observe(media);
    }
}

let eagerLeft = 4; // the first few cards load straight away, the rest wait until near the screen

const PIN_ICON =
    '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">' +
    '<path d="M15 3l6 6-2.5 1-3.5 3.5.5 4.5-1.5 1.5-4-4L5 20.5 3.5 19l4.5-5-4-4L5.5 8.5 10 9l3.5-3.5z" ' +
    'fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>';

function paintPin(card, product, on) {
    card.classList.toggle('is-pinned', on);
    card._pinBtn.setAttribute('aria-pressed', String(on));
    card._pinBtn.setAttribute('aria-label', (on ? 'Unpin ' : 'Pin ') + product.name + (on ? '' : ' to the top of ' + product.category));
    card._pinBtn.title = on ? 'Pinned (click to unpin)' : 'Pin to the top';
}

/* little message at the bottom of the screen */
let toastEl, toastTimer;
function showToast(text) {
    if (!toastEl) {
        toastEl = document.createElement('div');
        toastEl.className = 'cat-toast';
        toastEl.setAttribute('role', 'status');
        document.body.appendChild(toastEl);
    }
    toastEl.textContent = text;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
}

function onPinClick(product, card) {
    const on = togglePin(product.id);
    paintPin(card, product, on);
    refreshPins();
    showToast(on
        ? '📌 ' + product.name + ' pinned to the top of ' + product.category
        : product.name + ' unpinned');
}

function buildCard(product) {
    const url = productUrl(product);

    const card = document.createElement('article');
    card.className = 'product-card';

    const media = document.createElement('div');
    media.className = 'product-media';

    const imgLink = document.createElement('a');
    imgLink.className = 'product-media-link';
    imgLink.href = url;
    imgLink.tabIndex = -1;
    imgLink.setAttribute('aria-hidden', 'true');

    const img = document.createElement('img');
    const fullSrc = product.image || PLACEHOLDER_IMG;
    img.width = 600;
    img.height = 600;
    img.alt = '';
    img.decoding = 'async';
    img.loading = eagerLeft > 0 ? 'eager' : 'lazy';
    if (eagerLeft > 0) eagerLeft--;
    if (product.image) {
        img.addEventListener('error', () => { img.src = fullSrc; }, { once: true });
        img.src = thumbUrl(fullSrc);
    } else {
        img.src = fullSrc;
    }
    imgLink.appendChild(img);

    const stepper = makeStepper(product.name, MIN_QTY, () => {});
    const hasOptions = Array.isArray(product.options) && product.options.length > 0;

    const quickAdd = document.createElement('button');
    quickAdd.type = 'button';
    quickAdd.className = 'quick-add';
    quickAdd.setAttribute('aria-label', (hasOptions ? 'Choose options for ' : 'Add ') + product.name + (hasOptions ? '' : ' to cart'));

    const cartIcon = document.createElement('img');
    cartIcon.src = './images/carticon.webp';
    cartIcon.alt = '';
    cartIcon.width = 24;
    cartIcon.height = 24;
    cartIcon.className = 'quick-add-icon';
    quickAdd.appendChild(cartIcon);

    let resetTimer;
    quickAdd.addEventListener('click', () => {
        if (hasOptions) { window.location.href = url; return; }
        const qty = stepper.get();
        addToCart(product.id, qty);
        stepper.set(MIN_QTY);
        quickAdd.replaceChildren(document.createTextNode('\u2713'));
        quickAdd.classList.add('added');
        quickAdd.setAttribute('aria-label', 'Added ' + qty + ' ' + product.name + ' to cart');
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
            quickAdd.replaceChildren(cartIcon);
            quickAdd.classList.remove('added');
            quickAdd.setAttribute('aria-label', 'Add ' + product.name + ' to cart');
        }, 1200);
    });

    media.append(imgLink, quickAdd);

    // front tag, e.g. badge: 'Hot 🔥!' in products.js
    if (product.badge) {
        const tag = document.createElement('span');
        tag.className = 'card-badge';
        tag.textContent = product.badge;
        if (product.badgeColor) {
            tag.style.setProperty('--badge-bg', product.badgeColor);
            tag.style.setProperty('--badge-fg', readableTextOn(product.badgeColor));
        }
        media.appendChild(tag);
    }

    // shopper's pin: moves the card to the top of its category
    const pinBtn = document.createElement('button');
    pinBtn.type = 'button';
    pinBtn.className = 'pin-btn';
    pinBtn.innerHTML = PIN_ICON;
    pinBtn.addEventListener('click', () => onPinClick(product, card));
    media.appendChild(pinBtn);
    card._pinBtn = pinBtn;
    paintPin(card, product, isPinned(product.id));

    // only rotates when image: is a list of several pictures in products.js
    // (images: is just for the gallery on the product page)
    if (product.cardImages && product.cardImages.length > 1) {
        setupRotation(card, media, imgLink, img, product.cardImages);
    }

    const info = document.createElement('div');
    info.className = 'product-info';

    const name = document.createElement('h3');
    name.className = 'product-name';
    const nameLink = document.createElement('a');
    nameLink.href = url;
    nameLink.textContent = product.name;
    name.appendChild(nameLink);

    const price = document.createElement('p');
    price.className = 'product-price';
    if (product.originalPrice != null) {
        const was = document.createElement('s');
        was.className = 'price-was';
        was.textContent = formatPrice(product.originalPrice);
        price.append(formatPrice(product.price) + ' ', was);
    } else {
        price.textContent = formatPrice(product.price);
    }

    const learnMore = document.createElement('a');
    learnMore.className = 'learn-more';
    learnMore.href = url;
    learnMore.textContent = 'Learn more';
    learnMore.setAttribute('aria-label', 'Learn more about ' + product.name);

    info.append(name, price);
    if (!hasOptions) info.appendChild(stepper.el);
    info.appendChild(learnMore);
    card.append(media, info);
    return card;
}

// group once instead of filtering the whole list for every grid
const byCategory = {};
products.forEach(p => { (byCategory[p.category] = byCategory[p.category] || []).push(p); });

// a tag is either 'Bees' or { label: 'Bees', ... }
function tagLabels(p) {
    return (p.tags || []).map(t => (typeof t === 'object' ? t.label : t)).filter(Boolean);
}

// everything the text search looks at: name, description, category, tags and option choices (e.g. "pink")
function searchText(p) {
    const choices = (p.options || []).flatMap(o => (o.choices || []).map(c => (typeof c === 'object' ? c.label : c)));
    return [p.name, p.description, p.category, ...tagLabels(p), ...choices].join(' ').toLowerCase();
}

const cards = []; // every card on the page: { el, section, grid, tags, text, price, name, order }
const grids = [];

document.querySelectorAll('.product-grid').forEach(grid => {
    const section = grid.closest('.cat-section');
    const frag = document.createDocumentFragment();
    const list = [];
    // pinned: true products go first, everything else keeps its products.js order
    const inCategory = byCategory[grid.dataset.category] || [];
    const ordered = [...inCategory.filter(p => p.pinned), ...inCategory.filter(p => !p.pinned)];
    ordered.forEach((p, order) => {
        const el = buildCard(p);
        const c = { el, section, id: p.id, tags: tagLabels(p), text: searchText(p), price: p.price, name: p.name, pinned: !!p.pinned, order };
        cards.push(c);
        list.push(c);
        frag.appendChild(el);
    });
    grid.appendChild(frag); // one DOM insert per grid
    grids.push({ grid, list });
});

/* ---------- sort order (inside each category) ----------
   Every sort keeps pinned stuff on top: the shopper's own pins first, then
   pinned: true products from products.js, then everything else. Each group is
   sorted by the chosen sort (Default = newest pin on top, then A to Z). */
let pinRank = new Map();
function readPins() {
    pinRank = new Map(loadPins().map((id, i) => [id, i]));
}
readPins();
const pinScore = c => (pinRank.has(c.id) ? pinRank.get(c.id) : Infinity);
const byName = (a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base', numeric: true });
const SORTS = {
    default:      (a, b) => (pinScore(a) - pinScore(b)) || byName(a, b),
    'name-desc':  (a, b) => byName(b, a),
    'price-asc':  (a, b) => a.price - b.price || a.order - b.order,
    'price-desc': (a, b) => b.price - a.price || a.order - b.order,
};
// pinned stuff always stays on top, whatever the sort:
// 0 = the shopper's pins, 1 = pinned: true in products.js, 2 = everything else
const pinGroup = c => (pinRank.has(c.id) ? 0 : c.pinned ? 1 : 2);
let sortMode = 'default';
function applySort() {
    const sort = SORTS[sortMode] || SORTS.default;
    const cmp = (a, b) => (pinGroup(a) - pinGroup(b)) || sort(a, b);
    grids.forEach(({ grid, list }) => {
        const frag = document.createDocumentFragment();
        list.slice().sort(cmp).forEach(c => frag.appendChild(c.el));
        grid.appendChild(frag); // moves the existing cards, nothing is rebuilt
    });
}

// hero stat pill
const heroCount = document.getElementById('hero-count');
if (heroCount) heroCount.textContent = products.length + ' designs';

const dealsSection = document.getElementById('deals'); // filled in by deals.js

/* ---------- sticky bar: height, cart button, filter ---------- */
const nav = document.querySelector('.cat-nav');
const sections = document.querySelectorAll('.cat-section');
const filterBtn = document.getElementById('filter-toggle');
const filterPanel = document.getElementById('filter-panel');
const chipBox = document.getElementById('filter-chips');
const filterCount = document.getElementById('filter-count');
const filterSummary = document.getElementById('filter-summary');
const noResults = document.getElementById('no-results');
const textInput = document.getElementById('filter-text');
const minInput = document.getElementById('filter-min');
const maxInput = document.getElementById('filter-max');
const modeAnd = document.getElementById('mode-and');
const modeOr = document.getElementById('mode-or');

// filter state
const selectedTags = new Set();
let filterText = '';
let minPrice = null;
let maxPrice = null;
let matchMode = 'and'; // 'and' = must pass every active filter, 'or' = at least one

// tells the CSS how tall the sticky bar really is, so anchor links land exactly under it
function setNavHeight() {
    document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
}

// cart button: clicks the cart icon in the header, so it does whatever that does
const navCart = document.getElementById('nav-cart');
if (navCart) navCart.addEventListener('click', () => {
    const icon = document.querySelector('.right-header .cart-icon');
    const headerCart = icon && icon.closest('a');
    if (headerCart) headerCart.click();
});

function placePanel() {
    filterPanel.style.top = nav.getBoundingClientRect().bottom + 'px';
}
function setPanel(open) {
    filterPanel.hidden = !open;
    filterBtn.setAttribute('aria-expanded', String(open));
    if (open) placePanel();
}
window.addEventListener('scroll', () => { if (!filterPanel.hidden) placePanel(); }, { passive: true });
window.addEventListener('resize', () => { if (!filterPanel.hidden) placePanel(); });
filterBtn.addEventListener('click', () => setPanel(filterPanel.hidden));
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !filterPanel.hidden) { setPanel(false); filterBtn.focus(); }
});
document.addEventListener('click', e => {
    if (!filterPanel.hidden && !nav.contains(e.target)) setPanel(false);
});
nav.querySelectorAll('.cat-nav-links a').forEach(a => a.addEventListener('click', () => setPanel(false)));

// one chip per tag in use, coloured with the dot from tagColors
const allTags = [...new Set(cards.flatMap(c => c.tags))].sort((a, b) => a.localeCompare(b));
allTags.forEach(tag => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'filter-chip';
    chip.dataset.tag = tag;
    chip.setAttribute('aria-pressed', 'false');
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.setAttribute('aria-hidden', 'true');
    if (typeof tagColors !== 'undefined' && tagColors[tag]) dot.style.backgroundColor = tagColors[tag];
    chip.append(dot, document.createTextNode(tag));
    chip.addEventListener('click', () => {
        if (selectedTags.has(tag)) selectedTags.delete(tag); else selectedTags.add(tag);
        applyFilters();
    });
    chipBox.appendChild(chip);
});

/* ---------- reading the text and price boxes ---------- */
function readInputs() {
    filterText = textInput.value.trim().toLowerCase();
    const mn = parseFloat(minInput.value);
    const mx = parseFloat(maxInput.value);
    minPrice = isNaN(mn) ? null : mn;
    maxPrice = isNaN(mx) ? null : mx;
    if (minPrice !== null && maxPrice !== null && minPrice > maxPrice) [minPrice, maxPrice] = [maxPrice, minPrice];
}
[textInput, minInput, maxInput].forEach(input => input.addEventListener('input', () => {
    readInputs();
    applyFilters();
}));

modeAnd.addEventListener('click', () => { matchMode = 'and'; applyFilters(); });
modeOr.addEventListener('click', () => { matchMode = 'or'; applyFilters(); });

// "My pins" toggle: only show what this shopper has pinned
let pinsOnly = false;
const pinsBtn = document.getElementById('filter-pins');
const pinsCount = document.getElementById('pins-count');
pinsBtn.addEventListener('click', () => { pinsOnly = !pinsOnly; applyFilters(); });

// after a pin changes: re-read, re-sort, update the filter
function refreshPins() {
    readPins();
    pinsCount.textContent = pinRank.size;
    if (pinsOnly && !pinRank.size) pinsOnly = false;
    applySort();
    applyFilters();
}

const sortSelect = document.getElementById('filter-sort');
sortSelect.addEventListener('change', () => {
    sortMode = SORTS[sortSelect.value] ? sortSelect.value : 'default';
    applySort();
    saveFilters();
});

document.getElementById('filter-clear').addEventListener('click', () => {
    selectedTags.clear();
    textInput.value = '';
    minInput.value = '';
    maxInput.value = '';
    pinsOnly = false;
    sortMode = 'default';
    sortSelect.value = 'default';
    applySort();
    readInputs();
    applyFilters();
});

/* ---------- remember filters for the trip to a product page and back ---------- */
const FILTER_KEY = 'wittleones-catalogue-filters';

function saveFilters() {
    try {
        sessionStorage.setItem(FILTER_KEY, JSON.stringify({
            tags: [...selectedTags],
            q: textInput.value,
            min: minInput.value,
            max: maxInput.value,
            mode: matchMode,
            sort: sortMode,
            pins: pinsOnly,
        }));
    } catch (e) {}
}

function restoreFilters() {
    try {
        if (!document.referrer) return;
        const ref = new URL(document.referrer);
        if (ref.origin !== location.origin || !/\/product(\.html)?$/.test(ref.pathname)) return;

        let saved = JSON.parse(sessionStorage.getItem(FILTER_KEY)) || {};
        if (Array.isArray(saved)) saved = { tags: saved }; // older saved format
        (saved.tags || []).filter(t => allTags.includes(t)).forEach(t => selectedTags.add(t));
        textInput.value = saved.q || '';
        minInput.value = saved.min == null ? '' : saved.min;
        maxInput.value = saved.max == null ? '' : saved.max;
        matchMode = saved.mode === 'or' ? 'or' : 'and';
        sortMode = SORTS[saved.sort] ? saved.sort : 'default';
        sortSelect.value = sortMode;
        pinsOnly = !!saved.pins && pinRank.size > 0;
        readInputs();
    } catch (e) {}
}

/* ---------- the filter itself ----------
   Each thing you set up is one "filter": every selected tag, the search text,
   and the price range. AND mode: a product must pass all of them.
   OR mode: a product only needs to pass at least one. */
function applyFilters() {
    saveFilters();

    const tags = [...selectedTags];
    const words = filterText.split(/\s+/).filter(Boolean);
    const hasPrice = minPrice !== null || maxPrice !== null;
    const activeCount = tags.length + (words.length ? 1 : 0) + (hasPrice ? 1 : 0) + (pinsOnly ? 1 : 0);

    const perSection = new Map();
    let shown = 0;

    cards.forEach(c => {
        let ok = true;
        if (activeCount) {
            const tests = tags.map(t => c.tags.includes(t));
            if (pinsOnly) tests.push(pinRank.has(c.id));
            if (words.length) tests.push(words.every(w => c.text.includes(w)));
            if (hasPrice) {
                tests.push((minPrice === null || c.price >= minPrice - 0.001) &&
                           (maxPrice === null || c.price <= maxPrice + 0.001));
            }
            ok = matchMode === 'and' ? tests.every(Boolean) : tests.some(Boolean);
        }
        c.el.hidden = !ok;
        if (ok) { shown++; perSection.set(c.section, (perSection.get(c.section) || 0) + 1); }
    });

    sections.forEach(sec => {
        const empty = activeCount > 0 && !perSection.get(sec);
        sec.hidden = empty;
        const link = nav.querySelector('.cat-nav-links a[href="#' + sec.id + '"]');
        if (link) link.hidden = empty;
    });

    pinsBtn.setAttribute('aria-pressed', String(pinsOnly));
    pinsBtn.disabled = pinRank.size === 0 && !pinsOnly;

    if (dealsSection && dealsSection.dataset.has) dealsSection.hidden = activeCount > 0;

    // keep the controls in step with the state
    chipBox.querySelectorAll('.filter-chip').forEach(c => c.setAttribute('aria-pressed', String(selectedTags.has(c.dataset.tag))));
    modeAnd.setAttribute('aria-pressed', String(matchMode === 'and'));
    modeOr.setAttribute('aria-pressed', String(matchMode === 'or'));

    filterCount.textContent = activeCount;
    filterCount.hidden = activeCount === 0;
    filterSummary.textContent = activeCount
        ? 'Showing ' + shown + ' of ' + cards.length + ' products'
        : 'Pick tags, search or set a price to narrow things down';
    noResults.hidden = shown > 0;
    setNavHeight();
}

restoreFilters();
pinsCount.textContent = pinRank.size;
applySort(); // puts the shopper's pins first
applyFilters();

// pins changed in another tab (or on a product page in another tab)
window.addEventListener('storage', e => {
    if (e.key !== PINS_KEY) return;
    cards.forEach(c => paintPin(c.el, productsById[c.id], isPinned(c.id)));
    refreshPins();
});
// coming Back from a product page where a pin was changed
window.addEventListener('pageshow', e => {
    if (!e.persisted) return;
    cards.forEach(c => paintPin(c.el, productsById[c.id], isPinned(c.id)));
    refreshPins();
});

/* ---------- land on the right spot when arriving with a #category ---------- */
let userScrolled = false;
['wheel', 'touchstart', 'keydown'].forEach(ev =>
    window.addEventListener(ev, () => { userScrolled = true; }, { once: true, passive: true }));

function alignToHash() {
    if (!location.hash || userScrolled) return;
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
}
setNavHeight();
alignToHash();

/* ---------- back to top: shows once you've scrolled past the Minis ---------- */
(function () {
    const marker = document.getElementById('minis');
    if (!marker) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '<span aria-hidden="true">&uarr;</span> Top';
    document.body.appendChild(btn);

    function update() {
        // past the minis = the bottom of the Minis section has gone above the sticky bar
        // (if Minis is filtered out, use the next visible section instead)
        const ref = marker.hidden ? [...sections].find(s => !s.hidden && s.id !== 'deals') : marker;
        const past = ref ? ref.getBoundingClientRect().bottom < nav.offsetHeight : false;
        btn.classList.toggle('show', past);
    }
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => { ticking = false; update(); });
    }, { passive: true });
    window.addEventListener('resize', update);
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        btn.blur();
    });
    update();
})();
// fonts and images settle after first paint, so align again once they have
window.addEventListener('load', () => { setNavHeight(); alignToHash(); });
if (document.fonts) document.fonts.ready.then(() => { setNavHeight(); alignToHash(); });
window.addEventListener('resize', setNavHeight);