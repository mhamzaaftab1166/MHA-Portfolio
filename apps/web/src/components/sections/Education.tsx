'use client';

import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { HiMapPin, HiAcademicCap, HiTrophy, HiComputerDesktop } from 'react-icons/hi2';
import { getData } from '@/lib/data';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface EducationEntry {
  id: string;
  period: string;
  institution: string;
  degree: string;
  location: string;
}

interface Honor {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const HONOR_ICONS: Record<string, React.ElementType> = {
  medal:  HiTrophy,
  laptop: HiComputerDesktop,
};

export default function Education() {
  const t = useTranslations('Education');
  const locale = useLocale() as 'en' | 'ar';
  const educationData = getData('education', locale);
  const entries: EducationEntry[] = educationData.entries;
  const honors: Honor[] = educationData.honors;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="education" className="relative px-4 pt-20 pb-24 md:px-8 md:pt-24 md:pb-28 lg:px-16 xl:px-24 overflow-hidden">

      {/* Watermark */}
      <div className="absolute top-0 end-0 opacity-[0.022] pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="font-bold text-primary" style={{ fontSize: 'clamp(9rem, 26vw, 22rem)', letterSpacing: '-0.05em', lineHeight: 1 }}>
          05
        </span>
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.055] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, oklch(0.73 0.12 85 / 60%) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      {/* Diagonal streak */}
      <div className="absolute top-0 start-3/4 w-px h-full pointer-events-none opacity-[0.05]" style={{
        background: 'linear-gradient(to bottom, transparent, oklch(0.73 0.12 85), transparent)',
        transform: 'skewX(-18deg)',
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, ease }}
          className="flex items-center gap-5 mb-12"
        >
          <span className="text-[9px] tracking-[0.5em] uppercase text-primary/72 shrink-0">05</span>
          <div className="w-8 h-px bg-primary/35 shrink-0" />
          <h2 className="text-[11px] tracking-[0.45em] uppercase text-muted-foreground shrink-0">
            {t('sectionLabel')}
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, ease, delay: 0.08 }}
          className="text-gold-gradient font-bold leading-[0.88] tracking-[-0.03em] mb-16"
          style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}
        >
          {t('title')}
        </motion.h2>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 xl:gap-16 items-start">

          {/* ── Left: Education Timeline ── */}
          <div className="relative">

            {/* Animated vertical gold line */}
            <div className="absolute start-[1.1rem] top-0 bottom-0 w-px overflow-hidden">
              <motion.div
                className="w-full"
                style={{ background: 'linear-gradient(to bottom, oklch(0.73 0.12 85 / 70%), oklch(0.73 0.12 85 / 25%), transparent)' }}
                initial={{ height: '0%' }}
                animate={inView ? { height: '100%' } : {}}
                transition={{ duration: 2.2, delay: 0.4, ease }}
              />
            </div>

            <div className="flex flex-col gap-6">
              {entries.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: 28, filter: 'blur(8px)' }}
                  animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
                  transition={{ duration: 0.7, delay: 0.18 + i * 0.14, ease }}
                  className="flex gap-5 items-start"
                >
                  {/* Timeline node */}
                  <div className="shrink-0 pt-5 z-10">
                    <div
                      className="w-[2.2rem] h-[2.2rem] rounded-full flex items-center justify-center"
                      style={{
                        background: i === 0 ? 'oklch(0.73 0.12 85)' : 'oklch(0.07 0.007 285)',
                        color:      i === 0 ? 'oklch(0.058 0.006 285)' : 'oklch(0.73 0.12 85)',
                        border:     `1.5px solid oklch(0.73 0.12 85 / ${i === 0 ? '70%' : '40%'})`,
                        boxShadow:  i === 0 ? '0 0 22px oklch(0.73 0.12 85 / 40%), 0 0 45px oklch(0.73 0.12 85 / 15%)' : 'none',
                      }}
                    >
                      <HiAcademicCap size={14} />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 glass rounded-2xl p-6 border border-primary/20 hover:border-primary/38 transition-all duration-300 mb-1 hover:shadow-[0_8px_32px_oklch(0_0_0/35%),_0_0_24px_oklch(0.73_0.12_85/6%)]">

                    {/* Period pill */}
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/[0.08] border border-primary/40 text-[8px] tracking-[0.35em] uppercase text-primary/90 mb-4">
                      {entry.period}
                    </span>

                    <h3 className="font-bold text-foreground mb-1" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>
                      {entry.institution}
                    </h3>

                    <p className="text-primary/90 text-[13px] mb-4">{entry.degree}</p>

                    <div className="h-px bg-gradient-to-r from-primary/20 to-transparent mb-3" />

                    <p className="flex items-center gap-1.5 text-[9px] text-muted-foreground/80">
                      <HiMapPin size={10} />
                      {entry.location}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Right: Honors ── */}
          <motion.div
            initial={{ opacity: 0, x: 32, filter: 'blur(8px)' }}
            animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="flex flex-col gap-4"
          >
            <p className="text-[7.5px] tracking-[0.5em] uppercase text-primary/80 mb-1">
              {t('honorsLabel')}
            </p>

            {honors.map((honor, i) => {
              const HonorIcon = HONOR_ICONS[honor.icon] ?? HiTrophy;
              return (
                <motion.div
                  key={honor.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.45 + i * 0.14, ease }}
                  className="glass rounded-2xl p-5 border border-primary/20 hover:border-primary/45 transition-all duration-300 group hover:shadow-[0_8px_32px_oklch(0_0_0/35%),_0_0_24px_oklch(0.73_0.12_85/7%)]"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/[0.18] transition-all duration-300"
                      style={{
                        background:  'oklch(0.73 0.12 85 / 10%)',
                        border:      '1px solid oklch(0.73 0.12 85 / 22%)',
                        boxShadow:   '0 0 20px oklch(0.73 0.12 85 / 10%)',
                      }}
                    >
                      <HonorIcon size={18} className="text-primary/80 group-hover:text-primary transition-colors duration-300" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-foreground mb-1.5" style={{ fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)' }}>
                        {honor.title}
                      </h4>
                      <p className="text-foreground/88 leading-[1.7]" style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.8rem)' }}>
                        {honor.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
