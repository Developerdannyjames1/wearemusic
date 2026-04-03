import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer.jsx';
import { api } from '../api/client.js';

export function MonkeyStudiosPage() {
  const [media, setMedia] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const json = await api('/media');
        const raw = json.media || [];
        const monkey = raw.filter((m) => m.division === 'MONKEY_STUDIOS');
        if (!cancelled) setMedia(monkey.length ? monkey : raw);
      } catch (e) {
        if (!cancelled) setErr(e.message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="marketing-hero marketing-hero--monkey min-vh-100">
      <div className="container marketing-main py-5">
        <p className="marketing-section-title">100th Monkey Studios</p>
        <h1 className="display-5 fw-bold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          A New Age music studio
        </h1>
        <p className="marketing-prose mb-4">
          Stream and download songs, albums, masterclasses, and modules from emerging local artists. Premium tracks and
          curriculum can be gated by purchase or subscription — access is tied to your account.
        </p>
        <div className="d-flex flex-wrap gap-2 mb-5">
          <Link to="/login" className="btn btn-light rounded-pill px-4">
            Sign in to listen
          </Link>
          <Link to="/login" className="btn btn-outline-light rounded-pill px-4">
            Library &amp; purchases
          </Link>
        </div>

        <h2 className="h4 text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          Catalog preview
        </h2>
        {err && <p className="text-danger small">{err}</p>}
        <div className="row g-3">
          {media.slice(0, 9).map((m) => (
            <div key={m.id} className="col-md-6 col-lg-4">
              <div className="wam-panel p-3 h-100 wam-panel-interactive">
                <h3 className="h6 text-white mb-1">{m.title}</h3>
                <p className="small text-secondary mb-1">{m.mediaType}</p>
                {m.isPremium && (
                  <span className="badge text-bg-warning text-dark">Premium</span>
                )}
              </div>
            </div>
          ))}
        </div>
        {media.length === 0 && !err && (
          <p className="text-secondary small">Media will list here as artists and admins publish to this division.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
