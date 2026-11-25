import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../../lib/motion";

const ROWS = 9;
const TILE_TEXT = "TO BE CONTINUED";
const SPARKS = Array.from({ length: 18 }, (_, i) => ({
  angle: -75 + i * 9 + ((i * 37) % 7),
  distance: 90 + ((i * 53) % 130),
  delay: 0.18 + (i % 5) * 0.02,
}));

export default function EndCard() {
  const [animate] = useState(() => !prefersReducedMotion());
  const [playing, setPlaying] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!animate) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.55) setPlaying(true);
        else if (entry.intersectionRatio < 0.15) setPlaying(false);
      },
      { threshold: [0, 0.15, 0.55] }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animate]);

  const className = ["endcard", animate ? "endcard--anim" : "", playing ? "is-playing" : ""].filter(Boolean).join(" ");

  return (
    <section ref={ref} className={className} aria-label="End of page">
      <div className="endcard-tiles" aria-hidden="true">
        {Array.from({ length: ROWS }, (_, row) => (
          <div key={row} className={`endcard-row ${row % 2 ? "to-right" : "to-left"}`}>
            <div className="endcard-track">
              {Array.from({ length: 16 }, (_, i) => <span key={i}>{TILE_TEXT}</span>)}
            </div>
          </div>
        ))}
      </div>

      <div className="endcard-slashbox" aria-hidden="true">
        <div className="endcard-slash" />
        <div className="endcard-sparks">
          {SPARKS.map((s, i) => (
            <i key={i} style={{ "--a": s.angle, "--d": s.distance, animationDelay: `${s.delay}s` }} />
          ))}
        </div>
      </div>

      <div className="endcard-content">
        <h2 className="endcard-title">
          <span>To be</span>
          <span>continued<em>...</em></span>
        </h2>
        <p className="endcard-sub">Thanks for reading. The next chapter starts with a message.</p>
        <div className="endcard-actions">
          <a href="#contact">Get in touch</a>
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Back to top ↑</a>
        </div>
      </div>
    </section>
  );
}
