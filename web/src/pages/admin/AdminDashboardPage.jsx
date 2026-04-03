import { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../../api/client.js';
import '../artist-portal.css';

export function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const dash = await api('/admin/dashboard');
      setData(dash);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const stats = useMemo(() => {
    return {
      totalUsers: data?.users?.total ?? 0,
      courses: data?.catalog?.courses ?? 0,
      pendingBookingsCount: data?.engagement?.pendingBookings ?? 0,
      revenue: data?.revenue?.total ?? 0,
      lessons: data?.catalog?.lessons ?? 0,
      mediaItems: data?.divisions?.monkeyStudios?.mediaItems ?? 0,
    };
  }, [data]);

  if (loading && !data) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-light" role="status" />
      </div>
    );
  }

  return (
    <section className="ap-container">
      {error && <p className="text-danger small mb-3">{error}</p>}

      <div className="ap-stats-row">
        <div className="ap-stat">
          <div className="ap-stat-inner">
            <div className="ap-stat-num">{stats.totalUsers}</div>
            <div className="ap-stat-desc">Total Users</div>
          </div>
        </div>
        <div className="ap-stat">
          <div className="ap-stat-inner">
            <div className="ap-stat-num">{stats.courses}</div>
            <div className="ap-stat-desc">Courses</div>
          </div>
        </div>
        <div className="ap-stat">
          <div className="ap-stat-inner">
            <div className="ap-stat-num">{stats.lessons}</div>
            <div className="ap-stat-desc">Lessons</div>
          </div>
        </div>
        <div className="ap-stat">
          <div className="ap-stat-inner">
            <div className="ap-stat-num">{stats.pendingBookingsCount}</div>
            <div className="ap-stat-desc">Pending bookings</div>
          </div>
        </div>
      </div>

      <div className="ap-card mt-3">
        <h2 className="ap-card-title">Platform summary</h2>
        <div className="row g-2">
          <div className="col-6 col-md-3">
            <div className="p-3 rounded-3" style={{ background: 'rgba(201, 162, 39, 0.08)' }}>
              <div className="small text-light">JM Method</div>
              <div className="fs-5">{data?.divisions?.jmMethod?.courses ?? 0} courses</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="p-3 rounded-3" style={{ background: 'rgba(222, 37, 116, 0.08)' }}>
              <div className="small text-light">ALMS</div>
              <div className="fs-5">{data?.divisions?.alms?.gigs ?? 0} gigs</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="p-3 rounded-3" style={{ background: 'rgba(59, 2, 79, 0.25)' }}>
              <div className="small text-light">100th Monkey</div>
              <div className="fs-5">{stats.mediaItems} media</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="p-3 rounded-3" style={{ background: 'rgba(251, 76, 55, 0.12)' }}>
              <div className="small text-light">Revenue</div>
              <div className="fs-5">${typeof stats.revenue === 'number' ? stats.revenue.toFixed(2) : stats.revenue}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
