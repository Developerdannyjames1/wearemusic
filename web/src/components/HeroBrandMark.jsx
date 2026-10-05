import { useNavigate } from 'react-router-dom';

/**
 * Crisp vector hero mark — sunrise/sunset triangle.
 * Division icons sit inside it and link the same way as the coverflow:
 * headphones → 100th Monkey, mic → ALMS, piano → JM Method.
 */
const TRI_POINTS = '200,18 382,340 18,340';

const DIVISION_ICONS = [
  {
    to: '/100th-monkey-studios',
    title: '100th Monkey Studios',
    href: '/triangles/icons/headphones.png',
    x: 176,
    y: 72,
    width: 48,
    height: 50,
  },
  {
    to: '/alms-entertainment',
    title: 'ALMS Entertainment',
    href: '/triangles/icons/mic.png',
    x: 70,
    y: 262,
    width: 34,
    height: 56,
  },
  {
    to: '/jm-method',
    title: 'JM Method',
    href: '/triangles/icons/piano.png',
    x: 282,
    y: 274,
    width: 50,
    height: 40,
  },
];

function DivisionIcon({ to, title, href, x, y, width, height }) {
  const navigate = useNavigate();

  function open() {
    navigate(to);
  }

  return (
    <g
      className="hero-brand-icon"
      role="link"
      tabIndex={0}
      aria-label={title}
      onClick={open}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open();
        }
      }}
    >
      <rect x={x} y={y} width={width} height={height} fill="rgba(0,0,0,0)" />
      <image
        href={href}
        x={x}
        y={y}
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
        filter="url(#hero-icon-look)"
        clipPath="url(#hero-icon-clip)"
      />
    </g>
  );
}

export function HeroBrandMark({ className = '' }) {
  return (
    <svg
      className={`hero-brand-mark ${className}`.trim()}
      viewBox="0 0 400 360"
      role="group"
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
        <filter id="hero-soft" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#f59e0b" floodOpacity="0.4" />
        </filter>
        {/* Black outline highlight for contrast on the sunrise fill */}
        <filter id="hero-icon-look" x="-55%" y="-55%" width="210%" height="210%" colorInterpolationFilters="sRGB">
          <feMorphology in="SourceGraphic" operator="dilate" radius="1.5" result="halo" />
          <feColorMatrix
            in="halo"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0.9 0"
            result="blackRim"
          />
          <feGaussianBlur in="blackRim" stdDeviation="0.9" result="softBlack" />
          <feDropShadow
            in="SourceGraphic"
            dx="0"
            dy="1.5"
            stdDeviation="1.4"
            floodColor="#000000"
            floodOpacity="0.65"
            result="depth"
          />
          <feMerge>
            <feMergeNode in="softBlack" />
            <feMergeNode in="depth" />
          </feMerge>
        </filter>
        <clipPath id="hero-fill-clip">
          <polygon points={TRI_POINTS} />
        </clipPath>
        {/* Keep icons inside the border stroke */}
        <clipPath id="hero-icon-clip">
          <polygon points="200,36 362,328 38,328" />
        </clipPath>
      </defs>

      {/* Ambient glow — soft amber haze behind the mark */}
      <polygon
        points={TRI_POINTS}
        fill="none"
        stroke="#f59e0b"
        strokeWidth="22"
        strokeLinejoin="round"
        opacity="0.22"
        filter="url(#hero-soft)"
      />

      {/* Fill + dunes clipped exactly to the triangle; border paints above */}
      <g clipPath="url(#hero-fill-clip)">
        <polygon points={TRI_POINTS} fill="url(#hero-sky)" />
        <circle cx="200" cy="150" r="110" fill="url(#hero-burst)" />
        <path
          d="M20 300 C90 250 130 268 170 278 C210 288 240 250 280 262 C320 274 350 290 390 305 L390 360 L10 360 Z"
          fill="url(#hero-dunes)"
          opacity="0.95"
        />
        <path
          d="M10 318 C95 290 140 300 190 308 C240 316 290 292 390 315 L390 360 L10 360 Z"
          fill="#fcd34d"
          opacity="0.55"
        />
      </g>

      {/* Thick border last — seals any dune edges */}
      <polygon
        points={TRI_POINTS}
        fill="none"
        stroke="url(#hero-border)"
        strokeWidth="16"
        strokeLinejoin="round"
        paintOrder="stroke"
      />

      {DIVISION_ICONS.map((icon) => (
        <DivisionIcon key={icon.to} {...icon} />
      ))}
    </svg>
  );
}
