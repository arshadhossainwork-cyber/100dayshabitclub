import { useState, useEffect, useCallback, useRef } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

const INSTALL_DISMISS_KEY = 'habitClub_installDismissed';
const ENGAGEMENT_THRESHOLD = 3; // habits created before showing install

function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  );
}

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

export function useServiceWorker(habitCount = 0) {
  // SW registration via vite-plugin-pwa
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(registration) {
      // Check for updates every 60 minutes
      if (registration) {
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);
      }
    },
  });

  // Install prompt state
  const [canInstall, setCanInstall] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const deferredPromptRef = useRef(null);

  // Network state
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Capture beforeinstallprompt
  useEffect(() => {
    function handleBeforeInstall(e) {
      e.preventDefault();
      deferredPromptRef.current = e;
      setCanInstall(true);
    }

    function handleAppInstalled() {
      deferredPromptRef.current = null;
      setCanInstall(false);
      setShowInstallBanner(false);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Show install banner after engagement threshold, not immediately
  useEffect(() => {
    if (!canInstall) return;
    if (isStandalone()) return;

    try {
      if (localStorage.getItem(INSTALL_DISMISS_KEY) === 'true') return;
    } catch {
      // ignore
    }

    if (habitCount >= ENGAGEMENT_THRESHOLD) {
      setShowInstallBanner(true);
    }
  }, [canInstall, habitCount]);

  // Network status
  useEffect(() => {
    function handleOnline() { setIsOnline(true); }
    function handleOffline() { setIsOnline(false); }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const installApp = useCallback(async () => {
    const prompt = deferredPromptRef.current;
    if (!prompt) return false;

    prompt.prompt();
    const { outcome } = await prompt.userChoice;
    deferredPromptRef.current = null;
    setCanInstall(false);
    setShowInstallBanner(false);
    return outcome === 'accepted';
  }, []);

  const dismissInstallBanner = useCallback(() => {
    setShowInstallBanner(false);
    try {
      localStorage.setItem(INSTALL_DISMISS_KEY, 'true');
    } catch {
      // ignore
    }
  }, []);

  const applyUpdate = useCallback(() => {
    updateServiceWorker(true);
  }, [updateServiceWorker]);

  const dismissUpdate = useCallback(() => {
    setNeedRefresh(false);
  }, [setNeedRefresh]);

  const dismissOfflineReady = useCallback(() => {
    setOfflineReady(false);
  }, [setOfflineReady]);

  return {
    // Update state
    needRefresh,
    offlineReady,
    applyUpdate,
    dismissUpdate,
    dismissOfflineReady,

    // Install state
    canInstall,
    showInstallBanner,
    installApp,
    dismissInstallBanner,
    isInstalled: isStandalone(),
    isIOS: isIOS(),

    // Network
    isOnline,
  };
}
