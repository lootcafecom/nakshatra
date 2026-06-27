const QUICK_LINKS = ["Home", "About Us", "Horoscope", "Services", "Blog", "Contact Us"];
const OUR_SERVICES = [
  "Personalized Horoscope",
  "Love & Relationship",
  "Career Guidance",
  "Numerology Reading",
  "Tarot Reading",
  "Birth Chart Analysis",
];
const SUPPORT = ["FAQ", "Privacy Policy", "Terms & Conditions", "Refund Policy", "Contact Support"];

export default function Footer() {
  return (
    <footer className="pt-14" style={{ borderTop: "1px solid var(--ch-border)" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-10">
          {/* brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
                <circle cx="14" cy="14" r="12.5" fill="none" stroke="#e0b04a" strokeWidth="1" />
                <circle cx="14" cy="14" r="2" fill="#e0b04a" />
              </svg>
              <div
                className="text-[17px]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--ch-text-primary)" }}
              >
                Astro<span style={{ color: "var(--ch-gold-400)" }}>Luxe</span>
              </div>
            </div>
            <p className="text-[12.5px] leading-relaxed mb-5 max-w-xs" style={{ color: "var(--ch-text-muted)" }}>
              Empowering lives through ancient wisdom and cosmic guidance.
            </p>
            <div className="flex gap-2.5">
              {["f", "ig", "x", "yt"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[11px]"
                  style={{ border: "1px solid var(--ch-border-strong)", color: "var(--ch-text-secondary)" }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Quick Links" items={QUICK_LINKS} />
          <FooterColumn title="Our Services" items={OUR_SERVICES} />
          <FooterColumn title="Support" items={SUPPORT} />
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-7"
          style={{ borderTop: "1px solid var(--ch-border)" }}
        >
          <ContactItem icon={<PhoneIcon />} text="+1 234 567 8900" />
          <ContactItem icon={<MailIcon />} text="info@astroluxe.com" />
          <ContactItem icon={<PinIcon />} text="123 Cosmic Street, Universe City, UC 12345" />
        </div>

        <div
          className="text-center text-[11.5px] py-6"
          style={{ borderTop: "1px solid var(--ch-border)", color: "var(--ch-text-faint)" }}
        >
          © 2026 AstroLuxe. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div
        className="text-[13px] mb-4"
        style={{ fontFamily: "var(--font-voice)", color: "var(--ch-gold-400)" }}
      >
        {title}
      </div>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item}>
            <a href="#" className="text-[12.5px] hover:text-white transition-colors" style={{ color: "var(--ch-text-muted)" }}>
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ border: "1px solid var(--ch-border-strong)" }}
      >
        {icon}
      </div>
      <span className="text-[12.5px]" style={{ color: "var(--ch-text-secondary)" }}>
        {text}
      </span>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 2.5C2 2.5 2.5 1.5 3.5 1.5C4.5 1.5 5 3 5.5 4C6 5 5 5.5 5 5.5C5.5 7 7 8.5 8.5 9C8.5 9 9 8 10 8.5C11 9 12.5 9.5 12.5 10.5C12.5 11.5 11.5 12 11.5 12C7 13 1 7 2 2.5Z" stroke="#e0b04a" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1.5" y="3" width="11" height="8" rx="1" stroke="#e0b04a" strokeWidth="1.1" />
      <path d="M2 3.8L7 7.3L12 3.8" stroke="#e0b04a" strokeWidth="1.1" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 13C7 13 11.5 9 11.5 5.5C11.5 3 9.5 1 7 1C4.5 1 2.5 3 2.5 5.5C2.5 9 7 13 7 13Z" stroke="#e0b04a" strokeWidth="1.1" />
      <circle cx="7" cy="5.3" r="1.6" stroke="#e0b04a" strokeWidth="1" />
    </svg>
  );
}
