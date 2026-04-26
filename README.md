# Emily & Greg Duo — Website

Promotional website for Emily & Greg Duo, a live jazz, pop and soul duo based in Lincolnshire, UK. Built as a single-page static site to attract wedding and event bookings across Lincolnshire and the East Midlands.

**Live site:** https://emilyandgregduo.co.uk

**Admin (gig management):** https://emilyandgregduo.co.uk/admin.html

---

## File structure

```
emily-and-greg-duo/
├── index.html              # Single-page site (all sections)
├── css/
│   └── style.css           # All custom styles (~1000 lines)
├── js/
│   └── main.js             # All interactivity (~350 lines)
├── images/
│   ├── hero-bg.jpg         # Hero section background (piano, locally hosted)
│   ├── emily-portrait-1.webp / .jpg
│   ├── greg-portrait.webp / .jpg
│   └── thumbnail.jpg       # Video poster / Open Graph image
├── favicon.ico
├── robots.txt
├── sitemap.xml
└── update_copyright_year.py  # Maintenance script (not deployed)
```

The demo video (`demo_video.mp4`) is hosted as a GitHub release asset and streamed on demand — it is not committed to the repository.

---

## Page sections

| Section | ID | Description |
|---|---|---|
| Hero | `#home` | Full-screen background image, animated logo shimmer, CTA buttons |
| About | `#about` | Bio cards for Emily and Greg, event-type badges, four feature cards |
| Video | `#video` | Click-to-play demo video with custom controls |
| Repertoire | `#repertoire` | Song list organised by genre |
| Testimonials | `#testimonials` | Rotating client quotes (Bootstrap carousel) |
| FAQ | `#faq` | Common booking questions |
| Contact | `#contact` | Booking enquiry form (Formspree), contact details, pricing |

---

## Technology

- **Bootstrap 5.3** — responsive grid, navbar collapse, carousel (deferred, non-render-blocking)
- **Google Fonts** — Playfair Display (headings) + Lato (body), deferred
- **Font Awesome 6.5** — icons, deferred
- **Formspree** — contact form submission with no server required
- **Web Audio API** — success chime on form submission (E4 → B4 → G4, sine + triangle blend)
- **Schema.org JSON-LD** — MusicGroup structured data for search engines
- **GitHub Pages** — static hosting, auto-deployed from `master`

---

## Notable features

### Performance
- Hero background image hosted locally and preloaded in `<head>` for fast LCP
- Bootstrap CSS and JS deferred to eliminate render-blocking (saves ~1.4 s)
- Portrait images include `width`/`height` attributes to prevent layout shift (CLS)
- Preconnect hints for all external origins

### Visual
- Gold shimmer animation on the hero title — single left-to-right sweep every 7 seconds using a 3-keyframe CSS animation with a hold phase
- Gold glitter particle overlay on the hero section (canvas, 90 particles, Web Audio–timed)
- Musical frame corner decorations on every section: treble clef (top-left) and bass clef (bottom-right), each with beamed quaver pairs and quarter notes along both borders, drawn as inline SVG data URIs with subtle gold-accented rounded-corner frames
- Wave SVG dividers between sections
- Fade-up scroll animations via `IntersectionObserver`

### Video player
- Click-to-load facade prevents the video from being fetched on page load
- "Watch Our Demo" nav link scrolls to the section and auto-activates the player
- Custom controls: play/pause, scrubber, time display, mute, fullscreen, auto-hide

### Contact form
- Client-side validation with inline error feedback
- Submits to Formspree; CC'd to both artists' email addresses
- Web Audio chime plays on successful submission

---

## Development

No build step required. Open `index.html` directly in a browser, or serve locally:

```bash
npx serve .
```

### Copyright year
`update_copyright_year.py` updates the footer copyright year and is run automatically by a Windows Task Scheduler job on 1 January each year.

---

## Contact

Greg Kaighin — gregkaighin@gmail.com
