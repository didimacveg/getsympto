import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t: Record<string, { title: string; desc: string }> = {
    es: { title: 'Golpe de calor: síntomas, primeros auxilios y cuándo llamar al 112 | Sympto+', desc: 'Golpe de calor: síntomas de alarma, diferencia con el agotamiento, primeros auxilios y cuándo es emergencia.' },
    en: { title: 'Heat stroke: symptoms, first aid and when to call emergency services | Sympto+', desc: 'Heat stroke: warning symptoms, difference from heat exhaustion, first aid and when it is an emergency.' },
    zh: { title: '中暑：症状、急救及何时拨打急救电话 | Sympto+', desc: '中暑：警告症状、与热衰竭的区别、急救措施及何时为紧急情况。' },
    ru: { title: 'Тепловой удар: симптомы, первая помощь и когда звонить в скорую | Sympto+', desc: 'Тепловой удар: симптомы, отличие от теплового истощения, первая помощь и когда это экстренная ситуация.' },
  };
  const m = t[locale] || t.es;
  return { title: m.title, description: m.desc };
}

const C = {
  es: {
    tag: '🌡️ Urgencia estival', title: 'Golpe de calor: síntomas, primeros auxilios y cuándo llamar al 112',
    updated: 'Mayo 2025', disclaimer: '⚠️ El golpe de calor es una emergencia médica. Llama al 112 si sospechas uno.',
    intro: 'El golpe de calor es la forma más grave de las enfermedades relacionadas con el calor y puede ser mortal si no se trata de inmediato. Con temperaturas cada vez más extremas en España, reconocer sus síntomas es una información que puede salvar vidas.',
    sections: [
      { title: 'Diferencia entre agotamiento por calor y golpe de calor', content: 'El agotamiento es la fase previa: sudoración intensa, debilidad, piel fría y húmeda, temperatura normal o ligeramente elevada. Si no se trata evoluciona a golpe de calor: temperatura >40°C, piel seca y caliente, confusión. Esta segunda fase es la emergencia.', list: [] },
      { title: 'Síntomas del golpe de calor', content: '', list: ['Temperatura corporal superior a 40°C', 'Piel caliente, seca y enrojecida (sin sudoración)', 'Confusión, desorientación o comportamiento extraño', 'Dolor de cabeza intenso y pulsátil', 'Náuseas y vómitos', 'Pérdida de conciencia en casos graves', 'Respiración rápida y superficial'] },
      { title: 'Primeros auxilios inmediatos', content: 'Mientras esperas al 112:', list: ['Lleva a la persona a un lugar fresco o con aire acondicionado', 'Tumba a la persona y eleva ligeramente las piernas', 'Aplica paños húmedos fríos en cuello, axilas e ingles', 'Abanica para aumentar la evaporación', 'NO des líquidos si está confusa o inconsciente', 'NO uses agua helada (puede causar espasmos vasculares)'] },
      { title: 'Grupos de mayor riesgo', content: '', list: ['Personas mayores de 65 años', 'Bebés y niños pequeños', 'Personas con enfermedades crónicas', 'Trabajadores al aire libre', 'Deportistas en días de calor extremo', 'Personas que toman ciertos medicamentos (diuréticos, antihistamínicos)'] },
      { title: 'Prevención en días de calor extremo', list: ['Evita el sol entre 12:00 y 17:00', 'Hidrátate con agua aunque no tengas sed', 'Usa ropa ligera, holgada y de colores claros', 'Nunca dejes a nadie en un coche estacionado', 'Busca espacios frescos si tu hogar no tiene aire acondicionado'] },
    ],
    cta_title: '¿Tienes síntomas de calor?',
    cta_text: 'Analiza tus síntomas con Sympto+ y recibe orientación inmediata.',
    cta_btn: 'Analizar síntomas →',
    back: '← Blog',
  },
  en: {
    tag: '🌡️ Summer urgency', title: 'Heat stroke: symptoms, first aid and when to call emergency services',
    updated: 'May 2025', disclaimer: '⚠️ Heat stroke is a medical emergency. Call emergency services if you suspect one.',
    intro: 'Heat stroke is the most serious form of heat-related illness and can be fatal if not treated immediately. With increasingly extreme temperatures, recognising its symptoms is potentially life-saving information.',
    sections: [
      { title: 'Difference between heat exhaustion and heat stroke', content: 'Heat exhaustion is the prior phase: heavy sweating, weakness, cool and moist skin, normal or slightly elevated temperature. If untreated it progresses to heat stroke: temperature >40°C, dry hot skin, confusion. This second phase is the emergency.', list: [] },
      { title: 'Heat stroke symptoms', content: '', list: ['Body temperature above 40°C', 'Hot, dry and red skin (no sweating)', 'Confusion, disorientation or strange behaviour', 'Intense, throbbing headache', 'Nausea and vomiting', 'Loss of consciousness in severe cases', 'Rapid, shallow breathing'] },
      { title: 'Immediate first aid', content: 'While waiting for emergency services:', list: ['Move person to cool or air-conditioned place', 'Lay person down and slightly elevate legs', 'Apply cool damp cloths to neck, armpits and groin', 'Fan to increase evaporation', 'Do NOT give fluids if confused or unconscious', 'Do NOT use ice water (can cause vascular spasms)'] },
      { title: 'Highest risk groups', content: '', list: ['People over 65', 'Babies and young children', 'People with chronic illnesses', 'Outdoor workers', 'Athletes on extreme heat days', 'People taking certain medications (diuretics, antihistamines)'] },
      { title: 'Prevention on extreme heat days', list: ['Avoid sun between 12:00 and 17:00', 'Hydrate with water even without thirst', 'Wear light, loose, light-coloured clothing', 'Never leave anyone in a parked car', 'Seek cool spaces if your home has no air conditioning'] },
    ],
    cta_title: 'Do you have heat symptoms?',
    cta_text: 'Analyse your symptoms with Sympto+ and receive immediate guidance.',
    cta_btn: 'Analyse symptoms →',
    back: '← Blog',
  },
  zh: {
    tag: '🌡️ 夏季紧急', title: '中暑：症状、急救及何时拨打急救电话',
    updated: '2025年5月', disclaimer: '⚠️ 中暑是医疗紧急情况。如果怀疑中暑，请立即拨打急救电话。',
    intro: '中暑是与热相关疾病中最严重的形式，如果不立即治疗可能致命。随着极端高温越来越频繁，识别其症状可能是救命的信息。',
    sections: [
      { title: '热衰竭与中暑的区别', content: '热衰竭是前期阶段：大量出汗、虚弱、皮肤凉湿、体温正常或略高。如不处理会发展为中暑：体温>40°C、皮肤干热、意识混乱。第二阶段是紧急情况。', list: [] },
      { title: '中暑症状', content: '', list: ['体温超过40°C', '皮肤热、干、红（无出汗）', '意识混乱、迷失方向或行为异常', '剧烈搏动性头痛', '恶心和呕吐', '严重情况下失去意识', '呼吸急促而浅'] },
      { title: '立即急救措施', content: '等待急救时：', list: ['将人转移到凉爽或有空调的地方', '让人躺下，略微抬高腿部', '在颈部、腋窝和腹股沟涂抹冷湿布', '扇风以增加蒸发', '如果意识混乱或无意识，不要给液体', '不要使用冰水（可能导致血管痉挛）'] },
      { title: '高风险群体', content: '', list: ['65岁以上老人', '婴儿和幼儿', '慢性病患者', '户外工作者', '极端高温天气运动员', '服用某些药物者（利尿剂、抗组胺药）'] },
      { title: '极端高温天气预防', list: ['避免12:00至17:00期间在太阳下', '即使不渴也要补水', '穿轻薄、宽松、浅色衣物', '永远不要把任何人留在停放的车里', '如果家里没有空调，寻找凉爽空间'] },
    ],
    cta_title: '您有热症状吗？',
    cta_text: '使用Sympto+分析您的症状并获得即时指导。',
    cta_btn: '分析症状 →',
    back: '← 博客',
  },
  ru: {
    tag: '🌡️ Летняя срочность', title: 'Тепловой удар: симптомы, первая помощь и когда звонить в скорую',
    updated: 'Май 2025', disclaimer: '⚠️ Тепловой удар — медицинская экстренная ситуация. Вызывайте скорую при подозрении.',
    intro: 'Тепловой удар — наиболее тяжёлая форма теплового поражения, которая может быть смертельной без немедленного лечения. При всё более экстремальных температурах знание его симптомов может спасти жизнь.',
    sections: [
      { title: 'Разница между тепловым истощением и тепловым ударом', content: 'Тепловое истощение — предшествующая фаза: сильное потоотделение, слабость, прохладная и влажная кожа, нормальная или немного повышенная температура. Без лечения прогрессирует до теплового удара: температура >40°C, горячая сухая кожа, спутанность. Вторая фаза — экстренная ситуация.', list: [] },
      { title: 'Симптомы теплового удара', content: '', list: ['Температура тела выше 40°C', 'Горячая, сухая и красная кожа (без потоотделения)', 'Спутанность, дезориентация или странное поведение', 'Интенсивная пульсирующая головная боль', 'Тошнота и рвота', 'Потеря сознания в тяжёлых случаях', 'Быстрое поверхностное дыхание'] },
      { title: 'Немедленная первая помощь', content: 'Пока ждёте скорую:', list: ['Перенесите человека в прохладное место или с кондиционером', 'Уложите человека и слегка приподнимите ноги', 'Приложите прохладные влажные ткани к шее, подмышкам и паху', 'Обмахивайте для усиления испарения', 'НЕ давайте жидкость при спутанности или бессознательном состоянии', 'НЕ используйте ледяную воду (может вызвать сосудистые спазмы)'] },
      { title: 'Группы наибольшего риска', content: '', list: ['Люди старше 65 лет', 'Младенцы и маленькие дети', 'Люди с хроническими заболеваниями', 'Работники на открытом воздухе', 'Спортсмены в дни экстремальной жары', 'Принимающие некоторые лекарства (диуретики, антигистамины)'] },
      { title: 'Профилактика в дни экстремальной жары', list: ['Избегайте солнца с 12:00 до 17:00', 'Пейте воду даже без жажды', 'Носите лёгкую, просторную одежду светлых тонов', 'Никогда не оставляйте никого в припаркованном автомобиле', 'Ищите прохладные места, если дома нет кондиционера'] },
    ],
    cta_title: 'У вас симптомы жары?',
    cta_text: 'Анализируйте симптомы с Sympto+ и получите немедленные рекомендации.',
    cta_btn: 'Анализировать симптомы →',
    back: '← Блог',
  },
};

function ArticleLayout({ locale, c }: { locale: string; c: typeof C.es }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link href={`/${locale}/blog`} className="text-sm text-slate-400 hover:text-blue-600 transition mb-6 inline-block">{c.back}</Link>
        <span className="inline-block bg-orange-50 text-orange-600 border border-orange-100 text-xs font-semibold px-3 py-1 rounded-full mb-4">{c.tag}</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">{c.title}</h1>
        <p className="text-xs text-slate-400 mb-4">{c.updated}</p>
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-8 text-xs text-red-700 font-medium">{c.disclaimer}</div>
        <p className="text-slate-600 leading-relaxed mb-8 text-base">{c.intro}</p>
        <div className="space-y-6">
          {c.sections.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-3">{s.title}</h2>
              {s.content && <p className="text-slate-600 text-sm leading-relaxed mb-3">{s.content}</p>}
              {s.list && s.list.length > 0 && <ul className="space-y-1.5">{s.list.map((item, j) => <li key={j} className="flex items-start gap-2 text-sm text-slate-600"><span className="text-orange-400 mt-0.5 shrink-0">•</span>{item}</li>)}</ul>}
            </div>
          ))}
        </div>
        <div className="mt-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">{c.cta_title}</h3>
          <p className="text-orange-100 text-sm mb-6">{c.cta_text}</p>
          <Link href={`/${locale}`} className="inline-block bg-white text-orange-700 font-bold px-6 py-3 rounded-2xl text-sm hover:bg-orange-50 transition">{c.cta_btn}</Link>
        </div>
      </div>
    </main>
  );
}

export default async function GolpeCalorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = C[locale as keyof typeof C] || C.es;
  return <ArticleLayout locale={locale} c={c} />;
}