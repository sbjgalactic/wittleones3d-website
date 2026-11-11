/* Promotions section. Needs products.js and cart.js loaded first.
   All the settings live in the `offers` list at the bottom of products.js. */
(function () {
    const grid = document.getElementById('offer-grid');
    if (!grid || typeof offers === 'undefined') return;

    const section = grid.closest('section');
    const navPill = document.getElementById('nav-deals');
    const timers = [];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const DEFAULT_EMOJIS = ['🎉', '✨', '⭐', '🎁', '💖'];

    function make(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }
    const urlFor = p => './product.html?id=' + encodeURIComponent(p.id);
    const pad = n => String(n).padStart(2, '0');
    const imageOf = p => p.image || (p.images && p.images[0])
        || (typeof PLACEHOLDER_IMG !== 'undefined' ? PLACEHOLDER_IMG : '');

    // tries the small -thumb version first, falls back to the full picture
    function makeImg(src) {
        const img = make('img');
        img.alt = '';
        img.width = 600;
        img.height = 600;
        img.loading = 'lazy';
        img.decoding = 'async';
        if (/\.webp$/i.test(src)) {
            img.addEventListener('error', () => { img.src = src; }, { once: true });
            img.src = src.replace(/\.webp$/i, '-thumb.webp');
        } else {
            img.src = src;
        }
        return img;
    }

    /* ---------- offers -> something the cards can draw ---------- */
    function resolveItems(o) {
        return (o.includes || []).map(e => {
            const id = typeof e === 'object' ? e.id : e;
            const qty = (typeof e === 'object' && e.qty) || 1;
            const p = products.find(x => x.id === id);
            return p ? { p, qty } : null;
        }).filter(Boolean);
    }

    function bannerModel(o) {
        const items = resolveItems(o);
        if (!items.length) return null;
        const set = (o.id && productsById['bundle-' + o.id]) || null;
        const single = (!set && items.length === 1) ? items[0].p : null;
        const sum = items.reduce((s, it) => s + it.p.price * it.qty, 0);
        const price = set ? set.price : (single ? single.price : sum);
        return { items, set, single, sum, price, image: o.image || imageOf(items[0].p) };
    }

    /* ---------- buttons ---------- */
    const hasRequiredText = p => (p.options || []).some(opt => opt.type === 'text' && opt.required);

    function makeAction(o, model) {
        const text = o.button || 'Add to cart';

        if (o.buttonLink) {
            const a = make('a', 'offer-btn', text);
            a.href = o.buttonLink;
            return a;
        }
        const target = model.set || model.single;
        if (!target) return null;

        // a product that needs typed text has to be bought from its own page
        if (model.single && hasRequiredText(model.single)) {
            const a = make('a', 'offer-btn', o.button || 'Customise');
            a.href = urlFor(model.single);
            return a;
        }

        // a set whose items have choices (colour, keychain...) opens the picker first,
        // unless the offer says options: false (e.g. "assorted colours")
        const pick = model.set && o.options !== false && model.items.some(it => optionList(it.p).length);

        const btn = make('button', 'offer-btn', pick ? (o.button || 'Choose & add') : text);
        btn.type = 'button';
        btn.setAttribute('aria-label', btn.textContent + ': ' + target.name);
        const label = btn.textContent;
        let timer;
        function added() {
            btn.textContent = 'Added! \u2713';
            clearTimeout(timer);
            timer = setTimeout(() => { btn.textContent = label; }, 1200);
        }
        btn.addEventListener('click', () => {
            if (pick) { openPicker(model, added); return; }
            addToCart(target.id, 1, model.set ? undefined : defaultOptions(model.single));
            added();
        });
        return btn;
    }

    /* ---------- option picker for sets ----------
       One group per included product that has options. The choices go into the
       cart line as e.g. { 'Christmas Sausage Dog - Santa Hat': 'Yes' }. */
    function optionList(p) {
        return (p.options || []).filter(opt => opt.name &&
            (opt.type === 'text' || (opt.choices && opt.choices.length)));
    }

    let picker;
    function openPicker(model, onAdded) {
        if (!picker) {
            picker = document.createElement('dialog');
            picker.className = 'set-picker';
            // clicking the dark backdrop closes it
            picker.addEventListener('click', e => { if (e.target === picker) picker.close(); });
            document.body.appendChild(picker);
        }
        const set = model.set;
        const chosen = {};      // key -> value
        const textFields = [];  // { key, opt, input }

        const head = make('div', 'set-picker-head');
        head.append(make('h2', '', 'Choose your options'));
        const x = make('button', 'set-picker-close', '\u00d7');
        x.type = 'button';
        x.setAttribute('aria-label', 'Close');
        x.addEventListener('click', () => picker.close());
        head.appendChild(x);

        const bodyEl = make('div', 'set-picker-body');
        bodyEl.appendChild(make('p', 'set-picker-sub', set.name + ' \u00b7 ' + formatPrice(set.price)));

        model.items.forEach(({ p, qty }) => {
            const opts = optionList(p);
            if (!opts.length) return;
            const block = make('section', 'set-item');
            const title = make('div', 'set-item-title');
            const pic = make('img');
            pic.src = p.image || PLACEHOLDER_IMG;
            pic.alt = '';
            pic.width = 44;
            pic.height = 44;
            title.append(pic, make('h3', '', (qty > 1 ? qty + ' \u00d7 ' : '') + p.name));
            block.appendChild(title);
            if (qty > 1) block.appendChild(make('p', 'set-item-note', 'Your choices apply to all ' + qty + '.'));

            const defaults = defaultOptions(p);
            opts.forEach((opt, oi) => {
                const key = p.name + ' - ' + opt.name;
                const group = make('div', 'set-opt');

                if (opt.type === 'text') {
                    const lab = make('label', 'set-opt-label', opt.name + (opt.required ? ' *' : ' (optional)'));
                    const input = make('input', 'set-opt-input');
                    input.type = 'text';
                    input.id = 'set-' + p.id + '-' + oi;
                    lab.htmlFor = input.id;
                    input.maxLength = opt.maxLength || 40;
                    input.placeholder = opt.placeholder || '';
                    input.autocomplete = 'off';
                    input.addEventListener('input', () => input.classList.remove('invalid'));
                    group.append(lab, input);
                    textFields.push({ key, opt, input });
                    block.appendChild(group);
                    return;
                }

                const choices = opt.choices.map(c => typeof c === 'object' ? c : { label: c });
                chosen[key] = defaults[opt.name] || choices[0].label;
                const valueText = make('span', 'set-opt-value', chosen[key]);
                const lab = make('p', 'set-opt-label');
                lab.append(opt.name + ': ', valueText);
                const row = make('div', 'set-opt-choices');
                row.setAttribute('role', 'group');
                row.setAttribute('aria-label', p.name + ' ' + opt.name);
                choices.forEach(choice => {
                    const b = make('button', 'set-choice');
                    b.type = 'button';
                    b.setAttribute('aria-pressed', String(choice.label === chosen[key]));
                    if (choice.color) {
                        const dot = make('span', 'set-swatch');
                        dot.style.backgroundColor = choice.color;
                        b.appendChild(dot);
                    }
                    b.append(choice.label);
                    b.addEventListener('click', () => {
                        chosen[key] = choice.label;
                        valueText.textContent = choice.label;
                        row.querySelectorAll('.set-choice').forEach(n => n.setAttribute('aria-pressed', String(n === b)));
                    });
                    row.appendChild(b);
                });
                group.append(lab, row);
                block.appendChild(group);
            });
            bodyEl.appendChild(block);
        });

        const foot = make('div', 'set-picker-foot');
        const addBtn = make('button', 'offer-btn set-picker-add', 'Add set to cart \u00b7 ' + formatPrice(set.price));
        addBtn.type = 'button';
        addBtn.addEventListener('click', () => {
            const missing = textFields.find(t => t.opt.required && !t.input.value.trim());
            if (missing) { missing.input.classList.add('invalid'); missing.input.focus(); return; }
            const options = { ...chosen };
            textFields.forEach(t => { const v = t.input.value.trim(); if (v) options[t.key] = v; });
            addToCart(set.id, 1, options);
            picker.close();
            onAdded();
        });
        foot.appendChild(addBtn);

        picker.replaceChildren(head, bodyEl, foot);
        picker.showModal();
        x.focus();
    }

    /* ---------- countdown ---------- */
    function makeCountdown(endMs, card) {
        const box = make('div', 'countdown');
        box.setAttribute('role', 'timer');
        const nums = {}, units = {};
        [['d', 'days'], ['h', 'hrs'], ['m', 'mins'], ['s', 'secs']].forEach(([key, label], i) => {
            const unit = make('div', 'cd-unit');
            nums[key] = make('b', '', '00');
            unit.append(nums[key], make('small', '', label));
            if (i) box.appendChild(make('span', 'cd-sep', ':'));
            box.appendChild(unit);
            units[key] = unit;
        });
        timers.push({ end: endMs, box, nums, units, card });
        return box;
    }

    /* ---------- the "ticket": time left + price in one panel ----------
       now/was are prices, label is e.g. 'Set price'. Either half can be missing. */
    function makeTicket(o, card, { now, was, label }) {
        const showTime = !!(o.ends && o.showCountdown !== false);
        const showPrice = o.showPrice !== false;
        if (!showTime && !showPrice) return null;

        const ticket = make('div', 'offer-ticket');

        if (showTime) {
            const time = make('div', 'ticket-time');
            time.appendChild(make('span', 'ticket-label', '⏳ Ends in'));
            time.appendChild(makeCountdown(Date.parse(o.ends), card));
            ticket.appendChild(time);
        }

        if (showPrice) {
            const price = make('div', 'ticket-price');
            price.appendChild(make('span', 'ticket-label', label));
            price.appendChild(make('strong', 'ticket-now', formatPrice(now)));
            if (was != null && was > now + 0.001) {
                const row = make('div', 'ticket-was');
                row.appendChild(make('s', '', formatPrice(was)));
                if (o.showSavings !== false) {
                    const pct = Math.round((1 - now / was) * 100);
                    row.appendChild(make('span', 'offer-save', 'Save ' + formatPrice(was - now) + (pct > 0 ? ' · ' + pct + '%' : '')));
                }
                price.appendChild(row);
            }
            ticket.appendChild(price);
        }
        return ticket;
    }

    /* ---------- DEAL card (one product on sale) ---------- */
    function dealCard(o, product) {
        const card = make('article', 'deal-card' + (o.theme ? ' theme-' + o.theme : ''));
        const was = product.originalPrice != null ? product.originalPrice : product.price;
        const pct = Math.round((1 - product.price / was) * 100);

        const media = make('a', 'deal-media');
        media.href = urlFor(product);
        media.tabIndex = -1;
        media.setAttribute('aria-hidden', 'true');
        media.appendChild(makeImg(o.image || imageOf(product)));
        if (pct > 0) media.appendChild(make('span', 'deal-off', '\u2212' + pct + '%'));
        if (o.badge) media.appendChild(make('span', 'deal-badge', o.badge));

        const body = make('div', 'offer-body');
        const title = make('h3');
        const link = make('a', '', o.headline || product.name);
        link.href = urlFor(product);
        title.appendChild(link);
        body.appendChild(title);
        if (o.blurb) body.appendChild(make('p', 'offer-blurb', o.blurb));

        const ticket = makeTicket(o, card, { now: product.price, was, label: was > product.price ? 'Sale price' : 'Price' });
        if (ticket) body.appendChild(ticket);

        const action = makeAction(o, { single: product, set: null });
        if (action) body.appendChild(action);

        card.append(media, body);
        card._emojis = (o.emojis && o.emojis.length) ? o.emojis : DEFAULT_EMOJIS;
        return card;
    }

    /* ---------- BANNER (promo / limited) ---------- */
    function makeIncludes(model) {
        const wrap = make('div', 'offer-includes');
        wrap.appendChild(make('p', 'offer-ends-label', 'Contains'));
        const list = make('ul');
        model.items.forEach(({ p, qty }) => {
            const li = make('li');
            const a = make('a', '', (qty > 1 ? qty + ' \u00D7 ' : '') + p.name);
            a.href = urlFor(p);
            li.appendChild(a);
            list.appendChild(li);
        });
        wrap.appendChild(list);
        return wrap;
    }

    function makeFx(o, emojis) {
        const mode = o.fx || 'float';
        if (mode === 'none' || reduceMotion) return null;
        const count = o.fxCount != null ? o.fxCount : 6;
        const layer = make('div', 'offer-fx fx-' + mode);
        layer.setAttribute('aria-hidden', 'true');
        for (let i = 0; i < count; i++) {
            const bit = make('span', 'fx-bit');
            if (mode !== 'sparkle') bit.textContent = emojis[i % emojis.length];
            const dur = 6 + Math.random() * 6;
            bit.style.setProperty('--x', Math.random() * 100 + '%');
            bit.style.setProperty('--y', Math.random() * 100 + '%');
            bit.style.setProperty('--size', (0.9 + Math.random() * 1.1) + 'rem');
            bit.style.setProperty('--dur', dur + 's');
            bit.style.setProperty('--delay', -Math.random() * dur + 's');
            bit.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
            bit.style.setProperty('--spin', (Math.random() * 60 - 30) + 'deg');
            layer.appendChild(bit);
        }
        return layer;
    }

    // hover: gentle 3D tilt that follows the mouse, plus a pop of emojis where you enter
    function addHoverEffects(card, emojis, o) {
        if (!window.matchMedia('(hover: hover)').matches || reduceMotion) return;
        if (o.tilt !== false) {
            card.addEventListener('mousemove', e => {
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width - 0.5;
                const py = (e.clientY - r.top) / r.height - 0.5;
                card.style.transform = 'perspective(900px) rotateX(' + (-py * 5).toFixed(2) + 'deg) rotateY(' + (px * 5).toFixed(2) + 'deg) translateY(-6px)';
            });
            card.addEventListener('mouseleave', () => { card.style.transform = ''; });
        }
        if (o.burst !== false) {
            card.addEventListener('mouseenter', e => {
                const r = card.getBoundingClientRect();
                for (let i = 0; i < 8; i++) {
                    const bit = make('span', 'burst-bit', emojis[i % emojis.length]);
                    const angle = Math.random() * Math.PI * 2;
                    const dist = 50 + Math.random() * 70;
                    bit.style.left = (e.clientX - r.left) + 'px';
                    bit.style.top = (e.clientY - r.top) + 'px';
                    bit.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
                    bit.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
                    bit.addEventListener('animationend', () => bit.remove());
                    card.appendChild(bit);
                }
            });
        }
    }

    function bannerCard(o, model) {
        const limited = o.type === 'limited';
        const classes = [
            'offer-banner',
            o.size === 'full' ? 'offer-full' : 'offer-wide',
            'theme-' + (o.theme || (limited ? 'teal' : 'pink')),
            'pat-' + (o.pattern || 'dots'),
        ];
        if (o.imageSide === 'right') classes.push('img-right');
        const card = make('article', classes.join(' '));

        if (o.colors) {
            if (o.colors.bg) card.style.setProperty('--bg', o.colors.bg);
            if (o.colors.text) card.style.setProperty('--fg', o.colors.text);
            if (o.colors.dot) card.style.setProperty('--dot', o.colors.dot);
            if (o.colors.accent) {
                card.style.setProperty('--accent', o.colors.accent);
                card.style.setProperty('--on-accent', o.colors.onAccent || '#F5F5F5');
            }
        }

        const emojis = (o.emojis && o.emojis.length) ? o.emojis : DEFAULT_EMOJIS;
        const href = o.link || (model.single ? urlFor(model.single) : null);

        // picture (a link only when there's somewhere to go)
        const media = make(href ? 'a' : 'div', 'offer-banner-media');
        if (href) {
            media.href = href;
            media.tabIndex = -1;
            media.setAttribute('aria-hidden', 'true');
        }
        media.appendChild(makeImg(model.image));

        const body = make('div', 'offer-body');
        body.appendChild(make('span', 'offer-kicker', o.badge || (limited ? 'Limited time' : 'New!')));

        const headline = o.headline || (model.single && model.single.name) || '';
        const title = make('h3');
        if (href) {
            const a = make('a', '', headline);
            a.href = href;
            title.appendChild(a);
        } else {
            title.textContent = headline;
        }
        body.appendChild(title);

        if (o.blurb) body.appendChild(make('p', 'offer-blurb', o.blurb));
        if (o.showContains !== false) body.appendChild(makeIncludes(model));

        const ticket = makeTicket(o, card, {
            now: model.price,
            was: model.set ? model.sum : null,
            label: model.set ? 'Set price' : 'Price',
        });
        if (ticket) body.appendChild(ticket);

        const action = makeAction(o, model);
        if (action) body.appendChild(action);

        // sticker emojis beside the text
        if (o.decor !== false) {
            const deco = make('div', 'offer-emojis');
            deco.setAttribute('aria-hidden', 'true');
            emojis.slice(0, 3).forEach(e => deco.appendChild(make('span', 'offer-emoji', e)));
            body.appendChild(deco);
        }

        card.append(media, body);
        card._emojis = emojis; // used by the click explosion
        const fx = makeFx(o, emojis);
        if (fx) card.appendChild(fx);
        addHoverEffects(card, emojis, o);
        return card;
    }

    /* ---------- build the section ---------- */
    let timer;
    function hideAll() {
        clearInterval(timer);
        if (section) { section.hidden = true; delete section.dataset.has; }
        if (navPill) navPill.hidden = true;
    }
    function tick() {
        const now = Date.now();
        timers.slice().forEach(t => {
            const left = t.end - now;
            if (left <= 0) {
                t.card.remove();
                timers.splice(timers.indexOf(t), 1);
                return;
            }
            const s = Math.floor(left / 1000);
            t.nums.d.textContent = pad(Math.floor(s / 86400));
            t.nums.h.textContent = pad(Math.floor((s % 86400) / 3600));
            t.nums.m.textContent = pad(Math.floor((s % 3600) / 60));
            t.nums.s.textContent = pad(s % 60);
            // under a day to go: drop the "00 days" box
            const noDays = s < 86400;
            t.units.d.hidden = noDays;
            if (t.units.d.nextSibling) t.units.d.nextSibling.hidden = noDays;
            t.box.classList.toggle('urgent', left < 86400000); // last 24 hours pulse
        });
        if (!grid.children.length) hideAll();
    }

    const live = offers.filter(o => offerLive(o)).sort((a, b) => (a.order || 0) - (b.order || 0));
    const frag = document.createDocumentFragment();
    live.forEach(o => {
        if (o.type === 'deal') {
            const product = products.find(p => p.id === o.productId);
            if (!product) { console.warn('Deal "' + (o.id || o.productId) + '" has no matching productId.'); return; }
            frag.appendChild(dealCard(o, product));
            return;
        }
        const model = bannerModel(o);
        if (!model) { console.warn('Offer "' + (o.id || o.headline) + '" has no valid items in includes.'); return; }
        frag.appendChild(bannerCard(o, model));
    });

    if (frag.childNodes.length) {
        grid.appendChild(frag);
        if (section) { section.hidden = false; section.dataset.has = '1'; }
        if (navPill) navPill.hidden = false;
        if (timers.length) { tick(); timer = setInterval(tick, 1000); }
    }

    // only animate what's on screen
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(entries => {
            entries.forEach(en => en.target.classList.toggle('is-offscreen', !en.isIntersecting));
        }, { rootMargin: '100px' });
        grid.querySelectorAll('.offer-banner, .deal-card').forEach(el => io.observe(el));
    }

    /* ---------- emoji explosion when you press a promotion card ----------
       (the Promotions pill in the bar just scrolls, no explosion) */
    function promoExplosion(x, y, burstEmojis) {
        if (reduceMotion) return;
        const layer = make('div', 'promo-burst');
        layer.setAttribute('aria-hidden', 'true');
        const count = window.matchMedia('(max-width: 700px)').matches ? 18 : 32;
        for (let i = 0; i < count; i++) {
            const bit = make('span', 'promo-burst-bit', burstEmojis[i % burstEmojis.length]);
            const angle = Math.random() * Math.PI * 2;
            const dist = 90 + Math.random() * 190;
            bit.style.setProperty('--x', x + 'px');
            bit.style.setProperty('--y', y + 'px');
            bit.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
            bit.style.setProperty('--dy', Math.sin(angle) * dist - 50 + 'px'); // leans upward, then falls
            bit.style.setProperty('--rot', (Math.random() * 360 - 180) + 'deg');
            bit.style.setProperty('--size', (1.3 + Math.random() * 1.4) + 'rem');
            bit.style.setProperty('--dur', (1.1 + Math.random() * 0.7) + 's');
            layer.appendChild(bit);
        }
        document.body.appendChild(layer);
        setTimeout(() => layer.remove(), 2200);
    }

    // each card explodes with its own emojis, from wherever you pressed it
    grid.addEventListener('click', e => {
        const card = e.target.closest('.offer-banner, .deal-card');
        if (!card || !grid.contains(card)) return;
        let x = e.clientX, y = e.clientY;
        if (!x && !y) { // keyboard "click" has no position: use the card's centre
            const r = card.getBoundingClientRect();
            x = r.left + r.width / 2;
            y = r.top + r.height / 2;
        }
        promoExplosion(x, y, card._emojis || DEFAULT_EMOJIS);
    });
})();