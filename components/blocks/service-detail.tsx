import { ArrowRight, Award, CircleCheck, Clock, PackageOpen, Star } from 'lucide-react'
import Link from 'next/link'
import clsx from 'clsx'
import { CptAnim } from '@/components/blocks/cpt-anim'
import { FaqAccordion } from '@/components/blocks/faq-accordion'
import styles from './service-detail.module.css'

type Props = {
  /** Corps MDX déjà rendu. */
  children: React.ReactNode
  included: string[]
  benefits: string[]
  faq: { question: string; answer: string }[]
  price?: string
  turnaround?: string
  labels: {
    included: string
    benefits: string
    faq: string
    price: string
    turnaround: string
    cta: string
    categories: string
  }
  cta: { href: string }
  categories: { name: string; href: string }[]
}

// Page d'un service : texte, deux encadrés (inclus / atouts), questions fréquentes, colonne latérale (prix, catégories).
export function ServiceDetail({
  children,
  included,
  benefits,
  faq,
  price,
  turnaround,
  labels,
  cta,
  categories,
}: Props) {
  return (
    <div className={styles.root}>
      <div className="container-x">
        <CptAnim />
        <div className={styles.row}>
          <div className={styles.main}>
            <div data-cm-section="fade-up" className={styles.body}>
              {children}
            </div>
            {(included.length > 0 || benefits.length > 0) && (
              <div
                data-cm-section="fade-up"
                data-cm-children
                data-cm-stagger="0.15"
                className={styles.panels}
              >
                {[
                  {
                    title: labels.included,
                    items: included,
                    Icon: PackageOpen,
                    Bullet: CircleCheck,
                  },
                  { title: labels.benefits, items: benefits, Icon: Award, Bullet: Star },
                ].map(
                  ({ title, items, Icon, Bullet }) =>
                    items.length > 0 && (
                      <div key={title} data-cm-child className={clsx(styles.card, styles.panel)}>
                        <div className={styles.panelHeader}>
                          <span className={styles.panelIcon}>
                            <Icon className={styles.panelIconGlyph} aria-hidden />
                          </span>
                          <h2 className={styles.panelTitle}>{title}</h2>
                        </div>
                        <ul className={styles.panelList}>
                          {items.map((it) => (
                            <li key={it} className={styles.panelItem}>
                              <Bullet
                                className={clsx(
                                  styles.bullet,
                                  Bullet === Star && styles.bulletStar,
                                )}
                                aria-hidden
                              />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ),
                )}
              </div>
            )}
            {faq.length > 0 && (
              <div data-cm-section="fade-up" className={styles.faq}>
                <h2 className={styles.faqTitle}>{labels.faq}</h2>
                <FaqAccordion items={faq} name="service-faq" />
              </div>
            )}
          </div>
          <div className={styles.sidebar}>
            <aside
              data-cm-section="fade-left"
              data-cm-children
              data-cm-stagger="0.12"
              className={styles.aside}
            >
              {(price || turnaround) && (
                <div data-cm-child className={clsx(styles.card, styles.priceCard)}>
                  {price && (
                    <div className={styles.priceBlock}>
                      <span className={styles.priceLabel}>{labels.price}</span>
                      <span className={styles.priceValue}>{price}</span>
                    </div>
                  )}
                  {turnaround && (
                    <div className={styles.turnaround}>
                      <span className={styles.turnaroundLabel}>
                        <Clock className={styles.clock} aria-hidden />
                        {labels.turnaround}
                      </span>
                      <span className={styles.turnaroundValue}>{turnaround}</span>
                    </div>
                  )}
                  <Link href={cta.href} className={styles.cta}>
                    {labels.cta}
                    <ArrowRight className={styles.ctaIcon} aria-hidden />
                  </Link>
                </div>
              )}
              {categories.length > 0 && (
                <div data-cm-child className={clsx(styles.card, styles.categoriesCard)}>
                  <h3 className={styles.categoriesTitle}>{labels.categories}</h3>
                  <ul className={styles.categoriesList}>
                    {categories.map((c) => (
                      <li key={c.name}>
                        <Link href={c.href} className={styles.category}>
                          {c.name}
                          <ArrowRight className={styles.categoryArrow} aria-hidden />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
