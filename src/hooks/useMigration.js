import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase.js';
import { fetchAllHabits, fetchAllEntries, ensureProfile } from '../lib/cloudRepository.js';
import { initialUpload, initialDownload, fullSync } from '../lib/syncEngine.js';
import { loadSyncMeta } from '../utils/syncStorage.js';
import { createBackup } from '../utils/storage.js';

export function useMigration({ allHabits, isSignedIn, user, setData, data }) {
  const [migrationNeeded, setMigrationNeeded] = useState(false);
  const [migrationData, setMigrationData] = useState(null);
  const [migrationState, setMigrationState] = useState('idle'); // idle | checking | ready | migrating | done | error
  const [migrationError, setMigrationError] = useState(null);
  const checkedRef = useRef(false);

  useEffect(() => {
    if (!isSignedIn || !user || !supabase || checkedRef.current) return;

    // Check if we've already synced before (have sync metadata)
    const syncMeta = loadSyncMeta();
    if (syncMeta.lastSyncAt) {
      // Already synced before — no migration needed
      setMigrationState('done');
      return;
    }

    checkedRef.current = true;
    checkMigration();

    async function checkMigration() {
      setMigrationState('checking');
      try {
        await ensureProfile(supabase, user.id, user.user_metadata);

        const cloudHabits = await fetchAllHabits(supabase, user.id);
        const cloudEntries = await fetchAllEntries(supabase, user.id);

        const localHasData = allHabits.length > 0;
        const cloudHasData = cloudHabits.length > 0;

        const localEntryCount = allHabits.reduce(
          (sum, h) => sum + (h.completedDays?.length || 0), 0
        );

        if (localHasData && cloudHasData) {
          // Both have data — need user decision
          const localDates = allHabits
            .flatMap((h) => [h.createdAt, ...(h.completedDays || [])])
            .filter(Boolean)
            .sort();
          const cloudDates = cloudHabits
            .map((h) => h.created_at?.split('T')[0])
            .filter(Boolean)
            .sort();

          setMigrationData({
            localCount: allHabits.length,
            cloudCount: cloudHabits.length,
            localEntries: localEntryCount,
            cloudEntries: cloudEntries.length,
            oldestLocal: localDates[0] || 'N/A',
            latestLocal: localDates[localDates.length - 1] || 'N/A',
            oldestCloud: cloudDates[0] || 'N/A',
            latestCloud: cloudDates[cloudDates.length - 1] || 'N/A',
          });
          setMigrationNeeded(true);
          setMigrationState('ready');
        } else if (localHasData && !cloudHasData) {
          // Local has data, cloud is empty — auto-upload
          setMigrationState('migrating');
          const result = await initialUpload(allHabits, user.id, supabase);
          if (result.error) {
            setMigrationError(result.error);
            setMigrationState('error');
          } else {
            setMigrationState('done');
          }
        } else if (!localHasData && cloudHasData) {
          // Cloud has data, local is empty — auto-download
          setMigrationState('migrating');
          const result = await initialDownload(user.id, supabase);
          if (result.error) {
            setMigrationError(result.error);
            setMigrationState('error');
          } else {
            setData((prev) => ({
              ...prev,
              habits: result.habits,
            }));
            setMigrationState('done');
          }
        } else {
          // Both empty — nothing to do
          setMigrationState('done');
        }
      } catch (err) {
        setMigrationError(err.message || 'Migration check failed');
        setMigrationState('error');
      }
    }
  }, [isSignedIn, user, allHabits, setData]);

  const startMigration = useCallback(
    async (strategy) => {
      if (!user || !supabase) return;

      setMigrationState('migrating');
      setMigrationError(null);

      // Always create a backup before migration
      createBackup();

      try {
        if (strategy === 'keep-local') {
          // Upload local data to cloud, replacing cloud
          const result = await initialUpload(allHabits, user.id, supabase);
          if (result.error) throw new Error(result.error);
        } else if (strategy === 'keep-cloud') {
          // Download cloud data, replacing local
          const result = await initialDownload(user.id, supabase);
          if (result.error) throw new Error(result.error);
          setData((prev) => ({
            ...prev,
            habits: result.habits,
          }));
        } else if (strategy === 'merge') {
          // Full sync merge
          const result = await fullSync(allHabits, user.id, supabase);
          if (result.error) throw new Error(result.error);
          setData((prev) => ({
            ...prev,
            habits: result.merged,
          }));
        }

        setMigrationNeeded(false);
        setMigrationState('done');
      } catch (err) {
        setMigrationError(err.message || 'Migration failed');
        setMigrationState('error');
      }
    },
    [user, allHabits, setData]
  );

  const dismissMigration = useCallback(() => {
    setMigrationNeeded(false);
    setMigrationState('idle');
  }, []);

  const retryMigration = useCallback(() => {
    checkedRef.current = false;
    setMigrationState('idle');
    setMigrationError(null);
  }, []);

  return {
    migrationNeeded,
    migrationData,
    migrationState,
    migrationError,
    startMigration,
    dismissMigration,
    retryMigration,
  };
}
