'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6';
import { HiArrowDownRight, HiArrowDownTray, HiEnvelope } from 'react-icons/hi2';
import { siteConfig } from '@/lib/config';
import { getData } from '@/lib/data';
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
const easeIn = [0.32, 0, 0.67, 0] as [number, number, number, number];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.85, ease } },
};

const roleAnim = {
  enter: { opacity: 0, y: 12, filter: 'blur(4px)' },
  center: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.42, ease } },
  exit: { opacity: 0, y: -12, filter: 'blur(4px)', transition: { duration: 0.26, ease: easeIn } },
};

function Particle({ x, delay, duration }: { x: string; delay: number; duration: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="absolute bottom-0 rounded-full bg-primary/25"
      style={{ left: x, width: 2, height: 2 }}
      animate={reduced ? {} : { y: [0, -220, -440], opacity: [0, 0.55, 0], scale: [0.5, 1.3, 0.5] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    />
  );
}

export default function Hero() {
  const t = useTranslations('Hero');
  const locale = useLocale() as 'en' | 'ar';
  const heroData = getData('hero', locale);
  const reduced = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  const roles = heroData.roles;

  useEffect(() => {
    const id = setInterval(() => setRoleIndex(i => (i + 1) % roles.length), 3400);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: 'max(7rem, calc(72px + 3.5rem))', paddingBottom: '3.5rem' }}
    >

      {/* ══ BACKGROUND ══════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">

        {/* Noise grain */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '160px 160px',
        }} />

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.13]" style={{
          backgroundImage: 'radial-gradient(circle, oklch(0.73 0.12 85 / 65%) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />

        {/* Right bloom — behind photo */}
        <motion.div className="absolute -top-1/4 -end-1/4 rounded-full"
          style={{ width: 'min(100vw,900px)', height: 'min(100vw,900px)', background: 'radial-gradient(circle, oklch(0.73 0.12 85 / 10%) 0%, transparent 60%)' }}
          animate={reduced ? {} : { scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Left-bottom bloom */}
        <motion.div className="absolute -bottom-1/3 -start-1/4 rounded-full"
          style={{ width: 'min(80vw,750px)', height: 'min(80vw,750px)', background: 'radial-gradient(circle, oklch(0.73 0.12 85 / 6%) 0%, transparent 60%)' }}
          animate={reduced ? {} : { scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        />

        {/* Faint MHA watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.022] overflow-hidden" aria-hidden="true">
          <span className="font-bold text-primary whitespace-nowrap select-none"
            style={{ fontSize: 'clamp(6rem, 22vw, 20rem)', letterSpacing: '-0.04em' }}>MHA</span>
        </div>

        {/* Corner bracket — top-start */}
        <motion.div className="absolute w-12 h-12 opacity-0"
          style={{ top: 'max(5.5rem, calc(72px + 1.5rem))', insetInlineStart: '1.5rem' }}
          animate={inView ? { opacity: 0.35 } : {}} transition={{ delay: 1.6, duration: 0.8 }}
        >
          <div className="absolute top-0 start-0 w-full h-px bg-primary" />
          <div className="absolute top-0 start-0 h-full w-px bg-primary" />
        </motion.div>

        {/* Corner bracket — bottom-end */}
        <motion.div className="absolute bottom-10 end-6 w-12 h-12 opacity-0"
          animate={inView ? { opacity: 0.35 } : {}} transition={{ delay: 1.8, duration: 0.8 }}
        >
          <div className="absolute bottom-0 end-0 w-full h-px bg-primary" />
          <div className="absolute bottom-0 end-0 h-full w-px bg-primary" />
        </motion.div>

        {/* Side label */}
        <motion.div className="hidden xl:flex absolute start-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 opacity-0"
          animate={inView ? { opacity: 0.22 } : {}} transition={{ delay: 2, duration: 1 }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary to-transparent" />
          <span className="text-[7px] tracking-[0.65em] uppercase text-primary"
            style={{ writingMode: 'vertical-rl' }}>Portfolio · 2026</span>
          <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>

        {/* Floating particles */}
        {!reduced && [
          { x: '10%', delay: 0, duration: 9 },
          { x: '32%', delay: 3, duration: 12 },
          { x: '54%', delay: 6, duration: 8 },
          { x: '73%', delay: 1.5, duration: 14 },
          { x: '90%', delay: 4, duration: 10 },
        ].map((p, i) => <Particle key={i} {...p} />)}
      </div>

      {/* ══ MAIN CONTENT ════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 xl:gap-20 items-center">

          {/* ─── Text column ─── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="flex flex-col items-center lg:items-start text-center lg:text-start gap-5 order-2 lg:order-1"
          >

            {/* Badge */}
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-primary/25 bg-primary/[0.07] backdrop-blur-sm text-[9px] tracking-[0.45em] uppercase">
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                <span className="text-primary">{t('available')}</span>
                <span className="w-px h-3 bg-primary/25 shrink-0" />
                <span className="text-muted-foreground">{siteConfig.location}</span>
              </div>
            </motion.div>

            {/* Greeting */}
            <motion.p variants={fadeUp}
              className="text-[10px] tracking-[0.6em] uppercase text-muted-foreground -mb-3">
              {t('greeting')}
            </motion.p>

            {/* Name */}
            <motion.div variants={fadeUp} className="flex flex-col items-center lg:items-start -mt-1">
              <span className="font-light tracking-[0.1em] text-foreground/50"
                style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.3rem)' }}>
                {siteConfig.displayName.prefix}
              </span>
              <h1
                className="text-gold-gradient font-bold leading-[0.88] tracking-[-0.025em]"
                style={{
                  fontFamily: 'var(--font-geist), system-ui, sans-serif',
                  fontSize: 'clamp(3.2rem, 9vw, 7.5rem)',
                }}
              >
                {siteConfig.displayName.main}
              </h1>
            </motion.div>

            {/* Role ticker — prominent gold title */}
            <motion.div variants={fadeUp}
              className="flex items-center gap-3 h-8 w-full max-w-full overflow-hidden justify-center lg:justify-start -mt-1">
              <div className="h-full w-0.5 bg-primary rounded-full shrink-0" />
              <div className="flex-1 min-w-0 overflow-hidden flex items-center gap-1">
                <div className="min-w-0 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={roleIndex}
                      variants={roleAnim}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="font-semibold text-foreground block truncate tracking-wide"
                      style={{ fontSize: 'clamp(0.8rem, 1.6vw, 1rem)' }}
                    >
                      {roles[roleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="animate-cursor-blink text-primary text-base leading-none shrink-0">|</span>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p variants={fadeUp}
              className="max-w-[37rem] leading-[1.85] text-foreground/75"
              style={{ fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)' }}>
              {t('tagline')}
            </motion.p>

            {/* Ornamental divider */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="w-14 h-px bg-gradient-to-r from-transparent to-primary/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary/50 ring-4 ring-primary/12" />
              <div className="w-14 h-px bg-gradient-to-l from-transparent to-primary/40" />
            </motion.div>

            {/* Tech pills */}
            <motion.div variants={fadeUp}
              className="flex flex-wrap gap-2 justify-center lg:justify-start max-w-[38rem]">
              {siteConfig.techStack.map((tech) => (
                <span key={tech}
                  className="text-[8.5px] tracking-[0.25em] uppercase px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-muted-foreground/80 hover:border-primary/50 hover:text-primary hover:bg-primary/[0.08] hover:shadow-[0_0_16px_oklch(0.73_0.12_85/15%)] hover:-translate-y-px transition-all duration-300 cursor-default inline-block">
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center lg:items-start gap-3">
              {/* Primary CTA */}
              <a href="#projects"
                className="group relative inline-flex items-center gap-2.5 text-[9.5px] tracking-[0.35em] uppercase px-8 py-4 rounded-full font-bold overflow-hidden transition-all duration-300"
                style={{
                  background: 'oklch(0.73 0.12 85)',
                  color: 'oklch(0.058 0.006 285)',
                  boxShadow: '0 0 30px oklch(0.73 0.12 85 / 32%), 0 0 60px oklch(0.73 0.12 85 / 12%)',
                }}>
                <span className="relative z-10">{t('cta_work')}</span>
                <HiArrowDownRight className="relative z-10 w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                {/* shine sweep */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              </a>

              {/* Ghost CTA */}
              <a href="#contact"
                className="inline-flex items-center gap-2 text-[9.5px] tracking-[0.35em] uppercase px-8 py-4 rounded-full border border-primary/30 text-foreground/80 hover:border-primary hover:text-primary hover:bg-primary/[0.07] transition-all duration-300">
                {t('cta_contact')}
              </a>

              {/* CV download */}
              <a href={siteConfig.cv} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.3em] uppercase px-4 py-4 rounded-full text-muted-foreground/70 hover:text-primary transition-colors duration-300">
                <HiArrowDownTray className="w-3.5 h-3.5" />
                CV
              </a>
            </motion.div>

            {/* Social links — uniform icon buttons */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 justify-center lg:justify-start">
              {[
                { href: siteConfig.social.github,                       Icon: FaGithub,    label: 'GitHub'    },
                { href: siteConfig.social.linkedin,                     Icon: FaLinkedinIn, label: 'LinkedIn'  },
                { href: `https://wa.me/${siteConfig.whatsapp}`,         Icon: FaWhatsapp,  label: 'WhatsApp'  },
                { href: `mailto:${siteConfig.email}`,                   Icon: HiEnvelope,  label: 'Email'     },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-muted-foreground hover:border-primary/55 hover:text-primary hover:shadow-[0_0_14px_oklch(0.73_0.12_85/20%)] transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── Photo column ─── */}
          <motion.div
            className="flex items-center justify-center order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.92, filter: 'blur(14px)' }}
            animate={inView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.1, delay: 0.3, ease }}
          >
            {/* Responsive sizing via CSS variables */}
            <div
              className="relative flex items-center justify-center"
              style={{ '--photo-size': '220px' } as React.CSSProperties}
            >
              {/* Outer dashed ring — responsive */}
              <motion.div
                className="absolute rounded-full border border-dashed border-primary/15"
                style={{ width: 'min(340px, 72vw)', height: 'min(340px, 72vw)' }}
                animate={reduced ? {} : { rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
              />

              {/* Counter-rotating arc — responsive */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 'min(294px, 62vw)', height: 'min(294px, 62vw)',
                  background: `conic-gradient(from 0deg, oklch(0.73 0.12 85 / 30%) 0deg, transparent 70deg, transparent 290deg, oklch(0.73 0.12 85 / 30%) 360deg)`,
                  borderRadius: '50%',
                  WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), white calc(100% - 1.5px))',
                  mask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), white calc(100% - 1.5px))',
                }}
                animate={reduced ? {} : { rotate: -360 }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              />

              {/* Glow pool — responsive */}
              <div className="absolute rounded-full"
                style={{
                  width: 'min(260px, 55vw)', height: 'min(260px, 55vw)',
                  background: 'radial-gradient(circle, oklch(0.73 0.12 85 / 22%) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                }}
              />

              {/* Photo — responsive, no scale hack */}
              <div className="relative overflow-hidden rounded-full"
                style={{
                  width: 'min(235px, 50vw)', height: 'min(235px, 50vw)',
                  boxShadow: [
                    '0 0 0 1.5px oklch(0.73 0.12 85 / 50%)',
                    '0 0 0 8px oklch(0.73 0.12 85 / 6%)',
                    '0 0 60px oklch(0.73 0.12 85 / 28%)',
                    '0 0 120px oklch(0.73 0.12 85 / 10%)',
                  ].join(', '),
                }}>
                <Image
                  src="/images/MHA.png"
                  alt="Muhammad Hamza Aftab"
                  fill
                  sizes="(max-width: 480px) 50vw, 235px"
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Compass dots — responsive offset */}
              {[0, 90, 180, 270].map((deg) => (
                <div key={deg}
                  className="absolute w-[7px] h-[7px] rounded-full bg-primary/55 ring-[3px] ring-primary/15"
                  style={{
                    top: '50%', left: '50%',
                    transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(min(-148px, -31.5vw))`,
                  }}
                />
              ))}

              {/* Status badge below photo */}
              <motion.div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-[oklch(0.07_0.006_285/95%)] backdrop-blur-sm whitespace-nowrap"
                style={{ boxShadow: '0 0 20px oklch(0.73 0.12 85 / 15%)' }}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.3, duration: 0.6 }}
              >
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                <span className="text-[8px] tracking-[0.38em] uppercase text-primary font-medium">
                  Available for work
                </span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ══ SCROLL INDICATOR ════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 2.2, duration: 0.9 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
      >
        <span className="text-[7px] tracking-[0.55em] uppercase text-muted-foreground/60">
          {t('scrollHint')}
        </span>
        <div
          className="w-[18px] h-[30px] rounded-full border border-primary/25 flex justify-center items-start pt-[7px]"
          style={{ boxShadow: '0 0 10px oklch(0.73 0.12 85 / 10%)' }}
        >
          <motion.div
            className="w-[3px] h-[7px] rounded-full bg-primary/70"
            animate={reduced ? {} : { y: [0, 10, 0], opacity: [1, 0.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
