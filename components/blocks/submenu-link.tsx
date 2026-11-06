'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'

/** Lien de sous-menu : au clic, referme le sous-menu (le survol et le focus le laisseraient ouvert) jusqu'à la prochaine entrée du pointeur. */
export function SubmenuLink({ onClick, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        onClick?.(e)
        const item = e.currentTarget.closest<HTMLElement>('.mtsh-item')
        e.currentTarget.blur()
        if (!item) return
        item.dataset.closed = ''
        item.addEventListener('pointerleave', () => delete item.dataset.closed, { once: true })
      }}
    />
  )
}
