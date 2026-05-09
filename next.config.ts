import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // ✅ FIX: añadido accounts.google.com para que el popup/redirect de OAuth funcione
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.iubenda.com https://www.googletagmanager.com https://accounts.google.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      // ✅ FIX: añadido lh3.googleusercontent.com para avatares de Google
      "img-src 'self' data: blob: https://lh3.googleusercontent.com",
      "img-src 'self' data: blob: https://lh3.googleusercontent.com https://*.supabase.co",
      // ✅ FIX: añadido accounts.google.com y googleapis para el flujo OAuth
      "connect-src 'self' https://api.anthropic.com https://*.supabase.co https://www.google-analytics.com https://accounts.google.com https://oauth2.googleapis.com",
      // ✅ FIX: añadido accounts.google.com en frame-src para el popup OAuth de Google
      "frame-src https://www.iubenda.com https://accounts.google.com",
    ].join('; '),
  },
];

const nextConfig = {
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);