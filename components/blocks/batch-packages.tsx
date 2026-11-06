'use client'

import { useState } from 'react'
import { Switch } from '@/components/lead/switch'
import { useLead } from '@/components/lead/lead-provider'
import {
  DINNERS,
  euro,
  priceAfter,
  priceBefore,
  type Dinners,
  type PackId,
} from '@/lib/lead/pricing'
import { SampleMenus, type SampleMenu } from '@/components/blocks/sample-menus'

type Period = 'week' | 'month'
type PerPeriod = Pick<SampleMenu, 'meta' | 'courses'>
export type PackageCard = Pick<SampleMenu, 'icon' | 'label' | 'title' | 'tags'> & {
  id: PackId
  week: PerPeriod
  month: PerPeriod
}

type Props = {
  kicker: string
  title: string
  intro: string
  note: string
  cards: PackageCard[]
  toggle: { label: string; week: string; month: string; hint?: string }
  dinners: { label: string; unit: string }
  priceLine: string
  priceNote: string
  perDinner: string
  moreTemplate: { one: string; other: string }
  labels: { open: string; close: string; panelKicker: string; cta: string }
  ctaHref: string
  cardCta: string
  /** Colle le bloc à la section précédente (voir SampleMenus). */
  flushTop?: boolean
  /** Bandeau terracotta (pages de service) au lieu du fond beige. */
  tone?: 'beige' | 'white' | 'terracotta'
  /** Masque kicker, titre et introduction. */
  hideHeader?: boolean
}

// Formules de batch cooking : deux sélecteurs (durée 1 semaine / 1 mois, 1 mois par défaut ; 3, 4 ou 5 dîners) pilotent visites et prix.
export function BatchPackages({
  cards,
  toggle,
  dinners,
  priceLine,
  priceNote,
  perDinner,
  moreTemplate,
  labels,
  ...rest
}: Props) {
  const { open } = useLead()
  const [period, setPeriod] = useState<Period>('month')
  const [count, setCount] = useState<Dinners>(DINNERS[0])
  const menus: SampleMenu[] = cards.map(({ id, week, month, ...c }) => {
    const per = period === 'week' ? week : month
    const after = priceAfter(id, period, count)
    return {
      ...c,
      meta: per.meta,
      courses: per.courses.map(([a, b, m]) => [
        a.replace('{n}', String(count)),
        b.replace('{per}', perDinner.replace('{value}', euro(after / count))),
        m,
      ]),
      price: priceLine.replace('{price}', euro(after)),
      priceNote: priceNote.replace('{full}', euro(priceBefore(id, period, count))),
    }
  })
  return (
    <>
      <SampleMenus
        {...rest}
        menus={menus}
        onCardCta={(i) => open({ pack: cards[i].id, period, dinners: count })}
        labels={{
          ...labels,
          more: (n) =>
            (n === 1 ? moreTemplate.one : moreTemplate.other).replace('{count}', String(n)),
        }}
        beforeCards={
          <div className="mx-auto -mt-4 mb-10 flex flex-col items-center gap-5">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <div className="flex flex-col items-center gap-2">
                <Switch
                  label={toggle.label}
                  value={period}
                  onChange={setPeriod}
                  options={[
                    { value: 'week', text: toggle.week },
                    { value: 'month', text: toggle.month },
                  ]}
                />
                {toggle.hint && (
                  <span
                    className={`text-[14px] font-semibold ${rest.tone === 'terracotta' ? 'text-white' : 'text-[#B04A2A]'}`}
                  >
                    {toggle.hint}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-center gap-2">
                <Switch
                  label={dinners.label}
                  value={count}
                  onChange={setCount}
                  options={DINNERS.map((n) => ({ value: n, text: `${n} ${dinners.unit}` }))}
                />
                <span
                  className={`text-[14px] font-semibold ${rest.tone === 'terracotta' ? 'text-white' : 'text-[rgba(85,80,68,0.88)]'}`}
                >
                  {dinners.label}
                </span>
              </div>
            </div>
          </div>
        }
      />
    </>
  )
}
