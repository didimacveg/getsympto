import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t: Record<string, { title: string; desc: string }> = {
    es: { title: 'Virus del Nilo Occidental: síntomas, contagio y prevención | Sympto+', desc: 'Virus del Nilo: síntomas en humanos, cómo se transmite por mosquitos, tratamiento y cuándo es grave.' },
    en: { title: 'West Nile Virus: symptoms, transmission and prevention | Sympto+', desc: 'West Nile Virus: symptoms in humans, mosquito transmission, treatment and when it is serious.' },
    zh: { title: '西尼罗河病毒：症状、传播和预防 | Sympto+', desc: '西尼罗河病毒：人类症状、蚊子传播、治疗及何时严重。' },
    ru: { title: 'Вирус Западного Нила: симптомы, передача и профилактика | Sympto+', desc: 'Вирус Западного Нила: симптомы у людей, передача комарами, лечение и когда это серьёзно.' },
  };
  const m = t[locale] || t.es;
  return { title: m.title, description: m.desc };
}

const C = {
  es: {
    tag: '🦟 Alerta epidemiológica', title: 'Virus del Nilo Occidental: síntomas, contagio y cuándo consultar',
    updated: 'Mayo 2025', disclaimer: '⚠️ Contenido informativo. Si tienes síntomas tras picaduras en zona de riesgo, consulta a tu médico.',
    intro: 'El Virus del Nilo Occidental (VNO) es una infección vírica transmitida por mosquitos del género Culex que ha aumentado su presencia en España y Europa en los últimos años, especialmente en verano.',
    sections: [
      { title: '¿Cómo se contagia?', content: 'El virus se transmite principalmente a través de la picadura de mosquitos infectados que han picado previamente a aves. No se transmite de persona a persona ni por el agua o los alimentos.', list: [] },
      { title: 'Síntomas en humanos', content: 'El 80% de los infectados no desarrolla síntomas. Del 20% restante:', list: ['Fiebre (38-39°C)', 'Dolor de cabeza', 'Dolores musculares', 'Náuseas o vómitos', 'Erupción cutánea en tronco', 'Ganglios linfáticos inflamados', 'Cansancio intenso'] },
      { title: 'Cuándo es grave (1% de casos)', content: 'Una minoría desarrolla enfermedad neuroinvasiva:', list: ['Encefalitis (inflamación del cerebro)', 'Meningitis', 'Parálisis flácida aguda', 'Confusión severa o pérdida de conciencia', 'Mayor riesgo: mayores de 60 años e inmunodeprimidos'] },
      { title: 'Tratamiento', content: 'No existe tratamiento antiviral específico. El tratamiento es de soporte: reposo, hidratación y analgésicos. Los casos neurológicos requieren hospitalización.', list: [] },
      { title: 'Prevención frente a mosquitos', list: ['Usa repelente de mosquitos con DEET o IR3535', 'Viste ropa larga en zonas de riesgo al amanecer y atardecer', 'Elimina aguas estancadas (macetas, cubos) cerca de casa', 'Usa mosquiteras en ventanas y camas', 'Evita zonas húmedas y con vegetación densa al anochecer'] },
    ],
    cta_title: '¿Tienes fiebre tras una picadura?',
    cta_text: 'Analiza tus síntomas con Sympto+ y recibe orientación inmediata.',
    cta_btn: 'Analizar síntomas →',
    back: '← Blog',
  },
  en: {
    tag: '🦟 Epidemiological alert', title: 'West Nile Virus: symptoms, transmission and when to consult',
    updated: 'May 2025', disclaimer: '⚠️ Informational content. If you have symptoms after bites in a risk area, consult your doctor.',
    intro: 'West Nile Virus (WNV) is a viral infection transmitted by Culex mosquitoes that has increased its presence in Spain and Europe in recent years, especially in summer.',
    sections: [
      { title: 'How is it transmitted?', content: 'The virus is mainly transmitted through bites from infected mosquitoes that have previously bitten birds. It does not spread person to person or through water or food.', list: [] },
      { title: 'Symptoms in humans', content: '80% of infected people develop no symptoms. Of the remaining 20%:', list: ['Fever (38-39°C)', 'Headache', 'Muscle pain', 'Nausea or vomiting', 'Skin rash on trunk', 'Swollen lymph nodes', 'Intense fatigue'] },
      { title: 'When it is serious (1% of cases)', content: 'A minority develop neuroinvasive disease:', list: ['Encephalitis (brain inflammation)', 'Meningitis', 'Acute flaccid paralysis', 'Severe confusion or loss of consciousness', 'Higher risk: people over 60 and immunocompromised'] },
      { title: 'Treatment', content: 'There is no specific antiviral treatment. Treatment is supportive: rest, hydration and analgesics. Neurological cases require hospitalisation.', list: [] },
      { title: 'Mosquito prevention', list: ['Use mosquito repellent with DEET or IR3535', 'Wear long clothing in risk areas at dawn and dusk', 'Eliminate standing water (pots, buckets) near home', 'Use mosquito nets on windows and beds', 'Avoid humid areas with dense vegetation at nightfall'] },
    ],
    cta_title: 'Do you have fever after a bite?',
    cta_text: 'Analyse your symptoms with Sympto+ and get immediate guidance.',
    cta_btn: 'Analyse symptoms →',
    back: '← Blog',
  },
  zh: {
    tag: '🦟 流行病学警报', title: '西尼罗河病毒：症状、传播及何时就诊',
    updated: '2025年5月', disclaimer: '⚠️ 仅供参考。如果在危险区域被咬后有症状，请咨询医生。',
    intro: '西尼罗河病毒（WNV）是一种由库蚊传播的病毒感染，近年来在西班牙和欧洲越来越普遍，尤其在夏季。',
    sections: [
      { title: '如何传播？', content: '病毒主要通过被感染的蚊子叮咬传播，这些蚊子之前叮咬过鸟类。不会人传人，也不通过水或食物传播。', list: [] },
      { title: '人类症状', content: '80%的感染者不会出现症状。其余20%中：', list: ['发烧（38-39°C）', '头痛', '肌肉疼痛', '恶心或呕吐', '躯干皮疹', '淋巴结肿大', '极度疲劳'] },
      { title: '何时严重（1%的病例）', content: '少数人会出现神经侵入性疾病：', list: ['脑炎（脑部炎症）', '脑膜炎', '急性迟缓性麻痹', '严重意识混乱或失去意识', '更高风险：60岁以上和免疫功能受损者'] },
      { title: '治疗', content: '没有特定的抗病毒治疗。治疗为支持性：休息、补水和止痛药。神经系统病例需要住院治疗。', list: [] },
      { title: '防蚊措施', list: ['使用含DEET或IR3535的驱蚊剂', '黎明和黄昏在危险区域穿长衣', '清除家附近的积水（花盆、水桶）', '在窗户和床上使用蚊帐', '避免在夜幕降临时前往潮湿、植被茂密的地区'] },
    ],
    cta_title: '被叮咬后发烧了吗？',
    cta_text: '使用Sympto+分析您的症状并获得即时指导。',
    cta_btn: '分析症状 →',
    back: '← 博客',
  },
  ru: {
    tag: '🦟 Эпидемиологическая тревога', title: 'Вирус Западного Нила: симптомы, передача и когда к врачу',
    updated: 'Май 2025', disclaimer: '⚠️ Информационный контент. При симптомах после укусов в зоне риска обратитесь к врачу.',
    intro: 'Вирус Западного Нила (ВЗН) — вирусная инфекция, передаваемая комарами Culex, всё чаще встречающаяся в Испании и Европе в последние годы, особенно летом.',
    sections: [
      { title: 'Как передаётся?', content: 'Вирус передаётся главным образом через укусы заражённых комаров, ранее кусавших птиц. Не передаётся от человека к человеку или через воду и пищу.', list: [] },
      { title: 'Симптомы у людей', content: '80% заражённых не имеют симптомов. Из остальных 20%:', list: ['Температура (38-39°C)', 'Головная боль', 'Мышечные боли', 'Тошнота или рвота', 'Сыпь на туловище', 'Увеличение лимфоузлов', 'Сильная усталость'] },
      { title: 'Когда это серьёзно (1% случаев)', content: 'Меньшинство развивает нейроинвазивную болезнь:', list: ['Энцефалит (воспаление мозга)', 'Менингит', 'Острый вялый паралич', 'Тяжёлая спутанность или потеря сознания', 'Повышенный риск: старше 60 лет и иммунокомпрометированные'] },
      { title: 'Лечение', content: 'Специфического противовирусного лечения нет. Лечение поддерживающее: отдых, гидратация и анальгетики. Неврологические случаи требуют госпитализации.', list: [] },
      { title: 'Защита от комаров', list: ['Используйте репелленты с DEET или IR3535', 'Носите длинную одежду в зонах риска на рассвете и закате', 'Устраните стоячую воду (горшки, вёдра) вблизи дома', 'Используйте москитные сетки на окнах и кроватях', 'Избегайте влажных зон с густой растительностью на закате'] },
    ],
    cta_title: 'Температура после укуса?',
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
        <span className="inline-block bg-green-50 text-green-700 border border-green-100 text-xs font-semibold px-3 py-1 rounded-full mb-4">{c.tag}</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">{c.title}</h1>
        <p className="text-xs text-slate-400 mb-4">{c.updated}</p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-8 text-xs text-amber-700">{c.disclaimer}</div>
        <p className="text-slate-600 leading-relaxed mb-8 text-base">{c.intro}</p>
        <div className="space-y-6">
          {c.sections.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-3">{s.title}</h2>
              {s.content && <p className="text-slate-600 text-sm leading-relaxed mb-3">{s.content}</p>}
              {s.list && s.list.length > 0 && <ul className="space-y-1.5">{s.list.map((item, j) => <li key={j} className="flex items-start gap-2 text-sm text-slate-600"><span className="text-green-400 mt-0.5 shrink-0">•</span>{item}</li>)}</ul>}
            </div>
          ))}
        </div>
        <div className="mt-10 bg-gradient-to-r from-green-600 to-teal-600 rounded-3xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">{c.cta_title}</h3>
          <p className="text-green-100 text-sm mb-6">{c.cta_text}</p>
          <Link href={`/${locale}`} className="inline-block bg-white text-green-700 font-bold px-6 py-3 rounded-2xl text-sm hover:bg-green-50 transition">{c.cta_btn}</Link>
        </div>
      </div>
    </main>
  );
}

export default async function VirusNiloPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = C[locale as keyof typeof C] || C.es;
  return <ArticleLayout locale={locale} c={c} />;
}