export function createFireworks() {
    const fireworkContainer = document.querySelector('.firework-display');
    for (let i = 0; i < 20; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.setProperty('--i', i);
        fireworkContainer.appendChild(firework);
    }
}