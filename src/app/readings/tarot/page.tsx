"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import LanguageSelector from "@/components/LanguageSelector";
import LoadingShimmer from "@/components/LoadingShimmer";
import TarotCardArt from "@/components/TarotCardArt";
import { api, TarotData } from "@/lib/api";
import { DEFAULT_LANGUAGE } from "@/lib/languages";

export default function TarotReadingPage() {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TarotData | null>(null);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [interpretationError, setInterpretationError] = useState<string | null>(null);

  async function handleDraw(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Enter your name before drawing.");
      return;
    }
    setLoading(true);
    setError(null);
    setData(null);
    setInterpretation(null);
    setInterpretationError(null);

    try {
      const res = await api.tarotReading({ name, language });
      setData(res.calculated_data);
      setInterpretation(res.interpretation);
      setInterpretationError(res.interpretation_error || null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong drawing your cards.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="max-w-4xl mx-auto px-6 sm:px-10 py-12">
        <div className="text-center mb-10">
          <div className="font-voice italic text-[28px] mb-2" style={{ color: "var(--ch-gold-600)", fontFamily: "var(--font-voice)" }}>
            III
          </div>
          <h1 className="text-[24px] sm:text-[28px] mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
            Tarot
          </h1>
          <p className="text-[13.5px] max-w-md mx-auto" style={{ color: "var(--ch-text-secondary)" }}>
            A genuine random draw from the full 78-card deck — past, present,
            and future.
          </p>
        </div>

        <form onSubmit={handleDraw} className="ch-glass-strong p-6 max-w-md mx-auto mb-10">
          <label className="block text-[11px] uppercase tracking-[0.1em] mb-1.5" style={{ color: "var(--ch-text-muted)" }}>
            Your name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="As you'd like to be addressed"
            className="ch-input w-full px-3 py-2.5 text-[14px] mb-4"
          />
          <div className="mb-5">
            <div className="text-[11px] uppercase tracking-[0.1em] mb-2" style={{ color: "var(--ch-text-muted)" }}>
              Read my results in
            </div>
            <LanguageSelector value={language} onChange={setLanguage} />
          </div>
          <button type="submit" disabled={loading} className="ch-btn-primary w-full py-3 text-[14px] disabled:opacity-60">
            {loading ? "Shuffling the deck…" : "Draw my three cards"}
          </button>
        </form>

        {error && (
          <div className="ch-glass p-4 mb-8 text-center text-[13px] max-w-md mx-auto" style={{ color: "var(--ch-danger)" }}>
            {error}
          </div>
        )}

        {loading && (
          <div className="max-w-md mx-auto">
            <LoadingShimmer lines={4} />
          </div>
        )}

        {data && (
          <>
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {data.cards.map((card) => (
                <div key={card.position} className="flex flex-col items-center gap-3">
                  <TarotCardArt name={card.name} reversed={card.reversed} size={120} />
                  <div className="text-center">
                    <div className="text-[11px] uppercase tracking-wide" style={{ color: "var(--ch-gold-400)" }}>
                      {card.position}
                    </div>
                    <div className="text-[13px]" style={{ color: "var(--ch-text-primary)" }}>
                      {card.name}{card.reversed && " (reversed)"}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="ch-glass p-6 max-w-2xl mx-auto">
              <div className="text-[11px] uppercase tracking-[0.14em] mb-4" style={{ color: "var(--ch-text-muted)" }}>
                Reading for {name}
              </div>
              {interpretation && (
                <p className="text-[14px] leading-relaxed" style={{ color: "var(--ch-text-secondary)" }}>
                  {interpretation}
                </p>
              )}
              {interpretationError && (
                <div>
                  <p className="text-[13px] mb-2" style={{ color: "var(--ch-text-muted)" }}>
                    Your three cards above are genuinely drawn. The written
                    interpretation isn&apos;t available right now:
                  </p>
                  <p className="text-[12.5px] italic" style={{ color: "var(--ch-text-faint)" }}>
                    {interpretationError}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
