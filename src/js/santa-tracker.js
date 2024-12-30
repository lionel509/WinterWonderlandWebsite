const santaRoute = [
    { city: "Christmas Island", timezone: "Pacific/Kiritimati", order: 1 },
    { city: "Auckland, New Zealand", timezone: "Pacific/Auckland", order: 2 },
    { city: "Sydney, Australia", timezone: "Australia/Sydney", order: 3 },
    { city: "Tokyo, Japan", timezone: "Asia/Tokyo", order: 4 },
    { city: "Beijing, China", timezone: "Asia/Shanghai", order: 5 },
    { city: "Moscow, Russia", timezone: "Europe/Moscow", order: 6 },
    { city: "Paris, France", timezone: "Europe/Paris", order: 7 },
    { city: "London, UK", timezone: "Europe/London", order: 8 },
    { city: "New York, USA", timezone: "America/New_York", order: 9 },
    { city: "Los Angeles, USA", timezone: "America/Los_Angeles", order: 10 },
    { city: "Hawaii, USA", timezone: "Pacific/Honolulu", order: 11 }
];

async function updateSantaLocation() {
    try {
        const response = await fetch('http://worldtimeapi.org/api/ip');
        const data = await response.json();
        const now = new Date(data.datetime);
        
        // On Christmas Eve
        if (now.getMonth() === 11 && now.getDate() === 24) {
            const hour = now.getUTCHours();
            const currentStop = santaRoute.find((location, index) => {
                return hour >= (22 - index) && hour < (23 - index);
            });

            if (currentStop) {
                document.getElementById('current-location').textContent = currentStop.city;
                const nextStop = santaRoute[currentStop.order] || "North Pole";
                document.getElementById('next-stop').textContent = nextStop.city || "North Pole";
                document.getElementById('gifts-delivered').textContent = 
                    Math.floor(((currentStop.order - 1) / santaRoute.length) * 2000000000);
            } else {
                document.getElementById('current-location').textContent = "Preparing at North Pole";
                document.getElementById('next-stop').textContent = santaRoute[0].city;
            }
        } else {
            document.getElementById('current-location').textContent = "North Pole";
            document.getElementById('next-stop').textContent = "Preparing for Christmas Eve";
        }
    } catch (error) {
        console.error('Error updating Santa location:', error);
    }
}

// Update every minute
setInterval(updateSantaLocation, 60000);
updateSantaLocation();

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function updateSantaDisplay() {
    const currentLocation = document.getElementById('current-location');
    const nextStop = document.getElementById('next-stop');
    const giftsDelivered = document.getElementById('gifts-delivered');

    currentLocation.textContent = "North Pole";
    nextStop.textContent = "Preparing for Christmas 2025";
    animateValue(giftsDelivered, 0, 8197042464, 2000);
}

// Call when page loads
document.addEventListener('DOMContentLoaded', updateSantaDisplay);