# Sheharban & Muhammed Fasil — Cinematic Save-the-Date Invitation

A luxurious, mobile-first cinematic Save-the-Date wedding invitation website crafted with pure **HTML5, CSS3, and Vanilla JavaScript** (zero dependencies, zero frameworks). Deployable instantly on **GitHub Pages**.

---

## ✨ Features

- **Islamic Wedding Aesthetic**: Ivory / warm cream foundation, deep burgundy wine accents, crisp black typography, and subtle antique gold ornaments.
- **Dignified Invocations**: Traditional opening with Bismillah, In the name of Allah, The Most Gracious & The Most Merciful, and InshaaAllah.
- **Cinematic Hero**: Full-screen opening with dark overlays, vignettes, geometric corner ornaments, and subtle floating golden petals.
- **Editorial Save the Date**: Dedicated architectural arched composition showcasing the date (Sunday, 25 October 2026, 11:30 AM).
- **Wedding Details**: Date, Day, Time, and Venue with elegant inline SVG icons.
- **Live Real-Time Countdown**: Automatic live timer (Days, Hours, Minutes, Seconds) targeting the ceremony date (25 October 2026, 11:30 AM IST).
- **Add to Google Calendar**: Generates a dynamic calendar event URL populated with event title, dates, address, and notes.
- **Photo Gallery & Lightbox**: Responsive photo mosaic with full-screen lightbox modal supporting Next/Prev, Escape key, and mobile touch swiping.
- **Venue & Google Maps**: Embedded map preview with one-tap "Open in Google Maps" and "Get Directions" search buttons for Delight Convention Center, Vazhikkadavu, Puvathipoyil.
- **Direct Contacts**: WhatsApp and direct call buttons.
- **Single Source of Truth (`config.js`)**: All event details are centrally managed in `config.js`.

---

## 📁 Project Architecture

```
wedding-invitation/
│
├── index.html                  # Main application shell
├── config.js                   # ★ Central configuration object (EVENT_CONFIG)
│
├── css/
│   ├── style.css               # Design tokens, CSS variables, typography, reset
│   ├── animations.css          # Entrance keyframes, scroll reveal, micro-interactions
│   ├── hero.css                # Cinematic full-viewport hero section with Bismillah
│   ├── nav.css                 # Frosted-glass desktop nav & mobile hamburger overlay
│   ├── sections.css            # Save the Date, Details, Welcome, Story, Venue, Footer
│   ├── countdown.css           # Real-time countdown boxes
│   ├── gallery.css             # Photo grid & full-screen lightbox
│   └── music.css               # Floating music player & FAB buttons
│
├── js/
│   ├── config-loader.js        # Binds EVENT_CONFIG into DOM elements
│   ├── nav.js                  # Navigation scroll state & mobile menu interactions
│   ├── scroll-reveal.js        # Intersection Observer scroll reveal system
│   ├── countdown.js            # Live real-time countdown timer
│   ├── gallery.js              # Renders photo grid & handles modal lightbox
│   ├── calendar.js             # Generates dynamic Google Calendar template link
│   ├── particles.js            # Low-CPU floating petals canvas animation
│   ├── music.js                # Floating audio player with equalizer visualizer
│   ├── fab.js                  # Floating action buttons (WhatsApp, scroll-top)
│   └── main.js                 # App initialization bootstrap
│
└── assets/
    ├── images/                 # Wedding photos
    ├── music/                  # Optional background music track
    └── favicon/                # Browser favicons
```

---

## 🛠️ Configuration (`config.js`)

All event details are controlled in **`config.js`**:

```javascript
const EVENT_CONFIG = {
  title: "Sheharban & Muhammed Fasil — Wedding Invitation",
  bride: "Sheharban",
  groom: "Muhammed Fasil",
  names: "Sheharban & Muhammed Fasil",
  eventDateTime: "2026-10-25T11:30:00+05:30",
  date: "25 October 2026",
  day: "Sunday",
  time: "11:30 AM",
  venue: "Delight Convention Center",
  address: "Vazhikkadavu, Puvathipoyil",
  contact: {
    whatsapp: "919605036644",
    phone: "+91 96050 36644"
  }
};
```

---

## 🚀 Deploying to GitHub Pages

1. Push this repository to GitHub.
2. Navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
4. Select `main` branch and `/ (root)` folder, then click **Save**.
5. Your cinematic invitation website will be live in moments!
