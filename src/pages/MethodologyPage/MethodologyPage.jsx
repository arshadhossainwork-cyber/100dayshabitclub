import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { buildArticleSchema } from '../../utils/schemaBuilder.js';
import styles from './MethodologyPage.module.css';

const SCHEMA = buildArticleSchema({
  headline: 'The 100-Day Methodology — Why 100 Days Changes Everything',
  description:
    'The science behind why 100 days is the right timeframe to build lasting habits. Research-backed methodology combining consistency, visual feedback, and milestone psychology.',
  url: 'https://www.100dayshabitclub.xyz/methodology',
  datePublished: '2025-05-01',
});

export default function MethodologyPage() {
  useDocumentMeta({
    title: 'The 100-Day Methodology — Why 100 Days Changes Everything',
    description:
      'The science behind why 100 days is the right timeframe to build lasting habits. Research-backed methodology combining consistency, visual feedback, and milestone psychology.',
    path: '/methodology',
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

        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Methodology' }]} />
        <h1 className={styles.pageTitle}>The 100-Day Methodology</h1>
        <p className={styles.subtitle}>
          Why 100 days is the right timeframe to build a lasting habit — and the science behind how this app helps you get there.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The Problem With 21 Days</h2>
          <p className={styles.prose}>
            The popular claim that habits form in 21 days comes from a 1960 observation by plastic surgeon Maxwell Maltz, who noticed patients took about 21 days to adjust to changes in their appearance. It was never a scientific finding about behavior change.
          </p>
          <p className={styles.prose}>
            In 2009, researcher Phillippa Lally and her team at University College London published a landmark study in the European Journal of Social Psychology. They tracked 96 participants forming new habits over 12 weeks and found that the average time to automaticity was <strong>66 days</strong> — with a range of 18 to 254 days depending on the habit's complexity and the individual.
          </p>
          <p className={styles.prose}>
            21 days is too short for most habits. 66 days is the average. We chose 100 because it provides a meaningful margin beyond the average, works beautifully as a visual grid (10 &times; 10), and carries the psychological weight of a significant round number.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Why 100 Days Works</h2>
          <div className={styles.principles}>
            <div className={styles.principle}>
              <h3 className={styles.principleTitle}>Beyond Automaticity</h3>
              <p className={styles.prose}>
                100 days gives you 34 days past the 66-day average — enough buffer for the habit to become deeply ingrained rather than fragile. By day 100, you're not just performing the behavior automatically; you've weathered weekends, travel, illness, and motivation dips. The habit has been tested by real life.
              </p>
            </div>
            <div className={styles.principle}>
              <h3 className={styles.principleTitle}>The 10 &times; 10 Grid</h3>
              <p className={styles.prose}>
                100 maps perfectly onto a 10-by-10 grid — a visual representation of progress that's immediately comprehensible. Each filled square is proof you showed up. The grid creates what psychologists call "loss aversion": once you've filled 40 squares, the prospect of leaving the next one empty becomes genuinely uncomfortable. This visual feedback loop is more motivating than any notification.
              </p>
            </div>
            <div className={styles.principle}>
              <h3 className={styles.principleTitle}>Milestone Psychology</h3>
              <p className={styles.prose}>
                Research on goal gradient effects shows that motivation increases as you approach milestones. With 100 days, natural milestones emerge at 7 (first week), 21 (the myth), 50 (halfway), 66 (the science), and 100 (completion). Each milestone renews motivation when the daily grind threatens to erode it.
              </p>
            </div>
            <div className={styles.principle}>
              <h3 className={styles.principleTitle}>Identity Shift</h3>
              <p className={styles.prose}>
                James Clear's "Atomic Habits" framework argues that lasting behavior change is identity change. You don't just "go for runs" — you become "a runner." 100 days of consistent evidence is enough for this identity shift to take hold. After 100 days of meditation, you don't meditate because you're supposed to — you meditate because that's who you are.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The Four Pillars of the Method</h2>
          <div className={styles.pillars}>
            <div className={styles.pillar}>
              <div className={styles.pillarNumber}>1</div>
              <div>
                <h3 className={styles.pillarTitle}>One Habit at a Time</h3>
                <p className={styles.prose}>
                  Willpower is finite. Behavioral research consistently shows that focusing on a single habit change produces higher success rates than trying to change multiple behaviors simultaneously. You can track multiple habits in the app, but the methodology recommends pouring your energy into one primary habit per 100-day cycle.
                </p>
              </div>
            </div>
            <div className={styles.pillar}>
              <div className={styles.pillarNumber}>2</div>
              <div>
                <h3 className={styles.pillarTitle}>Daily Check-In</h3>
                <p className={styles.prose}>
                  The act of checking in — a single tap — is itself a micro-commitment that reinforces the habit. It's not just tracking; it's a moment of conscious acknowledgment: "I did this today." This self-monitoring is one of the strongest predictors of successful behavior change, according to a 2016 meta-analysis published in Health Psychology Review.
                </p>
              </div>
            </div>
            <div className={styles.pillar}>
              <div className={styles.pillarNumber}>3</div>
              <div>
                <h3 className={styles.pillarTitle}>Visual Progress</h3>
                <p className={styles.prose}>
                  The 10 &times; 10 grid turns an abstract commitment ("I should exercise") into a concrete, visual artifact. This leverages what behavioral economists call "the endowment effect" — you value progress you can see, and you're reluctant to break a visible streak. The grid is not decoration; it's the mechanism.
                </p>
              </div>
            </div>
            <div className={styles.pillar}>
              <div className={styles.pillarNumber}>4</div>
              <div>
                <h3 className={styles.pillarTitle}>No Perfection Required</h3>
                <p className={styles.prose}>
                  The app tracks total completed days, not consecutive days. Missing a day doesn't reset your grid to zero — it leaves one square unfilled among many filled ones. This design choice is deliberate: perfectionism is the enemy of consistency. Research shows that "all-or-nothing" mindsets are the primary reason people abandon habits. A 90% completion rate over 100 days is still 90 days of practice.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What the Research Says</h2>
          <div className={styles.sources}>
            <div className={styles.source}>
              <div className={styles.sourceTitle}>Lally, P. et al. (2010)</div>
              <p className={styles.prose}>
                "How are habits formed: Modelling habit formation in the real world." European Journal of Social Psychology, 40(6), 998-1009. Found average habit formation takes 66 days, with a range of 18-254 days.
              </p>
            </div>
            <div className={styles.source}>
              <div className={styles.sourceTitle}>Harkin, B. et al. (2016)</div>
              <p className={styles.prose}>
                "Does monitoring goal progress promote goal attainment?" Psychological Bulletin, 142(2), 198-229. Meta-analysis of 138 studies confirming that self-monitoring is one of the strongest predictors of goal achievement.
              </p>
            </div>
            <div className={styles.source}>
              <div className={styles.sourceTitle}>Clear, J. (2018)</div>
              <p className={styles.prose}>
                "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones." Random House. Framework linking daily habits to identity change through small, consistent actions.
              </p>
            </div>
          </div>
        </section>

        <p className={styles.prose} style={{ marginTop: 'var(--space-md)' }}>
          For a complete list of all research and references used throughout this site, visit our <Link to="/sources">Sources &amp; Citations</Link> page.
        </p>

        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Put the methodology to work</h2>
          <p className={styles.ctaBody}>
            Pick a habit from our library and start your 100-day challenge today.
          </p>
          <div className={styles.ctaLinks}>
            <Link to="/habits" className={styles.ctaBtn}>Browse Habits</Link>
            <Link to="/" className={styles.ctaBtnSecondary}>Start Tracking</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
