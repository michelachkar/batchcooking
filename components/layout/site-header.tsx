import { getTranslations } from '@/lib/i18n'
import Link from 'next/link'
import clsx from 'clsx'
import { ArrowUpRight, Leaf, Mail, MapPin, Phone, Search } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { SubmenuLink } from '@/components/layout/submenu-link'
import { HeaderShrink } from '@/components/layout/header-shrink'
import { MobileMenu } from '@/components/layout/mobile-menu'
import Image from 'next/image'
import { media } from '@/lib/media'
import { nav } from '@/lib/nav'
import { site } from '@/lib/site'
import styles from './site-header.module.css'

export async function SiteHeader() {
  const t = await getTranslations()
  const items = nav.map((item) => ({
    key: item.key,
    label: t(`nav.${item.key}`),
    href: item.href,
    children: item.children?.map((c) => ({
      label: t(`nav.${c.key}`),
      href: c.href,
      mega: c.mega,
      key: c.key,
    })),
  }))

  return (
    <header id="site-header" className={styles.root}>
      <HeaderShrink />
      <a href="#contenu" className={styles.skip}>
        {t('site.skip')}
      </a>

      {/* Desktop ≥ 1025 px : barre d'annonce + barre principale */}
      <div className={styles.desktop}>
        <div className={styles.topbar}>
          <div className={styles.topbarInner}>
            <div className={styles.announce}>
              <Leaf size={12} fill="currentColor" className={styles.topIcon} aria-hidden />
              <ul className={styles.announceList}>
                {(t.raw('header.announce') as { label: string; href: string }[]).map((a) => (
                  <li key={a.href}>
                    <Link href={a.href} className={styles.announceLink}>
                      {a.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <ul className={styles.topList}>
              <li>
                <Link href="/zones" className={styles.topLink}>
                  <MapPin size={12} fill="currentColor" className={styles.topIcon} aria-hidden />
                  {site.area}
                </Link>
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
                    {item.children && item.children.some((c) => c.mega) ? (
                      <div
                        className={clsx(
                          styles.submenu,
                          styles.mega,
                          item.children.filter((c) => c.mega).length === 2 && styles.megaTwo,
                        )}
                      >
                        <p className={styles.megaEyebrow}>
                          {t(`megaMenu.heads.${item.key}.eyebrow`)}
                        </p>
                        <ul className={styles.megaGrid}>
                          {item.children
                            .filter((c) => c.mega)
                            .map((child) => (
                              <li key={child.key}>
                                <SubmenuLink href={child.href} className={styles.megaCard}>
                                  <span className={styles.megaMedia}>
                                    <Image
                                      src={media.navMega[child.key].src}
                                      width={media.navMega[child.key].width}
                                      height={media.navMega[child.key].height}
                                      alt={t(`megaMenu.${child.key}.alt`)}
                                      sizes="220px"
                                      className={styles.megaImg}
                                    />
                                    <span className={styles.megaTag}>
                                      {t(`megaMenu.${child.key}.tag`)}
                                    </span>
                                  </span>
                                  <span className={styles.megaTitle}>
                                    {child.label}
                                    <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden />
                                  </span>
                                  <span className={styles.megaText}>
                                    {t(`megaMenu.${child.key}.text`)}
                                  </span>
                                </SubmenuLink>
                              </li>
                            ))}
                        </ul>
                        <div className={styles.megaFooter}>
                          {item.children
                            .filter((c) => !c.mega)
                            .map((child) => (
                              <SubmenuLink
                                key={child.key}
                                href={child.href}
                                className={styles.megaZones}
                              >
                                <MapPin size={15} aria-hidden />
                                <strong>{child.label}</strong>
                                <span>{t('megaMenu.zonesText')}</span>
                              </SubmenuLink>
                            ))}
                          <SubmenuLink href={item.href} className={styles.megaAll}>
                            {t(`megaMenu.heads.${item.key}.all`)}
                            <ArrowUpRight size={15} strokeWidth={2.5} aria-hidden />
                          </SubmenuLink>
                        </div>
                      </div>
                    ) : (
                      item.children && (
                        <ul className={styles.submenu}>
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <SubmenuLink href={child.href} className={styles.submenuLink}>
                                {child.label}
                              </SubmenuLink>
                            </li>
                          ))}
                        </ul>
                      )
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className={styles.actions}>
              <Link href="/recherche" aria-label={t('header.search')} className={styles.searchLink}>
                <Search size={17} strokeWidth={4} aria-hidden />
              </Link>
              <ButtonLink href="/contact#devis" className={styles.headerCta}>
                {t('header.cta')}
                <span className={styles.ctaArrow}>
                  <ArrowUpRight size={17} strokeWidth={3} aria-hidden />
                </span>
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      {/* Tablette et mobile ≤ 1024 px. */}
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
