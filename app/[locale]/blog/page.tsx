import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

const ARTICLES = [
  { slug: 'dolor-pecho-al-respirar', zone_es: 'Pecho / Tórax', zone_en: 'Chest / Thorax', zone_zh: '胸部', zone_ru: 'Грудь', readTime: '4 min',
    title_es: '¿Por qué me duele el pecho al respirar?', title_en: 'Why does my chest hurt when breathing?', title_zh: '为什么我呼吸时胸部疼痛？', title_ru: 'Почему болит грудь при дыхании?',
    desc_es: 'Causas generales del dolor torácico al inspirar, señales de alarma y cuándo consultar al médico.',
    desc_en: 'General causes of chest pain when inhaling, warning signs and when to see a doctor.',
    desc_zh: '吸气时胸痛的一般原因、警告信号以及何时就医。',
    desc_ru: 'Общие причины боли в груди при вдохе, тревожные признаки и когда обратиться к врачу.' },
  { slug: 'dolor-cabeza-detras-ojos', zone_es: 'Cabeza', zone_en: 'Head', zone_zh: '头部', zone_ru: 'Голова', readTime: '4 min',
    title_es: 'Dolor de cabeza detrás de los ojos: causas frecuentes', title_en: 'Headache behind the eyes: frequent causes', title_zh: '眼睛后面的头痛：常见原因', title_ru: 'Головная боль за глазами: частые причины',
    desc_es: 'Qué puede causar presión o dolor ocular y frontal, y cómo diferenciarlo de una migraña.',
    desc_en: 'What can cause eye and frontal pressure or pain, and how to differentiate it from a migraine.',
    desc_zh: '是什么导致眼部和额部压力或疼痛，以及如何将其与偏头痛区分。',
    desc_ru: 'Что может вызывать давление или боль в области глаз и лба, и как отличить это от мигрени.' },
  { slug: 'dolor-lado-derecho-abdomen', zone_es: 'Abdomen', zone_en: 'Abdomen', zone_zh: '腹部', zone_ru: 'Живот', readTime: '5 min',
    title_es: 'Dolor en el lado derecho del abdomen', title_en: 'Pain in the right side of the abdomen', title_zh: '腹部右侧疼痛', title_ru: 'Боль в правой части живота',
    desc_es: 'Causas comunes del dolor abdominal derecho, desde digestivas hasta musculares, y señales de urgencia.',
    desc_en: 'Common causes of right abdominal pain, from digestive to muscular, and urgency signs.',
    desc_zh: '右腹痛的常见原因，从消化到肌肉问题，以及紧急信号。',
    desc_ru: 'Частые причины боли в правой части живота, от пищеварительных до мышечных, и признаки срочности.' },
  { slug: 'dolor-espalda-baja-lumbar', zone_es: 'Zona lumbar', zone_en: 'Lower Back', zone_zh: '腰部', zone_ru: 'Поясница', readTime: '4 min',
    title_es: 'Dolor lumbar: causas y cuándo preocuparse', title_en: 'Lower back pain: causes and when to worry', title_zh: '腰痛：原因及何时担忧', title_ru: 'Боль в пояснице: причины и когда беспокоиться',
    desc_es: 'Por qué duele la zona lumbar, factores de riesgo habituales y recomendaciones generales.',
    desc_en: 'Why the lumbar area hurts, common risk factors and general recommendations.',
    desc_zh: '腰部为何疼痛、常见风险因素及一般建议。',
    desc_ru: 'Почему болит поясница, обычные факторы риска и общие рекомендации.' },
  { slug: 'dolor-rodilla-al-bajar-escaleras', zone_es: 'Rodilla', zone_en: 'Knee', zone_zh: '膝部', zone_ru: 'Колено', readTime: '4 min',
    title_es: 'Me duele la rodilla al bajar escaleras', title_en: 'My knee hurts when going down stairs', title_zh: '我下楼梯时膝盖疼痛', title_ru: 'Колено болит при спуске по лестнице',
    desc_es: 'Contextos frecuentes del dolor de rodilla en movimiento y qué factores pueden influir.',
    desc_en: 'Frequent contexts of knee pain during movement and what factors may influence it.',
    desc_zh: '运动时膝盖疼痛的常见情况及可能影响因素。',
    desc_ru: 'Частые ситуации боли в колене при движении и какие факторы могут влиять.' },
  { slug: 'dolor-hombro-brazo-izquierdo', zone_es: 'Hombro', zone_en: 'Shoulder', zone_zh: '肩部', zone_ru: 'Плечо', readTime: '5 min',
    title_es: 'Dolor en el hombro y brazo izquierdo', title_en: 'Pain in the left shoulder and arm', title_zh: '左肩和手臂疼痛', title_ru: 'Боль в левом плече и руке',
    desc_es: 'Causas musculares y posturales del dolor en hombro izquierdo, y cuándo es urgente consultarlo.',
    desc_en: 'Muscular and postural causes of left shoulder pain, and when it is urgent to consult a doctor.',
    desc_zh: '左肩疼痛的肌肉和姿势原因，以及何时需要紧急就医。',
    desc_ru: 'Мышечные и постуральные причины боли в левом плече, и когда срочно обратиться к врачу.' },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return { title: `${t('title')} | Sympto+`, description: t('subtitle') };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  const getTitle = (a: typeof ARTICLES[0]) => locale === 'en' ? a.title_en : locale === 'zh' ? a.title_zh : locale === 'ru' ? a.title_ru : a.title_es;
  const getDesc = (a: typeof ARTICLES[0]) => locale === 'en' ? a.desc_en : locale === 'zh' ? a.desc_zh : locale === 'ru' ? a.desc_ru : a.desc_es;
  const getZone = (a: typeof ARTICLES[0]) => locale === 'en' ? a.zone_en : locale === 'zh' ? a.zone_zh : locale === 'ru' ? a.zone_ru : a.zone_es;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${t('title')} | Sympto+`,
    url: `https://getsympto.app/${locale}/blog`,
    inLanguage: locale,
    publisher: { '@type': 'Organization', name: 'Sympto+', url: 'https://getsympto.app' },
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <a href={`/${locale}`} className="text-sm text-slate-500 hover:text-blue-600 transition-colors">{t('back_home')}</a>
          <span className="text-xs text-slate-400">{t('brand')}</span>
        </div>
        <header className="mb-10">
          <p className="text-blue-600 text-sm font-medium mb-2">{t('tag')}</p>
          <h1 className="text-3xl font-bold text-slate-800 mb-3">{t('title')}</h1>
          <p className="text-slate-500">{t('subtitle')}</p>
        </header>
        <div className="grid gap-4">
          {ARTICLES.map((article) => (
            <Link key={article.slug} href={`/${locale}/blog/${article.slug}`}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">{getZone(article)}</span>
                    <span className="text-xs text-slate-400">{article.readTime} {t('reading')}</span>
                  </div>
                  <h2 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors mb-1">{getTitle(article)}</h2>
                  <p className="text-sm text-slate-500">{getDesc(article)}</p>
                </div>
                <span className="text-slate-300 group-hover:text-blue-400 transition-colors text-xl mt-1">→</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-700 text-center">{t('disclaimer')}</div>
        <div className="mt-6 text-center">
          <a href={`/${locale}`} className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition">
            {t('analyze_btn')}
          </a>
        </div>
      </div>
    </main>
  );
}