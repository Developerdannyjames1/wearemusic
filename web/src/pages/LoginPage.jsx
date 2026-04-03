import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { api } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';
import { dashboardPathForRole } from '../lib/dashboardPath.js';
import './artist-portal.css';
import logoUrl from '@home/icon.svg?url';

const ROLE_MAP = {
  student: 'STUDENT',
  coach: 'COACH',
  artist: 'ARTIST',
  admin: 'ADMIN',
};

const MODE_COPY = {
  login: {
    title: 'Welcome back',
    sub: 'Sign in to your We Are Music dashboard.',
  },
  signup: {
    title: 'Create your account',
    sub: 'Choose a role and join the community.',
  },
  forgot: {
    title: 'Reset password',
    sub: "Enter your email and we'll send next steps.",
  },
};

export function LoginPage() {
  const { login, register, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const fromPath = location.state?.from?.pathname;
  const copy = MODE_COPY[mode] || MODE_COPY.login;

  if (loading) {
    return (
      <div className="auth-page auth-page--loading">
        <div className="spinner-border text-light" role="status" aria-label="Loading" />
      </div>
    );
  }

  if (user) {
    return <Navigate to={fromPath || dashboardPathForRole(user.role)} replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (mode === 'signup' && password !== confirmPassword) {
      setError('Password and confirm password do not match.');
      return;
    }

    setBusy(true);
    try {
      if (mode === 'login') {
        const data = await login(email, password);
        const dest = fromPath || dashboardPathForRole(data.user.role);
        navigate(dest, { replace: true });
        return;
      }
      if (mode === 'signup') {
        const data = await register({
          email,
          password,
          name: name || undefined,
          role: ROLE_MAP[role] || 'STUDENT',
        });
        const dest = fromPath || dashboardPathForRole(data.user.role);
        navigate(dest, { replace: true });
        return;
      }
      if (mode === 'forgot') {
        const res = await api('/auth/forgot-password', { method: 'POST', body: { email } });
        setMessage(res.message || 'Check your email for next steps.');
        if (res.token) {
          setMessage(
            `${res.message} (Dev: reset token available for testing — store it securely in production.)`,
          );
        }
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-page-inner">
        <Link to="/" className="auth-back">
          <i className="ri-arrow-left-line" aria-hidden />
          Back to home
        </Link>

        <h1 className="auth-headline">{copy.title}</h1>
        <p className="auth-sub">{copy.sub}</p>

        <div className="auth-card">
          <div className="auth-logo-wrap">
            <img src={logoUrl} alt="We Are Music" className="auth-logo" width={300} height={214} />
          </div>

          <form onSubmit={handleSubmit} className="d-flex flex-column">
            {mode === 'signup' && (
              <div className="auth-field">
                <label className="auth-label" htmlFor="auth-name">
                  Full name
                </label>
                <input
                  id="auth-name"
                  type="text"
                  className="form-control auth-input text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  placeholder="Your name"
                />
              </div>
            )}
            <div className="auth-field">
              <label className="auth-label" htmlFor="auth-email">
                Email
              </label>
              <input
                id="auth-email"
                type="email"
                className="form-control auth-input text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
              />
            </div>
            {mode !== 'forgot' && (
              <div className="auth-field">
                <label className="auth-label" htmlFor="auth-password">
                  Password
                </label>
                <input
                  id="auth-password"
                  type="password"
                  className="form-control auth-input text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  placeholder="••••••••"
                />
              </div>
            )}
            {mode === 'signup' && (
              <div className="auth-field">
                <label className="auth-label" htmlFor="auth-confirm">
                  Confirm password
                </label>
                <input
                  id="auth-confirm"
                  type="password"
                  className="form-control auth-input text-white"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="Repeat password"
                />
              </div>
            )}
            {mode === 'signup' && (
              <div className="auth-field">
                <label className="auth-label" htmlFor="auth-role">
                  Role
                </label>
                <select
                  id="auth-role"
                  className="form-select auth-select text-white"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="student">Student</option>
                  <option value="coach">Coach</option>
                  <option value="artist">Artist</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            )}

            <button type="submit" className="ap-btn ap-btn-primary auth-submit" disabled={busy}>
              {busy
                ? 'Please wait…'
                : mode === 'login'
                  ? 'Continue'
                  : mode === 'signup'
                    ? 'Create account'
                    : 'Send reset link'}
            </button>
          </form>

          <div className="auth-tabs auth-tabs--below" role="tablist" aria-label="Authentication mode">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'login'}
              className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
              onClick={() => {
                setMode('login');
                setError(null);
                setMessage(null);
              }}
            >
              <i className="ri-login-circle-line me-1" aria-hidden />
              Login
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'signup'}
              className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
              onClick={() => {
                setMode('signup');
                setError(null);
                setMessage(null);
              }}
            >
              <i className="ri-user-add-line me-1" aria-hidden />
              Sign up
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'forgot'}
              className={`auth-tab ${mode === 'forgot' ? 'active' : ''}`}
              onClick={() => {
                setMode('forgot');
                setError(null);
                setMessage(null);
              }}
            >
              <i className="ri-lock-password-line me-1" aria-hidden />
              Forgot
            </button>
          </div>

          {error && (
            <p className="auth-msg mb-0" role="alert">
              {error}
            </p>
          )}
          {message && (
            <p className="auth-msg auth-msg--ok mb-0" role="status">
              {message}
            </p>
          )}

          <div className="auth-foot">
            <div>
              Quick links:{' '}
              <Link to="/admin">Admin</Link>
              {' · '}
              <Link to="/coach">Coach</Link>
              {' · '}
              <Link to="/artist">Artist</Link>
              {' · '}
              <Link to="/student">Student</Link>
              {' · '}
              <Link to="/money">Money</Link>
            </div>
            <div className="auth-demo">
              Demo: <code>student@wearemusic.local</code> / <code>demo1234</code>
              <span className="d-block mt-1" style={{ opacity: 0.85 }}>
                Same password for all seeded demo accounts.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
