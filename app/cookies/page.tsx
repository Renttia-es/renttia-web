import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies | Renttia',
  robots: { index: false, follow: false },
}

export default function CookiesPage() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-serif text-navy text-4xl font-light mb-8">Política de Cookies</h1>
        <div className="space-y-6 font-sans text-gray-600 text-sm">
          <p>
            Este sitio web utiliza cookies propias y de terceros para mejorar la experiencia de
            navegación, analizar el tráfico y mostrar contenido relevante.
          </p>

          <div>
            <h2 className="font-serif text-navy text-xl font-semibold mb-2">¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando
              visita una página web. Permiten recordar sus preferencias y mejorar la funcionalidad del sitio.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-navy text-xl font-semibold mb-2">Tipos de cookies que utilizamos</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-cream">
                    <th className="text-left p-3 border border-gray-200 font-semibold">Cookie</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold">Tipo</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold">Finalidad</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold">Duración</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-gray-200">_ga</td>
                    <td className="p-3 border border-gray-200">Analítica</td>
                    <td className="p-3 border border-gray-200">Google Analytics – estadísticas de visitas</td>
                    <td className="p-3 border border-gray-200">2 años</td>
                  </tr>
                  <tr className="bg-cream/50">
                    <td className="p-3 border border-gray-200">_gid</td>
                    <td className="p-3 border border-gray-200">Analítica</td>
                    <td className="p-3 border border-gray-200">Google Analytics – sesión actual</td>
                    <td className="p-3 border border-gray-200">24 horas</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-200">consent</td>
                    <td className="p-3 border border-gray-200">Técnica</td>
                    <td className="p-3 border border-gray-200">Recuerda tu preferencia de cookies</td>
                    <td className="p-3 border border-gray-200">1 año</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-navy text-xl font-semibold mb-2">Cómo desactivar las cookies</h2>
            <p>
              Puede configurar su navegador para rechazar o eliminar cookies. Consulte la ayuda de
              su navegador para instrucciones específicas. Tenga en cuenta que desactivar las cookies
              puede afectar a la funcionalidad del sitio.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}


