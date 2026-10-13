import type { Metadata } from 'next'
import LandingPropietario from '@/components/LandingPropietario'

export const metadata: Metadata = {
  title: 'Gestión Profesional de Alquiler en Burgos | Renttia',
  description:
    'Renttia gestiona tu piso en Burgos. Cobras el día 1, sin impagos y sin llamadas. El mínimo es 3 habitaciones, más el salón. Valoración gratuita.',
  alternates: { canonical: 'https://renttia.es/gestion-alquiler-burgos' },
  openGraph: {
    title: 'Gestión Profesional de Alquiler en Burgos | Renttia',
    url: 'https://renttia.es/gestion-alquiler-burgos',
  },
}

export default function BurgosPage() {
  return (
    <LandingPropietario
      ciudad="Burgos"
      slug="burgos"
      h1="Gestión integral de su piso en Burgos. Renta garantizada el día 1."
      heroSubtitulo="Somos tu inquilino en Burgos. Firmamos nosotros, tú cobras el día 1. Sin impagos, sin llamadas."
      dolorTexto="El mismo problema que en cualquier ciudad: un piso que da trabajo en vez de ingresos. En Burgos también hay otra forma de alquilarlo."
      mercadoTexto="Burgos entra en el mapa de Renttia. Si el piso tiene 3 habitaciones y salón, lo vemos contigo y te decimos si encaja."
      rentaMedia=""
      ocupacionMedia=""
      pisosActivos={0}
    />
  )
}
