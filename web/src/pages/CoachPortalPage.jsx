import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';
import { PortalTopbarLogo } from '../components/PortalTopbarLogo.jsx';
import './artist-portal.css';

export function CoachPortalPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [museScoreUrl, setMuseScoreUrl] = useState('');
  const [courseId, setCourseId] = useState('');
  const [orderIndex, setOrderIndex] = useState(1);
  const [durationMinutes, setDurationMinutes] = useState('');

  const [savingLesson, setSavingLesson] = useState(false);

  const [progressEdits, setProgressEdits] = useState({});
  const [statusEdits, setStatusEdits] = useState({});
  const [savingEnrollmentId, setSavingEnrollmentId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const json = await api('/coach/dashboard');
      setData(json);

      if (json?.courses?.length && !courseId) {
        setCourseId(json.courses[0].id);
        setOrderIndex(1);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedCourse = useMemo(() => {
    if (!data?.courses || !courseId) return null;
    return data.courses.find((c) => c.id === courseId) || null;
  }, [data?.courses, courseId]);

  async function handleCreateLesson(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setSavingLesson(true);
    setError(null);
    try {
      await api('/lessons', {
        method: 'POST',
        body: {
          title,
          description: description || undefined,
          museScoreUrl: museScoreUrl || undefined,
          courseId: courseId || undefined,
          division: selectedCourse?.division || undefined,
          orderIndex: Number(orderIndex) || 0,
          durationMinutes: durationMinutes ? Number(durationMinutes) : undefined,
        },
      });
      setTitle('');
      setDescription('');
      setMuseScoreUrl('');
      setOrderIndex(1);
      setDurationMinutes('');
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingLesson(false);
    }
  }

  async function handleSaveEnrollment(id) {
    const progress = progressEdits[id];
    const status = statusEdits[id];
    setSavingEnrollmentId(id);
    setError(null);
    try {
      await api(`/enrollments/${id}`, {
        method: 'PATCH',
        body: {
          ...(progress !== undefined ? { progress: Number(progress) } : {}),
          ...(status ? { status } : {}),
        },
      });
      setProgressEdits({});
      setStatusEdits({});
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setSavingEnrollmentId(null);
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
    <div className="ap-root">
      <img
        className="ap-bg-img"
        src="https://stage7.demolinkdesign.com/wp-content/uploads/2025/07/image-39.png"
        alt=""
      />

      <aside className="ap-sidebar">
        <div className="ap-brand-title">Coach Portal</div>
        <nav className="ap-nav">
          <p className="ap-nav-header">Inspire</p>
          <button
            type="button"
            className="ap-nav-item"
            onClick={() => document.getElementById('ap-coach-enrollments')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="ap-nav-icon">
              <i className="ri-user-3-line" />
            </span>
            <span>Enrollments</span>
          </button>
          <p className="ap-nav-header">Share</p>
          <button
            type="button"
            className="ap-nav-item active"
            onClick={() => document.getElementById('ap-coach-lessons')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="ap-nav-icon">
              <i className="ri-book-open-line" />
            </span>
            <span>Lessons</span>
          </button>
          <button
            type="button"
            className="ap-nav-item"
            onClick={() => document.getElementById('ap-coach-create')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="ap-nav-icon">
              <i className="ri-edit-2-line" />
            </span>
            <span>Create Lesson</span>
          </button>
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
              <h1 className="ap-page-title">Coach Dashboard</h1>
              <p className="ap-page-sub">Upload lessons/content, manage progress, link MuseScore sheets.</p>
            </div>
            <PortalTopbarLogo />
          </div>
          <div className="ap-top-actions">
            <div className="ap-stat-card-sm">
              <div className="ap-stat-num">{data?.stats?.lessonCount ?? 0}</div>
              <div className="ap-stat-label">Lessons</div>
            </div>
            <button type="button" className="ap-icon-btn" aria-label="Profile">
              <i className="ri-magic-fill" />
            </button>
            <button type="button" className="ap-avatar-btn" aria-label="Coach">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'C'}
            </button>
          </div>
        </header>

        {error && <p className="text-danger small mb-0">{error}</p>}

        <section className="ap-container">
          <div className="ap-stats-row">
            <div className="ap-stat">
              <div className="ap-stat-inner">
                <div className="ap-stat-num">{data?.stats?.lessonCount ?? 0}</div>
                <div className="ap-stat-desc">Lessons</div>
              </div>
            </div>
            <div className="ap-stat">
              <div className="ap-stat-inner">
                <div className="ap-stat-num">{data?.stats?.enrollmentsCount ?? 0}</div>
                <div className="ap-stat-desc">Enrollments</div>
              </div>
            </div>
            <div className="ap-stat">
              <div className="ap-stat-inner">
                <div className="ap-stat-num">{data?.stats?.mediaCount ?? 0}</div>
                <div className="ap-stat-desc">Media</div>
              </div>
            </div>
          </div>

          <div className="ap-grid">
            <div className="ap-card ap-span-full">
              <h2 className="ap-card-title">Manuscript &amp; transcription</h2>
              <p className="text-secondary small mb-2">
                Pair lesson videos with sheet music: paste a <strong>MuseScore</strong> link on each lesson (above).
                Planned integrations: <strong>AnthemScore</strong>-style audio-to-score pipelines and batch manuscript
                export for curriculum bundles.
              </p>
              <p className="text-secondary small mb-0">
                Attachments will surface in the student portal next to streaming modules so progress stays tied to the
                score.
              </p>
            </div>

            <div className="ap-card">
              <h2 className="ap-card-title" id="ap-coach-create">
                Create Lesson
              </h2>

              <form onSubmit={handleCreateLesson}>
                <div className="ap-form-row">
                  <select
                    className="form-select bg-black text-white border-secondary"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    required
                    style={{ minWidth: 220 }}
                  >
                    {(data?.courses || []).map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title} ({c.division})
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    min={0}
                    className="form-control bg-black text-white border-secondary"
                    value={orderIndex}
                    onChange={(e) => setOrderIndex(e.target.value)}
                    placeholder="Order index"
                  />

                  <input
                    type="number"
                    min={0}
                    className="form-control bg-black text-white border-secondary"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(e.target.value)}
                    placeholder="Duration (min, optional)"
                  />
                </div>

                <div className="ap-form-row">
                  <input
                    className="form-control bg-black text-white border-secondary"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Lesson title"
                    required
                  />
                </div>

                <div className="ap-form-row">
                  <textarea
                    className="form-control bg-black text-white border-secondary"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                  />
                </div>

                <div className="ap-form-row">
                  <input
                    className="form-control bg-black text-white border-secondary"
                    value={museScoreUrl}
                    onChange={(e) => setMuseScoreUrl(e.target.value)}
                    placeholder="MuseScore URL (optional)"
                  />
                </div>

                <div className="d-flex gap-2 flex-wrap mt-3">
                  <button type="submit" className="ap-btn ap-btn-primary" disabled={savingLesson}>
                    {savingLesson ? 'Publishing…' : 'Publish lesson'}
                  </button>
                  {selectedCourse?.division ? (
                    <div className="ap-small" style={{ alignSelf: 'center', color: 'var(--ap-muted)' }}>
                      Lesson division: <strong>{selectedCourse.division}</strong>
                    </div>
                  ) : null}
                </div>
              </form>

              <hr className="ap-hr" />

              <h3 className="ap-card-sub" id="ap-coach-lessons">
                Recent lessons
              </h3>
              <ul className="list-unstyled small mb-0">
                {(data?.lessons || []).map((l) => (
                  <li
                    key={l.id}
                    className="mb-3 pb-3 border-bottom border-secondary border-opacity-25"
                  >
                    <strong>{l.title}</strong>
                    <div className="text-secondary small">
                      Course: {l.course?.title || '-'} · Division: {l.division || '-'} · Order:{' '}
                      {l.orderIndex ?? 0}
                    </div>
                    {l.durationMinutes != null && (
                      <div className="text-secondary small">{l.durationMinutes} min</div>
                    )}
                    {l.museScoreUrl ? (
                      <div className="small">
                        <a href={l.museScoreUrl} target="_blank" rel="noreferrer">
                          Open score
                        </a>
                      </div>
                    ) : null}
                  </li>
                ))}
                {(data?.lessons || []).length === 0 && <li className="text-secondary">No lessons yet.</li>}
              </ul>
            </div>

            <aside className="ap-card">
              <h2 className="ap-card-title" id="ap-coach-enrollments">
                Manage Progress
              </h2>
              <p className="text-secondary small mb-3">
                Update <code>Enrollment.progress</code> and <code>Enrollment.status</code> per student.
              </p>

              {(data?.enrollments || []).length === 0 ? (
                <div className="ap-empty">No active enrollments.</div>
              ) : (
                <div className="ap-demo-list">
                  {(data?.enrollments || []).slice(0, 18).map((en) => (
                    <div
                      key={en.id}
                      className="p-3 rounded-3 mb-3"
                      style={{
                        background: 'rgba(26, 1, 48, 0.55)',
                        border: '1px solid rgba(201, 162, 39, 0.15)',
                      }}
                    >
                      <div className="d-flex justify-content-between gap-2 flex-wrap">
                        <div>
                          <div className="fw-semibold">{en.student?.name || en.student?.email}</div>
                          <div className="text-secondary small">
                            Course: {en.course?.title} ({en.course?.division})
                          </div>
                          <div className="text-secondary small">Current: {en.progress}% · {en.status}</div>
                        </div>
                        <div className="d-flex gap-2 flex-wrap align-items-end">
                          <div style={{ width: 150 }}>
                            <label className="form-label small text-secondary mb-0">Progress</label>
                            <input
                              type="number"
                              min={0}
                              max={100}
                              className="form-control bg-black text-white border-secondary"
                              value={progressEdits[en.id] ?? en.progress}
                              onChange={(e) => setProgressEdits({ ...progressEdits, [en.id]: e.target.value })}
                            />
                          </div>
                          <div style={{ width: 170 }}>
                            <label className="form-label small text-secondary mb-0">Status</label>
                            <select
                              className="form-select bg-black text-white border-secondary"
                              value={statusEdits[en.id] ?? en.status}
                              onChange={(e) => setStatusEdits({ ...statusEdits, [en.id]: e.target.value })}
                            >
                              <option value="active">active</option>
                              <option value="paused">paused</option>
                              <option value="completed">completed</option>
                              <option value="archived">archived</option>
                            </select>
                          </div>
                          <button
                            type="button"
                            className="ap-btn ap-btn-primary"
                            disabled={savingEnrollmentId === en.id}
                            onClick={() => handleSaveEnrollment(en.id)}
                          >
                            {savingEnrollmentId === en.id ? 'Saving…' : 'Save'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}

