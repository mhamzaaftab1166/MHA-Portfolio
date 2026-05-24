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
import { getData } from '@/lib/data';
import { siteConfig } from '@/lib/config';

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
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
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
  const navbarData = getData('navbar', locale as 'en' | 'ar');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 60));

  // Lock scroll when mobile menu is open — target <html> (body overflow breaks fixed on iOS)
  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [mobileOpen]);

  const oppositeLocale = locale === 'en' ? 'ar' : 'en';

  return (
    <>
      {/* ── Scroll progress bar ─────────────────────────────────── */}
      <motion.div
        style={{
          scaleX: progressScaleX,
          transformOrigin: 'left',
          background: 'linear-gradient(to right, oklch(0.49 0.10 75), oklch(0.73 0.12 85), oklch(0.83 0.11 90))',
          boxShadow: '0 0 8px oklch(0.73 0.12 85 / 55%), 0 0 18px oklch(0.73 0.12 85 / 25%)',
        }}
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
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
            {navbarData.navLinks.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="relative group text-[11px] tracking-[0.22em] uppercase text-muted-foreground/80 hover:text-foreground transition-colors duration-300"
              >
                {t(key as Parameters<typeof t>[0])}
                {/* Underline: center-out, gold */}
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-350 group-hover:w-full" />
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
              href={navbarData.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase px-4 py-1.5 rounded-full border border-primary/70 text-primary/90 hover:bg-primary hover:text-[oklch(0.058_0.006_285)] hover:border-primary transition-all duration-300 hover:shadow-[0_0_24px_oklch(0.73_0.12_85/35%)]"
            >
              <span>{t('downloadCV')}</span>
            </a>

          </div>
        </div>
      </motion.header>

      {/* ── Hamburger — sits above overlay so it's always tappable ── */}
      <div className="md:hidden fixed top-0 end-0 z-[61] h-[72px] flex items-center pe-6">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="flex flex-col justify-center gap-[5px] w-9 h-9 p-1"
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

      {/* ── Mobile full-screen overlay ───────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[58] overflow-y-auto bg-background"
            style={{ backgroundColor: 'oklch(0.058 0.006 285)' }}
          >
            {/* Decorative gold radial glow */}
            <div
              className="fixed inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 60% 40% at 80% 20%, oklch(0.73 0.12 85 / 6%) 0%, transparent 70%)',
              }}
            />

            {/* Scrollable inner — min-h-full keeps centering on tall screens, py-24 clears the navbar on short screens */}
            <div className="min-h-full flex flex-col items-center justify-center py-24 relative z-10">
            <motion.ul
              variants={listVariants}
              initial="closed"
              animate="open"
              className="flex flex-col items-center gap-5"
            >
              {navbarData.navLinks.map(({ key, href }) => (
                <motion.li key={key} variants={itemVariants}>
                  <a
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="group block text-[1.6rem] font-extralight tracking-[0.2em] uppercase text-foreground/85 hover:text-primary transition-all duration-250 relative"
                  >
                    {t(key as Parameters<typeof t>[0])}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-primary/70 to-transparent transition-all duration-350 group-hover:w-2/3" />
                  </a>
                </motion.li>
              ))}

              {/* Divider */}
              <motion.li variants={itemVariants} className="w-12 h-px bg-border my-1" />

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
                  href={navbarData.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="text-[11px] tracking-[0.3em] uppercase px-4 py-2 rounded-full border border-primary text-primary"
                >
                  {t('downloadCV')}
                </a>
              </motion.li>
            </motion.ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
