import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';

function SectionDivider() {
  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-10">
      <div className="flex items-center gap-5">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/15 to-primary/8" />
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-1 h-1 rotate-45 bg-primary/30" />
          <div className="w-1.5 h-1.5 rotate-45 border border-primary/25" />
          <div className="w-1 h-1 rotate-45 bg-primary/30" />
        </div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-primary/15 to-primary/8" />
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Education />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Contact />
    </>
  );
}
