import { ExperiencesSection } from '@/components/sections/experiences-section'
import { SampleMenus, type SampleMenu } from '@/components/blocks/sample-menus'
import { PhotoStrip, type StripPhoto } from '@/components/blocks/photo-strip'
import { Included } from '@/components/blocks/included'
import { EveningSteps } from '@/components/blocks/evening-steps'
import { ClientCarousel } from '@/components/blocks/client-carousel'
import { AboutSection } from '@/components/sections/about-section'
import { ChefSection } from '@/components/sections/chef-section'
import { TeamSection } from '@/components/sections/team-section'
import { TrustedSection } from '@/components/sections/trusted-section'
import type { IconName } from '@/components/ui/icon'
import { Zones } from '@/components/blocks/home-v2'
import { EventsSection } from '@/components/sections/events-section'
import { OccasionsSection } from '@/components/sections/occasions-section'
import { ProposalSection } from '@/components/sections/proposal-section'
import { ReviewsSection } from '@/components/sections/reviews-section'
import { PostsSections } from '@/components/sections/posts-sections'
import { Hero, type HeroBadge } from '@/components/blocks/hero'
import { QuickInquiry } from '@/components/blocks/quick-inquiry'
import { MealPlanInquiry } from '@/components/blocks/meal-plan-inquiry'
import { getTranslations } from '@/lib/i18n'
import { mediaOf, type Landing as LandingNs } from '@/lib/media'

// Page d'accueil (messages et photos de l'espace `ns`) : l'accueil et la page « Mobile Bar & Cocktails » ont les mêmes sections dans le même ordre.
export async function Landing({ ns }: { ns: LandingNs }) {
  const media = mediaOf(ns)
  const t = await getTranslations(`${ns}.hero`)
  const q = await getTranslations(`${ns}.inquiry`)
  const rv = await getTranslations(`${ns}.reviews`)
  // Citation courte : le passage entre « » de chaque avis.
  const heroReviews = (rv.raw('reviews') as { name: string; text: string }[]).flatMap((r) => {
    const quote = r.text.match(/«\s*(.+?)\s*»/)?.[1]
    return quote ? [{ quote, name: r.name }] : []
  })
  const zn = ns === 'home' ? await getTranslations('homeV2.zones') : null
  const zc = ns === 'home' ? await getTranslations('zonesPage.cities') : null
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
  return (
    <>
      <Hero
        label={t('label')}
        headline={t('headline')}
        accent={t('accent')}
        description={t('description')}
        badges={ns === 'home' ? (t.raw('badges') as HeroBadge[]) : undefined}
        primary={{ label: t('primary'), href: '/contact', lead: ns === 'home' }}
        secondary={{ label: t('secondary'), href: ns === 'home' ? '/recettes' : '/services' }}
        meta={{ text: t('meta') }}
        googleReviews={ns === 'home' ? t('googleReviews') : undefined}
        heroReviews={ns === 'home' ? { label: rv('navigation'), items: heroReviews } : undefined}
        image={{ ...media.hero, alt: t('imageAlt') }}
        caption={{
          kicker: t('captionKicker'),
          title: t('captionTitle'),
          text: t('captionText'),
        }}
      />
      {ns === 'home' ? (
        <MealPlanInquiry
          kicker={q('kicker')}
          title={q('title')}
          action="/contact#inquiry"
          householdLabel={q('householdLabel')}
          householdPlaceholder={q('householdPlaceholder')}
          householdOptions={q.raw('householdOptions') as { value: string; label: string }[]}
          mealsLabel={q('mealsLabel')}
          mealsPlaceholder={q('mealsPlaceholder')}
          mealsOptions={q.raw('mealsOptions') as { value: string; label: string }[]}
          phoneLabel={q('phoneLabel')}
          phonePlaceholder={q('phonePlaceholder')}
          button={q('button')}
          note={q('note')}
          success={q('success')}
          error={q('error')}
        />
      ) : (
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
      )}
      <ExperiencesSection ns={ns} />
      <ChefSection ns={ns} />
      <AboutSection ns={ns} />
      <EventsSection ns={ns} />
      {zn && zc && (
        <Zones
          tone="beige"
          kicker={zn('kicker')}
          title={zn('title')}
          intro={zn('intro')}
          areas={(zc.raw('hubs') as { title: string; text: string }[]).map((h) => ({
            name: h.title,
            text: h.text,
          }))}
          note={zn('note')}
          link={{ label: zn('link'), href: '/zones' }}
        />
      )}
      <PhotoStrip
        kicker={ph('kicker')}
        title={ph('title')}
        handle={{ label: ph('handle'), href: '#' }}
        photos={strip}
        galleryLabel={ph('gallery')}
      />
      <ReviewsSection ns={ns} />
      <PostsSections ns={ns} />
      {ns !== 'home' && (
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
      )}
      {ns !== 'home' && (
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
      )}
      {ns !== 'home' && (
        <EveningSteps
          kicker={es('kicker')}
          title={es('title')}
          button={{ label: es('button'), href: '/contact#inquiry' }}
          steps={es.raw('steps') as { icon: IconName; title: string; text: string }[]}
        />
      )}
      {ns !== 'home' && media.partners.length > 0 && (
        <section data-section="partners" className="max-md:mb-10">
          <div className="mx-auto flow-root max-w-[1350px] pt-5 pb-5 max-md:pt-[30px] max-md:pb-0">
            <ClientCarousel logos={media.partners.slice(0, 3)} height={54} className="mb-[21px]" />
          </div>
        </section>
      )}
      {ns !== 'home' && <OccasionsSection ns={ns} />}
      {ns !== 'home' && (
        <TeamSection
          ns={ns}
          show={['julien-marchetti', 'theo-ramirez', 'sofia-lindqvist', 'amara-okafor']}
        />
      )}
      {ns !== 'home' && <TrustedSection ns={ns} />}
      <div className="h-[105px]" aria-hidden />
      {ns !== 'home' && <ProposalSection ns={ns} />}
    </>
  )
}
