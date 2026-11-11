import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import { PageHead } from '@/components/layout/page-head'
import { BatchPackages, type PackageCard } from '@/components/blocks/batch-packages'
import { TarifsPicker } from '@/components/blocks/tarifs-picker'
import { euro, fromPrice, PACKS } from '@/lib/lead/pricing'
import { TarifCategory } from '@/components/blocks/tarifs-category'
import { PackageCards, type Package } from '@/components/blocks/package-cards'
import { ZoneServices } from '@/components/blocks/zone-services'
import { FaqSection } from '@/components/sections/faq-section'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { faqPage } from '@/lib/jsonld'
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
// Prix d'appel d'une liste de formules : le plus bas, avec son unité (« par personne », « par enfant »…).
function cheapest(items: Package[], from: string) {
  const [best] = [...items].sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
  return { price: `${from} ${best.price}`, unit: best.priceNote }
}

export default async function PricingPage() {
  const p = await getTranslations('pages')
  const t = await getTranslations('tarifsPage')
  const z = await getTranslations('zonesPage')
  const faqItems = t.raw('faq.items') as { question: string; answer: string }[]

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
        extra={[faqPage(faqItems)]}
      />
      <PageHead
        title={p('pricing.title')}
        crumbs={[{ label: p('home'), href: '/' }, { label: p('pricing.crumb') }]}
        navLabel={p('navLabel')}
        background={media.heads.pricing}
        description={p('heads.pricing')}
      />
      <TarifsPicker
        kicker={t('picker.kicker')}
        title={t('picker.title')}
        intro={t('picker.intro')}
        cta={t('picker.cta')}
        options={[
          {
            id: 'batch',
            icon: 'batch',
            title: t('categories.batch.title'),
            text: t('picker.batch'),
            price: `${t('picker.from')} ${euro(Math.min(...PACKS.map(fromPrice)))} €`,
            unit: t('picker.batchUnit'),
            note: t('picker.batchNote'),
          },
          {
            id: 'diner-prive',
            icon: 'chef',
            title: t('categories.chef.title'),
            text: t('picker.chef'),
            ...cheapest(chef.raw('packages.items') as Package[], t('picker.from')),
          },
          {
            id: 'cours',
            icon: 'cours',
            title: t('categories.cours.title'),
            text: t('picker.cours'),
            ...cheapest(cours.raw('ideas.items') as Package[], t('picker.from')),
          },
        ]}
      />
      <TarifCategory
        id="batch"
        icon="batch"
        tone="beige"
        label={t('categories.label')}
        title={t('categories.batch.title')}
        text={t('categories.batch.text')}
        link={{ label: t('categories.link'), href: '/services/batch-cooking' }}
      />
      <BatchPackages
        flushTop
        hideHeader
        tone="beige"
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
        tone="white"
        label={t('categories.label')}
        title={t('categories.chef.title')}
        text={t('categories.chef.text')}
        link={{ label: t('categories.link'), href: '/services/chef-prive' }}
      />
      <PackageCards
        name="packages"
        tone="white"
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
        tone="beige"
        label={t('categories.label')}
        title={t('categories.cours.title')}
        text={t('categories.cours.text')}
        link={{ label: t('categories.link'), href: '/services/cours-de-cuisine' }}
      />
      <PackageCards
        name="course-ideas"
        tone="beige"
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
        center
        tone="white"
        kicker={z('services.kicker')}
        title={z('services.title')}
        intro={z('services.intro')}
        travelLabel={z('services.travelLabel')}
        delayLabel={z('services.delayLabel')}
        zones={z.raw('services.zones') as Parameters<typeof ZoneServices>[0]['zones']}
      />
      <FaqSection
        name="tarifs-faq"
        tone="beige"
        kicker={t('faq.kicker')}
        title={t('faq.title')}
        items={faqItems}
      />
    </main>
  )
}
