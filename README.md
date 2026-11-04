# Site de batch cooking (inspiré du thème Savrio)

Next.js (App Router, rendu 100 % statique) + React Compiler + TypeScript + Tailwind v4. Brief : voir `BRIEF.md` si présent ; avancement par étapes, validation entre chaque.

Étapes faites : 0 (assets), 1 (analyse : `TOKENS.md`, `SECTIONS.md`), 2 (référence visuelle : `reference/`), 3 (fondations), 4 (accueil et pages intérieures : à propos, services et détail, équipe et fiche, tarifs, FAQ, contact, blog (liste, 3 variantes, grille, article, catégories, archives, mots-clés), réalisations et détail, recherche, 404, pages de texte), 5 (contenu et SEO). Reste : page « Mobile Bar & Cocktails » (`/formule-evenement`), contenus réels, marque, hébergement.

## Commandes
```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
npm run lint           # ESLint
npm run format         # Prettier
npm run analyze        # @next/bundle-analyzer
npm run test:visual    # tous les blocs vs reference/ aux 3 largeurs (voir ci-dessous)
npm run test:seo       # titres, descriptions, canonical, h1, JSON-LD, liens (sur le build de test, port 3100)
npm run lighthouse     # build réel + Lighthouse CI (seuils dans lighthouserc.json)
```

## Arborescence
| Dossier | Rôle |
|---|---|
| `app/[locale]/` | Routes (français sans préfixe d'URL ; `/en/...` quand l'anglais sera ajouté) |
| `components/ui/` | Primitives (bouton, logo) |
| `components/blocks/` | Sections (header, menu mobile, footer) ; les autres arrivent à l'étape 4 |
| `styles/tokens.css` | Tokens Tailwind `@theme` (couleurs, polices, breakpoints, ombres, rayons) |
| `messages/fr.json` | Textes ; `en.json` à créer avec `routing.locales` pour ouvrir l'anglais |
| `lib/site.ts`, `lib/nav.ts` | Coordonnées provisoires et structure du menu |
| `public/assets/`, `content/` | Assets et textes de l'étape 0 |
| `reference/` | Captures du thème Savrio (non versionnées, 125 Mo) |
| `wp-reference/` | WordPress local qui produit `reference/` (non versionné) |

## Tests visuels
`npm run test:visual` construit une variante de test (`NEXT_PUBLIC_VR=1`, dossier `.next-vr`) qui affiche **les textes de la référence** (`tests/visual/fixtures/`), lance le serveur sur le port 3100 et compare à `reference/` : header aux 3 largeurs, footer aux 3 largeurs, sous-menu au survol (1440), menu mobile ouvert (375 et 768). Les zones de contenu remplacé (logo, filigrane du footer) sont masquées des deux côtés avec `data-vr-mask`. Seuil : 1 % (`VR_MAX_DIFF` pour changer). Les sections de l'accueil (`tests/visual/home.spec.ts`) sont comparées au conteneur Elementor correspondant (`tests/visual/fixtures/home-sections.json`, régénéré par `wp-reference/capture/sections.mjs`). Les photos de la démo nécessaires aux tests sont copiées dans `public/vr/` (non versionné) par `tests/visual/prepare-fixtures.mjs`. La comparaison tolère ±1 px de décalage vertical (positions fractionnaires de la référence) et aligne la phase de rendu du footer. Les diffs sont écrits dans `tests/visual/__output__/`. Cette variante ne sert qu'aux tests : le build normal ne contient aucun texte de la démo.

## Régénérer la référence
```bash
cd wp-reference/site && php -d display_errors=0 -S localhost:8080 -t .   # WordPress de référence (admin / admin, local uniquement)
cd wp-reference/capture && node capture.mjs [page ... | states]          # écrit reference/
node pos.mjs 1440     # positions du header : référence vs notre build de test (port 3100)
node fpos.mjs 768     # idem pour le footer
```
Les dépendances de `wp-reference/` sont téléchargées par l'étape 2 (voir `DEPENDENCIES.md`).

## Budget JS (point de tension)
Le brief demande < 100 Ko gzippés de JS client par page. Mesuré sur l'accueil (build de production) : **184 Ko**, dont **~175 Ko pour le socle Next 16 + React 19** (react-dom 70, runtime Next 84, divers) avant tout composant à nous, et ~10 Ko pour le menu mobile. Le budget n'est pas atteignable avec Next App Router seul ; décision à prendre à l'étape 6 (relever le seuil, ou changer d'approche pour les pages de contenu).

## Contenu (MDX validé par Zod)
Un fichier par contenu dans `content/<collection>/<adresse>.mdx` ; le frontmatter est validé au build (`lib/content/schemas.ts`), une erreur donne le fichier et le champ. Collections : `services`, `team`, `blog`, `projects` (adresse `/realisations/...`), `pages` (adresse `/<nom>`, par exemple `conditions`, `offrir`). Une section n'apparaît que s'il y a de vrais contenus : tant que les dossiers sont vides, le site ne montre aucun texte de démonstration.

## SEO
- `NEXT_PUBLIC_SITE_URL` : adresse publique (canoniques, sitemap, Open Graph). `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` : active la mesure d'audience.
- `app/sitemap.ts` (dates de modification réelles), `app/robots.ts`, `app/feed.xml` (RSS du blog), images de partage générées au build (`opengraph-image`), données structurées en `@graph` (`lib/jsonld.ts`).
- Les coordonnées de `lib/site.ts` sont provisoires : `provisional = true` les garde hors des données structurées. Passer à `false` quand elles sont définitives.
- Les pages de classement du blog (catégories, archives, mots-clés), la recherche et les deux variantes de liste du blog sont en `noindex` et hors sitemap.
# batchcooking
