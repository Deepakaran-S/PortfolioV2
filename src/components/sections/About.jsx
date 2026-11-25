import { SectionHeading, Tile } from "../core";
import { PROFILE, getExperience } from "../../data/profile";

const FACTS = [
  { label: "Current role", value: `Frontend Developer — ${PROFILE.company}, Bangalore` },
  { label: "Education", value: "B.Tech Information Technology (2021–2025) — KSR College of Engineering, Namakkal" },
  { label: "Location", value: "Tamil Nadu, India" },
  { label: "Stack", value: "React · TypeScript · Node.js · FastAPI · PostgreSQL · MongoDB · React Native" },
];

export default function About() {
  const { duration } = getExperience();

  return (
    <section id="about" style={{ background: "var(--surface-sunken)", padding: "5rem 1.5rem" }}>
      <div className="grid-2" style={{ maxWidth: "var(--measure)", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--bento-gap)", alignItems: "stretch" }}>
        <Tile hoverable={false} style={{ padding: "var(--tile-pad-lg)" }}>
          <SectionHeading eyebrow="About" size="var(--text-display-sm)" style={{ marginBottom: "1.25rem" }}>Building things people actually use.</SectionHeading>
          <p style={{ color: "var(--ink-body)", lineHeight: 1.7, fontSize: 15, marginBottom: "1rem" }}>
            I'm a full-stack developer at {PROFILE.company}, Bangalore — {duration} of building production-grade ERP systems, React Native mobile apps, and backend microservices that real teams depend on daily.
          </p>
          <p style={{ color: "var(--ink-soft)", lineHeight: 1.7, fontSize: 14, margin: 0 }}>
            I care about clean architecture, readable code, and features that match how people actually work — not just what the spec says. I've led client communication end-to-end: gathering requirements, scoping builds, and shipping what was promised.
          </p>
        </Tile>
        <Tile hoverable={false} style={{ padding: "var(--tile-pad-lg)", gap: 14, justifyContent: "center" }}>
          {FACTS.map(({ label, value }) => (
            <div key={label} style={{ borderTop: "1px solid var(--border-line)", paddingTop: 12 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--ink-faint)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 5 }}>{label}</div>
              <div style={{ fontSize: 14.5, color: "var(--ink-strong)" }}>{value}</div>
            </div>
          ))}
        </Tile>
      </div>
    </section>
  );
}
