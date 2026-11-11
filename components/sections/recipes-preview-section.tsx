import { CtaButton } from '@/components/blocks/cta-button'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { ArrowScroller } from '@/components/ui/arrow-scroller'
import { recipes } from '@/lib/recipes'
import { RecipeCard } from '@/components/ui/recipe-card'
import { media } from '@/lib/media'
import own from './recipes-preview-section.module.css'

type RecipesPreviewSectionProps = {
  kicker: string
  title: string
  intro: string
  cta: { label: string; href: string }
  /** Libellés accessibles des flèches. */
  arrows: { prev: string; next: string }
  tone?: 'white' | 'beige'
}

// Recettes (lib/recipes.ts) en défilement horizontal à flèches, avec un bouton vers la page Recettes ; même rendu que les plats signature.
export function RecipesPreviewSection({
  kicker,
  title,
  intro,
  cta,
  arrows,
  tone,
}: RecipesPreviewSectionProps) {
  const dishes = recipes.map((r, i) => ({ ...r, image: media.events[i % media.events.length] }))
  if (dishes.length === 0) return null
  return (
    <Section name="recipes" tone={tone}>
      <SectionHeading kicker={kicker} title={title} intro={intro} />
      <ArrowScroller label={title} prev={arrows.prev} next={arrows.next}>
        {dishes.map((d) => (
          <RecipeCard key={d.title} recipe={d} />
        ))}
      </ArrowScroller>
      <div className={own.more}>
        <CtaButton href={cta.href} label={cta.label} />
      </div>
    </Section>
  )
}
