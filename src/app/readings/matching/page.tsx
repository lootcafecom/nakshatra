"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import PersonFields, { PersonFormData } from "@/components/PersonFields";
import LanguageSelector from "@/components/LanguageSelector";
import LoadingShimmer from "@/components/LoadingShimmer";
import { api, MatchingData } from "@/lib/api";
import { findCity } from "@/lib/cities";
import { DEFAULT_LANGUAGE } from "@/lib/languages";

const emptyPerson: PersonFormData = { name: "", dob: "", tob: "", place: "" };

export default function MatchingReadingPage() {
  const [personA, setPersonA] = useState<PersonFormData>(emptyPerson);
  const [personB, setPersonB] = useState<PersonFormData>(emptyPerson);
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<MatchingData | null>(null);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [interpretationError, setInterpretationError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!personA.name.trim() || !personB.name.trim()) {
      setError("Enter both names.");
      return;
    }
    if (!personA.dob || !personA.tob || !personB.dob || !personB.tob) {
      setError("Enter complete birth date and time for both people.");
      return;
    }
    const cityA = findCity(personA.place);
    const cityB = findCity(personB.place);
    if (!cityA || !cityB) {
      setError("Choose a recognized city for both people so we can use exact coordinates.");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);
    setInterpretation(null);
    setInterpretationError(null);

    try {
      const res = await api.matchingReading({
        person_a: {
          name: personA.name, birth_date: personA.dob, birth_time: personA.tob,
          latitude: cityA.latitude, longitude: cityA.longitude, timezone: cityA.timezone,
        },
        person_b: {
          name: personB.name, birth_date: personB.dob, birth_time: personB.tob,
          latitude: cityB.latitude, longitude: cityB.longitude, timezone: cityB.timezone,
        },
        language,
      });
      setData(res.calculated_data);
      setInterpretation(res.interpretation);
      setInterpretationError(res.interpretation_error || null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong calculating compatibility.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="max-w-5xl mx-auto px-6 sm:px-10 py-12">
        <div className="text-center mb-10">
          <div
            className="font-voice italic text-[28px] mb-2"
            style={{ color: "var(--ch-gold-600)", fontFamily: "var(--font-voice)" }}
          >
            V
          </div>
          <h1 className="text-[24px] sm:text-[28px] mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
            Kundli matching
          </h1>
          <p className="text-[13.5px] max-w-lg mx-auto" style={{ color: "var(--ch-text-secondary)" }}>
            The classical 36-point Ashtakoot Guna Milan, calculated from both
            Moon positions — plus Mangal, Nadi, and Bhakoot dosha checks.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <PersonFields label="First person" value={personA} onChange={setPersonA} listId="cities-a" />
            <PersonFields label="Second person" value={personB} onChange={setPersonB} listId="cities-b" />
          </div>

          <div className="ch-glass-strong p-5 max-w-md mx-auto">
            <div className="text-[11px] uppercase tracking-[0.1em] mb-2" style={{ color: "var(--ch-text-muted)" }}>
              Read the results in
            </div>
            <LanguageSelector value={language} onChange={setLanguage} />
            <button
              type="submit"
              disabled={loading}
              className="ch-btn-primary w-full py-3 text-[14px] mt-5 disabled:opacity-60"
            >
              {loading ? "Comparing the charts…" : "Calculate compatibility"}
            </button>
          </div>
        </form>

        {error && (
          <div className="ch-glass p-4 mb-8 text-center text-[13px] max-w-md mx-auto" style={{ color: "var(--ch-danger)" }}>
            {error}
          </div>
        )}

        {loading && (
          <div className="max-w-md mx-auto">
            <LoadingShimmer lines={5} />
          </div>
        )}

        {data && (
          <>
            <div className="ch-glass-strong p-7 mb-8 text-center">
              <div className="text-[13px] mb-1" style={{ color: "var(--ch-text-muted)" }}>
                {data.person_a_name} &amp; {data.person_b_name}
              </div>
              <div className="text-[44px] font-semibold ch-gold-text mb-1">
                {data.total_score} / {data.max_score}
              </div>
              <div className="text-[14px]" style={{ color: "var(--ch-text-secondary)" }}>
                {data.verdict}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 mb-8">
              <div className="ch-glass p-6">
                <div className="text-[11px] uppercase tracking-[0.14em] mb-4" style={{ color: "var(--ch-text-muted)" }}>
                  Koota breakdown
                </div>
                <div className="space-y-3">
                  {data.kootas.map((k) => (
                    <div key={k.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[13px]" style={{ color: "var(--ch-text-primary)" }}>{k.name}</span>
                        <span className="text-[13px] font-medium" style={{ color: "var(--ch-gold-400)" }}>
                          {k.score} / {k.max_points}
                        </span>
                      </div>
                      <div
                        className="h-1.5 rounded-full overflow-hidden mb-1"
                        style={{ background: "var(--ch-glass)" }}
                      >
                        <div
                          className="h-full"
                          style={{
                            width: `${(k.score / k.max_points) * 100}%`,
                            background: "linear-gradient(90deg, var(--ch-violet-500), var(--ch-gold-400))",
                          }}
                        />
                      </div>
                      <div className="text-[11px]" style={{ color: "var(--ch-text-faint)" }}>{k.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ch-glass p-6">
                <div className="text-[11px] uppercase tracking-[0.14em] mb-4" style={{ color: "var(--ch-text-muted)" }}>
                  Dosha checks
                </div>
                <DoshaRow
                  label="Nadi Dosha"
                  present={data.nadi_dosha}
                  detail={data.nadi_dosha ? "Same Nadi — the most significant classical concern." : "Different Nadi — no concern here."}
                />
                <DoshaRow
                  label="Bhakoot Dosha"
                  present={data.bhakoot_dosha}
                  detail={data.bhakoot_dosha ? "6/8 or 2/12 sign relationship detected." : "No adverse sign relationship."}
                />
                <DoshaRow
                  label={`Mangal Dosha — ${data.person_a_name}`}
                  present={data.mangal_dosha.person_a_dosha}
                  detail={`Mars in house ${data.mangal_dosha.person_a_mars_house}`}
                />
                <DoshaRow
                  label={`Mangal Dosha — ${data.person_b_name}`}
                  present={data.mangal_dosha.person_b_dosha}
                  detail={`Mars in house ${data.mangal_dosha.person_b_mars_house}`}
                />
                {data.mangal_dosha.cancellation_reason && (
                  <p className="text-[12px] italic mt-2" style={{ color: "var(--ch-gold-400)" }}>
                    {data.mangal_dosha.cancellation_reason}
                  </p>
                )}
              </div>
            </div>

            <div className="ch-glass p-6 max-w-3xl mx-auto">
              <div className="text-[11px] uppercase tracking-[0.14em] mb-4" style={{ color: "var(--ch-text-muted)" }}>
                Reading
              </div>
              {interpretation && (
                <p className="text-[14px] leading-relaxed" style={{ color: "var(--ch-text-secondary)" }}>
                  {interpretation}
                </p>
              )}
              {interpretationError && (
                <div>
                  <p className="text-[13px] mb-2" style={{ color: "var(--ch-text-muted)" }}>
                    The score and koota breakdown above are real and accurate.
                    The written interpretation isn&apos;t available right now:
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

function DoshaRow({ label, present, detail }: { label: string; present: boolean; detail: string }) {
  return (
    <div className="flex items-start gap-3 py-2.5" style={{ borderBottom: "1px solid var(--ch-border)" }}>
      <span
        className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
        style={{ background: present ? "var(--ch-danger)" : "var(--ch-success)" }}
      />
      <div>
        <div className="text-[13px]" style={{ color: "var(--ch-text-primary)" }}>{label}</div>
        <div className="text-[11.5px]" style={{ color: "var(--ch-text-muted)" }}>{detail}</div>
      </div>
    </div>
  );
}
