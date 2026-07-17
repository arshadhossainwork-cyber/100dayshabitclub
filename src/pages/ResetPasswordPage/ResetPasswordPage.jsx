import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useToast } from '../../hooks/useToast.jsx';
import AuthLayout from '../AuthLayout/AuthLayout.jsx';
import styles from '../authStyles.module.css';

export default function ResetPasswordPage() {
  const { updatePassword, session } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const { error: err } = await updatePassword(password);
    setLoading(false);

    if (err) {
      setError(err.message);
    } else {
      showToast('Password updated', { type: 'success' });
      navigate('/');
    }
  }

  if (!session) {
    return (
      <AuthLayout
        title="Set New Password"
        subtitle="No active session found"
      >
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 'var(--space-lg)' }}>
          This link may have expired. Request a new password reset.
        </p>
        <div className={styles.footer}>
          <p>
            <Link to="/forgot-password" className={styles.link}>
              Request new reset link
            </Link>
          </p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Set New Password">
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="reset-password">New Password</label>
          <input
            id="reset-password"
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min 8 characters"
            required
            minLength={8}
            autoComplete="new-password"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="reset-confirm">Confirm Password</label>
          <input
            id="reset-confirm"
            className={styles.input}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat password"
            required
            autoComplete="new-password"
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </AuthLayout>
  );
}
