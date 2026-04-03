import { Link } from 'react-router-dom';

const DBAS = [
  {
    to: '/jm-method',
    title: 'JM Method',
    image: '/triangles/triangle-headphone.png',
  },
  {
    to: '/alms-entertainment',
    title: 'ALMS Entertainment',
    image: '/triangles/triangle-piano.png',
  },
  {
    to: '/100th-monkey-studios',
    title: '100th Monkey Studios',
    image: '/triangles/triangle-mic.png',
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
