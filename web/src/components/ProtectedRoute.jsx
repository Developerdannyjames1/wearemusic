import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading…</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles?.length && !roles.includes(user.role)) {
    return (
      <div className="container py-5">
        <div className="p-4 wam-panel">
          <h1 className="h4 mb-2">Access denied</h1>
          <p className="text-secondary mb-0">This area is for {roles.join(' or ')} accounts.</p>
        </div>
      </div>
    );
  }

  return children;
}
