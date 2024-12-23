// lights.js
export function toggleLights() {
    const lights = document.querySelector('.interactive-lights');
    lights.addEventListener('click', () => {
        lights.classList.toggle('lights-on');
        if (lights.classList.contains('lights-on')) {
            alert("Holiday lights are ON!");
        } else {
            alert("Holiday lights are OFF!");
        }
    });
}