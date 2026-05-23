import { useTranslations } from 'next-intl';
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { HiEnvelope } from 'react-icons/hi2';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/lib/config';

const NAV_KEYS = ['about', 'skills', 'experience', 'projects', 'contact'] as const;

const socialLinks = [
  { href: siteConfig.social.github, icon: FaGithub, label: 'GitHub' },
  { href: siteConfig.social.linkedin, icon: FaLinkedinIn, label: 'LinkedIn' },
  { href: siteConfig.social.twitter, icon: FaXTwitter, label: 'Twitter' },
  { href: `mailto:${siteConfig.email}`, icon: HiEnvelope, label: 'Email' },
];

export default function Footer() {
  const t = useTranslations('Navbar');
  const tFooter = useTranslations('Footer');

  return (
    <footer className="relative mt-24 border-t border-[--color-border]">
      {/* Gold glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
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
            {NAV_KEYS.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {t(key)}
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-[--color-border] text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300 hover:shadow-[0_0_12px_oklch(0.73_0.12_85/25%)]"
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-[--color-border] flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[10px] tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.fullName}. {tFooter('rights')}
          </p>
          <p className="text-[10px] tracking-widest text-muted-foreground">
            Built with Next.js · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
