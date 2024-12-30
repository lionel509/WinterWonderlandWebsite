class FlipCounter {
    constructor(element) {
        this.element = element;
        this.currentValue = 0;
    }

    async updateValue(newValue) {
        if (this.currentValue === newValue) return;
        this.currentValue = newValue;
        this.element.textContent = newValue;
    }
}

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '❅';
    snowflake.style.left = Math.random() * 100 + '%';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';

    const snowContainer = document.querySelector('.snowflakes');
    snowContainer.appendChild(snowflake);

    // Remove snowflake after animation ends
    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
    });
}

// Create snowflakes at regular intervals
setInterval(createSnowflake, 50);

function padNumber(num) {
    return num.toString().padStart(2, '0');
}
async function updateChristmasCountdown() {
    try {
        // Fetch current time from WorldTime API
        const response = await fetch('http://worldtimeapi.org/api/ip');
        const data = await response.json();
        const now = new Date(data.datetime);
        const currentYear = now.getFullYear();
        const christmas = new Date(currentYear, 11, 25); // Month is 0-based, so 11 = December
        
        // If Christmas has passed this year, look to next year
        if (now > christmas) {
            christmas.setFullYear(currentYear + 1);
        }
        
        const diff = christmas - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.querySelector('[data-unit="days"]').textContent = days;
        document.querySelector('[data-unit="hours"]').textContent = padNumber(hours);
        document.querySelector('[data-unit="minutes"]').textContent = padNumber(minutes);
        document.querySelector('[data-unit="seconds"]').textContent = padNumber(seconds);
    } catch (error) {
        console.error('Error fetching time:', error);
        // Fallback to local time if API fails
        updateChristmasCountdownLocal();
    }
}

function updateChristmasCountdownLocal() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const christmas = new Date(currentYear, 11, 25);
    
    if (now > christmas) {
        christmas.setFullYear(currentYear + 1);
    }
    
    const diff = christmas - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.querySelector('[data-unit="days"]').textContent = days;
    document.querySelector('[data-unit="hours"]').textContent = padNumber(hours);
    document.querySelector('[data-unit="minutes"]').textContent = padNumber(minutes);
    document.querySelector('[data-unit="seconds"]').textContent = padNumber(seconds);
}

// Initial update
updateChristmasCountdown();

// Update every second
setInterval(updateChristmasCountdown, 1000);