import { useEffect, useState } from 'react';
import { api } from '../api/client.js';

export function AdminPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusEdits, setStatusEdits] = useState({});
  const [savingBookingId, setSavingBookingId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const json = await api('/admin/dashboard');
        if (!cancelled) setData(json);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleUpdateBooking(bookingId) {
    const status = statusEdits[bookingId];
    if (!status) return;
    setSavingBookingId(bookingId);
    try {
      await api(`/bookings/${bookingId}`, {
        method: 'PATCH',
        body: { status },
      });
      setStatusEdits({});
      const json = await api('/admin/dashboard');
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setSavingBookingId(null);
    }
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-light" role="status" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="p-4 wam-panel">
          <p className="text-danger mb-0">{error}</p>
        </div>
      </div>
    );
  }

  const totalUsers = data?.users?.total ?? 0;
  const byRole = data?.users?.byRole || {};
  const rev = data?.revenue?.total ?? 0;
  const catalog = data?.catalog || {};
  const engagement = data?.engagement || {};
  const pendingBookings = data?.pendingBookings || [];
  const recentLessons = data?.recentLessons || [];
  const recentGigs = data?.recentGigs || [];

  return (
    <div className="container py-5">
      <h1 className="mb-2" style={{ fontFamily: 'var(--font-display)' }}>
        Master Admin Dashboard
      </h1>
      <p className="text-secondary mb-4">
        Live metrics — JM Method, ALMS Entertainment, and 100th Monkey Studios.
      </p>

      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <div className="p-4 wam-panel h-100 wam-panel-interactive">
            <h6 className="text-uppercase small text-secondary mb-3">Platform Summary</h6>
            <p className="display-6 mb-2" style={{ color: 'var(--wam-gold)' }}>
              {totalUsers}
            </p>
            <p className="small text-secondary mb-3">Total users</p>
            <ul className="small mb-0 ps-3">
              <li>Coaches: {byRole.COACH ?? 0}</li>
              <li>Artists: {byRole.ARTIST ?? 0}</li>
              <li>Students: {byRole.STUDENT ?? 0}</li>
              <li>Admins: {byRole.ADMIN ?? 0}</li>
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 wam-panel h-100 wam-panel-interactive">
            <h6 className="text-uppercase small text-secondary mb-3">Catalog &amp; LMS</h6>
            <ul className="small mb-0 ps-3">
              <li>Courses: {catalog.courses ?? 0}</li>
              <li>Lessons: {catalog.lessons ?? 0}</li>
              <li>Enrollments: {catalog.enrollments ?? 0}</li>
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 wam-panel h-100 wam-panel-interactive">
            <h6 className="text-uppercase small text-secondary mb-3">Engagement</h6>
            <p className="mb-0">
              <span className="text-secondary">Notifications queued: </span>
              <span style={{ color: 'var(--wam-magenta)' }}>{engagement.notifications ?? 0}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-8">
          <div className="p-4 wam-panel h-100 wam-panel-interactive">
            <h6 className="text-uppercase small text-secondary mb-3">Division Oversight</h6>
            <div className="row g-3">
              <div className="col-sm-4">
                <div className="p-3 rounded-3" style={{ background: 'rgba(201, 162, 39, 0.08)' }}>
                  <div className="small text-secondary">JM · Courses</div>
                  <div className="fs-4">{data?.divisions?.jmMethod?.courses ?? 0}</div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="p-3 rounded-3" style={{ background: 'rgba(201, 162, 39, 0.12)' }}>
                  <div className="small text-secondary">JM · Lessons</div>
                  <div className="fs-4">{data?.divisions?.jmMethod?.lessons ?? 0}</div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="p-3 rounded-3" style={{ background: 'rgba(222, 37, 116, 0.08)' }}>
                  <div className="small text-secondary">ALMS · Bookings</div>
                  <div className="fs-4">{data?.divisions?.alms?.bookings ?? 0}</div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="p-3 rounded-3" style={{ background: 'rgba(222, 37, 116, 0.12)' }}>
                  <div className="small text-secondary">ALMS · Gigs</div>
                  <div className="fs-4">{data?.divisions?.alms?.gigs ?? 0}</div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="p-3 rounded-3" style={{ background: 'rgba(59, 2, 79, 0.35)' }}>
                  <div className="small text-secondary">100th Monkey · Media</div>
                  <div className="fs-4">{data?.divisions?.monkeyStudios?.mediaItems ?? 0}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 wam-panel wam-panel-interactive h-100">
            <h6 className="text-uppercase small text-secondary mb-2">Revenue (mock ledger)</h6>
            <p className="mb-0 fs-5" style={{ color: 'var(--wam-gold)' }}>
              ${typeof rev === 'number' ? rev.toFixed(2) : rev}
            </p>
            <p className="small text-secondary mb-0 mt-2">
              Stripe Connect can replace mock transactions in production.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 wam-panel wam-panel-interactive mt-4">
        <h6 className="text-uppercase small text-secondary mb-3">Pending booking pipeline</h6>
        <div className="table-responsive">
          <table className="table table-transparent table-sm table-borderless mb-0 small">
            <thead>
              <tr className="text-light">
                <th>Package</th>
                <th>Client</th>
                <th>Artist</th>
                <th>When</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pendingBookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.packageName || 'Booking'}</td>
                  <td>{b.client?.name || b.client?.email || '-'}</td>
                  <td>{b.artist?.name || b.artist?.email || '-'}</td>
                  <td className="text-light">{b.eventDate ? new Date(b.eventDate).toLocaleDateString() : '-'}</td>
                  <td style={{ minWidth: 190 }}>
                    <div className="d-flex gap-2 align-items-center">
                      <select
                        className="form-select form-select-sm bg-black text-white border-secondary"
                        value={statusEdits[b.id] ?? b.status}
                        onChange={(e) => setStatusEdits({ ...statusEdits, [b.id]: e.target.value })}
                      >
                        <option value="pending">pending</option>
                        <option value="confirmed">confirmed</option>
                        <option value="completed">completed</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                      <button
                        type="button"
                        className="btn btn-sm btn-light"
                        disabled={savingBookingId === b.id}
                        onClick={() => handleUpdateBooking(b.id)}
                      >
                        {savingBookingId === b.id ? 'Saving…' : 'Save'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {pendingBookings.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-secondary">
                    No pending bookings right now.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row g-3 mt-4">
        <div className="col-lg-6">
          <div className="p-4 wam-panel wam-panel-interactive h-100">
            <h6 className="text-uppercase small text-secondary mb-3">Recent lessons</h6>
            <ul className="list-unstyled small mb-0">
              {recentLessons.map((l) => (
                <li key={l.id} className="mb-3 pb-3 border-bottom border-secondary border-opacity-25">
                  <strong>{l.title}</strong>
                  <div className="text-secondary small">
                    Course: {l.course?.title || '-'} · Coach: {l.coach?.name || l.coach?.email || '-'}
                  </div>
                  <div className="text-secondary small">Division: {l.division}</div>
                  {l.museScoreUrl ? (
                    <div className="small">
                      <a href={l.museScoreUrl} target="_blank" rel="noreferrer">
                        Open MuseScore
                      </a>
                    </div>
                  ) : null}
                </li>
              ))}
              {recentLessons.length === 0 && <li className="text-secondary">No lessons yet.</li>}
            </ul>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="p-4 wam-panel wam-panel-interactive h-100">
            <h6 className="text-uppercase small text-secondary mb-3">Recent gigs</h6>
            <ul className="list-unstyled small mb-0">
              {recentGigs.map((g) => (
                <li key={g.id} className="mb-3 pb-3 border-bottom border-secondary border-opacity-25">
                  <strong>{g.title}</strong>
                  <div className="text-secondary small">
                    Artist: {g.artist?.name || g.artist?.email || '-'} · Venue: {g.venue || 'TBA'}
                  </div>
                  <div className="text-secondary small">Status: {g.status} · Fee: {g.fee != null ? `$${g.fee}` : '—'}</div>
                </li>
              ))}
              {recentGigs.length === 0 && <li className="text-secondary">No gigs yet.</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
