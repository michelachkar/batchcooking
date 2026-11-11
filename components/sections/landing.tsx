import { ExperiencesSection } from '@/components/sections/experiences-section'
import { AboutSection } from '@/components/sections/about-section'
import { ZonesSection } from '@/components/sections/zones-section'
import { EventsSection } from '@/components/sections/events-section'
import { ReviewsSection } from '@/components/sections/reviews-section'
import { HomeFaqSection } from '@/components/sections/home-faq-section'
import { RealisationsPreviewSection } from '@/components/sections/realisations-preview-section'
import { HomeAreasSection } from '@/components/sections/home-areas-section'
import { Hero } from '@/components/blocks/hero'
import type { CreditDialogTexts, CreditNoteTexts } from '@/components/blocks/credit-note'
import { MealPlanInquiry } from '@/components/features/lead/meal-plan-inquiry'
import { getTranslations } from '@/lib/i18n'
import { media } from '@/lib/media'

// Page d'accueil (messages `home.*` et photos de lib/media.ts).
export async function Landing() {
  const t = await getTranslations('home.hero')
  const q = await getTranslations('home.inquiry')
  const zc = await getTranslations('zonesPage.cities')
  return (
    <>
      <Hero
        headline={t('headline')}
        accent={t('accent')}
        description={t('description')}
        gallery={media.heroGallery.map((img, i) => ({
          ...img,
          alt: t(`galleryAlts.${i}`),
          badge: t(`galleryBadges.${i}`),
        }))}
        primary={{ label: t('primary'), href: '/contact', lead: true }}
        secondary={{ label: t('secondary'), href: '/recettes' }}
        googleReviews={t('googleReviews')}
        taxCredit={t('taxCredit')}
        zone={{ text: t('zone.text'), label: t('zone.link'), href: '/zones' }}
        creditNote={{
          note: t.raw('creditNote') as CreditNoteTexts,
          dialog: t.raw('creditDialog') as CreditDialogTexts,
        }}
        image={{ ...media.hero, alt: t('imageAlt') }}
      />
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
      />
      <AboutSection />
      <EventsSection />
      <ExperiencesSection />
      <ReviewsSection />
      <HomeFaqSection />
      <RealisationsPreviewSection tone="beige" />
      <HomeAreasSection />
    </>
  )
}
