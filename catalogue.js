/* Catalogue grid. Needs products.js and cart.js loaded first. */
function productUrl(product) {
    return './product.html?id=' + encodeURIComponent(product.id);
}

function buildCard(product) {
    const url = productUrl(product);

    const card = document.createElement('article');
    card.className = 'product-card';

    /* image (links to the product page) + quick add button in the top right */
    const media = document.createElement('div');
    media.className = 'product-media';

    const imgLink = document.createElement('a');
    imgLink.className = 'product-media-link';
    imgLink.href = url;
    imgLink.tabIndex = -1;                 // the name and "Learn more" are the keyboard targets
    imgLink.setAttribute('aria-hidden', 'true');

    const img = document.createElement('img');
    img.src = product.image || PLACEHOLDER_IMG;
    img.alt = '';
    img.loading = 'lazy';
    imgLink.appendChild(img);

    // quantity stepper (below the price) - the cart button adds this amount
    const stepper = makeStepper(product.name, MIN_QTY, () => {});
    // products with options (colour, size...) need a choice, so their cart button opens the product page
    const hasOptions = Array.isArray(product.options) && product.options.length > 0;

    const quickAdd = document.createElement('button');
    quickAdd.type = 'button';
    quickAdd.className = 'quick-add';
    quickAdd.setAttribute('aria-label', (hasOptions ? 'Choose options for ' : 'Add ') + product.name + (hasOptions ? '' : ' to cart'));

    const cartIcon = document.createElement('img');
    cartIcon.src = './images/carticon.webp';
    cartIcon.alt = '';
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

    /* text + learn more */
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
    price.textContent = formatPrice(product.price);

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

document.querySelectorAll('.product-grid').forEach(grid => {
    const items = products.filter(p => p.category === grid.dataset.category);
    items.forEach(p => grid.appendChild(buildCard(p)));
});