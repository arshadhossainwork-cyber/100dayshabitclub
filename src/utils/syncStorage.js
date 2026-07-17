import { SYNC_KEY } from './constants.js';

const DEFAULT_SYNC_META = {
  lastSyncAt: null,
  idMap: {},       // { localId: cloudUUID }
  snapshot: null,  // deep clone of last synced local habits
  pendingChanges: false,
};

export function loadSyncMeta() {
  try {
    const raw = localStorage.getItem(SYNC_KEY);
    if (!raw) return { ...DEFAULT_SYNC_META };
    return { ...DEFAULT_SYNC_META, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_SYNC_META };
  }
}

export function saveSyncMeta(partial) {
  try {
    const current = loadSyncMeta();
    const merged = { ...current, ...partial };
    localStorage.setItem(SYNC_KEY, JSON.stringify(merged));
  } catch {
    // localStorage full or unavailable — silently fail
  }
}

export function getCloudId(localId) {
  const meta = loadSyncMeta();
  return meta.idMap[localId] || null;
}

export function setIdMapping(localId, cloudId) {
  const meta = loadSyncMeta();
  meta.idMap[localId] = cloudId;
  saveSyncMeta({ idMap: meta.idMap });
}

export function saveSnapshot(habits) {
  saveSyncMeta({ snapshot: JSON.parse(JSON.stringify(habits)) });
}

export function getSnapshot() {
  const meta = loadSyncMeta();
  return meta.snapshot || null;
}

export function clearSyncMeta() {
  try {
    localStorage.removeItem(SYNC_KEY);
  } catch {
    // silently fail
  }
}

export function hasPendingChanges() {
  return loadSyncMeta().pendingChanges;
}

export function setPendingChanges(value) {
  saveSyncMeta({ pendingChanges: Boolean(value) });
}
