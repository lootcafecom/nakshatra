"use client";

import { useState } from "react";

interface Testimonial {
  name: string;
  location: string;
  quote: string;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Priya Sharma",
    location: "Delhi, India",
    quote: "AstroLuxe has been a guiding light in my life. The readings are accurate and truly helpful.",
    initials: "PS",
  },
  {
    name: "Rahul Mehta",
    location: "Mumbai, India",
    quote: "The career guidance I received was spot on. It helped me make the right decisions.",
    initials: "RM",
  },
  {
    name: "Ananya Iyer",
    location: "Bangalore, India",
    quote: "Love the daily horoscopes. They're precise and keep me motivated every day.",
    initials: "AI",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  function prev() {
    setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }
  function next() {
    setActive((a) => (a + 1) % TESTIMONIALS.length);
  }

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-10 py-14">
      <div
        className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.2em] mb-8"
        style={{ color: "var(--ch-gold-400)" }}
      >
        <span>→</span> What Our <span style={{ color: "var(--ch-text-primary)" }}>Users</span> Say <span>←</span>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center flex-shrink-0"
          style={{ border: "1px solid var(--ch-border-strong)", color: "var(--ch-text-secondary)" }}
        >
          ‹
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 flex-1">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="p-5 transition-opacity"
              style={{
                background: "var(--ch-glass)",
                border: `1px solid ${i === active ? "var(--ch-gold-600)" : "var(--ch-border)"}`,
                borderRadius: "var(--ch-radius-md)",
                opacity: 1,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-[12px] font-semibold flex-shrink-0"
                  style={{ background: "var(--ch-violet-700)", color: "#fff" }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-[13px] font-medium" style={{ color: "var(--ch-text-primary)" }}>
                    {t.name}
                  </div>
                  <div className="text-[11px]" style={{ color: "var(--ch-text-muted)" }}>
                    {t.location}
                  </div>
                </div>
                <span className="ml-auto text-[26px]" style={{ color: "var(--ch-gold-600)", fontFamily: "var(--font-voice)" }}>
                  &rdquo;
                </span>
              </div>
              <p className="text-[12.5px] leading-relaxed" style={{ color: "var(--ch-text-secondary)" }}>
                {t.quote}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next testimonial"
          className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center flex-shrink-0"
          style={{ border: "1px solid var(--ch-border-strong)", color: "var(--ch-text-secondary)" }}
        >
          ›
        </button>
      </div>

      <div className="flex justify-center gap-1.5 mt-6">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: i === active ? "var(--ch-gold-400)" : "var(--ch-border-strong)" }}
          />
        ))}
      </div>
    </section>
  );
}
