import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const LANGUAGE_NAMES = {
  es: 'Spanish',
  en: 'English',
  zh: 'Simplified Chinese',
  ru: 'Russian',
};

export async function POST(request) {
  try {
    const { text, sourceLocale } = await request.json();

    if (!text || text.trim().length < 3) {
      return NextResponse.json({ error: 'Text too short' }, { status: 400 });
    }

    const targets = Object.entries(LANGUAGE_NAMES)
      .filter(([code]) => code !== sourceLocale)
      .map(([code, name]) => `"${code}": "translation in ${name}"`)
      .join(', ');

    const message = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 600,
      messages: [{
        role: 'user',
        content: `Translate this user review into the specified languages. Return ONLY valid JSON, no explanation, no markdown.

Original (${LANGUAGE_NAMES[sourceLocale] || sourceLocale}): "${text}"

JSON format: {${targets}}`,
      }],
    });

    const raw = message.content[0]?.text || '{}';
    const clean = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const translations = JSON.parse(clean);
    translations[sourceLocale] = text;

    return NextResponse.json(translations);
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}