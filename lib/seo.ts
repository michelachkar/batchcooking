import type { Metadata } from 'next'
import { site } from '@/lib/site'

/** Adresse publique du site (sans barre finale) : à renseigner en production via NEXT_PUBLIC_SITE_URL. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(
  /\/$/,
  '',
)

export const absoluteUrl = (path = '/') => `${siteUrl}${path}`

type PageMeta = {
  title: string
  description: string
  /** Chemin canonique, commençant par « / ». */
  path: string
  /** `article` pour les articles de blog. */
  type?: 'website' | 'article'
  /** Dates ISO d'un article. */
  published?: string
  modified?: string
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
  type = 'website',
  published,
  modified,
  image = '/opengraph-image',
  noindex,
}: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      url: path,
      title,
      description,
      siteName: site.name,
      locale: 'fr_FR',
      images: [{ url: image, width: 1200, height: 630 }],
      ...(type === 'article' && { publishedTime: published, modifiedTime: modified }),
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  }
}
