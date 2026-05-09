'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useRef } from 'react';
import { generateReportPDF } from '@/lib/generatePDF';

interface ReportData {
  severity: string;
  severity_explanation?: string;
  possible_contexts?: { context: string; description: string; frequency: string }[];
  action_recommendation?: { primary: string; explanation: string; timeframe: string };
  red_flags?: string[];
  general_info?: string;
  disclaimer?: string;
}

interface Query {
  id: string;
  zone: string;
  description: string;
  severity: string;
  action: string;
  locale: string;
  created_at: string;
  report_data: ReportData | null;
}

const ZONE_LABELS: Record<string, { label_es: string; label_en: string; label_zh: string; label_ru: string; emoji: string }> = {
  cabeza:        { label_es: 'Cabeza',          label_en: 'Head',           label_zh: '头部',   label_ru: 'Голова',      emoji: '🧠' },
  cuello:        { label_es: 'Cuello',          label_en: 'Neck',           label_zh: '颈部',   label_ru: 'Шея',         emoji: '🔵' },
  pecho:         { label_es: 'Pecho',           label_en: 'Chest',          label_zh: '胸部',   label_ru: 'Грудь',       emoji: '❤️' },
  abdomen:       { label_es: 'Abdomen',         label_en: 'Abdomen',        label_zh: '腹部',   label_ru: 'Живот',       emoji: '🫃' },
  pelvis:        { label_es: 'Pelvis',          label_en: 'Pelvis',         label_zh: '骨盆',   label_ru: 'Таз',         emoji: '🦴' },
  hombro_izq:   { label_es: 'Hombro izq.',     label_en: 'Left shoulder',  label_zh: '左肩',   label_ru: 'Лев. плечо', emoji: '💪' },
  hombro_der:   { label_es: 'Hombro der.',     label_en: 'Right shoulder', label_zh: '右肩',   label_ru: 'Пр. плечо',  emoji: '💪' },
  brazo_izq:    { label_es: 'Brazo izq.',      label_en: 'Left arm',       label_zh: '左上臂', label_ru: 'Лев. рука',  emoji: '💪' },
  brazo_der:    { label_es: 'Brazo der.',      label_en: 'Right arm',      label_zh: '右上臂', label_ru: 'Пр. рука',   emoji: '💪' },
  antebrazo_izq:{ label_es: 'Antebrazo izq.',  label_en: 'Left forearm',   label_zh: '左前臂', label_ru: 'Лев. предпл.',emoji: '🦾' },
  antebrazo_der:{ label_es: 'Antebrazo der.',  label_en: 'Right forearm',  label_zh: '右前臂', label_ru: 'Пр. предпл.', emoji: '🦾' },
  mano_izq:     { label_es: 'Mano izq.',       label_en: 'Left hand',      label_zh: '左手',   label_ru: 'Лев. кисть', emoji: '✋' },
  mano_der:     { label_es: 'Mano der.',       label_en: 'Right hand',     label_zh: '右手',   label_ru: 'Пр. кисть',  emoji: '✋' },
  muslo_izq:    { label_es: 'Muslo izq.',      label_en: 'Left thigh',     label_zh: '左大腿', label_ru: 'Лев. бедро', emoji: '🦵' },
  muslo_der:    { label_es: 'Muslo der.',      label_en: 'Right thigh',    label_zh: '右大腿', label_ru: 'Пр. бедро',  emoji: '🦵' },
  rodilla_izq:  { label_es: 'Rodilla izq.',    label_en: 'Left knee',      label_zh: '左膝',   label_ru: 'Лев. колено',emoji: '🦿' },
  rodilla_der:  { label_es: 'Rodilla der.',    label_en: 'Right knee',     label_zh: '右膝',   label_ru: 'Пр. колeno', emoji: '🦿' },
  pierna_izq:   { label_es: 'Pierna izq.',     label_en: 'Left leg',       label_zh: '左小腿', label_ru: 'Лев. голень',emoji: '🦵' },
  pierna_der:   { label_es: 'Pierna der.',     label_en: 'Right leg',      label_zh: '右小腿', label_ru: 'Пр. голень', emoji: '🦵' },
  pie_izq:      { label_es: 'Pie izq.',        label_en: 'Left foot',      label_zh: '左脚',   label_ru: 'Лев. стопа', emoji: '🦶' },
  pie_der:      { label_es: 'Pie der.',        label_en: 'Right foot',     label_zh: '右脚',   label_ru: 'Пр. стопа',  emoji: '🦶' },
  espalda_alta: { label_es: 'Espalda alta',    label_en: 'Upper back',     label_zh: '上背部', label_ru: 'Верх спины', emoji: '🔙' },
  espalda_media:{ label_es: 'Espalda media',   label_en: 'Mid back',       label_zh: '中背部', label_ru: 'Сред. спины',emoji: '🔙' },
  lumbar:       { label_es: 'Lumbar',          label_en: 'Lower back',     label_zh: '腰部',   label_ru: 'Поясница',   emoji: '🔙' },
  gluteo_izq:   { label_es: 'Glúteo izq.',     label_en: 'Left glute',     label_zh: '左臀',   label_ru: 'Лев. ягодица',emoji:'🔙' },
  gluteo_der:   { label_es: 'Glúteo der.',     label_en: 'Right glute',    label_zh: '右臀',   label_ru: 'Пр. ягодица',emoji: '🔙' },
  gemelo_izq:   { label_es: 'Gemelo izq.',     label_en: 'Left calf',      label_zh: '左腓肠肌',label_ru:'Лев. икра',  emoji: '🦵' },
  gemelo_der:   { label_es: 'Gemelo der.',     label_en: 'Right calf',     label_zh: '右腓肠肌',label_ru:'Пр. икра',   emoji: '🦵' },
};

const SEVERITY_CONFIG: Record<string, { bg: string; text: string; border: string; dot: string; label_es: string; label_en: string; label_zh: string; label_ru: string; icon: string }> = {
  bajo:    { bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200',  dot: 'bg-green-500',  label_es: 'Bajo',    label_en: 'Low',    label_zh: '低',    label_ru: 'Низкий',   icon: '🟢' },
  medio:   { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', dot: 'bg-yellow-500', label_es: 'Medio',   label_en: 'Medium', label_zh: '中',    label_ru: 'Средний',  icon: '🟡' },
  alto:    { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', dot: 'bg-orange-500', label_es: 'Alto',    label_en: 'High',   label_zh: '高',    label_ru: 'Высокий',  icon: '🟠' },
  urgente: { bg: 'bg-red-50',    text: 'text-red-700',    border: 'border-red-200',    dot: 'bg-red-500',    label_es: 'Urgente', label_en: 'Urgent', label_zh: '紧急',  label_ru: 'Срочно',   icon: '🔴' },
};

const ACTION_LABELS: Record<string, Record<string, string>> = {
  observar:              { es: '🏠 Observar en casa',         en: '🏠 Monitor at home',      zh: '🏠 居家观察',    ru: '🏠 Наблюдать дома' },
  medico_general:        { es: '👨‍⚕️ Consultar médico',         en: '👨‍⚕️ See your GP',          zh: '👨‍⚕️ 看全科医生', ru: '👨‍⚕️ К терапевту' },
  especialista:          { es: '🏥 Especialista',              en: '🏥 See specialist',        zh: '🏥 专科医生',    ru: '🏥 К специалисту' },
  urgencias:             { es: '⚠️ Ir a urgencias',           en: '⚠️ Go to emergency',       zh: '⚠️ 去急诊',      ru: '⚠️ В скорую' },
  emergencia_inmediata:  { es: '🚨 Llamar al 112',            en: '🚨 Call emergency',         zh: '🚨 拨打急救',    ru: '🚨 Вызвать 112' },
};

const FREQ_LABELS: Record<string, Record<string, string>> = {
  común:        { es: 'Frecuente',        en: 'Common',      zh: '常见',   ru: 'Часто' },
  menos_común:  { es: 'Menos frecuente',  en: 'Less common', zh: '较少见', ru: 'Реже' },
  rara:         { es: 'Poco frecuente',   en: 'Rare',        zh: '罕见',   ru: 'Редко' },
};

const L = {
  es: {
    title: 'Mi perfil', back: '← Inicio', logout: 'Cerrar sesión',
    member_since: 'Miembro desde', total: 'informes', this_month: 'este mes',
    history: 'Historial de informes', filter_all: 'Todos', delete: 'Eliminar',
    confirm_delete: '¿Eliminar este informe?', reanalyze: 'Reanalizar →',
    no_queries: 'Aún no tienes informes guardados.',
    no_queries_sub: 'Analiza un síntoma para ver tus informes aquí.',
    analyze_now: 'Analizar un síntoma →',
    view_report: 'Ver informe completo',
    hide_report: 'Ocultar informe',
    possible_contexts: 'Posibles contextos',
    recommendation: 'Recomendación',
    red_flags: 'Señales de alarma',
    general_info: 'Información general',
    disclaimer_label: 'Aviso',
    timeframe: 'Cuándo actuar',
    no_report: 'Informe no disponible para esta consulta.',
    stats_title: 'Resumen',
  },
  en: {
    title: 'My profile', back: '← Home', logout: 'Sign out',
    member_since: 'Member since', total: 'reports', this_month: 'this month',
    history: 'Report history', filter_all: 'All', delete: 'Delete',
    confirm_delete: 'Delete this report?', reanalyze: 'Re-analyse →',
    no_queries: 'No reports saved yet.',
    no_queries_sub: 'Analyse a symptom to see your reports here.',
    analyze_now: 'Analyse a symptom →',
    view_report: 'View full report',
    hide_report: 'Hide report',
    possible_contexts: 'Possible contexts',
    recommendation: 'Recommendation',
    red_flags: 'Warning signs',
    general_info: 'General information',
    disclaimer_label: 'Notice',
    timeframe: 'When to act',
    no_report: 'Report not available for this query.',
    stats_title: 'Summary',
  },
  zh: {
    title: '我的个人资料', back: '← 主页', logout: '退出登录',
    member_since: '注册时间', total: '份报告', this_month: '本月',
    history: '报告历史', filter_all: '全部', delete: '删除',
    confirm_delete: '删除此报告？', reanalyze: '重新分析 →',
    no_queries: '还没有保存的报告。',
    no_queries_sub: '分析症状以在此处查看您的报告。',
    analyze_now: '分析症状 →',
    view_report: '查看完整报告',
    hide_report: '隐藏报告',
    possible_contexts: '可能的情况',
    recommendation: '建议',
    red_flags: '警告信号',
    general_info: '一般信息',
    disclaimer_label: '注意',
    timeframe: '何时采取行动',
    no_report: '此查询没有可用的报告。',
    stats_title: '摘要',
  },
  ru: {
    title: 'Мой профиль', back: '← Главная', logout: 'Выйти',
    member_since: 'Участник с', total: 'отчётов', this_month: 'в этом месяце',
    history: 'История отчётов', filter_all: 'Все', delete: 'Удалить',
    confirm_delete: 'Удалить этот отчёт?', reanalyze: 'Переанализировать →',
    no_queries: 'Отчётов пока нет.',
    no_queries_sub: 'Проанализируйте симптом, чтобы увидеть отчёты здесь.',
    analyze_now: 'Анализировать симптом →',
    view_report: 'Показать полный отчёт',
    hide_report: 'Скрыть отчёт',
    possible_contexts: 'Возможные причины',
    recommendation: 'Рекомендация',
    red_flags: 'Тревожные признаки',
    general_info: 'Общая информация',
    disclaimer_label: 'Уведомление',
    timeframe: 'Когда действовать',
    no_report: 'Отчёт недоступен для этого запроса.',
    stats_title: 'Сводка',
  },
};

function getZoneLabel(zone: string, locale: string) {
  const z = ZONE_LABELS[zone];
  if (!z) return { label: zone, emoji: '🔍' };
  const key = `label_${locale}` as keyof typeof z;
  return { label: (z[key] as string) || z.label_es, emoji: z.emoji };
}

function getSeverityLabel(severity: string, locale: string) {
  const s = SEVERITY_CONFIG[severity] || SEVERITY_CONFIG.bajo;
  const key = `label_${locale}` as keyof typeof s;
  return (s[key] as string) || s.label_es;
}

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(
    locale === 'zh' ? 'zh-CN' : locale === 'ru' ? 'ru-RU' : locale === 'en' ? 'en-GB' : 'es-ES',
    { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }
  );
}

function thisMonthCount(queries: Query[]) {
  const now = new Date();
  return queries.filter(q => {
    const d = new Date(q.created_at);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
}

export default function PerfilPage() {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();
  const locale = useLocale();
  const t = L[locale as keyof typeof L] || L.es;

  const [queries, setQueries] = useState<Query[]>([]);
  const [loadingQueries, setLoadingQueries] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !user) router.replace(`/${locale}`);
  }, [user, loading, locale, router]);

  useEffect(() => {
    if (user) fetchQueries();
  }, [user]);

  // Load avatar — falls back gracefully if profile row missing
  useEffect(() => {
    if (!user) return;
    supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', user.id)
      .single()
      .then(({ data, error }) => {
        if (error) console.error('Error cargando perfil:', error.message);
        if (data?.avatar_url) {
          setAvatarUrl(data.avatar_url);
        }
      });
  }, [user]);

  // Updated avatar upload with full error logging
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('La imagen debe ser menor de 2MB');
      return;
    }
    setUploadingAvatar(true);
    try {
      // Fixed path without variable extension to avoid stale cache misses
      const path = `${user.id}/avatar`;
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, file, {
          upsert: true,
          contentType: file.type,
        });
      if (uploadError) {
        console.error('❌ Error en upload:', uploadError.message);
        alert('Error subiendo imagen: ' + uploadError.message);
        setUploadingAvatar(false);
        return;
      }
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(path);
      // Timestamp cache-busting so the browser reloads the new image
      const publicUrl = `${urlData.publicUrl}?v=${Date.now()}`;
      console.log('✅ URL pública:', publicUrl);
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);
      if (updateError) {
        console.error('❌ Error guardando URL en profiles:', updateError.message);
        alert('Error guardando avatar: ' + updateError.message);
      } else {
        console.log('✅ Avatar guardado en profiles');
        setAvatarUrl(publicUrl);
      }
    } catch (err) {
      console.error('❌ Error inesperado:', err);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const fetchQueries = async () => {
    const { data } = await supabase
      .from('user_queries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    setQueries(data || []);
    setLoadingQueries(false);
  };

  const deleteQuery = async (id: string) => {
    if (!confirm(t.confirm_delete)) return;
    setDeletingId(id);
    await supabase.from('user_queries').delete().eq('id', id);
    setQueries(prev => prev.filter(q => q.id !== id));
    if (expandedId === id) setExpandedId(null);
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

  const name = user.user_metadata?.name || user.email?.split('@')[0] || 'U';
  const initials = name.slice(0, 2).toUpperCase();
  const memberSince = new Date(user.created_at || Date.now()).toLocaleDateString(
    locale === 'en' ? 'en-GB' : locale === 'zh' ? 'zh-CN' : locale === 'ru' ? 'ru-RU' : 'es-ES',
    { month: 'long', year: 'numeric' }
  );

  const severities = ['bajo', 'medio', 'alto', 'urgente'];
  const filteredQueries = filterSeverity === 'all'
    ? queries
    : queries.filter(q => q.severity === filterSeverity);

  const monthCount = thisMonthCount(queries);
  const urgentCount = queries.filter(q => q.severity === 'urgente' || q.severity === 'alto').length;

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Nav */}
        <div className="flex items-center justify-between mb-8">
          <Link href={`/${locale}`} className="text-sm text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1">
            {t.back}
          </Link>
          <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-600 transition-colors">
            {t.logout}
          </button>
        </div>

        {/* Profile header */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
          <div className="flex items-center gap-5">
            {/* Avatar with upload */}
            <div className="relative shrink-0 group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="w-16 h-16 rounded-2xl object-cover shadow-md"
                  onError={() => {
                    console.error('❌ Error cargando imagen desde URL:', avatarUrl);
                    setAvatarUrl(null); // fall back to initials
                  }}
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-md">
                  {initials}
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                {uploadingAvatar ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span className="text-white text-xs font-medium">📷</span>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-slate-800 truncate">{name}</h1>
              <p className="text-slate-400 text-sm truncate">{user.email}</p>
              <p className="text-slate-300 text-xs mt-0.5">{t.member_since} {memberSince}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-slate-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{queries.length}</p>
              <p className="text-xs text-slate-400">{t.total}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-violet-600">{monthCount}</p>
              <p className="text-xs text-slate-400">{t.this_month}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-500">{urgentCount}</p>
              <p className="text-xs text-slate-400">{locale === 'en' ? 'high/urgent' : locale === 'zh' ? '高/紧急' : locale === 'ru' ? 'высок./сроч.' : 'alto/urgente'}</p>
            </div>
          </div>
        </div>

        {/* History */}
        <div>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="text-lg font-bold text-slate-800">{t.history}</h2>
            {/* Severity filter */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setFilterSeverity('all')}
                className={`text-xs px-3 py-1 rounded-full font-medium transition ${filterSeverity === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
              >
                {t.filter_all}
              </button>
              {severities.map(sev => {
                const s = SEVERITY_CONFIG[sev];
                return (
                  <button
                    key={sev}
                    onClick={() => setFilterSeverity(sev)}
                    className={`text-xs px-3 py-1 rounded-full font-medium transition border ${filterSeverity === sev ? `${s.bg} ${s.text} ${s.border}` : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'}`}
                  >
                    {s.icon} {getSeverityLabel(sev, locale)}
                  </button>
                );
              })}
            </div>
          </div>

          {loadingQueries ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl p-5 h-24 animate-pulse border border-slate-100" />
              ))}
            </div>
          ) : filteredQueries.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-slate-700 font-semibold mb-1">{t.no_queries}</p>
              <p className="text-slate-400 text-sm mb-6">{t.no_queries_sub}</p>
              <Link
                href={`/${locale}`}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition inline-block"
              >
                {t.analyze_now}
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredQueries.map(query => {
                const zone = getZoneLabel(query.zone, locale);
                const sev = SEVERITY_CONFIG[query.severity] || SEVERITY_CONFIG.bajo;
                const sevLabel = getSeverityLabel(query.severity, locale);
                const isExpanded = expandedId === query.id;
                const report = query.report_data;
                const actionKey = query.action as keyof typeof ACTION_LABELS;
                const actionLabel = ACTION_LABELS[actionKey]?.[locale] || ACTION_LABELS[actionKey]?.es || query.action;

                return (
                  <div key={query.id} className={`bg-white rounded-2xl border shadow-sm transition-all ${isExpanded ? `${sev.border} border-2` : 'border-slate-100 hover:border-slate-200'}`}>

                    {/* Header row */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <span className="text-2xl shrink-0 mt-0.5">{zone.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1.5">
                              <span className="font-bold text-slate-800 text-sm">{zone.label}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sev.bg} ${sev.text} ${sev.border} border`}>
                                {sev.icon} {sevLabel}
                              </span>
                              {actionLabel && (
                                <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
                                  {actionLabel}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">{query.description}</p>
                            <p className="text-xs text-slate-400 mt-1.5">{formatDate(query.created_at, locale)}</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <div className="flex items-center gap-2 mt-1">
                            <button
                              onClick={() => setExpandedId(isExpanded ? null : query.id)}
                              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition ${isExpanded ? `${sev.bg} ${sev.text}` : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                            >
                              {isExpanded ? t.hide_report : t.view_report}
                            </button>
                            <button
                              onClick={() => generateReportPDF({ ...query, locale })}
                              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition"
                              title="Descargar PDF"
                            >
                              ⬇ PDF
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link href={`/${locale}`} className="text-xs text-blue-500 hover:text-blue-700">
                              {t.reanalyze}
                            </Link>
                            <button
                              onClick={() => deleteQuery(query.id)}
                              disabled={deletingId === query.id}
                              className="text-xs text-slate-300 hover:text-red-400 transition disabled:opacity-50"
                            >
                              {deletingId === query.id ? '...' : t.delete}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded report */}
                    {isExpanded && (
                      <div className="border-t border-slate-100 p-5 space-y-5">
                        {!report ? (
                          <p className="text-sm text-slate-400 text-center py-4">{t.no_report}</p>
                        ) : (
                          <>
                            {/* Severity explanation */}
                            {report.severity_explanation && (
                              <div className={`rounded-xl p-4 ${sev.bg} ${sev.border} border`}>
                                <p className={`text-sm font-medium ${sev.text}`}>{report.severity_explanation}</p>
                              </div>
                            )}

                            {/* Possible contexts */}
                            {report.possible_contexts && report.possible_contexts.length > 0 && (
                              <div>
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">{t.possible_contexts}</h3>
                                <div className="space-y-2">
                                  {report.possible_contexts.map((ctx, i) => {
                                    const freqKey = ctx.frequency as keyof typeof FREQ_LABELS;
                                    const freqLabel = FREQ_LABELS[freqKey]?.[locale] || ctx.frequency;
                                    return (
                                      <div key={i} className="flex items-start gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                                        <div>
                                          <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-sm font-semibold text-slate-700">{ctx.context}</span>
                                            <span className="text-xs text-slate-400 bg-white px-1.5 py-0.5 rounded-full border border-slate-200">{freqLabel}</span>
                                          </div>
                                          <p className="text-xs text-slate-500 leading-relaxed">{ctx.description}</p>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* Recommendation */}
                            {report.action_recommendation && (
                              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">{t.recommendation}</h3>
                                <p className="text-sm text-blue-800 font-medium mb-1">{ACTION_LABELS[report.action_recommendation.primary]?.[locale] || report.action_recommendation.primary}</p>
                                <p className="text-xs text-blue-600 mb-1">{report.action_recommendation.explanation}</p>
                                {report.action_recommendation.timeframe && (
                                  <p className="text-xs text-blue-500 font-medium">⏱ {t.timeframe}: {report.action_recommendation.timeframe}</p>
                                )}
                              </div>
                            )}

                            {/* Red flags */}
                            {report.red_flags && report.red_flags.length > 0 && (
                              <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                                <h3 className="text-xs font-bold text-red-600 uppercase tracking-wide mb-3">⚠️ {t.red_flags}</h3>
                                <ul className="space-y-1.5">
                                  {report.red_flags.map((flag, i) => (
                                    <li key={i} className="flex items-start gap-2 text-xs text-red-700">
                                      <span className="shrink-0 mt-0.5">•</span>
                                      {flag}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* General info */}
                            {report.general_info && (
                              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">{t.general_info}</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">{report.general_info}</p>
                              </div>
                            )}

                            {/* Disclaimer */}
                            {report.disclaimer && (
                              <p className="text-xs text-slate-400 text-center italic">{report.disclaimer}</p>
                            )}
                          </>
                        )}
                      </div>
                    )}
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