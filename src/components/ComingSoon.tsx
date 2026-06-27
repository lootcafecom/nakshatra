import Link from "next/link";
import NavBar from "@/components/NavBar";

interface ComingSoonProps {
  roman: string;
  title: string;
  description: string;
  week: string;
}

export default function ComingSoon({
  roman,
  title,
  description,
  week,
}: ComingSoonProps) {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div
          className="font-voice italic text-[34px] mb-4"
          style={{ color: "var(--ch-gold-600)", fontFamily: "var(--font-voice)" }}
        >
          {roman}
        </div>
        <h1 className="ch-heading text-[26px] mb-3" style={{ fontWeight: 600 }}>
          {title}
        </h1>
        <p className="text-[14px] mb-6" style={{ color: "var(--ch-text-secondary)" }}>
          {description}
        </p>
        <div
          className="inline-block px-4 py-1.5 rounded-full text-[12px] mb-8"
          style={{
            background: "var(--ch-glass)",
            border: "1px solid var(--ch-border)",
            color: "var(--ch-text-muted)",
          }}
        >
          {week}
        </div>
        <div>
          <Link href="/" className="ch-btn-secondary inline-block px-5 py-2.5 text-[13px]">
            Back to your birth profile
          </Link>
        </div>
      </main>
    </div>
  );
}
