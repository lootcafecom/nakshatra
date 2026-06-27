import Link from "next/link";

export default function NavBar() {
  return (
    <header
      className="flex items-center justify-between px-6 sm:px-10 py-5"
      style={{ borderBottom: "1px solid var(--ch-border)" }}
    >
      <Link href="/" className="flex items-center gap-2.5">
        <span
          className="inline-block w-7 h-7 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, var(--ch-gold-200), var(--ch-gold-600) 75%)",
          }}
        />
        <div>
          <div
            className="ch-heading text-[15px] leading-none"
            style={{ fontWeight: 600 }}
          >
            Nakshatra
          </div>
          <div
            className="text-[9px] uppercase tracking-[0.12em] leading-none mt-0.5"
            style={{ color: "var(--ch-text-muted)" }}
          >
            astrology, in one place
          </div>
        </div>
      </Link>

      <nav className="hidden sm:flex items-center gap-7 text-[13px]" style={{ color: "var(--ch-text-secondary)" }}>
        <Link href="/readings/vedic" className="hover:text-white transition-colors">
          Vedic chart
        </Link>
        <Link href="/readings/numerology" className="hover:text-white transition-colors">
          Numerology
        </Link>
        <Link href="/readings/tarot" className="hover:text-white transition-colors">
          Tarot
        </Link>
        <Link href="/readings/vastu" className="hover:text-white transition-colors">
          Vastu
        </Link>
        <Link href="/pricing" className="hover:text-white transition-colors">
          Pricing
        </Link>
      </nav>

      <button
        className="ch-btn-secondary text-[13px] px-4 py-2"
        type="button"
      >
        Sign in
      </button>
    </header>
  );
}
