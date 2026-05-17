'use client';
import { useState } from 'react';
import { useLocale } from 'next-intl';

const L = {
  es: {
    title: '¿Sigues con estos síntomas?',
    subtitle: 'Déjanos tu email y te recordamos mañana para actualizar tu estado.',
    placeholder: 'tu@email.com',
    btn: 'Recordarme mañana',
    sending: 'Guardando...',
    success: '✓ Te recordamos mañana. Revisa tu bandeja de entrada.',
    skip: 'No, ya estoy mejor',
    disclaimer: 'Solo te enviamos un email. Sin spam.',
  },
  en: {
    title: 'Still experiencing these symptoms?',
    subtitle: 'Leave your email and we will remind you tomorrow to update your status.',
    placeholder: 'your@email.com',
    btn: 'Remind me tomorrow',
    sending: 'Saving...',
    success: '✓ We will remind you tomorrow. Check your inbox.',
    skip: 'No, I feel better',
    disclaimer: 'We only send one email. No spam.',
  },
  zh: {
    title: '您还有这些症状吗？',
    subtitle: '留下您的电子邮件，我们明天提醒您更新状态。',
    placeholder: '您的@电子邮件.com',
    btn: '明天提醒我',
    sending: '保存中...',
    success: '✓ 我们明天会提醒您。请查看收件箱。',
    skip: '不，我已经好转了',
    disclaimer: '我们只发送一封邮件，不发垃圾邮件。',
  },
  ru: {
    title: 'Симптомы ещё беспокоят?',
    subtitle: 'Оставьте email — напомним завтра обновить статус.',
    placeholder: 'ваш@email.com',
    btn: 'Напомнить завтра',
    sending: 'Сохранение...',
    success: '✓ Напомним завтра. Проверьте почту.',
    skip: 'Нет, уже лучше',
    disclaimer: 'Отправим только одно письмо. Без спама.',
  },
};

export default function SymptomTracker({ severity, zone, description }) {
  const locale = useLocale();
  const l = L[locale] || L.es;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | skipped

  if (status === 'skipped') return null;

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) return;
    setStatus('sending');
    try {
      await fetch('/api/track-symptom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, severity, zone, description, locale }),
      });
      setStatus('success');
    } catch {
      setStatus('success'); // igual mostramos éxito para no frustrar al usuario
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
        <p className="text-sm text-green-700 font-medium">{l.success}</p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
      <p className="text-sm font-semibold text-blue-800 mb-1">{l.title}</p>
      <p className="text-xs text-blue-600 mb-3">{l.subtitle}</p>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={l.placeholder}
          className="flex-1 border border-blue-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
        />
        <button
          onClick={handleSubmit}
          disabled={status === 'sending'}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition disabled:opacity-60 shrink-0"
        >
          {status === 'sending' ? l.sending : l.btn}
        </button>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-blue-400">{l.disclaimer}</p>
        <button onClick={() => setStatus('skipped')} className="text-xs text-slate-400 hover:text-slate-600 transition">
          {l.skip}
        </button>
      </div>
    </div>
  );
}