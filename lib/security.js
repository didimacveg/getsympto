const BLOCKED_PATTERNS = [
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
  /actúa como médico/i,
  /eres un doctor/i,
  /eres un médico/i,
  /diagnóstica/i,
  /diagnostica/i,
  /receta.*pastillas/i,
  /receta.*medicamento/i,
  /prescribe/i,
  /dame.*receta/i,
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
  // Zonas SVG principales
  'cabeza', 'cuello', 'pecho', 'abdomen', 'pelvis',
  'hombro_izq', 'hombro_der',
  'brazo_izq', 'brazo_der',
  'antebrazo_izq', 'antebrazo_der',
  'mano_izq', 'mano_der',
  'muslo_izq', 'muslo_der',
  'rodilla_izq', 'rodilla_der',
  'pierna_izq', 'pierna_der',
  'pie_izq', 'pie_der',
  'espalda_alta', 'espalda_media', 'lumbar',
  'gluteo_izq', 'gluteo_der',
  'gemelo_izq', 'gemelo_der',
  // Zonas específicas (chips)
  'ojos', 'oidos', 'nariz', 'garganta', 'nuca',
  'muneca_izq', 'muneca_der',
  'tobillo_izq', 'tobillo_der',
];

function hasSuspiciousRepetition(text) {
  return /(.)\1{15,}/.test(text);
}

function hasTooManySpecialChars(text) {
  const specialCount = (text.match(/[^a-záéíóúüñA-ZÁÉÍÓÚÜÑ0-9\s.,;:!?¿¡\-()]/g) || []).length;
  return specialCount > 20;
}

function hasInjectionAttempt(text) {
  return /<[^>]*>/.test(text) ||
    /SELECT.*FROM/i.test(text) ||
    /DROP.*TABLE/i.test(text) ||
    /INSERT.*INTO/i.test(text) ||
    /javascript:/i.test(text) ||
    /data:text\/html/i.test(text);
}

export function validateInput({ zones, zone, description }) {
  // Soporte para zona única (legado) y múltiple
  const zonesToValidate = Array.isArray(zones)
    ? zones
    : (zone ? [zone] : []);

  if (!zonesToValidate.length) {
    return { valid: false, error: 'Selecciona al menos una zona corporal.' };
  }

  if (zonesToValidate.length > 5) {
    return { valid: false, error: 'Máximo 5 zonas por consulta.' };
  }

  for (const z of zonesToValidate) {
    if (!VALID_ZONES.includes(z)) {
      return { valid: false, error: 'Zona corporal no válida.' };
    }
  }

  if (!description || typeof description !== 'string') {
    return { valid: false, error: 'Descripción requerida.' };
  }

  const trimmed = description.trim();

  if (trimmed.length < 10) {
    return { valid: false, error: 'Describe el síntoma con más detalle.' };
  }

  if (trimmed.length > 500) {
    return { valid: false, error: 'Descripción demasiado larga (máx. 500 caracteres).' };
  }

  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(trimmed)) {
      return { valid: false, error: 'Por favor, describe únicamente el síntoma físico que sientes.' };
    }
  }

  if (hasSuspiciousRepetition(trimmed)) {
    return { valid: false, error: 'Descripción no válida.' };
  }

  if (hasTooManySpecialChars(trimmed)) {
    return { valid: false, error: 'Descripción no válida.' };
  }

  if (hasInjectionAttempt(trimmed)) {
    return { valid: false, error: 'Descripción no válida.' };
  }

  const sanitized = trimmed
    .replace(/<[^>]*>/g, '')
    .replace(/[\x00-\x1F\x7F]/g, '')
    .trim();

  return { valid: true, description: sanitized, zones: zonesToValidate };
}