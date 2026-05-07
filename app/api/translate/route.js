import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const VALID_LOCALES = ['es', 'en', 'zh', 'ru'];
const LANGUAGE_NAMES = {
  es: 'Spanish',
  en: 'English',
  zh: 'Simplified Chinese',
  ru: 'Russian',
};

// Rate limiting en memoria
const translateLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hora
  const maxRequests = 5; // máx 5 traducciones por hora por IP
  const history = (translateLog.get(ip) || []).filter(t => now - t < windowMs);
  if (history.length >= maxRequests) return true;
  history.push(now);
  translateLog.set(ip, history);
  return false;
}

function containsInjection(text) {
  const patterns = [
    /<[^>]*>/,
    /javascript:/i,
    /SELECT.*FROM/i,
    /DROP.*TABLE/i,
    /ignore.*instructions/i,
    /system.*prompt/i,
    /\[INST\]/i,
  ];
  return patterns.some(p => p.test(text));
}

export async function POST(request) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { text, sourceLocale } = body;

  // Validaciones estrictas
  if (!text || typeof text !== 'string') {
    return NextResponse.json({ error: 'Invalid text' }, { status: 400 });
  }

  const trimmed = text.trim();

  if (trimmed.length < 3) {
    return NextResponse.json({ error: 'Text too short' }, { status: 400 });
  }

  if (trimmed.length > 600) {
    return NextResponse.json({ error: 'Text too long (max 600 chars)' }, { status: 400 });
  }

  if (!VALID_LOCALES.includes(sourceLocale)) {
    return NextResponse.json({ error: 'Invalid source locale' }, { status: 400 });
  }

  if (containsInjection(trimmed)) {
    return NextResponse.json({ error: 'Invalid text content' }, { status: 400 });
  }

  try {
    const targets = Object.entries(LANGUAGE_NAMES)
      .filter(([code]) => code !== sourceLocale)
      .map(([code, name]) => `"${code}": "translation in ${name}"`)
      .join(', ');

    const message = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 800,
      messages: [{
        role: 'user',
        content: `Translate this user review into the specified languages. Return ONLY valid JSON, no explanation, no markdown.

Original (${LANGUAGE_NAMES[sourceLocale]}): "${trimmed}"

JSON format: {${targets}}`,
      }],
    });

    const raw = message.content[0]?.text || '{}';
    const clean = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const translations = JSON.parse(clean);
    translations[sourceLocale] = trimmed;

    return NextResponse.json(translations);
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}