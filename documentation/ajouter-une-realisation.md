# Ajouter une réalisation

Une réalisation = un fichier dans `content/projects/`. Le nom du fichier devient l'adresse : `diner-anniversaire-lattes.mdx` → `/realisations/diner-anniversaire-lattes`.

Rien d'autre à modifier : la page `/realisations`, la galerie `/inspirations`, le sitemap, les données structurées (JSON-LD) et les « réalisations liées » se mettent à jour seuls au prochain build.

## Modèle

```mdx
---
title: 'Un dîner d’anniversaire à Lattes'
date: '2026-12-05'
excerpt: 'Huit convives, un menu en cinq services, dressé à la maison.'
service: chef # batch | chef | cours
categories:
  - 'Dîner privé'
occasion: 'Anniversaire'
city: 'Lattes'
guestCount: 8
guests: '8 convives'
duration: '4 h sur place'
diets:
  - 'Sans gluten'
tags:
  - 'Menu dégustation'
image:
  src: /assets/projects/diner-lattes/cover.jpg
  width: 2000
  height: 1333
  alt: 'Table dressée pour un dîner d’anniversaire'
gallery:
  - src: /assets/projects/diner-lattes/01.jpg
    width: 2000
    height: 1333
    alt: 'Entrée dressée dans une assiette creuse'
menu:
  - 'Velouté de potimarron, éclats de châtaigne'
review:
  quote: 'Une soirée parfaite.'
  author: 'Camille, Lattes'
---

Texte libre de la fiche : le contexte, les envies du client, ce qui a été préparé.
```

Les champs obligatoires sont `title`, `date`, `excerpt` et `image`. Les autres ont une valeur par défaut. Un fichier mal formé fait échouer le build avec le nom du fichier et du champ fautif.

## Ce que fait chaque champ

| Champ | Effet sur le site |
| --- | --- |
| `date` | Ordre de la page `/realisations` (la plus récente en premier). |
| `service` | Onglet de filtre et lien de devis. |
| `occasion`, `city`, `diets`, `tags`, `guestCount` | Pastilles de filtre, affichées à partir de 12 réalisations. |
| `thumbnail` | Photo de la carte verticale, recadrée en 3/2 (à défaut, `image`). |
| `gallery` | Photos de la fiche **et** de la galerie `/inspirations`. |
| `related` | Fiches à montrer en bas de page (à défaut, même catégorie). |
| `order` | Rang manuel, utilisé pour les liens précédent/suivant et l'aperçu de l'accueil. |

## Photos

- Mettez-les dans `public/assets/projects/<nom-du-projet>/`.
- Indiquez `width` et `height` réels, et un `alt` qui décrit l'image (utile pour l'accessibilité et le SEO).
- Une photo ajoutée à `gallery` apparaît aussi sur `/inspirations`.

## Affichage de la page

- Une seule liste de cartes verticales (photo, puis zone blanche), les plus récentes en premier, avec un filtre par service (batch cooking, dîner privé, cours de cuisine). Un service sans projet n'a pas d'onglet.
- 12 réalisations s'affichent d'abord, puis « Voir plus » en révèle 12 de plus. Toutes les fiches restent dans le HTML.
- Les pastilles de filtre (occasion, commune, taille du groupe, régime, tags) apparaissent à partir de 12 réalisations. Seuils : `pageSize` et `tagFilterFrom` de `RealisationsGallery`.

## Avant de publier

1. Lancez `npm run build` : il valide tous les fichiers.
2. Lancez `npm run test:seo` : il contrôle titre, description, images et liens de chaque page du sitemap.
