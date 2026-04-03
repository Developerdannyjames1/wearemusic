import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { api } from '../../api/client.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { PortalTopbarLogo } from '../../components/PortalTopbarLogo.jsx';
import { initials } from './adminUtils.js';
import '../artist-portal.css';

const NAV = {
  platform: [
    { to: '/admin', end: true, label: 'Dashboard', icon: 'ri-dashboard-line' },
    { to: '/admin/users', end: false, label: 'Users', icon: 'ri-team-line' },
    { to: '/admin/courses', end: false, label: 'Courses', icon: 'ri-book-2-line' },
    { to: '/admin/lessons', end: false, label: 'Lessons', icon: 'ri-file-music-line' },
    { to: '/admin/enrollments', end: false, label: 'Enrollments', icon: 'ri-user-follow-line' },
  ],
  control: [
    { to: '/admin/pipeline', end: false, label: 'Booking pipeline', icon: 'ri-filter-3-line' },
    { to: '/admin/bookings', end: false, label: 'All bookings', icon: 'ri-calendar-check-line' },
    { to: '/admin/artists', end: false, label: 'Artists', icon: 'ri-mic-line' },
    { to: '/admin/gigs', end: false, label: 'Gigs', icon: 'ri-map-pin-line' },
    { to: '/admin/media', end: false, label: 'Media library', icon: 'ri-film-line' },
    { to: '/admin/payments', end: false, label: 'Payments & revenue', icon: 'ri-money-dollar-circle-line' },
  ],
};

export function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const d = await api('/admin/dashboard');
        if (!cancelled) setPendingCount(d?.engagement?.pendingBookings ?? 0);
      } catch {
        if (!cancelled) setPendingCount(0);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="ap-root">
      <img
        className="ap-bg-img"
        src="https://stage7.demolinkdesign.com/wp-content/uploads/2025/07/image-39.png"
        alt=""
      />

      <aside className="ap-sidebar">
        <div className="ap-brand-title">Admin Portal</div>
        <nav className="ap-nav">
          <p className="ap-nav-header">Platform</p>
          {NAV.platform.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `ap-nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="ap-nav-icon">
                <i className={item.icon} />
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}

          <p className="ap-nav-header">Control</p>
          {NAV.control.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `ap-nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="ap-nav-icon">
                <i className={item.icon} />
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}

          <div className="ap-nav-bottom">
            <button
              type="button"
              className="ap-nav-item"
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              <span className="ap-nav-icon">
                <i className="ri-logout-box-line" />
              </span>
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      <main className="ap-main">
        <header className="ap-topbar">
          <div className="ap-topbar-start">
            <div>
              <h1 className="ap-page-title">Master Admin Dashboard</h1>
              <p className="ap-page-sub">Centralized operations for all divisions.</p>
            </div>
            <PortalTopbarLogo />
          </div>
          <div className="ap-top-actions">
            <div className="ap-stat-card-sm">
              <div className="ap-stat-num">{pendingCount}</div>
              <div className="ap-stat-label">Pending</div>
            </div>
            <button type="button" className="ap-icon-btn" aria-label="Notifications">
              <i className="ri-notification-2-fill" />
              {pendingCount > 0 && (
                <span className="ap-badge">{pendingCount > 9 ? '9+' : pendingCount}</span>
              )}
            </button>
            <button type="button" className="ap-avatar-btn" aria-label="Profile">
              {initials(user)}
            </button>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
}
