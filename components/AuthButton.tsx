'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import AuthModal from './AuthModal';

export default function AuthButton() {
  const t = useTranslations('auth');
  const locale = useLocale();
  const { user, loading, signOut } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (user) {
      supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', user.id)
        .single()
        .then(({ data }) => {
          if (data?.avatar_url) setAvatarUrl(data.avatar_url);
        });
    } else {
      setAvatarUrl(null);
    }
  }, [user]);

  if (loading) return <div className="w-20 h-8 bg-slate-100 rounded-xl animate-pulse" />;

  if (user) {
    const name = user.user_metadata?.name || user.email?.split('@')[0] || 'U';
    const initial = name[0].toUpperCase();

    return (
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 bg-blue-50 text-blue-700 px-2 py-1.5 rounded-xl text-sm font-medium hover:bg-blue-100 transition"
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-6 h-6 rounded-full object-cover"
              onError={() => setAvatarUrl(null)}
            />
          ) : (
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
              {initial}
            </div>
          )}
          <span className="max-w-20 truncate">{name}</span>
        </button>

        {showMenu && (
          <div className="absolute right-0 top-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50 min-w-36">
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
      {mounted && showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );
}