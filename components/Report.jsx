'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import SymptomTracker from './SymptomTracker';

const SEVERITY_COLORS = {
  bajo: 'bg-green-100 text-green-700 border-green-200',
  medio: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  alto: 'bg-orange-100 text-orange-700 border-orange-200',
  urgente: 'bg-red-100 text-red-700 border-red-200',
};

const SEVERITY_ICONS = {
  bajo: '🟢',
  medio: '🟡',
  alto: '🟠',
  urgente: '🔴',
};

const SHARE_LABELS = {
  es: { share: '📤 Compartir informe', copied: '✓ Copiado' },
  en: { share: '📤 Share report', copied: '✓ Copied' },
  zh: { share: '📤 分享报告', copied: '✓ 已复制' },
  ru: { share: '📤 Поделиться', copied: '✓ Скопировано' },
};

export default function Report({ data, onReset }) {
  const t = useTranslations('report');
  const locale = useLocale();
  const [copied, setCopied] = useState(false);

  const SEVERITY_CONFIG = {
    bajo: { color: SEVERITY_COLORS.bajo, icon: SEVERITY_ICONS.bajo, label: t('severity_low') },
    medio: { color: SEVERITY_COLORS.medio, icon: SEVERITY_ICONS.medio, label: t('severity_medium') },
    alto: { color: SEVERITY_COLORS.alto, icon: SEVERITY_ICONS.alto, label: t('severity_high') },
    urgente: { color: SEVERITY_COLORS.urgente, icon: SEVERITY_ICONS.urgente, label: t('severity_urgent') },
  };

  const ACTION_LABELS = {
    observar: t('action_observe'),
    medico_general: t('action_doctor'),
    especialista: t('action_specialist'),
    urgencias: t('action_emergency'),
    emergencia_inmediata: t('action_call112'),
  };

  const severity = SEVERITY_CONFIG[data.severity] || SEVERITY_CONFIG.medio;
  const sl = SHARE_LABELS[locale] || SHARE_LABELS.es;

  const handleShare = () => {
    const action = ACTION_LABELS[data.action_recommendation?.primary] || data.action_recommendation?.primary || '';
    const texts = {
      es: `He analizado mis síntomas con Sympto+:\n\n• Nivel: ${severity.label}\n• ${data.severity_explanation || ''}\n• Recomendación: ${action}\n\nAnaliza los tuyos gratis 👉 https://getsympto.app`,
      en: `I analysed my symptoms with Sympto+:\n\n• Level: ${severity.label}\n• ${data.severity_explanation || ''}\n• Recommendation: ${action}\n\nAnalyse yours free 👉 https://getsympto.app`,
      zh: `我用Sympto+分析了症状：\n\n• 级别：${severity.label}\n• ${data.severity_explanation || ''}\n• 建议：${action}\n\n免费分析您的症状 👉 https://getsympto.app`,
      ru: `Я проанализировал симптомы с Sympto+:\n\n• Уровень: ${severity.label}\n• ${data.severity_explanation || ''}\n• Рекомендация: ${action}\n\nАнализируйте свои бесплатно 👉 https://getsympto.app`,
    };
    const text = texts[locale] || texts.es;

    if (navigator.share) {
      navigator.share({ title: 'Mi informe — Sympto+', text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className={`p-4 border-b ${severity.color}`}>
        <div className="flex items-center gap-2">
          <span className="text-xl">{severity.icon}</span>
          <div>
            <p className="font-bold text-sm">{severity.label}</p>
            <p className="text-xs opacity-80">{data.severity_explanation}</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        <div className="bg-slate-50 rounded-xl p-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            {t('recommendation').toUpperCase()}
          </h3>
          <p className="font-medium text-slate-800">
            {ACTION_LABELS[data.action_recommendation?.primary] || data.action_recommendation?.primary}
          </p>
          <p className="text-sm text-slate-600 mt-1">{data.action_recommendation?.explanation}</p>
          {data.action_recommendation?.timeframe && (
            <p className="text-xs text-slate-400 mt-2">⏱ {data.action_recommendation.timeframe}</p>
          )}
        </div>

        {data.possible_contexts?.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
              {t('contexts_title').toUpperCase()}
            </h3>
            <div className="space-y-2">
              {data.possible_contexts.map((ctx, i) => (
                <div key={i} className="border border-slate-100 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-slate-700">{ctx.context}</p>
                    <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                      {ctx.frequency === 'común' ? 'Frecuente' : ctx.frequency === 'menos_común' ? 'Menos frecuente' : 'Poco frecuente'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{ctx.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.red_flags?.length > 0 && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-2">
              {t('red_flags_title')}
            </h3>
            <ul className="space-y-1">
              {data.red_flags.map((flag, i) => (
                <li key={i} className="text-xs text-red-600 flex items-start gap-1.5">
                  <span className="mt-0.5">•</span> {flag}
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.general_info && (
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              {t('general_info_title').toUpperCase()}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">{data.general_info}</p>
          </div>
        )}

        <div className="border-t pt-4">
          <p className="text-xs text-slate-400 leading-relaxed">{t('disclaimer')}</p>
        </div>

        <button
          onClick={handleShare}
          className="w-full border border-blue-200 text-blue-600 hover:bg-blue-50 font-medium rounded-xl py-2.5 text-sm transition"
        >
          {copied ? sl.copied : sl.share}
        </button>

        <SymptomTracker
          severity={data.severity}
          zone={data.zone}
          description={data.severity_explanation}
        />

        <button
          onClick={onReset}
          className="w-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium rounded-xl py-2.5 text-sm transition"
        >
          {t('new_query')}
        </button>
      </div>
    </div>
  );
}