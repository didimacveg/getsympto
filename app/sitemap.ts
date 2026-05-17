import { MetadataRoute } from 'next';

const BASE = 'https://www.getsympto.app';
const LOCALES = ['es', 'en', 'zh', 'ru'];

const BLOG_SLUGS = [
  'dolor-pecho-al-respirar',
  'dolor-cabeza-detras-ojos',
  'dolor-lado-derecho-abdomen',
  'dolor-espalda-baja-lumbar',
  'dolor-rodilla-al-bajar-escaleras',
  'dolor-hombro-brazo-izquierdo',
  'hantavirus',
  'gripe-2025',
  'alergia-sol',
  'golpe-de-calor',
  'virus-nilo',
  'mpox',
];

const SYMPTOM_SLUGS = [
  'dolor-de-cabeza', 'dolor-de-espalda', 'dolor-lumbar', 'dolor-de-rodilla',
  'mareos-y-vertigo', 'dolor-de-cuello', 'dolor-muscular', 'dolor-abdominal',
  'dolor-de-garganta', 'dolor-de-hombro', 'dolor-de-rodilla-al-correr',
  'dolor-de-muela', 'dolor-de-oido', 'dolor-de-pie', 'dolor-de-tobillo',
  'dolor-en-el-costado', 'hormigueo-en-las-manos', 'cansancio-extremo',
  'dolor-al-tragar', 'palpitaciones', 'fiebre', 'nauseas', 'tos-persistente',
  'dificultad-para-dormir', 'vision-borrosa', 'sintomas-hantavirus',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  LOCALES.forEach(locale => {
    entries.push({
      url: `${BASE}/${locale}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    });
  });

  BLOG_SLUGS.forEach(slug => {
    LOCALES.forEach(locale => {
      entries.push({
        url: `${BASE}/${locale}/blog/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });
  });

  SYMPTOM_SLUGS.forEach(slug => {
    LOCALES.forEach(locale => {
      entries.push({
        url: `${BASE}/${locale}/sintomas/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  ['premium', 'perfil', 'reviews', 'privacidad', 'terminos'].forEach(page => {
    LOCALES.forEach(locale => {
      entries.push({
        url: `${BASE}/${locale}/${page}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    });
  });

  return entries;
}