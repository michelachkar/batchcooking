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
import { Hero } from '@/components/blocks/hero'
import type { CreditDialogTexts, CreditNoteTexts } from '@/components/blocks/credit-note'
import { QuickInquiry } from '@/components/blocks/quick-inquiry'
import { MealPlanInquiry } from '@/components/blocks/meal-plan-inquiry'
import styles from './landing.module.css'
import { getTranslations } from '@/lib/i18n'
import { mediaOf, type Landing as LandingNs } from '@/lib/media'

// Page d'accueil (messages et photos de l'espace `ns`).
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
        gallery={
          ns === 'home'
            ? media.heroGallery.map((img, i) => ({ ...img, alt: t(`galleryAlts.${i}`) }))
            : undefined
        }
        primary={{ label: t('primary'), href: '/contact', lead: ns === 'home' }}
        secondary={{ label: t('secondary'), href: ns === 'home' ? '/recettes' : '/services' }}
        meta={{ text: t('meta') }}
        tagline={ns === 'home' ? (t.raw('tagline') as string[]) : undefined}
        googleReviews={ns === 'home' ? t('googleReviews') : undefined}
        taxCredit={ns === 'home' ? t('taxCredit') : undefined}
        creditNote={
          ns === 'home'
            ? {
                note: t.raw('creditNote') as CreditNoteTexts,
                dialog: t.raw('creditDialog') as CreditDialogTexts,
              }
            : undefined
        }
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
      <AboutSection ns={ns} />
      <ExperiencesSection ns={ns} tone="cream" />
      <ChefSection ns={ns} />
      <EventsSection ns={ns} />
      {zn && zc && (
        <Zones
          tone="white"
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
      
    </>
  )
}
