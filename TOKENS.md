# TOKENS.md : design tokens extraits de Savrio

Étape 1 : analyse statique de la source, aucun rendu. Les valeurs viennent de `options.json` (identique à `theme/savrio/inc/default.json`), du kit Elementor (`content.xml`), du CSS des widgets `plugins/modeltheme-core/widgets/*/css` et du Sass du thème. **Elles seront recoupées avec les styles calculés du WordPress local à l'étape 2** ; les lignes marquées (?) sont à confirmer à ce moment.

## 0. Constats qui orientent la suite
- `main-home` et `mobile-bar-cocktails` ont un `content.xml` et un `options.json` **identiques** : une seule base de contenu. Seule la page d'accueil change (`homes.json` : « Private Chef & Dining » ou « Mobile Bar & Cocktails »).
- Le Sass du thème (`utils/_vars.scss` : `#235787`, `#c3512f`, police système, conteneur 1200) est un **héritage du thème de base et n'est pas utilisé** par le design Savrio. La vraie palette vient des options, du kit Elementor et des widgets.
- Deux « skins » : le skin par défaut (vert) et `savrio-skin-bar` (violet et menthe), appliqué par une classe de `body` (`savrio-skin-<skin>`, `functions.php`). Il s'applique à la page Mobile Bar.

## 1. Couleurs

### Skin par défaut (vert)
| Token | Valeur | Usage |
|---|---|---|
| `ink` | `#1B1F1D` | Texte titres, fonds sombres, barre top du header, kit « Primary » |
| `forest` | `#234A3A` | Bouton principal, liens, kit « Secondary/Accent », section « How it works » |
| `forest-dark` | `#1A382C` | Hover bouton et liens, fin de dégradé footer |
| `forest-mid` | `#2F5E4A` | Début du dégradé du bandeau CTA du footer |
| `sage` | `#A9C4A2` | Accent clair sur fonds sombres, icônes header, sélection de texte, hover des liens du footer |
| `sage-soft` | `#C3D6BD` / `#C5D7BF` | Sur-titres du footer et des sections sombres |
| `cream` | `#F4F3EF` | Fond du header, texte sur fonds sombres, fond de champs |
| `ivory` | `#FBFAF7` | Texte des boutons, fond de cartes |
| `sand` | `#E6E4DD` | Bordures, fond des sections avis (aussi `#ECE7DC`, `#E0DDD4`) |
| `text` | `#5A605C` | Texte courant (kit « Text ») |
| `surface-dark` | `#262C29` | Carte d'avis active |
| `footer` | `#111412` | Fond du footer |
| `hero-gradient` | `#1B1F1D` → `#21352B` | Fond de la section « media-split » sombre |
| `tag-bg` | `rgba(169,196,162,.20)` (hover `.76`) | Étiquettes d'articles |
| `on-dark-text` | `rgba(244,243,239,.78)`, `.66`, `.52` | Niveaux de texte sur fond sombre |
| `on-dark-line` | `rgba(244,243,239,.12)` | Filets du footer |

Section « Request a proposal » (accueil) : palette propre en bordeaux, hors du vert : fond `#3F1420`, accent `#E8C4CC`, texte `#F6F1E7`, titre du formulaire `#5A1E2B`, texte secondaire `#6E5A5F`. À adapter ou à unifier (voir §9).

### Skin « bar » (violet et menthe)
`#2A1733` (titres), `#6E3784` (accent/labels), `#7FD8BE` (accent menthe, bouton), `#A6E6D3`, `#62C6A9`, `#F3F0F5` (fond clair), `#3A2347`, `#321D3D`, `#1A0D21` (fonds sombres), `#5B2A6E`, `#D6CCE0` et `#E2DAE8` (filets), `#625A6B` (texte). Le skin redéfinit les variables locales des widgets (`--sm-*`, `--qi-*`, `--xc-*`).

## 2. Typographie
| Rôle | Police | Graisses | Source |
|---|---|---|---|
| Corps, boutons, labels | **Plus Jakarta Sans** (Google) | 300, 400, 500, 600, 700, 800 | `body_typo`, kit « Text/Accent » |
| Titres | **Outfit** (Google) | 400, 500, 600, 700 (titres en 600) | `h1…h6_typo`, kit « Primary/Secondary » |

Aucune police système en repli côté Savrio. Les widgets lisent `--mtfe-site-font-body` et `--mtfe-site-font-h2`.

| Niveau | Desktop | Tablette | Mobile | Notes |
|---|---|---|---|---|
| Corps | 16 px | | | graisse 400 |
| H1 | 70 px | 54 / lh 64 | 54 / lh 64 | `line-height` desktop saisi à 10 px (valeur manifestement erronée, ne pas reproduire) |
| H2 | 70 px / lh 70 | 45 / lh 56 | 45 / lh 56 | kit « Primary » : 45 px |
| H3 | 35 px | 28 / lh 35 | 28 / lh 35 | |
| H4 | non réglé | 20 / lh 24 | | |
| H5 | non réglé | 18 / lh 22 | | |
| H6 | non réglé | 18 | | |
| Navigation | 16 px | | | |
| Sous-menu | 15 px | | | |
| Bouton | 16 px, graisse 500, `letter-spacing` .5 px, `capitalize` | | | boutons du thème ; le widget « animated-button » a ses variables (`--mtfe-ab-*`) |
| Sur-titre (kicker) | 13 px, `letter-spacing` .16 em, majuscules, graisse 700 | | | |

Tailles fluides les plus fréquentes dans les widgets : `clamp(2rem, 4vw, 3.5rem)`, `clamp(36px, 3.7vw, 58px)`, `clamp(48px, 5.3vw, 88px)` (hero), `clamp(1.1rem, 1.4vw, 1.35rem)` et `clamp(0.95rem, 1.1vw, 1.12rem)` (texte), `clamp(3rem, 9vw, 9rem)` (filigrane).

## 3. Grille et conteneurs
- Conteneur Elementor « boxed » : **1320 px** (41 occurrences) ou **1350 px** (39) ; 1850 et 1870 px pour les sections pleine largeur contenue. Le Sass hérité indique 1200 px (non utilisé). (?) à mesurer.
- Gouttière horizontale : 40 px (desktop), 24 à 26 px (tablette), 10 à 16 px (mobile).
- Écart (gap) de flex : 0 la plupart du temps, 10 / 18 / 40 px selon les blocs.
- Grilles de cartes : 3 colonnes (portfolio, boutique), 4 colonnes (services liés), ratio 3/4 pour les cartes service et portfolio, 16/9 pour les articles du blog grille.

## 4. Espacements
Rembourrage vertical de section : **100 px** (desktop), **72 px** (tablette), **56 px** (mobile), avec 40 / 26 / 16 px latéraux. Autres valeurs récurrentes : 56 px (desktop, blocs secondaires), 22 px, 32 px. Valeurs fluides : `clamp(4rem, 7vw, 7rem)`, `clamp(2.25rem, 5vw, 4rem)`. Cartes d'articles : rembourrage 40 px, marge basse 40 px. Boutons : 18 px 32 px. Champs de formulaire : rayon 8 px.

## 5. Rayons
`50%` (pastilles, avatars, bouton retour en haut), `999px` / `100px` (boutons pilule), `4px` (bouton animé par défaut), `8px` (champs, cartes boutique), `10px`, `12px`, `14px`, `16px`, `18px`, `20px` (cartes, conteneurs), `22px`, `24px`, `30px` (grands conteneurs). Le rayon des cartes d'article est tronqué dans l'export (?).

## 6. Ombres
| Usage | Valeur |
|---|---|
| Menu déroulant | `0 3px 30px rgba(25,30,35,.1)` |
| Carte légère | `0 2px 12px rgba(0,0,0,.06)` |
| Carte au survol | `0 8px 24px rgba(27,31,29,.14)` ou `0 8px 20px rgba(38,44,41,.15)` |
| Carte élevée | `0 12px 30px rgba(27,31,29,.22)` |
| Bouton accent | `0 14px 30px rgba(169,196,162,.45)` (menthe : `rgba(127,216,190,.45)`) |

Beaucoup de composants n'ont aucune ombre (`box-shadow: none`).

## 7. Breakpoints
| Nom | Règle | Source |
|---|---|---|
| Mobile | ≤ 767 px | Elementor `viewport_md: 768`, 37 occurrences dans les widgets |
| Tablette | 768 à 1024 px | Elementor `viewport_lg: 1025`, 29 occurrences |
| Desktop | ≥ 1025 px | 10 occurrences |
| Compléments | 480, 640, 900, 1279 px | cas isolés |

Les captures de référence à **375 px** (mobile), **768 px** (tablette, première largeur du palier tablette) et **1440 px** (desktop) tombent bien dans chacun des trois paliers. Le header desktop disparaît en dessous de 1025 px au profit du header mobile.

## 8. Mouvement et comportements
- Transitions : `color .3s ease`, `transform .3s/.4s/.7s ease`, ressort `cubic-bezier(.34,1.56,.64,1)` (.4 s), `cubic-bezier(.2,.7,.2,1)` (.6 s) avec `box-shadow .5s`.
- Animations d'entrée Elementor `fadeInUp`, entrée et flottement des blocs du hero (`--sh-enter-dur .8s`, `--sh-float-dur` 4 à 5 s). `prefers-reduced-motion` est géré par 30 règles : à conserver.
- **Header non collant dans la démo** : `savrio_is_nav_sticky = 0`. Le brief demande un header sticky : écart à arbitrer (§9).
- Préchargeur activé (`savrio_enable_preloader`, style « minimal », fond `#F4F3EF`) : à ne pas reproduire (coût sur le LCP).
- Bouton retour en haut : fond `#234A3A`, icône `#FBFAF7`, rond (rayon 50 %).
- Recherche : superposition plein écran, fond `rgba(27,31,29,.96)`.
- Menu mobile et accordéons : JS jQuery dans la démo, à réécrire en composants clients minimaux.

## 9. Tensions et décisions à prendre
1. **Deux familles de polices** (Outfit + Plus Jakarta Sans) contre « 1 famille variable » du brief. Options : (a) Outfit seule pour tout, (b) Plus Jakarta Sans seule, (c) garder les deux avec un seul fichier variable chacune. La (c) respecte la fidélité, la (a) ou (b) respecte le brief.
2. **Header sticky** demandé, absent de la démo : l'ajouter est un écart assumé.
3. **Vidéo YouTube en arrière-plan du hero** dans la démo : incompatible avec LCP < 2 s et hero < 150 Ko. Remplacement par une image.
4. **Palette bordeaux de la section « proposal »** et **skin violet/menthe** : à décider, soit les conserver tels quels, soit les aligner sur le vert pour le batch cooking.
5. **Plusieurs jQuery et bibliothèques** (isotope, magnificPopup, carrousels) : à remplacer par du CSS pur et des composants légers, au prix d'écarts visuels mineurs possibles.

## 10. Mesures du header et du footer (étape 3, styles calculés du WordPress de référence)
Complète les valeurs lues dans les fichiers : celles-ci priment en cas d'écart.

**Header desktop (≥ 1025 px)** : barre d'annonce 38 px (`#1B1F1D`, texte 13/500, icônes 12 px, écart entre éléments 28 px, icône→texte 8 ou 15 px) ; barre principale 82 px + filet 1 px `#E6E4DD` (`#F4F3EF`). Conteneur 1320 px centré (gouttière 20 px). Logo dans une boîte de 224 px, menu centré dans l'espace restant (liens `padding 10 13`, 16/500, 1 px entre liens, chevron 14,66 px de large), groupe de droite 291 px (recherche 17 px, écart 18 px, bouton 211×50, pilule, 16/600, flèche dans une boîte de 22 px). Sous-menu : largeur 192 px, fond `#F2F0EA`, rayon bas 20 px, ombre `0 2px 4px -2px rgb(0 0 0/.1), 0 4px 15px rgb(0 0 0/.1)`, liens 15/500 `#484848` (survol `#000`), `padding 6 20`. Survol d'un lien : couleur `#234A3A`.

**Header tablette et mobile (≤ 1024 px)** : barre `#F4F3EF`, filet 1 px ; hauteur 148 px à 768 (logo 364×99, marge 10 px) et 72 px à 375 (logo 172×47). Le logo est affiché très grand en tablette dans la démo. Burger 30×22,5 px, trois traits de 2 px, pas de 10,25 px. Panneau : 300 px, `#111`, `padding 70 30 30`, ombre `5px 0 15px rgb(0 0 0/.5)`, fond `rgb(0 0 0/.85)`, entrées de 45 px.

**Footer** : fond `#111412`. Bandeau : `linear-gradient(120deg, #2F5E4A, #1A382C)`, rayures `repeating-linear-gradient(135deg, rgb(255 255 255/.06) 0 1px, transparent 1px 14px)` masquées à gauche (`linear-gradient(90deg, transparent 0, #000 55%)`), halo `radial-gradient(circle at 88% 50%, rgb(255 255 255/.14), transparent 45%)`. Titre 68/68 (desktop) puis 45/56 ; boutons 15/700, `padding 20 32`, pilules. Colonnes 409 / 225 / 224 / 462 px (desktop), 2 colonnes (tablette), `padding 56 32` / `40 24` / `32 0`. Titres de colonne 12 px (desktop) et **20 px** (tablette et mobile, h4 du thème), pas de liste 38 px. Filigrane : Outfit 700, 331,2 px (desktop), 176,6 px (tablette), 86,3 px (mobile), contour 2 px `rgb(169 196 162/.55)`, interlettrage −0,04 em, hauteurs 257 / 160 / 82,5 px. Barre basse 73 / 68,5 / 122,5 px.
