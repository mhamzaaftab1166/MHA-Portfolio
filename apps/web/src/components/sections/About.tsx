'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { HiMapPin, HiEnvelope, HiPhone, HiLanguage, HiShieldCheck } from 'react-icons/hi2';
import { siteConfig } from '@/lib/config';
import { getData } from '@/lib/data';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease, delay },
  },
});

export default function About() {
  const t = useTranslations('About');
  const locale = useLocale() as 'en' | 'ar';
  const aboutData = getData('about', locale);
  const dir = locale === 'ar' ? -1 : 1;

  const fadeInRight = (delay = 0) => ({
    hidden: { opacity: 0, x: 40 * dir, filter: 'blur(8px)' },
    show: {
      opacity: 1, x: 0, filter: 'blur(0px)',
      transition: { duration: 0.9, ease, delay },
    },
  });
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();

  const infoItems = [
    { icon: HiMapPin,   label: t('infoLabelLocation'), value: aboutData.location },
    { icon: HiEnvelope, label: t('infoLabelEmail'),    value: aboutData.email },
    { icon: HiPhone,    label: t('infoLabelPhone'),    value: aboutData.phone },
  ];

  return (
    <section ref={ref} id="about" className="relative px-4 pt-20 pb-24 md:px-8 md:pt-24 md:pb-28 lg:px-16 xl:px-24 overflow-hidden">

      {/* Section number watermark */}
      <div
        className="absolute top-0 end-0 opacity-[0.022] pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-bold text-primary"
          style={{ fontSize: 'clamp(9rem, 26vw, 22rem)', letterSpacing: '-0.05em', lineHeight: 1 }}
        >
          02
        </span>
      </div>

      {/* Blueprint dot grid */}
      <div
        className="absolute inset-0 opacity-[0.055] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, oklch(0.73 0.12 85 / 60%) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Diagonal accent streak */}
      <div
        className="absolute top-0 start-1/3 w-px h-full pointer-events-none opacity-[0.06]"
        style={{
          background: 'linear-gradient(to bottom, transparent, oklch(0.73 0.12 85), transparent)',
          transform: 'skewX(-18deg)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">

        {/* ── Section header ── */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="flex items-center gap-5 mb-16 md:mb-20"
        >
          <span className="text-[9px] tracking-[0.5em] uppercase text-primary/55 shrink-0">02</span>
          <div className="w-8 h-px bg-primary/35 shrink-0" />
          <h2 className="text-[11px] tracking-[0.45em] uppercase text-muted-foreground shrink-0">
            {t('sectionLabel')}
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
        </motion.div>

        {/* ── Main two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-14 xl:gap-24 items-start">

          {/* ─── Left: Bio + Stats ─── */}
          <div className="relative order-2 lg:order-1">

            {/* Vertical gold timeline line */}
            <div className="absolute start-0 top-0 bottom-0 w-px overflow-hidden">
              <motion.div
                className="w-full"
                style={{
                  background: 'linear-gradient(to bottom, oklch(0.73 0.12 85 / 70%), oklch(0.73 0.12 85 / 25%), transparent)',
                }}
                initial={{ height: '0%', opacity: 0 }}
                animate={inView ? { height: '100%', opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.35, ease }}
              />
            </div>

            <div className="ps-8 sm:ps-10">

              {/* Display headline */}
              <motion.div
                variants={fadeUp(0.1)}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
              >
                <h2
                  className="text-gold-gradient font-bold leading-[0.88] tracking-[-0.03em] mb-10"
                  style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}
                >
                  {t('title')}
                </h2>
              </motion.div>

              {/* Bio paragraphs */}
              {aboutData.bio.map((para: string, i: number) => (
                <motion.div
                  key={i}
                  variants={fadeUp(0.15 + i * 0.1)}
                  initial="hidden"
                  animate={inView ? 'show' : 'hidden'}
                  className="relative mb-7 last:mb-0"
                >
                  {/* Diamond marker on timeline */}
                  <div
                    className="absolute -start-[2.4rem] sm:-start-[2.6rem] top-[0.55rem] w-2 h-2 rotate-45 bg-background border border-primary/50"
                  />

                  <p
                    className="text-foreground/88 leading-[1.85]"
                    style={{ fontSize: 'clamp(0.875rem, 1.4vw, 0.975rem)' }}
                  >
                    {para}
                  </p>
                </motion.div>
              ))}

              {/* Gold ornamental divider */}
              <motion.div
                variants={fadeUp(0.52)}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
                className="flex items-center gap-3 my-10"
              >
                <div className="w-5 h-px bg-primary/35" />
                <div className="w-1.5 h-1.5 rotate-45 bg-primary/45" />
                <div className="w-1.5 h-1.5 rotate-45 border border-primary/30" />
                <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={fadeUp(0.56)}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
                className="grid grid-cols-3 gap-4 sm:gap-8"
              >
                {siteConfig.stats.map(({ value, labelKey }, i) => (
                  <motion.div
                    key={labelKey}
                    className="relative group"
                    whileHover={reduced ? {} : { y: -2 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Hover glow */}
                    <div className="absolute -inset-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'radial-gradient(ellipse, oklch(0.73 0.12 85 / 7%) 0%, transparent 70%)' }}
                    />
                    <span
                      className="text-gold-gradient font-bold block leading-none tabular-nums relative"
                      style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)' }}
                    >
                      {value}
                    </span>
                    <span className="text-[7.5px] tracking-[0.38em] uppercase text-muted-foreground/70 mt-2 block relative">
                      {t(labelKey as Parameters<typeof t>[0])}
                    </span>
                    {i < siteConfig.stats.length - 1 && (
                      <div className="absolute top-1 -end-2 sm:-end-4 w-px h-10 bg-primary/15" />
                    )}
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </div>

          {/* ─── Right: Photo + Info card ─── */}
          <motion.div
            variants={fadeInRight(0.2)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="flex flex-col gap-6 order-1 lg:order-2"
          >

            {/* Photo frame */}
            <div className="relative">
              {/* Top-start corner accent */}
              <div className="absolute -top-3 -start-3 w-10 h-10 pointer-events-none">
                <div className="absolute top-0 start-0 w-full h-px bg-primary/50" />
                <div className="absolute top-0 start-0 h-full w-px bg-primary/50" />
              </div>
              {/* Bottom-end corner accent */}
              <div className="absolute -bottom-3 -end-3 w-10 h-10 pointer-events-none">
                <div className="absolute bottom-0 end-0 w-full h-px bg-primary/50" />
                <div className="absolute bottom-0 end-0 h-full w-px bg-primary/50" />
              </div>

              <div
                className="relative overflow-hidden rounded-2xl w-full"
                style={{
                  aspectRatio: '4/5',
                  maxHeight: '420px',
                  boxShadow: [
                    '0 0 0 1px oklch(0.73 0.12 85 / 18%)',
                    '0 24px 60px oklch(0 0 0 / 55%)',
                    '0 0 60px oklch(0.73 0.12 85 / 7%)',
                  ].join(', '),
                }}
              >
                <Image
                  src="/images/MHA.png"
                  alt="Muhammad Hamza Aftab"
                  fill
                  sizes="(max-width: 1024px) 90vw, 380px"
                  className="object-cover object-top"
                />

                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 inset-x-0 h-2/5"
                  style={{ background: 'linear-gradient(to top, oklch(0.058 0.006 285 / 90%), transparent)' }}
                />

                {/* Name / role overlay */}
                <div className="absolute bottom-5 inset-x-5">
                  <p className="text-[7.5px] tracking-[0.5em] uppercase text-primary mb-1">
                    {siteConfig.role}
                  </p>
                  <p className="font-semibold text-foreground" style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }}>
                    {siteConfig.fullName}
                  </p>
                </div>

                {/* Availability badge top-end */}
                <div className="absolute top-4 end-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/25 bg-background/80 backdrop-blur-sm">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  <span className="text-[7.5px] tracking-[0.32em] uppercase text-primary">{t('available')}</span>
                </div>
              </div>
            </div>

            {/* Glass contact info card */}
            <div
              className="glass rounded-2xl p-6"
              style={{ boxShadow: '0 0 40px oklch(0.73 0.12 85 / 5%), 0 16px 40px oklch(0 0 0 / 30%)' }}
            >
              <p className="text-[7.5px] tracking-[0.5em] uppercase text-primary/60 mb-5">
                {t('contactLabel')}
              </p>

              <div className="flex flex-col gap-3.5">
                {infoItems.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3.5 group cursor-default">
                    <div className="w-8 h-8 rounded-full border border-primary/18 flex items-center justify-center shrink-0 group-hover:border-primary/45 group-hover:bg-primary/[0.08] transition-all duration-300">
                      <Icon size={12} className="text-primary/50 group-hover:text-primary transition-all duration-300 group-hover:scale-110" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[7px] tracking-[0.32em] uppercase text-muted-foreground/75 mb-0.5">{label}</p>
                      <p className="text-[12px] text-foreground/92 truncate font-light tracking-wide">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Availability status */}
              <div className="mt-5 pt-5 border-t border-primary/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  <span className="text-[7.5px] tracking-[0.32em] uppercase text-primary/65">
                    {t('available')}
                  </span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/25 ring-4 ring-primary/8" />
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── Bottom row: Team Contributions · Languages ── */}
        <motion.div
          variants={fadeUp(0.65)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5 mt-14"
        >

          {/* Team Contributions */}
          <div
            className="glass rounded-2xl p-7 border border-primary/20 relative overflow-hidden"
            style={{ boxShadow: '0 0 40px oklch(0.73 0.12 85 / 5%), 0 16px 40px oklch(0 0 0 / 28%)' }}
          >
            {/* Gold top-edge accent */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'oklch(0.73 0.12 85 / 12%)', border: '1px solid oklch(0.73 0.12 85 / 28%)' }}
              >
                <HiShieldCheck size={15} className="text-primary" />
              </div>
              <p className="text-[8px] tracking-[0.45em] uppercase text-primary/80 font-medium">{t('supportsLabel')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {(aboutData.supports as string[]).map((item: string) => (
                <div key={item} className="flex items-start gap-3 group">
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-[1px]"
                    style={{ background: 'oklch(0.73 0.12 85 / 10%)', border: '1px solid oklch(0.73 0.12 85 / 20%)' }}
                  >
                    <div className="w-1.5 h-1.5 rotate-45 bg-primary/70 group-hover:bg-primary transition-colors duration-200" />
                  </div>
                  <span className="text-[12.5px] text-foreground/88 leading-[1.6]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div
            className="glass rounded-2xl p-7 border border-primary/20 relative overflow-hidden"
            style={{ boxShadow: '0 0 40px oklch(0.73 0.12 85 / 5%), 0 16px 40px oklch(0 0 0 / 28%)' }}
          >
            {/* Gold top-edge accent */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'oklch(0.73 0.12 85 / 12%)', border: '1px solid oklch(0.73 0.12 85 / 28%)' }}
              >
                <HiLanguage size={15} className="text-primary" />
              </div>
              <p className="text-[8px] tracking-[0.45em] uppercase text-primary/80 font-medium">{t('languagesLabel')}</p>
            </div>

            <div className="flex flex-col gap-4">
              {(aboutData.languages as { name: string; level: string }[]).map(({ name, level }, i) => (
                <div key={name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] text-foreground/95 font-semibold">{name}</span>
                    <span
                      className="text-[7.5px] tracking-[0.3em] uppercase px-3 py-1 rounded-full font-medium"
                      style={{
                        background: 'oklch(0.73 0.12 85 / 14%)',
                        border: '1px solid oklch(0.73 0.12 85 / 32%)',
                        color: 'oklch(0.73 0.12 85)',
                      }}
                    >
                      {level}
                    </span>
                  </div>
                  <div className="h-[3px] rounded-full bg-white/[0.10] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(to right, oklch(0.49 0.10 75 / 80%), oklch(0.73 0.12 85))' }}
                      initial={{ width: '0%' }}
                      animate={inView ? { width: i === 1 ? '100%' : '88%' } : { width: '0%' }}
                      transition={{ duration: 1.1, delay: 0.7 + i * 0.15, ease }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
