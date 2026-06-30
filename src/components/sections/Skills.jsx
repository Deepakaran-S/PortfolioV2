import { useState, useEffect } from "react";
import { Eyebrow } from "../core";
import { SKILLS, CONNECTIONS, GROUP_COLORS, GROUP_LABELS } from "../../data/skills";

export default function Skills() {
  const [hovered, setHovered] = useState(null);
  const [tick, setTick] = useState(0);
  useEffect(() => { const id = setInterval(() => setTick((t) => t + 1), 50); return () => clearInterval(id); }, []);

  const W = 800, H = 420;
  const toSVG = (px, py) => ({ x: (px / 100) * W, y: (py / 100) * H });
  const positions = SKILLS.map((s, i) => {
    const b = toSVG(s.x, s.y);
    return { ...s, cx: b.x + Math.sin(tick * 0.02 + i * 1.2) * 2.5, cy: b.y + Math.cos(tick * 0.015 + i * 0.9) * 2 };
  });

  return (
    <section id="skills" style={{ background: "var(--surface-base)", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "var(--measure)", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: 12 }}>
          <div>
            <Eyebrow style={{ marginBottom: 8 }}>Skills</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "var(--ink-bright)", fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Technology constellation</h2>
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {Object.entries(GROUP_LABELS).map(([k, l]) => (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: GROUP_COLORS[k] }} />
                <span style={{ fontSize: 11, color: "var(--ink-faint)" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "var(--glass-fill)", backdropFilter: "var(--blur-glass)", WebkitBackdropFilter: "var(--blur-glass)", border: "1px solid var(--glass-border)", borderRadius: "var(--radius-xl)", overflow: "hidden", position: "relative", boxShadow: "var(--glass-shadow)" }}>
          <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
            {Array.from({ length: 60 }).map((_, i) => (
              <circle key={i} cx={(Math.sin(i * 127.1) * 0.5 + 0.5) * W} cy={(Math.sin(i * 311.7) * 0.5 + 0.5) * H}
                r={Math.sin(i * 51.3) * 0.5 + 0.3} fill="var(--ink-ghost)" opacity={0.4 + Math.sin(tick * 0.02 + i) * 0.2} />
            ))}
            {CONNECTIONS.map(([a, b], i) => {
              const sa = positions[a], sb = positions[b];
              const isH = hovered === a || hovered === b;
              return <line key={i} x1={sa.cx} y1={sa.cy} x2={sb.cx} y2={sb.cy}
                stroke={isH ? GROUP_COLORS[sa.group] : "var(--border-strong)"} strokeWidth={isH ? 1.2 : 0.6} opacity={isH ? 0.85 : 0.5} style={{ transition: "all .3s" }} />;
            })}
            {positions.map((s, i) => {
              const isH = hovered === i;
              const c = GROUP_COLORS[s.group];
              return (
                <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ cursor: "pointer" }}>
                  {isH && <circle cx={s.cx} cy={s.cy} r={s.size + 8} fill={c} opacity={0.1} />}
                  <circle cx={s.cx} cy={s.cy} r={isH ? s.size + 2 : s.size} fill={isH ? c : "var(--surface-chip)"} stroke={c} strokeWidth={isH ? 1.5 : 1} style={{ transition: "all .2s" }} />
                  <text x={s.cx} y={s.cy + 1} textAnchor="middle" dominantBaseline="middle" fontSize={isH ? 9 : 8}
                    fill={isH ? "#fff" : c} fontFamily="Hanken Grotesk, sans-serif" fontWeight={600} style={{ userSelect: "none", pointerEvents: "none", transition: "all .2s" }}>{s.name}</text>
                </g>
              );
            })}
          </svg>
          {hovered !== null && (
            <div style={{ position: "absolute", bottom: 16, left: 16, background: "var(--glass-fill-strong)", backdropFilter: "var(--blur-glass)", WebkitBackdropFilter: "var(--blur-glass)", border: `1px solid ${GROUP_COLORS[SKILLS[hovered].group]}55`, borderRadius: "var(--radius-md)", padding: "10px 16px" }}>
              <div style={{ fontSize: 13.5, color: "var(--ink-bright)", fontWeight: 600 }}>{SKILLS[hovered].name}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: GROUP_COLORS[SKILLS[hovered].group], marginTop: 3, textTransform: "uppercase", letterSpacing: "0.1em" }}>{GROUP_LABELS[SKILLS[hovered].group]}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
