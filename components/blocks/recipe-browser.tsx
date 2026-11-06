'use client'

import Image from 'next/image'
import { FilterMenu } from '@/components/ui/filter-menu'
import { useMemo, useState } from 'react'
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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-b border-[#e3d9cc]">
        <div role="group" aria-label={text.type} className="-mb-px flex flex-wrap gap-x-7">
          {[null, ...types].map((t) => {
            const on = type === t
            return (
              <button
                key={t ?? 'all'}
                type="button"
                aria-pressed={on}
                onClick={() => setType(t)}
                className={`border-b-2 py-3 text-[16px] font-semibold [transition:color_0.2s_ease,border-color_0.2s_ease] ${on ? 'border-[#B04A2A] text-[#B04A2A]' : 'border-transparent text-[rgba(85,80,68,0.88)] hover:text-[rgba(85,80,68,1)]'}`}
              >
                {t ? DISH_TYPES[t] : text.all}
              </button>
            )
          })}
        </div>
        <div className="flex flex-wrap gap-3 pb-3">
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

      <p aria-live="polite" className="mb-6 text-[16px] text-[rgba(85,80,68,0.88)]">
        {text.count.replace('{n}', String(shown.length))}
        {active && (
          <button
            type="button"
            onClick={reset}
            className="ml-3 font-semibold text-[#B04A2A] underline"
          >
            {text.reset}
          </button>
        )}
      </p>

      {shown.length === 0 ? (
        <p className="rounded-[18px] border border-[#e3d9cc] p-8 text-center text-[17px] text-[rgba(85,80,68,0.88)]">
          {text.empty}
        </p>
      ) : (
        <ul className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
          {shown.map((r) => (
            <li
              key={r.title}
              className="flex flex-col overflow-hidden rounded-[18px] border border-[#e3d9cc] bg-white shadow-[0_10px_30px_rgba(85,80,68,0.06)]"
            >
              <div className="relative aspect-[4/3] bg-[#2F2B26]">
                <Image
                  src={r.image.src}
                  alt={r.alt}
                  fill
                  unoptimized={r.image.unoptimized}
                  sizes="(min-width: 1025px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-bold tracking-[0.14em] text-[#B04A2A] uppercase">
                    {DISH_TYPES[r.type]}
                  </span>
                  <span
                    role="img"
                    aria-label={text.cost.replace('{n}', String(r.cost))}
                    title={text.cost.replace('{n}', String(r.cost))}
                    className="text-[15px] font-semibold tracking-[0.04em]"
                  >
                    <span className="text-[#B04A2A]">{'€'.repeat(r.cost)}</span>
                    <span className="text-[#B04A2A]/25">{'€'.repeat(4 - r.cost)}</span>
                  </span>
                </div>
                <h2 className="font-display text-[22px] leading-[1.2] font-semibold text-[rgba(85,80,68,1)]">
                  {r.title}
                </h2>
                <p className="text-[16px] leading-[1.6] text-[rgba(85,80,68,0.88)]">
                  {r.description}
                </p>
                <p className="text-[15px] leading-[1.5] text-[rgba(85,80,68,1)]">
                  {r.ingredients.join(' · ')}
                </p>
                {r.diets.length > 0 && (
                  <ul className="flex flex-wrap gap-1.5">
                    {r.diets.map((d) => (
                      <li
                        key={d}
                        className="inline-flex items-center gap-1 rounded-full bg-[#B96941]/15 px-2.5 py-1 text-[13px] font-semibold text-[#744229]"
                      >
                        <Leaf aria-hidden className="size-3" />
                        {DIETS[d]}
                      </li>
                    ))}
                  </ul>
                )}
                <p className="flex items-start gap-2 text-[14px] leading-[1.45] text-[rgba(85,80,68,0.92)]">
                  <ShieldAlert aria-hidden className="mt-0.5 size-4 flex-none text-[#B04A2A]" />
                  <span>
                    {r.allergens.length > 0
                      ? `${text.allergen} : ${r.allergens.map((a) => ALLERGENS[a].toLowerCase()).join(', ')}`
                      : text.allergenNone}
                  </span>
                </p>
                <dl className="mt-auto grid gap-2 border-t border-[#e3d9cc] pt-4 text-[14px] text-[rgba(85,80,68,0.92)]">
                  <div className="flex items-center gap-2">
                    <Globe aria-hidden className="size-4 flex-none text-[#B04A2A]" />
                    <dt className="sr-only">Cuisine</dt>
                    <dd>{r.cuisine}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame aria-hidden className="size-4 flex-none text-[#B04A2A]" />
                    <dt className="sr-only">{text.spice}</dt>
                    <dd>{SPICE[r.spice]}</dd>
                  </div>
                  {r.season && (
                    <div className="flex items-center gap-2">
                      <Clock aria-hidden className="size-4 flex-none text-[#B04A2A]" />
                      <dt className="sr-only">Saison</dt>
                      <dd>{r.season}</dd>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Snowflake aria-hidden className="size-4 flex-none text-[#B04A2A]" />
                    <dt className="sr-only">Conservation</dt>
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
      <p className="mt-8 text-[15px] leading-[1.6] text-[rgba(85,80,68,0.88)]">{text.disclaimer}</p>
    </div>
  )
}
