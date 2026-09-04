import { Link } from 'react-router-dom';

const DBAS = [
  {
    to: '/jm-method',
    title: 'JM Method',
    // Keyboard / piano motif for lessons (was headphones)
    image: '/triangles/triangle-piano.png',
  },
  {
    to: '/alms-entertainment',
    title: 'ALMS Entertainment',
    // Mic for live performance (flipped off Monkey)
    image: '/triangles/triangle-mic.png',
  },
  {
    to: '/100th-monkey-studios',
    title: '100th Monkey Studios',
    // Headphones for studio listening (flipped onto Monkey)
    image: '/triangles/triangle-headphone.png',
  },
];

export function TriangleDBAPicker() {
  return (
    <div className="wam-triangle-row wam-triangle-image-row">
      {DBAS.map((d) => (
        <Link
          key={d.to}
          to={d.to}
          className="wam-triangle-image-link text-decoration-none"
          aria-label={d.title}
        >
          <img src={d.image} alt={d.title} className="wam-triangle-image" />
          <span className="wam-triangle-image-title">{d.title}</span>
        </Link>
      ))}
    </div>
  );
}
