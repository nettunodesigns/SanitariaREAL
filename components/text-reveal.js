document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.statement-section');
    const lineElements = document.querySelectorAll('.statement-line');

    if (!section || lineElements.length === 0) return;

    let wordElements = [];

    lineElements.forEach(lineEl => {
        const text = lineEl.textContent.trim();
        if (!text) return;
        const words = text.split(/\s+/);
        lineEl.innerHTML = '';

        words.forEach(word => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'reveal-word';

            const bgSpan = document.createElement('span');
            bgSpan.className = 'word-bg';
            bgSpan.textContent = word;

            const fgSpan = document.createElement('span');
            fgSpan.className = 'word-fg';
            fgSpan.textContent = word;

            wordSpan.appendChild(bgSpan);
            wordSpan.appendChild(fgSpan);

            lineEl.appendChild(wordSpan);
            wordElements.push(fgSpan);
        });
    });

    const updateScroll = () => {
        const scrollStart = section.offsetTop;
        const scrollEnd = scrollStart + section.offsetHeight - window.innerHeight;

        // Prevent division by zero if section isn't scrollable for some reason
        const scrollRange = Math.max(1, scrollEnd - scrollStart);

        let progress = (window.scrollY - scrollStart) / scrollRange;
        progress = Math.max(0, Math.min(1, progress));

        wordElements.forEach((fgSpan, i) => {
            const start = i / wordElements.length;
            const end = start + (1 / wordElements.length);

            let wordProgress = (progress - start) / (end - start);
            wordProgress = Math.max(0, Math.min(1, wordProgress));

            fgSpan.style.opacity = wordProgress;
        });
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll, { passive: true });
    // Run once on load
    setTimeout(updateScroll, 50);
});
