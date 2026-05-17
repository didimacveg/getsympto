import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t: Record<string, { title: string; desc: string }> = {
    es: { title: 'Mpox (viruela del mono): síntomas, contagio y prevención | Sympto+', desc: 'Mpox: síntomas iniciales, cómo se contagia, erupción cutánea, tratamiento y cuándo consultar al médico.' },
    en: { title: 'Mpox (monkeypox): symptoms, transmission and prevention | Sympto+', desc: 'Mpox: early symptoms, how it spreads, skin rash, treatment and when to see a doctor.' },
    zh: { title: 'Mpox（猴痘）：症状、传播和预防 | Sympto+', desc: 'Mpox：早期症状、传播方式、皮疹、治疗及何时就医。' },
    ru: { title: 'Mpox (оспа обезьян): симптомы, передача и профилактика | Sympto+', desc: 'Mpox: ранние симптомы, как передаётся, кожные высыпания, лечение и когда к врачу.' },
  };
  const m = t[locale] || t.es;
  return { title: m.title, description: m.desc };
}

const C = {
  es: {
    tag: '🦠 Vigilancia sanitaria', title: 'Mpox (viruela del mono): síntomas, contagio y qué hacer',
    updated: 'Mayo 2025', disclaimer: '⚠️ Contenido informativo. Si tienes lesiones cutáneas sospechosas, consulta a tu médico.',
    intro: 'El mpox (antes llamado viruela del mono) es una enfermedad vírica causada por el virus Monkeypox. Tras el brote global de 2022, sigue siendo una enfermedad de vigilancia activa en España y Europa.',
    sections: [
      { title: '¿Cómo se contagia?', content: '', list: ['Contacto directo con lesiones cutáneas de una persona infectada', 'Contacto con fluidos corporales', 'Contacto con materiales contaminados (ropa de cama, ropa)', 'Contacto cercano y prolongado cara a cara (por gotículas respiratorias)', 'Menos frecuente: de animales infectados a humanos'] },
      { title: 'Síntomas iniciales (días 1-5)', content: '', list: ['Fiebre de 38-39°C de inicio brusco', 'Dolor de cabeza intenso', 'Ganglios inflamados (cuello, axilas, ingles) — signo característico', 'Dolores musculares', 'Cansancio y decaimiento general'] },
      { title: 'Erupción cutánea (signo principal)', content: 'Aparece 1-3 días después de la fiebre y evoluciona por fases:', list: ['Máculas (manchas planas) → pápulas (elevadas) → vesículas (con líquido) → pústulas → costras', 'Afecta frecuentemente cara, palmas de las manos y plantas de los pies', 'Las lesiones son más dolorosas que en la varicela', 'Puede afectar mucosas (boca, garganta, zona genital)'] },
      { title: 'Cuándo consultar', list: ['Tienes lesiones cutáneas + fiebre + ganglios inflamados', 'Has tenido contacto con persona confirmada de mpox', 'Las lesiones están en cara, boca o zona genital', 'Perteneces a un grupo de riesgo elevado'] },
      { title: 'Prevención', list: ['Evita el contacto piel con piel con personas con lesiones activas', 'Lavado de manos frecuente', 'No compartas ropa, toallas o utensilios', 'La vacuna contra la viruela ofrece protección cruzada'] },
    ],
    cta_title: '¿Tienes lesiones o fiebre sospechosa?',
    cta_text: 'Analiza tus síntomas con IA clínica. Orientación en segundos.',
    cta_btn: 'Analizar síntomas →',
    back: '← Blog',
  },
  en: {
    tag: '🦠 Health surveillance', title: 'Mpox (monkeypox): symptoms, transmission and what to do',
    updated: 'May 2025', disclaimer: '⚠️ Informational content. If you have suspicious skin lesions, consult your doctor.',
    intro: 'Mpox (formerly called monkeypox) is a viral disease caused by the Monkeypox virus. After the 2022 global outbreak, it remains under active surveillance in Spain and Europe.',
    sections: [
      { title: 'How is it transmitted?', content: '', list: ['Direct contact with skin lesions of an infected person', 'Contact with body fluids', 'Contact with contaminated materials (bedding, clothing)', 'Close and prolonged face-to-face contact (respiratory droplets)', 'Less common: from infected animals to humans'] },
      { title: 'Early symptoms (days 1-5)', content: '', list: ['Sudden fever 38-39°C', 'Intense headache', 'Swollen lymph nodes (neck, armpits, groin) — characteristic sign', 'Muscle pain', 'Fatigue and general malaise'] },
      { title: 'Skin rash (main sign)', content: 'Appears 1-3 days after fever and evolves in phases:', list: ['Macules (flat spots) → papules (raised) → vesicles (fluid-filled) → pustules → scabs', 'Frequently affects face, palms and soles of feet', 'Lesions are more painful than chickenpox', 'May affect mucous membranes (mouth, throat, genital area)'] },
      { title: 'When to consult', list: ['You have skin lesions + fever + swollen lymph nodes', 'You have had contact with a confirmed mpox case', 'Lesions are on face, mouth or genital area', 'You belong to a high-risk group'] },
      { title: 'Prevention', list: ['Avoid skin-to-skin contact with people with active lesions', 'Frequent handwashing', 'Do not share clothing, towels or utensils', 'Smallpox vaccine offers cross-protection'] },
    ],
    cta_title: 'Do you have suspicious lesions or fever?',
    cta_text: 'Analyse your symptoms with clinical AI. Guidance in seconds.',
    cta_btn: 'Analyse symptoms →',
    back: '← Blog',
  },
  zh: {
    tag: '🦠 卫生监测', title: 'Mpox（猴痘）：症状、传播及如何应对',
    updated: '2025年5月', disclaimer: '⚠️ 仅供参考。如果有可疑皮肤病变，请咨询医生。',
    intro: 'Mpox（以前称为猴痘）是由猴痘病毒引起的病毒性疾病。2022年全球爆发后，仍在西班牙和欧洲积极监测中。',
    sections: [
      { title: '如何传播？', content: '', list: ['直接接触感染者的皮肤病变', '接触体液', '接触受污染的材料（床上用品、衣物）', '近距离长时间面对面接触（呼吸道飞沫）', '较少见：从感染动物传给人类'] },
      { title: '早期症状（1-5天）', content: '', list: ['突然发烧38-39°C', '剧烈头痛', '淋巴结肿大（颈部、腋窝、腹股沟）— 特征性体征', '肌肉疼痛', '疲劳和全身不适'] },
      { title: '皮疹（主要体征）', content: '发烧后1-3天出现，分阶段发展：', list: ['斑疹（平坦）→ 丘疹（隆起）→ 水疱（含液体）→ 脓疱 → 结痂', '常累及面部、手掌和脚底', '病变比水痘更疼痛', '可能影响黏膜（口腔、喉咙、生殖器区域）'] },
      { title: '何时就诊', list: ['有皮肤病变+发烧+淋巴结肿大', '曾与确诊mpox病例接触', '病变在面部、口腔或生殖器区域', '属于高风险群体'] },
      { title: '预防', list: ['避免与有活动性病变者皮肤接触', '频繁洗手', '不共用衣物、毛巾或餐具', '天花疫苗提供交叉保护'] },
    ],
    cta_title: '您有可疑病变或发烧吗？',
    cta_text: '使用临床AI分析您的症状。几秒钟内获得指导。',
    cta_btn: '分析症状 →',
    back: '← 博客',
  },
  ru: {
    tag: '🦠 Санитарный надзор', title: 'Mpox (оспа обезьян): симптомы, передача и что делать',
    updated: 'Май 2025', disclaimer: '⚠️ Информационный контент. При подозрительных кожных поражениях обратитесь к врачу.',
    intro: 'Mpox (ранее оспа обезьян) — вирусное заболевание, вызванное вирусом Monkeypox. После глобальной вспышки 2022 года по-прежнему находится под активным наблюдением в Испании и Европе.',
    sections: [
      { title: 'Как передаётся?', content: '', list: ['Прямой контакт с кожными поражениями заражённого', 'Контакт с биологическими жидкостями', 'Контакт с загрязнёнными материалами (бельё, одежда)', 'Близкий и продолжительный контакт лицом к лицу (капли)', 'Реже: от заражённых животных к людям'] },
      { title: 'Ранние симптомы (1-5 дней)', content: '', list: ['Внезапная температура 38-39°C', 'Интенсивная головная боль', 'Увеличение лимфоузлов (шея, подмышки, пах) — характерный признак', 'Боли в мышцах', 'Усталость и общее недомогание'] },
      { title: 'Кожная сыпь (главный признак)', content: 'Появляется через 1-3 дня после температуры и развивается поэтапно:', list: ['Макулы (плоские пятна) → папулы (приподнятые) → везикулы (с жидкостью) → пустулы → корки', 'Часто поражает лицо, ладони и подошвы', 'Поражения болезненнее, чем при ветрянке', 'Может затрагивать слизистые (рот, горло, гениталии)'] },
      { title: 'Когда обратиться к врачу', list: ['Кожные поражения + температура + увеличенные лимфоузлы', 'Был контакт с подтверждённым случаем mpox', 'Поражения на лице, во рту или в гениталиях', 'Принадлежите к группе высокого риска'] },
      { title: 'Профилактика', list: ['Избегайте контакта кожа к коже с людьми с активными поражениями', 'Частое мытьё рук', 'Не делитесь одеждой, полотенцами или посудой', 'Прививка от оспы обеспечивает перекрёстную защиту'] },
    ],
    cta_title: 'Подозрительные поражения или температура?',
    cta_text: 'Анализируйте симптомы с клиническим ИИ. Рекомендации за секунды.',
    cta_btn: 'Анализировать симптомы →',
    back: '← Блог',
  },
};

function ArticleLayout({ locale, c }: { locale: string; c: typeof C.es }) {
  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link href={`/${locale}/blog`} className="text-sm text-slate-400 hover:text-blue-600 transition mb-6 inline-block">{c.back}</Link>
        <span className="inline-block bg-purple-50 text-purple-700 border border-purple-100 text-xs font-semibold px-3 py-1 rounded-full mb-4">{c.tag}</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">{c.title}</h1>
        <p className="text-xs text-slate-400 mb-4">{c.updated}</p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-8 text-xs text-amber-700">{c.disclaimer}</div>
        <p className="text-slate-600 leading-relaxed mb-8 text-base">{c.intro}</p>
        <div className="space-y-6">
          {c.sections.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-3">{s.title}</h2>
              {s.content && <p className="text-slate-600 text-sm leading-relaxed mb-3">{s.content}</p>}
              {s.list && s.list.length > 0 && <ul className="space-y-1.5">{s.list.map((item, j) => <li key={j} className="flex items-start gap-2 text-sm text-slate-600"><span className="text-purple-400 mt-0.5 shrink-0">•</span>{item}</li>)}</ul>}
            </div>
          ))}
        </div>
        <div className="mt-10 bg-linear-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">{c.cta_title}</h3>
          <p className="text-purple-100 text-sm mb-6">{c.cta_text}</p>
          <Link href={`/${locale}`} className="inline-block bg-white text-purple-700 font-bold px-6 py-3 rounded-2xl text-sm hover:bg-purple-50 transition">{c.cta_btn}</Link>
        </div>
      </div>
    </main>
  );
}

export default async function MpoxPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = C[locale as keyof typeof C] || C.es;
  return <ArticleLayout locale={locale} c={c} />;
}