import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import styles from './SourcesPage.module.css';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Sources & Citations — 100 Days Habit Club',
  description:
    'Peer-reviewed research, books, and scientific studies behind the 100 Days Habit Club methodology. Full citations for habit formation, behavior change, and self-monitoring science.',
  url: 'https://www.100dayshabitclub.xyz/sources',
};

const HABIT_FORMATION = [
  {
    authors: 'Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W., & Wardle, J.',
    year: 2010,
    title: 'How are habits formed: Modelling habit formation in the real world.',
    source: 'European Journal of Social Psychology, 40(6), 998-1009.',
    relevance:
      'The foundational study behind our 100-day approach. Found that habit automaticity takes an average of 66 days, with a range of 18 to 254 days — demonstrating why 21 days is a myth and 100 days provides a meaningful margin.',
  },
  {
    authors: 'Gardner, B., Lally, P., & Wardle, J.',
    year: 2012,
    title: 'Making health habitual: The psychology of habit-formation and general practice.',
    source: 'British Journal of General Practice, 62(605), 664-666.',
    relevance:
      'Translates habit formation research into a practical framework for health behaviors, emphasizing repetition in consistent contexts — the same principle behind daily check-ins in our tracker.',
  },
  {
    authors: 'Wood, W., & Neal, D. T.',
    year: 2007,
    title: 'A new look at habits and the habit-goal interface.',
    source: 'Psychological Review, 114(4), 843-863.',
    relevance:
      'Provides the theoretical foundation for understanding when behavior is habitual versus goal-directed, informing our approach of building automatic routines rather than relying on willpower.',
  },
  {
    authors: 'Neal, D. T., Wood, W., & Quinn, J. M.',
    year: 2006,
    title: 'Habits — A repeat performance.',
    source: 'Current Directions in Psychological Science, 15(4), 198-202.',
    relevance:
      'Demonstrates how environmental cues trigger automatic behaviors, supporting our emphasis on consistent timing and context for daily habit practice.',
  },
  {
    authors: 'Verplanken, B., & Orbell, S.',
    year: 2003,
    title: 'Reflections on past behavior: A self-report index of habit strength.',
    source: 'Journal of Applied Social Psychology, 33(6), 1313-1330.',
    relevance:
      'Developed a validated measure of habit automaticity, providing the scientific basis for how we think about habit strength and the transition from effortful to automatic behavior.',
  },
  {
    authors: 'Ouellette, J. A., & Wood, W.',
    year: 1998,
    title: 'Habit and intention in everyday life: The multiple processes by which past behavior predicts future behavior.',
    source: 'Psychological Bulletin, 124(1), 54-74.',
    relevance:
      'A meta-analysis showing that for frequently performed behaviors, past behavior (habit) is a stronger predictor of future behavior than conscious intention — reinforcing why consistent daily practice matters more than motivation.',
  },
];

const BEHAVIOR_CHANGE = [
  {
    authors: 'Harkin, B., Webb, T. L., Chang, B. P. I., Prestwich, A., Conner, M., Kellar, I., Benn, Y., & Sheeran, P.',
    year: 2016,
    title: 'Does monitoring goal progress promote goal attainment? A meta-analysis of the experimental evidence.',
    source: 'Psychological Bulletin, 142(2), 198-229.',
    relevance:
      'Meta-analysis of 138 studies confirming that self-monitoring is one of the strongest predictors of goal achievement. This is the scientific basis for our daily check-in and visual progress grid.',
  },
  {
    authors: 'Baumeister, R. F., & Tierney, J.',
    year: 2011,
    title: 'Willpower: Rediscovering the Greatest Human Strength.',
    source: 'Penguin Press.',
    relevance:
      'Presents evidence that willpower is a finite resource that depletes with use, supporting our methodology of focusing on one habit at a time rather than attempting multiple changes simultaneously.',
  },
  {
    authors: 'Duckworth, A. L., & Seligman, M. E. P.',
    year: 2005,
    title: 'Self-discipline outdoes IQ in predicting academic performance of adolescents.',
    source: 'Psychological Science, 16(12), 939-944.',
    relevance:
      'Demonstrates that self-discipline is a stronger predictor of success than innate ability, validating our focus on building disciplined daily routines through structured tracking.',
  },
  {
    authors: 'Mischel, W., Shoda, Y., & Rodriguez, M. L.',
    year: 1989,
    title: 'Delay of gratification in children.',
    source: 'Science, 244(4907), 933-938.',
    relevance:
      'Foundational research on self-control showing that the ability to delay gratification predicts long-term outcomes. Our 100-day framework helps build this capacity through incremental daily practice.',
  },
  {
    authors: 'Milkman, K. L., Minson, J. A., & Volpp, K. G. M.',
    year: 2014,
    title: 'Holding the Hunger Games hostage at the gym: An evaluation of temptation bundling.',
    source: 'Management Science, 60(2), 283-299.',
    relevance:
      'Introduces the temptation bundling strategy — pairing a desired activity with a beneficial one. This technique is recommended in our habit-building guides as a way to make daily practice more enjoyable.',
  },
];

const BOOKS_FRAMEWORKS = [
  {
    authors: 'Clear, J.',
    year: 2018,
    title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones.',
    source: 'Random House.',
    relevance:
      'Introduces the framework of identity-based habit change: you don\'t just do a behavior, you become the kind of person who does it. Our 100-day duration is designed to give this identity shift enough time to take hold.',
  },
  {
    authors: 'Duhigg, C.',
    year: 2012,
    title: 'The Power of Habit: Why We Do What We Do in Life and Business.',
    source: 'Random House.',
    relevance:
      'Popularized the habit loop model (cue, routine, reward) and demonstrated how understanding this loop enables deliberate habit change. Our tracker helps users identify and reinforce their personal habit loops.',
  },
  {
    authors: 'Fogg, B. J.',
    year: 2020,
    title: 'Tiny Habits: The Small Changes That Change Everything.',
    source: 'Houghton Mifflin Harcourt.',
    relevance:
      'Argues that starting with very small behaviors is the key to lasting change. Our methodology embraces this — the daily check-in itself is a tiny habit that anchors the larger behavior.',
  },
  {
    authors: 'Newport, C.',
    year: 2016,
    title: 'Deep Work: Rules for Focused Success in a Distracted World.',
    source: 'Grand Central Publishing.',
    relevance:
      'Provides a framework for sustained focused practice, relevant to habits like reading, studying, and creative work. Our tracker supports the kind of daily deep work sessions Newport advocates.',
  },
  {
    authors: 'Walker, M.',
    year: 2017,
    title: 'Why We Sleep: Unlocking the Power of Sleep and Dreams.',
    source: 'Scribner.',
    relevance:
      'Details how sleep is essential for memory consolidation and habit formation. Informs our inclusion of sleep-related habits and the recommendation to build evening routines as part of a 100-day challenge.',
  },
  {
    authors: 'Kahneman, D.',
    year: 2011,
    title: 'Thinking, Fast and Slow.',
    source: 'Farrar, Straus and Giroux.',
    relevance:
      'Explains System 1 (fast, automatic) and System 2 (slow, deliberate) thinking. Habit formation is fundamentally about moving behaviors from System 2 to System 1 — exactly what 100 days of consistent practice achieves.',
  },
];

function CitationCard({ authors, year, title, source, relevance }) {
  return (
    <div className={styles.citation}>
      <div className={styles.citationAuthors}>{authors} ({year})</div>
      <div className={styles.citationTitle}>{title}</div>
      <div className={styles.citationSource}>{source}</div>
      <p className={styles.citationRelevance}>{relevance}</p>
    </div>
  );
}

export default function SourcesPage() {
  useDocumentMeta({
    title: 'Sources & Citations',
    description:
      'Peer-reviewed research, books, and scientific studies behind the 100 Days Habit Club methodology. Full citations for habit formation, behavior change, and self-monitoring science.',
    path: '/sources',
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

        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Sources & Citations' }]} />
        <h1 className={styles.pageTitle}>Sources & Citations</h1>
        <p className={styles.subtitle}>
          The research, studies, and books that inform the 100 Days Habit Club methodology. Every claim we make is grounded in peer-reviewed science or established behavioral frameworks.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Habit Formation Research</h2>
          <div className={styles.citations}>
            {HABIT_FORMATION.map((c, i) => (
              <CitationCard key={i} {...c} />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Behavior Change & Self-Monitoring</h2>
          <div className={styles.citations}>
            {BEHAVIOR_CHANGE.map((c, i) => (
              <CitationCard key={i} {...c} />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Books & Frameworks</h2>
          <div className={styles.citations}>
            {BOOKS_FRAMEWORKS.map((c, i) => (
              <CitationCard key={i} {...c} />
            ))}
          </div>
        </section>

        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>See the methodology in action</h2>
          <p className={styles.ctaBody}>
            Explore how these research findings shape our approach, or browse habits designed around this science.
          </p>
          <div className={styles.ctaLinks}>
            <Link to="/methodology" className={styles.ctaBtn}>Our Methodology</Link>
            <Link to="/habits" className={styles.ctaBtnSecondary}>Browse Habits</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
