import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t: Record<string, { title: string; desc: string }> = {
    es: { title: 'Alergia al sol: síntomas, tipos y tratamiento | Sympto+', desc: 'Alergia solar o erupción polimorfa lumínica: síntomas, qué zonas afecta, tratamiento y prevención.' },
    en: { title: 'Sun allergy: symptoms, types and treatment | Sympto+', desc: 'Sun allergy or polymorphic light eruption: symptoms, which areas are affected, treatment and prevention.' },
    zh: { title: '太阳过敏：症状、类型和治疗 | Sympto+', desc: '日光过敏或多形性日光疹：症状、受影响区域、治疗和预防。' },
    ru: { title: 'Аллергия на солнце: симптомы, виды и лечение | Sympto+', desc: 'Солнечная аллергия или полиморфная световая сыпь: симптомы, зоны, лечение и профилактика.' },
  };
  const m = t[locale] || t.es;
  return { title: m.title, description: m.desc };
}

const C = {
  es: {
    tag: '☀️ Alergias estivales', title: 'Alergia al sol: síntomas, tipos y cómo tratarla',
    updated: 'Mayo 2025', disclaimer: '⚠️ Contenido informativo. Consulta a tu dermatólogo.',
    intro: 'La alergia al sol o fotodermatosis es una reacción cutánea que aparece tras la exposición a la radiación ultravioleta. Afecta a millones de personas especialmente en primavera y verano.',
    sections: [
      { title: 'Síntomas de la alergia al sol', content: '', list: ['Picor intenso en zonas expuestas (escote, brazos, nuca)', 'Enrojecimiento y rojeces en la piel', 'Pequeñas ronchas o vesículas', 'Sensación de ardor o calor excesivo', 'Aparece horas después de la exposición solar'] },
      { title: 'Tipos más frecuentes', content: '', list: ['Erupción polimorfa lumínica — la más común, especialmente en mujeres jóvenes', 'Urticaria solar — ronchas que aparecen minutos tras la exposición', 'Fotodermatitis de contacto — por interacción de cremas o perfumes con el sol', 'Reacción a medicamentos fotosensibles — antibióticos, diuréticos, anticonceptivos'] },
      { title: 'Tratamiento', content: '', list: ['Antihistamínicos orales para el picor', 'Corticoides tópicos en caso de inflamación importante', 'Compresas frías sobre las zonas afectadas', 'Evitar el sol hasta que las lesiones mejoren', 'Hidratación intensa de la piel'] },
      { title: 'Prevención', list: ['Usa protector solar SPF 50+ en todas las zonas expuestas', 'Aplica el protector 30 min antes de salir y repítelo cada 2h', 'Evita la exposición solar entre 12:00 y 16:00', 'Ropa con protección UV si eres muy sensible', 'Desconfía de perfumes o colonias antes del sol'] },
    ],
    cta_title: '¿Tienes síntomas de alergia?',
    cta_text: 'Analiza tus síntomas ahora con IA clínica. Gratis.',
    cta_btn: 'Analizar síntomas →',
    back: '← Blog',
  },
  en: {
    tag: '☀️ Summer allergies', title: 'Sun allergy: symptoms, types and how to treat it',
    updated: 'May 2025', disclaimer: '⚠️ Informational content. Consult your dermatologist.',
    intro: 'Sun allergy or photodermatosis is a skin reaction appearing after exposure to ultraviolet radiation. It affects millions of people especially in spring and summer.',
    sections: [
      { title: 'Sun allergy symptoms', content: '', list: ['Intense itching in exposed areas (chest, arms, nape)', 'Redness and skin flushes', 'Small welts or blisters', 'Burning or excessive heat sensation', 'Appears hours after sun exposure'] },
      { title: 'Most common types', content: '', list: ['Polymorphic light eruption — most common, especially in young women', 'Solar urticaria — welts appearing minutes after exposure', 'Contact photodermatitis — from creams or perfumes interacting with sun', 'Reaction to photosensitive medications — antibiotics, diuretics, contraceptives'] },
      { title: 'Treatment', content: '', list: ['Oral antihistamines for itching', 'Topical corticosteroids for significant inflammation', 'Cold compresses on affected areas', 'Avoid sun until lesions improve', 'Intensive skin hydration'] },
      { title: 'Prevention', list: ['Use SPF 50+ sunscreen on all exposed areas', 'Apply sunscreen 30 min before going out and reapply every 2h', 'Avoid sun exposure between 12:00 and 16:00', 'UV-protective clothing if very sensitive', 'Avoid perfumes or colognes before sun exposure'] },
    ],
    cta_title: 'Do you have allergy symptoms?',
    cta_text: 'Analyse your symptoms now with clinical AI. Free.',
    cta_btn: 'Analyse symptoms →',
    back: '← Blog',
  },
  zh: {
    tag: '☀️ 夏季过敏', title: '太阳过敏：症状、类型及治疗',
    updated: '2025年5月', disclaimer: '⚠️ 仅供参考。请咨询皮肤科医生。',
    intro: '日光过敏或光性皮炎是暴露于紫外线辐射后出现的皮肤反应，尤其在春夏季影响数百万人。',
    sections: [
      { title: '日光过敏症状', content: '', list: ['暴露区域（领口、手臂、颈背）强烈瘙痒', '皮肤发红和潮红', '小风团或水疱', '灼热感或过度热感', '日晒后数小时出现'] },
      { title: '最常见类型', content: '', list: ['多形性日光疹 — 最常见，尤其在年轻女性中', '日光性荨麻疹 — 暴露后数分钟出现的风团', '接触性光皮炎 — 霜剂或香水与阳光相互作用', '光敏药物反应 — 抗生素、利尿剂、避孕药'] },
      { title: '治疗', content: '', list: ['口服抗组胺药止痒', '严重炎症时外用皮质类固醇', '受影响区域冷敷', '病变改善前避免阳光', '密集皮肤保湿'] },
      { title: '预防', list: ['在所有暴露区域使用SPF 50+防晒霜', '出门前30分钟涂防晒霜，每2小时重新涂抹', '避免12:00至16:00期间日晒', '非常敏感时穿防UV衣物', '日晒前避免使用香水或古龙水'] },
    ],
    cta_title: '您有过敏症状吗？',
    cta_text: '现在用临床AI分析您的症状。免费。',
    cta_btn: '分析症状 →',
    back: '← 博客',
  },
  ru: {
    tag: '☀️ Летние аллергии', title: 'Аллергия на солнце: симптомы, виды и лечение',
    updated: 'Май 2025', disclaimer: '⚠️ Информационный контент. Обратитесь к дерматологу.',
    intro: 'Аллергия на солнце или фотодерматоз — кожная реакция на ультрафиолетовое излучение. Затрагивает миллионы людей, особенно весной и летом.',
    sections: [
      { title: 'Симптомы аллергии на солнце', content: '', list: ['Интенсивный зуд в открытых зонах (зона декольте, руки, затылок)', 'Покраснение и гиперемия кожи', 'Мелкие волдыри или пузырьки', 'Ощущение жжения или избыточного тепла', 'Появляется через часы после воздействия солнца'] },
      { title: 'Наиболее частые типы', content: '', list: ['Полиморфная световая сыпь — наиболее частая, особенно у молодых женщин', 'Солнечная крапивница — волдыри, появляющиеся через минуты после воздействия', 'Контактный фотодерматит — от взаимодействия кремов или духов с солнцем', 'Реакция на фотосенсибилизирующие лекарства — антибиотики, диуретики, контрацептивы'] },
      { title: 'Лечение', content: '', list: ['Пероральные антигистамины от зуда', 'Местные кортикостероиды при значительном воспалении', 'Холодные компрессы на поражённые зоны', 'Избегайте солнца до улучшения поражений', 'Интенсивное увлажнение кожи'] },
      { title: 'Профилактика', list: ['Используйте SPF 50+ солнцезащитный крем на все открытые зоны', 'Наносите крем за 30 мин до выхода и повторяйте каждые 2ч', 'Избегайте солнца с 12:00 до 16:00', 'УФ-защитная одежда при высокой чувствительности', 'Избегайте духов или одеколонов перед пребыванием на солнце'] },
    ],
    cta_title: 'У вас симптомы аллергии?',
    cta_text: 'Анализируйте симптомы с клиническим ИИ. Бесплатно.',
    cta_btn: 'Анализировать симптомы →',
    back: '← Блог',
  },
};

function ArticleLayout({ locale, c }: { locale: string; c: typeof C.es }) {
  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link href={`/${locale}/blog`} className="text-sm text-slate-400 hover:text-blue-600 transition mb-6 inline-block">{c.back}</Link>
        <span className="inline-block bg-yellow-50 text-yellow-600 border border-yellow-100 text-xs font-semibold px-3 py-1 rounded-full mb-4">{c.tag}</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">{c.title}</h1>
        <p className="text-xs text-slate-400 mb-4">{c.updated}</p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-8 text-xs text-amber-700">{c.disclaimer}</div>
        <p className="text-slate-600 leading-relaxed mb-8 text-base">{c.intro}</p>
        <div className="space-y-6">
          {c.sections.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-3">{s.title}</h2>
              {s.content && <p className="text-slate-600 text-sm leading-relaxed mb-3">{s.content}</p>}
              {s.list && s.list.length > 0 && <ul className="space-y-1.5">{s.list.map((item, j) => <li key={j} className="flex items-start gap-2 text-sm text-slate-600"><span className="text-yellow-400 mt-0.5 shrink-0">•</span>{item}</li>)}</ul>}
            </div>
          ))}
        </div>
        <div className="mt-10 bg-linear-to-r from-yellow-500 to-orange-400 rounded-3xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">{c.cta_title}</h3>
          <p className="text-yellow-100 text-sm mb-6">{c.cta_text}</p>
          <Link href={`/${locale}`} className="inline-block bg-white text-yellow-700 font-bold px-6 py-3 rounded-2xl text-sm hover:bg-yellow-50 transition">{c.cta_btn}</Link>
        </div>
      </div>
    </main>
  );
}

export default async function AlergiaSolPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = C[locale as keyof typeof C] || C.es;
  return <ArticleLayout locale={locale} c={c} />;
}