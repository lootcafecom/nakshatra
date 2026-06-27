# Nakshatra — Week 1 build

This is the real, working frontend for the Cosmic Horizon theme — not a mockup.
It's a Next.js + TypeScript + Tailwind project you can run on your own machine
right now.

## What's actually built this week

- **Home page** — hero, birth data form (name, date, time, city), mandatory
  language selector (9 languages, Sanskrit terms preserved), and a live SVG
  birth chart wheel that responds to form state.
- **Real SVG chart wheel** (`src/components/ChartWheel.tsx`) — a proper North
  Indian style Vedic diamond-house layout, built as data-driven SVG, not a
  decorative image. It currently shows placeholder signs; it's wired to accept
  real sign/planet data once the calculation engine (Week 2) is connected.
- **Cosmic Horizon design system** (`src/app/globals.css`) — every color,
  radius, and surface as a CSS variable, so the whole theme can be retuned
  from one file.
- **Navigation + route stubs** for all four reading types (Vedic, numerology,
  tarot, Vastu) and a pricing page, so the site structure is real even before
  each page's logic is built.
- **Language selector component**, reusable anywhere a reading is shown.

## What's intentionally NOT built yet (per the roadmap)

- No Swiss Ephemeris calculation — the chart wheel shows placeholder data
- No Claude API connection — no AI interpretation yet
- No payments, no auth, no database
- These are Week 2–4 per the master plan document

## Running it locally

```bash
cd frontend
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Project structure

```
frontend/
  src/
    app/
      page.tsx              — home page
      layout.tsx            — root layout, loads fonts and cosmic background
      globals.css            — Cosmic Horizon design tokens
      pricing/page.tsx
      readings/
        vedic/page.tsx
        numerology/page.tsx
        tarot/page.tsx
        vastu/page.tsx
    components/
      NavBar.tsx
      BirthForm.tsx           — the birth data input, used across reading types
      ChartWheel.tsx          — real SVG chart wheel
      LanguageSelector.tsx
      StarField.tsx           — ambient background stars
      ComingSoon.tsx          — placeholder for unbuilt reading pages
    lib/
      languages.ts            — the 9-language priority list from the plan
```

## A note on fonts

The theme uses Cinzel (display), Inter (body), and Cormorant (voice/serif
moments), loaded from Google Fonts via `@import` in `globals.css`. This
sandbox's network couldn't reach `fonts.googleapis.com` to verify rendering,
but the URL and font names are correct — they will load normally on Vercel,
your own machine, or any standard hosting.

## Next step (Week 2, per the plan)

Connect the Python/Swiss Ephemeris calculation microservice so the chart
wheel and birth form submission produce a real, accurate chart instead of
placeholder data — then wire one reading type to the Anthropic API for live
interpretation.
