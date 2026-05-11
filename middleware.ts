import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Bloquear requests demasiado grandes en APIs (máx 50KB)
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 51200) {
      return NextResponse.json({ error: 'Request too large' }, { status: 413 });
    }
    // ✅ Dejar pasar las rutas API sin tocarlas
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  // ✅ Excluir api, _next, _vercel y archivos estáticos
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};