import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    es: 'Términos y Condiciones | Sympto+',
    en: 'Terms of Service | Sympto+',
    zh: '服务条款 | Sympto+',
    ru: 'Условия использования | Sympto+',
  };
  return { title: titles[locale] || titles.es };
}

const CONTENT = {
  es: {
    back: '← Inicio', title: 'Términos y Condiciones de Uso', updated: 'Última actualización: mayo 2025',
    sections: [
      { title: '1. Aceptación de los términos', content: 'Al acceder o usar Sympto+ (disponible en https://getsympto.app), aceptas estos Términos y Condiciones. Si no estás de acuerdo con alguno de ellos, no uses el servicio.' },
      { title: '2. Descripción del servicio', content: 'Sympto+ es una herramienta de información de salud que utiliza inteligencia artificial para proporcionar información general sobre síntomas. El servicio permite al usuario describir síntomas, seleccionar zonas corporales y recibir información orientativa sobre posibles causas y niveles de urgencia.' },
      { title: '3. AVISO MÉDICO IMPORTANTE', content: 'SYMPTO+ NO ES UN SERVICIO MÉDICO. El contenido de Sympto+ es únicamente informativo y educativo. No constituye diagnóstico médico, prescripción, consejo médico profesional ni reemplaza la consulta con un médico o profesional sanitario cualificado. Ante cualquier emergencia médica, llama al 112 o acude a urgencias inmediatamente. No tomes decisiones médicas basándote exclusivamente en la información de Sympto+.' },
      { title: '4. Elegibilidad', items: ['Debes tener al menos 16 años para usar el servicio', 'Si eres menor de 18 años, debes contar con el consentimiento de tus padres o tutores legales', 'Debes proporcionar información veraz al registrarte'] },
      { title: '5. Cuenta de usuario', items: ['Eres responsable de mantener la confidencialidad de tus credenciales', 'Notifica inmediatamente cualquier uso no autorizado de tu cuenta', 'Una cuenta por persona — no puedes crear cuentas en nombre de terceros sin autorización'] },
      { title: '6. Plan Premium', items: ['El plan Premium es una suscripción mensual de €6.99', 'Se renueva automáticamente cada mes hasta que la canceles', 'Puedes cancelar en cualquier momento desde tu perfil', 'No se realizan reembolsos por períodos parciales salvo que la ley aplicable lo exija', 'Nos reservamos el derecho a cambiar el precio con 30 días de aviso previo'] },
      { title: '7. Uso aceptable', content: 'Queda prohibido:', items: ['Usar el servicio para fines ilegales o fraudulentos', 'Intentar acceder a datos de otros usuarios', 'Realizar ingeniería inversa o copiar el servicio', 'Publicar contenido falso, ofensivo o que viole derechos de terceros', 'Usar bots o sistemas automatizados para acceder al servicio sin autorización', 'Sobrecargar intencionadamente los sistemas del servicio'] },
      { title: '8. Propiedad intelectual', content: 'Sympto+ y todo su contenido (textos, diseños, código, marca) son propiedad de Sympto+ y están protegidos por las leyes de propiedad intelectual. No puedes reproducir, distribuir ni crear obras derivadas sin autorización expresa por escrito.' },
      { title: '9. Limitación de responsabilidad', content: 'En la máxima medida permitida por la ley aplicable, Sympto+ no será responsable de: daños indirectos, incidentales, especiales o consecuentes; pérdida de datos o beneficios; decisiones tomadas basándose en la información del servicio; interrupciones del servicio. La responsabilidad total de Sympto+ no excederá el importe pagado por el usuario en los últimos 12 meses.' },
      { title: '10. Garantías', content: 'El servicio se proporciona "tal como está" y "según disponibilidad" sin garantías de ningún tipo, expresas o implícitas, incluyendo garantías de comerciabilidad, idoneidad para un fin particular o no infracción.' },
      { title: '11. Indemnización', content: 'Aceptas indemnizar y mantener indemne a Sympto+ frente a cualquier reclamación, daño, pérdida o gasto (incluidos honorarios legales razonables) que surja de tu uso del servicio o incumplimiento de estos Términos.' },
      { title: '12. Modificaciones del servicio', content: 'Podemos modificar, suspender o discontinuar cualquier parte del servicio en cualquier momento. Te notificaremos cambios significativos con un mínimo de 30 días de antelación cuando sea posible.' },
      { title: '13. Terminación', content: 'Podemos suspender o terminar tu cuenta si incumples estos Términos. Tú puedes cerrar tu cuenta en cualquier momento desde la configuración de perfil. Tras la terminación, las secciones que por su naturaleza deban sobrevivir seguirán vigentes.' },
      { title: '14. Ley aplicable y jurisdicción', content: 'Estos Términos se rigen por la ley española. Para resolver disputas, las partes se someten a los juzgados y tribunales competentes de España, sin perjuicio de los derechos que las normas de protección de consumidores puedan otorgarte en tu país de residencia.' },
      { title: '15. Contacto', content: 'Para cualquier consulta sobre estos Términos: legal@getsympto.app' },
    ],
  },
  en: {
    back: '← Home', title: 'Terms of Service', updated: 'Last updated: May 2025',
    sections: [
      { title: '1. Acceptance of Terms', content: 'By accessing or using Sympto+ (available at https://getsympto.app), you accept these Terms of Service. If you disagree with any of them, do not use the service.' },
      { title: '2. Service Description', content: 'Sympto+ is a health information tool that uses artificial intelligence to provide general information about symptoms. The service allows users to describe symptoms, select body areas and receive guidance on possible causes and urgency levels.' },
      { title: '3. IMPORTANT MEDICAL DISCLAIMER', content: 'SYMPTO+ IS NOT A MEDICAL SERVICE. Sympto+ content is for informational and educational purposes only. It does not constitute medical diagnosis, prescription, professional medical advice, or replace consultation with a qualified doctor or healthcare professional. In any medical emergency, call emergency services or go to A&E immediately. Do not make medical decisions based solely on information from Sympto+.' },
      { title: '4. Eligibility', items: ['You must be at least 16 years old to use the service', 'If under 18, you must have parental or guardian consent', 'You must provide accurate information when registering'] },
      { title: '5. User Account', items: ['You are responsible for maintaining the confidentiality of your credentials', 'Notify us immediately of any unauthorised use of your account', 'One account per person — you may not create accounts on behalf of others without authorisation'] },
      { title: '6. Premium Plan', items: ['Premium plan is a monthly subscription at €6.99', 'Automatically renewed monthly until cancelled', 'Cancel anytime from your profile', 'No refunds for partial periods unless required by applicable law', 'We reserve the right to change the price with 30 days prior notice'] },
      { title: '7. Acceptable Use', content: 'Prohibited:', items: ['Using the service for illegal or fraudulent purposes', 'Attempting to access other users\' data', 'Reverse engineering or copying the service', 'Posting false, offensive or third-party rights-infringing content', 'Using bots or automated systems without authorisation', 'Intentionally overloading service systems'] },
      { title: '8. Intellectual Property', content: 'Sympto+ and all its content (texts, designs, code, brand) are the property of Sympto+ and protected by intellectual property laws. You may not reproduce, distribute or create derivative works without express written authorisation.' },
      { title: '9. Limitation of Liability', content: 'To the maximum extent permitted by applicable law, Sympto+ shall not be liable for: indirect, incidental, special or consequential damages; loss of data or profits; decisions made based on service information; service interruptions. Total liability shall not exceed amounts paid by the user in the last 12 months.' },
      { title: '10. Warranties', content: 'The service is provided "as is" and "as available" without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose or non-infringement.' },
      { title: '11. Indemnification', content: 'You agree to indemnify and hold harmless Sympto+ from any claims, damages, losses or expenses (including reasonable legal fees) arising from your use of the service or breach of these Terms.' },
      { title: '12. Service Modifications', content: 'We may modify, suspend or discontinue any part of the service at any time. We will notify you of significant changes with at least 30 days notice where possible.' },
      { title: '13. Termination', content: 'We may suspend or terminate your account for breach of these Terms. You may close your account at any time from profile settings.' },
      { title: '14. Governing Law', content: 'These Terms are governed by Spanish law. The parties submit to the competent courts of Spain, without prejudice to any consumer protection rights you may have in your country of residence.' },
      { title: '15. Contact', content: 'For any queries about these Terms: legal@getsympto.app' },
    ],
  },
  zh: {
    back: '← 首页', title: '服务条款', updated: '最后更新：2025年5月',
    sections: [
      { title: '1. 条款接受', content: '通过访问或使用Sympto+（https://getsympto.app），您接受这些服务条款。如果您不同意其中任何条款，请勿使用本服务。' },
      { title: '2. 服务描述', content: 'Sympto+是一个健康信息工具，使用人工智能提供关于症状的一般信息，帮助用户了解可能的原因和紧急程度。' },
      { title: '3. 重要医疗免责声明', content: 'SYMPTO+不是医疗服务。Sympto+的内容仅供参考和教育目的。它不构成医疗诊断、处方、专业医疗建议，也不能替代合格医生或医疗专业人员的咨询。如有任何医疗紧急情况，请立即拨打急救电话或前往急诊室。' },
      { title: '4. 使用资格', items: ['使用本服务须年满16岁', '未满18岁须获得父母或监护人同意', '注册时须提供真实信息'] },
      { title: '5. 用户账户', items: ['您负责保护凭据的保密性', '立即通知任何未经授权使用您账户的情况', '每人一个账户'] },
      { title: '6. 高级计划', items: ['高级计划为每月€6.99的订阅', '每月自动续费直至取消', '可随时从个人资料中取消', '除适用法律要求外，不退还部分期间费用'] },
      { title: '7. 可接受使用', content: '禁止：', items: ['将服务用于非法或欺诈目的', '尝试访问其他用户的数据', '对服务进行逆向工程或复制', '发布虚假、冒犯或侵犯第三方权利的内容', '未经授权使用机器人或自动化系统'] },
      { title: '8. 知识产权', content: 'Sympto+及其所有内容均为Sympto+财产，受知识产权法保护。未经明确书面授权，不得复制、分发或创建衍生作品。' },
      { title: '9. 责任限制', content: '在适用法律允许的最大范围内，Sympto+不对间接、附带、特殊或后果性损害负责。总责任不超过用户过去12个月支付的金额。' },
      { title: '10. 保证', content: '服务按"原样"和"按可用性"提供，不提供任何明示或暗示的保证。' },
      { title: '11. 赔偿', content: '您同意赔偿Sympto+因您使用服务或违反这些条款而产生的任何索赔、损害、损失或费用。' },
      { title: '12. 服务修改', content: '我们可能随时修改、暂停或停止服务的任何部分。重大变更将提前30天通知。' },
      { title: '13. 终止', content: '如违反这些条款，我们可能暂停或终止您的账户。您可随时从个人资料设置关闭账户。' },
      { title: '14. 适用法律', content: '这些条款受西班牙法律管辖。' },
      { title: '15. 联系', content: '如有任何关于这些条款的问题：legal@getsympto.app' },
    ],
  },
  ru: {
    back: '← Главная', title: 'Условия использования', updated: 'Последнее обновление: май 2025',
    sections: [
      { title: '1. Принятие условий', content: 'Используя Sympto+ (https://getsympto.app), вы принимаете настоящие Условия. Если вы не согласны, не используйте сервис.' },
      { title: '2. Описание сервиса', content: 'Sympto+ — информационный инструмент здоровья на базе ИИ, предоставляющий общую информацию о симптомах, возможных причинах и уровнях срочности.' },
      { title: '3. ВАЖНЫЙ МЕДИЦИНСКИЙ ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ', content: 'SYMPTO+ НЕ ЯВЛЯЕТСЯ МЕДИЦИНСКИМ СЕРВИСОМ. Контент носит исключительно информационный и образовательный характер. Не является медицинским диагнозом или заменой консультации врача. При медицинской экстренной ситуации немедленно вызывайте скорую.' },
      { title: '4. Право на использование', items: ['Минимальный возраст — 16 лет', 'До 18 лет — с согласия родителей или законных представителей', 'При регистрации предоставляйте достоверную информацию'] },
      { title: '5. Аккаунт пользователя', items: ['Вы ответственны за сохранность учётных данных', 'Немедленно сообщайте о несанкционированном доступе', 'Один аккаунт на одного человека'] },
      { title: '6. План Premium', items: ['Ежемесячная подписка €6.99', 'Автоматически продлевается до отмены', 'Отмена в любое время из профиля', 'Возвраты не производятся за частичные периоды, кроме случаев, предусмотренных законом'] },
      { title: '7. Допустимое использование', content: 'Запрещено:', items: ['Использовать сервис в незаконных или мошеннических целях', 'Пытаться получить доступ к данным других пользователей', 'Реверс-инжиниринг или копирование сервиса', 'Размещать ложный, оскорбительный контент', 'Использовать ботов без авторизации'] },
      { title: '8. Интеллектуальная собственность', content: 'Sympto+ и весь его контент являются собственностью Sympto+ и защищены законами об интеллектуальной собственности.' },
      { title: '9. Ограничение ответственности', content: 'В максимально допустимой законом мере Sympto+ не несёт ответственности за косвенный, случайный или последующий ущерб. Общая ответственность не превышает сумм, уплаченных за последние 12 месяцев.' },
      { title: '10. Гарантии', content: 'Сервис предоставляется "как есть" без каких-либо гарантий.' },
      { title: '11. Возмещение ущерба', content: 'Вы соглашаетесь возместить Sympto+ любые претензии и расходы, возникшие из-за нарушения настоящих Условий.' },
      { title: '12. Изменения сервиса', content: 'Мы можем изменить сервис в любое время. О существенных изменениях уведомим за 30 дней.' },
      { title: '13. Прекращение', content: 'Мы можем приостановить аккаунт при нарушении Условий. Вы можете закрыть аккаунт в настройках профиля.' },
      { title: '14. Применимое право', content: 'Условия регулируются испанским законодательством.' },
      { title: '15. Контакт', content: 'Вопросы по условиям: legal@getsympto.app' },
    ],
  },
};

export default async function TerminosPage({ params }: { params: Promise<{ locale: string }> }) {
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

        <div className="space-y-6">
          {c.sections.map((s, i) => (
            <div key={i} className={`bg-white rounded-2xl p-6 border shadow-sm ${s.title.includes('MÉDICO') || s.title.includes('MEDICAL') || s.title.includes('医疗') || s.title.includes('МЕДИЦИНСКИЙ') ? 'border-red-200 bg-red-50' : 'border-slate-100'}`}>
              <h2 className={`text-base font-bold mb-3 ${s.title.includes('MÉDICO') || s.title.includes('MEDICAL') || s.title.includes('医疗') || s.title.includes('МЕДИЦИНСКИЙ') ? 'text-red-700' : 'text-slate-800'}`}>
                {s.title}
              </h2>
              {s.content && <p className={`text-sm leading-relaxed mb-3 ${s.title.includes('MÉDICO') || s.title.includes('MEDICAL') || s.title.includes('医疗') || s.title.includes('МЕДИЦИНСКИЙ') ? 'text-red-700 font-medium' : 'text-slate-600'}`}>{s.content}</p>}
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
          <p>Sympto+ · legal@getsympto.app</p>
          <div className="flex justify-center gap-4">
            <Link href={`/${locale}/privacidad`} className="hover:text-blue-600 transition">
              {locale === 'en' ? 'Privacy Policy' : locale === 'zh' ? '隐私政策' : locale === 'ru' ? 'Политика конфиденциальности' : 'Política de privacidad'}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}