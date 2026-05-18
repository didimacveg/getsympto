// Previene prompt injection y XSS

const MAX_DESCRIPTION_LENGTH = 1000;
const MAX_ZONE_LENGTH = 50;

// Patrones de prompt injection conocidos
const INJECTION_PATTERNS = [
  /ignore\s+previous\s+instructions/gi,
  /forget\s+everything/gi,
  /system\s+prompt/gi,
  /you\s+are\s+now/gi,
  /act\s+as\s+if/gi,
  /jailbreak/gi,
  /dan\s+mode/gi,
  /\[system\]/gi,
  /\[instructions\]/gi,
  /<\|im_start\|>/gi,
  /###\s*instruction/gi,
];

export function sanitizeDescription(input: string): string {
  if (!input || typeof input !== 'string') return '';

  let sanitized = input
    .trim()
    .slice(0, MAX_DESCRIPTION_LENGTH)
    // Eliminar HTML/script tags
    .replace(/<[^>]*>/g, '')
    // Eliminar caracteres de control
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Normalizar espacios
    .replace(/\s+/g, ' ');

  // Detectar y limpiar prompt injection
  for (const pattern of INJECTION_PATTERNS) {
    sanitized = sanitized.replace(pattern, '[contenido eliminado]');
  }

  return sanitized;
}

export function sanitizeZone(input: string): string {
  if (!input || typeof input !== 'string') return '';
  // Solo permitir caracteres alfanuméricos y guiones
  return input.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, MAX_ZONE_LENGTH);
}

export function sanitizeLocale(input: string): string {
  const validLocales = ['es', 'en', 'zh', 'ru'];
  return validLocales.includes(input) ? input : 'es';
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}