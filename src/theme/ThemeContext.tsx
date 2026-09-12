import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  ThemeContextValue,
  ThemePreference,
  ResolvedTheme,
} from "./types";
import { resolveInitialTheme, THEME_STORAGE_KEY } from "./themeScript";

export const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system")
      return stored;
  } catch {
  }
  return "system";
}

function writeStoredPreference(pref: ThemePreference) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, pref);
  } catch {
    // can't persist
  }
}

function applyToDom(resolved: ResolvedTheme) {
  const root = document.documentElement;

  const prefersReducedMotion = matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const supportsViewTransitions = "startViewTransition" in document;

  const apply = () => {
    root.dataset.theme = resolved;
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute("content", resolved === "dark" ? "#0f172a" : "#fefce8");
  };

  if (supportsViewTransitions && !prefersReducedMotion) {
    document.startViewTransition(apply);
  } else {
    apply();
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] =
    useState<ThemePreference>(readStoredPreference);

  const [resolvedTheme, setResolvedTheme] =
    useState<ResolvedTheme>(resolveInitialTheme);

  useEffect(() => {
    if (preference !== "system") {
      setResolvedTheme(preference);
      return;
    }

    const mql = matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setResolvedTheme(mql.matches ? "dark" : "light");
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, [preference]);

  useEffect(() => {
    applyToDom(resolvedTheme);
  }, [resolvedTheme]);

  const setPreference = useCallback((pref: ThemePreference) => {
    setPreferenceState(pref);
    writeStoredPreference(pref);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ preference, resolvedTheme, setPreference }),
    [preference, resolvedTheme, setPreference],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
