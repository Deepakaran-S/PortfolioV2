import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { prefersReducedMotion } from "../lib/motion";

export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = () => {
    const next = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
    if (document.startViewTransition && !prefersReducedMotion()) {
      document.startViewTransition(() => flushSync(next));
    } else {
      next();
    }
  };

  return [theme, toggle];
}
