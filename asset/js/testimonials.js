/**
 * Testimonials Spiral Animation
 * Circular layout with rotation effect
 */

(function() {
    'use strict';

    const testimonials = [
        { 
            name: "Alex Morgan", 
            position: "CEO, TechVision Inc.", 
            quote: "HustlersConnect transformed our online presence. Their attention to detail and creative approach resulted in a 40% increase in user engagement.", 
            date: "March 15, 2024", 
            avatar: "https://i.pravatar.cc/150?img=1", 
            rating: 5 
        },
        { 
            name: "Samantha Lee", 
            position: "Marketing Director, Bloom & Co.", 
            quote: "The team's ability to blend aesthetics with functionality is exceptional. Our conversion rates improved by 65% after the redesign.", 
            date: "February 28, 2024", 
            avatar: "https://i.pravatar.cc/150?img=5", 
            rating: 5 
        },
        { 
            name: "Marcus Chen", 
            position: "Founder, UrbanApparel", 
            quote: "Working with HustlersConnect was a game-changer. They understood our vision and delivered beyond expectations. Highly recommended!", 
            date: "January 10, 2024", 
            avatar: "https://i.pravatar.cc/150?img=8", 
            rating: 5 
        },
        { 
            name: "Jessica Rivera", 
            position: "Product Manager, NexGen Solutions", 
            quote: "Their implementation is smooth and performant. It added a premium feel to our platform without compromising load times.", 
            date: "December 5, 2023", 
            avatar: "https://i.pravatar.cc/150?img=11", 
            rating: 5 
        },
        { 
            name: "David Kim", 
            position: "Creative Director, Visionary Media", 
            quote: "The collaborative process was seamless. HustlersConnect took our complex requirements and turned them into an elegant solution.", 
            date: "November 18, 2023", 
            avatar: "https://i.pravatar.cc/150?img=14", 
            rating: 4.5 
        },
        { 
            name: "Olivia Parker", 
            position: "CEO, Artisan Coffee Co.", 
            quote: "From concept to launch, the team was professional and innovative. Our e-commerce site now reflects our brand perfectly.", 
            date: "October 30, 2023", 
            avatar: "https://i.pravatar.cc/150?img=19", 
            rating: 5 
        }
    ];

    const container = document.getElementById('testimonialSpiral');
    
    if (!container) return;

    // Create testimonial cards
    testimonials.forEach((t, idx) => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.dataset.index = idx;

        // Generate star rating
        let stars = '';
        const full = Math.floor(t.rating);
        const half = t.rating % 1 !== 0;
        for (let i = 0; i < full; i++) stars += '<i class="fas fa-star"></i>';
        if (half) stars += '<i class="fas fa-star-half-alt"></i>';
        for (let i = 0; i < 5 - Math.ceil(t.rating); i++) stars += '<i class="far fa-star"></i>';

        card.innerHTML = `
            <div class="testimonial-header">
                <img src="${t.avatar}" alt="${t.name}" class="testimonial-avatar">
                <div class="testimonial-info">
                    <h4>${t.name}</h4>
                    <p>${t.position}</p>
                </div>
            </div>
            <div class="testimonial-quote">${t.quote}</div>
            <div class="testimonial-footer">
                <div class="testimonial-rating">${stars}</div>
                <div class="testimonial-date">${t.date}</div>
            </div>
        `;
        
        container.appendChild(card);
    });

    // Spiral animation logic
    const cards = document.querySelectorAll('.testimonial-card');
    let angle = 0;
    let animationId = null;
    let isAnimating = true;

    function updateSpiral() {
        const rect = container.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        cards.forEach((card, i) => {
            const radius = 100 + i * 40;
            const theta = angle + i * 0.5;
            const x = Math.cos(theta) * radius + centerX - card.offsetWidth / 2;
            const y = Math.sin(theta) * radius + centerY - card.offsetHeight / 2;
            
            card.style.transform = `translate(${x}px, ${y}px) rotate(${theta * 2}deg)`;
            card.classList.add('active');
        });

        angle += 0.005;
        if (isAnimating) animationId = requestAnimationFrame(updateSpiral);
    }

    // Start animation after a short delay
    setTimeout(() => {
        if (isAnimating) updateSpiral();
    }, 100);

    // Control buttons
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const pauseBtn = document.getElementById('pauseTestimonial');

    if (pauseBtn) {
        pauseBtn.addEventListener('click', function() {
            isAnimating = !isAnimating;
            
            if (isAnimating) {
                this.innerHTML = '<i class="fas fa-pause"></i>';
                this.classList.add('playing');
                updateSpiral();
            } else {
                this.innerHTML = '<i class="fas fa-play"></i>';
                this.classList.remove('playing');
                if (animationId) cancelAnimationFrame(animationId);
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            angle -= 0.5;
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            angle += 0.5;
        });
    }

})();