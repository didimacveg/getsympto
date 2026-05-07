import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SYMPTOMS, type Symptom } from '@/lib/symptoms-data';

const ZONES_DATA = {
  cabeza: {
    emoji: '🧠',
    slugs: ['dolor-de-cabeza', 'mareos-y-vertigo', 'dolor-de-oido', 'dolor-de-muela', 'dolor-cabeza-todos-los-dias', 'cansancio-extremo'],
    content: {
      es: { title: 'Síntomas de la cabeza', description: 'Guía completa sobre los síntomas más frecuentes en la zona de la cabeza: dolor de cabeza, mareos, vértigo, dolor de oído y más.', keywords: 'síntomas cabeza, dolor de cabeza causas, mareos, vértigo, dolor oído' },
      en: { title: 'Head symptoms', description: 'Complete guide to the most frequent symptoms in the head area: headache, dizziness, vertigo, ear pain and more.', keywords: 'head symptoms, headache causes, dizziness, vertigo, ear pain' },
      zh: { title: '头部症状', description: '头部最常见症状完整指南：头痛、头晕、眩晕、耳痛等。', keywords: '头部症状, 头痛原因, 头晕, 眩晕, 耳痛' },
      ru: { title: 'Симптомы головы', description: 'Полное руководство по наиболее частым симптомам в области головы: головная боль, головокружение, вертиго, боль в ухе и другие.', keywords: 'симптомы головы, причины головной боли, головокружение, вертиго, боль в ухе' },
    },
  },
  espalda: {
    emoji: '🔙',
    slugs: ['dolor-de-espalda', 'dolor-lumbar', 'dolor-de-cuello', 'dolor-lumbar-que-baja-a-la-pierna'],
    content: {
      es: { title: 'Síntomas de la espalda', description: 'Guía sobre los síntomas más frecuentes de la espalda: dolor lumbar, cervicalgia, ciática y hernia discal.', keywords: 'síntomas espalda, dolor lumbar, cervicalgia, ciática, hernia discal' },
      en: { title: 'Back symptoms', description: 'Guide to the most frequent back symptoms: lower back pain, cervicalgia, sciatica and herniated disc.', keywords: 'back symptoms, lower back pain, cervicalgia, sciatica, herniated disc' },
      zh: { title: '背部症状', description: '背部最常见症状指南：腰痛、颈椎病、坐骨神经痛和椎间盘突出。', keywords: '背部症状, 腰痛, 颈椎病, 坐骨神经痛, 椎间盘突出' },
      ru: { title: 'Симптомы спины', description: 'Руководство по наиболее частым симптомам спины: поясничная боль, цервикалгия, ишиас и грыжа диска.', keywords: 'симптомы спины, поясничная боль, цервикалгия, ишиас, грыжа диска' },
    },
  },
  abdomen: {
    emoji: '🫃',
    slugs: ['dolor-abdominal', 'nauseas', 'dolor-en-el-costado', 'por-que-me-duele-el-estomago-despues-de-comer'],
    content: {
      es: { title: 'Síntomas del abdomen', description: 'Guía sobre los síntomas abdominales más frecuentes: dolor de estómago, náuseas, dolor en el costado y molestias digestivas.', keywords: 'síntomas abdomen, dolor estómago, náuseas, dolor costado, digestión' },
      en: { title: 'Abdominal symptoms', description: 'Guide to the most frequent abdominal symptoms: stomach pain, nausea, side pain and digestive discomfort.', keywords: 'abdominal symptoms, stomach pain, nausea, side pain, digestion' },
      zh: { title: '腹部症状', description: '最常见腹部症状指南：胃痛、恶心、侧腹痛和消化不适。', keywords: '腹部症状, 胃痛, 恶心, 侧腹痛, 消化' },
      ru: { title: 'Симптомы живота', description: 'Руководство по наиболее частым симптомам живота: боль в желудке, тошнота, боль в боку и пищеварительный дискомфорт.', keywords: 'симптомы живота, боль в желудке, тошнота, боль в боку, пищеварение' },
    },
  },
  articulaciones: {
    emoji: '🦿',
    slugs: ['dolor-de-rodilla', 'dolor-de-hombro', 'dolor-de-pie', 'dolor-de-tobillo', 'dolor-de-rodilla-al-correr', 'dolor-de-rodilla-por-la-noche'],
    content: {
      es: { title: 'Síntomas articulares', description: 'Guía sobre los síntomas más frecuentes en articulaciones: dolor de rodilla, hombro, pie y tobillo.', keywords: 'síntomas articulaciones, dolor rodilla, dolor hombro, dolor pie, dolor tobillo' },
      en: { title: 'Joint symptoms', description: 'Guide to the most frequent joint symptoms: knee pain, shoulder pain, foot pain and ankle pain.', keywords: 'joint symptoms, knee pain, shoulder pain, foot pain, ankle pain' },
      zh: { title: '关节症状', description: '最常见关节症状指南：膝盖痛、肩痛、脚痛和踝关节痛。', keywords: '关节症状, 膝盖痛, 肩痛, 脚痛, 踝关节痛' },
      ru: { title: 'Симптомы суставов', description: 'Руководство по наиболее частым суставным симптомам: боль в колене, плече, стопе и лодыжке.', keywords: 'симптомы суставов, боль в колене, боль в плече, боль в стопе, боль в лодыжке' },
    },
  },
  pecho: {
    emoji: '❤️',
    slugs: ['dolor-en-el-pecho', 'palpitaciones', 'me-duele-el-pecho-y-el-brazo-izquierdo', 'dolor-muscular'],
    content: {
      es: { title: 'Síntomas del pecho', description: 'Guía sobre los síntomas del pecho y zona torácica: dolor torácico, palpitaciones y señales de alarma cardíaca.', keywords: 'síntomas pecho, dolor torácico, palpitaciones, dolor cardíaco' },
      en: { title: 'Chest symptoms', description: 'Guide to chest and thoracic area symptoms: chest pain, palpitations and cardiac warning signs.', keywords: 'chest symptoms, chest pain, palpitations, cardiac pain' },
      zh: { title: '胸部症状', description: '胸部和胸腔区域症状指南：胸痛、心悸和心脏警告信号。', keywords: '胸部症状, 胸痛, 心悸, 心脏疼痛' },
      ru: { title: 'Симптомы груди', description: 'Руководство по симптомам грудной клетки: боль в груди, сердцебиение и кардиальные тревожные признаки.', keywords: 'симптомы груди, боль в груди, сердцебиение, сердечная боль' },
    },
  },
};

type ZoneKey = keyof typeof ZONES_DATA;

type Props = { params: Promise<{ locale: string; zone: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, zone } = await params;
  const zoneData = ZONES_DATA[zone as ZoneKey];
  if (!zoneData) return {};
  const content = zoneData.content[locale as keyof typeof zoneData.content] || zoneData.content.es;
  return {
    title: `${content.title} | Sympto+`,
    description: content.description,
    keywords: content.keywords,
    alternates: { canonical: `https://getsympto.app/${locale}/zona/${zone}` },
  };
}

export function generateStaticParams() {
  const locales = ['es', 'en', 'zh', 'ru'];
  return locales.flatMap(locale =>
    Object.keys(ZONES_DATA).map(zone => ({ locale, zone }))
  );
}

export default async function ZonePage({ params }: Props) {
  const { locale, zone } = await params;
  const zoneData = ZONES_DATA[zone as ZoneKey];
  if (!zoneData) notFound();

  const content = zoneData.content[locale as keyof typeof zoneData.content] || zoneData.content.es;
  const symptoms = zoneData.slugs
    .map(slug => SYMPTOMS.find(s => s.slug === slug))
    .filter((s): s is Symptom => s !== undefined);

  const getTitle = (s: Symptom) => {
    const c = s.content[locale as keyof typeof s.content] || s.content.es;
    return c.metaTitle.split(':')[0].trim();
  };

  const getDesc = (s: Symptom) => {
    const c = s.content[locale as keyof typeof s.content] || s.content.es;
    return c.metaDescription;
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: content.title,
    description: content.description,
    url: `https://getsympto.app/${locale}/zona/${zone}`,
    inLanguage: locale,
    publisher: { '@type': 'Organization', name: 'Sympto+', url: 'https://getsympto.app' },
    hasPart: symptoms.map(s => ({
      '@type': 'MedicalWebPage',
      name: getTitle(s),
      url: `https://getsympto.app/${locale}/sintomas/${s.slug}`,
    })),
  };

  const backLabel = { es: '← Todas las guías', en: '← All guides', zh: '← 所有指南', ru: '← Все руководства' };
  const homeLabel = { es: 'Inicio', en: 'Home', zh: '首页', ru: 'Главная' };
  const analyzeLabel = { es: 'Analizar mi síntoma →', en: 'Analyse my symptom →', zh: '分析我的症状 →', ru: 'Анализировать симптом →' };
  const moreLabel = { es: 'Más información →', en: 'More information →', zh: '更多信息 →', ru: 'Подробнее →' };
  const readLabel = { es: 'lectura', en: 'read', zh: '阅读', ru: 'чтение' };

  const bl = backLabel[locale as keyof typeof backLabel] || backLabel.es;
  const hl = homeLabel[locale as keyof typeof homeLabel] || homeLabel.es;
  const al = analyzeLabel[locale as keyof typeof analyzeLabel] || analyzeLabel.es;
  const ml = moreLabel[locale as keyof typeof moreLabel] || moreLabel.es;
  const rl = readLabel[locale as keyof typeof readLabel] || readLabel.es;

  return (
    <main className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-4xl mx-auto px-4 py-12">

        <div className="flex items-center justify-between mb-8">
          <Link href={`/${locale}/sintomas`} className="text-sm text-slate-500 hover:text-blue-600">{bl}</Link>
          <Link href={`/${locale}`} className="text-sm text-slate-500 hover:text-blue-600">{hl}</Link>
        </div>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{zoneData.emoji}</span>
            <h1 className="text-3xl font-bold text-slate-800">{content.title}</h1>
          </div>
          <p className="text-slate-500">{content.description}</p>
        </header>

        <div className="grid gap-4">
          {symptoms.map(symptom => (
            <Link key={symptom.slug} href={`/${locale}/sintomas/${symptom.slug}`}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <span className="text-2xl shrink-0">{symptom.emoji}</span>
                  <div>
                    <h2 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors mb-1">{getTitle(symptom)}</h2>
                    <p className="text-sm text-slate-500">{getDesc(symptom)}</p>
                    <Link href={`/${locale}/sintomas/${symptom.slug}/cuando-ir-al-medico`}
                      className="text-xs text-blue-500 hover:text-blue-700 mt-2 inline-block">
                      {ml}
                    </Link>
                  </div>
                </div>
                <span className="text-slate-300 group-hover:text-blue-400 transition-colors text-xl mt-1">→</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
          <p className="text-slate-600 mb-4 text-sm">¿Tienes síntomas en esta zona? Usa nuestro orientador interactivo.</p>
          <Link href={`/${locale}`} className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-blue-700 transition inline-block">
            {al}
          </Link>
        </div>

        <div className="mt-6 text-xs text-slate-400 text-center">
          Toda la información es orientativa y educativa. No sustituye la valoración médica profesional.
        </div>
      </div>
    </main>
  );
}