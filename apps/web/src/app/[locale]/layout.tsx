import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Cairo } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import '../globals.css';

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
});

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  const title = isAr
    ? 'محمد حمزة عفتاب — مهندس برمجيات وأخصائي ذكاء اصطناعي | دبي'
    : 'Muhammad Hamza Aftab — Full-Stack Engineer & AI Specialist | Dubai';

  const description = isAr
    ? 'أبني منتجات ويب وموبايل عالية الأداء، وأقود فرق الهندسة، وأطلق تطبيقات مدعومة بالذكاء الاصطناعي — React، Next.js، Vue، Node.js، Claude AI. مقيم في دبي.'
    : 'I craft high-performance web & mobile products, lead engineering teams, and ship AI-powered applications — React, Next.js, Vue, Node.js, Claude AI. Based in Dubai, UAE.';

  return {
    metadataBase: new URL('https://mha.dev'),
    title,
    description,
    keywords: isAr
      ? ['مهندس برمجيات', 'مطور ويب', 'React', 'Next.js', 'Vue.js', 'ذكاء اصطناعي', 'دبي', 'الإمارات']
      : ['Full-Stack Engineer', 'React', 'Next.js', 'React Native', 'Vue.js', 'Node.js', 'AI Developer', 'Claude AI', 'Dubai', 'UAE'],
    authors: [{ name: 'Muhammad Hamza Aftab', url: 'https://github.com/mhamzaaftab1166' }],
    creator: 'Muhammad Hamza Aftab',
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: 'website',
      title,
      description,
      siteName: 'MHA Portfolio',
      locale: isAr ? 'ar_AE' : 'en_US',
      alternateLocale: isAr ? 'en_US' : 'ar_AE',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@mhamzaaftab',
    },
    alternates: {
      languages: { en: '/en', ar: '/ar' },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${cairo.variable} dark`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
