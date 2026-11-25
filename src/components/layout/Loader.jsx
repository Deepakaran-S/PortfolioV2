import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../../lib/motion";

const MAX_MS = 5200;
const FADE_MS = 250;
const EXIT_MS = 900;

function markBooted() {
  document.documentElement.classList.remove("booting");
  document.documentElement.classList.add("booted");
  window.dispatchEvent(new Event("portfolio:booted"));
}

export default function Loader() {
  const [skipIntro] = useState(prefersReducedMotion);
  const [phase, setPhase] = useState(skipIntro ? "done" : "show");
  const canvasRef = useRef(null);
  const flashRef = useRef(null);

  useEffect(() => {
    document.getElementById("boot-splash")?.remove();

    if (skipIntro) {
      markBooted();
      return undefined;
    }

    document.body.style.overflow = "hidden";
    const timers = [];
    let finished = false;
    let cancelled = false;
    let scene = null;

    const leave = () => {
      if (finished) return;
      finished = true;
      window.removeEventListener("keydown", leave);
      window.removeEventListener("pointerdown", leave);
      document.body.style.overflow = "";
      markBooted();
      setPhase("leaving");
      timers.push(setTimeout(() => { scene?.dispose(); scene = null; }, FADE_MS + 100));
      timers.push(setTimeout(() => setPhase("done"), EXIT_MS));
    };

    const pageReady = new Promise((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", resolve, { once: true });
    });

    const sceneDone = new Promise((resolve) => {
      import("../../lib/slashScene")
        .then(({ createSlashIntro }) => {
          if (cancelled) return;
          scene = createSlashIntro({ canvas: canvasRef.current, flashEl: flashRef.current, onComplete: resolve });
        })
        .catch((error) => {
          console.error("Intro failed", error);
          resolve();
        });
    });

    Promise.all([document.fonts?.ready, pageReady, sceneDone]).then(leave);
    timers.push(setTimeout(leave, MAX_MS));

    window.addEventListener("keydown", leave);
    window.addEventListener("pointerdown", leave);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", leave);
      window.removeEventListener("pointerdown", leave);
      document.body.style.overflow = "";
      scene?.dispose();
    };
  }, [skipIntro]);

  if (phase === "done") return null;

  return (
    <div className={`boot-panel${phase === "leaving" ? " boot-leaving" : ""}`} role="status" aria-label="Loading portfolio">
      <div className="boot-half boot-half-a" />
      <div className="boot-half boot-half-b" />
      <div className="boot-scar" />
      <canvas ref={canvasRef} className="boot-canvas" />
      <div ref={flashRef} className="boot-flash" />
      <div className="boot-skip">click or press any key to skip</div>
    </div>
  );
}
