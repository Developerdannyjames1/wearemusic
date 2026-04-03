import { useEffect, useMemo, useState } from 'react';
import { api } from '../api/client.js';

export function CoachPlaceholderPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [museScoreUrl, setMuseScoreUrl] = useState('');
  const [courseId, setCourseId] = useState('');
  const [orderIndex, setOrderIndex] = useState(1);
  const [durationMinutes, setDurationMinutes] = useState('');
  const [saving, setSaving] = useState(false);

  const [progressEdits, setProgressEdits] = useState({});
  const [statusEdits, setStatusEdits] = useState({});
  const [savingEnrollmentId, setSavingEnrollmentId] = useState(null);

  async function load() {
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
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreateLesson(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    try {
      await api('/lessons', {
        method: 'POST',
        body: {
          title,
          description: description || undefined,
          museScoreUrl: museScoreUrl || undefined,
          courseId: courseId || undefined,
          // Lesson division should match the selected course division.
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
      setSaving(false);
    }
  }

  const selectedCourse = useMemo(() => {
    if (!data?.courses || !courseId) return null;
    return data.courses.find((c) => c.id === courseId) || null;
  }, [data?.courses, courseId]);

  async function handleSaveEnrollment(id) {
    const progress = progressEdits[id];
    const status = statusEdits[id];
    setSavingEnrollmentId(id);
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
    <div className="container py-5">
      <h1 className="mb-2" style={{ fontFamily: 'var(--font-display)' }}>
        Coach Dashboard
      </h1>
      <p className="text-secondary mb-4">
        Upload lessons/content, manage student progress (enrollments), and link MuseScore sheet references.
      </p>
      {error && <p className="text-danger small">{error}</p>}

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="p-4 wam-panel h-100 wam-panel-interactive">
            <h6 className="text-uppercase small text-secondary mb-2">Your lessons</h6>
            <p className="display-6 mb-0" style={{ color: 'var(--wam-gold)' }}>
              {data?.stats?.lessonCount ?? 0}
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 wam-panel h-100 wam-panel-interactive">
            <h6 className="text-uppercase small text-secondary mb-2">Media you own</h6>
            <p className="display-6 mb-0" style={{ color: 'var(--wam-magenta)' }}>
              {data?.stats?.mediaCount ?? 0}
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 wam-panel h-100 wam-panel-interactive">
            <h6 className="text-uppercase small text-secondary mb-2">Music integrations</h6>
            <ul className="small mb-0 ps-3">
              <li>MuseScore links on each lesson</li>
              <li>Curriculum pairing ready</li>
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 wam-panel h-100 wam-panel-interactive">
            <h6 className="text-uppercase small text-secondary mb-2">Active enrollments</h6>
            <p className="display-6 mb-0" style={{ color: 'var(--wam-purple-mid)' }}>
              {data?.enrollments?.length ?? 0}
            </p>
            <p className="small text-secondary mb-0 mt-2">
              Update progress/status per student.
            </p>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-lg-6">
          <div className="p-4 wam-panel wam-panel-interactive">
            <h6 className="text-uppercase small text-secondary mb-3">Create lesson</h6>
            <form onSubmit={handleCreateLesson} className="d-flex flex-column gap-2">
              <label className="form-label small text-secondary mb-0">Course</label>
              <select
                className="form-select bg-black text-white border-secondary"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                required
              >
                {(data?.courses || []).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.division})
                  </option>
                ))}
              </select>
              <div className="d-flex gap-2 flex-wrap">
                <div style={{ flex: 1, minWidth: 160 }}>
                  <label className="form-label small text-secondary mb-0">Order index</label>
                  <input
                    type="number"
                    className="form-control bg-black text-white border-secondary"
                    value={orderIndex}
                    onChange={(e) => setOrderIndex(e.target.value)}
                    min={0}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 160 }}>
                  <label className="form-label small text-secondary mb-0">Duration (minutes)</label>
                  <input
                    type="number"
                    className="form-control bg-black text-white border-secondary"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(e.target.value)}
                    placeholder="e.g. 45"
                    min={0}
                  />
                </div>
              </div>
              <input
                className="form-control bg-black text-white border-secondary"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                className="form-control bg-black text-white border-secondary"
                placeholder="Description"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                className="form-control bg-black text-white border-secondary"
                placeholder="MuseScore URL (optional)"
                value={museScoreUrl}
                onChange={(e) => setMuseScoreUrl(e.target.value)}
              />
              {selectedCourse?.division && (
                <div className="small text-secondary">
                  Lesson division will be linked to course: <strong>{selectedCourse.division}</strong>
                </div>
              )}
              <button type="submit" className="btn btn-light rounded-pill mt-1" disabled={saving}>
                {saving ? 'Saving…' : 'Publish lesson'}
              </button>
            </form>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="p-4 wam-panel wam-panel-interactive">
            <h6 className="text-uppercase small text-secondary mb-3">Recent lessons</h6>
            <ul className="list-unstyled mb-0 small">
              {(data?.lessons || []).map((l) => (
                <li key={l.id} className="mb-3 pb-3 border-bottom border-secondary border-opacity-25">
                  <strong>{l.title}</strong>
                  {l.course?.title && (
                    <div className="text-secondary small">Course: {l.course.title}</div>
                  )}
                  <div className="text-secondary small">Division: {l.division}</div>
                  <div className="text-secondary small">Order: {l.orderIndex}</div>
                  {l.durationMinutes != null && (
                    <div className="text-secondary small">{l.durationMinutes} min</div>
                  )}
                  {l.museScoreUrl && (
                    <div>
                      <a href={l.museScoreUrl} target="_blank" rel="noreferrer">
                        Open score
                      </a>
                    </div>
                  )}
                </li>
              ))}
              {(!data?.lessons || data.lessons.length === 0) && (
                <li className="text-secondary">No lessons yet — create one on the left.</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="p-4 wam-panel wam-panel-interactive mt-4">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
          <div>
            <h6 className="text-uppercase small text-secondary mb-1">Manage student progress</h6>
            <p className="small text-secondary mb-0">Update `Enrollment.progress` and `Enrollment.status` per course.</p>
          </div>
        </div>
        <div className="mt-3">
          {(data?.enrollments || []).length === 0 && (
            <p className="text-secondary small mb-0">No enrollments found for your courses.</p>
          )}
          {(data?.enrollments || []).slice(0, 12).map((en) => (
            <div
              key={en.id}
              className="p-3 rounded-3 mb-3"
              style={{ background: 'rgba(26, 1, 48, 0.55)', border: '1px solid rgba(201, 162, 39, 0.15)' }}
            >
              <div className="d-flex justify-content-between gap-3 flex-wrap">
                <div>
                  <div className="fw-semibold">{en.student?.name || en.student?.email}</div>
                  <div className="text-secondary small">
                    Course: {en.course?.title} ({en.course?.division})
                  </div>
                  <div className="text-secondary small">Current progress: {en.progress}%</div>
                  <div className="text-secondary small">Current status: {en.status}</div>
                </div>
                <div className="d-flex gap-2 flex-wrap align-items-end">
                  <div style={{ width: 160 }}>
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
                    className="btn btn-light rounded-pill"
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
      </div>
    </div>
  );
}
