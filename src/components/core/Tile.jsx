import React from "react";

/**
 * Tile — the signature bento building block. Glass card with built-in
 * column layout + grid-span. tone: glass | accent | ink. align controls
 * vertical distribution. Adds a `span-N` class so responsive CSS can
 * collapse the bento on small screens.
 */
export function Tile({
  children,
  tone = "glass",
  span = 1,
  align = "start",
  accent = "var(--accent)",
  hoverable = true,
  className = "",
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);

  const tones = {
    glass: {
      background: "var(--glass-fill)",
      backdropFilter: "var(--blur-glass)",
      WebkitBackdropFilter: "var(--blur-glass)",
      border: `1px solid ${hover ? accent : "var(--glass-border)"}`,
      boxShadow: hover ? "var(--shadow-md)" : "var(--glass-shadow)",
    },
    accent: {
      background: "var(--accent)",
      border: "1px solid transparent",
      boxShadow: "var(--shadow-accent)",
      color: "var(--on-accent-body)",
    },
    ink: {
      background: "var(--surface-ink)",
      border: "1px solid transparent",
      color: "var(--on-ink)",
    },
  };

  const spanClass = span > 1 ? `span-${span}` : "";
  const merged = [className, spanClass].filter(Boolean).join(" ");

  return (
    <div
      className={merged || undefined}
      onMouseEnter={() => hoverable && setHover(true)}
      onMouseLeave={() => hoverable && setHover(false)}
      style={{
        gridColumn: span > 1 ? `span ${span}` : undefined,
        display: "flex",
        flexDirection: "column",
        justifyContent:
          align === "between" ? "space-between" : align === "center" ? "center" : "flex-start",
        borderRadius: "var(--radius-lg)",
        padding: "var(--tile-pad)",
        position: "relative",
        overflow: "hidden",
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        transition: "var(--transition-base)",
        ...tones[tone],
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
