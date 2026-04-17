import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#E8A019',
};

export const metadata: Metadata = {
  title: 'Buzzness — Sistemas integrados para tu empresa · Santiago',
  description:
    'Buzzness ordena la tecnología de tu empresa. Menos herramientas, más sistema. Auditoría, integración, automatización y control.',
  openGraph: {
    title: 'Buzzness — Sistemas integrados para tu empresa',
    description:
      'Ordena la tecnología de tu empresa. Auditoría, integración, automatización, control.',
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
      <head>
        {/* Preload hero video */}
        <link
          rel="preload"
          as="video"
          href="/videos/hero.mp4"
          type="video/mp4"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
