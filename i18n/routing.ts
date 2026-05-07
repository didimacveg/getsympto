import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en', 'zh', 'ru'],
  defaultLocale: 'es',
  localeDetection: true,
});