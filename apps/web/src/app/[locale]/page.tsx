import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Section separator */}
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-5">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/20 to-primary/10" />
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-1 h-1 rotate-45 bg-primary/35" />
            <span className="text-[7px] tracking-[0.55em] uppercase text-primary/35">Scroll</span>
            <div className="w-1 h-1 rotate-45 bg-primary/35" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-primary/20 to-primary/10" />
        </div>
      </div>

      <About />
    </>
  );
}
