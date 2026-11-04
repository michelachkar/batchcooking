import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageHead } from '@/components/blocks/page-head'
import { ProjectsDropdown, type DropdownProject } from '@/components/blocks/projects-dropdown'
import { ServicePricing, type PricingPlan } from '@/components/blocks/service-pricing'
import { ReviewsSection } from '@/components/sections/reviews-section'
import { media } from '@/lib/media'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const p = await getTranslations({ locale, namespace: 'pages' })
  const s = await getTranslations({ locale, namespace: 'seo' })
  return pageMetadata({
    title: p('pricing.title'),
    description: s('pricing'),
    path: '/tarifs',
  })
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const p = await getTranslations('pages')
  const t = await getTranslations('pricing')
  const plans = (t.raw('plans') as Omit<PricingPlan, 'image'>[]).map((x, i) => ({
    ...x,
    image: media.plans[i % media.plans.length],
  }))
  const projects = (t.raw('projects.items') as Omit<DropdownProject, 'image'>[]).map((x, i) => ({
    ...x,
    image: media.plans[i % media.plans.length],
  }))
  return (
    <main id="contenu">
      <PageJsonLd
        path="/tarifs"
        title={p('pricing.title')}
        description={(await getTranslations('seo'))('pricing')}
        crumbs={[{ label: p('pricing.crumb') }]}
      />
      <PageHead
        title={p('pricing.title')}
        crumbs={[{ label: p('home'), href: '/' }, { label: p('pricing.crumb') }]}
        navLabel={p('navLabel')}
        background={media.heads.pricing}
      />
      {plans.length > 0 && <ServicePricing plans={plans} />}
      <ReviewsSection variant="inset-proof" initial={0} />
      {projects.length > 0 && (
        <ProjectsDropdown
          projects={projects}
          labels={{ expand: t('projects.expand'), collapse: t('projects.collapse') }}
          defaultOpen={t.raw('projects.defaultOpen') as number}
        />
      )}
    </main>
  )
}
