import { useState } from "react";


/** Card — frosted glass panel; lifts on hover, border picks up the accent. */
export function Card({
  children,
  accent = "var(--accent)",
  hoverable = true,
  padding = "var(--tile-pad)",
  style = {},
  ...rest
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => hoverable && setHover(true)}
      onMouseLeave={() => hoverable && setHover(false)}
      style={{
        background: "var(--glass-fill)",
        backdropFilter: "var(--blur-glass)",
        WebkitBackdropFilter: "var(--blur-glass)",
        border: `1px solid ${hover ? accent : "var(--glass-border)"}`,
        borderRadius: "var(--radius-lg)",
        boxShadow: hover ? "var(--shadow-md)" : "var(--glass-shadow)",
        padding,
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        transition: "var(--transition-base)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
