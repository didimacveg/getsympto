import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    es: 'Política de Privacidad | Sympto+',
    en: 'Privacy Policy | Sympto+',
    zh: '隐私政策 | Sympto+',
    ru: 'Политика конфиденциальности | Sympto+',
  };
  const descs: Record<string, string> = {
    es: 'Política de privacidad de Sympto+. Cómo recopilamos, usamos y protegemos tus datos personales.',
    en: 'Sympto+ privacy policy. How we collect, use and protect your personal data.',
    zh: 'Sympto+隐私政策。我们如何收集、使用和保护您的个人数据。',
    ru: 'Политика конфиденциальности Sympto+. Как мы собираем, используем и защищаем ваши данные.',
  };
  return { title: titles[locale] || titles.es, description: descs[locale] || descs.es };
}

const CONTENT = {
  es: {
    back: '← Inicio',
    title: 'Política de Privacidad',
    updated: 'Última actualización: mayo 2025',
    sections: [
      {
        title: '1. Responsable del tratamiento',
        content: 'Sympto+ ("nosotros", "nuestro") es responsable del tratamiento de los datos personales recogidos a través de https://getsympto.app. Para cualquier consulta sobre privacidad, puedes contactarnos en: privacy@getsympto.app',
      },
      {
        title: '2. Datos que recopilamos',
        items: [
          'Datos de cuenta: dirección de email y nombre de usuario (si te registras)',
          'Datos de uso: síntomas descritos, zona corporal seleccionada, idioma, fecha y hora de consulta',
          'Datos técnicos: dirección IP, tipo de navegador, sistema operativo, páginas visitadas',
          'Cookies analíticas: Google Analytics (datos anonimizados de navegación)',
        ],
      },
      {
        title: '3. Finalidad del tratamiento',
        items: [
          'Proporcionar el servicio de análisis informativo de síntomas',
          'Mejorar la calidad y precisión del servicio',
          'Gestionar cuentas de usuario y suscripciones premium',
          'Enviar comunicaciones relacionadas con el servicio (si has dado consentimiento)',
          'Análisis estadístico anónimo del uso de la plataforma',
        ],
      },
      {
        title: '4. Base legal del tratamiento (RGPD)',
        items: [
          'Ejecución del contrato: tratamiento necesario para prestarte el servicio',
          'Interés legítimo: mejora del servicio y seguridad',
          'Consentimiento: para comunicaciones de marketing y cookies analíticas',
          'Obligación legal: cuando sea requerido por ley',
        ],
      },
      {
        title: '5. Transferencias internacionales de datos',
        content: 'Utilizamos los siguientes proveedores que pueden procesar datos fuera del Espacio Económico Europeo, todos con garantías adecuadas (cláusulas contractuales tipo de la UE o certificación Privacy Shield equivalente):',
        items: [
          'Anthropic (Estados Unidos): procesamiento de consultas de síntomas mediante IA',
          'Supabase (Estados Unidos/Europa): almacenamiento de datos de usuario',
          'Vercel (Estados Unidos): infraestructura de hosting',
          'Google Analytics (Estados Unidos): análisis de tráfico web anonimizado',
        ],
      },
      {
        title: '6. Conservación de datos',
        items: [
          'Datos de cuenta: mientras mantengas cuenta activa + 30 días tras cancelación',
          'Historial de consultas: 12 meses desde la consulta',
          'Datos técnicos y logs: 90 días',
          'Datos de facturación: 7 años (obligación legal)',
        ],
      },
      {
        title: '7. Tus derechos (RGPD)',
        content: 'Si eres residente de la UE/EEE tienes derecho a:',
        items: [
          'Acceso: solicitar copia de tus datos personales',
          'Rectificación: corregir datos inexactos',
          'Supresión ("derecho al olvido"): solicitar eliminación de tus datos',
          'Oposición: oponerte al tratamiento por interés legítimo',
          'Portabilidad: recibir tus datos en formato legible por máquina',
          'Limitación: restringir el tratamiento en determinadas circunstancias',
          'Retirar el consentimiento en cualquier momento',
        ],
      },
      {
        title: '8. Derechos CCPA (California)',
        content: 'Si eres residente de California (EE.UU.), tienes derechos adicionales bajo la California Consumer Privacy Act:',
        items: [
          'Derecho a saber qué datos personales recopilamos y cómo los usamos',
          'Derecho a eliminar datos personales',
          'Derecho a no discriminación por ejercer tus derechos',
          'No vendemos datos personales a terceros',
        ],
      },
      {
        title: '9. Datos de salud — aviso especial',
        content: 'Los síntomas que describes son datos de salud especialmente sensibles. Los tratamos con las siguientes garantías adicionales:',
        items: [
          'No compartimos síntomas individuales con terceros sin tu consentimiento explícito',
          'Los análisis de IA se procesan en tiempo real sin almacenamiento permanente en servidores de Anthropic',
          'No utilizamos tus datos de salud para publicidad personalizada',
          'No vendemos datos de salud bajo ninguna circunstancia',
        ],
      },
      {
        title: '10. Cookies',
        content: 'Usamos cookies técnicas necesarias para el funcionamiento del servicio y cookies analíticas de Google Analytics (con IP anonimizada). Puedes gestionar las cookies desde la configuración de tu navegador. Las cookies técnicas no pueden desactivarse sin afectar al funcionamiento del servicio.',
      },
      {
        title: '11. Seguridad',
        content: 'Implementamos medidas técnicas y organizativas apropiadas: cifrado TLS en tránsito, cifrado en reposo, acceso restringido a datos, monitorización de seguridad y auditorías periódicas.',
      },
      {
        title: '12. Menores de edad',
        content: 'El servicio está dirigido a mayores de 16 años. No recopilamos intencionadamente datos de menores de 16 años. Si eres padre/madre y crees que tu hijo ha facilitado datos personales, contáctanos en privacy@getsympto.app.',
      },
      {
        title: '13. Cambios en esta política',
        content: 'Podemos actualizar esta política periódicamente. Te notificaremos cambios significativos por email o mediante aviso en la plataforma. La versión actualizada siempre estará disponible en esta página.',
      },
      {
        title: '14. Cómo ejercer tus derechos',
        content: 'Envía un email a privacy@getsympto.app indicando el derecho que deseas ejercer y tu identificación. Responderemos en un máximo de 30 días. Si no estás satisfecho con nuestra respuesta, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (aepd.es) o la autoridad de control de tu país de residencia.',
      },
    ],
  },
  en: {
    back: '← Home',
    title: 'Privacy Policy',
    updated: 'Last updated: May 2025',
    sections: [
      {
        title: '1. Data Controller',
        content: 'Sympto+ ("we", "our") is the data controller for personal data collected through https://getsympto.app. For any privacy enquiries, contact us at: privacy@getsympto.app',
      },
      {
        title: '2. Data We Collect',
        items: [
          'Account data: email address and username (if you register)',
          'Usage data: symptoms described, body area selected, language, date and time of consultation',
          'Technical data: IP address, browser type, operating system, pages visited',
          'Analytics cookies: Google Analytics (anonymised browsing data)',
        ],
      },
      {
        title: '3. Purpose of Processing',
        items: [
          'Provide the informational symptom analysis service',
          'Improve the quality and accuracy of the service',
          'Manage user accounts and premium subscriptions',
          'Send service-related communications (with your consent)',
          'Anonymous statistical analysis of platform usage',
        ],
      },
      {
        title: '4. Legal Basis (GDPR)',
        items: [
          'Contract performance: processing necessary to provide the service',
          'Legitimate interest: service improvement and security',
          'Consent: for marketing communications and analytics cookies',
          'Legal obligation: when required by law',
        ],
      },
      {
        title: '5. International Data Transfers',
        content: 'We use the following providers that may process data outside the European Economic Area, all with adequate safeguards (EU standard contractual clauses):',
        items: [
          'Anthropic (United States): AI-based symptom query processing',
          'Supabase (United States/Europe): user data storage',
          'Vercel (United States): hosting infrastructure',
          'Google Analytics (United States): anonymised web traffic analysis',
        ],
      },
      {
        title: '6. Data Retention',
        items: [
          'Account data: while account is active + 30 days after cancellation',
          'Consultation history: 12 months from consultation date',
          'Technical data and logs: 90 days',
          'Billing data: 7 years (legal obligation)',
        ],
      },
      {
        title: '7. Your Rights (GDPR)',
        content: 'If you are an EU/EEA resident you have the right to:',
        items: [
          'Access: request a copy of your personal data',
          'Rectification: correct inaccurate data',
          'Erasure ("right to be forgotten"): request deletion of your data',
          'Objection: object to processing based on legitimate interest',
          'Portability: receive your data in machine-readable format',
          'Restriction: restrict processing in certain circumstances',
          'Withdraw consent at any time',
        ],
      },
      {
        title: '8. CCPA Rights (California)',
        content: 'If you are a California resident, you have additional rights under the California Consumer Privacy Act:',
        items: [
          'Right to know what personal data we collect and how we use it',
          'Right to delete personal data',
          'Right to non-discrimination for exercising your rights',
          'We do not sell personal data to third parties',
        ],
      },
      {
        title: '9. Health Data — Special Notice',
        content: 'The symptoms you describe are particularly sensitive health data. We process them with the following additional safeguards:',
        items: [
          'We do not share individual symptoms with third parties without your explicit consent',
          'AI analyses are processed in real time without permanent storage on Anthropic servers',
          'We do not use your health data for personalised advertising',
          'We never sell health data under any circumstances',
        ],
      },
      {
        title: '10. Cookies',
        content: 'We use technical cookies necessary for the service and Google Analytics cookies (with anonymised IP). You can manage cookies from your browser settings. Technical cookies cannot be disabled without affecting service functionality.',
      },
      {
        title: '11. Security',
        content: 'We implement appropriate technical and organisational measures: TLS encryption in transit, encryption at rest, restricted data access, security monitoring and regular audits.',
      },
      {
        title: '12. Minors',
        content: 'The service is intended for users aged 16 and over. We do not knowingly collect data from children under 16. If you are a parent and believe your child has provided personal data, contact us at privacy@getsympto.app.',
      },
      {
        title: '13. Changes to This Policy',
        content: 'We may update this policy periodically. We will notify you of significant changes by email or platform notice. The updated version will always be available on this page.',
      },
      {
        title: '14. How to Exercise Your Rights',
        content: 'Send an email to privacy@getsympto.app stating the right you wish to exercise and your identification. We will respond within 30 days. If unsatisfied with our response, you may lodge a complaint with your national data protection authority.',
      },
    ],
  },
  zh: {
    back: '← 首页',
    title: '隐私政策',
    updated: '最后更新：2025年5月',
    sections: [
      { title: '1. 数据控制者', content: 'Sympto+（"我们"）是通过https://getsympto.app收集的个人数据的数据控制者。如有隐私问题，请联系：privacy@getsympto.app' },
      { title: '2. 我们收集的数据', items: ['账户数据：电子邮件地址和用户名（如果您注册）', '使用数据：描述的症状、选择的身体部位、语言、咨询日期和时间', '技术数据：IP地址、浏览器类型、操作系统、访问页面', '分析Cookie：Google Analytics（匿名浏览数据）'] },
      { title: '3. 处理目的', items: ['提供信息性症状分析服务', '提高服务质量和准确性', '管理用户账户和高级订阅', '发送服务相关通信（经您同意）', '平台使用的匿名统计分析'] },
      { title: '4. 法律依据（GDPR）', items: ['合同履行：提供服务所需的处理', '合法利益：服务改进和安全', '同意：用于营销通信和分析Cookie', '法律义务：法律要求时'] },
      { title: '5. 国际数据传输', content: '我们使用以下可能在欧洲经济区以外处理数据的提供商，均有充分保障：', items: ['Anthropic（美国）：AI症状查询处理', 'Supabase（美国/欧洲）：用户数据存储', 'Vercel（美国）：托管基础设施', 'Google Analytics（美国）：匿名网络流量分析'] },
      { title: '6. 数据保留', items: ['账户数据：账户活跃期间+取消后30天', '咨询历史：咨询日期起12个月', '技术数据和日志：90天', '账单数据：7年（法律义务）'] },
      { title: '7. 您的权利（GDPR）', content: '如果您是欧盟/欧洲经济区居民，您有权：', items: ['访问：请求您的个人数据副本', '更正：纠正不准确的数据', '删除（"被遗忘权"）：请求删除您的数据', '反对：反对基于合法利益的处理', '可携带：以机器可读格式接收数据', '限制：在特定情况下限制处理', '随时撤回同意'] },
      { title: '8. CCPA权利（加利福尼亚）', content: '如果您是加利福尼亚居民，您在《加利福尼亚消费者隐私法》下有额外权利：', items: ['知道我们收集哪些个人数据及如何使用', '删除个人数据的权利', '不因行使权利而受歧视的权利', '我们不向第三方出售个人数据'] },
      { title: '9. 健康数据 — 特别声明', content: '您描述的症状是特别敏感的健康数据。我们以以下额外保障处理：', items: ['未经您明确同意，我们不与第三方共享个人症状', 'AI分析实时处理，不在Anthropic服务器永久存储', '我们不将您的健康数据用于个性化广告', '在任何情况下我们都不出售健康数据'] },
      { title: '10. Cookie', content: '我们使用服务所需的技术Cookie和Google Analytics Cookie（匿名IP）。您可以从浏览器设置管理Cookie。' },
      { title: '11. 安全', content: '我们实施适当的技术和组织措施：传输中TLS加密、静态加密、限制数据访问、安全监控和定期审计。' },
      { title: '12. 未成年人', content: '本服务面向16岁及以上用户。如果您是父母并认为您的孩子提供了个人数据，请联系privacy@getsympto.app。' },
      { title: '13. 政策变更', content: '我们可能定期更新此政策。重大变更将通过电子邮件或平台通知告知您。' },
      { title: '14. 如何行使权利', content: '发送电子邮件至privacy@getsympto.app说明您希望行使的权利。我们将在30天内回复。' },
    ],
  },
  ru: {
    back: '← Главная',
    title: 'Политика конфиденциальности',
    updated: 'Последнее обновление: май 2025',
    sections: [
      { title: '1. Контролёр данных', content: 'Sympto+ ("мы") является контролёром персональных данных, собираемых через https://getsympto.app. По вопросам конфиденциальности: privacy@getsympto.app' },
      { title: '2. Собираемые данные', items: ['Данные аккаунта: email и имя пользователя (при регистрации)', 'Данные использования: описанные симптомы, выбранная зона тела, язык, дата и время', 'Технические данные: IP, браузер, ОС, посещённые страницы', 'Аналитические куки: Google Analytics (анонимные данные)'] },
      { title: '3. Цели обработки', items: ['Предоставление информационного сервиса анализа симптомов', 'Улучшение качества и точности сервиса', 'Управление аккаунтами и подписками Premium', 'Отправка сервисных коммуникаций (с вашего согласия)', 'Анонимная статистика использования платформы'] },
      { title: '4. Правовая основа (GDPR)', items: ['Исполнение договора: обработка для предоставления сервиса', 'Законный интерес: улучшение сервиса и безопасность', 'Согласие: для маркетинга и аналитических куки', 'Правовое обязательство: когда требуется по закону'] },
      { title: '5. Международные передачи данных', content: 'Мы используем следующих провайдеров, которые могут обрабатывать данные за пределами ЕЭЗ, все с надлежащими гарантиями:', items: ['Anthropic (США): обработка запросов симптомов через ИИ', 'Supabase (США/Европа): хранение данных пользователей', 'Vercel (США): хостинг-инфраструктура', 'Google Analytics (США): анонимный анализ трафика'] },
      { title: '6. Хранение данных', items: ['Данные аккаунта: пока аккаунт активен + 30 дней после отмены', 'История консультаций: 12 месяцев', 'Технические данные: 90 дней', 'Данные о выставлении счетов: 7 лет (правовое обязательство)'] },
      { title: '7. Ваши права (GDPR)', content: 'Если вы резидент ЕС/ЕЭЗ, вы имеете право на:', items: ['Доступ: запросить копию ваших данных', 'Исправление: исправить неточные данные', 'Удаление ("право на забвение")', 'Возражение против обработки', 'Переносимость данных', 'Ограничение обработки', 'Отзыв согласия в любое время'] },
      { title: '8. Права CCPA (Калифорния)', content: 'Если вы резидент Калифорнии, у вас есть дополнительные права по CCPA:', items: ['Право знать, какие данные мы собираем', 'Право на удаление', 'Право на недискриминацию', 'Мы не продаём персональные данные третьим лицам'] },
      { title: '9. Данные о здоровье — особое уведомление', content: 'Описываемые симптомы — особо чувствительные данные о здоровье. Дополнительные гарантии:', items: ['Не передаём симптомы третьим лицам без явного согласия', 'Анализы ИИ обрабатываются в реальном времени без постоянного хранения', 'Не используем данные о здоровье для персонализированной рекламы', 'Никогда не продаём медицинские данные'] },
      { title: '10. Куки', content: 'Используем технические куки и Google Analytics (анонимный IP). Управление куки — в настройках браузера.' },
      { title: '11. Безопасность', content: 'Применяем TLS-шифрование, шифрование в покое, ограниченный доступ, мониторинг и регулярные аудиты.' },
      { title: '12. Несовершеннолетние', content: 'Сервис предназначен для лиц от 16 лет. Для вопросов о данных несовершеннолетних: privacy@getsympto.app' },
      { title: '13. Изменения политики', content: 'О существенных изменениях уведомим по email или через платформу.' },
      { title: '14. Как воспользоваться правами', content: 'Напишите на privacy@getsympto.app. Ответим в течение 30 дней. При неудовлетворённости обратитесь в национальный орган по защите данных.' },
    ],
  },
};

export default async function PrivacidadPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = CONTENT[locale as keyof typeof CONTENT] || CONTENT.es;

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href={`/${locale}`} className="text-sm text-slate-400 hover:text-blue-600 transition mb-8 inline-block">
          {c.back}
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{c.title}</h1>
        <p className="text-xs text-slate-400 mb-10">{c.updated}</p>

        <div className="space-y-8">
          {c.sections.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h2 className="text-base font-bold text-slate-800 mb-3">{s.title}</h2>
              {s.content && <p className="text-sm text-slate-600 leading-relaxed mb-3">{s.content}</p>}
              {s.items && (
                <ul className="space-y-1.5">
                  {s.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-xs text-slate-400 space-y-1">
          <p>Sympto+ · privacy@getsympto.app</p>
          <div className="flex justify-center gap-4">
            <Link href={`/${locale}/terminos`} className="hover:text-blue-600 transition">
              {locale === 'en' ? 'Terms of Service' : locale === 'zh' ? '服务条款' : locale === 'ru' ? 'Условия использования' : 'Términos de uso'}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}