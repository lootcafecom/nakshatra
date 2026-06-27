export interface CityCoords {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

// A small set of major cities so the demo works without a live geocoding
// call (Nominatim is blocked in some sandboxed/offline environments).
// In production this should be replaced by a live call to Nominatim
// (see backend/app/vastu.py geocode_place) for any city worldwide.
export const KNOWN_CITIES: CityCoords[] = [
  { name: "Mumbai, India", latitude: 19.076, longitude: 72.8777, timezone: "Asia/Kolkata" },
  { name: "Delhi, India", latitude: 28.7041, longitude: 77.1025, timezone: "Asia/Kolkata" },
  { name: "Bengaluru, India", latitude: 12.9716, longitude: 77.5946, timezone: "Asia/Kolkata" },
  { name: "Chennai, India", latitude: 13.0827, longitude: 80.2707, timezone: "Asia/Kolkata" },
  { name: "Kolkata, India", latitude: 22.5726, longitude: 88.3639, timezone: "Asia/Kolkata" },
  { name: "Hyderabad, India", latitude: 17.385, longitude: 78.4867, timezone: "Asia/Kolkata" },
  { name: "Pune, India", latitude: 18.5204, longitude: 73.8567, timezone: "Asia/Kolkata" },
  { name: "Ahmedabad, India", latitude: 23.0225, longitude: 72.5714, timezone: "Asia/Kolkata" },
  { name: "Jaipur, India", latitude: 26.9124, longitude: 75.7873, timezone: "Asia/Kolkata" },
  { name: "Lucknow, India", latitude: 26.8467, longitude: 80.9462, timezone: "Asia/Kolkata" },
  { name: "New York, USA", latitude: 40.7128, longitude: -74.006, timezone: "America/New_York" },
  { name: "London, UK", latitude: 51.5072, longitude: -0.1276, timezone: "Europe/London" },
  { name: "Dubai, UAE", latitude: 25.2048, longitude: 55.2708, timezone: "Asia/Dubai" },
  { name: "Singapore", latitude: 1.3521, longitude: 103.8198, timezone: "Asia/Singapore" },
  { name: "Toronto, Canada", latitude: 43.6532, longitude: -79.3832, timezone: "America/Toronto" },
];

export function findCity(query: string): CityCoords | undefined {
  const normalized = query.trim().toLowerCase();
  return KNOWN_CITIES.find(
    (c) => c.name.toLowerCase() === normalized || c.name.toLowerCase().startsWith(normalized)
  );
}
