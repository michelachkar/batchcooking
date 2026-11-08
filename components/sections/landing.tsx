import { ExperiencesSection } from '@/components/sections/experiences-section'
import { AboutSection } from '@/components/sections/about-section'
import { ChefSection } from '@/components/sections/chef-section'
import { Zones } from '@/components/blocks/home-v2'
import { EventsSection } from '@/components/sections/events-section'
import { Hero } from '@/components/blocks/hero'
import type { CreditDialogTexts, CreditNoteTexts } from '@/components/blocks/credit-note'
import { MealPlanInquiry } from '@/components/blocks/meal-plan-inquiry'
import { getTranslations } from '@/lib/i18n'
import { media } from '@/lib/media'

// Page d'accueil (messages `home.*` et photos de lib/media.ts).
export async function Landing() {
  const t = await getTranslations('home.hero')
  const q = await getTranslations('home.inquiry')
  const zn = await getTranslations('homeV2.zones')
  const zc = await getTranslations('zonesPage.cities')
  return (
    <>
      <Hero
        headline={t('headline')}
        accent={t('accent')}
        description={t('description')}
        gallery={media.heroGallery.map((img, i) => ({ ...img, alt: t(`galleryAlts.${i}`) }))}
        primary={{ label: t('primary'), href: '/contact', lead: true }}
        secondary={{ label: t('secondary'), href: '/recettes' }}
        tagline={t.raw('tagline') as string[]}
        taxCredit={t('taxCredit')}
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
      <ExperiencesSection tone="cream" />
      <ChefSection />
      <EventsSection />
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
    </>
  )
}
