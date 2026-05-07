import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { SYMPTOMS } from '@/lib/symptoms-data';

type Props = { params: Promise<{ locale: string }> };

const INDEX_META = {
  es: { title: 'Guía de síntomas corporales | Sympto+', description: 'Información general sobre los síntomas más frecuentes: dolor de cabeza, espalda, rodilla, abdomen y más. Orientación informativa en español.' },
  en: { title: 'Body symptom guide | Sympto+', description: 'General information about the most frequent symptoms: headache, back pain, knee pain, abdominal pain and more.' },
  zh: { title: '身体症状指南 | Sympto+', description: '关于最常见症状的一般信息：头痛、背痛、膝盖痛、腹痛等。' },
  ru: { title: 'Руководство по симптомам | Sympto+', description: 'Общая информация о наиболее частых симптомах: головная боль, боль в спине, колене, животе и другие.' },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = INDEX_META[locale as keyof typeof INDEX_META] || INDEX_META.es;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `https://getsympto.app/${locale}/sintomas` },
  };
}

export default async function SintomasIndexPage({ params }: Props) {
  const { locale } = await params;

  const getTitle = (s: typeof SYMPTOMS[0]) => {
    const c = s.content[locale as keyof typeof s.content] || s.content.es;
    return c.metaTitle.split(':')[0].split('|')[0].trim();
  };

  const getDesc = (s: typeof SYMPTOMS[0]) => {
    const c = s.content[locale as keyof typeof s.content] || s.content.es;
    return c.metaDescription;
  };

  const headings = {
    es: { title: 'Guía de síntomas', subtitle: 'Información general sobre los síntomas más frecuentes. Selecciona el que describes para obtener orientación informativa.' },
    en: { title: 'Symptom guide', subtitle: 'General information about the most frequent symptoms. Select the one you describe to get informational guidance.' },
    zh: { title: '症状指南', subtitle: '关于最常见症状的一般信息。选择您描述的症状以获取信息指导。' },
    ru: { title: 'Руководство по симптомам', subtitle: 'Общая информация о наиболее частых симптомах. Выберите описываемый симптом для получения информационного руководства.' },
  };

  const h = headings[locale as keyof typeof headings] || headings.es;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: h.title,
    url: `https://getsympto.app/${locale}/sintomas`,
    inLanguage: locale,
    publisher: { '@type': 'Organization', name: 'Sympto+', url: 'https://getsympto.app' },
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <Link href={`/${locale}`} className="text-sm text-slate-500 hover:text-blue-600 transition-colors">← Inicio</Link>
          <span className="text-xs text-slate-400">Sympto+</span>
        </div>

        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-800 mb-3">{h.title}</h1>
          <p className="text-slate-500">{h.subtitle}</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SYMPTOMS.map(symptom => (
            <Link
              key={symptom.slug}
              href={`/${locale}/sintomas/${symptom.slug}`}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{symptom.emoji}</span>
                <div className="flex-1">
                  <h2 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors mb-1 text-sm">
                    {getTitle(symptom)}
                  </h2>
                  <p className="text-xs text-slate-500 line-clamp-2">{getDesc(symptom)}</p>
                </div>
                <span className="text-slate-300 group-hover:text-blue-400 transition-colors">→</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-700 text-center">
          ⚠️ Toda la información de esta sección es orientativa y educativa. No sustituye la valoración de un profesional médico.
        </div>
      </div>
    </main>
  );
}