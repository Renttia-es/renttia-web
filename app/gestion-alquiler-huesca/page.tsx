import type { Metadata } from 'next'
import LandingPropietario from '@/components/LandingPropietario'

export const metadata: Metadata = {
  title: 'Gestión Profesional de Alquiler en Huesca | Alquiler Garantizado',
  description:
    'Renttia gestiona tu piso en Huesca con alquiler garantizado. Cobras el día 1 sin impagos ni problemas. Gestión profesional de inmuebles y alquiler de habitaciones premium en Huesca.',
  alternates: { canonical: 'https://renttia.es/gestion-alquiler-huesca' },
  openGraph: {
    title: 'Gestión Profesional de Alquiler en Huesca | Renttia',
    url: 'https://renttia.es/gestion-alquiler-huesca',
  },
}

export default function HuescaPage() {
  return (
    <LandingPropietario
      ciudad="Huesca"
      slug="huesca"
      h1="Gestión integral de su piso en Huesca. Renta garantizada desde el primer mes."
      heroSubtitulo="Somos tu inquilino en Huesca. Nosotros firmamos el contrato, tú cobras desde el primer mes. Sin riesgos, sin gestión."
      dolorTexto="La mayoría de propietarios en Huesca asumen estos riesgos solos sin saberlo. Hay una alternativa."
      mercadoTexto="Huesca tiene una demanda universitaria estable, trabajadores del sector sanitario y turistas de la zona pirenaica. La oferta de pisos bien gestionados es casi inexistente. Somos los primeros. Nuestros propietarios entran ahora en las mejores condiciones."
      rentaMedia="580€"
      ocupacionMedia="89%"
      pisosActivos={8}
    />
  )
}
