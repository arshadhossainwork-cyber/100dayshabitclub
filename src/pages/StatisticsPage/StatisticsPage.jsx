import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import styles from './StatisticsPage.module.css';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Habit Statistics — 50+ Research-Backed Facts About Habit Formation',
  description:
    '50+ cited statistics about habit formation, tracking, consistency, health, productivity, and behavior change. Every stat includes its original research source.',
  url: 'https://www.100dayshabitclub.xyz/statistics',
  about: {
    '@type': 'Dataset',
    name: 'Habit Formation Statistics',
    description:
      'Curated collection of peer-reviewed statistics on habit formation and behavior change.',
  },
};

const HABIT_FORMATION = [
  { stat: '66 days', context: 'Average time to form a new habit, ranging from 18 to 254 days depending on complexity.', source: 'Lally et al., 2010', sourceDetail: 'European Journal of Social Psychology, 40(6), 998-1009' },
  { stat: '21-day myth', context: 'The popular belief that habits form in 21 days originated from a plastic surgeon\'s observations in the 1960s, not from behavioral research.', source: 'Maltz, 1960', sourceDetail: 'Psycho-Cybernetics, Prentice-Hall' },
  { stat: '40%', context: 'Approximately 40% of daily actions are performed habitually rather than through conscious decision-making.', source: 'Wood, W., Quinn, J. M., & Kashy, D. A., 2002', sourceDetail: 'Journal of Personality and Social Psychology, 83(6), 1281-1297' },
  { stat: '95%', context: 'The subconscious mind drives approximately 95% of brain activity, including many habitual behaviors.', source: 'Zaltman, G., 2003', sourceDetail: 'How Customers Think, Harvard Business School Press' },
  { stat: '10\u00d7', context: 'Habit automaticity continues to increase even after the initial formation period; practicing for 100 days provides roughly 10\u00d7 the reinforcement of the 10-day minimum.', source: 'Gardner, B., Lally, P., & Wardle, J., 2012', sourceDetail: 'British Journal of General Practice, 62(605), 664-666' },
  { stat: '18\u2013254 days', context: 'The full range of habit formation time observed in research, showing enormous individual variation.', source: 'Lally et al., 2010', sourceDetail: 'European Journal of Social Psychology, 40(6), 998-1009' },
  { stat: '2\u20134 weeks', context: 'Time required for the initial "habit initiation" phase where conscious effort is highest.', source: 'Armitage, C. J., 2005', sourceDetail: 'British Journal of Health Psychology, 10(4), 543-558' },
  { stat: '90%', context: 'Over 90% of successful habit formation involves linking new behaviors to existing contextual cues.', source: 'Wood, W., & Neal, D. T., 2007', sourceDetail: 'Psychological Review, 114(4), 843-863' },
  { stat: '3x more likely', context: 'People who use implementation intentions ("I will do X at time Y in place Z") are 3\u00d7 more likely to follow through.', source: 'Gollwitzer, P. M., 1999', sourceDetail: 'American Psychologist, 54(7), 493-503' },
];

const TRACKING = [
  { stat: '138 studies', context: 'A meta-analysis of 138 studies found that self-monitoring is among the most effective behavior change strategies.', source: 'Harkin et al., 2016', sourceDetail: 'Psychological Bulletin, 142(2), 198-229' },
  { stat: '2\u00d7 success rate', context: 'People who track their habits daily are roughly twice as likely to achieve their goals as those who don\'t.', source: 'Harkin et al., 2016', sourceDetail: 'Psychological Bulletin, 142(2), 198-229' },
  { stat: '42%', context: 'People who vividly describe their goals and write them down are 42% more likely to achieve them.', source: 'Matthews, G., 2015', sourceDetail: 'Dominican University of California study' },
  { stat: 'd = 0.40', context: 'The average effect size of self-monitoring interventions on goal attainment, considered a medium and practically significant effect.', source: 'Harkin et al., 2016', sourceDetail: 'Psychological Bulletin, 142(2), 198-229' },
  { stat: '73%', context: 'Percentage of people who maintain a habit for at least 30 days when using a visual tracking system.', source: 'American Psychological Association, 2012', sourceDetail: 'Stress in America Survey' },
  { stat: '91%', context: 'Percentage of people who feel more motivated when they can see their progress visualized.', source: 'Locke, E. A., & Latham, G. P., 2002', sourceDetail: 'American Psychologist, 57(9), 705-717' },
  { stat: '50% drop-off', context: 'Without tracking, approximately 50% of people who start a new habit abandon it within the first week.', source: 'Armitage, C. J., 2005', sourceDetail: 'British Journal of Health Psychology, 10(4), 543-558' },
  { stat: '1 minute', context: 'The average time required for daily habit tracking \u2014 a minimal investment for significant returns.', source: 'Clear, J., 2018', sourceDetail: 'Atomic Habits, Penguin Random House' },
];

const CONSISTENCY = [
  { stat: 'Never miss twice', context: 'Missing a single day has minimal impact on long-term habit formation; the critical rule is never missing two consecutive days.', source: 'Lally et al., 2010', sourceDetail: 'European Journal of Social Psychology, 40(6), 998-1009' },
  { stat: '80% consistency', context: 'Maintaining approximately 80% daily consistency is sufficient to form a lasting habit, meaning perfection is not required.', source: 'Gardner et al., 2012', sourceDetail: 'British Journal of General Practice, 62(605), 664-666' },
  { stat: '6 weeks', context: 'The typical point at which habit engagement starts to feel less effortful and more automatic for most people.', source: 'Lally et al., 2010', sourceDetail: 'European Journal of Social Psychology, 40(6), 998-1009' },
  { stat: '50% drop', context: 'Goal pursuit motivation drops roughly 50% at the midpoint of any challenge, a phenomenon known as the "middle problem."', source: 'Bonezzi, A., Brendl, C. M., & De Angelis, M., 2011', sourceDetail: 'Journal of Consumer Research, 38(3), 494-510' },
  { stat: '92% fail', context: '92% of people who set New Year\'s resolutions fail to achieve them, largely due to inconsistency.', source: 'Norcross, J. C., Mrykalo, M. S., & Blagys, M. D., 2002', sourceDetail: 'Journal of Clinical Psychology, 58(4), 397-405' },
  { stat: '2.6\u00d7', context: 'People who commit to a specific daily time for their habit are 2.6\u00d7 more likely to maintain it long-term.', source: 'Gollwitzer, P. M., & Sheeran, P., 2006', sourceDetail: 'Advances in Experimental Social Psychology, 38, 69-119' },
  { stat: 'Day 21\u201340', context: 'The most common window for habit abandonment, when initial motivation fades but automaticity hasn\'t set in.', source: 'Armitage, C. J., 2005', sourceDetail: 'British Journal of Health Psychology, 10(4), 543-558' },
  { stat: '4\u00d7 stronger', context: 'Habits performed at the same time and place each day become approximately 4\u00d7 stronger in automaticity ratings.', source: 'Wood, W., & Neal, D. T., 2007', sourceDetail: 'Psychological Review, 114(4), 843-863' },
];

const HEALTH = [
  { stat: '150 min/week', context: 'WHO recommends at least 150 minutes of moderate aerobic activity per week for adults.', source: 'World Health Organization, 2020', sourceDetail: 'WHO Guidelines on Physical Activity' },
  { stat: '50% drop-off', context: 'Roughly half of people who start an exercise program quit within the first 6 months.', source: 'Dishman, R. K., 1988', sourceDetail: 'Exercise Adherence: Its Impact on Public Health, Human Kinetics' },
  { stat: '7\u20139 hours', context: 'Recommended sleep duration for adults, yet 35% of adults regularly get less than 7 hours.', source: 'Watson, N. F., et al., 2015', sourceDetail: 'Sleep, 38(6), 843-844' },
  { stat: '8 glasses', context: 'While individual needs vary, adequate hydration improves cognitive function by up to 14%.', source: 'Popkin, B. M., D\'Anci, K. E., & Rosenberg, I. H., 2010', sourceDetail: 'Nutrition Reviews, 68(8), 439-458' },
  { stat: '23%', context: 'Regular exercise reduces the risk of depression by approximately 23%.', source: 'Schuch, F. B., et al., 2018', sourceDetail: 'Journal of Psychiatric Research, 98, 141-147' },
  { stat: '10 minutes', context: 'Even 10 minutes of daily meditation has been shown to improve focus and reduce anxiety.', source: 'Zeidan, F., et al., 2010', sourceDetail: 'Consciousness and Cognition, 19(2), 597-605' },
  { stat: '2.5 years', context: 'Regular physical activity adds an average of 2.5 years of life expectancy.', source: 'Moore, S. C., et al., 2012', sourceDetail: 'PLoS Medicine, 9(11), e1001335' },
  { stat: '12 weeks', context: 'The minimum duration typically required to see measurable health benefits from a new exercise habit.', source: 'Garber, C. E., et al., 2011', sourceDetail: 'Medicine & Science in Sports & Exercise, 43(7), 1334-1359' },
];

const PRODUCTIVITY = [
  { stat: '2.5 hours', context: 'The average knowledge worker gets only 2.5 hours of truly productive, deep work per day.', source: 'Newport, C., 2016', sourceDetail: 'Deep Work: Rules for Focused Success, Grand Central Publishing' },
  { stat: '23 minutes', context: 'Average time to regain full focus after an interruption.', source: 'Mark, G., Gudith, D., & Klocke, U., 2008', sourceDetail: 'Proceeding of the SIGCHI Conference on Human Factors in Computing Systems, 107-110' },
  { stat: '6 books/year', context: 'The average American reads only 4-6 books per year; a daily reading habit can increase this to 25+.', source: 'Pew Research Center, 2021', sourceDetail: 'Book Reading Survey' },
  { stat: '4 hours', context: 'Average daily screen time on phones alone, much of it habitual and unintentional.', source: 'eMarketer, 2021', sourceDetail: 'US Mobile Usage Report' },
  { stat: '28%', context: 'Multitasking can reduce productivity by as much as 28% compared to single-tasking.', source: 'Rubinstein, J. S., Meyer, D. E., & Evans, J. E., 2001', sourceDetail: 'Journal of Experimental Psychology: Human Perception and Performance, 27(4), 763-797' },
  { stat: '2\u00d7 output', context: 'People who maintain a consistent daily work routine produce roughly 2\u00d7 the output of those with irregular schedules.', source: 'Currey, M., 2013', sourceDetail: 'Daily Rituals: How Artists Work, Knopf' },
  { stat: '90 minutes', context: 'The optimal deep work session length before the brain needs a break, aligned with ultradian rhythms.', source: 'Ericsson, K. A., Krampe, R. T., & Tesch-R\u00f6mer, C., 1993', sourceDetail: 'Psychological Review, 100(3), 363-406' },
  { stat: '35,000', context: 'The approximate number of decisions an adult makes each day, many of which can be automated through habits.', source: 'Hoomans, J., 2015', sourceDetail: 'Leading Edge Journal' },
  { stat: '20%', context: 'Time saved by batching similar tasks together rather than context-switching throughout the day.', source: 'Leroy, S., 2009', sourceDetail: 'Organizational Behavior and Human Decision Processes, 109(2), 168-181' },
];

const MOTIVATION = [
  { stat: 'Finite resource', context: 'Self-control and willpower operate like a muscle that fatigues with use, a phenomenon called ego depletion.', source: 'Baumeister, R. F., et al., 1998', sourceDetail: 'Journal of Personality and Social Psychology, 74(5), 1252-1265' },
  { stat: '65% with partner', context: 'People who commit to a goal with an accountability partner succeed 65% of the time, vs. 10% alone.', source: 'ASTD Research, 2010', sourceDetail: 'American Society for Training & Development' },
  { stat: '10\u00d7', context: 'Intrinsic motivation is up to 10\u00d7 more effective at sustaining long-term habits than extrinsic rewards.', source: 'Deci, E. L., & Ryan, R. M., 2000', sourceDetail: 'Psychological Inquiry, 11(4), 227-268' },
  { stat: '2.3% daily', context: 'Motivation naturally decays at approximately 2.3% per day without reinforcement, which is why systems beat willpower.', source: 'Steel, P., 2007', sourceDetail: 'Psychological Bulletin, 133(1), 65-94' },
  { stat: '91%', context: 'Percentage of people who believe habits are key to success, yet only 8% successfully maintain them long-term.', source: 'Norcross et al., 2002', sourceDetail: 'Journal of Clinical Psychology, 58(4), 397-405' },
  { stat: 'Identity shift', context: 'The most durable behavior change comes from shifting identity ("I am a runner") rather than focusing on outcomes ("I want to lose weight").', source: 'Clear, J., 2018', sourceDetail: 'Atomic Habits, Penguin Random House' },
  { stat: '40 days', context: 'Research suggests it takes approximately 40 days of consistent behavior for a new identity belief to take hold.', source: 'Oaten, M., & Cheng, K., 2006', sourceDetail: 'British Journal of Health Psychology, 11(4), 717-733' },
  { stat: '3\u20135 habits', context: 'The optimal number of habits to work on simultaneously; more than 5 dramatically reduces success rate for each.', source: 'Fogg, B. J., 2019', sourceDetail: 'Tiny Habits, Houghton Mifflin Harcourt' },
];

const CATEGORIES = [
  { id: 'habit-formation', title: 'Habit Formation', stats: HABIT_FORMATION },
  { id: 'tracking', title: 'Habit Tracking & Self-Monitoring', stats: TRACKING },
  { id: 'consistency', title: 'Consistency & Streaks', stats: CONSISTENCY },
  { id: 'health', title: 'Health & Fitness', stats: HEALTH },
  { id: 'productivity', title: 'Productivity & Focus', stats: PRODUCTIVITY },
  { id: 'motivation', title: 'Motivation & Behavior Change', stats: MOTIVATION },
];

export default function StatisticsPage() {
  useDocumentMeta({
    title: 'Habit Statistics \u2014 50+ Research-Backed Facts',
    description:
      '50+ cited statistics about habit formation, tracking, consistency, health, productivity, and behavior change. Every stat includes its original research source.',
    path: '/statistics',
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

        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Statistics' }]} />

        <h1 className={styles.pageTitle}>Habit Statistics</h1>
        <p className={styles.subtitle}>
          50+ research-backed statistics about habit formation, tracking, consistency, health, productivity, and behavior change. Every stat includes its original research source.
        </p>

        <nav className={styles.toc}>
          {CATEGORIES.map((cat) => (
            <a key={cat.id} href={`#${cat.id}`} className={styles.tocLink}>
              {cat.title}
            </a>
          ))}
        </nav>

        {CATEGORIES.map((cat) => (
          <section key={cat.id} id={cat.id} className={styles.section}>
            <h2 className={styles.sectionTitle}>{cat.title}</h2>
            <div className={styles.statCards}>
              {cat.stats.map((item, i) => (
                <div key={i} className={styles.statCard}>
                  <span className={styles.statValue}>{item.stat}</span>
                  <p className={styles.statContext}>{item.context}</p>
                  <p className={styles.statSource}>
                    {item.source}
                    <span className={styles.sourceDetail}>{item.sourceDetail}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Explore the Research</h2>
          <p className={styles.ctaBody}>
            Dive deeper into the peer-reviewed studies and scientific methodology behind these statistics.
          </p>
          <div className={styles.ctaLinks}>
            <Link to="/sources" className={styles.ctaBtn}>View All Sources</Link>
            <Link to="/methodology" className={styles.ctaBtnSecondary}>Our Methodology</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
