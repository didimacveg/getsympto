'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface Query {
  id: string;
  zone: string;
  description: string;
  severity: string;
  action: string;
  locale: string;
  created_at: string;
}

const ZONE_LABELS: Record<string, { label: string; emoji: string }> = {
  cabeza: { label: 'Cabeza', emoji: '🧠' },
  cuello: { label: 'Cuello', emoji: '🔵' },
  pecho: { label: 'Pecho', emoji: '❤️' },
  abdomen: { label: 'Abdomen', emoji: '🫃' },
  pelvis: { label: 'Pelvis', emoji: '🦴' },
  hombro_izq: { label: 'Hombro izq.', emoji: '💪' },
  hombro_der: { label: 'Hombro der.', emoji: '💪' },
  brazo_izq: { label: 'Brazo izq.', emoji: '💪' },
  brazo_der: { label: 'Brazo der.', emoji: '💪' },
  antebrazo_izq: { label: 'Antebrazo izq.', emoji: '🦾' },
  antebrazo_der: { label: 'Antebrazo der.', emoji: '🦾' },
  mano_izq: { label: 'Mano izq.', emoji: '✋' },
  mano_der: { label: 'Mano der.', emoji: '✋' },
  muslo_izq: { label: 'Muslo izq.', emoji: '🦵' },
  muslo_der: { label: 'Muslo der.', emoji: '🦵' },
  rodilla_izq: { label: 'Rodilla izq.', emoji: '🦿' },
  rodilla_der: { label: 'Rodilla der.', emoji: '🦿' },
  pierna_izq: { label: 'Pierna izq.', emoji: '🦵' },
  pierna_der: { label: 'Pierna der.', emoji: '🦵' },
  pie_izq: { label: 'Pie izq.', emoji: '🦶' },
  pie_der: { label: 'Pie der.', emoji: '🦶' },
  espalda_alta: { label: 'Espalda alta', emoji: '🔙' },
  espalda_media: { label: 'Espalda media', emoji: '🔙' },
  lumbar: { label: 'Lumbar', emoji: '🔙' },
  gluteo_izq: { label: 'Glúteo izq.', emoji: '🔙' },
  gluteo_der: { label: 'Glúteo der.', emoji: '🔙' },
  gemelo_izq: { label: 'Gemelo izq.', emoji: '🦵' },
  gemelo_der: { label: 'Gemelo der.', emoji: '🦵' },
};

const SEVERITY_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  bajo: { bg: 'bg-green-100', text: 'text-green-700', label: 'Bajo' },
  medio: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Medio' },
  alto: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Alto' },
  urgente: { bg: 'bg-red-100', text: 'text-red-700', label: 'Urgente' },
};

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(
    locale === 'zh' ? 'zh-CN' : locale === 'ru' ? 'ru-RU' : locale === 'en' ? 'en-GB' : 'es-ES',
    { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }
  );
}

const LABELS = {
  es: {
    title: 'Mi perfil',
    account: 'Información de cuenta',
    name: 'Nombre',
    email: 'Email',
    member_since: 'Miembro desde',
    history: 'Historial de consultas',
    no_queries: 'Aún no tienes consultas guardadas.',
    no_queries_sub: 'Tus consultas se guardarán automáticamente cuando estés registrado.',
    analyze_now: 'Analizar un síntoma →',
    total: 'consultas en total',
    delete: 'Eliminar',
    confirm_delete: '¿Eliminar esta consulta?',
    back: '← Inicio',
    logout: 'Cerrar sesión',
    severity: 'Severidad',
    zone: 'Zona',
    description_label: 'Descripción',
    reanalyze: 'Reanalizar →',
  },
  en: {
    title: 'My profile',
    account: 'Account information',
    name: 'Name',
    email: 'Email',
    member_since: 'Member since',
    history: 'Query history',
    no_queries: 'No queries saved yet.',
    no_queries_sub: 'Your queries will be saved automatically when you are registered.',
    analyze_now: 'Analyse a symptom →',
    total: 'total queries',
    delete: 'Delete',
    confirm_delete: 'Delete this query?',
    back: '← Home',
    logout: 'Sign out',
    severity: 'Severity',
    zone: 'Zone',
    description_label: 'Description',
    reanalyze: 'Re-analyse →',
  },
  zh: {
    title: '我的个人资料',
    account: '账户信息',
    name: '姓名',
    email: '电子邮件',
    member_since: '注册时间',
    history: '查询历史',
    no_queries: '还没有保存的查询。',
    no_queries_sub: '注册后您的查询将自动保存。',
    analyze_now: '分析症状 →',
    total: '总查询次数',
    delete: '删除',
    confirm_delete: '删除此查询？',
    back: '← 主页',
    logout: '退出登录',
    severity: '严重程度',
    zone: '部位',
    description_label: '描述',
    reanalyze: '重新分析 →',
  },
  ru: {
    title: 'Мой профиль',
    account: 'Информация об аккаунте',
    name: 'Имя',
    email: 'Электронная почта',
    member_since: 'Участник с',
    history: 'История запросов',
    no_queries: 'Запросов пока нет.',
    no_queries_sub: 'Ваши запросы будут сохраняться автоматически при регистрации.',
    analyze_now: 'Анализировать симптом →',
    total: 'запросов всего',
    delete: 'Удалить',
    confirm_delete: 'Удалить этот запрос?',
    back: '← Главная',
    logout: 'Выйти',
    severity: 'Серьёзность',
    zone: 'Зона',
    description_label: 'Описание',
    reanalyze: 'Переанализировать →',
  },
};

export default function PerfilPage() {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();
  const locale = useLocale();
  const t = LABELS[locale as keyof typeof LABELS] || LABELS.es;
  const [queries, setQueries] = useState<Query[]>([]);
  const [loadingQueries, setLoadingQueries] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/${locale}`);
    }
  }, [user, loading, locale, router]);

  useEffect(() => {
    if (user) fetchQueries();
  }, [user]);

  const fetchQueries = async () => {
    const { data } = await supabase
      .from('user_queries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    setQueries(data || []);
    setLoadingQueries(false);
  };

  const deleteQuery = async (id: string) => {
    if (!confirm(t.confirm_delete)) return;
    setDeletingId(id);
    await supabase.from('user_queries').delete().eq('id', id);
    setQueries(prev => prev.filter(q => q.id !== id));
    setDeletingId(null);
  };

  const handleLogout = async () => {
    await signOut();
    router.replace(`/${locale}`);
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const name = user.user_metadata?.name || user.email?.split('@')[0] || 'Usuario';
  const initials = name.slice(0, 2).toUpperCase();
  const memberSince = new Date(user.created_at).toLocaleDateString(
    locale === 'en' ? 'en-GB' : 'es-ES',
    { month: 'long', year: 'numeric' }
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Nav */}
        <div className="flex items-center justify-between mb-8">
          <Link href={`/${locale}`} className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
            {t.back}
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-700 transition-colors"
          >
            {t.logout}
          </button>
        </div>

        {/* Profile header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shrink-0">
              {initials}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-800">{name}</h1>
              <p className="text-slate-500 text-sm">{user.email}</p>
              <p className="text-slate-400 text-xs mt-1">{t.member_since} {memberSince}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">{queries.length}</p>
              <p className="text-xs text-slate-400">{t.total}</p>
            </div>
          </div>
        </div>

        {/* Query history */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">{t.history}</h2>

          {loadingQueries ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl p-5 h-28 animate-pulse border border-slate-100" />
              ))}
            </div>
          ) : queries.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-slate-100 shadow-sm">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-slate-600 font-medium mb-1">{t.no_queries}</p>
              <p className="text-slate-400 text-sm mb-5">{t.no_queries_sub}</p>
              <Link
                href={`/${locale}`}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition inline-block"
              >
                {t.analyze_now}
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {queries.map(query => {
                const zone = ZONE_LABELS[query.zone] || { label: query.zone, emoji: '🔍' };
                const severity = SEVERITY_STYLES[query.severity] || SEVERITY_STYLES.bajo;
                return (
                  <div key={query.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:border-slate-200 transition-all">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <span className="text-2xl shrink-0">{zone.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-semibold text-slate-800 text-sm">{zone.label}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${severity.bg} ${severity.text}`}>
                              {severity.label}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 truncate">{query.description}</p>
                          <p className="text-xs text-slate-400 mt-1">{formatDate(query.created_at, locale)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Link
                          href={`/${locale}`}
                          className="text-xs text-blue-500 hover:text-blue-700 transition-colors"
                        >
                          {t.reanalyze}
                        </Link>
                        <button
                          onClick={() => deleteQuery(query.id)}
                          disabled={deletingId === query.id}
                          className="text-xs text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
                        >
                          {deletingId === query.id ? '...' : t.delete}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}