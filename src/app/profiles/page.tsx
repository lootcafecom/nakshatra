"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import { useAuth } from "@/lib/auth";
import { profilesApi, BirthProfile } from "@/lib/api";
import { KNOWN_CITIES, findCity } from "@/lib/cities";

export default function ProfilesPage() {
  const { user, token, loading: authLoading } = useAuth();
  const router = useRouter();

  const [profiles, setProfiles] = useState<BirthProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/account");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!token) return;
    profilesApi
      .list(token)
      .then(setProfiles)
      .catch((e) => setError(e instanceof Error ? e.message : "Could not load profiles."))
      .finally(() => setLoading(false));
  }, [token]);

  async function handleDelete(id: number) {
    if (!token) return;
    try {
      await profilesApi.remove(token, id);
      setProfiles((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not delete profile.");
    }
  }

  if (authLoading || !user) {
    return (
      <div className="min-h-screen">
        <NavBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="max-w-3xl mx-auto px-6 sm:px-10 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[22px] mb-1" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
              Your birth profiles
            </h1>
            <p className="text-[13px]" style={{ color: "var(--ch-text-muted)" }}>
              Save up to 5 — yourself and family members. Every reading can reuse these.
            </p>
          </div>
          <button onClick={() => setShowForm((s) => !s)} className="ch-btn-primary px-4 py-2 text-[13px] flex-shrink-0">
            {showForm ? "Close" : "Add profile"}
          </button>
        </div>

        {error && (
          <div className="ch-glass p-4 mb-6 text-[13px]" style={{ color: "var(--ch-danger)" }}>
            {error}
          </div>
        )}

        {showForm && (
          <NewProfileForm
            onCreated={(p) => {
              setProfiles((prev) => [...prev, p]);
              setShowForm(false);
            }}
            onError={setError}
          />
        )}

        {loading ? (
          <p className="text-[13px]" style={{ color: "var(--ch-text-muted)" }}>Loading…</p>
        ) : profiles.length === 0 ? (
          <div className="ch-glass p-8 text-center">
            <p className="text-[13.5px]" style={{ color: "var(--ch-text-muted)" }}>
              No saved profiles yet. Add one to skip re-entering birth details on every reading.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profiles.map((p) => (
              <div key={p.id} className="ch-glass p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-[11px] uppercase tracking-wide" style={{ color: "var(--ch-gold-400)" }}>
                      {p.label} {p.is_primary && "· primary"}
                    </div>
                    <div className="text-[15px]" style={{ fontFamily: "var(--font-voice)", color: "var(--ch-text-primary)" }}>
                      {p.name}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(p.id)}
                    aria-label={`Delete ${p.name}`}
                    className="text-[11px]"
                    style={{ color: "var(--ch-text-faint)" }}
                  >
                    Remove
                  </button>
                </div>
                <div className="text-[12px]" style={{ color: "var(--ch-text-muted)" }}>
                  {p.birth_date} at {p.birth_time}
                </div>
                <div className="text-[12px]" style={{ color: "var(--ch-text-muted)" }}>
                  {p.place_name}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function NewProfileForm({
  onCreated,
  onError,
}: {
  onCreated: (p: BirthProfile) => void;
  onError: (msg: string) => void;
}) {
  const { token } = useAuth();
  const [label, setLabel] = useState("Myself");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [place, setPlace] = useState("");
  const [isPrimary, setIsPrimary] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const city = findCity(place);
    if (!name.trim() || !dob || !tob || !city) {
      onError("Fill in all fields and choose a city from the list.");
      return;
    }
    setSubmitting(true);
    try {
      const profile = await profilesApi.create(token, {
        label, name, birth_date: dob, birth_time: tob,
        place_name: city.name, latitude: city.latitude, longitude: city.longitude,
        timezone: city.timezone, is_primary: isPrimary,
      });
      onCreated(profile);
    } catch (err) {
      onError(err instanceof Error ? err.message : "Could not save profile.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="ch-glass-strong p-5 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-[10.5px] uppercase tracking-wide mb-1" style={{ color: "var(--ch-text-muted)" }}>Relationship</label>
          <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Myself, Mother, etc." className="ch-input w-full px-3 py-2 text-[13.5px]" />
        </div>
        <div>
          <label className="block text-[10.5px] uppercase tracking-wide mb-1" style={{ color: "var(--ch-text-muted)" }}>Full name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="ch-input w-full px-3 py-2 text-[13.5px]" />
        </div>
        <div>
          <label className="block text-[10.5px] uppercase tracking-wide mb-1" style={{ color: "var(--ch-text-muted)" }}>Date of birth</label>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="ch-input w-full px-3 py-2 text-[13.5px]" />
        </div>
        <div>
          <label className="block text-[10.5px] uppercase tracking-wide mb-1" style={{ color: "var(--ch-text-muted)" }}>Time of birth</label>
          <input type="time" value={tob} onChange={(e) => setTob(e.target.value)} className="ch-input w-full px-3 py-2 text-[13.5px]" />
        </div>
      </div>
      <div className="mb-3">
        <label className="block text-[10.5px] uppercase tracking-wide mb-1" style={{ color: "var(--ch-text-muted)" }}>City of birth</label>
        <input value={place} onChange={(e) => setPlace(e.target.value)} placeholder="e.g. Mumbai, India" list="profile-cities" className="ch-input w-full px-3 py-2 text-[13.5px]" />
        <datalist id="profile-cities">
          {KNOWN_CITIES.map((c) => <option key={c.name} value={c.name} />)}
        </datalist>
      </div>
      <label className="flex items-center gap-2 mb-4 text-[12.5px]" style={{ color: "var(--ch-text-secondary)" }}>
        <input type="checkbox" checked={isPrimary} onChange={(e) => setIsPrimary(e.target.checked)} />
        Set as primary profile
      </label>
      <button type="submit" disabled={submitting} className="ch-btn-primary px-5 py-2.5 text-[13px] disabled:opacity-60">
        {submitting ? "Saving…" : "Save profile"}
      </button>
    </form>
  );
}
