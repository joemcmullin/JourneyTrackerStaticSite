# Journey Tracker — Static Marketing Site

The official marketing and legal information website for **Journey Tracker**, a native SwiftUI multiplatform app for iPhone, iPad, and Mac that helps individuals track their GLP-1 therapy, weight loss progress, lab results, body composition, hydration, fasting, and health milestones.

> **App Status:** Coming Soon to the Apple App Store

---

## 📋 Table of Contents

- [Overview](#overview)
- [Site Structure](#site-structure)
- [Pages & Sections](#pages--sections)
- [Screenshots](#screenshots)
- [Technology](#technology)
- [SEO & Structured Data](#seo--structured-data)
- [Accessibility](#accessibility)
- [Email & Contact Form](#email--contact-form)
- [Local Development](#local-development)
- [Deployment (GitHub Pages)](#deployment-github-pages)
- [Image Assets](#image-assets)
- [Legal & Compliance Notes](#legal--compliance-notes)
- [Contact & Support](#contact--support)

---

## Overview

This repository contains the single-page marketing website for Journey Tracker. The site is a self-contained `index.html` file with all CSS embedded in a `<style>` block and vanilla JavaScript — no frameworks, no external dependencies, no CDN calls. It is designed to be hosted as a static site on GitHub Pages or any standard static hosting provider.

The site serves the following purposes:

- **Marketing** — communicating the app's value to prospective users
- **Legal** — hosting plain-language summaries **and full versions** of the Privacy Policy, HIPAA disclosures, and Terms of Service
- **Support** — providing a contact method for users and App Store reviewers
- **App Store Review** — satisfying Apple's requirement for a publicly accessible privacy policy URL and support URL

---

## Site Structure

```
JourneyTrackerStaticSite/
├── index.html              # Complete single-page site (HTML + CSS + JS)
├── app-icon.jpg            # App icon (1024×1024 JPEG) — used as favicon, nav logo, OG image
├── favicon.svg             # Compass SVG favicon (backup / dev reference)
├── CNAME                   # Custom domain: journeytracker.app
├── robots.txt              # Allow all crawlers; references sitemap
├── sitemap.xml             # Single-URL sitemap for SEO
├── images/
│   ├── dashboard-overview.png  # My Journey dashboard overview
│   ├── dashboard-detail.png    # Dose tracker + all-time weight trend
│   ├── feature-labs.png        # Lab Results screen
│   ├── feature-symptoms.png    # Trail Conditions (Symptoms) screen
│   ├── feature-therapy.png     # Therapy Trend (Zepbound / tirzepatide)
│   ├── feature-hydration.png   # Hydration tracking detail view
│   └── feature-security.png    # Face ID / biometric lock screen
└── _dev/                   # ⚠️ gitignored — local design assets only
    └── favicon-options.html    # 6 SVG favicon design options (preview page)
```

---

## Pages & Sections

The site is a single scrollable page with a sticky navigation bar. All sections are reachable via anchor links. A floating scroll-to-top button (forest green circle with an upward arrow) appears once the user scrolls past the hero section.

| Section | Anchor | Description |
|---|---|---|
| Home / Hero | `#home` | App tagline, CTA, hero screenshot, Coming Soon badge |
| Features | `#features` | Six alternating screenshot + text feature rows |
| FAQs | `#faqs` | 10 accordion Q&A items for prospective users |
| Privacy Policy | `#privacy` | Plain-language privacy summary |
| HIPAA & Health Information | `#hipaa` | Consumer app disclosures; not-a-covered-entity statement; medical disclaimer |
| Terms of Service | `#terms` | Plain-language ToS summary |
| Contact & Support | `#contact` | Formspree-powered contact form + email link |
| Legal Documents | `#documentation` | Full legal document accordions (Privacy Policy, HIPAA Disclosure, Terms of Service) |

---

## Pages & Sections — Detail

### Hero (`#home`)
- App name, tagline, and description
- "Coming Soon to the App Store" CTA (styled with sunrise orange)
- "Get notified at launch" link directing to the contact form
- Phone frame displaying the real My Journey dashboard screenshot
- Platform callout: iPhone · iPad · Mac

### Features (`#features`)
Six alternating left/right rows (plus one dual-phone row), each pairing a real in-app screenshot with a title, description, and bullet list:

1. **Lab Results Tracking** — HbA1c, LDL, metabolic markers, calendar view
2. **Trail Conditions (Symptoms)** — Symptom log (nausea, fatigue, etc.), post-injection symptom tracking
3. **My Journey Dashboard** *(dual-phone layout)* — Weight trend charts, milestone badges, Journey Points gamification
4. **GLP-1 Therapy Tracking** — Dose logging, dose escalation timeline, weight × dose correlation
5. **Fasting & Hydration** — Water intake logging, fasting window tracking, Apple Health sync
6. **Private by Design** — Face ID / Touch ID lock, Sign in with Apple, CloudKit (user's iCloud), no ads

### FAQs (`#faqs`)
Accordion-style, 10 questions covering:
- What the app is and who it's for
- Non-GLP-1 use
- Data storage (device + CloudKit)
- Apple Health integration
- Data sharing (none)
- Free vs. Pro tiers (free: 2 lab sessions; Pro: unlimited + AI analysis)
- Medical advice disclaimer
- International use and units of measure (lbs/kg/st · in/cm · mg/dL/mmol/L · fl oz/ml)
- Supported devices
- How to contact support

### Privacy Policy (`#privacy`)
Plain-language summary. Covers:
- Information collected directly (measurements, medication, labs, goals, notes)
- HealthKit data types (body weight, blood glucose, blood pressure, dietary water, lab records)
- Sign in with Apple (opaque identifier only — no name, no email)
- What is NOT collected (name, address, DOB, SSN, insurance, payment info)
- On-device storage: AES-256 encryption via iOS FileProtection
- iCloud storage: user's personal CloudKit account — not developer servers
- AI Lab Analysis (Pro): de-identified transmission to Anthropic Claude; consent screen required; never transmits name, exact dates, or identifiers
- Information sharing: Apple, Anthropic (AI only, if consented), RevenueCat (subscription status only)
- User rights: access, delete, opt-out of AI analysis, revoke HealthKit
- State privacy rights: California CCPA/CPRA, Virginia CDPA, Colorado CPA
- Data security: AES-256, TLS 1.3, biometric lock, no developer server access
- Children's privacy: 18+ only
- FTC Health Breach Notification Rule compliance

### HIPAA & Health Information (`#hipaa`)
- Journey Tracker is not a HIPAA covered entity (not a healthcare provider, health plan, or clearinghouse)
- Not a medical device; does not provide medical diagnoses
- No automatic clinical sharing with doctors, insurers, or employers
- Emergency situations: call 911 — do not rely on the app in emergencies
- Full medical disclaimer

### Terms of Service (`#terms`)
Plain-language summary. Covers:
- 18+ age requirement
- Not medical advice disclaimer
- AI Lab Analysis limitations: powered by Anthropic Claude AI; may be inaccurate; not reviewed by a clinician
- Subscription tiers: free (2 lab sessions), Pro (unlimited + AI analysis + OCR import)
- Apple App Store billing; auto-renewal; refunds per Apple policy
- Data ownership: user owns all health data
- No warranty ("as is")
- Liability limitation
- User responsibilities

### Contact & Support (`#contact`)
- Formspree-powered contact form (name, email, subject, message)
- Direct email link: support@journeytracker.app
- Form submissions deliver to support@journeytracker.app via ImprovMX forwarding
- Reply-to automatically set to the user's submitted email address

### Legal Documents (`#documentation`)
Full text of all three legal documents in accordion format. Only one accordion is open at a time; all are closed by default.

1. **Full Privacy Policy** — 12 sections (Who We Are → Contact Us)
2. **Health Information & HIPAA Disclosure** — Standalone comprehensive HIPAA non-covered-entity disclosure
3. **Full Terms of Service** — 13 sections (Acceptance → Contact)

Each accordion uses a scrollable inner pane (680 px max-height) so the page does not jump thousands of pixels on open.

### Cookie Notice
A fixed bottom banner: "Journey Tracker's website uses only essential cookies required for the site to function. We do not use advertising trackers or sell your data." Dismissal state is stored in `localStorage`.

---

## Screenshots

Seven real in-app screenshots are used as marketing assets. They are displayed inside CSS-only phone frames (no image assets for the frames — pure `border-radius` and `box-shadow`).

| File | Screen shown | Used in |
|---|---|---|
| `images/dashboard-overview.png` | My Journey dashboard overview | My Journey feature row (left phone) |
| `images/dashboard-detail.png` | Dose tracker + all-time weight trend | My Journey feature row (right phone) |
| `images/feature-labs.png` | Lab Results — HbA1c, LDL, metabolic markers | Lab Results feature row |
| `images/feature-symptoms.png` | Trail Conditions — symptom log with nausea, fatigue entries | Trail Conditions feature row |
| `images/feature-therapy.png` | Therapy Trend — Zepbound 5.0 mg, dose timeline | GLP-1 Therapy feature row |
| `images/feature-hydration.png` | Hydration — daily water intake bar chart | Fasting & Hydration feature row |
| `images/feature-security.png` | Face ID lock screen — "Journey Tracker is locked" | Private by Design feature row |

---

## Technology

| Concern | Approach |
|---|---|
| HTML | Semantic HTML5 (`<header>`, `<nav>`, `<section>`, `<footer>`) |
| CSS | Single embedded `<style>` block; CSS custom properties; responsive grid; no frameworks |
| JavaScript | Vanilla JS — mobile nav toggle, FAQ accordion, legal accordion, cookie banner, scroll-to-top |
| Fonts | System font stack: `-apple-system, system-ui, "SF Pro Text", "Helvetica Neue", Arial, sans-serif` |
| External dependencies | **Formspree** (contact form POST endpoint only) — no CDN, no npm, no build step |
| Responsive | Mobile-first; breakpoints at 768 px and 520 px |
| Accessibility | WCAG 2.1 Level AA / Section 508 compliant (see [Accessibility](#accessibility)) |
| SEO | Full meta tags, Open Graph, Twitter Card, JSON-LD structured data (see [SEO & Structured Data](#seo--structured-data)) |
| Performance | LCP hero image preloaded; `loading="lazy" decoding="async"` on all below-fold images; `dns-prefetch` for Formspree |

### Design System

| Token | Value | Use |
|---|---|---|
| `--forest-dark` | `#1a3a2a` | Primary headings, nav, HIPAA section bg |
| `--forest-mid` | `#2d5a3d` | Secondary actions, borders, footer |
| `--forest-light` | `#4a8a5e` | Accent text, checkmarks, links |
| `--sunrise` | `#e8792a` | Primary CTAs, badges |
| `--sunrise-light` | `#f59c55` | CTA gradient, highlights |
| `--cream` | `#faf7f2` | Page background, card backgrounds |

### JavaScript Modules (all vanilla, no dependencies)

| Feature | Description |
|---|---|
| Mobile nav toggle | Hamburger open/close with `aria-expanded` |
| FAQ accordion | `toggleFaq()` — open/close individual items, manages `aria-expanded` and `aria-hidden` |
| Legal accordion | `toggleLegal()` — mutual exclusion (one open at a time), fixed 682 px `max-height`, smooth scroll to opener |
| Cookie banner | Session-persistent dismiss via `localStorage` |
| Scroll-to-top button | `rAF`-throttled scroll listener; appears when hero section scrolls out of view; respects `prefers-reduced-motion` |

---

## SEO & Structured Data

The site includes a full SEO implementation targeting App Store search and GLP-1 / weight loss tracker queries.

### Meta Tags
- `<title>` — keyword-rich page title
- `<meta name="description">` — 150-character description targeting GLP-1, Ozempic, Wegovy, Zepbound, tirzepatide, semaglutide queries
- `<meta name="robots">` — `index, follow, max-snippet:-1, max-image-preview:large`
- `<link rel="canonical">` — `https://journeytracker.app/`
- `<meta name="theme-color">` — `#1a3a2a` (forest dark)

### Open Graph & Twitter Card
- `og:type`, `og:url`, `og:site_name`, `og:locale`, `og:title`, `og:description`
- `og:image` / `twitter:image` — `app-icon.jpg` (1024×1024)
- `twitter:card: summary_large_image`

### JSON-LD Structured Data (4 schemas)
1. **WebSite** — name, URL, description, publisher
2. **Organization** — name, URL, logo, contact point, same-as links
3. **SoftwareApplication** — name, OS (iOS 16+, macOS 13+), category (HealthApplication), offers (Free + Paid), feature list, screenshot array, keywords
4. **FAQPage** — all 10 FAQ questions and answers (enables Google FAQ rich results)

### Crawl Files
- `robots.txt` — allows all crawlers, references sitemap
- `sitemap.xml` — single URL (`https://journeytracker.app/`), `lastmod`, `changefreq: monthly`, `priority: 1.0`

---

## Accessibility

The site is built to **WCAG 2.1 Level AA** and **Section 508** standards throughout, including all features added after the initial build.

| Area | Implementation |
|---|---|
| Semantic landmarks | `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` with `aria-labelledby` |
| Keyboard navigation | All interactive elements reachable and operable by keyboard; focus indicators visible |
| Skip link | `#main-content` skip link at page top |
| Accordion ARIA | `role="button"`, `aria-expanded`, `aria-controls`, `role="region"`, `aria-labelledby` on all accordions |
| Scroll-to-top button | `aria-label="Scroll to top of page"`, `aria-hidden` toggled programmatically |
| Reduced motion | Scroll-to-top uses `prefers-reduced-motion: reduce` to skip smooth scroll |
| Color contrast | All text meets or exceeds 4.5:1 (normal) and 3:1 (large) contrast ratios |
| Images | Meaningful images have descriptive `alt` text; decorative elements use `aria-hidden="true"` |
| Forms | All inputs have associated `<label>` elements; required fields marked with `aria-required` |
| Mobile nav | `aria-label="Toggle navigation"`, `aria-expanded` on hamburger button |

---

## Email & Contact Form

### Contact Form
Powered by [Formspree](https://formspree.io). Form submissions are sent via HTTPS POST.

- **Note:** Formspree intentionally blocks submissions from `localhost` as an anti-spam measure. Test the contact form on the live GitHub Pages site, or add `localhost` to your Formspree allowed-origins list in the dashboard.

### Email Routing
`support@journeytracker.app` is routed via **ImprovMX** email forwarding to the support inbox.

- Reply-to is automatically set to the user's submitted email address, so replies from the support inbox go directly to the user.

---

## Local Development

No build step required. Open `index.html` directly in any browser:

```bash
# Option 1 — open directly
open index.html

# Option 2 — serve locally (Python) on port 8765
python3 -m http.server 8765
# then visit http://localhost:8765

# Option 3 — serve locally (Node)
npx serve .
# then visit the URL shown in the terminal
```

A `.claude/launch.json` is included for launching the Python dev server at port 8765 via Claude Code's preview tooling.

---

## Deployment (GitHub Pages)

This site is deployed on GitHub Pages from the `main` branch at the custom domain `journeytracker.app`.

**Repository:** `https://github.com/joemcmullin/JourneyTrackerStaticSite`

**To enable GitHub Pages (first time):**

1. Go to the repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**

**Custom domain (`journeytracker.app`):**

The `CNAME` file in the repository root contains `journeytracker.app`. DNS is configured with a CNAME record pointing to `joemcmullin.github.io`.

GitHub Pages deploys automatically on every push to `main`. Expect a 1–3 minute propagation delay before changes appear on the live site.

---

## Image Assets

The `images/` directory contains real in-app screenshots. To update screenshots:

1. Replace the `.png` file in `images/` with the new screenshot using the **same filename**
2. Keep files named in lowercase with hyphens (GitHub Pages runs on Linux — file paths are case-sensitive)
3. Commit and push; GitHub Pages will deploy automatically

The app icon (`app-icon.jpg`, 1024×1024 JPEG) is used as:
- Browser favicon (`<link rel="icon">`)
- Apple touch icon (`<link rel="apple-touch-icon">`)
- Open Graph and Twitter Card image (`og:image`)
- Navigation bar logo

---

## Legal & Compliance Notes

- **Privacy Policy:** The `#privacy` section is a plain-language summary. The full Privacy Policy is published in the `#documentation` section accordion and will also be available at `journeytracker.app/privacy` before general release.
- **Terms of Service:** The `#terms` section is a plain-language summary. The full Terms of Service is published in the `#documentation` section accordion.
- **HIPAA:** Journey Tracker is a consumer app and is not a HIPAA covered entity. The `#hipaa` section and the full HIPAA disclosure in `#documentation` explain this positioning and include a full medical disclaimer.
- **Apple App Store:** This site satisfies Apple's requirement for a publicly accessible privacy policy URL and support URL. The support URL and privacy URL submitted during App Store review point to this site.
- **Placeholder items:** Several items in the underlying legal documents (effective dates, governing state, developer legal name) are marked as pending legal review and are not displayed on the public site until finalized.

---

## Contact & Support

- **Support email:** support@journeytracker.app
- **App:** Journey Tracker (coming soon to the Apple App Store)
- **Platforms:** iPhone · iPad · Mac

---

*Journey Tracker does not provide medical advice. Always consult a qualified healthcare provider.*
