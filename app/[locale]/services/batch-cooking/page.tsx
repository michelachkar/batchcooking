import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageHead } from '@/components/blocks/page-head'
import { BatchIntro, IconSection, Timeline } from '@/components/blocks/batch-page'
import { Audience, FaqList, WeekExample } from '@/components/blocks/home-v2'
import { BatchPackages, type PackageCard } from '@/components/blocks/batch-packages'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { faqPage } from '@/lib/jsonld'
import { media } from '@/lib/media'
import { pageMetadata } from '@/lib/seo'

type IconCard = { icon: string; title: string; text: string }

export async function generateMetadata(): Promise<Metadata> {
  const b = await getTranslations('batchPage.seo')
  return pageMetadata({
    title: b('title'),
    description: b('description'),
    path: '/services/batch-cooking',
  })
}

// Page du service « Batch cooking à domicile » (priorité sur le gabarit /services/[slug]).
export default async function BatchCookingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const p = await getTranslations('pages')
  const b = await getTranslations('batchPage')
  const faqItems = b.raw('faq.items') as { question: string; answer: string }[]
  const quote = '/contact#inquiry'
  const pk = await getTranslations('batchPage.packages')
  const leadPacks = (await getTranslations('lead')).raw('packs') as {
    id: string
    title: string
    label: string
  }[]
  // Nom et accroche de chaque formule : définis une seule fois dans `lead.packs`.
  const packages = (pk.raw('cards') as Omit<PackageCard, 'title' | 'label'>[]).map((c) => {
    const { title, label } = leadPacks.find((p) => p.id === c.id)!
    return { ...c, title, label }
  })

  return (
    <main id="contenu">
      <noscript>
        <style>{'[data-reveal]{opacity:1!important}'}</style>
      </noscript>
      <PageJsonLd
        path="/services/batch-cooking"
        title={b('seo.title')}
        description={b('seo.description')}
        crumbs={[{ label: p('services.crumb'), path: '/services' }, { label: b('crumb') }]}
        extra={[faqPage(faqItems)]}
      />
      <PageHead
        title={b('intro.kicker')}
        crumbs={[
          { label: p('home'), href: '/' },
          { label: p('services.crumb'), href: '/services' },
          { label: b('crumb') },
        ]}
        navLabel={p('navLabel')}
        background={media.heads.service}
        cta={{ label: b('intro.primary'), href: quote, lead: true }}
      />
      <BatchIntro
        kicker={b('intro.kicker')}
        title={b('intro.title')}
        paragraphs={b.raw('intro.paragraphs') as string[]}
        highlights={b.raw('intro.highlights') as string[]}
        primary={{ label: b('intro.primary'), href: quote }}
        secondary={{ label: b('intro.secondary'), href: '#deroule' }}
        image={{ src: '/assets/hero/chef.jpg', alt: b('intro.imageAlt') }}
      />
      <BatchPackages
        flushTop
        tone="terracotta"
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
        ctaHref={quote}
        cardCta={pk('plan')}
      />
      <Audience
        tone="white"
        kicker={b('audience.kicker')}
        title={b('audience.title')}
        items={b.raw('audience.items') as { title: string; text: string }[]}
      />
      <div id="deroule" className="scroll-mt-24" />
      <Timeline
        tone="beige"
        kicker={b('timeline.kicker')}
        title={b('timeline.title')}
        intro={b('timeline.intro')}
        steps={b.raw('timeline.steps') as { title: string; text: string }[]}
      />
      <IconSection
        name="diets"
        tone="white"
        kicker={b('diets.kicker')}
        title={b('diets.title')}
        intro={b('diets.intro')}
        items={b.raw('diets.items') as IconCard[]}
      />
      <WeekExample
        tone="beige"
        kicker={b('week.kicker')}
        title={b('week.title')}
        intro={b('week.intro')}
        note={b('week.note')}
        days={b.raw('week.days') as { day: string; dish: string }[]}
        cta={{ label: b('week.button'), href: quote }}
      />
      <FaqList tone="white" kicker={b('faq.kicker')} title={b('faq.title')} items={faqItems} />
    </main>
  )
}
