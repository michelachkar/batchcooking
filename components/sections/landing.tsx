import { ExperienceCards, type ExperienceCard } from '@/components/blocks/experience-cards'
import { SampleMenus, type SampleMenu } from '@/components/blocks/sample-menus'
import { PhotoStrip, type StripPhoto } from '@/components/blocks/photo-strip'
import { Included } from '@/components/blocks/included'
import { EveningSteps } from '@/components/blocks/evening-steps'
import { ClientCarousel } from '@/components/blocks/client-carousel'
import { AboutSection } from '@/components/sections/about-section'
import { ChefSection } from '@/components/sections/chef-section'
import { TeamSection } from '@/components/sections/team-section'
import { TrustedSection } from '@/components/sections/trusted-section'
import { vr } from '@/lib/flags'
import type { IconName } from '@/components/ui/icon'
import { EventsSection } from '@/components/sections/events-section'
import { OccasionsSection } from '@/components/sections/occasions-section'
import { ProposalSection } from '@/components/sections/proposal-section'
import { ReviewsSection } from '@/components/sections/reviews-section'
import { PostsSections } from '@/components/sections/posts-sections'
import { Hero } from '@/components/blocks/hero'
import { QuickInquiry } from '@/components/blocks/quick-inquiry'
import { getTranslations } from 'next-intl/server'
import { mediaOf, type Landing as LandingNs } from '@/lib/media'

// Page d'accueil (messages et photos de l'espace `ns`) : l'accueil et la page « Mobile Bar & Cocktails » ont les mêmes sections dans le même ordre.
export async function Landing({ ns }: { ns: LandingNs }) {
  const media = mediaOf(ns)
  const t = await getTranslations(`${ns}.hero`)
  const q = await getTranslations(`${ns}.inquiry`)
  const x = await getTranslations(`${ns}.experiences`)
  const m = await getTranslations(`${ns}.menus`)
  const menus = (m.raw('cards') as (Omit<SampleMenu, 'image'> & { alt: string })[]).map(
    ({ alt, ...c }, i) => ({
      ...c,
      image: { ...media.menus[i], alt },
    }),
  )
  const ph = await getTranslations(`${ns}.photos`)
  const strip = (ph.raw('photos') as { caption: string; icon: StripPhoto['icon'] }[]).map(
    (p, i) => ({ ...media.strip[i], ...p }),
  )
  const inc = await getTranslations(`${ns}.included`)
  const es = await getTranslations(`${ns}.steps`)
  const links = ['/services', '/services', ns === 'home' ? '/formule-evenement' : '/services']
  type CardText = {
    title: string
    text: string
    meta: string
    icon: string
    linkText: string
    alt: string
  }
  const cards: ExperienceCard[] = (x.raw('cards') as CardText[]).map((c, i) => ({
    title: c.title,
    text: c.text,
    meta: c.meta,
    icon: (c.icon || undefined) as ExperienceCard['icon'],
    linkText: c.linkText,
    href: links[i],
    image: media.cards[i],
    alt: c.alt,
  }))

  return (
    <>
      <Hero
        label={t('label')}
        headline={t('headline')}
        accent={t('accent')}
        description={t('description')}
        primary={{ label: t('primary'), href: '/contact' }}
        secondary={{ label: t('secondary'), href: '/services' }}
        meta={{ text: t('meta'), stars: vr }}
        image={{ ...media.hero, alt: t('imageAlt') }}
        caption={{ kicker: t('captionKicker'), title: t('captionTitle'), text: t('captionText') }}
      />
      <QuickInquiry
        kicker={q('kicker')}
        title={q('title')}
        action="/contact#inquiry"
        dateLabel={q('dateLabel')}
        guestsLabel={q('guestsLabel')}
        guestsPlaceholder={q('guestsPlaceholder')}
        guestsOptions={q.raw('guestsOptions') as string[]}
        locationLabel={q('locationLabel')}
        locationPlaceholder={q('locationPlaceholder')}
        button={q('button')}
        note={q('note')}
      />
      <ExperienceCards kicker={x('kicker')} title={x('title')} intro={x('intro')} cards={cards} />
      <ChefSection ns={ns} />
      <AboutSection ns={ns} />
      <SampleMenus
        kicker={m('kicker')}
        title={m('title')}
        intro={m('intro')}
        note={m('note')}
        menus={menus}
        labels={{
          open: m('open'),
          close: m('close'),
          panelKicker: m('panelKicker'),
          cta: m('cta'),
          more: (count) => m('more', { count }),
        }}
        ctaHref="/contact#inquiry"
      />
      <PhotoStrip
        kicker={ph('kicker')}
        title={ph('title')}
        handle={{ label: ph('handle'), href: '#' }}
        photos={strip}
        galleryLabel={ph('gallery')}
      />
      <Included
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
        link={{ label: inc('link'), href: '/contact#inquiry' }}
        linkStyle="button"
        badge={{ icon: 'shield-check', value: inc('badgeValue'), text: inc('badgeText') }}
        image={{ ...media.included, alt: inc('imageAlt') }}
        inset={{ ...media.includedInset, alt: inc('insetAlt') }}
      />
      <EventsSection ns={ns} />
      <EveningSteps
        kicker={es('kicker')}
        title={es('title')}
        button={{ label: es('button'), href: '/contact#inquiry' }}
        steps={es.raw('steps') as { icon: IconName; title: string; text: string }[]}
      />
      {media.partners.length > 0 && (
        <section data-section="partners" className="max-md:mb-10">
          <div className="mx-auto flow-root max-w-[1350px] pt-5 pb-5 max-md:pt-[30px] max-md:pb-0">
            <ClientCarousel logos={media.partners.slice(0, 3)} height={54} className="mb-[21px]" />
          </div>
        </section>
      )}
      <OccasionsSection ns={ns} />
      <ReviewsSection ns={ns} />
      <TeamSection
        ns={ns}
        show={['julien-marchetti', 'theo-ramirez', 'sofia-lindqvist', 'amara-okafor']}
      />
      <TrustedSection ns={ns} />
      <div className="h-[105px]" aria-hidden />
      <ProposalSection ns={ns} />
      <PostsSections ns={ns} />
    </>
  )
}
