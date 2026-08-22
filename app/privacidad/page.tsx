import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Renttia',
  robots: { index: false, follow: false },
}

export default function PrivacidadPage() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-serif text-navy text-4xl font-light mb-2">Política de Privacidad</h1>
        <p className="text-sm text-gray-400 mb-10">Renttia CB · Última actualización: agosto 2026</p>

        <div className="prose prose-sm max-w-none font-sans text-gray-600 space-y-8">

          <p>
            En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de
            abril de 2016 (RGPD), y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos
            Personales y garantía de los derechos digitales (LOPDGDD), le informamos de manera detallada
            sobre el tratamiento de sus datos personales a través de nuestras plataformas digitales y
            formularios de contacto.
          </p>

          {/* 1 */}
          <div>
            <h2 className="font-serif text-navy text-xl font-semibold mb-3">1. Responsable del Tratamiento</h2>
            <ul className="list-none space-y-1 text-sm pl-0">
              <li><strong>Nombre:</strong> Raúl Blasco Betés</li>
              <li><strong>Nombre comercial:</strong> Renttia</li>
              <li><strong>NIF / DNI:</strong> 18173911R</li>
              <li><strong>Domicilio:</strong> San Miguel de Abós, nº 4, Jaca, 22700 (Huesca), España</li>
              <li><strong>Correo electrónico:</strong> hola@renttia.es</li>
              <li><strong>Teléfono:</strong> +34 692 87 61 36</li>
            </ul>
          </div>

          {/* 2 */}
          <div>
            <h2 className="font-serif text-navy text-xl font-semibold mb-3">2. Datos Personales que Recopilamos</h2>
            <p className="text-sm mb-2">
              Recopilamos y tratamos los datos que usted nos facilita voluntariamente al cumplimentar
              nuestros formularios de captación de clientes o ponerse en contacto con nosotros:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>Datos identificativos y de contacto:</strong> Nombre completo, número de teléfono y dirección de correo electrónico.</li>
              <li><strong>Datos sobre el inmueble:</strong> Ubicación (provincia/ciudad), estado del inmueble, número de habitaciones y situación contractual actual.</li>
            </ul>
          </div>

          {/* 3 */}
          <div>
            <h2 className="font-serif text-navy text-xl font-semibold mb-3">3. Finalidades y Bases Jurídicas del Tratamiento</h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-semibold text-gray-700">Gestión de solicitudes e información comercial</p>
                <p>Atender sus consultas, realizar la valoración de la viabilidad de su inmueble y ponernos en contacto con usted por teléfono, WhatsApp, SMS o correo electrónico para ofrecerle nuestros servicios de gestión de alquiler y rentabilidad garantizada.</p>
                <p className="mt-1 text-gray-400 italic">Base jurídica: Consentimiento expreso e inequívoco otorgado por el usuario al enviar el formulario (Art. 6.1.a del RGPD).</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Seguimiento comercial y atención personalizada</p>
                <p>Realizar el seguimiento de las solicitudes recibidas y concertar citas o entrevistas comerciales para valorar la gestión de su vivienda.</p>
                <p className="mt-1 text-gray-400 italic">Base jurídica: Interés legítimo y precontractual solicitado por el propio interesado (Art. 6.1.b del RGPD).</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Cumplimiento de obligaciones legales</p>
                <p>Atender requerimientos de administraciones públicas, tribunales u órganos de control legal cuando sea aplicable.</p>
                <p className="mt-1 text-gray-400 italic">Base jurídica: Cumplimiento de obligaciones legales (Art. 6.1.c del RGPD).</p>
              </div>
            </div>
          </div>

          {/* 4 */}
          <div>
            <h2 className="font-serif text-navy text-xl font-semibold mb-3">4. Plazo de Conservación de los Datos</h2>
            <p className="text-sm">
              Los datos personales proporcionados se conservarán durante el tiempo estrictamente necesario
              para cumplir con las finalidades descritas, prestarle el servicio solicitado y mantener la
              comunicación comercial solicitada. En todo caso, los datos se mantendrán durante un plazo
              máximo de <strong>2 años</strong> a partir del último contacto, salvo que usted solicite
              previamente su supresión o revocación del consentimiento, o durante los plazos legalmente
              exigidos por la normativa fiscal y mercantil vigente.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="font-serif text-navy text-xl font-semibold mb-3">5. Destinatarios y Encargados del Tratamiento</h2>
            <p className="text-sm mb-2">
              Sus datos no serán cedidos, vendidos ni alquilados a terceros bajo ninguna circunstancia,
              salvo obligación legal expresa. Para poder prestarle el servicio y gestionar las campañas
              publicitarias, sus datos pueden ser procesados por los siguientes proveedores tecnológicos
              que actúan como encargados del tratamiento bajo estrictos acuerdos de confidencialidad y
              cumplimiento del RGPD:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>Meta Platforms Ireland Limited (Meta Ads)</strong>, para la recolección de formularios de clientes potenciales.</li>
              <li>Proveedores de servicios de alojamiento web, gestión de correo electrónico y herramientas de comunicación (CRM/WhatsApp).</li>
            </ul>
          </div>

          {/* 6 */}
          <div>
            <h2 className="font-serif text-navy text-xl font-semibold mb-3">6. Transferencias Internacionales de Datos</h2>
            <p className="text-sm">
              Determinados proveedores tecnológicos utilizados (como Meta) pueden procesar o almacenar
              datos fuera del Espacio Económico Europeo (EEE). En tales casos, las transferencias
              internacionales se realizan bajo las Cláusulas Contractuales Tipo (SCC) aprobadas por la
              Comisión Europea o bajo el marco del EU-US Data Privacy Framework, garantizando un nivel
              de protección equivalente al exigido en la Unión Europea.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="font-serif text-navy text-xl font-semibold mb-3">7. Derechos de los Usuarios</h2>
            <p className="text-sm mb-3">
              Puede ejercitar en cualquier momento y de forma totalmente gratuita sus derechos en
              materia de protección de datos:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm mb-4">
              <li><strong>Acceso:</strong> Derecho a saber qué datos suyos estamos tratando.</li>
              <li><strong>Rectificación:</strong> Derecho a solicitar la modificación de datos inexactos o incompletos.</li>
              <li><strong>Supresión («Derecho al olvido»):</strong> Derecho a solicitar que eliminemos sus datos cuando ya no sean necesarios.</li>
              <li><strong>Oposición:</strong> Derecho a oponerse al tratamiento de sus datos en cualquier momento.</li>
              <li><strong>Limitación del tratamiento:</strong> Derecho a solicitar que limitemos el uso de sus datos en determinados supuestos.</li>
              <li><strong>Portabilidad:</strong> Derecho a recibir sus datos en un formato estructurado y de uso común.</li>
              <li><strong>Retiro del consentimiento:</strong> Derecho a retirar el consentimiento prestado en cualquier momento sin carácter retroactivo.</li>
            </ul>
            <p className="text-sm">
              Para ejercer cualquiera de estos derechos, envíe un correo electrónico a{' '}
              <a href="mailto:hola@renttia.es" className="text-navy underline">hola@renttia.es</a>{' '}
              indicando en el asunto <strong>&quot;Protección de Datos&quot;</strong> y adjuntando una
              copia o prueba de su identidad (DNI o equivalente).
            </p>
            <p className="text-sm mt-2">
              Si considera que sus derechos no han sido atendidos adecuadamente, tiene derecho a
              presentar una reclamación ante la{' '}
              <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-navy underline">
                Agencia Española de Protección de Datos (AEPD)
              </a>.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="font-serif text-navy text-xl font-semibold mb-3">8. Medidas de Seguridad</h2>
            <p className="text-sm">
              Renttia aplica las medidas de seguridad técnicas y organizativas necesarias para evitar la
              pérdida, mal uso, alteración, acceso no autorizado o robo de los datos personales
              facilitados, habida cuenta del estado de la tecnología, la naturaleza de los datos y los
              riesgos a los que están expuestos.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
