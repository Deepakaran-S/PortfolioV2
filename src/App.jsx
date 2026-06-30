import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Freelance from "./components/sections/Freelance";
import Contact from "./components/sections/Contact";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Freelance />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
