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

const META = {
  es: {
    title: 'Sympto+ | ¿Qué zona te molesta?',
    description: 'Selecciona la zona del cuerpo, describe tu síntoma y recibe orientación informativa general. No es diagnóstico médico.',
  },
  en: {
    title: 'Sympto+ | Which area bothers you?',
    description: 'Select the body area, describe your symptom and receive general informational guidance. Not a medical diagnosis.',
  },
  zh: {
    title: 'Sympto+ | 哪个部位让您不舒服？',
    description: '选择身体部位，描述您的症状，获取一般性信息指导。这不是医学诊断。',
  },
  ru: {
    title: 'Sympto+ | Какая зона вас беспокоит?',
    description: 'Выберите зону тела, опишите симптом и получите общую информационную рекомендацию. Это не медицинский диагноз.',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale as keyof typeof META] || META.es;

  return {
    title: meta.title,
    description: meta.description,
    keywords: 'síntomas, dolor corporal, orientación médica, qué me duele, síntomas corporales, symptoms, body pain, symptom checker',
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://getsympto.app/${locale}`,
      siteName: 'Sympto+',
      type: 'website',
      images: [{ url: 'https://getsympto.app/opengraph-image.png', width: 1200, height: 630, alt: 'Sympto+' }],
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://getsympto.app/${locale}`,
      languages: {
        'es': 'https://getsympto.app/es',
        'en': 'https://getsympto.app/en',
        'zh': 'https://getsympto.app/zh',
        'ru': 'https://getsympto.app/ru',
        'x-default': 'https://getsympto.app/es',
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
  // ✅ FIX: pass locale explicitly so next-intl loads the correct message file
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
            {/*
              ✅ FIX: AuthButton is also rendered here (outside the nav) so its modal
              can use a React portal that targets document.body and is never
              clipped by the navbar's backdrop-blur / overflow context.
              The AuthButton inside the nav only shows the trigger button (no modal).
            */}
            <footer className="border-t border-slate-100 bg-white py-6 mt-auto">
              <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
                <span>{'© 2026 Sympto+. Todos los derechos reservados.'}</span>
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