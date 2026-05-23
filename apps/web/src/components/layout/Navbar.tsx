'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import { Link, usePathname } from '@/i18n/navigation';
import { siteConfig } from '@/lib/config';

const NAV_KEYS = ['about', 'skills', 'experience', 'projects', 'contact'] as const;

const menuVariants = {
  closed: {
    clipPath: 'inset(0 0 100% 0)',
    transition: { duration: 0.45, ease: [0.32, 0, 0.67, 0] as [number, number, number, number] },
  },
  open: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.55, ease: [0.33, 1, 0.68, 1] as [number, number, number, number] },
  },
};

const listVariants = {
  closed: {},
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const itemVariants = {
  closed: { opacity: 0, y: 40, filter: 'blur(4px)' },
  open: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, stiffness: 280, damping: 24 },
  },
};

export default function Navbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 60));

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const oppositeLocale = locale === 'en' ? 'ar' : 'en';

  return (
    <>
      {/* ── Scroll progress bar ─────────────────────────────────── */}
      <motion.div
        style={{ scaleX: progressScaleX, transformOrigin: 'left' }}
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-primary origin-left"
      />

      {/* ── Main Navbar ─────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={[
          'fixed top-0 left-0 right-0 z-50 mt-[2px] transition-all duration-500',
          scrolled
            ? 'bg-[oklch(0.058_0.006_285/85%)] backdrop-blur-2xl border-b border-[--color-border] shadow-[0_8px_40px_oklch(0_0_0/50%)]'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between gap-6">

          {/* Logo */}
          <Link
            href="/"
            className="group flex flex-col gap-0.5 leading-none select-none shrink-0"
          >
            <span
              className="text-xl font-bold tracking-[0.28em] uppercase text-gold-gradient"
              style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif' }}
            >
              {siteConfig.initials}
            </span>
            <span className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground group-hover:text-primary transition-colors duration-300">
              Portfolio
            </span>
          </Link>

          {/* ── Desktop nav links ─── */}
          <nav className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
            {NAV_KEYS.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                className="relative group text-[11px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {t(key)}
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* ── Right actions ─── */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Language toggle */}
            <Link
              href={pathname}
              locale={oppositeLocale}
              className="hidden md:inline-flex items-center text-[10px] tracking-[0.25em] uppercase px-3.5 py-1.5 rounded-full border border-[--color-border] text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300"
            >
              {t('langToggle')}
            </Link>

            {/* Download CV */}
            <a
              href={siteConfig.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase px-4 py-1.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-[oklch(0.058_0.006_285)] transition-all duration-300 glow-gold"
            >
              <span>{t('downloadCV')}</span>
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 p-1 group"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6, backgroundColor: 'oklch(0.73 0.12 85)' } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block w-full h-px bg-foreground"
              />
              <motion.span
                animate={mobileOpen ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="block w-full h-px bg-foreground"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6, backgroundColor: 'oklch(0.73 0.12 85)' } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block w-full h-px bg-foreground"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile full-screen overlay ───────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[--color-background]"
          >
            {/* Decorative gold radial glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 60% 40% at 80% 20%, oklch(0.73 0.12 85 / 6%) 0%, transparent 70%)',
              }}
            />

            <motion.ul
              variants={listVariants}
              initial="closed"
              animate="open"
              className="flex flex-col items-center gap-7 relative z-10"
            >
              {NAV_KEYS.map((key) => (
                <motion.li key={key} variants={itemVariants}>
                  <a
                    href={`#${key}`}
                    onClick={() => setMobileOpen(false)}
                    className="block text-[2rem] font-light tracking-[0.22em] uppercase text-foreground hover:text-primary transition-colors duration-200"
                  >
                    {t(key)}
                  </a>
                </motion.li>
              ))}

              {/* Divider */}
              <motion.li variants={itemVariants} className="w-12 h-px bg-[--color-border] my-1" />

              {/* Lang + CV */}
              <motion.li variants={itemVariants} className="flex items-center gap-4">
                <Link
                  href={pathname}
                  locale={oppositeLocale}
                  onClick={() => setMobileOpen(false)}
                  className="text-[11px] tracking-[0.3em] uppercase px-4 py-2 rounded-full border border-[--color-border] text-muted-foreground hover:border-primary hover:text-primary transition-all"
                >
                  {t('langToggle')}
                </Link>
                <a
                  href={siteConfig.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="text-[11px] tracking-[0.3em] uppercase px-4 py-2 rounded-full border border-primary text-primary"
                >
                  {t('downloadCV')}
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
