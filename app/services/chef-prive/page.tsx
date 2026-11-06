import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import { PageHead } from '@/components/blocks/page-head'
import { BatchIntro } from '@/components/blocks/batch-page'
import { PackageCards, type Package } from '@/components/blocks/package-cards'
import { Included } from '@/components/blocks/included'
import type { IconName } from '@/components/ui/icon'
import { mediaOf } from '@/lib/media'
import { Practical } from '@/components/blocks/chef-page'
import { FaqList } from '@/components/blocks/home-v2'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { faqPage, serviceNode } from '@/lib/jsonld'
import { media } from '@/lib/media'
import { pageMetadata } from '@/lib/seo'
import styles from './page.module.css'

const PATH = '/services/chef-prive'
type IconCard = { icon: string; title: string; text: string; tag?: string }

export async function generateMetadata(): Promise<Metadata> {
  const c = await getTranslations('chefPage.seo')
  return pageMetadata({ title: c('title'), description: c('description'), path: PATH })
}

// Page du service « Chef privé & expériences » (priorité sur le gabarit /services/[slug]).
export default async function ChefPrivePage() {
  const p = await getTranslations('pages')
  const c = await getTranslations('chefPage')
  const inc = await getTranslations('home.included')
  const homeMedia = mediaOf('home')
  const faqItems = c.raw('faq.items') as { question: string; answer: string }[]
  const quote = `${PATH}#devis`

  return (
    <main id="contenu">
      <noscript>
        <style>{'[data-reveal]{opacity:1!important}'}</style>
      </noscript>
      <PageJsonLd
        path={PATH}
        title={c('seo.title')}
        description={c('seo.description')}
        crumbs={[{ label: p('services.crumb'), path: '/services' }, { label: c('crumb') }]}
        extra={[
          serviceNode({
            path: PATH,
            name: c('seo.title'),
            description: c('seo.description'),
            image: '/assets/hero/chef.jpg',
          }),
          faqPage(faqItems),
        ]}
      />
      <PageHead
        title={c('intro.kicker')}
        crumbs={[
          { label: p('home'), href: '/' },
          { label: p('services.crumb'), href: '/services' },
          { label: c('crumb') },
        ]}
        navLabel={p('navLabel')}
        background={media.heads.service}
        cta={{ label: c('intro.primary'), href: quote }}
      />
      <BatchIntro
        kicker={c('intro.kicker')}
        title={c('intro.title')}
        paragraphs={c.raw('intro.paragraphs') as string[]}
        highlights={c.raw('intro.highlights') as string[]}
        primary={{ label: c('intro.primary'), href: quote }}
        secondary={{ label: c('intro.secondary'), href: '#deroule' }}
        image={{ src: '/assets/hero/chef.jpg', alt: c('intro.imageAlt') }}
        lead={false}
      />
      <PackageCards
        name="packages"
        tone="terracotta"
        columns={3}
        kicker={c('packages.kicker')}
        title={c('packages.title')}
        intro={c('packages.intro')}
        labels={
          c.raw('packages.labels') as Record<
            'duration' | 'group' | 'level' | 'menu' | 'included' | 'ideal' | 'from',
            string
          >
        }
        items={c.raw('packages.items') as Package[]}
        cta={{ label: c('packages.button'), href: quote }}
      />
      <div id="deroule" className={styles.anchor} />
      <Included
        flush
        kicker={inc('kicker')}
        title={inc('title')}
        paragraphs={inc.raw('paragraphs') as string[]}
        listTitle={inc('listTitle')}
        listStyle="check"
        columns={2}
        items={inc.raw('items') as { icon: IconName; text: string }[]}
        extras={{
          title: inc('extrasTitle'),
          items: inc.raw('extras') as { icon: IconName; label: string; value: string }[],
        }}
        note={inc('note')}
        link={{ label: inc('link'), href: quote }}
        linkStyle="button"
        badge={{ icon: 'shield-check', value: inc('badgeValue'), text: inc('badgeText') }}
        image={{ ...homeMedia.included, alt: inc('imageAlt') }}
        inset={{ ...homeMedia.includedInset, alt: inc('insetAlt') }}
      />
      <Practical
        tone="beige"
        kicker={c('practical.kicker')}
        title={c('practical.title')}
        cols={c.raw('practical.cols') as { icon: string; title: string; items: string[] }[]}
      />
      <FaqList tone="white" kicker={c('faq.kicker')} title={c('faq.title')} items={faqItems} />
    </main>
  )
}
