import {
  Baby,
  Briefcase,
  Cake,
  CalendarHeart,
  ChefHat,
  Clock,
  Gift,
  Globe,
  GraduationCap,
  Heart,
  Leaf,
  Mail,
  PartyPopper,
  Refrigerator,
  ShoppingBasket,
  Ticket,
  User,
  UsersRound,
  Check,
  GlassWater,
  Home,
  ListChecks,
  Martini,
  Sparkles,
  Users,
  UtensilsCrossed,
  Wine,
  Wrench,
  Soup,
  type LucideIcon,
} from 'lucide-react'
import clsx from 'clsx'
import { Heading, Shell } from '@/components/blocks/home-v2'
import styles from './chef-page.module.css'

const ICONS: Record<string, LucideIcon> = {
  menu: UtensilsCrossed,
  tasting: Sparkles,
  buffet: Soup,
  cocktail: Martini,
  wine: Wine,
  list: ListChecks,
  sans: GlassWater,
  users: Users,
  tools: Wrench,
  home: Home,
  solo: User,
  couple: Heart,
  friends: UsersRound,
  kids: Baby,
  team: Briefcase,
  party: PartyPopper,
  bases: ChefHat,
  season: Leaf,
  pastry: Cake,
  world: Globe,
  batch: Refrigerator,
  level: GraduationCap,
  clock: Clock,
  basket: ShoppingBasket,
  gift: Gift,
  ticket: Ticket,
  mail: Mail,
}

type IconCard = { icon: string; title: string; text: string; tag?: string }

// Formules (menu sur mesure, dégustation, buffet, cocktail) et accords mets-vins : cartes à pictogramme.
export function FormulaCards(p: {
  name: string
  tone?: 'white' | 'beige' | 'terracotta'
  kicker: string
  title: string
  intro?: string
  items: IconCard[]
  columns?: 2 | 3 | 4
  /** Contenu sous les cartes (bouton, remarque…). */
  footer?: React.ReactNode
}) {
  return (
    <Shell name={p.name} tone={p.tone}>
      <Heading kicker={p.kicker} title={p.title} intro={p.intro} light={p.tone === 'terracotta'} />
      <ul className={clsx(styles.cards, p.columns === 3 ? styles.cols3 : styles.cols4)}>
        {p.items.map(({ icon, title, text, tag }, i) => {
          const Icon = ICONS[icon] ?? Check
          return (
            <li key={title} data-reveal="up" data-d={Math.min(i + 1, 6)} className={styles.card}>
              {tag && <span className={styles.tag}>{tag}</span>}
              <span className={styles.badge}>
                <Icon aria-hidden className={styles.glyph} strokeWidth={1.7} />
              </span>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardText}>{text}</p>
            </li>
          )
        })}
      </ul>
      {p.footer && (
        <div className={styles.footer} data-reveal="up">
          {p.footer}
        </div>
      )}
    </Shell>
  )
}

// Informations pratiques : invités, matériel, attentes envers l'hôte.
export function Practical(p: {
  tone?: 'white' | 'beige'
  /** Nombre de colonnes (3 par défaut). */
  columns?: 2 | 3
  kicker: string
  title: string
  cols: { icon: string; title: string; items: string[] }[]
}) {
  return (
    <Shell name="practical" tone={p.tone ?? 'beige'}>
      <Heading kicker={p.kicker} title={p.title} />
      <div className={clsx(styles.practical, p.columns === 2 && styles.practicalTwo)}>
        {p.cols.map(({ icon, title, items }, i) => {
          const Icon = ICONS[icon] ?? CalendarHeart
          return (
            <div key={title} data-reveal="up" data-d={i + 1} className={styles.column}>
              <span className={styles.columnBadge}>
                <Icon aria-hidden className={styles.glyph} strokeWidth={1.7} />
              </span>
              <h3 className={styles.columnTitle}>{title}</h3>
              <ul className={styles.items}>
                {items.map((it) => (
                  <li key={it} className={styles.item}>
                    <Check aria-hidden className={styles.check} strokeWidth={3} />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </Shell>
  )
}
