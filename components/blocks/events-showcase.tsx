import { DualHeader } from '@/components/layout/dual-header'
import { ArrowScroller } from '@/components/ui/arrow-scroller'
import { RecipeCard, type RecipeCardData } from '@/components/ui/recipe-card'
import { RecipeMoreGroup } from '@/components/ui/recipe-more'
import { CtaButton } from '@/components/blocks/cta-button'
import styles from './events-showcase.module.css'

type EventsShowcaseProps = {
  kicker: string
  title: string
  highlight: string
  description: string
  recipes: RecipeCardData[]
  carouselLabels: { prev: string; next: string; navigation: string }
  /** Bouton vers toutes les recettes, sous le carrousel. */
  cta?: { label: string; href: string }
}

// Recettes de l'accueil : titre et carrousel.
export function EventsShowcase({
  kicker,
  title,
  highlight,
  description,
  recipes,
  carouselLabels,
  cta,
}: EventsShowcaseProps) {
  return (
    <section data-section="events" className={styles.root}>
      <div className={styles.spacer} aria-hidden />
      <DualHeader
        kicker={kicker}
        title={title}
        highlight={highlight}
        description={description}
        className={styles.header}
      />
      <div className={styles.carousel}>
        <RecipeMoreGroup>
          <ArrowScroller
            label={carouselLabels.navigation}
            prev={carouselLabels.prev}
            next={carouselLabels.next}
          >
            {recipes.map((r) => (
              <RecipeCard key={r.title} recipe={r} />
            ))}
          </ArrowScroller>
        </RecipeMoreGroup>
      </div>
      {cta && (
        <div className={styles.cta}>
          <CtaButton href={cta.href} label={cta.label} />
        </div>
      )}
      <div className={styles.spacer} aria-hidden />
    </section>
  )
}
