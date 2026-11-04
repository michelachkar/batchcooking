import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageHead } from '@/components/blocks/page-head'
import { AboutSection } from '@/components/sections/about-section'
import { ChefSection } from '@/components/sections/chef-section'
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
    title: p('about.title'),
    description: s('about'),
    path: '/a-propos',
  })
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const p = await getTranslations('pages')
  return (
    <main id="contenu">
      <PageJsonLd
        path="/a-propos"
        title={p('about.title')}
        description={(await getTranslations('seo'))('about')}
        crumbs={[{ label: p('about.crumb') }]}
      />
      <PageHead
        title={p('about.title')}
        crumbs={[{ label: p('home'), href: '/' }, { label: p('about.crumb') }]}
        navLabel={p('navLabel')}
        background={media.heads.about}
      />
      <AboutSection />
      <ChefSection />
      <TeamSection
        spacer={95}
        tail={0}
        tabletTop={50}
        show={['julien-marchetti', 'amara-okafor', 'theo-ramirez', 'grace-whitfield']}
      />
      <TrustedSection topGap={26} tail={80} />
    </main>
  )
}
