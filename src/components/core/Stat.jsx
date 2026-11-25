
/** Stat — large Space Grotesk figure over a muted label. */
import { CountUp } from "./CountUp.jsx";

export function Stat({ figure, label, color = "var(--text-heading)", style = {}, ...rest }) {
  return (
    <div style={style} {...rest}>
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: "var(--text-3xl)",
        fontWeight: 700,
        letterSpacing: "var(--tracking-tight)",
        color,
        lineHeight: 1,
      }}>
        <CountUp value={figure} />
      </div>
      <div style={{
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-xs)",
        color: "var(--ink-soft)",
        marginTop: 6,
        letterSpacing: "var(--tracking-wide)",
      }}>
        {label}
      </div>
    </div>
  );
}
