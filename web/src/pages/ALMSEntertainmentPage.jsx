import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer.jsx';

const PACKAGES = [
  { name: 'One 45-minute set', detail: 'Storyteller setlist, solo / duo / trio' },
  { name: 'Two 45-minute sets', detail: 'Extended evening, healing live music' },
  { name: 'Custom events', detail: 'Venues, parties, senior centers, cafes & hospitals' },
];

export function ALMSEntertainmentPage() {
  return (
    <div className="marketing-hero marketing-hero--alms min-vh-100">
      <div className="container marketing-main py-5">
        <p className="marketing-section-title">ALMS Entertainment</p>
        <h1 className="display-5 fw-bold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          Music gigs for the New Age
        </h1>
        <p className="marketing-prose mb-4">
          Solo, duo, and trio performances with songs & set lists, parties & venues, and automated end-to-end invoicing
          &amp; payout. Virtuosos, rising stars, and studio pros in your community — book shorter paid gigs with clear
          packages.
        </p>
        <Link to="/alms/book" className="btn btn-light rounded-pill px-4 mb-5">
          Request a booking
        </Link>

        <h2 className="h4 text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          Gig packages
        </h2>
        <div className="row g-3 mb-5">
          {PACKAGES.map((p) => (
            <div key={p.name} className="col-md-4">
              <div className="wam-panel p-4 h-100 wam-panel-interactive">
                <h3 className="h6 text-white">{p.name}</h3>
                <p className="small text-secondary mb-0">{p.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="h4 text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          Artist showcases
        </h2>
        <p className="marketing-prose">
          Artists maintain gig profiles with audio and video demos. Venues submit requests; admins assign availability.
          Sign in as an artist to manage your pipeline, or use the booking form to start a conversation.
        </p>
      </div>
      <Footer />
    </div>
  );
}
