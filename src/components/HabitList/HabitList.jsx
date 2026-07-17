import HabitCard from '../HabitCard/HabitCard.jsx';
import styles from './HabitList.module.css';

export default function HabitList({
  habits,
  onToggle,
  onEdit,
  onArchive,
  onDelete,
  showToast,
}) {
  return (
    <ul className={styles.list} aria-label="Your habits">
      {habits.map((habit) => (
        <li key={habit.id}>
          <HabitCard
            habit={habit}
            onToggle={onToggle}
            onEdit={onEdit}
            onArchive={onArchive}
            onDelete={onDelete}
            showToast={showToast}
          />
        </li>
      ))}
    </ul>
  );
}
