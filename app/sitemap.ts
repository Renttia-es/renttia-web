import type { MetadataRoute } from 'next'

const BASE = 'https://renttia.es'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Home ──────────────────────────────────────────────────────
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },

    // ── Landings propietarios (transaccional) ─────────────────────
    {
      url: `${BASE}/gestion-alquiler-zaragoza`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/gestion-alquiler-logrono`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/gestion-alquiler-huesca`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },


    // ── Blog ─────────────────────────────────────────────────────
    {
      url: `${BASE}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE}/blog/alquiler-habitaciones-zaragoza-guia-propietarios`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE}/blog/contrato-arrendamiento-uso-distinto-vivienda`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE}/blog/rentabilidad-piso-compartido-vs-alquiler-tradicional`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE}/blog/mercado-alquiler-zaragoza-2026`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE}/blog/como-poner-piso-punto-habitaciones-premium`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE}/blog/impagos-alquiler-como-evitarlos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // ── Artículos SEO long-tail (jul 2026) ───────────────────────────
    {
      url: `${BASE}/blog/trucos-para-echar-a-un-inquilino-que-no-paga`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE}/blog/se-puede-echar-a-un-inquilino-por-necesitar-el-piso`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE}/blog/nueva-ley-para-echar-inquilinos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE}/blog/ley-de-vivienda-alquiler`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE}/blog/prorroga-contrato-alquiler`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE}/blog/piso-en-herencia-que-hacer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE}/blog/como-echar-a-un-inquiokupa`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
