import Image from 'next/image'
import {
  CookingPot,
  Euro,
  Flame,
  Globe,
  Refrigerator,
  Sparkles,
  ShieldAlert,
  Snowflake,
  type LucideIcon,
} from 'lucide-react'
import {
  ALLERGENS,
  DIETS,
  DISH_TYPES,
  RECIPE_LABELS,
  SPICE,
  ingredientPrice,
  type Recipe,
} from '@/lib/recipes'
import styles from './recipe-card.module.css'

export type RecipeCardData = Recipe & { image: { src: string; unoptimized?: boolean } }

const SIZES = '(min-width: 1025px) 33vw, (min-width: 768px) 50vw, 100vw'

function Fact({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon
  label: string
  children: React.ReactNode
}) {
  return (
    <div className={styles.fact}>
      <dt className={styles.factLabel}>
        <Icon aria-hidden className={styles.factIcon} />
        {label}
      </dt>
      <dd className={styles.factValue}>{children}</dd>
    </div>
  )
}

// Fiche recette unique, utilisée partout (page Recettes, aperçus, plats signature) pour garder exactement la même structure :
// titre, description, type, piment, puis allergènes, origine, conservation, congélation, réchauffage et prix des ingrédients.
// Rend un <li> : à placer dans une liste.
export function RecipeCard({
  recipe: r,
  as: Heading = 'h3',
  className,
}: {
  recipe: RecipeCardData
  as?: 'h2' | 'h3'
  className?: string
}) {
  const extraDiets = r.diets.filter((d) => d !== 'vegetarien')
  return (
    <li className={className ? `${styles.card} ${className}` : styles.card}>
      <div className={styles.media}>
        <Image
          src={r.image.src}
          alt={r.alt}
          fill
          unoptimized={r.image.unoptimized}
          sizes={SIZES}
          className={styles.image}
        />
        {r.pack === 'signature' && (
          <span className={styles.signature}>
            <Sparkles aria-hidden className={styles.signatureIcon} />
            {RECIPE_LABELS.signature}
          </span>
        )}
      </div>
      <div className={styles.body}>
        <Heading className={styles.title}>{r.title}</Heading>
        <p className={styles.description}>{r.description}</p>
        <ul className={styles.tags} aria-label={`${DISH_TYPES[r.type]}, ${SPICE[r.spice]}`}>
          <li className={`${styles.tag} ${styles.tagType}`}>{DISH_TYPES[r.type]}</li>
          <li className={`${styles.tag} ${r.spice === 'doux' ? '' : styles.tagSpicy}`}>
            <Flame aria-hidden className={styles.tagIcon} />
            {SPICE[r.spice]}
          </li>
          {extraDiets.map((d) => (
            <li key={d} className={styles.tag}>
              {DIETS[d]}
            </li>
          ))}
        </ul>
        <dl className={styles.facts}>
          <Fact icon={ShieldAlert} label={RECIPE_LABELS.allergens}>
            {r.allergens.length > 0
              ? r.allergens
                  .map((a) => ALLERGENS[a].toLowerCase())
                  .join(', ')
                  .replace(/^./, (c) => c.toUpperCase())
              : RECIPE_LABELS.allergenNone}
          </Fact>
          <Fact icon={Globe} label={RECIPE_LABELS.origin}>
            {r.origin}
          </Fact>
          <Fact icon={Refrigerator} label={RECIPE_LABELS.storage}>
            {r.fridgeDays} jours au réfrigérateur
          </Fact>
          <Fact icon={Snowflake} label={RECIPE_LABELS.freezing}>
            {r.freezable ? RECIPE_LABELS.freezable : RECIPE_LABELS.notFreezable}
          </Fact>
          <Fact icon={CookingPot} label={RECIPE_LABELS.reheat}>
            {r.reheat}
          </Fact>
          <Fact icon={Euro} label={RECIPE_LABELS.ingredients}>
            <span
              role="img"
              aria-label={RECIPE_LABELS.priceLevel.replace('{n}', String(r.cost))}
              className={styles.price}
            >
              <span className={styles.priceOn}>{ingredientPrice(r.cost)}</span>
              <span className={styles.priceOff}>{'€'.repeat(4 - r.cost)}</span>
            </span>
          </Fact>
        </dl>
      </div>
    </li>
  )
}
