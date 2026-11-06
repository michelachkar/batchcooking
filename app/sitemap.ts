import { statSync } from 'node:fs'
import { join } from 'node:path'
import type { MetadataRoute } from 'next'
import { getPosts } from '@/lib/content/blog'
import { getPages } from '@/lib/content/pages'
import { getProjects } from '@/lib/content/projects'
import { getServices, servicePages } from '@/lib/content/services'
import { vr } from '@/lib/flags'
import { getTeam } from '@/lib/content/team'
import { absoluteUrl } from '@/lib/seo'

// Date de dernière modification d'une page : celle de son fichier source, ou du contenu le plus récent qu'elle affiche.
function pageDate(route: string, content: { modified: Date }[] = []) {
  const file = statSync(join(process.cwd(), 'app/[locale]', route, 'page.tsx')).mtime
  return new Date(Math.max(+file, ...content.map((c) => +c.modified)))
}

// Plan du site : pages et contenus avec leur vraie date de modification.
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts().map((p) => ({ ...p, modified: p.data.updated ?? p.data.date }))
  // Build normal : les pages de service dédiées (date = celle de leur fichier) ; build de test visuel : les contenus MDX de la démo.
  const services = vr
    ? getServices()
    : servicePages.map((s) => ({ slug: s.slug, modified: pageDate(`services/${s.slug}`) }))
  const team = getTeam()
  const projects = getProjects()
  const entry = (path: string, lastModified: Date) => ({ url: absoluteUrl(path), lastModified })
  return [
    entry('/', pageDate('')),
    entry('/equipe', pageDate('equipe', team)),
    entry('/services', pageDate('services', services)),
    entry('/zones', pageDate('zones')),
    entry('/tarifs', pageDate('tarifs')),
    entry('/faq', pageDate('faq')),
    entry('/contact', pageDate('contact')),
    entry('/formule-evenement', pageDate('formule-evenement')),
    entry('/blog', pageDate('blog', posts)),
    entry('/realisations', pageDate('realisations', projects)),
    ...services.map((s) => entry(`/services/${s.slug}`, s.modified)),
    ...team.map((m) => entry(`/equipe/${m.slug}`, m.modified)),
    ...posts.map((p) => entry(`/blog/${p.slug}`, p.modified)),
    ...projects.map((p) => entry(`/realisations/${p.slug}`, p.modified)),
    ...getPages().map((p) => entry(`/${p.slug}`, p.data.updated)),
  ]
}
