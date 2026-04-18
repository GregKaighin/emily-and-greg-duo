# Emily & Greg Duo — Website

Promotional website for Emily & Greg Duo, a live jazz, pop and soul duo based in Lincolnshire, UK. Built as a single-page site to attract wedding and event bookings across Lincolnshire and the East Midlands.

**Live site:** https://gregkaighin.github.io/emily-and-greg-duo

---

## Structure

```
emily-and-greg-duo/
├── index.html          # Single-page site
├── css/
│   └── style.css       # All custom styles
├── js/
│   └── main.js         # Scroll animations, video player, contact form, chime
├── images/             # Photos and video thumbnails
└── demo_video.mp4      # Demo performance video
```

## Sections

| Section | ID | Description |
|---|---|---|
| Hero | `#home` | Full-screen video background with CTA buttons |
| About | `#about` | Bio cards for Emily and Greg, feature cards |
| Video | `#video` | Demo video with custom controls |
| Repertoire | `#repertoire` | Song list by genre |
| Testimonials | `#testimonials` | Client quotes |
| FAQ | `#faq` | Accordion of common questions |
| Contact | `#contact` | Booking enquiry form (Formspree) |

## Technology

- **Bootstrap 5.3** — layout and responsive grid
- **Google Fonts** — Playfair Display (headings) + Lato (body)
- **Font Awesome 6.5** — icons
- **Formspree** — contact form submission (no server required)
- **Web Audio API** — chime sound on successful form submission (E4 → B4 → G4)
- **Schema.org JSON-LD** — structured data for search engines

## Features

- Smooth-scroll "Watch Us" button that auto-plays the demo video on arrival
- Custom video player (play/pause, scrub, mute, fullscreen)
- Fade-up scroll animations via IntersectionObserver
- Musical frame corner decorations (treble clef / bass clef) on all dark sections
- SEO meta tags and keywords

## Development

No build step required. Open `index.html` directly in a browser, or serve with any static file server:

```bash
npx serve .
```

## Contact

Greg Kaighin — gregkaighin@gmail.com
