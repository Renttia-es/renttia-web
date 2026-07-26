import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, must-revalidate' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // ── Rutas SEO ciudades ──────────────────────────────────────────────
      { source: '/zaragoza', destination: '/gestion-alquiler-zaragoza', permanent: true },
      { source: '/huesca',   destination: '/gestion-alquiler-huesca',   permanent: true },
      // ── Rutas antiguas de landings → definitivas ────────────────────────
      { source: '/piso-vacio',      destination: '/calculadora-gastos',  permanent: true },
      { source: '/normativa-2024',  destination: '/normativa-vivienda',  permanent: true },
      // ── Logroño oculto (futuro lanzamiento): la landing existe pero no se
      //    enlaza ni se indexa. Atajo público retirado → home. ───────────────
      { source: '/logrono', destination: '/', permanent: true },
      // ── Habitaciones retiradas (aún no operamos habitaciones) → home ──────
      { source: '/habitaciones',        destination: '/', permanent: true },
      { source: '/habitaciones/:path*', destination: '/', permanent: true },
    ]
  },
}

export default nextConfig
