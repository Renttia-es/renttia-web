import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import LayoutWrapper from '@/components/LayoutWrapper'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://renttia.es'),
  title: {
    default: 'Renttia | Gestión Profesional de Inmuebles y Alquiler de Habitaciones Premium',
    template: '%s | Renttia',
  },
  description:
    'Renttia gestiona tu piso en Zaragoza, Logroño y Huesca. Alquiler de habitaciones premium: cobras el día 1, sin impagos y sin llamadas. Gestión profesional de inmuebles.',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://renttia.es',
    siteName: 'Renttia',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Renttia' }],
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
