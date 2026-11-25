import { useState } from "react";
import emailjs from "@emailjs/browser";
import { SectionHeading, Input, Button, Badge } from "../core";
import { PROFILE } from "../../data/profile";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const IconGitHub = () => (
  <svg width="20" height="20" viewBox="0 0 19 19" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" />
  </svg>
);
const IconLinkedIn = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8h4.56v14H.22V8zM8 8h4.37v1.9h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 7V22h-4.56v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.61-2.38 3.27V22H8V8z" />
  </svg>
);
const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 6 10-6" />
  </svg>
);

const SOCIALS = [
  { label: "GitHub", href: PROFILE.github, Icon: IconGitHub },
  { label: "LinkedIn", href: PROFILE.linkedin, Icon: IconLinkedIn },
  { label: "Email", href: `mailto:${PROFILE.email}`, Icon: IconMail },
];

function SocialButton({ label, href, Icon }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 46, height: 46, borderRadius: "var(--radius-full)",
        border: "1px solid var(--glass-border)", background: "var(--glass-fill-strong)",
        backdropFilter: "var(--blur-glass)", WebkitBackdropFilter: "var(--blur-glass)",
        color: "var(--ink-strong)", textDecoration: "none",
        transition: "var(--transition-base)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.borderColor = "var(--accent)";
        e.currentTarget.style.color = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "var(--glass-border)";
        e.currentTarget.style.color = "var(--ink-strong)";
      }}
    >
      <Icon />
    </a>
  );
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const ready = name && email && message && !sending;

  const handleSend = async () => {
    if (!ready) return;
    setSending(true);
    setError("");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name,
          email,
          message,
          title: `New message from ${name}`,
          time: new Date().toLocaleString(),
        },
        { publicKey: PUBLIC_KEY }
      );
      setSent(true);
    } catch (err) {
      setError("Couldn't send your letter. Please try again or email me directly.");
      console.error("EmailJS error:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" style={{ position: "relative", overflow: "hidden", background: "var(--surface-base)", padding: "5rem 1.5rem" }}>
      {/* mesh field */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", width: 380, height: 380, borderRadius: "50%", filter: "blur(80px)", opacity: "var(--mesh-opacity)", background: "var(--mesh-1)", top: -80, right: 60 }} />
        <div style={{ position: "absolute", width: 360, height: 360, borderRadius: "50%", filter: "blur(80px)", opacity: "var(--mesh-opacity)", background: "var(--mesh-2)", bottom: -120, left: -40 }} />
      </div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: "var(--measure-narrow)", margin: "0 auto" }}>
        <SectionHeading eyebrow="Contact" size="var(--text-display-md)" style={{ marginBottom: "2.5rem" }}>Write me a letter.</SectionHeading>

        {sent ? (
          <div style={{ background: "var(--glass-fill-strong)", backdropFilter: "var(--blur-glass)", WebkitBackdropFilter: "var(--blur-glass)", border: "1px solid var(--glass-border)", borderRadius: "var(--radius-xl)", padding: "3.5rem", textAlign: "center", boxShadow: "var(--glass-shadow)" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--ink-bright)", marginBottom: 12, letterSpacing: "-0.02em" }}>Letter sent.</div>
            <p style={{ fontSize: 15, color: "var(--ink-soft)", margin: 0 }}>I'll reply within 24 hours. Thank you, {name}.</p>
          </div>
        ) : (
          <div style={{ background: "var(--glass-fill-strong)", backdropFilter: "var(--blur-glass)", WebkitBackdropFilter: "var(--blur-glass)", border: "1px solid var(--glass-border)", borderRadius: "var(--radius-xl)", padding: "2.5rem", boxShadow: "var(--glass-shadow)" }}>
            <div style={{ borderBottom: "1px solid var(--border-line)", paddingBottom: "1.5rem", marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--ink-bright)", marginBottom: 5, fontWeight: 700 }}>To: Deepakaran S</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-faint)" }}>deepakarans2003@gmail.com</div>
              </div>
              <Badge>Replies in 24h</Badge>
            </div>

            <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: "1.25rem" }}>
              <Input label="Your name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
              <Input label="Your email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
            </div>

            <Input label="Message" multiline rows={6} value={message} onChange={(e) => setMessage(e.target.value)} placeholder={"Dear Deepakaran,\n\nI came across your portfolio and wanted to reach out..."} />

            {error && (
              <p style={{ fontSize: 13, color: "var(--accent-danger, #e5484d)", margin: "1rem 0 0" }}>{error}</p>
            )}

            <div style={{ borderTop: "1px solid var(--border-line)", paddingTop: "1.5rem", marginTop: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <a href="#" style={{ fontSize: 14, color: "var(--ink-muted)", textDecoration: "none", display: "flex", alignItems: "center", gap: 7 }}>☕ Or book a 15-min coffee chat</a>
              <Button variant="primary" disabled={!ready} onClick={handleSend}>{sending ? "Sending…" : "Send letter →"}</Button>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 14, marginTop: "2rem", flexWrap: "wrap" }}>
          {SOCIALS.map((s) => (
            <SocialButton key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
