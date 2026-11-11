import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import { PageHead } from '@/components/layout/page-head'
import { ChefSection } from '@/components/sections/chef-section'
import { RecipesPreviewSection } from '@/components/sections/recipes-preview-section'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { media } from '@/lib/media'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const p = await getTranslations('pages')
  const s = await getTranslations('seo')
  return pageMetadata({ title: p('about.title'), description: s('about'), path: '/a-propos' })
}

// Page « À propos » : présentation de la cheffe (messages home.chef).
export default async function AboutPage() {
  const p = await getTranslations('pages')
  const s = await getTranslations('seo')
  const r = await getTranslations('signature')
  return (
    <main id="contenu">
      <noscript>
        <style>{'[data-reveal]{opacity:1!important}'}</style>
      </noscript>
      <PageJsonLd
        path="/a-propos"
        title={p('about.title')}
        description={s('about')}
        crumbs={[{ label: p('about.crumb') }]}
      />
      <PageHead
        title={p('about.title')}
        crumbs={[{ label: p('home'), href: '/' }, { label: p('about.crumb') }]}
        navLabel={p('navLabel')}
        background={media.heads.page}
        description={p('heads.about')}
      />
      <ChefSection />
      <RecipesPreviewSection
        tone="beige"
        kicker={r('kicker')}
        title={r('title')}
        intro={r('intro')}
        cta={{ label: r('cta'), href: '/recettes' }}
        arrows={{ prev: r('prev'), next: r('next') }}
      />
    </main>
  )
}
