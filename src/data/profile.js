export const PROFILE = {
  name: "Deepakaran S",
  role: "Full Stack Developer",
  company: "SIRPI Products & Services",
  location: "Bangalore, IN",
  email: "deepakarans2003@gmail.com",
  github: "https://github.com/Deepakaran-S",
  linkedin: "https://www.linkedin.com/in/deepakaran",
  resumeUrl: "/resume.pdf",
  careerStart: new Date(2025, 8, 1),
};

export const HAS_RESUME = Object.keys(import.meta.glob("/public/resume.pdf")).length > 0;

export const HIGHLIGHTS = [
  "Maintained multiple modules of a large-scale ERP for a Construction-domain client, building role-specific dashboards and workflows in React.js for Admin, Manager and Employee personas.",
  "Engineered a full React authentication flow — login, registration, protected routes, session management and JWT-based access control.",
  "Built a React Native ride-hailing app for the Transportation domain, inspired by Uber and Rapido, with real-time UI, map integration and role-based rider and driver screens.",
  "Developed a Node.js PDF generation microservice used across multiple applications, producing invoices, reports and exports through templating and data binding.",
  "Led client communication end-to-end, from requirement gathering and scoping to making sure delivered features matched real workflows.",
];

export function getExperience(now = new Date()) {
  const { careerStart } = PROFILE;
  const months = Math.max(
    0,
    (now.getFullYear() - careerStart.getFullYear()) * 12 + now.getMonth() - careerStart.getMonth()
  );
  const years = Math.floor(months / 12);
  const rest = months % 12;

  if (years === 0) {
    return {
      figure: `${months}+`,
      label: "months industry exp",
      duration: `${months} ${months === 1 ? "month" : "months"}`,
    };
  }

  const yearText = `${years} ${years === 1 ? "yr" : "yrs"}`;
  return {
    figure: `${(months / 12).toFixed(1)}`,
    label: "years industry exp",
    duration: rest ? `${yearText} ${rest} mo` : yearText,
  };
}
