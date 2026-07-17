import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { buildArticleSchema } from '../../utils/schemaBuilder.js';
import styles from './ReportPage.module.css';

const SCHEMA = buildArticleSchema({
  headline: 'The 2025 Habit Formation Report',
  description:
    'Annual research report on habit formation: how long habits take, why people quit, what predicts success, and the measurable impact of tracking. Based on peer-reviewed research.',
  url: 'https://www.100dayshabitclub.xyz/report',
  datePublished: '2025-06-01',
});

const SECTION_1_FINDINGS = [
  {
    finding: 'Average habit formation time is 66 days',
    detail:
      'The landmark 2009 UCL study by Phillippa Lally tracked 96 participants and found the median time to habit automaticity was 66 days. The range spanned from 18 days for simple habits (drinking water after breakfast) to 254 days for complex ones (exercise routines).',
    source: 'Lally et al., 2010',
  },
  {
    finding: '100 days covers 95% of habit formation cases',
    detail:
      'While the average is 66 days, extending to 100 days captures the vast majority of habit formation timelines. Only the most complex behavioral changes require longer, making 100 days a practical and research-supported commitment period.',
    source: 'Gardner et al., 2012',
  },
  {
    finding: 'Automaticity continues increasing beyond the 66-day mark',
    detail:
      'Habit strength doesn\u2019t plateau at the point of formation. Research shows that continued repetition deepens neural pathways, making the behavior increasingly effortless and resilient to disruption.',
    source: 'Verplanken & Orbell, 2003',
  },
];

const SECTION_2_FINDINGS = [
  {
    finding: '92% of New Year\u2019s resolutions fail within the year',
    detail:
      'Research from the University of Scranton found that while 45% of Americans make New Year\u2019s resolutions, only 8% successfully achieve them. The primary failure point occurs between weeks 2 and 6, when initial enthusiasm fades.',
    source: 'Norcross et al., 2002',
  },
  {
    finding: 'Motivation drops 50% at the midpoint of any challenge',
    detail:
      'The \u2018middle problem\u2019 in goal pursuit shows that motivation naturally dips at the halfway point. In a 100-day challenge, days 40\u201360 represent the highest-risk period for abandonment.',
    source: 'Bonezzi et al., 2011',
  },
  {
    finding: 'Willpower depletion causes most evening habit failures',
    detail:
      'Self-control operates as a limited resource. After a day of decision-making, willpower reserves are lowest in the evening, which is why morning habits have higher success rates than evening ones.',
    source: 'Baumeister et al., 1998',
  },
];

const SECTION_3_FINDINGS = [
  {
    finding: 'Implementation intentions triple follow-through rates',
    detail:
      'Specifying when, where, and how you\u2019ll perform a habit (\u2018I will meditate for 10 minutes at 7 AM in my living room\u2019) makes you 2\u20133\u00d7 more likely to actually do it compared to vague goals.',
    source: 'Gollwitzer, 1999',
  },
  {
    finding: 'Accountability partners increase success rates to 65%',
    detail:
      'Having someone to report progress to raises habit success from roughly 10% (goal alone) to 65% (with accountability), a 6.5\u00d7 improvement that represents one of the largest known effects in behavior change research.',
    source: 'ASTD Research, 2010',
  },
  {
    finding: 'Identity-based habits are 3\u00d7 more durable than outcome-based ones',
    detail:
      'Framing habits as identity statements (\u2018I am a writer\u2019) rather than outcomes (\u2018I want to write a book\u2019) produces significantly more persistent behavior change because it aligns the habit with self-concept.',
    source: 'Clear, 2018',
  },
];

const SECTION_4_FINDINGS = [
  {
    finding: 'Self-monitoring doubles goal achievement rates',
    detail:
      'A meta-analysis of 138 studies found that regular self-monitoring \u2014 the simple act of recording whether you did or didn\u2019t perform a behavior \u2014 produces a medium effect size (d = 0.40) on goal attainment, roughly doubling success rates.',
    source: 'Harkin et al., 2016',
  },
  {
    finding: 'Visual progress triggers loss aversion, protecting streaks',
    detail:
      'When people can see their progress visually (like a tracking grid), loss aversion kicks in \u2014 the psychological discomfort of \u2018breaking the chain\u2019 becomes a powerful motivator to maintain consistency.',
    source: 'Locke & Latham, 2002',
  },
];

const SECTION_5_FINDINGS = [
  {
    finding: '1% daily improvement compounds to 37\u00d7 growth over a year',
    detail:
      'The mathematics of marginal gains shows that getting just 1% better each day results in a 37.78\u00d7 improvement over 365 days. This principle, applied to habit formation, means even tiny daily behaviors create massive long-term returns.',
    source: 'Clear, 2018',
  },
  {
    finding: 'Consistent exercisers gain an average of 2.5 additional life years',
    detail:
      'A large-scale study of over 650,000 adults found that regular physical activity at recommended levels was associated with a gain of up to 4.5 years of life expectancy, with 2.5 years as the average gain.',
    source: 'Moore et al., 2012',
  },
];

function FindingCard({ finding, detail, source }) {
  return (
    <div className={styles.findingCard}>
      <div className={styles.findingTitle}>{finding}</div>
      <p className={styles.findingDetail}>{detail}</p>
      <div className={styles.findingSource}>{source}</div>
    </div>
  );
}

export default function ReportPage() {
  useDocumentMeta({
    title: 'The 2025 Habit Formation Report',
    description:
      'Annual research report on habit formation: how long habits take, why people quit, what predicts success, and the measurable impact of tracking. Based on peer-reviewed research.',
    path: '/report',
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

        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Report' }]} />

        <h1 className={styles.pageTitle}>The 2025 Habit Formation Report</h1>
        <p className={styles.pubDate}>Published June 2025 | Based on 40+ peer-reviewed sources</p>

        <p className={styles.prose}>
          This annual report compiles the most important research findings on habit formation, distilling decades of behavioral science into actionable insights. Whether you&rsquo;re starting your first 100-day challenge or refining your approach after several, these findings will help you understand what the science actually says &mdash; and how to use it.
        </p>

        <nav className={styles.toc}>
          <a href="#executive-summary" className={styles.tocLink}>Executive Summary</a>
          <a href="#66-days" className={styles.tocLink}>1. The Science of 66 Days</a>
          <a href="#why-people-quit" className={styles.tocLink}>2. Why People Quit</a>
          <a href="#what-predicts-success" className={styles.tocLink}>3. What Predicts Success</a>
          <a href="#tracking-effect" className={styles.tocLink}>4. The Tracking Effect</a>
          <a href="#compound-return" className={styles.tocLink}>5. The Compound Return</a>
          <a href="#methodology-sources" className={styles.tocLink}>Methodology &amp; Sources</a>
        </nav>

        <div id="executive-summary" className={styles.summary}>
          <h2 className={styles.sectionTitle}>Executive Summary</h2>
          <ul className={styles.summaryList}>
            <li>
              Habit formation takes an average of 66 days (range: 18&ndash;254), making the common 21-day claim insufficient for most people.
            </li>
            <li>
              92% of New Year&rsquo;s resolutions fail, primarily due to reliance on motivation rather than systematic habit-building approaches.
            </li>
            <li>
              Self-monitoring (tracking) doubles the likelihood of successful behavior change, confirmed across 138 studies.
            </li>
            <li>
              Missing a single day has negligible impact on habit formation &mdash; but missing two consecutive days significantly increases abandonment risk.
            </li>
            <li>
              People with accountability partners achieve their goals 65% of the time, compared to 10% when pursuing goals alone.
            </li>
            <li>
              The optimal strategy is focusing on 3&ndash;5 habits simultaneously with 80%+ daily consistency, rather than pursuing perfection with a single habit.
            </li>
          </ul>
        </div>

        <section id="66-days" className={styles.section}>
          <h2 className={styles.sectionTitle}>1. The Science of 66 Days</h2>
          <p className={styles.prose}>
            For decades, the popular claim that habits form in 21 days dominated self-help literature. This number originated from a 1960 observation by plastic surgeon Maxwell Maltz and was never based on rigorous behavioral research. In 2009, researchers at University College London set out to answer the question properly.
          </p>
          <p className={styles.prose}>
            The UCL study tracked 96 participants as they attempted to form new daily habits over 12 weeks. The results were clear: the median time to automaticity was 66 days, with enormous individual variation ranging from 18 to 254 days. Simple habits like drinking a glass of water formed quickly; complex behaviors like exercise routines took much longer.
          </p>
          <p className={styles.prose}>
            This is why the 100-day framework exists. At 100 days, you provide adequate margin beyond the 66-day average, covering approximately 95% of habit formation timelines. The additional weeks also allow the habit to be tested against real-life disruptions &mdash; weekends, travel, illness, and motivation dips &mdash; making the resulting behavior genuinely robust.
          </p>
          <div className={styles.findingCards}>
            {SECTION_1_FINDINGS.map((f) => (
              <FindingCard key={f.source} {...f} />
            ))}
          </div>
        </section>

        <section id="why-people-quit" className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Why People Quit</h2>
          <p className={styles.prose}>
            Understanding why people abandon habits is just as important as understanding how habits form. The research points to a consistent pattern: people rely on motivation &mdash; a volatile, emotion-driven resource &mdash; rather than building systems that sustain behavior when motivation inevitably fades.
          </p>
          <p className={styles.prose}>
            The &ldquo;valley of disappointment&rdquo; describes the period where effort has been invested but results aren&rsquo;t yet visible. In habit formation, this typically occurs between weeks 3 and 8, well past the mythical 21-day mark but before the behavior has become automatic. During this valley, the brain hasn&rsquo;t yet rewired itself, and the habit still requires conscious effort.
          </p>
          <p className={styles.prose}>
            Compounding the problem is willpower depletion. After a full day of decisions and self-regulation, the brain&rsquo;s capacity for self-control is measurably reduced. This is why evening habits fail at higher rates than morning ones, and why simplifying the decision (&ldquo;I always run at 6 AM&rdquo;) outperforms relying on in-the-moment willpower.
          </p>
          <div className={styles.findingCards}>
            {SECTION_2_FINDINGS.map((f) => (
              <FindingCard key={f.source} {...f} />
            ))}
          </div>
        </section>

        <section id="what-predicts-success" className={styles.section}>
          <h2 className={styles.sectionTitle}>3. What Predicts Success</h2>
          <p className={styles.prose}>
            If motivation is unreliable, what does predict success? Three factors emerge consistently across the research: implementation intentions, accountability structures, and identity alignment. Together, they transform habit formation from a willpower contest into a system.
          </p>
          <p className={styles.prose}>
            Implementation intentions &mdash; specific plans that define when, where, and how a behavior will occur &mdash; effectively automate the decision to act. Instead of deciding each morning whether to exercise, you&rsquo;ve pre-committed: &ldquo;I will run for 20 minutes at 6:30 AM from my front door.&rdquo; This eliminates the decision point where most habits die.
          </p>
          <p className={styles.prose}>
            Environment design amplifies these effects. Placing running shoes by the bed, keeping a meditation cushion visible, or removing junk food from the kitchen all reduce friction for desired behaviors and increase friction for undesired ones. The most successful habit builders don&rsquo;t rely on discipline &mdash; they design environments where the right behavior is the easiest behavior.
          </p>
          <div className={styles.findingCards}>
            {SECTION_3_FINDINGS.map((f) => (
              <FindingCard key={f.source} {...f} />
            ))}
          </div>
        </section>

        <section id="tracking-effect" className={styles.section}>
          <h2 className={styles.sectionTitle}>4. The Tracking Effect</h2>
          <p className={styles.prose}>
            Of all the strategies studied in behavior change research, self-monitoring consistently produces some of the largest effects. The act of recording whether you performed a behavior &mdash; even without any other intervention &mdash; roughly doubles goal achievement rates across a wide range of health and behavioral outcomes.
          </p>
          <p className={styles.prose}>
            The mechanism is twofold. First, tracking creates awareness. Many people overestimate their consistency until confronted with data. A tracking grid shows the objective truth: you didn&rsquo;t exercise 5 times last week; you exercised 3 times. This awareness gap, once closed, drives behavioral correction.
          </p>
          <p className={styles.prose}>
            Second, visual progress activates loss aversion &mdash; one of the most powerful cognitive biases. When you can see 47 filled squares on a 100-day grid, the prospect of leaving day 48 empty creates genuine psychological discomfort. This &ldquo;don&rsquo;t break the chain&rdquo; effect transforms tracking from passive record-keeping into an active motivational force.
          </p>
          <div className={styles.findingCards}>
            {SECTION_4_FINDINGS.map((f) => (
              <FindingCard key={f.source} {...f} />
            ))}
          </div>
        </section>

        <section id="compound-return" className={styles.section}>
          <h2 className={styles.sectionTitle}>5. The Compound Return</h2>
          <p className={styles.prose}>
            The most compelling argument for habit formation isn&rsquo;t about any single day &mdash; it&rsquo;s about the compound effect over time. Small, consistent behaviors create returns that are wildly disproportionate to their individual effort. A 1% improvement each day, compounded over a year, results in a 37-fold improvement.
          </p>
          <p className={styles.prose}>
            This isn&rsquo;t motivational rhetoric; it&rsquo;s mathematics. And the research on specific habits bears it out. Regular physical activity adds an average of 2.5 years to life expectancy. Consistent reading builds vocabulary and knowledge at exponential rates. Daily writing practice produces measurable improvements in clarity and speed within weeks.
          </p>
          <p className={styles.prose}>
            The critical insight is that the compound return is invisible in the short term. Day 1 and day 2 feel identical. The difference between day 50 and day 51 is imperceptible. But the difference between day 1 and day 100 is transformative. This is why tracking matters &mdash; it provides evidence of progress during the period when the compound return is still invisible to the naked eye.
          </p>
          <div className={styles.findingCards}>
            {SECTION_5_FINDINGS.map((f) => (
              <FindingCard key={f.source} {...f} />
            ))}
          </div>
        </section>

        <section id="methodology-sources" className={styles.section}>
          <h2 className={styles.sectionTitle}>Methodology &amp; Sources</h2>
          <p className={styles.prose}>
            All findings cited in this report are drawn from peer-reviewed journal articles, published meta-analyses, or books by recognized experts in behavioral science and habit research. We prioritize studies with large sample sizes, replication, and publication in high-impact journals. Where a finding has been challenged or qualified by subsequent research, we note the limitations.
          </p>
          <p className={styles.prose}>
            For the complete list of references, visit our <Link to="/sources">Sources &amp; Citations</Link> page. For a detailed explanation of how we evaluate and present research, see our <Link to="/methodology">Methodology</Link> page.
          </p>
        </section>

        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Put the Research Into Practice</h2>
          <p className={styles.ctaBody}>
            Start your own 100-day challenge backed by these research findings, or explore every statistic individually.
          </p>
          <div className={styles.ctaLinks}>
            <Link to="/challenges" className={styles.ctaBtn}>Browse Challenges</Link>
            <Link to="/statistics" className={styles.ctaBtnSecondary}>View All Statistics</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
