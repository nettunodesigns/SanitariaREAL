import './components/scroll-animations.js'
import './components/smooth-scroll-guide.js'

document.addEventListener('DOMContentLoaded', () => {
    // General Mobile Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const dropdownTrigger = document.querySelector('.dropdown-trigger');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    dropdownTrigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdownTrigger.parentElement.classList.toggle('dropdown-open');
        }
    });

    // Trigger element animations
    const observeElements = document.querySelectorAll('.animate-on-scroll');
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    observeElements.forEach(el => animateObserver.observe(el));

    // SCROLL SPY LOGIC AND NAVBAR/INDEX VISIBILITY
    const heroSection = document.getElementById('hero');
    const scrollSpyMenu = document.getElementById('scroll-spy-menu');
    const indexToggle = document.getElementById('index-toggle');
    const indexOverlay = document.getElementById('index-overlay');

    const checkIndexToggleVisibility = () => {
        if (heroSection && indexToggle) {
            const heroRect = heroSection.getBoundingClientRect();
            if (heroRect.bottom <= (window.innerHeight / 2)) {
                indexToggle.classList.add('is-visible');
            } else {
                indexToggle.classList.remove('is-visible');
            }
        }
    };

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        checkIndexToggleVisibility();
    });

    checkIndexToggleVisibility();

    if (indexToggle && scrollSpyMenu && indexOverlay) {
        const toggleIndex = () => {
            scrollSpyMenu.classList.toggle('open');
            indexOverlay.classList.toggle('open');
        };

        indexToggle.addEventListener('click', toggleIndex);
        indexOverlay.addEventListener('click', toggleIndex);

        scrollSpyMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                scrollSpyMenu.classList.remove('open');
                indexOverlay.classList.remove('open');
            });
        });
    }

    // Scroll Spy
    const sections = document.querySelectorAll('.step-section');
    const navItems = document.querySelectorAll('.bare-index-list a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navItems.forEach(item => item.classList.remove('active'));
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.bare-index-list a[data-target="${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, { root: null, rootMargin: '-30% 0px -60% 0px', threshold: 0 });

    sections.forEach(section => sectionObserver.observe(section));
});
