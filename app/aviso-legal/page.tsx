import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso Legal | Renttia',
  robots: { index: false, follow: false },
}

export default function AvisoLegalPage() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-serif text-navy text-4xl font-light mb-8">Aviso Legal</h1>
        <div className="space-y-6 font-sans text-gray-600 text-sm">
          <div>
            <h2 className="font-serif text-navy text-xl font-semibold mb-2">Datos identificativos</h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Denominación social:</strong> Renttia CB</li>
              <li><strong>Domicilio:</strong> Zaragoza, España</li>
              <li><strong>Email:</strong> hola@renttia.es</li>
              <li><strong>Actividad:</strong> Gestión de alquiler y Rent to Rent</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-navy text-xl font-semibold mb-2">Objeto y ámbito de aplicación</h2>
            <p>
              El presente Aviso Legal regula el acceso y uso del sitio web <strong>renttia.es</strong>,
              titularidad de Renttia CB. El acceso y uso de este sitio implica la aceptación de las
              presentes condiciones.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-navy text-xl font-semibold mb-2">Propiedad intelectual</h2>
            <p>
              Todos los contenidos del sitio web (textos, imágenes, diseño gráfico, código fuente)
              son propiedad de Renttia CB o de sus licenciantes, y están protegidos por las leyes
              de propiedad intelectual e industrial. Queda prohibida su reproducción sin autorización expresa.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-navy text-xl font-semibold mb-2">Responsabilidad</h2>
            <p>
              Renttia CB no se responsabiliza de los daños que pudieran derivarse del uso del sitio web,
              de la interrupción del servicio o de la presencia de virus en los contenidos, aunque adoptará
              las medidas necesarias para prevenirlos.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-navy text-xl font-semibold mb-2">Ley aplicable y jurisdicción</h2>
            <p>
              Las presentes condiciones se rigen por la legislación española. Para la resolución de
              cualquier conflicto, las partes se someten a la jurisdicción de los Juzgados y Tribunales
              de Zaragoza.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}


