import { useEffect, useState } from "react";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import CommandPalette from "./components/layout/CommandPalette";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Freelance from "./components/sections/Freelance";
import Contact from "./components/sections/Contact";
import EndCard from "./components/sections/EndCard";
import RecruiterView from "./components/sections/RecruiterView";
import CaseStudy from "./components/sections/CaseStudy";
import Loader from "./components/layout/Loader";
import AskChat from "./components/layout/AskChat";
import { useTheme } from "./hooks/useTheme";
import { useHashRoute } from "./hooks/useHashRoute";
import { getCaseStudy } from "./data/caseStudies";

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [recruiter, setRecruiter] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const caseSlug = useHashRoute();
  const study = caseSlug ? getCaseStudy(caseSlug) : null;

  useEffect(() => {
    if (study) {
      window.scrollTo({ top: 0 });
      return;
    }
    const id = window.location.hash.slice(1);
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }, [study]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const toggleRecruiter = () => {
    setRecruiter((r) => !r);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <Loader />
      <Nav
        theme={theme}
        onToggleTheme={toggleTheme}
        recruiter={recruiter}
        onToggleRecruiter={toggleRecruiter}
        onOpenPalette={() => setPaletteOpen(true)}
      />
      <main>
        {study ? (
          <CaseStudy study={study} />
        ) : recruiter ? (
          <RecruiterView />
        ) : (
          <>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Experience />
            <Freelance />
            <Contact />
          </>
        )}
      </main>
      <Footer />
      {!study && !recruiter && <EndCard />}
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        theme={theme}
        onToggleTheme={toggleTheme}
        recruiter={recruiter}
        onToggleRecruiter={toggleRecruiter}
        onOpenChat={() => setChatOpen(true)}
      />
      <AskChat open={chatOpen} onOpen={() => setChatOpen(true)} onClose={() => setChatOpen(false)} />
    </>
  );
}
