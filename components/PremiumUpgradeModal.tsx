'use client';
import { useLocale } from 'next-intl';
import Link from 'next/link';

const L = {
  es: {
    title: 'Has alcanzado tu límite diario',
    subtitle: 'Los usuarios gratuitos pueden hacer 3 análisis al día.',
    cta: 'Hazte Premium — €6.99/mes',
    features: [
      '10 análisis por día',
      'Descarga de informes en PDF',
      'Reanálisis con seguimiento',
      'Historial completo',
    ],
    close: 'Continuar con el plan gratuito',
    tomorrow: 'Tus análisis se renuevan mañana',
  },
  en: {
    title: 'You\'ve reached your daily limit',
    subtitle: 'Free users can run 3 analyses per day.',
    cta: 'Go Premium — €6.99/month',
    features: [
      '10 analyses per day',
      'PDF report download',
      'Follow-up reanalysis',
      'Full history',
    ],
    close: 'Continue with free plan',
    tomorrow: 'Your analyses reset tomorrow',
  },
  zh: {
    title: '您已达到每日限制',
    subtitle: '免费用户每天可以进行3次分析。',
    cta: '升级到高级版 — €6.99/月',
    features: [
      '每天10次分析',
      'PDF报告下载',
      '跟踪重新分析',
      '完整历史记录',
    ],
    close: '继续使用免费版',
    tomorrow: '您的分析将于明天重置',
  },
  ru: {
    title: 'Вы достигли дневного лимита',
    subtitle: 'Бесплатные пользователи могут делать 3 анализа в день.',
    cta: 'Перейти на Premium — €6.99/мес',
    features: [
      '10 анализов в день',
      'Скачивание PDF-отчётов',
      'Повторный анализ',
      'Полная история',
    ],
    close: 'Остаться на бесплатном плане',
    tomorrow: 'Ваши анализы обновятся завтра',
  },
};

export default function PremiumUpgradeModal({ onClose }: { onClose: () => void }) {
  const locale = useLocale();
  const l = L[locale as keyof typeof L] || L.es;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 z-10">

        {/* Icono */}
        <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
          ⚡
        </div>

        <h2 className="text-xl font-bold text-slate-900 text-center mb-1">
          {l.title}
        </h2>
        <p className="text-slate-500 text-sm text-center mb-5">
          {l.subtitle}
        </p>

        {/* Features */}
        <div className="bg-blue-50 rounded-2xl p-4 mb-5 space-y-2">
          {l.features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-blue-800">
              <span className="text-blue-500 font-bold shrink-0">✓</span>
              {f}
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={`/${locale}/premium`}
          className="block w-full bg-blue-600 text-white text-center font-bold py-3 rounded-2xl hover:bg-blue-700 transition text-sm mb-3"
          onClick={onClose}
        >
          {l.cta}
        </Link>

        {/* Close */}
        <button
          onClick={onClose}
          className="w-full text-xs text-slate-400 hover:text-slate-600 transition py-1"
        >
          {l.close}
        </button>

        <p className="text-center text-xs text-slate-300 mt-2">{l.tomorrow}</p>
      </div>
    </div>
  );
}