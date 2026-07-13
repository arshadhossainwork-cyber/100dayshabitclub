import { GRID_SIZE } from '../../utils/constants.js';
import GridCell from './GridCell.jsx';
import styles from './Grid.module.css';

export default function Grid({ completedCount, color }) {
  const cells = Array.from({ length: GRID_SIZE }, (_, i) => (
    <GridCell key={i} index={i} filled={i < completedCount} color={color} />
  ));

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid} role="img" aria-label={`${completedCount} of ${GRID_SIZE} days completed`}>
        {cells}
      </div>
      <div className={styles.labels}>
        <span>Day 1</span>
        <span>Day 100</span>
      </div>
    </div>
  );
}
