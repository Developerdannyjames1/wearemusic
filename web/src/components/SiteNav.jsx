import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { dashboardPathForRole } from '../lib/dashboardPath.js';

export function isPortalRoute(pathname) {
  if (pathname.startsWith('/admin')) return true;
  if (pathname === '/coach') return true;
  if (pathname === '/artist') return true;
  if (pathname === '/student') return true;
  if (pathname === '/money') return true;
  return false;
}

export function SiteNav() {
  const location = useLocation();
  const { user } = useAuth();
  const [navOpen, setNavOpen] = useState(false);
  if (isPortalRoute(location.pathname)) return null;

  return (
    <nav className="site-nav navbar navbar-expand-lg navbar-dark fixed-top" aria-label="Primary">
      <div className="container-fluid px-3 px-lg-5">
        <Link className="navbar-brand" to="/" onClick={() => setNavOpen(false)}>
          We Are Music
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="wamSiteNav"
          aria-expanded={navOpen}
          aria-label="Toggle navigation"
          onClick={() => setNavOpen((o) => !o)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse ${navOpen ? 'show' : ''}`} id="wamSiteNav">
          <ul className="navbar-nav mx-lg-auto mb-2 mb-lg-0 gap-lg-1">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => setNavOpen(false)}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/jm-method" onClick={() => setNavOpen(false)}>
                JM Method
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/alms-entertainment" onClick={() => setNavOpen(false)}>
                ALMS Entertainment
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/100th-monkey-studios" onClick={() => setNavOpen(false)}>
                100th Monkey Studios
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={() => setNavOpen(false)}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blogs" onClick={() => setNavOpen(false)}>
                Blogs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/partner-with-us" onClick={() => setNavOpen(false)}>
                Partner With Us
              </Link>
            </li>
          </ul>
          <div className="d-flex flex-wrap gap-2 align-items-center justify-content-lg-end">
            <Link to="/alms/book" className="btn btn-sm btn-book rounded-pill px-3" onClick={() => setNavOpen(false)}>
              Book a gig
            </Link>
            {user ? (
              <Link
                to={dashboardPathForRole(user.role)}
                className="btn btn-sm btn-light rounded-pill px-3 btn-signin"
                onClick={() => setNavOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="btn btn-sm btn-outline-light rounded-pill px-3 btn-signin"
                onClick={() => setNavOpen(false)}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
