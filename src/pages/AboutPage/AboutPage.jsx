import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import styles from './AboutPage.module.css';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About 100 Days Habit Club',
  description:
    'Learn about 100 Days Habit Club — a free, privacy-first habit tracker built on the principle that 100 days of consistency builds lasting change.',
  url: 'https://www.100dayshabitclub.xyz/about',
};

export default function AboutPage() {
  useDocumentMeta({
    title: 'About',
    description:
      'Learn about 100 Days Habit Club — a free, privacy-first habit tracker built on the principle that 100 days of consistency builds lasting change.',
    path: '/about',
    schema: SCHEMA,
  });

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

        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'About' }]} />
        <h1 className={styles.pageTitle}>About 100 Days Habit Club</h1>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The Idea</h2>
          <p className={styles.prose}>
            Most habit trackers are designed around streaks. Miss one day and your count resets to zero. That "all-or-nothing" design punishes normal human inconsistency and leads most people to quit entirely after the first miss.
          </p>
          <p className={styles.prose}>
            100 Days Habit Club is different. The app tracks <strong>total completed days</strong> out of 100, not consecutive days. Missing a day doesn't erase progress — it leaves one square unfilled among dozens of filled ones. The visual message is clear: you're mostly showing up, and that's what matters.
          </p>
          <p className={styles.prose}>
            The goal is simple: fill 100 squares. How you get there is up to you.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Principles</h2>
          <div className={styles.values}>
            <div className={styles.value}>
              <h3 className={styles.valueTitle}>Privacy First</h3>
              <p className={styles.prose}>
                Your data lives in your browser by default. No account required, no analytics on your personal habits, no data sold to third parties. If you create an account, your data syncs with end-to-end encryption and is protected by row-level security. You can delete everything at any time.
              </p>
            </div>
            <div className={styles.value}>
              <h3 className={styles.valueTitle}>Free Forever</h3>
              <p className={styles.prose}>
                There are no premium plans, no ads, no usage limits, and no "try free for 7 days" prompts. The core habit tracking experience is, and will remain, completely free. The app exists to help people build better habits, not to generate subscription revenue.
              </p>
            </div>
            <div className={styles.value}>
              <h3 className={styles.valueTitle}>Offline by Default</h3>
              <p className={styles.prose}>
                100 Days Habit Club is a Progressive Web App. Once you visit the site, it works fully offline — you can check in on a plane, in a remote cabin, or anywhere without signal. When connectivity returns, everything syncs automatically.
              </p>
            </div>
            <div className={styles.value}>
              <h3 className={styles.valueTitle}>Simplicity as a Feature</h3>
              <p className={styles.prose}>
                The app deliberately omits features that other trackers consider essential: reminders, social feeds, gamification mechanics, habit categories with AI suggestions. These features create engagement but not behavior change. A simple grid, a single tap, and visible progress — that's the core loop, and it works.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div>
                <h3 className={styles.stepTitle}>Pick a Habit</h3>
                <p className={styles.prose}>
                  Choose from our <Link to="/habits">library of 24 habits</Link> or create your own. Start with one — research shows focusing on a single change produces the best results.
                </p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div>
                <h3 className={styles.stepTitle}>Check In Daily</h3>
                <p className={styles.prose}>
                  One tap each day marks a square as complete. The check-in takes less than a second, but the act of conscious acknowledgment reinforces the behavior.
                </p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div>
                <h3 className={styles.stepTitle}>Watch the Grid Fill</h3>
                <p className={styles.prose}>
                  Your 10 &times; 10 grid fills up one square at a time. Streaks, completion percentage, and milestones are tracked automatically. After 100 completed days, you've earned a new habit.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Built With</h2>
          <p className={styles.prose}>
            React, Vite, Supabase, and Vercel. Designed as a Progressive Web App for offline use and installable on any device. Open source principles, privacy-first architecture.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Meet the Founder</h2>
          <p className={styles.prose}>
            100 Days Habit Club was created by <Link to="/authors/arshad-hossain">Arshad Hossain</Link>, a software developer and habit science enthusiast who wanted a privacy-first alternative to streak-based habit trackers. The app is built on the belief that consistency matters more than perfection, and that your data should belong to you.
          </p>
          <p className={styles.prose}>
            Read our <Link to="/editorial-policy">editorial policy</Link> to learn how content on this site is created, reviewed, and maintained.
          </p>
        </section>

        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Start your 100 days</h2>
          <p className={styles.ctaBody}>
            No account required. Pick a habit and start today.
          </p>
          <div className={styles.ctaLinks}>
            <Link to="/" className={styles.ctaBtn}>Start Tracking</Link>
            <Link to="/methodology" className={styles.ctaBtnSecondary}>Read the Science</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
