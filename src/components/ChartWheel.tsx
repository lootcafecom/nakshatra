export interface PlanetPlacement {
  /** Sanskrit/short symbol, e.g. "Su", "Mo", "Ma" */
  symbol: string;
  /** house number 1-12 */
  house: number;
}

interface ChartWheelProps {
  /** zodiac sign abbreviations for houses 1-12, in order */
  signs?: string[];
  planets?: PlanetPlacement[];
  size?: number;
}

const DEFAULT_SIGNS = [
  "Ar", "Ta", "Ge", "Cn", "Le", "Vi", "Li", "Sc", "Sg", "Cp", "Aq", "Pi",
];

/**
 * North Indian style Vedic chart wheel (diamond houses), rendered as a
 * real SVG rather than a decorative image. House positions are fixed by
 * convention; sign/planet content is data-driven.
 */
export default function ChartWheel({
  signs = DEFAULT_SIGNS,
  planets = [],
  size = 220,
}: ChartWheelProps) {
  // House label anchor points (north-indian diamond layout), in a 200x200 box
  const houseAnchors: { x: number; y: number; house: number }[] = [
    { x: 100, y: 34, house: 1 },
    { x: 50, y: 22, house: 2 },
    { x: 22, y: 50, house: 3 },
    { x: 34, y: 100, house: 4 },
    { x: 22, y: 150, house: 5 },
    { x: 50, y: 178, house: 6 },
    { x: 100, y: 166, house: 7 },
    { x: 150, y: 178, house: 8 },
    { x: 178, y: 150, house: 9 },
    { x: 166, y: 100, house: 10 },
    { x: 178, y: 50, house: 11 },
    { x: 150, y: 22, house: 12 },
  ];

  const planetsByHouse: Record<number, string[]> = {};
  for (const pl of planets) {
    if (!planetsByHouse[pl.house]) planetsByHouse[pl.house] = [];
    planetsByHouse[pl.house].push(pl.symbol);
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-label="Vedic birth chart wheel showing the twelve houses"
    >
      <title>Birth chart wheel</title>
      <desc>
        A North Indian style Vedic astrology chart divided into twelve
        diamond houses, each showing its zodiac sign and any planets
        placed there.
      </desc>

      {/* outer square */}
      <rect
        x="4"
        y="4"
        width="192"
        height="192"
        fill="none"
        stroke="#e0bd6a"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* diagonals forming the diamond houses */}
      <g stroke="#7a6fc4" strokeWidth="0.6" opacity="0.55" fill="none">
        <line x1="4" y1="4" x2="196" y2="196" />
        <line x1="196" y1="4" x2="4" y2="196" />
        <line x1="100" y1="4" x2="4" y2="100" />
        <line x1="4" y1="100" x2="100" y2="196" />
        <line x1="100" y1="196" x2="196" y2="100" />
        <line x1="196" y1="100" x2="100" y2="4" />
      </g>

      {/* center accent point */}
      <circle cx="100" cy="100" r="2" fill="#f0d99a" />

      {/* sign labels */}
      {houseAnchors.map((anchor) => (
        <text
          key={`sign-${anchor.house}`}
          x={anchor.x}
          y={anchor.y - 7}
          textAnchor="middle"
          fontSize="8.5"
          fill="#c9bfe8"
        >
          {signs[anchor.house - 1]}
        </text>
      ))}

      {/* planet glyphs per house */}
      {houseAnchors.map((anchor) => {
        const occupants = planetsByHouse[anchor.house];
        if (!occupants || occupants.length === 0) return null;
        return (
          <text
            key={`planets-${anchor.house}`}
            x={anchor.x}
            y={anchor.y + 6}
            textAnchor="middle"
            fontSize="9"
            fontWeight="600"
            fill="#f0d99a"
          >
            {occupants.join(" ")}
          </text>
        );
      })}
    </svg>
  );
}
