import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { loadPromptState, dismissPrompt } from '../../utils/prompts.js';
import styles from './AccountPrompt.module.css';

export default function AccountPrompt({ habitCount, maxStreak }) {
  const { isSignedIn, isSupabaseConfigured } = useAuth();
  const [promptState, setPromptState] = useState(loadPromptState);

  const handleDismiss = useCallback((key) => {
    dismissPrompt(key);
    setPromptState((prev) => ({ ...prev, [key]: true }));
  }, []);

  if (isSignedIn || !isSupabaseConfigured) return null;

  let promptKey = null;
  let message = null;

  if (habitCount >= 1 && !promptState.firstHabit) {
    promptKey = 'firstHabit';
    message = 'Create a free account to protect your progress across devices.';
  } else if (habitCount >= 2 && !promptState.secondHabit) {
    promptKey = 'secondHabit';
    message = "You're building momentum! Sign up to never lose your streaks.";
  } else if (maxStreak >= 3 && !promptState.streak) {
    promptKey = 'streak';
    message = '3-day streak! Create an account to keep your progress safe.';
  }

  if (!promptKey) return null;

  return (
    <div className={styles.banner}>
      <span className={styles.icon} aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      </span>
      <span className={styles.text}>{message}</span>
      <Link to="/signup" className={styles.signupLink}>Sign Up</Link>
      <button
        className={styles.dismissBtn}
        onClick={() => handleDismiss(promptKey)}
        aria-label="Dismiss"
      >
        &times;
      </button>
    </div>
  );
}
