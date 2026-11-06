import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import { PageHead } from '@/components/blocks/page-head'
import { BatchPackages, type PackageCard } from '@/components/blocks/batch-packages'
import { TarifCategory } from '@/components/blocks/tarifs-category'
import { PackageCards, type Package } from '@/components/blocks/package-cards'
import { ZoneServices } from '@/components/blocks/zones-page'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { media } from '@/lib/media'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const p = await getTranslations('pages')
  const s = await getTranslations('seo')
  return pageMetadata({ title: p('pricing.title'), description: s('pricing'), path: '/tarifs' })
}

type PackageLabels = Record<
  'duration' | 'group' | 'level' | 'menu' | 'included' | 'ideal' | 'from',
  string
>

// Synthèse des tarifs : on réaffiche, tels quels, les blocs de tarifs des trois pages de service
// (mêmes composants, mêmes textes), pour que les prix ne puissent pas diverger.
export default async function PricingPage() {
  const p = await getTranslations('pages')
  const t = await getTranslations('tarifsPage')
  const z = await getTranslations('zonesPage')

  // Batch cooking (page /services/batch-cooking)
  const pk = await getTranslations('batchPage.packages')
  const leadPacks = (await getTranslations('lead')).raw('packs') as {
    id: string
    title: string
    label: string
  }[]
  const packages = (pk.raw('cards') as Omit<PackageCard, 'title' | 'label'>[]).map((c) => {
    const { title, label } = leadPacks.find((x) => x.id === c.id)!
    return { ...c, title, label }
  })
  // Chef privé (page /services/chef-prive) et cours de cuisine (page /services/cours-de-cuisine)
  const chef = await getTranslations('chefPage')
  const cours = await getTranslations('coursPage')

  return (
    <main id="contenu">
      <noscript>
        <style>{'[data-reveal]{opacity:1!important}'}</style>
      </noscript>
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
      <TarifCategory
        id="batch"
        icon="batch"
        tone="white"
        label={t('categories.label')}
        title={t('categories.batch.title')}
        text={t('categories.batch.text')}
        link={{ label: t('categories.link'), href: '/services/batch-cooking' }}
      />
      <BatchPackages
        flushTop
        hideHeader
        tone="white"
        kicker={pk('kicker')}
        title={pk('title')}
        intro={pk('intro')}
        note={pk('note')}
        cards={packages}
        toggle={pk.raw('toggle') as { label: string; week: string; month: string }}
        dinners={pk.raw('dinners') as { label: string; unit: string }}
        priceLine={pk.raw('priceLine') as string}
        priceNote={pk.raw('priceNote') as string}
        perDinner={pk.raw('perDinner') as string}
        moreTemplate={{ one: '+ {count} autre inclus', other: '+ {count} autres inclus' }}
        labels={{
          open: pk('open'),
          close: pk('close'),
          panelKicker: pk('panelKicker'),
          cta: pk('cta'),
        }}
        ctaHref="/contact#inquiry"
        cardCta={pk('plan')}
      />
      <TarifCategory
        id="diner-prive"
        icon="chef"
        tone="beige"
        label={t('categories.label')}
        title={t('categories.chef.title')}
        text={t('categories.chef.text')}
        link={{ label: t('categories.link'), href: '/services/chef-prive' }}
      />
      <PackageCards
        name="packages"
        tone="beige"
        hideHeader
        columns={3}
        kicker={chef('packages.kicker')}
        title={chef('packages.title')}
        intro={chef('packages.intro')}
        labels={chef.raw('packages.labels') as PackageLabels}
        items={chef.raw('packages.items') as Package[]}
        cta={{ label: chef('packages.button'), href: '/services/chef-prive#devis' }}
      />
      <TarifCategory
        id="cours"
        icon="cours"
        tone="white"
        label={t('categories.label')}
        title={t('categories.cours.title')}
        text={t('categories.cours.text')}
        link={{ label: t('categories.link'), href: '/services/cours-de-cuisine' }}
      />
      <PackageCards
        name="course-ideas"
        tone="white"
        hideHeader
        columns={3}
        kicker={cours('ideas.kicker')}
        title={cours('ideas.title')}
        intro={cours('ideas.intro')}
        labels={cours.raw('ideas.labels') as PackageLabels}
        items={cours.raw('ideas.items') as Package[]}
        cta={{ label: cours('ideas.button'), href: '/services/cours-de-cuisine#devis' }}
      />
      <ZoneServices
        tone="beige"
        kicker={z('services.kicker')}
        title={z('services.title')}
        intro={z('services.intro')}
        travelLabel={z('services.travelLabel')}
        delayLabel={z('services.delayLabel')}
        zones={z.raw('services.zones') as Parameters<typeof ZoneServices>[0]['zones']}
      />
    </main>
  )
}
