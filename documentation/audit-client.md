# Audit « client potentiel » du site Chef Meemz (2ᵉ version)

Date : 8 novembre 2026. Audit refait **de zéro** sur l'état actuel du code (arbre de travail non commité : réorganisation en `layout/`, `features/`, `ui/`, nouvelle page `/a-propos`, nouveaux blocs, pages de service recomposées). Lecture seule : aucun fichier du site n'a été modifié.

**Périmètre relu :** toutes les routes (`/`, `/a-propos`, `/services`, les trois pages de service, `/tarifs`, `/recettes`, `/realisations` et ses 9 fiches, `/zones`, `/faq`, `/contact`, `/recherche`, `/cgv`, `/confidentialite`, `/mentions-legales`, 404), l'en-tête, le pied de page, `messages/fr.json`, `content/`, `lib/` (prix, recettes, coordonnées, zones), les formulaires (modale de rappel, devis chef privé et cours, demande rapide, contact), `/api/lead` et l'action du formulaire de contact. J'ai aussi relevé **ce que chaque page affiche réellement** (certains textes existent dans `fr.json` mais ne sont plus affichés).

**Non vérifié :** le rendu réel (bureau et mobile), l'accessibilité, les images (visuels provisoires). Pas de navigateur : tout vient du code et des textes. `tsc` et `eslint` passent sur l'état actuel. Les points « Cheffe » sont des informations que seule la cheffe connaît : je n'ai rien inventé.

---

## 0. Ce qui a changé depuis le 1ᵉʳ audit

**Réglé ou amélioré**
- Le badge « 4,9 / 5 selon 380 hôtes » a disparu de `home.chef`.
- Le libellé « Chef privé & expériences gastronomiques » est devenu « Chef privé à domicile » partout (menu, pied de page, SEO).
- Le menu principal a une entrée « À propos » et un lien « Zones d'intervention » ; la page `/a-propos` existe et figure dans le sitemap.
- La page `/zones` précise que la liste de communes n'est qu'un exemple (bloc « Votre ville ou village n'est pas cité ? »).
- La page batch cooking est plus courte : étapes illustrées, formules, FAQ.

**Régressions et nouveaux problèmes**
- 🔴 **Les faux avis du template sont revenus** : `home.reviews` (Kathrine Katija, Mount Pleasant ; Marcus Chen, Harbor & Vine, « bar mobile », 180 invités ; Elena Rostova, Wild Dunes Resort) s'affichent sur **l'accueil et sur `/a-propos`** sous le titre « Hôtes vérifiés ». Ce sont les avis du modèle américain, supprimés lors du nettoyage.
- 🔴 **Le badge « Avis Google ★★★★★ »** est revenu dans le hero et dans la présentation de la cheffe (`TrustBar`) : pas de note, pas de nombre d'avis, pas de lien.
- 🟠 **Des informations ont disparu des pages de service** (les textes existent encore dans `fr.json`, mais aucune page ne les affiche) : sur le batch, la liste « ce qui est inclus », les régimes, la conservation, l'exemple de semaine et le déroulé ; sur le chef privé, les menus d'exemple, les occasions, « tout est compris » et la section Tarifs avec ses notes (courses incluses, acompte, annulation, déplacement) ; sur les cours, la section « bon cadeau » et le déroulé.
- 🟠 **La page d'accueil n'a plus de lien « Contact »** dans le menu (il reste le bouton « Réservez votre chef » et le pied de page) et le pied de page n'a pas de lien vers `/a-propos`.
- 🟠 **Nouvelle ambiguïté sur les zones** : « du moment que vous habitez dans la zone d'intervention… nous pouvons vous servir » (page Zones) alors que la zone 3 impose un supplément ou un forfait important.
- Inchangés depuis le 1ᵉʳ audit : les problèmes 1 à 3 et 5 du résumé ci-dessous.

---

## 1. Résumé : les 6 problèmes les plus graves

1. **Les demandes des clients ne partent nulle part.** `app/api/lead/route.ts` se termine par `// TODO : envoyer lead…` et un `console.info`. Le formulaire de contact répond « Le formulaire n'est pas encore disponible » tant que `PROPOSAL_WEBHOOK_URL` n'est pas défini. L'accusé de réception promis par e-mail n'est pas envoyé non plus.
2. **Coordonnées factices sur toutes les pages** : « Appeler le 01 23 45 67 89 » dans le bandeau du pied de page, adresse « 12 rue Exemple, 75000 Ville », réseaux sociaux en `#`, nom « Table&Tribu » (le reste du site dit « Chef Meemz »).
3. **Pages légales pleines de « [À compléter] »** (36 occurrences : SIRET, assurance, HACCP, agrément services à la personne, médiateur, annulation, paiement). Les CGV contredisent en plus les pages de service.
4. **Faux avis et fausse preuve sociale** : avis américains du template sur l'accueil et `/a-propos`, « Avis Google ★★★★★ » sans note ni lien, « Hôtes vérifiés ».
5. **« Plus de 40 recettes » alors que `/recettes` n'en montre que 5.** C'est la promesse centrale du batch cooking.
6. **Le prix du batch cooking ne répond pas à la vraie question du client** : prix « par semaine » ou « par passage », identique quelle que soit la taille du foyer, aucun total mensuel, crédit d'impôt affiché « tout de suite » alors que la FAQ dit « sous réserve d'éligibilité ».

---

## 2. Tableau des incohérences

| # | Sujet | Endroit A | Endroit B | Correction proposée |
|---|---|---|---|---|
| I1 | Nombre de recettes | « Plus de 40 recettes » (accueil, services, formule Sérénité, étapes, FAQ, modale, confirmation, SEO) | `lib/recipes.ts` : 5 recettes ; carrousel : 5 | Publier les 40 recettes, ou écrire « Une sélection de recettes qui s'enrichit ». À confirmer par la cheffe. |
| I2 | Avis affichés | Accueil et `/a-propos` : 3 avis américains (Mount Pleasant, Harbor & Vine, Wild Dunes) avec « bar mobile » et « 180 invités » | Site de batch cooking à Montpellier ; l'audit précédent et le nettoyage les avaient supprimés | Retirer `home.reviews` tant qu'il n'y a pas de vrais avis signés ; sinon les remplacer. |
| I3 | Avis Google | Hero et `/a-propos` : « ★★★★★ Avis Google » | Aucun lien, aucune note, aucun nombre | Ajouter la note réelle et le lien vers la fiche Google, ou retirer. |
| I4 | « Hôtes vérifiés » | Titre de la section avis | Aucun mécanisme de vérification | Retirer « vérifiés » ou expliquer la vérification. |
| I5 | Unité du prix batch | « {prix} € **par semaine** » (cartes) | FAQ : « 49,50 € **par passage** » | Un seul terme : « par semaine (1 passage) ». |
| I6 | Prix de départ du chef privé | FAQ : « dîner privé dès **35 €** par personne » ; page Tarifs : « Dès 35 € » | 35 € = cocktail à partir de 10 convives ; dîner assis = **75 €** par personne | « Cocktail dès 35 €/pers. (10 min.), buffet dès 45 €, dîner assis dès 75 € ». |
| I7 | Prix chef privé sur la page Services | Tableau comparatif : « **Sur devis** » | Page Tarifs : 35 / 45 / 75 € par personne affichés | Afficher « dès 75 €/pers. (dîner assis) » dans le comparatif. |
| I8 | Prix de départ des cours | FAQ : « cours dès **45 €** par personne » ; page Tarifs : « Dès 45 € » | 45 € = atelier enfants (par enfant) ; couple/amis 65 € (tableau) ou 75 € (carte Menu 3 temps) ; individuel 90 € | Détailler par format. |
| I9 | Prix « en couple ou entre amis » | Tarif cours : **65 €**, 2 à 8 pers. | Carte « Menu 3 temps » (2 à 8 pers.) : **75 €** | Aligner ou expliquer. |
| I10 | Participants aux cours | FAQ : « de **1 à 8** personnes » | EVJF : « 4 à **12** » ; enfants : « 2 à 6 » | « 1 à 12 selon le format ». |
| I11 | Durée des cours | FAQ : « de **2 h 30 à 3 h 30** » | Cartes : 2 h, 3 h, 3 h 30 | Reprendre les durées réelles. |
| I12 | Nombre de formules | Chef privé : « **Quatre** formules » ; cours : « **Quatre** cours clés en main » | 3 cartes dans chaque cas | « Trois formules » ou ajouter la 4ᵉ. |
| I13 | Zone : Mèze | Titre SEO et FAQ batch : « Montpellier, de **Mèze** et de Lunel » | `/zones` : Mèze n'existe pas | Ajouter Mèze avec sa zone ou la retirer. |
| I14 | Zone : Lunel | FAQ batch : intervention « de Lunel » | `/zones` : Lunel en zone 3, « sur demande », batch réservé à l'abonnement hebdomadaire | Le dire sur la page batch. |
| I15 | « La zone d'intervention » | `/zones` : « du moment que vous habitez dans la zone… nous pouvons vous servir » ; carte : « desservie dès qu'elle se trouve dans la zone » | Contact : « jusqu'à 30 minutes » ; zone 3 : « supplément plus important ou minimum de commande » | Définir la zone en minutes et en kilomètres, et dire que le supplément s'applique. |
| I16 | Délai de réponse | « sous **un jour ouvré** » (contact, FAQ, pied de page, zones) | « **24 h ouvrées** » (formulaires), « Appel découverte sous **24h** » (accueil, modale, en-tête) | Une seule formule : « Nous vous rappelons sous 24 h ouvrées ». |
| I17 | Délai de réponse et délai de réservation | `/zones` : réservation « en général sous une semaine » | « Appel sous 24 h » | Les séparer : réponse sous 24 h, première date disponible sous X jours. |
| I18 | Courses | Batch : **client** ; cours : **chef** ; chef privé : **incluses** | CGV §5 : « courses facturées au **coût réel** avec justificatifs » ; CGV §3 : « courses si prévues au devis » | Tableau « qui achète quoi », CGV alignées. |
| I19 | Annulation | Batch et cours : report ou annulation sans frais jusqu'à **48 h** ; chef privé : acompte conservé à moins de **7 jours** | CGV §6 : **15 / 7 jours**, 100 % du montant, valeurs « [À compléter] » | Une grille unique. |
| I20 | Acompte | Chef privé : **30 %** ; batch et cours : « figure dans le devis » | CGV : acompte pour toutes les prestations, « commande ferme à réception du devis signé » | Dire si batch et cours demandent un acompte. |
| I21 | Crédit d'impôt, certitude | Hero : « −50 % de crédit d'impôt, **tout de suite** » ; « Vous ne payez que la moitié » | FAQ et CGV : « **sous réserve d'éligibilité** » | Mention d'éligibilité à côté de chaque « −50 % ». |
| I22 | Crédit d'impôt, services concernés | Accueil : −50 % sur le batch | Chef privé et cours : aucune mention | Écrire « non éligible » ou « éligible » sur chaque page. À confirmer par la cheffe. |
| I23 | Conservation vs semaine type | FAQ : « en général 2 à 4 jours au frais » ; poisson « à consommer rapidement » | Semaine type (poisson jeudi, lasagnes vendredi) | Indiquer quels jours sont au frais et au congélateur. |
| I24 | SEO vs offre | `seo.default`, `seo.homeTitle` : batch seulement | Trois services ; `seo.services` cite « formule famille, événements » ; `seo.faq` cite « livraison » | Réécrire sur les trois services. |
| I25 | Nom de la marque | Textes : « Chef Meemz » | `lib/site.ts`, pied de page, CGV, mentions, confidentialité : « Table&Tribu » | Un seul nom. |
| I26 | « Chef » ou « cheffe », « je » ou « nous » | Accueil et batch : « cheffe », « je » | Chef privé, cours, FAQ : « le chef », « nous » ; badge « chef Julien » dans les avis | Choisir « cheffe » et « je ». |
| I27 | Prix « le dîner pour toute la famille » | Cartes batch : « Soit X € le dîner pour toute la famille » | Aucune taille de foyer indiquée ; le formulaire propose « moins de 2 / 2 à 4 / plus de 4 » | Dire pour combien de personnes. |
| I28 | Durée d'une session batch | FAQ : « trois à quatre heures en moyenne » | Réalisation « Castelnau » : « 4 h sur place » pour 5 dîners | Fourchette par nombre de dîners. |
| I29 | Fautes | « **Reservez** vos repas » (hero, bouton d'accueil), « clin d'**oeil** » | — | « Réservez », « clin d'œil ». |
| I30 | Placeholders hors région | Chef privé : « Paris 16e, Saint-Tropez… » ; cours : « Paris 16e, Lyon 3e… » | Site local | « Montpellier, Lattes, Castelnau-le-Lez… ». |
| I31 | Barre d'annonce | « Réservations ouvertes pour les prochaines semaines » | Pas de date ni de disponibilité | Dater ou retirer. |
| I32 | Pages annoncées mais absentes | Pied de page : « Conditions de réservation », « Offrir un repas » (liens masqués car les pages n'existent pas) ; cours : « Offrir un cours » (section retirée) ; FAQ : « bon cadeau » | Aucune page `conditions` ni `offrir` | Créer les pages ou retirer les mentions. |
| I33 | Pied de page vs menu | Menu : « À propos », « Zones » | Pied de page : pas de lien « À propos » | Ajouter « À propos ». |
| I34 | Contact absent du menu | Menu principal sans « Contact » | Pied de page et bouton « Réservez votre chef » | Garder le bouton, vérifier que le menu mobile expose aussi un accès clair. À vérifier à l'écran. |
| I35 | Ancre sans cible | Pages chef privé et cours : liens `#devis` | Aucun élément `id="devis"` sur ces pages ; ils dépendent du JavaScript (modale) | Prévoir un repli `/contact#devis` sans JS. |
| I36 | Informations existantes mais non affichées | Voir section 0 : régimes, conservation, déroulé, inclus, menus d'exemple, tarif et acompte du chef privé, bon cadeau | Seules des bribes subsistent dans les FAQ | Réintégrer sous forme de blocs courts ou les retirer de `fr.json`. |

---

## 3. Les parcours simulés

### Persona A : Sophie, mère de deux enfants à Castelnau-le-Lez (batch cooking)
Accueil → « Réservez vos repas » → page batch → formules → modale.
Elle bute sur : le prix (« 49,50 € par semaine » : pour 2 ou 5 personnes ?), « plus de 40 recettes » (introuvables), les courses (combien ?), les contenants, la conservation et les régimes (plus affichés sur la page batch, seulement dans la FAQ), « ce qui est inclus » (plus affiché), le crédit d'impôt (« je dois faire quoi ? »), et l'impossibilité d'appeler un vrai numéro.

### Persona B : Julien et Marie, dîner d'anniversaire pour 8 (chef privé)
Accueil → chef privé → formules → devis.
Ils butent sur : « dès 35 € » (le dîner assis commence à 75 €), les boissons, la vaisselle, qui sert à table, le supplément « table dressée », les menus d'exemple (plus affichés), le montant de l'acompte et le remboursement (seulement dans la FAQ), et l'absence de photos de dîners réels.

### Persona C : Camille, EVJF de 10 personnes (cours de cuisine)
Cours → « EVJF & Anniversaires » → réservation.
Elle bute sur : le lieu (12 personnes dans une cuisine ?), le matériel, l'alcool, le bon cadeau (la section a disparu), le prix total du groupe.

### Persona D : Thomas, qui compare avec des box repas et un traiteur
Il cherche : coût total mensuel, coût par portion, budget courses, engagement, qualité. Il ne trouve ni total, ni budget courses, ni vraies photos. Les avis américains lui paraissent faux.

### Persona E : Nadia, méfiante
Elle trouve : trois noms (Chef Meemz, Table&Tribu, Chef Meemz !), avis de « Mount Pleasant » et « Wild Dunes Resort », « Hôtes vérifiés » sans preuve, étoiles Google sans lien, SIRET et assurance « à compléter », téléphone factice. Elle quitte le site.

---

## 4. Questions par thème

Légende : **Type** I = incohérence, A = ambiguïté, M = info manquante. **Gravité** : 🔴 bloquant, 🟠 important, 🟡 mineur. **Qui** : « Cheffe » = à confirmer avant d'écrire.

### 4.1 Identité et confiance

| # | Question du client | Source | Type | Grav. | Recommandation | Qui |
|---|---|---|---|---|---|---|
| Q1 | Qui êtes-vous, quel parcours, depuis quand ? | `home.chef` : « Cuisine en privé depuis 2012 » ; `/a-propos` ne contient que cette présentation | M | 🔴 | Ajouter à `/a-propos` : parcours, formation, spécialités, photo de la cheffe au travail. Retirer « depuis 2012 » s'il n'est pas vrai. | Cheffe |
| Q2 | Ces avis sont-ils vrais ? Qui est « Kathrine » à « Mount Pleasant » ? | `home.reviews` (I2) | I | 🔴 | Supprimer ces avis ; remettre des avis réels (prénom, ville, mois, accord écrit) quand ils existent. | Cheffe |
| Q3 | Où sont vos avis Google ? | Badge « Avis Google ★★★★★ » (I3) | A | 🔴 | Note, nombre d'avis et lien vers la fiche, ou retirer le badge. | Cheffe |
| Q4 | Votre entreprise est-elle déclarée ? SIRET, forme juridique ? | `mentions-legales.mdx` | M | 🔴 | Remplir mentions légales, CGV, confidentialité. | Cheffe |
| Q5 | Êtes-vous assurée ? | CGV §9 | M | 🔴 | Une ligne « Assurance responsabilité civile professionnelle » sur les pages de service et la FAQ. | Cheffe |
| Q6 | Avez-vous une formation à l'hygiène (HACCP) ? | `mentions-legales` | M | 🟠 | Badge « Formée à l'hygiène alimentaire » avec l'année. | Cheffe |
| Q7 | Êtes-vous agréée « services à la personne » ? | `mentions-legales` ; promesse −50 % | M | 🔴 | Numéro de déclaration dans la FAQ crédit d'impôt et le pied de page. Sans déclaration valide, retirer la promesse −50 %. | Cheffe |
| Q8 | Travaillez-vous seule ? Qui vient si vous êtes malade ? | CGV §6 ; ton « nous » | A | 🟠 | « Je cuisine toujours moi-même. En cas d'empêchement : nouvelle date ou remboursement. » (si vrai). | Cheffe |
| Q9 | Les photos montrent-elles vos vraies réalisations ? | Fiches réalisations : `card.svg` ; « Famille M. » | M | 🔴 | Vraies photos et avis signés, ou masquer l'encart avis. | Cheffe |
| Q10 | Où vous suivre (Instagram, Facebook…) ? | `lib/site.ts` : réseaux en `#` | M | 🟠 | Liens réels, ou retirer les icônes. | Cheffe |

### 4.2 Prix, paiement et crédit d'impôt

| # | Question du client | Source | Type | Grav. | Recommandation | Qui |
|---|---|---|---|---|---|---|
| Q11 | Combien je paie au total pour un mois ? | « 49,50 € par semaine » | M | 🔴 | « Soit 198 € pour 4 passages après crédit d'impôt (396 € avant) » (calcul d'après `lib/lead/pricing.ts`). | — |
| Q12 | Le prix change-t-il selon le nombre de personnes ? | « le dîner pour toute la famille » ; formulaire « Personnes dans le foyer » | A | 🔴 | « Prix identique jusqu'à X personnes ; au-delà, supplément de X € ». | Cheffe |
| Q13 | Combien coûtent les courses en plus ? | FAQ ; recettes « coût 1 à 4 » | M | 🔴 | Budget moyen par semaine ; remplacer les niveaux 1 à 4 par une fourchette en euros. | Cheffe |
| Q14 | Pourquoi Signature coûte 20 € de plus par semaine ? | `lib/lead/pricing.ts` | A | 🟠 | Une phrase : « le temps de conception du menu sur mesure ». | Cheffe |
| Q15 | Je règle 99 € puis on me rembourse, ou je règle 49,50 € ? | Carte : « après crédit d'impôt (au lieu de 99 €) » ; boîte « Avance Immédiate » | A | 🔴 | Écrire le mécanisme exact et l'effet sur ma trésorerie. | Cheffe |
| Q16 | Comment fonctionne l'Avance immédiate ? Compte URSSAF ? | `home.hero.creditDialog` : « Pas d'avance de frais ni de démarche aux impôts » | A | 🔴 | Ajouter « Ce qu'il vous faut » (compte particulier URSSAF activé, délai de validation) avec la source officielle. | Cheffe |
| Q17 | Qui est éligible (actif, retraité, non-imposable) ? | FAQ crédit d'impôt | M | 🟠 | Trois lignes de conditions et le plafond annuel. | Cheffe |
| Q18 | Le crédit d'impôt vaut-il pour les dîners privés et les cours ? | I22 | M | 🔴 | Mention « éligible / non éligible » sur chaque page. | Cheffe |
| Q19 | Comment je paie, et quand ? | CGV §5 | M | 🟠 | Moyens acceptés et moment du paiement dans la FAQ « Paiement ». | Cheffe |
| Q20 | Les boissons, la vaisselle et la table dressée sont-elles comprises ? | Cartes chef privé ; `practical` | A | 🟠 | Section « Options » avec prix. | Cheffe |
| Q21 | Combien pour 4 personnes ? pour 14 ? | « 2 à 12 convives », « au-delà : au cas par cas » | A | 🟠 | Exemple chiffré et minimum de commande. | Cheffe |
| Q22 | Quel est le supplément de déplacement ? | Zones : « petit supplément », « plus important » | M | 🟠 | Montants zone 2 et zone 3. | Cheffe |
| Q23 | Puis-je avoir une facture ? | — | M | 🟡 | Phrase dans la FAQ. | Cheffe |
| Q24 | Le bon cadeau est-il remboursable, transférable ? Où l'acheter ? | FAQ ; section retirée de la page cours | I | 🟠 | Page « Offrir » ou section de retour sur la page cours, avec conditions. | Cheffe |

### 4.3 Batch cooking au quotidien

| # | Question du client | Source | Type | Grav. | Recommandation | Qui |
|---|---|---|---|---|---|---|
| Q25 | Quelle quantité par dîner, pour combien de personnes ? | Aucun texte affiché | M | 🔴 | « Une portion = X g de protéines + accompagnement ; adapté jusqu'à X personnes ». | Cheffe |
| Q26 | Qui fournit les boîtes ? Dois-je les rendre ? | `batchPage.storage` non affiché | M | 🔴 | « Contenants fournis / à fournir / consignés ». | Cheffe |
| Q27 | À quelle heure et combien de temps ? Dois-je être présent(e) ? | FAQ : « 3 à 4 heures » | A | 🟠 | Plage horaire, jours, présence requise. | Cheffe |
| Q28 | Que faire s'il manque un ingrédient ? | Parcours batch (plus affiché) | M | 🟠 | Liste de courses envoyée la veille ; solution de repli. | Cheffe |
| Q29 | Lesquels des 5 dîners sont au frais, lesquels au congélateur ? | I23 | I | 🟠 | Tableau jour par jour. | Cheffe |
| Q30 | Les « 4 passages » sont-ils consécutifs ? Puis-je décaler ou sauter une semaine ? | « 4 passages, engagement 1 mois » | A | 🟠 | « 4 semaines consécutives, une semaine de report possible » (si c'est la règle). | Cheffe |
| Q31 | Puis-je arrêter avant la fin du mois ? Et en vacances ? | Idem | M | 🟠 | Règle de pause et de résiliation. | Cheffe |
| Q32 | Ma cuisine est petite : est-ce un problème ? | FAQ : « four, plaques, réfrigérateur » | A | 🟡 | Équipement minimum et « Je viens avec mes ustensiles » (si vrai). | Cheffe |
| Q33 | Comment réchauffer, dans quels contenants ? | `storage.note` non affichée | A | 🟡 | Exemple d'étiquette dans la page. | Cheffe |
| Q34 | Puis-je mixer plats sur mesure et recettes du site ? | `lead.packs` | A | 🟡 | Dire si c'est possible et à quel prix. | Cheffe |

### 4.4 Alimentation, allergies, sécurité

| # | Question du client | Source | Type | Grav. | Recommandation | Qui |
|---|---|---|---|---|---|---|
| Q35 | Mon enfant est allergique aux arachides : le garantissez-vous ? | FAQ : « Oui, le menu est personnalisé » ; CGV §7 : « nous ne pouvons pas garantir l'absence de traces » | I | 🔴 | Message unique : « Je tiens compte de toutes les allergies. En cuisine privée, je ne peux pas garantir l'absence de traces ; pour une allergie sévère, parlons-en avant. » | Cheffe |
| Q36 | Halal, casher, sans lactose, vegan ? | Section régimes non affichée ; FAQ : « sans gluten, sans lactose, végétarien » | M | 🟠 | Lister ce qui est possible et ce qui ne l'est pas. | Cheffe |
| Q37 | Qui est responsable en cas de problème de santé ? | CGV §8 : « relève de votre responsabilité » | A | 🟠 | Phrase rassurante : étiquette de date, traçabilité, contact. | Cheffe |
| Q38 | Les produits sont-ils bio, locaux ? | Pied de page : « saine, de saison et locale » ; accueil : « produits frais et locaux » | A | 🟡 | Dans le batch, c'est le client qui achète : retirer « locaux » ou conseiller des producteurs. | Cheffe |

### 4.5 Chef privé et cours

| # | Question du client | Source | Type | Grav. | Recommandation | Qui |
|---|---|---|---|---|---|---|
| Q39 | Le menu « dégustation à partir de 110 € » est-il réservable ? | `chefPage.menus` (non affiché) | I | 🟠 | Le présenter dans les formules ou le supprimer de `fr.json`. | Cheffe |
| Q40 | Vous venez seule ? Qui sert à table ? | « service à table » | A | 🟠 | « Je cuisine et je sers seule jusqu'à X convives ; au-delà, serveur en option ». | Cheffe |
| Q41 | Y a-t-il un minimum pour un dîner assis à 2 personnes ? | « 2 à 12 convives » | M | 🟠 | Minimum de commande. | Cheffe |
| Q42 | L'acompte est-il remboursé si j'annule plus de 7 jours avant ? | FAQ : « avant, la date peut être reportée sans frais » ; CGV : « remboursé ou reporté » | A | 🟠 | « Remboursé » ou « reporté » selon la règle. | Cheffe |
| Q43 | Où se passe le cours quand on est 12 ? | `provided` : « un plan de travail assez grand » | A | 🟠 | Taille maximale conseillée par plan de travail. | Cheffe |
| Q44 | Peut-on boire de l'alcool pendant l'atelier ? Qui le fournit ? | EVJF | M | 🟡 | « Boissons non incluses » (si vrai). | Cheffe |
| Q45 | Une entreprise peut-elle réserver à ses locaux ? | « Entreprise : sur devis » | M | 🟡 | Tarif de départ et taille maximale. | Cheffe |

### 4.6 Zones, délais, réservation

| # | Question du client | Source | Type | Grav. | Recommandation | Qui |
|---|---|---|---|---|---|---|
| Q46 | J'habite Mèze (ou Lunel) : vous venez ? À quel prix ? | I13, I14 | I | 🔴 | Ajouter Mèze à `/zones`, chiffrer le supplément Lunel. | Cheffe |
| Q47 | Ma commune n'est pas listée : suis-je dans la zone ? | I15 | A | 🟠 | Définir la zone (rayon en km ou minutes depuis Montpellier). | Cheffe |
| Q48 | Quel est le premier créneau disponible ? | « Réservations ouvertes » | A | 🟠 | « Prochaine disponibilité : semaine du … ». | Cheffe |
| Q49 | Quels jours, quelles heures ? | `lib/site.ts` : « Lun - Sam, 9h-19h » | A | 🟡 | Distinguer horaires de téléphone et de prestation. | Cheffe |
| Q50 | Que se passe-t-il après ma demande ? Qui m'appelle ? | `lead.confirmation` | A | 🟠 | « Je vous rappelle sous 24 h ouvrées depuis le 0X… ; vous recevez un e-mail de confirmation. » (dépend du problème 1). | — |
| Q51 | Puis-je choisir mon créneau d'appel ? | Formulaires : téléphone seul | M | 🟡 | « Meilleur moment pour vous appeler ». | — |
| Q52 | L'appel découverte est-il gratuit ? Combien de temps dure-t-il ? | « Appel découverte sous 24h » | A | 🟡 | « Appel gratuit de 15 minutes » (durée à confirmer). | Cheffe |
| Q53 | Comment vous joindre sans formulaire ? | Pas de « Contact » dans le menu ; téléphone factice | I | 🟠 | Numéro et e-mail réels, lien « Contact » visible. | Cheffe |

### 4.7 Données personnelles, accessibilité, technique

| # | Question du client | Source | Type | Grav. | Recommandation | Qui |
|---|---|---|---|---|---|---|
| Q54 | Qu'allez-vous faire de mon téléphone et de mon e-mail ? Combien de temps ? | Formulaires ; `confidentialite.mdx` « [À compléter] » | M | 🟠 | Lien « Politique de confidentialité » sous chaque formulaire et durée de conservation renseignée. | Cheffe |
| Q55 | Y a-t-il des cookies ? | Mesure d'audience « [À compléter : Plausible] » | A | 🟡 | Dire quel outil, et que sans cookie il n'y a pas de bandeau. | Cheffe |
| Q56 | Pourquoi l'e-mail est-il obligatoire dans la modale, pas sur l'accueil ? | Modale (e-mail requis) vs formulaire d'accueil | I | 🟡 | Téléphone obligatoire, e-mail facultatif partout. | — |
| Q57 | Le site fonctionne-t-il sur mobile et au clavier ? | — | M | 🟡 | À tester dans un navigateur (non fait ici). | — |

---

## 5. À confirmer par la cheffe (en une seule fois)

**Identité et statut**
1. Nom de marque : « Chef Meemz » ou « Table&Tribu » ?
2. Forme juridique, SIRET, TVA (ou « TVA non applicable, art. 293 B »), adresse, téléphone et e-mail réels, horaires.
3. Déclaration « services à la personne » (numéro) ; compte URSSAF pour l'Avance immédiate.
4. Assurance RC pro (assureur, numéro) ; formation HACCP (année).
5. Parcours, formation, spécialités ; « depuis 2012 » est-il vrai ?
6. Travaillez-vous seule ? Qui vous remplace en cas d'empêchement ?
7. Avis : en avez-vous de réels (avec accord) ? Note et lien Google réels ?
8. Liens Instagram, Facebook, etc.

**Prix et paiement**
9. Prix batch : pour combien de personnes ? Supplément au-delà ? Total mensuel (198 € / 396 € pour Sérénité 3 dîners).
10. Budget courses moyen (batch).
11. Moyens et moment de paiement ; acompte par service ; facture.
12. Crédit d'impôt : quels services, quelles conditions, Avance immédiate ou remboursement à posteriori.
13. Suppléments de déplacement (zones 2 et 3) ; minimum de commande en zone 3.
14. Tarifs des options : table dressée, vaisselle, serveur.
15. Prix du cours « couple / amis » : 65 € ou 75 € ? Minimum du dîner assis.

**Déroulé**
16. Contenants : fournis, rendus ?
17. Horaires, durée par nombre de dîners, présence du client.
18. Règle de report, de pause et de résiliation du mois de batch.
19. Régimes acceptés ; allergies sévères : jusqu'où.
20. Quels dîners au frais et lesquels au congélateur, et durée garantie.

**Contenus à produire**
21. Les 40 recettes (ou le nombre réel à afficher).
22. Vraies photos (cheffe, plats, réalisations).
23. Annulation : 48 h / 7 jours (site) ou 15 / 7 jours (CGV) : une seule règle.
24. Bon cadeau : conditions et page « Offrir ».
25. Rayon de la zone d'intervention ; Mèze et Lunel : desservies ou non ?
26. Prochaine disponibilité et rythme de mise à jour de la barre d'annonce.

---

## 6. Plan d'action trié par priorité

| Priorité | Action | Effort |
|---|---|---|
| P0 | Brancher l'envoi des demandes (`/api/lead`, formulaire de contact, accusé de réception) | Moyen |
| P0 | Retirer ou remplacer les avis du template et le badge « Avis Google » (accueil, `/a-propos`) | Petit |
| P0 | Remplacer téléphone, adresse, e-mail, réseaux, horaires, nom de marque dans `lib/site.ts` | Petit |
| P0 | Compléter mentions légales, CGV, confidentialité (ou masquer les liens tant qu'ils ne sont pas prêts) | Moyen |
| P0 | Aligner « 40 recettes » avec la réalité | Grand (contenu) |
| P1 | Clarifier le prix batch : unité, total mensuel, foyer, courses, crédit d'impôt (Q11 à Q18) | Moyen |
| P1 | Corriger les incohérences I5 à I23 (prix, durées, zones, annulation) | Petit à moyen |
| P1 | Réintégrer ou retirer les contenus non affichés (I36) : inclus, régimes, conservation, déroulé, tarif/acompte chef privé, bon cadeau | Moyen |
| P1 | Compléter `/a-propos` (parcours, assurance, HACCP, photo) | Moyen |
| P2 | Définir la zone (km ou minutes) et ajouter Mèze (I13 à I15) | Petit |
| P2 | FAQ : contenants, horaires, report, régimes, conservation par jour, allergies sévères | Moyen |
| P2 | Réécrire les descriptions SEO sur les trois services (I24) | Petit |
| P2 | Créer la page « Offrir » ; ajouter « À propos » au pied de page (I32, I33) | Petit |
| P3 | Fautes (« Reservez », « oeil »), placeholders « Paris 16e », uniformiser « cheffe » et « je » | Petit |
| P3 | Tester mobile, clavier, contrastes (non vérifié ici) | Moyen |

---

## 7. Ce qui n'a pas pu être vérifié

- Le **rendu réel** : pas de navigateur. Je n'ai pas vu la mise en page, le fil d'Ariane, la modale, les cartes de prix ni la nouvelle navigation.
- **Bureau contre mobile** : le code peut masquer ou raccourcir des textes selon la largeur.
- **Accessibilité** : contrastes, ordre de tabulation, libellés.
- **Données structurées et SEO** : titres et descriptions relus, pas leurs longueurs réelles ni l'affichage dans Google.
- **Droit** : mes remarques sur crédit d'impôt, Avance immédiate, CGV et rétractation sont des questions de client, pas un avis juridique.
- **Travail en cours** : l'arbre de travail contient une réorganisation non commitée ; certains textes non affichés (I36) viennent peut-être d'un chantier en cours.

## 8. Prochaine étape

Dites-moi quelles corrections appliquer. Je propose de commencer par les P0 qui ne dépendent pas de vos réponses : retirer les avis du template et le badge Google, corriger les incohérences de texte (I5, I6, I7, I12, I16, I24, I29, I30), puis traiter le reste dès que vous aurez répondu à la liste du point 5.
