/* Product page. Needs products.js and cart.js loaded first.
   Reads the product from the address, e.g. product.html?id=habitat-3 */
(function () {
  try {
    const root = document.getElementById('product-detail');
    const backLink = document.getElementById('back-link');
    const id = new URLSearchParams(window.location.search).get('id');
    const product = productsById[id];

    // the stepper only reports on +/-, Enter or leaving the box; this also
    // updates prices while a number is being typed
    function liveQty(stepper, paint) {
        const input = stepper.el.querySelector('input');
        if (!input) return;
        input.addEventListener('input', () => {
            const n = parseInt(input.value, 10);
            if (!isNaN(n)) paint(Math.min(MAX_QTY, Math.max(MIN_QTY, n)));
        });
    }

    function make(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }

    /* ---------- product not found ---------- */
    if (!product) {
        document.title = 'Product not found | Wittle Ones 3D';
        root.classList.add('product-missing');
        root.replaceChildren(
            make('h2', 'product-title', 'We couldn\u2019t find that product'),
            make('p', 'product-description', 'It may have been removed or the link might be wrong. Head back to the catalogue to keep browsing.')
        );
        return;
    }

    document.title = product.name + ' | Wittle Ones 3D';

    // Christmas theme: automatic for the christmas category, or add theme: 'christmas'
    // to any product in products.js (e.g. the Cozy Christmas Habitat)
    const theme = product.theme || (product.category === 'christmas' ? 'christmas' : '');
    if (theme) root.closest('.product-main').classList.add('theme-' + theme);
    backLink.href = './catalogue.html#' + product.category;
    backLink.textContent = '\u2190 Back to ' + product.category;

    /* ---------- gallery ---------- */
    const gallery = make('div', 'product-gallery');
    const images = (product.images && product.images.length)
        ? product.images
        : (product.cardImages && product.cardImages.length ? product.cardImages : [product.image || PLACEHOLDER_IMG]);

    const mainImg = make('img', 'gallery-main');
    mainImg.src = images[0];
    mainImg.alt = product.name;
    gallery.appendChild(mainImg);

    if (images.length > 1) {
        const thumbs = make('div', 'gallery-thumbs');
        images.forEach((src, i) => {
            const btn = make('button', 'gallery-thumb');
            btn.type = 'button';
            btn.setAttribute('aria-label', 'Show picture ' + (i + 1) + ' of ' + images.length);
            if (i === 0) btn.classList.add('active');
            const thumb = make('img');
            thumb.src = src;
            thumb.alt = '';
            btn.appendChild(thumb);
            btn.addEventListener('click', () => {
                mainImg.src = src;
                thumbs.querySelectorAll('.gallery-thumb').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
            thumbs.appendChild(btn);
        });
        gallery.appendChild(thumbs);
    }

    /* ---------- info column ---------- */
    const info = make('div', 'product-info-panel');

    const category = make('a', 'product-category',
        product.category.charAt(0).toUpperCase() + product.category.slice(1));
    category.href = './catalogue.html#' + product.category;

    // category pill plus any custom tags from products.js (tags: ['Bees', 'Nature'])
    const tagRow = make('div', 'product-tags');
    tagRow.appendChild(category);
    (product.tags || []).forEach(tag => {
        // a tag is either 'Bees' or { label: 'Bees', color: '#FDBB49', textColor: '#4a2a1d' }
        const label = typeof tag === 'object' ? tag.label : tag;
        if (!label || !String(label).trim()) return;

        // colour order: this tag's own colour, then the shared tagColors list, then the default
        const shared = (typeof tagColors !== 'undefined' && tagColors[label]) || null;
        const color = (typeof tag === 'object' && tag.color) || shared;
        const chip = make('span', 'product-tag', label);
        if (color) {
            chip.style.setProperty('--tag-bg', color);
            chip.style.setProperty('--tag-text', (typeof tag === 'object' && tag.textColor) || readableTextOn(color));
        }
        tagRow.appendChild(chip);
    });

    // "$5.00" for one, "$5.00 ($15.00)" once the quantity goes above 1
    const priceEl = make('p', 'product-detail-price', formatPrice(product.price));
    if (product.originalPrice != null) priceEl.append(' ', make('s', 'price-was', formatPrice(product.originalPrice)));
    const priceTotal = make('span', 'price-total');
    priceTotal.setAttribute('aria-live', 'polite');
    priceEl.appendChild(priceTotal);
    function paintTotal(qty) {
        priceTotal.textContent = qty > 1 ? ' (' + formatPrice(product.price * qty) + ')' : '';
    }

    info.append(
        tagRow,
        make('h1', 'product-title', product.name),
        priceEl
    );

    if (product.description) {
        info.appendChild(make('p', 'product-description', product.description));
    }

    if (product.details && product.details.length) {
        const specs = make('dl', 'product-specs');
        product.details.forEach(row => {
            const wrap = make('div', 'spec-row');
            wrap.append(make('dt', '', row.label), make('dd', '', row.value));
            specs.appendChild(wrap);
        });
        info.appendChild(specs);
    }

    /* ---------- option selectors (Colour, Size, ...) ---------- */
    // product.options = [{ name: 'Colour', choices: ['Pink', { label: 'Blue', color: '#5AC6C3' }] }, ...]
    // The first choice of each option starts selected.
    const selected = {};
    const textInputs = [];

    (product.options || []).forEach((opt, index) => {
        if (opt.type === 'text') {
            const group = make('div', 'option-group');
            const label = make('label', 'option-label', opt.name + (opt.required ? ' *' : ' (optional)') + ':');
            const input = make('input', 'option-input');
            input.type = 'text';
            input.id = 'opt-' + index;
            label.htmlFor = input.id;
            input.maxLength = opt.maxLength || 40;
            input.placeholder = opt.placeholder || '';
            input.autocomplete = 'off';
            selected[opt.name] = '';
            input.addEventListener('input', () => { selected[opt.name] = input.value.trim(); input.classList.remove('invalid'); });
            group.append(label, input);
            if (opt.help) group.appendChild(make('p', 'option-help', opt.help));
            info.appendChild(group);
            textInputs.push({ opt, input });
            return;
        }

        const choices = (opt.choices || []).map(c => typeof c === 'object' ? c : { label: c });
        if (!opt.name || !choices.length) return;

        // 1) replace:  selected[opt.name] = choices[0].label;
        const noIndex = opt.name === 'Keychain' ? choices.findIndex(c => c.label === 'No') : -1;
        const startIndex = noIndex >= 0 ? noIndex : 0;
        selected[opt.name] = choices[startIndex].label;

        const group = make('div', 'option-group');
        const heading = make('p', 'option-label');
        const valueText = make('span', 'option-value', selected[opt.name]);
        heading.append(document.createTextNode(opt.name + ': '), valueText);

        const row = make('div', 'option-choices');
        row.setAttribute('role', 'group');
        row.setAttribute('aria-label', opt.name);

        choices.forEach((choice, i) => {
            const btn = make('button', 'option-btn');
            btn.type = 'button';
            btn.setAttribute('aria-pressed', i === startIndex ? 'true' : 'false');
            if (choice.color) {
                const dot = make('span', 'option-swatch');
                dot.style.backgroundColor = choice.color;
                dot.setAttribute('aria-hidden', 'true');
                btn.appendChild(dot);
            }
            btn.appendChild(document.createTextNode(choice.label));
            btn.addEventListener('click', () => {
                selected[opt.name] = choice.label;
                valueText.textContent = choice.label;
                row.querySelectorAll('.option-btn').forEach(b => b.setAttribute('aria-pressed', 'false'));
                btn.setAttribute('aria-pressed', 'true');
            });
            row.appendChild(btn);
        });

        group.append(heading, row);
        info.appendChild(group);
    });

    /* ---------- buy area ---------- */
    const buy = make('div', 'product-buy');
    const stepper = makeStepper(product.name, MIN_QTY, paintTotal);
    liveQty(stepper, paintTotal);

    const addBtn = make('button', 'product-add', 'Add to cart');
    addBtn.type = 'button';
    addBtn.setAttribute('aria-label', 'Add ' + product.name + ' to cart');

    let resetTimer;
    addBtn.addEventListener('click', () => {
        const missing = textInputs.find(t => t.opt.required && !selected[t.opt.name]);
        if (missing) {
            missing.input.classList.add('invalid');
            missing.input.focus();
            addBtn.textContent = 'Please fill in ' + missing.opt.name;
            clearTimeout(resetTimer);
            resetTimer = setTimeout(() => { addBtn.textContent = 'Add to cart'; }, 1800);
            return;
        }
        const qty = stepper.get();
        const chosen = {};
        Object.keys(selected).forEach(k => { if (selected[k] !== '') chosen[k] = selected[k]; });
        addToCart(product.id, qty, chosen);
        addBtn.textContent = qty > 1 ? 'Added ' + qty + '!' : 'Added!';
        stepper.set(MIN_QTY);
        paintTotal(MIN_QTY);
        addBtn.classList.add('added');
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
            addBtn.textContent = 'Add to cart';
            addBtn.classList.remove('added');
        }, 1200);
    });

    // pin: puts this product at the top of its category in the catalogue (saved in this browser)
    const pinBtn = make('button', 'product-pin');
    pinBtn.type = 'button';
    function paintPin() {
        const on = isPinned(product.id);
        pinBtn.setAttribute('aria-pressed', String(on));
        pinBtn.textContent = on ? '📌 Pinned to the top of ' + product.category : '📌 Pin to the top of ' + product.category;
    }
    pinBtn.addEventListener('click', () => { togglePin(product.id); paintPin(); });
    paintPin();

    buy.append(stepper.el, addBtn, pinBtn);
    info.appendChild(buy);

    /* ---------- default critters (habitats) ----------
       products.js: defaultCritters: [{ id: 'critter-47', qty: 3 }] (or just 'critter-47')
       add options to pick a style: { id: 'critter-46', qty: 1, options: { Style: 'Clownfish' } } */
    const crew = (product.defaultCritters || []).map(e => {
        const cid = typeof e === 'object' ? e.id : e;
        const qty = Math.max(1, Math.min(MAX_QTY, (typeof e === 'object' && e.qty) || 1));
        const p = productsById[cid];
        if (!p) { console.warn('defaultCritters on "' + product.id + '" lists "' + cid + '", which does not exist.'); return null; }
        const picked = (typeof e === 'object' && e.options) || {};
        const options = { ...defaultOptions(p), ...picked };
        // "(Clownfish)" after the name, only for choices set here
        const note = Object.values(picked).filter(Boolean).join(', ');
        return { p, qty, options, label: p.name + (note ? ' (' + note + ')' : '') };
    }).filter(Boolean);

    if (crew.length) {
        const box = make('div', 'default-critters');
        box.appendChild(make('p', 'option-label', 'Move-in ready? Add its critters:'));

        const crewBtn = make('button', 'product-add default-critters-btn');
        crewBtn.type = 'button';
        let crewTimer;
        let crewAdded = false;

        // "Monkey critters" stays, "T-Rex" -> "T-Rexes", "Bee" -> "Bees"
        function plural(name) {
            if (/s$/i.test(name)) return name;
            return name + (/(x|z|ch|sh)$/i.test(name) ? 'es' : 's');
        }
        // button text follows the quantities picked below
        function crewLabel() {
            const total = crew.reduce((s, c) => s + c.p.price * c.qty, 0);
            const one = crew[0];
            const label = crew.length === 1
                ? 'Add ' + (one.qty > 1 ? one.qty + ' ' + plural(one.p.name) : 'the ' + one.p.name)
                : 'Add the critters';
            return label + ' (' + formatPrice(total) + ')';
        }
        function paintCrewBtn() { if (!crewAdded) crewBtn.textContent = crewLabel(); }

        // each row: picture + name, a small quantity editor, and "$5.00 ($15.00)"
        const list = make('ul', 'default-critters-list');
        crew.forEach(c => {
            const li = make('li');
            const a = make('a');
            a.href = './product.html?id=' + encodeURIComponent(c.p.id);
            const pic = make('img');
            pic.src = c.p.image || PLACEHOLDER_IMG;
            pic.alt = '';
            pic.width = 48;
            pic.height = 48;
            a.append(pic, make('span', '', c.label));

            const price = make('span', 'default-critters-price');
            function paintRow(qty) {
                c.qty = qty;
                price.textContent = formatPrice(c.p.price) + (qty > 1 ? ' (' + formatPrice(c.p.price * qty) + ')' : '');
                paintCrewBtn();
            }
            const step = makeStepper(c.label, c.qty, paintRow);
            liveQty(step, paintRow);

            const controls = make('div', 'default-critters-controls');
            controls.append(step.el, price);
            li.append(a, controls);
            list.appendChild(li);
            paintRow(c.qty);
        });
        box.appendChild(list);

        paintCrewBtn();
        crewBtn.addEventListener('click', () => {
            crew.forEach(({ p, qty, options }) => addToCart(p.id, qty, options));
            crewAdded = true;
            crewBtn.textContent = 'Added! ✓';
            crewBtn.classList.add('added');
            clearTimeout(crewTimer);
            crewTimer = setTimeout(() => {
                crewAdded = false;
                paintCrewBtn();
                crewBtn.classList.remove('added');
            }, 1400);
        });
        box.appendChild(crewBtn);
        info.appendChild(box);
    }

    root.replaceChildren(gallery, info);
  } catch (err) {
    const box = document.getElementById('product-detail');
    if (box) {
        box.classList.add('product-missing');
        box.textContent = 'Something went wrong building this page: ' + err.message;
    }
    console.error(err);
  }
})();