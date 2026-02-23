import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchProgress, updateProgress } from '@/lib/api';
import { UserProgress } from '@/lib/types';

type AppContextType = {
  savedIds: string[];
  notifiedIds: string[];
  progress: UserProgress[];
  recentSearches: string[];
  loading: boolean;
  toggleSaved: (id: string) => void;
  toggleNotified: (id: string) => void;
  addRecentSearch: (query: string) => void;
  saveProgress: (contentId: string, positionSec: number, durationSec: number) => Promise<void>;
};

const DEVICE_ID = 'device-demo-01';
const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [notifiedIds, setNotifiedIds] = useState<string[]>([]);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [saved, notified, recent] = await Promise.all([
        AsyncStorage.getItem('rf-saved'),
        AsyncStorage.getItem('rf-notified'),
        AsyncStorage.getItem('rf-recent')
      ]);
      setSavedIds(saved ? JSON.parse(saved) : []);
      setNotifiedIds(notified ? JSON.parse(notified) : []);
      setRecentSearches(recent ? JSON.parse(recent) : []);
      try {
        setProgress(await fetchProgress(DEVICE_ID));
      } catch {
        setProgress([]);
      }
      setLoading(false);
    })();
  }, []);

  const persist = (key: string, value: string[]) => AsyncStorage.setItem(key, JSON.stringify(value));

  const value = useMemo(
    () => ({
      savedIds,
      notifiedIds,
      progress,
      recentSearches,
      loading,
      toggleSaved: (id: string) => setSavedIds((prev) => {
        const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
        persist('rf-saved', next);
        return next;
      }),
      toggleNotified: (id: string) => setNotifiedIds((prev) => {
        const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
        persist('rf-notified', next);
        return next;
      }),
      addRecentSearch: (query: string) => setRecentSearches((prev) => {
        const next = [query, ...prev.filter((q) => q !== query)].slice(0, 6);
        persist('rf-recent', next);
        return next;
      }),
      saveProgress: async (contentId: string, positionSec: number, durationSec: number) => {
        const payload = { deviceId: DEVICE_ID, contentId, positionSec, durationSec };
        await updateProgress(payload);
        setProgress((prev) => {
          const idx = prev.findIndex((p) => p.contentId === contentId);
          const next = [...prev];
          if (idx >= 0) next[idx] = { ...next[idx], ...payload };
          else next.push(payload);
          return next;
        });
      }
    }),
    [savedIds, notifiedIds, progress, recentSearches, loading]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
