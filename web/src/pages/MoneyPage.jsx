import { useEffect, useState } from 'react';
import { api } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';

export function MoneyPage() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState('25');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const json = await api('/payments/summary');
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

  async function handleMockPayment(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await api('/payments/mock', { method: 'POST', body: { amount: Number(amount), type: 'topup' } });
      const json = await api('/payments/summary');
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-light" role="status" />
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="container py-5">
        <div className="p-4 wam-panel">
          <p className="text-danger mb-0">{error}</p>
        </div>
      </div>
    );
  }

  const total = data?.total ?? 0;

  return (
    <div className="container py-5">
      <h1 className="mb-2" style={{ fontFamily: 'var(--font-display)' }}>
        Revenue, Streaming & Payments
      </h1>
      <p className="text-secondary mb-2">
        Signed in as <strong>{user?.email}</strong>. Ledger totals update from mock transactions.
      </p>
      <p className="small text-secondary mb-4">{data?.stripeConnectNote}</p>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="p-4 wam-panel h-100 wam-panel-interactive">
            <h6 className="text-uppercase small text-secondary mb-2">Your total (visible scope)</h6>
            <p className="display-5 mb-0" style={{ color: 'var(--wam-gold)' }}>
              ${typeof total === 'number' ? total.toFixed(2) : total}
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-4 wam-panel h-100 wam-panel-interactive">
            <h6 className="text-uppercase small text-secondary mb-3">Record mock payment</h6>
            <form onSubmit={handleMockPayment} className="d-flex flex-wrap gap-2 align-items-end">
              <div>
                <label className="form-label small text-secondary mb-1">Amount (USD)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="form-control bg-black text-white border-secondary"
                  style={{ maxWidth: 140 }}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-light rounded-pill" disabled={saving}>
                {saving ? 'Saving…' : 'Add entry'}
              </button>
            </form>
            {error && <p className="text-danger small mt-2 mb-0">{error}</p>}
          </div>
        </div>
      </div>

      <div className="p-4 wam-panel wam-panel-interactive">
        <h6 className="text-uppercase small text-secondary mb-3">Recent transactions</h6>
        <div className="table-responsive">
          <table className="table table-transparent table-sm table-borderless mb-0 small">
            <thead>
              <tr className="text-light">
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>When</th>
              </tr>
            </thead>
            <tbody>
              {(data?.transactions || []).map((t) => (
                <tr key={t.id}>
                  <td>{t.type}</td>
                  <td style={{ color: 'var(--wam-gold)' }}>${t.amount}</td>
                  <td>{t.status}</td>
                  <td className="text-light">{new Date(t.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(!data?.transactions || data.transactions.length === 0) && (
          <p className="text-secondary small mb-0">No transactions yet — add a mock payment above.</p>
        )}
      </div>
    </div>
  );
}
