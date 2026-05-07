import { SYMPTOM_SLUGS } from '@/lib/symptoms-data';

export default function sitemap() {
  const baseUrl = 'https://getsympto.app';
  const locales = ['es', 'en', 'zh', 'ru'];
  const lastModified = new Date();

  const blogSlugs = [
    'dolor-pecho-al-respirar',
    'dolor-cabeza-detras-ojos',
    'dolor-lado-derecho-abdomen',
    'dolor-espalda-baja-lumbar',
    'dolor-rodilla-al-bajar-escaleras',
    'dolor-hombro-brazo-izquierdo',
  ];

  const routes = [
    // Página principal
    { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1 },

    // Páginas principales por locale
    ...locales.map(locale => ({
      url: `${baseUrl}/${locale}`,
      lastModified, changeFrequency: 'weekly', priority: 0.95,
    })),

    // Índices de síntomas por locale
    ...locales.map(locale => ({
      url: `${baseUrl}/${locale}/sintomas`,
      lastModified, changeFrequency: 'weekly', priority: 0.9,
    })),

    // Blog por locale
    ...locales.map(locale => ({
      url: `${baseUrl}/${locale}/blog`,
      lastModified, changeFrequency: 'weekly', priority: 0.9,
    })),

    // Artículos del blog por locale
    ...locales.flatMap(locale =>
      blogSlugs.map(slug => ({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified, changeFrequency: 'monthly', priority: 0.8,
      }))
    ),

    // Páginas de síntomas por locale
    ...locales.flatMap(locale =>
      SYMPTOM_SLUGS.map(slug => ({
        url: `${baseUrl}/${locale}/sintomas/${slug}`,
        lastModified, changeFrequency: 'monthly', priority: 0.85,
      }))
    ),
  ];

  return routes;
}