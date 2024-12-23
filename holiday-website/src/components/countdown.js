// countdown.js

export function startCountdown() {
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
}