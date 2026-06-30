import { useState, useEffect, useRef } from "react";
import { Eyebrow, Button, Stat, Tile, Badge, Tag } from "../core";

const ROLES = ["Full Stack Developer", "React Native Engineer", "FastAPI Architect", "SaaS Builder"];

export default function Hero() {
  const [typed, setTyped] = useState("");
  const st = useRef({ role: 0, char: 0, dir: 1, pause: 0 });

  useEffect(() => {
    const id = setInterval(() => {
      const s = st.current;
      if (s.pause > 0) { s.pause--; return; }
      const role = ROLES[s.role];
      if (s.dir === 1) {
        s.char++; setTyped(role.slice(0, s.char));
        if (s.char === role.length) { s.dir = -1; s.pause = 24; }
      } else {
        s.char--; setTyped(role.slice(0, s.char));
        if (s.char === 0) { s.dir = 1; s.role = (s.role + 1) % ROLES.length; }
      }
    }, 60);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--surface-base)" }}>
      {/* lime mesh field */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", width: 460, height: 460, borderRadius: "50%", filter: "blur(80px)", opacity: "var(--mesh-opacity)", background: "var(--mesh-1)", top: -120, left: -60 }} />
        <div style={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", filter: "blur(80px)", opacity: "var(--mesh-opacity)", background: "var(--mesh-2)", bottom: -140, right: -40 }} />
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", filter: "blur(70px)", opacity: "var(--mesh-opacity)", background: "var(--mesh-3)", top: 240, left: "44%" }} />
      </div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: "var(--measure)", margin: "0 auto", padding: "8.5rem 1.5rem 4rem", width: "100%" }}>
        <div className="bento-hero" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "minmax(0, auto)", gap: "var(--bento-gap)" }}>

          {/* identity — wide */}
          <Tile span={2} align="between" style={{ minHeight: 280 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
              <Eyebrow rule>Deepakaran S — Portfolio 2025</Eyebrow>
              <Badge>Available for work</Badge>
            </div>
            <div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.03em", margin: 0, color: "var(--ink-bright)" }}>
                Deepakaran <span style={{ color: "var(--accent)" }}>S.</span>
              </h1>
              <div style={{ marginTop: 14, height: "1.8rem", display: "flex", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)", color: "var(--ink-muted)" }}>
                  {typed}<span style={{ color: "var(--accent)", marginLeft: 1, animation: "blink 1s step-end infinite" }}>|</span>
                </span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Button href="#projects">View projects</Button>
              <Button variant="secondary" href="#contact">Get in touch</Button>
            </div>
          </Tile>

          {/* location tile */}
          <Tile align="between" accent="var(--cat-mint)">
            <div style={{ width: 60, height: 60, borderRadius: "var(--radius-md)", background: "var(--surface-ink)", color: "var(--on-ink)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24 }}>DS</div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "var(--ink-bright)", letterSpacing: "-0.02em" }}>Bangalore, IN</div>
              <p style={{ fontSize: 13, color: "var(--ink-soft)", margin: "4px 0 0", lineHeight: 1.5 }}>Frontend Developer @ Sirpi Data Science</p>
            </div>
          </Tile>

          {/* stats */}
          {[["8+", "months industry exp"], ["4+", "production apps shipped"], ["5+", "tech stacks"]].map(([n, l]) => (
            <Tile key={l} align="center"><Stat figure={n} label={l} /></Tile>
          ))}

          {/* lead paragraph — wide */}
          <Tile span={3} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <p style={{ maxWidth: 620, fontSize: 16, lineHeight: 1.6, color: "var(--ink-body)", margin: 0 }}>
              I build production-grade web &amp; mobile apps — ERP systems, SaaS platforms, and backend services that real teams rely on every day.
            </p>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
              <Tag>React</Tag><Tag>FastAPI</Tag><Tag>Node.js</Tag><Tag>PostgreSQL</Tag><Tag>React Native</Tag>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
}
