document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.testimonials-carousel-wrapper');
    const track = document.querySelector('.carousel-track');
    if (!wrapper || !track) return;

    // Duplicate cards for seamless infinite loop
    const origCards = Array.from(track.children);
    origCards.forEach(card => track.appendChild(card.cloneNode(true)));

    // Switch carousel from scroll to transform-based
    const carousel = document.getElementById('testimonialsCarousel');
    if (carousel) {
        carousel.style.overflow = 'hidden';
        carousel.style.cursor = 'default';
    }
    track.style.willChange = 'transform';

    const SPEED = 0.55; // px per rAF frame (~33px/s at 60fps)
    let offset = 0;
    let isPaused = false;
    let isDragging = false;
    let dragStartY = 0;
    let dragStartOffset = 0;
    let rafId = null;

    function getHalf() {
        return track.scrollHeight / 2;
    }

    function tick() {
        if (!isPaused && !isDragging) {
            offset += SPEED;
            // Seamless reset: at exactly half-height the duplicate starts
            const half = getHalf();
            if (offset >= half) offset -= half;
            track.style.transform = `translateY(-${offset}px)`;
        }
        rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    // Pause on hover
    wrapper.addEventListener('mouseenter', () => { isPaused = true; });
    wrapper.addEventListener('mouseleave', () => {
        isPaused = false;
        isDragging = false;
    });

    // Drag to scrub
    wrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        isPaused = true;
        dragStartY = e.clientY;
        dragStartOffset = offset;
        e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const delta = dragStartY - e.clientY;
        const half = getHalf();
        offset = ((dragStartOffset + delta) % half + half) % half;
        track.style.transform = `translateY(-${offset}px)`;
    });

    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        isPaused = false;
    });

    // Mobile: don't intercept touch at all — carousel auto-scrolls in background,
    // touch events pass through to the page so the user can scroll to the footer.
    if (window.innerWidth > 768) {
        wrapper.addEventListener('touchstart', () => {
            isPaused = true;
            dragStartY = null;
        }, { passive: true });

        wrapper.addEventListener('touchmove', (e) => {
            if (dragStartY === null) {
                dragStartY = e.touches[0].clientY;
                dragStartOffset = offset;
            }
            const delta = dragStartY - e.touches[0].clientY;
            const half = getHalf();
            offset = ((dragStartOffset + delta) % half + half) % half;
            track.style.transform = `translateY(-${offset}px)`;
        }, { passive: true });

        wrapper.addEventListener('touchend', () => {
            dragStartY = null;
            isPaused = false;
        }, { passive: true });
    } else {
        // On mobile the carousel sits in the page flow — make it non-interactive
        // so all touch events scroll the page natively.
        wrapper.style.pointerEvents = 'none';
    }
});
