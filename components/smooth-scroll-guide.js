// Custom Smooth Scroll Snapping for Desktop
if (window.innerWidth > 1024) {
    const snapSections = Array.from(document.querySelectorAll('.fullscreen-hero, .fullscreen-section, .site-footer'));
    let isSnapping = false;
    let scrollTimeout = null;

    window.addEventListener('wheel', (e) => {
        if (isSnapping) {
            e.preventDefault();
            return;
        }

        // Only hijack scroll if we are mostly perfectly snapped to a section
        const currentScroll = window.scrollY;
        let currentIndex = snapSections.findIndex(sec => {
            return Math.abs(sec.getBoundingClientRect().top) < 50;
        });

        // If we aren't currently snapped to anything (freely scrolling nearby), let native scroll handle it until it stops
        if (currentIndex !== -1) {
            const direction = e.deltaY > 0 ? 1 : -1;
            const nextIndex = currentIndex + direction;

            if (nextIndex >= 0 && nextIndex < snapSections.length) {
                e.preventDefault(); // Stop native harsh scroll
                isSnapping = true;

                // Calculate exact absolute position of the target section
                const targetSection = snapSections[nextIndex];
                const targetScrollPosition = targetSection.getBoundingClientRect().top + window.scrollY;

                // Trigger a smooth scroll
                window.scrollTo({
                    top: targetScrollPosition,
                    behavior: 'smooth'
                });

                // Wait for smooth scroll to finish before allowing another wheel event
                // Typical browser smooth scroll takes ~600-800ms
                setTimeout(() => {
                    isSnapping = false;
                }, 800);
            }
        }
    }, { passive: false });
}
