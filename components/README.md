# Organisation des composants

Les dépendances vont dans un seul sens : **`ui` ← `blocks` / `layout` ← `sections` ← `app`**.
`features` regroupe les domaines métier (demande de rappel, devis, recherche) et peut utiliser `ui` et `blocks`.
ESLint (`eslint.config.mjs`) interdit les imports qui remontent la chaîne.

| Dossier | Rôle | Exemples |
|---|---|---|
| `ui/` | Primitives génériques, sans contenu ni domaine métier | `Section`, `SectionHeading`, `Icon`, `form/Field`, `FaqAccordion`, `icon-registry` |
| `blocks/` | Blocs de contenu réutilisables, configurés par props (aucun message lu ici) | `Hero`, `CtaButton`, `MediaSplit`, `StepCards`, `ZonesMap` |
| `layout/` | Cadre du site : en-tête, pied de page, menus, `PageHead` | `SiteHeader`, `SiteFooter`, `PageHead` |
| `sections/` | Assemblages de page : lisent les messages (`getTranslations`) et composent des blocs | `Landing`, `ZonesSection`, `FaqSection` |
| `features/` | Domaines métier avec leur état et leurs formulaires | `features/lead`, `features/quote`, `features/search` |
| `seo/` | JSON-LD et analytics | `PageJsonLd` |

## Conventions

- **Fichiers** : `kebab-case.tsx`, un composant principal par fichier, son `*.module.css` à côté (même nom).
- **Composants** : `PascalCase`, nommés par leur rôle (jamais `Section2`, `HomeV2`, `NewHero`).
- **Props** : type `NomDuComposantProps` dans le fichier ; handlers `onXxx`, booléens `isXxx` / `hasXxx`.
- **Icônes** : les contenus ne référencent que des clés ; `ui/icon-registry.ts` les résout en icône Lucide.
  Les pictogrammes de formulaire passent par `ui/icon.tsx`.
- **Formulaires** : champs avec étiquette + icône via `ui/form/field.tsx` (`TextField`, `SelectField`).
- **Couleurs et ombres** : uniquement via les jetons de `styles/tokens.css` (pas de `#hex` dans les modules CSS).
- **Breakpoints** : mobile `< 768px`, tablette `< 1025px`, bureau `>= 1025px`.
- **`"use client"`** : seulement sur les feuilles interactives, le plus bas possible dans l'arbre.
- **Duplication** : on extrait à la 3ᵉ occurrence ; une mauvaise abstraction coûte plus cher que deux copies.
