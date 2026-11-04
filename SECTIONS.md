# SECTIONS.md : sections par page et widget Elementor source

Étape 1. Les widgets propriétaires portent le préfixe `mtfe-` (dossier `plugins/modeltheme-core/widgets/<nom>`). Les widgets Elementor natifs sont écrits tels quels. « Adaptation » = équivalent batch cooking proposé, **sans reprendre les textes de la démo**.

Les deux démos partagent le même contenu : le tableau « Accueil » vaut pour `Private Chef & Dining`, et la page `Mobile Bar & Cocktails` réutilise presque les mêmes widgets avec le skin violet/menthe.

## Éléments globaux

### Header (modèle `Header #2 Savrio`, trois variantes : générique, Home, Home Bar)
| Bloc | Widget source | Adaptation |
|---|---|---|
| Barre supérieure sombre (`#1B1F1D`, masquée en tablette et mobile) : annonce, zone, téléphone, e-mail | `mtfe-icon-text` ×4 | Annonce de disponibilité, zone, téléphone, e-mail |
| Barre principale (fond `#F4F3EF`, filet `#E6E4DD`) : logo, menu, recherche, bouton | `mtfe-logo`, `mtfe-navigation`, `mtfe-search`, `mtfe-animated-button` | Logo provisoire en texte, menu du site, bouton « demander un devis » |
| Header mobile (≤ 1024 px) : logo et menu hamburger | `mtfe-logo`, `mtfe-navigation` | Seul composant client avec les accordéons et le formulaire |
| Bandeau titre de page (fil d'Ariane, titre) sur pages intérieures | `mtfe-breadcrumbs` | BreadcrumbList en JSON-LD |

### Menu principal (`menus.json` : `hb-primary-navigation` → « menu », `hb-menu-mobile` → « mobile-menu »)
Home (avec Private Chef & Dining Home, Mobile Bar & Cocktails Home), Our Services (Single Service), Pages (Our Story `/about/`, Meet the Chefs `/our-team/`, Our Events `/portfolio/` avec Single Event, Single Member, Blog Right Sidebar, Single Article), Journal `/blog`. Éléments de pied : Booking Terms, quatre questions de FAQ.

### Footer (modèle `Footer #2` et `Footer #2 Bar`)
| Bloc | Widget source |
|---|---|
| Bandeau CTA en dégradé vert (sur-titre, titre, texte, deux boutons) | `heading`, `text-editor`, `button` ×2 |
| Colonnes : marque + réseaux ; Services ; Company ; Visit & Contact | `mtfe-logo`, `text-editor`, `social-icons`, `heading`, `icon-list` |
| Filigrane du nom de marque en contour (`text-stroke`) | `heading` (classe `savrio-footer-mark`) |
| Ligne basse : copyright, liens légaux, signature | `heading`, `icon-list` inline |
| Bouton retour en haut | fonction du thème |

### Autres modèles
- **Sidebar** (colonne latérale du blog et menu latéral) : `mtfe-logo`, adresse, e-mail, `social-icons`. Widgets de la barre latérale : recherche, catégories, nuage d'étiquettes, articles récents avec miniature.
- **MT - Dual Header** : titre de section « mot normal + mot mis en avant » avec sur-titre.

## Accueil (« Private Chef & Dining »)  : 19 sections
| # | Section | Widget | Adaptation batch cooking |
|---|---|---|---|
| 1 | Hero : étiquette, titre en deux temps, deux boutons, ligne de preuve, vidéo de fond | `mtfe-dining-hero` | Image LCP à la place de la vidéo |
| 2 | Demande rapide : date, nombre d'invités, lieu, bouton | `mtfe-quick-inquiry` | Formulaire de demande rapide (Server Action) |
| 3 | « Dining experiences » : cartes d'expériences | `mtfe-experience-cards` | Formules de batch cooking |
| 4 | Présentation du chef : image, pastille de note, citation | `mtfe-media-split` (fond dégradé sombre) | Présentation de la cheffe ou du chef |
| 5 | À propos : badge « 25+ ans », pastille, titre, bouton | `mtfe-about-us` | À propos |
| 6 | Menus types : onglets et panneau, PDF | `mtfe-sample-menus` | Exemples de menus de la semaine |
| 7 | Bande photo « From our table » | `mtfe-photo-strip` | Photos de plats |
| 8 | « What's included » : image, badge d'assurance | `mtfe-media-split` (image à droite) | Ce qui est inclus |
| 9 | Titre de section « Our Recent Events » | `mtfe-dual-header` | |
| 10 | Réalisations récentes (carrousel) | `mtfe-savrio-projects-portfolio` | Réalisations, CPT `mt_portfolio` |
| 11 | Photos empilées + ligne de preuve (desktop et mobile) | `mtfe-stacked-photos`, `heading` ×2 | |
| 12 | Étapes « How it works » (fond vert) | `mtfe-evening-steps` | Comment ça marche |
| 13 | Carrousel de logos | `mtfe-client-carousel` | À omettre sans partenaires réels |
| 14 | « Occasions we cook for » | `mtfe-dual-header`, `mtfe-brand-showcase`, `mtfe-animated-button` | Occasions ou formules |
| 15 | Avis « Loved by Our Guests » | `mtfe-dual-header`, `mtfe-savrio-reviews` | Vrais avis uniquement |
| 16 | Équipe « Your Chefs & Bartenders » | `mtfe-dual-header`, `mtfe-savrio-our-team` (CPT `mt_team`) | Équipe |
| 17 | « Trusted by 100+ venues » + logos | `heading`, `mtfe-client-carousel` | À omettre sans preuve réelle |
| 18 | « Request a proposal » : argumentaire + formulaire (`#proposal`) | `heading`, `text-editor`, `icon-list`, `shortcode` (CF7 « Dining Proposal ») | Formulaire de devis |
| 19 | « Notes From Our Kitchen » : derniers articles + bouton | `mtfe-dual-header`, `mtfe-posts-pristine`, `mtfe-animated-button` | Derniers articles |

## Pages intérieures
| Page | Sections (dans l'ordre) |
|---|---|
| **Mobile Bar & Cocktails** (accueil secondaire, skin bar) | `mtfe-dining-hero`, `mtfe-quick-inquiry`, `mtfe-experience-cards`, `mtfe-media-split`, `mtfe-about-us`, `mtfe-sample-menus`, `mtfe-photo-strip`, `mtfe-media-split`, `mtfe-dual-header` + `mtfe-savrio-projects-portfolio`, `mtfe-evening-steps`, `mtfe-client-carousel`, `mtfe-brand-showcase`, `mtfe-animated-button`, `mtfe-savrio-reviews`, `mtfe-savrio-our-team`, devis (CF7 « Bar Quote »), `mtfe-posts-pristine` |
| **About** | `mtfe-about-us`, `mtfe-media-split`, `mtfe-dual-header` + `mtfe-savrio-our-team`, `mtfe-client-carousel` |
| **Services** | `mt_service_grid` (carte v4, lien « View Program »), `mtfe-stacked-photos`, `mtfe-savrio-reviews`, `mtfe-client-carousel`, `mtfe-posts-pristine` |
| **Service (détail)** ×6 (`mt_service`) | En-tête modèle `11422`, héro pleine largeur, titre affiché, services liés (4 par 4) |
| **Our Team** | `mtfe-savrio-our-team`, `mtfe-client-carousel`, devis, `mtfe-brand-showcase`, `mtfe-animated-button` |
| **Membre (détail)** ×8 (`mt_team`) | Sidebar à gauche, titre masqué |
| **Pricing Plans** | `mtfe-service-pricing`, `mtfe-savrio-reviews`, `mtfe-projects-dropdown` |
| **FAQ** | `accordion` (icône à droite, fond blanc), `mtfe-shaped-video` ×2 (masque SVG), `mtfe-animated-progress`, bloc « personalised menu » (`heading`, `text-editor`, `mtfe-animated-button`), `mtfe-savrio-reviews`, `mtfe-savrio-projects-portfolio` |
| **Contact** | `mtfe-dual-header`, `icon-list`, `social-icons`, `shortcode` (CF7 « Event Inquiry ») |
| **Blog / Blog No Sidebar / Blog Left Sidebar** | Gabarits PHP `template-blog*.php` : liste avec ou sans barre latérale |
| **Blog Grid** | `mtfe-posts-pristine` (6 articles, ratio 16/9, date `M j, Y`) |
| **Article (détail)** ×6 (`post`) | Gabarit `single.php`, barre latérale à droite par défaut (`savrio_blog_single_layout`), en-tête modèle `11422` |
| **Portfolio (liste et détail)** ×6 (`mt_portfolio`) | Cartes ratio 3/4, 3 colonnes ; détail avec image dans le contenu, titre masqué |
| **Avis** ×5 (`mt_testimonials`) | Alimente `mtfe-savrio-reviews` |
| **404, recherche** | `404.php`, `mtfe-search` |

## Widgets à reproduire (liste de travail pour l'étape 4)
`dining-hero`, `quick-inquiry`, `experience-cards`, `media-split`, `about-us`, `sample-menus`, `photo-strip`, `dual-header`, `savrio-projects-portfolio`, `stacked-photos`, `evening-steps`, `client-carousel`, `brand-showcase`, `animated-button`, `savrio-reviews`, `savrio-our-team`, `posts-pristine`, `service-pricing`, `shaped-video`, `animated-progress`, `projects-dropdown`, `mt_service_grid`, plus `accordion`, `icon-list`, `social-icons`, `breadcrumbs`, `search`, `logo`, `navigation` pour le header et le footer.

Les autres dossiers de `widgets/` (`car-estimator`, `countdown`, `content-switcher`, `informative-board`, `savrio-calculator`, etc.) ne sont **pas utilisés** par les pages importées ; ils ne sont pas à reproduire sauf décision contraire.

## Contenus de démo à remplacer
4 services + 2 supplémentaires (Wedding Dinners, Corporate Dinners), 8 membres d'équipe, 6 réalisations, 5 avis, 6 articles, 7 formulaires CF7, 80 médias.
