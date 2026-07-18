import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useToast } from '../../hooks/useToast.jsx';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import AuthLayout from '../AuthLayout/AuthLayout.jsx';
import PrivacyPolicy from '../../components/PrivacyPolicy/PrivacyPolicy.jsx';
import styles from '../authStyles.module.css';

export default function SignupPage() {
  useDocumentMeta({
    title: 'Create Account',
    description: 'Create a free account to protect your streaks and sync across devices.',
    path: '/signup',
  });
  const { signUp, signInWithGoogle, isSignedIn } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  useEffect(() => {
    if (isSignedIn) navigate('/', { replace: true });
  }, [isSignedIn, navigate]);

  function validate() {
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!agreed) {
      setError('You must agree to the Privacy Policy');
      return false;
    }
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!validate()) return;

    setLoading(true);
    const { error: err } = await signUp(email, password, {
      display_name: name,
    });
    setLoading(false);

    if (err) {
      setError(err.message);
    } else {
      showToast('Account created successfully!', { type: 'success' });
      navigate('/');
    }
  }

  async function handleGoogle() {
    const { error: err } = await signInWithGoogle();
    if (err) setError(err.message);
  }

  return (
    <>
    <AuthLayout
      title="Protect your streaks"
      subtitle="Create a free account to sync your habits, keep your progress safe, and continue on another device."
    >
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="signup-name">Name</label>
          <input
            id="signup-name"
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
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
          <label className={styles.label} htmlFor="signup-confirm">Confirm Password</label>
          <input
            id="signup-confirm"
            className={styles.input}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat password"
            required
            autoComplete="new-password"
          />
        </div>

        <div className={styles.checkboxRow}>
          <input
            id="signup-agree"
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label htmlFor="signup-agree">
            I agree to the{' '}
            <button
              type="button"
              className={styles.link}
              onClick={() => setPrivacyOpen(true)}
            >
              Privacy Policy
            </button>
          </label>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <div className={styles.footer}>
        <p>
          Already have an account?{' '}
          <Link to="/login" className={styles.link}>Sign in</Link>
        </p>
        <p>
          <Link to="/" className={styles.link}>Continue as guest</Link>
        </p>
      </div>
    </AuthLayout>
    <PrivacyPolicy open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.0 24.0 0 0 0 0 21.56l7.98-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}
