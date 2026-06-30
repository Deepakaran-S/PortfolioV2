import React from "react";
import { Eyebrow } from "./Eyebrow.jsx";

/** SectionHeading — eyebrow + Space Grotesk headline that opens each section. */
export function SectionHeading({
  eyebrow,
  children,
  size = "var(--text-display-md)",
  style = {},
  ...rest
}) {
  return (
    <div style={style} {...rest}>
      {eyebrow && <Eyebrow style={{ marginBottom: 16 }}>{eyebrow}</Eyebrow>}
      <h2 style={{
        fontFamily: "var(--font-display)",
        fontSize: size,
        fontWeight: 700,
        lineHeight: "var(--leading-snug)",
        color: "var(--text-heading)",
        margin: 0,
        letterSpacing: "var(--tracking-tight)",
        textWrap: "balance",
      }}>
        {children}
      </h2>
    </div>
  );
}
