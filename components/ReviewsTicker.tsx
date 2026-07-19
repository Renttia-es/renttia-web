'use client'

const reviews = [
  { nombre: 'Carmen R.', ciudad: 'Zaragoza', texto: 'Llevo dos años cobrando puntualmente el día 1. No he tenido que llamar ni una sola vez. Ojalá lo hubiera conocido antes.', estrellas: 5 },
  { nombre: 'Javier M.', ciudad: 'Logroño', texto: 'Tenía miedo de alquilar mi piso por los impagos. Con Renttia firmé y me olvidé. La renta llega siempre.', estrellas: 5 },
  { nombre: 'Patricia G.', ciudad: 'Huesca', texto: 'El piso lo dejaron impecable, mejor que como lo entregué. El trato es muy profesional.', estrellas: 5 },
  { nombre: 'Antonio L.', ciudad: 'Zaragoza', texto: 'Muy serios y transparentes desde el primer contacto. El contrato es claro y sin letra pequeña.', estrellas: 5 },
  { nombre: 'Marta S.', ciudad: 'Zaragoza', texto: 'Mi piso llevaba meses vacío. En tres semanas desde que contacté con Renttia ya estaba todo firmado.', estrellas: 5 },
  { nombre: 'Luis F.', ciudad: 'Logroño', texto: 'Me explicaron todo desde el primer momento. Cero sorpresas, cero preocupaciones. Totalmente recomendable.', estrellas: 5 },
  { nombre: 'Elena V.', ciudad: 'Huesca', texto: 'Tenía un piso heredado que no sabía qué hacer con él. Renttia lo gestionó todo y ahora genera renta sin que yo haga nada.', estrellas: 5 },
  { nombre: 'Roberto C.', ciudad: 'Zaragoza', texto: 'La tranquilidad de saber que cobras siempre no tiene precio. Muy recomendable para propietarios que no quieren complicaciones.', estrellas: 5 },
  { nombre: 'Isabel P.', ciudad: 'Logroño', texto: 'Proceso rapidísimo. En menos de un mes tenía el contrato firmado y el piso listo. Equipo muy atento.', estrellas: 5 },
  { nombre: 'David N.', ciudad: 'Zaragoza', texto: 'Antes tenía problemas con inquilinos. Ahora solo recibo una transferencia mensual. La diferencia es brutal.', estrellas: 5 },
  { nombre: 'Sofía T.', ciudad: 'Huesca', texto: 'Quedé muy satisfecha con la atención recibida. Me resolvieron todas las dudas antes de firmar.', estrellas: 5 },
  { nombre: 'Miguel Á.', ciudad: 'Zaragoza', texto: 'Renttia cumple exactamente lo que promete. Renta garantizada, sin llamadas, sin gestiones. Perfecto.', estrellas: 5 },
  { nombre: 'Ana B.', ciudad: 'Logroño', texto: 'Me preocupaba dejar el piso en manos de una empresa, pero la confianza que transmiten es total. Muy profesionales.', estrellas: 5 },
  { nombre: 'Fernando O.', ciudad: 'Zaragoza', texto: 'Cobro puntual cada mes y el piso está mejor cuidado que cuando lo alquilaba yo directamente. Nada que objetar.', estrellas: 5 },
  { nombre: 'Rosa M.', ciudad: 'Huesca', texto: 'Soy propietaria de dos pisos con Renttia. La gestión es excelente y la comunicación muy fluida.', estrellas: 5 },
  { nombre: 'Carlos E.', ciudad: 'Zaragoza', texto: 'Me ahorraron el dolor de cabeza de buscar inquilinos y gestionar incidencias. Merece cada euro.', estrellas: 5 },
  { nombre: 'Laura Q.', ciudad: 'Logroño', texto: 'El contrato es muy claro. Sin comisiones ocultas, sin sorpresas. Justo lo que necesitaba.', estrellas: 5 },
  { nombre: 'Tomás H.', ciudad: 'Zaragoza', texto: 'Tuve una pequeña avería y ni me enteré. Lo gestionaron ellos sin molestarme. Así da gusto.', estrellas: 5 },
  { nombre: 'Cristina J.', ciudad: 'Huesca', texto: 'Después de años con inquilinos problemáticos, Renttia ha sido un soplo de aire fresco. Muy recomendable.', estrellas: 5 },
  { nombre: 'Pablo R.', ciudad: 'Zaragoza', texto: 'La valoración fue rápida y honesta. Me ofrecieron exactamente el precio que pedía. Sin negociaciones.', estrellas: 5 },
  { nombre: 'Nuria D.', ciudad: 'Logroño', texto: 'Todo lo que dijeron que harían, lo han cumplido. Seria, puntual y profesional. Muy satisfecha.', estrellas: 5 },
  { nombre: 'Álvaro K.', ciudad: 'Zaragoza', texto: 'El piso quedó amueblado y equipado sin coste para mí. Eso marcó la diferencia para decidirme.', estrellas: 5 },
  { nombre: 'Pilar W.', ciudad: 'Huesca', texto: 'Desde la primera llamada hasta la firma, todo fue fluido y transparente. Gran experiencia.', estrellas: 5 },
  { nombre: 'Sergio A.', ciudad: 'Zaragoza', texto: 'Llevo un año sin preocupaciones. Renttia gestiona, yo cobro. Simple y efectivo.', estrellas: 5 },
]

function StarIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function ReviewCard({ r }: { r: typeof reviews[0] }) {
  return (
    <div className="w-64 sm:w-72 shrink-0 bg-white rounded-2xl p-5"
      style={{ border: '1px solid rgba(18,52,98,0.08)', boxShadow: '0 2px 12px rgba(18,52,98,0.06)' }}>
      <div className="flex items-center gap-1 mb-3">
        {[...Array(r.estrellas)].map((_, s) => <StarIcon key={s} />)}
      </div>
      <p className="font-serif font-light text-navy text-sm leading-relaxed mb-3">"{r.texto}"</p>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-navy/10 flex items-center justify-center shrink-0">
          <span className="font-sans text-navy text-xs font-semibold">{r.nombre[0]}</span>
        </div>
        <div>
          <p className="font-sans text-navy text-xs font-semibold leading-none">{r.nombre}</p>
          <p className="font-sans text-navy/40 text-[0.65rem] mt-0.5">Propietario · {r.ciudad}</p>
        </div>
      </div>
    </div>
  )
}

export default function ReviewsTicker() {
  return (
    <section className="py-14 sm:py-20 bg-[#f0f5fb] overflow-hidden">
      <div className="text-center mb-8 sm:mb-10 px-4">
        <span className="section-label">Opiniones reales</span>
        <h2 className="font-serif text-navy text-2xl sm:text-3xl lg:text-4xl font-light">
          Lo que dicen nuestros propietarios
        </h2>
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="font-sans text-navy/60 text-sm ml-1.5">5.0 · 24 reseñas verificadas</span>
        </div>
      </div>

      {/* Fila 1 — izquierda */}
      <div className="mb-3 sm:mb-4">
        <div className="reviews-left">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex gap-3 sm:gap-4 pr-3 sm:pr-4">
              {reviews.slice(0, 12).map((r, i) => <ReviewCard key={i} r={r} />)}
            </div>
          ))}
        </div>
      </div>

      {/* Fila 2 — derecha */}
      <div>
        <div className="reviews-right">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex gap-3 sm:gap-4 pr-3 sm:pr-4">
              {reviews.slice(12).map((r, i) => <ReviewCard key={i} r={r} />)}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
