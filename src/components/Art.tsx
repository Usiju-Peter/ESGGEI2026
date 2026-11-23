/** Line art used instead of photographs: furrow contour lines and the sprout. Deterministic, so prerendered HTML matches hydration. */

export function Furrow({
  lines = 22,
  lit = 7,
  light = false,
  className = "",
}: {
  lines?: number;
  lit?: number;
  light?: boolean;
  className?: string;
}) {
  const W = 1000;
  const H = 1000;
  const paths: string[] = [];
  for (let i = 0; i < lines; i++) {
    const y = (H / (lines - 1)) * i;
    const a = 34 + 22 * Math.sin(i * 0.55);
    const s = 0.9 + 0.25 * Math.cos(i * 0.4);
    let d = `M -50 ${y.toFixed(1)}`;
    for (let x = -50; x <= W + 50; x += 25) {
      d += ` L ${x} ${(y + a * Math.sin((x / W) * Math.PI * 2 * s + i * 0.32)).toFixed(1)}`;
    }
    paths.push(d);
  }
  return (
    <svg
      className={`furrow${light ? " on-light" : ""} ${className}`}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} className={i === lit ? "lit" : undefined} />
      ))}
    </svg>
  );
}

export function SproutHero() {
  return (
    <svg className="sprout" viewBox="0 0 460 520" aria-hidden="true" focusable="false">
      <circle className="glow" cx="230" cy="250" r="190" />
      <circle className="ring" cx="230" cy="250" r="225" />
      <circle className="ring" cx="230" cy="250" r="150" />
      <path className="root" d="M230 430 C 222 455, 200 470, 176 482" />
      <path className="root" d="M230 430 C 238 458, 262 472, 290 480" />
      <path className="root" d="M230 430 C 230 455, 232 475, 230 500" />
      <path className="ln" d="M230 430 C 226 360, 240 300, 230 230 C 222 175, 232 130, 236 96" />
      <path className="leaf" d="M232 300 C 180 300, 130 270, 112 214 C 168 206, 216 236, 232 300 Z" />
      <path className="vein" d="M228 296 C 190 280, 150 252, 120 220" />
      <path className="leaf" d="M230 236 C 286 238, 336 206, 352 150 C 296 144, 250 176, 230 236 Z" />
      <path className="vein" d="M234 232 C 272 218, 312 188, 344 156" />
      <path className="leaf" d="M236 98 C 214 70, 214 40, 236 14 C 258 40, 258 70, 236 98 Z" />
      <circle className="dot" cx="231" cy="300" r="6" />
      <circle className="dot" cx="230" cy="236" r="6" />
      <circle className="dot o" cx="230" cy="430" r="7" />
      <circle className="dot" cx="112" cy="214" r="4" />
      <circle className="dot" cx="352" cy="150" r="4" />
      <path className="spark" d="M396 66 l4 12 12 4 -12 4 -4 12 -4 -12 -12 -4 12 -4 Z" />
      <path className="spark" d="M70 360 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 Z" />
    </svg>
  );
}

export function SproutSmall() {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <path d="M100 170 C 98 140, 104 116, 100 88" fill="none" stroke="#103f35" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M100 128 C 76 128, 56 114, 50 90 C 74 88, 94 102, 100 128 Z" fill="rgba(16,63,53,.08)" stroke="#245a49" strokeWidth="2.2" />
      <path d="M100 100 C 124 100, 146 86, 152 62 C 128 60, 106 74, 100 100 Z" fill="rgba(201,243,106,.4)" stroke="#245a49" strokeWidth="2.2" />
      <path d="M100 88 C 90 74, 90 58, 100 44 C 110 58, 110 74, 100 88 Z" fill="rgba(244,162,97,.25)" stroke="#245a49" strokeWidth="2.2" />
      <circle cx="100" cy="170" r="4" fill="#f4a261" />
      <circle cx="100" cy="128" r="3.5" fill="#103f35" />
      <circle cx="100" cy="100" r="3.5" fill="#103f35" />
    </svg>
  );
}
