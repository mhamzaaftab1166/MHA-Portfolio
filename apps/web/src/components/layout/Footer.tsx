'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { siIconMap } from '@/lib/icons';
import { HiEnvelope } from 'react-icons/hi2';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/lib/config';
import { getData } from '@/lib/data';

export default function Footer() {
  const t        = useTranslations('Navbar');
  const tFooter  = useTranslations('Footer');
  const locale   = useLocale() as 'en' | 'ar';
  const navData  = getData('navbar', locale);
  const contactData = getData('contact', locale);

  return (
    <footer className="relative mt-24 border-t border-[--color-border]">
      {/* Gold glow line — premium center accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-primary/70 blur-[2px]" />

      <motion.div
        className="max-w-7xl mx-auto px-6 lg:px-10 py-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <Link href="/" className="text-lg font-bold tracking-[0.28em] uppercase text-gold-gradient">
              {siteConfig.initials}
            </Link>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              {siteConfig.location}
            </p>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6">
            {navData.navLinks.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {t(key as Parameters<typeof t>[0])}
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-2.5">
            {contactData.socialLinks.map(({ platform, label, url, icon }) => {
              const Icon = siIconMap[icon];
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-[--color-border] text-muted-foreground/60 hover:border-primary/60 hover:text-primary transition-all duration-300 hover:shadow-[0_0_14px_oklch(0.73_0.12_85/28%)] hover:-translate-y-0.5"
                >
                  {Icon ? <Icon size={13} /> : <span className="text-[10px]">{label[0]}</span>}
                </a>
              );
            })}

            {/* Email */}
            <a
              href={`mailto:${contactData.email}`}
              aria-label="Email"
              className="w-8 h-8 flex items-center justify-center rounded-full border border-[--color-border] text-muted-foreground/60 hover:border-primary/60 hover:text-primary transition-all duration-300 hover:shadow-[0_0_14px_oklch(0.73_0.12_85/28%)] hover:-translate-y-0.5"
            >
              <HiEnvelope size={13} />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-[--color-border]/60 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[10px] tracking-[0.18em] text-muted-foreground/55">
            &copy; {new Date().getFullYear()} {siteConfig.fullName}. {tFooter('rights')}
          </p>
          <p className="text-[10px] tracking-[0.18em] text-muted-foreground/40">
            Built with Next.js · Deployed on Vercel
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
