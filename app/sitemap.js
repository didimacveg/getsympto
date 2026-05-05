export default function sitemap() {
  const baseUrl = 'https://getsympto.app';
  const lastModified = new Date();

  const routes = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/dolor-pecho-al-respirar`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/dolor-cabeza-detras-ojos`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/dolor-lado-derecho-abdomen`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/dolor-espalda-baja-lumbar`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/dolor-rodilla-al-bajar-escaleras`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/dolor-hombro-brazo-izquierdo`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  return routes;
}