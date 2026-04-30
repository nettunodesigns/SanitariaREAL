document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('testimonialsCarousel');
    if (!carousel) return;

    let rafId = null;
    let restartTimer = null;
    let isPaused = false;
    let isTouching = false;
    const SCROLL_SPEED = 1;
    const RESTART_DELAY = 2200;

    function getScrollMax() {
        return carousel.scrollHeight - carousel.clientHeight;
    }

    function tick() {
        if (!isPaused && !isTouching) {
            carousel.scrollTop += SCROLL_SPEED;

            if (carousel.scrollTop >= getScrollMax() - 2) {
                rafId = null;
                restartTimer = setTimeout(() => {
                    carousel.scrollTop = 0;
                    rafId = requestAnimationFrame(tick);
                }, RESTART_DELAY);
                return;
            }
        }
        rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    carousel.addEventListener('mouseenter', () => { isPaused = true; });
    carousel.addEventListener('mouseleave', () => {
        isPaused = false;
        if (!rafId && !isTouching) rafId = requestAnimationFrame(tick);
    });

    let startY, scrollTopOnStart;
    carousel.addEventListener('mousedown', (e) => {
        isPaused = true;
        startY = e.pageY - carousel.offsetTop;
        scrollTopOnStart = carousel.scrollTop;
    });
    carousel.addEventListener('mouseup', () => {
        isPaused = false;
        if (!rafId) rafId = requestAnimationFrame(tick);
    });
    carousel.addEventListener('mousemove', (e) => {
        if (!isPaused) return;
        e.preventDefault();
        carousel.scrollTop = scrollTopOnStart - (e.pageY - carousel.offsetTop - startY) * 2;
    });

    // Mobile: pause auto-scroll on touch, let browser scroll natively.
    // No touchmove override — browser propagates scroll to page at the natural boundary.
    carousel.addEventListener('touchstart', () => {
        isTouching = true;
        if (restartTimer) { clearTimeout(restartTimer); restartTimer = null; }
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    }, { passive: true });

    carousel.addEventListener('touchend', () => {
        isTouching = false;
        restartTimer = setTimeout(() => {
            if (carousel.scrollTop >= getScrollMax() - 2) {
                carousel.scrollTop = 0;
            }
            rafId = requestAnimationFrame(tick);
        }, RESTART_DELAY);
    }, { passive: true });
});
