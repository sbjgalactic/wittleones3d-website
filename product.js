/* Product page. Needs products.js and cart.js loaded first.
   Reads the product from the address, e.g. product.html?id=habitat-3 */
(function () {
  try {
    const root = document.getElementById('product-detail');
    const backLink = document.getElementById('back-link');
    const id = new URLSearchParams(window.location.search).get('id');
    const product = productsById[id];

    function make(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }

    // picks dark or light text so a tag stays readable on whatever colour you choose
    function readableTextOn(hex) {
        let h = String(hex).replace('#', '');
        if (h.length === 3) h = h.split('').map(c => c + c).join('');
        if (!/^[0-9a-f]{6}$/i.test(h)) return '#4a2a3d';
        const [r, g, b] = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
        return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? '#4a2a3d' : '#F5F5F5';
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
        : [product.image || PLACEHOLDER_IMG];

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

    info.append(
        tagRow,
        make('h1', 'product-title', product.name),
        make('p', 'product-detail-price', formatPrice(product.price))
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
    (product.options || []).forEach(opt => {
        const choices = (opt.choices || []).map(c => typeof c === 'object' ? c : { label: c });
        if (!opt.name || !choices.length) return;
        selected[opt.name] = choices[0].label;

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
            btn.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
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
    const stepper = makeStepper(product.name, MIN_QTY, () => {});

    const addBtn = make('button', 'product-add', 'Add to cart');
    addBtn.type = 'button';
    addBtn.setAttribute('aria-label', 'Add ' + product.name + ' to cart');

    let resetTimer;
    addBtn.addEventListener('click', () => {
        const qty = stepper.get();
        addToCart(product.id, qty, Object.assign({}, selected));
        addBtn.textContent = qty > 1 ? 'Added ' + qty + '!' : 'Added!';
        stepper.set(MIN_QTY);
        addBtn.classList.add('added');
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
            addBtn.textContent = 'Add to cart';
            addBtn.classList.remove('added');
        }, 1200);
    });

    buy.append(stepper.el, addBtn);
    info.appendChild(buy);

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