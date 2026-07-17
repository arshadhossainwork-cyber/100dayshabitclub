import { useState, useEffect, useMemo, useRef } from 'react';
import { useHabits } from './hooks/useHabits.js';
import { useToast } from './hooks/useToast.jsx';
import { useAuth } from './contexts/AuthContext.jsx';
import { useSync } from './hooks/useSync.js';
import { useMigration } from './hooks/useMigration.js';
import { useServiceWorker } from './hooks/useServiceWorker.js';
import { isConsecutive, getToday, toLocalDateString } from './utils/dates.js';
import { MILESTONES } from './utils/constants.js';
import { detectTimezone } from './utils/timezoneUtils.js';
import { getMilestoneMessage } from './utils/reminderMessages.js';
import { sendNotification } from './utils/notifications.js';
import Header from './components/Header/Header.jsx';
import EmptyState from './components/EmptyState/EmptyState.jsx';
import HabitList from './components/HabitList/HabitList.jsx';
import AddHabitModal from './components/AddHabitModal/AddHabitModal.jsx';
import EditHabitModal from './components/EditHabitModal/EditHabitModal.jsx';
import ConfirmDialog from './components/ConfirmDialog/ConfirmDialog.jsx';
import SettingsPanel from './components/SettingsPanel/SettingsPanel.jsx';
import ReminderManager from './components/ReminderManager/ReminderManager.jsx';
import GuestNotice from './components/GuestNotice/GuestNotice.jsx';
import AccountPrompt from './components/AccountPrompt/AccountPrompt.jsx';
import MigrationDialog from './components/MigrationDialog/MigrationDialog.jsx';
import CompletionDialog from './components/CompletionDialog/CompletionDialog.jsx';
import ShareDialog from './components/ShareDialog/ShareDialog.jsx';
import { captureReferralSource } from './utils/referral.js';
import UpdateNotification from './components/UpdateNotification/UpdateNotification.jsx';
import OfflineIndicator from './components/OfflineIndicator/OfflineIndicator.jsx';
import InstallPrompt from './components/InstallPrompt/InstallPrompt.jsx';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

function App() {
  const {
    habits,
    archivedHabits,
    allHabits,
    settings,
    data,
    setData,
    addHabit,
    toggleDay,
    updateHabit,
    archiveHabit,
    unarchiveHabit,
    deleteHabit,
    restoreHabit,
    updateSettings,
    reloadData,
    saveError,
  } = useHabits();

  const { showToast } = useToast();
  const { isSignedIn, user } = useAuth();

  const {
    needRefresh,
    offlineReady,
    applyUpdate,
    dismissUpdate,
    showInstallBanner,
    canInstall,
    installApp,
    dismissInstallBanner,
    isInstalled,
    isIOS: isIOSDevice,
    isOnline,
  } = useServiceWorker(habits.length);

  const {
    migrationNeeded,
    migrationData,
    migrationState,
    migrationError,
    startMigration,
    dismissMigration,
  } = useMigration({ allHabits, isSignedIn, user, setData, data });

  const {
    syncState,
    lastSyncAt,
    error: syncError,
    conflicts,
    triggerSync,
    clearError: clearSyncError,
  } = useSync({
    allHabits,
    settings,
    setData,
    isSignedIn,
    user,
    migrationState,
  });

  // Offline-ready toast (first time SW caches all assets)
  useEffect(() => {
    if (offlineReady) {
      showToast('App ready for offline use', { type: 'info', duration: 3000 });
    }
  }, [offlineReady, showToast]);

  // Sync error toast
  useEffect(() => {
    if (syncError) {
      showToast(
        `Sync failed. Your data is safe locally.`,
        {
          type: 'error',
          duration: 6000,
          action: { label: 'Retry', onClick: triggerSync },
        }
      );
    }
  }, [syncError, showToast, triggerSync]);

  const existingNames = habits.map((h) => h.name);

  const maxStreak = useMemo(() => {
    let max = 0;
    for (const habit of habits) {
      if (!habit.completedDays || habit.completedDays.length === 0) continue;
      const sorted = [...habit.completedDays].sort();
      let longest = 1;
      let run = 1;
      for (let i = 1; i < sorted.length; i++) {
        if (isConsecutive(sorted[i - 1], sorted[i])) {
          run++;
          if (run > longest) longest = run;
        } else {
          run = 1;
        }
      }
      // current streak from today/yesterday
      const today = getToday();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = toLocalDateString(yesterday);
      let current = 0;
      if (sorted.includes(today)) {
        current = 1;
        let check = today;
        for (let i = sorted.length - 1; i >= 0; i--) {
          if (sorted[i] === check) continue;
          if (isConsecutive(sorted[i], check)) {
            current++;
            check = sorted[i];
          } else if (sorted[i] < check) break;
        }
      } else if (sorted[sorted.length - 1] === yesterdayStr) {
        current = 1;
        let check = yesterdayStr;
        for (let i = sorted.length - 2; i >= 0; i--) {
          if (isConsecutive(sorted[i], check)) {
            current++;
            check = sorted[i];
          } else break;
        }
      }
      const best = Math.max(longest, current);
      if (best > max) max = best;
    }
    return max;
  }, [habits]);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editHabit, setEditHabit] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [completionHabit, setCompletionHabit] = useState(null);
  const [shareHabit, setShareHabit] = useState(null);
  const shownCompletionsRef = useRef(new Set());

  // Auto-detect timezone on first load + capture referral source
  useEffect(() => {
    if (settings.timezone === null || settings.timezone === undefined) {
      const detected = detectTimezone();
      if (detected) {
        updateSettings({ timezone: detected });
      }
    }
    captureReferralSource();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Save error toast
  useEffect(() => {
    if (saveError) {
      showToast(
        'Failed to save. Export your data to avoid losing progress.',
        { type: 'error', duration: 8000 }
      );
    }
  }, [saveError, showToast]);

  // Tab sync toast
  useEffect(() => {
    function handleTabSync() {
      showToast('Data updated from another tab', { type: 'info' });
    }
    window.addEventListener('habitclub:tab-sync', handleTabSync);
    return () =>
      window.removeEventListener('habitclub:tab-sync', handleTabSync);
  }, [showToast]);

  function handleToggle(habitId, date) {
    const habit = habits.find((h) => h.id === habitId);
    if (!habit) { toggleDay(habitId, date); return; }

    const dateStr = date || getToday();
    const wasBelow = habit.completedDays.length < 100;
    const isAdding = !habit.completedDays.includes(dateStr);

    toggleDay(habitId, date);

    if (isAdding) {
      const newCount = habit.completedDays.length + 1;

      // Milestone notifications
      if (settings.milestoneNotifications && MILESTONES.includes(newCount)) {
        const msg = getMilestoneMessage(habit.name, newCount);
        sendNotification(msg.title, { body: msg.body });
      }

      // Show completion dialog when crossing 100 for the first time in this session
      if (wasBelow && newCount === 100 && !shownCompletionsRef.current.has(habitId)) {
        shownCompletionsRef.current.add(habitId);
        const completionSnapshot = { ...habit, completedDays: [...habit.completedDays, dateStr] };
        setTimeout(() => {
          setCompletionHabit(completionSnapshot);
        }, 300);
      }
    }
  }

  function handleEdit(habit) {
    setEditHabit(habit);
  }

  function handleDeleteRequest(habit) {
    setDeleteTarget(habit);
  }

  function handleAdd(nameOrObj, color) {
    if (typeof nameOrObj === 'object') {
      addHabit(nameOrObj.name, nameOrObj.color);
    } else {
      addHabit(nameOrObj, color);
    }
    showToast('Habit created', { type: 'success' });
  }

  function handleArchive(id) {
    archiveHabit(id);
    showToast('Habit archived', {
      type: 'success',
      duration: 5000,
      action: { label: 'Undo', onClick: () => unarchiveHabit(id) },
    });
  }

  function handleConfirmDelete() {
    if (deleteTarget) {
      const capturedHabit = { ...deleteTarget };
      deleteHabit(deleteTarget.id);
      setDeleteTarget(null);
      showToast('Habit deleted', {
        type: 'success',
        duration: 5000,
        action: { label: 'Undo', onClick: () => restoreHabit(capturedHabit) },
      });
    }
  }

  // Gate dashboard on migration check to prevent empty flash
  const isCheckingMigration = migrationState === 'checking' || migrationState === 'migrating';

  return (
    <>
      <Header
        onAddClick={() => setAddModalOpen(true)}
        onSettingsClick={() => setSettingsOpen(true)}
        isLanding={habits.length === 0 && !isCheckingMigration}
        isSignedIn={isSignedIn}
        userAvatarUrl={user?.user_metadata?.avatar_url}
        userName={user?.user_metadata?.display_name || user?.email}
        syncState={syncState}
        syncError={syncError}
        syncConflicts={conflicts}
        onSyncRetry={triggerSync}
      />

      <AccountPrompt habitCount={habits.length} maxStreak={maxStreak} />

      <ReminderManager
        settings={settings}
        habits={habits}
        onToggle={handleToggle}
        showToast={showToast}
        onUpdateHabit={updateHabit}
      />

      <main className="main">
        {isCheckingMigration ? null : habits.length === 0 ? (
          <EmptyState
            onAddClick={() => setAddModalOpen(true)}
            onAddHabit={handleAdd}
          />
        ) : (
          <HabitList
            habits={habits}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onArchive={handleArchive}
            onDelete={handleDeleteRequest}
            showToast={showToast}
          />
        )}
      </main>

      <GuestNotice
        dismissed={settings.guestNoticeDismissed || isSignedIn}
        onDismiss={() => updateSettings({ guestNoticeDismissed: true })}
      />

      <MigrationDialog
        open={migrationNeeded}
        migrationData={migrationData}
        migrationState={migrationState}
        migrationError={migrationError}
        onMerge={() => startMigration('merge')}
        onKeepCloud={() => startMigration('keep-cloud')}
        onDismiss={dismissMigration}
      />

      <AddHabitModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAdd}
        existingNames={existingNames}
      />

      <EditHabitModal
        habit={editHabit}
        open={editHabit !== null}
        onClose={() => setEditHabit(null)}
        onSave={updateHabit}
        existingNames={existingNames}
        globalReminderTime={settings.reminderTime}
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
        onReloadData={reloadData}
        showToast={showToast}
        archivedHabits={archivedHabits}
        onUnarchive={unarchiveHabit}
        onDeletePermanent={deleteHabit}
        habits={habits}
        syncState={syncState}
        lastSyncAt={lastSyncAt}
        onTriggerSync={triggerSync}
        onClearSyncError={clearSyncError}
        canInstall={canInstall}
        onInstall={installApp}
        isInstalled={isInstalled}
        isIOS={isIOSDevice}
      />

      <CompletionDialog
        habit={completionHabit}
        open={completionHabit !== null}
        onClose={() => setCompletionHabit(null)}
        onArchive={() => {
          if (completionHabit) {
            archiveHabit(completionHabit.id);
            showToast('Habit archived. Your progress is preserved.', { type: 'success' });
          }
          setCompletionHabit(null);
        }}
        onContinue={() => {
          showToast('Keep going! Your streak continues.', { type: 'success' });
          setCompletionHabit(null);
        }}
        onRepeat={() => {
          if (completionHabit) {
            archiveHabit(completionHabit.id);
            addHabit(completionHabit.name, completionHabit.color);
            showToast('New challenge started! Previous progress archived.', { type: 'success' });
          }
          setCompletionHabit(null);
        }}
        onShare={(h) => {
          setCompletionHabit(null);
          setShareHabit(h);
        }}
      />

      <ShareDialog
        open={shareHabit !== null}
        onClose={() => setShareHabit(null)}
        habit={shareHabit}
        isComplete={true}
        showToast={showToast}
      />

      <OfflineIndicator isOnline={isOnline} />

      <UpdateNotification
        needRefresh={needRefresh}
        onUpdate={applyUpdate}
        onDismiss={dismissUpdate}
      />

      <InstallPrompt
        show={showInstallBanner}
        isIOS={isIOSDevice}
        onInstall={installApp}
        onDismiss={dismissInstallBanner}
      />

      <Analytics />
    </>
  );
}

export default App;
