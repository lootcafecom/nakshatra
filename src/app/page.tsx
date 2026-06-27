"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BirthForm, { BirthData } from "@/components/BirthForm";
import ChartWheel from "@/components/ChartWheel";

const SYSTEMS = [
  {
    roman: "I",
    title: "Vedic chart",
    desc: "Calculated from true planetary positions at your exact moment of birth.",
  },
  {
    roman: "II",
    title: "Numerology",
    desc: "Your name and date, reduced to the numbers that have always governed them.",
  },
  {
    roman: "III",
    title: "Tarot",
    desc: "Three cards drawn for where you've been, where you stand, what's arriving.",
  },
  {
    roman: "IV",
    title: "Vastu",
    desc: "Direction and dwelling, read against the true compass of where you live.",
  },
];

export default function Home() {
  const [submitted, setSubmitted] = useState<BirthData | null>(null);

  function handleSubmit(data: BirthData) {
    setSubmitted(data);
    // Week 1 scope: capture and display the data locally.
    // Calculation engine and AI interpretation connect in Week 2-3.
  }

  return (
    <div className="min-h-screen">
      <NavBar />

      <main className="max-w-5xl mx-auto px-6 sm:px-10 py-14 sm:py-20">
        <section className="text-center mb-14 ch-fade-up">
          <div
            className="text-[11px] uppercase tracking-[0.22em] mb-4"
            style={{ color: "var(--ch-gold-400)" }}
          >
            a single place to be read
          </div>
          <h1
            className="ch-heading text-[28px] sm:text-[38px] leading-[1.3] max-w-2xl mx-auto"
            style={{ fontWeight: 600, color: "var(--ch-text-primary)" }}
          >
            Your chart, your numbers, your cards —{" "}
            <span className="ch-gold-text">held together</span>, finally
          </h1>
          <p
            className="mt-4 text-[14px] max-w-md mx-auto"
            style={{ color: "var(--ch-text-secondary)" }}
          >
            Four traditions, calculated from real data and interpreted in
            your own language. No app-hopping, no repeat payments for the
            same birth.
          </p>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <BirthForm onSubmit={handleSubmit} />

          <div className="ch-glass p-6 flex flex-col items-center">
            <div
              className="text-[11px] uppercase tracking-[0.14em] mb-4 self-start"
              style={{ color: "var(--ch-text-muted)" }}
            >
              {submitted ? `${submitted.name}'s chart` : "Preview chart"}
            </div>
            <ChartWheel size={210} />
            <p
              className="text-[12px] text-center mt-4"
              style={{ color: "var(--ch-text-muted)" }}
            >
              {submitted
                ? "Calculated once you connect a calculation engine — coming in Week 2."
                : "Fill in your birth details to see your real chart take shape here."}
            </p>
          </div>
        </section>

        <section className="mt-20">
          <div
            className="text-[11px] uppercase tracking-[0.18em] text-center mb-8"
            style={{ color: "var(--ch-text-muted)" }}
          >
            the four systems
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SYSTEMS.map((s) => (
              <div key={s.title} className="ch-glass p-5 flex gap-4">
                <div
                  className="font-voice italic text-[22px] w-7 flex-shrink-0 pt-0.5"
                  style={{ color: "var(--ch-gold-600)", fontFamily: "var(--font-voice)" }}
                >
                  {s.roman}
                </div>
                <div>
                  <div
                    className="text-[15px] mb-1"
                    style={{
                      fontFamily: "var(--font-voice)",
                      color: "var(--ch-text-primary)",
                    }}
                  >
                    {s.title}
                  </div>
                  <div className="text-[13px] leading-relaxed" style={{ color: "var(--ch-text-muted)" }}>
                    {s.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer
          className="mt-20 pt-8 text-center ch-divider"
        >
          <p
            className="font-voice italic text-[12px]"
            style={{ color: "var(--ch-text-faint)", fontFamily: "var(--font-voice)" }}
          >
            held in confidence, read once, kept always
          </p>
        </footer>
      </main>
    </div>
  );
}
