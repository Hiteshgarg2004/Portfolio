// script.js (rewritten)
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const navLinksContainer = document.querySelector('.nav-links');
    const sections = document.querySelectorAll('.section');
    const navbarHeight = navbar.offsetHeight;

    // Smooth scrolling for navigation links using event delegation
    navLinksContainer.addEventListener('click', (e) => {
        if (e.target.matches('.nav-links a:not(.btn)')) {
            e.preventDefault();

            const targetId = e.target.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - navbarHeight,
                    behavior: 'smooth'
                });
            }
        }
    });

    // Add 'scrolled' class to navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null, // viewport as the root
        rootMargin: '0px',
        threshold: 0.15 // 15% of the section must be visible to trigger
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});
