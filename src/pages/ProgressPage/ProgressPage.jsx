import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { loadData } from '../../utils/storage.js';
import {
  computeAggregateStats,
  weeklyChartData,
  monthlyChartData,
  weekdayCompletionData,
  habitComparisonData,
  calendarHeatmapData,
  completionTrendData,
  weekComparison,
  monthComparison,
  computeMilestones,
  streakHistoryData,
} from '../../utils/analytics.js';
import { getMotivationMessage } from '../../utils/motivation.js';
import styles from './ProgressPage.module.css';

export default function ProgressPage() {
  const data = useMemo(() => loadData(), []);
  const habits = data.habits || [];
  const activeHabits = habits.filter((h) => !h.archived);

  const stats = useMemo(() => computeAggregateStats(habits), [habits]);
  const weekly = useMemo(() => weeklyChartData(habits), [habits]);
  const monthly = useMemo(() => monthlyChartData(habits), [habits]);
  const weekdays = useMemo(() => weekdayCompletionData(habits), [habits]);
  const comparison = useMemo(() => habitComparisonData(habits), [habits]);
  const heatmap = useMemo(() => calendarHeatmapData(habits), [habits]);
  const trend = useMemo(() => completionTrendData(habits), [habits]);
  const weekComp = useMemo(() => weekComparison(habits), [habits]);
  const monthComp = useMemo(() => monthComparison(habits), [habits]);
  const motivation = useMemo(() => getMotivationMessage(stats, habits), [stats, habits]);

  // Per-habit milestones for the best-performing active habit
  const topHabitMilestones = useMemo(() => {
    if (activeHabits.length === 0) return [];
    const sorted = [...activeHabits].sort((a, b) => (b.completedDays?.length || 0) - (a.completedDays?.length || 0));
    return computeMilestones(sorted[0]);
  }, [activeHabits]);

  // Streak history for the habit with the longest streak
  const topStreaks = useMemo(() => {
    if (activeHabits.length === 0) return { habit: null, streaks: [] };
    const withStats = activeHabits.map((h) => {
      const s = streakHistoryData(h);
      return { habit: h, streaks: s, best: s.length > 0 ? s[0].length : 0 };
    });
    const best = withStats.sort((a, b) => b.best - a.best)[0];
    return { habit: best.habit, streaks: best.streaks.slice(0, 5) };
  }, [activeHabits]);

  const hasData = activeHabits.length > 0;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
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

        <h2 className={styles.pageTitle}>Progress</h2>

        {motivation.message && (
          <p className={styles.motivation}>{motivation.message}</p>
        )}

        {!hasData ? (
          <div className={styles.empty}>
            <p>No habit data yet. Start tracking to see your progress here.</p>
            <Link to="/" className={styles.startBtn}>Go to Dashboard</Link>
          </div>
        ) : (
          <>
            {/* Summary Stats */}
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statValue}>{stats.activeHabits}</div>
                <div className={styles.statLabel}>Active Habits</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>{stats.completedHabits}</div>
                <div className={styles.statLabel}>Completed</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>{stats.totalCompletions}</div>
                <div className={styles.statLabel}>Total Days</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>{stats.bestCurrentStreak}</div>
                <div className={styles.statLabel}>Current Streak</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>{stats.bestLongestStreak}</div>
                <div className={styles.statLabel}>Best Streak</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>{stats.overallCompletionRate}%</div>
                <div className={styles.statLabel}>Completion Rate</div>
              </div>
            </div>

            {/* Week Comparison */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>This Week vs Last Week</h3>
              <div className={styles.weekCompare}>
                <div className={styles.weekSide}>
                  <div className={styles.weekPct}>{weekComp.thisWeekPct}%</div>
                  <div className={styles.weekLabel}>This week</div>
                </div>
                <div className={styles.weekDiff}>
                  <span className={
                    weekComp.diff > 0 ? styles.diffUp :
                    weekComp.diff < 0 ? styles.diffDown :
                    styles.diffFlat
                  }>
                    {weekComp.diff > 0 ? '+' : ''}{weekComp.diff}%
                  </span>
                </div>
                <div className={styles.weekSide}>
                  <div className={styles.weekPct}>{weekComp.lastWeekPct}%</div>
                  <div className={styles.weekLabel}>Last week</div>
                </div>
              </div>
            </div>

            {/* Month Comparison */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>This Month vs Last Month</h3>
              <div className={styles.weekCompare}>
                <div className={styles.weekSide}>
                  <div className={styles.weekPct}>{monthComp.thisMonthPct}%</div>
                  <div className={styles.weekLabel}>This month</div>
                </div>
                <div className={styles.weekDiff}>
                  <span className={
                    monthComp.diff > 0 ? styles.diffUp :
                    monthComp.diff < 0 ? styles.diffDown :
                    styles.diffFlat
                  }>
                    {monthComp.diff > 0 ? '+' : ''}{monthComp.diff}%
                  </span>
                </div>
                <div className={styles.weekSide}>
                  <div className={styles.weekPct}>{monthComp.lastMonthPct}%</div>
                  <div className={styles.weekLabel}>Last month</div>
                </div>
              </div>
            </div>

            {/* Highlights */}
            {(stats.mostConsistentHabit || stats.habitNeedingAttention) && (
              <div className={styles.highlightsRow}>
                {stats.mostConsistentHabit && (
                  <div className={styles.highlightCard}>
                    <div className={styles.highlightLabel}>Most Consistent</div>
                    <div className={styles.highlightName}>
                      <span className={styles.dot} style={{ background: stats.mostConsistentHabit.color }} />
                      {stats.mostConsistentHabit.name}
                    </div>
                    <div className={styles.highlightStat}>{stats.mostConsistentHabit.pct}%</div>
                  </div>
                )}
                {stats.habitNeedingAttention && (
                  <div className={styles.highlightCard}>
                    <div className={styles.highlightLabel}>Needs Attention</div>
                    <div className={styles.highlightName}>
                      <span className={styles.dot} style={{ background: stats.habitNeedingAttention.color }} />
                      {stats.habitNeedingAttention.name}
                    </div>
                    <div className={styles.highlightStat}>
                      {stats.habitNeedingAttention.daysSince === null
                        ? 'Never completed'
                        : `${stats.habitNeedingAttention.daysSince}d ago`}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Weekly Chart */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Last 7 Days</h3>
              <div className={styles.barChart}>
                {weekly.map((d) => (
                  <div key={d.date} className={styles.barCol}>
                    <div className={styles.barTrack}>
                      <div
                        className={styles.barFill}
                        style={{ height: `${d.pct}%` }}
                      />
                    </div>
                    <div className={styles.barLabel}>{d.label}</div>
                    <div className={styles.barValue}>{d.count}/{d.total}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Chart */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Last 4 Weeks</h3>
              <div className={styles.barChart}>
                {monthly.map((w) => (
                  <div key={w.label} className={styles.barCol}>
                    <div className={styles.barTrack}>
                      <div
                        className={styles.barFill}
                        style={{ height: `${w.pct}%` }}
                      />
                    </div>
                    <div className={styles.barLabel}>{w.label}</div>
                    <div className={styles.barValue}>{w.pct}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekday Pattern */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Weekday Pattern</h3>
              <div className={styles.weekdayChart}>
                {weekdays.map((d) => (
                  <div key={d.day} className={styles.weekdayRow}>
                    <span className={styles.weekdayLabel}>{d.day}</span>
                    <div className={styles.weekdayTrack}>
                      <div
                        className={styles.weekdayFill}
                        style={{ width: `${d.pct}%` }}
                      />
                    </div>
                    <span className={styles.weekdayCount}>{d.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Completion Trend */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>12-Week Trend</h3>
              <div className={styles.trendChart}>
                <svg
                  viewBox={`0 0 ${trend.length * 40} 120`}
                  className={styles.trendSvg}
                  aria-label="Completion trend over 12 weeks"
                >
                  {/* Grid lines */}
                  {[0, 25, 50, 75, 100].map((pct) => (
                    <line
                      key={pct}
                      x1="0"
                      y1={100 - pct}
                      x2={trend.length * 40}
                      y2={100 - pct}
                      className={styles.gridLine}
                    />
                  ))}
                  {/* Area */}
                  <path
                    d={`M${trend.map((w, i) => `${i * 40 + 20},${100 - w.pct}`).join(' L')} L${(trend.length - 1) * 40 + 20},100 L20,100 Z`}
                    className={styles.trendArea}
                  />
                  {/* Line */}
                  <polyline
                    points={trend.map((w, i) => `${i * 40 + 20},${100 - w.pct}`).join(' ')}
                    className={styles.trendLine}
                  />
                  {/* Dots */}
                  {trend.map((w, i) => (
                    <circle
                      key={i}
                      cx={i * 40 + 20}
                      cy={100 - w.pct}
                      r="3"
                      className={styles.trendDot}
                    />
                  ))}
                </svg>
                <div className={styles.trendLabels}>
                  {trend.map((w, i) => (
                    i % 2 === 0 ? (
                      <span key={i} className={styles.trendLabel}>{w.label}</span>
                    ) : (
                      <span key={i} className={styles.trendLabel} />
                    )
                  ))}
                </div>
              </div>
            </div>

            {/* Calendar Heatmap */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>90-Day Activity</h3>
              <div className={styles.heatmap}>
                {heatmap.days.map((d) => (
                  <div
                    key={d.date}
                    className={styles.heatmapCell}
                    style={{
                      opacity: d.count === 0 ? 0.1 : 0.2 + (d.count / heatmap.maxCount) * 0.8,
                    }}
                    title={`${d.date}: ${d.count}/${heatmap.totalHabits}`}
                  />
                ))}
              </div>
              <div className={styles.heatmapLegend}>
                <span className={styles.heatmapLegendLabel}>Less</span>
                {[0.1, 0.3, 0.5, 0.7, 1].map((opacity) => (
                  <div
                    key={opacity}
                    className={styles.heatmapCell}
                    style={{ opacity }}
                  />
                ))}
                <span className={styles.heatmapLegendLabel}>More</span>
              </div>
            </div>

            {/* Habit Comparison */}
            {comparison.length > 1 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Habit Comparison</h3>
                <div className={styles.comparisonList}>
                  {comparison.map((h) => (
                    <div key={h.id} className={styles.comparisonRow}>
                      <div className={styles.comparisonInfo}>
                        <span className={styles.dot} style={{ background: h.color }} />
                        <span className={styles.comparisonName}>{h.name}</span>
                      </div>
                      <div className={styles.comparisonBar}>
                        <div className={styles.comparisonTrack}>
                          <div
                            className={styles.comparisonFill}
                            style={{ width: `${h.completionPct}%`, background: h.color }}
                          />
                        </div>
                        <span className={styles.comparisonPct}>{h.completionPct}%</span>
                      </div>
                      <div className={styles.comparisonMeta}>
                        <span>{h.totalDays} days</span>
                        <span>Streak: {h.currentStreak}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Milestones */}
            {topHabitMilestones.length > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Milestones</h3>
                <div className={styles.milestoneList}>
                  {topHabitMilestones.map((m) => (
                    <div
                      key={m.id}
                      className={`${styles.milestoneRow} ${m.unlocked ? styles.milestoneUnlocked : ''}`}
                    >
                      <div className={styles.milestoneCheck}>
                        {m.unlocked ? '\u2713' : '\u25CB'}
                      </div>
                      <div className={styles.milestoneInfo}>
                        <span className={styles.milestoneName}>{m.name}</span>
                        <span className={styles.milestoneDesc}>{m.description}</span>
                      </div>
                      {!m.unlocked && m.progress > 0 && (
                        <span className={styles.milestonePct}>{m.progress}%</span>
                      )}
                      {m.unlocked && m.unlockedAt && (
                        <span className={styles.milestoneDate}>{m.unlockedAt}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Streak History */}
            {topStreaks.streaks.length > 0 && topStreaks.habit && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  Streak History — {topStreaks.habit.name}
                </h3>
                <div className={styles.streakList}>
                  {topStreaks.streaks.map((s, i) => (
                    <div key={i} className={styles.streakRow}>
                      <div className={styles.streakBar}>
                        <div
                          className={styles.streakFill}
                          style={{
                            width: `${Math.min((s.length / (topStreaks.streaks[0]?.length || 1)) * 100, 100)}%`,
                            background: topStreaks.habit.color,
                          }}
                        />
                      </div>
                      <span className={styles.streakLength}>{s.length}d</span>
                      <span className={styles.streakDates}>{s.start} — {s.end}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nav to achievements */}
            <div className={styles.achievementsLink}>
              <Link to="/achievements" className={styles.navBtn}>
                View Achievements
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
