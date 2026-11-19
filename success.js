/* PAYMENT SUCCESS PAGE - fills in the order overview from /api/order-summary */
(function () {
    const $ = id => document.getElementById(id);
    const orderEl = $('order');
    const sessionId = new URLSearchParams(location.search).get('session_id');

    function money(cents) {
        return '$' + ((cents || 0) / 100).toFixed(2);
    }
    function el(tag, cls, text) {
        const e = document.createElement(tag);
        if (cls) e.className = cls;
        if (text != null) e.textContent = text;
        return e;
    }
    function showFallback() {
        orderEl.hidden = true;
        $('order-fallback').hidden = false;
    }

    if (!sessionId) return showFallback();

    fetch('/api/order-summary?session_id=' + encodeURIComponent(sessionId))
        .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
        .then(render)
        .catch(showFallback);

    function render(o) {
        const placed = new Date(o.created * 1000);
        const dateText = placed.toLocaleString('en-AU', {
            day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit',
        });

        // top bar
        $('order-ref').textContent = o.orderRef;
        $('order-date').textContent = dateText;
        $('step-when').textContent = placed.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });
        if (o.email) {
            $('success-lead').textContent = 'Your payment was successful and your Wittle Ones will be printed and packed with love. A receipt has been sent to ' + o.email + '.';
        }

        const copyBtn = $('copy-ref');
        if (navigator.clipboard) {
            copyBtn.hidden = false;
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(o.orderRef).then(() => {
                    copyBtn.querySelector('.copy-text').textContent = 'Copied!';
                    setTimeout(() => { copyBtn.querySelector('.copy-text').textContent = 'Copy'; }, 1800);
                }).catch(() => {});
            });
        }

        // pickup orders get different last steps
        if (o.delivery === 'pickup') {
            $('step-3').textContent = 'Ready for pickup';
            $('step-4').textContent = 'Picked up';
        }

        // items
        const list = $('items');
        list.textContent = '';
        let count = 0;
        o.items.forEach(it => {
            count += it.qty;
            const p = (typeof productsById !== 'undefined' && it.id && productsById[it.id]) || null;
            const li = el('li', 'item');

            const thumb = el('span', 'thumb');
            const img = document.createElement('img');
            img.src = (p && p.image) || './images/placeholder.webp';
            img.alt = '';
            img.loading = 'lazy';
            img.onerror = () => { img.remove(); };
            thumb.appendChild(img);
            li.appendChild(thumb);

            const info = el('div', 'item-info');
            if (p) {
                const a = el('a', 'item-name', it.name);
                a.href = './product.html?id=' + encodeURIComponent(it.id);
                info.appendChild(a);
            } else {
                info.appendChild(el('span', 'item-name', it.name));
            }
            const details = (it.details || '')
                .split(/,\s*|\s\|\s/)
                .filter(d => d && d !== 'Keychain: No')
                .join(' · ');
            if (details) info.appendChild(el('span', 'item-details', details));
            if (it.qty > 1 && it.unitCents != null) info.appendChild(el('span', 'item-each', money(it.unitCents) + ' each'));
            li.appendChild(info);

            const right = el('div', 'item-right');
            right.appendChild(el('span', 'item-qty', '×' + it.qty));
            right.appendChild(el('span', 'item-price', money(it.totalCents)));
            li.appendChild(right);

            list.appendChild(li);
        });
        $('items-count').textContent = '(' + count + (count === 1 ? ' item)' : ' items)');

        // totals
        const totals = $('totals');
        totals.textContent = '';
        function row(label, value, cls) {
            const d = el('div', cls);
            d.appendChild(el('dt', null, label));
            d.appendChild(el('dd', null, value));
            totals.appendChild(d);
        }
        row('Subtotal', money(o.subtotalCents));
        if (o.discountCents > 0) {
            row('Discount' + (o.discountCode ? ' (' + o.discountCode + ')' : ''), '−' + money(o.discountCents), 'discount');
        }
        if (o.delivery === 'pickup') row('Pickup', 'Free');
        else row('Shipping', o.shippingCents ? money(o.shippingCents) : 'Free');
        if (o.taxCents > 0) row('Tax', money(o.taxCents));
        $('grand-total').textContent = money(o.totalCents) + ' ' + o.currency;

        // address + contact
        const addrEl = $('address');
        addrEl.textContent = '';
        if (o.delivery === 'pickup') {
            $('deliver-title').textContent = 'Pickup';
            addrEl.appendChild(el('p', null, 'Local pickup. We’ll message you to arrange a time and place.'));
        } else if (o.address) {
            const a = o.address;
            [
                o.name,
                a.line1,
                a.line2,
                [a.city, a.state, a.postcode].filter(Boolean).join(' '),
                a.country === 'AU' ? 'Australia' : a.country,
            ].filter(Boolean).forEach(line => addrEl.appendChild(el('p', null, line)));
        } else {
            addrEl.appendChild(el('p', null, 'Shipping details are on your emailed receipt.'));
        }

        const contact = $('contact');
        contact.textContent = '';
        if (o.delivery === 'pickup' && o.name) contact.appendChild(el('p', null, o.name));
        if (o.email) contact.appendChild(el('p', null, o.email));
        if (o.phone) contact.appendChild(el('p', null, o.phone));
        if (!contact.children.length) contact.appendChild(el('p', null, 'On your emailed receipt.'));

        orderEl.querySelectorAll('.skeleton').forEach(s => s.classList.remove('skeleton'));
        orderEl.classList.remove('is-loading');
    }
})();
