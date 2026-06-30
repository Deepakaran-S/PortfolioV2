import { Eyebrow, Tile } from "../core";

const POINTS = [
  "Developed multiple ERP modules supporting Admin, Manager, and Employee personas.",
  "Engineered full authentication flows — login, registration, protected routes, JWT session management.",
  "Built a React Native ride-hailing app with real-time map integration and role-based screens.",
  "Developed a Node.js PDF generation microservice used across multiple production applications.",
  "Led client communication — requirement gathering, scoping, and translating business needs to specs.",
];

export default function Experience() {
  return (
    <section id="experience" style={{ background: "var(--surface-sunken)", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "var(--measure)", margin: "0 auto" }}>
        <Eyebrow style={{ marginBottom: "2.5rem" }}>Experience</Eyebrow>
        <Tile hoverable={false} style={{ padding: "var(--tile-pad-lg)" }}>
          <div className="exp-grid" style={{ display: "grid", gridTemplateColumns: "210px 1fr", gap: "2.5rem" }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--ink-faint)", marginBottom: 6 }}>SEP 2025 – PRESENT</div>
              <div style={{ fontSize: 13, color: "var(--ink-muted)" }}>Bangalore</div>
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--ink-bright)", fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.02em" }}>Frontend Developer</h3>
              <div style={{ fontSize: 14, color: "var(--accent)", marginBottom: "1.5rem", fontWeight: 600 }}>Sirpi Data Science</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {POINTS.map((p, i) => (
                  <div key={i} style={{ display: "flex", gap: 12 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", marginTop: 8, flexShrink: 0 }} />
                    <p style={{ fontSize: 14.5, color: "var(--ink-body)", lineHeight: 1.6, margin: 0 }}>{p}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Tile>
      </div>
    </section>
  );
}
