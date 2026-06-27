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

async function post<T>(path: string, body: unknown, token?: string | null): Promise<ReadingResponse<T>> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
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

export interface BirthProfile {
  id: number;
  label: string;
  name: string;
  birth_date: string;
  birth_time: string;
  place_name: string;
  latitude: number;
  longitude: number;
  timezone: string;
  is_primary: boolean;
}

export interface BirthProfileInput {
  label: string;
  name: string;
  birth_date: string;
  birth_time: string;
  place_name: string;
  latitude: number;
  longitude: number;
  timezone: string;
  is_primary?: boolean;
}

export interface SavedReadingRecord {
  id: number;
  reading_type: string;
  calculated_data: Record<string, unknown>;
  interpretation: string | null;
  language: string;
  created_at: string;
}

function authHeaders(token: string | null): Record<string, string> {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function authedRequest<T>(
  path: string,
  token: string | null,
  options: { method?: string; body?: unknown } = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(token),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(body.detail || `Request failed with status ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export interface PanchangData {
  date: string;
  weekday: string;
  weekday_lord: string;
  paksha: string;
  tithi_name: string;
  tithi_number: number;
  nakshatra: string;
  nakshatra_pada: number;
  yoga_name: string;
  yoga_is_favorable: boolean | null;
  karana_name: string;
  sunrise: string;
  sunset: string;
  rahu_kaal_start: string;
  rahu_kaal_end: string;
}

export interface PanchangInput {
  name?: string;
  date?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  profile_id?: number;
  language: string;
}

export interface MuhurtaCandidate {
  date: string;
  weekday: string;
  score: number;
  max_score: number;
  verdict: string;
  nakshatra_favorable: boolean;
  tithi_favorable: boolean;
  weekday_favorable: boolean;
  karana_favorable: boolean;
  has_rikta_tithi: boolean;
  tithi_name: string;
  nakshatra: string;
  karana_name: string;
  yoga_name: string;
  rahu_kaal_start: string;
  rahu_kaal_end: string;
}

export interface MuhurtaSingleData extends MuhurtaCandidate {
  mode: "single";
  matched_activity: string;
  matched_activity_label: string;
}

export interface MuhurtaSearchData {
  mode: "search";
  matched_activity: string;
  matched_activity_label: string;
  candidates: MuhurtaCandidate[];
}

export type MuhurtaData = MuhurtaSingleData | MuhurtaSearchData;

export interface MuhurtaInput {
  activity: string;
  latitude: number;
  longitude: number;
  timezone: string;
  language: string;
  date?: string;
  search_start_date?: string;
  search_num_days?: number;
}

export interface RemedyGemstone {
  english: string;
  sanskrit: string;
  metal: string;
  finger: string;
  weekday: string;
  substitute: string;
}

export interface RemedyMantra {
  beej_mantra: string;
  deity: string;
  recitation_count: number;
}

export interface RemedyCharity {
  item: string;
  weekday: string;
}

export interface RemedyConcern {
  planet: string;
  reason: string;
  house: number;
  sign: string;
  is_debilitated: boolean;
  is_in_dusthana: boolean;
  is_retrograde: boolean;
  gemstone: RemedyGemstone;
  mantra: RemedyMantra;
  charity: RemedyCharity;
}

export interface RemedyData {
  strongest_planet: string | null;
  concerns: RemedyConcern[];
}

export const profilesApi = {
  list: (token: string | null) => authedRequest<BirthProfile[]>("/profiles", token),
  create: (token: string | null, input: BirthProfileInput) =>
    authedRequest<BirthProfile>("/profiles", token, { method: "POST", body: input }),
  remove: (token: string | null, id: number) =>
    authedRequest<void>(`/profiles/${id}`, token, { method: "DELETE" }),
};

export const historyApi = {
  list: (token: string | null, readingType?: string) =>
    authedRequest<SavedReadingRecord[]>(
      `/readings/history${readingType ? `?reading_type=${readingType}` : ""}`,
      token
    ),
  remove: (token: string | null, id: number) =>
    authedRequest<void>(`/readings/history/${id}`, token, { method: "DELETE" }),
};

export const api = {
  vedicReading: (input: BirthInput) => post<VedicData>("/readings/vedic", input),
  numerologyReading: (input: BirthInput) => post<NumerologyData>("/readings/numerology", input),
  tarotReading: (input: { name: string; language: string }) =>
    post<TarotData>("/readings/tarot", input),
  vastuReading: (input: VastuInput) => post<VastuData>("/readings/vastu", input),
  matchingReading: (input: MatchingInput) => post<MatchingData>("/readings/matching", input),
  panchangReading: (input: PanchangInput, token?: string | null) =>
    post<PanchangData>("/readings/panchang", input, token),
  muhurtaReading: (input: MuhurtaInput, token?: string | null) =>
    post<MuhurtaData>("/readings/muhurta", input, token),
  remedyReading: (input: BirthInput) => post<RemedyData>("/readings/remedy", input),
};
