import { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';

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

export function StudentPlaceholderPage() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [media, setMedia] = useState([]);
  const [artists, setArtists] = useState([]);
  const [packages, setPackages] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // LMS enrollment
  const [courseCatalog, setCourseCatalog] = useState([]);
  const [courseId, setCourseId] = useState('');

  // Client booking portal fields
  const [selectedArtistId, setSelectedArtistId] = useState('');
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
      const [dash, m, cat, artistsRes] = await Promise.all([
        api('/student/dashboard'),
        api('/media'),
        api('/courses').catch(() => ({ courses: [] })),
        api('/artists').catch(() => ({ artists: [] })),
      ]);
      setData(dash);
      setMedia(m.media || []);
      setCourseCatalog(cat.courses || []);
      setArtists(artistsRes.artists || []);
      if (user?.role === 'STUDENT') {
        try {
          const b = await api('/bookings');
          setBookings(b.bookings || []);
        } catch {
          setBookings([]);
        }
      } else {
        setBookings([]);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [user?.role]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!selectedArtistId && artists.length) setSelectedArtistId(artists[0].id);
  }, [artists, selectedArtistId]);

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

  useEffect(() => {
    if (!selectedGig) return;
    if (!eventDate && selectedGig.eventStart) setEventDate(toInputDate(selectedGig.eventStart));
  }, [selectedGig, eventDate]);

  async function handleEnroll(e) {
    e.preventDefault();
    if (!courseId) return;
    setSaving(true);
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
      setCurrency('USD');
      setEventDate('');
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

  return (
    <div className="container py-5">
      <h1 className="mb-2" style={{ fontFamily: 'var(--font-display)' }}>
        Client Booking Portal
      </h1>
      <p className="text-secondary mb-4">
        Gig requests (artist selection + package viewing), booking status tracking, and your LMS enrollments.
      </p>
      {error && <p className="text-danger small">{error}</p>}

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="p-4 wam-panel h-100 wam-panel-interactive">
            <h6 className="text-uppercase small text-secondary mb-2">Enrollments</h6>
            <p className="display-6 mb-0" style={{ color: 'var(--wam-gold)' }}>
              {data?.enrollments?.length ?? 0}
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 wam-panel h-100 wam-panel-interactive">
            <h6 className="text-uppercase small text-secondary mb-2">Transactions</h6>
            <p className="display-6 mb-0" style={{ color: 'var(--wam-magenta)' }}>
              {data?.transactions?.length ?? 0}
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 wam-panel h-100 wam-panel-interactive">
            <h6 className="text-uppercase small text-secondary mb-2">Studio media</h6>
            <p className="display-6 mb-0">{media.length}</p>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-lg-6">
          {user?.role === 'STUDENT' && (
            <div className="p-4 wam-panel wam-panel-interactive mb-3">
              <h6 className="text-uppercase small text-secondary mb-3">Join a course</h6>
              <form onSubmit={handleEnroll} className="d-flex flex-column gap-2">
                <label className="form-label small text-secondary mb-0">Published courses</label>
                <select
                  className="form-select bg-black text-white border-secondary"
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  required
                >
                  <option value="">Select a course…</option>
                  {courseCatalog.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} — ${c.price} ({c.division})
                    </option>
                  ))}
                </select>
                <button type="submit" className="btn btn-light rounded-pill" disabled={saving || !courseId}>
                  {saving ? 'Saving…' : 'Enroll'}
                </button>
              </form>
            </div>
          )}
          <div className="p-4 wam-panel wam-panel-interactive">
            <h6 className="text-uppercase small text-secondary mb-3">Gig requests</h6>
            <form onSubmit={handleBooking} className="d-flex flex-column gap-2">
              <label className="form-label small text-secondary mb-0">Artist selection</label>
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

              <label className="form-label small text-secondary mb-0">Package viewing</label>
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
                <div className="p-3 rounded-3 mb-2" style={{ background: 'rgba(26, 1, 48, 0.55)' }}>
                  <div className="d-flex justify-content-between gap-2">
                    <strong className="text-white">{selectedGig.title}</strong>
                    {selectedGig.status && (
                      <span className="badge bg-secondary text-nowrap">{selectedGig.status}</span>
                    )}
                  </div>
                  <div className="text-secondary small mt-2">
                    Venue: {selectedGig.venue || 'TBA'} · Division: {selectedGig.division || 'ALMS'}
                  </div>
                  <div className="text-secondary small">
                    Fee:{' '}
                    {selectedGig.fee != null ? `$${selectedGig.fee} ${selectedGig.currency || 'USD'}` : 'Not set'}
                  </div>
                  <div className="text-secondary small">Event: {formatDate(selectedGig.eventStart)}</div>
                </div>
              )}

              <label className="form-label small text-secondary mb-0">Event date</label>
              <input
                type="date"
                className="form-control bg-black text-white border-secondary"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />

              <label className="form-label small text-secondary mb-0">Budget (optional)</label>
              <input
                type="number"
                min={0}
                step="0.01"
                className="form-control bg-black text-white border-secondary"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. 2500"
              />

              <label className="form-label small text-secondary mb-0">Currency</label>
              <select
                className="form-select bg-black text-white border-secondary"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>

              <label className="form-label small text-secondary mb-0">Notes</label>
              <textarea
                className="form-control bg-black text-white border-secondary"
                placeholder="Details for the artist team (requirements, set length, timing, etc.)"
                rows={3}
                value={bookingNotes}
                onChange={(e) => setBookingNotes(e.target.value)}
              />

              <button type="submit" className="btn btn-outline-light rounded-pill" disabled={saving || !selectedGigId}>
                {saving ? 'Submitting…' : 'Submit request'}
              </button>
            </form>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="p-4 wam-panel wam-panel-interactive mb-3">
            <h6 className="text-uppercase small text-secondary mb-3">Your courses</h6>
            <ul className="list-unstyled small mb-0">
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
          </div>
          <div className="p-4 wam-panel wam-panel-interactive mb-3">
            <h6 className="text-uppercase small text-secondary mb-3">Gig request tracking</h6>
            <ul className="list-unstyled small mb-0">
              {bookings.map((bk) => (
                <li
                  key={bk.id}
                  className="mb-3 pb-3 border-bottom border-secondary border-opacity-25"
                >
                  <div className="d-flex justify-content-between gap-2">
                    <strong>{bk.packageName || 'Booking'}</strong>
                    <span className="badge bg-secondary text-nowrap">{bk.status}</span>
                  </div>
                  <div className="text-secondary small mt-2">
                    Artist: {bk.artist?.name || bk.artist?.email || 'TBD'} · Event: {formatDate(bk.eventDate)}
                  </div>
                  {bk.notes && <div className="text-secondary small mt-1">{bk.notes}</div>}
                </li>
              ))}
              {bookings.length === 0 && <li className="text-secondary">No bookings yet.</li>}
            </ul>
          </div>
          <div className="p-4 wam-panel wam-panel-interactive">
            <h6 className="text-uppercase small text-secondary mb-3">Billing activity</h6>
            <ul className="list-unstyled small mb-0">
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
          </div>
        </div>
      </div>

      <div className="p-4 wam-panel wam-panel-interactive mt-3">
        <h6 className="text-uppercase small text-secondary mb-3">100th Monkey catalog</h6>
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
          {media.length === 0 && <p className="text-secondary small mb-0">No media published yet.</p>}
        </div>
      </div>
    </div>
  );
}
