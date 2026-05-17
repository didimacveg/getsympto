import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, severity, zone, description, locale } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const remindAt = new Date();
    remindAt.setHours(remindAt.getHours() + 24);

    await supabase.from('symptom_tracking').insert({
      email,
      severity,
      zone,
      description: description?.slice(0, 500),
      locale,
      remind_at: remindAt.toISOString(),
      reminded: false,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Track symptom error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}