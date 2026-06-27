"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import LanguageSelector from "@/components/LanguageSelector";
import LoadingShimmer from "@/components/LoadingShimmer";
import { useAuth } from "@/lib/auth";
import { api, MuhurtaData, MuhurtaCandidate, MuhurtaSingleData, MuhurtaSearchData } from "@/lib/api";
import { KNOWN_CITIES, findCity } from "@/lib/cities";
import { DEFAULT_LANGUAGE } from "@/lib/languages";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function MuhurtaReadingPage() {
  const { token } = useAuth();

  const [activity, setActivity] = useState("");
  const [mode, setMode] = useState<"single" | "search">("search");
  const [place, setPlace] = useState("");
  const [singleDate, setSingleDate] = useState(todayISO());
  const [searchStart, setSearchStart] = useState(todayISO());
  const [searchDays, setSearchDays] = useState(90);
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<MuhurtaData | null>(null);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [interpretationError, setInterpretationError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setData(null);
    setInterpretation(null);
    setInterpretationError(null);

    if (!activity.trim()) {
      setError("Describe the activity you're planning.");
      return;
    }
    const city = findCity(place);
    if (!city) {
      setError("Choose a recognized city so we can calculate from the right location.");
      return;
    }

    setLoading(true);
    try {
      const payload =
        mode === "single"
          ? {
              activity, language,
              date: singleDate,
              latitude: city.latitude, longitude: city.longitude, timezone: city.timezone,
            }
          : {
              activity, language,
              search_start_date: searchStart, search_num_days: searchDays,
              latitude: city.latitude, longitude: city.longitude, timezone: city.timezone,
            };
      const res = await api.muhurtaReading(payload, token);
      setData(res.calculated_data);
      setInterpretation(res.interpretation);
      setInterpretationError(res.interpretation_error || null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not calculate the Muhurta.");
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
            VII
          </div>
          <h1 className="text-[24px] sm:text-[28px] mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
            Muhurta
          </h1>
          <p className="text-[13.5px] max-w-lg mx-auto" style={{ color: "var(--ch-text-secondary)" }}>
            Tell us what you&apos;re planning, in your own words. We match it to the
            classical rule set and either check your date or search for the best one.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="ch-glass-strong p-6 max-w-md mx-auto mb-10">
          <div className="mb-4">
            <label className="block text-[11px] uppercase tracking-[0.1em] mb-1.5" style={{ color: "var(--ch-text-muted)" }}>
              What are you planning?
            </label>
            <input
              type="text"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              placeholder="e.g. starting a new business, a wedding, moving house"
              className="ch-input w-full px-3 py-2.5 text-[14px]"
            />
          </div>

          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setMode("search")}
              className="flex-1 py-2 text-[12.5px] rounded-lg"
              style={{
                background: mode === "search" ? "var(--ch-glass-strong)" : "transparent",
                border: "1px solid var(--ch-border)",
                color: mode === "search" ? "var(--ch-gold-400)" : "var(--ch-text-muted)",
              }}
            >
              Find the best date
            </button>
            <button
              type="button"
              onClick={() => setMode("single")}
              className="flex-1 py-2 text-[12.5px] rounded-lg"
              style={{
                background: mode === "single" ? "var(--ch-glass-strong)" : "transparent",
                border: "1px solid var(--ch-border)",
                color: mode === "single" ? "var(--ch-gold-400)" : "var(--ch-text-muted)",
              }}
            >
              Check a date I have
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-[11px] uppercase tracking-[0.1em] mb-1.5" style={{ color: "var(--ch-text-muted)" }}>
              City
            </label>
            <input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="e.g. Mumbai, India"
              list="muhurta-cities"
              className="ch-input w-full px-3 py-2.5 text-[14px]"
            />
            <datalist id="muhurta-cities">
              {KNOWN_CITIES.map((c) => <option key={c.name} value={c.name} />)}
            </datalist>
          </div>

          {mode === "single" ? (
            <div className="mb-4">
              <label className="block text-[11px] uppercase tracking-[0.1em] mb-1.5" style={{ color: "var(--ch-text-muted)" }}>
                The date you have in mind
              </label>
              <input
                type="date"
                value={singleDate}
                onChange={(e) => setSingleDate(e.target.value)}
                className="ch-input w-full px-3 py-2.5 text-[14px]"
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.1em] mb-1.5" style={{ color: "var(--ch-text-muted)" }}>
                  Search from
                </label>
                <input
                  type="date"
                  value={searchStart}
                  onChange={(e) => setSearchStart(e.target.value)}
                  className="ch-input w-full px-3 py-2.5 text-[14px]"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-[0.1em] mb-1.5" style={{ color: "var(--ch-text-muted)" }}>
                  For how long
                </label>
                <select
                  value={searchDays}
                  onChange={(e) => setSearchDays(Number(e.target.value))}
                  className="ch-input w-full px-3 py-2.5 text-[14px]"
                >
                  <option value={30} style={{ color: "#000" }}>30 days</option>
                  <option value={90} style={{ color: "#000" }}>90 days</option>
                  <option value={180} style={{ color: "#000" }}>6 months</option>
                  <option value={365} style={{ color: "#000" }}>1 year</option>
                </select>
              </div>
            </div>
          )}

          <div className="mb-5">
            <div className="text-[11px] uppercase tracking-[0.1em] mb-2" style={{ color: "var(--ch-text-muted)" }}>
              Read the results in
            </div>
            <LanguageSelector value={language} onChange={setLanguage} />
          </div>

          <button type="submit" disabled={loading} className="ch-btn-primary w-full py-3 text-[14px] disabled:opacity-60">
            {loading ? "Consulting the Panchang…" : mode === "single" ? "Check this date" : "Find the best dates"}
          </button>
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

        {data && data.mode === "single" && <SingleDateResult data={data} />}
        {data && data.mode === "search" && <SearchResults data={data} />}

        {data && (interpretation || interpretationError) && (
          <div className="ch-glass p-6 max-w-2xl mx-auto mt-8">
            <div className="text-[11px] uppercase tracking-[0.14em] mb-4" style={{ color: "var(--ch-text-muted)" }}>
              Reading — {data.matched_activity_label}
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
          </div>
        )}
      </main>
    </div>
  );
}

function verdictColor(verdict: string): string {
  if (verdict.includes("Avoid")) return "var(--ch-danger)";
  if (verdict.includes("Excellent") || verdict.includes("Good")) return "var(--ch-success)";
  return "var(--ch-gold-400)";
}

function SingleDateResult({ data }: { data: MuhurtaSingleData }) {
  return (
    <div className="max-w-md mx-auto">
      <div className="ch-glass-strong p-7 text-center mb-6">
        <div className="text-[13px] mb-1" style={{ color: "var(--ch-text-muted)" }}>
          {data.matched_activity_label} on {data.date} ({data.weekday})
        </div>
        <div className="text-[40px] font-semibold ch-gold-text mb-1">
          {data.score} / {data.max_score}
        </div>
        <div className="text-[14px]" style={{ color: verdictColor(data.verdict) }}>
          {data.verdict}
        </div>
      </div>
      <div className="ch-glass p-5">
        <CriterionRow label="Nakshatra" value={data.nakshatra} favorable={data.nakshatra_favorable} />
        <CriterionRow label="Tithi" value={data.tithi_name} favorable={data.tithi_favorable} />
        <CriterionRow label="Weekday" value={data.weekday} favorable={data.weekday_favorable} />
        <CriterionRow label="Karana" value={data.karana_name} favorable={data.karana_favorable} />
      </div>
    </div>
  );
}

function SearchResults({ data }: { data: MuhurtaSearchData }) {
  if (data.candidates.length === 0) {
    return (
      <div className="ch-glass p-6 max-w-md mx-auto text-center text-[13.5px]" style={{ color: "var(--ch-text-muted)" }}>
        No favorable dates found for {data.matched_activity_label} in this range. Try widening the search.
      </div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-[11px] uppercase tracking-[0.14em] mb-4 text-center" style={{ color: "var(--ch-text-muted)" }}>
        Best dates for {data.matched_activity_label}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {data.candidates.map((c: MuhurtaCandidate) => (
          <div key={c.date} className="ch-glass p-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[14px]" style={{ fontFamily: "var(--font-voice)", color: "var(--ch-text-primary)" }}>
                {c.date}
              </span>
              <span className="text-[13px] font-semibold" style={{ color: "var(--ch-gold-400)" }}>
                {c.score}/{c.max_score}
              </span>
            </div>
            <div className="text-[11.5px] mb-1" style={{ color: "var(--ch-text-muted)" }}>
              {c.weekday} · {c.tithi_name} · {c.nakshatra}
            </div>
            <div className="text-[11px]" style={{ color: verdictColor(c.verdict) }}>
              {c.verdict}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CriterionRow({ label, value, favorable }: { label: string; value: string; favorable: boolean }) {
  return (
    <div className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid var(--ch-border)" }}>
      <span className="text-[12.5px]" style={{ color: "var(--ch-text-muted)" }}>{label}</span>
      <span className="flex items-center gap-2">
        <span className="text-[13px]" style={{ color: "var(--ch-text-primary)" }}>{value}</span>
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: favorable ? "var(--ch-success)" : "var(--ch-danger)" }}
        />
      </span>
    </div>
  );
}
