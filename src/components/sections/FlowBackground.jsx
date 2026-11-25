import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../../lib/motion";

const TENANT_VARS = ["--cat-lime", "--cat-sky", "--cat-amber"];
const SPAWN_MS = 650;
const SPEED = 0.00022;

function readColors() {
  const style = getComputedStyle(document.documentElement);
  return TENANT_VARS.map((v) => style.getPropertyValue(v).trim() || "#84cc16");
}

function buildLayout(w, h) {
  const lanes = [0.24, 0.5, 0.76].map((p) => h * p);
  const mid = h * 0.5;
  return {
    client: { x: w * 0.06, y: mid },
    api: { x: w * 0.34, y: mid },
    filters: lanes.map((y) => ({ x: w * 0.64, y })),
    stores: lanes.map((y) => ({ x: w * 0.92, y })),
  };
}

function pathFor(layout, lane) {
  return [layout.client, layout.api, layout.filters[lane], layout.stores[lane]];
}

function pointAt(path, t) {
  const segments = path.length - 1;
  const scaled = Math.min(t, 0.9999) * segments;
  const i = Math.floor(scaled);
  const f = scaled - i;
  const a = path[i];
  const b = path[i + 1];
  return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
}

export default function FlowBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = prefersReducedMotion();
    let colors = readColors();
    let layout;
    let w = 0;
    let h = 0;
    let packets = [];
    let raf = 0;
    let last = 0;
    let sinceSpawn = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layout = buildLayout(w, h);
      draw();
    };

    const drawLinks = () => {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(128,128,128,0.22)";
      ctx.beginPath();
      ctx.moveTo(layout.client.x, layout.client.y);
      ctx.lineTo(layout.api.x, layout.api.y);
      layout.filters.forEach((f, i) => {
        ctx.moveTo(layout.api.x, layout.api.y);
        ctx.lineTo(f.x, f.y);
        ctx.moveTo(f.x, f.y);
        ctx.lineTo(layout.stores[i].x, layout.stores[i].y);
      });
      ctx.stroke();
    };

    const drawNode = (p, r, color) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(128,128,128,0.18)";
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = color;
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      drawLinks();
      drawNode(layout.client, 6, "rgba(128,128,128,0.5)");
      drawNode(layout.api, 8, "rgba(128,128,128,0.5)");
      layout.filters.forEach((f, i) => drawNode(f, 7, colors[i]));
      layout.stores.forEach((s, i) => drawNode(s, 9, colors[i]));

      packets.forEach((pk) => {
        const path = pathFor(layout, pk.lane);
        for (let k = 0; k < 6; k++) {
          const t = Math.max(0, pk.t - k * 0.012);
          const p = pointAt(path, t);
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3.2 - k * 0.45, 0, Math.PI * 2);
          ctx.globalAlpha = 0.9 - k * 0.14;
          ctx.fillStyle = colors[pk.lane];
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      });
    };

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(now - last, 64);
      last = now;
      sinceSpawn += dt;
      if (sinceSpawn > SPAWN_MS && packets.length < 14) {
        sinceSpawn = 0;
        packets.push({ lane: Math.floor(Math.random() * 3), t: 0 });
      }
      packets.forEach((pk) => { pk.t += dt * SPEED; });
      packets = packets.filter((pk) => pk.t < 1);
      draw();
    };

    const start = () => {
      if (reduced || raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onVisibility = () => (document.hidden ? stop() : start());
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    const ro = new ResizeObserver(resize);
    const themeObserver = new MutationObserver(() => {
      colors = readColors();
      draw();
    });

    io.observe(canvas);
    ro.observe(canvas);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    document.addEventListener("visibilitychange", onVisibility);
    resize();
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none", opacity: 0.55 }}
    />
  );
}
