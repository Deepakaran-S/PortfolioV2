import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, whenBooted } from "../../lib/motion";

const DURATION = 1100;
const START_DELAY = 350;

export function CountUp({ value }) {
  const text = String(value);
  const match = text.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const animated = Boolean(match) && !prefersReducedMotion();
  const target = match ? parseFloat(match[1]) : 0;
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;
  const suffix = match ? match[2] : "";
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (!animated) return undefined;
    let raf = 0;
    let timer = 0;
    let stopWaiting = () => {};

    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / DURATION, 1);
        setCurrent(target * (1 - Math.pow(1 - progress, 3)));
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      stopWaiting = whenBooted(() => { timer = setTimeout(run, START_DELAY); });
    });
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      stopWaiting();
    };
  }, [animated, target]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {animated ? `${current.toFixed(decimals)}${suffix}` : text}
    </span>
  );
}
