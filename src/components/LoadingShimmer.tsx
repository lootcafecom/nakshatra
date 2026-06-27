export default function LoadingShimmer({ lines = 6 }: { lines?: number }) {
  const widths = [95, 82, 90, 70, 88, 60, 92, 75];
  return (
    <div className="flex flex-col gap-2.5">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3.5 rounded"
          style={{
            width: `${widths[i % widths.length]}%`,
            background:
              "linear-gradient(90deg, rgba(180,130,255,0.06) 0%, rgba(180,130,255,0.16) 50%, rgba(180,130,255,0.06) 100%)",
            backgroundSize: "200% 100%",
            animation: "ch-shimmer 1.5s infinite",
          }}
        />
      ))}
      <style>{`
        @keyframes ch-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
