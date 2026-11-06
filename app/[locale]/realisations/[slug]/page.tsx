import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server'
import { PageHead } from '@/components/blocks/page-head'
import { Heading, Shell } from '@/components/blocks/home-v2'
import { RealisationCard } from '@/components/blocks/realisation-card'
import {
  ClientReview,
  Context,
  MenuList,
  Photos,
  QuoteCta,
  type Fact,
} from '@/components/blocks/realisation-detail'
import { Mdx } from '@/components/mdx'
import { toRealisationCard } from '@/lib/content/project-card'
import { getProject, getProjects } from '@/lib/content/projects'
import { vr } from '@/lib/flags'
import { media } from '@/lib/media'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { pageMetadata } from '@/lib/seo'
import * as ld from '@/lib/jsonld'

export const dynamicParams = false

// Formulaire de devis de chaque service.
const QUOTE: Record<string, string> = {
  batch: '/contact#inquiry',
  chef: '/services/chef-prive#devis',
  cours: '/services/cours-de-cuisine#devis',
}

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const found = getProject(slug)
  if (!found) return {}
  const { title, excerpt } = found.entry.data
  return pageMetadata({ title, description: excerpt, path: `/realisations/${slug}` })
}

// Fiche de réalisation : contexte, menu ou cours, photos, avis du client, durée, puis appel à l'action vers le devis.
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const found = getProject(slug)
  if (!found) notFound()
  const { entry, related } = found
  const { data } = entry
  const p = await getTranslations('pages')
  const r = await getTranslations('realisationsPage')
  const services = r.raw('services') as Record<string, string>
  const date = new Intl.DateTimeFormat(vr ? 'en-US' : await getLocale(), {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(data.date)
  const facts: Fact[] = [
    { icon: 'service', label: r('facts.service'), value: services[data.service] },
    { icon: 'date', label: r('facts.date'), value: date },
    data.location && { icon: 'place', label: r('facts.location'), value: data.location },
    data.duration && { icon: 'duration', label: r('facts.duration'), value: data.duration },
    data.guests && { icon: 'guests', label: r('facts.guests'), value: data.guests },
  ].filter((f): f is Fact => Boolean(f))
  const menu = r.raw(`menu.${data.service}`) as { kicker: string; title: string }
  return (
    <main id="contenu">
      <noscript>
        <style>{'[data-reveal]{opacity:1!important}'}</style>
      </noscript>
      <PageJsonLd
        path={`/realisations/${slug}`}
        title={data.title}
        description={data.excerpt}
        crumbs={[{ label: p('portfolio.crumb'), path: '/realisations' }, { label: data.title }]}
        extra={[
          ld.projectNode({
            path: `/realisations/${slug}`,
            name: data.title,
            description: data.excerpt,
            created: data.date.toISOString(),
            image: data.image.src,
          }),
        ]}
      />
      <PageHead
        title={data.title}
        crumbs={[
          { label: p('home'), href: '/' },
          { label: p('portfolio.crumb'), href: '/realisations' },
          { label: data.title },
        ]}
        navLabel={p('navLabel')}
        background={media.heads.portfolio}
      />
      <Context
        kicker={r('context.kicker')}
        title={r('context.title')}
        factsTitle={r('facts.title')}
        facts={facts}
      >
        <Mdx source={entry.body} />
      </Context>
      <MenuList kicker={menu.kicker} title={menu.title} items={data.menu} />
      <Photos
        kicker={r('photos.kicker')}
        title={r('photos.title')}
        photos={[data.image, ...data.gallery].map((g) => ({ ...g, unoptimized: vr }))}
      />
      {data.review && (
        <ClientReview
          kicker={r('review.kicker')}
          title={r('review.title')}
          quote={data.review.quote}
          author={data.review.author}
        />
      )}
      <QuoteCta
        kicker={r('cta.kicker')}
        title={r('detailCta.title')}
        text={r('detailCta.text')}
        button={r('detailCta.button')}
        href={QUOTE[data.service]}
      />
      {related.length > 0 && (
        <Shell name="real-related" tone="beige">
          <Heading kicker={r('related.kicker')} title={r('related.title')} />
          <ul className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
            {related.map((e) => (
              <RealisationCard key={e.slug} r={toRealisationCard(e, services)} />
            ))}
          </ul>
        </Shell>
      )}
    </main>
  )
}
