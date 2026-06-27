"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BirthForm, { BirthData } from "@/components/BirthForm";
import LoadingShimmer from "@/components/LoadingShimmer";
import { api, NumerologyData } from "@/lib/api";
import { findCity } from "@/lib/cities";

const NUMBER_ORDER: (keyof NumerologyData)[] = [
  "Life Path", "Expression", "Soul Urge", "Personality", "Personal Year",
];

export default function NumerologyReadingPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<NumerologyData | null>(null);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [interpretationError, setInterpretationError] = useState<string | null>(null);
  const [personName, setPersonName] = useState("");

  async function handleSubmit(form: BirthData) {
    // numerology only strictly needs name + DOB, but we reuse the same
    // form for a consistent flow; city is required by the shared form
    // but unused by this calculation.
    const city = findCity(form.place) ?? { latitude: 0, longitude: 0, timezone: "UTC" };

    setLoading(true);
    setError(null);
    setData(null);
    setInterpretation(null);
    setInterpretationError(null);
    setPersonName(form.name);

    try {
      const res = await api.numerologyReading({
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
      setError(e instanceof Error ? e.message : "Something went wrong calculating your numbers.");
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
            II
          </div>
          <h1 className="text-[24px] sm:text-[28px] mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
            Numerology
          </h1>
          <p className="text-[13.5px] max-w-md mx-auto" style={{ color: "var(--ch-text-secondary)" }}>
            Pure deterministic math — every reduction step is shown, so you can
            verify it yourself rather than trust an opaque result.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 items-start mb-10">
          <BirthForm onSubmit={handleSubmit} submitting={loading} submitLabel="Calculate my numbers" />

          <div className="ch-glass p-6 min-h-[300px]">
            <div className="text-[11px] uppercase tracking-[0.14em] mb-4" style={{ color: "var(--ch-text-muted)" }}>
              {data ? `${personName}'s numbers` : "Your numbers"}
            </div>
            {loading && <LoadingShimmer lines={5} />}
            {!data && !loading && (
              <p className="text-[12.5px]" style={{ color: "var(--ch-text-muted)" }}>
                Fill in your name and birth date to see your Life Path,
                Expression, Soul Urge, Personality, and Personal Year numbers,
                with the full calculation shown for each.
              </p>
            )}
            {data && (
              <div className="space-y-4">
                {NUMBER_ORDER.map((key) => {
                  const num = data[key];
                  return (
                    <div key={key} style={{ borderBottom: "1px solid var(--ch-border)", paddingBottom: 12 }}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[13px]" style={{ color: "var(--ch-text-primary)" }}>{key}</span>
                        <span
                          className="text-[18px] font-semibold ch-gold-text"
                        >
                          {num.value}{num.is_master && <span className="text-[10px] ml-1">(master)</span>}
                        </span>
                      </div>
                      <div className="text-[11px] font-mono" style={{ color: "var(--ch-text-faint)" }}>
                        {num.steps.map((s, i) => (
                          <span key={i}>
                            {s.input} = {s.output}
                            {i < num.steps.length - 1 ? " → " : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="ch-glass p-4 mb-8 text-center text-[13px]" style={{ color: "var(--ch-danger)" }}>
            {error}
          </div>
        )}

        {data && (
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
              <div>
                <p className="text-[13px] mb-2" style={{ color: "var(--ch-text-muted)" }}>
                  The numbers above are calculated and accurate. The written
                  interpretation isn&apos;t available right now:
                </p>
                <p className="text-[12.5px] italic" style={{ color: "var(--ch-text-faint)" }}>
                  {interpretationError}
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
