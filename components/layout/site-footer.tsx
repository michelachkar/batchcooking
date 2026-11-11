import { getTranslations } from '@/lib/i18n'
import Link from 'next/link'
import { ArrowRight, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { getPage } from '@/lib/content/pages'
import { site } from '@/lib/site'
import clsx from 'clsx'
import styles from './site-footer.module.css'

// Un libellé = une URL distincte, avec un intitulé descriptif (mêmes pages que le menu principal).
const servicesLinks = [
  ['batch', '/services/batch-cooking'],
  ['chef', '/services/chef-prive'],
  ['cours', '/services/cours-de-cuisine'],
  ['pricing', '/tarifs'],
  ['recipes', '/recettes'],
] as const
const companyLinks = [
  ['zones', '/zones'],
  ['inspirations', '/inspirations'],
  ['portfolio', '/realisations'],
  ['faq', '/faq'],
  ['contact', '/contact'],
] as const

export async function SiteFooter() {
  const t = await getTranslations('footer')

  return (
    <footer className={styles.root}>
      {/* Bandeau d'appel à l'action */}
      <section className={styles.cta}>
        {/* Rayures (masquées à gauche) et halo */}
        <div aria-hidden className={styles.stripes} />
        <div aria-hidden className={styles.halo} />
        <div className={styles.ctaInner}>
          <div className={styles.ctaText}>
            <p className={styles.eyebrow}>{t('eyebrow')}</p>
            <h2 className={styles.ctaTitle}>{t('title')}</h2>
            <p className={styles.ctaLead}>{t('text')}</p>
          </div>
          <div className={styles.ctaButtons}>
            <ButtonLink href="/contact#devis" variant="light">
              {t('ctaPrimary')}
              <ArrowRight size={15} strokeWidth={3.5} aria-hidden />
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="outline">
              {t('ctaCall', { phone: site.phone })}
              <ArrowRight size={15} strokeWidth={3.5} aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Colonnes */}
      <section className={styles.columns}>
        <div className={styles.grid}>
          <div className={clsx(styles.col, styles.colAbout)}>
            <div>
              <Logo className={styles.logo} tagline={t('tagline')} />
            </div>
            <p className={styles.about}>{t('about')}</p>
            <ul className={styles.social} aria-label={t('social')}>
              {site.social.map((s) => (
                <li key={s.name}>
                  <a href={s.href} aria-label={s.name} className={styles.socialLink}>
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden>
                      <path d={s.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <FooterList
            title={t('services')}
            links={servicesLinks}
            ns="servicesLinks"
            className={styles.colServices}
          />
          <FooterList
            title={t('company')}
            links={companyLinks}
            ns="companyLinks"
            className={styles.colCompany}
          />
          <div className={clsx(styles.col, styles.colVisit)}>
            <h2 className={styles.heading}>{t('visit')}</h2>
            <ul className={styles.visitList}>
              <li className={styles.visitItem}>
                <MapPin size={14} fill="currentColor" className={styles.visitIcon} aria-hidden />
                {site.address}
              </li>
              <li className={styles.visitItem}>
                <Phone size={14} fill="currentColor" className={styles.visitIcon} aria-hidden />
                <a href={site.phoneHref}>{site.phone}</a>
              </li>
              <li className={styles.visitItem}>
                <Mail size={14} fill="currentColor" className={styles.visitIcon} aria-hidden />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li className={styles.visitItem}>
                <Clock size={14} fill="currentColor" className={styles.visitIcon} aria-hidden />
                {site.hours}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Filigrane : le nom en contour, rogné par le bas */}
      <div aria-hidden className={styles.watermark}>
        <span className={styles.watermarkText}>{site.name}</span>
      </div>

      {/* Ligne basse */}
      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <p className={styles.rights}>{t('rights', { name: site.name })}</p>
          <ul className={styles.legal}>
            {(
              [
                ['mentions-legales', 'legalNotice'],
                ['confidentialite', 'privacy'],
                ['cgv', 'cgv'],
                ['conditions', 'terms'],
                ['offrir', 'gift'],
              ] as const
            ).map(
              ([slug, key]) =>
                getPage(slug) && (
                  <li key={slug}>
                    <Link href={`/${slug}`} className={styles.legalLink}>
                      {t(`legal.${key}`)}
                    </Link>
                  </li>
                ),
            )}
            <li>
              <Link href="/contact" className={styles.legalLink}>
                {t('legal.contact')}
              </Link>
            </li>
          </ul>
          <p className={styles.crafted}>{t('crafted')}</p>
        </div>
      </div>
    </footer>
  )
}

async function FooterList({
  title,
  links,
  ns,
  className,
}: {
  title: string
  links: readonly (readonly [string, string])[]
  ns: string
  className?: string
}) {
  const t = await getTranslations('footer')
  return (
    <div className={clsx(styles.col, className)}>
      <h2 className={styles.heading}>{title}</h2>
      <ul className={styles.linkList}>
        {links.map(([key, href]) => (
          <li key={key} className={styles.linkItem}>
            <Link href={href} className={styles.link}>
              {t(`${ns}.${key}`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
