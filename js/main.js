import AnimatedGridPattern from './components/animated-grid.js'
import './components/testimonials-carousel.js'
import './components/text-reveal.js'
import './components/scroll-animations.js'
import { animate } from 'motion'

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Animated Grid
    new AnimatedGridPattern('grid-pattern-container', {
        numSquares: 80,
        maxOpacity: 0.2,
        duration: 3,
        strokeColor: "rgba(223, 233, 215, 0.4)",
        fillColor: "rgba(223, 233, 215, 1)"
    });

    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const dropdownTrigger = document.querySelector('.dropdown-trigger');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    // Handle Mobile Accordion Dropdown
    dropdownTrigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdownTrigger.parentElement.classList.toggle('dropdown-open');
        }
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Esempio d'uso di motion — puoi modificare o rimuovere questa parte
// animate('.hero', { opacity: [0, 1] }, { duration: 1 })
