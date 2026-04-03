import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';
import { PortalTopbarLogo } from '../components/PortalTopbarLogo.jsx';
import './artist-portal.css';

function initials(user) {
  if (!user?.name && !user?.email) return '?';
  const s = user.name || user.email;
  const parts = s.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return s.slice(0, 2).toUpperCase();
}

function formatShortDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

export function ArtistPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gigTitle, setGigTitle] = useState('');
  const [venue, setVenue] = useState('');
  const [savingGig, setSavingGig] = useState(false);
  const [demoTitle, setDemoTitle] = useState('');
  const [demoType, setDemoType] = useState('audio');
  const [demoUrl, setDemoUrl] = useState('');
  const [uploadMsg, setUploadMsg] = useState('');
  const [savingDemo, setSavingDemo] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const json = await api('/artist/dashboard');
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleCreateGig(e) {
    e.preventDefault();
    if (!gigTitle.trim()) return;
    setSavingGig(true);
    setUploadMsg('');
    try {
      await api('/gigs', { method: 'POST', body: { title: gigTitle, venue: venue || undefined } });
      setGigTitle('');
      setVenue('');
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingGig(false);
    }
  }

  async function handleUploadDemo(e) {
    e.preventDefault();
    if (!demoTitle.trim()) {
      setUploadMsg('Enter a title for your demo.');
      return;
    }
    setSavingDemo(true);
    setUploadMsg('');
    try {
      await api('/media', {
        method: 'POST',
        body: {
          title: demoTitle.trim(),
          mediaType: demoType,
          url: demoUrl.trim() || undefined,
          isPremium: false,
        },
      });
      setDemoTitle('');
      setDemoUrl('');
      setUploadMsg('Demo saved to your catalog.');
      await load();
    } catch (err) {
      setUploadMsg(err.message || 'Upload failed.');
    } finally {
      setSavingDemo(false);
    }
  }

  const stats = data?.stats;
  const profile = data?.profile;
  const userRow = data?.user;
  const displayName = profile?.stageName || userRow?.name || user?.name || 'Artist';
  const genreLine = profile?.genres ? `Genre: ${profile.genres}` : 'Genre: Add your genres in profile';
  const bioText =
    profile?.bio || userRow?.bio || 'Tell fans about your sound, experience, and what you bring to every gig.';
  const cityLine = profile?.city ? `Location: ${profile.city}` : user?.email ? `Contact: ${user.email}` : '';

  const completionDisplay =
    stats?.completionPct != null ? `${stats.completionPct}%` : '—';

  const activityItems = useMemo(() => {
    const items = [];
    const gigs = data?.gigs || [];
    const bookings = data?.bookings || [];
    gigs.slice(0, 3).forEach((g) => {
      items.push({
        key: `g-${g.id}`,
        html: (
          <>
            <strong>Gig:</strong> {g.title}
            {g.venue ? ` — ${g.venue}` : ''}
          </>
        ),
      });
    });
    bookings.slice(0, 3).forEach((b) => {
      items.push({
        key: `b-${b.id}`,
        html: (
          <>
            <strong>Booking:</strong> {b.packageName || 'Request'} ({b.status})
          </>
        ),
      });
    });
    return items.slice(0, 6);
  }, [data?.gigs, data?.bookings]);

  const pendingBookings = (data?.bookings || []).filter((b) => b.status === 'pending').length;

  if (loading && !data) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-light" role="status" />
      </div>
    );
  }

  return (
    <div className="ap-root">
      <img
        className="ap-bg-img"
        src="https://stage7.demolinkdesign.com/wp-content/uploads/2025/07/image-39.png"
        alt=""
      />

      <aside className="ap-sidebar">
        <div className="ap-brand-title">Artist Portal</div>
        <nav className="ap-nav">
          <p className="ap-nav-header">Inspire</p>
          <button
            type="button"
            className="ap-nav-item"
            onClick={() => document.getElementById('ap-bookings')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="ap-nav-icon">
              <i className="ri-git-pull-request-line" />
            </span>
            <span>Gig Requests</span>
          </button>
          <p className="ap-nav-header">Share</p>
          <button type="button" className="ap-nav-item active">
            <span className="ap-nav-icon">
              <i className="ri-home-line" />
            </span>
            <span>Dashboard</span>
          </button>
          <button
            type="button"
            className="ap-nav-item"
            onClick={() => document.getElementById('ap-gigs')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="ap-nav-icon">
              <i className="ri-task-line" />
            </span>
            <span>Assigned Gigs</span>
          </button>
          <p className="ap-nav-header">Heal</p>
          <button
            type="button"
            className="ap-nav-item"
            onClick={() => document.getElementById('ap-gigs')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="ap-nav-icon">
              <i className="ri-calendar-line" />
            </span>
            <span>Gig Calendar</span>
          </button>
          <div className="ap-nav-bottom">
            <Link to="/" className="ap-nav-item">
              <span className="ap-nav-icon">
                <i className="ri-home-4-line" />
              </span>
              <span>Home</span>
            </Link>
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
              <h1 className="ap-page-title">Artist Dashboard</h1>
              <p className="ap-page-sub">Manage your profile, demos and availability.</p>
            </div>
            <PortalTopbarLogo />
          </div>
          <div className="ap-top-actions">
            <div className="ap-stat-card-sm">
              <div className="ap-stat-num">{stats?.activeGigs ?? 0}</div>
              <div className="ap-stat-label">Active Gigs</div>
            </div>
            <button type="button" className="ap-icon-btn" aria-label="Notifications">
              <i className="ri-notification-2-fill" />
              {pendingBookings > 0 && <span className="ap-badge">{pendingBookings > 9 ? '9+' : pendingBookings}</span>}
            </button>
            <button type="button" className="ap-avatar-btn" aria-label="Profile">
              {initials(user)}
            </button>
          </div>
        </header>

        {error && <p className="text-danger small mb-0">{error}</p>}

        <section className="ap-container">
          <div className="ap-stats-row">
            <div className="ap-stat">
              <div className="ap-stat-inner">
                <div className="ap-stat-num">{stats?.upcomingGigs ?? 0}</div>
                <div className="ap-stat-desc">Upcoming Gigs</div>
              </div>
            </div>
            <div className="ap-stat">
              <div className="ap-stat-inner">
                <div className="ap-stat-num">{completionDisplay}</div>
                <div className="ap-stat-desc">Avg Completion</div>
              </div>
            </div>
            <div className="ap-stat">
              <div className="ap-stat-inner">
                <div className="ap-stat-num">{stats?.demoCount ?? 0}</div>
                <div className="ap-stat-desc">Demo Items</div>
              </div>
            </div>
          </div>

          <div className="ap-grid">
            <div className="ap-card">
              <h2 className="ap-card-title">Profile Management</h2>
              <div className="ap-profile-grid">
                <div className="ap-profile-card">
                  <div className="ap-avatar-large">{initials(user)}</div>
                  <div className="ap-profile-info">
                    <h3 className="ap-name">{displayName}</h3>
                    <div className="ap-meta">{genreLine}</div>
                    <p className="ap-bio">{bioText}</p>
                    {cityLine && <div className="ap-meta ap-small">{cityLine}</div>}
                    <div className="mt-2 ap-demo-meta ap-small" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                      {profile?.websiteUrl && (
                        <a href={profile.websiteUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--ap-text)' }}>
                          <i className="ri-link-m" /> Website
                        </a>
                      )}
                      {profile?.spotifyUrl && (
                        <a href={profile.spotifyUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--ap-text)' }}>
                          <i className="ri-sound-module-line" /> Spotify
                        </a>
                      )}
                      {profile?.instagramUrl && (
                        <a href={profile.instagramUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--ap-text)' }}>
                          <i className="ri-instagram-line" /> Instagram
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="ap-name mb-1">Upload Demo</h3>
                  <p className="ap-muted ap-small mb-2">Add a title and optional public link (mp3, SoundCloud, YouTube, etc.).</p>
                  <form onSubmit={handleUploadDemo}>
                    <label className="ap-file-input">
                      <input type="file" accept="audio/*,video/*" disabled />
                      <span className="ap-small ap-muted">File upload — use URL field for now</span>
                    </label>
                    <div className="ap-form-row">
                      <input
                        type="text"
                        placeholder="Title (e.g. Acoustic Demo)"
                        value={demoTitle}
                        onChange={(e) => setDemoTitle(e.target.value)}
                      />
                      <select value={demoType} onChange={(e) => setDemoType(e.target.value)}>
                        <option value="audio">Audio</option>
                        <option value="video">Video</option>
                      </select>
                    </div>
                    <div className="ap-form-row">
                      <input
                        type="url"
                        placeholder="https://… (optional link)"
                        value={demoUrl}
                        onChange={(e) => setDemoUrl(e.target.value)}
                      />
                    </div>
                    <div className="ap-form-row">
                      <button type="submit" className="ap-btn ap-btn-primary" disabled={savingDemo}>
                        {savingDemo ? 'Saving…' : 'Save demo'}
                      </button>
                      <button
                        type="button"
                        className="ap-btn ap-btn-ghost"
                        onClick={() => {
                          setDemoTitle('');
                          setDemoUrl('');
                          setUploadMsg('');
                        }}
                      >
                        Clear
                      </button>
                    </div>
                    {uploadMsg && (
                      <p className={`ap-small mt-2 mb-0 ${uploadMsg.includes('failed') ? 'text-warning' : 'text-success'}`}>
                        {uploadMsg}
                      </p>
                    )}
                  </form>
                </div>
              </div>

              <hr className="ap-hr" />

              <h3 className="ap-card-sub" id="ap-gigs">
                Your gigs &amp; pipeline
              </h3>
              <form onSubmit={handleCreateGig} className="ap-form-row ap-gig-form">
                <input
                  type="text"
                  placeholder="New gig title"
                  value={gigTitle}
                  onChange={(e) => setGigTitle(e.target.value)}
                />
                <input type="text" placeholder="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} />
                <button type="submit" className="ap-btn ap-btn-primary" disabled={savingGig}>
                  {savingGig ? '…' : 'Add gig'}
                </button>
              </form>
              <ul className="list-unstyled ap-demo-list mb-0">
                {(data?.gigs || []).map((g) => (
                  <li key={g.id} className="ap-demo-item">
                    <div className="ap-demo-left">
                      <i className="ri-mic-line ap-demo-icon" />
                      <div>
                        <div className="ap-demo-title">{g.title}</div>
                        <div className="ap-demo-meta">
                          {g.venue || 'Venue TBA'} · {g.status}
                          {g.eventStart ? ` · ${formatShortDate(g.eventStart)}` : ''}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
                {(!data?.gigs || data.gigs.length === 0) && <li className="ap-empty py-3">No gigs yet — add one above.</li>}
              </ul>

              <hr className="ap-hr" />

              <h3 className="ap-card-sub">Your uploaded demos</h3>
              <div className="ap-demo-list">
                {(data?.demos || []).map((d) => (
                  <div key={d.id} className="ap-demo-item">
                    <div className="ap-demo-left">
                      <i
                        className={`ap-demo-icon ri-${d.mediaType === 'video' ? 'video' : 'music-2'}-line`}
                      />
                      <div className="min-w-0">
                        <div className="ap-demo-title">{d.title}</div>
                        <div className="ap-demo-meta">
                          {d.mediaType} · {formatShortDate(d.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {(!data?.demos || data.demos.length === 0) && (
                  <div className="ap-empty">No demos yet — save one in the form above.</div>
                )}
              </div>

              <hr className="ap-hr" />

              <h3 className="ap-card-sub" id="ap-bookings">
                Client requests
              </h3>
              <ul className="list-unstyled ap-demo-list mb-0">
                {(data?.bookings || []).map((b) => (
                  <li key={b.id} className="ap-demo-item">
                    <div className="ap-demo-left">
                      <i className="ri-user-voice-line ap-demo-icon" />
                      <div>
                        <div className="ap-demo-title">{b.packageName || 'Booking'}</div>
                        <div className="ap-demo-meta">
                          {b.client?.name || b.client?.email || 'Client'} · {b.status}
                        </div>
                        {b.notes && <div className="ap-demo-meta">{b.notes}</div>}
                      </div>
                    </div>
                    <span className="badge bg-secondary text-nowrap">{b.status}</span>
                  </li>
                ))}
                {(!data?.bookings || data.bookings.length === 0) && (
                  <li className="ap-empty py-3">No booking requests yet.</li>
                )}
              </ul>
            </div>

            <aside className="ap-card">
              <h2 className="ap-card-title">Quick Actions</h2>
              <div className="ap-quick-actions">
                <button
                  type="button"
                  className="ap-btn"
                  onClick={() => document.querySelector('.ap-profile-info')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Edit Bio
                </button>
                <button
                  type="button"
                  className="ap-btn"
                  onClick={() => document.getElementById('ap-gigs')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Set Availability
                </button>
                <button
                  type="button"
                  className="ap-btn"
                  onClick={() => document.getElementById('ap-bookings')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Requests
                </button>
              </div>
              <hr className="ap-hr" />
              <h3 className="ap-card-sub">Recent activity</h3>
              {activityItems.length > 0 ? (
                <ul className="ap-activity-list">
                  {activityItems.map((a) => (
                    <li key={a.key}>{a.html}</li>
                  ))}
                </ul>
              ) : (
                <p className="ap-empty ap-small mb-0">Activity will appear as you add gigs and bookings.</p>
              )}
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
