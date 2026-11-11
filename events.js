/* EVENTS PAGE - timeline of current and upcoming sales.
   Needs products.js and cart.js loaded first.

   Sales come straight from the `offers` list in products.js, so there's
   nothing extra to update: any offer with a `starts` or `ends` date shows up
   here automatically, and drops off once it has ended.
   Offers with no dates at all (always-on bundles) are left off the timeline.

   Real-life markets and stalls live in markets.js (load it before this file).
   ============================================================ */
(function () {
    const list = document.getElementById('timeline');
    if (!list) return;

    const TZ = 'Australia/Brisbane'; // matches the +10:00 dates in products.js
    const DAY = 24 * 60 * 60 * 1000;
    const now = Date.now();
    const THEMES = {
        pink:   ['#F376A5', '#F5F5F5'],
        teal:   ['#5AC6C3', '#1f3d3c'],
        purple: ['#736CED', '#F5F5F5'],
        yellow: ['#FDBB49', '#4a2a1d'],
        red:    ['#C8363F', '#F5F5F5'],
        green:  ['#2B8A4E', '#F5F5F5'],
        blue:   ['#2f8fd8', '#F5F5F5'],
        dark:   ['#4a2a3d', '#F5F5F5'],
    };

    function make(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }
    const fmtDay = t => new Date(t).toLocaleDateString('en-AU', { timeZone: TZ, weekday: 'short', day: 'numeric', month: 'short' });
    const fmtTime = t => new Date(t).toLocaleTimeString('en-AU', { timeZone: TZ, hour: 'numeric', minute: '2-digit' }).replace(' ', '').replace(':00', '');
    const fmtShort =t => new Date(t).toLocaleDateString('en-AU', { timeZone: TZ, day: 'numeric', month: 'short' });
    const dayKey = t => new Date(t).toLocaleDateString('en-CA', { timeZone: TZ }); // YYYY-MM-DD
    const findProduct = id => (typeof products !== 'undefined' ? products.find(p => p.id === id) : null);
    const imageOf = p => p && (p.image && !Array.isArray(p.image) ? p.image : (p.images && p.images[0]) || (Array.isArray(p.image) && p.image[0]));
    const money = n => (typeof formatPrice === 'function' ? formatPrice(n) : '$' + n.toFixed(2));

    function relative(t) {
        const days = Math.ceil((t - now) / DAY);
        if (days <= 0) return 'today';
        if (days === 1) return 'tomorrow';
        if (days < 14) return 'in ' + days + ' days';
        const weeks = Math.round(days / 7);
        return 'in ' + weeks + ' weeks';
    }

    /* ---------- turn offers + extraEvents into timeline entries ---------- */
    const entries = [];

    (typeof offers !== 'undefined' ? offers : []).forEach(o => {
        const start = o.starts ? Date.parse(o.starts) : null;
        const end = o.ends ? Date.parse(o.ends) : null;
        if (start == null && end == null) return;      // always-on, not an event
        if (end != null && end < now) return;          // finished

        const live = start == null || start <= now;
        const parts = (o.includes || []).map(e => typeof e === 'object' ? { id: e.id, qty: e.qty || 1 } : { id: e, qty: 1 });
        const first = o.type === 'deal' ? findProduct(o.productId) : (parts[0] && findProduct(parts[0].id));

        let price = null, was = null;
        if (o.type === 'deal' && first) {
            price = o.salePrice != null ? o.salePrice : first.price;
            const full = first.originalPrice != null ? first.originalPrice : first.price;
            if (full > price) was = full;
        } else if (parts.length) {
            const items = parts.map(pt => ({ p: findProduct(pt.id), qty: pt.qty }));
            if (items.every(it => it.p)) {
                const sum = items.reduce((s, it) => s + it.p.price * it.qty, 0);
                price = o.price != null ? o.price : sum;
                if (sum > price + 0.001) was = sum;
            }
        }

        let link = null;
        if (live) {
            if (o.type === 'deal' && first) link = './product.html?id=' + encodeURIComponent(first.id);
            else link = o.buttonLink || o.link || './catalogue.html#deals';
        }

        const colours = (o.colors && o.colors.bg) ? [o.colors.bg, o.colors.text || '#F5F5F5'] : (THEMES[o.theme] || THEMES.pink);

        entries.push({
            when: live ? end : start,
            live,
            start, end,
            title: o.headline || o.name || (first && first.name) || 'Sale',
            badge: o.badge,
            blurb: o.blurb,
            emoji: (o.emojis && o.emojis[0]) || '🎉',
            image: o.image || imageOf(first),
            price, was,
            link,
            button: live ? 'Shop now' : null,
            colours,
        });
    });

    (typeof marketEvents !== 'undefined' ? marketEvents : []).forEach(ev => {
        const start = Date.parse(ev.date);
        if (!ev.title || isNaN(start)) {
            console.warn('Market event needs a title and a valid date:', ev);
            return;
        }
        const parsedEnd = ev.ends ? Date.parse(ev.ends) : NaN;
        const end = isNaN(parsedEnd) ? start + 4 * 60 * 60 * 1000 : parsedEnd;
        if (end < now) return; // finished
        entries.push({
            market: true,
            when: start,
            live: start <= now,
            start, end,
            title: ev.title,
            badge: ev.badge || 'Market stall',
            blurb: ev.blurb,
            location: ev.location,
            address: ev.address,
            emoji: (ev.emojis && ev.emojis[0]) || '🎪',
            image: ev.image,
            link: ev.link || null,
            button: ev.button || 'Event page',
            colours: THEMES[ev.theme] || THEMES.teal,
        });
    });

    if (!entries.length) {
        document.getElementById('timeline-empty').hidden = false;
        return;
    }

    /* ---------- group by day and draw ---------- */
    entries.sort((a, b) => a.when - b.when);
    const groups = [];
    entries.forEach(e => {
        const key = dayKey(e.when);
        let g = groups[groups.length - 1];
        if (!g || g.key !== key) { g = { key, when: e.when, items: [] }; groups.push(g); }
        g.items.push(e);
    });

    groups.forEach(g => {
        const li = make('li', 'tl-group');
        const allLive = g.items.every(e => e.live);
        const allSoon = g.items.every(e => !e.live);

        const marker = make('div', 'tl-marker');
        marker.appendChild(make('span', 'tl-dot'));
        const date = make('div', 'tl-date');
        const allMarkets = g.items.every(e => e.market);
        date.appendChild(make('span', 'tl-date-label', allMarkets ? 'Market day' : allLive ? 'Last day' : allSoon ? 'Starts' : 'Key date'));
        date.appendChild(make('strong', '', fmtDay(g.when)));
        date.appendChild(make('span', 'tl-date-rel', relative(g.when)));
        marker.appendChild(date);
        li.appendChild(marker);

        const cards = make('div', 'tl-cards');
        g.items.forEach(e => cards.appendChild(card(e)));
        li.appendChild(cards);
        list.appendChild(li);
    });

    function card(e) {
        const el = make('article', 'tl-card');
        el.style.setProperty('--ev-bg', e.colours[0]);
        el.style.setProperty('--ev-fg', e.colours[1]);

        const media = make('div', 'tl-media');
        if (e.image) {
            const img = make('img');
            img.src = e.image;
            img.alt = '';
            img.loading = 'lazy';
            img.width = 300;
            img.height = 300;
            media.appendChild(img);
        } else {
            media.appendChild(make('span', 'tl-emoji', e.emoji));
            media.classList.add('is-emoji');
        }

        const body = make('div', 'tl-body');
        const chips = make('div', 'tl-chips');
        chips.appendChild(make('span', 'tl-status ' + (e.live ? 'is-live' : 'is-soon'),
            e.live ? 'On now' : e.market ? 'In person' : 'Coming soon'));
        if (e.badge) chips.appendChild(make('span', 'tl-badge', e.badge));
        body.appendChild(chips);

        body.appendChild(make('h3', '', e.title));

        let range;
        if (e.market) {
            const sameDay = dayKey(e.start) === dayKey(e.end);
            range = '🕒 ' + fmtDay(e.start) + ', ' + fmtTime(e.start) + ' – '
                + (sameDay ? '' : fmtDay(e.end) + ', ') + fmtTime(e.end);
        } else if (e.live) range = e.end ? 'Ends ' + fmtDay(e.end) : '';
        else range = 'Starts ' + fmtDay(e.start) + (e.end ? ' · ends ' + fmtShort(e.end) : '');
        if (range) body.appendChild(make('p', 'tl-range', range));
        const where = [e.location, e.address].filter(Boolean).join(', ');
        if (where) body.appendChild(make('p', 'tl-range', '📍 ' + where));
        if (e.blurb) body.appendChild(make('p', 'tl-blurb', e.blurb));

        const foot = make('div', 'tl-foot');
        if (e.price != null) {
            const price = make('p', 'tl-price', money(e.price));
            if (e.was != null) price.append(' ', make('s', '', money(e.was)));
            foot.appendChild(price);
        }
        const buttons = make('div', 'tl-buttons');
        if (e.link) {
            const a = make('a', 'catalogue-button tl-btn', e.button);
            a.href = e.link;
            if (e.market) { a.target = '_blank'; a.rel = 'noopener'; }
            buttons.appendChild(a);
        }
        if (e.market && e.address) {
            const a = make('a', 'tl-btn-alt', 'Get directions');
            a.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent([e.location, e.address].filter(Boolean).join(', '));
            a.target = '_blank';
            a.rel = 'noopener';
            buttons.appendChild(a);
        }
        if (e.market) {
            const b = make('button', 'tl-btn-alt', 'Add to calendar');
            b.type = 'button';
            b.addEventListener('click', () => downloadIcs(e));
            buttons.appendChild(b);
        }
        if (buttons.childNodes.length) foot.appendChild(buttons);
        if (foot.childNodes.length) body.appendChild(foot);

        el.append(media, body);
        return el;
    }

    /* ---------- "Add to calendar": a one-event .ics file ---------- */
    function downloadIcs(e) {
        const stamp = t => new Date(t).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
        const esc = s => String(s || '').replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/[,;]/g, m => '\\' + m);
        const ics = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Wittle Ones 3D//Events//EN',
            'BEGIN:VEVENT',
            'UID:' + stamp(e.start) + '-' + e.title.replace(/\W+/g, '-').toLowerCase() + '@wittleones3d',
            'DTSTAMP:' + stamp(Date.now()),
            'DTSTART:' + stamp(e.start),
            'DTEND:' + stamp(e.end),
            'SUMMARY:' + esc('Wittle Ones 3D at ' + e.title),
            'LOCATION:' + esc([e.location, e.address].filter(Boolean).join(', ')),
            'DESCRIPTION:' + esc((e.blurb || '') + (e.link ? '\n' + e.link : '')),
            'END:VEVENT',
            'END:VCALENDAR',
        ].join('\r\n');
        const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
        const a = make('a');
        a.href = url;
        a.download = e.title.replace(/[^\w ]+/g, '').trim().replace(/ +/g, '-') + '.ics';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
})();
