'use client';
import { useState } from 'react';

const ZONES = {
  cabeza: {
    label: 'Cabeza',
    emoji: '🧠',
    path: 'M 130 12 C 110 12 88 28 85 52 C 82 72 88 88 95 98 C 100 105 108 110 115 112 L 115 125 L 145 125 L 145 112 C 152 110 160 105 165 98 C 172 88 178 72 175 52 C 172 28 150 12 130 12 Z'
  },
  cuello: {
    label: 'Cuello',
    emoji: '🫀',
    path: 'M 115 125 L 145 125 L 148 148 L 112 148 Z'
  },
  hombro_izq: {
    label: 'Hombro izquierdo',
    emoji: '💪',
    path: 'M 75 148 C 60 148 45 155 40 168 C 36 178 40 192 50 198 L 75 200 L 82 165 L 112 148 Z'
  },
  hombro_der: {
    label: 'Hombro derecho',
    emoji: '💪',
    path: 'M 185 148 C 200 148 215 155 220 168 C 224 178 220 192 210 198 L 185 200 L 178 165 L 148 148 Z'
  },
  pecho: {
    label: 'Pecho / Tórax',
    emoji: '❤️',
    path: 'M 112 148 L 148 148 L 155 165 L 178 165 L 182 210 L 78 210 L 82 165 L 105 165 Z'
  },
  abdomen: {
    label: 'Abdomen',
    emoji: '🫃',
    path: 'M 80 210 L 180 210 L 178 268 L 82 268 Z'
  },
  pelvis: {
    label: 'Pelvis / Cadera',
    emoji: '🦴',
    path: 'M 82 268 L 178 268 C 182 278 184 288 180 295 L 80 295 C 76 288 78 278 82 268 Z'
  },
  brazo_izq: {
    label: 'Brazo izquierdo',
    emoji: '💪',
    path: 'M 40 198 C 32 210 28 228 30 248 C 31 258 36 266 44 270 L 58 270 L 62 230 L 50 198 Z'
  },
  brazo_der: {
    label: 'Brazo derecho',
    emoji: '💪',
    path: 'M 220 198 C 228 210 232 228 230 248 C 229 258 224 266 216 270 L 202 270 L 198 230 L 210 198 Z'
  },
  antebrazo_izq: {
    label: 'Antebrazo izquierdo',
    emoji: '🦾',
    path: 'M 30 248 C 28 265 28 285 32 305 C 34 315 40 322 48 324 L 60 322 L 62 268 L 44 268 Z'
  },
  antebrazo_der: {
    label: 'Antebrazo derecho',
    emoji: '🦾',
    path: 'M 230 248 C 232 265 232 285 228 305 C 226 315 220 322 212 324 L 200 322 L 198 268 L 216 268 Z'
  },
  mano_izq: {
    label: 'Mano izquierda',
    emoji: '✋',
    path: 'M 32 305 C 28 318 26 330 30 340 C 34 350 44 355 55 352 L 65 348 L 62 320 L 48 322 Z'
  },
  mano_der: {
    label: 'Mano derecha',
    emoji: '✋',
    path: 'M 228 305 C 232 318 234 330 230 340 C 226 350 216 355 205 352 L 195 348 L 198 320 L 212 322 Z'
  },
  muslo_izq: {
    label: 'Muslo izquierdo',
    emoji: '🦵',
    path: 'M 82 295 L 128 295 C 130 308 130 325 128 345 C 126 360 122 372 118 380 L 88 380 C 84 372 80 360 78 345 C 76 325 78 308 82 295 Z'
  },
  muslo_der: {
    label: 'Muslo derecho',
    emoji: '🦵',
    path: 'M 132 295 L 178 295 C 182 308 182 325 182 345 C 180 360 176 372 172 380 L 142 380 C 138 372 134 360 132 345 C 130 325 130 308 132 295 Z'
  },
  rodilla_izq: {
    label: 'Rodilla izquierda',
    emoji: '🦿',
    path: 'M 86 380 L 120 380 C 122 390 122 402 120 412 L 86 412 C 84 402 84 390 86 380 Z'
  },
  rodilla_der: {
    label: 'Rodilla derecha',
    emoji: '🦿',
    path: 'M 140 380 L 174 380 C 176 390 176 402 174 412 L 140 412 C 138 402 138 390 140 380 Z'
  },
  pierna_izq: {
    label: 'Pierna izquierda',
    emoji: '🦵',
    path: 'M 87 412 L 119 412 C 120 430 120 452 118 472 C 116 488 112 500 108 508 L 92 508 C 88 500 84 488 82 472 C 80 452 80 430 87 412 Z'
  },
  pierna_der: {
    label: 'Pierna derecha',
    emoji: '🦵',
    path: 'M 141 412 L 173 412 C 180 430 180 452 178 472 C 176 488 172 500 168 508 L 152 508 C 148 500 144 488 142 472 C 140 452 139 430 141 412 Z'
  },
  pie_izq: {
    label: 'Pie izquierdo',
    emoji: '🦶',
    path: 'M 90 508 L 110 508 C 112 518 112 528 108 535 C 100 542 82 540 76 532 C 72 526 76 514 90 508 Z'
  },
  pie_der: {
    label: 'Pie derecho',
    emoji: '🦶',
    path: 'M 150 508 L 170 508 C 184 514 188 526 184 532 C 178 540 160 542 152 535 C 148 528 148 518 150 508 Z'
  },
};

export default function BodyMap({ onZoneSelect, selectedZone }) {
  const [hovered, setHovered] = useState(null);

  const activeZone = hovered || selectedZone;

  return (
    <div className="w-full flex flex-col items-center">
      <svg
        viewBox="0 0 260 560"
        className="w-full max-w-[220px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sombra suave de fondo */}
        <ellipse cx="130" cy="545" rx="70" ry="8" fill="#e2e8f0" />

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
            stroke={selectedZone === id ? '#2563eb' : '#94a3b8'}
            strokeWidth={selectedZone === id ? '1.5' : '0.8'}
            className="cursor-pointer transition-all duration-150"
            onClick={() => onZoneSelect(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
      </svg>

      <div className="mt-3 h-8">
        {activeZone && (
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            {ZONES[activeZone]?.emoji} {ZONES[activeZone]?.label}
          </span>
        )}
      </div>
    </div>
  );
}