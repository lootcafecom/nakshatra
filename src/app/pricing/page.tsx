import NavBar from "@/components/NavBar";

const TIERS = [
  {
    name: "Basic",
    price: "₹99",
    period: "/month",
    features: [
      "Daily personalized horoscope and Panchang",
      "Daily tarot pull",
      "Weekly transit alerts",
      "Unlimited basic readings",
    ],
  },
  {
    name: "Premium",
    price: "₹299",
    period: "/month",
    featured: true,
    features: [
      "Everything in Basic",
      "Full Kundli with all houses",
      "Two one-time readings monthly",
      "Monthly detailed forecast",
      "PDF downloads",
    ],
  },
  {
    name: "Elite",
    price: "₹799",
    period: "/month",
    features: [
      "Everything in Premium",
      "Unlimited one-time readings",
      "Up to 4 family profiles",
      "Two human astrologer sessions monthly",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="ch-heading text-[26px] mb-2" style={{ fontWeight: 600 }}>
            Plans
          </h1>
          <p className="text-[13px]" style={{ color: "var(--ch-text-muted)" }}>
            Payments and live checkout arrive in Week 2. This is the planned structure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className="p-6"
              style={{
                background: "var(--ch-glass)",
                borderRadius: "var(--ch-radius-md)",
                border: tier.featured
                  ? "2px solid var(--ch-gold-400)"
                  : "1px solid var(--ch-border)",
              }}
            >
              {tier.featured && (
                <div
                  className="inline-block text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full mb-3"
                  style={{ background: "var(--ch-gold-800)", color: "var(--ch-gold-200)" }}
                >
                  Most popular
                </div>
              )}
              <div
                className="text-[15px] mb-1"
                style={{ fontFamily: "var(--font-voice)", color: "var(--ch-text-primary)" }}
              >
                {tier.name}
              </div>
              <div className="mb-4">
                <span className="text-[26px] ch-gold-text" style={{ fontWeight: 600 }}>
                  {tier.price}
                </span>
                <span className="text-[13px]" style={{ color: "var(--ch-text-muted)" }}>
                  {tier.period}
                </span>
              </div>
              <ul className="space-y-2">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="text-[12.5px] leading-relaxed"
                    style={{ color: "var(--ch-text-secondary)" }}
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
