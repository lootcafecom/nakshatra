import { ZODIAC_SIGNS } from "@/lib/zodiac";

interface ZodiacWheelHeroProps {
  size?: number;
}

/**
 * Large decorative zodiac wheel for the hero section — concentric gold
 * rings, twelve glyphs, a glowing compass-star center. Built as original
 * SVG geometry (not a photographic/stock asset) so it's license-clean
 * and themeable via CSS variables.
 */
export default function ZodiacWheelHero({ size = 480 }: ZodiacWheelHeroProps) {
  const cx = 240;
  const cy = 240;
  const outerR = 220;
  const ringR = 188;
  const glyphR = 152;
  const innerRingR = 100;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 480 480"
      role="img"
      aria-label="Decorative zodiac wheel"
    >
      <title>Zodiac wheel</title>
      <defs>
        <radialGradient id="wheelGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f5e3ff" stopOpacity="0.9" />
          <stop offset="35%" stopColor="#b07bf0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7b2ff7" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fdf6e3" />
          <stop offset="50%" stopColor="#e0b04a" />
          <stop offset="100%" stopColor="#8a6a1f" />
        </linearGradient>
      </defs>

      {/* ambient glow behind the wheel */}
      <circle cx={cx} cy={cy} r={230} fill="url(#wheelGlow)" />

      {/* outer ring */}
      <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="url(#goldStroke)" strokeWidth="2.5" opacity="0.9" />
      {/* tick marks around outer ring */}
      {Array.from({ length: 60 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 60;
        const r1 = outerR - 4;
        const r2 = i % 5 === 0 ? outerR - 14 : outerR - 9;
        return (
          <line
            key={i}
            x1={cx + Math.cos(a) * r1}
            y1={cy + Math.sin(a) * r1}
            x2={cx + Math.cos(a) * r2}
            y2={cy + Math.sin(a) * r2}
            stroke="#e0b04a"
            strokeWidth="1"
            opacity="0.55"
          />
        );
      })}

      {/* secondary ring holding the glyphs */}
      <circle cx={cx} cy={cy} r={ringR} fill="none" stroke="url(#goldStroke)" strokeWidth="1.4" opacity="0.75" />

      {/* twelve segment divider lines */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 12 - Math.PI / 2;
        return (
          <line
            key={i}
            x1={cx + Math.cos(a) * innerRingR}
            y1={cy + Math.sin(a) * innerRingR}
            x2={cx + Math.cos(a) * ringR}
            y2={cy + Math.sin(a) * ringR}
            stroke="#caa3f0"
            strokeWidth="0.6"
            opacity="0.35"
          />
        );
      })}

      {/* zodiac glyphs */}
      {ZODIAC_SIGNS.map((sign, i) => {
        const a = (i * Math.PI * 2) / 12 - Math.PI / 2 + Math.PI / 12;
        const x = cx + Math.cos(a) * glyphR;
        const y = cy + Math.sin(a) * glyphR;
        return (
          <text
            key={sign.name}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="22"
            fill="#f0d99a"
            style={{ filter: "drop-shadow(0 0 4px rgba(224,176,74,0.5))" }}
          >
            {sign.symbol}
          </text>
        );
      })}

      {/* inner ring */}
      <circle cx={cx} cy={cy} r={innerRingR} fill="none" stroke="url(#goldStroke)" strokeWidth="1.4" opacity="0.8" />

      {/* center compass star */}
      <g transform={`translate(${cx}, ${cy})`}>
        <circle r="14" fill="#fff8e8" opacity="0.95" />
        <circle r="22" fill="none" stroke="#e0b04a" strokeWidth="1" opacity="0.6" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4;
          const long = i % 2 === 0;
          const len = long ? 46 : 26;
          const width = long ? 6 : 3;
          const x2 = Math.cos(a) * len;
          const y2 = Math.sin(a) * len;
          const px = Math.cos(a + Math.PI / 2) * width;
          const py = Math.sin(a + Math.PI / 2) * width;
          return (
            <polygon
              key={i}
              points={`0,0 ${px},${py} ${x2},${y2} ${-px},${-py}`}
              fill="url(#goldStroke)"
              opacity="0.9"
            />
          );
        })}
        <circle r="6" fill="#ffffff" />
      </g>
    </svg>
  );
}
