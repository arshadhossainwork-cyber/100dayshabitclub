import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import styles from './ProtectedRoute.module.css';

export default function ProtectedRoute({ children }) {
  const { isSignedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className={styles.loading} aria-label="Loading">
        <div className={styles.spinner} />
      </div>
    );
  }
  if (!isSignedIn) return <Navigate to="/login" replace />;

  return children;
}
