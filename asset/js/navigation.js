/**
 * Enhanced Navigation with Desktop + Mobile/Tablet Drawer
 * Desktop: Full navbar with links in ROW
 * Mobile/Tablet: Drawer navigation in COLUMN
 * Color transition: White in hero section, original color below
 */

(function() {
    'use strict';

    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navDrawer = document.getElementById('navDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const heroSection = document.getElementById('hero');

    // Toggle Drawer
    function toggleDrawer() {
        const isActive = navDrawer.classList.contains('active');
        
        if (isActive) {
            closeDrawer();
        } else {
            openDrawer();
        }
    }

    function openDrawer() {
        mobileMenuToggle.classList.add('active');
        navDrawer.classList.add('active');
        drawerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        mobileMenuToggle.classList.remove('active');
        navDrawer.classList.remove('active');
        drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event Listeners
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleDrawer);
    }

    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', closeDrawer);
    }

    // Close drawer when clicking on navigation links
    const drawerLinks = document.querySelectorAll('.drawer-nav-link');
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeDrawer();
        });
    });

    // Close drawer on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navDrawer.classList.contains('active')) {
            closeDrawer();
        }
    });

    // Combined scroll and hero visibility handling
    function updateNavbarState() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const heroHeight = heroSection ? heroSection.offsetHeight : 0;
        
        // Check if we're in the hero section
        const inHeroSection = scrollTop < heroHeight - 100;
        
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        if (inHeroSection && scrollTop < 50) {
            navbar.classList.add('hero-visible');
        } else {
            navbar.classList.remove('hero-visible');
        }
    }

    // Scroll event listener
    window.addEventListener('scroll', updateNavbarState);
    
    // Initial state
    updateNavbarState();

    // Active link highlighting for both desktop and drawer
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Desktop navigation links
    const desktopLinks = document.querySelectorAll('.nav-links a');
    desktopLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Drawer navigation links
    drawerLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                closeDrawer();
            }
        });
    });

    // Prevent scroll on drawer when open
    if (navDrawer) {
        navDrawer.addEventListener('touchmove', (e) => {
            if (navDrawer.classList.contains('active')) {
                e.stopPropagation();
            }
        }, { passive: false });
    }

    // Close drawer on window resize to desktop size
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && navDrawer.classList.contains('active')) {
            closeDrawer();
        }
        updateNavbarState();
    });

})();