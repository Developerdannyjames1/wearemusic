import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SLIDES = [
  {
    key: 'jm',
    title: 'JM Method',
    line: 'Music lessons for the New Age — 1:1 coaching in seven disciplines, Virtuoso to Studio Pro.',
    to: '/jm-method',
    cta: 'Explore lessons',
  },
  {
    key: 'alms',
    title: 'ALMS Entertainment',
    line: 'Music gigs for the New Age — solo, duo, or trio sets, storyteller setlists, venues & parties.',
    to: '/alms-entertainment',
    cta: 'See gigs & packages',
  },
  {
    key: 'monkey',
    title: '100th Monkey Studios',
    line: 'A New Age music studio — stream songs, albums, masterclasses, and downloadable curriculum.',
    to: '/100th-monkey-studios',
    cta: 'Browse the library',
  },
];

export function BannerCarousel({ intervalMs = 6500 }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => {
      setI((n) => (n + 1) % SLIDES.length);
    }, intervalMs);
    return () => window.clearInterval(t);
  }, [intervalMs]);

  const slide = SLIDES[i];

  return (
    <div className="wam-banner-carousel">
      <div className="wam-banner-slide" role="region" aria-roledescription="carousel" aria-label="We Are Music divisions">
        <p className="marketing-section-title mb-2">Choose your path</p>
        <h2>{slide.title}</h2>
        <p className="mt-2 mb-3">{slide.line}</p>
        <Link to={slide.to} className="btn btn-outline-light rounded-pill px-4">
          {slide.cta}
        </Link>
      </div>
      <div className="wam-banner-dots" role="tablist" aria-label="Slide indicators">
        {SLIDES.map((s, idx) => (
          <button
            key={s.key}
            type="button"
            aria-label={`Show ${s.title}`}
            aria-current={idx === i}
            onClick={() => setI(idx)}
          />
        ))}
      </div>
    </div>
  );
}
