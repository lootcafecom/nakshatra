"use client";

import { useMemo } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  delay: number;
  duration: number;
}

function makeStars(count: number, seed: number): Star[] {
  const stars: Star[] = [];
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = 0; i < count; i++) {
    stars.push({
      x: rand() * 100,
      y: rand() * 100,
      r: rand() * 1.3 + 0.4,
      delay: rand() * 5,
      duration: rand() * 3 + 3,
    });
  }
  return stars;
}

export default function StarField() {
  const stars = useMemo(() => makeStars(70, 42), []);

  return (
    <svg
      className="fixed inset-0 -z-10 h-full w-full"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {stars.map((star, i) => (
        <circle
          key={i}
          cx={`${star.x}%`}
          cy={`${star.y}%`}
          r={star.r}
          fill="#ffffff"
          className="ch-star"
          style={{
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </svg>
  );
}
