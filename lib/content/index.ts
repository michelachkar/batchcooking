import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'
import { z } from 'zod'

export type Entry<T> = {
  slug: string
  data: T
  body: string
  /** Date de modification du fichier. */
  modified: Date
}

// Dossier des contenus : `content/`.
const root = join(process.cwd(), 'content')
const cache = new Map<string, Entry<unknown>[]>()

/** Lit `content/<collection>/*.mdx`, valide le frontmatter avec le schéma et renvoie les entrées (liste vide si le dossier l'est). */
export function collection<S extends z.ZodType>(name: string, schema: S): Entry<z.infer<S>>[] {
  const hit = cache.get(name)
  if (hit) return hit as Entry<z.infer<S>>[]
  const dir = join(root, name)
  const entries = existsSync(dir)
    ? readdirSync(dir)
        .filter((f) => f.endsWith('.mdx'))
        .map((f) => {
          const file = join(dir, f)
          const { data, content } = matter(readFileSync(file, 'utf8'))
          const parsed = schema.safeParse(data)
          if (!parsed.success) {
            throw new Error(`content/${name}/${f} : ${z.prettifyError(parsed.error)}`)
          }
          return {
            slug: f.replace(/\.mdx$/, ''),
            data: parsed.data as z.infer<S>,
            body: content,
            modified: statSync(file).mtime,
          }
        })
    : []
  cache.set(name, entries)
  return entries
}
