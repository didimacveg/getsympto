import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// ✅ FIX: usar el routing centralizado en lugar de duplicar la config
// Esto evita inconsistencias entre middleware y request.ts
export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};