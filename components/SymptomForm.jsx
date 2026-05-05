'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function SymptomForm({ zone, onSubmit, loading }) {
  const t = useTranslations('form');
  const tz = useTranslations('zones');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [intensity, setIntensity] = useState('');

  const canSubmit = description.trim().length >= 10 && !loading;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full bg-blue-500" />
        <h2 className="font-semibold text-slate-700">
          {t('zone_prefix')} <span className="text-blue-600">{tz(zone)}</span>
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-600 block mb-1.5">
            {t('describe_label')}
          </label>
          <textarea
            className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-800 resize-none focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition placeholder:text-slate-400"
            rows={4}
            placeholder={t('placeholder')}
            value={description}
            onChange={e => setDescription(e.target.value)}
            maxLength={500}
            disabled={loading}
          />
          <p className="text-xs text-slate-400 mt-1">{description.length}/500 {t('chars')}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-slate-500 block mb-1">{t('duration')}</label>
            <select
              className="w-full border border-slate-200 rounded-lg p-2 text-sm text-slate-700 focus:ring-2 focus:ring-blue-400 outline-none"
              value={duration}
              onChange={e => setDuration(e.target.value)}
              disabled={loading}
            >
              <option value="">{t('no_specify')}</option>
              <option>{t('duration_1')}</option>
              <option>{t('duration_2')}</option>
              <option>{t('duration_3')}</option>
              <option>{t('duration_4')}</option>
              <option>{t('duration_5')}</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 block mb-1">{t('intensity')}</label>
            <select
              className="w-full border border-slate-200 rounded-lg p-2 text-sm text-slate-700 focus:ring-2 focus:ring-blue-400 outline-none"
              value={intensity}
              onChange={e => setIntensity(e.target.value)}
              disabled={loading}
            >
              <option value="">{t('no_specify')}</option>
              <option>{t('intensity_1')}</option>
              <option>{t('intensity_2')}</option>
              <option>{t('intensity_3')}</option>
              <option>{t('intensity_4')}</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => onSubmit({ description, duration, intensity })}
          disabled={!canSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium rounded-xl py-3 transition-colors duration-150"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              {t('loading')}
            </span>
          ) : t('submit')}
        </button>

        {description.length < 10 && description.length > 0 && (
          <p className="text-xs text-amber-600 text-center">{t('min_chars')}</p>
        )}
      </div>
    </div>
  );
}