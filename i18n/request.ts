import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // En next-intl v4 requestLocale es una Promise<string>
  let locale = await requestLocale;

  // Validar que sea un locale soportado, si no usar el default
  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    // ✅ Carga dinámica del archivo de mensajes correcto según el locale
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});