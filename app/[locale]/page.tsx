'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import BodyMap from '@/components/BodyMap';
import SymptomForm from '@/components/SymptomForm';
import Report from '@/components/Report';
import ReviewsSection from '@/components/ReviewsSection';
import AuthButton from '@/components/AuthButton';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

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
  es: SEO_ZONES_ES,
  en: SEO_ZONES_EN,
  zh: SEO_ZONES_ZH,
  ru: SEO_ZONES_RU,
};

export default function Home() {
  const t = useTranslations('home');
  const locale = useLocale();
  const { user } = useAuth();
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [report, setReport] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const seoZones = SEO_BY_LOCALE[locale] || SEO_ZONES_ES;

  const handleAnalyze = async (symptomData: Record<string, string>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zone: selectedZone, locale, ...symptomData }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      setReport(data);

      // Guardar consulta si el usuario está autenticado
      if (user && data.severity) {
        await supabase.from('user_queries').insert({
          user_id: user.id,
          zone: selectedZone,
          description: symptomData.description,
          severity: data.severity,
          action: data.action_recommendation?.primary || null,
          locale,
        });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => { setReport(null); setSelectedZone(null); setError(null); };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <nav className="flex items-center justify-between mb-8">
          <span className="font-bold text-slate-800 text-lg">Sympto+</span>
          <div className="flex items-center gap-3">
            <Link href={`/${locale}/sintomas`} className="text-sm text-slate-600 hover:text-blue-600 transition-colors hidden sm:block">
              Guías
            </Link>
            <Link href={`/${locale}/blog`} className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm">
              {t('see_guides').replace(' →', '')}
            </Link>
            <AuthButton />
          </div>
        </nav>

        {/* Hero mejorado */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            Orientación informativa · No es diagnóstico médico
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3 leading-tight">
            ¿Qué zona{' '}
            <span className="text-blue-600">te molesta</span>
            ?
          </h1>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </header>

        {/* Disclaimer mejorado */}
        <div className="flex items-center justify-center gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 mb-8 text-xs text-amber-700">
          <span>⚠️</span>
          <span>{t('disclaimer')} <strong>{t('emergency_number')}</strong></span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col items-center">
            <BodyMap onZoneSelect={(z: string) => { setSelectedZone(z); setReport(null); }} selectedZone={selectedZone} />
            {!selectedZone && <p className="text-slate-400 text-sm mt-4 animate-pulse">{t('tap_hint')}</p>}
          </div>

          <div>
            {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm mb-4">{error}</div>}
            {!report && selectedZone && <SymptomForm zone={selectedZone} onSubmit={handleAnalyze} loading={loading} />}
            {report && <Report data={report} onReset={handleReset} />}
            {!selectedZone && !report && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <h2 className="font-semibold text-slate-700 mb-4 text-sm uppercase tracking-wide">¿Cómo funciona?</h2>
                  <div className="space-y-4">
                    {[
                      { icon: '👆', step: t('step1'), color: 'bg-blue-50 text-blue-600' },
                      { icon: '✍️', step: t('step2'), color: 'bg-purple-50 text-purple-600' },
                      { icon: '⚡', step: t('step3'), color: 'bg-green-50 text-green-600' },
                    ].map(({ icon, step, color }, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-base shrink-0 ${color}`}>
                          {icon}
                        </div>
                        <p className="text-sm text-slate-600 pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <span>🔒</span> Anónimo
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <span>⚡</span> Instantáneo
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <span>🌍</span> 4 idiomas
                    </div>
                  </div>
                </div>
                {user && (
                  <Link
                    href={`/${locale}/perfil`}
                    className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-2xl p-4 hover:border-blue-200 transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white text-sm font-bold">
                        {(user.user_metadata?.name || user.email || 'U').slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">Mi historial</p>
                        <p className="text-xs text-slate-400">Ver consultas guardadas</p>
                      </div>
                    </div>
                    <span className="text-slate-300 group-hover:text-blue-400 transition-colors">→</span>
                  </Link>
                )}
                <div className="mt-2">
                  <Link href={`/${locale}/blog`} className="text-xs text-blue-500 hover:text-blue-700 transition-colors">
                    {t('see_guides')}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <section className="mt-16 border-t border-slate-200 pt-10">
          <h2 className="text-xl font-semibold text-slate-700 text-center mb-2">{t('seo_title')}</h2>
          <p className="text-sm text-slate-500 text-center mb-8">{t('seo_subtitle')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {seoZones.map((item) => (
              <div key={item.zona} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                <h3 className="font-medium text-slate-700 mb-1">{item.zona}</h3>
                <p className="text-xs text-slate-500">{item.ejemplos}</p>
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
    </main>
  );
}