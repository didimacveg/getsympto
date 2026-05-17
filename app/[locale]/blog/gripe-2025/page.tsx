import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t: Record<string, { title: string; desc: string }> = {
    es: { title: 'Síntomas de la gripe 2025: cómo distinguirla del resfriado | Sympto+', desc: 'Gripe 2025: síntomas más frecuentes, diferencias con el catarro, cuándo ir al médico y cómo protegerte.' },
    en: { title: 'Flu symptoms 2025: how to tell it from a cold | Sympto+', desc: 'Flu 2025: most frequent symptoms, differences from a cold, when to see a doctor and how to protect yourself.' },
    zh: { title: '2025年流感症状：如何与感冒区分 | Sympto+', desc: '2025年流感：最常见症状、与感冒的区别、何时就医及如何保护自己。' },
    ru: { title: 'Симптомы гриппа 2025: как отличить от простуды | Sympto+', desc: 'Грипп 2025: частые симптомы, отличия от простуды, когда к врачу и защита.' },
  };
  const m = t[locale] || t.es;
  return { title: m.title, description: m.desc };
}

const C = {
  es: {
    tag: 'Temporada gripal', title: 'Gripe 2025: síntomas, diferencias con el catarro y cuándo ir al médico',
    updated: 'Mayo 2025', disclaimer: '⚠️ Contenido informativo. Consulta a tu médico ante cualquier duda.',
    intro: 'La gripe estacional sigue siendo una de las causas más frecuentes de bajas laborales y consultas médicas. En 2025 circulan cepas con síntomas ligeramente diferentes al año anterior. Conocerlos te ayuda a actuar a tiempo.',
    sections: [
      { title: '¿Cómo saber si es gripe o catarro?', content: 'La diferencia clave es la velocidad de inicio y la intensidad. La gripe aparece de golpe con fiebre alta (38,5-40°C), escalofríos y dolores musculares intensos. El catarro empieza despacio con mocos y sin fiebre alta.', list: ['Fiebre alta y repentina → gripe', 'Inicio gradual con congestión → catarro', 'Dolores musculares intensos → gripe', 'Estornudos frecuentes sin fiebre → catarro'] },
      { title: 'Síntomas principales de la gripe 2025', content: 'Los síntomas más reportados esta temporada:', list: ['Fiebre de 38,5 a 40°C', 'Escalofríos y sudoración', 'Dolor muscular y articular intenso', 'Dolor de cabeza frontal', 'Tos seca y persistente', 'Fatiga extrema', 'En algunos casos: náuseas y vómitos'] },
      { title: 'Duración y evolución', content: 'La fiebre suele durar 3-5 días. La fatiga puede persistir 1-2 semanas tras la recuperación. La mayoría de adultos sanos se recuperan sin complicaciones en 7-10 días.' },
      { title: '¿Cuándo ir al médico?', content: '', list: ['Fiebre muy alta (>39,5°C) que no baja con paracetamol', 'Dificultad para respirar o dolor en el pecho', 'Confusión o desorientación', 'Síntomas que mejoran y luego empeoran bruscamente', 'Personas de riesgo: mayores de 65, embarazadas, enfermos crónicos'] },
      { title: 'Cómo protegerte', list: ['Vacunación anual — la medida más efectiva', 'Lavado de manos frecuente', 'Ventilación de espacios cerrados', 'Evita el contacto con personas infectadas', 'Descansa si tienes síntomas — no contagies en el trabajo'] },
    ],
    cta_title: '¿Tienes síntomas de gripe?',
    cta_text: 'Analiza tus síntomas con Sympto+ y recibe orientación en segundos.',
    cta_btn: 'Analizar mis síntomas →',
    back: '← Blog',
  },
  en: {
    tag: 'Flu season', title: 'Flu 2025: symptoms, differences from a cold and when to see a doctor',
    updated: 'May 2025', disclaimer: '⚠️ Informational content. Consult your doctor if in doubt.',
    intro: 'Seasonal flu remains one of the most frequent causes of sick leave and medical visits. In 2025 strains are circulating with slightly different symptoms. Knowing them helps you act in time.',
    sections: [
      { title: 'How to tell flu from a cold?', content: 'The key difference is onset speed and intensity. Flu appears suddenly with high fever (38.5-40°C), chills and intense muscle aches. A cold starts slowly with runny nose and no high fever.', list: ['Sudden high fever → flu', 'Gradual onset with congestion → cold', 'Intense muscle aches → flu', 'Frequent sneezing without fever → cold'] },
      { title: 'Main symptoms of flu 2025', content: 'Most reported symptoms this season:', list: ['Fever 38.5 to 40°C', 'Chills and sweating', 'Intense muscle and joint pain', 'Frontal headache', 'Dry persistent cough', 'Extreme fatigue', 'In some cases: nausea and vomiting'] },
      { title: 'Duration and progression', content: 'Fever usually lasts 3-5 days. Fatigue can persist 1-2 weeks after recovery. Most healthy adults recover without complications in 7-10 days.' },
      { title: 'When to see a doctor?', content: '', list: ['Very high fever (>39.5°C) not reduced by paracetamol', 'Difficulty breathing or chest pain', 'Confusion or disorientation', 'Symptoms improving then suddenly worsening', 'At-risk groups: over 65, pregnant, chronic illness'] },
      { title: 'How to protect yourself', list: ['Annual vaccination — most effective measure', 'Frequent handwashing', 'Ventilate enclosed spaces', 'Avoid contact with infected people', 'Rest if you have symptoms — do not spread at work'] },
    ],
    cta_title: 'Do you have flu symptoms?',
    cta_text: 'Analyse your symptoms with Sympto+ and get guidance in seconds.',
    cta_btn: 'Analyse my symptoms →',
    back: '← Blog',
  },
  zh: {
    tag: '流感季节', title: '2025年流感：症状、与感冒的区别及何时就医',
    updated: '2025年5月', disclaimer: '⚠️ 仅供参考。如有疑问请咨询医生。',
    intro: '季节性流感仍是病假和就医最常见的原因之一。2025年流行的毒株症状与往年略有不同。了解这些症状有助于及时采取行动。',
    sections: [
      { title: '如何区分流感和感冒？', content: '关键区别在于发病速度和严重程度。流感突然发作，伴有高烧（38.5-40°C）、寒战和剧烈肌肉疼痛。感冒缓慢开始，有流鼻涕但无高烧。', list: ['突然高烧 → 流感', '逐渐发作伴鼻塞 → 感冒', '剧烈肌肉疼痛 → 流感', '频繁打喷嚏无发烧 → 感冒'] },
      { title: '2025年流感主要症状', content: '本季最常报告的症状：', list: ['发烧38.5至40°C', '寒战和出汗', '剧烈肌肉和关节疼痛', '额部头痛', '干燥持续咳嗽', '极度疲劳', '某些情况下：恶心和呕吐'] },
      { title: '持续时间和进展', content: '发烧通常持续3-5天。恢复后疲劳可能持续1-2周。大多数健康成人在7-10天内无并发症地康复。' },
      { title: '何时就医？', content: '', list: ['非常高的发烧（>39.5°C）对乙酰氨基酚无效', '呼吸困难或胸痛', '意识混乱或迷失方向', '症状改善后突然恶化', '高风险人群：65岁以上、孕妇、慢性病患者'] },
      { title: '如何保护自己', list: ['每年接种疫苗 — 最有效的措施', '频繁洗手', '为封闭空间通风', '避免与感染者接触', '有症状时休息 — 不要在工作中传播'] },
    ],
    cta_title: '您有流感症状吗？',
    cta_text: '使用Sympto+分析您的症状，几秒钟内获得指导。',
    cta_btn: '分析我的症状 →',
    back: '← 博客',
  },
  ru: {
    tag: 'Сезон гриппа', title: 'Грипп 2025: симптомы, отличия от простуды и когда к врачу',
    updated: 'Май 2025', disclaimer: '⚠️ Информационный контент. Консультируйтесь с врачом при сомнениях.',
    intro: 'Сезонный грипп по-прежнему остаётся одной из наиболее частых причин больничных и визитов к врачу. В 2025 году циркулируют штаммы с несколько иными симптомами. Знание их помогает вовремя принять меры.',
    sections: [
      { title: 'Как отличить грипп от простуды?', content: 'Ключевое различие — скорость начала и интенсивность. Грипп начинается внезапно с высокой температурой (38,5-40°C), ознобом и интенсивными болями в мышцах. Простуда начинается медленно с насморком и без высокой температуры.', list: ['Внезапная высокая температура → грипп', 'Постепенное начало с заложенностью → простуда', 'Интенсивные боли в мышцах → грипп', 'Частое чихание без температуры → простуда'] },
      { title: 'Основные симптомы гриппа 2025', content: 'Наиболее часто сообщаемые симптомы в этом сезоне:', list: ['Температура 38,5-40°C', 'Озноб и потоотделение', 'Интенсивные мышечные и суставные боли', 'Лобная головная боль', 'Сухой стойкий кашель', 'Крайняя усталость', 'В некоторых случаях: тошнота и рвота'] },
      { title: 'Продолжительность и течение', content: 'Температура обычно держится 3-5 дней. Усталость может сохраняться 1-2 недели после выздоровления. Большинство здоровых взрослых выздоравливают без осложнений за 7-10 дней.' },
      { title: 'Когда к врачу?', content: '', list: ['Очень высокая температура (>39,5°C), не снижающаяся парацетамолом', 'Затруднённое дыхание или боль в груди', 'Спутанность или дезориентация', 'Симптомы улучшаются, затем резко ухудшаются', 'Группы риска: старше 65, беременные, хронически больные'] },
      { title: 'Как защититься', list: ['Ежегодная вакцинация — наиболее эффективная мера', 'Частое мытьё рук', 'Проветривание закрытых помещений', 'Избегайте контакта с заражёнными', 'Отдыхайте при симптомах — не заражайте на работе'] },
    ],
    cta_title: 'У вас симптомы гриппа?',
    cta_text: 'Анализируйте симптомы с Sympto+ и получите рекомендации за секунды.',
    cta_btn: 'Анализировать симптомы →',
    back: '← Блог',
  },
};

export default async function GripePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = C[locale as keyof typeof C] || C.es;
  return <ArticleLayout locale={locale} c={c} />;
}

function ArticleLayout({ locale, c }: { locale: string; c: typeof C.es }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link href={`/${locale}/blog`} className="text-sm text-slate-400 hover:text-blue-600 transition mb-6 inline-block">{c.back}</Link>
        <span className="inline-block bg-blue-50 text-blue-600 border border-blue-100 text-xs font-semibold px-3 py-1 rounded-full mb-4">🤧 {c.tag}</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">{c.title}</h1>
        <p className="text-xs text-slate-400 mb-4">{c.updated}</p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-8 text-xs text-amber-700">{c.disclaimer}</div>
        <p className="text-slate-600 leading-relaxed mb-8 text-base">{c.intro}</p>
        <div className="space-y-6">
          {c.sections.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-3">{s.title}</h2>
              {s.content && <p className="text-slate-600 text-sm leading-relaxed mb-3">{s.content}</p>}
              {s.list && <ul className="space-y-1.5">{s.list.map((item, j) => <li key={j} className="flex items-start gap-2 text-sm text-slate-600"><span className="text-blue-400 mt-0.5 shrink-0">•</span>{item}</li>)}</ul>}
            </div>
          ))}
        </div>
        <div className="mt-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">{c.cta_title}</h3>
          <p className="text-blue-200 text-sm mb-6">{c.cta_text}</p>
          <Link href={`/${locale}`} className="inline-block bg-white text-blue-700 font-bold px-6 py-3 rounded-2xl text-sm hover:bg-blue-50 transition">{c.cta_btn}</Link>
        </div>
      </div>
    </main>
  );
}