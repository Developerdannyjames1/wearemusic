import { Link } from 'react-router-dom';

/**
 * Original circle-segment artwork (shared 1252×1229 viewBox).
 * Clip paths match each wedge so hover/click only hit the visible piece.
 */
const SEGMENTS = [
  {
    key: 'top',
    to: '/jm-method',
    title: 'JM Method',
    src: '/circle-segments/top.svg',
    clipId: 'home-circle-clip-top',
    clipD:
      'M 0.05143 0.50454 C 0.05076 0.43194 0.06976 0.36116 0.10640 0.29972 C 0.14304 0.23828 0.19595 0.18847 0.25951 0.15559 C 0.32307 0.12271 0.39490 0.10799 0.46738 0.11300 C 0.53985 0.11800 0.61026 0.14253 0.67112 0.18400 L 0.45279 0.51395 L 0.05143 0.50454 Z',
  },
  {
    key: 'right',
    to: '/100th-monkey-studios',
    title: '100th Monkey Studios',
    src: '/circle-segments/right.svg',
    clipId: 'home-circle-clip-right',
    clipD:
      'M 0.68580 0.15329 C 0.77763 0.22079 0.84053 0.32162 0.86149 0.43499 C 0.88245 0.54835 0.85989 0.66559 0.79845 0.76249 L 0.42732 0.51831 L 0.68580 0.15329 Z',
  },
  {
    key: 'bottom',
    to: '/alms-entertainment',
    title: 'ALMS Entertainment',
    src: '/circle-segments/bottom.svg',
    clipId: 'home-circle-clip-bottom',
    clipD:
      'M 0.79777 0.75256 C 0.74884 0.82675 0.67769 0.88287 0.59493 0.91256 C 0.51217 0.94225 0.42221 0.94393 0.33843 0.91735 C 0.25466 0.89076 0.18155 0.83733 0.12998 0.76500 C 0.07841 0.69268 0.05114 0.60533 0.05223 0.51595 L 0.45961 0.52110 L 0.79777 0.75256 Z',
  },
];

/**
 * Three separated division wedges — original artwork, independent hover.
 */
export function DivisionCircle() {
  return (
    <section className="home-circle-section">
      <svg width="0" height="0" aria-hidden="true" className="home-circle-clip-defs">
        <defs>
          {SEGMENTS.map((segment) => (
            <clipPath
              key={segment.clipId}
              id={segment.clipId}
              clipPathUnits="objectBoundingBox"
            >
              <path d={segment.clipD} />
            </clipPath>
          ))}
        </defs>
      </svg>

      <div className="home-circle-holder" aria-label="We Are Music divisions">
        {SEGMENTS.map((segment) => (
          <Link
            key={segment.key}
            to={segment.to}
            className={`home-circle-segment home-circle-segment--${segment.key}`}
            aria-label={segment.title}
            style={{ clipPath: `url(#${segment.clipId})` }}
          >
            <img src={segment.src} alt="" draggable={false} />
            <span className="home-circle-segment-label">{segment.title}</span>
          </Link>
        ))}
      </div>

      <div className="home-circle-links">
        <Link to="/jm-method" className="home-circle-link">
          JM Method
        </Link>
        <Link to="/alms-entertainment" className="home-circle-link">
          ALMS Entertainment
        </Link>
        <Link to="/100th-monkey-studios" className="home-circle-link">
          100th Monkey Studios
        </Link>
      </div>
    </section>
  );
}
