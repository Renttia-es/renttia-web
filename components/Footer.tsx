import Link from 'next/link'
import Image from 'next/image'

const propietarios = [
  { label: 'Gestión en Zaragoza', href: '/gestion-alquiler-zaragoza'  },
  { label: 'Gestión en Logroño',  href: '/gestion-alquiler-logrono'   },
  { label: 'Gestión en Huesca',   href: '/gestion-alquiler-huesca'    },
]


const recursos = [
  { label: 'Blog',                   href: '/blog'        },
  { label: 'Aviso Legal',            href: '/aviso-legal'  },
  { label: 'Política de Privacidad', href: '/privacidad'   },
  { label: 'Política de Cookies',    href: '/cookies'      },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/logo.png"
                alt="Renttia — Alquiler de Habitaciones Premium"
                width={180}
                height={54}
                className="h-10 w-auto brightness-0 invert opacity-80"
              />
            </Link>
            <p className="font-sans text-sm leading-relaxed text-white/45 mb-5">
              Gestión profesional de inmuebles en Zaragoza, Logroño y Huesca.
              Alquiler de habitaciones premium, sin complicaciones para el propietario.
            </p>
            <a href="mailto:hola@renttia.es"
              className="text-cta-light hover:text-white text-sm font-sans transition-colors">
              hola@renttia.es
            </a>
          </div>

          {/* Propietarios */}
          <div className="text-left md:text-center">
            <h3 className="font-sans text-white font-medium text-xs uppercase tracking-widest mb-4">
              Para Propietarios
            </h3>
            <ul className="space-y-2.5">
              {propietarios.map(l => (
                <li key={l.href}>
                  <Link href={l.href}
                    className="font-sans text-sm text-white/45 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="font-sans text-white font-medium text-xs uppercase tracking-widest mb-4">
              Recursos
            </h3>
            <ul className="space-y-2.5">
              {recursos.map(l => (
                <li key={l.href}>
                  <Link href={l.href}
                    className="font-sans text-sm text-white/45 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-sans text-xs text-white/30">
            © {new Date().getFullYear()} Renttia. Todos los derechos reservados.
          </p>
          <p className="font-sans text-xs text-white/30">
            Zaragoza · Logroño · Huesca
          </p>
        </div>
      </div>
    </footer>
  )
}
