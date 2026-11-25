
/** Badge — status pill with a leading (glowing) dot. */
export function Badge({
  children,
  color = "var(--accent)",
  glow = true,
  style = {},
  ...rest
}) {
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-xs)",
      fontWeight: 500,
      color: "var(--accent-ink)",
      background: "var(--accent-soft)",
      borderRadius: "var(--radius-full)",
      padding: "6px 12px",
      ...style,
    }} {...rest}>
      <span style={{
        width: 7, height: 7, borderRadius: "50%", background: color,
        boxShadow: glow ? `0 0 8px ${color}` : "none", flexShrink: 0,
      }} />
      {children}
    </span>
  );
}
