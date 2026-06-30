import React from "react";

/** Input — soft glass field; single-line or multiline message area, lime focus ring. */
export function Input({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
  rows = 6,
  style = {},
  ...rest
}) {
  const field = {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid var(--border-soft)",
    background: "var(--glass-fill-strong)",
    backdropFilter: "var(--blur-glass)",
    WebkitBackdropFilter: "var(--blur-glass)",
    borderRadius: "var(--radius-sm)",
    padding: multiline ? "14px 16px" : "12px 16px",
    fontSize: "var(--text-md)",
    color: "var(--ink-strong)",
    outline: "none",
    resize: "none",
    fontFamily: "var(--font-sans)",
    lineHeight: multiline ? "var(--leading-relaxed)" : "normal",
    transition: "var(--transition-base)",
    ...style,
  };

  const onFocus = (e) => {
    e.currentTarget.style.borderColor = "var(--accent)";
    e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-soft)";
  };
  const onBlur = (e) => {
    e.currentTarget.style.borderColor = "var(--border-soft)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div style={{ width: "100%" }}>
      {label && (
        <label style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-2xs)",
          color: "var(--ink-faint)",
          letterSpacing: "var(--tracking-eyebrow)",
          display: "block",
          marginBottom: 8,
          textTransform: "uppercase",
        }}>
          {label}
        </label>
      )}
      {multiline ? (
        <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} style={field} onFocus={onFocus} onBlur={onBlur} {...rest} />
      ) : (
        <input value={value} onChange={onChange} placeholder={placeholder} style={field} onFocus={onFocus} onBlur={onBlur} {...rest} />
      )}
    </div>
  );
}
