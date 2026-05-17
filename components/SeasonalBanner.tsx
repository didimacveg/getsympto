'use client';
import Link from 'next/link';
import { useLocale } from 'next-intl';

function getSeason(): 'heat' | 'flu' | 'allergy' | 'virus' {
  const month = new Date().getMonth() + 1; // 1-12
  if (month >= 6 && month <= 8) return 'heat';
  if (month >= 9 && month <= 11) return 'flu';
  if (month >= 12 || month <= 2) return 'virus';
  return 'allergy'; // marzo-mayo
}

const BANNERS = {
  heat: {
    emoji: '🌡️',
    es: { text: 'Ola de calor activa — conoce los síntomas del golpe de calor', link: '/blog/golpe-de-calor', cta: 'Ver síntomas →' },
    en: { text: 'Heat wave active — know the symptoms of heat stroke', link: '/blog/golpe-de-calor', cta: 'See symptoms →' },
    zh: { text: '热浪来袭 — 了解中暑症状', link: '/blog/golpe-de-calor', cta: '查看症状 →' },
    ru: { text: 'Волна жары — симптомы теплового удара', link: '/blog/golpe-de-calor', cta: 'Симптомы →' },
    color: 'bg-orange-50 border-orange-200 text-orange-800',
    dot: 'bg-orange-500',
  },
  flu: {
    emoji: '🤧',
    es: { text: 'Temporada de gripe — analiza tus síntomas ahora', link: '/blog/gripe-2025', cta: 'Ver síntomas →' },
    en: { text: 'Flu season — analyse your symptoms now', link: '/blog/gripe-2025', cta: 'See symptoms →' },
    zh: { text: '流感季节 — 立即分析您的症状', link: '/blog/gripe-2025', cta: '查看症状 →' },
    ru: { text: 'Сезон гриппа — анализируйте симптомы', link: '/blog/gripe-2025', cta: 'Симптомы →' },
    color: 'bg-blue-50 border-blue-200 text-blue-800',
    dot: 'bg-blue-500',
  },
  allergy: {
    emoji: '🌸',
    es: { text: 'Pico de alergias primaverales — ¿tienes síntomas?', link: '/blog/alergia-sol', cta: 'Analizar →' },
    en: { text: 'Spring allergy peak — do you have symptoms?', link: '/blog/alergia-sol', cta: 'Analyse →' },
    zh: { text: '春季过敏高峰 — 您有症状吗？', link: '/blog/alergia-sol', cta: '分析 →' },
    ru: { text: 'Пик весенней аллергии — есть симптомы?', link: '/blog/alergia-sol', cta: 'Анализ →' },
    color: 'bg-pink-50 border-pink-200 text-pink-800',
    dot: 'bg-pink-500',
  },
  virus: {
    emoji: '🦠',
    es: { text: 'Alerta hantavirus — conoce los síntomas', link: '/blog/hantavirus', cta: 'Ver síntomas →' },
    en: { text: 'Hantavirus alert — know the symptoms', link: '/blog/hantavirus', cta: 'See symptoms →' },
    zh: { text: '汉坦病毒警报 — 了解症状', link: '/blog/hantavirus', cta: '查看症状 →' },
    ru: { text: 'Хантавирус — симптомы и профилактика', link: '/blog/hantavirus', cta: 'Симптомы →' },
    color: 'bg-red-50 border-red-200 text-red-800',
    dot: 'bg-red-500',
  },
};

export default function SeasonalBanner() {
  const locale = useLocale();
  const season = getSeason();
  const banner = BANNERS[season];
  const content = banner[locale as keyof typeof banner] as { text: string; link: string; cta: string };

  return (
    <Link
      href={`/${locale}${content.link}`}
      className={`flex items-center gap-3 border rounded-xl px-4 py-2.5 mb-6 text-sm hover:opacity-80 transition-opacity ${banner.color}`}
    >
      <span className="shrink-0">{banner.emoji}</span>
      <div className={`w-1.5 h-1.5 rounded-full shrink-0 animate-pulse ${banner.dot}`} />
      <span className="flex-1 font-medium">{content.text}</span>
      <span className="shrink-0 font-semibold">{content.cta}</span>
    </Link>
  );
}