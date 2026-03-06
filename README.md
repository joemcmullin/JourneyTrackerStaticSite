# Journey Tracker — Static Marketing Site

The official marketing and legal information website for **Journey Tracker**, a native SwiftUI multiplatform app for iPhone, iPad, and Mac that helps individuals track their GLP-1 therapy, weight loss progress, body composition, hydration, fasting, and health milestones.

> **App Status:** Coming Soon to the Apple App Store

---

## 📋 Table of Contents

- [Overview](#overview)
- [Site Structure](#site-structure)
- [Pages & Sections](#pages--sections)
- [Screenshots](#screenshots)
- [Technology](#technology)
- [Local Development](#local-development)
- [Deployment (GitHub Pages)](#deployment-github-pages)
- [Image Assets](#image-assets)
- [Legal & Compliance Notes](#legal--compliance-notes)
- [Contact & Support](#contact--support)

---

## Overview

This repository contains the single-page marketing website for Journey Tracker. The site is a self-contained `index.html` file with all CSS embedded in a `<style>` block and minimal vanilla JavaScript — no frameworks, no external dependencies, no CDN calls. It is designed to be hosted as a static site on GitHub Pages or any standard static hosting provider.

The site serves the following purposes:

- **Marketing** — communicating the app's value to prospective users
- **Legal** — hosting plain-language summaries of the Privacy Policy, HIPAA disclosures, and Terms of Service ahead of formal App Store review
- **Support** — providing a contact method for users and reviewers
- **App Store Review** — satisfying Apple's requirement for a publicly accessible privacy policy and support URL

---

## Site Structure

```
JourneyTrackerStaticSite/
├── index.html          # Complete single-page site (HTML + CSS + JS)
├── images/
│   ├── hero-dashboard.png      # My Journey dashboard hero screenshot
│   ├── feature-therapy.png     # Therapy Trend (Zepbound / tirzepatide)
│   ├── feature-hydration.png   # Hydration tracking detail view
│   └── feature-security.png    # Face ID / biometric lock screen
└── README.md
```

---

## Pages & Sections

The site is a single scrollable page with a sticky navigation bar. All sections are reachable via anchor links.

| Section | Anchor | Description |
|---|---|---|
| Home / Hero | `#home` | App tagline, CTA, hero screenshot, Coming Soon badge |
| Features | `#features` | Four alternating screenshot + text feature rows |
| FAQs | `#faqs` | 10 accordion Q&A items for prospective users |
| Privacy Policy | `#privacy` | Plain-language privacy summary using actual policy language |
| HIPAA & Health Information | `#hipaa` | Consumer app disclosures; not-a-covered-entity statement; medical disclaimer |
| Terms of Service | `#terms` | Plain-language ToS summary using actual legal document language |
| Contact & Support | `#contact` | Email link + illustrative contact form |

---

## Pages & Sections — Detail

### Hero (`#home`)
- App name, tagline, and 2–3 sentence description
- "Coming Soon to the App Store" CTA (non-functional; styled with sunrise orange)
- Pulsing "Get notified at launch" link directing to the contact form
- Phone frame displaying the real My Journey dashboard screenshot
- Platform callout: iPhone · iPad · Mac

### Features (`#features`)
Four alternating left/right rows, each pairing a real in-app screenshot (in a CSS phone frame) with a title, description, and bullet list:

1. **My Journey Dashboard** — Weight trend charts, milestone badges, Journey Points gamification
2. **GLP-1 Therapy Tracking** — Dose logging, dose escalation timeline, weight × dose correlation
3. **Fasting & Hydration** — Water intake logging, fasting window tracking, Apple Health sync
4. **Private by Design** — Face ID / Touch ID lock, Sign in with Apple, CloudKit (user's iCloud), no ads

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
Uses language from the full Privacy Policy document. Covers:
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
Uses language from the full Terms of Service document. Covers:
- 18+ age requirement
- Not medical advice disclaimer (full language)
- AI Lab Analysis limitations: powered by Anthropic Claude AI; may be inaccurate; no access to complete medical history; not reviewed by a clinician
- Subscription tiers: free (2 lab sessions), Pro (unlimited + AI analysis + OCR import)
- Apple App Store billing; auto-renewal; refunds per Apple policy
- Data ownership: user owns all health data
- No warranty ("as is")
- Liability limitation (12-month cap; health decisions expressly disclaimed)
- User responsibilities

### Cookie Notice
A fixed bottom banner using the site's disclosure language: "Journey Tracker's website uses only essential cookies required for the site to function. We do not use advertising trackers or sell your data." Dismissal is stored in localStorage.

---

## Screenshots

Four real in-app screenshots are used as marketing assets. They are displayed inside CSS-only phone frames (no image assets for the frames — pure border-radius and box-shadow).

| File | Screen shown | Used in |
|---|---|---|
| `images/hero-dashboard.png` | My Journey — Weight card (189.8 lbs, Down 10 lb milestone) | Hero section |
| `images/feature-therapy.png` | Therapy Trend — Zepbound 5.0 mg, dose timeline | GLP-1 Therapy feature row |
| `images/feature-hydration.png` | Hydration — 24.0 fl oz / 95.5 fl oz bar chart | Fasting & Hydration feature row |
| `images/feature-security.png` | Face ID lock screen — "Journey Tracker is locked" | Private by Design feature row |

---

## Technology

| Concern | Approach |
|---|---|
| HTML | Semantic HTML5 (`<header>`, `<nav>`, `<section>`, `<footer>`) |
| CSS | Single embedded `<style>` block; CSS custom properties; responsive grid; no frameworks |
| JavaScript | ~50 lines of vanilla JS — mobile nav toggle, FAQ accordion, cookie banner |
| Fonts | System font stack: `-apple-system, system-ui, "SF Pro Text", "Helvetica Neue", Arial, sans-serif` |
| External dependencies | **None** — no CDN, no npm, no build step |
| Responsive | Mobile-first; breakpoints at 768px and 520px |
| Accessibility | Semantic landmarks, sufficient color contrast, ARIA label on hamburger toggle |

### Design System

| Token | Value | Use |
|---|---|---|
| `--forest-dark` | `#1a3a2a` | Primary headings, nav, HIPAA section bg |
| `--forest-mid` | `#2d5a3d` | Secondary actions, borders, footer |
| `--forest-light` | `#4a8a5e` | Accent text, checkmarks, links |
| `--sunrise` | `#e8792a` | Primary CTAs, badges |
| `--sunrise-light` | `#f59c55` | CTA gradient, highlights |
| `--cream` | `#faf7f2` | Page background, card backgrounds |

---

## Local Development

No build step required. Open `index.html` directly in any browser:

```bash
# Option 1 — open directly
open index.html

# Option 2 — serve locally (Python)
python3 -m http.server 8080
# then visit http://localhost:8080

# Option 3 — serve locally (Node)
npx serve .
# then visit the URL shown in the terminal
```

---

## Deployment (GitHub Pages)

This site is designed to be hosted on GitHub Pages from the `main` branch.

**To enable GitHub Pages:**

1. Go to the repository on GitHub: `https://github.com/joemcmullin/JourneyTrackerStaticSite`
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. GitHub will publish the site at: `https://joemcmullin.github.io/JourneyTrackerStaticSite/`

**Custom domain (journeytracker.app):**

To use a custom domain, add a `CNAME` file to the repository root containing your domain:

```
journeytracker.app
```

Then update your DNS provider with a CNAME record pointing to `joemcmullin.github.io`.

---

## Image Assets

The `images/` directory contains real in-app screenshots. To update screenshots:

1. Replace the `.png` file in `images/` with the new screenshot using the same filename
2. Keep files named in lowercase with hyphens (GitHub Pages runs on Linux — file paths are case-sensitive)
3. Commit and push; GitHub Pages will deploy automatically

---

## Legal & Compliance Notes

- **Privacy Policy:** The `#privacy` section uses language from the full Privacy Policy document. A complete, legally binding Privacy Policy will be published at `journeytracker.app/privacy` before App Store public release.
- **Terms of Service:** The `#terms` section uses language from the full Terms of Service document. A complete ToS will be published before general release.
- **HIPAA:** Journey Tracker is a consumer app and is not a HIPAA covered entity. The `#hipaa` section explains this positioning clearly and includes a full medical disclaimer.
- **Apple App Store:** This site satisfies Apple's requirement for a publicly accessible privacy policy URL and support URL. The support URL and privacy URL submitted during App Store review should point to this site.
- **Placeholder items:** Several items in the underlying legal documents (effective dates, governing state, developer legal name, law firm review signature) are marked as pending legal review and are not displayed on this public site.

---

## Contact & Support

- **Support email:** apexdevsupport@gmail.com
- **App:** Journey Tracker (coming soon to the Apple App Store)
- **Platforms:** iPhone · iPad · Mac

---

*Journey Tracker does not provide medical advice. Always consult a qualified healthcare provider.*
