import { useState } from "react";
import { Eyebrow, Tile, Tag } from "../core";

const COMPANIES = [
  { id: 1, name: "Acme", employee: "Ravi" },
  { id: 2, name: "Globex", employee: "Meena" },
  { id: 3, name: "Initech", employee: "Arun" },
];

const TASKS = [
  { id: 1, company: 1, title: "Prepare Q3 report", assignee: "Ravi", status: "in-progress" },
  { id: 2, company: 1, title: "Onboard new vendor", assignee: "Priya", status: "pending" },
  { id: 3, company: 1, title: "Fix invoice export", assignee: "Ravi", status: "completed" },
  { id: 4, company: 2, title: "Audit access logs", assignee: "Meena", status: "pending" },
  { id: 5, company: 2, title: "Plan sprint 14", assignee: "Karan", status: "in-progress" },
  { id: 6, company: 2, title: "Migrate legacy data", assignee: "Meena", status: "pending" },
  { id: 7, company: 3, title: "Review contracts", assignee: "Arun", status: "pending" },
  { id: 8, company: 3, title: "Set up staging", assignee: "Divya", status: "in-progress" },
  { id: 9, company: 3, title: "Close support tickets", assignee: "Arun", status: "completed" },
];

const ROLES = ["admin", "manager", "employee"];

const ACTIONS = [
  { key: "create", label: "Create task", method: "POST", path: () => "/tasks/", roles: ["admin", "manager"], code: 201 },
  { key: "assign", label: "Assign task", method: "PATCH", path: (id) => `/tasks/${id}/assign`, roles: ["admin", "manager"], code: 200 },
  { key: "delete", label: "Delete task", method: "DELETE", path: (id) => `/tasks/${id}`, roles: ["admin"], code: 204 },
];

const STATUS_COLOR = { pending: "var(--cat-amber)", "in-progress": "var(--cat-sky)", completed: "var(--cat-mint)" };

const roleList = (roles) => `[${roles.map((r) => `'${r}'`).join(", ")}]`;

const chip = (active) => ({
  padding: "6px 14px", borderRadius: "var(--radius-full)", cursor: "pointer", fontSize: 12.5, fontWeight: 600,
  border: `1px solid ${active ? "var(--accent)" : "var(--border-strong)"}`,
  background: active ? "var(--accent)" : "var(--surface-chip)",
  color: active ? "var(--accent-contrast)" : "var(--ink-body)",
});

export default function TenantDemo() {
  const [companyId, setCompanyId] = useState(1);
  const [role, setRole] = useState("admin");
  const [response, setResponse] = useState(null);

  const company = COMPANIES.find((c) => c.id === companyId);
  const visible = TASKS.filter((t) => t.company === companyId);
  const firstId = visible[0].id;

  const respond = (method, path, code, detail) =>
    setResponse((prev) => ({ method, path, code, detail, n: (prev?.n ?? 0) + 1 }));

  const runAction = (action) => {
    const path = action.path(firstId);
    if (!action.roles.includes(role)) {
      respond(action.method, path, 403, `Access denied. Required role(s): ${roleList(action.roles)}`);
    } else {
      respond(action.method, path, action.code, null);
    }
  };

  const updateTask = (task) => {
    const path = `/tasks/${task.id}`;
    if (role === "employee" && task.assignee !== company.employee) {
      respond("PATCH", path, 403, "You can only update tasks assigned to you");
    } else {
      respond("PATCH", path, 200, null);
    }
  };

  const probeOtherCompany = () => {
    const other = TASKS.find((t) => t.company !== companyId);
    respond("PATCH", `/tasks/${other.id}`, 404, "Task not found");
  };

  const ok = response && response.code < 400;

  return (
    <Tile hoverable={false} style={{ padding: "var(--tile-pad-lg)", gap: 16 }}>
      <Eyebrow>Try it · tenant isolation and roles</Eyebrow>
      <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--ink-soft)", margin: 0 }}>
        A mock of VoltTask's task API, with the same rules as the real backend. Switch company and role, then call an endpoint.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-faint)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Company</span>
          {COMPANIES.map((c) => (
            <button key={c.id} style={chip(c.id === companyId)} onClick={() => { setCompanyId(c.id); setResponse(null); }}>{c.name}</button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-faint)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Role</span>
          {ROLES.map((r) => (
            <button key={r} style={chip(r === role)} onClick={() => { setRole(r); setResponse(null); }}>{r}</button>
          ))}
        </div>
      </div>

      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", background: "var(--accent-soft)", borderRadius: "var(--radius-sm)", padding: "8px 12px" }}>
        SELECT * FROM tasks WHERE company_id = {companyId}; <span style={{ color: "var(--ink-faint)" }}>· {visible.length} of {TASKS.length} rows visible</span>
      </div>

      <div style={{ border: "1px solid var(--border-line)", borderRadius: "var(--radius-md)", padding: "0 14px" }}>
        {TASKS.map((t) => {
          const match = t.company === companyId;
          return (
            <div
              key={t.id}
              aria-hidden={!match}
              style={{ display: "grid", gridTemplateRows: match ? "1fr" : "0fr", opacity: match ? 1 : 0, transition: "grid-template-rows .4s ease, opacity .3s ease" }}
            >
              <div style={{ overflow: "hidden", minHeight: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: "1px solid var(--border-line)", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-faint)", width: 22 }}>#{t.id}</span>
                  <span style={{ flex: "1 1 160px", fontSize: 14, color: "var(--ink-strong)" }}>{t.title}</span>
                  <span style={{ fontSize: 12.5, color: "var(--ink-soft)", width: 56 }}>{t.assignee}</span>
                  <Tag variant="category" color={STATUS_COLOR[t.status]}>{t.status}</Tag>
                  <button tabIndex={match ? 0 : -1} onClick={() => updateTask(t)} style={{ ...chip(false), padding: "4px 12px", fontSize: 12 }}>Update</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {ACTIONS.map((a) => {
          const allowed = a.roles.includes(role);
          return (
            <button key={a.key} onClick={() => runAction(a)} style={{ ...chip(false), opacity: allowed ? 1 : 0.6 }}>
              {allowed ? "" : "🔒 "}{a.label}
            </button>
          );
        })}
        <button onClick={probeOtherCompany} style={chip(false)}>Request another company's task</button>
      </div>

      <div
        key={response?.n ?? 0}
        role="status"
        className={response && !ok ? "shake" : undefined}
        style={{
          minHeight: 62, fontFamily: "var(--font-mono)", fontSize: 12.5, lineHeight: 1.7, padding: "12px 14px", borderRadius: "var(--radius-sm)",
          background: "var(--surface-chip)", border: `1px solid ${response ? (ok ? "var(--accent)" : "var(--cat-coral)") : "var(--border-strong)"}`,
        }}
      >
        {response ? (
          <>
            <div style={{ color: "var(--ink-muted)" }}>{response.method} {response.path} <span style={{ color: "var(--ink-faint)" }}>as {role} @ {company.name}</span></div>
            <div style={{ color: ok ? "var(--accent)" : "var(--cat-coral)", fontWeight: 700 }}>
              {response.code} {response.detail ? <span style={{ fontWeight: 400 }}>{`{"detail": "${response.detail}"}`}</span> : null}
            </div>
          </>
        ) : (
          <span style={{ color: "var(--ink-faint)" }}>Responses appear here.</span>
        )}
      </div>
    </Tile>
  );
}
