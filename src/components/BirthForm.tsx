"use client";

import { useState } from "react";
import LanguageSelector from "./LanguageSelector";
import { DEFAULT_LANGUAGE } from "@/lib/languages";
import { KNOWN_CITIES, findCity } from "@/lib/cities";

export interface BirthData {
  name: string;
  dob: string;
  tob: string;
  place: string;
  language: string;
}

interface BirthFormProps {
  onSubmit: (data: BirthData) => void;
  submitting?: boolean;
  submitLabel?: string;
}

const initialState: BirthData = {
  name: "",
  dob: "",
  tob: "",
  place: "",
  language: DEFAULT_LANGUAGE,
};

export default function BirthForm({
  onSubmit,
  submitting = false,
  submitLabel = "Reveal my reading",
}: BirthFormProps) {
  const [data, setData] = useState<BirthData>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof BirthData, string>>>({});

  function update<K extends keyof BirthData>(key: K, value: BirthData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof BirthData, string>> = {};
    if (!data.name.trim()) next.name = "Enter your full name.";
    if (!data.dob) next.dob = "Enter your date of birth.";
    if (!data.tob) next.tob = "Enter your time of birth.";
    if (!data.place.trim()) {
      next.place = "Enter your city of birth.";
    } else if (!findCity(data.place)) {
      next.place = "Choose a city from the list so we can use its exact coordinates.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit} className="ch-glass-strong p-6 sm:p-7">
      <div
        className="text-[11px] uppercase tracking-[0.14em] mb-5"
        style={{ color: "var(--ch-text-muted)" }}
      >
        Your birth details
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Field label="Full name" error={errors.name}>
          <input
            type="text"
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="As it appears on your records"
            className="ch-input w-full px-3 py-2.5 text-[14px]"
          />
        </Field>

        <Field label="City of birth" error={errors.place}>
          <input
            type="text"
            value={data.place}
            onChange={(e) => update("place", e.target.value)}
            placeholder="e.g. Mumbai, India"
            list="known-cities"
            className="ch-input w-full px-3 py-2.5 text-[14px]"
          />
          <datalist id="known-cities">
            {KNOWN_CITIES.map((c) => (
              <option key={c.name} value={c.name} />
            ))}
          </datalist>
        </Field>

        <Field label="Date of birth" error={errors.dob}>
          <input
            type="date"
            value={data.dob}
            onChange={(e) => update("dob", e.target.value)}
            className="ch-input w-full px-3 py-2.5 text-[14px]"
          />
        </Field>

        <Field label="Time of birth" error={errors.tob}>
          <input
            type="time"
            value={data.tob}
            onChange={(e) => update("tob", e.target.value)}
            className="ch-input w-full px-3 py-2.5 text-[14px]"
          />
        </Field>
      </div>

      <div className="mb-6">
        <div
          className="text-[11px] uppercase tracking-[0.14em] mb-2.5"
          style={{ color: "var(--ch-text-muted)" }}
        >
          Read my results in
        </div>
        <LanguageSelector
          value={data.language}
          onChange={(code) => update("language", code)}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="ch-btn-primary w-full py-3 text-[14px] disabled:opacity-60"
      >
        {submitting ? "Reading the stars…" : submitLabel}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="block text-[11px] uppercase tracking-[0.1em] mb-1.5"
        style={{ color: "var(--ch-text-muted)" }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-[12px]" style={{ color: "var(--ch-danger)" }}>
          {error}
        </p>
      )}
    </div>
  );
}
