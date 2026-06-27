"use client";

import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import LanguageSelector from "@/components/LanguageSelector";
import LoadingShimmer from "@/components/LoadingShimmer";
import { useAuth } from "@/lib/auth";
import { api, profilesApi, PanchangData, BirthProfile } from "@/lib/api";
import { KNOWN_CITIES, findCity } from "@/lib/cities";
import { DEFAULT_LANGUAGE } from "@/lib/languages";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function PanchangReadingPage() {
  const { user, token, loading: authLoading } = useAuth();

  const [profiles, setProfiles] = useState<BirthProfile[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<number | "manual">("manual");
  const [manualPlace, setManualPlace] = useState("");
  const [date, setDate] = useState(todayISO());
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PanchangData | null>(null);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [interpretationError, setInterpretationError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    profilesApi
      .list(token)
      .then((list) => {
        setProfiles(list);
        const primary = list.find((p) => p.is_primary);
        if (primary) setSelectedProfileId(primary.id);
      })
      .catch(() => {});
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setData(null);
    setInterpretation(null);
    setInterpretationError(null);

    let payload: Parameters<typeof api.panchangReading>[0];

    if (selectedProfileId !== "manual") {
      payload = { profile_id: selectedProfileId, date, language };
    } else {
      const city = findCity(manualPlace);
      if (!city) {
        setError("Choose a recognized city, or sign in and pick a saved profile.");
        return;
      }
      payload = {
        date, language,
        latitude: city.latitude, longitude: city.longitude, timezone: city.timezone,
      };
    }

    setLoading(true);
    try {
      const res = await api.panchangReading(payload, token);
      setData(res.calculated_data);
      setInterpretation(res.interpretation);
      setInterpretationError(res.interpretation_error || null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not calculate the Panchang.");
    } finally {
      setLoading(false);
    }
  }

  function formatTime(iso: string): string {
    return new Date(iso).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="max-w-4xl mx-auto px-6 sm:px-10 py-12">
        <div className="text-center mb-10">
          <div className="font-voice italic text-[28px] mb-2" style={{ color: "var(--ch-gold-600)", fontFamily: "var(--font-voice)" }}>
            VI
          </div>
          <h1 className="text-[24px] sm:text-[28px] mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
            Daily Panchang
          </h1>
          <p className="text-[13.5px] max-w-lg mx-auto" style={{ color: "var(--ch-text-secondary)" }}>
            Tithi, Nakshatra, Yoga, Karana, and Rahu Kaal — calculated from real
            Sun and Moon positions for your exact location and date.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="ch-glass-strong p-6 max-w-md mx-auto mb-10">
          {!authLoading && user && profiles.length > 0 && (
            <div className="mb-4">
              <label className="block text-[11px] uppercase tracking-[0.1em] mb-1.5" style={{ color: "var(--ch-text-muted)" }}>
                Use saved profile
              </label>
              <select
                value={selectedProfileId}
                onChange={(e) => setSelectedProfileId(e.target.value === "manual" ? "manual" : Number(e.target.value))}
                className="ch-input w-full px-3 py-2.5 text-[14px]"
              >
                {profiles.map((p) => (
                  <option key={p.id} value={p.id} style={{ color: "#000" }}>
                    {p.label} — {p.name}
                  </option>
                ))}
                <option value="manual" style={{ color: "#000" }}>Enter a different location…</option>
              </select>
            </div>
          )}

          {(selectedProfileId === "manual" || !user) && (
            <div className="mb-4">
              <label className="block text-[11px] uppercase tracking-[0.1em] mb-1.5" style={{ color: "var(--ch-text-muted)" }}>
                City
              </label>
              <input
                type="text"
                value={manualPlace}
                onChange={(e) => setManualPlace(e.target.value)}
                placeholder="e.g. Mumbai, India"
                list="panchang-cities"
                className="ch-input w-full px-3 py-2.5 text-[14px]"
              />
              <datalist id="panchang-cities">
                {KNOWN_CITIES.map((c) => <option key={c.name} value={c.name} />)}
              </datalist>
              {!user && (
                <p className="mt-1.5 text-[11.5px]" style={{ color: "var(--ch-text-faint)" }}>
                  <a href="/account" className="underline">Sign in</a> to save a profile and skip this every time.
                </p>
              )}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-[11px] uppercase tracking-[0.1em] mb-1.5" style={{ color: "var(--ch-text-muted)" }}>
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="ch-input w-full px-3 py-2.5 text-[14px]"
            />
          </div>

          <div className="mb-5">
            <div className="text-[11px] uppercase tracking-[0.1em] mb-2" style={{ color: "var(--ch-text-muted)" }}>
              Read the results in
            </div>
            <LanguageSelector value={language} onChange={setLanguage} />
          </div>

          <button type="submit" disabled={loading} className="ch-btn-primary w-full py-3 text-[14px] disabled:opacity-60">
            {loading ? "Reading the sky…" : "Calculate today's Panchang"}
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

        {data && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <PanchangCard label="Tithi" value={`${data.paksha} ${data.tithi_name}`} sub={`Day ${data.tithi_number}`} />
              <PanchangCard label="Vaar" value={data.weekday} sub={`Ruled by ${data.weekday_lord}`} />
              <PanchangCard label="Nakshatra" value={data.nakshatra} sub={`Pada ${data.nakshatra_pada}`} />
              <PanchangCard
                label="Yoga"
                value={data.yoga_name}
                sub={data.yoga_is_favorable === true ? "Favorable" : data.yoga_is_favorable === false ? "Unfavorable" : "Neutral"}
                accent={data.yoga_is_favorable === true ? "good" : data.yoga_is_favorable === false ? "bad" : undefined}
              />
              <PanchangCard label="Karana" value={data.karana_name} sub={data.karana_name === "Vishti" ? "Avoid new ventures" : "—"} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
              <PanchangCard label="Sunrise" value={formatTime(data.sunrise)} />
              <PanchangCard label="Sunset" value={formatTime(data.sunset)} />
              <PanchangCard
                label="Rahu Kaal"
                value={`${formatTime(data.rahu_kaal_start)} – ${formatTime(data.rahu_kaal_end)}`}
                accent="bad"
              />
            </div>

            <div className="ch-glass p-6 max-w-2xl mx-auto">
              <div className="text-[11px] uppercase tracking-[0.14em] mb-4" style={{ color: "var(--ch-text-muted)" }}>
                Reading for {data.date}
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
          </>
        )}
      </main>
    </div>
  );
}

function PanchangCard({
  label, value, sub, accent,
}: { label: string; value: string; sub?: string; accent?: "good" | "bad" }) {
  return (
    <div className="ch-glass p-4 text-center">
      <div className="text-[10px] uppercase tracking-wide mb-1.5" style={{ color: "var(--ch-text-muted)" }}>
        {label}
      </div>
      <div
        className="text-[15px] mb-0.5"
        style={{
          fontFamily: "var(--font-voice)",
          color: accent === "good" ? "var(--ch-success)" : accent === "bad" ? "var(--ch-danger)" : "var(--ch-text-primary)",
        }}
      >
        {value}
      </div>
      {sub && (
        <div className="text-[11px]" style={{ color: "var(--ch-text-faint)" }}>
          {sub}
        </div>
      )}
    </div>
  );
}
