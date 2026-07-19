import type { Metadata } from 'next'
import LandingPropietario from '@/components/LandingPropietario'

export const metadata: Metadata = {
  title: 'Gestión Profesional de Inmuebles y Alquiler Garantizado en Logroño',
  description:
    'Renttia gestiona tu piso en Logroño: alquiler garantizado, cero impagos y cero gestión. Cobras el día 1. Gestión profesional de inmuebles y habitaciones premium. Valoración gratuita.',
  alternates: { canonical: 'https://renttia.es/gestion-alquiler-logrono' },
  openGraph: {
    title: 'Gestión Profesional de Alquiler en Logroño | Renttia',
    url: 'https://renttia.es/gestion-alquiler-logrono',
  },
}

export default function LogronoPage() {
  return (
    <LandingPropietario
      ciudad="Logroño"
      slug="logrono"
      h1="Gestión integral de su piso en Logroño. Renta garantizada el día 1."
      heroSubtitulo="Somos tu inquilino en Logroño. Firmamos nosotros, tú cobras el día 1. Sin impagos, sin inquiocupación, sin llamadas."
      dolorTexto="Tres riesgos reales que cualquier propietario de Logroño conoce demasiado bien. Y que nosotros eliminamos de raíz."
      mercadoTexto="Logroño crece en demanda de alquiler compartido. La Universidad de La Rioja y la llegada de trabajadores del sector servicios generan una demanda constante. La oferta de pisos bien gestionados es escasa. Nuestros pisos en Logroño tienen una ocupación del 91%."
      rentaMedia="700€"
      ocupacionMedia="91%"
      pisosActivos={18}
    />
  )
}
