import { Link } from 'react-router-dom';

const SEGMENTS = [
  {
    key: 'top',
    to: '/jm-method',
    title: 'JM Method',
    src: '/circle-segments/top.svg',
  },
  {
    key: 'right',
    to: '/100th-monkey-studios',
    title: '100th Monkey Studios',
    src: '/circle-segments/right.svg',
  },
  {
    key: 'bottom',
    to: '/alms-entertainment',
    title: 'ALMS Entertainment',
    src: '/circle-segments/bottom.svg',
  },
];

/**
 * Three separated division wedges — each scales up on hover with a cream shadow.
 */
export function DivisionCircle() {
  return (
    <section className="home-circle-section">
      <div className="home-circle-holder" aria-label="We Are Music divisions">
        {SEGMENTS.map((segment) => (
          <Link
            key={segment.key}
            to={segment.to}
            className={`home-circle-segment home-circle-segment--${segment.key}`}
            aria-label={segment.title}
          >
            <img src={segment.src} alt="" draggable={false} />
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
