import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

const ARTICLES = [
  // ── HANTAVIRUS — TRENDING ──────────────────────────────────────────
  {
    slug: 'hantavirus',
    zone_es: 'Infeccioso · Urgente', zone_en: 'Infectious · Urgent', zone_zh: '传染病·紧急', zone_ru: 'Инфекция · Срочно',
    readTime: '6 min',
    trending: true,
    title_es: 'Hantavirus: síntomas, contagio y cuándo ir a urgencias',
    title_en: 'Hantavirus: symptoms, transmission and when to go to the ER',
    title_zh: '汉坦病毒：症状、传播途径及何时去急诊',
    title_ru: 'Хантавирус: симптомы, передача и когда в скорую',
    desc_es: 'Todo lo que necesitas saber sobre el hantavirus: síntomas iniciales, cómo se contagia, si hay tratamiento y cuándo es urgente. Analiza tus síntomas gratis.',
    desc_en: 'Everything you need to know about hantavirus: early symptoms, how it spreads, whether there is treatment and when it is urgent. Analyse your symptoms for free.',
    desc_zh: '关于汉坦病毒你需要知道的一切：早期症状、传播方式、是否有治疗方法以及何时紧急。免费分析您的症状。',
    desc_ru: 'Всё о хантавирусе: ранние симптомы, передача, лечение и когда срочно. Бесплатно анализируйте симптомы.',
  },
  // ── ARTÍCULOS EXISTENTES ───────────────────────────────────────────
  {
    slug: 'dolor-pecho-al-respirar',
    zone_es: 'Pecho / Tórax', zone_en: 'Chest / Thorax', zone_zh: '胸部', zone_ru: 'Грудь', readTime: '4 min',
    title_es: '¿Por qué me duele el pecho al respirar?', title_en: 'Why does my chest hurt when breathing?', title_zh: '为什么我呼吸时胸部疼痛？', title_ru: 'Почему болит грудь при дыхании?',
    desc_es: 'Causas generales del dolor torácico al inspirar, señales de alarma y cuándo consultar al médico.',
    desc_en: 'General causes of chest pain when inhaling, warning signs and when to see a doctor.',
    desc_zh: '吸气时胸痛的一般原因、警告信号以及何时就医。',
    desc_ru: 'Общие причины боли в груди при вдохе, тревожные признаки и когда обратиться к врачу.',
  },
  {
    slug: 'dolor-cabeza-detras-ojos',
    zone_es: 'Cabeza', zone_en: 'Head', zone_zh: '头部', zone_ru: 'Голова', readTime: '4 min',
    title_es: 'Dolor de cabeza detrás de los ojos: causas frecuentes', title_en: 'Headache behind the eyes: frequent causes', title_zh: '眼睛后面的头痛：常见原因', title_ru: 'Головная боль за глазами: частые причины',
    desc_es: 'Qué puede causar presión o dolor ocular y frontal, y cómo diferenciarlo de una migraña.',
    desc_en: 'What can cause eye and frontal pressure or pain, and how to differentiate it from a migraine.',
    desc_zh: '是什么导致眼部和额部压力或疼痛，以及如何将其与偏头痛区分。',
    desc_ru: 'Что может вызывать давление или боль в области глаз и лба, и как отличить это от мигрени.',
  },
  {
    slug: 'dolor-lado-derecho-abdomen',
    zone_es: 'Abdomen', zone_en: 'Abdomen', zone_zh: '腹部', zone_ru: 'Живот', readTime: '5 min',
    title_es: 'Dolor en el lado derecho del abdomen', title_en: 'Pain in the right side of the abdomen', title_zh: '腹部右侧疼痛', title_ru: 'Боль в правой части живота',
    desc_es: 'Causas comunes del dolor abdominal derecho, desde digestivas hasta musculares, y señales de urgencia.',
    desc_en: 'Common causes of right abdominal pain, from digestive to muscular, and urgency signs.',
    desc_zh: '右腹痛的常见原因，从消化到肌肉问题，以及紧急信号。',
    desc_ru: 'Частые причины боли в правой части живота, от пищеварительных до мышечных, и признаки срочности.',
  },
  {
    slug: 'dolor-espalda-baja-lumbar',
    zone_es: 'Zona lumbar', zone_en: 'Lower Back', zone_zh: '腰部', zone_ru: 'Поясница', readTime: '4 min',
    title_es: 'Dolor lumbar: causas y cuándo preocuparse', title_en: 'Lower back pain: causes and when to worry', title_zh: '腰痛：原因及何时担忧', title_ru: 'Боль в пояснице: причины и когда беспокоиться',
    desc_es: 'Por qué duele la zona lumbar, factores de riesgo habituales y recomendaciones generales.',
    desc_en: 'Why the lumbar area hurts, common risk factors and general recommendations.',
    desc_zh: '腰部为何疼痛、常见风险因素及一般建议。',
    desc_ru: 'Почему болит поясница, обычные факторы риска и общие рекомендации.',
  },
  {
    slug: 'dolor-rodilla-al-bajar-escaleras',
    zone_es: 'Rodilla', zone_en: 'Knee', zone_zh: '膝部', zone_ru: 'Колено', readTime: '4 min',
    title_es: 'Me duele la rodilla al bajar escaleras', title_en: 'My knee hurts when going down stairs', title_zh: '我下楼梯时膝盖疼痛', title_ru: 'Колено болит при спуске по лестнице',
    desc_es: 'Contextos frecuentes del dolor de rodilla en movimiento y qué factores pueden influir.',
    desc_en: 'Frequent contexts of knee pain during movement and what factors may influence it.',
    desc_zh: '运动时膝盖疼痛的常见情况及可能影响因素。',
    desc_ru: 'Частые ситуации боли в колене при движении и какие факторы могут влиять.',
  },
  {
    slug: 'dolor-hombro-brazo-izquierdo',
    zone_es: 'Hombro', zone_en: 'Shoulder', zone_zh: '肩部', zone_ru: 'Плечо', readTime: '5 min',
    title_es: 'Dolor en el hombro y brazo izquierdo', title_en: 'Pain in the left shoulder and arm', title_zh: '左肩和手臂疼痛', title_ru: 'Боль в левом плecho и руке',
    desc_es: 'Causas musculares y posturales del dolor en hombro izquierdo, y cuándo es urgente consultarlo.',
    desc_en: 'Muscular and postural causes of left shoulder pain, and when it is urgent to consult a doctor.',
    desc_zh: '左肩疼痛的肌肉和姿势原因，以及何时需要紧急就医。',
    desc_ru: 'Мышечные и постуральные причины боли в левом плече, и когда срочно обратиться к врачу.',
  },
];

const HANTAVIRUS_SEO = {
  es: {
    banner: '🦠 Hantavirus: todo lo que necesitas saber',
    keywords: 'síntomas hantavirus · contagio · tratamiento · prevención',
    cta: 'Analiza tus síntomas ahora →',
  },
  en: {
    banner: '🦠 Hantavirus: everything you need to know',
    keywords: 'hantavirus symptoms · transmission · treatment · prevention',
    cta: 'Analyse your symptoms now →',
  },
  zh: {
    banner: '🦠 汉坦病毒：你需要知道的一切',
    keywords: '汉坦病毒症状 · 传播 · 治疗 · 预防',
    cta: '立即分析您的症状 →',
  },
  ru: {
    banner: '🦠 Хантавирус: всё что нужно знать',
    keywords: 'симптомы хантавируса · передача · лечение · профилактика',
    cta: 'Анализировать симптомы →',
  },
};

const TRENDING_LABEL = { es: 'TENDENCIA', en: 'TRENDING', zh: '热门', ru: 'ТРЕНД' };
const NEW_LABEL = { es: 'NUEVO', en: 'NEW', zh: '新', ru: 'НОВОЕ' };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  const hantaDescs: Record<string, string> = {
    es: 'Información sobre hantavirus: síntomas, contagio, tratamiento y prevención. Analiza tus síntomas con IA.',
    en: 'Information about hantavirus: symptoms, transmission, treatment and prevention. Analyse your symptoms with AI.',
    zh: '汉坦病毒信息：症状、传播、治疗和预防。用AI分析您的症状。',
    ru: 'Информация о хантавирусе: симптомы, передача, лечение и профилактика. Анализируйте симптомы с ИИ.',
  };

  return {
    title: `${t('title')} | Sympto+`,
    description: hantaDescs[locale] || t('subtitle'),
    keywords: locale === 'es'
      ? 'hantavirus síntomas, hantavirus contagio, hantavirus españa, sintomas hantavirus humanos, blog médico, síntomas'
      : locale === 'en'
      ? 'hantavirus symptoms, hantavirus transmission, hantavirus treatment, medical blog, symptoms'
      : locale === 'zh'
      ? '汉坦病毒症状,汉坦病毒传播,医疗博客,症状'
      : 'симптомы хантавируса, хантавирус, медицинский блог, симптомы',
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const seo = HANTAVIRUS_SEO[locale as keyof typeof HANTAVIRUS_SEO] || HANTAVIRUS_SEO.es;
  const trendLabel = TRENDING_LABEL[locale as keyof typeof TRENDING_LABEL] || 'TRENDING';
  const newLabel = NEW_LABEL[locale as keyof typeof NEW_LABEL] || 'NEW';

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
    about: [
      { '@type': 'MedicalCondition', name: 'Hantavirus', alternateName: 'HPS' },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <a href={`/${locale}`} className="text-sm text-slate-500 hover:text-blue-600 transition-colors">{t('back_home')}</a>
          <span className="text-xs text-slate-400">{t('brand')}</span>
        </div>

        <header className="mb-8">
          <p className="text-blue-600 text-sm font-medium mb-2">{t('tag')}</p>
          <h1 className="text-3xl font-bold text-slate-800 mb-3">{t('title')}</h1>
          <p className="text-slate-500">{t('subtitle')}</p>
        </header>

        {/* ── Banner hantavirus SEO ── */}
        <Link
          href={`/${locale}/blog/hantavirus`}
          className="block mb-8 bg-linear-to-r from-red-600 to-orange-500 rounded-2xl p-5 text-white hover:opacity-95 transition group"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                  🔴 {trendLabel}
                </span>
              </div>
              <h2 className="text-lg font-bold mb-1">{seo.banner}</h2>
              <p className="text-red-100 text-sm">{seo.keywords}</p>
            </div>
            <div className="shrink-0 text-2xl group-hover:translate-x-1 transition-transform">→</div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/20">
            <span className="text-sm font-medium text-white/90">{seo.cta}</span>
          </div>
        </Link>

        {/* ── Grid de artículos ── */}
        <div className="grid gap-4">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/${locale}/blog/${article.slug}`}
              className={`bg-white rounded-2xl p-6 shadow-sm border transition-all group ${
                (article as any).trending
                  ? 'border-red-200 hover:border-red-400 hover:shadow-md ring-1 ring-red-100'
                  : 'border-slate-100 hover:border-blue-200 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      (article as any).trending
                        ? 'bg-red-50 text-red-600'
                        : 'bg-blue-50 text-blue-600'
                    }`}>
                      {getZone(article)}
                    </span>
                    {(article as any).trending && (
                      <>
                        <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">
                          🔴 {trendLabel}
                        </span>
                        <span className="text-xs bg-amber-400 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                          ✨ {newLabel}
                        </span>
                      </>
                    )}
                    <span className="text-xs text-slate-400">{article.readTime} {t('reading')}</span>
                  </div>
                  <h2 className={`text-lg font-semibold mb-1 transition-colors ${
                    (article as any).trending
                      ? 'text-red-700 group-hover:text-red-600'
                      : 'text-slate-800 group-hover:text-blue-600'
                  }`}>
                    {getTitle(article)}
                  </h2>
                  <p className="text-sm text-slate-500">{getDesc(article)}</p>
                </div>
                <span className={`transition-colors text-xl mt-1 ${
                  (article as any).trending
                    ? 'text-red-300 group-hover:text-red-500'
                    : 'text-slate-300 group-hover:text-blue-400'
                }`}>→</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-700 text-center">
          {t('disclaimer')}
        </div>
        <div className="mt-6 text-center">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition"
          >
            {t('analyze_btn')}
          </Link>
        </div>
      </div>
    </main>
  );
}