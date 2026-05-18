import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Permitir bots de Google y Bing
      {
        userAgent: ['Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot'],
        allow: '/',
        disallow: ['/api/', '/perfil', '/_next/'],
      },
      // Bloquear bots de SEO agresivos que consumen recursos
      {
        userAgent: ['SemrushBot', 'AhrefsBot', 'MJ12bot', 'DotBot', 'BLEXBot'],
        disallow: '/',
      },
      // Regla general para el resto
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/perfil',
          '/_next/',
          '/static/',
        ],
      },
    ],
    sitemap: 'https://www.getsympto.app/sitemap.xml',
    host: 'https://www.getsympto.app',
  };
}