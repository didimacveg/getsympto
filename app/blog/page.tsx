import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Guías de síntomas corporales | Sympto+',
  description: 'Información general sobre síntomas corporales frecuentes. Orientación educativa sobre dolores, molestias y señales de alarma por zona del cuerpo.',
};

const ARTICLES = [
  {
    slug: 'dolor-pecho-al-respirar',
    title: '¿Por qué me duele el pecho al respirar?',
    description: 'Causas generales del dolor torácico al inspirar, señales de alarma y cuándo consultar al médico.',
    zone: 'Pecho / Tórax',
    readTime: '4 min',
  },
  {
    slug: 'dolor-cabeza-detras-ojos',
    title: 'Dolor de cabeza detrás de los ojos: causas frecuentes',
    description: 'Qué puede causar presión o dolor ocular y frontal, y cómo diferenciarlo de una migraña.',
    zone: 'Cabeza',
    readTime: '4 min',
  },
  {
    slug: 'dolor-lado-derecho-abdomen',
    title: 'Dolor en el lado derecho del abdomen',
    description: 'Causas comunes del dolor abdominal derecho, desde digestivas hasta musculares, y señales de urgencia.',
    zone: 'Abdomen',
    readTime: '5 min',
  },
  {
    slug: 'dolor-espalda-baja-lumbar',
    title: 'Dolor lumbar: causas y cuándo preocuparse',
    description: 'Por qué duele la zona lumbar, factores de riesgo habituales y recomendaciones generales.',
    zone: 'Zona lumbar',
    readTime: '4 min',
  },
  {
    slug: 'dolor-rodilla-al-bajar-escaleras',
    title: 'Me duele la rodilla al bajar escaleras',
    description: 'Contextos frecuentes del dolor de rodilla en movimiento y qué factores pueden influir.',
    zone: 'Rodilla',
    readTime: '4 min',
  },
  {
    slug: 'dolor-hombro-brazo-izquierdo',
    title: 'Dolor en el hombro y brazo izquierdo',
    description: 'Causas musculares y posturales del dolor en hombro izquierdo, y cuándo es urgente consultarlo.',
    zone: 'Hombro',
    readTime: '5 min',
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-10">
          <p className="text-blue-600 text-sm font-medium mb-2">Guías informativas</p>
          <h1 className="text-3xl font-bold text-slate-800 mb-3">
            Síntomas corporales frecuentes
          </h1>
          <p className="text-slate-500">
            Información general y educativa sobre los síntomas más consultados.
            Ningún artículo sustituye la valoración de un profesional médico.
          </p>
        </header>

        <div className="grid gap-4">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                      {article.zone}
                    </span>
                    <span className="text-xs text-slate-400">{article.readTime} lectura</span>
                  </div>
                  <h2 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors mb-1">
                    {article.title}
                  </h2>
                  <p className="text-sm text-slate-500">{article.description}</p>
                </div>
                <span className="text-slate-300 group-hover:text-blue-400 transition-colors text-xl mt-1">→</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-700 text-center">
          ⚠️ Los artículos de este blog son informativos y educativos. No constituyen diagnóstico médico.
          Ante cualquier síntoma, consulta con tu médico.
        </div>
      </div>
    </main>
  );
}