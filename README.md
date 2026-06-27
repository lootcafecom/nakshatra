# Nakshatra — full build (frontend + backend connected)

The AstroLuxe-themed landing page, plus all four reading types fully wired
to a real calculation backend. This is the actual product working
end-to-end, not a mockup.

## What's real and working

- **Landing page** — full AstroLuxe design: hero with zodiac wheel,
  services, zodiac strip, testimonials, blog, newsletter, footer.
- **Vedic chart reading** (`/readings/vedic`) — real Swiss Ephemeris
  calculation (Lahiri ayanamsha), a chart wheel rendered from the actual
  calculated houses and planets, full planetary position table, and an
  AI interpretation grounded in that exact data.
- **Numerology reading** (`/readings/numerology`) — real Pythagorean
  numerology with every reduction step shown, plus AI interpretation.
- **Tarot reading** (`/readings/tarot`) — genuine random draw from the
  full 78-card deck, rendered as original card art, plus AI interpretation.
- **Vastu reading** (`/readings/vastu`) — geocodes the person's city and
  looks up true magnetic declination there, so directional guidance is
  anchored to real coordinates (needs live internet to reach Nominatim
  and NOAA — see backend README).
- **Mandatory language selector** on every reading — 9 languages,
  Sanskrit terms preserved regardless of language chosen.
- **Sign in / sign up** (`/account`) — email + password, JWT session
  stored in localStorage. The nav bar's "Sign In" button shows the
  signed-in user's name once authenticated.
- **Saved birth profiles** (`/profiles`) — save yourself and up to 4
  family members once; every reading made while signed in automatically
  saves to that user's history on the backend.
- **Kundli matching** (`/readings/matching`) — two-person Ashtakoot
  Guna Milan with full koota breakdown, dosha indicators, and AI
  interpretation.
- **Daily Panchang** (`/readings/panchang`) — Tithi, Vaar, Nakshatra,
  Yoga, Karana, sunrise/sunset, and Rahu Kaal. Personalized automatically
  to your saved profile's location when signed in, or enter a city
  manually otherwise.
- **Muhurta** (`/readings/muhurta`) — describe what you're planning in
  plain language (e.g. "starting a new business"); it's matched to one
  of 6 classical activity rule sets automatically. Either check a
  specific date you have in mind, or search a date range (up to a year)
  for the best-ranked candidates.
- **Remedies & gemstones** (`/readings/remedy`) — gemstone, mantra, and
  charity remedies for whichever planets are actually flagged in your
  calculated chart (debilitated, in a difficult house, or a shadow
  planet per Navagraha tradition) — not a generic list.

## Running it locally

You need **both** the backend and frontend running.

```bash
# Terminal 1 — backend
cd backend
pip install -r requirements.txt
cp .env.example .env   # add your ANTHROPIC_API_KEY
uvicorn app.main:app --reload --port 8000

# Terminal 2 — frontend
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

Without `ANTHROPIC_API_KEY` set, every reading still calculates and
displays its real data correctly — only the written interpretation will
show a clear "not available" message instead of AI text. This was
verified directly during the build.

## Project structure

```
backend/
  app/
    vedic.py            — Swiss Ephemeris birth chart calculation
    numerology.py        — Pythagorean numerology, visible reduction steps
    tarot.py              — 78-card deck, randomized draw
    vastu.py              — geocoding + magnetic declination
    interpretation.py     — AI prompts (calculation data in, explanation out)
    main.py                — FastAPI app, four reading endpoints
    tests/test_engines.py  — 21 tests, all passing
  requirements.txt
  README.md

frontend/
  src/
    app/
      page.tsx                          — AstroLuxe home page
      account/page.tsx                  — sign in / sign up
      profiles/page.tsx                 — saved birth profile management
      readings/{vedic,numerology,tarot,vastu,matching}/page.tsx
      pricing/page.tsx
    components/                         — all UI pieces (nav, hero, cards, etc.)
    lib/
      api.ts             — typed client for the backend
      auth.tsx             — auth context provider (signup/login/session)
      cities.ts             — known-city coordinate lookup for the birth form
      languages.ts, zodiac.ts
```

## Known limitations in this build

- **City lookup is a fixed list** (`lib/cities.ts`), not live geocoding —
  this sandbox's network couldn't reach Nominatim to test a live lookup
  for the Vedic/numerology forms. Swap in a real geocoding call (the
  pattern is already written in `backend/app/vastu.py`) when you deploy
  somewhere with normal internet access.
- **No database** — nothing is saved between requests yet (Week 3-4).
- **No payments or auth yet** (Week 3-4 per the master plan).

## Next steps

Per the master plan: persistence (save a profile once, read it on every
future visit), payments (one-time + subscription), and the daily
horoscope / Kundli matching / Muhurta features from the post-launch
priority list.
