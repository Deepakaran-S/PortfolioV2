export const CASE_STUDIES = [
  {
    slug: "volttask",
    projectId: 1,
    title: "VoltTask",
    kicker: "Multi-tenant SaaS task management",
    summary:
      "A SaaS platform where every company gets an isolated workspace and every action is checked against the user's role on the server.",
    role: "Designed and built the full stack: FastAPI backend, PostgreSQL schema and a React + TypeScript frontend.",
    stack: ["FastAPI", "Python", "PostgreSQL", "SQLAlchemy", "React", "TypeScript", "JWT", "Tailwind"],
    metrics: [
      { figure: "17", label: "REST endpoints" },
      { figure: "4", label: "database tables" },
      { figure: "3", label: "roles enforced server-side" },
      { figure: "13", label: "frontend pages" },
    ],
    metricsNote: "Counted from the public repositories.",
    demo: "tenant",
    problem:
      "A task tool is easy to build. A SaaS that serves many companies is harder: one company must never see another's data, and people must only do what their role allows, even if they call the API directly.",
    flow: [
      { title: "Client", detail: "React + TypeScript, typed Axios API layer" },
      { title: "Auth", detail: "JWT sessions, OTP verification at login" },
      { title: "Role guard", detail: "require_roles dependency on each route" },
      { title: "Service layer", detail: "Every query scoped by company_id" },
      { title: "PostgreSQL", detail: "companies, users, tasks, otp_records" },
    ],
    decisions: [
      {
        title: "Row-level tenancy with company_id",
        body: "Users and tasks share one schema and carry a company_id. Task queries filter by the caller's company, and assigning a task checks that the assignee belongs to the same company, so cross-tenant access has no path through the API. The trade-off versus schema-per-tenant is simplicity and cost, paid for by making sure every query is scoped, which is why that logic lives in one service layer.",
      },
      {
        title: "Roles as a dependency, not scattered checks",
        body: "A single require_roles(*roles) dependency is declared on the route and returns a 403 that names the required roles. Permissions are visible next to each endpoint instead of buried inside handlers.",
      },
      {
        title: "OTP at both ends of authentication",
        body: "Registration requires email verification, login has a second OTP step, and password reset is OTP-based too. OTP records live in their own table, and 9 of the 17 endpoints belong to the auth flow.",
      },
      {
        title: "Thin routers, business rules in services",
        body: "Routers, schemas, models and services are separate layers. Routers parse and respond; auth_service and task_service own the rules, which keeps behavior testable and consistent.",
      },
    ],
    permissions: {
      columns: ["Admin", "Manager", "Employee"],
      rows: [
        { action: "Invite a user", access: [true, false, false] },
        { action: "Deactivate a user", access: [true, false, false] },
        { action: "Delete a task", access: [true, false, false] },
        { action: "Create a task", access: [true, true, false] },
        { action: "Assign a task", access: [true, true, false] },
        { action: "Update a task", access: [true, true, "own"] },
        { action: "View tasks, list users", access: [true, true, true] },
      ],
    },
    links: [
      { label: "Frontend repo", url: "https://github.com/Deepakaran-S/Voltask-Frontend" },
      { label: "Backend repo", url: "https://github.com/Deepakaran-S/Voltask-Backend" },
    ],
  },
  {
    slug: "erp",
    projectId: 4,
    title: "ERP Platform",
    kicker: "Construction-domain enterprise app",
    summary:
      "A large-scale ERP for a client in the Construction domain, with separate dashboards and workflows for Admin, Manager and Employee.",
    role: "Developed and maintained multiple modules in React.js, built the authentication flow, wrote the PDF microservice and handled client communication.",
    stack: ["React", "Node.js", "JWT", "PostgreSQL", "PDF generation"],
    metrics: [
      { figure: "3", label: "user personas" },
      { figure: "1", label: "PDF service shared across apps" },
    ],
    metricsNote: "Client project: the source is private, so only facts from my resume are listed.",
    problem:
      "One ERP had to serve three kinds of users with very different jobs, and the client's business rules were complex. Each persona needed its own view of the same system, and documents like invoices and reports had to be generated reliably.",
    flow: [
      { title: "React app", detail: "Role-specific dashboards and workflows" },
      { title: "Auth", detail: "Login, registration, protected routes, JWT sessions" },
      { title: "Backend APIs", detail: "Business logic for each module" },
      { title: "PDF microservice", detail: "Node.js templating and data binding" },
    ],
    decisions: [
      {
        title: "One app, three personas",
        body: "Admin, Manager and Employee each get dashboards and workflows built around their tasks, aligned with the client's business logic instead of a generic CRUD layout.",
      },
      {
        title: "Protected routes and JWT sessions",
        body: "The authentication flow covers login, registration, session management and route protection, so each persona only reaches the screens that belong to them.",
      },
      {
        title: "PDF generation as a shared service",
        body: "Invoices, reports and exports are produced by a dedicated Node.js microservice using templates and data binding. Several applications reuse it instead of each carrying its own export code.",
      },
      {
        title: "Requirements before code",
        body: "I led client communication from requirement gathering and scoping through delivery, so features matched real workflows and stakeholder expectations.",
      },
    ],
    permissions: null,
    links: [],
  },
];

export const getCaseStudy = (slug) => CASE_STUDIES.find((c) => c.slug === slug);
export const getCaseStudyForProject = (projectId) => CASE_STUDIES.find((c) => c.projectId === projectId);
