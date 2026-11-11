# Assets et contenus à fournir

Cocher chaque ligne une fois le fichier déposé.

## Décisions
- [x] Langue principale : français. Anglais plus tard : structure évolutive (routage `/[locale]` prévu, textes hors des composants, hreflang et x-default activés au moment de l'ajout)
- [x] Nom de marque : « Table et Tribu » (définitif)
- [ ] Logo : à décider (placeholder texte en attendant)
- [ ] Domaine : ______
- [ ] Zone géographique desservie (LocalBusiness) : ______
- [ ] Adresse e-mail de contact / réception des demandes : ______
- [ ] Analytics : Plausible ou Umami
- [ ] Hébergement : à décider

## Pages du site
Accueil, Services (batch cooking, chef privé, cours de cuisine), Tarifs, Recettes, Réalisations (+ détail), Zones d'intervention, FAQ, Contact, recherche, pages légales (mentions légales, confidentialité, CGV), 404.

## Assets → `public/assets/`
| Dossier | Contenu attendu | Fait |
|---|---|---|
| `logo/` | Logo SVG (variantes claire et sombre), favicon source ≥ 512 px | [ ] |
| `hero/` | 1 photo large ≥ 2400 px (cible finale AVIF < 150 Ko) | [ ] |
| `plats/` | 6 à 12 photos de plats ≥ 1600 px, nommées `nom-du-plat.jpg` | [ ] |
| `og/` | Image Open Graph par défaut 1200×630 | [ ] |

Pour chaque photo, noter un alt descriptif dans `plats/alts.md` (ou équivalent).

## Textes → `content/`
| Dossier | Contenu attendu | Fait |
|---|---|---|
| `projects/` | Réalisations en `.mdx` avec frontmatter validé (`lib/content/schemas.ts`) | [ ] |
| `pages/` | Pages légales en `.mdx` : mentions légales, confidentialité, CGV (et, plus tard, conditions, offrir) | [ ] |
