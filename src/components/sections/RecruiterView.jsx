import { Eyebrow, Tile, Tag, Button, Badge } from "../core";
import { PROJECTS } from "../../data/projects";
import { SKILLS, GROUP_LABELS, GROUP_COLORS } from "../../data/skills";
import { PROFILE, HAS_RESUME, HIGHLIGHTS, getExperience } from "../../data/profile";

export default function RecruiterView() {
  const exp = getExperience();
  const featured = PROJECTS.filter((p) => p.featured);

  return (
    <section style={{ background: "var(--surface-base)", padding: "8rem 1.5rem 5rem" }}>
      <div style={{ maxWidth: "var(--measure-narrow)", margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--bento-gap)" }}>
        <Tile hoverable={false} style={{ padding: "var(--tile-pad-lg)", gap: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
            <Eyebrow rule>Recruiter view</Eyebrow>
            <Badge>Available for work</Badge>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05, margin: 0, color: "var(--ink-bright)" }}>
            {PROFILE.name}
          </h1>
          <p style={{ fontSize: 15.5, color: "var(--ink-body)", lineHeight: 1.6, margin: 0 }}>
            {PROFILE.role} at {PROFILE.company} · {exp.duration} industry experience · {PROFILE.location}
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {HAS_RESUME && <Button href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer">Download resume</Button>}
            <Button variant={HAS_RESUME ? "secondary" : "primary"} href={`mailto:${PROFILE.email}`}>Email me</Button>
            <Button variant="secondary" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</Button>
            <Button variant="secondary" href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</Button>
          </div>
        </Tile>

        <Tile hoverable={false} style={{ padding: "var(--tile-pad-lg)", gap: 14 }}>
          <Eyebrow>Highlights</Eyebrow>
          {HIGHLIGHTS.map((h) => (
            <div key={h} style={{ display: "flex", gap: 12 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", marginTop: 8, flexShrink: 0 }} />
              <p style={{ fontSize: 14.5, color: "var(--ink-body)", lineHeight: 1.6, margin: 0 }}>{h}</p>
            </div>
          ))}
        </Tile>

        <Tile hoverable={false} style={{ padding: "var(--tile-pad-lg)", gap: 14 }}>
          <Eyebrow>Stack</Eyebrow>
          {Object.entries(GROUP_LABELS).map(([group, label]) => (
            <div key={group} style={{ display: "flex", gap: 14, alignItems: "baseline", flexWrap: "wrap" }}>
              <span style={{ width: 90, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: GROUP_COLORS[group] }}>{label}</span>
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                {SKILLS.filter((s) => s.group === group).map((s) => <Tag key={s.name}>{s.name}</Tag>)}
              </div>
            </div>
          ))}
        </Tile>

        <Tile hoverable={false} style={{ padding: "var(--tile-pad-lg)", gap: 16 }}>
          <Eyebrow>Selected projects</Eyebrow>
          {featured.map((p) => (
            <div key={p.id} style={{ borderTop: "1px solid var(--border-line)", paddingTop: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--ink-bright)", fontWeight: 700, margin: 0 }}>{p.name}</h3>
                <Tag variant="category" color={p.color}>{p.tag}</Tag>
              </div>
              <p style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.6, margin: "0 0 8px" }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>{p.stack.map((s) => <Tag key={s}>{s}</Tag>)}</div>
            </div>
          ))}
        </Tile>
      </div>
    </section>
  );
}
