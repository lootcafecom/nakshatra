import Link from "next/link";

export default function NavBar() {
  return (
    <header
      className="flex items-center justify-between px-6 sm:px-10 py-4 relative z-20"
      style={{ borderBottom: "1px solid var(--ch-border)" }}
    >
      <Link href="/" className="flex items-center gap-2.5">
        <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
          <circle cx="17" cy="17" r="15.5" fill="none" stroke="#e0b04a" strokeWidth="1" />
          <circle cx="17" cy="17" r="2.4" fill="#e0b04a" />
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * Math.PI) / 4;
            const x = 17 + Math.cos(angle) * 15.5;
            const y = 17 + Math.sin(angle) * 15.5;
            return <circle key={i} cx={x} cy={y} r="0.9" fill="#e0b04a" />;
          })}
        </svg>
        <div>
          <div
            className="text-[19px] leading-none"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--ch-text-primary)" }}
          >
            Astro<span style={{ color: "var(--ch-gold-400)" }}>Luxe</span>
          </div>
          <div
            className="text-[8px] uppercase tracking-[0.16em] leading-none mt-1"
            style={{ color: "var(--ch-text-muted)" }}
          >
            guiding stars, shaping destiny
          </div>
        </div>
      </Link>

      <nav
        className="hidden lg:flex items-center gap-8 text-[13.5px]"
        style={{ color: "var(--ch-text-secondary)" }}
      >
        <Link href="/" className="relative pb-1" style={{ color: "var(--ch-gold-400)" }}>
          Home
          <span
            className="absolute left-0 right-0 -bottom-[17px] h-[2px]"
            style={{ background: "var(--ch-gold-400)" }}
          />
        </Link>
        <Link href="/about" className="hover:text-white transition-colors">About</Link>
        <Link href="/horoscope" className="hover:text-white transition-colors">Horoscope</Link>
        <Link href="/services" className="hover:text-white transition-colors">Services</Link>
        <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
          Pages
          <svg width="9" height="6" viewBox="0 0 9 6" fill="none">
            <path d="M1 1L4.5 5L8 1" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </span>
        <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
      </nav>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Search"
          className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full transition-colors"
          style={{ border: "1px solid var(--ch-border)", color: "var(--ch-text-secondary)" }}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.3" />
            <line x1="10.3" y1="10.3" x2="14" y2="14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </button>
        <button
          type="button"
          className="ch-btn-primary flex items-center gap-2 text-[13px] px-4 py-2"
        >
          Sign In
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="4.6" r="2.4" stroke="white" strokeWidth="1.2" />
            <path d="M2.2 12c0-2.6 2.1-4.2 4.8-4.2s4.8 1.6 4.8 4.2" stroke="white" strokeWidth="1.2" />
          </svg>
        </button>
      </div>
    </header>
  );
}
