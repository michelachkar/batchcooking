import Link from 'next/link'
import { getTranslations } from '@/lib/i18n'
import { PageHead } from '@/components/layout/page-head'
import { media } from '@/lib/media'
import clsx from 'clsx'
import styles from './not-found.module.css'

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
      <div data-section="body" className={styles.body}>
        <div className={clsx('container-x', styles.container)}>
          <section className={styles.section}>
            <div className={styles.content}>
              <h1 className={styles.code}>{t('code')}</h1>
              <h2 className={styles.title}>{t('title')}</h2>
              <p className={styles.text}>{t('text')}</p>
              <Link href="/" className={styles.back}>
                {t('back')}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
