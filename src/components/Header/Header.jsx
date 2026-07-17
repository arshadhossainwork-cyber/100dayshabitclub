import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SyncIndicator from '../SyncIndicator/SyncIndicator.jsx';
import styles from './Header.module.css';

export default function Header({
  onAddClick,
  onSettingsClick,
  isLanding,
  isSignedIn,
  isSupabaseConfigured,
  userAvatarUrl,
  userName,
  syncState,
  syncError,
  syncConflicts,
  onSyncRetry,
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 100);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${isLanding ? styles.landing : ''}`}
    >
      <div className={styles.inner}>
        <Link to="/" className={styles.titleGroup} aria-label="Home">
          <div className={styles.logoMark} aria-hidden="true">
            <span /><span /><span /><span />
          </div>
          <h1 className={styles.title}>
            <span className={styles.titleAccent}>100</span> Days
          </h1>
        </Link>

        {isLanding && (
          <nav className={styles.nav} aria-label="Page navigation">
            <a href="#product-demo" className={styles.navLink}>Product</a>
            <a href="#popular-habits" className={styles.navLink}>Habits</a>
            <a href="#how-it-works" className={styles.navLink}>How it works</a>
          </nav>
        )}

        <div className={styles.actions}>
          {isSignedIn ? (
            <Link to="/profile" className={styles.avatarBtn} aria-label="Profile">
              {userAvatarUrl ? (
                <img src={userAvatarUrl} alt="" className={styles.avatarImg} />
              ) : (
                (userName || '?')[0].toUpperCase()
              )}
            </Link>
          ) : isSupabaseConfigured ? (
            <Link to="/login" className={styles.loginBtn}>Log in</Link>
          ) : null}
          {isSignedIn && (
            <SyncIndicator
              syncState={syncState}
              error={syncError}
              conflicts={syncConflicts}
              onRetry={onSyncRetry}
            />
          )}
          {!isLanding && (
            <Link to="/progress" className={styles.iconBtn} aria-label="Progress">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 20V10M12 20V4M6 20v-6" />
              </svg>
            </Link>
          )}
          <button
            className={styles.iconBtn}
            onClick={onSettingsClick}
            aria-label="Settings"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          </button>
          {(scrolled || !isLanding) && (
            <button
              className={styles.addBtn}
              onClick={onAddClick}
              aria-label="Add new habit"
            >
              {isLanding ? 'Start Tracking' : '+'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
