import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { getPage } from '@/lib/content/pages'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

const servicesLinks = [
  ['weekly', '/services'],
  ['family', '/services'],
  ['events', '/formule-evenement'],
  ['gift', '/contact'],
  ['menus', '/services'],
] as const
const companyLinks = [
  ['about', '/a-propos'],
  ['team', '/equipe'],
  ['portfolio', '/realisations'],
  ['journal', '/blog'],
  ['faq', '/faq'],
] as const

// Titres de colonne : 20 px en dessous de 1025 px (h4 du thème), 12 px au-dessus.
const heading =
  'text-xl leading-6 font-bold tracking-[2px] text-cream/52 uppercase lg:text-xs lg:leading-3'
// Liens des colonnes (`footer .menu .menu-item a` du thème) : transition 250 ms ease.
const link = 'hover:text-sage transition-colors duration-[250ms] ease-[ease]'
const col =
  'flex flex-col gap-[42px] border-b border-cream/10 py-8 md:px-6 md:py-10 lg:border-b-0 lg:px-8 lg:py-14'

export async function SiteFooter() {
  const t = await getTranslations('footer')

  return (
    <footer className="bg-footer text-cream">
      {/* Bandeau d'appel à l'action */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#2f5e4a_0%,#1a382c_100%)] px-4 py-14 md:px-7 md:py-[72px] lg:px-10 lg:py-24">
        {/* Rayures (masquées à gauche) et halo, comme dans la démo */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,rgb(255_255_255/0.06)_0_1px,transparent_1px_14px)] [mask-image:linear-gradient(90deg,transparent_0%,#000_55%,#000_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_50%,rgb(255_255_255/0.14)_0%,transparent_45%)]"
        />
        <div className="max-w-site relative mx-auto flex flex-col gap-[34px] lg:flex-row lg:items-center lg:justify-between lg:gap-0">
          <div className="flex max-w-[768px] flex-col gap-[18px] p-[10px]">
            <p className="text-sage-soft text-xs leading-3 font-bold tracking-[2.4px] uppercase">
              {t('eyebrow')}
            </p>
            <h2 className="font-display text-[45px] leading-[56px] font-semibold tracking-[-0.03em] text-white lg:text-[68px] lg:leading-[68px]">
              {t('title')}
            </h2>
            <p className="mb-4 text-base leading-[27.2px] text-white/78">{t('text')}</p>
          </div>
          <div className="flex flex-wrap items-center gap-[14px] p-[10px] lg:justify-end">
            <ButtonLink href="/contact" variant="light">
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
      <section className="border-cream/10 border-b px-4 md:px-7 lg:px-10">
        <div className="max-w-site mx-auto grid grid-cols-2 lg:grid-cols-[409px_225px_224px_462px]">
          <div className={cn(col, 'col-span-2 gap-5 lg:col-span-1 lg:border-r lg:pr-8 lg:pl-0')}>
            <div className="h-[65px]">
              <Logo className="text-cream" />
            </div>
            <p className="text-cream/66 mb-4 max-w-[376px] text-base leading-[25.5px] md:max-w-none lg:max-w-[376px]">
              {t('about')}
            </p>
            <ul className="mt-[14px] flex gap-2" aria-label={t('social')}>
              {site.social.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    aria-label={s.name}
                    className="border-cream/10 text-cream/88 hover:border-sage hover:text-sage flex h-[43.5px] w-11 items-center justify-center rounded-full border transition-colors duration-300 ease-[ease]"
                  >
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
            className="pr-3 md:pr-6"
          />
          <FooterList
            title={t('company')}
            links={companyLinks}
            ns="companyLinks"
            className="lg:border-r"
          />
          <div className={cn(col, 'col-span-2 border-b-0 md:col-span-1')}>
            <h2 className={heading}>{t('visit')}</h2>
            <ul className="text-cream/88 flex flex-col gap-2 text-[15px] leading-[22.5px] font-medium">
              <li className="flex items-center gap-5 pb-2">
                <MapPin size={14} fill="currentColor" className="text-sage shrink-0" aria-hidden />
                {site.address}
              </li>
              <li className="flex items-center gap-5 pb-2">
                <Phone size={14} fill="currentColor" className="text-sage shrink-0" aria-hidden />
                <a href={site.phoneHref}>{site.phone}</a>
              </li>
              <li className="flex items-center gap-5 pb-2">
                <Mail size={14} fill="currentColor" className="text-sage shrink-0" aria-hidden />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li className="flex items-center gap-5">
                <Clock size={14} fill="currentColor" className="text-sage shrink-0" aria-hidden />
                {site.hours}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Filigrane : le nom en contour, rogné par le bas */}
      <div
        aria-hidden
        data-vr-mask
        className="h-[82.5px] overflow-hidden pt-7 text-center md:h-[159.7px] md:pt-12 lg:h-[257.4px]"
      >
        <span className="font-display text-[86.25px] leading-[67.275px] font-bold tracking-[-0.04em] text-transparent [-webkit-text-stroke:2px_rgb(169_196_162/0.55)] md:text-[176.64px] md:leading-[137.78px] lg:text-[331.2px] lg:leading-[258.336px]">
          {site.name}
        </span>
      </div>

      {/* Ligne basse */}
      <div className="px-4 pt-6 pb-[29px] text-[13px] leading-[13px] font-medium md:flex md:h-[68.5px] md:items-center md:px-7 md:py-0 lg:h-[73px] lg:px-10">
        <div className="max-w-site mx-auto flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-cream/52 tracking-[0.2px]">{t('rights', { name: site.name })}</p>
          <ul className="text-cream/52 flex flex-wrap items-center gap-x-7">
            {(
              [
                ['conditions', 'terms'],
                ['offrir', 'gift'],
              ] as const
            ).map(
              ([slug, key]) =>
                getPage(slug) && (
                  <li key={slug}>
                    <Link
                      href={`/${slug}`}
                      className="hover:text-sage leading-[19.5px] transition-colors duration-300 ease-[ease]"
                    >
                      {t(`legal.${key}`)}
                    </Link>
                  </li>
                ),
            )}
            <li>
              <Link
                href="/contact"
                className="hover:text-sage leading-[19.5px] transition-colors duration-300 ease-[ease]"
              >
                {t('legal.contact')}
              </Link>
            </li>
          </ul>
          <p className="text-sage tracking-[0.2px]">{t('crafted')}</p>
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
    <div className={cn(col, className)}>
      <h2 className={heading}>{title}</h2>
      <ul className="text-cream/88 flex flex-col gap-[7px] text-base leading-6 font-medium">
        {links.map(([key, href]) => (
          <li key={key} className="pb-[7px] last:pb-0">
            <Link href={href} className={link}>
              {t(`${ns}.${key}`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
