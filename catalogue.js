/* Catalogue grid. Needs products.js and cart.js loaded first. */
function buildCard(product) {
    const card = document.createElement('article');
    card.className = 'product-card';

    const img = document.createElement('img');
    img.src = product.image || PLACEHOLDER_IMG;
    img.alt = product.name;
    img.loading = 'lazy';

    const info = document.createElement('div');
    info.className = 'product-info';

    const name = document.createElement('h3');
    name.className = 'product-name';
    name.textContent = product.name;

    const price = document.createElement('p');
    price.className = 'product-price';
    price.textContent = formatPrice(product.price);

    const stepper = makeStepper(product.name, MIN_QTY, () => {});

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'add-to-cart';
    button.textContent = 'Add to cart';
    button.setAttribute('aria-label', 'Add ' + product.name + ' to cart');

    let resetTimer;
    button.addEventListener('click', () => {
        const qty = stepper.get();
        addToCart(product.id, qty);
        button.textContent = qty > 1 ? 'Added ' + qty + '!' : 'Added!';
        stepper.set(MIN_QTY);
        button.classList.add('added');
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
            button.textContent = 'Add to cart';
            button.classList.remove('added');
        }, 1200);
    });

    info.append(name, price, stepper.el, button);
    card.append(img, info);
    return card;
}

document.querySelectorAll('.product-grid').forEach(grid => {
    const items = products.filter(p => p.category === grid.dataset.category);
    items.forEach(p => grid.appendChild(buildCard(p)));
});