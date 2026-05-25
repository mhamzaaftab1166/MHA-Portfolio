'use client';

import { useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { HiMapPin, HiEnvelope, HiExclamationCircle } from 'react-icons/hi2';
import { siIconMap } from '@/lib/icons';
import { getData } from '@/lib/data';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease, delay } },
});

interface SocialLink {
  platform: string;
  label: string;
  url: string;
  icon: string;
}

export default function Contact() {
  const t = useTranslations('Contact');
  const locale = useLocale() as 'en' | 'ar';
  const contactData = getData('contact', locale);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  function validate(values: typeof form) {
    const errors: Partial<typeof form> = {};
    if (!values.name.trim())
      errors.name = t('errorNameRequired');
    else if (values.name.trim().length < 2)
      errors.name = t('errorNameMin');
    if (!values.email.trim())
      errors.email = t('errorEmailRequired');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      errors.email = t('errorEmailInvalid');
    if (!values.message.trim())
      errors.message = t('errorMessageRequired');
    else if (values.message.trim().length < 10)
      errors.message = t('errorMessageMin');
    return errors;
  }

  const errors = validate(form);
  const isValid = Object.keys(errors).length === 0;

  function touch(field: keyof typeof touched) {
    setTouched(s => ({ ...s, [field]: true }));
  }

  function inputClass(field: keyof typeof form) {
    const hasError = touched[field] && errors[field];
    return [
      'w-full px-4 py-3 rounded-xl text-[13px] text-foreground/90 bg-white/[0.04] border outline-none transition-all duration-300 placeholder:text-muted-foreground/38 font-light tracking-wide',
      hasError
        ? 'border-red-500/60 focus:border-red-500/80 focus:shadow-[0_0_0_3px_oklch(0.628_0.258_29/10%)] bg-red-500/[0.03]'
        : 'border-white/[0.16] focus:border-primary/55 focus:bg-primary/[0.05] focus:shadow-[0_0_0_3px_oklch(0.73_0.12_85/10%)]',
    ].join(' ');
  }

  async function handleSubmit() {
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: contactData.web3formsKey,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio Contact from ${form.name}`,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        setTouched({ name: false, email: false, message: false });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  }

  return (
    <section ref={ref} id="contact" className="relative px-4 pt-20 pb-28 md:px-8 md:pt-24 md:pb-32 lg:px-16 xl:px-24 overflow-hidden">

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

      {/* Gold bloom bottom-center */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full pointer-events-none opacity-[0.18]" style={{
        width: 'min(80vw, 700px)',
        height: 'min(80vw, 700px)',
        background: 'radial-gradient(circle, oklch(0.73 0.12 85 / 22%) 0%, transparent 65%)',
        filter: 'blur(40px)',
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="flex items-center gap-5 mb-12"
        >
          <span className="text-[9px] tracking-[0.5em] uppercase text-primary/72 shrink-0">05</span>
          <div className="w-8 h-px bg-primary/35 shrink-0" />
          <h2 className="text-[11px] tracking-[0.45em] uppercase text-muted-foreground shrink-0">
            {t('sectionLabel')}
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
        </motion.div>

        {/* Title + subtitle */}
        <motion.h2
          variants={fadeUp(0.08)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="text-gold-gradient font-bold leading-[0.88] tracking-[-0.03em] mb-4"
          style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}
        >
          {t('title')}
        </motion.h2>

        <motion.p
          variants={fadeUp(0.14)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="text-muted-foreground mb-14 max-w-md leading-relaxed"
          style={{ fontSize: 'clamp(0.875rem, 1.4vw, 1rem)' }}
        >
          {t('subtitle')}
        </motion.p>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-8 xl:gap-14 items-start">

          {/* ── Left: info panel ── */}
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="flex flex-col gap-4"
          >

            {/* Availability card */}
            <div
              className="glass rounded-2xl p-5"
              style={{ boxShadow: '0 0 30px oklch(0 0 0 / 25%)' }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-[9px] tracking-[0.38em] uppercase text-emerald-400/90 font-medium">
                  {t('available')}
                </span>
              </div>
              <p className="text-[11.5px] text-muted-foreground/82 ps-5 leading-relaxed">
                {contactData.responseTime}
              </p>
            </div>

            {/* Contact details */}
            <div
              className="glass rounded-2xl p-5 flex flex-col gap-4"
              style={{ boxShadow: '0 0 30px oklch(0 0 0 / 25%)' }}
            >
              <div className="flex items-center gap-3.5 group cursor-default">
                <div className="w-8 h-8 rounded-full border border-primary/32 flex items-center justify-center shrink-0 group-hover:border-primary/55 group-hover:bg-primary/[0.09] transition-all duration-300">
                  <HiMapPin size={12} className="text-primary/72 group-hover:text-primary transition-all duration-300 group-hover:scale-110" />
                </div>
                <span className="text-[12.5px] text-foreground/88 font-light tracking-wide">{contactData.location}</span>
              </div>

              <div className="flex items-center gap-3.5 group">
                <div className="w-8 h-8 rounded-full border border-primary/32 flex items-center justify-center shrink-0 group-hover:border-primary/55 group-hover:bg-primary/[0.09] transition-all duration-300">
                  <HiEnvelope size={12} className="text-primary/72 group-hover:text-primary transition-all duration-300 group-hover:scale-110" />
                </div>
                <a
                  href={`mailto:${contactData.email}`}
                  className="text-[12.5px] text-foreground/88 font-light tracking-wide hover:text-primary transition-colors duration-300 truncate"
                >
                  {contactData.email}
                </a>
              </div>
            </div>

            {/* WhatsApp button */}
            <a
              href={`https://wa.me/${contactData.whatsappNumber.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-3 py-3.5 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(37,211,102,0.15)]"
              style={{
                background: 'rgba(37, 211, 102, 0.07)',
                border: '1px solid rgba(37, 211, 102, 0.20)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366] shrink-0" />
              <span className="text-[9px] tracking-[0.38em] uppercase text-[#25D366]/90 font-medium group-hover:text-[#25D366] transition-colors duration-300">
                {t('whatsapp')}
              </span>
              <span className="absolute inset-0 rounded-2xl bg-[#25D366]/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>

            {/* Social links */}
            <div className="flex flex-wrap gap-2">
              {(contactData.socialLinks as SocialLink[]).map(link => {
                const Icon = siIconMap[link.icon];
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/[0.20] text-muted-foreground hover:border-primary/45 hover:text-primary hover:bg-primary/[0.07] hover:shadow-[0_0_14px_oklch(0.73_0.12_85/12%)] transition-all duration-300"
                  >
                    {Icon && <Icon size={12} />}
                    <span className="text-[8.5px] tracking-[0.28em] uppercase">{link.label}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* ── Right: Contact form ── */}
          <motion.div
            variants={fadeUp(0.3)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <div
              className="glass rounded-2xl p-5 sm:p-7"
              style={{ boxShadow: '0 0 80px oklch(0.73 0.12 85 / 6%), 0 24px 60px oklch(0 0 0 / 38%)' }}
            >
              <div className="flex flex-col gap-5">

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[7.5px] tracking-[0.45em] uppercase text-muted-foreground/78">
                    {t('name')} <span className="text-red-400/70">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(s => ({ ...s, name: e.target.value }))}
                    onBlur={() => touch('name')}
                    className={inputClass('name')}
                    placeholder="Your full name"
                  />
                  {touched.name && errors.name && (
                    <span className="flex items-center gap-1.5 text-[10px] text-red-400/85 tracking-wide mt-0.5">
                      <HiExclamationCircle size={12} className="shrink-0" />
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[7.5px] tracking-[0.45em] uppercase text-muted-foreground/78">
                    {t('email')} <span className="text-red-400/70">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(s => ({ ...s, email: e.target.value }))}
                    onBlur={() => touch('email')}
                    className={inputClass('email')}
                    placeholder="hello@example.com"
                  />
                  {touched.email && errors.email && (
                    <span className="flex items-center gap-1.5 text-[10px] text-red-400/85 tracking-wide mt-0.5">
                      <HiExclamationCircle size={12} className="shrink-0" />
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[7.5px] tracking-[0.45em] uppercase text-muted-foreground/78">
                      {t('message')} <span className="text-red-400/70">*</span>
                    </label>
                    <span className={`text-[9px] tabular-nums transition-colors duration-200 ${form.message.length < 10 && form.message.length > 0 ? 'text-red-400/70' : 'text-muted-foreground/45'}`}>
                      {form.message.length}/10
                    </span>
                  </div>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(s => ({ ...s, message: e.target.value }))}
                    onBlur={() => touch('message')}
                    className={`${inputClass('message')} resize-none leading-relaxed`}
                    placeholder="Tell me about your project..."
                  />
                  {touched.message && errors.message && (
                    <span className="flex items-center gap-1.5 text-[10px] text-red-400/85 tracking-wide mt-0.5">
                      <HiExclamationCircle size={12} className="shrink-0" />
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Success message */}
                {status === 'success' && (
                  <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-400">
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                    </span>
                    <span className="text-[9px] tracking-[0.3em] uppercase">Message sent successfully!</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/[0.07] border border-red-500/18">
                    <span className="text-[9px] tracking-[0.28em] uppercase text-red-400/80">
                      Something went wrong. Please try again.
                    </span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={status === 'sending' || status === 'success'}
                  className="group relative w-full inline-flex items-center justify-center gap-2.5 text-[9.5px] tracking-[0.38em] uppercase px-8 py-4 rounded-xl font-bold overflow-hidden transition-all duration-300 mt-1 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-[0_0_40px_oklch(0.73_0.12_85/45%)]"
                  style={{
                    background: 'oklch(0.73 0.12 85)',
                    color: 'oklch(0.058 0.006 285)',
                    boxShadow: '0 0 30px oklch(0.73 0.12 85 / 32%), 0 0 70px oklch(0.73 0.12 85 / 12%), 0 4px 16px oklch(0 0 0 / 40%)',
                  }}
                >
                  <span className="relative z-10">
                    {status === 'sending' ? t('sending') : t('send')}
                  </span>
                  {status !== 'sending' && (
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/22 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  )}
                </button>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
