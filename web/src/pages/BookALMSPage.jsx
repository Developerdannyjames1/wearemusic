import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer.jsx';
import { api } from '../api/client.js';

const PACKAGES = [
  { id: 'p1', label: 'One 45-minute set', packageName: 'One 45-minute set' },
  { id: 'p2', label: 'Two 45-minute sets', packageName: 'Two 45-minute sets' },
  { id: 'p3', label: 'Custom event', packageName: 'Custom event' },
];

export function BookALMSPage() {
  const [artists, setArtists] = useState([]);
  const [artistId, setArtistId] = useState('');
  const [gigs, setGigs] = useState([]);
  const [gigId, setGigId] = useState('');
  const [pkg, setPkg] = useState(PACKAGES[0].packageName);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [budget, setBudget] = useState('');
  const [notes, setNotes] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const json = await api('/artists');
        const list = json.artists || [];
        if (!cancelled) {
          setArtists(list);
          setArtistId((prev) => prev || list[0]?.id || '');
        }
      } catch (e) {
        if (!cancelled) setErr(e.message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadGigs() {
      if (!artistId) {
        setGigs([]);
        setGigId('');
        return;
      }
      try {
        const json = await api(`/gigs?artistId=${artistId}`);
        if (cancelled) return;
        const g = json.gigs || [];
        setGigs(g);
        setGigId(g[0]?.id || '');
      } catch {
        if (!cancelled) {
          setGigs([]);
          setGigId('');
        }
      }
    }
    loadGigs();
    return () => {
      cancelled = true;
    };
  }, [artistId]);

  const selectedGig = useMemo(() => gigs.find((g) => g.id === gigId) || null, [gigs, gigId]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    if (!email.trim()) {
      setErr('Email is required.');
      return;
    }
    setBusy(true);
    try {
      await api('/public/booking-leads', {
        method: 'POST',
        body: {
          email: email.trim(),
          name: name.trim() || undefined,
          phone: phone.trim() || undefined,
          artistId: artistId || undefined,
          gigId: gigId || undefined,
          packageName: selectedGig ? selectedGig.title : pkg,
          notes: notes.trim() || undefined,
          eventDate: eventDate || undefined,
          budget: budget !== '' ? Number(budget) : undefined,
          currency: 'USD',
        },
      });
      setMsg('Thanks — we received your request. Our team will follow up by email.');
      setNotes('');
    } catch (ex) {
      setErr(ex.message || 'Could not submit.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="marketing-hero marketing-hero--alms min-vh-100 book-gig-page">
      <div className="container marketing-main py-5" style={{ maxWidth: 720 }}>
        <p className="marketing-section-title">ALMS Entertainment</p>
        <h1 className="display-5 fw-bold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          Book a gig
        </h1>
        <p className="marketing-prose mb-4 book-gig-lead">
          Tell us about your venue or event. You can pick a package and optional artist; if you already have an account,{' '}
          <Link to="/login">sign in</Link> and use the client portal for full tracking.
        </p>

        {msg && <div className="alert alert-success">{msg}</div>}
        {err && <div className="alert alert-danger">{err}</div>}

        <form onSubmit={handleSubmit} className="book-gig-form p-4 p-md-4">
          <div className="mb-3">
            <label className="form-label small book-gig-label">Email *</label>
            <input
              type="email"
              className="form-control book-gig-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label small book-gig-label">Name</label>
            <input
              className="form-control book-gig-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label small book-gig-label">Phone</label>
            <input
              className="form-control book-gig-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
            />
          </div>

          <div className="mb-3">
            <label className="form-label small book-gig-label">Preferred artist</label>
            <select
              className="form-select book-gig-control"
              value={artistId}
              onChange={(e) => setArtistId(e.target.value)}
            >
              <option value="">Any / assign later</option>
              {artists.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.stageName || a.name || a.email}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label small book-gig-label">Link to artist gig slot (optional)</label>
            <select
              className="form-select book-gig-control"
              value={gigId}
              onChange={(e) => setGigId(e.target.value)}
              disabled={!gigs.length}
            >
              <option value="">— Package only —</option>
              {gigs.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.title}
                  {g.venue ? ` · ${g.venue}` : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label small book-gig-label">Package</label>
            <select
              className="form-select book-gig-control"
              value={pkg}
              onChange={(e) => setPkg(e.target.value)}
            >
              {PACKAGES.map((p) => (
                <option key={p.id} value={p.packageName}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label small book-gig-label">Event date</label>
            <input
              type="date"
              className="form-control book-gig-control"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label small book-gig-label">Budget (USD)</label>
            <input
              type="number"
              min={0}
              step={1}
              className="form-control book-gig-control"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label small book-gig-label">Notes</label>
            <textarea
              className="form-control book-gig-control book-gig-notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Venue, audience, accessibility needs, special program…"
            />
          </div>

          <button type="submit" className="btn book-gig-btn rounded-pill px-4" disabled={busy}>
            {busy ? 'Sending…' : 'Submit request'}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
