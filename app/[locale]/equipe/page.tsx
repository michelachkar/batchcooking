import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageHead } from '@/components/blocks/page-head'
import { OccasionsSection } from '@/components/sections/occasions-section'
import { ProposalSection } from '@/components/sections/proposal-section'
import { TeamSection } from '@/components/sections/team-section'
import { TrustedSection } from '@/components/sections/trusted-section'
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
    title: p('team.title'),
    description: s('team'),
    path: '/equipe',
  })
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const p = await getTranslations('pages')
  return (
    <main id="contenu">
      <PageJsonLd
        path="/equipe"
        title={p('team.title')}
        description={(await getTranslations('seo'))('team')}
        crumbs={[{ label: p('team.crumb') }]}
      />
      <PageHead
        title={p('team.title')}
        crumbs={[{ label: p('home'), href: '/' }, { label: p('team.crumb') }]}
        navLabel={p('navLabel')}
        background={media.heads.team}
      />
      <TeamSection
        header={false}
        show={['julien-marchetti', 'theo-ramirez', 'sofia-lindqvist', 'amara-okafor']}
      />
      <TrustedSection logoHeight={90} bottomGap={50} />
      <ProposalSection />
      <OccasionsSection topSpacer={15} wideHeader />
    </main>
  )
}
