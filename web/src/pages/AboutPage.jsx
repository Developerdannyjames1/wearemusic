import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer.jsx';

export function AboutPage() {
  return (
    <div className="marketing-hero min-vh-100">
      <div className="container marketing-main py-5">
        <p className="marketing-section-title">We Are Music, LLC</p>
        <h1 className="display-5 fw-bold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          The platform for artists
        </h1>
        <div className="marketing-prose">
          <p>
            We Are Music is the central hub for <strong>JM Method</strong> (1:1 training in seven disciplines),{' '}
            <strong>ALMS Entertainment</strong> (live gigs in emerging markets), and <strong>100th Monkey Studios</strong>{' '}
            (streaming and downloads from local artists). Our USPs span intensive coaching, customizable curriculum,
            storyteller setlists, healing live music, and transparent payouts.
          </p>
          <p>
            We serve artists who want to train, coach, perform, and share products — plus audiences who want live and
            recorded music. A <strong>Special &amp; Magical</strong> program supports the special needs and highly artistic
            community.
          </p>
          <p className="mb-0">
            Domain: <a href="https://WeAreMusicLLC.com">WeAreMusicLLC.com</a> ·{' '}
            <Link to="/partner-with-us">Partner with us</Link> for schools, venues, and collaborators.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
