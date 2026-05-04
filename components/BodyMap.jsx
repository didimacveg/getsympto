'use client';
import { useState } from 'react';

const ALL_ZONES = {
  cabeza: { label: 'Cabeza', emoji: '🧠' },
  cuello: { label: 'Cuello', emoji: '🔵' },
  hombro_izq: { label: 'Hombro izquierdo', emoji: '💪' },
  hombro_der: { label: 'Hombro derecho', emoji: '💪' },
  pecho: { label: 'Pecho / Tórax', emoji: '❤️' },
  abdomen: { label: 'Abdomen', emoji: '🫃' },
  pelvis: { label: 'Pelvis / Cadera', emoji: '🦴' },
  brazo_izq: { label: 'Brazo izquierdo', emoji: '💪' },
  brazo_der: { label: 'Brazo derecho', emoji: '💪' },
  antebrazo_izq: { label: 'Antebrazo izquierdo', emoji: '🦾' },
  antebrazo_der: { label: 'Antebrazo derecho', emoji: '🦾' },
  mano_izq: { label: 'Mano izquierda', emoji: '✋' },
  mano_der: { label: 'Mano derecha', emoji: '✋' },
  muslo_izq: { label: 'Muslo izquierdo', emoji: '🦵' },
  muslo_der: { label: 'Muslo derecho', emoji: '🦵' },
  rodilla_izq: { label: 'Rodilla izquierda', emoji: '🦿' },
  rodilla_der: { label: 'Rodilla derecha', emoji: '🦿' },
  pierna_izq: { label: 'Pierna izquierda', emoji: '🦵' },
  pierna_der: { label: 'Pierna derecha', emoji: '🦵' },
  pie_izq: { label: 'Pie izquierdo', emoji: '🦶' },
  pie_der: { label: 'Pie derecho', emoji: '🦶' },
  espalda_alta: { label: 'Espalda alta', emoji: '🔙' },
  espalda_media: { label: 'Espalda media', emoji: '🔙' },
  lumbar: { label: 'Zona lumbar', emoji: '🔙' },
  gluteo_izq: { label: 'Glúteo izquierdo', emoji: '🔙' },
  gluteo_der: { label: 'Glúteo derecho', emoji: '🔙' },
  gemelo_izq: { label: 'Gemelo izquierdo', emoji: '🦵' },
  gemelo_der: { label: 'Gemelo derecho', emoji: '🦵' },
};

const FRONT_PATHS = {
  cabeza: 'M 50 36 m -30 0 a 30 34 0 1 0 60 0 a 30 34 0 1 0 -60 0',
  cuello: 'M 36 68 C 30 72 28 80 28 100 C 36 103 50 105 50 105 C 50 105 64 103 72 100 C 72 80 70 72 64 68 Z',
  hombro_der: 'M 28 98 C 20 98 8 102 2 112 C -2 120 0 132 8 138 L 20 140 L 20 102 Z',
  hombro_izq: 'M 72 98 C 80 98 92 102 98 112 C 102 120 100 132 92 138 L 80 140 L 80 102 Z',
  pecho: 'M 20 100 L 80 100 L 82 142 L 18 142 Z',
  abdomen: 'M 18 142 L 82 142 L 80 195 L 20 195 Z',
  pelvis: 'M 20 195 L 80 195 C 83 206 83 215 79 222 L 21 222 C 17 215 17 206 20 195 Z',
  brazo_izq: 'M 100 142 C 108 155 110 172 108 190 C 106 202 100 210 92 212 L 82 210 L 82 138 L 92 136 Z',
  brazo_der: 'M 0 142 C -8 155 -10 172 -8 190 C -6 202 0 210 8 212 L 18 210 L 18 138 L 8 136 Z',
  antebrazo_izq: 'M 108 190 C 112 206 112 224 108 240 C 105 250 98 256 90 255 L 82 252 L 82 208 L 92 210 Z',
  antebrazo_der: 'M -8 190 C -12 206 -12 224 -8 240 C -5 250 2 256 10 255 L 18 252 L 18 208 L 8 210 Z',
  mano_izq: 'M 108 240 C 110 252 106 264 98 270 C 90 275 80 272 78 262 L 82 250 L 90 253 Z',
  mano_der: 'M -8 240 C -10 252 -6 264 2 270 C 10 275 20 272 22 262 L 18 250 L 10 253 Z',
  muslo_izq: 'M 21 222 L 48 222 L 46 288 C 44 302 40 314 34 320 L 24 320 C 16 314 13 302 14 288 Z',
  muslo_der: 'M 52 222 L 79 222 L 86 288 C 87 302 84 314 76 320 L 66 320 C 60 314 56 302 54 288 Z',
  rodilla_izq: 'M 15 320 L 40 320 L 38 342 L 17 342 Z',
  rodilla_der: 'M 60 320 L 85 320 L 83 342 L 62 342 Z',
  pierna_izq: 'M 17 342 L 38 342 L 37 400 C 36 413 32 422 26 426 L 20 426 C 14 422 10 411 11 398 Z',
  pierna_der: 'M 62 342 L 83 342 L 89 398 C 90 411 86 422 80 426 L 74 426 C 68 422 64 413 63 400 Z',
  pie_izq: 'M 12 398 L 36 398 C 38 408 36 420 28 425 C 18 432 4 428 3 418 C 1 408 7 399 12 398 Z',
  pie_der: 'M 64 398 L 88 398 C 93 399 99 408 97 418 C 96 428 82 432 72 425 C 64 420 62 408 64 398 Z',
};

const BACK_PATHS = {
  cabeza: 'M 50 36 m -30 0 a 30 34 0 1 0 60 0 a 30 34 0 1 0 -60 0',
  cuello: 'M 36 68 C 30 72 28 80 28 100 C 36 103 50 105 50 105 C 50 105 64 103 72 100 C 72 80 70 72 64 68 Z',
  hombro_izq: 'M 28 98 C 20 98 8 102 2 112 C -2 120 0 132 8 138 L 20 140 L 20 102 Z',
  hombro_der: 'M 72 98 C 80 98 92 102 98 112 C 102 120 100 132 92 138 L 80 140 L 80 102 Z',
  espalda_alta: 'M 20 100 L 80 100 L 82 155 L 18 155 Z',
  espalda_media: 'M 18 155 L 82 155 L 80 200 L 20 200 Z',
  lumbar: 'M 20 200 L 80 200 C 83 211 83 220 79 226 L 21 226 C 17 220 17 211 20 200 Z',
  brazo_izq: 'M 0 142 C -8 155 -10 172 -8 190 C -6 202 0 210 8 212 L 18 210 L 18 138 L 8 136 Z',
  brazo_der: 'M 100 142 C 108 155 110 172 108 190 C 106 202 100 210 92 212 L 82 210 L 82 138 L 92 136 Z',
  antebrazo_izq: 'M -8 190 C -12 206 -12 224 -8 240 C -5 250 2 256 10 255 L 18 252 L 18 208 L 8 210 Z',
  antebrazo_der: 'M 108 190 C 112 206 112 224 108 240 C 105 250 98 256 90 255 L 82 252 L 82 208 L 92 210 Z',
  mano_izq: 'M -8 240 C -10 252 -6 264 2 270 C 10 275 20 272 22 262 L 18 250 L 10 253 Z',
  mano_der: 'M 108 240 C 110 252 106 264 98 270 C 90 275 80 272 78 262 L 82 250 L 90 253 Z',
  gluteo_izq: 'M 21 226 L 48 226 L 46 264 C 44 272 38 276 30 276 L 22 276 C 15 276 13 270 14 264 Z',
  gluteo_der: 'M 52 226 L 79 226 L 86 264 C 87 270 85 276 78 276 L 70 276 C 62 276 56 272 54 264 Z',
  muslo_izq: 'M 14 276 L 40 276 L 38 342 L 16 342 Z',
  muslo_der: 'M 60 276 L 86 276 L 84 342 L 62 342 Z',
  gemelo_izq: 'M 16 342 L 38 342 L 37 398 C 36 411 31 420 25 422 L 20 422 C 14 420 10 410 11 398 Z',
  gemelo_der: 'M 62 342 L 84 342 L 89 398 C 90 410 86 420 80 422 L 75 422 C 69 420 64 411 63 398 Z',
  pie_izq: 'M 11 398 L 36 398 C 38 408 35 420 27 425 C 17 432 3 428 2 418 C 0 408 6 399 11 398 Z',
  pie_der: 'M 64 398 L 89 398 C 93 399 99 408 97 418 C 96 428 82 432 72 425 C 64 420 62 408 64 398 Z',
};

const DIVIDERS_FRONT = [
  'M 36 68 L 64 68',
  'M 18 142 L 82 142',
  'M 20 195 L 80 195',
];

const DIVIDERS_BACK = [
  'M 36 68 L 64 68',
  'M 18 155 L 82 155',
  'M 20 200 L 80 200',
];

const COLORS = {
  front: {
    base: '#4a7fa5',
    hover: '#3b82f6',
    selected: '#2563eb',
    stroke: '#376080',
    strokeSelected: '#1d4ed8',
    shadow: '#2d6a94',
  },
  back: {
    base: '#3a8a6a',
    hover: '#22c55e',
    selected: '#16a34a',
    stroke: '#2d6e54',
    strokeSelected: '#15803d',
    shadow: '#2d6e54',
  },
};

function BodyView({ paths, dividers, selectedZone, onZoneSelect, onHover, isBack }) {
  const c = isBack ? COLORS.back : COLORS.front;

  return (
    <svg viewBox="0 0 200 450" className="w-full" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(50, 18)">
        {Object.entries(paths).map(([id, d]) => {
          const isSelected = selectedZone === id;
          return (
            <path
              key={id}
              d={d}
              fill={isSelected ? c.selected : c.base}
              stroke={isSelected ? c.strokeSelected : c.stroke}
              strokeWidth={isSelected ? '1.2' : '0.6'}
              style={{ cursor: 'pointer', transition: 'fill 0.12s' }}
              onClick={() => onZoneSelect(id)}
              onMouseEnter={() => onHover(id)}
              onMouseLeave={() => onHover(null)}
              onMouseOver={(e) => {
                if (!isSelected) e.currentTarget.setAttribute('fill', c.hover);
              }}
              onMouseOut={(e) => {
                if (!isSelected) e.currentTarget.setAttribute('fill', c.base);
              }}
            />
          );
        })}
        {dividers.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={c.stroke}
            strokeWidth="0.5"
            strokeDasharray="3,2"
            style={{ pointerEvents: 'none' }}
          />
        ))}
      </g>
      <ellipse cx="100" cy="442" rx="40" ry="5" fill={c.shadow} />
    </svg>
  );
}

export default function BodyMap({ onZoneSelect, selectedZone }) {
  const [hovered, setHovered] = useState(null);
  const activeZone = hovered || selectedZone;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex gap-2 items-start justify-center">
        <div className="flex flex-col items-center flex-1 max-w-40">
          <span className="text-xs text-slate-400 mb-1 font-medium">Frontal</span>
          <BodyView
            paths={FRONT_PATHS}
            dividers={DIVIDERS_FRONT}
            selectedZone={selectedZone}
            onZoneSelect={onZoneSelect}
            onHover={setHovered}
            isBack={false}
          />
        </div>
        <div className="flex flex-col items-center flex-1 max-w-40">
          <span className="text-xs text-slate-400 mb-1 font-medium">Posterior</span>
          <BodyView
            paths={BACK_PATHS}
            dividers={DIVIDERS_BACK}
            selectedZone={selectedZone}
            onZoneSelect={onZoneSelect}
            onHover={setHovered}
            isBack={true}
          />
        </div>
      </div>

      <div className="mt-3 h-8">
        {activeZone && ALL_ZONES[activeZone] && (
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            {ALL_ZONES[activeZone].emoji} {ALL_ZONES[activeZone].label}
          </span>
        )}
      </div>
    </div>
  );
}