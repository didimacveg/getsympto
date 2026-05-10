'use client';
import { useState, useRef } from 'react';
import { useLocale } from 'next-intl';
import ReviewsSection from './ReviewsSection';

const LABELS = {
  es: { open: 'Ver reseñas de usuarios reales', close: 'Ocultar reseñas' },
  en: { open: 'See real user reviews', close: 'Hide reviews' },
  zh: { open: '查看真实用户评价', close: '收起评价' },
  ru: { open: 'Посмотреть отзывы пользователей', close: 'Скрыть отзывы' },
};

export default function ReviewsToggle() {
  const locale = useLocale();
  const l = LABELS[locale as keyof typeof LABELS] || LABELS.es;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setOpen(prev => {
      if (!prev) {
        setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
      return !prev;
    });
  };

  return (
    <div ref={ref} className="mt-10">
      <div className="flex justify-center mb-2">
        <button
          onClick={toggle}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all"
        >
          <span>⭐</span>
          {open ? l.close : l.open}
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      {open && <ReviewsSection />}
    </div>
  );
}