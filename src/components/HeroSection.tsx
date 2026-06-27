import TrustBadges from "./TrustBadges";
import HeroSearchForm, { HeroFormData } from "./HeroSearchForm";
import ZodiacWheelHero from "./ZodiacWheelHero";

interface HeroSectionProps {
  onFormSubmit: (data: HeroFormData) => void;
}

export default function HeroSection({ onFormSubmit }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 items-center">
        <div className="ch-fade-up">
          <div
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] mb-5"
            style={{ color: "var(--ch-gold-400)" }}
          >
            <span>→</span> Welcome to AstroLuxe <span>←</span>
          </div>

          <h1
            className="text-[34px] sm:text-[46px] leading-[1.15] mb-5"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--ch-text-primary)" }}
          >
            Discover What
            <br />
            The <span style={{ color: "var(--ch-gold-400)" }}>Stars</span> Reveal
          </h1>

          <p
            className="text-[14.5px] leading-relaxed mb-7 max-w-md"
            style={{ color: "var(--ch-text-secondary)" }}
          >
            Unlock cosmic insights, personalized horoscopes, and guidance for
            a brighter tomorrow.
          </p>

          <div className="mb-7">
            <TrustBadges />
          </div>

          <HeroSearchForm onSubmit={onFormSubmit} />
        </div>

        <div className="flex justify-center lg:justify-end ch-fade-up" style={{ animationDelay: "0.15s" }}>
          <ZodiacWheelHero size={440} />
        </div>
      </div>
    </section>
  );
}
