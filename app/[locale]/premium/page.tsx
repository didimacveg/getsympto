'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { PREMIUM_ENABLED } from '@/lib/flags';

const CONTENT = {
  es: {
    title: 'Elige tu plan',
    subtitle: 'Empieza gratis. Actualiza cuando lo necesites.',
    free_name: 'Gratis',
    free_period: '/mes',
    premium_name: 'Premium',
    premium_price: '€6.99',
    premium_period: '/mes',
    free_features: [
      '3 análisis por día',
      'Historial de informes',
      'Orientación informativa con IA',
      'Acceso en 4 idiomas',
    ],
    premium_features: [
      '10 análisis por día',
      'Reanálisis con seguimiento',
      'Descarga de informes en PDF',
      'Historial completo',
      'IA clínica avanzada',
      'Soporte prioritario',
    ],
    free_cta: 'Plan actual',
    premium_cta: 'Hazte Premium',
    login_cta: 'Inicia sesión para continuar',
    popular: 'Más popular',
    back: '← Volver',
    loading: 'Redirigiendo a Lemon Squeezy...',
    stripe_note: 'Pagos seguros con Lemon Squeezy · Cancela en cualquier momento',
    coming_soon: 'Próximamente',
    coming_soon_sub: 'El sistema de pagos estará disponible muy pronto.',
    already_premium: '¡Ya eres Premium! 🎉',
    already_premium_sub: 'Tienes acceso a todas las funciones.',
    go_profile: 'Ver mi perfil →',
  },
  en: {
    title: 'Choose your plan',
    subtitle: 'Start for free. Upgrade when you need it.',
    free_name: 'Free',
    free_period: '/month',
    premium_name: 'Premium',
    premium_price: '€6.99',
    premium_period: '/month',
    free_features: [
      '3 analyses per day',
      'Report history',
      'AI informational guidance',
      'Access in 4 languages',
    ],
    premium_features: [
      '10 analyses per day',
      'Re-analysis with follow-up',
      'PDF report download',
      'Full history',
      'Advanced clinical AI',
      'Priority support',
    ],
    free_cta: 'Current plan',
    premium_cta: 'Go Premium',
    login_cta: 'Log in to continue',
    popular: 'Most popular',
    back: '← Back',
    loading: 'Redirecting to Lemon Squeezy...',
    stripe_note: 'Secure payments with Lemon Squeezy · Cancel anytime',
    coming_soon: 'Coming soon',
    coming_soon_sub: 'The payment system will be available very soon.',
    already_premium: 'You\'re already Premium! 🎉',
    already_premium_sub: 'You have access to all features.',
    go_profile: 'View my profile →',
  },
  zh: {
    title: '选择您的计划',
    subtitle: '免费开始。需要时升级。',
    free_name: '免费',
    free_period: '/月',
    premium_name: '高级版',
    premium_price: '€6.99',
    premium_period: '/月',
    free_features: ['每天3次分析', '报告历史记录', 'AI信息指导', '4种语言访问'],
    premium_features: ['每天10次分析', '跟踪重新分析', 'PDF报告下载', '完整历史记录', '高级临床AI', '优先支持'],
    free_cta: '当前计划',
    premium_cta: '升级到高级版',
    login_cta: '登录继续',
    popular: '最受欢迎',
    back: '← 返回',
    loading: '重定向中...',
    stripe_note: 'Lemon Squeezy 安全支付 · 随时取消',
    coming_soon: '即将推出',
    coming_soon_sub: '付款系统即将推出。',
    already_premium: '您已是高级会员！🎉',
    already_premium_sub: '您可以使用所有功能。',
    go_profile: '查看我的个人资料 →',
  },
  ru: {
    title: 'Выберите план',
    subtitle: 'Начните бесплатно. Обновитесь когда нужно.',
    free_name: 'Бесплатно',
    free_period: '/мес',
    premium_name: 'Premium',
    premium_price: '€6.99',
    premium_period: '/мес',
    free_features: ['3 анализа в день', 'История отчётов', 'ИИ-рекомендации', 'Доступ на 4 языках'],
    premium_features: ['10 анализов в день', 'Повторный анализ', 'Скачивание PDF', 'Полная история', 'Расширенный клинический ИИ', 'Приоритетная поддержка'],
    free_cta: 'Текущий план',
    premium_cta: 'Перейти на Premium',
    login_cta: 'Войдите чтобы продолжить',
    popular: 'Популярный',
    back: '← Назад',
    loading: 'Перенаправление...',
    stripe_note: 'Безопасные платежи через Lemon Squeezy · Отмена в любое время',
    coming_soon: 'Скоро',
    coming_soon_sub: 'Система оплаты будет доступна очень скоро.',
    already_premium: 'Вы уже Premium! 🎉',
    already_premium_sub: 'У вас есть доступ ко всем функциям.',
    go_profile: 'Мой профиль →',
  },
};

export default function PremiumPage() {
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const c = CONTENT[locale as keyof typeof CONTENT] || CONTENT.es;
  const [loading, setLoading] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const upgraded = searchParams.get('upgraded') === 'true';

  useEffect(() => {
    if (user && PREMIUM_ENABLED) {
      supabase.from('subscriptions')
        .select('plan, status, current_period_end')
        .eq('user_id', user.id)
        .single()
        .then(({ data }) => {
          if (data?.plan === 'premium' && data?.status === 'active') {
            if (!data.current_period_end || new Date(data.current_period_end) > new Date()) {
              setIsPremium(true);
            }
          }
        });
    }
  }, [user]);

  const handleCheckout = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ locale }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error('No URL received');
    } catch (e) {
      console.error('Checkout error:', e);
      setLoading(false);
    }
  };

  // Si premium no está activado, muestra "próximamente"
  if (!PREMIUM_ENABLED) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <p className="text-5xl mb-4">🚀</p>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">{c.coming_soon}</h1>
          <p className="text-slate-500 text-sm mb-6">{c.coming_soon_sub}</p>
          <Link href={`/${locale}`} className="text-blue-600 hover:underline text-sm">{c.back}</Link>
        </div>
      </main>
    );
  }

  // Si ya es premium
  if (isPremium || upgraded) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <p className="text-5xl mb-4">✅</p>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">{c.already_premium}</h1>
          <p className="text-slate-500 text-sm mb-6">{c.already_premium_sub}</p>
          <Link
            href={`/${locale}/perfil`}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition inline-block"
          >
            {c.go_profile}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">

        <Link href={`/${locale}`} className="text-sm text-slate-400 hover:text-blue-600 transition mb-8 inline-block">
          {c.back}
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">{c.title}</h1>
          <p className="text-slate-500">{c.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">

          {/* Plan gratuito */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col">
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-1">{c.free_name}</h2>
              <div className="flex items-end gap-1 mb-5">
                <span className="text-3xl font-bold text-slate-900">€0</span>
                <span className="text-slate-400 text-sm mb-1">{c.free_period}</span>
              </div>
              <ul className="space-y-2.5 mb-6">
                {c.free_features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="text-green-500 font-bold shrink-0">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto w-full text-center py-2.5 rounded-xl border border-slate-200 text-sm text-slate-400 font-medium">
              {c.free_cta}
            </div>
          </div>

          {/* Plan premium */}
          <div className="bg-gradient-to-b from-blue-600 to-blue-700 rounded-3xl p-6 shadow-lg relative flex flex-col">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
              {c.popular}
            </span>
            <div>
              <h2 className="text-lg font-bold text-white mb-1">{c.premium_name}</h2>
              <div className="flex items-end gap-1 mb-5">
                <span className="text-3xl font-bold text-white">{c.premium_price}</span>
                <span className="text-blue-200 text-sm mb-1">{c.premium_period}</span>
              </div>
              <ul className="space-y-2.5 mb-6">
                {c.premium_features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-white">
                    <span className="text-blue-200 font-bold shrink-0">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto">
              {user ? (
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-white text-blue-700 font-bold py-2.5 rounded-xl text-sm hover:bg-blue-50 transition disabled:opacity-70"
                >
                  {loading ? c.loading : c.premium_cta}
                </button>
              ) : (
                <Link
                  href={`/${locale}`}
                  className="w-full bg-white text-blue-700 font-bold py-2.5 rounded-xl text-sm hover:bg-blue-50 transition block text-center"
                >
                  {c.login_cta}
                </Link>
              )}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-8">{c.stripe_note}</p>
      </div>
    </main>
  );
}