interface Service {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const SERVICES: Service[] = [
  {
    title: "Personalized Horoscope",
    desc: "Detailed daily, weekly, monthly & yearly horoscopes.",
    icon: <SunIcon />,
  },
  {
    title: "Love & Relationship Reading",
    desc: "Understand your love life and strengthen your relationships.",
    icon: <HeartIcon />,
  },
  {
    title: "Career & Finance Guidance",
    desc: "Discover career paths and financial growth opportunities.",
    icon: <BriefcaseIcon />,
  },
  {
    title: "Numerology Reading",
    desc: "Decode numbers and reveal hidden patterns in your life.",
    icon: <HashIcon />,
  },
  {
    title: "Tarot Card Reading",
    desc: "Get clarity and answers through ancient tarot wisdom.",
    icon: <CardsIcon />,
  },
  {
    title: "Birth Chart Analysis",
    desc: "In-depth analysis of your birth chart and planetary positions.",
    icon: <ChartIcon />,
  },
];

export default function ServicesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-10 py-14">
      <div
        className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] mb-3"
        style={{ color: "var(--ch-gold-400)" }}
      >
        <span>→</span> What We Offer
      </div>
      <h2
        className="text-[26px] sm:text-[30px] mb-9"
        style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--ch-text-primary)" }}
      >
        Our <span style={{ color: "var(--ch-gold-400)" }}>Premium</span> Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((s) => (
          <div
            key={s.title}
            className="p-6 transition-colors"
            style={{
              background: "var(--ch-glass)",
              border: "1px solid var(--ch-border)",
              borderRadius: "var(--ch-radius-md)",
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
              style={{ border: "1.5px solid var(--ch-gold-600)", background: "rgba(224,176,74,0.08)" }}
            >
              {s.icon}
            </div>
            <h3
              className="text-[16px] mb-2"
              style={{ fontFamily: "var(--font-voice)", color: "var(--ch-text-primary)" }}
            >
              {s.title}
            </h3>
            <p className="text-[12.5px] leading-relaxed mb-4" style={{ color: "var(--ch-text-muted)" }}>
              {s.desc}
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-[12.5px] font-medium"
              style={{ color: "var(--ch-gold-400)" }}
            >
              Read More
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M1.5 5.5H9.5M9.5 5.5L6 2M9.5 5.5L6 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

function SunIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="4" stroke="#e0b04a" strokeWidth="1.3" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4;
        return (
          <line key={i} x1={11 + Math.cos(a) * 6.5} y1={11 + Math.sin(a) * 6.5} x2={11 + Math.cos(a) * 9.5} y2={11 + Math.sin(a) * 9.5} stroke="#e0b04a" strokeWidth="1.3" strokeLinecap="round" />
        );
      })}
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 18.5C11 18.5 2.5 13.5 2.5 7.8C2.5 4.8 4.8 3 7.2 3C9 3 10.3 4 11 5.2C11.7 4 13 3 14.8 3C17.2 3 19.5 4.8 19.5 7.8C19.5 13.5 11 18.5 11 18.5Z" stroke="#e0b04a" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}
function BriefcaseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="2.5" y="7" width="17" height="11" rx="1.5" stroke="#e0b04a" strokeWidth="1.3" />
      <path d="M7.5 7V5.5C7.5 4.4 8.4 3.5 9.5 3.5H12.5C13.6 3.5 14.5 4.4 14.5 5.5V7" stroke="#e0b04a" strokeWidth="1.3" />
      <line x1="2.5" y1="12" x2="19.5" y2="12" stroke="#e0b04a" strokeWidth="1.3" />
    </svg>
  );
}
function HashIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <line x1="8" y1="3" x2="6" y2="19" stroke="#e0b04a" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="16" y1="3" x2="14" y2="19" stroke="#e0b04a" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="3.5" y1="8.5" x2="18.5" y2="8.5" stroke="#e0b04a" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="2.5" y1="14" x2="17.5" y2="14" stroke="#e0b04a" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function CardsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="3" y="5" width="9" height="13" rx="1.3" transform="rotate(-8 3 5)" stroke="#e0b04a" strokeWidth="1.2" />
      <rect x="9.5" y="4.5" width="9" height="13" rx="1.3" stroke="#e0b04a" strokeWidth="1.3" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="8" stroke="#e0b04a" strokeWidth="1.3" />
      <path d="M11 3V19M3 11H19M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5" stroke="#e0b04a" strokeWidth="0.8" opacity="0.7" />
    </svg>
  );
}
