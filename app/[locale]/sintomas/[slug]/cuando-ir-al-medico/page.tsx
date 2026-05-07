import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SYMPTOMS, getSymptom } from '@/lib/symptoms-data';

type Props = { params: Promise<{ locale: string; slug: string }> };

const LABELS = {
  es: {
    when_title: 'cuándo ir al médico',
    red_flags: '🚨 Señales de alarma — actúa inmediatamente',
    when_act: '¿Cuándo actuar?',
    back: '← Volver al síntoma',
    back_guides: '← Todas las guías',
    cta: 'Analizar mi síntoma →',
    faq_q1: '¿Cuándo es urgente ir al médico por',
    faq_q2: '¿Qué señales indican que',
    faq_q2b: 'necesita atención urgente?',
    disclaimer: 'Esta información es orientativa y educativa. No sustituye la valoración de un profesional médico. Ante cualquier duda, llama al 112.',
    emergency: '⚠️ En caso de emergencia llama al 112',
  },
  en: {
    when_title: 'when to see a doctor',
    red_flags: '🚨 Warning signs — act immediately',
    when_act: 'When to act?',
    back: '← Back to symptom',
    back_guides: '← All guides',
    cta: 'Analyse my symptom →',
    faq_q1: 'When is it urgent to see a doctor for',
    faq_q2: 'What signs indicate that',
    faq_q2b: 'needs urgent attention?',
    disclaimer: 'This information is informational and educational. It does not replace professional medical evaluation. If in doubt, call emergency services.',
    emergency: '⚠️ In case of emergency call 112',
  },
  zh: {
    when_title: '何时就医',
    red_flags: '🚨 警告信号——立即行动',
    when_act: '何时采取行动？',
    back: '← 返回症状',
    back_guides: '← 所有指南',
    cta: '分析我的症状 →',
    faq_q1: '何时因',
    faq_q2: '什么信号表明',
    faq_q2b: '需要紧急处理？',
    disclaimer: '本信息仅供参考和教育目的，不能替代专业医疗评估。如有疑问，请拨打急救电话。',
    emergency: '⚠️ 紧急情况请拨打120',
  },
  ru: {
    when_title: 'когда обращаться к врачу',
    red_flags: '🚨 Тревожные признаки — действуйте немедленно',
    when_act: 'Когда действовать?',
    back: '← Назад к симптому',
    back_guides: '← Все руководства',
    cta: 'Анализировать симптом →',
    faq_q1: 'Когда срочно обращаться к врачу при',
    faq_q2: 'Какие признаки указывают, что',
    faq_q2b: 'требует срочного внимания?',
    disclaimer: 'Эта информация носит информационный и образовательный характер. Не заменяет профессиональную медицинскую оценку. При сомнениях звоните 112.',
    emergency: '⚠️ В экстренном случае звоните 112',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const symptom = getSymptom(slug);
  if (!symptom) return {};
  const content = symptom.content[locale as keyof typeof symptom.content] || symptom.content.es;
  const labels = LABELS[locale as keyof typeof LABELS] || LABELS.es;
  const title = content.metaTitle.split(':')[0];
  return {
    title: `¿Cuándo ir al médico por ${title.toLowerCase()}? | Sympto+`,
    description: `Señales de alarma y cuándo consultar al médico por ${title.toLowerCase()}. ${content.whenToAct.slice(0, 120)}`,
    alternates: { canonical: `https://getsympto.app/${locale}/sintomas/${slug}/cuando-ir-al-medico` },
  };
}

export function generateStaticParams() {
  const locales = ['es', 'en', 'zh', 'ru'];
  return locales.flatMap(locale =>
    SYMPTOMS.map(s => ({ locale, slug: s.slug }))
  );
}

export default async function CuandoIrAlMedicoPage({ params }: Props) {
  const { locale, slug } = await params;
  const symptom = getSymptom(slug);
  if (!symptom) notFound();

  const content = symptom.content[locale as keyof typeof symptom.content] || symptom.content.es;
  const labels = LABELS[locale as keyof typeof LABELS] || LABELS.es;
  const symptomTitle = content.metaTitle.split(':')[0];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `${labels.faq_q1} ${symptomTitle.toLowerCase()}?`,
        acceptedAnswer: { '@type': 'Answer', text: content.whenToAct },
      },
      {
        '@type': 'Question',
        name: `${labels.faq_q2} ${symptomTitle.toLowerCase()} ${labels.faq_q2b}`,
        acceptedAnswer: { '@type': 'Answer', text: content.redFlags.join('. ') },
      },
    ],
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Sympto+', item: `https://getsympto.app/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Síntomas', item: `https://getsympto.app/${locale}/sintomas` },
      { '@type': 'ListItem', position: 3, name: symptomTitle, item: `https://getsympto.app/${locale}/sintomas/${slug}` },
      { '@type': 'ListItem', position: 4, name: labels.when_title, item: `https://getsympto.app/${locale}/sintomas/${slug}/cuando-ir-al-medico` },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <div className="max-w-3xl mx-auto px-4 py-12">

        <div className="flex items-center justify-between mb-6">
          <Link href={`/${locale}/sintomas/${slug}`} className="text-blue-600 text-sm hover:underline">{labels.back}</Link>
          <Link href={`/${locale}/sintomas`} className="text-sm text-slate-500 hover:text-blue-600">{labels.back_guides}</Link>
        </div>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{symptom.emoji}</span>
            <span className="text-blue-600 text-sm font-medium">{symptomTitle}</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-3">
            {labels.faq_q1} {symptomTitle.toLowerCase()}?
          </h1>
          <p className="text-slate-500">{content.metaDescription}</p>
        </header>

        {/* Señales de alarma */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold text-red-700 mb-4">{labels.red_flags}</h2>
          <ul className="space-y-3">
            {content.redFlags.map((flag, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-red-500 shrink-0 mt-0.5">⚠️</span>
                <span className="text-red-700 text-sm font-medium">{flag}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cuándo actuar */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">{labels.when_act}</h2>
          <p className="text-slate-600 leading-relaxed">{content.whenToAct}</p>
        </div>

        {/* Emergency banner */}
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 mb-8 text-center">
          <p className="text-amber-800 font-semibold">{labels.emergency}</p>
        </div>

        {/* CTA */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
          <h3 className="font-semibold text-slate-800 mb-2">{symptom.emoji} {symptomTitle}</h3>
          <p className="text-sm text-slate-600 mb-4">{content.intro.slice(0, 150)}...</p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link href={`/${locale}`} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition inline-block">
              {labels.cta}
            </Link>
            <Link href={`/${locale}/sintomas/${slug}`} className="text-sm text-slate-500 hover:text-blue-600">
              {labels.back}
            </Link>
          </div>
        </div>

        <p className="mt-6 text-xs text-slate-400 text-center">{labels.disclaimer}</p>
      </div>
    </main>
  );
}