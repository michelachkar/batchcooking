import { statSync } from 'node:fs'
import { join } from 'node:path'
import type { MetadataRoute } from 'next'
import { getPages } from '@/lib/content/pages'
import { getProjects } from '@/lib/content/projects'
import { servicePages } from '@/lib/content/services'
import { absoluteUrl } from '@/lib/seo'

// Calculé au build : le sitemap lit des fichiers sources, absents du runtime Cloudflare.
export const dynamic = 'force-static'

// Date de dernière modification d'une page : celle de son fichier source, ou du contenu le plus récent qu'elle affiche.
function pageDate(route: string, content: { modified: Date }[] = []) {
  const file = statSync(join(process.cwd(), 'app', route, 'page.tsx')).mtime
  return new Date(Math.max(+file, ...content.map((c) => +c.modified)))
}

// Plan du site : pages et contenus avec leur vraie date de modification.
export default function sitemap(): MetadataRoute.Sitemap {
  // Pages de service dédiées : date = celle de leur fichier.
  const services = servicePages.map((s) => ({
    slug: s.slug,
    modified: pageDate(`services/${s.slug}`),
  }))
  const projects = getProjects()
  const entry = (path: string, lastModified: Date) => ({ url: absoluteUrl(path), lastModified })
  return [
    entry('/', pageDate('')),
    entry('/services', pageDate('services', services)),
    entry('/a-propos', pageDate('a-propos')),
    entry('/zones', pageDate('zones')),
    entry('/tarifs', pageDate('tarifs')),
    entry('/faq', pageDate('faq')),
    entry('/contact', pageDate('contact')),
    entry('/inspirations', pageDate('inspirations', projects)),
    entry('/realisations', pageDate('realisations', projects)),
    ...services.map((s) => entry(`/services/${s.slug}`, s.modified)),
    ...projects.map((p) => entry(`/realisations/${p.slug}`, p.modified)),
    ...getPages().map((p) => entry(`/${p.slug}`, p.data.updated)),
  ]
}
