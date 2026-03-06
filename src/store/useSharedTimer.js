import { useEffect, useState } from "react";

const STORAGE_KEY = "countdown-timer";

export function useSharedTimer() {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : { duration: 300, timeLeft: 300, isRunning: false };
  });

  // Persist changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Sync between windows
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setState(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return { state, setState };
}
