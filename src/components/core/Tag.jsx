import React from "react";

/** Tag — "stack" pill (default) or colored uppercase "category" cap. */
export function Tag({
  children,
  variant = "stack",
  color = "var(--cat-lime)",
  style = {},
  ...rest
}) {
  if (variant === "category") {
    return (
      <span style={{
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-2xs)",
        letterSpacing: "var(--tracking-widest)",
        textTransform: "uppercase",
        color,
        ...style,
      }} {...rest}>
        {children}
      </span>
    );
  }

  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-xs)",
      fontWeight: 500,
      color: "var(--ink-muted)",
      background: "var(--surface-chip)",
      border: "1px solid var(--border-line)",
      borderRadius: "var(--radius-full)",
      padding: "5px 12px",
      ...style,
    }} {...rest}>
      {children}
    </span>
  );
}
