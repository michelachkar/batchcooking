import { Check, Clock, GraduationCap, Users } from 'lucide-react'
import clsx from 'clsx'
import { Cta, Heading, Shell } from '@/components/blocks/home-v2'
import styles from './package-cards.module.css'

export type Package = {
  emoji: string
  title: string
  subtitle: string
  text: string
  duration: string
  group: string
  level: string
  price: string
  priceNote: string
  menu: string[]
  included: string[]
  ideal: string
  /** Prix ferme : n'affiche pas « À partir de ». */
  fixed?: boolean
  /** Valeur de la formule dans le formulaire de devis. */
  value: string
}

// Cartes de formules (cours, formules du chef privé…) : durée, participants, menu, inclus, prix, pour décider sans appeler.
// Le bouton ouvre le formulaire de devis du service, avec la formule déjà choisie (data-quote-choice).
export function PackageCards(p: {
  name: string
  /** Fond de la section (beige par défaut). */
  tone?: 'white' | 'beige' | 'terracotta'
  /** Masque kicker, titre et introduction (un titre de catégorie précède déjà le bloc). */
  hideHeader?: boolean
  /** 4 : une ligne de quatre cartes sur grand écran (contenu empilé) ; 2 par défaut. */
  columns?: 2 | 3 | 4
  kicker: string
  title: string
  intro: string
  labels: Record<'duration' | 'group' | 'level' | 'menu' | 'included' | 'ideal' | 'from', string>
  items: Package[]
  cta: { label: string; href: string }
}) {
  const four = (p.columns ?? 2) >= 3
  const dark = p.tone === 'terracotta'
  const facts = (c: Package) =>
    [
      { Icon: Clock, label: p.labels.duration, value: c.duration },
      { Icon: Users, label: p.labels.group, value: c.group },
      { Icon: GraduationCap, label: p.labels.level, value: c.level },
    ] as const
  return (
    <Shell name={p.name} tone={p.tone ?? 'beige'}>
      {!p.hideHeader && <Heading kicker={p.kicker} title={p.title} intro={p.intro} light={dark} />}
      <ul
        className={clsx(
          styles.list,
          p.hideHeader && styles.noHeader,
          p.columns === 3 ? styles.cols3 : four ? styles.cols4 : styles.cols2,
        )}
      >
        {p.items.map((c, i) => (
          <li
            key={c.title}
            data-reveal="up"
            data-d={Math.min(i + 1, 6)}
            className={clsx(
              styles.card,
              dark ? styles.cardDark : styles.cardLight,
              four && styles.cardCompact,
            )}
          >
            <div className={styles.header}>
              <span aria-hidden className={styles.emoji}>
                {c.emoji}
              </span>
              <div>
                <h3 className={styles.title}>{c.title}</h3>
                <p className={styles.subtitle}>{c.subtitle}</p>
              </div>
            </div>
            <p className={styles.text}>{c.text}</p>
            <dl className={clsx(styles.facts, four && styles.factsStacked)}>
              {facts(c).map(({ Icon, label, value }) => (
                <div key={label} className={styles.fact}>
                  <Icon aria-hidden className={styles.factIcon} />
                  <div>
                    <dt className={styles.label}>{label}</dt>
                    <dd className={styles.factValue}>{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className={clsx(styles.details, four && styles.detailsStacked)}>
              <div>
                <h4 className={styles.blockTitle}>{p.labels.menu}</h4>
                <ul className={styles.bullets}>
                  {c.menu.map((m) => (
                    <li key={m} className={styles.menuItem}>
                      · {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className={styles.blockTitle}>{p.labels.included}</h4>
                <ul className={styles.bullets}>
                  {c.included.map((m) => (
                    <li key={m} className={styles.includedItem}>
                      <Check aria-hidden className={styles.check} strokeWidth={3} />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className={styles.ideal}>
              <strong className={styles.idealLabel}>{p.labels.ideal} :</strong> {c.ideal}
            </p>
            <div className={styles.footer}>
              <p className={styles.priceBlock}>
                {!c.fixed && <span className={styles.from}>{p.labels.from}</span>}
                <strong className={styles.price}>
                  {c.price} <span className={styles.priceNote}>{c.priceNote}</span>
                </strong>
              </p>
              <Cta href={p.cta.href} label={p.cta.label} attrs={{ 'data-quote-choice': c.value }} />
            </div>
          </li>
        ))}
      </ul>
    </Shell>
  )
}
