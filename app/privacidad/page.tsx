import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Renttia',
  robots: { index: false, follow: false },
}

export default function PrivacidadPage() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-serif text-navy text-4xl font-light mb-8">Política de Privacidad</h1>
        <div className="prose prose-sm max-w-none font-sans text-gray-600 space-y-6">
          <p>
            En cumplimiento de lo dispuesto en el Reglamento (UE) 2016/679 del Parlamento Europeo
            (RGPD) y en la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales
            y garantía de los derechos digitales (LOPDGDD), <strong>Renttia</strong> le informa sobre
            el tratamiento de sus datos personales.
          </p>

          <div>
            <h2 className="font-serif text-navy text-xl font-semibold mb-2">Responsable del tratamiento</h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>Denominación:</strong> Renttia CB</li>
              <li><strong>Email:</strong> hola@renttia.es</li>
              <li><strong>Domicilio:</strong> Zaragoza, España</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-navy text-xl font-semibold mb-2">Finalidad del tratamiento</h2>
            <p className="text-sm">
              Los datos facilitados a través del formulario de contacto se utilizan exclusivamente para
              atender su solicitud de información sobre nuestros servicios de gestión de alquiler.
              No utilizamos sus datos para envío de publicidad no solicitada.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-navy text-xl font-semibold mb-2">Base jurídica</h2>
            <p className="text-sm">
              El tratamiento se basa en el consentimiento del interesado (art. 6.1.a RGPD), que puede
              retirarse en cualquier momento sin que ello afecte a la licitud del tratamiento previo.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-navy text-xl font-semibold mb-2">Conservación de datos</h2>
            <p className="text-sm">
              Los datos se conservarán durante el tiempo necesario para atender su solicitud y,
              posteriormente, durante los plazos legalmente establecidos.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-navy text-xl font-semibold mb-2">Sus derechos</h2>
            <p className="text-sm">
              Puede ejercer sus derechos de acceso, rectificación, supresión, limitación, portabilidad
              y oposición enviando un email a <strong>hola@renttia.es</strong> con el asunto
              "Protección de Datos". Asimismo, tiene derecho a presentar una reclamación ante la
              Agencia Española de Protección de Datos (aepd.es).
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}


