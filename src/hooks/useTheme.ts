import { useEffect, useState, useSyncExternalStore } from "react";

type ThemeChoice = "system" | "light" | "dark";
type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "theme";
const mql = typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)") : null;

function getSystemTheme(): ResolvedTheme {
  return mql?.matches ? "dark" : "light";
}

function getSavedChoice(): ThemeChoice {
  if (typeof window === "undefined") return "system";
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark" || saved === "system") return saved;
  return "system";
}

function applyTheme(resolved: ResolvedTheme) {
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

function subscribeToSystem(cb: () => void) {
  mql?.addEventListener("change", cb);
  return () => mql?.removeEventListener("change", cb);
}

export function useTheme() {
  const [choice, setChoice] = useState<ThemeChoice>(getSavedChoice);

  const systemTheme = useSyncExternalStore(subscribeToSystem, getSystemTheme, () => "light" as ResolvedTheme);

  const resolved: ResolvedTheme = choice === "system" ? systemTheme : choice;

  useEffect(() => {
    applyTheme(resolved);
  }, [resolved]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, choice);
  }, [choice]);

  const cycle = () =>
    setChoice((c) => (c === "system" ? "light" : c === "light" ? "dark" : "system"));

  return { choice, resolved, setChoice, cycle };
}
