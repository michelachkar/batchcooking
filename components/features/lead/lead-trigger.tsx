'use client'

import Link from 'next/link'
import { useLead, type LeadOpenOptions } from '@/components/features/lead/lead-provider'

type LeadTriggerProps = LeadOpenOptions &
  Omit<React.ComponentProps<typeof Link>, 'href' | 'onClick'> & {
    /** Page de repli si le JavaScript est désactivé. */
    fallbackHref?: string
  }

// Le CTA « Commencer à planifier » : un lien qui ouvre le modal de demande de rappel.
// Avec `pack`, le modal commence directement par les coordonnées ; sinon par la comparaison des formules.
export function LeadTrigger({
  pack,
  period,
  dinners,
  fallbackHref = '/contact#inquiry',
  children,
  ...rest
}: LeadTriggerProps) {
  const { open } = useLead()
  return (
    <Link
      {...rest}
      href={fallbackHref}
      onClick={(e) => {
        e.preventDefault()
        open({ pack, period, dinners })
      }}
    >
      {children}
    </Link>
  )
}
