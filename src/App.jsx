import { useState } from 'react';
import { useHabits } from './hooks/useHabits.js';
import Header from './components/Header/Header.jsx';
import EmptyState from './components/EmptyState/EmptyState.jsx';
import HabitList from './components/HabitList/HabitList.jsx';
import AddHabitModal from './components/AddHabitModal/AddHabitModal.jsx';
import EditHabitModal from './components/EditHabitModal/EditHabitModal.jsx';
import ConfirmDialog from './components/ConfirmDialog/ConfirmDialog.jsx';
import SettingsPanel from './components/SettingsPanel/SettingsPanel.jsx';
import ReminderManager from './components/ReminderManager/ReminderManager.jsx';
import './App.css';

function App() {
  const {
    habits,
    settings,
    addHabit,
    toggleDay,
    updateHabit,
    archiveHabit,
    deleteHabit,
    updateSettings,
  } = useHabits();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editHabit, setEditHabit] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  function handleEdit(habit) {
    setEditHabit(habit);
  }

  function handleDeleteRequest(habit) {
    setDeleteTarget(habit);
  }

  function handleConfirmDelete() {
    if (deleteTarget) {
      deleteHabit(deleteTarget.id);
      setDeleteTarget(null);
    }
  }

  return (
    <>
      <Header
        onAddClick={() => setAddModalOpen(true)}
        onSettingsClick={() => setSettingsOpen(true)}
        isLanding={habits.length === 0}
      />

      <ReminderManager settings={settings} habits={habits} />

      <main className="main">
        {habits.length === 0 ? (
          <EmptyState
            onAddClick={() => setAddModalOpen(true)}
            onAddHabit={addHabit}
          />
        ) : (
          <HabitList
            habits={habits}
            onToggle={toggleDay}
            onEdit={handleEdit}
            onArchive={archiveHabit}
            onDelete={handleDeleteRequest}
          />
        )}
      </main>

      <AddHabitModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={addHabit}
      />

      <EditHabitModal
        habit={editHabit}
        open={editHabit !== null}
        onClose={() => setEditHabit(null)}
        onSave={updateHabit}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Habit"
        message={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.name}"? This will permanently remove all progress data.`
            : ''
        }
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <SettingsPanel
        open={settingsOpen}
        settings={settings}
        onUpdateSettings={updateSettings}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
}

export default App;
