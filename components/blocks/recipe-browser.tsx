'use client'

import { FilterMenu } from '@/components/ui/filter-menu'
import { useMemo, useState } from 'react'
import styles from './recipe-browser.module.css'
import { RecipeCard, type RecipeCardData } from '@/components/ui/recipe-card'
import {
  ALLERGENS,
  DIETS,
  DISH_TYPES,
  RECIPE_PACKS,
  SPICE,
  type Spice,
  type Allergen,
  type Diet,
  type DishType,
  type RecipePack,
} from '@/lib/recipes'

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
  spice: string
  budget: string
  pack: string
}

function toggle<T>(list: T[], v: T) {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v]
}

// Recettes filtrables par type de plat, régime et allergène à éviter.
export function RecipeBrowser({
  recipes,
  text,
  initialPacks = [],
}: {
  recipes: RecipeCardData[]
  text: Text
  /** Séries présélectionnées (lien depuis une formule). */
  initialPacks?: RecipePack[]
}) {
  const [type, setType] = useState<DishType | null>(null)
  const [diets, setDiets] = useState<Diet[]>([])
  const [avoid, setAvoid] = useState<Allergen[]>([])
  const [budgets, setBudgets] = useState<string[]>([])
  const [spices, setSpices] = useState<Spice[]>([])
  const [packs, setPacks] = useState<RecipePack[]>(initialPacks)

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

  const spiceOpts = useMemo(
    () => (Object.keys(SPICE) as Spice[]).filter((s) => recipes.some((r) => r.spice === s)),
    [recipes],
  )

  const shown = recipes.filter(
    (r) =>
      (!type || r.type === type) &&
      (packs.length === 0 || packs.includes(r.pack)) &&
      diets.every((d) => r.diets.includes(d)) &&
      !avoid.some((a) => r.allergens.includes(a)) &&
      (spices.length === 0 || spices.includes(r.spice)) &&
      (budgets.length === 0 || budgets.includes(String(r.cost))),
  )
  const active =
    type !== null ||
    diets.length > 0 ||
    avoid.length > 0 ||
    budgets.length > 0 ||
    spices.length > 0 ||
    packs.length > 0
  const reset = () => {
    setType(null)
    setDiets([])
    setAvoid([])
    setBudgets([])
    setSpices([])
    setPacks([])
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
            label={text.pack}
            options={(Object.keys(RECIPE_PACKS) as RecipePack[]).map((k) => ({
              value: k,
              text: RECIPE_PACKS[k],
            }))}
            selected={packs}
            onChange={(k) => setPacks(toggle(packs, k))}
          />
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
            label={text.spice}
            options={spiceOpts.map((k) => ({ value: k, text: SPICE[k] }))}
            selected={spices}
            onChange={(k) => setSpices(toggle(spices, k))}
          />
          <FilterMenu
            label={text.budget}
            options={budgetOpts.map((c) => ({
              value: String(c),
              text: '€'.repeat(c),
            }))}
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
            <RecipeCard key={r.title} recipe={r} as="h2" />
          ))}
        </ul>
      )}
    </div>
  )
}
