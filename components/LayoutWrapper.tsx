'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'

// Rutas donde NO debe aparecer el header/footer global (landings de conversión puras)
const RUTAS_SIN_LAYOUT = [
  '/propietario',
  '/gracias',
  '/calculadora-gastos',
  '/alquiler-corporativo',
  '/normativa-vivienda',
]

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const sinLayout = RUTAS_SIN_LAYOUT.some(r => pathname === r || pathname.startsWith(r + '/'))

  if (sinLayout) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  )
}
