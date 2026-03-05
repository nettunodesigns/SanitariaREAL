class AnimatedGridPattern {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.width = options.width || 40;
        this.height = options.height || 40;
        this.numSquares = options.numSquares || 30;
        this.maxOpacity = options.maxOpacity || 0.15;
        this.duration = options.duration || 3;
        this.strokeColor = options.strokeColor || "rgba(223, 233, 215, 0.15)";
        this.fillColor = options.fillColor || "rgba(223, 233, 215, 1)";
        
        this.dimensions = { width: 0, height: 0 };
        this.squaresGroup = null;
        this.init();
    }

    init() {
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.setAttribute("aria-hidden", "true");
        this.svg.setAttribute("class", "animated-grid-svg");
        this.svg.style.width = "100%";
        this.svg.style.height = "100%";
        this.svg.style.position = "absolute";
        this.svg.style.inset = "0";

        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        const pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
        pattern.setAttribute("id", "grid-pattern-def");
        pattern.setAttribute("width", this.width);
        pattern.setAttribute("height", this.height);
        pattern.setAttribute("patternUnits", "userSpaceOnUse");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M.5 ${this.height}V.5H${this.width}`);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", this.strokeColor);
        path.setAttribute("stroke-width", "1");

        pattern.appendChild(path);
        defs.appendChild(pattern);
        this.svg.appendChild(defs);

        const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bgRect.setAttribute("width", "100%");
        bgRect.setAttribute("height", "100%");
        bgRect.setAttribute("fill", "url(#grid-pattern-def)");
        this.svg.appendChild(bgRect);

        this.squaresGroup = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.squaresGroup.style.overflow = "visible";
        this.svg.appendChild(this.squaresGroup);

        this.container.appendChild(this.svg);

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                this.dimensions.width = entry.contentRect.width;
                this.dimensions.height = entry.contentRect.height;
                this.updateSquares();
            }
        });
        resizeObserver.observe(this.container);
    }

    getPos() {
        return [
            Math.floor((Math.random() * this.dimensions.width) / this.width),
            Math.floor((Math.random() * this.dimensions.height) / this.height)
        ];
    }

    updateSquares() {
        if (!this.dimensions.width || !this.dimensions.height) return;
        while(this.squaresGroup.firstChild) {
            this.squaresGroup.removeChild(this.squaresGroup.firstChild);
        }
        for (let i = 0; i < this.numSquares; i++) {
            this.createSquare(i);
        }
    }

    createSquare(index) {
        const [x, y] = this.getPos();

        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width", this.width - 1);
        rect.setAttribute("height", this.height - 1);
        rect.setAttribute("x", x * this.width + 1);
        rect.setAttribute("y", y * this.height + 1);
        rect.setAttribute("fill", this.fillColor);
        rect.style.opacity = "0";

        this.squaresGroup.appendChild(rect);
        this.animateSquare(rect, index);
    }

    animateSquare(rect, index) {
        const initialDelay = index === 0 ? 0 : Math.random() * 2000;
        
        setTimeout(() => {
            if (!this.container.isConnected) return;

            const animation = rect.animate([
                { opacity: 0 },
                { opacity: this.maxOpacity },
                { opacity: 0 }
            ], {
                duration: this.duration * 2000, 
                easing: "ease-in-out",
                iterations: 1
            });

            animation.onfinish = () => {
                const [newX, newY] = this.getPos();
                rect.setAttribute("x", newX * this.width + 1);
                rect.setAttribute("y", newY * this.height + 1);
                this.animateSquare(rect, 0); 
            };
        }, initialDelay);
    }
}
window.AnimatedGridPattern = AnimatedGridPattern;
