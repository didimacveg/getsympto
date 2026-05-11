import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-signature');
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

    // Verificar firma
    if (!secret || !signature) {
      console.error('❌ Webhook: missing secret or signature');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(rawBody);
    const digest = hmac.digest('hex');

    if (digest !== signature) {
      console.error('❌ Webhook: invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta?.event_name;
    const data = payload.data;

    console.log('✅ Webhook recibido:', eventName);

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Obtener user_id del custom data
    const userId = data?.attributes?.first_order_item?.order_id
      ? payload.meta?.custom_data?.user_id
      : payload.meta?.custom_data?.user_id;

    if (!userId) {
      console.error('❌ Webhook: no user_id en custom_data', payload.meta);
      return NextResponse.json({ error: 'No user_id' }, { status: 400 });
    }

    const status = data?.attributes?.status;
    const endsAt = data?.attributes?.ends_at;
    const renewsAt = data?.attributes?.renews_at;
    const lsSubscriptionId = String(data?.id || '');
    const lsCustomerId = String(data?.attributes?.customer_id || '');

    if (eventName === 'subscription_created' || eventName === 'subscription_updated') {
      const isActive = status === 'active';
      const periodEnd = endsAt || renewsAt || null;

      const { error } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: userId,
          stripe_subscription_id: lsSubscriptionId,
          stripe_customer_id: lsCustomerId,
          plan: isActive ? 'premium' : 'free',
          status: isActive ? 'active' : status,
          current_period_end: periodEnd,
        }, { onConflict: 'user_id' });

      if (error) {
        console.error('❌ Supabase upsert error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      console.log(`✅ Subscription ${eventName} para user ${userId} — plan: ${isActive ? 'premium' : 'free'}`);
    }

    if (eventName === 'subscription_cancelled' || eventName === 'subscription_expired') {
      const { error } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: userId,
          stripe_subscription_id: lsSubscriptionId,
          stripe_customer_id: lsCustomerId,
          plan: 'free',
          status: status || 'cancelled',
          current_period_end: endsAt || null,
        }, { onConflict: 'user_id' });

      if (error) {
        console.error('❌ Supabase upsert error:', error.message);
      }

      console.log(`✅ Subscription ${eventName} para user ${userId} — bajado a free`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}