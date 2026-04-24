# Al-Safar Travels

Luxury travel landing page for **Al-Safar** — a boutique travel brand specialising in Umrah, Hajj, and curated international tours. A single-page, fully responsive marketing site built with plain HTML, CSS, and vanilla JavaScript.

## 🌐 Live Preview
https://al-safar-travels-production.up.railway.app/

---

A dark, gold-accented luxury aesthetic featuring:

- Animated preloader with crescent logo reveal
- Sticky glass navbar with mobile drawer
- Hero with rotating destinations, stat counters, and a smart search form
- Packages, Umrah & Hajj, Destinations, Experience, Testimonials, Booking, and Contact sections
- Scroll progress indicator, brand marquee, and reveal-on-scroll animations

## Tech Stack

- **HTML5** — semantic markup, accessible landmarks
- **CSS3** — custom properties, grid & flexbox, glassmorphism, keyframe animations
- **Vanilla JavaScript** — no frameworks, no build step
- **Google Fonts** — Cormorant Garamond, Playfair Display, Poppins
- **Font Awesome 6** — iconography

## Project Structure

```
al-safar-travels/
├── index.html        # Single-page markup for all sections
├── css/
│   └── styles.css    # Theme, layout, components, animations
├── js/
│   └── main.js       # Preloader, nav, rotator, counters, reveals, booking UX
└── assets/           # Images and static assets
```

## Getting Started

No build tools required. Clone and open.

```bash
git clone https://github.com/<your-username>/al-safar-travels.git
cd al-safar-travels
```

Then either:

- Open [index.html](index.html) directly in your browser, **or**
- Serve it locally for best results (fonts, relative paths, autoplay):

```bash
# Python 3
python -m http.server 8000

# Node (if you have it)
npx serve .
```

Visit `http://localhost:8000`.

## Customisation

- **Brand colours & typography** — edit the `:root` custom properties at the top of [css/styles.css](css/styles.css).
- **Destinations & rotator words** — update the `.rotator__word` entries in [index.html](index.html).
- **Packages & pricing** — edit the `#packages` section in [index.html](index.html).
- **Contact details** — replace phone/WhatsApp numbers in the navbar, drawer, and `#contact` section.
- **Hero image** — swap the Unsplash URL on the `.hero__image` element.

## Deployment

Works out of the box on any static host:

- **GitHub Pages** — push to `main` and enable Pages in repo settings
- **Netlify / Vercel / Cloudflare Pages** — drag-and-drop or connect the repo; no build command needed
- **Any static CDN** — upload the folder contents

## License

All rights reserved © Al-Safar. For personal or educational reference only unless otherwise agreed.
