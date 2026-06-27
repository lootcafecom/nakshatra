// Base URL of the FastAPI calculation backend. In production, set
// NEXT_PUBLIC_API_URL to the deployed backend's URL (Render/Railway).
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8000";

export interface ReadingResponse<T = Record<string, unknown>> {
  calculated_data: T;
  interpretation: string | null;
  interpretation_error?: string | null;
}

export interface BirthInput {
  name: string;
  birth_date: string;
  birth_time: string;
  latitude: number;
  longitude: number;
  timezone: string;
  language: string;
}

export interface VastuInput {
  name: string;
  place: string;
  entrance_facing_degrees?: number;
  language: string;
}

async function post<T>(path: string, body: unknown): Promise<ReadingResponse<T>> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(errBody.detail || `Request failed with status ${res.status}`);
  }

  return res.json();
}

export interface VedicPlanet {
  name: string;
  sign: string;
  sign_degree: number;
  house: number;
  nakshatra: string;
  nakshatra_pada: number;
  retrograde: boolean;
}

export interface VedicData {
  ascendant_sign: string;
  ascendant_degree: number;
  moon_nakshatra: string;
  moon_nakshatra_pada: number;
  current_dasha: string;
  planets: VedicPlanet[];
  dasha_timeline: { planet: string; start: string; end: string }[];
}

export interface NumerologyNumberData {
  value: number;
  is_master: boolean;
  steps: { input: string; output: number }[];
}

export type NumerologyData = Record<
  "Life Path" | "Expression" | "Soul Urge" | "Personality" | "Personal Year",
  NumerologyNumberData
>;

export interface TarotCardData {
  position: string;
  name: string;
  reversed: boolean;
  keywords: string[];
}

export interface TarotData {
  cards: TarotCardData[];
}

export interface VastuZoneData {
  name: string;
  ruling: string;
  true_bearing?: number;
}

export interface VastuData {
  place: string;
  latitude: number;
  longitude: number;
  magnetic_declination: number;
  zones: VastuZoneData[];
}

export interface PersonInput {
  name: string;
  birth_date: string;
  birth_time: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface MatchingInput {
  person_a: PersonInput;
  person_b: PersonInput;
  language: string;
}

export interface KootaData {
  name: string;
  max_points: number;
  score: number;
  note: string;
}

export interface MangalDoshaData {
  person_a_dosha: boolean;
  person_b_dosha: boolean;
  person_a_mars_house: number;
  person_b_mars_house: number;
  cancelled: boolean;
  cancellation_reason: string | null;
}

export interface MatchingData {
  person_a_name: string;
  person_b_name: string;
  total_score: number;
  max_score: number;
  verdict: string;
  kootas: KootaData[];
  nadi_dosha: boolean;
  bhakoot_dosha: boolean;
  mangal_dosha: MangalDoshaData;
}

export const api = {
  vedicReading: (input: BirthInput) => post<VedicData>("/readings/vedic", input),
  numerologyReading: (input: BirthInput) => post<NumerologyData>("/readings/numerology", input),
  tarotReading: (input: { name: string; language: string }) =>
    post<TarotData>("/readings/tarot", input),
  vastuReading: (input: VastuInput) => post<VastuData>("/readings/vastu", input),
  matchingReading: (input: MatchingInput) => post<MatchingData>("/readings/matching", input),
};
