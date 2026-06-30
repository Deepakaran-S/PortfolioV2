import React from "react";

/**
 * Button — rounded action element.
 * primary (solid lime) / secondary (glass) / ghost / paper (inverse ink).
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  disabled = false,
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: "9px 18px", fontSize: 13 },
    md: { padding: "12px 24px", fontSize: 14 },
    lg: { padding: "15px 30px", fontSize: 15 },
  };

  const variants = {
    primary: {
      background: "var(--accent)",
      color: "var(--accent-contrast)",
      border: "1px solid transparent",
      boxShadow: "var(--shadow-accent)",
    },
    secondary: {
      background: "var(--glass-fill-strong)",
      color: "var(--ink-strong)",
      border: "1px solid var(--glass-border)",
      backdropFilter: "var(--blur-glass)",
      WebkitBackdropFilter: "var(--blur-glass)",
    },
    ghost: {
      background: "transparent",
      color: "var(--ink-body)",
      border: "1px solid var(--border-bright)",
    },
    paper: {
      background: "var(--surface-ink)",
      color: "var(--on-ink)",
      border: "1px solid transparent",
    },
  };

  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: "var(--font-sans)",
    fontWeight: 600,
    letterSpacing: "var(--tracking-wide)",
    textDecoration: "none",
    borderRadius: "var(--radius-sm)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    transition: "var(--transition-base)",
    whiteSpace: "nowrap",
    ...sizes[size],
    ...variants[variant],
    ...style,
  };

  const Tag = href ? "a" : "button";
  const tagProps = href ? { href } : { type: "button" };

  return (
    <Tag
      {...tagProps}
      onClick={disabled ? undefined : onClick}
      style={base}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.filter = "brightness(1.04)";
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.filter = "none";
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
