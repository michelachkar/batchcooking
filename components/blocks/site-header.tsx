import { getTranslations } from '@/lib/i18n'
import Link from 'next/link'
import { ArrowUpRight, Leaf, Mail, MapPin, Phone, Search } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { SubmenuLink } from '@/components/blocks/submenu-link'
import { MobileMenu } from '@/components/blocks/mobile-menu'
import { resolveNav } from '@/lib/nav'
import { site } from '@/lib/site'
import styles from './site-header.module.css'

export async function SiteHeader() {
  const t = await getTranslations()
  const items = resolveNav().map((item) => ({
    label: t(`nav.${item.key}`),
    href: item.href,
    children: item.children?.map((c) => ({ label: t(`nav.${c.key}`), href: c.href })),
  }))

  // Build de test visuel : hauteurs fractionnaires de la démo (le logo y est une image), pour garder la même phase de rendu sur toute la page.
  return (
    <header id="site-header" className={styles.root}>
      <a href="#contenu" className={styles.skip}>
        {t('site.skip')}
      </a>

      {/* Desktop ≥ 1025 px : barre d'annonce + barre principale */}
      <div className={styles.desktop}>
        <div className={styles.topbar}>
          <div className={styles.topbarInner}>
            <p className={styles.announce}>
              <Leaf size={12} fill="currentColor" className={styles.topIcon} aria-hidden />
              {t('header.announce')}
            </p>
            <ul className={styles.topList}>
              <li className={styles.topItem}>
                <MapPin size={12} fill="currentColor" className={styles.topIcon} aria-hidden />
                {site.area}
              </li>
              <li>
                <a href={site.phoneHref} className={styles.topLink}>
                  <Phone size={12} fill="currentColor" className={styles.topIcon} aria-hidden />
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className={styles.topLink}>
                  <Mail size={12} fill="currentColor" className={styles.topIcon} aria-hidden />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.mainbar}>
          <div className={styles.mainbarInner}>
            <div className={styles.brand}>
              <Logo className={styles.brandLogo} tagline={t('footer.tagline')} />
            </div>
            <nav aria-label={t('header.mainNav')} className={styles.nav}>
              <ul className={styles.menu}>
                {items.map((item) => (
                  <li key={item.label} className={styles.menuItem}>
                    <Link href={item.href} className={styles.menuLink}>
                      {item.label}
                      {item.children && (
                        <svg
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className={styles.caret}
                          aria-hidden
                        >
                          <path d="M1 .75 5 4.75 9 .75" />
                        </svg>
                      )}
                    </Link>
                    {item.children && (
                      <ul className={styles.submenu}>
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <SubmenuLink href={child.href} className={styles.submenuLink}>
                              {child.label}
                            </SubmenuLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className={styles.actions}>
              <Link href="/recherche" aria-label={t('header.search')} className={styles.searchLink}>
                <Search size={17} strokeWidth={4} aria-hidden />
              </Link>
              <ButtonLink href="/contact#devis">
                {t('header.cta')}
                <span className={styles.ctaArrow}>
                  <ArrowUpRight size={17} strokeWidth={3} aria-hidden />
                </span>
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      {/* Tablette et mobile ≤ 1024 px. Le logo est affiché très grand en tablette dans la démo : dimensions reprises. */}
      <div className={styles.compact}>
        <div className={styles.compactBrand}>
          <Logo tagline={t('footer.tagline')} className={styles.compactLogo} />
        </div>
        <div className={styles.compactActions}>
          {/* CTA toujours visible dans le header collant, sans ouvrir le menu */}
          <ButtonLink href="/contact#devis" className={styles.compactCta}>
            <span className={styles.ctaFull}>{t('header.cta')}</span>
            <span className={styles.ctaShort}>{t('header.ctaShort')}</span>
          </ButtonLink>
          <MobileMenu
            items={items}
            brand={site.name}
            labels={{
              open: t('header.openMenu'),
              close: t('header.closeMenu'),
              toggle: t('header.toggleSub'),
            }}
          />
        </div>
      </div>
    </header>
  )
}
