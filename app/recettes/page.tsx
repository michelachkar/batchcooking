import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from '@/lib/i18n'
import { PageHead } from '@/components/blocks/page-head'
import { RecipeBrowser, type RecipeCard } from '@/components/blocks/recipe-browser'
import { recipes } from '@/lib/recipes'
import { ArrowIcon } from '@/components/ui/icon'
import { PageJsonLd } from '@/components/seo/page-json-ld'
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
export default async function RecipesPage() {
  const p = await getTranslations('pages')
  const ev = await getTranslations('home.events')
  const r = await getTranslations('recipesPage')
  const cards: RecipeCard[] = recipes.map((x, i) => ({
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
      />
      <PageHead
        title={TITLE}
        crumbs={[{ label: p('home'), href: '/' }, { label: TITLE }]}
        navLabel={p('navLabel')}
        background={media.heads.blog}
      />
      <section data-section="recipes" className={styles.section}>
        <div className={styles.inner}>
          <p className={styles.intro}>{ev('description')}</p>
          <RecipeBrowser
            recipes={cards}
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
              disclaimer: r('disclaimer'),
              spice: r('spice'),
              cost: r('cost'),
              budget: r('budget'),
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
    </main>
  )
}
