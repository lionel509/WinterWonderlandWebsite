// script.test.js

import { fireEvent, render } from '@testing-library/dom';
import './script.js'; // Assuming script.js is imported for testing

describe('Interactive Holiday Website', () => {
    let snowman, lights, countdown;

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="interactive-snowman">
                <img src="snowman.png" alt="Snowman" />
            </div>
            <div class="interactive-lights"></div>
            <div id="countdown-timer"></div>
        `;
        snowman = document.querySelector('.interactive-snowman img');
        lights = document.querySelector('.interactive-lights');
        countdown = document.getElementById('countdown-timer');
    });

    test('Snowman click triggers alert and bounce effect', () => {
        jest.spyOn(window, 'alert').mockImplementation(() => {});
        fireEvent.click(snowman);
        expect(window.alert).toHaveBeenCalledWith("Surprise! Happy Holidays!");
        expect(snowman.classList.contains('snowman-bounce')).toBe(true);
    });

    test('Lights toggle functionality', () => {
        jest.spyOn(window, 'alert').mockImplementation(() => {});
        fireEvent.click(lights);
        expect(lights.classList.contains('lights-on')).toBe(true);
        expect(window.alert).toHaveBeenCalledWith("Holiday lights are ON!");

        fireEvent.click(lights);
        expect(lights.classList.contains('lights-on')).toBe(false);
        expect(window.alert).toHaveBeenCalledWith("Holiday lights are OFF!");
    });

    test('Countdown timer updates correctly', () => {
        jest.useFakeTimers();
        const newYear = new Date('January 1, 2024 00:00:00').getTime();
        
        jest.advanceTimersByTime(1000);
        const now = new Date().getTime();
        const distance = newYear - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        expect(countdown.textContent).toBe(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        
        jest.advanceTimersByTime(distance + 1000);
        expect(countdown.textContent).toBe("Happy New Year!");
    });
});