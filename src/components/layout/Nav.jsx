import { useState, useEffect } from "react";
import Logo from "./Logo";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || "dark"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tick = () => setTime("IST " + new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      margin: scrolled ? "12px" : "0",
      background: scrolled ? "var(--glass-fill-strong)" : "transparent",
      backdropFilter: scrolled ? "var(--blur-nav)" : "none",
      WebkitBackdropFilter: scrolled ? "var(--blur-nav)" : "none",
      border: scrolled ? "1px solid var(--glass-border)" : "1px solid transparent",
      borderRadius: scrolled ? "var(--radius-lg)" : 0,
      boxShadow: scrolled ? "var(--glass-shadow)" : "none",
      transition: "var(--transition-base)",
      padding: scrolled ? "0.85rem 1.5rem" : "1.25rem 2rem",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Logo size={26} />
        <span style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", color: "var(--ink-bright)", fontWeight: 700, letterSpacing: "-0.02em" }}>
          Deepakaran<span style={{ color: "var(--accent)" }}>.</span>
        </span>
      </span>
      <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 22 }}>
        {["About", "Projects", "Skills", "Freelance", "Contact"].map((s) => (
          <a key={s} href={`#${s.toLowerCase()}`} style={{
            fontSize: 14, color: "var(--ink-muted)", textDecoration: "none",
            letterSpacing: "0.01em", fontWeight: 500, transition: "color .2s",
          }}>{s}</a>
        ))}
        <span className="nav-clock" style={{ fontSize: 12, color: "var(--ink-faint)", fontFamily: "var(--font-mono)" }}>{time}</span>
        <button
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          aria-label="Toggle theme"
          style={{
            width: 34, height: 34, borderRadius: "var(--radius-full)",
            border: "1px solid var(--border-strong)", background: "var(--surface-chip)",
            color: "var(--ink-strong)", cursor: "pointer", fontSize: 14, lineHeight: 1,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}
        >{theme === "dark" ? "☀" : "☾"}</button>
      </div>
    </nav>
  );
}
