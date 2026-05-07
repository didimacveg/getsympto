'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';

export default function AuthButton() {
  const t = useTranslations('auth');
  const locale = useLocale();
  const { user, loading, signOut } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  if (loading) return <div className="w-20 h-8 bg-slate-100 rounded-xl animate-pulse" />;

  if (user) {
    const name = user.user_metadata?.name || user.email?.split('@')[0] || 'Usuario';
    return (
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl text-sm font-medium hover:bg-blue-100 transition"
        >
          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
            {name[0].toUpperCase()}
          </div>
          <span className="max-w-20 truncate">{name}</span>
        </button>
        {showMenu && (
          <div className="absolute right-0 top-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50 min-w-35">
            <div className="px-3 py-2 border-b border-slate-100">
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
            <Link
              href={`/${locale}/perfil`}
              onClick={() => setShowMenu(false)}
              className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 transition block"
            >
              {t('my_account')}
            </Link>
            <button
              onClick={() => { signOut(); setShowMenu(false); }}
              className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition"
            >
              {t('logout')}
            </button>
          </div>
        )}
        {showModal && <AuthModal onClose={() => setShowModal(false)} />}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-1.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition"
      >
        {t('login')}
      </button>
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );
}