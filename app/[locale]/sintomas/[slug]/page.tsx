import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SYMPTOMS, getSymptom, getRelatedSymptoms } from '@/lib/symptoms-data';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const symptom = getSymptom(slug);
  if (!symptom) return {};
  const content = symptom.content[locale as keyof typeof symptom.content] || symptom.content.es;
  return {
    title: `${content.metaTitle} | Sympto+`,
    description: content.metaDescription,
    keywords: content.keywords,
    openGraph: {
      title: `${content.metaTitle} | Sympto+`,
      description: content.metaDescription,
      url: `https://getsympto.app/${locale}/sintomas/${slug}`,
      siteName: 'Sympto+',
      type: 'article',
    },
    alternates: {
      canonical: `https://getsympto.app/${locale}/sintomas/${slug}`,
      languages: {
        'es': `https://getsympto.app/es/sintomas/${slug}`,
        'en': `https://getsympto.app/en/sintomas/${slug}`,
        'zh': `https://getsympto.app/zh/sintomas/${slug}`,
        'ru': `https://getsympto.app/ru/sintomas/${slug}`,
        'x-default': `https://getsympto.app/es/sintomas/${slug}`,
      },
    },
  };
}

export function generateStaticParams() {
  const locales = ['es', 'en', 'zh', 'ru'];
  return locales.flatMap(locale =>
    SYMPTOMS.map(s => ({ locale, slug: s.slug }))
  );
}

const LABELS = {
  es: { causes: 'Causas frecuentes', redFlags: '⚠️ Señales de alarma', whenToAct: '¿Cuándo actuar?', related: 'Síntomas relacionados', cta_title: '¿Tienes este síntoma?', cta_desc: 'Usa nuestro orientador interactivo para obtener orientación personalizada.', cta_btn: 'Analizar mi síntoma →', back: '← Volver a guías', home: 'Inicio', disclaimer: 'Este artículo es informativo y educativo. No sustituye la valoración de un profesional médico.' },
  en: { causes: 'Common causes', redFlags: '⚠️ Warning signs', whenToAct: 'When to act?', related: 'Related symptoms', cta_title: 'Do you have this symptom?', cta_desc: 'Use our interactive guide to get personalised guidance.', cta_btn: 'Analyse my symptom →', back: '← Back to guides', home: 'Home', disclaimer: 'This article is informational and educational. It does not replace professional medical evaluation.' },
  zh: { causes: '常见原因', redFlags: '⚠️ 警告信号', whenToAct: '何时采取行动？', related: '相关症状', cta_title: '您有这个症状吗？', cta_desc: '使用我们的互动指南获取个性化指导。', cta_btn: '分析我的症状 →', back: '← 返回指南', home: '首页', disclaimer: '本文仅供参考和教育目的，不能替代专业医疗评估。' },
  ru: { causes: 'Частые причины', redFlags: '⚠️ Тревожные признаки', whenToAct: 'Когда действовать?', related: 'Связанные симптомы', cta_title: 'У вас есть этот симптом?', cta_desc: 'Используйте наш интерактивный ориентир для получения персонализированного руководства.', cta_btn: 'Анализировать симптом →', back: '← Назад к руководствам', home: 'Главная', disclaimer: 'Эта статья носит информационный и образовательный характер. Она не заменяет профессиональную медицинскую оценку.' },
};

export default async function SymptomPage({ params }: Props) {
  const { locale, slug } = await params;
  const symptom = getSymptom(slug);
  if (!symptom) notFound();

  const content = symptom.content[locale as keyof typeof symptom.content] || symptom.content.es;
  const labels = LABELS[locale as keyof typeof LABELS] || LABELS.es;
  const related = getRelatedSymptoms(slug);

  const getRelatedTitle = (s: typeof SYMPTOMS[0]) => {
    const c = s.content[locale as keyof typeof s.content] || s.content.es;
    return c.metaTitle.split(':')[0].trim();
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: content.metaTitle,
    description: content.metaDescription,
    url: `https://getsympto.app/${locale}/sintomas/${slug}`,
    inLanguage: locale,
    datePublished: '2026-05-07',
    dateModified: new Date().toISOString(),
    author: { '@type': 'Organization', name: 'Sympto+', url: 'https://getsympto.app' },
    publisher: { '@type': 'Organization', name: 'Sympto+', url: 'https://getsympto.app' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://getsympto.app/${locale}/sintomas/${slug}` },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: content.redFlags[0] ? `¿Cuándo es urgente el ${content.metaTitle.split(':')[0]}?` : '',
        acceptedAnswer: {
          '@type': 'Answer',
          text: content.whenToAct,
        },
      },
      ...content.causes.slice(0, 3).map(cause => ({
        '@type': 'Question',
        name: `¿Puede el ${content.metaTitle.split(':')[0].toLowerCase()} ser por ${cause.name.toLowerCase()}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: cause.description,
        },
      })),
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Sympto+', item: `https://getsympto.app/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Síntomas', item: `https://getsympto.app/${locale}/sintomas` },
      { '@type': 'ListItem', position: 3, name: content.metaTitle.split(':')[0], item: `https://getsympto.app/${locale}/sintomas/${slug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 py-12">

        <div className="flex items-center justify-between mb-6">
          <Link href={`/${locale}/sintomas`} className="text-blue-600 text-sm hover:underline">{labels.back}</Link>
          <Link href={`/${locale}`} className="text-sm text-slate-500 hover:text-blue-600">{labels.home}</Link>
        </div>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">{symptom.emoji}</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-3">{content.metaTitle}</h1>
          <p className="text-slate-500">{content.intro}</p>
        </header>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 space-y-8">

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-4">{labels.causes}</h2>
            <div className="space-y-4">
              {content.causes.map((cause, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0 mt-2" />
                  <div>
                    <p className="font-semibold text-slate-700 text-sm">{cause.name}</p>
                    <p className="text-sm text-slate-600">{cause.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-4">{labels.redFlags}</h2>
            <ul className="space-y-2">
              {content.redFlags.map((flag, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-red-400 shrink-0">•</span>
                  {flag}
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-blue-50 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-slate-800 mb-2">{labels.whenToAct}</h2>
            <p className="text-sm text-slate-600">{content.whenToAct}</p>
          </section>
        </div>

        {related.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">{labels.related}</h3>
            <div className="grid gap-3">
              {related.map(r => (
                <Link key={r.slug} href={`/${locale}/sintomas/${r.slug}`}
                  className="bg-white rounded-xl p-4 border border-slate-100 hover:border-blue-200 transition-all group flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span>{r.emoji}</span>
                    <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">{getRelatedTitle(r)}</span>
                  </div>
                  <span className="text-slate-300 group-hover:text-blue-400 transition-colors">→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6">
          <h3 className="font-semibold text-slate-800 mb-2">{labels.cta_title}</h3>
          <p className="text-sm text-slate-600 mb-4">{labels.cta_desc}</p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link href={`/${locale}`} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition inline-block">
              {labels.cta_btn}
            </Link>
            <Link href={`/${locale}/sintomas`} className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
              {labels.back.replace('←', '').trim()}
            </Link>
          </div>
        </div>

        <div className="mt-6 text-xs text-slate-400 text-center">{labels.disclaimer}</div>
      </div>
    </main>
  );
}