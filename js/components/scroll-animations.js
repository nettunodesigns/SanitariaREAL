document.addEventListener('DOMContentLoaded', () => {
    // Select all elements to be animated on scroll
    const scrollElements = document.querySelectorAll('.animate-on-scroll');

    // Intersection Observer Options
    const observerOptions = {
        root: null, // Watch the viewport
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before the element fully enters viewport
        threshold: 0.15 // 15% of the element needs to be visible
    };

    // The Callback function
    const scrollCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When element enters viewport, add a specific time delay if needed (defined in HTML) 
                // and then add the 'is-visible' class
                entry.target.classList.add('is-visible');
            } else {
                // As requested by user: fade out when scrolling up/out of view
                entry.target.classList.remove('is-visible');
            }
        });
    };

    // Create the Observer instance
    const scrollObserver = new IntersectionObserver(scrollCallback, observerOptions);

    // Start observing elements
    scrollElements.forEach(el => {
        scrollObserver.observe(el);
    });
});
