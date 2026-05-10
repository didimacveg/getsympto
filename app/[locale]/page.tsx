'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import BodyMap from '@/components/BodyMap';
import SymptomForm from '@/components/SymptomForm';
import Report from '@/components/Report';
import ReviewsSection from '@/components/ReviewsSection';
import AuthButton from '@/components/AuthButton';
import PremiumUpgradeModal from '@/components/PremiumUpgradeModal';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { PREMIUM_ENABLED } from '@/lib/flags';

const SEO_ZONES_ES = [
  { zona: 'Cabeza', ejemplos: 'dolor de cabeza, migraña, presión en las sienes' },
  { zona: 'Pecho', ejemplos: 'dolor en el pecho, presión torácica, molestia al respirar' },
  { zona: 'Abdomen', ejemplos: 'dolor de estómago, hinchazón, molestias digestivas' },
  { zona: 'Espalda', ejemplos: 'dolor de espalda, lumbalgia, tensión muscular' },
  { zona: 'Rodilla', ejemplos: 'dolor de rodilla, inflamación, crujidos' },
  { zona: 'Hombro', ejemplos: 'dolor de hombro, rigidez, dificultad al mover el brazo' },
];
const SEO_ZONES_EN = [
  { zona: 'Head', ejemplos: 'headache, migraine, temple pressure' },
  { zona: 'Chest', ejemplos: 'chest pain, thoracic pressure, discomfort when breathing' },
  { zona: 'Abdomen', ejemplos: 'stomach pain, bloating, digestive discomfort' },
  { zona: 'Back', ejemplos: 'back pain, lower back pain, muscle tension' },
  { zona: 'Knee', ejemplos: 'knee pain, inflammation, cracking sounds' },
  { zona: 'Shoulder', ejemplos: 'shoulder pain, stiffness, difficulty moving arm' },
];
const SEO_ZONES_ZH = [
  { zona: '头部', ejemplos: '头痛、偏头痛、太阳穴压力' },
  { zona: '胸部', ejemplos: '胸痛、胸部压力、呼吸不适' },
  { zona: '腹部', ejemplos: '胃痛、腹胀、消化不适' },
  { zona: '背部', ejemplos: '背痛、腰痛、肌肉紧张' },
  { zona: '膝部', ejemplos: '膝盖痛、炎症、关节响声' },
  { zona: '肩部', ejemplos: '肩痛、僵硬、手臂活动困难' },
];
const SEO_ZONES_RU = [
  { zona: 'Голова', ejemplos: 'головная боль, мигрень, давление в висках' },
  { zona: 'Грудь', ejemplos: 'боль в груди, давление, дискомфорт при дыхании' },
  { zona: 'Живот', ejemplos: 'боль в животе, вздутие, дискомфорт при пищеварении' },
  { zona: 'Спина', ejemplos: 'боль в спине, поясничная боль, мышечное напряжение' },
  { zona: 'Колено', ejemplos: 'боль в колене, воспаление, хруст' },
  { zona: 'Плечо', ejemplos: 'боль в плече, скованность, трудности с движением руки' },
];
const SEO_BY_LOCALE: Record<string, typeof SEO_ZONES_ES> = {
  es: SEO_ZONES_ES, en: SEO_ZONES_EN, zh: SEO_ZONES_ZH, ru: SEO_ZONES_RU,
};

export default function Home() {
  const t = useTranslations('home');
  const locale = useLocale();
  const { user } = useAuth();

  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [report, setReport] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [profileAvatarUrl, setProfileAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      supabase.from('profiles').select('avatar_url').eq('id', user.id).single()
        .then(({ data }) => { if (data?.avatar_url) setProfileAvatarUrl(data.avatar_url); });
    }
  }, [user]);

  const seoZones = SEO_BY_LOCALE[locale] || SEO_ZONES_ES;
  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'U';
  const userInitials = userName.slice(0, 2).toUpperCase();

  const handleAnalyze = async (symptomData: Record<string, string>) => {
    if (selectedZones.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ zones: selectedZones, locale, ...symptomData }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.upgrade_required) {
          // ✅ Muestra modal en vez de error en línea
          setShowUpgradeModal(true);
        } else {
          setError(data.error || 'Error');
        }
        return;
      }
      setReport(data);
      if (user && data.severity) {
        const { error: insertError } = await supabase.from('user_queries').insert({
          user_id: user.id,
          zone: selectedZones[0],
          description: symptomData.description,
          severity: data.severity,
          action: data.action_recommendation?.primary || null,
          locale,
          report_data: data,
        });
        if (insertError) console.error('Error guardando informe:', insertError.message);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setReport(null);
    setSelectedZones([]);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Navbar */}
        <nav className="flex items-center justify-between mb-10 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">S+</span>
            </div>
            <span className="font-bold text-slate-800 text-base">Sympto+</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/${locale}/reviews`}
              className="text-sm text-slate-500 hover:text-blue-600 transition-colors hidden sm:block px-3 py-1.5"
            >
              {locale === 'zh' ? '评价' : locale === 'ru' ? 'Отзывы' : locale === 'en' ? 'Reviews' : 'Reseñas'}
            </Link>
            <Link
              href={`/${locale}/sintomas`}
              className="text-sm text-slate-500 hover:text-blue-600 transition-colors hidden sm:block px-3 py-1.5"
            >
              {locale === 'zh' ? '指南' : locale === 'ru' ? 'Руководства' : locale === 'en' ? 'Guides' : 'Guías'}
            </Link>
            <Link
              href={`/${locale}/blog`}
              className="text-sm text-slate-500 hover:text-blue-600 transition-colors hidden sm:block px-3 py-1.5"
            >
              Blog
            </Link>
            {/* ✅ Siempre visible cuando premium está activo, sin importar si hay usuario */}
            {PREMIUM_ENABLED && (
              <Link
                href={`/${locale}/premium`}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors hidden sm:block px-3 py-1.5"
              >
                {locale === 'zh' ? '升级' : locale === 'ru' ? 'Premium' : locale === 'en' ? 'Upgrade' : 'Premium'}
              </Link>
            )}
            <AuthButton />
          </div>
        </nav>

        {/* Hero */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-medium mb-5">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            {t('badge_text')}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 leading-tight tracking-tight">
            {t('title').split(' ').map((word, i, arr) =>
              i === arr.length - 1
                ? <span key={i} className="text-blue-600"> {word}</span>
                : <span key={i}>{word} </span>
            )}
          </h1>
          <p className="text-slate-500 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </header>

        {/* Disclaimer */}
        <div className="flex items-center justify-center gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 mb-8 text-xs text-amber-700 max-w-2xl mx-auto">
          <span className="shrink-0">⚠️</span>
          <span>{t('disclaimer')} <strong>{t('emergency_number')}</strong></span>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Body map */}
          <div className="flex flex-col items-center bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <BodyMap
              onZonesChange={(zones: string[]) => {
                setSelectedZones(zones);
                setReport(null);
                setError(null);
              }}
              selectedZones={selectedZones as string[]}
            />
          </div>

          {/* Panel derecho */}
          <div className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-600 text-sm">
                {error}
              </div>
            )}

            {!report && selectedZones.length > 0 && (
              <SymptomForm
                zone={selectedZones[0]}
                onSubmit={handleAnalyze}
                loading={loading}
              />
            )}

            {report && (
              <Report data={report} onReset={handleReset} />
            )}

            {selectedZones.length === 0 && !report && (
              <>
                {/* Cómo funciona */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                  <h2 className="font-semibold text-slate-800 mb-5 flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xs font-bold">?</span>
                    {t('how_title_upper')}
                  </h2>
                  <div className="space-y-3">
                    {[
                      { icon: '👆', step: t('step1'), bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100' },
                      { icon: '✍️', step: t('step2'), bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-100' },
                      { icon: '⚡', step: t('step3'), bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
                    ].map(({ icon, step, bg, text, border }, i) => (
                      <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${bg} ${border}`}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 bg-white shadow-sm">
                          {icon}
                        </div>
                        <p className={`text-sm font-medium ${text} pt-1`}>{step}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-4 flex-wrap">
                    {[
                      { icon: '🔒', label: t('feature_anonymous') },
                      { icon: '⚡', label: t('feature_instant') },
                      { icon: '🌍', label: t('feature_languages') },
                    ].map(({ icon, label }) => (
                      <div key={label} className="flex items-center gap-1 text-xs text-slate-400">
                        <span>{icon}</span>
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Historial para usuarios logueados */}
                {user && (
                  <Link
                    href={`/${locale}/perfil`}
                    className="flex items-center justify-between bg-linear-to-r from-blue-50 to-blue-100/50 border border-blue-200 rounded-2xl p-4 hover:border-blue-300 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      {profileAvatarUrl ? (
                        <img
                          src={profileAvatarUrl}
                          alt="Avatar"
                          className="w-10 h-10 rounded-xl object-cover shadow-sm"
                          onError={() => setProfileAvatarUrl(null)}
                        />
                      ) : (
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-sm">
                          {userInitials}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-blue-800">{t('my_history')}</p>
                        <p className="text-xs text-blue-600">{t('view_saved_queries')}</p>
                      </div>
                    </div>
                    <span className="text-blue-300 group-hover:text-blue-500 transition-colors text-lg">→</span>
                  </Link>
                )}

                <div className="text-center">
                  <Link href={`/${locale}/blog`} className="text-xs text-slate-400 hover:text-blue-600 transition-colors">
                    {t('see_guides')}
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {/* SEO zones */}
        <section className="mt-16 border-t border-slate-200 pt-10">
          <h2 className="text-xl font-bold text-slate-800 text-center mb-2">{t('seo_title')}</h2>
          <p className="text-sm text-slate-500 text-center mb-8">{t('seo_subtitle')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {seoZones.map((item) => (
              <div
                key={item.zona}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:border-blue-100 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-slate-700 mb-1 text-sm">{item.zona}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.ejemplos}</p>
              </div>
            ))}
          </div>
        </section>

        <ReviewsSection />

        <footer className="mt-12 text-center text-xs text-slate-400 pb-6">
          <p>{t('footer_copy')}</p>
          <p className="mt-1">{t('footer_disclaimer')}</p>
        </footer>
      </div>

      {/* ✅ Modal de upgrade cuando se llega al límite */}
      {showUpgradeModal && (
        <PremiumUpgradeModal onClose={() => setShowUpgradeModal(false)} />
      )}
    </main>
  );
}