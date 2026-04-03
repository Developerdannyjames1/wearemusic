import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer.jsx';
import { DisciplineWheel } from '../components/DisciplineWheel.jsx';
import { api } from '../api/client.js';

export function JMMethodPage() {
  const [courses, setCourses] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const json = await api('/courses?division=JM_METHOD');
        if (!cancelled) setCourses(json.courses || []);
      } catch (e) {
        if (!cancelled) setErr(e.message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="marketing-hero marketing-hero--jm min-vh-100">
      <div className="container marketing-main py-5">
        <p className="marketing-section-title">JM Method</p>
        <h1 className="display-5 fw-bold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          Music lessons for the New Age
        </h1>
        <p className="marketing-prose mb-4">
          Intensive skill training across seven disciplines, customizable curriculum, and &ldquo;learn any song fast&rdquo;
          harmony work — online, in-home, or in-studio. Programs: <strong>Virtuoso</strong> (one discipline),{' '}
          <strong>Rising Star</strong> (multiple disciplines), and <strong>Studio Pro</strong> (multi-discipline plus
          studio production).
        </p>
        <div className="d-flex flex-wrap gap-2 mb-5">
          <Link to="/login" className="btn btn-light rounded-pill px-4">
            Find a coach
          </Link>
          <Link to="/login" className="btn btn-outline-light rounded-pill px-4">
            Client portal
          </Link>
        </div>

        <h2 className="h4 text-white mb-0" style={{ fontFamily: 'var(--font-display)' }}>
          Seven disciplines
        </h2>
        <p className="small text-secondary mb-0">Rotate the wheel — piano, voice, guitar, bass, ukulele, percussion, studio.</p>
        <DisciplineWheel />

        <h2 className="h4 text-white mt-4 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          Featured courses
        </h2>
        {err && <p className="text-danger small">{err}</p>}
        <div className="row g-3">
          {(courses || []).slice(0, 6).map((c) => (
            <div key={c.id} className="col-md-6 col-lg-4">
              <div className="wam-panel p-3 h-100 wam-panel-interactive">
                <h3 className="h6 text-white mb-1">{c.title}</h3>
                <p className="small text-secondary mb-0">{c.description || 'Open enrollment.'}</p>
                <p className="small text-muted mt-2 mb-0">
                  {c._count?.lessons ?? 0} lessons · {c.currency} {c.price}
                </p>
              </div>
            </div>
          ))}
          {courses.length === 0 && !err && (
            <p className="text-secondary small">Course catalog will appear here as coaches publish curriculum.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
