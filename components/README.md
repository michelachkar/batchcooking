# Architecture des composants

Ce document fixe les règles d'organisation et d'écriture des composants React du repo
(Next.js App Router, React 19, React Compiler activé, CSS Modules, textes dans `messages/fr.json`).

## 1. Couches et sens des dépendances

Les dépendances vont dans un seul sens : **`ui` ← `blocks` / `layout` ← `sections` ← `app`**.
`features` regroupe les domaines métier (demande de rappel, devis, recherche) et consomme `ui` et `blocks`.
ESLint (`eslint.config.mjs`) interdit les imports qui remontent la chaîne (`ui` → autre couche, `blocks`/`layout` → `sections`).

| Dossier | Rôle | Peut importer | Exemples |
|---|---|---|---|
| `ui/` | Primitives génériques, sans contenu ni domaine métier | rien d'autre dans `components/` | `Section`, `Icon`, `ModalShell`, `form/Field` |
| `blocks/` | Blocs de contenu réutilisables, **tout par props** | `ui` | `Hero`, `MediaSplit`, `StepCards` |
| `layout/` | Cadre du site : en-tête, pied de page, menus | `ui`, `blocks` | `SiteHeader`, `SiteFooter`, `PageHead` |
| `sections/` | Assemblages de page : lisent les messages et composent des blocs | `ui`, `blocks`, `features` | `Landing`, `FaqSection` |
| `features/` | Domaines métier avec leur état, leurs formulaires, leur contexte | `ui`, `blocks` | `features/lead`, `features/quote` |
| `seo/` | JSON-LD et analytics | `lib/` | `PageJsonLd` |

Règles de placement :
- **Un composant est réutilisé par ≥ 2 pages et ne connaît pas le métier → `ui/`.** Il connaît le contenu mais pas les messages → `blocks/`.
- **Seules `sections/` (et `layout/`, `seo/`) lisent les messages** (`getTranslations`). Un bloc reçoit des chaînes déjà traduites en props, jamais une clé de message.
- `lib/` ne dépend jamais de `components/`. Pas d'import circulaire entre dossiers de `features/`.
- Importer via l'alias `@/components/...`, jamais en remontant avec `../../`.

> **Écart connu** : quelques blocs importent encore `features/lead` (ex. `Hero` → `LeadTrigger`), ce que ESLint ne contrôle pas.
> Le contrat cible est de passer le déclencheur par props (slot / `children`) ou de remonter l'assemblage dans une section.
> Ne pas ajouter de nouvelle dépendance `blocks → features`.

## 2. Server Components par défaut

- Tout composant est un **Server Component** tant qu'il n'a pas besoin d'état, d'effets, de gestionnaires d'événements ou d'API navigateur.
- `"use client"` se pose **sur la feuille interactive la plus basse possible**, jamais sur une section ou un bloc entier pour un seul bouton.
  Extraire la partie interactive dans son propre fichier (`reveal-observer.tsx`, `back-to-top.tsx`, `filter-menu.tsx`).
- Un Server Component peut passer des Server Components en `children` / props à un Client Component : on garde ainsi le contenu statique côté serveur.
- Un composant client **n'importe pas** de code serveur (`lib/content`, accès fichiers, `server-only`) et ne reçoit que des props sérialisables
  (pas de fonctions, pas d'instances de classe, sauf Server Actions).
- Les données se chargent dans les pages / sections (async Server Components), pas dans un `useEffect`.
- Mutations et formulaires : Server Actions (`app/actions.ts`) ou route handler (`app/api/`), validés avec **zod** côté serveur.

## 3. Conception d'un composant

- **Un composant principal par fichier**, nommé par son rôle (`PascalCase`), fichier en `kebab-case.tsx`, `*.module.css` du même nom à côté.
  Jamais `Section2`, `HomeV2`, `NewHero`.
- **Exports nommés** (`export function Hero`), pas d'export par défaut (sauf fichiers imposés par Next : `page`, `layout`, `route`…).
- **Props** : type `NomDuComposantProps` déclaré dans le fichier ; handlers `onXxx`, booléens `isXxx` / `hasXxx`.
  Pas de spread aveugle de `props` sur un élément DOM sans le typer (`React.ComponentProps<'div'>`).
- **Composition plutôt que configuration** : au-delà de ~5 props de présentation ou dès qu'apparaît un booléen qui change la structure,
  passer par `children` ou des slots (`header`, `actions`) plutôt que d'ajouter des drapeaux.
- **Un composant fait une chose.** Au-delà d'environ 150 lignes ou de deux responsabilités (données + présentation, état + rendu), on découpe.
- Les sous-composants strictement privés restent dans le fichier du parent ; dès qu'ils sont réutilisés, ils ont leur fichier.
- **Duplication** : on extrait à la 3ᵉ occurrence ; une mauvaise abstraction coûte plus cher que deux copies.
- Pas de définition de composant **dans** le rendu d'un autre composant (l'état serait réinitialisé à chaque rendu).

## 4. État, effets, contexte

- **Garder l'état au plus près de son usage** ; ne le remonter que lorsque deux frères le partagent.
- **Ne pas stocker ce qui se calcule** : une valeur dérivée des props ou de l'état se calcule pendant le rendu, sans `useState` + `useEffect`.
- **`useEffect` uniquement pour se synchroniser avec un système externe** (observer, écouteur DOM, `<dialog>`, timer) et toujours avec nettoyage.
  Jamais pour transformer des données, réagir à un clic (→ gestionnaire d'événement) ou charger des données (→ serveur).
- Réinitialiser l'état d'un composant quand une entrée change : utiliser une **`key`**, pas un effet.
- **Contexte** : un contexte par domaine (`LeadProvider`, `QuoteProvider`), exposé via un hook dédié (`useLead`) qui lève une erreur hors provider.
  Valeur du contexte stable et petite ; ne pas y mettre l'état de toute l'application.
- **Listes** : `key` stable et unique (identifiant métier), jamais l'index si la liste peut changer.
- **Éléments natifs d'abord** : `<dialog>`, `<details>`, `<button>`, `<a>` avant toute bibliothèque ou `div` interactive.

## 5. Performance (React Compiler actif)

`reactCompiler: true` est activé dans `next.config.ts` : **n'écrire ni `useMemo`, `useCallback` ni `React.memo` par réflexe.**
Le compilateur mémoïse. Réserver ces hooks aux cas où l'identité d'une valeur est sémantiquement requise
(valeur de contexte, dépendance d'un effet) ou prouvée utile par mesure.
Règles pour que le compilateur reste efficace :
- Respecter les [Règles de React](https://react.dev/reference/rules) : rendu pur, pas de mutation des props ou de l'état, pas d'effet de bord au rendu.
- Pas d'écriture dans `ref.current` pendant le rendu (uniquement dans les effets et gestionnaires).
- Images via `next/image` (dimensions explicites, `alt` renseigné), liens internes via `next/link`.
- Charger paresseusement (`next/dynamic`) les composants lourds, clients, hors du premier écran.

## 6. Accessibilité

- Éléments sémantiques (`header`, `nav`, `main`, `section` avec titre, `button` vs `a`) ; un seul `h1` par page, hiérarchie de titres continue.
- Tout contrôle interactif est atteignable au clavier, a un nom accessible (`aria-label` pour les boutons icône) et un focus visible.
- Icônes décoratives : `aria-hidden`. Les champs de formulaire passent par `ui/form/field.tsx` (étiquette + message d'erreur liés).
- Les modals utilisent `ui/modal-shell.tsx` (`<dialog>` natif : Échap, piège de focus gérés par le navigateur).
- Respecter `prefers-reduced-motion` (`styles/motion.css`) pour toute animation.

## 7. Styles

- **CSS Modules** : un module par composant, `import styles from './nom.module.css'`, classes en `camelCase`, combinées avec `clsx`.
- **Couleurs, ombres, espacements : uniquement via les jetons de `styles/tokens.css`** (pas de `#hex` dans les modules).
- **Breakpoints** : mobile `< 768px`, tablette `< 1025px`, bureau `>= 1025px`. Écrire mobile d'abord.
- Pas de style en ligne sauf valeur réellement dynamique (variable CSS passée via `style`).

## 8. Contenus, icônes, types

- **Textes** : jamais en dur dans un composant ; ils viennent de `messages/fr.json` via une section, puis des props.
- **Icônes** : les contenus ne référencent que des clés ; `ui/icon-registry.ts` les résout en icône Lucide.
- **TypeScript strict** : pas de `any`, pas de `as` pour contourner une erreur ; types partagés dans `lib/`, types de props dans le composant.
  Les données externes (MDX, formulaires, JSON) sont validées avec zod à la frontière (`lib/content/schemas.ts`, `lib/proposal-schema.ts`).

## 9. Checklist avant de fusionner

1. Le composant est dans la bonne couche et n'importe rien « vers le haut » (`npm run lint` passe).
2. Il est serveur, sauf besoin avéré d'interactivité ; `"use client"` est sur la feuille la plus basse.
3. Aucun texte, couleur ou icône en dur ; tout passe par messages, jetons et registre.
4. Pas de `useEffect` pour une donnée dérivée, pas de `useMemo`/`useCallback` gratuit.
5. Navigable au clavier, noms accessibles, rendu correct en mobile (`< 768px`).
6. Nommé par son rôle, un composant par fichier, `*.module.css` du même nom.
