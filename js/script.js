document.addEventListener('DOMContentLoaded', () => {
    // Interactive Snowman
    const snowman = document.querySelector('.interactive-snowman img');
    snowman.addEventListener('click', () => {
        alert("Surprise! Happy Holidays!");
        snowman.classList.add('snowman-bounce');
        setTimeout(() => snowman.classList.remove('snowman-bounce'), 1000);
    });

    // Holiday Lights Toggle
    const lights = document.querySelector('.interactive-lights');
    lights.addEventListener('click', () => {
        lights.classList.toggle('lights-on');
        if (lights.classList.contains('lights-on')) {
            alert("Holiday lights are ON!");
        } else {
            alert("Holiday lights are OFF!");
        }
    });

    // Countdown Timer
    const countdown = document.getElementById('countdown-timer');
    const newYear = new Date('January 1, 2024 00:00:00').getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const distance = newYear - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        countdown.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            countdown.textContent = "Happy New Year!";
        }
    }, 1000);
});

// Snow Globe Animation
const snowGlobe = document.querySelector('.snow-globe');
const snowflakes = Array.from({ length: 50 }, (_, i) => {
    const snow = document.createElement('div');
    snow.className = 'snow';
    snow.style.left = `${Math.random() * 100}%`;
    snow.style.animationDelay = `${Math.random() * 5}s`;
    return snow;
});
snowflakes.forEach(snow => snowGlobe.appendChild(snow));

// Fireworks Effect
const fireworkContainer = document.querySelector('.firework-display');
for (let i = 0; i < 20; i++) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.setProperty('--i', i);
    fireworkContainer.appendChild(firework);
}
