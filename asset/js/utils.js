/**
 * Utility Functions
 * Common helper functions used across the site
 */

(function() {
    'use strict';

    // Debounce function for scroll events
    window.debounce = function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Throttle function for resize events
    window.throttle = function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    // Detect if element is in viewport
    window.isInViewport = function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    // Get scroll percentage
    window.getScrollPercentage = function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        return (scrollTop / scrollHeight) * 100;
    };

    // Smooth scroll to element
    window.scrollToElement = function(element, offset = 0) {
        const targetPosition = element.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    };

    // Check if user prefers reduced motion
    window.prefersReducedMotion = function() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    };

    // Get device type
    window.getDeviceType = function() {
        const width = window.innerWidth;
        if (width < 768) return 'mobile';
        if (width < 992) return 'tablet';
        return 'desktop';
    };

    // Format number with commas
    window.formatNumber = function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    // Console welcome message
    console.log(
        '%cHustlersConnect',
        'font-size: 24px; font-weight: bold; color: #2EC4C7; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);'
    );
    console.log(
        '%cTransforming Influence Into Business Power',
        'font-size: 14px; color: #5B3A29; font-style: italic;'
    );
    console.log(
        '%cInterested in working with us? Visit: about.html',
        'font-size: 12px; color: #7B7B7B;'
    );

    // Performance monitoring (development only)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`%cPage Load Time: ${pageLoadTime}ms`, 'color: #2EC4C7; font-weight: bold;');
        });
    }

})();