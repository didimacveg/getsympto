'use client';
import { useState } from 'react';

const ZONE_LABELS = {
  cabeza: 'Cabeza', cuello: 'Cuello', pecho: 'Pecho / Tórax',
  abdomen: 'Abdomen', pelvis: 'Pelvis / Cadera',
  hombro_izq: 'Hombro izquierdo', hombro_der: 'Hombro derecho',
  brazo_izq: 'Brazo izquierdo', brazo_der: 'Brazo derecho',
  antebrazo_izq: 'Antebrazo izquierdo', antebrazo_der: 'Antebrazo derecho',
  mano_izq: 'Mano izquierda', mano_der: 'Mano derecha',
  muslo_izq: 'Muslo izquierdo', muslo_der: 'Muslo derecho',
  rodilla_izq: 'Rodilla izquierda', rodilla_der: 'Rodilla derecha',
  pierna_izq: 'Pierna izquierda', pierna_der: 'Pierna derecha',
  pie_izq: 'Pie izquierdo', pie_der: 'Pie derecho',
};

export default function SymptomForm({ zone, onSubmit, loading }) {
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [intensity, setIntensity] = useState('');

  const canSubmit = description.trim().length >= 10 && !loading;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full bg-blue-500" />
        <h2 className="font-semibold text-slate-700">
          Zona: <span className="text-blue-600">{ZONE_LABELS[zone] || zone}</span>
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-600 block mb-1.5">
            Describe qué sientes *
          </label>
          <textarea
            className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-800 resize-none focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition placeholder:text-slate-400"
            rows={4}
            placeholder="Ej: Dolor punzante que aparece al respirar hondo, especialmente en el lado derecho. Lleva 2 días..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            maxLength={500}
            disabled={loading}
          />
          <p className="text-xs text-slate-400 mt-1">{description.length}/500 caracteres</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-slate-500 block mb-1">Duración</label>
            <select
              className="w-full border border-slate-200 rounded-lg p-2 text-sm text-slate-700 focus:ring-2 focus:ring-blue-400 outline-none"
              value={duration}
              onChange={e => setDuration(e.target.value)}
              disabled={loading}
            >
              <option value="">Sin especificar</option>
              <option>Menos de 24 horas</option>
              <option>1-3 días</option>
              <option>4-7 días</option>
              <option>Más de una semana</option>
              <option>Crónico (meses o más)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 block mb-1">Intensidad (1-10)</label>
            <select
              className="w-full border border-slate-200 rounded-lg p-2 text-sm text-slate-700 focus:ring-2 focus:ring-blue-400 outline-none"
              value={intensity}
              onChange={e => setIntensity(e.target.value)}
              disabled={loading}
            >
              <option value="">Sin especificar</option>
              <option>Leve (1-3)</option>
              <option>Moderada (4-6)</option>
              <option>Intensa (7-8)</option>
              <option>Muy intensa (9-10)</option>
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
              Analizando...
            </span>
          ) : 'Obtener orientación →'}
        </button>

        {description.length < 10 && description.length > 0 && (
          <p className="text-xs text-amber-600 text-center">Describe el síntoma con un poco más de detalle</p>
        )}
      </div>
    </div>
  );
}