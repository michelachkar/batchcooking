import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from '@/lib/i18n'
import { PageHead } from '@/components/layout/page-head'
import { RecipeBrowser } from '@/components/blocks/recipe-browser'
import type { RecipeCardData } from '@/components/ui/recipe-card'
import { isRecipePack, recipes } from '@/lib/recipes'
import { ArrowIcon } from '@/components/ui/icon'
import { FaqSection } from '@/components/sections/faq-section'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { faqPage } from '@/lib/jsonld'
import { media } from '@/lib/media'
import { pageMetadata } from '@/lib/seo'
import styles from './page.module.css'

const TITLE = 'Mes recettes'
const DESCRIPTION =
  'Mes recettes préférées : des plats faits maison, simples à refaire, qui se conservent et se réchauffent facilement.'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/recettes' })
}

// Toutes les recettes, avec de quoi choisir (saveurs, ingrédients clés, régimes, allergènes, conservation) et des filtres.
export default async function RecipesPage({
  searchParams,
}: {
  searchParams: Promise<{ formule?: string | string[] }>
}) {
  const { formule } = await searchParams
  const pack = isRecipePack(formule) ? formule : undefined
  const p = await getTranslations('pages')
  const ev = await getTranslations('home.events')
  const r = await getTranslations('recipesPage')
  const faqItems = r.raw('faq.items') as { question: string; answer: string }[]
  const cards: RecipeCardData[] = recipes.map((x, i) => ({
    ...x,
    image: media.events[i % media.events.length],
  }))
  return (
    <main id="contenu">
      <PageJsonLd
        path="/recettes"
        title={TITLE}
        description={DESCRIPTION}
        crumbs={[{ label: TITLE }]}
        extra={[faqPage(faqItems)]}
      />
      <PageHead
        title={TITLE}
        crumbs={[{ label: p('home'), href: '/' }, { label: TITLE }]}
        navLabel={p('navLabel')}
        background={media.heads.recipes}
        description={p('heads.recipes')}
        shortDescription={p('headsShort.recipes')}
      />
      <section data-section="recipes" className={styles.section}>
        <div className={styles.inner}>
          <p className={styles.intro}>{ev('description')}</p>
          <RecipeBrowser
            key={pack ?? 'all'}
            recipes={cards}
            initialPacks={pack ? [pack] : []}
            text={{
              type: r('filters.type'),
              diet: r('filters.diet'),
              allergen: r('filters.allergen'),
              all: r('filters.all'),
              count: r.raw('count') as string,
              empty: r('empty'),
              reset: r('reset'),
              allergenFree: r.raw('allergenFree') as string,
              allergenNone: r('allergenNone'),
              spice: r('spice'),
              budget: r('budget'),
              pack: r('filters.pack'),
            }}
          />
          <div className={styles.cta}>
            <Link href="/contact#inquiry" className={styles.ctaLink}>
              Demander un devis
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
      <FaqSection
        name="recettes-faq"
        tone="beige"
        kicker={r('faq.kicker')}
        title={r('faq.title')}
        items={faqItems}
      />
    </main>
  )
}
