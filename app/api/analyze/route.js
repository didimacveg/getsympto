import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { validateInput } from '@/lib/security';
import { SYSTEM_PROMPT, buildUserPrompt } from '@/lib/prompts';
import { getUserPlan, checkAndIncrementUsage } from '@/lib/subscription';
import { analyzeRatelimit } from '@/lib/ratelimit';

const LIMIT_MESSAGES = {
  es: (limit, isPremium) => isPremium
    ? `Has alcanzado el límite de ${limit} análisis diarios de tu plan. Vuelve mañana.`
    : `Has alcanzado el límite de ${limit} análisis diarios del plan gratuito. Vuelve mañana.`,
  en: (limit, isPremium) => isPremium
    ? `You have reached the daily limit of ${limit} analyses. Come back tomorrow.`
    : `You have reached the daily limit of ${limit} analyses on the free plan. Come back tomorrow.`,
  zh: (limit) => `您已达到每日${limit}次分析的限制。明天再来。`,
  ru: (limit) => `Вы достигли лимита в ${limit} анализов в день. Возвращайтесь завтра.`,
};

export async function POST(request) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const authHeader = request.headers.get('authorization');

  // Rate limiting con Upstash (reemplaza el Map en memoria)
  const identifier = authHeader
    ? `user_${authHeader.replace('Bearer ', '').slice(-8)}`  // usuario autenticado: por token
    : `ip_${ip}`;                                             // anónimo: por IP

  const { success, limit, remaining } = await analyzeRatelimit.limit(identifier);
  if (!success) {
    return NextResponse.json(
      { error: 'Has realizado demasiadas consultas. Espera antes de continuar.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
        },
      }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 });
  }

  const { zones, zone, description, duration, intensity, locale = 'es' } = body;

  // Límite de uso: siempre activo para usuarios autenticados
  if (authHeader) {
    try {
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
      return NextResponse.json({ error: 'Error procesando la respuesta. Inténtalo de nuevo.' }, { status: 500 });
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Claude API error:', error);
    return NextResponse.json({ error: 'Servicio temporalmente no disponible.' }, { status: 503 });
  }
}