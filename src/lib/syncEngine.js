/**
 * Core sync logic: merge, delta computation, conflict detection.
 * No React dependencies — pure functions + async Supabase calls.
 */

import {
  fetchAllHabits,
  fetchAllEntries,
  upsertHabit,
  upsertEntries,
  deleteEntries,
} from './cloudRepository.js';
import {
  loadSyncMeta,
  saveSyncMeta,
  saveSnapshot,
  setIdMapping,
} from '../utils/syncStorage.js';

// ============================================================
// Format converters
// ============================================================

/**
 * Convert cloud habits + entries into local format.
 */
export function convertCloudToLocal(cloudHabits, cloudEntries) {
  const entriesByHabit = {};
  for (const entry of cloudEntries) {
    if (!entriesByHabit[entry.habit_id]) entriesByHabit[entry.habit_id] = [];
    entriesByHabit[entry.habit_id].push(entry.completed_date);
  }

  return cloudHabits.map((ch) => ({
    id: ch.local_id || ch.id,
    name: ch.name,
    color: ch.color,
    createdAt: ch.created_at ? ch.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
    completedDays: (entriesByHabit[ch.id] || []).sort(),
    archived: ch.archived || false,
    updatedAt: new Date(ch.updated_at).getTime(),
    reminderEnabled: ch.reminder_enabled || false,
    reminderTime: ch.reminder_time || null,
    reminderDays: ch.reminder_days || null,
    reminderMessage: ch.reminder_message || null,
  }));
}

/**
 * Convert a local habit into cloud format.
 */
export function convertLocalToCloud(localHabit) {
  return {
    habit: {
      local_id: localHabit.id,
      name: localHabit.name,
      color: localHabit.color,
      archived: localHabit.archived || false,
      created_at: localHabit.createdAt
        ? new Date(localHabit.createdAt + 'T00:00:00').toISOString()
        : new Date().toISOString(),
      reminder_enabled: localHabit.reminderEnabled || false,
      reminder_time: localHabit.reminderTime || null,
      reminder_days: localHabit.reminderDays || null,
      reminder_message: localHabit.reminderMessage || null,
    },
    entries: localHabit.completedDays || [],
  };
}

// ============================================================
// Initial upload (first sign-in, no cloud data)
// ============================================================

export async function initialUpload(localHabits, userId, supabase) {
  const idMap = {};
  try {
    for (const habit of localHabits) {
      const { habit: cloudHabit, entries } = convertLocalToCloud(habit);
      const row = await upsertHabit(supabase, userId, cloudHabit);
      idMap[habit.id] = row.id;
      setIdMapping(habit.id, row.id);

      if (entries.length > 0) {
        await upsertEntries(supabase, row.id, userId, entries);
      }
    }

    saveSnapshot(localHabits);
    saveSyncMeta({
      lastSyncAt: new Date().toISOString(),
      idMap: { ...loadSyncMeta().idMap, ...idMap },
      pendingChanges: false,
    });

    return { idMap };
  } catch (error) {
    return { idMap, error: error.message || 'Upload failed' };
  }
}

// ============================================================
// Initial download (cloud has data, local is empty)
// ============================================================

export async function initialDownload(userId, supabase) {
  try {
    const cloudHabits = await fetchAllHabits(supabase, userId);
    const cloudEntries = await fetchAllEntries(supabase, userId);
    const localHabits = convertCloudToLocal(cloudHabits, cloudEntries);

    // Store ID mappings
    const idMap = {};
    for (const ch of cloudHabits) {
      const localId = ch.local_id || ch.id;
      idMap[localId] = ch.id;
      setIdMapping(localId, ch.id);
    }

    saveSnapshot(localHabits);
    saveSyncMeta({
      lastSyncAt: new Date().toISOString(),
      pendingChanges: false,
    });

    return { habits: localHabits };
  } catch (error) {
    return { habits: [], error: error.message || 'Download failed' };
  }
}

// ============================================================
// Full sync (delta-based merge)
// ============================================================

export async function fullSync(localHabits, userId, supabase) {
  const conflicts = [];

  try {
    // 1. Fetch cloud state
    const cloudHabits = await fetchAllHabits(supabase, userId);
    const cloudEntries = await fetchAllEntries(supabase, userId);

    // 2. Load snapshot (last synced state)
    const meta = loadSyncMeta();
    const snapshot = meta.snapshot || [];

    // Build lookup maps
    const snapshotMap = {};
    for (const h of snapshot) snapshotMap[h.id] = h;

    const localMap = {};
    for (const h of localHabits) localMap[h.id] = h;

    const cloudMap = {};
    for (const ch of cloudHabits) {
      const localId = ch.local_id || ch.id;
      cloudMap[localId] = ch;
    }

    // Cloud entries grouped by habit cloud ID
    const cloudEntriesByHabit = {};
    for (const e of cloudEntries) {
      if (!cloudEntriesByHabit[e.habit_id]) cloudEntriesByHabit[e.habit_id] = [];
      cloudEntriesByHabit[e.habit_id].push(e.completed_date);
    }

    const merged = [];
    const processedLocalIds = new Set();
    const processedCloudIds = new Set();

    // 3. Process each local habit
    for (const localHabit of localHabits) {
      processedLocalIds.add(localHabit.id);
      const cloudHabit = cloudMap[localHabit.id];
      const snapshotHabit = snapshotMap[localHabit.id];

      if (!cloudHabit) {
        // Local-only (new) — push to cloud
        const { habit: ch, entries } = convertLocalToCloud(localHabit);
        const row = await upsertHabit(supabase, userId, ch);
        setIdMapping(localHabit.id, row.id);

        if (entries.length > 0) {
          await upsertEntries(supabase, row.id, userId, entries);
        }

        merged.push(localHabit);
      } else {
        // Exists in both local and cloud
        processedCloudIds.add(cloudHabit.id);
        const cloudId = cloudHabit.id;

        // Determine what changed since snapshot
        const localChanged = hasMetadataChanged(snapshotHabit, localHabit);
        const cloudLocalView = {
          name: cloudHabit.name,
          color: cloudHabit.color,
          archived: cloudHabit.archived,
          reminderEnabled: cloudHabit.reminder_enabled || false,
          reminderTime: cloudHabit.reminder_time || null,
          reminderDays: cloudHabit.reminder_days || null,
          reminderMessage: cloudHabit.reminder_message || null,
        };
        const snapshotView = snapshotHabit
          ? { name: snapshotHabit.name, color: snapshotHabit.color, archived: snapshotHabit.archived,
              reminderEnabled: snapshotHabit.reminderEnabled, reminderTime: snapshotHabit.reminderTime,
              reminderDays: snapshotHabit.reminderDays, reminderMessage: snapshotHabit.reminderMessage }
          : null;
        const cloudChanged = snapshotView
          ? (cloudLocalView.name !== snapshotView.name ||
             cloudLocalView.color !== snapshotView.color ||
             cloudLocalView.archived !== snapshotView.archived ||
             cloudLocalView.reminderEnabled !== snapshotView.reminderEnabled ||
             cloudLocalView.reminderTime !== snapshotView.reminderTime ||
             JSON.stringify(cloudLocalView.reminderDays) !== JSON.stringify(snapshotView.reminderDays) ||
             cloudLocalView.reminderMessage !== snapshotView.reminderMessage)
          : false;

        let mergedHabit = { ...localHabit };

        if (localChanged && cloudChanged) {
          // Both changed — last-write-wins by updatedAt
          const cloudUpdatedAt = new Date(cloudHabit.updated_at).getTime();
          const localUpdatedAt = localHabit.updatedAt || 0;

          if (cloudUpdatedAt > localUpdatedAt) {
            mergedHabit = {
              ...mergedHabit,
              name: cloudHabit.name,
              color: cloudHabit.color,
              archived: cloudHabit.archived,
              updatedAt: cloudUpdatedAt,
              reminderEnabled: cloudHabit.reminder_enabled || false,
              reminderTime: cloudHabit.reminder_time || null,
              reminderDays: cloudHabit.reminder_days || null,
              reminderMessage: cloudHabit.reminder_message || null,
            };
          } else {
            // Push local metadata to cloud
            const { habit: ch } = convertLocalToCloud(mergedHabit);
            await upsertHabit(supabase, userId, ch);
          }

          conflicts.push({
            habitId: localHabit.id,
            type: 'metadata',
            local: { name: localHabit.name, color: localHabit.color, archived: localHabit.archived },
            cloud: { name: cloudHabit.name, color: cloudHabit.color, archived: cloudHabit.archived },
            resolved: true,
            strategy: cloudUpdatedAt > localUpdatedAt ? 'keep-cloud' : 'keep-local',
          });
        } else if (localChanged && !cloudChanged) {
          // Only local changed — push to cloud
          const { habit: ch } = convertLocalToCloud(mergedHabit);
          await upsertHabit(supabase, userId, ch);
        } else if (!localChanged && cloudChanged) {
          // Only cloud changed — pull to local
          mergedHabit = {
            ...mergedHabit,
            name: cloudHabit.name,
            color: cloudHabit.color,
            archived: cloudHabit.archived,
            updatedAt: new Date(cloudHabit.updated_at).getTime(),
            reminderEnabled: cloudHabit.reminder_enabled || false,
            reminderTime: cloudHabit.reminder_time || null,
            reminderDays: cloudHabit.reminder_days || null,
            reminderMessage: cloudHabit.reminder_message || null,
          };
        }

        // Entry merge: union merge with delta detection
        const cloudDates = new Set(cloudEntriesByHabit[cloudId] || []);
        const localDates = new Set(localHabit.completedDays || []);
        const snapshotDates = new Set(snapshotHabit?.completedDays || []);

        // Dates added locally (in local but not in snapshot)
        const localAdded = [...localDates].filter((d) => !snapshotDates.has(d));
        // Dates removed locally (in snapshot but not in local)
        const localRemoved = [...snapshotDates].filter((d) => !localDates.has(d));
        // Dates added in cloud (in cloud but not in snapshot)
        const cloudAdded = [...cloudDates].filter((d) => !snapshotDates.has(d));
        // Dates removed in cloud (in snapshot but not in cloud)
        const cloudRemoved = [...snapshotDates].filter((d) => !cloudDates.has(d));

        // Build merged date set: start from snapshot, apply all additions, apply all removals
        const mergedDates = new Set(snapshotDates);
        for (const d of localAdded) mergedDates.add(d);
        for (const d of cloudAdded) mergedDates.add(d);
        for (const d of localRemoved) {
          // Only remove if cloud didn't re-add it
          if (!cloudAdded.includes(d)) mergedDates.delete(d);
        }
        for (const d of cloudRemoved) {
          // Only remove if local didn't re-add it
          if (!localAdded.includes(d)) mergedDates.delete(d);
        }

        mergedHabit.completedDays = [...mergedDates].sort();

        // Push entry changes to cloud
        const datesToAddToCloud = [...mergedDates].filter((d) => !cloudDates.has(d));
        const datesToRemoveFromCloud = [...cloudDates].filter((d) => !mergedDates.has(d));

        if (datesToAddToCloud.length > 0) {
          await upsertEntries(supabase, cloudId, userId, datesToAddToCloud);
        }
        if (datesToRemoveFromCloud.length > 0) {
          await deleteEntries(supabase, cloudId, datesToRemoveFromCloud);
        }

        merged.push(mergedHabit);
      }
    }

    // 4. Process cloud-only habits (new from another device)
    for (const cloudHabit of cloudHabits) {
      if (processedCloudIds.has(cloudHabit.id)) continue;

      const localId = cloudHabit.local_id || cloudHabit.id;

      // Check if this was deleted locally (existed in snapshot but not in local)
      if (snapshotMap[localId] && !localMap[localId]) {
        // Habit was deleted locally — keep cloud version but flag as conflict
        conflicts.push({
          habitId: localId,
          cloudId: cloudHabit.id,
          type: 'deleted-locally',
          cloud: { name: cloudHabit.name, color: cloudHabit.color },
          resolved: false,
        });
        // Default: keep cloud (deletions are destructive)
        const cloudDates = cloudEntriesByHabit[cloudHabit.id] || [];
        merged.push({
          id: localId,
          name: cloudHabit.name,
          color: cloudHabit.color,
          createdAt: cloudHabit.created_at ? cloudHabit.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
          completedDays: cloudDates.sort(),
          archived: cloudHabit.archived || false,
          updatedAt: new Date(cloudHabit.updated_at).getTime(),
          reminderEnabled: cloudHabit.reminder_enabled || false,
          reminderTime: cloudHabit.reminder_time || null,
          reminderDays: cloudHabit.reminder_days || null,
          reminderMessage: cloudHabit.reminder_message || null,
        });
        setIdMapping(localId, cloudHabit.id);
      } else if (!snapshotMap[localId]) {
        // Truly new from cloud — pull to local
        const cloudDates = cloudEntriesByHabit[cloudHabit.id] || [];
        merged.push({
          id: localId,
          name: cloudHabit.name,
          color: cloudHabit.color,
          createdAt: cloudHabit.created_at ? cloudHabit.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
          completedDays: cloudDates.sort(),
          archived: cloudHabit.archived || false,
          updatedAt: new Date(cloudHabit.updated_at).getTime(),
          reminderEnabled: cloudHabit.reminder_enabled || false,
          reminderTime: cloudHabit.reminder_time || null,
          reminderDays: cloudHabit.reminder_days || null,
          reminderMessage: cloudHabit.reminder_message || null,
        });
        setIdMapping(localId, cloudHabit.id);
      }
    }

    // 5. Handle habits deleted in cloud but still in local
    for (const localHabit of localHabits) {
      const cloudHabit = cloudMap[localHabit.id];
      const snapshotHabit = snapshotMap[localHabit.id];

      if (!cloudHabit && snapshotHabit) {
        // Was in snapshot (synced before) but no longer in cloud — deleted remotely
        // Check if already in merged (it is, from the local loop above — it was pushed as new)
        // We should flag this as a conflict instead
        const idx = merged.findIndex((m) => m.id === localHabit.id);
        if (idx !== -1) {
          conflicts.push({
            habitId: localHabit.id,
            type: 'deleted-in-cloud',
            local: { name: localHabit.name, color: localHabit.color },
            resolved: false,
          });
          // Default: keep local
        }
      }
    }

    // 6. Save new snapshot
    saveSnapshot(merged);
    const syncedAt = new Date().toISOString();
    saveSyncMeta({
      lastSyncAt: syncedAt,
      pendingChanges: false,
    });

    return {
      merged,
      conflicts: conflicts.filter((c) => !c.resolved),
      syncedAt,
    };
  } catch (error) {
    return {
      merged: localHabits, // Return unchanged local on error
      conflicts: [],
      error: error.message || 'Sync failed',
      syncedAt: null,
    };
  }
}

// ============================================================
// Helpers
// ============================================================

function hasMetadataChanged(snapshotHabit, currentHabit) {
  if (!snapshotHabit) return true;
  return (
    snapshotHabit.name !== currentHabit.name ||
    snapshotHabit.color !== currentHabit.color ||
    snapshotHabit.archived !== currentHabit.archived ||
    snapshotHabit.reminderEnabled !== currentHabit.reminderEnabled ||
    snapshotHabit.reminderTime !== currentHabit.reminderTime ||
    JSON.stringify(snapshotHabit.reminderDays) !== JSON.stringify(currentHabit.reminderDays) ||
    snapshotHabit.reminderMessage !== currentHabit.reminderMessage
  );
}
