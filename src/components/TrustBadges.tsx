interface Badge {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const BADGES: Badge[] = [
  {
    icon: <BadgeIcon path="M7 1L8.7 4.6L12.6 5.2L9.8 7.9L10.5 11.8L7 9.9L3.5 11.8L4.2 7.9L1.4 5.2L5.3 4.6Z" />,
    title: "100%",
    subtitle: "Accurate Reading",
  },
  {
    icon: <BadgeIcon path="M7 2C8 0.8 10.3 0.8 11 2.3C11.7 3.8 10.8 5 9.5 6L7 8.3L4.5 6C3.2 5 2.3 3.8 3 2.3C3.7 0.8 6 0.8 7 2Z" />,
    title: "AI Powered",
    subtitle: "Horoscope",
  },
  {
    icon: <BadgeIcon path="M7 1L11.5 2.6V6.3C11.5 9 9.5 11 7 12.5C4.5 11 2.5 9 2.5 6.3V2.6Z" />,
    title: "Secure &",
    subtitle: "Private",
  },
];

function BadgeIcon({ path }: { path: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6.4" stroke="#e0b04a" strokeWidth="0.9" opacity="0.6" />
      <path d={path} stroke="#e0b04a" strokeWidth="1" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export default function TrustBadges() {
  return (
    <div className="flex flex-wrap gap-6 sm:gap-8">
      {BADGES.map((b) => (
        <div key={b.title + b.subtitle} className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ border: "1px solid var(--ch-border-strong)", background: "var(--ch-glass)" }}
          >
            {b.icon}
          </div>
          <div className="leading-tight">
            <div className="text-[12.5px] font-semibold" style={{ color: "var(--ch-text-primary)" }}>
              {b.title}
            </div>
            <div className="text-[11px]" style={{ color: "var(--ch-text-muted)" }}>
              {b.subtitle}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
