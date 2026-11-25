export const SKILLS = [
  { name: "React", x: 52, y: 22, size: 18, group: "frontend" },
  { name: "TypeScript", x: 75, y: 35, size: 15, group: "frontend" },
  { name: "Tailwind", x: 30, y: 40, size: 13, group: "frontend" },
  { name: "React Native", x: 18, y: 22, size: 14, group: "frontend" },
  { name: "Node.js", x: 62, y: 58, size: 17, group: "backend" },
  { name: "FastAPI", x: 40, y: 65, size: 16, group: "backend" },
  { name: "Express", x: 82, y: 62, size: 13, group: "backend" },
  { name: "REST APIs", x: 70, y: 78, size: 12, group: "backend" },
  { name: "PostgreSQL", x: 22, y: 72, size: 15, group: "db" },
  { name: "MongoDB", x: 48, y: 84, size: 13, group: "db" },
  { name: "JWT / Auth", x: 85, y: 20, size: 12, group: "concepts" },
  { name: "RBAC", x: 92, y: 45, size: 11, group: "concepts" },
  { name: "Multi-tenant", x: 8, y: 52, size: 11, group: "concepts" },
  { name: "Git", x: 35, y: 15, size: 12, group: "tools" },
  { name: "Postman", x: 62, y: 12, size: 11, group: "tools" },
  { name: "Python", x: 25, y: 56, size: 13, group: "backend" },
  { name: "MySQL", x: 80, y: 88, size: 12, group: "db" },
];

export const CONNECTIONS = [
  [0, 1], [0, 2], [0, 3], [0, 4], [4, 5], [4, 6], [4, 7],
  [5, 8], [7, 9], [1, 10], [10, 11], [2, 12], [0, 13], [13, 14],
  [5, 9], [3, 12], [6, 7], [8, 9], [15, 5], [16, 6],
];

export const GROUP_COLORS = {
  frontend: "#84cc16",
  backend: "#10b981",
  db: "#d97706",
  concepts: "#f43f5e",
  tools: "#64748b",
};

export const GROUP_LABELS = {
  frontend: "Frontend",
  backend: "Backend",
  db: "Database",
  concepts: "Concepts",
  tools: "Tools",
};

export const EVIDENCE = {
  "React": ["VoltTask", "CourseHub", "ERP Platform", "Trash-to-Treasure", "Blog Website"],
  "TypeScript": ["VoltTask"],
  "Tailwind": ["CourseHub", "Trash-to-Treasure"],
  "React Native": ["Ride-Hailing App"],
  "Node.js": ["CourseHub", "Ride-Hailing App", "ERP Platform", "Blog Website", "CineBook API"],
  "FastAPI": ["VoltTask"],
  "Express": ["CourseHub", "Blog Website", "CineBook API"],
  "REST APIs": ["VoltTask", "Blog Website", "CineBook API"],
  "PostgreSQL": ["VoltTask", "ERP Platform"],
  "MongoDB": ["CourseHub", "Blog Website"],
  "JWT / Auth": ["VoltTask", "ERP Platform", "Blog Website", "CineBook API"],
  "RBAC": ["VoltTask", "CourseHub", "ERP Platform", "Blog Website"],
  "Multi-tenant": ["VoltTask"],
  "Git": ["Every project"],
  "Postman": [],
  "Python": ["VoltTask"],
  "MySQL": ["CineBook API"],
};
