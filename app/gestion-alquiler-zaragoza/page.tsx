import type { Metadata } from 'next'
import LandingPropietario from '@/components/LandingPropietario'

export const metadata: Metadata = {
  title: 'Gestión Profesional de Alquiler en Zaragoza | Alquiler Garantizado',
  description:
    'Renttia gestiona tu piso en Zaragoza con alquiler garantizado: cobras el día 1, sin impagos y sin llamadas de inquilinos. Gestión profesional de inmuebles. Valoración gratuita.',
  alternates: { canonical: 'https://renttia.es/gestion-alquiler-zaragoza' },
  openGraph: {
    title: 'Gestión Profesional de Alquiler en Zaragoza | Renttia',
    description: 'Gestión integral de inmuebles en Zaragoza. Renta garantizada desde el primer mes.',
    url: 'https://renttia.es/gestion-alquiler-zaragoza',
  },
}

export default function ZaragozaPage() {
  return (
    <LandingPropietario
      ciudad="Zaragoza"
      slug="zaragoza"
      h1="Gestión integral de su piso en Zaragoza. Renta garantizada el día 1."
      heroSubtitulo="Somos tu inquilino. Firmamos nosotros, tú cobras el día 1. Sin impagos, sin inquiocupación, sin llamadas. El único contrato es con Renttia."
      dolorTexto="El alquiler tradicional en Zaragoza tiene tres riesgos que ningún propietario debería asumir. Nosotros los eliminamos de raíz."
      mercadoTexto="Zaragoza es la 5ª ciudad de España y una de las de mayor demanda de habitaciones compartidas. Zonas como el Actur, Delicias, la Universidad y el Centro tienen ocupación casi permanente. La tasa de ocupación de nuestros pisos supera el 94%. Pocos mercados ofrecen tanta estabilidad."
      rentaMedia="900€"
      ocupacionMedia="94%"
      pisosActivos={40}
    />
  )
}
