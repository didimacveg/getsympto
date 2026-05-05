'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const t = useTranslations('auth');
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    if (mode === 'login') {
      const { error } = await signIn(email, password);
      if (error) {
        setError(t('error_invalid'));
      } else {
        onClose();
      }
    } else {
      if (!name.trim()) { setError('Introduce tu nombre.'); setLoading(false); return; }
      const { error } = await signUp(email, password, name);
      if (error) {
        setError(error.message.includes('already') ? t('error_exists') : t('error_generic'));
      } else {
        setSuccess(t('success_register'));
        setTimeout(onClose, 2000);
      }
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">
            {mode === 'login' ? t('login_title') : t('register_title')}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
        </div>

        <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => { setMode('login'); setError(''); }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${mode === 'login' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}
          >
            {t('login')}
          </button>
          <button
            onClick={() => { setMode('register'); setError(''); }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${mode === 'register' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}
          >
            {t('register')}
          </button>
        </div>

        <div className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-xs font-medium text-slate-500 block mb-1">{t('name')}</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Ej: María García"
              />
            </div>
          )}
          <div>
            <label className="text-xs font-medium text-slate-500 block mb-1">{t('email')}</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="tu@email.com"
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 block mb-1">{t('password')}</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="••••••••"
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
          </div>

          {error && <p className="text-xs text-red-500 text-center">{error}</p>}
          {success && <p className="text-xs text-green-600 text-center font-medium">{success}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading || !email || !password}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium rounded-xl py-3 text-sm transition"
          >
            {loading ? '...' : mode === 'login' ? t('login_btn') : t('register_btn')}
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-slate-400">
            {mode === 'login'
              ? <button onClick={() => setMode('register')} className="text-blue-500 hover:underline">{t('no_account')}</button>
              : <button onClick={() => setMode('login')} className="text-blue-500 hover:underline">{t('have_account')}</button>
            }
          </p>
        </div>
      </div>
    </div>
  );
}