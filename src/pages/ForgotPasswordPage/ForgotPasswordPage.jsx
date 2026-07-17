import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import AuthLayout from '../AuthLayout/AuthLayout.jsx';
import styles from '../authStyles.module.css';

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    const { error: err } = await resetPassword(email);
    setLoading(false);

    if (err) {
      setError(err.message);
    } else {
      setSuccess(true);
    }
  }

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your email and we'll send you a reset link"
    >
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="forgot-email">Email</label>
          <input
            id="forgot-email"
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}
        {success && (
          <p className={styles.success}>
            Check your email for a reset link
          </p>
        )}

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>

      <div className={styles.footer}>
        <p>
          <Link to="/login" className={styles.link}>Back to sign in</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
