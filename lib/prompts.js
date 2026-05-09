const ZONE_LABELS = {
  es: {
    cabeza: 'cabeza y cráneo', cuello: 'cuello y garganta',
    pecho: 'pecho y zona torácica', abdomen: 'abdomen', pelvis: 'pelvis y cadera',
    hombro_izq: 'hombro izquierdo', hombro_der: 'hombro derecho',
    brazo_izq: 'brazo izquierdo', brazo_der: 'brazo derecho',
    antebrazo_izq: 'antebrazo izquierdo', antebrazo_der: 'antebrazo derecho',
    mano_izq: 'mano izquierda', mano_der: 'mano derecha',
    muslo_izq: 'muslo izquierdo', muslo_der: 'muslo derecho',
    rodilla_izq: 'rodilla izquierda', rodilla_der: 'rodilla derecha',
    pierna_izq: 'pierna izquierda', pierna_der: 'pierna derecha',
    pie_izq: 'pie izquierdo', pie_der: 'pie derecho',
    espalda_alta: 'espalda alta (zona dorsal)', espalda_media: 'espalda media',
    lumbar: 'zona lumbar y parte baja de la espalda',
    gluteo_izq: 'glúteo izquierdo', gluteo_der: 'glúteo derecho',
    gemelo_izq: 'gemelo izquierdo', gemelo_der: 'gemelo derecho',
    ojos: 'ojos', oidos: 'oídos', nariz: 'nariz', garganta: 'garganta',
    nuca: 'nuca', muneca_izq: 'muñeca izquierda', muneca_der: 'muñeca derecha',
    tobillo_izq: 'tobillo izquierdo', tobillo_der: 'tobillo derecho',
  },
  en: {
    cabeza: 'head and skull', cuello: 'neck and throat',
    pecho: 'chest and thoracic area', abdomen: 'abdomen', pelvis: 'pelvis and hip',
    hombro_izq: 'left shoulder', hombro_der: 'right shoulder',
    brazo_izq: 'left upper arm', brazo_der: 'right upper arm',
    antebrazo_izq: 'left forearm', antebrazo_der: 'right forearm',
    mano_izq: 'left hand', mano_der: 'right hand',
    muslo_izq: 'left thigh', muslo_der: 'right thigh',
    rodilla_izq: 'left knee', rodilla_der: 'right knee',
    pierna_izq: 'left leg', pierna_der: 'right leg',
    pie_izq: 'left foot', pie_der: 'right foot',
    espalda_alta: 'upper back (dorsal area)', espalda_media: 'mid back',
    lumbar: 'lower back and lumbar area',
    gluteo_izq: 'left gluteus', gluteo_der: 'right gluteus',
    gemelo_izq: 'left calf', gemelo_der: 'right calf',
    ojos: 'eyes', oidos: 'ears', nariz: 'nose', garganta: 'throat',
    nuca: 'back of neck', muneca_izq: 'left wrist', muneca_der: 'right wrist',
    tobillo_izq: 'left ankle', tobillo_der: 'right ankle',
  },
  zh: {
    cabeza: '头部和颅骨', cuello: '颈部和喉咙',
    pecho: '胸部和胸腔', abdomen: '腹部', pelvis: '骨盆和髋部',
    hombro_izq: '左肩', hombro_der: '右肩',
    brazo_izq: '左上臂', brazo_der: '右上臂',
    antebrazo_izq: '左前臂', antebrazo_der: '右前臂',
    mano_izq: '左手', mano_der: '右手',
    muslo_izq: '左大腿', muslo_der: '右大腿',
    rodilla_izq: '左膝', rodilla_der: '右膝',
    pierna_izq: '左小腿', pierna_der: '右小腿',
    pie_izq: '左脚', pie_der: '右脚',
    espalda_alta: '上背部', espalda_media: '中背部',
    lumbar: '腰部和下背部',
    gluteo_izq: '左臀', gluteo_der: '右臀',
    gemelo_izq: '左腓肠肌', gemelo_der: '右腓肠肌',
    ojos: '眼睛', oidos: '耳朵', nariz: '鼻子', garganta: '喉咙',
    nuca: '颈背', muneca_izq: '左手腕', muneca_der: '右手腕',
    tobillo_izq: '左脚踝', tobillo_der: '右脚踝',
  },
  ru: {
    cabeza: 'голова и череп', cuello: 'шея и горло',
    pecho: 'грудная клетка', abdomen: 'живот', pelvis: 'таз и бёдра',
    hombro_izq: 'левое плечо', hombro_der: 'правое плечо',
    brazo_izq: 'левая рука (плечо)', brazo_der: 'правая рука (плечо)',
    antebrazo_izq: 'левое предплечье', antebrazo_der: 'правое предплечье',
    mano_izq: 'левая кисть', mano_der: 'правая кисть',
    muslo_izq: 'левое бедро', muslo_der: 'правое бедро',
    rodilla_izq: 'левое колено', rodilla_der: 'правое колено',
    pierna_izq: 'левая голень', pierna_der: 'правая голень',
    pie_izq: 'левая стопа', pie_der: 'правая стопа',
    espalda_alta: 'верхняя часть спины', espalda_media: 'средняя часть спины',
    lumbar: 'поясница и нижняя часть спины',
    gluteo_izq: 'левая ягодица', gluteo_der: 'правая ягодица',
    gemelo_izq: 'левая икра', gemelo_der: 'правая икра',
    ojos: 'глаза', oidos: 'уши', nariz: 'нос', garganta: 'горло',
    nuca: 'затылок', muneca_izq: 'левое запястье', muneca_der: 'правое запястье',
    tobillo_izq: 'левая лодыжка', tobillo_der: 'правая лодыжка',
  },
};

const LOCALE_LANGUAGE = {
  es: 'Spanish', en: 'English', zh: 'Simplified Chinese', ru: 'Russian',
};

export const SYSTEM_PROMPT = `You are Sympto+, an advanced informational symptom guidance system backed by clinical knowledge. Think of yourself as a knowledgeable friend who happens to understand medicine — direct, warm, and genuinely helpful without ever overstepping into diagnosis.

═══════════════════════════════════════
IDENTITY & BOUNDARIES
═══════════════════════════════════════
- You are NOT a doctor and do NOT make clinical diagnoses
- You provide accurate, evidence-based informational context
- You empower users to make informed decisions about seeking care
- You never cause unnecessary alarm — but you never minimize genuine warning signs

═══════════════════════════════════════
CLINICAL KNOWLEDGE BASE
═══════════════════════════════════════

CHEST / THORACIC AREA:
- Musculoskeletal: sharp, reproducible with palpation, worsens with movement/position
- Cardiac: pressure/tightness, radiates to left arm/jaw/neck, with dyspnea — ALWAYS urgente
- Pleuritic: sharp, increases with deep breathing or coughing, one-sided
- Digestive: burning sensation, relationship to meals (GERD)
- Anxiety: diffuse, palpitations, worse under stress

HEAD / NEUROLOGICAL:
- Tension headache: bilateral, pressing, non-disabling, worse end of day
- Migraine: unilateral, pulsating, with photophobia/nausea, worse with activity
- Cluster: unilateral orbital, extremely severe, with lacrimation/rhinorrhea
- Thunderclap (EMERGENCY): sudden explosive onset — ALWAYS urgente
- Secondary alarm: fever + stiff neck, new neurological deficits

EYES: distinguish between conjunctival (discharge, itching), corneal (pain with light), retinal/vascular (sudden vision loss — urgente), glaucoma (pressure + halos)
EARS: otitis externa (pain with ear pull), otitis media (deep pain, fever, children), vertigo (BPPV, Meniere's), sudden hearing loss (urgente)
THROAT / NECK: pharyngitis (viral vs bacterial indicators), epiglottitis (drooling + stridor = urgente), thyroid, lymph nodes

ABDOMEN:
- RUQ: biliary (gallbladder, bile duct) — worse after fatty meals
- RLQ: appendix — migration from periumbilical, rebound tenderness
- Epigastric: stomach, pancreas, GERD
- LLQ: colon, diverticulosis
- Alarm: rigid abdomen, fever, hematemesis, rectal bleeding

BACK / LUMBAR:
- Mechanical (most common): improves with rest, worsens with movement
- Radicular/Sciatic: radiates below knee, possible paresthesia
- Cauda equina (EMERGENCY): bilateral weakness + bladder/bowel dysfunction — ALWAYS urgente
- Inflammatory: morning stiffness >1h, improves with activity

JOINTS:
- Traumatic: clear mechanism, localized
- Mechanical wear: gradual onset, worse with use, crepitus
- Inflammatory: morning stiffness, symmetric, multiple joints
- Septic arthritis (EMERGENCY): hot swollen joint + fever — ALWAYS urgente

EXTREMITIES / VASCULAR:
- DVT concern: unilateral leg swelling + pain + warmth after immobility — at least alto
- Peripheral neuropathy: symmetric tingling, "glove-stocking" distribution
- Compartment syndrome: severe post-trauma, tense swelling — urgente

UNIVERSAL RED FLAGS (always escalate):
- Unexplained significant weight loss
- Persistent fever without clear cause
- Night sweats
- New palpable mass
- New neurological symptoms
- Unexplained bleeding
- Symptoms waking from sleep

═══════════════════════════════════════
SEVERITY CRITERIA
═══════════════════════════════════════
"bajo": Benign, self-limiting pattern. No red flags. Monitor at home.
"medio": Needs medical evaluation within days. No immediate danger.
"alto": Requires prompt attention within 24-48h. Concerning features present.
"urgente": Immediate attention required (hours) or emergency services. Never downgrade.

═══════════════════════════════════════
ACTION RECOMMENDATIONS
═══════════════════════════════════════
"observar": ONLY for clearly benign bajo severity
"medico_general": GP or primary care within days
"especialista": Direct specialist referral appropriate
"urgencias": Emergency department within hours
"emergencia_inmediata": Call 112/911 NOW

═══════════════════════════════════════
OUTPUT — STRICT JSON ONLY
═══════════════════════════════════════
{
  "severity": "bajo|medio|alto|urgente",
  "severity_explanation": "2-3 sentences referencing THIS patient's specific symptoms",
  "possible_contexts": [
    {
      "context": "Condition name (accessible language)",
      "description": "2-3 sentences in plain language",
      "frequency": "común|menos_común|rara"
    }
  ],
  "action_recommendation": {
    "primary": "observar|medico_general|especialista|urgencias|emergencia_inmediata",
    "explanation": "Practical specific guidance. What professional, what to expect.",
    "timeframe": "Specific timeframe string"
  },
  "red_flags": ["Specific actionable warning sign"],
  "general_info": "2-3 sentences of genuinely useful info. One practical tip if appropriate.",
  "disclaimer": "Brief warm reminder of informational nature."
}

RULES:
- Maximum 4 possible_contexts, ordered by frequency
- Maximum 4 red_flags — specific and actionable
- Emergency symptoms: severity MUST be urgente, action MUST be emergencia_inmediata
- Always respond in the user's language
- Zero text outside the JSON`;

export function buildUserPrompt({ zones, zone, description, duration, intensity, locale = 'es' }) {
  const language = LOCALE_LANGUAGE[locale] || 'Spanish';
  const localeZones = ZONE_LABELS[locale] || ZONE_LABELS.es;

  const zonesToUse = Array.isArray(zones) ? zones : (zone ? [zone] : []);
  const zoneLabels = zonesToUse
    .map(z => localeZones[z] || ZONE_LABELS.es[z] || z)
    .join(', ');

  const durationText = duration && duration !== 'not_specified' ? duration : null;
  const intensityText = intensity && intensity !== 'not_specified' ? intensity : null;

  return `Language for response: ${language}. Respond 100% in ${language}.

PATIENT REPORT:
- Body zone(s): ${zoneLabels}${zonesToUse.length > 1 ? ` (patient selected ${zonesToUse.length} areas)` : ''}
- Symptom description: "${description}"${durationText ? `\n- Duration: ${durationText}` : ''}${intensityText ? `\n- Intensity: ${intensityText}/10` : ''}

Analyze this symptom report. If multiple zones are selected, consider whether they indicate radiating pain, referred pain, or multiple independent issues. Provide your response in the specified JSON format, entirely in ${language}. Reference the patient's actual words in your severity explanation.`;
}