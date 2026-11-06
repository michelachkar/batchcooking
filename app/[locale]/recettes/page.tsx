import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PageHead } from '@/components/blocks/page-head'
import { RecipeBrowser, type RecipeCard } from '@/components/blocks/recipe-browser'
import { recipes } from '@/lib/recipes'
import { ArrowIcon } from '@/components/ui/icon'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { media } from '@/lib/media'
import { pageMetadata } from '@/lib/seo'

const TITLE = 'Mes recettes'
const DESCRIPTION =
  'Mes recettes préférées : des plats faits maison, simples à refaire, qui se conservent et se réchauffent facilement.'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/recettes' })
}

// Toutes les recettes, avec de quoi choisir (saveurs, ingrédients clés, régimes, allergènes, conservation) et des filtres.
export default async function RecipesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
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
      <section data-section="recipes" className="bg-white px-10 max-lg:px-[26px] max-md:px-4">
        <div className="max-w-site mx-auto py-[80px] max-md:py-12">
          <p className="mb-10 max-w-[40rem] text-[17px] leading-[1.65] text-[rgba(85,80,68,0.88)]">
            {ev('description')}
          </p>
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
          <div className="mt-14 flex flex-col items-center gap-4 rounded-[18px] bg-[rgba(240,235,227,1)] px-6 py-10 text-center">
            <p className="font-display text-[26px] leading-[1.2] font-semibold text-[rgba(85,80,68,1)]">
              {ev('proofLong')}
            </p>
            <Link
              href="/contact#inquiry"
              className="rounded-pill inline-flex items-center gap-3 bg-[#B04A2A] px-[30px] py-[16px] text-base leading-none font-semibold text-white hover:bg-[#8F3B20]"
            >
              Demander un devis
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
