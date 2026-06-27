import { ZODIAC_SIGNS } from "@/lib/zodiac";

export default function ZodiacStrip() {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h2
          className="text-[20px] sm:text-[22px]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--ch-text-primary)" }}
        >
          Explore All <span style={{ color: "var(--ch-gold-400)" }}>Zodiac</span> Signs
        </h2>
        <button className="ch-btn-primary flex items-center gap-1.5 text-[12.5px] px-4 py-2">
          View All Signs
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M1.5 5.5H9.5M9.5 5.5L6 2M9.5 5.5L6 9" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-4">
        {ZODIAC_SIGNS.map((sign) => (
          <div key={sign.name} className="flex flex-col items-center text-center gap-2.5">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ border: "1.5px solid var(--ch-gold-600)", background: "rgba(224,176,74,0.06)" }}
            >
              <span style={{ color: "var(--ch-gold-400)", fontSize: 22 }}>{sign.symbol}</span>
            </div>
            <div>
              <div className="text-[12.5px] font-medium" style={{ color: "var(--ch-text-primary)" }}>
                {sign.name}
              </div>
              <div className="text-[10px]" style={{ color: "var(--ch-text-muted)" }}>
                {sign.dateRange}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
