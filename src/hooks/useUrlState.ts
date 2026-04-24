import { useCallback, useEffect, useState } from "react";

/**
 * Bidirectional URL ⇄ state. Encodes a flat object into the query string.
 * Numbers and booleans are auto-coerced.
 */
export function useUrlState<T extends Record<string, string | number | boolean>>(initial: T): [T, (patch: Partial<T>) => void] {
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

  useEffect(() => {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(state)) {
      if (v === "" || v == null) continue;
      sp.set(k, String(v));
    }
    const qs = sp.toString();
    const url = `${window.location.pathname}${qs ? `?${qs}` : ""}`;
    window.history.replaceState(null, "", url);
  }, [state]);

  const update = useCallback((patch: Partial<T>) => setState((s) => ({ ...s, ...patch })), []);
  return [state, update];
}