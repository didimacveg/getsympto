import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

// ── Rate limiting en memoria ──────────────────────────────────────────
// Para producción a escala usa Upstash Redis, pero esto funciona bien en Vercel
const ipRequests = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMITS = {
  '/api/analyze':  { limit: 20,  windowMs: 60_000 },  // 20 req/min por IP
  '/api/checkout': { limit: 5,   windowMs: 60_000 },  // 5 req/min por IP
  '/api/webhook':  { limit: 30,  windowMs: 60_000 },  // 30 req/min (Lemon/Stripe)
  '/api/':         { limit: 60,  windowMs: 60_000 },  // cualquier otra API: 60 req/min
};

// Limpiar entradas antiguas cada 5 min para evitar memory leak
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    ipRequests.forEach((v, k) => {
      if (now > v.resetAt) ipRequests.delete(k);
    });
  }, 300_000);
}

function getIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const real = request.headers.get('x-real-ip');
  if (forwarded) return forwarded.split(',')[0].trim();
  if (real) return real.trim();
  return 'unknown';
}

function checkRateLimit(ip: string, path: string): boolean {
  // Encontrar el límite aplicable
  let rateConfig = RATE_LIMITS['/api/'];
  for (const [route, config] of Object.entries(RATE_LIMITS)) {
    if (path.startsWith(route) && route !== '/api/') {
      rateConfig = config;
      break;
    }
  }

  const key = `${ip}:${path.split('/').slice(0, 3).join('/')}`;
  const now = Date.now();
  const entry = ipRequests.get(key);

  if (!entry || now > entry.resetAt) {
    ipRequests.set(key, { count: 1, resetAt: now + rateConfig.windowMs });
    return true;
  }

  if (entry.count >= rateConfig.limit) return false;
  entry.count++;
  return true;
}

// ── Bots maliciosos conocidos ────────────────────────────────────────
const BAD_BOTS = [
  'sqlmap', 'nikto', 'nmap', 'masscan', 'zgrab',
  'dirbuster', 'gobuster', 'wfuzz', 'burpsuite',
  'python-requests', 'curl/7', 'wget/',
  'scrapy', 'semrushbot', 'ahrefsbot', 'mj12bot',
  'dotbot', 'rogerbot', 'exabot', 'blexbot',
];

function isBadBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BAD_BOTS.some(bot => ua.includes(bot));
}

// ── Paths sospechosos (intentos de pentesting/hacking) ───────────────
const SUSPICIOUS_PATHS = [
  '/wp-admin', '/wp-login', '/phpmyadmin', '/.env',
  '/admin', '/config', '/.git', '/etc/passwd',
  '/cgi-bin', '/shell', '/cmd', '/exec',
  '/../', '/..%2f', '%2e%2e', 'union+select',
  '<script', 'javascript:', 'vbscript:',
];

function isSuspiciousPath(pathname: string): boolean {
  const lower = pathname.toLowerCase();
  return SUSPICIOUS_PATHS.some(p => lower.includes(p));
}

// ── Input sanitización en body ────────────────────────────────────────
function hasMaliciousPayload(url: URL): boolean {
  const params = url.searchParams.toString().toLowerCase();
  const malicious = ['<script', 'javascript:', 'union select', 'drop table', '../', '%00'];
  return malicious.some(m => params.includes(m));
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = getIp(request);
  const userAgent = request.headers.get('user-agent');

  // ── 1. Bloquear bots maliciosos ──────────────────────────────────
  if (isBadBot(userAgent)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // ── 2. Bloquear paths sospechosos ────────────────────────────────
  if (isSuspiciousPath(pathname)) {
    console.warn(`[SECURITY] Suspicious path from ${ip}: ${pathname}`);
    return new NextResponse('Not Found', { status: 404 });
  }

  // ── 3. Bloquear query params maliciosos ──────────────────────────
  if (hasMaliciousPayload(request.nextUrl)) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  // ── 4. Gestión de rutas API ──────────────────────────────────────
  if (pathname.startsWith('/api/')) {
    // Bloquear requests demasiado grandes
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 51200) {
      return NextResponse.json({ error: 'Request too large' }, { status: 413 });
    }

    // Rate limiting por IP
    if (!checkRateLimit(ip, pathname)) {
      console.warn(`[RATE LIMIT] IP ${ip} bloqueada en ${pathname}`);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Limit': '20',
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    // Verificar Content-Type en POST/PUT
    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      const contentType = request.headers.get('content-type');
      if (contentType && !contentType.includes('application/json') && !contentType.includes('text/plain')) {
        // Permitir webhooks con vnd.api+json
        if (!contentType.includes('vnd.api')) {
          return NextResponse.json({ error: 'Invalid Content-Type' }, { status: 415 });
        }
      }
    }

    return NextResponse.next();
  }

  // ── 5. Internacionalización para el resto ────────────────────────
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};