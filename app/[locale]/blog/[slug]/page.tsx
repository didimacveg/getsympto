import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

type Article = {
  title_es: string; title_en: string;
  description_es: string; description_en: string;
  zone_es: string; zone_en: string;
  readTime: string;
  content_es: string; content_en: string;
};

const ARTICLES: Record<string, Article> = {
  'dolor-pecho-al-respirar': {
    title_es: '¿Por qué me duele el pecho al respirar?',
    title_en: 'Why does my chest hurt when breathing?',
    description_es: 'Causas generales del dolor torácico al inspirar, señales de alarma y cuándo consultar al médico.',
    description_en: 'General causes of chest pain when inhaling, warning signs and when to see a doctor.',
    zone_es: 'Pecho / Tórax', zone_en: 'Chest / Thorax',
    readTime: '4 min',
    content_es: `El dolor en el pecho al respirar es uno de los síntomas que más consultas genera. En la mayoría de los casos tiene origen muscular o respiratorio, pero siempre conviene prestarle atención.

## Causas frecuentes

**Costocondritis:** Inflamación del cartílago que une las costillas al esternón. Produce dolor que empeora al presionar el pecho o al respirar hondo. Es benigna y suele resolverse sola.

**Tensión muscular intercostal:** Los músculos entre las costillas pueden tensarse por esfuerzo físico, tos intensa o malas posturas. El dolor es localizado y aumenta con el movimiento.

**Pleuritis:** Inflamación de la membrana que recubre los pulmones. Provoca un dolor agudo que empeora al inspirar profundamente. Puede acompañarse de fiebre.

**Reflujo gastroesofágico:** El ácido estomacal puede irritar el esófago y producir una sensación de ardor o presión en el pecho.

## Señales de alarma — consulta urgente si además aparece

- Dolor que irradia al brazo izquierdo, mandíbula o espalda
- Dificultad para respirar en reposo
- Sudoración fría o mareos acompañando el dolor
- Dolor que dura más de 20 minutos sin mejorar
- Labios o uñas azulados

## ¿Cuándo actuar?

Si el dolor aparece al respirar hondo y desaparece en reposo, sin otros síntomas, generalmente no es urgente. Observa durante 24-48 horas. Si el dolor es intenso, aparece en reposo o se acompaña de las señales anteriores, **llama al 112**.`,
    content_en: `Chest pain when breathing is one of the most frequently consulted symptoms. In most cases it has a muscular or respiratory origin, but it always deserves attention.

## Frequent causes

**Costochondritis:** Inflammation of the cartilage connecting the ribs to the sternum. Causes pain that worsens when pressing the chest or breathing deeply. It is benign and usually resolves on its own.

**Intercostal muscle tension:** The muscles between the ribs can tense up from physical exertion, intense coughing or poor posture. The pain is localized and increases with movement.

**Pleuritis:** Inflammation of the membrane surrounding the lungs. Causes sharp pain that worsens with deep inspiration. May be accompanied by fever.

**Gastroesophageal reflux:** Stomach acid can irritate the esophagus and produce a burning or pressure sensation in the chest.

## Warning signs — seek urgent care if you also have

- Pain radiating to the left arm, jaw or back
- Difficulty breathing at rest
- Cold sweats or dizziness with the pain
- Pain lasting more than 20 minutes without improvement
- Blue lips or nails

## When to act?

If the pain appears when breathing deeply and disappears at rest, without other symptoms, it is generally not urgent. Observe for 24-48 hours. If pain is intense, appears at rest or is accompanied by the above signs, **call emergency services**.`,
  },
  'dolor-cabeza-detras-ojos': {
    title_es: 'Dolor de cabeza detrás de los ojos: causas frecuentes',
    title_en: 'Headache behind the eyes: frequent causes',
    description_es: 'Qué puede causar presión o dolor ocular y frontal, y cómo diferenciarlo de una migraña.',
    description_en: 'What can cause eye and frontal pressure or pain, and how to differentiate it from a migraine.',
    zone_es: 'Cabeza', zone_en: 'Head',
    readTime: '4 min',
    content_es: `El dolor de cabeza localizado detrás de los ojos o en la zona frontal es muy común y en la mayoría de casos tiene causas benignas relacionadas con el estilo de vida.

## Causas frecuentes

**Tensión ocular:** Pasar muchas horas frente a pantallas sin descanso genera fatiga visual que se manifiesta como presión detrás de los ojos. Es la causa más común en adultos jóvenes.

**Sinusitis:** La inflamación de los senos paranasales produce presión facial y dolor que se siente detrás de los ojos y en la frente. Suele acompañarse de congestión nasal.

**Migraña:** El dolor migrañoso frecuentemente empieza detrás de un ojo y se extiende. Puede acompañarse de sensibilidad a la luz, náuseas y visión borrosa.

**Cefalea en racimos:** Dolor intenso y pulsátil alrededor de un ojo, generalmente nocturno.

## Señales de alarma

- Dolor de aparición brusca e intensísima
- Fiebre alta acompañando el dolor
- Rigidez de cuello
- Visión doble o pérdida de visión

## ¿Cuándo actuar?

Para dolores leves relacionados con pantallas: descansa los ojos cada 20 minutos, hidratate y ventila el espacio. Si el dolor es recurrente, consulta con tu médico.`,
    content_en: `Headache behind the eyes or in the frontal area is very common and in most cases has benign causes related to lifestyle.

## Frequent causes

**Eye strain:** Spending many hours in front of screens without rest generates visual fatigue that manifests as pressure behind the eyes. The most common cause in young adults.

**Sinusitis:** Inflammation of the paranasal sinuses produces facial pressure and pain felt behind the eyes and in the forehead. Usually accompanied by nasal congestion.

**Migraine:** Migrainous pain frequently starts behind one eye and spreads. May be accompanied by light sensitivity, nausea and blurred vision.

**Cluster headache:** Intense, pulsating pain around one eye, usually nocturnal.

## Warning signs

- Sudden, extremely intense pain
- High fever with the pain
- Neck stiffness
- Double vision or vision loss

## When to act?

For mild screen-related pain: rest your eyes every 20 minutes, stay hydrated and ventilate the space. If pain is recurrent, consult your doctor.`,
  },
  'dolor-lado-derecho-abdomen': {
    title_es: 'Dolor en el lado derecho del abdomen',
    title_en: 'Pain in the right side of the abdomen',
    description_es: 'Causas comunes del dolor abdominal derecho, desde digestivas hasta musculares, y señales de urgencia.',
    description_en: 'Common causes of right abdominal pain, from digestive to muscular, and urgency signs.',
    zone_es: 'Abdomen', zone_en: 'Abdomen',
    readTime: '5 min',
    content_es: `El lado derecho del abdomen alberga varios órganos importantes: el hígado, la vesícula biliar, el apéndice, parte del intestino grueso y el riñón derecho.

## Causas frecuentes

**Gases e hinchazón:** La acumulación de gas en el colon puede producir dolor localizado en el lado derecho, que mejora al defecar o expulsar gases.

**Problemas de vesícula:** El cólico biliar produce dolor en el lado derecho superior, frecuentemente tras comidas grasas.

**Apendicitis:** Dolor que empieza alrededor del ombligo y migra al lado derecho inferior. Se intensifica con el movimiento y suele acompañarse de fiebre y náuseas.

## Señales de alarma — consulta urgente

- Dolor muy intenso que no cede
- Fiebre superior a 38°C con el dolor
- Vómitos persistentes
- Abdomen rígido al tacto

## ¿Cuándo actuar?

Si el dolor es leve y mejora con el movimiento intestinal, observa durante unas horas. Si el dolor se localiza en el lado derecho inferior y va aumentando, consulta pronto.`,
    content_en: `The right side of the abdomen houses several important organs: the liver, gallbladder, appendix, part of the large intestine and the right kidney.

## Frequent causes

**Gas and bloating:** Accumulation of gas in the colon can produce localized pain on the right side, which improves with bowel movements.

**Gallbladder problems:** Biliary colic produces pain in the upper right side, frequently after fatty meals.

**Appendicitis:** Pain that starts around the navel and migrates to the lower right side. Intensifies with movement and is usually accompanied by fever and nausea.

## Warning signs — seek urgent care

- Very intense pain that does not subside
- Fever above 38°C with the pain
- Persistent vomiting
- Rigid abdomen to touch

## When to act?

If the pain is mild and improves with bowel movements, observe for a few hours. If pain in the lower right side is increasing, consult soon.`,
  },
  'dolor-espalda-baja-lumbar': {
    title_es: 'Dolor lumbar: causas y cuándo preocuparse',
    title_en: 'Lower back pain: causes and when to worry',
    description_es: 'Por qué duele la zona lumbar, factores de riesgo habituales y recomendaciones generales.',
    description_en: 'Why the lumbar area hurts, common risk factors and general recommendations.',
    zone_es: 'Zona lumbar', zone_en: 'Lower Back',
    readTime: '4 min',
    content_es: `El dolor lumbar es una de las causas más frecuentes de consulta médica. Se estima que el 80% de las personas lo experimentará en algún momento de su vida.

## Causas frecuentes

**Contractura muscular:** El exceso de tensión en los músculos paravertebrales por malas posturas, esfuerzos o sedentarismo es la causa más común.

**Hernia discal:** El disco intervertebral puede presionar nervios adyacentes, produciendo dolor que puede irradiar hacia la pierna (ciática).

**Artrosis lumbar:** El desgaste de las vértebras lumbares genera rigidez matutina y dolor.

## Señales de alarma

- Dolor que despierta por la noche
- Pérdida de control de vejiga o intestino
- Debilidad o entumecimiento en las piernas

## ¿Cuándo actuar?

Para el dolor lumbar mecánico común: mantén actividad moderada, evita el reposo absoluto y aplica calor local. Si no mejora en 1-2 semanas, consulta con tu médico.`,
    content_en: `Lower back pain is one of the most frequent reasons for medical consultation. It is estimated that 80% of people will experience it at some point in their lives.

## Frequent causes

**Muscle contracture:** Excess tension in the paravertebral muscles due to poor posture, exertion or sedentary lifestyle is the most common cause.

**Herniated disc:** The intervertebral disc can press on adjacent nerves, producing pain that can radiate to the leg (sciatica).

**Lumbar osteoarthritis:** Wear of the lumbar vertebrae generates morning stiffness and pain.

## Warning signs

- Pain that wakes you at night
- Loss of bladder or bowel control
- Weakness or numbness in the legs

## When to act?

For common mechanical lower back pain: maintain moderate activity, avoid absolute rest and apply local heat. If it does not improve in 1-2 weeks, consult your doctor.`,
  },
  'dolor-rodilla-al-bajar-escaleras': {
    title_es: 'Me duele la rodilla al bajar escaleras',
    title_en: 'My knee hurts when going down stairs',
    description_es: 'Contextos frecuentes del dolor de rodilla en movimiento y qué factores pueden influir.',
    description_en: 'Frequent contexts of knee pain during movement and what factors may influence it.',
    zone_es: 'Rodilla', zone_en: 'Knee',
    readTime: '4 min',
    content_es: `El dolor de rodilla al bajar escaleras es especialmente frecuente porque este movimiento genera mayor presión sobre la articulación.

## Causas frecuentes

**Síndrome femoropatelar:** Alteración en el deslizamiento de la rótula sobre el fémur. Produce dolor difuso en la parte delantera de la rodilla.

**Condromalacia rotuliana:** Desgaste del cartílago de la rótula. Genera crujidos y dolor al flexionar la rodilla bajo carga.

**Tendinitis rotuliana:** Inflamación del tendón que conecta la rótula con la tibia. Común en personas activas.

## Señales de alarma

- Rodilla muy inflamada o caliente al tacto
- Bloqueo de la rodilla
- Dolor intenso tras un traumatismo

## ¿Cuándo actuar?

Si el dolor es leve y aparece solo al bajar escaleras, evita sobrecargar la rodilla. Si persiste más de 2 semanas, consulta con tu médico.`,
    content_en: `Knee pain when going down stairs is especially frequent because this movement generates greater pressure on the joint.

## Frequent causes

**Patellofemoral syndrome:** Alteration in the sliding of the kneecap over the femur. Produces diffuse pain in the front of the knee.

**Chondromalacia patellae:** Wear of the kneecap cartilage. Generates cracking sounds and pain when bending the knee under load.

**Patellar tendinitis:** Inflammation of the tendon connecting the kneecap to the tibia. Common in active people.

## Warning signs

- Very swollen or warm knee to the touch
- Knee locking
- Intense pain after trauma

## When to act?

If pain is mild and only appears going down stairs, avoid overloading the knee. If it persists more than 2 weeks, consult your doctor.`,
  },
  'dolor-hombro-brazo-izquierdo': {
    title_es: 'Dolor en el hombro y brazo izquierdo',
    title_en: 'Pain in the left shoulder and arm',
    description_es: 'Causas musculares y posturales del dolor en hombro izquierdo, y cuándo es urgente consultarlo.',
    description_en: 'Muscular and postural causes of left shoulder pain, and when it is urgent to consult a doctor.',
    zone_es: 'Hombro', zone_en: 'Shoulder',
    readTime: '5 min',
    content_es: `El dolor en el hombro izquierdo y brazo izquierdo genera preocupación porque puede asociarse a problemas cardíacos. Sin embargo, en la mayoría de casos tiene origen muscular o articular.

## Causas frecuentes

**Contractura del trapecio:** El músculo trapecio conecta cuello, hombros y espalda. Su tensión es muy común por estrés o malas posturas.

**Manguito rotador:** Inflamación o desgarro de los tendones del hombro. Produce dolor al levantar el brazo.

**Cervicalgia con irradiación:** Los nervios del cuello pueden comprimir y enviar dolor hacia el hombro y brazo izquierdo.

## Cuándo es urgente — llama al 112

El dolor de hombro y brazo izquierdo es señal de alarma cardíaca si se acompaña de:
- Presión o dolor en el centro del pecho
- Sudoración fría repentina
- Náuseas o mareos
- Dificultad para respirar

## ¿Cuándo actuar?

Si el dolor es muscular y no se acompaña de síntomas generales, observa y aplica calor. Si persiste más de una semana, consulta con tu médico.`,
    content_en: `Pain in the left shoulder and arm causes concern because it can be associated with heart problems. However, in most cases it has muscular or articular origin.

## Frequent causes

**Trapezius contracture:** The trapezius muscle connects neck, shoulders and back. Its tension is very common due to stress or poor posture.

**Rotator cuff:** Inflammation or tear of the shoulder tendons. Causes pain when lifting the arm.

**Cervicalgia with radiation:** Neck nerves can compress and send pain to the left shoulder and arm.

## When it is urgent — call 112

Left shoulder and arm pain is a cardiac warning sign if accompanied by:
- Pressure or pain in the center of the chest
- Sudden cold sweat
- Nausea or dizziness
- Difficulty breathing

## When to act?

If the pain is muscular and not accompanied by general symptoms, observe and apply heat. If it persists more than a week, consult your doctor.`,
  },
};

const RELATED: Record<string, string[]> = {
  'dolor-pecho-al-respirar': ['dolor-hombro-brazo-izquierdo', 'dolor-espalda-baja-lumbar'],
  'dolor-cabeza-detras-ojos': ['dolor-hombro-brazo-izquierdo', 'dolor-pecho-al-respirar'],
  'dolor-lado-derecho-abdomen': ['dolor-espalda-baja-lumbar', 'dolor-pecho-al-respirar'],
  'dolor-espalda-baja-lumbar': ['dolor-hombro-brazo-izquierdo', 'dolor-lado-derecho-abdomen'],
  'dolor-rodilla-al-bajar-escaleras': ['dolor-espalda-baja-lumbar', 'dolor-hombro-brazo-izquierdo'],
  'dolor-hombro-brazo-izquierdo': ['dolor-pecho-al-respirar', 'dolor-espalda-baja-lumbar'],
};

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return {};
  const title = locale === 'en' ? article.title_en : article.title_es;
  const desc = locale === 'en' ? article.description_en : article.description_es;
  return {
    title: `${title} | Sympto+`,
    description: desc,
    alternates: {
      canonical: `https://getsympto.app/${locale}/blog/${slug}`,
      languages: {
        'es': `https://getsympto.app/es/blog/${slug}`,
        'en': `https://getsympto.app/en/blog/${slug}`,
        'zh': `https://getsympto.app/zh/blog/${slug}`,
        'ru': `https://getsympto.app/ru/blog/${slug}`,
        'x-default': `https://getsympto.app/es/blog/${slug}`,
      },
    },
  };
}

export function generateStaticParams() {
  const locales = ['es', 'en', 'zh', 'ru'];
  const slugs = Object.keys(ARTICLES);
  return locales.flatMap(locale => slugs.map(slug => ({ locale, slug })));
}

function renderContent(content: string) {
  const lines = content.trim().split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-semibold text-slate-800 mt-8 mb-3">{line.replace('## ', '')}</h2>;
    if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-semibold text-slate-700 mt-4 mb-1">{line.replace(/\*\*/g, '')}</p>;
    if (line.startsWith('**')) {
      const parts = line.split('**');
      return <p key={i} className="text-slate-600 leading-relaxed mb-2"><strong>{parts[1]}</strong>{parts[2]}</p>;
    }
    if (line.startsWith('- ')) return <li key={i} className="text-slate-600 ml-4 mb-1">{line.replace('- ', '')}</li>;
    if (line.trim() === '') return <br key={i} />;
    return <p key={i} className="text-slate-600 leading-relaxed mb-3">{line}</p>;
  });
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  const article = ARTICLES[slug];
  if (!article) notFound();
  const t = await getTranslations({ locale, namespace: 'blog' });

  const title = locale === 'en' ? article.title_en : locale === 'zh' ? article.title_en : locale === 'ru' ? article.title_en : article.title_es;
  const description = locale === 'en' ? article.description_en : locale === 'zh' ? article.description_en : locale === 'ru' ? article.description_en : article.description_es;
  const zone = locale === 'en' ? article.zone_en : article.zone_es;
  const content = (locale === 'es') ? article.content_es : article.content_en;

  const relatedArticles = (RELATED[slug] || []).map(s => ({ slug: s, ...ARTICLES[s] })).filter(Boolean);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `https://getsympto.app/${locale}/blog/${slug}`,
    inLanguage: locale,
    datePublished: '2026-05-05',
    dateModified: new Date().toISOString(),
    author: { '@type': 'Organization', name: 'Sympto+', url: 'https://getsympto.app' },
    publisher: { '@type': 'Organization', name: 'Sympto+', url: 'https://getsympto.app' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://getsympto.app/${locale}/blog/${slug}` },
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <Link href={`/${locale}/blog`} className="text-blue-600 text-sm hover:underline">{t('back_guides')}</Link>
          <Link href={`/${locale}`} className="text-sm text-slate-500 hover:text-blue-600 transition-colors">{t('home_link')}</Link>
        </div>
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">{zone}</span>
            <span className="text-xs text-slate-400">{article.readTime} {t('reading')}</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-3">{title}</h1>
          <p className="text-slate-500">{description}</p>
        </header>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          {renderContent(content)}
        </div>
        {relatedArticles.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">{t('related_title')}</h3>
            <div className="grid gap-3">
              {relatedArticles.map((r) => {
                const rTitle = locale === 'en' ? r.title_en : locale === 'zh' ? r.title_en : locale === 'ru' ? r.title_en : r.title_es;
                const rZone = locale === 'en' ? r.zone_en : r.zone_es;
                return (
                  <Link key={r.slug} href={`/${locale}/blog/${r.slug}`}
                    className="bg-white rounded-xl p-4 border border-slate-100 hover:border-blue-200 transition-all group flex items-center justify-between">
                    <div>
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium mr-2">{rZone}</span>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">{rTitle}</span>
                    </div>
                    <span className="text-slate-300 group-hover:text-blue-400 transition-colors">→</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6">
          <h3 className="font-semibold text-slate-800 mb-2">{t('cta_title')}</h3>
          <p className="text-sm text-slate-600 mb-4">{t('cta_desc')}</p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link href={`/${locale}`} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition inline-block">{t('cta_btn')}</Link>
            <Link href={`/${locale}/blog`} className="text-sm text-slate-500 hover:text-blue-600 transition-colors">{t('more_guides')}</Link>
          </div>
        </div>
        <div className="mt-6 text-xs text-slate-400 text-center">{t('article_disclaimer')}</div>
      </div>
    </main>
  );
}