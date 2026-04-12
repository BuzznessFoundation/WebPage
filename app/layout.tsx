import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-montserrat',
});

export const viewport: Viewport = {
  themeColor: '#E8A019',
};

export const metadata: Metadata = {
  title: '[Nombre Consultora] — Self-hosting, Open Source e IA para Pymes · Santiago',
  description:
    'Implementamos soluciones self-hosted, open-source e integraciones de IA personalizadas para empresas pequeñas y medianas en Chile.',
  openGraph: {
    title: '[Nombre Consultora] — Self-hosting, Open Source e IA para Pymes',
    description:
      'Implementamos soluciones self-hosted, open-source e integraciones de IA personalizadas.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={montserrat.className}>
      <body>{children}</body>
    </html>
  );
}
