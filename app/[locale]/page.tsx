'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import BodyMap from '@/components/BodyMap';
import SymptomForm from '@/components/SymptomForm';
import Report from '@/components/Report';

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
          <Link href={`/${locale}/blog`} className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm">
            {t('see_guides').replace(' →', '')}
          </Link>
        </nav>

        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800">{t('title')}</h1>
          <p className="text-slate-500 mt-2 text-sm">
            {t('subtitle')}{' '}
            <span className="font-medium text-slate-600">{t('no_diagnosis')}</span>
          </p>
        </header>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-8 text-xs text-amber-700 text-center">
          {t('disclaimer')} <strong>{t('emergency_number')}</strong>.
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
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h2 className="font-semibold text-slate-700 mb-3">{t('how_title')}</h2>
                <div className="space-y-3">
                  {[t('step1'), t('step2'), t('step3')].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                      <p className="text-sm text-slate-600">{step}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-400">{t('anonymous')}</p>
                </div>
                <div className="mt-4">
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

        <footer className="mt-12 text-center text-xs text-slate-400 pb-6">
          <p>{t('footer_copy')}</p>
          <p className="mt-1">{t('footer_disclaimer')}</p>
        </footer>
      </div>
    </main>
  );
}