import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Script from 'next/script';
import '../globals.css';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { AuthProvider } from '@/contexts/AuthContext';
import AuthButton from '@/components/AuthButton';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    es: 'Sympto+ | Analizador de síntomas con IA — ¿Qué me pasa?',
    en: 'Sympto+ | AI Symptom Checker — What\'s wrong with me?',
    zh: 'Sympto+ | AI症状检查器 — 我怎么了？',
    ru: 'Sympto+ | ИИ-анализатор симптомов — Что со мной?',
  };

  const descriptions: Record<string, string> = {
    es: 'Describe tus síntomas, selecciona la zona del cuerpo afectada y recibe en segundos un análisis con causas probables, nivel de urgencia y qué hacer. Gratis, anónimo, en 4 idiomas. Síntomas de gripe, hantavirus, dolor de cabeza, espalda y más.',
    en: 'Describe your symptoms, select the affected body area and get in seconds an analysis with probable causes, urgency level and what to do. Free, anonymous, in 4 languages.',
    zh: '描述您的症状，选择受影响的身体部位，几秒钟内获得可能原因、紧急程度和建议的分析。免费、匿名、4种语言。',
    ru: 'Опишите симптомы, выберите зону тела и получите анализ с вероятными причинами, уровнем срочности и рекомендациями за секунды. Бесплатно, анонимно, на 4 языках.',
  };

  const keywords: Record<string, string> = {
    es: 'síntomas, analizador de síntomas, qué me pasa, dolor de cabeza, hantavirus síntomas, gripe 2025, golpe de calor, síntomas enfermedad, checker síntomas, inteligencia artificial médica',
    en: 'symptoms, symptom checker, what is wrong with me, headache, hantavirus symptoms, flu 2025, heat stroke, AI medical',
    zh: '症状,症状检查器,头痛,汉坦病毒症状,AI医疗',
    ru: 'симптомы, анализатор симптомов, хантавирус симптомы, ИИ медицина',
  };

  return {
    title: titles[locale] || titles.es,
    description: descriptions[locale] || descriptions.es,
    keywords: keywords[locale] || keywords.es,
    openGraph: {
      title: titles[locale] || titles.es,
      description: descriptions[locale] || descriptions.es,
      url: `https://www.getsympto.app/${locale}`,
      siteName: 'Sympto+',
      locale: locale === 'zh' ? 'zh_CN' : locale === 'ru' ? 'ru_RU' : locale === 'en' ? 'en_GB' : 'es_ES',
      type: 'website',
      images: [{ url: 'https://getsympto.app/opengraph-image.png', width: 1200, height: 630, alt: 'Sympto+' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale] || titles.es,
      description: descriptions[locale] || descriptions.es,
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://www.getsympto.app/${locale}`,
      languages: {
        'es': 'https://www.getsympto.app/es',
        'en': 'https://www.getsympto.app/en',
        'zh': 'https://www.getsympto.app/zh',
        'ru': 'https://www.getsympto.app/ru',
        'x-default': 'https://www.getsympto.app/es',
      },
    },
    icons: { icon: '/logo.svg', apple: '/logo.svg' },
  };
}

const PrivacyLink = () => (
  <a href="https://www.iubenda.com/privacy-policy/95390448" className="iubenda-white iubenda-noiframe iubenda-embed hover:text-slate-600 transition-colors" title="Política de Privacidad">Privacidad</a>
);

const CookiesLink = () => (
  <a href="https://www.iubenda.com/privacy-policy/95390448/cookie-policy" className="iubenda-white iubenda-noiframe iubenda-embed hover:text-slate-600 transition-colors" title="Política de Cookies">Cookies</a>
);

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // ✅ En next-intl v4, getMessages() lee el locale del contexto del request
  // automáticamente gracias al middleware — NO necesita parámetros ni setRequestLocale
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          {/* ✅ Pasar locale y messages explícitamente al provider cliente */}
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
            <footer className="border-t border-slate-100 bg-white py-6 mt-auto">
              <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
                <span>© 2026 Sympto+. Todos los derechos reservados.</span>
                <div className="flex items-center gap-4">
                  <AuthButton />
                  <LanguageSwitcher />
                  <PrivacyLink />
                  <CookiesLink />
                </div>
              </div>
            </footer>
          </NextIntlClientProvider>
        </AuthProvider>
        <Script
          id="iubenda"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function (w,d) {var loader = function () {var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src="https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener){w.addEventListener("load", loader, false);}else if(w.attachEvent){w.attachEvent("onload", loader);}else{w.onload = loader;}})(window, document);`,
          }}
        />
        <GoogleAnalytics gaId="G-0Q0BM7KH3R" />
      </body>
    </html>
  );
}