'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

export type SearchEntry = { title: string; text: string; href: string; type: string }

type Props = {
  entries: SearchEntry[]
  labels: {
    label: string
    button: string
    empty: string
    none: string
    /** Phrases de résultat ; « {count} » et « {query} » sont remplacés dans le navigateur. */
    results: string
    resultOne: string
    resultNone: string
  }
  typeLabels: Record<string, string>
  action: string
}

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

// Recherche dans le navigateur sur un index fourni à la construction (le site reste 100 % statique).
export function SiteSearch({ entries, labels, typeLabels, action }: Props) {
  const query = (useSearchParams().get('s') ?? '').trim()
  const found = useMemo(() => {
    const words = norm(query).split(/\s+/).filter(Boolean)
    if (words.length === 0) return []
    return entries.filter((e) => {
      const hay = norm(`${e.title} ${e.text}`)
      return words.every((w) => hay.includes(w))
    })
  }, [entries, query])

  return (
    <div className="py-[110px] leading-normal max-md:py-[70px]">
      <div className="container-x">
        <form role="search" action={action} className="mb-10 flex max-w-[640px] gap-3">
          <input
            type="search"
            name="s"
            defaultValue={query}
            required
            aria-label={labels.label}
            className="h-[47px] w-full rounded-[30px] border border-[#c4c4c4] bg-transparent px-5 text-base text-[#222] transition-colors duration-[250ms] ease-[ease] outline-none focus:border-[#234a3a]"
          />
          <button
            type="submit"
            className="rounded-full bg-[#234a3a] px-8 leading-4 font-medium tracking-[0.5px] text-[#fbfaf7] transition-colors duration-[250ms] ease-[ease] hover:bg-[#1b3a2d]"
          >
            {labels.button}
          </button>
        </form>
        {query === '' ? (
          <p>{labels.empty}</p>
        ) : (
          <>
            <p role="status" className="mb-6 font-semibold">
              {(found.length === 0
                ? labels.resultNone
                : found.length === 1
                  ? labels.resultOne
                  : labels.results
              )
                .replace('{count}', String(found.length))
                .replace('{query}', query)}
            </p>
            {found.length === 0 ? (
              <p>{labels.none}</p>
            ) : (
              <ul className="m-0 grid list-none gap-5 p-0">
                {found.map((e) => (
                  <li key={e.href} className="rounded-[20px] bg-white p-6">
                    <p className="mb-1 text-xs font-semibold tracking-[1px] text-[#5a605c] uppercase">
                      {typeLabels[e.type] ?? e.type}
                    </p>
                    <Link href={e.href} className="font-display text-2xl font-semibold text-black">
                      {e.title}
                    </Link>
                    <p className="mt-2 mb-0 text-[#5a605c]">{e.text}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  )
}
