import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const ARTICLES: Record<string, {
  title: string;
  description: string;
  zone: string;
  readTime: string;
  content: string;
}> = {
  'dolor-pecho-al-respirar': {
    title: '¿Por qué me duele el pecho al respirar?',
    description: 'Causas generales del dolor torácico al inspirar, señales de alarma y cuándo consultar al médico.',
    zone: 'Pecho / Tórax',
    readTime: '4 min',
    content: `
El dolor en el pecho al respirar es uno de los síntomas que más consultas genera. En la mayoría de los casos tiene origen muscular o respiratorio, pero siempre conviene prestarle atención.

## Causas frecuentes

**Costocondritis:** Inflamación del cartílago que une las costillas al esternón. Produce dolor que empeora al presionar el pecho o al respirar hondo. Es benigna y suele resolverse sola.

**Tensión muscular intercostal:** Los músculos entre las costillas pueden tensarse por esfuerzo físico, tos intensa o malas posturas. El dolor es localizado y aumenta con el movimiento.

**Pleuritis:** Inflamación de la membrana que recubre los pulmones. Provoca un dolor agudo que empeora al inspirar profundamente. Puede acompañarse de fiebre.

**Reflujo gastroesofágico:** El ácido estomacal puede irritar el esófago y producir una sensación de ardor o presión en el pecho, a veces confundida con dolor respiratorio.

## Señales de alarma — consulta urgente si además aparece

- Dolor que irradia al brazo izquierdo, mandíbula o espalda
- Dificultad para respirar en reposo
- Sudoración fría o mareos acompañando el dolor
- Dolor que dura más de 20 minutos sin mejorar
- Labios o uñas azulados

## ¿Cuándo actuar?

Si el dolor aparece al respirar hondo y desaparece en reposo, sin otros síntomas, generalmente no es urgente. Observa durante 24-48 horas. Si persiste o empeora, consulta con tu médico de cabecera.

Si el dolor es intenso, aparece en reposo o se acompaña de cualquiera de las señales anteriores, **llama al 112**.
    `,
  },
  'dolor-cabeza-detras-ojos': {
    title: 'Dolor de cabeza detrás de los ojos: causas frecuentes',
    description: 'Qué puede causar presión o dolor ocular y frontal, y cómo diferenciarlo de una migraña.',
    zone: 'Cabeza',
    readTime: '4 min',
    content: `
El dolor de cabeza localizado detrás de los ojos o en la zona frontal es muy común y en la mayoría de casos tiene causas benignas relacionadas con el estilo de vida.

## Causas frecuentes

**Tensión ocular:** Pasar muchas horas frente a pantallas sin descanso genera fatiga visual que se manifiesta como presión detrás de los ojos. Es la causa más común en adultos jóvenes.

**Sinusitis:** La inflamación de los senos paranasales produce presión facial y dolor que se siente detrás de los ojos y en la frente. Suele acompañarse de congestión nasal.

**Migraña:** El dolor migrañoso frecuentemente empieza detrás de un ojo y se extiende. Puede acompañarse de sensibilidad a la luz, náuseas y visión borrosa.

**Cefalea en racimos:** Dolor intenso y pulsátil alrededor de un ojo, generalmente nocturno. Menos frecuente pero muy característico.

## Señales de alarma

- Dolor de aparición brusca e intensísima ("el peor dolor de cabeza de tu vida")
- Fiebre alta acompañando el dolor
- Rigidez de cuello
- Visión doble o pérdida de visión
- Confusión o dificultad para hablar

## ¿Cuándo actuar?

Para dolores leves relacionados con pantallas: descansa los ojos cada 20 minutos, hidratate y ventila el espacio. Si el dolor es recurrente, consulta con tu médico para descartar problemas de refracción visual o sinusitis crónica.
    `,
  },
  'dolor-lado-derecho-abdomen': {
    title: 'Dolor en el lado derecho del abdomen',
    description: 'Causas comunes del dolor abdominal derecho, desde digestivas hasta musculares, y señales de urgencia.',
    zone: 'Abdomen',
    readTime: '5 min',
    content: `
El lado derecho del abdomen alberga varios órganos importantes: el hígado, la vesícula biliar, el apéndice, parte del intestino grueso y el riñón derecho. Por eso el dolor en esta zona puede tener distintos orígenes.

## Causas frecuentes

**Gases e hinchazón:** La acumulación de gas en el colon puede producir dolor localizado en el lado derecho, que mejora al defecar o expulsar gases.

**Estreñimiento:** El tránsito intestinal lento genera presión y molestia en cualquier parte del abdomen, incluyendo el lado derecho.

**Problemas de vesícula:** El cólico biliar produce dolor en el lado derecho superior, frecuentemente tras comidas grasas. Puede irradiar hacia la espalda o el hombro derecho.

**Apendicitis:** Dolor que empieza alrededor del ombligo y migra al lado derecho inferior. Se intensifica con el movimiento y suele acompañarse de fiebre y náuseas.

## Señales de alarma — consulta urgente

- Dolor muy intenso que no cede
- Fiebre superior a 38°C con el dolor
- Vómitos persistentes
- Abdomen rígido al tacto
- Dolor que empeora claramente al moverse

## ¿Cuándo actuar?

Si el dolor es leve y mejora con el movimiento intestinal, observa durante unas horas. Si el dolor se localiza en el lado derecho inferior y va aumentando, consulta pronto — la apendicitis requiere atención médica rápida.
    `,
  },
  'dolor-espalda-baja-lumbar': {
    title: 'Dolor lumbar: causas y cuándo preocuparse',
    description: 'Por qué duele la zona lumbar, factores de riesgo habituales y recomendaciones generales.',
    zone: 'Zona lumbar',
    readTime: '4 min',
    content: `
El dolor lumbar es una de las causas más frecuentes de consulta médica. Se estima que el 80% de las personas lo experimentará en algún momento de su vida.

## Causas frecuentes

**Contractura muscular:** El exceso de tensión en los músculos paravertebrales por malas posturas, esfuerzos o sedentarismo es la causa más común. El dolor es difuso y mejora con el movimiento suave.

**Hernia discal:** El disco intervertebral puede presionar nervios adyacentes, produciendo dolor que puede irradiar hacia la pierna (ciática). Empeora al estar sentado mucho tiempo.

**Artrosis lumbar:** El desgaste de las vértebras lumbares genera rigidez matutina y dolor que mejora con el movimiento pero empeora al final del día.

**Malas posturas crónicas:** Trabajar sentado sin apoyo lumbar adecuado genera sobrecarga progresiva en la zona baja de la espalda.

## Señales de alarma

- Dolor que despierta por la noche
- Pérdida de control de vejiga o intestino
- Debilidad o entumecimiento en las piernas
- Dolor tras un golpe o caída
- Fiebre acompañando el dolor lumbar

## ¿Cuándo actuar?

Para el dolor lumbar mecánico común: mantén actividad moderada, evita el reposo absoluto y aplica calor local. Si no mejora en 1-2 semanas o aparece alguna señal de alarma, consulta con tu médico.
    `,
  },
  'dolor-rodilla-al-bajar-escaleras': {
    title: 'Me duele la rodilla al bajar escaleras',
    description: 'Contextos frecuentes del dolor de rodilla en movimiento y qué factores pueden influir.',
    zone: 'Rodilla',
    readTime: '4 min',
    content: `
El dolor de rodilla al bajar escaleras es especialmente frecuente porque este movimiento genera mayor presión sobre la articulación que al subir o caminar en llano.

## Causas frecuentes

**Síndrome femoropatelar:** Alteración en el deslizamiento de la rótula sobre el fémur. Produce dolor difuso en la parte delantera de la rodilla, especialmente al bajar escaleras, agacharse o estar sentado mucho tiempo.

**Condromalacia rotuliana:** Desgaste del cartílago de la rótula. Genera crujidos y dolor al flexionar la rodilla bajo carga.

**Tendinitis rotuliana:** Inflamación del tendón que conecta la rótula con la tibia. Común en personas activas o con sobrepeso.

**Artrosis de rodilla:** El desgaste articular produce rigidez, especialmente matutina, y dolor que empeora con el uso prolongado.

## Señales de alarma

- Rodilla muy inflamada o caliente al tacto
- Bloqueo de la rodilla — incapacidad de estirarla completamente
- Dolor intenso tras un traumatismo
- Inestabilidad al apoyar peso

## ¿Cuándo actuar?

Si el dolor es leve y aparece solo al bajar escaleras, evita sobrecargar la rodilla y fortalece el cuádriceps con ejercicios en descarga. Si persiste más de 2 semanas o empeora, consulta con tu médico o fisioterapeuta.
    `,
  },
  'dolor-hombro-brazo-izquierdo': {
    title: 'Dolor en el hombro y brazo izquierdo',
    description: 'Causas musculares y posturales del dolor en hombro izquierdo, y cuándo es urgente consultarlo.',
    zone: 'Hombro',
    readTime: '5 min',
    content: `
El dolor en el hombro izquierdo y brazo izquierdo genera preocupación porque puede asociarse a problemas cardíacos. Sin embargo, en la mayoría de casos tiene origen muscular o articular.

## Causas frecuentes

**Contractura del trapecio:** El músculo trapecio conecta cuello, hombros y espalda. Su tensión es muy común por estrés o malas posturas y produce dolor referido hacia el brazo.

**Manguito rotador:** Inflamación o desgarro de los tendones del hombro. Produce dolor al levantar el brazo o al dormir sobre ese lado.

**Cervicalgia con irradiación:** Los nervios del cuello pueden comprimir y enviar dolor hacia el hombro y brazo izquierdo, con posible hormigueo en los dedos.

**Hombro congelado:** Capsulitis adhesiva — rigidez progresiva del hombro con dolor constante, especialmente nocturno.

## Cuándo es urgente — llama al 112

El dolor de hombro y brazo izquierdo es señal de alarma cardíaca si se acompaña de:
- Presión o dolor en el centro del pecho
- Sudoración fría repentina
- Náuseas o mareos
- Dificultad para respirar
- Sensación de muerte inminente

En ese caso no esperes: **llama al 112 inmediatamente**.

## ¿Cuándo actuar?

Si el dolor es muscular, aparece con el movimiento del brazo y no se acompaña de síntomas generales, observa y aplica calor. Si persiste más de una semana, consulta con tu médico.
    `,
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return {};
  return {
    title: `${article.title} | Sympto+`,
    description: article.description,
  };
}

export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

function renderContent(content: string) {
  const lines = content.trim().split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('## ')) {
      return <h2 key={i} className="text-xl font-semibold text-slate-800 mt-8 mb-3">{line.replace('## ', '')}</h2>;
    }
    if (line.startsWith('**') && line.endsWith('**')) {
      return <p key={i} className="font-semibold text-slate-700 mt-4 mb-1">{line.replace(/\*\*/g, '')}</p>;
    }
    if (line.startsWith('**')) {
      const parts = line.split('**');
      return (
        <p key={i} className="text-slate-600 leading-relaxed mb-2">
          <strong>{parts[1]}</strong>{parts[2]}
        </p>
      );
    }
    if (line.startsWith('- ')) {
      return <li key={i} className="text-slate-600 ml-4 mb-1">{line.replace('- ', '')}</li>;
    }
    if (line.trim() === '') return <br key={i} />;
    return <p key={i} className="text-slate-600 leading-relaxed mb-3">{line}</p>;
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) notFound();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-12">

        <div className="flex items-center justify-between mb-6">
          <Link href="/blog" className="text-blue-600 text-sm hover:underline">
            ← Volver a guías
          </Link>
          <Link href="/" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
            Inicio
          </Link>
        </div>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
              {article.zone}
            </span>
            <span className="text-xs text-slate-400">{article.readTime} lectura</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-3">{article.title}</h1>
          <p className="text-slate-500">{article.description}</p>
        </header>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <div className="prose prose-slate max-w-none">
            {renderContent(article.content)}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6">
          <h3 className="font-semibold text-slate-800 mb-2">¿Tienes este síntoma?</h3>
          <p className="text-sm text-slate-600 mb-4">
            Usa nuestro orientador de síntomas para obtener información personalizada sobre tu caso concreto.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href="/"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition inline-block"
            >
              Analizar mi síntoma →
            </Link>
            <Link
              href="/blog"
              className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
            >
              Ver más guías
            </Link>
          </div>
        </div>

        <div className="mt-6 text-xs text-slate-400 text-center">
          Este artículo es informativo y educativo. No sustituye la valoración de un profesional médico.
          Ante cualquier duda, consulta con tu médico o llama al 112 en caso de emergencia.
        </div>
      </div>
    </main>
  );
}