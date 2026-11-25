import { useEffect, useRef, useState } from "react";
import { answerQuestion, SUGGESTIONS } from "../../lib/assistant";

const INTRO = {
  from: "bot",
  text: "Ask me about skills, projects, experience or how to reach me. Answers come straight from my resume and project data, with no AI model and no tracking.",
};

export default function AskChat({ open, onOpen, onClose }) {
  const [messages, setMessages] = useState([INTRO]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const ask = (question) => {
    const text = question.trim();
    if (!text) return;
    const reply = answerQuestion(text);
    setMessages((m) => [...m, { from: "user", text }, { from: "bot", ...reply }]);
    setInput("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    ask(input);
  };

  if (!open) {
    return (
      <button
        onClick={onOpen}
        aria-label="Ask my portfolio"
        style={{
          position: "fixed", right: 20, bottom: 20, zIndex: 150, height: 46, padding: "0 18px", borderRadius: "var(--radius-full)",
          border: "1px solid transparent", background: "var(--accent)", color: "var(--accent-contrast)", fontWeight: 600, fontSize: 14,
          cursor: "pointer", boxShadow: "var(--shadow-accent)",
        }}
      >Ask me</button>
    );
  }

  return (
    <div
      role="dialog"
      aria-label="Ask my portfolio"
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      style={{
        position: "fixed", right: 20, bottom: 20, zIndex: 150, width: "min(380px, calc(100vw - 40px))", height: "min(520px, calc(100vh - 40px))",
        display: "flex", flexDirection: "column", background: "var(--glass-fill-strong)", backdropFilter: "var(--blur-glass)", WebkitBackdropFilter: "var(--blur-glass)",
        border: "1px solid var(--glass-border)", borderRadius: "var(--radius-lg)", boxShadow: "var(--glass-shadow)", overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid var(--border-line)" }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--ink-bright)" }}>Ask my portfolio</span>
        <button onClick={onClose} aria-label="Close chat" style={{ background: "transparent", border: 0, color: "var(--ink-muted)", fontSize: 18, cursor: "pointer", lineHeight: 1 }}>×</button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.from === "user" ? "flex-end" : "flex-start", maxWidth: "88%" }}>
            <div style={{
              padding: "9px 13px", borderRadius: "var(--radius-md)", fontSize: 13.5, lineHeight: 1.55, whiteSpace: "pre-line",
              background: m.from === "user" ? "var(--accent)" : "var(--surface-chip)",
              color: m.from === "user" ? "var(--accent-contrast)" : "var(--ink-body)",
            }}>{m.text}</div>
            {m.links?.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
                {m.links.map((l) => (
                  <a
                    key={l.href + l.label}
                    href={l.href}
                    onClick={() => l.href.startsWith("#") && onClose()}
                    {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", border: "1px solid var(--border-strong)", borderRadius: "var(--radius-full)", padding: "3px 10px", textDecoration: "none" }}
                  >{l.label}</a>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", padding: "0 14px 10px" }}>
        {SUGGESTIONS.map((s) => (
          <button key={s} onClick={() => ask(s)} style={{ fontSize: 11.5, color: "var(--ink-muted)", background: "var(--surface-chip)", border: "1px solid var(--border-strong)", borderRadius: "var(--radius-full)", padding: "4px 10px", cursor: "pointer" }}>{s}</button>
        ))}
      </div>

      <form onSubmit={onSubmit} style={{ display: "flex", gap: 8, padding: 12, borderTop: "1px solid var(--border-line)" }}>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something…"
          aria-label="Your question"
          style={{ flex: 1, minWidth: 0, background: "var(--surface-chip)", border: "1px solid var(--border-strong)", borderRadius: "var(--radius-sm)", padding: "9px 12px", color: "var(--ink-bright)", fontSize: 13.5, outline: "none", fontFamily: "var(--font-sans)" }}
        />
        <button type="submit" style={{ background: "var(--accent)", color: "var(--accent-contrast)", border: 0, borderRadius: "var(--radius-sm)", padding: "0 16px", fontWeight: 600, cursor: "pointer" }}>Send</button>
      </form>
    </div>
  );
}
