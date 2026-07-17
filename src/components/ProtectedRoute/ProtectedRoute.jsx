import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';

export default function ProtectedRoute({ children }) {
  const { isSignedIn, isLoading } = useAuth();

  if (isLoading) return null;
  if (!isSignedIn) return <Navigate to="/login" replace />;

  return children;
}
