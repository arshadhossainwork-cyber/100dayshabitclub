import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import styles from './GuidesPage.module.css';

const GUIDES = [
  {
    id: 'getting-started',
    emoji: '🚀',
    title: 'Getting Started with 100 Days Habit Club',
    sections: [
      {
        heading: 'Step 1: Choose one habit',
        content:
          'Browse our habit library or create your own. The most important thing is to start with a single habit. Research shows that focusing on one behavior change at a time produces significantly higher success rates than trying to change several things at once.',
      },
      {
        heading: 'Step 2: Set your intention',
        content:
          'Be specific about what the habit looks like. "Exercise" is vague. "Walk for 20 minutes after lunch" is a plan. Specify the behavior, the time, and the trigger that will remind you to do it.',
      },
      {
        heading: 'Step 3: Start tracking',
        content:
          'Tap the "+" button, name your habit, and check in each day. The app records your completed days, streaks, and overall progress. Don\'t worry about being perfect — the tracker is designed for consistency, not perfection.',
      },
      {
        heading: 'Step 4: Use the grid as motivation',
        content:
          'Watch your 10×10 grid fill up square by square. Each filled square represents a day you showed up. After 20–30 filled squares, the visual progress creates its own momentum — you won\'t want to leave a square empty.',
      },
    ],
  },
  {
    id: 'choosing-habit',
    emoji: '🎯',
    title: 'How to Choose the Right Habit',
    sections: [
      {
        heading: 'Start smaller than you think',
        content:
          'The most common mistake is choosing a habit that\'s too ambitious. "Meditate for 10 minutes" has a much higher success rate than "Meditate for 45 minutes." You can always increase the duration after the habit is established. The goal for the first 100 days is consistency, not intensity.',
      },
      {
        heading: 'Choose something you control',
        content:
          'Pick a habit where success depends only on you. "Get promoted" isn\'t a habit — it\'s an outcome you can\'t fully control. "Do 90 minutes of deep work daily" is a habit — you control whether it happens. Focus on actions, not results.',
      },
      {
        heading: 'Tie it to your identity',
        content:
          'The habits that stick are the ones that align with who you want to become. Don\'t just "try reading" — decide you want to be a reader. Don\'t just "attempt meditation" — commit to becoming someone who meditates. Identity drives behavior more than willpower.',
      },
      {
        heading: 'Pick something you enjoy (or can learn to)',
        content:
          'If you hate running, don\'t pick running. Choose a form of exercise you actually like. Dread kills habits faster than anything else. It\'s okay to experiment during the first few days to find the right fit.',
      },
    ],
  },
  {
    id: 'missing-days',
    emoji: '💪',
    title: 'What to Do When You Miss a Day',
    sections: [
      {
        heading: 'Don\'t break two in a row',
        content:
          'Missing one day is normal and expected. Missing two days starts a pattern. If you miss Monday, make Tuesday non-negotiable. This "never miss twice" rule is the single most important principle for long-term habit maintenance.',
      },
      {
        heading: 'Understand why you missed',
        content:
          'Was it a scheduling conflict? Low energy? Lost motivation? Forgot? Each cause has a different solution. Scheduling conflicts need a backup plan. Low energy means you might be doing too much. Forgetting means you need a better trigger. Diagnose before you prescribe.',
      },
      {
        heading: 'Lower the bar temporarily',
        content:
          'On hard days, do the minimum viable version of your habit. If you normally run for 20 minutes, walk for 5. If you normally write 500 words, write 50. The goal is to maintain the daily rhythm, even if the effort is smaller. Showing up matters more than performing.',
      },
      {
        heading: 'Remember: it\'s total days, not consecutive days',
        content:
          '100 Days Habit Club tracks total completed days, not streaks. A missed day leaves one unfilled square among many filled ones. You haven\'t "failed" — you\'ve completed 43 out of 44 possible days. That\'s a 98% success rate. Keep going.',
      },
    ],
  },
  {
    id: 'stacking',
    emoji: '📚',
    title: 'Habit Stacking: Building Multiple Habits',
    sections: [
      {
        heading: 'What is habit stacking?',
        content:
          'Habit stacking means attaching a new habit to an existing one. "After I pour my morning coffee, I will meditate for 10 minutes." The existing habit (coffee) becomes the trigger for the new habit (meditation). This technique, popularized by James Clear, leverages neural pathways you\'ve already built.',
      },
      {
        heading: 'Morning stack example',
        content:
          'Wake up → Drink water → 10 minutes meditation → 15 minutes reading → Plan the day. Each habit triggers the next. After a few weeks, the entire sequence runs almost on autopilot. Track each component separately in the app so you can see which parts are consistent and which need work.',
      },
      {
        heading: 'When to add a second habit',
        content:
          'Wait until your first habit feels automatic — usually around day 30–40. If checking in still requires willpower and reminder, it\'s too early to add another habit. When the first habit happens without thinking about it, that\'s when you have bandwidth for a second.',
      },
      {
        heading: 'Don\'t stack too high',
        content:
          'Three concurrent habits is the practical maximum for most people. More than that and the cognitive load of tracking and maintaining them creates stress rather than reducing it. Quality over quantity.',
      },
    ],
  },
  {
    id: 'after-100-days',
    emoji: '🎉',
    title: 'What to Do After 100 Days',
    sections: [
      {
        heading: 'Celebrate',
        content:
          'Completing 100 days of a habit is a significant achievement. Take a moment to acknowledge what you\'ve done. Share your completed grid. Review your journey from day 1 to day 100. This isn\'t vanity — celebration reinforces the neural pathways that made the habit possible.',
      },
      {
        heading: 'Option 1: Continue the habit',
        content:
          'If the habit is adding value to your life, keep going. You don\'t need the tracker anymore — the behavior should be fairly automatic at this point. But many people enjoy the visual tracking and continue using the app indefinitely.',
      },
      {
        heading: 'Option 2: Start a new 100-day challenge',
        content:
          'Archive the completed habit and begin a new one. You\'ve proven you can build a habit over 100 days — now apply that same discipline to a different area of your life. Many users cycle through multiple 100-day challenges over a year.',
      },
      {
        heading: 'Option 3: Level up the existing habit',
        content:
          'Increase the difficulty. If you meditated for 10 minutes, try 20. If you ran for 20 minutes, train for a 5K. Start a new 100-day tracker for the upgraded version. You\'re not starting over — you\'re building on a foundation.',
      },
    ],
  },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Habit Building Guides — 100 Days Habit Club',
  description:
    'Practical guides for building habits that last. Learn how to choose the right habit, what to do when you miss a day, and how to stack multiple habits.',
  url: 'https://www.100dayshabitclub.xyz/guides',
};

export default function GuidesPage() {
  useDocumentMeta({
    title: 'Habit Building Guides',
    description:
      'Practical guides for building habits that last. Learn how to choose the right habit, what to do when you miss a day, and how to stack multiple habits.',
    path: '/guides',
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

        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Guides' }]} />

        <div className={styles.hero}>
          <h1 className={styles.pageTitle}>Habit Building Guides</h1>
          <p className={styles.subtitle}>
            Practical advice for every stage of the 100-day journey. From choosing your first habit to building a morning routine that sticks.
          </p>
        </div>

        {/* Table of contents */}
        <nav className={styles.toc} aria-label="Guides">
          <div className={styles.tocLabel}>On this page</div>
          <ol className={styles.tocList}>
            {GUIDES.map((guide) => (
              <li key={guide.id}>
                <a href={`#${guide.id}`} className={styles.tocLink}>
                  <span className={styles.tocEmoji}>{guide.emoji}</span>
                  {guide.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {GUIDES.map((guide) => (
          <article key={guide.id} id={guide.id} className={styles.guide}>
            <h2 className={styles.guideTitle}>
              <span className={styles.guideEmoji}>{guide.emoji}</span>
              {guide.title}
            </h2>
            {guide.sections.map((sec, i) => (
              <div key={i} className={styles.guideSection}>
                <h3 className={styles.guideSectionTitle}>{sec.heading}</h3>
                <p className={styles.prose}>{sec.content}</p>
              </div>
            ))}
          </article>
        ))}

        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Put these guides into practice</h2>
          <p className={styles.ctaBody}>
            Pick a habit, start tracking, and come back to these guides whenever you need a reset.
          </p>
          <div className={styles.ctaLinks}>
            <Link to="/habits" className={styles.ctaBtn}>Browse Habits</Link>
            <Link to="/challenges" className={styles.ctaBtnSecondary}>View Challenges</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
