/**
 * Scroll Animations
 * Intersection Observer for fade-in effects
 */

(function() {
    'use strict';

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll(
        '.observe-fade, .observe-slide-up, .observe-slide-left, .observe-slide-right, .observe-scale, .step-content'
    );

    animatedElements.forEach(el => observer.observe(el));

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Add stagger animation delays
    document.querySelectorAll('.platform-card, .audience-card, .process-step').forEach((el, idx) => {
        el.style.animationDelay = `${idx * 0.1}s`;
    });

})();