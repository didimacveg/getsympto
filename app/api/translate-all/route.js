import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const LANGUAGES = { es: 'Spanish', en: 'English', zh: 'Simplified Chinese', ru: 'Russian' };
const ALL_LOCALES = ['es', 'en', 'zh', 'ru'];
const ADMIN_SECRET = process.env.ADMIN_SECRET;

// Solo permite 1 ejecución cada 10 minutos para evitar abuso
let lastRun = 0;
const MIN_INTERVAL_MS = 10 * 60 * 1000;

async function translateReview(text, sourceLocale) {
  const targets = Object.entries(LANGUAGES)
    .filter(([code]) => code !== sourceLocale)
    .map(([code, name]) => `"${code}": "translation in ${name}"`)
    .join(', ');

  const message = await client.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 800,
    messages: [{
      role: 'user',
      content: `Translate this review. Return ONLY valid JSON.

Original (${LANGUAGES[sourceLocale] || sourceLocale}): "${text}"

JSON format: {${targets}}`,
    }],
  });

  const raw = message.content[0]?.text || '{}';
  const clean = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  const translations = JSON.parse(clean);
  translations[sourceLocale] = text;
  return translations;
}

export async function GET(request) {
  // 1 — Autenticación con secret token
  if (!ADMIN_SECRET) {
    return NextResponse.json({ error: 'Admin secret not configured' }, { status: 500 });
  }

  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${ADMIN_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2 — Throttle: máx 1 ejecución cada 10 minutos
  const now = Date.now();
  if (now - lastRun < MIN_INTERVAL_MS) {
    const waitSeconds = Math.ceil((MIN_INTERVAL_MS - (now - lastRun)) / 1000);
    return NextResponse.json({ error: `Too soon. Wait ${waitSeconds}s before retrying.` }, { status: 429 });
  }
  lastRun = now;

  try {
    const { data: reviews, error } = await supabase
      .from('reviews')
      .select('id, comment, locale, translations');

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const needsTranslation = reviews.filter(r => {
      const t = r.translations || {};
      return ALL_LOCALES.some(l => !t[l]);
    });

    if (needsTranslation.length === 0) {
      return NextResponse.json({ message: 'All reviews already translated', count: 0 });
    }

    const results = [];
    for (const review of needsTranslation) {
      try {
        const translations = await translateReview(review.comment, review.locale || 'es');
        await supabase.from('reviews').update({ translations }).eq('id', review.id);
        results.push({ id: review.id, status: 'ok' });
      } catch (e) {
        results.push({ id: review.id, status: 'error', error: e instanceof Error ? e.message : 'unknown' });
      }
    }

    return NextResponse.json({ message: 'Done', translated: results.length, results });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Unknown error' }, { status: 500 });
  }
}