'use client'

import { useEffect } from 'react'
import { firePixelConversion, leerConversion } from '@/lib/metaPixel'

export default function GraciasPixel() {
  useEffect(() => {
    const lead = leerConversion()
    if (!lead) return
    firePixelConversion(lead.eventId, lead)
  }, [])

  return null
}
