import { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../../api/client.js';
import { formatDate } from './adminUtils.js';
import '../artist-portal.css';

function PageCard({ title, subtitle, children }) {
  return (
    <section className="ap-container">
      <div className="ap-card">
        <h2 className="ap-card-title">{title}</h2>
        {subtitle ? <p className="ap-muted ap-small mb-3">{subtitle}</p> : null}
        {children}
      </div>
    </section>
  );
}

export function AdminUsersPage() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api('/admin/users');
      setRows(res.users || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-light" role="status" />
      </div>
    );
  }

  return (
    <PageCard title="Users & roles" subtitle={`All accounts (${rows.length})`}>
      {error && <p className="text-danger small mb-2">{error}</p>}
      <div className="table-responsive">
        <table className="table table-transparent table-sm table-borderless mb-0 small">
          <thead>
            <tr className="text-light">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((u) => (
              <tr key={u.id}>
                <td>{u.name || '—'}</td>
                <td>{u.email}</td>
                <td>
                  <span className="badge bg-secondary bg-opacity-50">{u.role}</span>
                </td>
                <td className="text-light">{formatDate(u.createdAt)}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="text-secondary">
                  No users.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PageCard>
  );
}

export function AdminCoursesPage() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api('/admin/courses');
      setRows(res.courses || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-light" role="status" />
      </div>
    );
  }

  return (
    <PageCard title="Courses">
      {error && <p className="text-danger small mb-2">{error}</p>}
      <div className="table-responsive">
        <table className="table table-transparent table-sm table-borderless mb-0 small">
          <thead>
            <tr className="text-light">
              <th>Title</th>
              <th>Division</th>
              <th>Coach</th>
              <th>Lessons</th>
              <th>Enrolled</th>
              <th>Published</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id}>
                <td>{c.title}</td>
                <td>{c.division}</td>
                <td>{c.coach?.name || c.coach?.email}</td>
                <td>{c._count?.lessons ?? 0}</td>
                <td>{c._count?.enrollments ?? 0}</td>
                <td>{c.isPublished ? 'yes' : 'no'}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="text-secondary">
                  No courses.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PageCard>
  );
}

export function AdminLessonsPage() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api('/lessons');
      setRows(res.lessons || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-light" role="status" />
      </div>
    );
  }

  return (
    <PageCard title="Lessons">
      {error && <p className="text-danger small mb-2">{error}</p>}
      <div className="table-responsive">
        <table className="table table-transparent table-sm table-borderless mb-0 small">
          <thead>
            <tr className="text-light">
              <th>Title</th>
              <th>Course</th>
              <th>Coach</th>
              <th>Order</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((l) => (
              <tr key={l.id}>
                <td>{l.title}</td>
                <td>{l.course?.title || '—'}</td>
                <td>{l.coach?.name || '—'}</td>
                <td>{l.orderIndex}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="text-secondary">
                  No lessons.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PageCard>
  );
}

export function AdminEnrollmentsPage() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api('/admin/enrollments');
      setRows(res.enrollments || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-light" role="status" />
      </div>
    );
  }

  return (
    <PageCard title="Enrollments">
      {error && <p className="text-danger small mb-2">{error}</p>}
      <div className="table-responsive">
        <table className="table table-transparent table-sm table-borderless mb-0 small">
          <thead>
            <tr className="text-light">
              <th>Student</th>
              <th>Course</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Enrolled</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr key={e.id}>
                <td>{e.student?.name || e.student?.email}</td>
                <td>{e.course?.title}</td>
                <td>{e.progress}%</td>
                <td>{e.status}</td>
                <td className="text-light">{formatDate(e.enrolledAt)}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="text-secondary">
                  No enrollments.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PageCard>
  );
}

export function AdminPipelinePage() {
  const [dash, setDash] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusEdits, setStatusEdits] = useState({});
  const [savingBookingId, setSavingBookingId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [d, b] = await Promise.all([api('/admin/dashboard'), api('/bookings')]);
      setDash(d);
      setBookings(b.bookings || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const pendingBookings = dash?.pendingBookings || [];
  const pendingFromLists = useMemo(() => {
    return (bookings || []).filter((b) => b.status === 'pending');
  }, [bookings]);

  const rows = pendingBookings.length ? pendingBookings : pendingFromLists;

  async function handleUpdateBooking(bookingId) {
    const status = statusEdits[bookingId];
    if (!status) return;
    setSavingBookingId(bookingId);
    setError(null);
    try {
      await api(`/bookings/${bookingId}`, { method: 'PATCH', body: { status } });
      setStatusEdits({});
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setSavingBookingId(null);
    }
  }

  if (loading && !dash) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-light" role="status" />
      </div>
    );
  }

  return (
    <PageCard title="Pending booking pipeline" subtitle="Update status and save.">
      {error && <p className="text-danger small mb-2">{error}</p>}
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
            {rows.map((b) => (
              <tr key={b.id}>
                <td>{b.packageName || 'Booking'}</td>
                <td>{b.client?.name || b.client?.email || '—'}</td>
                <td>{b.artist?.name || b.artist?.email || '—'}</td>
                <td className="text-light">
                  {b.eventDate ? new Date(b.eventDate).toLocaleDateString() : '—'}
                </td>
                <td style={{ minWidth: 190 }}>
                  <div className="d-flex gap-2 align-items-center flex-wrap">
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
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="text-secondary">
                  No pending bookings right now.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PageCard>
  );
}

export function AdminBookingsPage() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api('/bookings');
      setRows(res.bookings || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-light" role="status" />
      </div>
    );
  }

  return (
    <PageCard title="All bookings">
      {error && <p className="text-danger small mb-2">{error}</p>}
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
            {rows.map((b) => (
              <tr key={b.id}>
                <td>{b.packageName || '—'}</td>
                <td>{b.client?.name || b.client?.email}</td>
                <td>{b.artist?.name || b.artist?.email}</td>
                <td className="text-light">
                  {b.eventDate ? new Date(b.eventDate).toLocaleDateString() : '—'}
                </td>
                <td>
                  <span className="badge bg-secondary bg-opacity-50">{b.status}</span>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="text-secondary">
                  No bookings.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PageCard>
  );
}

export function AdminArtistsPage() {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await api('/artists');
        if (!cancelled) setRows(res.artists || []);
      } catch (e) {
        if (!cancelled) setError(e.message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <PageCard title="Artists">
        <p className="text-danger small mb-0">{error}</p>
      </PageCard>
    );
  }

  if (!rows) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-light" role="status" />
      </div>
    );
  }

  return (
    <PageCard title="Artists" subtitle="Performance & booking roster.">
      <div className="table-responsive">
        <table className="table table-transparent table-sm table-borderless mb-0 small">
          <thead>
            <tr className="text-light">
              <th>Stage name</th>
              <th>Email</th>
              <th>Gigs</th>
              <th>Bookings</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => (
              <tr key={a.id}>
                <td>{a.stageName || a.name}</td>
                <td>{a.email}</td>
                <td>{a.gigCount ?? '—'}</td>
                <td>{a.bookingCount ?? '—'}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="text-secondary">
                  No artists.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PageCard>
  );
}

export function AdminGigsPage() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api('/gigs');
      setRows(res.gigs || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-light" role="status" />
      </div>
    );
  }

  return (
    <PageCard title="Gigs">
      {error && <p className="text-danger small mb-2">{error}</p>}
      <div className="table-responsive">
        <table className="table table-transparent table-sm table-borderless mb-0 small">
          <thead>
            <tr className="text-light">
              <th>Title</th>
              <th>Artist</th>
              <th>Venue</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((g) => (
              <tr key={g.id}>
                <td>{g.title}</td>
                <td>{g.artist?.name || g.artist?.email}</td>
                <td>{g.venue || '—'}</td>
                <td>{g.status}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="text-secondary">
                  No gigs.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PageCard>
  );
}

export function AdminMediaPage() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api('/media');
      setRows(res.media || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-light" role="status" />
      </div>
    );
  }

  return (
    <PageCard title="Media library">
      {error && <p className="text-danger small mb-2">{error}</p>}
      <div className="table-responsive">
        <table className="table table-transparent table-sm table-borderless mb-0 small">
          <thead>
            <tr className="text-light">
              <th>Title</th>
              <th>Type</th>
              <th>Premium</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m.id}>
                <td>{m.title}</td>
                <td>{m.mediaType}</td>
                <td>{m.isPremium ? 'yes' : 'no'}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={3} className="text-secondary">
                  No media items.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PageCard>
  );
}

export function AdminPaymentsPage() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api('/payments/summary');
      setSummary(res);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-light" role="status" />
      </div>
    );
  }

  const txs = summary?.transactions || [];

  return (
    <PageCard title="Payments & revenue">
      {error && <p className="text-danger small mb-2">{error}</p>}
      <p className="ap-muted ap-small mb-3">
        Total recorded: <strong>${Number(summary?.total ?? 0).toFixed(2)}</strong>
      </p>
      <div className="table-responsive">
        <table className="table table-transparent table-sm table-borderless mb-0 small">
          <thead>
            <tr className="text-light">
              <th>Amount</th>
              <th>Type</th>
              <th>Status</th>
              <th>When</th>
            </tr>
          </thead>
          <tbody>
            {txs.map((t) => (
              <tr key={t.id}>
                <td>${Number(t.amount).toFixed(2)}</td>
                <td>{t.type}</td>
                <td>{t.status}</td>
                <td className="text-light">{formatDate(t.createdAt)}</td>
              </tr>
            ))}
            {txs.length === 0 && (
              <tr>
                <td colSpan={4} className="text-secondary">
                  No transactions.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PageCard>
  );
}
