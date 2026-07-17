import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import styles from './ToolPage.module.css';
import printStyles from './PrintableHabitTracker.module.css';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Printable Habit Tracker',
  description:
    'Create a printable 100-day habit tracking grid. Enter your habit name, generate the 10x10 grid, and print it to hang on your wall or keep at your desk.',
  url: 'https://www.100dayshabitclub.xyz/tools/printable-habit-tracker',
  applicationCategory: 'UtilityApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

const GRID = Array.from({ length: 100 }, (_, i) => i + 1);

export default function PrintableHabitTracker() {
  useDocumentMeta({
    title: 'Printable Habit Tracker — 100-Day Grid',
    description:
      'Create a printable 100-day habit tracking grid. Enter your habit name, generate the 10x10 grid, and print it to hang on your wall or keep at your desk.',
    path: '/tools/printable-habit-tracker',
    schema: SCHEMA,
  });

  const [habitName, setHabitName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [showGrid, setShowGrid] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setShowGrid(true);
  }

  function handlePrint() {
    window.print();
  }

  const displayName = habitName.trim() || 'My 100-Day Habit';
  const displayDate = startDate
    ? new Date(startDate + 'T00:00:00').toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

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
          { label: 'Printable Habit Tracker' },
        ]} />

        <div className={styles.hero}>
          <h1 className={styles.pageTitle}>Printable Habit Tracker</h1>
          <p className={styles.subtitle}>
            Generate a 10x10 grid you can print and check off each day of your 100-day challenge.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="habitName" className={styles.label}>Habit Name</label>
            <input
              id="habitName"
              type="text"
              className={styles.input}
              placeholder="e.g. Morning Run"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="startDate" className={styles.label}>Start Date (optional)</label>
            <input
              id="startDate"
              type="date"
              className={styles.input}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <button type="submit" className={styles.submitBtn}>Generate Tracker</button>
        </form>

        {showGrid && (
          <div className={printStyles.printArea} aria-live="polite">
            <h2 className={printStyles.trackerTitle}>{displayName}</h2>
            <p className={printStyles.trackerSubtitle}>
              100-Day Challenge{displayDate ? ` — Started ${displayDate}` : ''}
            </p>

            <div className={printStyles.trackerGrid}>
              {GRID.map((day) => (
                <div key={day} className={printStyles.gridCell}>
                  {day}
                </div>
              ))}
            </div>

            <div className={printStyles.printBtnWrap}>
              <button type="button" className={printStyles.printBtn} onClick={handlePrint}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect x="6" y="14" width="12" height="8" />
                </svg>
                Print Tracker
              </button>
            </div>
          </div>
        )}

        <section className={styles.infoSection}>
          <h2 className={styles.infoTitle}>How to Use</h2>
          <p className={styles.prose}>
            Enter your habit name and optional start date, then click "Generate Tracker" to see your grid. Hit "Print Tracker" to print just the grid on a clean white page. Hang it on your wall, put it at your desk, or stick it on the fridge. Cross off each day as you complete it — watching the grid fill up is one of the most powerful visual motivators.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
