import { useState } from "react";
import { Eyebrow, Tile, Tag, Button } from "../core";
import { PROJECTS } from "../../data/projects";
import { getCaseStudyForProject } from "../../data/caseStudies";

const linkStyle = { fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-muted)", textDecoration: "none", border: "1px solid var(--border-strong)", borderRadius: "var(--radius-full)", padding: "4px 10px", whiteSpace: "nowrap" };

function GithubLinks({ github, isPrivate }) {
  if (!github) return isPrivate ? <Tag>Private · client work</Tag> : null;
  const links = Array.isArray(github)
    ? github
    : [{ label: "GitHub", url: github }];
  return links.map((l) => (
    <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" style={linkStyle}>{l.label}</a>
  ));
}

function ProjectCard({ p }) {
  const study = getCaseStudyForProject(p.id);

  return (
    <Tile accent={p.color} style={{ gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
        <div>
          <Tag variant="category" color={p.color}>{p.tag}</Tag>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--ink-bright)", fontWeight: 700, margin: "6px 0 0", letterSpacing: "-0.02em" }}>{p.name}</h3>
        </div>
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <GithubLinks github={p.github} isPrivate={p.private} />
        </div>
      </div>
      <p style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
      {study && (
        <>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 18px" }}>
            {study.metrics.slice(0, 3).map((m) => (
              <div key={m.label} style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "var(--ink-bright)" }}>{m.figure}</span>
                <span style={{ fontSize: 11.5, color: "var(--ink-faint)" }}>{m.label}</span>
              </div>
            ))}
          </div>
          <a href={`#/case/${study.slug}`} style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>Read the case study →</a>
        </>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: "auto" }}>
        {p.stack.map((s) => <Tag key={s}>{s}</Tag>)}
      </div>
    </Tile>
  );
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false);

  const featured = PROJECTS.filter((p) => p.featured);
  const more = PROJECTS.filter((p) => !p.featured);
  const visible = showAll ? PROJECTS : featured;

  return (
    <section id="projects" style={{ background: "var(--surface-base)", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "var(--measure)", margin: "0 auto" }}>
        <Eyebrow style={{ marginBottom: "2.5rem" }}>Projects</Eyebrow>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "var(--bento-gap)" }}>
          {visible.map((p) => <ProjectCard key={p.id} p={p} />)}
        </div>

        {more.length > 0 && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "2.5rem" }}>
            <Button variant="secondary" onClick={() => setShowAll((v) => !v)}>
              {showAll ? "Show less ↑" : `More projects (${more.length}) ↓`}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
