"use client";

import { useState } from "react";
import { ZODIAC_SIGNS } from "@/lib/zodiac";

export interface HeroFormData {
  sign: string;
  dob: string;
  tob: string;
}

interface HeroSearchFormProps {
  onSubmit: (data: HeroFormData) => void;
}

export default function HeroSearchForm({ onSubmit }: HeroSearchFormProps) {
  const [sign, setSign] = useState("");
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ sign, dob, tob });
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[480px]">
      <div
        className="flex flex-col sm:flex-row items-stretch gap-0 rounded-full overflow-hidden mb-4"
        style={{
          background: "rgba(20, 8, 36, 0.65)",
          border: "1px solid var(--ch-border)",
        }}
      >
        <SelectField
          icon={<ZodiacIcon />}
          value={sign}
          onChange={setSign}
          placeholder="Select Your Sign"
          options={ZODIAC_SIGNS.map((s) => ({ value: s.name, label: s.name }))}
        />
        <Divider />
        <DateField value={dob} onChange={setDob} />
        <Divider />
        <TimeField value={tob} onChange={setTob} />
      </div>

      <button type="submit" className="ch-btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-[14px]">
        Get My Horoscope
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  );
}

function Divider() {
  return <div className="hidden sm:block w-px self-stretch my-2.5" style={{ background: "var(--ch-border)" }} />;
}

function SelectField({
  icon,
  value,
  onChange,
  placeholder,
  options,
}: {
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 flex-1 min-w-0">
      {icon}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent outline-none text-[12.5px] w-full"
        style={{ color: value ? "var(--ch-text-primary)" : "var(--ch-text-muted)" }}
      >
        <option value="" style={{ color: "#000" }}>{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value} style={{ color: "#000" }}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function DateField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 flex-1 min-w-0">
      <CalendarIcon />
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Select Date of Birth"
        className="bg-transparent outline-none text-[12.5px] w-full"
        style={{ color: value ? "var(--ch-text-primary)" : "var(--ch-text-muted)" }}
      />
    </div>
  );
}

function TimeField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 flex-1 min-w-0">
      <ClockIcon />
      <input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent outline-none text-[12.5px] w-full"
        style={{ color: value ? "var(--ch-text-primary)" : "var(--ch-text-muted)" }}
      />
    </div>
  );
}

function ZodiacIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="flex-shrink-0">
      <circle cx="7.5" cy="7.5" r="6.5" stroke="#e0b04a" strokeWidth="1.2" />
      <circle cx="7.5" cy="7.5" r="1.4" fill="#e0b04a" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="flex-shrink-0">
      <rect x="1.5" y="2.8" width="12" height="10.5" rx="1.5" stroke="#e0b04a" strokeWidth="1.1" />
      <line x1="1.5" y1="5.8" x2="13.5" y2="5.8" stroke="#e0b04a" strokeWidth="1.1" />
      <line x1="4.5" y1="1.3" x2="4.5" y2="3.8" stroke="#e0b04a" strokeWidth="1.1" />
      <line x1="10.5" y1="1.3" x2="10.5" y2="3.8" stroke="#e0b04a" strokeWidth="1.1" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="flex-shrink-0">
      <circle cx="7.5" cy="7.5" r="6.2" stroke="#e0b04a" strokeWidth="1.1" />
      <path d="M7.5 4V7.5L10 9" stroke="#e0b04a" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}
