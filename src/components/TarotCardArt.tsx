interface TarotCardArtProps {
  name: string;
  reversed: boolean;
  size?: number;
}

/**
 * A stylized, original card face — gold frame, the card's name, and a
 * simple emblematic glyph. This is intentionally NOT a reproduction of
 * Rider-Waite or any other specific deck's illustrations (those
 * illustrations carry their own rights even where the card concepts are
 * centuries old) — it's original art that represents the drawn card.
 */
export default function TarotCardArt({ name, reversed, size = 140 }: TarotCardArtProps) {
  const glyph = pickGlyph(name);
  return (
    <svg
      width={size}
      height={size * 1.6}
      viewBox="0 0 140 224"
      style={{ transform: reversed ? "rotate(180deg)" : undefined }}
      role="img"
      aria-label={`${name}${reversed ? ", reversed" : ""}`}
    >
      <title>{name}</title>
      <defs>
        <linearGradient id="cardGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0d99a" />
          <stop offset="100%" stopColor="#8a6a1f" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="134" height="218" rx="8" fill="#160a2e" stroke="url(#cardGold)" strokeWidth="2" />
      <rect x="10" y="10" width="120" height="204" rx="5" fill="none" stroke="#e0b04a" strokeWidth="0.75" opacity="0.5" />
      <g transform="translate(70, 95)">{glyph}</g>
      <text x="70" y="195" textAnchor="middle" fontSize="11" fill="#f0d99a" style={{ fontFamily: "serif" }}>
        {name.length > 18 ? name.slice(0, 17) + "…" : name}
      </text>
    </svg>
  );
}

function pickGlyph(name: string) {
  const stroke = "#e0b04a";
  if (name.includes("Sun")) {
    return (
      <g stroke={stroke} strokeWidth="2" fill="none">
        <circle r="22" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6;
          return <line key={i} x1={Math.cos(a) * 26} y1={Math.sin(a) * 26} x2={Math.cos(a) * 34} y2={Math.sin(a) * 34} />;
        })}
      </g>
    );
  }
  if (name.includes("Moon")) {
    return <path d="M10,-28 A28,28 0 1 0 10,28 A20,20 0 1 1 10,-28 Z" fill={stroke} />;
  }
  if (name.includes("Star")) {
    return (
      <path
        d="M0,-30 L7,-9 L29,-9 L11,4 L18,26 L0,12 L-18,26 L-11,4 L-29,-9 L-7,-9 Z"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
      />
    );
  }
  if (name.includes("Death")) {
    return (
      <g stroke={stroke} strokeWidth="2" fill="none">
        <circle r="14" cy="-8" />
        <line x1="0" y1="6" x2="0" y2="32" />
        <line x1="-12" y1="20" x2="12" y2="20" />
      </g>
    );
  }
  if (name.includes("Tower")) {
    return (
      <g stroke={stroke} strokeWidth="2" fill="none">
        <rect x="-14" y="-30" width="28" height="55" />
        <line x1="-14" y1="-15" x2="14" y2="-15" />
        <path d="M-18,-30 L0,-42 L18,-30" />
      </g>
    );
  }
  if (name.includes("Wheel")) {
    return (
      <g stroke={stroke} strokeWidth="2" fill="none">
        <circle r="26" />
        <circle r="6" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4;
          return <line key={i} x1={Math.cos(a) * 6} y1={Math.sin(a) * 6} x2={Math.cos(a) * 26} y2={Math.sin(a) * 26} />;
        })}
      </g>
    );
  }
  if (name.includes("Cups")) {
    return (
      <g stroke={stroke} strokeWidth="2" fill="none">
        <path d="M-16,-10 L16,-10 L12,20 A12,8 0 0 1 -12,20 Z" />
        <line x1="0" y1="20" x2="0" y2="30" />
        <line x1="-10" y1="30" x2="10" y2="30" />
      </g>
    );
  }
  if (name.includes("Swords")) {
    return (
      <g stroke={stroke} strokeWidth="2" fill="none">
        <line x1="0" y1="-32" x2="0" y2="24" />
        <path d="M-8,-24 L0,-32 L8,-24" />
        <line x1="-10" y1="14" x2="10" y2="14" />
      </g>
    );
  }
  if (name.includes("Wands")) {
    return (
      <g stroke={stroke} strokeWidth="2" fill="none">
        <line x1="0" y1="-30" x2="0" y2="30" />
        <line x1="-8" y1="-24" x2="8" y2="-18" />
        <line x1="8" y1="-12" x2="-8" y2="-6" />
      </g>
    );
  }
  if (name.includes("Pentacles")) {
    return (
      <path
        d="M0,-26 L7.4,-8 L26,-8 L11,3 L17,24 L0,12 L-17,24 L-11,3 L-26,-8 L-7.4,-8 Z"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
      />
    );
  }
  // default: a simple eight-pointed compass star for any other major arcana
  return (
    <g stroke={stroke} strokeWidth="2" fill="none">
      <circle r="24" />
      <path d="M0,-24 L0,24 M-24,0 L24,0 M-17,-17 L17,17 M-17,17 L17,-17" />
    </g>
  );
}
