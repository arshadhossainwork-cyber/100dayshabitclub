import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import styles from './ToolPage.module.css';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Daily Consistency Calculator',
  description:
    'Calculate your daily consistency percentage, see which benchmark bracket you fall into, and understand your average missed days per week.',
  url: 'https://www.100dayshabitclub.xyz/tools/daily-consistency-calculator',
  applicationCategory: 'UtilityApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

function getBracket(rate) {
  if (rate === 100) return 'Perfect';
  if (rate >= 90) return 'Excellent';
  if (rate >= 80) return 'Strong';
  if (rate >= 70) return 'Good';
  if (rate >= 60) return 'Developing';
  return 'Needs Work';
}

export default function DailyConsistencyCalculator() {
  useDocumentMeta({
    title: 'Daily Consistency Calculator — Measure Your Habit Rate',
    description:
      'Calculate your daily consistency percentage, see which benchmark bracket you fall into, and understand your average missed days per week.',
    path: '/tools/daily-consistency-calculator',
    schema: SCHEMA,
  });

  const [totalDays, setTotalDays] = useState('');
  const [daysCompleted, setDaysCompleted] = useState('');
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    const total = parseInt(totalDays, 10);
    const completed = parseInt(daysCompleted, 10);

    if (isNaN(total) || total < 1) newErrors.totalDays = 'Enter at least 1 day.';
    if (isNaN(completed) || completed < 0) newErrors.daysCompleted = 'Enter a number 0 or above.';
    if (!isNaN(total) && !isNaN(completed) && completed > total) {
      newErrors.daysCompleted = 'Completed days cannot exceed total days.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setResults(null);
      return;
    }
    setErrors({});

    const rate = Math.round((completed / total) * 100);
    const bracket = getBracket(rate);
    const missed = total - completed;
    const weeks = total / 7;
    const avgMissedPerWeek = weeks > 0 ? (missed / weeks).toFixed(1) : '0.0';

    let message;
    if (rate === 100) {
      message = 'Perfect consistency. You haven\'t missed a single day — that\'s extraordinary discipline.';
    } else if (rate >= 90) {
      message = 'Excellent consistency. You\'re showing up nearly every day. Small misses won\'t slow you down.';
    } else if (rate >= 80) {
      message = 'Strong consistency. You\'re building a real habit. Focus on reducing those missed days by one per week.';
    } else if (rate >= 70) {
      message = 'Good consistency. You\'re showing up more often than not. Try the "never miss twice" rule to level up.';
    } else if (rate >= 60) {
      message = 'You\'re developing the habit. Consider simplifying your daily action to make it easier to show up.';
    } else {
      message = 'Consistency needs work. Start with a smaller daily action you can\'t say no to — even 2 minutes counts.';
    }

    setResults({ rate, bracket, avgMissedPerWeek, message });
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
          { label: 'Daily Consistency Calculator' },
        ]} />

        <div className={styles.hero}>
          <h1 className={styles.pageTitle}>Daily Consistency Calculator</h1>
          <p className={styles.subtitle}>
            Measure how consistent you've been with your habit and see where you stand on the consistency scale.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="totalDays" className={styles.label}>Total Days Tracked</label>
            <input
              id="totalDays"
              type="number"
              className={styles.input}
              min="1"
              placeholder="e.g. 60"
              value={totalDays}
              onChange={(e) => setTotalDays(e.target.value)}
            />
            {errors.totalDays && <p className={styles.error}>{errors.totalDays}</p>}
          </div>

          <div className={styles.field}>
            <label htmlFor="daysCompleted" className={styles.label}>Days Completed</label>
            <input
              id="daysCompleted"
              type="number"
              className={styles.input}
              min="0"
              placeholder="e.g. 48"
              value={daysCompleted}
              onChange={(e) => setDaysCompleted(e.target.value)}
            />
            {errors.daysCompleted && <p className={styles.error}>{errors.daysCompleted}</p>}
          </div>

          <button type="submit" className={styles.submitBtn}>Calculate</button>
        </form>

        {results && (
          <div className={styles.results} aria-live="polite">
            <h2 className={styles.resultsTitle}>Your Results</h2>
            <div className={styles.resultGrid}>
              <div className={styles.resultCard}>
                <div className={styles.resultValue}>{results.rate}%</div>
                <div className={styles.resultLabel}>Consistency Rate</div>
              </div>
              <div className={styles.resultCard}>
                <div className={styles.resultValue}>{results.bracket}</div>
                <div className={styles.resultLabel}>Benchmark</div>
              </div>
              <div className={styles.resultCard}>
                <div className={styles.resultValue}>{results.avgMissedPerWeek}</div>
                <div className={styles.resultLabel}>Avg. Missed / Week</div>
              </div>
            </div>
            <div className={styles.message}>{results.message}</div>
          </div>
        )}

        <section className={styles.infoSection}>
          <h2 className={styles.infoTitle}>How It Works</h2>
          <p className={styles.prose}>
            Your consistency rate is the percentage of tracked days where you completed your habit. The benchmark brackets — from "Needs Work" to "Perfect" — help you understand where you stand. The average missed days per week gives you a tangible target: reduce it by even half a day per week and watch your consistency climb.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
