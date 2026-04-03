import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-100 pt-5 pb-4" style={{ backgroundColor: '#000', color: '#fff' }}>
      <div className="container">
        <div className="row align-items-center mb-5 text-center text-md-start">
          <div className="col-md-8 mb-3 mb-md-0">
            <p className="mb-1 small text-uppercase" style={{ letterSpacing: '0.18em' }}>
              Have a project to create?
            </p>
            <h2 className="mb-0 fw-bold" style={{ fontSize: '2.4rem' }}>
              Let’s make music together.
            </h2>
          </div>
          <div className="col-md-4 d-flex justify-content-center justify-content-md-end">
            <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-semibold">
              LET’S CONNECT
            </button>
          </div>
        </div>

        <div className="row gy-4">
          <div className="col-md-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-circle small fw-bold"
                style={{ width: 44, height: 44, border: '2px solid #DE2574' }}
              >
                WM
              </span>
              <span className="fw-semibold">We Are Music</span>
            </div>
            <p className="small text-secondary mb-2">
              A creative space for artists, coaches, and studios to collaborate, learn, and release powerful music.
            </p>
            <p className="small text-secondary mb-0">
              From first lesson to final master, we support every step of your journey.
            </p>
          </div>
          <div className="col-md-2">
            <h6 className="text-uppercase small mb-3">Quick Links</h6>
            <ul className="list-unstyled small footer-links">
              <li>
                <Link to="/about" className="text-secondary text-decoration-none">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/jm-method" className="text-secondary text-decoration-none">
                  JM Method
                </Link>
              </li>
              <li>
                <Link to="/100th-monkey-studios" className="text-secondary text-decoration-none">
                  100th Monkey Studios
                </Link>
              </li>
              <li>
                <Link to="/alms-entertainment" className="text-secondary text-decoration-none">
                  ALMS Entertainment
                </Link>
              </li>
              <li>
                <Link to="/partner-with-us" className="text-secondary text-decoration-none">
                  Partner With Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h6 className="text-uppercase small mb-3">Our Services</h6>
            <ul className="list-unstyled small footer-links">
              <li>1:1 Music Coaching</li>
              <li>Songwriting &amp; Production</li>
              <li>Recording &amp; Mixing</li>
              <li>Live Performance Prep</li>
              <li>Release Strategy</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h6 className="text-uppercase small mb-3">Stay In Tune</h6>
            <p className="small text-secondary">
              Drop your email and we’ll share upcoming sessions, showcases, and studio news.
            </p>
            <form className="d-flex flex-column gap-2">
              <input
                type="email"
                className="form-control form-control-sm bg-transparent text-white border-secondary"
                placeholder="Email address"
              />
              <button type="button" className="btn btn-light btn-sm rounded-pill fw-semibold">
                GET UPDATES
              </button>
            </form>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-secondary">
          <span>© We Are Music {new Date().getFullYear()}. All rights reserved.</span>
          <div className="d-flex gap-3">
            <span>Privacy Policy</span>
            <span>Terms</span>
            <span>Contact</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
