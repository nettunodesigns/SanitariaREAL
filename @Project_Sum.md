# Sanitaria Croce — Project Summary

## Project Overview
**Sanitaria Croce** is a modern website for a medical supply store specializing in orthopedic products, medical devices, cushions, and cosmetics for the elderly and those with mobility challenges. The site is built with **Vite + vanilla HTML/CSS/JS** (no frameworks) and features responsive design, smooth animations, and an extensive product catalog.

**URL:** `http://192.168.1.23:5173` (local dev)  
**Stack:** Vite, HTML5, CSS3 (with CSS custom properties), vanilla JavaScript, Motion.js  
**Primary Contact:** Puccetti Silvia (Owner)

---

## Latest Session Work (2026-05-04)

### 1. **Product Section Images** — WebP Conversion (Complete)
Converted all 49 PNGs in `NONCENTRA/` to WebP via sharp (quality 82) → `assets/sections/`.

| Before | After | Reduction |
|--------|-------|-----------|
| 23 MB (49 PNGs) | 2 MB (49 WebPs) | **91%** |

- All 5 product pages updated: `NONCENTRA/*.png` → `/assets/sections/*.webp`
- `NONCENTRA/` folder remains on disk (untracked) as originals

---

### 2. **SEO** — Full Meta Stack on All 8 Pages (Complete)
Added to every page:
- `<meta name="description">` — unique, keyword-rich per page (150-160 chars)
- `<meta name="keywords">` — local + product terms
- `<meta name="robots" content="index, follow">`
- `<link rel="canonical">` — prevents duplicate content penalties
- **Open Graph** (og:title, og:description, og:image, og:url, og:type, og:locale)
- **Twitter Card** meta
- **JSON-LD `MedicalBusiness` schema** on index.html and contatti.html (name, address, phone, email, hours, geo)
- Trimmed all titles to ≤60 chars for Google SERP (format: `Keyword | Sanitaria Croce`)

New files: `robots.txt`, `sitemap.xml` (all 8 pages with priorities)

> Domain placeholder: `sanitariacroce.it` — swap when production domain is set.

---

### 3. **Favicon** — Generated from Logo (Complete)
Converted `assets/logos/Logo_Mamma_Standard.svg` via sharp:

| File | Size | Use |
|------|------|-----|
| `favicon.ico` | 32×32 | Legacy browser fallback (root) |
| `favicon-16x16.png` | 16×16 | Browser tab small |
| `favicon-32x32.png` | 32×32 | Browser tab HiDPI |
| `apple-touch-icon.png` | 180×180 | iOS home screen |
| `android-chrome-192x192.png` | 192×192 | Android / PWA |
| `android-chrome-512x512.png` | 512×512 | PWA splash |

All 8 pages wired with `<link rel="icon">` (SVG first for modern browsers, PNG fallbacks, `.ico` last).

---

### 4. **Sticky Index Overflow Fix** (Complete)
Long section names (e.g. "Ginocchiere, Polsiere & Cavigliere") were bleeding into the viewport when the index panel was closed.

**Root cause:** `position: fixed` panels are not clipped by `overflow-x: clip` on `body`.

**Fix (`css/style.css`):**
- Replaced `left: -400px` → `transform: translateX(-100%)` — hides exactly 100% of the panel's own width regardless of content
- Added `overflow: hidden` to panel — clips any text exceeding 350px box
- Mobile override (`transform: none`, `top: -100%`) unaffected

---

## Previous Session Work (2026-05-03)

### 1. **Real Product Images** — Placeholders Replaced (Complete)
Replaced all `[Placeholder Immagine: ...]` divs with actual product images from the `NONCENTRA/` folder across all 5 product pages.

**Mapping (37 images total):**

| Page | Sections | Images Used |
|------|----------|-------------|
| `ausili.html` | 8 | materassi, deambulatori, carrozzine, sedie, stampelle, sponde, pigiami, pannoloni |
| `creme.html` | 4 | arnica, detergenti, artiglio, viso |
| `cuscini.html` | 9 | alzagambe, memory, divaricatori, antidec, prostata, emorroidi, carrozzine, coprimat, lettino |
| `elettromedicali.html` | 8 | magneto, tens, presso, ultra, kinetec, pedaliere, ecg, misuratori |
| `ortopedici.html` | 8 | busti, ginocchiere, calze, tutori, plantari, piedi, stetoscopio, traverse |

**Implementation:**
- Kept `.image-placeholder` wrapper div to preserve the animated glowing border
- Added `img` inside with `position: absolute; inset: 0; object-fit: cover; border-radius: 18px`
- Added CSS rule `.image-placeholder img { ... }` to `css/style.css`
- All imgs use `loading="lazy"` for performance
- Images served from `NONCENTRA/` folder (root-level)

**Unmapped images** (secondary products within multi-item sections — available for future use):
- `ausili_bastoni`, `ausili_prod_letto`, `ausili_accessori_demenza`, `ausili_guanti`
- `orto_polsiere`, `orto_cavigliere`, `orto_slip`, `orto_ciabatte`, `orto_otoscopi`, `orto_bilance_persone`, `orto_bilance_neonati`, `orto_termofori`

---

### 2. **Critical Performance Fix** — WebP Conversion + Hero Optimization (Complete)

**Root cause:** `bgHERO_neck.png` was **31.3 MB** — browser had to download and decode it before first render.

**Conversions (via sharp @ quality 82):**

| File | Before | After | Reduction |
|------|--------|-------|-----------|
| `bgHERO_neck.png` | 31.3 MB | 0.41 MB | **75x smaller** |
| `bgHero_hip.png` | 1.6 MB | 0.07 MB | 23x |
| `bgHERO_knee.png` | 1.6 MB | 0.06 MB | 27x |
| 5× product cat PNGs | ~0.5 MB each | ~0.04 MB each | ~13x |
| **Total** | **~37 MB** | **~1 MB** | **37x** |

**Additional optimizations:**
- `<link rel="preload">` for first hero image (highest fetch priority)
- Hero slides 2 & 3 deferred via `data-bg` + `window.load` JS — don't block initial render
- `numSquares: 80 → 40` in animated grid (halved GPU animation load)
- All `.html` files updated to reference `.webp` instead of `.png`
- `sharp` installed as devDependency

---

## Previous Session Work (2026-04-30)

### 1. **Inventario Page** — New Product Showcase (Complete)
Created a full-featured inventory/catalog page showcasing all 67 products from `/assets/gallery`.

**Features Implemented:**
- **Product Categories:** 5 auto-grouping categories
  - Ortopedici (20 products)
  - Ausili & Mobilità (20 products)
  - Cuscini & Posturali (12 products)
  - Elettromedicali (6 products)
  - Cosmetica & Linee (9 products)

- **Smart Search Bar:** Multi-token AND matching across product name, brand, category, tags, and description. Debounced 120ms for performance.

- **Category Filter Chips:** Toggle between "Tutti" and specific categories with live count badges.

- **Product Grid:** Responsive 3-column grid (desktop) → 2-column (tablet) → 1-column (mobile). Cards show brand, product name, and first 3 tags.

- **Hover Effects:** Card lift (-4px) with border highlight, image scale (1.06x), box shadow enhancement.

- **Click-to-Modal:** Opens a 2-column modal (60/40 split on desktop) with full product image, brand, category badge, complete description, and all tags. Modal includes CTA button linking to Contatti page.

- **UX Details:** Empty state messaging, mobile `pointer-events: none` on wrapper, keyboard accessible (Enter/Space opens modal, Escape closes), modal close via X, backdrop click, or Esc.

**Files Added:** `inventario.html`, `js/inventario.js`, `css/inventario.css`  
**Navigation:** "Inventario" link added to all 8 pages in main nav dropdown.

---

### 2. **Testimonials Carousel Fix** — Smooth Infinite Loop (Fixed)
Replaced buggy `scrollTop` scroll manipulation with hardware-accelerated `transform: translateY`.
- Duplicated all carousel cards in JS during init
- Use `transform: translateY(-offset)` on `.carousel-track`
- When `offset >= halfHeight`, reset to `0` — imperceptible because both halves are identical
- Desktop: Hover pauses animation, drag-to-scrub works
- Mobile: `pointer-events: none` so vertical swipe scrolls page

---

### 3. **Google Maps Mobile Fix** (Fixed)
- Override `.map-display` to `display: block`
- Set explicit `min-height: 500px` (desktop) and `360px` (mobile)
- iframe inherits `height: 100%` and fills the container

---

### 4. **Global Updates** (Complete)
- CTA buttons standardized to "Richiedi Informazioni" → `contatti.html`, class `primary-cta`
- Instagram URL updated to `https://www.instagram.com/puccetti.silvia/` across all 8 pages
- Facebook icon + link added to footer on all 8 pages

---

### 5. **Product Cleanup** (Minor)
Deleted 2 redundant product cards from Inventario (Vista 2 & 3 of Orthoself).  
**Result:** 65 products total.

---

## Current Site Structure

### Pages
1. **index.html** — Landing page: hero slider, statement, products accordion, brand marquee, testimonials carousel, footer
2. **ortopedici.html** — 8 sections: busti, ginocchiere, calze, tutori, plantari, piedi, diagnostici, traverse
3. **ausili.html** — 8 sections: materassi, deambulatori, carrozzine, sedie, stampelle, sponde, abbigliamento, prodotti igienici
4. **cuscini.html** — 9 sections: alzagambe, memory foam, divaricatori, antidecubito, prostata, emorroidi, carrozzine, coprimaterassi, lettino
5. **elettromedicali.html** — 8 sections: magnetoterapia, elettrostimolatori, pressoterapia, ultrasuoni, kinetec, pedaliere, ECG, pressione
6. **creme.html** — 4 sections: arnica, detergenti, artiglio diavolo, collagene
7. **contatti.html** — Contact page: phone, email, location (maps), hours
8. **inventario.html** — Complete product catalog with search and filtering

### Asset Structure
```
assets/
├── logos/        Logo_Mamma_Standard.svg, favicon-*.png, apple-touch-icon.png, android-chrome-*.png
├── hero/         bgHERO_neck.webp, bgHero_hip.webp, bgHERO_knee.webp  ← WebP
├── products/     cat_*.webp  ← WebP
├── brands/       brand logos
├── gallery/      product gallery images (used by inventario.js)
└── sections/     49× product section images as WebP  ← NEW (was NONCENTRA/*.png)
favicon.ico       root-level legacy fallback
robots.txt        allows all bots, points to sitemap
sitemap.xml       all 8 pages with priorities
NONCENTRA/        original PNGs (untracked, kept as backup)
```

### Styling & Design System
- **Colors:** Deep green (#22392b), soft green (#52906dbc), dark background (#121212), white text
- **Typography:** Montserrat (primary), Inter (UI), Playfair Display (secondary), Anton (display)
- **Responsiveness:** Mobile-first, breakpoints at 768px and 1024px
- **Animations:** CSS transitions, Motion.js for hero slider, custom carousel
- **Icons:** Feather icons (SVG inline)

---

## Technical Notes

### Performance (Post-Fix)
- Hero images converted to WebP: ~37MB total → ~1MB total
- First hero preloaded via `<link rel="preload">`
- Hero slides 2 & 3 deferred until `window.load`
- Animated grid: 80 squares → 40 squares
- Lazy loading on all product section images (`loading="lazy"`)
- Hardware acceleration via `transform` and `opacity`
- Debounced search input (120ms)

### Image Placeholder System
`.image-placeholder` wrapper preserved for animated glowing border (`::before` conic gradient).  
CSS rule `.image-placeholder img` fills it: `position: absolute; inset: 0; object-fit: cover; border-radius: 18px`.

### Accessibility
- Semantic HTML (header, nav, main, footer, article)
- `aria-label` on all interactive elements
- Keyboard navigation: Enter/Space to open modals, Escape to close
- Alt text on all images

---

## Next Steps / Future Enhancements

1. **Update production domain** — replace `sanitariacroce.it` placeholder in canonical/OG/sitemap/JSON-LD once hosting is set
2. **Analytics:** Google Analytics or Plausible
3. **Contact Form:** Working form with backend integration
4. **Product Filtering:** Price range, brand filters, sorting (A-Z)
5. **Multi-language / i18n structure**
6. **Chat Widget:** Live chat during business hours
7. **SSL/HTTPS** for hosting
8. **Submit sitemap** to Google Search Console after going live

---

## Deployment Notes

**Current Dev Environment:**
- Local: `http://192.168.1.23:5173`
- Git Repository: `https://github.com/nettunodesigns/SanitariaREAL.git`
- Build Command: `npm run build`
- Preview Command: `npm run preview`

**Files to Update Before Production:**
- Ensure all links point to correct production domain
- Test contact form backend
- Update analytics tracking IDs
- Review meta tags and OG images

---

## Session Statistics (2026-05-03)

- **Files Modified:** 11 (ausili, creme, cuscini, elettromedicali, ortopedici, index, css/style.css + 4 via `.png → .webp` rename)
- **Images Added:** 37 real product section images (from NONCENTRA/)
- **Images Converted:** 8 PNGs → WebP (75x reduction on largest file)
- **Total Page Weight Reduction:** ~37 MB → ~1 MB
- **CSS Added:** `.image-placeholder img` fill rule

---

**Project Status:** ✅ **Product images live, performance fixed**  
All 5 product pages now show real images. Index page loads in ~1MB vs ~37MB before.

**Last Updated:** 2026-05-04
