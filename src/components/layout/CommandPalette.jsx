import { useEffect, useMemo, useRef, useState } from "react";
import { PROFILE, HAS_RESUME } from "../../data/profile";
import { CASE_STUDIES } from "../../data/caseStudies";

const SECTIONS = ["About", "Projects", "Skills", "Experience", "Freelance", "Contact"];

export default function CommandPalette({ open, ...props }) {
  return open ? <PaletteBody {...props} /> : null;
}

function PaletteBody({ onClose, theme, onToggleTheme, recruiter, onToggleRecruiter, onOpenChat }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const commands = useMemo(() => {
    const go = (id) => () => { window.location.hash = id; };
    const external = (url) => () => window.open(url, "_blank", "noopener,noreferrer");
    const list = [];

    if (!recruiter) {
      SECTIONS.forEach((s) => list.push({ label: `Go to ${s}`, hint: "Section", run: go(s.toLowerCase()) }));
    }
    CASE_STUDIES.forEach((c) => list.push({ label: `Case study: ${c.title}`, hint: "Read", run: go(`/case/${c.slug}`) }));
    list.push(
      { label: "Ask my portfolio", hint: "Chat", run: onOpenChat },
      { label: "Replay intro", hint: "Animation", run: () => window.location.reload() },
    );
    if (HAS_RESUME) list.push({ label: "Download resume", hint: "File", run: external(PROFILE.resumeUrl) });
    list.push(
      { label: "Copy email address", hint: "Action", run: () => navigator.clipboard?.writeText(PROFILE.email) },
      { label: "Send an email", hint: "Contact", run: () => { window.location.href = `mailto:${PROFILE.email}`; } },
      { label: "Open GitHub", hint: "Link", run: external(PROFILE.github) },
      { label: "Open LinkedIn", hint: "Link", run: external(PROFILE.linkedin) },
      { label: `Switch to ${theme === "dark" ? "light" : "dark"} theme`, hint: "Theme", run: onToggleTheme },
      { label: recruiter ? "Exit recruiter view" : "Enter recruiter view", hint: "View", run: onToggleRecruiter },
    );
    return list;
  }, [recruiter, theme, onToggleTheme, onToggleRecruiter, onOpenChat]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? commands.filter((c) => c.label.toLowerCase().includes(q)) : commands;
  }, [commands, query]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const execute = (cmd) => {
    if (!cmd) return;
    onClose();
    cmd.run();
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => Math.min(i + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); execute(results[active]); }
  };

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: "14vh" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(560px, 92vw)", background: "var(--glass-fill-strong)", backdropFilter: "var(--blur-glass)", WebkitBackdropFilter: "var(--blur-glass)",
          border: "1px solid var(--glass-border)", borderRadius: "var(--radius-lg)", boxShadow: "var(--glass-shadow)", overflow: "hidden",
        }}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActive(0); }}
          onKeyDown={onKeyDown}
          placeholder="Type a command or search…"
          aria-label="Search commands"
          style={{
            width: "100%", padding: "16px 20px", background: "transparent", border: 0, borderBottom: "1px solid var(--border-line)",
            outline: "none", color: "var(--ink-bright)", fontSize: 15, fontFamily: "var(--font-sans)",
          }}
        />
        <div role="listbox" style={{ maxHeight: 340, overflowY: "auto", padding: 8 }}>
          {results.length === 0 && (
            <div style={{ padding: "14px 12px", fontSize: 13.5, color: "var(--ink-faint)" }}>No matching commands</div>
          )}
          {results.map((c, i) => (
            <div
              key={c.label}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onClick={() => execute(c)}
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderRadius: "var(--radius-sm)",
                cursor: "pointer", fontSize: 14, color: i === active ? "var(--ink-bright)" : "var(--ink-body)",
                background: i === active ? "var(--surface-chip)" : "transparent",
              }}
            >
              <span>{c.label}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--ink-faint)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{c.hint}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
