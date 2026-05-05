export default function sitemap() {
  const baseUrl = 'https://getsympto.app';
  const locales = ['es', 'en', 'zh', 'ru'];
  const lastModified = new Date();
  const slugs = [
    'dolor-pecho-al-respirar',
    'dolor-cabeza-detras-ojos',
    'dolor-lado-derecho-abdomen',
    'dolor-espalda-baja-lumbar',
    'dolor-rodilla-al-bajar-escaleras',
    'dolor-hombro-brazo-izquierdo',
  ];

  const routes = [
    { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1 },
    ...locales.map(locale => ({
      url: `${baseUrl}/${locale}`,
      lastModified, changeFrequency: 'weekly', priority: 0.95,
    })),
    ...locales.map(locale => ({
      url: `${baseUrl}/${locale}/blog`,
      lastModified, changeFrequency: 'weekly', priority: 0.9,
    })),
    ...locales.flatMap(locale =>
      slugs.map(slug => ({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified, changeFrequency: 'monthly', priority: 0.8,
      }))
    ),
  ];

  return routes;
}