import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Límites permanentes — no cambian con el interruptor
export const PLAN_LIMITS = {
  free:    { analyses_per_day: 3  },
  premium: { analyses_per_day: 10 },
};

export async function getUserPlan(userId: string): Promise<'free' | 'premium'> {
  try {
    const { data } = await supabaseAdmin
      .from('subscriptions')
      .select('plan, status, current_period_end')
      .eq('user_id', userId)
      .single();
    if (data?.plan === 'premium' && data?.status === 'active') {
      if (!data.current_period_end || new Date(data.current_period_end) > new Date()) {
        return 'premium';
      }
    }
  } catch {}
  return 'free';
}

export async function checkAndIncrementUsage(
  userId: string,
  plan: 'free' | 'premium'
): Promise<{ allowed: boolean; count: number; limit: number }> {
  const today = new Date().toISOString().split('T')[0];
  const limit = PLAN_LIMITS[plan].analyses_per_day;

  const { data } = await supabaseAdmin
    .from('usage_daily')
    .select('analyses_count')
    .eq('user_id', userId)
    .eq('date', today)
    .single();

  const currentCount = data?.analyses_count || 0;

  if (currentCount >= limit) {
    return { allowed: false, count: currentCount, limit };
  }

  await supabaseAdmin
    .from('usage_daily')
    .upsert(
      { user_id: userId, date: today, analyses_count: currentCount + 1 },
      { onConflict: 'user_id,date' }
    );

  return { allowed: true, count: currentCount + 1, limit };
}