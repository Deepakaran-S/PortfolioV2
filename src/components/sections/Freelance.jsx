import { SectionHeading, Tag } from "../core";

const FEATURED = {
  client: "Porlu Studio",
  type: "Photography Studio",
  url: "https://porlu-studio-kashipatna.netlify.app/",
  host: "porlu-studio-kashipatna.netlify.app",
  blurb: "A custom, fully responsive website for a photography studio — clean galleries, smooth motion, and a booking-ready layout built from scratch.",
};

export default function Freelance() {
  return (
    <section id="freelance" style={{ background: "var(--surface-sunken)", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "var(--measure-narrow)", margin: "0 auto" }}>

        {/* Header + availability */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: "1.25rem" }}>
          <SectionHeading eyebrow="Freelance" size="var(--text-display-sm)" style={{ marginBottom: 0 }}>
            Custom websites, built to fit.
          </SectionHeading>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 9,
            background: "var(--glass-fill-strong)", backdropFilter: "var(--blur-glass)", WebkitBackdropFilter: "var(--blur-glass)",
            border: "1px solid var(--glass-border)", borderRadius: "var(--radius-full)",
            padding: "8px 16px", fontSize: 13, color: "var(--ink-strong)", fontWeight: 600,
          }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--accent)", animation: "fl-pulse 2s infinite" }} />
            Available for new projects
          </div>
        </div>

        <p style={{ color: "var(--ink-soft)", lineHeight: 1.7, fontSize: 15, margin: "0 0 2.5rem", maxWidth: 640 }}>
          Alongside my full-time work, I freelance — designing and building custom websites from scratch. I started with photography studios, and I'm open to working with people across <strong style={{ color: "var(--ink-bright)" }}>every industry</strong>.
        </p>

        {/* Featured work — browser-frame live preview */}
        <a href={FEATURED.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
          <div style={{
            background: "var(--glass-fill)", backdropFilter: "var(--blur-glass)", WebkitBackdropFilter: "var(--blur-glass)",
            border: "1px solid var(--glass-border)", borderRadius: "var(--radius-lg)",
            boxShadow: "var(--glass-shadow)", overflow: "hidden",
          }}>
            {/* browser chrome */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderBottom: "1px solid var(--border-line)", background: "var(--surface-chip)" }}>
              <span style={{ display: "flex", gap: 6 }}>
                <span style={{ width: 11, height: 11, borderRadius: "50%", background: "var(--cat-coral)" }} />
                <span style={{ width: 11, height: 11, borderRadius: "50%", background: "var(--cat-amber)" }} />
                <span style={{ width: 11, height: 11, borderRadius: "50%", background: "var(--cat-mint)" }} />
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--ink-soft)", background: "var(--surface-chip)", borderRadius: "var(--radius-full)", padding: "4px 14px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 360, margin: "0 auto" }}>
                🔒 {FEATURED.host}
              </span>
              <span style={{ width: 33 }} />
            </div>

            {/* live preview */}
            <div style={{ position: "relative", height: 420, overflow: "hidden", background: "var(--surface-raised)" }}>
              <iframe
                src={FEATURED.url}
                title={`${FEATURED.client} live preview`}
                loading="lazy"
                tabIndex={-1}
                style={{
                  border: 0, width: "210%", height: "210%",
                  transform: "scale(0.5)", transformOrigin: "top left",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* caption */}
            <div className="fl-caption" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: "1.5rem 1.75rem", borderTop: "1px solid var(--border-line)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--ink-bright)", fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>{FEATURED.client}</h3>
                  <Tag variant="category" color="var(--cat-sky)">{FEATURED.type}</Tag>
                </div>
                <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6, margin: 0, maxWidth: 560 }}>{FEATURED.blurb}</p>
              </div>
              <span style={{
                flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--accent-contrast)", fontWeight: 600,
                background: "var(--accent)", borderRadius: "var(--radius-full)", padding: "10px 20px",
                boxShadow: "var(--shadow-accent)",
              }}>Visit live site →</span>
            </div>
          </div>
        </a>
 
      </div>
    </section>
  );
}
