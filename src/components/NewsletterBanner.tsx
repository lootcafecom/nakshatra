export default function NewsletterBanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-10 py-8">
      <div
        className="flex flex-col sm:flex-row items-center gap-6 p-7 sm:p-8"
        style={{
          background: "linear-gradient(120deg, rgba(123,47,247,0.18), rgba(224,176,74,0.08))",
          border: "1px solid var(--ch-border-strong)",
          borderRadius: "var(--ch-radius-lg)",
        }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(224,176,74,0.15)", border: "1.5px solid var(--ch-gold-600)" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="6" width="18" height="13" rx="2" stroke="#e0b04a" strokeWidth="1.3" />
            <path d="M4 7.5L12 13L20 7.5" stroke="#e0b04a" strokeWidth="1.3" />
          </svg>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h3
            className="text-[18px] mb-1"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--ch-text-primary)" }}
          >
            Stay Updated with Cosmic Insights
          </h3>
          <p className="text-[12.5px]" style={{ color: "var(--ch-text-muted)" }}>
            Subscribe to our newsletter and never miss your horoscope.
          </p>
        </div>

        <form className="flex w-full sm:w-auto gap-0 rounded-full overflow-hidden" style={{ border: "1px solid var(--ch-border-strong)" }}>
          <input
            type="email"
            placeholder="Enter your email address"
            className="bg-transparent outline-none text-[13px] px-4 py-2.5 w-full sm:w-56"
            style={{ color: "var(--ch-text-primary)" }}
          />
          <button type="submit" className="ch-btn-primary px-5 py-2.5 text-[13px] whitespace-nowrap flex-shrink-0" style={{ borderRadius: 0 }}>
            Subscribe Now
          </button>
        </form>
      </div>
    </section>
  );
}
