'use client';

import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { HiMapPin, HiBriefcase } from 'react-icons/hi2';
import { getData } from '@/lib/data';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface Job {
  id: string;
  company: string;
  companyInitials: string;
  role: string;
  type: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  bullets: string[];
  techStack: string[];
}

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

export default function Experience() {
  const t = useTranslations('Experience');
  const locale = useLocale() as 'en' | 'ar';
  const expData = getData('experience', locale);
  const jobs: Job[] = expData.jobs;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();

  return (
    <section ref={ref} id="experience" className="relative px-4 pt-20 pb-24 md:px-8 md:pt-24 md:pb-28 lg:px-16 xl:px-24 overflow-hidden">

      {/* Watermark */}
      <div className="absolute top-0 end-0 opacity-[0.022] pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="font-bold text-primary" style={{ fontSize: 'clamp(9rem, 26vw, 22rem)', letterSpacing: '-0.05em', lineHeight: 1 }}>
          04
        </span>
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.055] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, oklch(0.73 0.12 85 / 60%) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      {/* Diagonal streak */}
      <div className="absolute top-0 start-1/4 w-px h-full pointer-events-none opacity-[0.05]" style={{
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
          <span className="text-[9px] tracking-[0.5em] uppercase text-primary/55 shrink-0">04</span>
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

        {/* Timeline */}
        <div className="relative">

          {/* Animated vertical line */}
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
            {jobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: 28, filter: 'blur(8px)' }}
                animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.7, delay: 0.18 + i * 0.12, ease }}
                className="flex gap-5 items-start"
              >

                {/* Timeline node */}
                <div className="shrink-0 pt-4 z-10">
                  <div
                    className={`w-[2.2rem] h-[2.2rem] rounded-full flex items-center justify-center text-[7px] font-bold tracking-tight transition-all duration-300 ${job.current && !reduced ? 'animate-node-pulse' : ''}`}
                    style={{
                      background: job.current ? 'oklch(0.73 0.12 85)' : 'oklch(0.07 0.007 285)',
                      color: job.current ? 'oklch(0.058 0.006 285)' : 'oklch(0.73 0.12 85)',
                      border: `1.5px solid oklch(0.73 0.12 85 / ${job.current ? '70%' : '40%'})`,
                      boxShadow: job.current ? '0 0 22px oklch(0.73 0.12 85 / 40%), 0 0 45px oklch(0.73 0.12 85 / 15%)' : 'none',
                    }}
                  >
                    {job.companyInitials}
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 glass rounded-2xl p-6 border border-primary/10 hover:border-primary/28 transition-all duration-300 mb-1 hover:shadow-[0_8px_32px_oklch(0_0_0/35%),_0_0_24px_oklch(0.73_0.12_85/6%)]">

                  {/* Top row */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div className="flex-1 min-w-0">

                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {job.current && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/[0.09] border border-emerald-500/22 text-[7.5px] tracking-[0.32em] uppercase text-emerald-400">
                            <span className="relative flex h-1.5 w-1.5 shrink-0">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                            </span>
                            {t('present')}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-primary/20 text-[7.5px] tracking-[0.28em] uppercase text-primary/65">
                          <HiBriefcase size={9} />
                          {job.type}
                        </span>
                      </div>

                      <h3 className="font-bold text-foreground mb-0.5" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>
                        {job.role}
                      </h3>
                      <p className="text-primary/75 text-[13px]">{job.company}</p>
                    </div>

                    {/* Date + location */}
                    <div className="text-start sm:text-end shrink-0">
                      <p className="text-[10px] tracking-[0.18em] text-muted-foreground font-medium">
                        {formatDate(job.startDate)}&nbsp;—&nbsp;
                        {job.current ? t('present') : job.endDate ? formatDate(job.endDate) : ''}
                      </p>
                      <p className="flex items-center justify-start sm:justify-end gap-1 text-[9px] text-muted-foreground/55 mt-1">
                        <HiMapPin size={9} />
                        {job.location}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-primary/20 to-transparent mb-4" />

                  {/* Bullets */}
                  <ul className="space-y-2.5 mb-5">
                    {job.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-3 items-start">
                        <div className="w-[5px] h-[5px] rounded-full bg-primary/50 shrink-0 mt-[0.42rem] ring-[3px] ring-primary/10" />
                        <span className="text-foreground/70 leading-[1.75]" style={{ fontSize: 'clamp(0.8rem, 1.3vw, 0.875rem)' }}>
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {job.techStack.map(tech => (
                      <span
                        key={tech}
                        className="text-[7.5px] tracking-[0.22em] uppercase px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-muted-foreground/70 hover:border-primary/35 hover:text-primary/80 hover:bg-primary/[0.06] transition-all duration-200 cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
