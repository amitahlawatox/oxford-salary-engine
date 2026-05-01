import { useCallback, useState } from "react";

/**
 * Privacy-first query-to-state hydration.
 *
 * We still accept existing query params so older shared links can prefill the
 * tool, but we do not write salary or financial inputs back into the URL
 * during normal use.
 */
export function useUrlState<T extends Record<string, string | number | boolean>>(
  initial: T,
): [T, (patch: Partial<T>) => void] {
  const read = (): T => {
    if (typeof window === "undefined") return initial;
    const sp = new URLSearchParams(window.location.search);
    const out: Record<string, unknown> = { ...initial };
    for (const k of Object.keys(initial)) {
      const v = sp.get(k);
      if (v == null) continue;
      const def = (initial as Record<string, unknown>)[k];
      if (typeof def === "number") out[k] = Number(v);
      else if (typeof def === "boolean") out[k] = v === "true" || v === "1";
      else out[k] = v;
    }
    return out as T;
  };

  const [state, setState] = useState<T>(read);
  const update = useCallback((patch: Partial<T>) => setState((s) => ({ ...s, ...patch })), []);
  return [state, update];
}
