"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import BirthForm, { BirthData } from "@/components/BirthForm";
import ChartWheel, { PlanetPlacement } from "@/components/ChartWheel";
import LoadingShimmer from "@/components/LoadingShimmer";
import { api, VedicData } from "@/lib/api";
import { findCity } from "@/lib/cities";
import { ZODIAC_SIGNS } from "@/lib/zodiac";

const SIGN_ABBR: Record<string, string> = {
  Aries: "Ar", Taurus: "Ta", Gemini: "Ge", Cancer: "Cn", Leo: "Le", Virgo: "Vi",
  Libra: "Li", Scorpio: "Sc", Sagittarius: "Sg", Capricorn: "Cp", Aquarius: "Aq", Pisces: "Pi",
};

const PLANET_ABBR: Record<string, string> = {
  Sun: "Su", Moon: "Mo", Mars: "Ma", Mercury: "Me", Jupiter: "Ju",
  Venus: "Ve", Saturn: "Sa", Rahu: "Ra", Ketu: "Ke",
};

export default function VedicReadingPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<VedicData | null>(null);
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
      const res = await api.vedicReading({
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
      setError(e instanceof Error ? e.message : "Something went wrong calculating your chart.");
    } finally {
      setLoading(false);
    }
  }

  // build the houses-by-sign array (whole-sign system) and planet placements
  // for the chart wheel, derived from the real calculated ascendant.
  let wheelSigns: string[] | undefined;
  let wheelPlanets: PlanetPlacement[] = [];
  if (data) {
    const ascIdx = ZODIAC_SIGNS.findIndex((s) => s.name === data.ascendant_sign);
    wheelSigns = Array.from({ length: 12 }, (_, i) => {
      const signIdx = (ascIdx + i) % 12;
      return SIGN_ABBR[ZODIAC_SIGNS[signIdx].name];
    });
    wheelPlanets = data.planets.map((p) => ({
      symbol: PLANET_ABBR[p.name] || p.name.slice(0, 2),
      house: p.house,
    }));
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
            I
          </div>
          <h1 className="text-[24px] sm:text-[28px] mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
            Vedic chart
          </h1>
          <p className="text-[13.5px] max-w-md mx-auto" style={{ color: "var(--ch-text-secondary)" }}>
            Calculated with Swiss Ephemeris using the Lahiri ayanamsha — real
            planetary positions, not an approximation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 items-start mb-10">
          <BirthForm onSubmit={handleSubmit} submitting={loading} submitLabel="Calculate my chart" />

          <div className="ch-glass p-6 flex flex-col items-center min-h-[300px] justify-center">
            {!data && !loading && (
              <>
                <ChartWheel size={200} />
                <p className="text-[12px] text-center mt-4" style={{ color: "var(--ch-text-muted)" }}>
                  Your real chart will appear here once calculated.
                </p>
              </>
            )}
            {loading && (
              <div className="w-full">
                <LoadingShimmer lines={4} />
              </div>
            )}
            {data && (
              <>
                <ChartWheel size={200} signs={wheelSigns} planets={wheelPlanets} />
                <div className="grid grid-cols-2 gap-3 mt-5 w-full text-center">
                  <Stat label="Ascendant" value={`${data.ascendant_sign} ${data.ascendant_degree}°`} />
                  <Stat label="Moon Nakshatra" value={`${data.moon_nakshatra} (pada ${data.moon_nakshatra_pada})`} />
                  <Stat label="Current Dasha" value={data.current_dasha} />
                  <Stat label="Calculation" value="Lahiri sidereal" />
                </div>
              </>
            )}
          </div>
        </div>

        {error && (
          <div className="ch-glass p-4 mb-8 text-center text-[13px]" style={{ color: "var(--ch-danger)" }}>
            {error}
          </div>
        )}

        {data && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8">
            <div className="ch-glass p-6">
              <div className="text-[11px] uppercase tracking-[0.14em] mb-4" style={{ color: "var(--ch-text-muted)" }}>
                Planetary positions
              </div>
              <div className="space-y-2.5">
                {data.planets.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center justify-between text-[12.5px] py-1.5"
                    style={{ borderBottom: "1px solid var(--ch-border)" }}
                  >
                    <span style={{ color: "var(--ch-text-primary)" }}>
                      {p.name}{p.retrograde && <span style={{ color: "var(--ch-gold-400)" }}> (R)</span>}
                    </span>
                    <span style={{ color: "var(--ch-text-muted)" }}>
                      {p.sign} {p.sign_degree}° · house {p.house} · {p.nakshatra}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ch-glass p-6">
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
                    The calculated chart above is real and accurate. The written
                    interpretation isn&apos;t available right now:
                  </p>
                  <p className="text-[12.5px] italic" style={{ color: "var(--ch-text-faint)" }}>
                    {interpretationError}
                  </p>
                </div>
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
    <div>
      <div className="text-[10px] uppercase tracking-wide" style={{ color: "var(--ch-text-muted)" }}>
        {label}
      </div>
      <div className="text-[12.5px] mt-0.5" style={{ color: "var(--ch-text-primary)" }}>
        {value}
      </div>
    </div>
  );
}
