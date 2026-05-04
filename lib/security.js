const BLOCKED_PATTERNS = [
  /ignora.*instrucciones/i,
  /olvida.*sistema/i,
  /actúa como médico/i,
  /eres un doctor/i,
  /diagnóstica/i,
  /receta.*pastillas/i,
  /prompt.*injection/i,
  /\[INST\]/i,
  /<\|system\|>/i,
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

export function validateInput({ zone, description }) {
  if (!VALID_ZONES.includes(zone)) {
    return { valid: false, error: 'Zona corporal no válida.' };
  }
  if (!description || description.trim().length < 10) {
    return { valid: false, error: 'Describe el síntoma con más detalle.' };
  }
  if (description.length > 500) {
    return { valid: false, error: 'Descripción demasiado larga (máx. 500 caracteres).' };
  }
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(description)) {
      return { valid: false, error: 'Por favor, describe únicamente el síntoma físico que sientes.' };
    }
  }
  const sanitized = description.replace(/<[^>]*>/g, '').replace(/[\x00-\x1F\x7F]/g, '').trim();
  return { valid: true, description: sanitized };
}