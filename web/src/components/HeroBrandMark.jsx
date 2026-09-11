/**
 * Crisp vector hero mark — replaces grainy scaled PNG.
 * Lightened treble clef; sunrise/sunset interior (gold, orange, sky blue, indigo).
 */
export function HeroBrandMark({ className = '' }) {
  return (
    <svg
      className={`hero-brand-mark ${className}`.trim()}
      viewBox="0 0 400 360"
      role="img"
      aria-label="We Are Music"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hero-sky" x1="50%" y1="0%" x2="50%" y2="70%">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="35%" stopColor="#4c6ef5" />
          <stop offset="62%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="hero-dunes" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="55%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="hero-border" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="40%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <radialGradient id="hero-burst" cx="50%" cy="42%" r="38%">
          <stop offset="0%" stopColor="rgba(255, 237, 213, 0.95)" />
          <stop offset="45%" stopColor="rgba(251, 146, 60, 0.55)" />
          <stop offset="100%" stopColor="rgba(79, 70, 229, 0)" />
        </radialGradient>
        <filter id="hero-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#f59e0b" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Outer triangle */}
      <polygon
        points="200,18 382,340 18,340"
        fill="url(#hero-sky)"
        stroke="url(#hero-border)"
        strokeWidth="14"
        strokeLinejoin="round"
        filter="url(#hero-soft)"
      />

      <circle cx="200" cy="150" r="110" fill="url(#hero-burst)" />

      {/* Dunes */}
      <path
        d="M48 300 C90 250 130 268 170 278 C210 288 240 250 280 262 C320 274 350 290 360 300 L360 340 L48 340 Z"
        fill="url(#hero-dunes)"
        opacity="0.95"
      />
      <path
        d="M40 318 C95 290 140 300 190 308 C240 316 290 292 360 310 L360 340 L40 340 Z"
        fill="#fcd34d"
        opacity="0.55"
      />

      {/* Lightened treble clef (pale gold / cream — not heavy orange) */}
      <g transform="translate(200, 148)" aria-hidden="true">
        <text
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="128"
          fill="#fff8e7"
          opacity="0.92"
          style={{ filter: 'drop-shadow(0 2px 8px rgba(255,255,255,0.35))' }}
        >
          𝄞
        </text>
      </g>
    </svg>
  );
}
