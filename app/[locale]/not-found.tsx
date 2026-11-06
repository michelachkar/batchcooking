import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { PageHead } from '@/components/blocks/page-head'
import { media } from '@/lib/media'

// Page 404 : bandeau, grand « 404 », message et retour à l'accueil.
export default async function NotFound() {
  const p = await getTranslations('pages')
  const t = await getTranslations('notFound')
  return (
    <main id="contenu">
      <PageHead
        title={p('notFound.title')}
        crumbs={[{ label: p('home'), href: '/' }, { label: p('notFound.crumb') }]}
        navLabel={p('navLabel')}
        background={media.heads.notFound}
        bare
        inset
      />
      <div data-section="body" className="bg-cream min-h-[648px] leading-normal">
        <div className="container-x px-[15px] py-20">
          <section className="mb-10">
            <div className="mx-[10%] text-center">
              <h1 className="font-display m-0 text-[150px] leading-[180px] font-semibold tracking-[-3px] text-[#242424] max-lg:text-[90px] max-lg:leading-[110px] max-lg:tracking-[-1.8px] max-md:text-[66px] max-md:leading-[85px] max-md:tracking-[-1.32px]">
                {t('code')}
              </h1>
              <h2 className="font-display m-0 mb-2 text-[70px] leading-[70px] font-semibold tracking-[-1.4px] text-[#242424] max-lg:text-[45px] max-lg:leading-[56px] max-lg:tracking-[-0.9px]">
                {t('title')}
              </h2>
              <p className="mt-0 mb-4">{t('text')}</p>
              <Link
                href="/"
                className="mt-5 inline-block rounded-full bg-[#B04A2A] px-8 py-[18px] leading-4 font-medium tracking-[0.5px] text-[#FAF7F2] capitalize transition-colors duration-[250ms] ease-[ease] hover:bg-[#302925]"
              >
                {t('back')}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
