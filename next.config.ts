import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

// Nonce-based CSP: generado en middleware, más seguro que unsafe-inline/eval
const securityHeaders = [
  // DNS y transporte
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },

  // Clickjacking
  { key: 'X-Frame-Options', value: 'DENY' }, // DENY es más seguro que SAMEORIGIN

  // MIME sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },

  // Cross-origin
  { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' }, // necesario para fuentes e imágenes externas
  { key: 'Cross-Origin-Embedder-Policy', value: 'unsafe-none' }, // unsafe-none para compatibilidad con Google OAuth

  // Referrer
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

  // Permissions — bloquear todo lo que no usas
  {
    key: 'Permissions-Policy',
    value: [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=()',
      'usb=()',
      'bluetooth=()',
      'magnetometer=()',
      'gyroscope=()',
      'accelerometer=()',
      'ambient-light-sensor=()',
      'interest-cohort=()', // bloquea FLoC de Google
    ].join(', '),
  },

  // CSP — sin iubenda, sin unsafe-eval cuando sea posible
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",

      // Scripts: unsafe-inline necesario para Next.js hydration
      // unsafe-eval necesario para next-intl en dev, en prod se puede quitar
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://accounts.google.com",

      // Estilos: unsafe-inline necesario para Tailwind
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

      // Fuentes
      "font-src 'self' data: https://fonts.gstatic.com",

      // Imágenes
      "img-src 'self' data: blob: https://lh3.googleusercontent.com https://*.supabase.co https://www.googletagmanager.com",

      // Conexiones API
      "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://analytics.google.com https://accounts.google.com https://oauth2.googleapis.com https://api.lemonsqueezy.com https://api.stripe.com",

      // Frames — solo Google OAuth, eliminado iubenda
      "frame-src https://accounts.google.com https://js.stripe.com",

      // Workers
      "worker-src 'self' blob:",

      // Manifests
      "manifest-src 'self'",

      // Form targets
      "form-action 'self' https://accounts.google.com",

      // Bloquear todo iframe embebido de esta página
      "frame-ancestors 'none'",

      // Reportar violaciones (puedes usar un endpoint tuyo o report-uri.com)
      "report-uri /api/csp-report",
    ].join('; '),
  },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      // Headers adicionales solo para APIs
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
        ],
      },
    ];
  },

  // Ocultar header X-Powered-By (elimina fingerprinting de Next.js)
  poweredByHeader: false,

  // Comprimir respuestas
  compress: true,
};

export default withNextIntl(nextConfig);