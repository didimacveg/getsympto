import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sympto+ | Orientación de síntomas corporales",
  description: "Selecciona la zona de tu cuerpo que te molesta, describe tu síntoma y recibe orientación informativa general. No es diagnóstico médico.",
  keywords: "síntomas, dolor corporal, orientación médica, qué me duele, síntomas corporales",
  openGraph: {
    title: "Sympto+ | ¿Qué zona te molesta?",
    description: "Orientación informativa sobre síntomas corporales. Selecciona la zona y describe cómo te sientes.",
    url: "https://getsympto.app",
    siteName: "Sympto+",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: 'https://getsympto.app/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Sympto+',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://getsympto.app",
  },
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <footer className="border-t border-slate-100 bg-white py-6 mt-auto">
          <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <span>{"© 2026 Sympto+. Todos los derechos reservados."}</span>
            <div className="flex gap-4">
              <a href="https://www.iubenda.com/privacy-policy/95390448" className="iubenda-white iubenda-noiframe iubenda-embed hover:text-slate-600 transition-colors" title="Política de Privacidad">Política de Privacidad</a>
              <a href="https://www.iubenda.com/privacy-policy/95390448/cookie-policy" className="iubenda-white iubenda-noiframe iubenda-embed hover:text-slate-600 transition-colors" title="Política de Cookies">Política de Cookies</a>
            </div>
          </div>
        </footer>
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