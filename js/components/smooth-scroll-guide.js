if (window.innerWidth > 1024) {
    const snapSections = Array.from(document.querySelectorAll('.fullscreen-hero, .fullscreen-section, .site-footer'));
    let isSnapping = false;
    let snapBackTimeout = null;

    function getNearestSection() {
        let minDist = Infinity;
        let nearestIdx = 0;
        snapSections.forEach((sec, i) => {
            const dist = Math.abs(sec.getBoundingClientRect().top);
            if (dist < minDist) { minDist = dist; nearestIdx = i; }
        });
        return { index: nearestIdx, dist: minDist };
    }

    function snapToIndex(index) {
        if (index < 0 || index >= snapSections.length) return;
        isSnapping = true;
        const top = snapSections[index].getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: 'smooth' });
        // Release lock only after smooth scroll settles
        setTimeout(() => { isSnapping = false; }, 900);
    }

    // Wheel: guide to adjacent section when already snapped
    window.addEventListener('wheel', (e) => {
        if (isSnapping) { e.preventDefault(); return; }

        const { index, dist } = getNearestSection();

        if (dist < 50) {
            const direction = e.deltaY > 0 ? 1 : -1;
            const next = index + direction;
            if (next >= 0 && next < snapSections.length) {
                e.preventDefault();
                snapToIndex(next);
            }
        }
        // Not snapped (e.g. after scrollbar drag) — let native scroll run,
        // the scroll listener below will snap back when scrolling stops.
    }, { passive: false });

    // Recovery: re-snap after scrollbar drag, keyboard scroll, or any free scroll
    window.addEventListener('scroll', () => {
        if (isSnapping) return;

        clearTimeout(snapBackTimeout);
        snapBackTimeout = setTimeout(() => {
            if (isSnapping) return;
            const { index, dist } = getNearestSection();
            // Snap if stopped within 60% of viewport from nearest section
            // but not if already perfectly aligned (dist < 2) to avoid loops
            if (dist > 2 && dist < window.innerHeight * 0.6) {
                snapToIndex(index);
            }
        }, 150);
    });
}
