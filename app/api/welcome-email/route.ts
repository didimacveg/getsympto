import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

const CONFIG = {
  es: {
    subject: '✅ Ya eres parte de Sympto+',
    greeting: (name: string) => `Hola${name ? `, ${name}` : ''}`,
    headline: 'Tu asistente de síntomas está listo',
    subheadline: 'Acabas de dar el primer paso para entender mejor tu cuerpo.',
    features: [
      { icon: '🗺️', title: 'Mapa corporal interactivo', desc: 'Selecciona cualquier zona y describe lo que sientes en segundos.' },
      { icon: '🧠', title: 'Análisis con IA clínica', desc: 'Orientación detallada basada en conocimiento médico real.' },
      { icon: '📋', title: 'Historial personal', desc: 'Todos tus informes guardados, con descarga en PDF.' },
    ],
    cta: 'Analizar un síntoma ahora',
    ctaUrl: 'https://getsympto.app/es',
    disclaimer: 'Sympto+ es una herramienta informativa. No sustituye la consulta médica profesional.',
    footer_unsub: 'Recibiste este email porque te registraste en Sympto+.',
  },
  en: {
    subject: '✅ You\'re now part of Sympto+',
    greeting: (name: string) => `Hi${name ? `, ${name}` : ''}`,
    headline: 'Your symptom assistant is ready',
    subheadline: 'You\'ve just taken the first step to better understand your body.',
    features: [
      { icon: '🗺️', title: 'Interactive body map', desc: 'Select any zone and describe how you feel in seconds.' },
      { icon: '🧠', title: 'Clinical AI analysis', desc: 'Detailed guidance based on real medical knowledge.' },
      { icon: '📋', title: 'Personal history', desc: 'All your reports saved, with PDF download.' },
    ],
    cta: 'Analyse a symptom now',
    ctaUrl: 'https://getsympto.app/en',
    disclaimer: 'Sympto+ is an informational tool. It does not replace professional medical advice.',
    footer_unsub: 'You received this email because you registered at Sympto+.',
  },
  zh: {
    subject: '✅ 您已加入 Sympto+',
    greeting: (name: string) => `你好${name ? `，${name}` : ''}`,
    headline: '您的症状助手已就绪',
    subheadline: '您刚刚迈出了更好了解自己身体的第一步。',
    features: [
      { icon: '🗺️', title: '交互式身体地图', desc: '选择任意部位，几秒钟内描述您的感受。' },
      { icon: '🧠', title: '临床AI分析', desc: '基于真实医学知识的详细指导。' },
      { icon: '📋', title: '个人历史记录', desc: '所有报告已保存，支持PDF下载。' },
    ],
    cta: '立即分析症状',
    ctaUrl: 'https://getsympto.app/zh',
    disclaimer: 'Sympto+ 是一个信息工具，不能替代专业医疗建议。',
    footer_unsub: '您收到此邮件是因为您在 Sympto+ 注册了账户。',
  },
  ru: {
    subject: '✅ Вы теперь часть Sympto+',
    greeting: (name: string) => `Привет${name ? `, ${name}` : ''}`,
    headline: 'Ваш помощник по симптомам готов',
    subheadline: 'Вы сделали первый шаг к лучшему пониманию своего тела.',
    features: [
      { icon: '🗺️', title: 'Интерактивная карта тела', desc: 'Выберите любую зону и опишите ощущения за секунды.' },
      { icon: '🧠', title: 'Клинический ИИ-анализ', desc: 'Подробные рекомендации на основе реальных медицинских знаний.' },
      { icon: '📋', title: 'Личная история', desc: 'Все ваши отчёты сохранены с возможностью скачать PDF.' },
    ],
    cta: 'Анализировать симптом',
    ctaUrl: 'https://getsympto.app/ru',
    disclaimer: 'Sympto+ — информационный инструмент. Не заменяет профессиональную медицинскую консультацию.',
    footer_unsub: 'Вы получили это письмо, так как зарегистрировались на Sympto+.',
  },
};

function buildHtml(locale: string, name: string): string {
  const c = CONFIG[locale as keyof typeof CONFIG] || CONFIG.es;

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${c.subject}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- HEADER -->
  <tr><td style="background:linear-gradient(135deg,#1d4ed8 0%,#2563eb 60%,#3b82f6 100%);border-radius:16px 16px 0 0;padding:40px 40px 36px;text-align:center;">
    <div style="display:inline-flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.15);border-radius:12px;padding:8px 16px;margin-bottom:20px;">
      <span style="color:#fff;font-size:20px;font-weight:800;letter-spacing:-0.5px;">S+ Sympto+</span>
    </div>
    <h1 style="color:#ffffff;font-size:26px;font-weight:700;margin:0 0 10px;line-height:1.3;">${c.headline}</h1>
    <p style="color:#bfdbfe;font-size:15px;margin:0;line-height:1.5;">${c.subheadline}</p>
  </td></tr>

  <!-- BODY -->
  <tr><td style="background:#ffffff;padding:40px 40px 32px;">

    <p style="color:#1e293b;font-size:17px;font-weight:600;margin:0 0 24px;">${c.greeting(name)} 👋</p>

    <!-- Features -->
    ${c.features.map(f => `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
    <tr>
      <td width="48" valign="top" style="padding-top:2px;">
        <div style="width:44px;height:44px;background:#eff6ff;border-radius:12px;text-align:center;line-height:44px;font-size:22px;">${f.icon}</div>
      </td>
      <td style="padding-left:16px;vertical-align:top;">
        <p style="margin:0 0 3px;font-size:15px;font-weight:700;color:#0f172a;">${f.title}</p>
        <p style="margin:0;font-size:13px;color:#64748b;line-height:1.5;">${f.desc}</p>
      </td>
    </tr>
    </table>`).join('')}

    <!-- CTA -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:32px 0 0;">
    <tr><td align="center">
      <a href="${c.ctaUrl}" style="display:inline-block;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:12px;letter-spacing:0.2px;">
        ${c.cta} →
      </a>
    </td></tr>
    </table>

  </td></tr>

  <!-- DISCLAIMER -->
  <tr><td style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;">
    <p style="margin:0 0 6px;font-size:11px;color:#94a3b8;line-height:1.5;">⚕️ ${c.disclaimer}</p>
    <p style="margin:0;font-size:11px;color:#cbd5e1;">${c.footer_unsub}</p>
  </td></tr>

</table>
</td></tr>
</table>

</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const { email, name, locale } = await request.json();
    if (!email) return NextResponse.json({ error: 'No email' }, { status: 400 });

    const c = CONFIG[locale as keyof typeof CONFIG] || CONFIG.es;

    await resend.emails.send({
      from: 'Sympto+ <hola@getsympto.app>',
      to: email,
      subject: c.subject,
      html: buildHtml(locale || 'es', name || ''),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Welcome email error:', e);
    return NextResponse.json({ error: 'Email failed' }, { status: 500 });
  }
}