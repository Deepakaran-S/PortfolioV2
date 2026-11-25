import { useEffect, useRef, useState } from "react";
import { Eyebrow, Tile, Button } from "../core";

const STEP_MS = 420;

const TODAY = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

const FIELDS = [
  { key: "invoice_no", value: "INV-0042" },
  { key: "customer", value: "Acme Constructions" },
  { key: "date", value: TODAY },
  { key: "item_1", value: "Site survey · 12 hrs" },
  { key: "amount_1", value: "₹18,000" },
  { key: "item_2", value: "Structural review" },
  { key: "amount_2", value: "₹24,000" },
  { key: "total", value: "₹42,000" },
];

function Slot({ field, filled, bold }) {
  return (
    <span style={{
      fontFamily: filled ? "var(--font-sans)" : "var(--font-mono)",
      fontSize: filled ? 13.5 : 12,
      fontWeight: bold && filled ? 700 : 500,
      color: filled ? "var(--ink-bright)" : "var(--accent)",
      background: filled ? "transparent" : "var(--accent-soft)",
      borderRadius: 4,
      padding: filled ? 0 : "1px 6px",
      transition: "all .25s",
    }}>{filled ? field.value : `{{${field.key}}}`}</span>
  );
}

export default function InvoiceDemo() {
  const [filled, setFilled] = useState(0);
  const [started, setStarted] = useState(false);
  const [run, setRun] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.4 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return undefined;
    const id = setInterval(() => {
      setFilled((n) => {
        if (n >= FIELDS.length) {
          clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, STEP_MS);
    return () => clearInterval(id);
  }, [started, run]);

  const replay = () => {
    setFilled(0);
    setRun((r) => r + 1);
  };

  const slot = (i, bold) => <Slot field={FIELDS[i]} filled={filled > i} bold={bold} />;
  const done = filled >= FIELDS.length;
  const row = { display: "flex", justifyContent: "space-between", gap: 12, padding: "9px 0", borderTop: "1px solid var(--border-line)" };

  return (
    <div ref={ref}>
      <Tile hoverable={false} style={{ padding: "var(--tile-pad-lg)" }}>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Eyebrow>PDF microservice</Eyebrow>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--ink-bright)", fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Templates in, documents out.</h3>
            <p style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.7, margin: 0 }}>
              One Node.js service turns a template and a data payload into invoices, reports and exports, and several applications reuse it instead of carrying their own export code.
            </p>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <Button variant="secondary" size="sm" onClick={replay}>Replay ↺</Button>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-faint)" }}>Sample data for demonstration</span>
            </div>
          </div>

          <div style={{ border: "1px solid var(--border-strong)", borderRadius: "var(--radius-md)", background: "var(--surface-chip)", padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "0.12em", color: "var(--ink-bright)" }}>INVOICE</span>
              {slot(0, true)}
            </div>
            <div style={{ ...row, borderTop: 0, paddingTop: 0 }}>
              <span style={{ fontSize: 12, color: "var(--ink-faint)" }}>Billed to</span>{slot(1)}
            </div>
            <div style={row}><span style={{ fontSize: 12, color: "var(--ink-faint)" }}>Date</span>{slot(2)}</div>
            <div style={row}>{slot(3)}{slot(4)}</div>
            <div style={row}>{slot(5)}{slot(6)}</div>
            <div style={{ ...row, alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "var(--ink-faint)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Total</span>{slot(7, true)}
            </div>
            <div style={{
              marginTop: 12, fontFamily: "var(--font-mono)", fontSize: 11.5, textAlign: "center", padding: "8px 10px", borderRadius: "var(--radius-sm)",
              background: done ? "var(--accent)" : "transparent", color: done ? "var(--accent-contrast)" : "var(--ink-muted)",
              border: done ? "1px solid transparent" : "1px dashed var(--border-strong)", transition: "all .3s",
            }}>
              {done ? "✓ invoice-0042.pdf generated" : `binding data… ${filled}/${FIELDS.length}`}
            </div>
          </div>
        </div>
      </Tile>
    </div>
  );
}
