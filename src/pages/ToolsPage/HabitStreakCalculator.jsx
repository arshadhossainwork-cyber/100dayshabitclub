import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import styles from './ToolPage.module.css';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Habit Streak Calculator',
  description:
    'Calculate your habit streak completion rate, see how many days remain in your 100-day challenge, and get a motivational message based on your progress.',
  url: 'https://www.100dayshabitclub.xyz/tools/habit-streak-calculator',
  applicationCategory: 'UtilityApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function HabitStreakCalculator() {
  useDocumentMeta({
    title: 'Habit Streak Calculator — Track Your Streak',
    description:
      'Calculate your habit streak completion rate, see how many days remain in your 100-day challenge, and get a motivational message based on your progress.',
    path: '/tools/habit-streak-calculator',
    schema: SCHEMA,
  });

  const [daysCompleted, setDaysCompleted] = useState('');
  const [daysMissed, setDaysMissed] = useState('');
  const [currentStreak, setCurrentStreak] = useState('');
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    const completed = parseInt(daysCompleted, 10);
    const missed = parseInt(daysMissed, 10);
    const streak = parseInt(currentStreak, 10);

    if (isNaN(completed) || completed < 0) newErrors.daysCompleted = 'Enter a number 0 or above.';
    if (isNaN(missed) || missed < 0) newErrors.daysMissed = 'Enter a number 0 or above.';
    if (isNaN(streak) || streak < 0) newErrors.currentStreak = 'Enter a number 0 or above.';
    if (!isNaN(completed) && completed > 100) newErrors.daysCompleted = 'Cannot exceed 100 days.';
    if (!isNaN(streak) && !isNaN(completed) && streak > completed) {
      newErrors.currentStreak = 'Streak cannot exceed days completed.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setResults(null);
      return;
    }
    setErrors({});

    const totalAttempted = completed + missed;
    const completionRate = totalAttempted > 0 ? Math.round((completed / totalAttempted) * 100) : 0;
    const daysRemaining = Math.max(0, 100 - completed);

    let message;
    if (completed === 100) {
      message = 'You\'ve completed the 100-day challenge! Incredible commitment. What will you tackle next?';
    } else if (streak >= 30) {
      message = `${streak}-day streak! You're in the zone. This kind of momentum makes habits stick for life.`;
    } else if (streak >= 14) {
      message = `${streak}-day streak! Two weeks of consistency builds real neural pathways. Keep going.`;
    } else if (streak >= 7) {
      message = `${streak}-day streak! A full week shows serious intent. Push for two weeks next.`;
    } else if (streak >= 3) {
      message = `${streak}-day streak. You\'re building momentum. Focus on making it to 7 days.`;
    } else if (completed > 0) {
      message = 'Every day you show up counts. Focus on today\'s action and the streak will follow.';
    } else {
      message = 'Day one starts now. The hardest part is beginning — and you\'re already here.';
    }

    setResults({ completionRate, daysRemaining, streak, message });
  }

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <div className={styles.header}>
          <Link to="/tools" className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Tools
          </Link>
          <span className={styles.headerTitle}>
            <span className={styles.headerAccent}>100</span> Days
          </span>
        </div>

        <Breadcrumb items={[
          { label: 'Home', path: '/' },
          { label: 'Tools', path: '/tools' },
          { label: 'Habit Streak Calculator' },
        ]} />

        <div className={styles.hero}>
          <h1 className={styles.pageTitle}>Habit Streak Calculator</h1>
          <p className={styles.subtitle}>
            See your completion rate, how many days remain, and get a motivational boost based on your current streak.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="daysCompleted" className={styles.label}>Days Completed</label>
            <input
              id="daysCompleted"
              type="number"
              className={styles.input}
              min="0"
              max="100"
              placeholder="e.g. 45"
              value={daysCompleted}
              onChange={(e) => setDaysCompleted(e.target.value)}
            />
            {errors.daysCompleted && <p className={styles.error}>{errors.daysCompleted}</p>}
          </div>

          <div className={styles.field}>
            <label htmlFor="daysMissed" className={styles.label}>Days Missed</label>
            <input
              id="daysMissed"
              type="number"
              className={styles.input}
              min="0"
              placeholder="e.g. 5"
              value={daysMissed}
              onChange={(e) => setDaysMissed(e.target.value)}
            />
            {errors.daysMissed && <p className={styles.error}>{errors.daysMissed}</p>}
          </div>

          <div className={styles.field}>
            <label htmlFor="currentStreak" className={styles.label}>Current Streak (days in a row)</label>
            <input
              id="currentStreak"
              type="number"
              className={styles.input}
              min="0"
              placeholder="e.g. 12"
              value={currentStreak}
              onChange={(e) => setCurrentStreak(e.target.value)}
            />
            {errors.currentStreak && <p className={styles.error}>{errors.currentStreak}</p>}
          </div>

          <button type="submit" className={styles.submitBtn}>Calculate</button>
        </form>

        {results && (
          <div className={styles.results} aria-live="polite">
            <h2 className={styles.resultsTitle}>Your Results</h2>
            <div className={styles.resultGrid}>
              <div className={styles.resultCard}>
                <div className={styles.resultValue}>{results.completionRate}%</div>
                <div className={styles.resultLabel}>Completion Rate</div>
              </div>
              <div className={styles.resultCard}>
                <div className={styles.resultValue}>{results.daysRemaining}</div>
                <div className={styles.resultLabel}>Days Remaining</div>
              </div>
              <div className={styles.resultCard}>
                <div className={styles.resultValue}>{results.streak}</div>
                <div className={styles.resultLabel}>Current Streak</div>
              </div>
            </div>
            <div className={styles.message}>{results.message}</div>
          </div>
        )}

        <section className={styles.infoSection}>
          <h2 className={styles.infoTitle}>How It Works</h2>
          <p className={styles.prose}>
            Your completion rate is calculated from days completed versus total days attempted (completed + missed). Days remaining counts down from 100 to your completed total. The motivational message adapts to your current streak length — longer streaks mean you're building stronger neural pathways for lasting change.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
