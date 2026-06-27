"use client";

import { useState } from "react";
import { LANGUAGES } from "@/lib/languages";

interface LanguageSelectorProps {
  value: string;
  onChange: (code: string) => void;
  compact?: boolean;
}

export default function LanguageSelector({
  value,
  onChange,
  compact = false,
}: LanguageSelectorProps) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? LANGUAGES : LANGUAGES.slice(0, compact ? 4 : 6);

  return (
    <div className="flex flex-wrap gap-2">
      {visible.map((lang) => {
        const active = lang.code === value;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => onChange(lang.code)}
            aria-pressed={active}
            className="px-3.5 py-1.5 rounded-full text-[13px] transition-colors"
            style={{
              background: active
                ? "linear-gradient(135deg, var(--ch-gold-400), var(--ch-gold-600))"
                : "var(--ch-glass)",
              color: active ? "#241a05" : "var(--ch-text-secondary)",
              border: `1px solid ${active ? "transparent" : "var(--ch-border)"}`,
              fontWeight: active ? 600 : 400,
            }}
          >
            {lang.native}
          </button>
        );
      })}
      {!showAll && LANGUAGES.length > visible.length && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="px-3.5 py-1.5 rounded-full text-[13px]"
          style={{
            background: "transparent",
            color: "var(--ch-text-muted)",
            border: "1px solid var(--ch-border)",
          }}
        >
          + {LANGUAGES.length - visible.length} more
        </button>
      )}
    </div>
  );
}
