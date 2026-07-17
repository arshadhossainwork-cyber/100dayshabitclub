import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import {
  CHALLENGE_CATEGORIES,
  getAllChallenges,
  getChallengesByCategory,
} from '../../data/challenges/index.js';
import styles from './ChallengesPage.module.css';

const allChallenges = getAllChallenges();

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: '100-Day Challenges — Ready-Made Habit Challenges',
  description:
    'Choose a 100-day challenge and start building better habits today. Pre-built challenges for fitness, reading, mindfulness, writing, coding, and more.',
  url: 'https://www.100dayshabitclub.xyz/challenges',
  hasPart: allChallenges.map((ch) => ({
    '@type': 'WebPage',
    name: ch.name,
    url: `https://www.100dayshabitclub.xyz/challenges/${ch.slug}`,
  })),
};

export default function ChallengesPage() {
  useDocumentMeta({
    title: '100-Day Challenges — Ready-Made Habit Challenges',
    description:
      'Choose a 100-day challenge and start building better habits today. Pre-built challenges for fitness, reading, mindfulness, writing, coding, and more.',
    path: '/challenges',
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

        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Challenges' }]} />

        <div className={styles.hero}>
          <h1 className={styles.pageTitle}>100-Day Challenges</h1>
          <p className={styles.subtitle}>
            Pre-built challenges that combine the right habits into focused 100-day commitments. Pick a challenge, start today, and let the structure do the work.
          </p>
        </div>

        {CHALLENGE_CATEGORIES.map((cat) => {
          const challenges = getChallengesByCategory(cat.id);
          if (challenges.length === 0) return null;
          return (
            <div key={cat.id} className={styles.categorySection}>
              <h2 className={styles.categoryTitle}>
                <span>{cat.emoji}</span> {cat.name}
              </h2>
              <div className={styles.challengeList}>
                {challenges.map((ch) => (
                  <Link
                    key={ch.slug}
                    to={`/challenges/${ch.slug}`}
                    className={styles.challengeLink}
                  >
                    <article className={styles.challenge}>
                      <div className={styles.challengeHeader}>
                        <span className={styles.challengeEmoji}>{ch.emoji}</span>
                        <div>
                          <h3 className={styles.challengeName}>{ch.name}</h3>
                          <div className={styles.challengeMeta}>
                            <span className={styles.difficulty}>{ch.difficulty}</span>
                            <span className={styles.difficulty}>{ch.dailyTime}</span>
                          </div>
                        </div>
                      </div>
                      <p className={styles.challengeDesc}>{ch.tagline}</p>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        <section className={styles.howSection}>
          <h2 className={styles.howTitle}>How to Start a Challenge</h2>
          <div className={styles.howSteps}>
            <div className={styles.howStep}>
              <div className={styles.howNumber}>1</div>
              <div>
                <h3 className={styles.howStepTitle}>Choose Your Challenge</h3>
                <p className={styles.prose}>Pick the challenge that aligns with where you want to grow. Start with one — you can always start another after completing your first.</p>
              </div>
            </div>
            <div className={styles.howStep}>
              <div className={styles.howNumber}>2</div>
              <div>
                <h3 className={styles.howStepTitle}>Read the Full Guide</h3>
                <p className={styles.prose}>Click any challenge to see the complete 100-day plan with phases, milestones, tips, and a personalized assessment for your experience level.</p>
              </div>
            </div>
            <div className={styles.howStep}>
              <div className={styles.howNumber}>3</div>
              <div>
                <h3 className={styles.howStepTitle}>Show Up for 100 Days</h3>
                <p className={styles.prose}>Check in daily. Watch your grids fill up. Miss a day? Don't reset — just show up tomorrow. 100 completed days is the finish line, however you get there.</p>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready to begin?</h2>
          <p className={styles.ctaBody}>
            Start your first 100-day challenge now. No account required.
          </p>
          <div className={styles.ctaLinks}>
            <Link to="/" className={styles.ctaBtn}>Start Tracking</Link>
            <Link to="/habits" className={styles.ctaBtnSecondary}>Browse All Habits</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
