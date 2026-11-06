# Étape 0 : préparation des assets (à fournir)

Cocher chaque ligne une fois le fichier déposé. Ne rien reprendre de la démo Savrio (textes, photos, logo).

## Décisions
- [x] Langue principale : français. Anglais plus tard : structure évolutive (routage `/[locale]` prévu, textes hors des composants, next-intl à l'étape 3, hreflang et x-default activés au moment de l'ajout)
- [ ] Nom de marque : à décider (provisoire : « chefmeemz », non définitif)
- [ ] Logo : à décider (placeholder texte en attendant)
- [ ] Domaine : ______
- [ ] Zone géographique desservie (LocalBusiness) : ______
- [ ] Adresse e-mail de contact / réception des demandes : ______
- [ ] Analytics : Plausible ou Umami
- [ ] Hébergement : à décider (contexte personnel ou Teads)
- [ ] Licence ThemeForest vérifiée (themeforest.net/licenses)

## Pages : identiques à la démo Savrio (main-home), adaptées au batch cooking
Source : `demo-data/main-home/content.xml`.

| Page démo | Équivalent batch cooking | Contenu |
|---|---|---|
| Home | Accueil | `pages/` |
| Private Chef & Dining | Page service principale (batch cooking à domicile) | `pages/` |
| About | À propos | `pages/` |
| Services (+ 4 services en détail) | Services / formules | `pages/`, un fichier par service |
| Our Team (4 à 8 membres) | Notre équipe | `pages/`, un fichier par membre |
| Pricing Plans | Tarifs | `pages/` |
| FAQ | FAQ | `faq/` |
| Contact | Contact / demande de devis | `pages/` |
| Blog, Blog Grid, Blog No Sidebar, Blog Left Sidebar | Blog (toutes les variantes gardées) | `blog/` (6 articles dans la démo) |
| Portfolio (6 réalisations) | Réalisations (menus, événements) | `pages/` |
| Testimonials (5) | Avis | `avis/` |
| Mobile Bar & Cocktails (démo `mobile-bar-cocktails`) | Page gardée, à adapter plus tard | `pages/` |

Rien n'est écarté pour l'instant : le nettoyage se fera quand le sitemap sera décidé.
Pages légales (mentions, confidentialité, CGV) à ajouter, absentes de la démo.

## Assets → `public/assets/`
| Dossier | Contenu attendu | Fait |
|---|---|---|
| `logo/` | Logo SVG (variantes claire et sombre), favicon source ≥ 512 px | [ ] |
| `hero/` | 1 photo large ≥ 2400 px (cible finale AVIF < 150 Ko) | [ ] |
| `plats/` | 6 à 12 photos de plats ≥ 1600 px, nommées `nom-du-plat.jpg` | [ ] |
| `equipe/` | Portraits ≥ 800 px | [ ] |
| `og/` | Image Open Graph par défaut 1200×630 | [ ] |

Pour chaque photo, noter un alt descriptif dans `plats/alts.md` (ou équivalent).

## Textes → `content/`
| Dossier | Contenu attendu | Fait |
|---|---|---|
| `pages/` | Un fichier `.md` par page (accueil, à propos, tarifs, etc.) | [ ] |
| `faq/` | 8 à 10 questions/réponses | [ ] |
| `avis/` | Vrais avis uniquement : nom, date, source, texte (sinon pas de section Avis) | [ ] |
| `blog/` | 2 à 3 articles de départ en `.mdx` avec frontmatter : title, description, date, updated, catégorie, auteur, image | [ ] |

Un fichier légal par page (mentions légales, confidentialité, CGV) dans `pages/`.

## Dossiers de travail
