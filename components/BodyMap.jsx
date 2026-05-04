'use client';
import { useState } from 'react';

const ZONES = {
  cabeza: {
    label: 'Cabeza',
    path: 'M 100 15 Q 100 5 115 8 Q 130 0 145 8 Q 160 5 160 15 Q 170 30 165 50 Q 155 70 130 72 Q 105 70 95 50 Q 90 30 100 15 Z',
    emoji: '🧠'
  },
  cuello: {
    label: 'Cuello',
    path: 'M 112 72 L 148 72 L 152 92 L 108 92 Z',
    emoji: '🦒'
  },
  hombro_izq: {
    label: 'Hombro izquierdo',
    path: 'M 65 92 Q 50 88 45 105 Q 48 120 65 118 L 78 110 L 80 92 Z',
    emoji: '💪'
  },
  hombro_der: {
    label: 'Hombro derecho',
    path: 'M 195 92 Q 210 88 215 105 Q 212 120 195 118 L 182 110 L 180 92 Z',
    emoji: '💪'
  },
  pecho: {
    label: 'Pecho / Tórax',
    path: 'M 80 92 L 180 92 L 182 150 L 78 150 Z',
    emoji: '❤️'
  },
  abdomen: {
    label: 'Abdomen',
    path: 'M 82 150 L 178 150 L 175 200 L 85 200 Z',
    emoji: '🫃'
  },
  pelvis: {
    label: 'Pelvis / Cadera',
    path: 'M 85 200 L 175 200 L 180 225 L 80 225 Z',
    emoji: '🦴'
  },
  brazo_izq: {
    label: 'Brazo izquierdo',
    path: 'M 45 105 Q 38 120 35 155 Q 38 165 50 165 Q 60 165 65 155 L 65 118 Z',
    emoji: '💪'
  },
  brazo_der: {
    label: 'Brazo derecho',
    path: 'M 215 105 Q 222 120 225 155 Q 222 165 210 165 Q 200 165 195 155 L 195 118 Z',
    emoji: '💪'
  },
  antebrazo_izq: {
    label: 'Antebrazo izquierdo',
    path: 'M 35 155 Q 30 175 32 205 Q 40 212 52 210 Q 60 205 62 195 L 65 155 Z',
    emoji: '🦾'
  },
  antebrazo_der: {
    label: 'Antebrazo derecho',
    path: 'M 225 155 Q 230 175 228 205 Q 220 212 208 210 Q 200 205 198 195 L 195 155 Z',
    emoji: '🦾'
  },
  mano_izq: {
    label: 'Mano izquierda',
    path: 'M 32 205 Q 25 215 28 228 Q 35 235 50 233 Q 62 228 62 215 L 62 205 Z',
    emoji: '✋'
  },
  mano_der: {
    label: 'Mano derecha',
    path: 'M 228 205 Q 235 215 232 228 Q 225 235 210 233 Q 198 228 198 215 L 198 205 Z',
    emoji: '✋'
  },
  muslo_izq: {
    label: 'Muslo izquierdo',
    path: 'M 85 225 L 128 225 L 125 295 L 82 295 Z',
    emoji: '🦵'
  },
  muslo_der: {
    label: 'Muslo derecho',
    path: 'M 132 225 L 175 225 L 178 295 L 135 295 Z',
    emoji: '🦵'
  },
  rodilla_izq: {
    label: 'Rodilla izquierda',
    path: 'M 83 295 L 126 295 L 124 320 L 85 320 Z',
    emoji: '🦿'
  },
  rodilla_der: {
    label: 'Rodilla derecha',
    path: 'M 134 295 L 177 295 L 175 320 L 136 320 Z',
    emoji: '🦿'
  },
  pierna_izq: {
    label: 'Pierna izquierda',
    path: 'M 86 320 L 124 320 L 122 385 L 88 385 Z',
    emoji: '🦵'
  },
  pierna_der: {
    label: 'Pierna derecha',
    path: 'M 136 320 L 174 320 L 172 385 L 138 385 Z',
    emoji: '🦵'
  },
  pie_izq: {
    label: 'Pie izquierdo',
    path: 'M 88 385 L 122 385 L 118 400 Q 105 408 88 400 Z',
    emoji: '🦶'
  },
  pie_der: {
    label: 'Pie derecho',
    path: 'M 138 385 L 172 385 L 172 400 Q 155 408 142 400 Z',
    emoji: '🦶'
  },
};

export default function BodyMap({ onZoneSelect, selectedZone }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="w-full flex flex-col items-center">
      <svg
        viewBox="0 0 260 415"
        className="w-full max-w-xs drop-shadow-sm"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="260" height="415" fill="transparent" />

        {Object.entries(ZONES).map(([id, zone]) => (
          <path
            key={id}
            d={zone.path}
            fill={
              selectedZone === id
                ? '#3b82f6'
                : hovered === id
                ? '#93c5fd'
                : '#cbd5e1'
            }
            stroke="#94a3b8"
            strokeWidth="1"
            className="cursor-pointer transition-colors duration-100"
            onClick={() => onZoneSelect(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
      </svg>

      <div className="mt-4 h-8">
        {(hovered || selectedZone) && (
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            {ZONES[hovered || selectedZone]?.emoji} {ZONES[hovered || selectedZone]?.label}
          </span>
        )}
      </div>
    </div>
  );
}