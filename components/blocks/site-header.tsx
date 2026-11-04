import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { ArrowUpRight, Leaf, Mail, MapPin, Phone, Search } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { MobileMenu } from '@/components/blocks/mobile-menu'
import { resolveNav } from '@/lib/nav'
import { vr } from '@/lib/flags'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

export async function SiteHeader() {
  const t = await getTranslations()
  const items = resolveNav().map((item) => ({
    label: t(`nav.${item.key}`),
    href: item.href,
    children: item.children?.map((c) => ({ label: t(`nav.${c.key}`), href: c.href })),
  }))

  // Build de test visuel : hauteurs fractionnaires de la démo (le logo y est une image), pour garder la même phase de rendu sur toute la page.
  return (
    <header
      id="site-header"
      className={cn('bg-cream relative z-40', vr && 'h-[71.81px] md:h-[147.81px] lg:h-[121.2px]')}
    >
      <a
        href="#contenu"
        className="focus:bg-ink sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-3 focus:text-white"
      >
        {t('site.skip')}
      </a>

      {/* Desktop ≥ 1025 px : barre d'annonce + barre principale */}
      <div className="hidden lg:block">
        <div className="bg-ink px-5 text-[13px] leading-[18px] font-medium">
          <div className="max-w-site mx-auto flex h-[38px] items-center justify-between">
            <p className="text-cream flex items-center gap-2">
              <Leaf size={12} fill="currentColor" className="text-sage" aria-hidden />
              {t('header.announce')}
            </p>
            <ul className="text-cream/80 flex items-center gap-7">
              <li className="flex items-center gap-2">
                <MapPin size={12} fill="currentColor" className="text-sage" aria-hidden />
                {site.area}
              </li>
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-[15px] transition-colors duration-300 ease-[ease] hover:text-white"
                >
                  <Phone size={12} fill="currentColor" className="text-sage" aria-hidden />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-[15px] transition-colors duration-300 ease-[ease] hover:text-white"
                >
                  <Mail size={12} fill="currentColor" className="text-sage" aria-hidden />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-sand bg-cream border-b px-5">
          <div className="max-w-site mx-auto flex h-[82px] items-center justify-between">
            <div className="w-[224px] shrink-0">
              <Logo />
            </div>
            <nav aria-label={t('header.mainNav')} className="flex flex-1 justify-center">
              <ul className="flex items-center gap-px">
                {items.map((item) => (
                  <li key={item.label} className="mtsh-item group relative">
                    <Link
                      href={item.href}
                      className="text-ink group-hover:text-forest group-focus-within:text-forest flex items-center px-[13px] py-[10px] text-base leading-6 font-medium transition-colors duration-300 ease-[ease]"
                    >
                      {item.label}
                      {item.children && (
                        <svg
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="ml-[4.66px]"
                          aria-hidden
                        >
                          <path d="M1 .75 5 4.75 9 .75" />
                        </svg>
                      )}
                    </Link>
                    {item.children && (
                      <ul className="mtsh-sub rounded-b-dropdown bg-menu shadow-dropdown absolute top-full left-0 z-10 w-[192px] py-[10px]">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              className="text-menu-link block px-5 py-[6px] text-[15px] leading-[22.5px] font-medium transition-colors duration-[250ms] ease-[ease] hover:text-black"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex w-[291px] shrink-0 items-center justify-end gap-[18px]">
              <Link
                href="/recherche"
                aria-label={t('header.search')}
                className="text-ink hover:text-forest inline-flex transition-[color,scale] duration-300 ease-[ease] hover:scale-110 motion-reduce:hover:scale-100"
              >
                <Search size={17} strokeWidth={4} aria-hidden />
              </Link>
              <ButtonLink href="/contact">
                {t('header.cta')}
                <span className="grid size-[22px] place-items-center">
                  <ArrowUpRight size={17} strokeWidth={3} aria-hidden />
                </span>
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      {/* Tablette et mobile ≤ 1024 px. Le logo est affiché très grand en tablette dans la démo : dimensions reprises. */}
      <div className="border-sand bg-cream flex items-center justify-between border-b py-3 pr-5 md:py-[14px] md:pr-[10px] lg:hidden">
        <div className="pl-[15px] md:p-[10px]">
          <Logo className="h-[47px] w-[172px] text-[40px] leading-[47px] md:h-[99px] md:w-[364px] md:text-[88px] md:leading-[99px]" />
        </div>
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
    </header>
  )
}
