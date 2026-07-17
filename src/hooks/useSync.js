import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase.js';
import { fullSync } from '../lib/syncEngine.js';
import {
  loadSyncMeta,
  hasPendingChanges,
  setPendingChanges,
  clearSyncMeta,
} from '../utils/syncStorage.js';

const DEBOUNCE_MS = 3000;

export function useSync({ allHabits, settings, setData, isSignedIn, user, migrationState }) {
  const [syncState, setSyncState] = useState('idle'); // idle | syncing | synced | offline | error | conflict
  const [lastSyncAt, setLastSyncAt] = useState(null);
  const [error, setError] = useState(null);
  const [conflicts, setConflicts] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);

  const debounceRef = useRef(null);
  const isSyncingRef = useRef(false);
  const habitsRef = useRef(allHabits);
  habitsRef.current = allHabits;

  // Load initial sync metadata
  useEffect(() => {
    const meta = loadSyncMeta();
    if (meta.lastSyncAt) setLastSyncAt(meta.lastSyncAt);
  }, []);

  // Core sync function
  const doSync = useCallback(async () => {
    if (!isSignedIn || !user || !supabase || isSyncingRef.current) return;
    if (migrationState !== 'done') return;

    isSyncingRef.current = true;
    setSyncState('syncing');
    setError(null);

    try {
      const result = await fullSync(habitsRef.current, user.id, supabase);

      if (result.error) {
        // Check for auth expiry
        if (result.error.includes('JWT') || result.error.includes('401') || result.error.includes('token')) {
          setError('Session expired. Sign in again.');
        } else {
          setError(result.error);
        }
        setSyncState('error');
      } else {
        // Apply merged data
        setData((prev) => ({
          ...prev,
          habits: result.merged,
        }));

        setLastSyncAt(result.syncedAt);
        setPendingChanges(false);

        if (result.conflicts && result.conflicts.length > 0) {
          setConflicts(result.conflicts);
          setSyncState('conflict');
        } else {
          setConflicts([]);
          setSyncState('synced');
        }
      }
    } catch (err) {
      setError(err.message || 'Sync failed');
      setSyncState('error');
    } finally {
      isSyncingRef.current = false;
    }
  }, [isSignedIn, user, migrationState, setData]);

  // Manual sync trigger
  const triggerSync = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    doSync();
  }, [doSync]);

  // Debounced auto-sync when pending changes detected
  useEffect(() => {
    if (!isSignedIn || migrationState !== 'done') return;

    if (hasPendingChanges()) {
      setPendingCount((p) => p + 1);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        doSync();
      }, DEBOUNCE_MS);
    }

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [allHabits, isSignedIn, migrationState, doSync]);

  // Online/offline detection
  useEffect(() => {
    function handleOnline() {
      if (syncState === 'offline') {
        if (hasPendingChanges()) {
          doSync();
        } else {
          setSyncState(lastSyncAt ? 'synced' : 'idle');
        }
      }
    }

    function handleOffline() {
      setSyncState('offline');
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial state
    if (!navigator.onLine && isSignedIn) {
      setSyncState('offline');
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [syncState, lastSyncAt, isSignedIn, doSync]);

  // Clear sync state on sign-out
  useEffect(() => {
    if (!isSignedIn) {
      clearSyncMeta();
      setSyncState('idle');
      setLastSyncAt(null);
      setError(null);
      setConflicts([]);
      setPendingCount(0);
    }
  }, [isSignedIn]);

  // Resolve a single conflict
  const resolveConflict = useCallback(
    async (habitId, strategy) => {
      setConflicts((prev) => prev.filter((c) => c.habitId !== habitId));
      // After resolving, re-sync
      await doSync();
    },
    [doSync]
  );

  // Resolve all conflicts with one strategy
  const resolveAllConflicts = useCallback(
    async (strategy) => {
      setConflicts([]);
      await doSync();
    },
    [doSync]
  );

  const clearError = useCallback(() => {
    setError(null);
    setSyncState(lastSyncAt ? 'synced' : 'idle');
  }, [lastSyncAt]);

  return {
    syncState,
    lastSyncAt,
    error,
    conflicts,
    pendingCount,
    triggerSync,
    resolveConflict,
    resolveAllConflicts,
    clearError,
  };
}
