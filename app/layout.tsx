import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

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
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://getsympto.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}