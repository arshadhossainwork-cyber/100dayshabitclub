import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import styles from './ToolPage.module.css';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Completion Date Calculator',
  description:
    'Enter your start date and days completed to see your projected finish date, days remaining, and overall progress percentage.',
  url: 'https://www.100dayshabitclub.xyz/tools/completion-date-calculator',
  applicationCategory: 'UtilityApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function CompletionDateCalculator() {
  useDocumentMeta({
    title: 'Completion Date Calculator — When Will You Finish?',
    description:
      'Enter your start date and days completed to see your projected finish date, days remaining, and overall progress percentage.',
    path: '/tools/completion-date-calculator',
    schema: SCHEMA,
  });

  const [startDate, setStartDate] = useState('');
  const [daysCompleted, setDaysCompleted] = useState('');
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    const completed = parseInt(daysCompleted, 10);

    if (!startDate) newErrors.startDate = 'Please enter a start date.';
    if (isNaN(completed) || completed < 0) newErrors.daysCompleted = 'Enter a number 0 or above.';
    if (completed > 100) newErrors.daysCompleted = 'Cannot exceed 100 days.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setResults(null);
      return;
    }
    setErrors({});

    const today = new Date();
    const daysRemaining = Math.max(0, 100 - completed);
    const completionDate = new Date(today);
    completionDate.setDate(completionDate.getDate() + daysRemaining);
    const progress = Math.round((completed / 100) * 100);

    let message;
    if (completed === 100) {
      message = 'You did it! All 100 days completed. Time to celebrate and choose your next challenge.';
    } else if (progress >= 75) {
      message = 'The finish line is in sight. Keep the momentum going — you\'re almost there.';
    } else if (progress >= 50) {
      message = 'Halfway and beyond. The hardest part is behind you. Stay consistent.';
    } else if (progress >= 25) {
      message = 'Great start. You\'re building real momentum. One day at a time.';
    } else {
      message = 'Every journey starts with day one. Stay focused on today\'s action.';
    }

    setResults({
      completionDate: formatDate(completionDate),
      daysRemaining,
      progress,
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
          { label: 'Completion Date Calculator' },
        ]} />

        <div className={styles.hero}>
          <h1 className={styles.pageTitle}>Completion Date Calculator</h1>
          <p className={styles.subtitle}>
            Find out exactly when you'll finish your 100-day challenge based on your progress so far.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="startDate" className={styles.label}>Start Date</label>
            <input
              id="startDate"
              type="date"
              className={styles.input}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            {errors.startDate && <p className={styles.error}>{errors.startDate}</p>}
          </div>

          <div className={styles.field}>
            <label htmlFor="daysCompleted" className={styles.label}>Days Completed</label>
            <input
              id="daysCompleted"
              type="number"
              className={styles.input}
              min="0"
              max="100"
              placeholder="e.g. 34"
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
                <div className={styles.resultValue}>{results.progress}%</div>
                <div className={styles.resultLabel}>Progress</div>
              </div>
              <div className={styles.resultCard}>
                <div className={styles.resultValue}>{results.daysRemaining}</div>
                <div className={styles.resultLabel}>Days Remaining</div>
              </div>
            </div>
            <div className={styles.resultCard} style={{ marginBottom: 'var(--space-md)' }}>
              <div className={styles.resultValue} style={{ fontSize: '1rem' }}>{results.completionDate}</div>
              <div className={styles.resultLabel}>Projected Finish Date</div>
            </div>
            <div className={styles.message}>{results.message}</div>
          </div>
        )}

        <section className={styles.infoSection}>
          <h2 className={styles.infoTitle}>How It Works</h2>
          <p className={styles.prose}>
            This calculator takes your days completed and adds the remaining days to today's date to project your finish date. The 100-day challenge counts completed days — not consecutive days — so missed days simply push your finish date further out. Use this tool weekly to stay aware of your timeline.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
