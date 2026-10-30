(function () {
    const colors = ['#F5F5F5', '#5AC6C3', '#FFC2E2', '#F376A5', '#736CED', '#FDBB49'];
    const shapes = ['dot', 'confetti', 'sparkle'];
    const count = 100; // raise or lower for more or fewer pieces

    const rain = document.createElement('div');
    rain.className = 'rain';
    rain.setAttribute('aria-hidden', 'true');

    for (let i = 0; i < count; i++) {
        const piece = document.createElement('span');
        const dur = 8 + Math.random() * 10; // 8-18s per fall

        piece.className = shapes[Math.floor(Math.random() * shapes.length)];
        piece.style.setProperty('--x', Math.random() * 100 + 'vw');
        piece.style.setProperty('--size', 6 + Math.random() * 10 + 'px');
        piece.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
        piece.style.setProperty('--dur', dur + 's');
        piece.style.setProperty('--delay', -Math.random() * dur + 's'); // negative = already mid-fall on load
        piece.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
        piece.style.setProperty('--spin', (Math.random() * 720 - 360) + 'deg');

        rain.appendChild(piece);
    }

    document.body.prepend(rain);
})();

const track = document.querySelector('.featured-track');
if (track) {
    const copy = track.querySelector('.featured-items').cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    track.appendChild(copy);
    track.classList.add('is-scrolling');
}

/* about us photos: clicking hides the caption */
const canHover = window.matchMedia('(hover: hover)');
document.querySelectorAll('.photo-card').forEach(card => {
    card.addEventListener('click', () => {
        if (canHover.matches) {
            card.classList.add('dismissed');   // mouse: hide until you leave
        } else {
            card.classList.toggle('open');     // touch: tap to show, tap to hide
        }
    });
    card.addEventListener('mouseleave', () => card.classList.remove('dismissed'));
});