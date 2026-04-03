import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api/client.js';
import { PortalTopbarLogo } from '../components/PortalTopbarLogo.jsx';
import './artist-portal.css';

function toInputDate(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return d.toISOString().slice(0, 10);
  } catch {
    return '';
  }
}

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

export function StudentPortalPage() {
  const { user } = useAuth();

  const [data, setData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [media, setMedia] = useState([]);
  const [artists, setArtists] = useState([]);
  const [courses, setCourses] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  // LMS enrollment
  const [courseId, setCourseId] = useState('');

  // Client booking portal
  const [selectedArtistId, setSelectedArtistId] = useState('');
  const [packages, setPackages] = useState([]);
  const [selectedGigId, setSelectedGigId] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [budget, setBudget] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [eventDate, setEventDate] = useState('');

  const selectedGig = useMemo(() => {
    if (!packages || !selectedGigId) return null;
    return packages.find((g) => g.id === selectedGigId) || null;
  }, [packages, selectedGigId]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [dash, m, cat, artistsRes, bookingRes] = await Promise.all([
        api('/student/dashboard'),
        api('/media'),
        api('/courses').catch(() => ({ courses: [] })),
        api('/artists').catch(() => ({ artists: [] })),
        user?.role === 'STUDENT' ? api('/bookings').catch(() => ({ bookings: [] })) : Promise.resolve({ bookings: [] }),
      ]);

      setData(dash);
      setMedia(m.media || []);
      setCourses(cat.courses || []);
      setArtists(artistsRes.artists || []);

      if (user?.role === 'STUDENT') setBookings(bookingRes.bookings || []);
      else setBookings([]);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [user?.role]);

  useEffect(() => {
    load();
  }, [load]);

  // Choose defaults for dropdowns
  useEffect(() => {
    if (!selectedArtistId && artists.length) setSelectedArtistId(artists[0].id);
    if (!courseId && courses.length) setCourseId(courses[0].id);
  }, [artists, courses, selectedArtistId, courseId]);

  // Load packages (gigs) for selected artist
  useEffect(() => {
    let cancelled = false;
    async function loadPackages() {
      if (!selectedArtistId) {
        setPackages([]);
        setSelectedGigId('');
        return;
      }
      try {
        const json = await api(`/gigs?artistId=${selectedArtistId}`);
        if (cancelled) return;
        const gigs = json.gigs || [];
        setPackages(gigs);
        setSelectedGigId(gigs[0]?.id || '');
      } catch {
        if (cancelled) return;
        setPackages([]);
        setSelectedGigId('');
      }
    }
    loadPackages();
    return () => {
      cancelled = true;
    };
  }, [selectedArtistId]);

  // Default event date from selected gig
  useEffect(() => {
    if (!selectedGig) return;
    if (!eventDate && selectedGig.eventStart) setEventDate(toInputDate(selectedGig.eventStart));
  }, [selectedGig, eventDate]);

  async function handleEnroll(e) {
    e.preventDefault();
    if (!courseId) return;
    setSaving(true);
    setError(null);
    try {
      await api('/student/enrollments', { method: 'POST', body: { courseId } });
      setCourseId('');
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleBooking(e) {
    e.preventDefault();
    if (!selectedGigId) return;
    setSaving(true);
    setError(null);
    try {
      await api('/bookings', {
        method: 'POST',
        body: {
          gigId: selectedGigId,
          notes: bookingNotes || undefined,
          budget: budget !== '' ? Number(budget) : undefined,
          currency: currency || undefined,
          eventDate: eventDate || undefined,
        },
      });
      setBookingNotes('');
      setBudget('');
      setEventDate('');
      setCurrency('USD');
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading && !data) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-light" role="status" />
      </div>
    );
  }

  const stats = {
    enrollments: data?.enrollments?.length ?? 0,
    transactions: data?.transactions?.length ?? 0,
    mediaCount: media.length,
  };

  return (
    <div className="ap-root">
      <img
        className="ap-bg-img"
        src="https://stage7.demolinkdesign.com/wp-content/uploads/2025/07/image-39.png"
        alt=""
      />

      <aside className="ap-sidebar">
        <div className="ap-brand-title">Client Portal</div>
        <nav className="ap-nav">
          <p className="ap-nav-header">Learn</p>
          <button
            type="button"
            className="ap-nav-item active"
            onClick={() => document.getElementById('ap-student-lms')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="ap-nav-icon">
              <i className="ri-book-2-line" />
            </span>
            <span>LMS</span>
          </button>

          <p className="ap-nav-header">Book</p>
          <button
            type="button"
            className="ap-nav-item"
            onClick={() => document.getElementById('ap-student-bookings')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="ap-nav-icon">
              <i className="ri-git-pull-request-line" />
            </span>
            <span>Gig Requests</span>
          </button>

          <p className="ap-nav-header">Earn</p>
          <button
            type="button"
            className="ap-nav-item"
            onClick={() => document.getElementById('ap-student-billing')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="ap-nav-icon">
              <i className="ri-cash-line" />
            </span>
            <span>Billing</span>
          </button>

          <div className="ap-nav-bottom">
            <div className="ap-nav-item" style={{ cursor: 'default' }}>
              <span className="ap-nav-icon">
                <i className="ri-user-line" />
              </span>
              <span>{user?.name || user?.email}</span>
            </div>
          </div>
        </nav>
      </aside>

      <main className="ap-main">
        <header className="ap-topbar">
          <div className="ap-topbar-start">
            <div>
              <h1 className="ap-page-title">Client Booking Portal</h1>
              <p className="ap-page-sub">Gig requests, artist selection, package viewing + your learning progress.</p>
            </div>
            <PortalTopbarLogo />
          </div>
          <div className="ap-top-actions">
            <div className="ap-stat-card-sm">
              <div className="ap-stat-num">{stats.enrollments}</div>
              <div className="ap-stat-label">Enrollments</div>
            </div>
            <button type="button" className="ap-icon-btn" aria-label="Media">
              <i className="ri-mic-line" />
            </button>
            <button type="button" className="ap-avatar-btn" aria-label="Client">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'S'}
            </button>
          </div>
        </header>

        {error && <p className="text-danger small mb-0">{error}</p>}

        <section className="ap-container">
          <div className="ap-stats-row">
            <div className="ap-stat">
              <div className="ap-stat-inner">
                <div className="ap-stat-num">{stats.enrollments}</div>
                <div className="ap-stat-desc">LMS Enrollments</div>
              </div>
            </div>
            <div className="ap-stat">
              <div className="ap-stat-inner">
                <div className="ap-stat-num">{stats.transactions}</div>
                <div className="ap-stat-desc">Transactions</div>
              </div>
            </div>
            <div className="ap-stat">
              <div className="ap-stat-inner">
                <div className="ap-stat-num">{stats.mediaCount}</div>
                <div className="ap-stat-desc">Studio Media</div>
              </div>
            </div>
          </div>

          <div className="ap-grid">
            <div className="ap-card">
              <h2 className="ap-card-title" id="ap-student-lms">
                LMS Learning
              </h2>
              {user?.role === 'STUDENT' ? (
                <form onSubmit={handleEnroll} className="mb-4">
                  <label className="form-label small text-secondary mb-1">Published courses</label>
                  <select
                    className="form-select bg-black text-white border-secondary"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    required
                  >
                    <option value="">Select a course…</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title} — ${c.price} ({c.division})
                      </option>
                    ))}
                  </select>
                  <div className="mt-3">
                    <button type="submit" className="ap-btn ap-btn-primary" disabled={saving || !courseId}>
                      {saving ? 'Enrolling…' : 'Enroll'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="ap-empty ap-small">Enrollments are available to STUDENT accounts.</div>
              )}

              <hr className="ap-hr" />

              <h2 className="ap-card-title" id="ap-student-bookings">
                Gig Requests
              </h2>
              <form onSubmit={handleBooking}>
                <label className="form-label small text-secondary mb-1">Artist selection</label>
                <select
                  className="form-select bg-black text-white border-secondary"
                  value={selectedArtistId}
                  onChange={(e) => setSelectedArtistId(e.target.value)}
                  required
                >
                  <option value="">Select an artist…</option>
                  {artists.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.stageName}
                      {a.city ? ` — ${a.city}` : ''}
                    </option>
                  ))}
                </select>

                <label className="form-label small text-secondary mt-3 mb-1">Package viewing</label>
                <select
                  className="form-select bg-black text-white border-secondary"
                  value={selectedGigId}
                  onChange={(e) => setSelectedGigId(e.target.value)}
                  required
                  disabled={packages.length === 0}
                >
                  {(packages || []).length === 0 && <option value="">No packages available</option>}
                  {(packages || []).map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.title}
                      {g.fee != null ? ` — $${g.fee}` : ''}
                    </option>
                  ))}
                </select>

                {selectedGig && (
                  <div className="p-3 rounded-3 mt-2 mb-2" style={{ background: 'rgba(26, 1, 48, 0.55)' }}>
                    <div className="d-flex justify-content-between gap-2">
                      <strong className="text-white">{selectedGig.title}</strong>
                      {selectedGig.status ? <span className="badge bg-secondary text-nowrap">{selectedGig.status}</span> : null}
                    </div>
                    <div className="text-secondary small mt-2">
                      Venue: {selectedGig.venue || 'TBA'} · Division: {selectedGig.division || 'ALMS'}
                    </div>
                    <div className="text-secondary small">
                      Fee: {selectedGig.fee != null ? `$${selectedGig.fee} ${selectedGig.currency || 'USD'}` : 'Not set'}
                    </div>
                    <div className="text-secondary small">Event: {formatDate(selectedGig.eventStart)}</div>
                  </div>
                )}

                <label className="form-label small text-secondary mb-1">Event date</label>
                <input
                  type="date"
                  className="form-control bg-black text-white border-secondary"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />

                <div className="ap-form-row mt-3">
                  <div style={{ flex: 1, minWidth: 160 }}>
                    <label className="form-label small text-secondary mb-1">Budget (optional)</label>
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      className="form-control bg-black text-white border-secondary"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="e.g. 2500"
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 140 }}>
                    <label className="form-label small text-secondary mb-1">Currency</label>
                    <select
                      className="form-select bg-black text-white border-secondary"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </div>

                <label className="form-label small text-secondary mb-1 mt-3">Notes</label>
                <textarea
                  className="form-control bg-black text-white border-secondary"
                  placeholder="Requirements, timing, venue details, set length, etc."
                  rows={3}
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                />

                <div className="mt-3">
                  <button type="submit" className="ap-btn ap-btn-ghost" disabled={saving || !selectedGigId}>
                    {saving ? 'Submitting…' : 'Submit request'}
                  </button>
                </div>
              </form>
            </div>

            <aside className="ap-card">
              <h2 className="ap-card-title">Your Learning & Requests</h2>

              <h3 className="ap-card-sub">Your courses</h3>
              <ul className="list-unstyled small mb-3">
                {(data?.enrollments || []).map((en) => (
                  <li key={en.id} className="mb-2 d-flex justify-content-between gap-2">
                    <span>{en.course?.title ?? 'Course'}</span>
                    <span className="text-secondary text-nowrap">{en.progress}%</span>
                  </li>
                ))}
                {(!data?.enrollments || data.enrollments.length === 0) && (
                  <li className="text-secondary">No enrollments yet.</li>
                )}
              </ul>

              <hr className="ap-hr" />

              <h3 className="ap-card-sub" id="ap-student-billing">
                Gig request tracking
              </h3>
              <ul className="list-unstyled small mb-3">
                {bookings.map((bk) => (
                  <li key={bk.id} className="mb-3 pb-3 border-bottom border-secondary border-opacity-25">
                    <div className="d-flex justify-content-between gap-2">
                      <strong>{bk.packageName || 'Booking'}</strong>
                      <span className={`badge ${bk.status === 'confirmed' ? 'bg-success' : 'bg-secondary'} text-nowrap`}>
                        {bk.status}
                      </span>
                    </div>
                    <div className="text-secondary small mt-2">
                      Artist: {bk.artist?.name || bk.artist?.email || 'TBD'} · Event: {formatDate(bk.eventDate)}
                    </div>
                    {bk.notes && <div className="text-secondary small mt-1">{bk.notes}</div>}
                  </li>
                ))}
                {bookings.length === 0 && <li className="text-secondary">No bookings yet.</li>}
              </ul>

              <h3 className="ap-card-sub">Billing activity</h3>
              <ul className="list-unstyled small mb-3">
                {(data?.transactions || []).slice(0, 8).map((t) => (
                  <li key={t.id} className="mb-2">
                    <div className="d-flex justify-content-between">
                      <span>{t.type}</span>
                      <span style={{ color: 'var(--wam-gold)' }}>${t.amount}</span>
                    </div>
                    {t.description && <div className="text-secondary small">{t.description}</div>}
                  </li>
                ))}
                {(!data?.transactions || data.transactions.length === 0) && (
                  <li className="text-secondary">No transactions yet.</li>
                )}
              </ul>

              <hr className="ap-hr" />
              <h3 className="ap-card-sub">100th Monkey catalog</h3>
              <div className="row g-2">
                {media.map((m) => (
                  <div key={m.id} className="col-md-6">
                    <div className="p-3 rounded-3 h-100" style={{ background: 'rgba(26, 1, 48, 0.6)' }}>
                      <div className="d-flex justify-content-between">
                        <strong>{m.title}</strong>
                        {m.isPremium && <span className="badge bg-warning text-dark">Premium</span>}
                      </div>
                      <div className="small text-secondary">{m.mediaType}</div>
                    </div>
                  </div>
                ))}
                {media.length === 0 && <div className="ap-empty ap-small">No media published yet.</div>}
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}

