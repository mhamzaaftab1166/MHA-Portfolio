'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { HiArrowTopRightOnSquare, HiLockClosed, HiChevronDown, HiChevronUp } from 'react-icons/hi2';
import { SiGithub, SiAppstore, SiGoogleplay } from 'react-icons/si';
import { getData } from '@/lib/data';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const PLACEHOLDER_PALETTES = [
  { a: 'oklch(0.20 0.055 215)', b: 'oklch(0.09 0.025 235)', accent: 'oklch(0.38 0.08 210)' },
  { a: 'oklch(0.18 0.05 280)',  b: 'oklch(0.09 0.028 260)', accent: 'oklch(0.35 0.07 275)' },
  { a: 'oklch(0.17 0.06 155)',  b: 'oklch(0.09 0.03  165)', accent: 'oklch(0.32 0.08 150)' },
];

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  appStoreUrl?: string;
  playStoreUrl?: string;
  techStack: string[];
  tags: string[];
  role: string;
}

function ImagePlaceholder({ tag, index, inView }: { tag: string; index: number; inView: boolean }) {
  const p = PLACEHOLDER_PALETTES[index % PLACEHOLDER_PALETTES.length];
  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: `linear-gradient(145deg, ${p.a} 0%, ${p.b} 100%)` }}
    >
      {/* Subtle inner glow */}
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 30% 40%, ${p.accent} 0%, transparent 65%)` }}
      />

      {/* Blueprint dot grid */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'radial-gradient(circle, oklch(0.73 0.12 85 / 35%) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Large faint tag watermark */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-none">
        <span
          className="font-black uppercase text-center leading-none tracking-[-0.04em]"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'oklch(0.73 0.12 85 / 8%)' }}
        >
          {tag}
        </span>
      </div>

      {/* Gold corner brackets */}
      <div className="absolute top-4 start-4 w-7 h-7 pointer-events-none">
        <div className="absolute top-0 start-0 w-full h-[1.5px] bg-primary/55" />
        <div className="absolute top-0 start-0 h-full w-[1.5px] bg-primary/55" />
      </div>
      <div className="absolute bottom-4 end-4 w-7 h-7 pointer-events-none">
        <div className="absolute bottom-0 end-0 w-full h-[1.5px] bg-primary/55" />
        <div className="absolute bottom-0 end-0 h-full w-[1.5px] bg-primary/55" />
      </div>

      {/* Animated shimmer */}
      <motion.div
        className="absolute inset-y-0 w-[1px] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, oklch(0.73 0.12 85 / 55%), transparent)' }}
        animate={inView ? { x: ['-10vw', '50vw'] } : { x: '-10vw' }}
        transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 4, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function Actions({ project, t }: { project: Project; t: ReturnType<typeof useTranslations<'Projects'>> }) {
  const noUrls = !project.liveUrl && !project.githubUrl && !project.appStoreUrl && !project.playStoreUrl;

  if (noUrls) {
    return (
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.22] bg-white/[0.06]">
        <HiLockClosed size={10} className="text-muted-foreground/80" />
        <span className="text-[7.5px] tracking-[0.38em] uppercase text-muted-foreground/80">{t('private')}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/45 bg-primary/[0.09] text-primary hover:bg-primary/[0.20] hover:border-primary/75 transition-all duration-300 group"
        >
          <span className="text-[8px] tracking-[0.32em] uppercase font-medium">{t('viewProject')}</span>
          <HiArrowTopRightOnSquare size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </a>
      )}
      {project.appStoreUrl && (
        <a
          href={project.appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.20] bg-white/[0.06] text-foreground/85 hover:border-primary/45 hover:text-primary hover:bg-primary/[0.09] transition-all duration-300"
        >
          <SiAppstore size={12} />
          <span className="text-[8px] tracking-[0.28em] uppercase">App Store</span>
        </a>
      )}
      {project.playStoreUrl && (
        <a
          href={project.playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.20] bg-white/[0.06] text-foreground/85 hover:border-primary/45 hover:text-primary hover:bg-primary/[0.09] transition-all duration-300"
        >
          <SiGoogleplay size={11} />
          <span className="text-[8px] tracking-[0.28em] uppercase">Play Store</span>
        </a>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.20] bg-white/[0.06] text-foreground/85 hover:border-primary/45 hover:text-primary hover:bg-primary/[0.09] transition-all duration-300"
        >
          <SiGithub size={12} />
          <span className="text-[8px] tracking-[0.28em] uppercase">{t('viewCode')}</span>
        </a>
      )}
    </div>
  );
}

export default function Projects() {
  const t = useTranslations('Projects');
  const locale = useLocale() as 'en' | 'ar';
  const data = getData('projects', locale);
  const featured: Project[] = data.featured;
  const other: Project[] = data.other;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();
  const [showOther, setShowOther] = useState(false);

  return (
    <section ref={ref} id="projects" className="relative px-4 pt-20 pb-24 md:px-8 md:pt-24 md:pb-28 lg:px-16 xl:px-24 overflow-hidden">

      {/* Watermark */}
      <div className="absolute top-0 end-0 opacity-[0.022] pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="font-bold text-primary" style={{ fontSize: 'clamp(9rem, 26vw, 22rem)', letterSpacing: '-0.05em', lineHeight: 1 }}>
          06
        </span>
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.055] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, oklch(0.73 0.12 85 / 60%) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      {/* Diagonal streak */}
      <div className="absolute top-0 start-1/2 w-px h-full pointer-events-none opacity-[0.05]" style={{
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
          <span className="text-[9px] tracking-[0.5em] uppercase text-primary/72 shrink-0">06</span>
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

        {/* ── Featured projects ── */}
        <div className="flex flex-col gap-6 mb-16">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.75, delay: 0.15 + i * 0.13, ease }}
              whileHover={reduced ? {} : { y: -3, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
              className="glass rounded-2xl border border-primary/20 hover:border-primary/40 overflow-hidden transition-colors duration-300 hover:shadow-[0_20px_56px_oklch(0_0_0/45%),_0_0_36px_oklch(0.73_0.12_85/7%)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]">

                {/* Image / Placeholder */}
                <div className="relative" style={{ minHeight: '240px' }}>
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  ) : (
                    <ImagePlaceholder tag={project.tags[0]} index={i} inView={inView} />
                  )}

                  {/* Right-edge fade into card on desktop */}
                  <div
                    className="hidden lg:block absolute inset-y-0 end-0 w-16 pointer-events-none"
                    style={{ background: 'linear-gradient(to end, transparent, oklch(0.09 0.009 285 / 90%))' }}
                  />
                </div>

                {/* Content */}
                <div className="p-7 xl:p-9 flex flex-col justify-between gap-6">
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-[7px] tracking-[0.32em] uppercase px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.18] text-muted-foreground/82"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3
                      className="font-bold text-foreground/95 mb-3"
                      style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.65rem)' }}
                    >
                      {project.title}
                    </h3>

                    {/* Role badge */}
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                      style={{ background: 'oklch(0.73 0.12 85 / 10%)', border: '1px solid oklch(0.73 0.12 85 / 26%)' }}
                    >
                      <div className="w-[5px] h-[5px] rotate-45 bg-primary/70 shrink-0" />
                      <span className="text-[7.5px] tracking-[0.25em] uppercase text-primary/88">{project.role}</span>
                    </div>

                    <p className="text-foreground/82 leading-[1.82]" style={{ fontSize: 'clamp(0.82rem, 1.3vw, 0.9rem)' }}>
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map(tech => (
                        <span
                          key={tech}
                          className="text-[7.5px] tracking-[0.22em] uppercase px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.16] text-muted-foreground/82 hover:border-primary/45 hover:text-primary/90 hover:bg-primary/[0.07] transition-all duration-200 cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="h-px bg-gradient-to-r from-primary/28 to-transparent" />

                    <Actions project={project} t={t} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── View More / View Less button ── */}
        {other.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.58, ease }}
            className="flex flex-col items-center gap-6"
          >
            <button
              onClick={() => setShowOther(v => !v)}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-primary/35 text-[9px] tracking-[0.35em] uppercase text-primary/85 hover:border-primary/65 hover:text-primary hover:bg-primary/[0.08] transition-all duration-300"
            >
              {showOther ? (
                <>{t('viewLess')}<HiChevronUp size={13} /></>
              ) : (
                <>{t('viewMore')}<HiChevronDown size={13} /></>
              )}
            </button>

            <AnimatePresence>
              {showOther && (
                <motion.div
                  key="other-projects"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full overflow-hidden"
                >
                  {/* Section label */}
                  <div className="flex items-center gap-5 mb-7">
                    <div className="w-8 h-px bg-primary/25 shrink-0" />
                    <h3 className="text-[10px] tracking-[0.45em] uppercase text-muted-foreground/82 shrink-0">
                      {t('otherProjects')}
                    </h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-primary/22 to-transparent" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {other.map((project, i) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.6, delay: i * 0.09, ease }}
                        whileHover={reduced ? {} : { y: -3, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
                        className="glass rounded-2xl p-6 border border-primary/20 hover:border-primary/38 transition-colors duration-300 flex flex-col gap-4 hover:shadow-[0_12px_36px_oklch(0_0_0/38%),_0_0_22px_oklch(0.73_0.12_85/5%)]"
                      >
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map(tag => (
                            <span
                              key={tag}
                              className="text-[6.5px] tracking-[0.3em] uppercase px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.16] text-muted-foreground/78"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Title + description */}
                        <div>
                          <h4 className="font-bold text-foreground/95 mb-2" style={{ fontSize: 'clamp(0.95rem, 1.7vw, 1.1rem)' }}>
                            {project.title}
                          </h4>
                          <p className="text-foreground/88 leading-[1.72]" style={{ fontSize: 'clamp(0.78rem, 1.2vw, 0.85rem)' }}>
                            {project.description}
                          </p>
                        </div>

                        {/* Role */}
                        <p className="text-[8.5px] tracking-[0.2em] text-primary/88 leading-[1.6]">{project.role}</p>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.map(tech => (
                            <span
                              key={tech}
                              className="text-[7px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.16] text-muted-foreground/80 hover:border-primary/42 hover:text-primary/90 transition-all duration-200 cursor-default"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="h-px bg-gradient-to-r from-primary/22 to-transparent" />

                        <Actions project={project} t={t} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
}
