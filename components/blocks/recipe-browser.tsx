'use client'

import Image from 'next/image'
import { FilterMenu } from '@/components/ui/filter-menu'
import { useMemo, useState } from 'react'
import styles from './recipe-browser.module.css'
import { Clock, Flame, Globe, Leaf, ShieldAlert, Snowflake } from 'lucide-react'
import {
  ALLERGENS,
  DIETS,
  DISH_TYPES,
  SPICE,
  type Allergen,
  type Diet,
  type DishType,
  type Recipe,
} from '@/lib/recipes'

export type RecipeCard = Recipe & { image: { src: string; unoptimized?: boolean } }

type Text = {
  type: string
  diet: string
  allergen: string
  all: string
  count: string
  empty: string
  reset: string
  allergenFree: string
  allergenNone: string
  disclaimer: string
  spice: string
  cost: string
  budget: string
}

function toggle<T>(list: T[], v: T) {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v]
}

// Recettes filtrables par type de plat, régime et allergène à éviter.
export function RecipeBrowser({ recipes, text }: { recipes: RecipeCard[]; text: Text }) {
  const [type, setType] = useState<DishType | null>(null)
  const [diets, setDiets] = useState<Diet[]>([])
  const [avoid, setAvoid] = useState<Allergen[]>([])
  const [budgets, setBudgets] = useState<string[]>([])

  // On ne propose que les filtres qui existent dans les recettes.
  const types = useMemo(
    () => (Object.keys(DISH_TYPES) as DishType[]).filter((t) => recipes.some((r) => r.type === t)),
    [recipes],
  )
  const dietOpts = useMemo(
    () => (Object.keys(DIETS) as Diet[]).filter((d) => recipes.some((r) => r.diets.includes(d))),
    [recipes],
  )
  const allergenOpts = useMemo(
    () =>
      (Object.keys(ALLERGENS) as Allergen[]).filter((a) =>
        recipes.some((r) => r.allergens.includes(a)),
      ),
    [recipes],
  )

  const budgetOpts = useMemo(
    () => [1, 2, 3, 4].filter((c) => recipes.some((r) => r.cost === c)),
    [recipes],
  )

  const shown = recipes.filter(
    (r) =>
      (!type || r.type === type) &&
      diets.every((d) => r.diets.includes(d)) &&
      !avoid.some((a) => r.allergens.includes(a)) &&
      (budgets.length === 0 || budgets.includes(String(r.cost))),
  )
  const active = type !== null || diets.length > 0 || avoid.length > 0 || budgets.length > 0
  const reset = () => {
    setType(null)
    setDiets([])
    setAvoid([])
    setBudgets([])
  }

  return (
    <div>
      <div className={styles.toolbar}>
        <div role="group" aria-label={text.type} className={styles.tabs}>
          {[null, ...types].map((t) => {
            const on = type === t
            return (
              <button
                key={t ?? 'all'}
                type="button"
                aria-pressed={on}
                onClick={() => setType(t)}
                className={styles.tab}
              >
                {t ? DISH_TYPES[t] : text.all}
              </button>
            )
          })}
        </div>
        <div className={styles.filters}>
          <FilterMenu
            label={text.diet}
            options={dietOpts.map((d) => ({ value: d, text: DIETS[d] }))}
            selected={diets}
            onChange={(d) => setDiets(toggle(diets, d))}
          />
          <FilterMenu
            label={text.allergen}
            options={allergenOpts.map((a) => ({
              value: a,
              text: text.allergenFree.replace('{name}', ALLERGENS[a].toLowerCase()),
            }))}
            selected={avoid}
            onChange={(a) => setAvoid(toggle(avoid, a))}
          />
          <FilterMenu
            label={text.budget}
            options={budgetOpts.map((c) => ({ value: String(c), text: '€'.repeat(c) }))}
            selected={budgets}
            onChange={(c) => setBudgets(toggle(budgets, c))}
          />
        </div>
      </div>

      <p aria-live="polite" className={styles.count}>
        {text.count.replace('{n}', String(shown.length))}
        {active && (
          <button type="button" onClick={reset} className={styles.reset}>
            {text.reset}
          </button>
        )}
      </p>

      {shown.length === 0 ? (
        <p className={styles.empty}>{text.empty}</p>
      ) : (
        <ul className={styles.list}>
          {shown.map((r) => (
            <li key={r.title} className={styles.card}>
              <div className={styles.media}>
                <Image
                  src={r.image.src}
                  alt={r.alt}
                  fill
                  unoptimized={r.image.unoptimized}
                  sizes="(min-width: 1025px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className={styles.image}
                />
              </div>
              <div className={styles.body}>
                <div className={styles.meta}>
                  <span className={styles.type}>{DISH_TYPES[r.type]}</span>
                  <span
                    role="img"
                    aria-label={text.cost.replace('{n}', String(r.cost))}
                    title={text.cost.replace('{n}', String(r.cost))}
                    className={styles.cost}
                  >
                    <span className={styles.costOn}>{'€'.repeat(r.cost)}</span>
                    <span className={styles.costOff}>{'€'.repeat(4 - r.cost)}</span>
                  </span>
                </div>
                <h2 className={styles.title}>{r.title}</h2>
                <p className={styles.description}>{r.description}</p>
                <p className={styles.ingredients}>{r.ingredients.join(' · ')}</p>
                {r.diets.length > 0 && (
                  <ul className={styles.diets}>
                    {r.diets.map((d) => (
                      <li key={d} className={styles.diet}>
                        <Leaf aria-hidden className={styles.dietIcon} />
                        {DIETS[d]}
                      </li>
                    ))}
                  </ul>
                )}
                <p className={styles.allergens}>
                  <ShieldAlert aria-hidden className={styles.allergenIcon} />
                  <span>
                    {r.allergens.length > 0
                      ? `${text.allergen} : ${r.allergens.map((a) => ALLERGENS[a].toLowerCase()).join(', ')}`
                      : text.allergenNone}
                  </span>
                </p>
                <dl className={styles.facts}>
                  <div className={styles.fact}>
                    <Globe aria-hidden className={styles.factIcon} />
                    <dt className={styles.srOnly}>Cuisine</dt>
                    <dd>{r.cuisine}</dd>
                  </div>
                  <div className={styles.fact}>
                    <Flame aria-hidden className={styles.factIcon} />
                    <dt className={styles.srOnly}>{text.spice}</dt>
                    <dd>{SPICE[r.spice]}</dd>
                  </div>
                  {r.season && (
                    <div className={styles.fact}>
                      <Clock aria-hidden className={styles.factIcon} />
                      <dt className={styles.srOnly}>Saison</dt>
                      <dd>{r.season}</dd>
                    </div>
                  )}
                  <div className={styles.fact}>
                    <Snowflake aria-hidden className={styles.factIcon} />
                    <dt className={styles.srOnly}>Conservation</dt>
                    <dd>
                      {r.storage} · {r.reheat}
                    </dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className={styles.disclaimer}>{text.disclaimer}</p>
    </div>
  )
}
