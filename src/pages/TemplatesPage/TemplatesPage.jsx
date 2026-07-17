import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import styles from './TemplatesPage.module.css';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Free Habit Tracking Templates & Worksheets',
  description:
    'Free printable habit tracking templates: 100-day grids, weekly review worksheets, habit stacking planners, morning routine checklists, and more. Print directly from your browser.',
  url: 'https://www.100dayshabitclub.xyz/templates',
};

const TEMPLATES = [
  {
    name: '100-Day Tracking Grid',
    emoji: '\u{1F4CA}',
    description:
      'A 10\u00D710 printable grid to mark off each day of your 100-day challenge. Simple, visual, and satisfying to fill in. The same grid used in the app, optimized for print.',
    format: 'Interactive / Print',
    link: '/tools/printable-habit-tracker',
    linkText: 'Generate & Print',
    inline: false,
  },
  {
    name: 'Weekly Habit Review Worksheet',
    emoji: '\u{1F4DD}',
    description:
      'A structured weekly review template with sections for wins, obstacles, adjustments, and next week\'s focus. Use this every Sunday to reflect on your progress and plan ahead.',
    format: 'Print',
    linkText: 'Print This Template',
    inline: true,
    id: 'weekly-review',
  },
  {
    name: 'Habit Stacking Planner',
    emoji: '\u{1F517}',
    description:
      'Plan your habit stacks using the "After I [current habit], I will [new habit]" formula. Space for 10 habit stack sequences with trigger, behavior, and reward columns.',
    format: 'Print',
    linkText: 'Print This Template',
    inline: true,
    id: 'habit-stacking',
  },
  {
    name: 'Morning Routine Checklist',
    emoji: '\u{1F305}',
    description:
      'A daily morning routine checklist with 8 customizable slots, time estimates, and a notes section. Print multiple copies and keep them on your nightstand.',
    format: 'Print',
    linkText: 'Print This Template',
    inline: true,
    id: 'morning-routine',
  },
  {
    name: '30-Day Starter Grid',
    emoji: '\u{1F4C5}',
    description:
      'A simplified 5\u00D76 grid for 30-day habit challenges. Perfect for beginners who want to build confidence before committing to the full 100 days.',
    format: 'Print',
    linkText: 'Print This Template',
    inline: true,
    id: 'starter-grid',
  },
  {
    name: 'Habit Score Tracker',
    emoji: '\u{1F3AF}',
    description:
      'Track your daily habit score over time using our interactive calculator. Enter your data and visualize your consistency trends with charts and percentages.',
    format: 'Interactive',
    link: '/tools/habit-score-calculator',
    linkText: 'Open Calculator',
    inline: false,
  },
];

export default function TemplatesPage() {
  useDocumentMeta({
    title: 'Free Habit Tracking Templates & Worksheets',
    description:
      'Free printable habit tracking templates: 100-day grids, weekly review worksheets, habit stacking planners, morning routine checklists, and more. Print directly from your browser.',
    path: '/templates',
    schema: SCHEMA,
  });

  const printRefs = useRef({});

  function handlePrint(templateId) {
    const el = printRefs.current[templateId];
    if (!el) return;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html><head><title>Print Template</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 40px; color: #1a1a1a; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ccc; padding: 10px 12px; text-align: left; }
        th { background: #f5f5f5; font-weight: 600; }
        h1 { font-size: 1.3rem; margin-bottom: 4px; }
        h2 { font-size: 1.1rem; margin-top: 24px; margin-bottom: 8px; }
        p { color: #555; font-size: 0.9rem; margin-bottom: 16px; }
        .grid { display: grid; gap: 2px; }
        .grid-cell { border: 1px solid #ccc; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: #999; }
        .notes-lines { border-bottom: 1px solid #ddd; height: 28px; margin-bottom: 4px; }
      </style></head><body>
      ${el.innerHTML}
      </body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  }

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <div className={styles.header}>
          <Link to="/" className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          <span className={styles.headerTitle}>
            <span className={styles.headerAccent}>100</span> Days
          </span>
        </div>

        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Templates' }]} />

        <h1 className={styles.pageTitle}>Free Habit Tracking Templates</h1>
        <p className={styles.subtitle}>
          Printable worksheets and planning tools to support your 100-day habit journey. Print directly from your browser — no download or signup required.
        </p>

        <div className={styles.templateCards}>
          {TEMPLATES.map((t) => (
            <div key={t.name} className={styles.templateCard}>
              <span className={styles.templateEmoji}>{t.emoji}</span>
              <h2 className={styles.templateName}>{t.name}</h2>
              <p className={styles.templateFormat}>Format: {t.format}</p>
              <p className={styles.templateDesc}>{t.description}</p>
              {!t.inline && t.link && (
                <Link to={t.link} className={styles.templateLink}>{t.linkText} &rarr;</Link>
              )}
              {t.inline && (
                <button className={styles.printBtn} onClick={() => handlePrint(t.id)}>{t.linkText}</button>
              )}
            </div>
          ))}
        </div>

        {/* Printable template sections (hidden on screen, used for print content extraction) */}

        <div className={styles.printableTemplate} ref={(el) => { printRefs.current['weekly-review'] = el; }}>
          <h1>Weekly Habit Review</h1>
          <p>Week of: _____________</p>
          <table>
            <thead>
              <tr><th>Question</th><th>Your Response</th></tr>
            </thead>
            <tbody>
              <tr><td>What habit am I tracking?</td><td></td></tr>
              <tr><td>Days completed this week (/ 7)</td><td></td></tr>
              <tr><td>Biggest win this week</td><td></td></tr>
              <tr><td>Biggest obstacle this week</td><td></td></tr>
              <tr><td>What will I adjust next week?</td><td></td></tr>
              <tr><td>Current streak length</td><td></td></tr>
              <tr><td>Overall consistency (%)</td><td></td></tr>
              <tr><td>One word for this week</td><td></td></tr>
            </tbody>
          </table>
          <h2>Notes</h2>
          <div className="notes-lines"></div>
          <div className="notes-lines"></div>
          <div className="notes-lines"></div>
          <div className="notes-lines"></div>
          <div className="notes-lines"></div>
        </div>

        <div className={styles.printableTemplate} ref={(el) => { printRefs.current['habit-stacking'] = el; }}>
          <h1>Habit Stacking Planner</h1>
          <p>Use the formula: &quot;After I [CURRENT HABIT], I will [NEW HABIT]&quot;</p>
          <table>
            <thead>
              <tr><th>#</th><th>After I...</th><th>I will...</th><th>Reward</th></tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }, (_, i) => (
                <tr key={i}><td>{i + 1}</td><td></td><td></td><td></td></tr>
              ))}
            </tbody>
          </table>
          <h2>My Top 3 Habit Stacks</h2>
          <p>1. _______________________________________________</p>
          <p>2. _______________________________________________</p>
          <p>3. _______________________________________________</p>
        </div>

        <div className={styles.printableTemplate} ref={(el) => { printRefs.current['morning-routine'] = el; }}>
          <h1>Morning Routine Checklist</h1>
          <p>Date: _____________</p>
          <table>
            <thead>
              <tr><th>&#10003;</th><th>Activity</th><th>Time</th><th>Duration</th></tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }, (_, i) => (
                <tr key={i}><td>&#9744;</td><td>________________</td><td>____</td><td>____</td></tr>
              ))}
            </tbody>
          </table>
          <h2>Today&apos;s Intention</h2>
          <div className="notes-lines"></div>
          <div className="notes-lines"></div>
          <h2>Evening Reflection</h2>
          <p>What went well? ___________________________________</p>
          <p>What to adjust? ___________________________________</p>
        </div>

        <div className={styles.printableTemplate} ref={(el) => { printRefs.current['starter-grid'] = el; }}>
          <h1>30-Day Starter Grid</h1>
          <p>Habit: _________________ | Start Date: _____________</p>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
            {Array.from({ length: 30 }, (_, i) => (
              <div key={i} className="grid-cell">{i + 1}</div>
            ))}
          </div>
          <p style={{ marginTop: '16px', fontSize: '0.85rem' }}>Consistency target: 80% (24 out of 30 days)</p>
        </div>

        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>More Tools for Your Journey</h2>
          <p className={styles.ctaBody}>Explore interactive calculators and trackers, or find a challenge to commit to.</p>
          <div className={styles.ctaLinks}>
            <Link to="/tools" className={styles.ctaBtn}>Browse Tools</Link>
            <Link to="/challenges" className={styles.ctaBtnSecondary}>Find a Challenge</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
