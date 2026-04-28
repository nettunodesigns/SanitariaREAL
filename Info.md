# Sanitaria Croce — Documentazione Progetto

**Ultimo aggiornamento:** 28 Aprile 2026 (v1.1 — Contatti Page + UX Fixes)  
**Versione:** 1.1 — Launch 6 Pages (5 Products + Contatti)

---

## 📋 Overview Progetto

**Nome:** MammaSuAntiGrav (Sanitaria Croce)  
**Tipo:** E-commerce/Vetrina prodotti medico-sanitari  
**Proprietario:** Puccetti Silvia  
**Contatti:** 
- Tel: 051 619 05 81 / (+39) 3518307778
- Email: silviapuccetti70@gmail.com
- Sede: Via Porrettana 66/2, Croce di Casalecchio (BO)

---

## 🛠 Stack Tecnologico

| Aspetto | Tecnologia |
|--------|-----------|
| **Bundler** | Vite 8.0.1 |
| **Linguaggio** | Vanilla JavaScript (ES6+ modules) |
| **Animazioni** | Motion 12.38.0 |
| **Styling** | CSS vanilla (2384+ linee) |
| **HTML** | HTML5 semantico |
| **Fonts** | Montserrat, Playfair Display, Inter, Anton (Google Fonts) |

---

## 📂 Struttura Cartelle

```
MammaSuAntiGrav/
├── index.html                    (Homepage principale)
├── elettromedicali.html          (Pagina prodotti)
├── ortopedici.html              (Pagina prodotti)
├── ausili.html                  (Pagina prodotti)
├── cuscini.html                 (Pagina prodotti)
├── creme.html                   (Pagina prodotti)
├── contatti.html                (Pagina contatti - NUOVA v1.1)
├── main.js                       (Script entry point homepage)
├── elettromedicali.js           (Script pagina elettromedicali)
├── ortopedici.js                (Script pagina ortopedici)
├── ausili.js                    (Script pagina ausili)
├── cuscini.js                   (Script pagina cuscini)
├── creme.js                     (Script pagina creme)
├── contatti.js                  (Script pagina contatti - NUOVO v1.1)
├── style.css                    (Styling globale - AGGIORNATO v1.1)
├── vite.config.js               (Configurazione Vite)
├── components/
│   ├── animated-grid.js         (SVG grid pattern animata)
│   ├── testimonials-carousel.js (Carousel testimonianze)
│   ├── text-reveal.js           (Text reveal animation)
│   ├── scroll-animations.js     (Scroll-based animations)
│   └── smooth-scroll-guide.js   (Scroll utilities)
└── sources/
    ├── Logo_Mamma.svg
    ├── Landing_Hero/            (Background slider images)
    │   ├── bgHERO_neck.png
    │   ├── bgHERO_hip.jpg
    │   └── bgHERO_knee.png
    ├── Image_Product_Section/
    │   ├── cat_elettromedicali_1772653439952.png
    │   ├── cat_ortopedici_1772653426210.png
    │   ├── cat_ausili_1772653454470.png
    │   ├── cat_cuscini_1772653468818.png
    │   └── cat_creme_1772653483614.png
    ├── Logos_Logo_Section/      (Marchi affiliati)
    └── Elementi per la Testimonials Section/
```

---

## 🌐 Struttura Sito Web

### Homepage (index.html)
**Sezioni:**
1. **Hero Section** — Slider background + navbar
2. **Statement Section** — Titolo principale "Articoli ortopedici e medicali per migliorare la terza età"
3. **Products Accordion** — 5 categorie con immagini (responsive expand/collapse)
4. **Brands Section** — Marquee infinito con loghi affiliati
5. **Testimonials Section** — Carousel cliente con grid pattern animata
6. **Footer** — Info, contatti, orari, mappa, social

### Pagina Contatti (contatti.html) — **NUOVO v1.1**
**Sezioni:**
1. **Hero Section** — Titolo "CONTATTI" con CSS gradient background
2. **Sticky Index** (off-canvas) — 4 sezioni
3. **Telefono & WhatsApp** — Split layout (testo + display con numeri cliccabili)
4. **Email** — Split reverse (display email + testo descrittivo)
5. **Dove Trovarci** — Split layout (indirizzo + Google Maps embed)
6. **Orari di Apertura** — Split reverse (descrizione + tabella orari)
7. **Footer** — Identico alle altre pagine

### Pagine Prodotti (Struttura Identica)

Ogni pagina prodotto segue questo layout:

```
1. Navbar (con dropdown aggiornato)
2. Page Hero (100vh fullscreen)
   ├── Background image (categoria)
   ├── Title h1
   └── Descrizione prodotti categoria
3. Sticky Index (off-canvas menu)
   └── Lista numerata delle sezioni prodotto
4. Main Content (Fullscreen sections)
   ├── Split layout (testo + immagine placeholder)
   ├── Alternato: text-left/right, image-right/left
   ├── Product description + features
   └── CTA button (Richiedi Info / Noleggia / etc.)
5. Footer (identico alla homepage)
```

---

## 📄 Pagine Create/Modificate (Sessione 28 Aprile 2026 v1.1)

### ✅ Modificate (v1.1 — UX/Design Improvements)

| File | Cambio |
|------|--------|
| **style.css** | ✓ CTA buttons: verde → bianco/glass (all pages) ✓ Ausili palette: browns → olive/military/sage (3 gradients distinti) ✓ Ortopedici palette: navy variants più distinti (deep navy/steel/indigo) ✓ Cuscini palette: teal variants più distinti (teal-green/cyan/blue-teal) ✓ Contatti styles: charcoal/slate palette + contact-display cards + map filter + schedule table ✓ Smooth scroll recovery: scrollbar drag fix + re-snap on scroll stop |
| **index.html** | Navbar "Contatti" link: `#` → `contatti.html` |
| **elettromedicali.html** | Navbar "Contatti" link: `index.html#contatti` → `contatti.html` |
| **ortopedici.html** | Navbar "Contatti" link: `index.html#contatti` → `contatti.html` |
| **ausili.html** | Navbar "Contatti" link: `index.html#contatti` → `contatti.html` |
| **cuscini.html** | Navbar "Contatti" link: `index.html#contatti` → `contatti.html` |
| **creme.html** | Navbar "Contatti" link: `index.html#contatti` → `contatti.html` |

### 🆕 Create (v1.1)

| File | Sezioni | Contenuto |
|------|---------|----------|
| **contatti.html** | 4 | Telefono/WhatsApp (display numeri), Email (display email), Dove Trovarci (Google Maps), Orari (tabella orari) |
| **contatti.js** | — | Mobile toggle, scroll spy, index visibility, intersection observer (identico a product pages) |

### 🆕 Create (v1.0)

| File | Sezioni | Prodotti |
|------|---------|----------|
| **ortopedici.html** | 8 | Busti, Ginocchiere/Polsiere/Cavigliere, Calze Elastiche, Tutori, Plantari/Calzature, Piedi Eumedica, Dispositivi Diagnostici, Traverse/Termofori |
| **ausili.html** | 8 | Materassi Antidecubito, Deambulatori, Carrozzine, Sedie Comode, Stampelle/Bastoni, Sponde/Accessori Letto, Abbigliamento Degenza, Prodotti Igienici |
| **cuscini.html** | 9 | Alzagambe, Memory Foam, Divaricatori, Antidecubito, Prostata, Emorroidi, Carrozzine, Coprimaterassi, Lettino Massaggi |
| **creme.html** | 4 | Arnica, Detergenti, Artiglio Diavolo, Cosmedical Collagene |

**JS Files (identici tra loro):**
- `ortopedici.js`, `ausili.js`, `cuscini.js`, `creme.js`, `contatti.js` — Funzionalità: mobile toggle, scroll spy, index visibility, intersection observer animations, smooth scroll snap

---

## 🎨 Palette Colori per Pagina (v1.1)

### Elettromedicali (Verde/Dark)
**Background Gradients (8 sezioni):**
- 3-color pattern: Deep green → Silver/Gray → Dark red → (repeat)

**Magic Border Colors:** `#4ade80`, `#a1a1aa`, `#f87171`

---

### Ortopedici (Navy / Steel / Indigo) — **v1.1 redesign**
**Background Gradients (3 distinct variants, alternating):**
- **A — Deep Navy:** `#07091a, #0e1838, #040508, #162050` (pure cold dark blue)
- **B — Steel Blue:** `#0c1824, #1c3044, #08100e, #2c4860` (gray-blue, lighter/desaturated)
- **C — Deep Indigo:** `#0c0a22, #201a50, #06050e, #302878` (clear purple shift)
- Sections A: busti, tutori, diagnostici
- Sections B: ginocchiere, plantari, traverse
- Sections C: calze, piedi

**Magic Border Colors:** `#3b82f6` (A), `#7dd3fc` (B), `#818cf8` (C)

---

### Ausili (Olive / Military Green + Gold) — **v1.1 complete redesign**
**Background Gradients (3 distinct variants, alternating):**
- **A — Dark Olive:** `#0c1008, #1c2a14, #080c04, #2c4018` (warm olive shadow)
- **B — Military Green:** `#0a1206, #1a2e0e, #060c03, #283c18` (deeper, cooler)
- **C — Sage/Khaki:** `#101408, #262e10, #0c0c04, #3c4420` (warmer, lighter)
- Sections A: materassi, sedie, abbigliamento
- Sections B: deambulatori, stampelle, prodotti-igienici
- Sections C: carrozzine, sponde

**Magic Border Colors:** `#d4a027` (A—gold), `#84cc16` (B—lime), `#e8b84b` (C—amber-gold)

---

### Cuscini (Teal-Green / Cyan / Blue-Teal) — **v1.1 redesign**
**Background Gradients (3 distinct variants, alternating):**
- **A — Teal-Green:** `#061612, #10301e, #040c08, #1c4430` (warm, green-leaning)
- **B — Cool Cyan-Teal:** `#061618, #0e3034, #040a0c, #184848` (classic cool teal, cyan-shifted)
- **C — Blue-Teal:** `#060e1a, #102232, #04080e, #1a344e` (slate/navy shift, darker)
- Sections A: alzagambe, antidecubito, carrozzine-cuscini
- Sections B: memory, prostata, coprimaterassi
- Sections C: divaricatori, emorroidi, lettino

**Magic Border Colors:** `#34d399` (A—emerald), `#22d3ee` (B—cyan), `#38bdf8` (C—sky)

---

### Creme (Rose / Mauve / Dusty Violet)
**Background Gradients (4 sezioni):**
- `#arnica` → `#1a0c0e, #38181e, #120808, #58242a` — Deep rose
- `#detergenti` → `#1a0c16, #38182e, #120810, #582040` — Dark mauve
- `#artiglio` → `#12101a, #242038, #0e0c12, #3a3458` — Dusty purple
- `#collagene` → `#1a0c0e, #38181e, #120808, #58242a` — Deep rose

**Magic Border Colors:** `#fb7185` (rose), `#e879f9` (fuchsia), `#a78bfa` (soft violet)

---

### Contatti (Monochrome Charcoal / Slate) — **NUOVO v1.1**
**Background Gradients (4 sezioni, monochrome palette):**
- `#telefono` → `#0a0c10, #181c24, #06080c, #28303c` — Cool slate
- `#email` → `#0c0a08, #201c18, #060504, #322c26` — Warm graphite
- `#sede` → `#0a0e16, #1a2230, #05070c, #2a3648` — Cool steel
- `#orari` → `#08080a, #181820, #050506, #28282e` — Pure neutral

**Magic Border Colors:** `#e2e8f0` (slate), `#fef3c7` (cream), `#dbeafe` (sky), `#ffffff` (pure white)

**Contact Display Panels:**
- Large `Anton` font phone/email numbers (clickable `tel:` / `mailto:` links)
- Google Maps embed in Sede section (dark-theme inverted filter)
- Formatted schedule table in Orari section

---

## 📦 Funzionalità Comuni (v1.1)

### CTA Buttons Style (v1.1 — White/Glass)
- **Primary CTA (`.primary-cta`):** 
  - Old (v1.0): Green (`#22392b` bg, `#52906d` hover)
  - **New (v1.1):** White/glass (`rgba(255,255,255,0.07)` bg, `rgba(255,255,255,0.16)` hover)
  - Applies to: all product pages + contatti page

### JavaScript Comportamenti (tutti i `.js` pages — product + contatti)
```javascript
✓ Mobile navbar toggle + dropdown
✓ Scroll spy (indice aggiornato mentre scorri)
✓ Index toggle visibility (appare dopo hero)
✓ Intersection observer for animations
✓ Element fade/zoom on scroll
✓ Smooth scroll snap (desktop 1024px+)
✓ Scroll snap recovery (scrollbar drag fix — v1.1)
```

### CSS Animazioni
```css
✓ Gradient shift background (8s loop, infinite)
✓ Magic border conic gradient spinner (8s, varying colors per page)
✓ Fade up / Fade left / Fade right animations
✓ Zoom in animations
✓ Smooth scroll behavior (native CSS + custom snap guide)
```

### Smooth Scroll Snap (v1.1 Fix)
- **Old (v1.0):** Wheel hijacking only → broke with scrollbar drag or mid-section scroll
- **New (v1.1):** 
  - Keeps wheel hijacking for snapped scrolling
  - **Adds scroll event debounce (150ms):** detects scroll stop and snaps to nearest section
  - **Re-snap logic:** if scrolling stops within 60% viewport from a section, snaps to it
  - **Prevents loops:** `dist > 2px` guard against re-snapping when already aligned
  - Result: robust snap recovery after scrollbar drag, keyboard scroll, or any free scroll

### Layout Sections
```html
✓ Split-section-container (text + image)
✓ Reverse-layout (alternating text position)
✓ Panel header (title + availability tag)
✓ Panel footer (CTA button)
✓ Image placeholder (animated border glow)
```

---

## 🏷️ Disponibilità Prodotti (Tag)

| Tag | Stile | Pagine |
|-----|-------|--------|
| `In Vendita` | Bianco su trasparente | Ortopedici, Cuscini, Creme |
| `Vendita e Noleggio` | Highlight (verde) | Ausili (materassi, deambulatori, carrozzine) |
| `Focus Noleggio` | Highlight (verde) | Elettromedicali (Kinetec) |
| `Linea Dedicata` | Highlight (blu) | Ortopedici (Piedi Eumedica) |
| `Uso Clinico` | Highlight (blu) | Cuscini (Antidecubito) |
| `Linea Premium` | Highlight (viola) | Creme (Cosmedical Collagene) |

---

## 📞 Orari & Contatti

**Orari:**
- Lun-Mer: 09:00-12:30 / 16:00-19:00
- Giovedì: 09:00-12:30
- Venerdì: 09:00-12:30 / 16:00-19:00
- Sabato: 09:00-12:30
- Domenica: Chiuso

**Contatti Footer:**
- 📞 Tel: 051 619 05 81
- 📱 Cell: (+39) 3518307778
- 📧 Email: silviapuccetti70@gmail.com
- 📍 Sede: Via Porrettana 66/2, Croce di Casalecchio (BO)
- 🗺️ Mappa: Google Maps embed integrata

---

## 🏷️ Marchi Affiliati

**Presenti nel carousel homepage:**
1. Bauerfeind
2. Ro+ten
3. Berkemann
4. Pavis
5. Intermed
6. New Age
7. I-Tech
8. Globus
9. Medi
10. Moretti Spa

---

## ✨ Note Importanti per Sessioni Future

### ⚠️ Punti Critici
1. **Placeholder immagini** — Tutte le sezioni prodotto hanno `[Placeholder Immagine: ...]`. Vanno sostituite con immagini reali
2. **Descrizioni prodotti** — Sono placeholder/template con content generico. Vanno personalizzate per ogni prodotto
3. **Hero images** — Ogni pagina usa l'immagine dalla sezione "Image_Product_Section/" di index.html — OK
4. **Favicon** — Non presente (aggiungere `favicon.ico` nella root)
5. **Mobile responsiveness** — Testare su device reali

### 🔧 Setup Vite
```bash
npm install          # Installa dipendenze
npm run dev          # Development server @ localhost:5173
npm run build        # Crea dist/ per produzione
npm run preview      # Visualizza build locale
```

### 📝 Navigazione (v1.1 — Contatti Link Updated)
- **Navbar presente in:** Tutte le 6 pagine (index.html + 5 product pages + contatti.html)
- **Dropdown attivo:** Click su "Prodotti" mostra menu con 5 link prodotti
- **Contatti link (v1.1):** Top-level navbar link → `contatti.html` (tutte le pagine)
  - Old (v1.0): `index.html#contatti` (anchor inesistente) o `#` (non funzionante)
  - **New (v1.1):** `contatti.html` (pagina dedicata)
- **Accordion:** Solo su index.html, convertito a link
- **Mobile:** Toggle button burger menu (funziona su tutte le pagine)

### 🎯 SEO/Meta
- ✅ Meta charset, viewport
- ⚠️ Meta description assente — aggiungere per ogni pagina
- ⚠️ OG tags (Open Graph) assenti — utili per social share
- ⚠️ Structura dati schema.json assente

### 🖼️ Assets
- Tutti gli asset statici in `/sources/` (non bundled da Vite)
- Percorsi assoluti: `sources/Logo_Mamma.svg`, `sources/Image_Product_Section/...`
- Attenzione: case-sensitive su Linux/Mac deployment

---

## 📋 Checklist Status (v1.1)

### ✅ Completato (v1.0 → v1.1)
- [x] Contatti page creata (contatti.html + contatti.js)
- [x] CTA buttons redesigned (green → white/glass, all pages)
- [x] Ausili palette completamente ridisegnata (browns → olive/military/sage)
- [x] Ortopedici palette resa più distinta (3 variants ben separati)
- [x] Cuscini palette resa più distinta (3 variants ben separati)
- [x] Smooth scroll robustezza migliorata (scrollbar drag fix)
- [x] Navbar "Contatti" link aggiornato (tutte le pagine)

### ⏳ Prossima Sessione
- [ ] Caricare immagini reali per sezioni prodotto
- [ ] Personalizzare descrizioni prodotti (attualmente placeholder/template)
- [ ] Aggiungere favicon
- [ ] Test mobile su device reali
- [ ] Verificare velocità pagina (Lighthouse)
- [ ] Aggiungere meta description e OG tags (per SEO)
- [ ] Testare animazioni scroll su mobile (performance check)
- [ ] Verificare accessibilità (WCAG standard)
- [ ] Setup SSL/HTTPS per hosting
- [ ] Google Analytics setup
- [ ] **Optional:** Backend form per contatti (attualmente CTA link diretti a tel/email)

---

## 🔗 Link Interni (Verificati v1.1)

| Da | A | Tipo | Note |
|----|---|------|-------|
| index.html navbar | contatti.html | ✅ | v1.1: updated from `#` |
| Tutte pagine navbar | contatti.html | ✅ | v1.1: updated from `index.html#contatti` |
| index.html navbar | elettromedicali.html | ✅ | via Prodotti dropdown |
| index.html navbar | ortopedici.html | ✅ | via Prodotti dropdown |
| index.html navbar | ausili.html | ✅ | via Prodotti dropdown |
| index.html navbar | cuscini.html | ✅ | via Prodotti dropdown |
| index.html navbar | creme.html | ✅ | via Prodotti dropdown |
| index.html accordion | pagine prodotto | ✅ | click su categoria |
| Tutte pagine prodotto | index.html (logo) | ✅ | |
| Tutte pagine prodotto | index.html#contatti | ⚠️ | Product page CTAs still point here (legacy — consider updating to contatti.html) |
| contatti.html | Google Maps (Dove Trovarci) | ✅ | embedded + externa link |
| Footer mappa (tutte pagine) | Google Maps | ✅ | embedded iframe |

---

**Versione documento:** 1.1  
**Ultimo aggiornamento:** 28 Aprile 2026 (v1.1 — Contatti Page + UX Enhancements)  
**Prossimo aggiornamento:** Fine sessione successiva (image assets + SEO meta tags)
