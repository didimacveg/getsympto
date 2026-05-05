const BLOCKED_PATTERNS = [
  // Prompt injection
  /ignora.*instrucciones/i,
  /olvida.*sistema/i,
  /ignora.*anteriores/i,
  /nuevo.*prompt/i,
  /system.*prompt/i,
  /prompt.*injection/i,
  /\[INST\]/i,
  /<\|system\|>/i,
  /###.*instruction/i,
  /override.*instructions/i,
  /ignore.*previous/i,
  /forget.*instructions/i,

  // Intentos de diagnóstico médico
  /actúa como médico/i,
  /eres un doctor/i,
  /eres un médico/i,
  /diagnóstica/i,
  /diagnostica/i,
  /receta.*pastillas/i,
  /receta.*medicamento/i,
  /prescribe/i,
  /dame.*receta/i,

  // Jailbreak común
  /jailbreak/i,
  /dan mode/i,
  /developer mode/i,
  /sin restricciones/i,
  /modo.*desarrollador/i,
  /bypass/i,
  /roleplay.*médico/i,
  /pretend.*doctor/i,
  /act as.*doctor/i,
  /simulate.*medical/i,
];

const VALID_ZONES = [
  'cabeza', 'cuello', 'pecho', 'abdomen', 'pelvis',
  'hombro_izq', 'hombro_der', 'brazo_izq', 'brazo_der',
  'antebrazo_izq', 'antebrazo_der', 'mano_izq', 'mano_der',
  'muslo_izq', 'muslo_der', 'rodilla_izq', 'rodilla_der',
  'pierna_izq', 'pierna_der', 'pie_izq', 'pie_der',
  'espalda_alta', 'espalda_media', 'lumbar',
  'gluteo_izq', 'gluteo_der', 'gemelo_izq', 'gemelo_der',
];

// Detecta repetición de caracteres sospechosa (ej: "aaaaaaa")
function hasSuspiciousRepetition(text) {
  return /(.)\1{15,}/.test(text);
}

// Detecta demasiados caracteres especiales
function hasTooManySpecialChars(text) {
  const specialCount = (text.match(/[^a-záéíóúüñA-ZÁÉÍÓÚÜÑ0-9\s.,;:!?¿¡\-()]/g) || []).length;
  return specialCount > 20;
}

// Detecta intentos de inyección HTML/SQL
function hasInjectionAttempt(text) {
  return /<[^>]*>/.test(text) ||
    /SELECT.*FROM/i.test(text) ||
    /DROP.*TABLE/i.test(text) ||
    /INSERT.*INTO/i.test(text) ||
    /javascript:/i.test(text) ||
    /data:text\/html/i.test(text);
}

export function validateInput({ zone, description }) {
  // Zona válida
  if (!zone || !VALID_ZONES.includes(zone)) {
    return { valid: false, error: 'Zona corporal no válida.' };
  }

  // Descripción existe
  if (!description || typeof description !== 'string') {
    return { valid: false, error: 'Descripción requerida.' };
  }

  const trimmed = description.trim();

  // Longitud mínima
  if (trimmed.length < 10) {
    return { valid: false, error: 'Describe el síntoma con más detalle.' };
  }

  // Longitud máxima
  if (trimmed.length > 500) {
    return { valid: false, error: 'Descripción demasiado larga (máx. 500 caracteres).' };
  }

  // Patrones bloqueados
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(trimmed)) {
      return { valid: false, error: 'Por favor, describe únicamente el síntoma físico que sientes.' };
    }
  }

  // Repetición sospechosa
  if (hasSuspiciousRepetition(trimmed)) {
    return { valid: false, error: 'Descripción no válida.' };
  }

  // Demasiados caracteres especiales
  if (hasTooManySpecialChars(trimmed)) {
    return { valid: false, error: 'Descripción no válida.' };
  }

  // Inyección HTML/SQL
  if (hasInjectionAttempt(trimmed)) {
    return { valid: false, error: 'Descripción no válida.' };
  }

  // Sanitización final
  const sanitized = trimmed
    .replace(/<[^>]*>/g, '')
    .replace(/[\x00-\x1F\x7F]/g, '')
    .trim();

  return { valid: true, description: sanitized };
}