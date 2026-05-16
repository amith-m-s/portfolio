import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import ArchDiagram from "@/components/ArchDiagram";
import Skills from "@/components/Skills";
import Philosophy from "@/components/Philosophy";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";

function Divider() {
  return (
    <div style={{maxWidth:1100,margin:"0 auto",padding:"0 40px"}}>
      <div style={{height:1,background:"linear-gradient(to right,transparent,var(--bdr),transparent)"}}/>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Noise texture overlay */}
      <div aria-hidden="true" className="noise" style={{
        position:"fixed",inset:0,zIndex:9999,
        pointerEvents:"none",opacity:.45,
      }}/>

      <Navbar />

      <main>
        <Hero />
        <Divider/>
        <About />
        <Divider/>
        <Projects />
        <Divider/>
        <ArchDiagram />
        <Divider/>
        <Skills />
        <Divider/>
        <Philosophy />
      </main>

      <Footer />
      <CommandPalette />
    </>
  );
}
