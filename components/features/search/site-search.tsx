'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import styles from './site-search.module.css'

export type SearchEntry = { title: string; text: string; href: string; type: string }

type SiteSearchProps = {
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
export function SiteSearch({ entries, labels, typeLabels, action }: SiteSearchProps) {
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
    <div className={styles.root}>
      <div className="container-x">
        <form role="search" action={action} className={styles.form}>
          <input
            type="search"
            name="s"
            defaultValue={query}
            required
            aria-label={labels.label}
            className={styles.input}
          />
          <button type="submit" className={styles.submit}>
            {labels.button}
          </button>
        </form>
        {query === '' ? (
          <p>{labels.empty}</p>
        ) : (
          <>
            <p role="status" className={styles.status}>
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
              <ul className={styles.results}>
                {found.map((e) => (
                  <li key={e.href} className={styles.result}>
                    <p className={styles.type}>{typeLabels[e.type] ?? e.type}</p>
                    <Link href={e.href} className={styles.resultTitle}>
                      {e.title}
                    </Link>
                    <p className={styles.excerpt}>{e.text}</p>
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
