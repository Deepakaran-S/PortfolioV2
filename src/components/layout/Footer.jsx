import ProofStrip from "./ProofStrip";
import { PROFILE } from "../../data/profile";

export default function Footer() {
  return (
    <footer style={{ background: "var(--surface-void)", borderTop: "1px solid var(--border-line)", padding: "2.5rem 1.5rem", textAlign: "center" }}>
      <ProofStrip />
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--ink-faint)", letterSpacing: "0.08em" }}>
        {PROFILE.name} · Built with React · {new Date().getFullYear()}
      </div>
    </footer>
  );
}
