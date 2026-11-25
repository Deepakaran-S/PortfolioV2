import { PROFILE, HAS_RESUME, HIGHLIGHTS, getExperience } from "../data/profile";
import { PROJECTS } from "../data/projects";
import { SKILLS, EVIDENCE, GROUP_LABELS } from "../data/skills";
import { CASE_STUDIES, getCaseStudyForProject } from "../data/caseStudies";

const TECH_ALIASES = [
  ["react native", "React Native"],
  ["react", "React"], ["reactjs", "React"], ["react.js", "React"],
  ["typescript", "TypeScript"], ["ts", "TypeScript"],
  ["tailwind", "Tailwind"],
  ["node", "Node.js"], ["nodejs", "Node.js"], ["node.js", "Node.js"],
  ["fastapi", "FastAPI"], ["fast api", "FastAPI"],
  ["express", "Express"],
  ["rest", "REST APIs"], ["api", "REST APIs"], ["apis", "REST APIs"],
  ["postgres", "PostgreSQL"], ["postgresql", "PostgreSQL"],
  ["mongo", "MongoDB"], ["mongodb", "MongoDB"],
  ["mysql", "MySQL"],
  ["python", "Python"],
  ["jwt", "JWT / Auth"], ["auth", "JWT / Auth"], ["authentication", "JWT / Auth"],
  ["rbac", "RBAC"], ["roles", "RBAC"], ["permissions", "RBAC"],
  ["multi tenant", "Multi-tenant"], ["multitenant", "Multi-tenant"], ["tenancy", "Multi-tenant"],
  ["git", "Git"], ["postman", "Postman"],
];

const PROJECT_ALIASES = [
  ["volttask", 1], ["voltask", 1],
  ["coursehub", 2], ["course", 2],
  ["ride", 3], ["uber", 3], ["rapido", 3],
  ["erp", 4],
  ["trash", 5],
  ["blog", 6],
  ["cinebook", 7], ["movie", 7], ["ticket", 7],
];

const normalize = (text) => ` ${text.toLowerCase().replace(/[^a-z0-9+#. -]/g, " ").replace(/\s+/g, " ").trim()} `;
const mentions = (query, word) => query.includes(` ${word} `) || query.includes(` ${word}s `);

const caseLink = (slug) => ({ label: "Read the case study", href: `#/case/${slug}` });
const mailLink = { label: `Email ${PROFILE.email}`, href: `mailto:${PROFILE.email}` };

function techAnswer(skill) {
  const used = EVIDENCE[skill] ?? [];
  const links = [];
  if (["RBAC", "Multi-tenant", "FastAPI", "PostgreSQL", "JWT / Auth", "Python"].includes(skill)) {
    links.push(caseLink("volttask"));
  }
  if (used.length === 0) {
    return { text: `Yes, ${skill} is part of my toolkit.`, links };
  }
  if (used[0] === "Every project") {
    return { text: `Yes, ${skill} is used on every project I build.`, links };
  }
  return { text: `Yes. ${skill} is used in ${used.join(", ")}.`, links };
}

function projectAnswer(id) {
  const project = PROJECTS.find((p) => p.id === id);
  const study = getCaseStudyForProject(id);
  const links = [];
  if (study) links.push(caseLink(study.slug));
  if (Array.isArray(project.github)) project.github.forEach((g) => links.push({ label: g.label, href: g.url }));
  else if (project.github) links.push({ label: "GitHub", href: project.github });
  const privateNote = project.private ? " The code is private client work." : "";
  return { text: `${project.name} (${project.tag}): ${project.desc} Stack: ${project.stack.join(", ")}.${privateNote}`, links };
}

const INTENTS = [
  {
    words: ["hi", "hello", "hey", "yo"],
    answer: () => ({
      text: `Hi! I'm a quick answer bot built from ${PROFILE.name}'s resume and project data. Ask about skills, projects, experience or how to get in touch.`,
    }),
  },
  {
    words: ["who", "about", "yourself", "introduce", "summary", "tell me about you"],
    answer: () => ({
      text: `${PROFILE.name} is a ${PROFILE.role} at ${PROFILE.company} in Bangalore with ${getExperience().duration} of industry experience, building ERP systems, multi-tenant SaaS and React Native apps.`,
      links: [caseLink("volttask")],
    }),
  },
  {
    words: ["experience", "years", "how long", "senior", "junior", "fresher", "worked", "company", "role", "current"],
    answer: () => ({
      text: `${getExperience().duration} as a Frontend Developer at ${PROFILE.company} (since Sep 2025). Highlights: ${HIGHLIGHTS.slice(0, 3).join(" ")}`,
    }),
  },
  {
    words: ["skills", "stack", "technologies", "technology", "tech", "tools", "know"],
    answer: () => ({
      text: Object.entries(GROUP_LABELS)
        .map(([group, label]) => `${label}: ${SKILLS.filter((s) => s.group === group).map((s) => s.name).join(", ")}`)
        .join("\n"),
    }),
  },
  {
    words: ["projects", "project", "built", "build", "portfolio", "work samples", "demo"],
    answer: () => ({
      text: `Featured work: ${PROJECTS.filter((p) => p.featured).map((p) => p.name).join(", ")}. Ask about any of them, or open a case study.`,
      links: CASE_STUDIES.map((c) => ({ label: `${c.title} case study`, href: `#/case/${c.slug}` })),
    }),
  },
  {
    words: ["hire", "contact", "email", "reach", "available", "availability", "job", "opportunity", "opportunities", "opening", "interview", "talk", "call"],
    answer: () => ({
      text: "Yes, I'm open to new opportunities. The fastest way to reach me is email.",
      links: [mailLink, ...(HAS_RESUME ? [{ label: "Download resume", href: PROFILE.resumeUrl }] : []), { label: "LinkedIn", href: PROFILE.linkedin }],
    }),
  },
  {
    words: ["resume", "cv"],
    answer: () => HAS_RESUME
      ? { text: "Here's my resume.", links: [{ label: "Download resume", href: PROFILE.resumeUrl }] }
      : { text: "Email me and I'll send my resume over.", links: [mailLink] },
  },
  {
    words: ["where", "location", "located", "based", "city", "relocate", "relocation", "remote"],
    answer: () => ({
      text: `I'm based in ${PROFILE.location} and work at ${PROFILE.company}. My home state is Tamil Nadu. For relocation or remote questions, email me.`,
      links: [mailLink],
    }),
  },
  {
    words: ["education", "degree", "college", "university", "study", "studied", "cgpa", "graduate"],
    answer: () => ({ text: "B.Tech in Information Technology (2021 to 2025) from KSR College of Engineering, Namakkal. CGPA 7.5." }),
  },
  {
    words: ["freelance", "freelancing", "website", "websites", "client", "clients"],
    answer: () => ({
      text: "I freelance on the side, building custom websites from scratch. I started with photography studios and I'm open to any industry.",
      links: [{ label: "See the freelance work", href: "#freelance" }],
    }),
  },
  {
    words: ["salary", "ctc", "package", "notice", "compensation", "expected"],
    answer: () => ({ text: "I'd rather talk about that directly. Email me and we can sort it out.", links: [mailLink] }),
  },
];

export const SUGGESTIONS = [
  "What's your experience?",
  "Do you know FastAPI?",
  "Tell me about VoltTask",
  "Show me your RBAC work",
  "How can I contact you?",
];

export function answerQuestion(input) {
  const query = normalize(input);

  const projectHit = PROJECT_ALIASES.find(([alias]) => mentions(query, alias));
  if (projectHit) return projectAnswer(projectHit[1]);

  const techHit = TECH_ALIASES.find(([alias]) => mentions(query, alias));
  if (techHit) {
    const skill = techHit[0] === "react" && mentions(query, "react native") ? "React Native" : techHit[1];
    return techAnswer(skill);
  }

  let best = null;
  let bestScore = 0;
  INTENTS.forEach((intent) => {
    const score = intent.words.filter((w) => query.includes(` ${w} `) || (w.includes(" ") && query.includes(w))).length;
    if (score > bestScore) {
      best = intent;
      bestScore = score;
    }
  });
  if (best) return best.answer();

  return {
    text: "I only know what's on my resume and in my projects. Try asking about skills, a specific project, experience, or how to reach me.",
    links: [mailLink],
  };
}
