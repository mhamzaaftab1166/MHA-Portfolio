import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('Hero');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-primary">
        {t('greeting')} MHA
      </h1>
      <p className="mt-4 text-muted-foreground">{t('role')}</p>
    </main>
  );
}
