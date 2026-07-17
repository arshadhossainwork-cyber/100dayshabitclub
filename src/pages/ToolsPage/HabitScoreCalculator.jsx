import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import styles from './ToolPage.module.css';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Habit Score Calculator',
  description:
    'Calculate a weighted habit score from 0 to 100 based on your completion rate, current streak, and total days tracked. Receive a letter grade from A to F.',
  url: 'https://www.100dayshabitclub.xyz/tools/habit-score-calculator',
  applicationCategory: 'UtilityApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

function getGrade(score) {
  if (score >= 93) return 'A';
  if (score >= 85) return 'A-';
  if (score >= 78) return 'B+';
  if (score >= 70) return 'B';
  if (score >= 63) return 'B-';
  if (score >= 55) return 'C+';
  if (score >= 45) return 'C';
  if (score >= 35) return 'D';
  return 'F';
}

export default function HabitScoreCalculator() {
  useDocumentMeta({
    title: 'Habit Score Calculator — Rate Your Habit Performance',
    description:
      'Calculate a weighted habit score from 0 to 100 based on your completion rate, current streak, and total days tracked. Receive a letter grade from A to F.',
    path: '/tools/habit-score-calculator',
    schema: SCHEMA,
  });

  const [daysCompleted, setDaysCompleted] = useState('');
  const [totalTracked, setTotalTracked] = useState('');
  const [currentStreak, setCurrentStreak] = useState('');
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    const completed = parseInt(daysCompleted, 10);
    const total = parseInt(totalTracked, 10);
    const streak = parseInt(currentStreak, 10);

    if (isNaN(completed) || completed < 0) newErrors.daysCompleted = 'Enter a number 0 or above.';
    if (isNaN(total) || total < 1) newErrors.totalTracked = 'Enter at least 1 day.';
    if (isNaN(streak) || streak < 0) newErrors.currentStreak = 'Enter a number 0 or above.';
    if (!isNaN(completed) && !isNaN(total) && completed > total) {
      newErrors.daysCompleted = 'Completed days cannot exceed total tracked.';
    }
    if (!isNaN(streak) && !isNaN(completed) && streak > completed) {
      newErrors.currentStreak = 'Streak cannot exceed days completed.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setResults(null);
      return;
    }
    setErrors({});

    const completionRate = total > 0 ? (completed / total) * 100 : 0;
    const streakRatio = total > 0 ? (streak / total) * 100 : 0;
    const volumeRatio = (completed / 100) * 100; // how far toward 100 days

    const score = Math.round(
      completionRate * 0.5 + streakRatio * 0.3 + volumeRatio * 0.2
    );
    const clampedScore = Math.min(100, Math.max(0, score));
    const grade = getGrade(clampedScore);

    const completionPart = Math.round(completionRate * 0.5);
    const streakPart = Math.round(streakRatio * 0.3);
    const volumePart = Math.round(volumeRatio * 0.2);

    let message;
    if (grade === 'A' || grade === 'A-') {
      message = 'Outstanding performance. You\'re building habits that last. Keep this standard.';
    } else if (grade.startsWith('B')) {
      message = 'Solid work. Focus on extending your streak to push into A territory.';
    } else if (grade.startsWith('C')) {
      message = 'You\'re making progress. Reducing missed days will have the biggest impact on your score.';
    } else {
      message = 'Room for growth. Start with a smaller daily action and build consistency first.';
    }

    setResults({
      score: clampedScore,
      grade,
      completionPart,
      streakPart,
      volumePart,
      message,
    });
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
          { label: 'Habit Score Calculator' },
        ]} />

        <div className={styles.hero}>
          <h1 className={styles.pageTitle}>Habit Score Calculator</h1>
          <p className={styles.subtitle}>
            Get a weighted score and letter grade based on your completion rate, streak consistency, and total volume.
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
              placeholder="e.g. 42"
              value={daysCompleted}
              onChange={(e) => setDaysCompleted(e.target.value)}
            />
            {errors.daysCompleted && <p className={styles.error}>{errors.daysCompleted}</p>}
          </div>

          <div className={styles.field}>
            <label htmlFor="totalTracked" className={styles.label}>Total Days Tracked</label>
            <input
              id="totalTracked"
              type="number"
              className={styles.input}
              min="1"
              placeholder="e.g. 50"
              value={totalTracked}
              onChange={(e) => setTotalTracked(e.target.value)}
            />
            {errors.totalTracked && <p className={styles.error}>{errors.totalTracked}</p>}
          </div>

          <div className={styles.field}>
            <label htmlFor="currentStreak" className={styles.label}>Current Streak (days in a row)</label>
            <input
              id="currentStreak"
              type="number"
              className={styles.input}
              min="0"
              placeholder="e.g. 10"
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
                <div className={styles.resultValue}>{results.score}</div>
                <div className={styles.resultLabel}>Habit Score</div>
              </div>
              <div className={styles.resultCard}>
                <div className={styles.resultValue}>{results.grade}</div>
                <div className={styles.resultLabel}>Letter Grade</div>
              </div>
            </div>

            <div className={styles.resultGrid}>
              <div className={styles.resultCard}>
                <div className={styles.resultValue}>{results.completionPart}</div>
                <div className={styles.resultLabel}>Completion (50%)</div>
              </div>
              <div className={styles.resultCard}>
                <div className={styles.resultValue}>{results.streakPart}</div>
                <div className={styles.resultLabel}>Streak (30%)</div>
              </div>
              <div className={styles.resultCard}>
                <div className={styles.resultValue}>{results.volumePart}</div>
                <div className={styles.resultLabel}>Volume (20%)</div>
              </div>
            </div>

            <div className={styles.message}>{results.message}</div>
          </div>
        )}

        <section className={styles.infoSection}>
          <h2 className={styles.infoTitle}>How Scoring Works</h2>
          <p className={styles.prose}>
            Your habit score combines three factors: completion rate (50% weight) measures how often you show up, streak ratio (30% weight) rewards consecutive consistency, and volume ratio (20% weight) tracks progress toward the 100-day goal. Grades range from A (93+) to F (below 35). Focus on improving your weakest component for the fastest score gains.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
