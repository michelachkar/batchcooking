import type { Metadata } from 'next'
import { site } from '@/lib/site'

/** Adresse publique du site (sans barre finale) : à renseigner en production via NEXT_PUBLIC_SITE_URL. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(
  /\/$/,
  '',
)

export const absoluteUrl = (path = '/') => `${siteUrl}${path}`

/**
 * Adresse du site en production (NEXT_PUBLIC_PRODUCTION_URL, identique sur tous les environnements) :
 * tout autre NEXT_PUBLIC_SITE_URL (dev, test, local) reste hors des moteurs de recherche.
 * Sans valeur, aucun environnement n'est considéré comme production : le site reste donc non indexable.
 */
export const productionUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL?.replace(/\/$/, '')
export const isProduction = productionUrl !== undefined && siteUrl === productionUrl

/** Directive à poser sur chaque page d'un environnement hors production. */
export const nonProductionRobots = isProduction ? undefined : { index: false, follow: false }

type PageMeta = {
  title: string
  description: string
  /** Chemin canonique, commençant par « / ». */
  path: string
  /** Image de partage (par défaut celle du site). */
  image?: string
  /** Page à ne pas indexer (variantes en doublon, 404). */
  noindex?: boolean
}

// Métadonnées d'une page : titre, description, canonique, Open Graph et Twitter (l'image vient de opengraph-image).
export function pageMetadata({
  title,
  description,
  path,
  image = '/opengraph-image',
  noindex,
}: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: nonProductionRobots ?? (noindex ? { index: false, follow: true } : undefined),
    openGraph: {
      type: 'website',
      url: path,
      title,
      description,
      siteName: site.name,
      locale: 'fr_FR',
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  }
}
