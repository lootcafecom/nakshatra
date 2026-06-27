"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import LanguageSelector from "@/components/LanguageSelector";
import LoadingShimmer from "@/components/LoadingShimmer";
import { api, VastuData } from "@/lib/api";
import { DEFAULT_LANGUAGE } from "@/lib/languages";

const DIRECTIONS = [
  { label: "North", deg: 0 }, { label: "Northeast", deg: 45 }, { label: "East", deg: 90 },
  { label: "Southeast", deg: 135 }, { label: "South", deg: 180 }, { label: "Southwest", deg: 225 },
  { label: "West", deg: 270 }, { label: "Northwest", deg: 315 },
];

export default function VastuReadingPage() {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [facing, setFacing] = useState(0);
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<VastuData | null>(null);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [interpretationError, setInterpretationError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !place.trim()) {
      setError("Enter your name and the location of your home.");
      return;
    }
    setLoading(true);
    setError(null);
    setData(null);
    setInterpretation(null);
    setInterpretationError(null);

    try {
      const res = await api.vastuReading({
        name, place, entrance_facing_degrees: facing, language,
      });
      setData(res.calculated_data);
      setInterpretation(res.interpretation);
      setInterpretationError(res.interpretation_error || null);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Could not reach the geocoding service. This needs live internet access to your location."
      );
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
            IV
          </div>
          <h1 className="text-[24px] sm:text-[28px] mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
            Vastu
          </h1>
          <p className="text-[13.5px] max-w-md mx-auto" style={{ color: "var(--ch-text-secondary)" }}>
            Calculated against the true magnetic declination at your home&apos;s
            real coordinates — not a generic compass tip.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="ch-glass-strong p-6 max-w-md mx-auto mb-10">
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

          <label className="block text-[11px] uppercase tracking-[0.1em] mb-1.5" style={{ color: "var(--ch-text-muted)" }}>
            City where your home is
          </label>
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="e.g. Mumbai, India"
            className="ch-input w-full px-3 py-2.5 text-[14px] mb-4"
          />

          <label className="block text-[11px] uppercase tracking-[0.1em] mb-1.5" style={{ color: "var(--ch-text-muted)" }}>
            Main entrance currently faces
          </label>
          <select
            value={facing}
            onChange={(e) => setFacing(Number(e.target.value))}
            className="ch-input w-full px-3 py-2.5 text-[14px] mb-5"
          >
            {DIRECTIONS.map((d) => (
              <option key={d.label} value={d.deg} style={{ color: "#000" }}>{d.label}</option>
            ))}
          </select>

          <div className="mb-5">
            <div className="text-[11px] uppercase tracking-[0.1em] mb-2" style={{ color: "var(--ch-text-muted)" }}>
              Read my results in
            </div>
            <LanguageSelector value={language} onChange={setLanguage} />
          </div>

          <button type="submit" disabled={loading} className="ch-btn-primary w-full py-3 text-[14px] disabled:opacity-60">
            {loading ? "Finding true north…" : "Calculate my home's directions"}
          </button>
        </form>

        {error && (
          <div className="ch-glass p-4 mb-8 text-center text-[13px] max-w-md mx-auto" style={{ color: "var(--ch-danger)" }}>
            {error}
            <p className="text-[11.5px] mt-2" style={{ color: "var(--ch-text-faint)" }}>
              This calculation needs to reach OpenStreetMap and NOAA&apos;s
              public geocoding services — it will work once deployed with
              normal internet access.
            </p>
          </div>
        )}

        {loading && (
          <div className="max-w-md mx-auto">
            <LoadingShimmer lines={4} />
          </div>
        )}

        {data && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8">
            <div className="ch-glass p-6">
              <div className="text-[11px] uppercase tracking-[0.14em] mb-4" style={{ color: "var(--ch-text-muted)" }}>
                Calculated location data
              </div>
              <Stat label="Resolved location" value={data.place} />
              <Stat label="Coordinates" value={`${data.latitude.toFixed(4)}, ${data.longitude.toFixed(4)}`} />
              <Stat label="True magnetic declination" value={`${data.magnetic_declination}°`} />
              {data.zones[0]?.true_bearing !== undefined && (
                <Stat label="Entrance true bearing" value={`${data.zones[0].true_bearing}° — ${data.zones[0].name}`} />
              )}
            </div>

            <div className="ch-glass p-6">
              <div className="text-[11px] uppercase tracking-[0.14em] mb-4" style={{ color: "var(--ch-text-muted)" }}>
                Reading for {name}
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
          </div>
        )}
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3.5">
      <div className="text-[10px] uppercase tracking-wide" style={{ color: "var(--ch-text-muted)" }}>
        {label}
      </div>
      <div className="text-[13px] mt-0.5" style={{ color: "var(--ch-text-primary)" }}>
        {value}
      </div>
    </div>
  );
}
