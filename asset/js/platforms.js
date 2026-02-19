/**
 * Platform Slider Functionality
 * Infinite horizontal scroll animation
 */

(function() {
    'use strict';

    const sliderTrack = document.getElementById('platformSlider');
    
    if (sliderTrack) {
        // Clone cards for seamless infinite loop
        const cards = sliderTrack.querySelectorAll('.platform-card');
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            sliderTrack.appendChild(clone);
        });

        // Pause animation on hover
        sliderTrack.addEventListener('mouseenter', () => {
            sliderTrack.style.animationPlayState = 'paused';
        });

        sliderTrack.addEventListener('mouseleave', () => {
            sliderTrack.style.animationPlayState = 'running';
        });

        // Pause on touch for mobile
        sliderTrack.addEventListener('touchstart', () => {
            sliderTrack.style.animationPlayState = 'paused';
        });

        sliderTrack.addEventListener('touchend', () => {
            sliderTrack.style.animationPlayState = 'running';
        });
    }

})();