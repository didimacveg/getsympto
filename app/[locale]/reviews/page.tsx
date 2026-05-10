import { getTranslations } from 'next-intl/server';
import ReviewsSection from '@/components/ReviewsSection';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'reviews' });
  return {
    title: t('page_title'),
    description: t('page_description'),
  };
}

export default async function ResenasPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'reviews' });
  const locale = params.locale;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Navbar mínimo */}
        <nav className="flex items-center justify-between mb-10 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">S+</span>
            </div>
            <span className="font-bold text-slate-800 text-base">Sympto+</span>
          </Link>
          <Link
            href={`/${locale}`}
            className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
          >
            ← {t('back_home')}
          </Link>
        </nav>

        {/* Header */}
        <header className="text-center mb-4">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('page_title')}</h1>
          <p className="text-slate-500 text-sm">{t('page_description')}</p>
        </header>

        {/* Todas las reseñas */}
        <ReviewsSection showAll={true} />

        <footer className="mt-12 text-center text-xs text-slate-400 pb-6">
          <p>© 2025 Sympto+</p>
        </footer>
      </div>
    </main>
  );
}