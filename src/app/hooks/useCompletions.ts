import { useState, useEffect, useCallback } from 'react';

export type SectionKey = 'practice' | 'techBoundary' | 'niceSelf' | 'niceOther';

type Completions = Record<SectionKey, boolean>;

const STORAGE_KEY = 'bitless-completions';

const defaultCompletions: Completions = {
  practice: false,
  techBoundary: false,
  niceSelf: false,
  niceOther: false,
};

function loadCompletions(dateKey: string): Completions {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultCompletions };
    const all = JSON.parse(raw);
    return all[dateKey] ?? { ...defaultCompletions };
  } catch {
    return { ...defaultCompletions };
  }
}

function saveCompletions(dateKey: string, completions: Completions): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const all = raw ? JSON.parse(raw) : {};
    all[dateKey] = completions;

    // Housekeeping: keep only last 7 days
    const keys = Object.keys(all).sort();
    while (keys.length > 7) {
      const oldest = keys.shift()!;
      delete all[oldest];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // Silently fail if localStorage unavailable
  }
}

export function useCompletions(dateKey: string) {
  const [completions, setCompletions] = useState<Completions>(() =>
    loadCompletions(dateKey)
  );

  useEffect(() => {
    setCompletions(loadCompletions(dateKey));
  }, [dateKey]);

  const toggle = useCallback(
    (section: SectionKey) => {
      setCompletions((prev) => {
        const next = { ...prev, [section]: !prev[section] };
        saveCompletions(dateKey, next);
        return next;
      });
    },
    [dateKey]
  );

  return { completions, toggle };
}
