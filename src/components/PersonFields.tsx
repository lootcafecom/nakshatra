"use client";

import { KNOWN_CITIES, findCity } from "@/lib/cities";

export interface PersonFormData {
  name: string;
  dob: string;
  tob: string;
  place: string;
}

interface PersonFieldsProps {
  label: string;
  value: PersonFormData;
  onChange: (data: PersonFormData) => void;
  listId: string;
}

export default function PersonFields({ label, value, onChange, listId }: PersonFieldsProps) {
  function update<K extends keyof PersonFormData>(key: K, v: PersonFormData[K]) {
    onChange({ ...value, [key]: v });
  }

  const cityValid = !value.place || !!findCity(value.place);

  return (
    <div className="ch-glass p-5">
      <div
        className="text-[11px] uppercase tracking-[0.14em] mb-4"
        style={{ color: "var(--ch-gold-400)" }}
      >
        {label}
      </div>

      <div className="mb-3">
        <label className="block text-[10.5px] uppercase tracking-[0.08em] mb-1.5" style={{ color: "var(--ch-text-muted)" }}>
          Full name
        </label>
        <input
          type="text"
          value={value.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Full name"
          className="ch-input w-full px-3 py-2 text-[13.5px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-[10.5px] uppercase tracking-[0.08em] mb-1.5" style={{ color: "var(--ch-text-muted)" }}>
            Date of birth
          </label>
          <input
            type="date"
            value={value.dob}
            onChange={(e) => update("dob", e.target.value)}
            className="ch-input w-full px-3 py-2 text-[13.5px]"
          />
        </div>
        <div>
          <label className="block text-[10.5px] uppercase tracking-[0.08em] mb-1.5" style={{ color: "var(--ch-text-muted)" }}>
            Time of birth
          </label>
          <input
            type="time"
            value={value.tob}
            onChange={(e) => update("tob", e.target.value)}
            className="ch-input w-full px-3 py-2 text-[13.5px]"
          />
        </div>
      </div>

      <div>
        <label className="block text-[10.5px] uppercase tracking-[0.08em] mb-1.5" style={{ color: "var(--ch-text-muted)" }}>
          City of birth
        </label>
        <input
          type="text"
          value={value.place}
          onChange={(e) => update("place", e.target.value)}
          placeholder="e.g. Mumbai, India"
          list={listId}
          className="ch-input w-full px-3 py-2 text-[13.5px]"
        />
        <datalist id={listId}>
          {KNOWN_CITIES.map((c) => (
            <option key={c.name} value={c.name} />
          ))}
        </datalist>
        {!cityValid && (
          <p className="mt-1 text-[11px]" style={{ color: "var(--ch-danger)" }}>
            Choose a city from the list for exact coordinates.
          </p>
        )}
      </div>
    </div>
  );
}
