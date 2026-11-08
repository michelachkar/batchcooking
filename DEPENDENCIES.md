# DEPENDENCIES.md : justification de chaque dépendance

Règle du brief : aucune dépendance sans justification écrite. Les versions sont celles de `package.json`.

## Exécution (livrées au navigateur ou au rendu serveur)
| Paquet | Pourquoi | Impact JS client |
|---|---|---|
| `next`, `react`, `react-dom` | Imposés par le brief (App Router, rendu statique, React Compiler). | Socle : voir « Budget JS » dans README |
| `clsx` | Classes CSS conditionnelles des composants. | Négligeable |
| `zod` | Validation des Server Actions (formulaire de devis, plus tard contact) et du frontmatter MDX (étape 5) : un schéma unique sert de type TypeScript et de contrôle à l'exécution. Côté serveur uniquement. | Aucun |
| `next-mdx-remote` | Rend le corps des fichiers MDX (réalisations, pages de texte) sur le serveur (`next-mdx-remote/rsc`), sans JavaScript côté navigateur. `@next/mdx` ne convient pas : les contenus vivent dans `content/` hors de `app/` et sont validés avant le rendu. | Aucun (rendu serveur) |
| `gray-matter` | Sépare le frontmatter YAML du corps des fichiers MDX avant la validation Zod. Une cinquantaine de lignes à réécrire pour un gain nul ; paquet stable. | Aucun (serveur) |
| `lucide-react` | Icônes SVG rendues côté serveur et importées à l'unité. | Seules `ChevronDown` et `X` partent côté client (menu mobile) |

Pas de `@radix-ui/react-dialog` : le menu mobile utilise `<dialog>` natif (piège à focus, Échap, fond inerte). Essayé puis retiré : −12 Ko gzippés.

## Développement
| Paquet | Pourquoi |
|---|---|
| `typescript`, `@types/node`, `@types/react`, `@types/react-dom` | TypeScript imposé. |
| `babel-plugin-react-compiler` | React Compiler imposé (`reactCompiler: true`). |
| `eslint`, `eslint-config-next` | Qualité imposée. |
| `prettier` | Qualité imposée. |
| `@next/bundle-analyzer` | Imposé : `npm run analyze`. |
| `@playwright/test` | Imposé : tests SEO (étape 5). |

## Outils de test ajoutés à l'étape 5
| Paquet | Pourquoi |
|---|---|
| `@lhci/cli` | Imposé : Lighthouse CI (`npm run lighthouse`, seuils dans `lighthouserc.json`). Développement seulement. |

## Polices
`Outfit`, `Plus Jakarta Sans` et `Caveat` via `next/font/google` : téléchargées au build et servies depuis le site, aucune requête vers Google à l'exécution.

## Script externe facultatif
Plausible (mesure d'audience) : chargé en `lazyOnload` par `components/seo/analytics.tsx` uniquement si `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` est défini. Aucun autre script tiers.
