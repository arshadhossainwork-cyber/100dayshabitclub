import { useState, useCallback, useEffect } from 'react';
import { loadData, saveData } from '../utils/storage.js';
import { STORAGE_KEY } from '../utils/constants.js';
import { getToday } from '../utils/dates.js';
import { setPendingChanges } from '../utils/syncStorage.js';

export function useHabits() {
  const [data, setData] = useState(() => loadData());
  const [saveError, setSaveError] = useState(false);

  // Persist to localStorage whenever data changes
  useEffect(() => {
    const ok = saveData(data);
    setSaveError(!ok);
  }, [data]);

  // Multi-tab sync: reload data when another tab writes to localStorage
  useEffect(() => {
    function handleStorage(e) {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setData(parsed);
          window.dispatchEvent(new Event('habitclub:tab-sync'));
        } catch {
          // Ignore malformed data from other tabs
        }
      }
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const reloadData = useCallback(() => {
    setData(loadData());
  }, []);

  const habits = data.habits.filter((h) => !h.archived);
  const archivedHabits = data.habits.filter((h) => h.archived);
  const allHabits = data.habits;
  const settings = data.settings;

  const addHabit = useCallback((name, color) => {
    setData((prev) => ({
      ...prev,
      habits: [
        ...prev.habits,
        {
          id: `h_${Date.now()}`,
          name: name.trim(),
          color,
          createdAt: getToday(),
          completedDays: [],
          archived: false,
          updatedAt: Date.now(),
        },
      ],
    }));
    setPendingChanges(true);
  }, []);

  const toggleDay = useCallback((habitId, date) => {
    const dateStr = date || getToday();
    setData((prev) => ({
      ...prev,
      habits: prev.habits.map((h) => {
        if (h.id !== habitId) return h;
        const has = h.completedDays.includes(dateStr);
        return {
          ...h,
          completedDays: has
            ? h.completedDays.filter((d) => d !== dateStr)
            : [...h.completedDays, dateStr].sort(),
          updatedAt: Date.now(),
        };
      }),
    }));
    setPendingChanges(true);
  }, []);

  const updateHabit = useCallback((habitId, updates) => {
    setData((prev) => ({
      ...prev,
      habits: prev.habits.map((h) =>
        h.id === habitId ? { ...h, ...updates, updatedAt: Date.now() } : h
      ),
    }));
    setPendingChanges(true);
  }, []);

  const archiveHabit = useCallback((habitId) => {
    setData((prev) => ({
      ...prev,
      habits: prev.habits.map((h) =>
        h.id === habitId ? { ...h, archived: true, updatedAt: Date.now() } : h
      ),
    }));
    setPendingChanges(true);
  }, []);

  const unarchiveHabit = useCallback((habitId) => {
    setData((prev) => ({
      ...prev,
      habits: prev.habits.map((h) =>
        h.id === habitId ? { ...h, archived: false, updatedAt: Date.now() } : h
      ),
    }));
    setPendingChanges(true);
  }, []);

  const deleteHabit = useCallback((habitId) => {
    setData((prev) => ({
      ...prev,
      habits: prev.habits.filter((h) => h.id !== habitId),
    }));
    setPendingChanges(true);
  }, []);

  const restoreHabit = useCallback((habitData) => {
    setData((prev) => ({
      ...prev,
      habits: [...prev.habits, { ...habitData, updatedAt: Date.now() }],
    }));
    setPendingChanges(true);
  }, []);

  const updateSettings = useCallback((updates) => {
    setData((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...updates },
    }));
  }, []);

  return {
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
  };
}
