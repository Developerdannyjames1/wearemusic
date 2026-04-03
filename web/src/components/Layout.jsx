import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { dashboardPathForRole } from '../lib/dashboardPath.js';
import { SiteNav, isPortalRoute } from './SiteNav.jsx';

export function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const pathname = location.pathname;
  const isHome = pathname === '/';
  const portal = isPortalRoute(pathname);
  const mainPaddingTop = portal ? '4.5rem' : isHome ? 0 : '4.75rem';

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <>
      <SiteNav />
      {portal ? (
        <header
          className="position-fixed top-0 start-0 w-100 d-flex align-items-center justify-content-between px-3 px-md-5 py-3 layout-header"
          style={{ zIndex: 1000 }}
        >
          <Link to="/" className="text-white d-flex align-items-center gap-2">
            <span style={{ fontFamily: 'var(--font-accent)', fontSize: '1.25rem' }}>We Are Music</span>
          </Link>
          <div className="d-flex align-items-center gap-2">
            {user ? (
              <>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-light rounded-pill px-3 d-none d-sm-inline"
                  onClick={() => navigate(dashboardPathForRole(user.role))}
                >
                  Dashboard
                </button>
                <span className="small text-secondary d-none d-lg-inline text-truncate" style={{ maxWidth: 140 }}>
                  {user.name || user.email}
                </span>
                <button type="button" className="btn btn-sm btn-light rounded-pill px-3" onClick={handleLogout}>
                  Sign out
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-sm btn-outline-light rounded-pill px-3">
                Sign in
              </Link>
            )}
          </div>
        </header>
      ) : null}
      <main style={{ paddingTop: mainPaddingTop }}>{children}</main>
    </>
  );
}
