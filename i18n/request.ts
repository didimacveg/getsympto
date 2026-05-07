import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // ✅ FIX: validar que el locale sea uno de los soportados,
  // y hacer fallback a 'es' si no lo es o si viene undefined
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as typeof routing.locales[number])) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});