import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  const variantId = process.env.LEMONSQUEEZY_VARIANT_ID;

  // Verificar que las vars existen
  if (!apiKey || apiKey === 'placeholder') {
    return NextResponse.json({ error: 'API key missing' });
  }

  // Llamar a la API de Lemon Squeezy para ver si la key es válida
  const res = await fetch('https://api.lemonsqueezy.com/v1/stores', {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'application/vnd.api+json',
    },
  });

  const data = await res.json();

  return NextResponse.json({
    status: res.status,
    ok: res.ok,
    storeId,
    variantId,
    apiKeyPrefix: apiKey.slice(0, 10) + '...',
    response: data,
  });
}