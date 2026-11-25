import { Eyebrow, Tile, Tag, Stat, Button } from "../core";
import TenantDemo from "./TenantDemo";

function Flow({ steps }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "stretch", gap: 10 }}>
      {steps.map((s, i) => (
        <div key={s.title} style={{ display: "flex", alignItems: "center", gap: 10, flex: "1 1 150px" }}>
          <div style={{ flex: 1, height: "100%", border: "1px solid var(--border-strong)", background: "var(--surface-chip)", borderRadius: "var(--radius-md)", padding: "12px 14px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 6 }}>{String(i + 1).padStart(2, "0")}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink-bright)", marginBottom: 4 }}>{s.title}</div>
            <div style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.5 }}>{s.detail}</div>
          </div>
          {i < steps.length - 1 && <span aria-hidden="true" style={{ color: "var(--ink-faint)", fontSize: 18 }}>→</span>}
        </div>
      ))}
    </div>
  );
}

function PermissionTable({ permissions }) {
  const cell = { padding: "10px 12px", borderTop: "1px solid var(--border-line)", fontSize: 13.5 };
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 420 }}>
        <thead>
          <tr>
            <th style={{ ...cell, borderTop: 0, textAlign: "left", color: "var(--ink-faint)", fontWeight: 500 }}>Action</th>
            {permissions.columns.map((c) => (
              <th key={c} style={{ ...cell, borderTop: 0, textAlign: "center", color: "var(--ink-faint)", fontWeight: 500 }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {permissions.rows.map((r) => (
            <tr key={r.action}>
              <td style={{ ...cell, color: "var(--ink-body)" }}>{r.action}</td>
              {r.access.map((ok, i) => (
                <td key={i} style={{ ...cell, textAlign: "center", color: ok === "own" ? "var(--cat-amber)" : ok ? "var(--accent)" : "var(--ink-ghost)", fontWeight: 700 }}>
                  {ok === "own" ? <span style={{ fontSize: 12 }}>own only</span> : <span aria-label={ok ? "Allowed" : "Not allowed"}>{ok ? "✓" : "—"}</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CaseStudy({ study }) {
  return (
    <section style={{ background: "var(--surface-base)", padding: "8rem 1.5rem 5rem" }}>
      <div style={{ maxWidth: "var(--measure-narrow)", margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--bento-gap)" }}>
        <a href="#projects" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-muted)", textDecoration: "none" }}>← Back to projects</a>

        <Tile hoverable={false} style={{ padding: "var(--tile-pad-lg)", gap: 14 }}>
          <Eyebrow rule>Case study · {study.kicker}</Eyebrow>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05, margin: 0, color: "var(--ink-bright)" }}>{study.title}</h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--ink-body)", margin: 0, maxWidth: 620 }}>{study.summary}</p>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-soft)", margin: 0 }}><strong style={{ color: "var(--ink-strong)" }}>My role: </strong>{study.role}</p>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>{study.stack.map((s) => <Tag key={s}>{s}</Tag>)}</div>
          {study.links.length > 0 && (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {study.links.map((l) => (
                <Button key={l.url} variant="secondary" size="sm" href={l.url} target="_blank" rel="noopener noreferrer">{l.label} ↗</Button>
              ))}
            </div>
          )}
        </Tile>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "var(--bento-gap)" }}>
          {study.metrics.map((m) => (
            <Tile key={m.label} align="center"><Stat figure={m.figure} label={m.label} /></Tile>
          ))}
        </div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-faint)", margin: "-6px 0 0" }}>{study.metricsNote}</p>

        <Tile hoverable={false} style={{ padding: "var(--tile-pad-lg)", gap: 12 }}>
          <Eyebrow>The problem</Eyebrow>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-body)", margin: 0 }}>{study.problem}</p>
        </Tile>

        <Tile hoverable={false} style={{ padding: "var(--tile-pad-lg)", gap: 16 }}>
          <Eyebrow>Architecture</Eyebrow>
          <Flow steps={study.flow} />
        </Tile>

        {study.demo === "tenant" && <TenantDemo />}

        <Tile hoverable={false} style={{ padding: "var(--tile-pad-lg)", gap: 18 }}>
          <Eyebrow>Key decisions</Eyebrow>
          {study.decisions.map((d) => (
            <div key={d.title} style={{ borderTop: "1px solid var(--border-line)", paddingTop: 14 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--ink-bright)", fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.01em" }}>{d.title}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--ink-soft)", margin: 0 }}>{d.body}</p>
            </div>
          ))}
        </Tile>

        {study.permissions && (
          <Tile hoverable={false} style={{ padding: "var(--tile-pad-lg)", gap: 14 }}>
            <Eyebrow>Who can do what</Eyebrow>
            <PermissionTable permissions={study.permissions} />
          </Tile>
        )}
      </div>
    </section>
  );
}
