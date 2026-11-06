// Textes du site (français seul) : lecture de messages/fr.json, sans bibliothèque d'internationalisation.
// Remplace `getTranslations` de next-intl avec la même forme d'appel : `const t = await getTranslations('espace')`,
// puis `t('clé')`, `t('clé', { valeur })`, `t.raw('clé')` (objet ou liste brute) et `t.has('clé')`.

type Messages = Record<string, unknown>
type Values = Record<string, string | number>

let cache: Messages | undefined

async function messages(): Promise<Messages> {
  if (cache) return cache
  cache = (await import('../messages/fr.json')).default
  return cache
}

function find(root: unknown, path: string): unknown {
  let node = root
  for (const part of path.split('.')) {
    if (node === null || typeof node !== 'object') return undefined
    node = (node as Record<string, unknown>)[part]
  }
  return node
}

/** Remplace `{nom}` et le pluriel `{n, plural, one {…} other {…}}` (avec `#` pour le nombre). */
function format(template: string, values: Values): string {
  return template
    .replace(
      /\{(\w+), plural, one \{([^}]*)\} other \{([^}]*)\}\}/g,
      (_, key: string, one: string, other: string) => {
        const n = Number(values[key])
        return (n === 1 || n === 0 ? one : other).replace('#', String(n))
      },
    )
    .replace(/\{(\w+)\}/g, (whole, key: string) => (key in values ? String(values[key]) : whole))
}

// Clé absente : erreur franche au build.
function missing(path: string): never {
  throw new Error(`Texte manquant : ${path}`)
}

export type Translator = {
  (key: string, values?: Values): string
  /** Valeur brute (objet, liste ou texte), sans mise en forme. */
  raw: (key: string) => any
  has: (key: string) => boolean
}

export async function getTranslations(namespace?: string): Promise<Translator> {
  const root = await messages()
  const at = (key: string) => (namespace ? `${namespace}.${key}` : key)
  const t = ((key: string, values?: Values) => {
    const value = find(root, at(key))
    if (typeof value !== 'string') return missing(at(key))
    return values ? format(value, values) : value
  }) as Translator
  t.raw = (key) => {
    const value = find(root, at(key))
    return value === undefined ? missing(at(key)) : value
  }
  t.has = (key) => find(root, at(key)) !== undefined
  return t
}
