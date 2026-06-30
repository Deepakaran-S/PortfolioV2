import React from "react";

/** Eyebrow — Space Mono uppercase wide-tracked label, optional leading rule. */
export function Eyebrow({
  children,
  rule = false,
  color = "var(--eyebrow-color)",
  ruleColor = "var(--accent)",
  style = {},
  ...rest
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, ...style }} {...rest}>
      {rule && (
        <span style={{ width: 28, height: 2, borderRadius: 2, background: ruleColor, display: "block", flexShrink: 0 }} />
      )}
      <span style={{
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-xs)",
        fontWeight: 400,
        letterSpacing: "var(--tracking-eyebrow)",
        textTransform: "uppercase",
        color,
      }}>
        {children}
      </span>
    </div>
  );
}
