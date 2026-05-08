/**
 * SECURITY: Session-end financial data cleanup.
 *
 * Guarantees that no financial inputs persist in the browser
 * beyond the current session. Runs on page unload/hide.
 *
 * Only ukn-consent-v1 (cookie preference) and ukn-theme (display
 * preference) are intentionally retained — they contain no financial data.
 */

import { useEffect } from "react";

const RETAINED_KEYS = new Set(["ukn-consent-v1", "ukn-theme"]);

function clearFinancialSessionData() {
  try {
    // Clear all sessionStorage (always ephemeral — belt-and-braces)
    sessionStorage.clear();

    // Clear any localStorage keys that are NOT in our retained whitelist
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && !RETAINED_KEYS.has(key)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch {
    // Storage access may be blocked in private mode — safe to ignore
  }
}

/**
 * Mount this hook once in App.tsx.
 * Clears financial session data when the user closes or hides the tab.
 */
export function useSessionClear() {
  useEffect(() => {
    const handler = () => clearFinancialSessionData();

    // pagehide fires on tab close, navigation away, and mobile backgrounding
    window.addEventListener("pagehide", handler);
    // visibilitychange catches mobile app-switching (belt-and-braces)
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") clearFinancialSessionData();
    });

    return () => {
      window.removeEventListener("pagehide", handler);
    };
  }, []);
}
