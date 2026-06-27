const STATS = [
  { value: "500K+", label: "Happy Users", icon: <UsersIcon /> },
  { value: "98.7%", label: "Accuracy Rate", icon: <TargetIcon /> },
  { value: "25+", label: "Expert Astrologers", icon: <StarIcon /> },
  { value: "15+", label: "Years of Guidance", icon: <CompassIcon /> },
];

export default function WhyChooseAndHoroscope() {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-10 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6">
        {/* Why choose us */}
        <div
          className="p-7 relative overflow-hidden"
          style={{
            background: "var(--ch-glass)",
            border: "1px solid var(--ch-border)",
            borderRadius: "var(--ch-radius-lg)",
          }}
        >
          <div
            className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.18em] mb-6"
            style={{ color: "var(--ch-gold-400)" }}
          >
            <span>→</span> Why Choose AstroLuxe? <span>←</span>
          </div>

          <div className="grid grid-cols-2 gap-y-7 mb-6">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center gap-2">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ border: "1.5px solid var(--ch-gold-600)", background: "rgba(224,176,74,0.08)" }}
                >
                  {s.icon}
                </div>
                <div className="text-[18px] font-semibold" style={{ color: "var(--ch-text-primary)" }}>
                  {s.value}
                </div>
                <div className="text-[11px]" style={{ color: "var(--ch-text-muted)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div
            className="h-28 rounded-xl flex items-center justify-center"
            style={{
              background:
                "radial-gradient(circle at 50% 30%, rgba(224,176,74,0.25), transparent 70%), linear-gradient(180deg, rgba(61,26,102,0.6), rgba(10,6,18,0.6))",
              border: "1px solid var(--ch-border)",
            }}
          >
            <span className="text-[11px] italic" style={{ color: "var(--ch-text-faint)", fontFamily: "var(--font-voice)" }}>
              guided by the stars, trusted by thousands
            </span>
          </div>
        </div>

        {/* today's horoscope */}
        <div
          className="p-7"
          style={{
            background: "var(--ch-glass)",
            border: "1px solid var(--ch-border)",
            borderRadius: "var(--ch-radius-lg)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div
              className="flex items-center gap-2 text-[13px]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--ch-text-primary)" }}
            >
              <span style={{ color: "var(--ch-gold-400)" }}>→</span> Today&apos;s Horoscope
            </div>
            <button
              className="text-[11.5px] flex items-center gap-1 px-3.5 py-1.5 rounded-full"
              style={{ border: "1px solid var(--ch-border-strong)", color: "var(--ch-text-secondary)" }}
            >
              View Full Horoscope
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 5H8.5M8.5 5L5.5 2M8.5 5L5.5 8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div
            className="flex gap-4 p-5 rounded-xl mb-5"
            style={{ background: "rgba(123,47,247,0.1)", border: "1px solid var(--ch-border)" }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ border: "2px solid var(--ch-gold-600)", background: "rgba(224,176,74,0.1)" }}
            >
              <span style={{ fontSize: 28 }}>♌</span>
            </div>
            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[17px]" style={{ fontFamily: "var(--font-voice)", color: "var(--ch-text-primary)" }}>
                  Leo
                </span>
                <span className="text-[10.5px]" style={{ color: "var(--ch-text-muted)" }}>
                  July 23 – August 22
                </span>
              </div>
              <p className="text-[12.5px] leading-relaxed" style={{ color: "var(--ch-text-secondary)" }}>
                A wonderful day awaits you. Your confidence will attract
                opportunities — stay focused on your goals, success is near.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <MoodRow label="Love" emojis="❤️❤️❤️❤️🤍" />
            <MoodRow label="Career" emojis="💼💼💼💼🤍" />
            <MoodRow label="Health" emojis="💛💛💛🤍🤍" />
          </div>
        </div>
      </div>
    </section>
  );
}

function MoodRow({ label, emojis }: { label: string; emojis: string }) {
  return (
    <div>
      <div className="text-[11px] mb-1.5" style={{ color: "var(--ch-text-muted)" }}>
        {label}
      </div>
      <div className="text-[13px]">{emojis}</div>
    </div>
  );
}

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="6.5" cy="6" r="2.5" stroke="#e0b04a" strokeWidth="1.2" />
      <circle cx="13" cy="7" r="2" stroke="#e0b04a" strokeWidth="1.1" />
      <path d="M2 15c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke="#e0b04a" strokeWidth="1.2" />
      <path d="M11.5 15c0-2-1-3.3-2.5-3.8" stroke="#e0b04a" strokeWidth="1.1" />
    </svg>
  );
}
function TargetIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="#e0b04a" strokeWidth="1.1" />
      <circle cx="9" cy="9" r="4" stroke="#e0b04a" strokeWidth="1.1" />
      <circle cx="9" cy="9" r="1.3" fill="#e0b04a" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 1.5L11.2 6.2L16.2 6.8L12.4 10.2L13.5 15.2L9 12.6L4.5 15.2L5.6 10.2L1.8 6.8L6.8 6.2Z" stroke="#e0b04a" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  );
}
function CompassIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7.3" stroke="#e0b04a" strokeWidth="1.1" />
      <path d="M11.5 6.5L10 10L6.5 11.5L8 8Z" stroke="#e0b04a" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}
