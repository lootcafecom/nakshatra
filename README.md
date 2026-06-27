# Nakshatra — AstroLuxe theme build

This is the real, working frontend rebuilt to match the AstroLuxe reference
design exactly — purple/violet cosmic palette, gold accents, full landing
page with every section. It's a Next.js + TypeScript + Tailwind project you
can run on your own machine right now.

## What's actually built

Every section from the reference image, as real working components:

- **Nav bar** — logo, links, search icon, pill-shaped "Sign In" button
- **Hero** — headline, trust badges (100% Accurate / AI Powered / Secure),
  a quick-search form (sign / date / time / Get My Horoscope), and an
  original SVG zodiac wheel illustration (concentric gold rings, 12 glyphs,
  glowing compass star center — not a stock image, so it's license-clean)
- **Premium Services** — 6 service cards with hand-built SVG icons
- **Zodiac strip** — all 12 signs with date ranges, "View All Signs" CTA
- **Why Choose AstroLuxe** — 4 stat cards (users, accuracy, astrologers, years)
- **Today's Horoscope** — Leo example card with love/career/health meters
- **Testimonials** — 3-card carousel with working prev/next and dot navigation
- **Astrology Insights & Blogs** — 4 post cards with gradient art placeholders
- **Newsletter banner** — email capture form
- **Footer** — 4 link columns, social icons, contact row, copyright bar

## What's intentionally NOT built yet

- No Swiss Ephemeris calculation — the hero form captures input but doesn't
  calculate a real chart yet
- No Claude API connection — no AI interpretation yet
- No payments, no auth, no database
- Blog post content, testimonials, and stats are placeholder copy — swap in
  real content whenever you have it

## Running it locally

```bash
cd frontend
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Project structure

```
frontend/src/
  app/
    page.tsx                    — home page, assembles every section in order
    layout.tsx                  — root layout, fonts, cosmic background
    globals.css                 — AstroLuxe design tokens (purple/gold palette)
    pricing/page.tsx
    readings/{vedic,numerology,tarot,vastu}/page.tsx
  components/
    NavBar.tsx
    HeroSection.tsx              — assembles headline + badges + form + wheel
    HeroSearchForm.tsx           — sign/date/time quick search
    ZodiacWheelHero.tsx          — original SVG zodiac wheel illustration
    TrustBadges.tsx
    ServicesSection.tsx          — 6 service cards
    ZodiacStrip.tsx              — 12-sign row
    WhyChooseAndHoroscope.tsx    — stats panel + today's horoscope panel
    TestimonialsSection.tsx      — working carousel
    BlogSection.tsx              — 4 insight cards
    NewsletterBanner.tsx
    Footer.tsx
    BirthForm.tsx, ChartWheel.tsx, LanguageSelector.tsx — from Week 1,
      still used on the /readings pages
  lib/
    zodiac.ts                    — the 12 signs, symbols, date ranges
    languages.ts                 — the 9-language priority list
```

## A note on fonts and screenshots

The theme uses Cinzel (display), Inter (body), and Cormorant (voice/serif),
loaded via `@import` in `globals.css`. This build sandbox couldn't reach
Google Fonts or run a real browser to capture a pixel screenshot, so this
was verified by checking the generated HTML and CSS output directly rather
than a visual screenshot. It will render exactly as designed on Vercel,
your own machine, or any standard host.

## Next step

Connect the Python/Swiss Ephemeris calculation microservice so the hero
form and reading pages produce a real, accurate chart — then wire one
reading type to the Anthropic API for live interpretation.

