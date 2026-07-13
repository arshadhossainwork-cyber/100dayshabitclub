import { MILESTONES } from '../../utils/constants.js';
import styles from './Grid.module.css';

export default function GridCell({ index, filled, color }) {
  const dayNum = index + 1;
  const isMilestone = MILESTONES.includes(dayNum);

  const className = [
    filled ? styles.filled : styles.cell,
    isMilestone && filled ? styles.milestone : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={className}
      style={filled ? { backgroundColor: color } : undefined}
      aria-label={`Day ${dayNum}${filled ? ' completed' : ''}`}
      data-day={isMilestone && filled ? dayNum : undefined}
    />
  );
}
