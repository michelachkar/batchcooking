# Site de batch cooking

Next.js (App Router, rendu 100 % statique) + React Compiler + TypeScript + CSS Modules. Brief : voir `BRIEF.md` si présent ; avancement par étapes, validation entre chaque.

Étapes faites : 0 (assets), 1 (analyse : `TOKENS.md`, `SECTIONS.md`), 3 (fondations), 4 (accueil et pages intérieures : services, tarifs, FAQ, contact, zones, recettes, réalisations et détail, recherche, 404, pages de texte), 5 (contenu et SEO). Reste : contenus réels, marque, hébergement.

## Commandes
```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
npm run lint           # ESLint
npm run format         # Prettier
npm run analyze        # @next/bundle-analyzer
npm run test:seo       # titres, descriptions, canonical, h1, JSON-LD, liens (sur le build de test, port 3100)
npm run lighthouse     # build réel + Lighthouse CI (seuils dans lighthouserc.json)
```

## Arborescence
| Dossier | Rôle |
|---|---|
| `app/` | Routes (site en français uniquement, sans préfixe d'URL) |
| `components/ui/` | Primitives (bouton, logo) |
| `components/blocks/` | Sections (header, menu mobile, footer) ; les autres arrivent à l'étape 4 |
| `styles/` | CSS global en couches (`reset`, `tokens`, `base`, `layout`) et mouvements pilotés par `data-*` ; les styles des composants sont dans leur `*.module.css` |
| `messages/fr.json`, `lib/i18n.ts` | Textes et leur lecture (`getTranslations`, sans bibliothèque d'internationalisation) |
| `lib/site.ts`, `lib/nav.ts` | Coordonnées provisoires et structure du menu |
| `public/assets/`, `content/` | Assets et textes de l'étape 0 |

## Budget JS (point de tension)
Le brief demande < 100 Ko gzippés de JS client par page. Mesuré sur l'accueil (build de production) : **184 Ko**, dont **~175 Ko pour le socle Next 16 + React 19** (react-dom 70, runtime Next 84, divers) avant tout composant à nous, et ~10 Ko pour le menu mobile. Le budget n'est pas atteignable avec Next App Router seul ; décision à prendre à l'étape 6 (relever le seuil, ou changer d'approche pour les pages de contenu).

## Contenu (MDX validé par Zod)
Un fichier par contenu dans `content/<collection>/<adresse>.mdx` ; le frontmatter est validé au build (`lib/content/schemas.ts`), une erreur donne le fichier et le champ. Collections : `projects` (adresse `/realisations/...`), `pages` (adresse `/<nom>`, par exemple `conditions`, `offrir`). Une section n'apparaît que s'il y a de vrais contenus : tant que les dossiers sont vides, le site ne montre aucun texte provisoire.

## SEO
- `NEXT_PUBLIC_SITE_URL` : adresse publique (canoniques, sitemap, Open Graph). `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` : active la mesure d'audience.
- `app/sitemap.ts` (dates de modification réelles), `app/robots.ts`, images de partage générées au build (`opengraph-image`), données structurées en `@graph` (`lib/jsonld.ts`).
- Les coordonnées de `lib/site.ts` sont provisoires : `provisional = true` les garde hors des données structurées. Passer à `false` quand elles sont définitives.
- La page de recherche est en `noindex` et hors sitemap.
# batchcooking
