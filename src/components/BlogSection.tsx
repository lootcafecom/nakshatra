interface BlogPost {
  category: string;
  title: string;
  date: string;
  gradient: string;
}

const POSTS: BlogPost[] = [
  {
    category: "Astrology",
    title: "How Planets Influence Your Daily Life?",
    date: "May 10, 2024",
    gradient: "radial-gradient(circle at 30% 30%, #e0934a, #5a1dc4 70%)",
  },
  {
    category: "Horoscope",
    title: "Weekly Horoscope Predictions (May 6 – May 12)",
    date: "May 06, 2024",
    gradient: "radial-gradient(circle at 50% 40%, #2e0f66, #0a0612 70%)",
  },
  {
    category: "Zodiac Signs",
    title: "Top 5 Most Compatible Zodiac Pairs",
    date: "May 02, 2024",
    gradient: "radial-gradient(circle at 60% 30%, #b07bf0, #160a2e 70%)",
  },
  {
    category: "Numerology",
    title: "What Your Birth Number Reveals About You?",
    date: "Apr 28, 2024",
    gradient: "radial-gradient(circle at 40% 50%, #7b2ff7, #0a0612 70%)",
  },
];

export default function BlogSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-10 py-14">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h2
          className="text-[22px] sm:text-[26px]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--ch-text-primary)" }}
        >
          Astrology <span style={{ color: "var(--ch-gold-400)" }}>Insights</span> & Blogs
        </h2>
        <button
          className="ch-btn-primary flex items-center gap-1.5 text-[12.5px] px-4 py-2"
        >
          View All Blogs
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M1.5 5.5H9.5M9.5 5.5L6 2M9.5 5.5L6 9" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {POSTS.map((post) => (
          <article
            key={post.title}
            style={{
              background: "var(--ch-glass)",
              border: "1px solid var(--ch-border)",
              borderRadius: "var(--ch-radius-md)",
              overflow: "hidden",
            }}
          >
            <div
              className="h-32"
              style={{ background: post.gradient }}
              role="img"
              aria-label={post.title}
            />
            <div className="p-4">
              <div
                className="text-[10px] uppercase tracking-wide mb-2"
                style={{ color: "var(--ch-gold-400)" }}
              >
                {post.category}
              </div>
              <h3
                className="text-[14px] leading-snug mb-2"
                style={{ fontFamily: "var(--font-voice)", color: "var(--ch-text-primary)" }}
              >
                {post.title}
              </h3>
              <div className="text-[11px]" style={{ color: "var(--ch-text-muted)" }}>
                {post.date}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
