import HabitCard from '../HabitCard/HabitCard.jsx';
import styles from './HabitList.module.css';

export default function HabitList({
  habits,
  onToggle,
  onEdit,
  onArchive,
  onDelete,
}) {
  return (
    <div className={styles.list}>
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onToggle={onToggle}
          onEdit={onEdit}
          onArchive={onArchive}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
