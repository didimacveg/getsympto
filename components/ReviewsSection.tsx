'use client';
import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import AuthModal from './AuthModal';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  locale: string;
  verified: boolean;
  created_at: string;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-slate-200'}>★</span>
      ))}
    </div>
  );
}

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <button
          key={i}
          onClick={() => onChange(i)}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          className={`text-2xl transition ${i <= (hover || value) ? 'text-yellow-400' : 'text-slate-200'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const t = useTranslations('reviews');
  const locale = useLocale();
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [locale]);

  const fetchReviews = async () => {
    setLoading(true);

    // Primero trae reseñas del idioma actual
    const { data: localeReviews } = await supabase
      .from('reviews')
      .select('*')
      .eq('locale', locale)
      .order('created_at', { ascending: false })
      .limit(6);

    const localeCount = localeReviews?.length || 0;

    // Si hay menos de 3 en el idioma actual, completa con otros idiomas
    if (localeCount < 3) {
      const remaining = 6 - localeCount;
      const { data: otherReviews } = await supabase
        .from('reviews')
        .select('*')
        .neq('locale', locale)
        .order('created_at', { ascending: false })
        .limit(remaining);

      setReviews([...(localeReviews || []), ...(otherReviews || [])]);
    } else {
      setReviews(localeReviews || []);
    }

    setLoading(false);
  };

  const submitReview = async () => {
    if (!user || !comment.trim()) return;
    setSubmitting(true);
    const name = user.user_metadata?.name || user.email?.split('@')[0] || 'Usuario';
    await supabase.from('reviews').insert({
      user_id: user.id,
      name,
      rating,
      comment,
      locale,
      verified: true,
    });
    setSubmitted(true);
    setComment('');
    setRating(5);
    setShowForm(false);
    fetchReviews();
    setSubmitting(false);
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <section className="mt-16 border-t border-slate-200 pt-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{t('title')}</h2>
        <p className="text-slate-500 text-sm mb-3">{t('subtitle')}</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-3xl font-bold text-slate-800">{avgRating}</span>
          <div>
            <Stars rating={Math.round(parseFloat(avgRating))} />
            <p className="text-xs text-slate-400">{t('based_on')} {reviews.length} {t('reviews_word')}</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-2xl p-6 h-40 animate-pulse border border-slate-100" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.slice(0, 6).map(review => (
            <div key={review.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{review.name}</p>
                  {review.verified && (
                    <span className="text-xs text-green-600 font-medium">✓ {t('verified')}</span>
                  )}
                </div>
                <Stars rating={review.rating} />
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        {submitted ? (
          <p className="text-green-600 font-medium text-sm">{t('thank_you')}</p>
        ) : showForm && user ? (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 max-w-lg mx-auto text-left">
            <h3 className="font-semibold text-slate-800 mb-4">{t('write_review')}</h3>
            <div className="mb-3">
              <label className="text-xs font-medium text-slate-500 block mb-1">{t('rating')}</label>
              <StarPicker value={rating} onChange={setRating} />
            </div>
            <div className="mb-4">
              <label className="text-xs font-medium text-slate-500 block mb-1">{t('your_comment')}</label>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows={3}
                className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-900 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="..."
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={submitReview}
                disabled={submitting || !comment.trim()}
                className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 transition"
              >
                {submitting ? '...' : t('submit')}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="text-sm text-slate-400 hover:text-slate-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => user ? setShowForm(true) : setShowAuthModal(true)}
            className="inline-flex items-center gap-2 border border-blue-200 text-blue-600 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-50 transition"
          >
            ⭐ {user ? t('write_review') : t('login_required')}
          </button>
        )}
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </section>
  );
}