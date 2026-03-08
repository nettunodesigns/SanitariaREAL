document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // Testimonials Carousel Animation and Drag Logic
    // ----------------------------------------------------------------------
    const carousel = document.getElementById('testimonialsCarousel');
    if (!carousel) return;

    let isDown = false;
    let startY;
    let scrollTop;

    // Auto Scroll variables
    let autoScrollInterval;
    const scrollAmount = 1; // Pixels per frame
    let lastTime = 0;
    let hoverState = false;

    // Duplicating check
    // If the content is shorter than the container, we might not have a seamless loop.
    // Ensure we have enough children to scroll endlessly.
    const track = carousel.querySelector('.carousel-track');

    // Auto-scroll loop using requestAnimationFrame for smoothness
    function autoScroll(timestamp) {
        if (!hoverState && !isDown) {
            carousel.scrollTop += scrollAmount;

            // Check if we've scrolled half the content (due to the duplication in HTML)
            // If so, reset back to top instantly for seamless infinite scroll
            if (carousel.scrollTop >= (track.scrollHeight / 2)) {
                carousel.scrollTop = 0;
            }
        }
        autoScrollInterval = requestAnimationFrame(autoScroll);
    }

    // Start auto scroll
    autoScrollInterval = requestAnimationFrame(autoScroll);

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        hoverState = true;
    });

    // Resume on leave
    carousel.addEventListener('mouseleave', () => {
        hoverState = false;
        isDown = false; // also release drag if mouse leaves
    });

    // --- Drag to Scroll Logic ---
    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        hoverState = true; // pause auto scroll
        startY = e.pageY - carousel.offsetTop;
        scrollTop = carousel.scrollTop;
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        hoverState = false; // resume auto scroll
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const y = e.pageY - carousel.offsetTop;
        const walk = (y - startY) * 2; // Scroll fast
        carousel.scrollTop = scrollTop - walk;
    });

    // Handle touch events for mobile
    carousel.addEventListener('touchstart', (e) => {
        isDown = true;
        hoverState = true;
        startY = e.touches[0].pageY - carousel.offsetTop;
        scrollTop = carousel.scrollTop;
    });

    carousel.addEventListener('touchend', () => {
        isDown = false;
        hoverState = false;
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const y = e.touches[0].pageY - carousel.offsetTop;
        const walk = (y - startY) * 2;
        carousel.scrollTop = scrollTop - walk;
    });
});
