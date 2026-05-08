import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Tip de la semana — rota por número de semana
const WEEKLY_TIPS = {
  es: [
    { tip: 'El dolor de espalda baja afecta al 80% de las personas en algún momento de su vida. Caminar 20 minutos al día puede reducirlo significativamente.', emoji: '🚶' },
    { tip: 'La deshidratación es una de las causas más comunes de dolor de cabeza. Antes de buscar otra causa, bebe un vaso de agua y espera 20 minutos.', emoji: '💧' },
    { tip: 'El estrés crónico puede manifestarse como dolor físico real: tensión en el cuello, problemas digestivos o palpitaciones. No lo ignores.', emoji: '🧘' },
    { tip: 'El dolor que despierta por la noche sin causa clara es siempre una señal de que vale la pena consultar con un médico.', emoji: '🌙' },
  ],
  en: [
    { tip: 'Lower back pain affects 80% of people at some point in their lives. Walking 20 minutes a day can significantly reduce it.', emoji: '🚶' },
    { tip: 'Dehydration is one of the most common causes of headache. Before looking for another cause, drink a glass of water and wait 20 minutes.', emoji: '💧' },
    { tip: 'Chronic stress can manifest as real physical pain: neck tension, digestive issues or palpitations. Don\'t ignore it.', emoji: '🧘' },
    { tip: 'Pain that wakes you at night without a clear cause is always a sign worth consulting a doctor about.', emoji: '🌙' },
  ],
  zh: [
    { tip: '80%的人在一生中某个时刻会遭受下背部疼痛。每天步行20分钟可以显著减轻疼痛。', emoji: '🚶' },
    { tip: '脱水是头痛最常见的原因之一。在寻找其他原因之前，先喝一杯水，等待20分钟。', emoji: '💧' },
    { tip: '慢性压力可以表现为真实的身体疼痛：颈部紧张、消化问题或心悸。不要忽视它。', emoji: '🧘' },
    { tip: '夜间无明显原因的疼痛总是值得咨询医生的信号。', emoji: '🌙' },
  ],
  ru: [
    { tip: 'Боль в пояснице в какой-то момент жизни испытывают 80% людей. Ежедневная 20-минутная ходьба может значительно снизить её.', emoji: '🚶' },
    { tip: 'Обезвоживание — одна из самых распространённых причин головной боли. Прежде чем искать другую причину, выпейте стакан воды и подождите 20 минут.', emoji: '💧' },
    { tip: 'Хронический стресс может проявляться как реальная физическая боль: напряжение в шее, проблемы с пищеварением или сердцебиение. Не игнорируйте это.', emoji: '🧘' },
    { tip: 'Боль, которая будит вас ночью без видимой причины, всегда является сигналом, заслуживающим консультации врача.', emoji: '🌙' },
  ],
};

const WEEKLY_CONFIG = {
  es: {
    subject: '💡 Tu consejo de salud semanal — Sympto+',
    greeting: (name: string) => `Hola${name ? `, ${name}` : ''}`,
    tip_title: 'Dato de salud de esta semana',
    cta: 'Analizar un síntoma',
    ctaUrl: 'https://getsympto.app/es',
    reminder: '¿Has sentido algo esta semana? Analizamos tu síntoma en 30 segundos.',
    footer: 'Recibes este email porque estás registrado en Sympto+.',
  },
  en: {
    subject: '💡 Your weekly health tip — Sympto+',
    greeting: (name: string) => `Hi${name ? `, ${name}` : ''}`,
    tip_title: 'Health fact of the week',
    cta: 'Analyse a symptom',
    ctaUrl: 'https://getsympto.app/en',
    reminder: 'Felt something this week? We analyse your symptom in 30 seconds.',
    footer: 'You receive this email because you are registered at Sympto+.',
  },
  zh: {
    subject: '💡 您的每周健康建议 — Sympto+',
    greeting: (name: string) => `你好${name ? `，${name}` : ''}`,
    tip_title: '本周健康知识',
    cta: '分析症状',
    ctaUrl: 'https://getsympto.app/zh',
    reminder: '本周有不适吗？30秒内分析您的症状。',
    footer: '您收到此邮件是因为您在 Sympto+ 注册了账户。',
  },
  ru: {
    subject: '💡 Ваш еженедельный совет по здоровью — Sympto+',
    greeting: (name: string) => `Привет${name ? `, ${name}` : ''}`,
    tip_title: 'Факт о здоровье этой недели',
    cta: 'Анализировать симптом',
    ctaUrl: 'https://getsympto.app/ru',
    reminder: 'Что-то почувствовали на этой неделе? Мы анализируем симптом за 30 секунд.',
    footer: 'Вы получаете это письмо, так как зарегистрированы на Sympto+.',
  },
};

function getWeekNumber(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  return Math.floor((now.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000));
}

function buildWeeklyHtml(locale: string, name: string, tip: { tip: string; emoji: string }): string {
  const c = WEEKLY_CONFIG[locale as keyof typeof WEEKLY_CONFIG] || WEEKLY_CONFIG.es;

  return `<!DOCTYPE html>
<html lang="${locale}">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- HEADER -->
  <tr><td style="background:linear-gradient(135deg,#1d4ed8 0%,#2563eb 60%,#3b82f6 100%);border-radius:16px 16px 0 0;padding:28px 40px;text-align:center;">
    <span style="color:#fff;font-size:18px;font-weight:800;letter-spacing:-0.5px;">S+ Sympto+</span>
  </td></tr>

  <!-- BODY -->
  <tr><td style="background:#ffffff;padding:36px 40px;">

    <p style="color:#1e293b;font-size:16px;font-weight:600;margin:0 0 24px;">${c.greeting(name)} 👋</p>

    <!-- Tip card -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:14px;margin-bottom:28px;">
    <tr><td style="padding:24px;">
      <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#3b82f6;text-transform:uppercase;letter-spacing:1px;">${c.tip_title}</p>
      <p style="margin:0;font-size:15px;color:#1e3a8a;line-height:1.6;">
        <span style="font-size:24px;display:block;margin-bottom:8px;">${tip.emoji}</span>
        ${tip.tip}
      </p>
    </td></tr>
    </table>

    <!-- Reminder -->
    <p style="color:#475569;font-size:14px;line-height:1.6;margin:0 0 28px;">${c.reminder}</p>

    <!-- CTA -->
    <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center">
      <a href="${c.ctaUrl}" style="display:inline-block;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:12px;">
        ${c.cta} →
      </a>
    </td></tr>
    </table>

  </td></tr>

  <!-- FOOTER -->
  <tr><td style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:0 0 16px 16px;padding:16px 40px;text-align:center;">
    <p style="margin:0;font-size:11px;color:#94a3b8;">${c.footer}</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

export async function GET(request: Request) {
  // Proteger el endpoint con CRON_SECRET
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Obtener todos los usuarios de profiles
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('id, email, name, language');

    if (error) throw new Error(error.message);
    if (!profiles?.length) return NextResponse.json({ message: 'No users', sent: 0 });

    const weekNum = getWeekNumber();
    const results: { email: string; status: string }[] = [];

    for (const profile of profiles) {
      if (!profile.email) continue;

      const locale = profile.language || 'es';
      const tips = WEEKLY_TIPS[locale as keyof typeof WEEKLY_TIPS] || WEEKLY_TIPS.es;
      const tip = tips[weekNum % tips.length];
      const config = WEEKLY_CONFIG[locale as keyof typeof WEEKLY_CONFIG] || WEEKLY_CONFIG.es;

      try {
        await resend.emails.send({
          from: 'Sympto+ <hola@getsympto.app>',
          to: profile.email,
          subject: config.subject,
          html: buildWeeklyHtml(locale, profile.name || '', tip),
        });
        results.push({ email: profile.email, status: 'sent' });

        // Pausa entre envíos para no saturar la API
        await new Promise(r => setTimeout(r, 200));
      } catch {
        results.push({ email: profile.email, status: 'failed' });
      }
    }

    return NextResponse.json({
      message: 'Weekly emails sent',
      total: profiles.length,
      sent: results.filter(r => r.status === 'sent').length,
      failed: results.filter(r => r.status === 'failed').length,
    });

  } catch (e) {
    console.error('Cron error:', e);
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Unknown' }, { status: 500 });
  }
}