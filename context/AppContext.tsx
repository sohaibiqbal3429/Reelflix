import React, { createContext, useContext, useMemo, useState } from 'react';
import { progressSeed } from '@/constants/mockData';
import { UserProgress } from '@/lib/types';

type AppContextType = {
  savedIds: string[];
  notifiedIds: string[];
  progress: UserProgress[];
  recentSearches: string[];
  toggleSaved: (id: string) => void;
  toggleNotified: (id: string) => void;
  addRecentSearch: (query: string) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>(['s2', 's4']);
  const [notifiedIds, setNotifiedIds] = useState<string[]>(['s1']);
  const [progress] = useState<UserProgress[]>(progressSeed);
  const [recentSearches, setRecentSearches] = useState<string[]>(['mystery', 'urdu thriller', 'short romance']);

  const value = useMemo(
    () => ({
      savedIds,
      notifiedIds,
      progress,
      recentSearches,
      toggleSaved: (id: string) =>
        setSavedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
      toggleNotified: (id: string) =>
        setNotifiedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
      addRecentSearch: (query: string) =>
        setRecentSearches((prev) => [query, ...prev.filter((q) => q !== query)].slice(0, 6)),
    }),
    [savedIds, notifiedIds, progress, recentSearches]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
