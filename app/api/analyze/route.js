import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import { validateInput } from '@/lib/security';
import { SYSTEM_PROMPT, buildUserPrompt } from '@/lib/prompts';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Rate limiting simple en memoria (suficiente para MVP)
const requestLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hora
  const maxRequests = 10;
  
  const history = (requestLog.get(ip) || []).filter(t => now - t < windowMs);
  if (history.length >= maxRequests) return true;
  
  history.push(now);
  requestLog.set(ip, history);
  return false;
}

export async function POST(request) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Has realizado demasiadas consultas. Espera un momento antes de continuar.' },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 });
  }

  const { zone, description, duration, intensity } = body;

  // Validación y sanitización
  const validation = validateInput({ zone, description });
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  // Llamada a Claude
  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      temperature: 0.3, // Respuestas más conservadoras y consistentes
      system: SYSTEM_PROMPT,
      messages: [{
        role: 'user',
        content: buildUserPrompt({ zone, description: validation.description, duration, intensity })
      }],
    });

    const responseText = message.content[0]?.text || '';
    
    // Parse del JSON con fallback
    let parsed;
    try {
      // Limpia posibles backticks si la IA los incluye
      const clean = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(clean);
    } catch {
      console.error('JSON parse error:', responseText);
      return NextResponse.json(
        { error: 'Error procesando la respuesta. Inténtalo de nuevo.' },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);

  } catch (error) {
    console.error('Claude API error:', error);
    return NextResponse.json(
      { error: 'Servicio temporalmente no disponible. Inténtalo en unos minutos.' },
      { status: 503 }
    );
  }
}