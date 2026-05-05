'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  onClose: () => void;
}

function EyeIcon({ open }: { open: boolean }) {
  if (open) return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const t = useTranslations('auth');
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const getLoginError = (msg: string): string => {
    const m = msg.toLowerCase();
    if (m.includes('invalid') || m.includes('credentials') || m.includes('wrong')) return t('error_invalid');
    if (m.includes('rate') || m.includes('limit')) return 'Demasiados intentos. Espera unos minutos.';
    return t('error_generic');
  };

  const getRegisterError = (msg: string): string => {
    const m = msg.toLowerCase();
    if (m.includes('already') || m.includes('registered')) return t('error_exists');
    if (m.includes('password') && (m.includes('6') || m.includes('weak') || m.includes('strong'))) {
      return 'La contraseña debe tener al menos 6 caracteres.';
    }
    if (m.includes('email') || m.includes('format') || m.includes('validate')) {
      return 'El formato del email no es válido.';
    }
    if (m.includes('rate') || m.includes('limit')) return 'Demasiados intentos. Espera unos minutos.';
    if (m.includes('captcha')) return 'Error de verificación. Contacta al soporte.';
    if (m.includes('disabled') || m.includes('not allowed')) return 'El registro está desactivado temporalmente.';
    return msg.length > 0 && msg.length < 120 ? msg : t('error_generic');
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    if (!email.trim()) { setError('Introduce tu email.'); return; }
    if (!password.trim()) { setError('Introduce tu contraseña.'); return; }
    if (password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres.'); return; }
    if (mode === 'register' && !name.trim()) { setError('Introduce tu nombre.'); return; }

    setLoading(true);

    if (mode === 'login') {
      const { error } = await signIn(email, password);
      if (error) {
        setError(getLoginError(error));
      } else {
        onClose();
      }
    } else {
      const { error } = await signUp(email, password, name);
      if (error) {
        setError(getRegisterError(error));
      } else {
        setSuccess(t('success_register'));
        setTimeout(onClose, 2000);
      }
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setLoading(true);
    await signInWithGoogle();
    // No setLoading(false) — la página se recarga tras el OAuth
  };

  const switchMode = (newMode: 'login' | 'register') => {
    setMode(newMode);
    setError('');
    setSuccess('');
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">
            {mode === 'login' ? t('login_title') : t('register_title')}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl leading-none">✕</button>
        </div>

        <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => switchMode('login')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${mode === 'login' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}
          >
            {t('login')}
          </button>
          <button
            onClick={() => switchMode('register')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${mode === 'register' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}
          >
            {t('register')}
          </button>
        </div>

        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition mb-4 disabled:opacity-50"
        >
          <GoogleIcon />
          {t('google')}
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400">{t('or')}</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <div className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-xs font-medium text-slate-500 block mb-1">{t('name')}</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Ej: María García"
                disabled={loading}
              />
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-slate-500 block mb-1">{t('email')}</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="tu@email.com"
              disabled={loading}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500 block mb-1">{t('password')}</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm text-slate-900 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="••••••••"
                disabled={loading}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                tabIndex={-1}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3">
              <p className="text-xs text-green-600 font-medium">{success}</p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium rounded-xl py-3 text-sm transition"
          >
            {loading ? '...' : mode === 'login' ? t('login_btn') : t('register_btn')}
          </button>
        </div>

        <p className="mt-4 text-center text-xs">
          {mode === 'login'
            ? <button onClick={() => switchMode('register')} className="text-blue-500 hover:underline">{t('no_account')}</button>
            : <button onClick={() => switchMode('login')} className="text-blue-500 hover:underline">{t('have_account')}</button>
          }
        </p>
      </div>
    </div>
  );
}