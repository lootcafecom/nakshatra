"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BirthForm, { BirthData } from "@/components/BirthForm";
import LoadingShimmer from "@/components/LoadingShimmer";
import { api, RemedyData, RemedyConcern } from "@/lib/api";
import { findCity } from "@/lib/cities";

export default function RemedyReadingPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RemedyData | null>(null);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [interpretationError, setInterpretationError] = useState<string | null>(null);
  const [personName, setPersonName] = useState("");

  async function handleSubmit(form: BirthData) {
    const city = findCity(form.place);
    if (!city) {
      setError("Choose a recognized city so we can use its exact coordinates.");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);
    setInterpretation(null);
    setInterpretationError(null);
    setPersonName(form.name);

    try {
      const res = await api.remedyReading({
        name: form.name,
        birth_date: form.dob,
        birth_time: form.tob,
        latitude: city.latitude,
        longitude: city.longitude,
        timezone: city.timezone,
        language: form.language,
      });
      setData(res.calculated_data);
      setInterpretation(res.interpretation);
      setInterpretationError(res.interpretation_error || null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong building your remedy profile.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="max-w-5xl mx-auto px-6 sm:px-10 py-12">
        <div className="text-center mb-10">
          <div className="font-voice italic text-[28px] mb-2" style={{ color: "var(--ch-gold-600)", fontFamily: "var(--font-voice)" }}>
            VIII
          </div>
          <h1 className="text-[24px] sm:text-[28px] mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
            Remedies &amp; gemstones
          </h1>
          <p className="text-[13.5px] max-w-lg mx-auto" style={{ color: "var(--ch-text-secondary)" }}>
            Gemstone, mantra, and charity remedies for the planets actually
            flagged in your calculated chart.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-10">
          <BirthForm onSubmit={handleSubmit} submitting={loading} submitLabel="Build my remedy profile" />
        </div>

        {error && (
          <div className="ch-glass p-4 mb-8 text-center text-[13px] max-w-md mx-auto" style={{ color: "var(--ch-danger)" }}>
            {error}
          </div>
        )}

        {loading && (
          <div className="max-w-md mx-auto">
            <LoadingShimmer lines={6} />
          </div>
        )}

        {data && (
          <>
            {data.strongest_planet && (
              <div className="ch-glass-strong p-5 max-w-2xl mx-auto mb-8 text-center">
                <span className="text-[13px]" style={{ color: "var(--ch-text-secondary)" }}>
                  {data.strongest_planet} is exalted in {personName}&apos;s chart — already a strong placement, no remedy needed there.
                </span>
              </div>
            )}

            {data.concerns.length === 0 ? (
              <div className="ch-glass p-6 max-w-md mx-auto text-center text-[13.5px]" style={{ color: "var(--ch-text-muted)" }}>
                No planets were flagged as needing remedial attention in this chart.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                {data.concerns.map((c) => (
                  <ConcernCard key={c.planet} concern={c} />
                ))}
              </div>
            )}

            <div className="ch-glass p-6 max-w-2xl mx-auto">
              <div className="text-[11px] uppercase tracking-[0.14em] mb-4" style={{ color: "var(--ch-text-muted)" }}>
                Reading for {personName}
              </div>
              {interpretation && (
                <p className="text-[14px] leading-relaxed" style={{ color: "var(--ch-text-secondary)" }}>
                  {interpretation}
                </p>
              )}
              {interpretationError && (
                <p className="text-[12.5px] italic" style={{ color: "var(--ch-text-faint)" }}>
                  {interpretationError}
                </p>
              )}
              <p className="text-[11.5px] italic mt-4 pt-4" style={{ color: "var(--ch-text-faint)", borderTop: "1px solid var(--ch-border)" }}>
                Gemstone remedies in particular should be confirmed by a qualified
                astrologer before purchase — an unsuitable stone is classically
                considered counterproductive, not neutral.
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function ConcernCard({ concern }: { concern: RemedyConcern }) {
  return (
    <div className="ch-glass p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[16px]" style={{ fontFamily: "var(--font-voice)", color: "var(--ch-text-primary)" }}>
          {concern.planet}
        </span>
        <span className="text-[10.5px] uppercase tracking-wide px-2 py-1 rounded-full" style={{ background: "var(--ch-glass-strong)", color: "var(--ch-gold-400)" }}>
          {concern.sign}, house {concern.house}
        </span>
      </div>
      <p className="text-[12px] mb-4" style={{ color: "var(--ch-text-muted)" }}>
        {concern.reason}
      </p>

      <div className="space-y-2.5">
        <RemedyRow
          label="Gemstone"
          value={`${concern.gemstone.english} (${concern.gemstone.sanskrit}) — ${concern.gemstone.metal}, ${concern.gemstone.finger}, from a ${concern.gemstone.weekday}`}
        />
        <RemedyRow label="Mantra" value={`${concern.mantra.beej_mantra} — ${concern.mantra.recitation_count}x`} mono />
        <RemedyRow label="Charity" value={`${concern.charity.item}, on a ${concern.charity.weekday}`} />
      </div>
    </div>
  );
}

function RemedyRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wide mb-0.5" style={{ color: "var(--ch-text-faint)" }}>
        {label}
      </div>
      <div
        className="text-[12.5px] leading-relaxed"
        style={{ color: "var(--ch-text-secondary)", fontFamily: mono ? "monospace" : undefined }}
      >
        {value}
      </div>
    </div>
  );
}
