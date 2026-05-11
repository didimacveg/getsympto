import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    if (!process.env.LEMONSQUEEZY_API_KEY || process.env.LEMONSQUEEZY_API_KEY === 'placeholder') {
      return NextResponse.json({ error: 'Payment not configured' }, { status: 500 });
    }

    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');

    // ✅ createClient dentro de la función
    const { createClient } = await import('@supabase/supabase-js');
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: { user } } = await supabaseAdmin.auth.getUser(token);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let locale = 'es';
    try {
      const body = await request.json();
      locale = body.locale || 'es';
    } catch {
      // locale por defecto
    }

    const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: 'checkouts',
          attributes: {
            checkout_data: {
              email: user.email,
              custom: { user_id: user.id },
            },
            product_options: {
              redirect_url: `https://www.getsympto.app/${locale}/premium?upgraded=true`,
            },
          },
          relationships: {
            store: {
              data: {
                type: 'stores',
                id: String(process.env.LEMONSQUEEZY_STORE_ID),
              },
            },
            variant: {
              data: {
                type: 'variants',
                id: String(process.env.LEMONSQUEEZY_VARIANT_ID),
              },
            },
          },
        },
      }),
    });

    const checkout = await response.json();

    if (!response.ok) {
      console.error('❌ Lemon Squeezy error:', JSON.stringify(checkout));
      return NextResponse.json({ error: 'Checkout creation failed' }, { status: 500 });
    }

    const url = checkout.data?.attributes?.url;
    if (!url) {
      console.error('❌ No URL en respuesta:', JSON.stringify(checkout));
      return NextResponse.json({ error: 'No checkout URL received' }, { status: 500 });
    }

    return NextResponse.json({ url });

  } catch (error) {
    console.error('❌ Error inesperado en checkout:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}