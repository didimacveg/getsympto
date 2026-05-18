import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import { validateInput } from '@/lib/security';
import { SYSTEM_PROMPT, buildUserPrompt } from '@/lib/prompts';
import { getUserPlan, checkAndIncrementUsage } from '@/lib/subscription';
import { sanitizeDescription, sanitizeZone, sanitizeLocale } from '@/lib/sanitize';

const requestLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const maxRequests = 30;
  const history = (requestLog.get(ip) || []).filter(t => now - t < windowMs);
  if (history.length >= maxRequests) return true;
  history.push(now);
  requestLog.set(ip, history);
  return false;
}

const LIMIT_MESSAGES = {
  es: (limit, isPremium) => isPremium
    ? `Has alcanzado el límite de ${limit} análisis diarios. Vuelve mañana.`
    : `Has alcanzado el límite de ${limit} análisis del plan gratuito. Vuelve mañana.`,
  en: (limit, isPremium) => isPremium
    ? `You have reached the daily limit of ${limit} analyses. Come back tomorrow.`
    : `You have reached the daily limit of ${limit} analyses on the free plan. Come back tomorrow.`,
  zh: (limit) => `您已达到每日${limit}次分析的限制。明天再来。`,
  ru: (limit) => `Вы достигли лимита в ${limit} анализов в день. Возвращайтесь завтра.`,
};

export async function POST(request) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Demasiadas solicitudes. Inténtalo más tarde.' }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 });
  }

  // ✅ Sanitizar todos los inputs antes de cualquier procesamiento
  const rawZones = Array.isArray(body.zones) ? body.zones : (body.zone ? [body.zone] : []);
  const zones = rawZones.map(z => sanitizeZone(String(z))).filter(Boolean).slice(0, 5);
  const zone = zones[0] || '';
  const description = sanitizeDescription(String(body.description || ''));
  const locale = sanitizeLocale(String(body.locale || 'es'));
  const duration = body.duration ? String(body.duration).slice(0, 100) : undefined;
  const intensity = body.intensity ? String(body.intensity).slice(0, 50) : undefined;

  // Validación básica después de sanitizar
  if (!description || description.length < 3) {
    return NextResponse.json({ error: 'Descripción demasiado corta.' }, { status: 400 });
  }
  if (zones.length === 0) {
    return NextResponse.json({ error: 'Selecciona al menos una zona.' }, { status: 400 });
  }

  // Verificar autenticación y límites
  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );
      const token = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabaseAdmin.auth.getUser(token);
      if (user) {
        const plan = await getUserPlan(user.id);
        const usage = await checkAndIncrementUsage(user.id, plan);
        if (!usage.allowed) {
          const msg = LIMIT_MESSAGES[locale] || LIMIT_MESSAGES.es;
          return NextResponse.json(
            { error: msg(usage.limit, plan === 'premium'), upgrade_required: plan === 'free' },
            { status: 429 }
          );
        }
      }
    } catch (e) {
      console.error('Auth check error:', e);
    }
  }

  const validation = validateInput({ zones, zone, description });
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 2048,
      temperature: 0.3,
      system: SYSTEM_PROMPT,
      messages: [{
        role: 'user',
        content: buildUserPrompt({
          zones: validation.zones,
          description: validation.description,
          duration,
          intensity,
          locale,
        }),
      }],
    });

    const responseText = message.content[0]?.text || '';
    let parsed;
    try {
      const clean = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(clean);
    } catch {
      console.error('JSON parse error:', responseText);
      return NextResponse.json({ error: 'Error procesando la respuesta. Inténtalo de nuevo.' }, { status: 500 });
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Claude API error:', error);
    return NextResponse.json({ error: 'Servicio temporalmente no disponible.' }, { status: 503 });
  }
}