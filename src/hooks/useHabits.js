import { useState, useCallback, useEffect } from 'react';
import { loadData, saveData } from '../utils/storage.js';
import { getToday } from '../utils/dates.js';

export function useHabits() {
  const [data, setData] = useState(() => loadData());

  // Persist to localStorage whenever data changes
  useEffect(() => {
    saveData(data);
  }, [data]);

  const habits = data.habits.filter((h) => !h.archived);
  const archivedHabits = data.habits.filter((h) => h.archived);
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
        },
      ],
    }));
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
        };
      }),
    }));
  }, []);

  const updateHabit = useCallback((habitId, updates) => {
    setData((prev) => ({
      ...prev,
      habits: prev.habits.map((h) =>
        h.id === habitId ? { ...h, ...updates } : h
      ),
    }));
  }, []);

  const archiveHabit = useCallback((habitId) => {
    setData((prev) => ({
      ...prev,
      habits: prev.habits.map((h) =>
        h.id === habitId ? { ...h, archived: true } : h
      ),
    }));
  }, []);

  const deleteHabit = useCallback((habitId) => {
    setData((prev) => ({
      ...prev,
      habits: prev.habits.filter((h) => h.id !== habitId),
    }));
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
    settings,
    addHabit,
    toggleDay,
    updateHabit,
    archiveHabit,
    deleteHabit,
    updateSettings,
  };
}
