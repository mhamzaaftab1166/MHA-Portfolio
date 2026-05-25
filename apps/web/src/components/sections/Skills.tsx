'use client';

import { useState, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { siIconMap } from '@/lib/icons';
import { getData } from '@/lib/data';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface Skill {
  name: string;
  icon: string;
  level: number;
}

interface Category {
  id: string;
  label: string;
  skills: Skill[];
}

function SkillCard({ skill, index, inView }: { skill: Skill; index: number; inView: boolean }) {
  const Icon = siIconMap[skill.icon];
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.52, delay: index * 0.045, ease }}
      whileHover={reduced ? {} : { y: -4, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
      className="glass rounded-xl p-4 border border-primary/20 hover:border-primary/50 group transition-colors duration-300 cursor-default"
      style={{ '--hover-shadow': '0 8px 30px oklch(0 0 0 / 35%), 0 0 20px oklch(0.73 0.12 85 / 7%)' } as React.CSSProperties}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/[0.09] border border-primary/25 group-hover:bg-primary/[0.18] group-hover:border-primary/45 transition-all duration-300 shrink-0">
          {Icon
            ? <Icon size={15} className="text-primary/80 group-hover:text-primary transition-all duration-300 group-hover:scale-110" />
            : <span className="text-primary/85 text-[10px] font-bold">{skill.name[0]}</span>
          }
        </div>
        <span className="text-[11px] font-medium text-foreground/90 group-hover:text-foreground transition-colors duration-300 leading-tight">
          {skill.name}
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <span className="text-[7px] tracking-[0.28em] uppercase text-muted-foreground/70">Level</span>
          <span className="text-[9px] text-primary/85 font-medium tabular-nums group-hover:text-primary transition-colors duration-300">{skill.level}%</span>
        </div>
        <div className="h-[3px] rounded-full bg-white/[0.10] overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(to right, oklch(0.49 0.10 75 / 80%), oklch(0.73 0.12 85), oklch(0.83 0.11 90))' }}
            initial={{ width: '0%' }}
            animate={inView ? { width: `${skill.level}%` } : { width: '0%' }}
            transition={{ duration: 1.1, delay: 0.25 + index * 0.045, ease }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const t = useTranslations('Skills');
  const locale = useLocale() as 'en' | 'ar';
  const skillsData = getData('skills', locale);
  const categories: Category[] = skillsData.categories;
  const [activeId, setActiveId] = useState(categories[0].id);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();

  const current = categories.find(c => c.id === activeId)!;

  return (
    <section ref={ref} id="skills" className="relative px-4 pt-20 pb-24 md:px-8 md:pt-24 md:pb-28 lg:px-16 xl:px-24 overflow-hidden">

      {/* Watermark */}
      <div className="absolute top-0 end-0 opacity-[0.022] pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="font-bold text-primary" style={{ fontSize: 'clamp(9rem, 26vw, 22rem)', letterSpacing: '-0.05em', lineHeight: 1 }}>
          03
        </span>
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.055] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, oklch(0.73 0.12 85 / 60%) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      {/* Diagonal streak */}
      <div className="absolute top-0 start-2/3 w-px h-full pointer-events-none opacity-[0.06]" style={{
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
          <span className="text-[9px] tracking-[0.5em] uppercase text-primary/72 shrink-0">03</span>
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
          className="text-gold-gradient font-bold leading-[0.88] tracking-[-0.03em] mb-10"
          style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}
        >
          {t('title')}
        </motion.h2>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.18 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map(cat => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              whileHover={reduced ? {} : { scale: 1.03 }}
              whileTap={reduced ? {} : { scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className={`text-[8.5px] tracking-[0.3em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 ${
                activeId === cat.id
                  ? 'border border-primary/65 bg-primary/[0.14] text-primary shadow-[0_0_22px_oklch(0.73_0.12_85/20%),_0_0_0_1px_oklch(0.73_0.12_85/12%)]'
                  : 'border border-white/[0.20] text-muted-foreground/90 hover:border-primary/42 hover:text-primary hover:bg-primary/[0.07]'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
          >
            {current.skills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} inView={inView} />
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
