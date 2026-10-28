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