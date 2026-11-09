'use client'

import { useEffect } from 'react'

/** Réduit le header collant au défilement : pose `data-scrolled` sur #site-header (seuils différents pour éviter le clignotement). */
export function HeaderShrink() {
  useEffect(() => {
    const header = document.getElementById('site-header')
    if (!header) return
    let scrolled = false
    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      if (!scrolled && y > 120) scrolled = true
      else if (scrolled && y < 20) scrolled = false
      else return
      header.toggleAttribute('data-scrolled', scrolled)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])
  return null
}
