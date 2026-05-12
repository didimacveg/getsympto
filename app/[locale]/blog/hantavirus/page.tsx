import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    es: 'Hantavirus: síntomas, contagio y cuándo ir al médico | Sympto+',
    en: 'Hantavirus: symptoms, transmission and when to see a doctor | Sympto+',
    zh: '汉坦病毒：症状、传播和何时就医 | Sympto+',
    ru: 'Хантавирус: симптомы, передача и когда к врачу | Sympto+',
  };
  const descs: Record<string, string> = {
    es: 'Todo sobre el hantavirus: síntomas iniciales, cómo se contagia, si hay tratamiento y cuándo es urgente consultar al médico.',
    en: 'Everything about hantavirus: early symptoms, how it spreads, whether there is treatment and when to urgently see a doctor.',
    zh: '关于汉坦病毒的一切：早期症状、传播方式、是否有治疗方法以及何时紧急就医。',
    ru: 'Всё о хантавирусе: ранние симптомы, пути передачи, лечение и когда срочно к врачу.',
  };
  return { title: titles[locale] || titles.es, description: descs[locale] || descs.es };
}

const CONTENT = {
  es: {
    back: '← Blog',
    tag: 'Actualidad sanitaria',
    title: 'Hantavirus: síntomas, contagio y cuándo ir al médico',
    updated: 'Actualizado: mayo 2025',
    disclaimer: '⚠️ Este contenido es informativo. Ante cualquier síntoma sospechoso consulta con un médico.',
    intro: 'El hantavirus es una infección viral transmitida principalmente por roedores que ha generado preocupación en varios países. Aunque los casos en humanos son poco frecuentes, es importante conocer sus síntomas para actuar a tiempo.',
    sections: [
      {
        title: '¿Qué es el hantavirus?',
        content: 'El hantavirus es un grupo de virus transmitidos por roedores infectados, principalmente ratones de campo. En humanos puede causar dos enfermedades graves: el Síndrome Pulmonar por Hantavirus (SPH) y la Fiebre Hemorrágica con Síndrome Renal (FHSR). No se transmite de persona a persona.',
      },
      {
        title: '¿Cómo se contagia?',
        content: 'El contagio ocurre principalmente por inhalación de partículas de orina, heces o saliva de roedores infectados. También puede producirse por contacto directo con roedores o sus excrementos, o a través de mordeduras. Las zonas rurales, graneros, cabañas o espacios poco ventilados con presencia de roedores presentan mayor riesgo.',
      },
      {
        title: 'Síntomas iniciales del hantavirus',
        content: 'Los primeros síntomas aparecen entre 1 y 8 semanas tras la exposición y pueden confundirse con una gripe:',
        list: [
          'Fiebre alta (38-40°C)',
          'Fatiga y debilidad intensa',
          'Dolor muscular (especialmente en muslos, caderas y espalda)',
          'Dolor de cabeza',
          'Escalofríos',
          'Náuseas, vómitos o diarrea (en algunos casos)',
        ],
      },
      {
        title: 'Síntomas tardíos — cuándo es urgente',
        content: 'Entre 4 y 10 días después de los síntomas iniciales pueden aparecer signos más graves:',
        list: [
          'Dificultad para respirar (señal de alarma principal)',
          'Tos seca e irritativa',
          'Presión en el pecho',
          'Líquido en los pulmones',
          'Caída brusca de la presión arterial',
        ],
        alert: 'Si aparece dificultad para respirar tras días de fiebre y dolores musculares, acude a urgencias inmediatamente o llama al 112.',
      },
      {
        title: '¿Tiene tratamiento el hantavirus?',
        content: 'No existe tratamiento antiviral específico aprobado para el hantavirus. El tratamiento es de soporte: hospitalización, oxigenoterapia y en casos graves ventilación mecánica. Cuanto antes se detecta, mejor es el pronóstico. La tasa de mortalidad del SPH puede ser alta si no se trata a tiempo.',
      },
      {
        title: 'Cómo prevenir el contagio',
        list: [
          'Evitar el contacto con roedores y sus excrementos',
          'Ventilar bien espacios cerrados antes de entrar (cabañas, graneros)',
          'Usar mascarilla y guantes al limpiar zonas con presencia de roedores',
          'No sacudir el polvo — humedece antes de limpiar',
          'Sellar grietas y agujeros donde puedan entrar roedores',
          'Guardar alimentos en recipientes herméticos',
        ],
      },
    ],
    cta_title: '¿Tienes síntomas parecidos?',
    cta_text: 'Analiza tus síntomas con nuestra IA clínica y recibe orientación en segundos.',
    cta_btn: 'Analizar mis síntomas →',
  },
  en: {
    back: '← Blog',
    tag: 'Health news',
    title: 'Hantavirus: symptoms, transmission and when to see a doctor',
    updated: 'Updated: May 2025',
    disclaimer: '⚠️ This content is informational. If you have suspicious symptoms, consult a doctor.',
    intro: 'Hantavirus is a viral infection transmitted mainly by rodents that has raised concern in several countries. Although human cases are rare, it is important to know the symptoms to act in time.',
    sections: [
      {
        title: 'What is hantavirus?',
        content: 'Hantavirus is a group of viruses transmitted by infected rodents, mainly field mice. In humans it can cause two serious diseases: Hantavirus Pulmonary Syndrome (HPS) and Hemorrhagic Fever with Renal Syndrome (HFRS). It is not transmitted from person to person.',
      },
      {
        title: 'How is it transmitted?',
        content: 'Transmission occurs mainly through inhalation of particles from urine, faeces or saliva of infected rodents. It can also occur through direct contact with rodents or their excrement, or through bites. Rural areas, barns, cabins or poorly ventilated spaces with rodent presence carry higher risk.',
      },
      {
        title: 'Early symptoms of hantavirus',
        content: 'First symptoms appear 1 to 8 weeks after exposure and can be confused with flu:',
        list: [
          'High fever (38-40°C)',
          'Intense fatigue and weakness',
          'Muscle pain (especially thighs, hips and back)',
          'Headache',
          'Chills',
          'Nausea, vomiting or diarrhoea (in some cases)',
        ],
      },
      {
        title: 'Late symptoms — when it is urgent',
        content: '4 to 10 days after initial symptoms, more serious signs may appear:',
        list: [
          'Difficulty breathing (main warning sign)',
          'Dry, irritating cough',
          'Chest pressure',
          'Fluid in the lungs',
          'Sudden drop in blood pressure',
        ],
        alert: 'If breathing difficulty appears after days of fever and muscle pain, go to the emergency room immediately or call emergency services.',
      },
      {
        title: 'Is there treatment for hantavirus?',
        content: 'There is no approved specific antiviral treatment for hantavirus. Treatment is supportive: hospitalisation, oxygen therapy and in severe cases mechanical ventilation. The earlier it is detected, the better the prognosis. The HPS mortality rate can be high if not treated in time.',
      },
      {
        title: 'How to prevent infection',
        list: [
          'Avoid contact with rodents and their excrement',
          'Ventilate enclosed spaces before entering (cabins, barns)',
          'Use mask and gloves when cleaning areas with rodent presence',
          'Do not shake dust — wet before cleaning',
          'Seal cracks and holes where rodents could enter',
          'Store food in airtight containers',
        ],
      },
    ],
    cta_title: 'Do you have similar symptoms?',
    cta_text: 'Analyse your symptoms with our clinical AI and get guidance in seconds.',
    cta_btn: 'Analyse my symptoms →',
  },
  zh: {
    back: '← 博客',
    tag: '健康资讯',
    title: '汉坦病毒：症状、传播途径及何时就医',
    updated: '更新时间：2025年5月',
    disclaimer: '⚠️ 本内容仅供参考。如有可疑症状，请咨询医生。',
    intro: '汉坦病毒是一种主要由啮齿动物传播的病毒感染，在多个国家引起了关注。虽然人类病例很少见，但了解其症状以便及时采取行动非常重要。',
    sections: [
      {
        title: '什么是汉坦病毒？',
        content: '汉坦病毒是一组由感染的啮齿动物（主要是田鼠）传播的病毒。在人类中可引起两种严重疾病：汉坦病毒肺综合征（HPS）和肾综合征出血热（HFRS）。不会人传人。',
      },
      {
        title: '如何传播？',
        content: '传播主要通过吸入感染啮齿动物的尿液、粪便或唾液颗粒。也可通过直接接触啮齿动物或其排泄物，或通过咬伤传播。农村地区、谷仓、小屋或有啮齿动物出没的通风不良空间风险更高。',
      },
      {
        title: '汉坦病毒早期症状',
        content: '最初症状在接触后1至8周出现，可能与流感混淆：',
        list: ['高烧（38-40°C）', '强烈疲劳和虚弱', '肌肉疼痛（尤其是大腿、髋部和背部）', '头痛', '发冷', '恶心、呕吐或腹泻（某些情况下）'],
      },
      {
        title: '晚期症状——何时紧急就医',
        content: '初始症状后4至10天可能出现更严重的迹象：',
        list: ['呼吸困难（主要警告信号）', '干燥刺激性咳嗽', '胸部压迫感', '肺部积液', '血压骤降'],
        alert: '如果发烧和肌肉疼痛数天后出现呼吸困难，请立即去急诊室或拨打急救电话。',
      },
      {
        title: '汉坦病毒有治疗方法吗？',
        content: '目前没有获批的汉坦病毒特异性抗病毒治疗。治疗为支持性：住院、氧疗，严重情况下机械通气。发现越早，预后越好。如不及时治疗，HPS死亡率可能很高。',
      },
      {
        title: '如何预防感染',
        list: ['避免接触啮齿动物及其排泄物', '进入封闭空间前先通风（小屋、谷仓）', '清洁有啮齿动物出没的区域时戴口罩和手套', '不要扬尘——清洁前先湿润', '封堵啮齿动物可能进入的裂缝和洞', '将食物存放在密封容器中'],
      },
    ],
    cta_title: '您有类似症状吗？',
    cta_text: '使用我们的临床AI分析您的症状，几秒内获得指导。',
    cta_btn: '分析我的症状 →',
  },
  ru: {
    back: '← Блог',
    tag: 'Новости здоровья',
    title: 'Хантавирус: симптомы, передача и когда к врачу',
    updated: 'Обновлено: май 2025',
    disclaimer: '⚠️ Этот материал носит информационный характер. При подозрительных симптомах обратитесь к врачу.',
    intro: 'Хантавирус — вирусная инфекция, передаваемая преимущественно грызунами, вызвавшая обеспокоенность в ряде стран. Хотя случаи заражения людей редки, важно знать симптомы, чтобы вовремя принять меры.',
    sections: [
      {
        title: 'Что такое хантавирус?',
        content: 'Хантавирус — группа вирусов, передаваемых инфицированными грызунами, преимущественно полёвками. У людей может вызывать две серьёзные болезни: хантавирусный лёгочный синдром (ХЛС) и геморрагическую лихорадку с почечным синдромом (ГЛПС). От человека к человеку не передаётся.',
      },
      {
        title: 'Как передаётся?',
        content: 'Передача происходит главным образом через вдыхание частиц мочи, кала или слюны инфицированных грызунов. Возможен прямой контакт с грызунами или их экскрементами, а также укусы. Повышенный риск в сельской местности, амбарах, хижинах или плохо вентилируемых помещениях с грызунами.',
      },
      {
        title: 'Ранние симптомы хантавируса',
        content: 'Первые симптомы появляются через 1–8 недель после контакта и могут напоминать грипп:',
        list: ['Высокая температура (38–40°C)', 'Сильная усталость и слабость', 'Боль в мышцах (особенно бёдра, бока и спина)', 'Головная боль', 'Озноб', 'Тошнота, рвота или диарея (в некоторых случаях)'],
      },
      {
        title: 'Поздние симптомы — когда срочно',
        content: 'Через 4–10 дней после начальных симптомов могут появиться более серьёзные признаки:',
        list: ['Затруднённое дыхание (главный тревожный признак)', 'Сухой раздражающий кашель', 'Давление в груди', 'Жидкость в лёгких', 'Резкое падение давления'],
        alert: 'Если после дней с температурой и болями в мышцах появляется затруднённое дыхание — немедленно в скорую или вызывайте 112.',
      },
      {
        title: 'Есть ли лечение от хантавируса?',
        content: 'Специфического одобренного противовирусного лечения хантавируса не существует. Лечение поддерживающее: госпитализация, оксигенотерапия, в тяжёлых случаях ИВЛ. Чем раньше обнаружен — тем лучше прогноз. Летальность ХЛС может быть высокой без своевременного лечения.',
      },
      {
        title: 'Как предотвратить заражение',
        list: ['Избегать контакта с грызунами и их экскрементами', 'Проветривать закрытые помещения перед входом (хижины, амбары)', 'Использовать маску и перчатки при уборке мест с грызунами', 'Не поднимать пыль — смачивайте перед уборкой', 'Заделывать щели и отверстия, через которые могут проникнуть грызуны', 'Хранить продукты в герметичных контейнерах'],
      },
    ],
    cta_title: 'У вас похожие симптомы?',
    cta_text: 'Проанализируйте симптомы с нашим клиническим ИИ и получите рекомендации за секунды.',
    cta_btn: 'Анализировать симптомы →',
  },
};

export default async function HantavirusPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = CONTENT[locale as keyof typeof CONTENT] || CONTENT.es;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-10">

        <Link href={`/${locale}/blog`} className="text-sm text-slate-400 hover:text-blue-600 transition mb-6 inline-block">
          {c.back}
        </Link>

        {/* Tag */}
        <span className="inline-block bg-red-50 text-red-600 border border-red-100 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          🦠 {c.tag}
        </span>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          {c.title}
        </h1>
        <p className="text-xs text-slate-400 mb-4">{c.updated}</p>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-8 text-xs text-amber-700">
          {c.disclaimer}
        </div>

        {/* Intro */}
        <p className="text-slate-600 leading-relaxed mb-8 text-base">{c.intro}</p>

        {/* Sections */}
        <div className="space-y-8">
          {c.sections.map((section, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-3">{section.title}</h2>
              {section.content && (
                <p className="text-slate-600 text-sm leading-relaxed mb-3">{section.content}</p>
              )}
              {section.list && (
                <ul className="space-y-1.5">
                  {section.list.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {section.alert && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-700 font-medium">
                  🚨 {section.alert}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">{c.cta_title}</h3>
          <p className="text-blue-200 text-sm mb-6">{c.cta_text}</p>
          <Link
            href={`/${locale}`}
            className="inline-block bg-white text-blue-700 font-bold px-6 py-3 rounded-2xl text-sm hover:bg-blue-50 transition"
          >
            {c.cta_btn}
          </Link>
        </div>

        <p className="text-center text-xs text-slate-400 mt-8">
          © 2025 Sympto+ · {locale === 'en' ? 'Informational purposes only' : locale === 'zh' ? '仅供参考' : locale === 'ru' ? 'Только в информационных целях' : 'Solo orientación informativa'}
        </p>
      </div>
    </main>
  );
}