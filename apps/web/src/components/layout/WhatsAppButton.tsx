'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FaWhatsapp } from 'react-icons/fa6';
import { siteConfig } from '@/lib/config';

export default function WhatsAppButton() {
  const t = useTranslations('Contact');
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="fixed bottom-6 end-6 z-50 flex items-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 20 }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: 8, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute end-full me-3 whitespace-nowrap text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full glass text-foreground pointer-events-none"
          >
            {t('whatsapp')}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-whatsapp-pulse opacity-60" />

      {/* Button */}
      <motion.a
        href={`https://wa.me/${siteConfig.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('whatsapp')}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-[0_4px_24px_rgba(37,211,102,0.35)] text-white"
      >
        <FaWhatsapp size={26} />
      </motion.a>
    </motion.div>
  );
}
