# Table et Tribu : plateforme Django et site — document unique

> **Ce document est la seule référence du projet.** Il décrit le métier, le process, l'architecture, les données, puis **les Pull Requests à confier une par une à Claude** : chaque PR contient ses fonctionnalités détaillées, ses règles métier (décisions déjà prises) et ses critères de contrôle. Les mentions « **[À VÉRIFIER]** » signalent un fait externe (tarif, loi, limite d'un outil) que personne ne doit supposer.

**Table des matières**

- **[Avant-propos](#avant-propos)**
  - [1. Utiliser ce document](#1-utiliser-ce-document)
    - [1.1 Deux dépôts](#11-deux-dépôts)
    - [1.2 Demande type à Claude (à copier pour chaque PR)](#12-demande-type-à-claude-à-copier-pour-chaque-pr)
    - [1.3 Consignes permanentes pour Claude](#13-consignes-permanentes-pour-claude)
    - [1.4 Règles de revue et conventions](#14-règles-de-revue-et-conventions)
- **[Partie I — Le métier](#partie-i--le-métier)**
  - [2. Contexte et process](#2-contexte-et-process)
    - [2.1 Activité](#21-activité)
    - [2.2 Principes retenus](#22-principes-retenus)
    - [2.3 Le process de bout en bout](#23-le-process-de-bout-en-bout)
    - [2.4 Ce que vous modifiez vous-même, et ce qui demande un développeur](#24-ce-que-vous-modifiez-vous-même-et-ce-qui-demande-un-développeur)
    - [2.5 Hors périmètre](#25-hors-périmètre)
    - [2.6 Fragilités à surveiller](#26-fragilités-à-surveiller)
    - [2.7 Relances et pipeline : qui agit, quand, et quand ça s'arrête](#27-relances-et-pipeline--qui-agit-quand-et-quand-ça-sarrête)
    - [2.8 Les outils et ce qu'ils coûtent](#28-les-outils-et-ce-quils-coûtent)
- **[Partie II — Le plan de livraison](#partie-ii--le-plan-de-livraison)**
  - [3. Plan de livraison et Pull Requests](#3-plan-de-livraison-et-pull-requests)
    - [3.1 Plan de livraison par paliers](#31-plan-de-livraison-par-paliers)
    - [3.2 Pull Requests du backend (`chefmeemz-backend`)](#32-pull-requests-du-backend-chefmeemz-backend)
      - [B00. Squelette du projet et intégration continue](#b00-squelette-du-projet-et-intégration-continue)
      - [B00b. Skills de l'agent : Django, DRF, données sensibles et e-mails](#b00b-skills-de-lagent--django-drf-données-sensibles-et-e-mails)
      - [B01. Authentification de l'équipe, thème Unfold et journal d'audit](#b01-authentification-de-léquipe-thème-unfold-et-journal-daudit)
      - [B02. Infrastructure transversale : tâches, e-mails, fichiers, intégrations factices](#b02-infrastructure-transversale--tâches-e-mails-fichiers-intégrations-factices)
      - [B03. Contenu du site (CMS) : modèles et administration](#b03-contenu-du-site-cms--modèles-et-administration)
      - [B04. Tarifs, packs, offres commerciales et marqueurs de prix](#b04-tarifs-packs-offres-commerciales-et-marqueurs-de-prix)
      - [B04b. Aide à la rédaction des devis (un modèle par service)](#b04b-aide-à-la-rédaction-des-devis-un-modèle-par-service)
      - [B04c. Générer le devis dans Google Docs](#b04c-générer-le-devis-dans-google-docs)
      - [B05. API de lecture pour le site (construction)](#b05-api-de-lecture-pour-le-site-construction)
      - [B06. Import des contenus existants du site](#b06-import-des-contenus-existants-du-site)
      - [B06b. Blocs vendeurs des pages dans le CMS](#b06b-blocs-vendeurs-des-pages-dans-le-cms)
      - [B07. Déploiement de l'environnement de test](#b07-déploiement-de-lenvironnement-de-test)
      - [B08. Catalogue de recettes et ingrédients](#b08-catalogue-de-recettes-et-ingrédients)
      - [B09. Publication du site depuis l'administration](#b09-publication-du-site-depuis-ladministration)
      - [B10. Clients, engagements, passages et réservations](#b10-clients-engagements-passages-et-réservations)
      - [B11. Créer un client et un engagement depuis un devis accepté (page A-Dossier), notes HubSpot](#b11-créer-un-client-et-un-engagement-depuis-un-devis-accepté-page-a-dossier-notes-hubspot)
      - [B12. Suivi et relances : tableau « à faire » et flux iCal](#b12-suivi-et-relances--tableau--à-faire--et-flux-ical)
      - [B13. Menus par passage : proposition, validation et listes d'ingrédients](#b13-menus-par-passage--proposition-validation-et-listes-dingrédients)
      - [B14. Page de choix du menu (lien à usage unique)](#b14-page-de-choix-du-menu-lien-à-usage-unique)
      - [B15. Facturation par passage et suivi URSSAF (saisie manuelle)](#b15-facturation-par-passage-et-suivi-urssaf-saisie-manuelle)
      - [B16. Paiements Stripe : acompte du chef privé](#b16-paiements-stripe--acompte-du-chef-privé)
      - [B17. Cartes cadeaux](#b17-cartes-cadeaux)
      - [B18. Avis des clients](#b18-avis-des-clients)
      - [B19. RGPD, conservation et exports](#b19-rgpd-conservation-et-exports)
      - [B20. Durcissement et préparation de la production](#b20-durcissement-et-préparation-de-la-production)
      - [B20b. Déploiement de la production et retour arrière](#b20b-déploiement-de-la-production-et-retour-arrière)
      - [B21. Programme de fidélité par points](#b21-programme-de-fidélité-par-points)
    - [3.3 Pull Requests du site (`chefmeemz`)](#33-pull-requests-du-site-chefmeemz)
      - [S00. Envoyer les demandes du site vers HubSpot](#s00-envoyer-les-demandes-du-site-vers-hubspot)
      - [S00b. Skills de l'agent : Next.js, React, référencement et accessibilité](#s00b-skills-de-lagent--nextjs-react-référencement-et-accessibilité)
      - [S01. Lire le contenu depuis l'API au moment de la construction](#s01-lire-le-contenu-depuis-lapi-au-moment-de-la-construction)
      - [S02. Déclenchement de la publication et déploiement](#s02-déclenchement-de-la-publication-et-déploiement)
      - [S03. Carte cadeau : page publique d'achat](#s03-carte-cadeau--page-publique-dachat)
      - [S04. Site : durcissement](#s04-site--durcissement)
  - [4. Étapes manuelles : comptes, secrets, décisions](#4-étapes-manuelles--comptes-secrets-décisions)
    - [M0. Avant la première PR](#m0-avant-la-première-pr)
    - [M1. Avant la PR indiquée](#m1-avant-la-pr-indiquée)
  - [5. Décisions ouvertes et points à vérifier](#5-décisions-ouvertes-et-points-à-vérifier)
    - [5.1 Décisions à prendre](#51-décisions-à-prendre)
    - [5.2 Points à vérifier](#52-points-à-vérifier)
  - [6. Checklist avant la mise en production](#6-checklist-avant-la-mise-en-production)
- **[Partie III — La technique](#partie-iii--la-technique)**
  - [7. Stack et conventions](#7-stack-et-conventions)
    - [7.1 Choix par défaut](#71-choix-par-défaut)
    - [7.2 Conventions de code](#72-conventions-de-code)
    - [7.3 Apps](#73-apps)
    - [7.4 Interdits (à tester)](#74-interdits-à-tester)
    - [7.5 Bonnes pratiques officielles de Django et DRF](#75-bonnes-pratiques-officielles-de-django-et-drf)
  - [8. Authentification et permissions](#8-authentification-et-permissions)
  - [9. Modèle de données](#9-modèle-de-données)
    - [9.1 `content` (CMS)](#91-content-cms)
    - [9.2 `catalog`](#92-catalog)
    - [9.3 `pricing`](#93-pricing)
    - [9.4 Pièces du devis (sur l'engagement et la réservation)](#94-pièces-du-devis-sur-lengagement-et-la-réservation)
    - [9.5 `clients`](#95-clients)
    - [9.6 `engagements`](#96-engagements)
    - [9.7 `planning`](#97-planning)
    - [9.8 `billing`](#98-billing)
    - [9.9 `payments`](#99-payments)
    - [9.10 `giftcards`](#910-giftcards)
    - [9.11 `reviews`, `notifications`, `core`, `integrations`](#911-reviews-notifications-core-integrations)
    - [9.12 `staffdesk` (suivi et relances)](#912-staffdesk-suivi-et-relances)
    - [9.13 `loyalty` (points de fidélité)](#913-loyalty-points-de-fidélité)
  - [10. API et contrat avec le site Next.js](#10-api-et-contrat-avec-le-site-nextjs)
    - [10.1 Routes de lecture (pour la construction du site)](#101-routes-de-lecture-pour-la-construction-du-site)
    - [10.2 Routes serveur à serveur (appelées par le site)](#102-routes-serveur-à-serveur-appelées-par-le-site)
    - [10.2b Page de choix du menu (servie par Django)](#102b-page-de-choix-du-menu-servie-par-django)
    - [10.2c Pas d'API pour l'administration](#102c-pas-dapi-pour-ladministration)
    - [10.3 Webhooks entrants](#103-webhooks-entrants)
    - [10.4 Sortants](#104-sortants)
    - [10.5 Changements attendus côté site](#105-changements-attendus-côté-site)
  - [11. Environnements, configuration et exigences transversales](#11-environnements-configuration-et-exigences-transversales)
    - [11.1 Configuration (variables d'environnement)](#111-configuration-variables-denvironnement)
    - [11.2 Environnements et domaines](#112-environnements-et-domaines)
    - [11.3 Exigences non fonctionnelles](#113-exigences-non-fonctionnelles)
    - [11.4 Données de démonstration et tests](#114-données-de-démonstration-et-tests)
- **[Partie IV — Annexe](#partie-iv--annexe)**
  - [12. Glossaire](#12-glossaire)
    - [12.1 Termes du métier](#121-termes-du-métier)
    - [12.2 Sigles et termes techniques](#122-sigles-et-termes-techniques)

# Avant-propos

Comment lire ce document et comment confier une Pull Request à Claude.


## 1. Utiliser ce document

### 1.1 Deux dépôts
- **`chefmeemz-backend`** (Django, à créer ; PR préfixées **B**) : l'administration de la cheffe, la logique métier, l'API.
- **`chefmeemz`** (le site Next.js existant ; PR préfixées **S**) : le site public (entièrement statique) et la page de carte cadeau.

### 1.2 Demande type à Claude (à copier pour chaque PR)
> Implémente la PR **Bxx** décrite dans `docs/PROJECT.md`. **Commence par lister les skills de `.claude/skills/` et charge tous ceux qui concernent cette PR** — au minimum `django-drf` et `revue-projet`, plus `donnees-sensibles` dès qu'un client, un e-mail, un journal ou une intégration est touché, et `tests` avant d'écrire les tests. Lis ensuite la PR, les sections qu'elle cite, la section 7.4 (interdits) et `docs/DECISIONS.md`. Crée la branche indiquée, fais des commits atomiques, écris les tests demandés, puis ouvre la PR avec le gabarit du dépôt. **Reste dans le périmètre** : ne fais rien de ce qui figure dans « Hors périmètre ». Si une règle manque, applique le choix le plus simple et note-le dans `docs/DECISIONS.md`. Ne me demande pas de valider un détail mineur ; arrête-toi seulement s'il manque un secret, un compte ou une décision marquée **BLOQUANT**.

Pour une PR du site, remplacez `Bxx` par `Sxx`, travaillez dans `chefmeemz`, chargez les skills du site (`nextjs` et `react` toujours, `seo` et `accessibilite` dès qu'une page change) et lisez d'abord `AGENTS.md` et la documentation de `node_modules/next/dist/docs/` (cette version de Next.js a des changements incompatibles : `middleware.ts` s'appelle `proxy.ts`). Claude doit avoir accès aux **deux dépôts** côte à côte.

**Deux exceptions, et une seule fois chacune** : B00b et S00b *créent* les skills, elles ne peuvent pas les charger. Pour ces deux PR, la demande type s'applique sans la première phrase, et la lecture de la section 7.5 (bonnes pratiques) remplace celle des skills — c'est d'ailleurs la matière qu'elles ont à transformer en skills.

### 1.3 Consignes permanentes pour Claude
1. **Ne rien inventer** : si une règle manque, choisir le plus simple, le noter dans `docs/DECISIONS.md` avec la date, et continuer.
2. **Lire avant d'écrire** dans le site : `lib/content/schemas.ts`, `lib/recipes.ts`, `lib/lead/pricing.ts`, `lib/zones.ts`, `lib/site.ts`, `messages/fr.json`, `content/**/*.mdx`.
3. **Les skills du dépôt font foi** (`.claude/skills/`, livrés par B00b et S00b) : ils se chargent tout seuls et portent la liste de contrôle opérationnelle. Ce document garde les principes et les décisions ; le skill garde la règle d'écriture.
4. Texte visible en **français** ; code, modèles et champs en **anglais**.
5. **Ce que toute PR livre, en plus de ses fonctionnalités** : les tests nommés dans ses « Critères » ; une **implémentation factice** pour chaque intégration externe qu'elle introduit ; les migrations correspondantes ; et la mise à jour de `README.md`, `docs/DECISIONS.md` et `docs/API.md` (généré par `drf-spectacular`). Ces livrables ne sont plus répétés PR par PR.

### 1.4 Règles de revue et conventions
- **CI verte**, description de PR conforme au gabarit (contexte métier, changements, comment tester, risques, captures de l'administration), migrations lisibles et réversibles, aucun secret.
- **Interdits** (7.4) toujours testés. La liste de contrôle de la revue est le skill **`revue-projet`**, pas cette section : elle n'est écrite qu'une fois, là où elle se charge au moment d'écrire comme au moment de relire. La section 7.5 garde les principes et les sources officielles.
- Deux vérifications que la revue garde en propre, parce qu'elles portent sur la PR entière et non sur une ligne de code : **aucun nouvel avertissement à `check --deploy`** (la CI de B00 l'exécute, la revue constate qu'on ne l'a pas contournée), et la question qui prime sur toutes les autres — **cette PR enregistre-t-elle quelque chose qu'elle ne devrait pas ?**
- **Pas de fonctionnalité hors périmètre** ; tout écart est justifié. Vous testez **dans l'administration** ce que la PR annonce (« Vous contrôlez »), pas seulement les tests automatiques.
- **Branches** `feat/bxx-nom-court`, commits atomiques, fusion en un seul commit (*squash*) après votre accord. **Fini** = critères remplis, tests verts, documentation à jour, bandeau d'environnement visible.

# Partie I — Le métier

Ce que fait l'entreprise, comment elle vend, comment elle sert. **Une lectrice ou un lecteur non technique peut s'arrêter à la fin de la partie II.**


## 2. Contexte et process

### 2.1 Activité
**Table et Tribu**, cheffe à domicile à Montpellier et alentours, trois services : **batch cooking** (3 à 5 dîners par semaine préparés chez le client en un passage ; packs *Essentiel*, *Signature*, *Sur mesure*), **chef privé** (dîner pour des convives, prix à la personne, acompte de 30 %), **cours de cuisine** (à domicile, prix à la personne). Le site Next.js 16 est statique sur Cloudflare (dépôt `chefmeemz`) ; son contenu est aujourd'hui dans des fichiers (`content/`, `messages/fr.json`, `lib/*.ts`). Utilisateurs : la cheffe (un compte au départ), ses clients (qui valident leur menu par un lien reçu par e-mail, sans compte), les visiteurs (achat de carte cadeau), le système de build du site.

### 2.2 Principes retenus
**Qui détient quoi**
- **HubSpot Free** : toute la fiche du client : identité, téléphone, adresse, échanges, e-mails, appels, notes, tâches, pipeline, devis envoyés, **allergies, goûts et réponses au questionnaire**. Avant la confirmation, seule source : **Django ne contient aucun prospect**.
- **Django** (après la création du dossier) : seulement ce qui sert à l'exécution : e-mail (identifiant du client et adresse d'envoi), prénom, nom, identifiant HubSpot (lien), engagements (avec **portions par passage**), passages, plans de repas, listes d'ingrédients, pièces du devis, suivi de facturation, cartes cadeaux.
- **Identité** : HubSpot fait foi ; un changement d'e-mail se fait dans HubSpot **et** dans Django (action « Mettre à jour l'e-mail ») ; le client ne modifie pas son identité.
- **Allergies et régimes** : dans HubSpot uniquement, jamais dans Django. Les recettes affichent leurs allergènes ; le client choisit sous sa responsabilité et le confirme à chaque validation ; la cheffe relit chaque menu. Un filtre automatique pourra venir plus tard (PR dédiée).
- **Outil de facturation** : factures, avoirs, attestation fiscale. **Stripe** : paiements. **Cartes cadeaux** : acheteur, destinataire et solde dans Django.

**Architecture**
- **Administration et gestion du contenu = administration Django (thème Unfold)** avec 4 pages sur mesure : **A-Dossier** (créer un client et un engagement), **A-Suivi** (le tableau « à faire »), **A-Publier** (mettre le site en ligne), **A-Devis** (calculer et générer un devis). Pas d'API d'administration.
- **Next.js porte** : le site public, **entièrement statique**, et la page de **carte cadeau**. Le site lit Django **au moment de sa construction** ; aucune page publique n'appelle Django à l'exécution. **Il n'y a pas d'espace client avec comptes** : le client valide son menu depuis une **page de choix servie par Django**, atteinte par un lien à usage unique reçu par e-mail.
- **Menus par passage** : pour chaque passage, la cheffe prépare une **proposition** de recettes, le client l'ajuste et la valide par son lien ; un **PDF unique** reprend ensuite le menu retenu et la liste d'ingrédients (B13).
- **Calendrier** : les dates des passages sont dans Django (elles pilotent menus, rappels et facturation) ; un **flux iCal en lecture seule** les affiche dans Google Agenda. Pas de page calendrier.
- **Prix dynamiques** (administration, jamais dans le code) : grille de référence 39,50 € après crédit d'impôt pour 3 dîners au mois (la FAQ « 49,50 € » est obsolète) ; elle préremplit le prix d'un engagement, modifiable avec un motif.
- **Trois environnements** : local, test (`test.tabletribu.com`), production (`tabletribu.com`). **Outils gratuits d'abord** (liste et coûts : section 2.8). À décider : hébergement de Django, outil de facturation, informations légales (section 5).

**Règles métier**
- **Engagement** : 1 semaine (1 passage), 1 mois (4 passages) ou sur mesure. **Pas de reconduction automatique** : un renouvellement est un nouvel engagement (pack éventuellement différent) sur le même client ; **un devis n'est jamais un prérequis** pour créer un engagement, les pièces du devis sont facultatives, avec e-mail et rappel en fin de période.
- **Facturation au passage réalisé**, jamais le mois d'avance ; prix figés dans l'engagement. Pas de pause, de résiliation ni de préavis ; **report ou annulation sans frais au moins 48 h avant**. Changement de pack ou de formule en cours : non proposé (exception manuelle journalisée).
- **Chef privé et cours** : réservations sur devis, sans pack ; acompte de 30 % pour le chef privé. **Batch cooking** : avance immédiate URSSAF (le client valide sous 48 h, l'URSSAF règle 50 %).
- **Offres commerciales** : les prestations se vendent aussi par moment de vie (Post-partum, senior, anniversaire, renouvellement…). Une offre est un **habillage du devis** — un nom, un paragraphe, parfois une remise — par-dessus un service existant ; elle ne change ni les passages, ni les menus, ni la facturation. La cheffe les crée elle-même dans l'administration, et l'offre reste attachée à l'engagement vendu.
- **Numérotation** : le devis porte une **référence unique** (`DEV-AAAA-NNN`, proposée par la page A-Devis), refusée en double par Django ; les **factures** ont la numérotation continue de l'outil de facturation.

### 2.3 Le process de bout en bout

**En une phrase** : un visiteur du site devient un contact, le contact devient un devis, le devis accepté devient un engagement de plusieurs passages, et chaque passage réalisé devient une facture dont l'URSSAF règle la moitié sous quelques jours.

Deux registres : **« Ce que vous faites »** donne le geste concret, et dit **« rien »** quand le système s'en charge sans vous ; **« Ce qui se passe, et pourquoi »** explique l'intérêt économique de l'étape.

| Étape | Ce que vous faites | Ce qui se passe, et pourquoi |
| --- | --- | --- |
| **Phase A — Attirer** | | |
| **1. Faire vivre le site** | Vous modifiez vos contenus, vos prix ou vos recettes dans l'administration, puis vous cliquez sur **Publier** (page A-Publier). Vous ne touchez à aucun fichier et vous n'appelez personne. | Le site est la vitrine et le premier canal d'acquisition. Aujourd'hui, changer une photo, un tarif ou une recette demande un développeur : tout élan commercial est donc freiné par un délai et un coût. Demain, la cheffe modifie elle-même contenus, prix, zones et recettes, puis publie d'un clic. Le site reste composé de **pages figées**, donc rapides, bien référencées et presque gratuites à héberger. |
| **2. Recevoir une demande** | **Rien** : c'est le visiteur qui remplit le formulaire. Vérifiez seulement, de temps en temps, que les notifications vous arrivent toujours. | C'est le maillon le plus sensible de toute la chaîne : **une demande perdue, c'est un mois d'engagement perdu**, soit plusieurs centaines d'euros. Le formulaire du site est filtré contre les robots puis crée directement un contact dans le CRM. Aucune donnée de prospect n'entre dans l'administration : tant que rien n'est signé, il n'y a rien à gérer. La demande vous parvient par **deux canaux indépendants** — le CRM et un e-mail de notification — pour qu'aucune ne se perde si l'un des deux tombe. |
| **3. Être prévenue** | Vous lisez l'e-mail de notification et **vous rappelez vite**. C'est la seule étape dont le retard se paie directement en affaires perdues. | Le délai de réponse est un facteur de conversion direct : dans ce métier, le premier à rappeler emporte souvent l'affaire. Les deux canaux de l'étape 2 évitent de découvrir une demande trois jours trop tard. |
| **4. Qualifier** | Vous appelez et vous notez dans la fiche HubSpot ce que vous apprenez : zone, convives, budget, contraintes. Tout dans la fiche, jamais dans un carnet à part. | Un appel permet de cerner le besoin, la zone de déplacement, le nombre de convives et le budget. Tout l'historique — e-mails, notes, appels — est conservé au même endroit, ce qui évite de redemander deux fois la même chose et donne une image professionnelle. |
| **Phase B — Convertir** | | |
| **5. Établir le devis** | Vous ouvrez la **page A-Devis**, choisissez le service, saisissez la prestation et le nom du client, vous **relisez les totaux**, vous cliquez « Générer le devis », puis vous retouchez le document dans Google Docs. Trois à quatre minutes. | C'est l'acte commercial. D'un bouton, l'administration **crée le devis dans le Drive de la cheffe** à partir de son propre modèle, numéro, identité et montants déjà remplis, puis elle l'**ouvre et le retouche librement dans Google Docs**. La machine fait le calcul et la mise en forme, la rédaction reste humaine : plus d'erreur d'arithmétique, et aucune rigidité sur le texte. Le document affiche **le prix avant et après crédit d'impôt** — 79 € qui deviennent 39,50 € — ce qui est le principal levier commercial de l'offre. |
| **6. Envoyer le devis** | Vous exportez le document en PDF et vous l'envoyez depuis HubSpot. **Aucun rappel à poser** : les relances se créent seules (2.7). | Le devis part de la messagerie de la cheffe et reste archivé dans le CRM avec sa pièce jointe. Le CRM crée aussitôt les rappels de relance (à 7 et 14 jours, expiration à 30 jours) : **un devis sans réponse est une vente encore possible, pas une vente perdue**, à condition de ne pas l'oublier. |
| **7. Obtenir l'accord** | Vous attendez le « bon pour accord » par e-mail, puis vous envoyez le questionnaire et vous reportez les réponses dans la fiche HubSpot — allergies et goûts compris. | Un simple « bon pour accord » par e-mail suffit : **pas de signature électronique à faire installer au client**, donc moins de friction et un délai de conversion plus court, tout en conservant une preuve écrite. Le client remplit ensuite un questionnaire : adresse, foyer, allergies et goûts. Les allergies sont des données de santé et sont recueillies avec un consentement explicite. |
| **8. Ouvrir le dossier** | Vous ouvrez la **page A-Dossier** et vous saisissez le client, l'engagement vendu, la référence du devis, le PDF et l'e-mail d'accord. **Vous ne touchez plus à HubSpot** : l'administration s'en charge, et vous demande seulement quel deal si le client en a plusieurs. | **C'est le moment où un prospect devient un client** et le seul où ses informations entrent dans l'administration. En une page et une dizaine de minutes, la cheffe crée la fiche client, l'engagement vendu (pack, nombre de dîners, portions, prix figé) et y joint le devis et l'accord. Le système crée aussitôt les passages à planifier. Un renouvellement ajoute simplement un nouvel engagement à la même fiche. |
| **Phase C — Servir** | | |
| **9. Planifier les passages** | Vous convenez les dates au téléphone, puis vous les saisissez **d'un seul coup** dans la liste des passages sans date (« tous les mardis à 18 h pendant 4 semaines »), quitte à en corriger une ensuite. | Les dates sont convenues avec le client puis saisies en une fois pour tout l'engagement. **Elles commandent tout ce qui suit** : ouverture des menus, rappels, facturation. Elles apparaissent automatiquement dans l'agenda de la cheffe, sans ressaisie. |
| **10. Proposer le menu** | La page A-Suivi vous le rappelle 7 jours avant. Vous ouvrez la proposition **déjà pré-remplie**, vous remplacez les recettes qui ne vous vont pas, vous envoyez. | Sept jours avant chaque passage, le système rappelle à la cheffe de proposer un menu et pré-remplit des recettes conformes au pack du client, en évitant celles des deux derniers passages. Proposer plutôt que laisser choisir est un double avantage : **le client n'a pas à y réfléchir** — c'est le service qu'il achète — et la cheffe garde la main sur la saison, ses approvisionnements et son temps de préparation. |
| **11. Faire valider le menu** | **Rien** : le client ajuste et valide par son lien, puis vous validez d'un clic s'il n'a pas répondu à la date limite. | Le client reçoit un lien, voit les plats proposés **avec leurs allergènes**, remplace ce qu'il ne veut pas, valide. Sans compte ni mot de passe : un lien cliquable obtient beaucoup plus de réponses qu'un espace client à retrouver. La validation laisse une **trace écrite de ce qui a été accepté**, allergènes compris — un point de responsabilité important dans la restauration. S'il ne répond pas, la proposition de la cheffe devient le menu : **rien ne bloque jamais la prestation**. C'est précisément pour cette trace que le client est relancé deux fois : son silence ne coûte rien à l'organisation, mais il prive le dossier de la preuve que les allergènes ont été acceptés. |
| **12. Produire la liste d'ingrédients** | **Rien pour la liste**, elle se calcule seule. Mais vous relisez le menu validé avec la note d'allergies du client et vous le marquez **« relu »** : c'est votre seul geste de sécurité, et il est obligatoire. | À la validation, les quantités de chaque recette sont additionnées, mises à l'échelle du foyer et regroupées par rayon dans un document unique. C'est le gain opérationnel central du projet : **plus d'ingrédient oublié, plus d'achat en double**, et un travail de calcul hebdomadaire qui disparaît complètement. |
| **13. Gérer un imprévu** | Le client vous prévient par e-mail ou par téléphone ; **vous** reportez ou annulez le passage dans l'administration. La règle des 48 h s'applique toute seule au montant. | La règle des **48 h protège la marge** : au-delà, le report est gratuit ; en deçà ou en cas d'absence, le passage reste facturable, car le temps et les courses sont déjà engagés. |
| **14. Réaliser le passage** | Vous cuisinez chez le client, puis vous marquez le passage **réalisé** dans l'administration, le soir même ou le lendemain. | C'est la prestation elle-même : le seul moment du parcours où l'outil ne vous sert à rien, il vous attend. Mais **le clic « réalisé » est le pivot de toute la suite** — sans lui, aucune facture n'est à émettre, aucun point de fidélité n'est acquis, aucune demande d'avis ne part, et l'avance immédiate n'est pas demandée. C'est pour cela qu'un passage non clôturé est relancé dès le lendemain : ce n'est pas une formalité administrative, c'est le déclencheur de l'encaissement. |
| **Phase D — Encaisser** | | |
| **15. Facturer le passage** | Vous marquez le passage **réalisé**. Le lendemain, une ligne « facture à émettre » vous attend : vous émettez la facture dans votre outil, puis vous saisissez son numéro et son statut. | La facture ne couvre **que ce passage**. Facturer à la prestation plutôt que le mois d'avance évite tout produit constaté d'avance et tout risque de remboursement : **l'argent encaissé correspond toujours à un service déjà rendu**. Chaque facture rappelle la référence du devis. |
| **16. Être payée** | Pour le batch cooking, vous envoyez la demande d'avance immédiate et vous saisissez son statut. Si le client ne la valide pas sous 72 h, **vous êtes alertée** et vous l'appelez. | Pour le batch cooking, l'**avance immédiate URSSAF** règle directement **50 % du montant** après validation du client, qui dispose de 48 h : le client ne débourse que sa moitié et n'attend pas un an son crédit d'impôt. C'est à la fois un argument de vente et un raccourcisseur de délai de paiement. Stripe n'intervient que pour l'acompte du chef privé et les cartes cadeaux, donc les commissions restent marginales. |
| **17. Envoyer l'attestation fiscale** | **Rien** : l'outil de facturation l'envoie. En janvier, un rappel vous demande simplement de vérifier que c'est bien parti. | Chaque début d'année, le client reçoit l'attestation qui lui permet de déclarer son crédit d'impôt. C'est une obligation, mais aussi **un contact utile au moment où il arbitre son budget de l'année** : une occasion naturelle de reprendre contact. |
| **18. Vendre des cartes cadeaux** | **Rien à la vente**, tout se passe sur le site. Quand une carte est utilisée, vous saisissez son code au moment de créer l'engagement (page A-Dossier). | Un canal de vente supplémentaire, sans prospection : l'acheteur paie en ligne et le destinataire reçoit un code par e-mail. **L'encaissement précède la prestation**, ce qui améliore la trésorerie, et une partie des cartes amène de nouveaux clients qui n'auraient pas franchi le pas seuls. Valable 12 mois, utilisable en plusieurs fois. |
| **Phase E — Fidéliser et piloter** | | |
| **19. Recueillir les avis** | La demande part seule. Quand un client répond, vous saisissez son avis, vous le validez, et il paraît à la prochaine publication. | Après la prestation, une demande d'avis part automatiquement. Validés par la cheffe, les avis s'affichent sur le site : **la boucle d'acquisition se referme**, les clients servis alimentant la conversion des suivants. |
| **20. Proposer un renouvellement** | Au dernier passage d'un engagement, une ligne vous le signale. Vous proposez la suite — même pack ou non — en mentionnant le solde de points du client et l'offre de renouvellement s'il y en a une. | **C'est l'étape la plus rentable du parcours** : le client est déjà convaincu et déjà servi, et vous n'avez rien payé pour l'atteindre. Comme il n'y a **pas de reconduction automatique** — un choix assumé, qui évite de facturer quelqu'un qui n'a rien redemandé — tout repose sur une proposition faite au bon moment, avant que l'habitude ne se perde. Un renouvellement est un **nouvel engagement**, pas une prolongation : le pack peut changer, les prix sont ceux du jour. |
| **21. Ne rien oublier** | Vous ouvrez la **page A-Suivi** chaque matin, ou vous lisez le résumé quotidien, et vous traitez ce qui est en rouge. **C'est la seule habitude que le système vous demande de prendre.** | Un registre unique rassemble tout ce qui attend une action — passage sans date, menu à proposer, facture impayée, acompte en attente — avec son échéance et ses relances. Chaque matin, un e-mail résume ce qui est en retard et ce qui est à faire. C'est ce qui permet à **une seule personne** de tenir plusieurs dizaines de passages par mois sans en perdre un. |
| **22. Garder l'œil ouvert** | **Rien tant que rien ne casse.** Vous réagissez aux alertes, qui sont rares et toujours actionnables. | Alertes automatiques si le site tombe, si un paiement échoue ou si une tâche ne s'exécute pas. Sans cela, une panne silencieuse se découvre par le client, ce qui coûte bien plus cher qu'elle. |
| **Hébergement de l'administration** | Vous tranchez où héberger l'outil et qui peut l'atteindre (étape **M1.9**). Rien d'autre ne dépend de vous ici. | Le seul poste qui n'est ni gratuit ni sans entretien. **Décision ouverte** : elle dépend du niveau d'exposition souhaité pour l'administration et la page de choix. |

*Ce tableau raconte le parcours. Les deux mécanismes qui s'y rattachent ont chacun leur table de référence en **2.7**, rangée par numéro d'étape : **les relances** (déclencheur, propriétaire, échéance, condition d'arrêt) et **le pipeline HubSpot**. Les outils et leurs coûts sont en 2.8, et le plan par paliers (3.1) donne l'ordre réel de mise en service.*

**Ce que le modèle coûte en outils** : presque rien. Le CRM, l'envoi d'e-mails, l'anti-spam, la surveillance et la chaîne de publication tiennent dans des offres gratuites. Les deux seuls postes réels sont les **commissions Stripe**, proportionnelles et limitées aux acomptes et aux cartes cadeaux, et l'**hébergement de l'administration**, encore à arbitrer.

**Où se situe le plafond** : la cheffe garde environ **dix minutes de travail administratif par passage**, essentiellement la proposition de menu, la relecture des allergies et la facturation. C'est indolore à cinq clients, c'est une demi-journée par semaine à trente. Au-delà de ce seuil, deux leviers existent et sont déjà prévus par la structure des données : ouvrir un espace client pour que le choix du menu se fasse sans intervention, et brancher l'outil de facturation par son interface de programmation pour supprimer la ressaisie.

**Le point de vigilance commercial** : il n'y a **aucune reconduction automatique**. Chaque mois est revendu, ce qui impose une relance de renouvellement à la fin de chaque engagement — le système la déclenche, mais la vente reste à faire.


### 2.4 Ce que vous modifiez vous-même, et ce qui demande un développeur

C'est la question la plus concrète du projet, et la réponse tient en une ligne : **tout ce qui change avec votre activité est à vous, tout ce qui fait fonctionner les pages reste dans le code.**

| Vous le modifiez seule, dans l'administration | Livré par |
| --- | --- |
| Réalisations et leurs galeries, inspirations, avis | B03 |
| **FAQ** : 70 questions, placées sur les pages de votre choix | B03, B06 |
| Pages légales (CGV, confidentialité, mentions), **versionnées** | B03 |
| Coordonnées, réseaux sociaux, horaires, identité légale | B03 |
| Zones, communes et frais de déplacement | B03 |
| **Blocs vendeurs des pages** : accroches, titres, paragraphes, listes d'arguments, titres et descriptions de référencement | **B06b** |
| Prix, packs, offres commerciales | B04 |
| Recettes et ingrédients | B08 |
| Textes des e-mails envoyés à vos clients | B02 |

| Il faut un développeur (ou une demande à Claude) | Pourquoi |
| --- | --- |
| **Libellés et mécanismes d'interface** : boutons, onglets, filtres, compteurs, unités, messages de formulaire — environ 1 230 textes courts | Ils commandent le comportement des composants : une faute de frappe casse une page |
| **Navigation et pied de page** | Les liens dépendent des pages existantes |
| **Structure et habillage** : mise en page, couleurs, polices, ordre des blocs, et **créer une page** | C'est du code, pas du contenu |
| **Images hors contenu** : logo, favicon, visuels d'illustration | Elles font partie de l'habillage |
| **Formulaires** : champs et questions | Chaque champ a un traitement derrière lui |

**Trois limites de l'outil**, assumées pour qu'il reste simple : **pas d'aperçu avant publication** (vous publiez, puis vous regardez le site), **pas de publication programmée**, **une seule langue**. Le texte s'écrit en Markdown avec aperçu, pas dans un éditeur visuel.

**Cette frontière n'est pas figée.** Faire passer un bloc de plus du code vers l'administration est une opération de **données**, pas de code, depuis B06b : l'API superpose vos textes au fichier du site, donc ajouter un bloc revient à déclarer une clé de plus. La règle retenue est de ne migrer que ce qui change réellement souvent — une page « à propos » réécrite une fois par an ne justifie pas d'être gérée dans l'administration.

### 2.5 Hors périmètre
Pas de CRM (leads, pipeline, échanges, tâches : HubSpot) ni de capture de lead (le formulaire du site crée le contact dans HubSpot via son serveur, sans passer par Django) ; **pas de devis rédigé par Django** : l'administration calcule les montants et prépare un Google Docs prérempli (B04c), mais le document est écrit, retouché et envoyé par la cheffe ; Django ne produit ni PDF de devis, ni signature électronique, ni table de devis ; **pas de page calendrier** (flux iCal seulement) ; **pas d'espace client avec comptes** (ni connexion, ni mot de passe, ni historique consultable par le client : il reçoit ses documents par e-mail et valide son menu par un lien à usage unique) ; **pas de profil alimentaire ni de donnée de santé de client** dans Django ni de filtre automatique par allergie ; pas de création de factures conformes (outil externe, Django déclenche et suit) ; pas de SMS ni WhatsApp ; pas de comptabilité, de stocks ni de commandes fournisseurs ; pas d'application mobile native.

### 2.6 Fragilités à surveiller
- **Étapes manuelles** (envoyer, saisir l'étape HubSpot, créer le dossier, dater les passages, marquer « réalisé ») : le suivi et les relances (2.7, B12) les rappellent. **Un accord resté dans HubSpot sans dossier Django n'est pas visible de Django** : à surveiller dans HubSpot (deals « Gagné » sans dossier).
- **Double saisie** : une faute de frappe dans l'e-mail empêche le client de recevoir ses liens de choix, un prix peut s'écarter du devis. Atténué par le prix prérempli, la référence unique, le PDF du devis joint à l'engagement et l'e-mail de bienvenue qui révèle une adresse fausse.
- **Allergies** : aucune barrière automatique ; la sécurité repose sur l'affichage des allergènes, la confirmation du client et la relecture de la cheffe. Clause de responsabilité des CGV à faire valider **[À VÉRIFIER]**.
- **Avance immédiate URSSAF** : le client doit avoir activé son compte sur particulier.urssaf.fr avant le premier passage ; rien ne le vérifie automatiquement (avertissement dans B15).
- **Offres gratuites** : limites susceptibles de changer (HubSpot a déjà retiré les devis du plan gratuit).
- **RGPD** : suppression à répéter dans HubSpot, Django, outil de facturation, Brevo et Stripe ; les allergies (données de santé) restent dans HubSpot avec consentement explicite.
- **Délivrabilité** : liens de choix du menu classés en spam si SPF, DKIM et DMARC ne sont pas configurés.
- **FAQ et CGV** : la FAQ dit qu'on peut « changer de formule » et annule à 48 h ; les CGV (article sur l'annulation) proposent encore 15 et 7 jours. À aligner avant la production.

### 2.7 Relances et pipeline : qui agit, quand, et quand ça s'arrête

Les deux tables de cette section sont rangées **par numéro d'étape du process** (2.3). Chaque relance y répond à quatre questions : **qu'est-ce qui la déclenche**, **qui agit**, **quand**, et **à quelle condition elle s'arrête**. Une relance sans condition d'arrêt écrite finit par crier au loup, et on cesse de la lire.

**Principes**
- **Un seul propriétaire par relance.** HubSpot relance tout ce qui précède la création du dossier, Django tout ce qui suit. **Le relais est « Dossier créé »**, posé par l'administration elle-même (B11).
- **Avant le dossier, la voix est la vôtre** : Django ne connaît aucun prospect (interdit 1, section 7.4) et ne peut donc écrire ni à son adresse ni en son nom. Les relances d'avant-dossier sont des **tâches HubSpot pour vous**, jamais des e-mails automatiques. **Après le dossier**, Django prend les envois répétitifs au client.
- **Aucun doublon avec les outils externes** : l'URSSAF et l'outil de facturation envoient déjà leurs rappels ; Django enregistre le statut et vous alerte.
- **Un registre unique** (`FollowUp`, section 9.12) : une situation = une ligne, jamais deux ; elle se **clôt seule** dès que la situation est résolue. **Au plus un e-mail par client et par jour**, jamais entre 21 h et 8 h.
- **Vos rappels à vous** : un **résumé quotidien** envoyé seulement les jours où il y a quelque chose, et trois **alertes immédiates** pour ce qui ne peut pas attendre. Tout s'active et se coupe dans l'administration (B12).
- **Mêmes statuts partout** : *à venir*, *à traiter*, *en attente du client*, *résolu*, *annulé* — plus **en retard**, qui n'est pas un statut mais une échéance dépassée, affichée en rouge. Les délais ci-dessous sont des valeurs par défaut, modifiables dans l'administration.

**Le pipeline HubSpot**

Six étapes, qui ne servent qu'à la vente : une fois le dossier créé, le deal n'évolue plus. **Trois sont posées par les machines, une est absorbée, deux sont des jugements** que rien ne remplace.

| Étape du deal | Posée par | Déclencheur | Ce qui la clôt |
| --- | --- | --- | --- |
| **Nouveau** | **Le site** (S00) | Le visiteur envoie le formulaire | Le passage à « Qualifié », « Devis envoyé » ou « Perdu » |
| **Qualifié** | **Vous** (facultatif) | Votre appel de qualification (étape 4) | Le passage à « Devis envoyé » ou « Perdu ». L'oublier ne supprime pas la relance du devis : la vue du pipeline rattrape le deal à 3 jours |
| **Devis envoyé** | **L'administration** (B04c) | Le bouton « Générer le devis » de la page A-Devis (étape 5) | Le passage à « Dossier créé » ou « Perdu » |
| **Gagné** | **Personne** — étape **absorbée** | — | Sans objet : créer le dossier prouve l'accord. La marquer reste possible et n'ajoute qu'une tâche de rappel |
| **Dossier créé** | **L'administration** (B11) | Le bouton « Créer le dossier » de la page A-Dossier (étape 8) | Rien : **dernière étape**. HubSpot arrête ses relances, Django prend les siennes |
| **Perdu** | **Vous** | Votre jugement, à tout moment | Rien : fin du cycle. Un devis expiré à J+30 n'est pas un devis perdu |

**Les relances, étape par étape**

**Avant le dossier** — HubSpot seul, et toujours une tâche pour vous.

| Étape | Situation | Déclencheur | Qui agit | Quand | Quand ça s'arrête |
| --- | --- | --- | --- | --- | --- |
| **2 → 3** | Demande reçue, pas encore rappelée | Le site crée le deal | Vous, tâche HubSpot | Échéance à **24 h** | Vous cochez la tâche après l'appel, ou le deal passe à « Perdu » |
| **4** | Demande qualifiée, devis pas encore envoyé | Le deal passe à « Qualifié ». **La vue, elle, n'attend aucun geste** | Vous, tâche HubSpot **et** vue du pipeline | Tâche à **48 h** ; la vue liste en continu tout deal resté avant « Devis envoyé » depuis **plus de 3 jours** | Le deal passe à « Devis envoyé » (posé par l'administration) ou à « Perdu » |
| **6** | Devis envoyé sans réponse | Le deal passe à « Devis envoyé » | Vous, tâche HubSpot | **J+7** puis **J+14** ; à **J+30** le devis est expiré, à relancer ou à clôturer | Le deal passe à « Dossier créé » ou à « Perdu » |
| **7** | Accord reçu, questionnaire non rempli | Le deal passe à « Gagné ». **Si vous ne le marquez pas, ce rappel n'existe pas** | Vous, tâche HubSpot | **J+3** | Le questionnaire est reçu |
| **7 → 8** | Deal « Gagné » sans dossier Django | Le deal passe à « Gagné », **si vous l'avez marqué** — sinon l'étape 8 suffit | Vous, tâche HubSpot et vue du pipeline | Dès « Gagné » | Le deal passe à « Dossier créé » |

**Après le dossier** — e-mails automatiques de Django **au client**.

| Étape | Situation | Déclencheur | Qui agit | Quand | Quand ça s'arrête |
| --- | --- | --- | --- | --- | --- |
| **11** | Proposition de menu sans réponse | L'envoi du lien de choix | Django (**2 e-mails**), puis vous | **J+2** après l'envoi, puis **24 h avant la date limite** ; à la date limite, alerte pour vous | Le menu est validé — par le client, ou par vous d'un clic |
| **14** | Rappel de passage | La date du passage | Django (e-mail) | **24 h avant** | Le passage est réalisé ou annulé |
| **16** | Acompte du chef privé impayé | L'envoi du lien d'acompte | Django (e-mail), puis vous | **J+3** et **J+7** ; **J+10** alerte pour vous (libérer la date ?) | L'acompte est payé ou la réservation annulée |
| **18** | Carte cadeau proche de l'expiration | La date de validité | Django (e-mail) | **30 jours avant** | La carte est utilisée ou expirée |
| **18** | Commande de carte cadeau non payée | La commande créée sans paiement | Django, **sans relance** | Annulée seule après **48 h**, affichée en information | Payée ou annulée |
| **19** | Demande d'avis | Le dernier passage réalisé | Django (e-mail) | **J+2**, puis **une** relance à **J+7** | L'avis est reçu, ou les deux envois sont faits |

**Après le dossier** — vos actions, c'est-à-dire la page « À faire » (A-Suivi).

| Étape | Situation | Déclencheur | Qui agit | Quand | Quand ça s'arrête |
| --- | --- | --- | --- | --- | --- |
| **8** | Engagement sans pièce ; client sans engagement | La création du dossier | Vous | Dès la création | Une pièce est jointe, **ou** une note de source écrite (un devis n'est jamais obligatoire) |
| **9** | Passage sans date | La création de l'engagement | Vous | Dès la création ; **en retard à J+3** | La date est saisie |
| **9** | Compte URSSAF non confirmé | La date du premier passage | Vous | **7 jours avant** | Le compte est confirmé |
| **10** | Menu à proposer | La date du passage | Vous | **7 jours avant** ; **en retard 4 jours avant** | La proposition part au client |
| **12** | Menu validé à relire (allergies) | La validation du menu | Vous | Dès la validation ; **en retard 48 h avant le passage** | Le menu est marqué « relu » |
| **13** | Report ou annulation demandé | Vous enregistrez la demande du client (e-mail, téléphone) | Vous | Dès l'enregistrement | Le passage est reporté ou annulé |
| **14** | Passage réalisé non clôturé | La date du passage dépassée | Vous | **Le lendemain** | Le passage est clôturé |
| **15** | Facture à émettre | Le passage marqué réalisé | Vous | **Le lendemain** du passage | La facture est saisie |
| **16** | Facture émise non payée | L'échéance saisie sur la facture | Vous (l'outil de facturation ou HubSpot relance le client) | Échéance **+ 3 jours**, puis **+ 10 jours** | La facture est payée |
| **16** | Demande URSSAF non validée, refusée ou expirée | L'envoi de la demande d'avance | Vous (l'URSSAF prévient déjà le client) | Non validée à **72 h** ; refus ou expiration : **tout de suite** | La demande est payée ou clôturée |
| **17** | Attestation fiscale envoyée ? | Le 1er janvier | Vous | **Une fois**, en janvier | La vérification est faite |
| **20** | Renouvellement à proposer | Le dernier passage réalisé de l'engagement | Vous | Dès ce passage ; l'e-mail mentionne le solde de points et l'offre de renouvellement s'il y en a une | Un nouvel engagement est créé, ou le refus est noté (le suivi du devis repasse alors à HubSpot) |
| **21** | Demande d'export ou de suppression de données | Votre saisie de la demande (`DataRequest`) | Vous | Rappel à **J+20** ; **en retard à J+30** | La demande est traitée |
| **22** | E-mail échoué, intégration en échec | L'échec après toutes les reprises automatiques | Vous | Dès l'abandon des reprises | Le renvoi réussit, ou la ligne est classée |

### 2.8 Les outils et ce qu'ils coûtent

**Le principe : gratuit d'abord.** Tous les outils de cette liste sont pris dans leur offre gratuite, sauf deux lignes — les commissions de Stripe, qui ne se paient que sur un encaissement, et l'hébergement de l'administration, seul poste à la fois payant et non tranché.

| Outil | Coût | À quoi il sert | Étapes |
| --- | --- | --- | --- |
| **HubSpot Free** | gratuit | Le CRM : contacts, échanges, devis envoyés, pipeline, relances d'avant-dossier, **allergies et questionnaire** | 2, 3, 4, 6, 7, 20, 21 |
| **Brevo** | gratuit, 300 e-mails par jour **[À VÉRIFIER]** | Tous les e-mails envoyés à vos clients | 3, 10, 12, 17, 18, 19, 20 |
| **Cloudflare** | déjà en place | Hébergement du site figé, et **Turnstile** contre les robots du formulaire | 1, 2 |
| **GitHub Actions** | gratuit | Construit et publie le site quand vous cliquez sur « Publier » | 1 |
| **Google Docs et Drive** | gratuit | Les devis, créés dans **votre** Drive et retouchables à la main | 5 |
| **Stripe** | 1,5 % + 0,25 € par carte ; 0,35 € par prélèvement **[À VÉRIFIER]** | Acompte du chef privé et achat de cartes cadeaux. **Aucun abonnement** : vous ne payez que sur un encaissement | 16, 18 |
| **URSSAF (avance immédiate)** | gratuit | Règle 50 % du passage après validation du client sous 48 h | 16 |
| **Outil de facturation** | **à choisir (M1.15)** | Factures, avoirs, attestation fiscale annuelle, numérotation continue | 15, 17 |
| **Google Agenda** | gratuit | Voir vos passages dans votre agenda, par un **flux en lecture seule** produit par l'administration ; et vos rendez-vous de qualification | 4, 9 |
| **WeasyPrint** | gratuit (bibliothèque) | Les PDF : listes d'ingrédients, cartes cadeaux | 12, 18 |
| **Sentry** | gratuit | Vous prévient quand quelque chose casse | 22 |
| **UptimeRobot** | gratuit **[À VÉRIFIER]** | Vous prévient quand le site ne répond plus | 22 |
| **Administration Django** | gratuit (le logiciel) | Votre outil de travail : contenu, clients, engagements, passages, menus, devis, facturation, suivi | 1, 8 à 15, 18, 20, 21 |
| **Hébergement de l'administration** | **à décider (M1.9)** | Faire tourner l'administration et la page de choix. **Le seul poste à la fois payant et non tranché**, et celui dont dépendent tous les paliers testables | — |

**Ce qui n'est pas gratuit mais n'est pas un abonnement** : les commissions Stripe se prélèvent sur un paiement reçu, donc un mois sans vente ne coûte rien. **Ce qui pourrait le devenir** : les offres gratuites de HubSpot, Brevo et Sentry ont des limites (propriétés, e-mails par jour, événements) marquées **[À VÉRIFIER]** et susceptibles de changer ; les atteindre déclencherait un abonnement, pas une panne.

# Partie II — Le plan de livraison

Ce qu'on construit, dans quel ordre, et ce que vous pourrez essayer à chaque étape. C'est la partie à ouvrir au quotidien.


## 3. Plan de livraison et Pull Requests

Chaque PR est conçue pour être confiée **seule** à Claude, puis contrôlée par vous. Elle contient son objectif métier, ses **fonctionnalités et règles** (les décisions déjà prises), ses critères et la façon de la vérifier. Les modèles sont décrits en section 9, l'API en section 10 ; « M0.x / M1.x » renvoie aux étapes manuelles de la section 4.

### 3.1 Plan de livraison par paliers

**Le principe** : chaque palier se termine par **quelque chose que vous pouvez essayer vous-même**, dans votre navigateur. Vous ne passez au suivant qu'une fois le précédent en ligne et validé par vous. C'est ce qui évite d'accumuler des mois de travail invisible avant de découvrir un malentendu.

**Deux règles de lecture** :
- Le **palier 0 est indépendant de tout le reste** et part directement en production : il arrête une perte d'argent qui a lieu aujourd'hui.
- Tous les autres **s'accumulent sur l'environnement de test** et ne basculent en production qu'au palier 12. Pas de double fonctionnement de l'ancien et du nouveau site : la bascule se fait après validation de S01.

**Le seul vrai verrou** est dans le palier 1 : la décision d'hébergement (**M1.9**). Tant qu'elle n'est pas prise, le travail continue sur la machine du développeur, mais **vous ne pouvez rien essayer vous-même**. C'est la décision à prendre en premier.

| Palier | PR | Étapes manuelles avant | Ce que vous validez vous-même à la fin |
| --- | --- | --- | --- |
| **0. Les demandes n'arrivent plus dans le vide, et l'agent connaît vos règles** | S00, S00b | M1.2, M1.4, M1.5 | Vous envoyez une demande depuis le site : le contact et sa note sont dans HubSpot, vous recevez la notification et l'accusé de réception. Vous faussez le jeton HubSpot et vous recevez quand même la notification. Puis vous demandez à l'agent une petite modification et vous vérifiez qu'il cite la bonne documentation avant d'écrire. |
| **1. L'outil est en ligne et il est à vous** | B00, B00b, B01, B02, B07 | M0.1 à M0.6, **M1.9**, M1.3, M1.10, M1.12 | Vous ouvrez l'administration **depuis votre navigateur**, vous vous connectez avec le code de votre téléphone, vous ratez cinq connexions et le compte se bloque, vous envoyez un e-mail de test et vous relisez le journal d'audit. |
| **2. Votre contenu est dans l'outil** | B03, B04, B06, B06b | puis M1.20 | Vous retrouvez vos 9 réalisations, vos 70 questions de FAQ, vos avis, vos zones, vos prix, vos offres commerciales et les **textes vendeurs de vos pages** ; vous modifiez une accroche et vous relisez son historique. Le site public n'a pas encore changé : c'est normal, il change au palier 4. |
| **3. Vous faites vos devis** | B04b, B04c | M1.14, M1.18, puis M1.19 | Vous générez un devis de chaque service dans votre Drive, vous le retouchez dans Google Docs, vous l'exportez en PDF. Vous faussez le jeton Google et vous récupérez quand même le texte à coller. |
| **4. Vous publiez votre site vous-même** | B05, B09, S01, S02 | M1.7, M1.8 | Vous changez un prix dans l'administration, vous cliquez sur **Publier**, et le site de test affiche le nouveau prix quelques minutes plus tard. Vous comparez deux ou trois pages clés avec l'ancien site. |
| **5. Vous ouvrez un dossier client** | B10, B11 | M1.1, M1.5, M1.17 | Vous créez un client et un engagement d'un mois depuis la page A-Dossier, devis et accord en pièces jointes ; les quatre passages apparaissent et vous les datez d'un coup. Vous annulez un passage à 47 h puis à 49 h et vous vérifiez la facturation. |
| **6. Vous ne ratez plus rien** | B12 | — | Vous laissez un passage sans date : il apparaît en rouge dans A-Suivi. Vous recevez le résumé quotidien, vous reportez une ligne, vous coupez une relance et vous vérifiez qu'elle revient dans vos actions. Vous vous abonnez au flux dans Google Agenda. |
| **7. Vos recettes sont dans l'outil** | B08 | — | Vous importez vos 5 recettes, vous saisissez les quantités, les allergènes se calculent seuls, et une recette dont une quantité manque refuse de devenir « disponible ». |
| **8. Le cycle du menu tourne** | B13, B14 | — | Le cycle complet sur votre propre adresse : vous préparez une proposition, vous l'envoyez, vous recevez le lien sur votre téléphone, vous changez un plat, vous validez, vous ouvrez le PDF et vous vérifiez les quantités à la main. Vous rouvrez le lien : il ne permet plus de modifier. |
| **9. Vous facturez et vous suivez l'URSSAF** | B15 | M1.14, M1.15 | Vous clôturez un passage : la ligne « facture à émettre » apparaît le lendemain. Vous saisissez le numéro et le statut, puis vous suivez la demande d'avance immédiate jusqu'à « payée ». |
| **10. Vous encaissez en ligne** | B16, B17, S03 | M1.6, M1.14 | Vous payez un acompte avec une carte de test et la date passe à « confirmée ». Vous achetez une carte cadeau sur le site, vous recevez le PDF, et vous en utilisez une partie sur un engagement. |
| **11. Avis et conformité** | B18, B19 | M1.14, M1.17 | Vous saisissez un avis et vous le publiez : il paraît à la publication suivante. Vous exportez puis vous anonymisez un client de test et vous vérifiez qu'il ne reste rien d'identifiable. |
| **12. Vous ouvrez aux vrais clients** | B20, B20b, S04 | M1.11, M1.13, M1.16, **M1.9** (production) | La checklist de la section 6 : sauvegarde réellement restaurée, Stripe en mode réel, administration joignable uniquement sous son préfixe et avec double authentification. Et vous faites **un vrai retour arrière** sur l'environnement de test avant d'ouvrir. |
| **13. Vous fidélisez** | B21 | M1.14 | Quatre passages clôturés donnent 40 points ; vous les convertissez en carte cadeau et vous l'utilisez sur l'engagement suivant. |

**Ce qui peut se faire dans le désordre** : le palier 3 (devis) ne dépend pas du palier 4 (publication) — si vos devis vous coûtent plus de temps que votre site, faites-le d'abord. Les paliers 5 (dossier client) et 7 (recettes) sont indépendants l'un de l'autre. Tout le reste suit l'ordre du tableau, chaque palier s'appuyant sur le précédent.

**Si vous devez vous arrêter en route**, les deux points d'arrêt confortables sont la fin du **palier 4** (vous gérez votre site seule, ce qui est déjà un gain net) et la fin du **palier 8** (vous gérez tout le cycle de la prestation ; il ne manque que l'argent).

### 3.2 Pull Requests du backend (`chefmeemz-backend`)

#### B00. Squelette du projet et intégration continue
- **Branche** : `feat/b00-bootstrap` · **Taille** : moyenne · **Dépend de** : M0.1 à M0.6 · **Débloque** : **toutes les PR du backend**.
- **Objectif** : Avant d'écrire la moindre règle métier, on crée le dépôt `chefmeemz-backend` et son filet de sécurité. Concrètement : un projet Django vide qui démarre en une commande avec une base PostgreSQL locale, et une intégration continue (GitHub Actions) qui refuse automatiquement tout code qui casse les tests, la sécurité ou les migrations. Pour vous, c'est ce qui permet de relire les PR suivantes en confiance : chacune arrive déjà vérifiée par la machine et vous ne contrôlez que le métier. Aucune fonctionnalité visible ici : on pose les fondations pour que les PR suivantes ne se marchent pas dessus.
- **Fonctionnalités et règles**
  - Stack de la section 7.1 : Python 3.12+, Django LTS (**version à confirmer sur le site officiel de Django**), PostgreSQL, DRF, `uv`. Layout `config/settings/{base,dev,test,prod}.py` et `apps/<domaine>/`. Langue `fr-fr`, fuseau `Europe/Paris`, devise EUR.
  - **Socle conforme à la section 7.5** : réglages DRF (permission par défaut `IsAuthenticated`, authentification explicite, pagination, limitation de débit, gestionnaire d'erreurs) et réglages de sécurité de production.
  - Maintenance par vous, sans date cible imposée.
  - **Ce que contient le dépôt** : `README.md`, `Makefile` (`make dev`, `test`, `lint`, `migrate`), `Dockerfile` et `docker-compose.yml` (Django + PostgreSQL), `.env.example` sans secret (liste de la section 11), `.gitignore`, gabarit de PR et `CODEOWNERS`, `/healthz`, `docs/DECISIONS.md`.
  - **Intégration continue (GitHub Actions)** : `ruff` (règles `DJ` et `S`), `mypy` (`django-stubs`, `djangorestframework-stubs`), `pytest`, `makemigrations --check`, `check --deploy` en réglages de production, `pip-audit`, `spectacular --validate --fail-on-warn`, détection de secrets. **Un test échoue si une vue n'a pas de permission explicite.**
- **Critères** : `make dev` démarre l'application et la base ; `make test` passe ; la CI est verte ; `/healthz` répond 200 ; aucun secret dans le dépôt.
- **Vous contrôlez** : cloner, `cp .env.example .env`, `make dev`, ouvrir `/healthz`, lire la CI, ouvrir une PR de test pour voir le gabarit. **Risque** : versions de Django et Python figées ici (à noter dans `DECISIONS.md`).

#### B00b. Skills de l'agent : Django, DRF, données sensibles et e-mails
- **Branche** : `feat/b00b-agent-skills` · **Taille** : moyenne · **Dépend de** : B00 · **Débloque** : **toutes les PR du backend**, qui s'écrivent avec ces règles.
- **Objectif** : Même raison que pour le site, avec un enjeu supplémentaire. Ce projet a des **interdits dont la violation ne se voit pas** : une allergie enregistrée dans une note interne, un e-mail de client dans un message d'erreur envoyé à Sentry, un prospect créé en base avant la signature. Rien ne plante, les tests passent, et le problème est juridique. Un skill qui se charge dès qu'on touche aux données d'un client est **le meilleur rempart disponible**, parce qu'il agit au moment où le code s'écrit et non en revue.
- **Fonctionnalités et règles** : quatre skills dans `.claude/skills/<nom>/SKILL.md`.
  - **`django-drf`** — la liste de contrôle opérationnelle issue des recommandations officielles : réglages de production et de sécurité, ORM et gabarits (pas de SQL brut, `mark_safe` interdit sauf contenu de confiance), fichiers téléversés traités comme non fiables, `request.get_host()`, migrations réversibles ; côté DRF, permission explicite sur **chaque** vue, authentification déclarée par groupe de routes, pagination et limitation de débit, `has_object_permission` qui ne s'applique ni aux listes ni aux créations, sérialiseurs aux champs listés, logique métier dans `services.py`, `assertNumQueries` contre les requêtes N+1. **Ce skill devient la référence opérationnelle** : la section 7.5 garde les principes et les sources officielles, et pointe vers lui — une règle qui vit dans deux fichiers finit par diverger, et celle qui se charge au moment d'écrire doit gagner.
  - **`donnees-sensibles`** — se déclenche dès qu'une tâche touche à un client, un e-mail, un journal ou une intégration, et reprend les interdits de la section 7.4 : **aucune allergie, aucun régime, aucune donnée de santé** dans Django (ni champ, ni note interne, ni journal, ni PDF, ni Stripe) ; **aucun prospect** en base avant la création manuelle du dossier ; aucun numéro de carte ; aucun secret dans les journaux, les messages d'erreur ou les fixtures ; aucune donnée personnelle dans Sentry ni dans une URL ; les factures ne sont pas numérotées par Django. Chaque interdit s'accompagne du test qui le vérifie.
  - **`emails`** — **vouvoiement**, signature de la cheffe, expéditeur et réponse sur l'adresse du domaine, **aucun envoi marketing**, pas de copie cachée, pas de SMS ni WhatsApp ; en environnement de test, envoi **uniquement vers des adresses autorisées** ; `EmailLog` sans le corps du message ; tout gabarit modifiable dans l'administration, avec aperçu et envoi de test.
  - **`tests`** — la doctrine de test, qui manquait au plan : elle existait en morceaux (une couverture en 11.3, des « Critères » par PR) mais jamais comme une règle d'écriture.
    - **La forme de la pyramide ici** : la logique métier vit dans `services.py` et se teste **sans HTTP** — c'est là que doit porter l'essentiel ; la couche API se teste avec `APIClient` ; et **trois parcours seulement** méritent un test de bout en bout, ceux de B11 (ouverture d'un dossier), B13 (cycle du menu) et B17 (carte cadeau).
    - **Ce qu'on ne simule jamais** : la base (un vrai PostgreSQL en intégration continue), l'arithmétique monétaire, et la frontière des 48 h. **Ce qu'on simule toujours** : HubSpot, Stripe, Brevo, GitHub et Google Docs, par leurs interfaces `Protocol` et leur implémentation factice.
    - **Les cinq familles de test propres à ce projet**, à écrire sans qu'on ait à les redemander : **idempotence** (rejouer une tâche deux fois ne double rien), **concurrence** (débit d'une carte cadeau, conversion de points, attribution d'un numéro de devis), **bornes** (47 h 59 contre 48 h 00), **isolation** (un jeton n'atteint jamais le plan d'un autre), **nombre de requêtes** (`assertNumQueries`).
    - **Les interdits de 7.4 sont des tests de non-régression**, pas des intentions. Fabriques `factory-boy` par modèle ; **aucune donnée réelle de client** dans une fixture. La couverture de 11.3 est un **plancher**, pas un objectif : 85 % de lignes couvertes sans test de concurrence ne vaut rien.
  - **`revue-projet`** — la version backend de la liste de contrôle, en complément de `/code-review` : interdits, bonnes pratiques, migrations lisibles et réversibles, et la question qui compte en premier — *cette PR enregistre-t-elle quelque chose qu'elle ne devrait pas ?*
- **Critères** : chaque skill se déclenche sur les tâches visées ; le skill `donnees-sensibles` cite, pour chaque interdit, le test qui le couvre ; aucun skill ne contient de secret, de prix ni de délai figé ; la section 7.5 ne duplique plus la liste opérationnelle.
- **Vous contrôlez** : demander à l'agent d'ajouter un champ à la fiche client et vérifier qu'il refuse d'y mettre une allergie en citant la règle, sans que vous ayez eu à la rappeler.

#### B01. Authentification de l'équipe, thème Unfold et journal d'audit
- **Branche** : `feat/b01-staff-admin` · **Taille** : moyenne · **Dépend de** : B00 · **Débloque** : B02, B04b, B10.
- **Objectif** : Aujourd'hui rien n'est géré dans un outil : tout est dans des fichiers et dans votre tête. Cette PR crée la porte d'entrée de votre futur administration : une administration web à vos couleurs, accessible uniquement par vous (et plus tard une assistante), protégée par un mot de passe et un code d'authentification sur votre téléphone. Elle garde aussi une trace de chaque modification (qui, quoi, quand), utile en cas d'erreur de saisie ou de litige avec un client. Vos données de clients et de prix vivront ici : l'accès doit être verrouillé avant d'y mettre quoi que ce soit.
- **Fonctionnalités et règles**
  - Modèle `StaffUser` (extension de `AbstractUser`, créé dès le début). Connexion par mot de passe + **2FA TOTP obligatoire en production** (pas de clé matérielle ; QR code à l'enrôlement et codes de secours imprimables), `django-axes` (verrouillage après 5 échecs), session de 8 h avec expiration d'inactivité de 30 min, cookies `Secure` et `HttpOnly`.
  - Deux groupes : `owner` (tout) et `assistant` (lecture et saisie, ni suppression ni export RGPD). **Un seul compte `owner` au départ** ; l'assistant est prévu mais non créé.
  - Administration **Unfold** aux couleurs du site (`styles/tokens.css`, `public/assets/logo/table-et-tribu.svg`), **bandeau d'environnement** (local, test, production), menu latéral par domaine, utilisable sur téléphone, sous `ADMIN_URL_PREFIX` (préfixe non évident). Pas de restriction par IP par défaut ; si l'hébergement passe par Teads : #ask-devx (chemin approuvé) et #ask-security.
  - `AuditEvent` (qui, quoi, quand, objet, avant/après) avec un utilitaire d'écriture ; `django-simple-history` sur les modèles sensibles et le contenu. Une commande `create_owner` crée le premier compte.
- **Critères** : impossible d'accéder à l'administration sans 2FA en configuration de production ; 5 échecs bloquent temporairement ; un `assistant` ne supprime rien ; une action écrit une ligne d'audit ; le bandeau affiche l'environnement.
- **Vous contrôlez** : créer le compte, activer le 2FA, rater 5 connexions, voir une ligne d'audit. **Après** : M1.12.

#### B02. Infrastructure transversale : tâches, e-mails, fichiers, intégrations factices
- **Branche** : `feat/b02-infra` · **Taille** : moyenne à grande · **Dépend de** : B01 · **Débloque** : B03, B04c, B07, B09, B11, B13, B18.
- **Objectif** : Plusieurs fonctions ont besoin des mêmes briques : envoyer des e-mails (propositions de menu, rappels, listes d'ingrédients), lancer des tâches automatiques chaque nuit (ouvrir les menus de la semaine, relancer un client), ranger des fichiers (devis, PDF, photos) et parler à HubSpot, Stripe ou GitHub. Cette PR les installe une fois pour toutes, avec des versions factices pour tester sans rien envoyer à de vrais clients. Concrètement, vous pourrez modifier le texte d'un e-mail dans l'administration et envoyer un message de test ; et en préproduction, aucun e-mail ne partira jamais vers un vrai client.
- **Fonctionnalités et règles**
  - **Tâches** : Procrastinate (file adossée à PostgreSQL, pas de Redis) ; tâches idempotentes avec reprises exponentielles ; une tâche planifiée de démonstration.
  - **E-mail** : interface `Mailer` (Brevo par l'API ; console en développement ; **en test, envoi uniquement vers des adresses autorisées**). `EmailTemplate` modifiable en administration (variables autorisées, aperçu avec données d'exemple, envoi de test) et `EmailLog` (sans le corps du message). **Vouvoiement**, signature de la cheffe, expéditeur et réponse `contact@tabletribu.com`, pas de copie cachée à la cheffe, **aucun envoi marketing**, pas de SMS ni WhatsApp. Tous les rappels automatiques des PR suivantes sont actifs par défaut.
  - **Fichiers** : stockage compatible S3 hébergé dans l'UE, deux espaces : **public** (images du site, via CDN) et **privé** (devis, preuves, PDF, liens signés de courte durée). Type vérifié par le **contenu**, la taille et l'extension, sans antivirus.
  - **`HubSpotSettings`** (singleton, administration, champs vides au départ) : l'identifiant du **pipeline**, ceux des étapes **« Devis envoyé »** et **« Dossier créé »** que l'administration déplace elle-même (B04c, B11), et les adresses des **trois vues enregistrées** (« deals sans devis », « devis sans réponse », « deals Gagné sans dossier ») que la page A-Suivi affiche (B12). Ces identifiants sont **opaques** et changent si vous recréez un pipeline : ils n'ont rien à faire dans le code ni dans une variable d'environnement. Un bandeau signale tant qu'ils sont vides, et un déplacement d'étape demandé sans identifiant configuré **échoue proprement** au lieu d'écrire n'importe où.
  - **Intégrations** : interfaces `HubSpotClient`, `StripeGateway`, `Mailer`, `InvoicingProvider`, `GitHubDispatcher` (et plus tard `GoogleDocsClient`, livré par B04c), chacune avec une implémentation **factice** utilisée en local et en test.
  - `/healthz` étendu (file de tâches, dernière exécution de la tâche planifiée).
- **Critères** : une tâche échouée est reprogrammée puis visible ; un e-mail de test part vers une adresse autorisée et pas vers une autre ; un fichier dont le type réel ne correspond pas est refusé ; les clients factices sont utilisés par défaut en test.
- **Vous contrôlez** : lancer le worker, déclencher la tâche, envoyer un e-mail de test, téléverser un fichier valide puis un faux. **Avant (test réel)** : M1.2, M1.3.

#### B03. Contenu du site (CMS) : modèles et administration
- **Branche** : `feat/b03-content` · **Taille** : grande · **Dépend de** : B02 · **Débloque** : B04, B05, B06, B06b, B08.
- **Objectif** : Le contenu du site est aujourd'hui figé dans des fichiers que seul un développeur peut modifier : pour changer une photo de réalisation, corriger la FAQ ou ajouter un avis, il faut toucher au code. Cette PR met tout ce contenu dans l'administration : réalisations avec galerie, inspirations (indépendantes des réalisations), avis, FAQ, pages légales, coordonnées, zones et communes. Vous éditez en brouillon, et rien n'est visible tant que vous ne publiez pas (B09). C'est le premier gain concret : modifier votre site sans développeur.
- **Fonctionnalités et règles** (modèles : section 9.1)
  - **Brouillon par défaut** ; seul le contenu publié sort par l'API ; ordre au glisser-déposer ; historique des modifications ; actions publier et dépublier ; filtres publié/brouillon et service.
  - **Images** : l'original est stocké (les variantes sont laissées à Next.js), 10 Mo au plus, `alt` obligatoire, dimensions extraites automatiquement. Lien interne : doit commencer par `/`.
  - **FAQ** : une seule collection avec un champ d'**emplacement multiple**. Le site en compte **neuf** aujourd'hui — la page FAQ (5 rubriques) plus les blocs des pages accueil, batch cooking, chef privé, cours, tarifs, zones, recettes et contact — pour **70 questions distinctes recopiées en 118 exemplaires**. Une question éditée une fois se répercute donc partout où elle est placée. **Pages légales** : éditées dans Django, **versionnées**, anciennes versions conservées. Texte en **Markdown** (zone de texte avec aperçu, pas d'éditeur riche) ; **français uniquement**.
  - **`LegalIdentity`** (singleton, champs vides au départ, bandeau d'avertissement tant qu'elle est incomplète).
  - **Périmètre exact — ce que vous modifiez vous-même et ce qui demande un développeur : section 2.4.** Cette PR en livre la première moitié (réalisations, inspirations, avis, FAQ, pages légales, coordonnées, identité légale, zones et communes) ; B04, B06b et B08 complètent, B02 livre les textes des e-mails.
- **Critères** : pas d'image sans `alt` ; un brouillon n'est jamais publié ; l'ordre se modifie au glisser-déposer ; un `assistant` ne supprime pas ; chaque modification est tracée.
- **Vous contrôlez** : créer un projet avec galerie, une inspiration, une FAQ de trois entrées, modifier les réglages, lire l'historique.

#### B04. Tarifs, packs, offres commerciales et marqueurs de prix
- **Branche** : `feat/b04-pricing` · **Taille** : moyenne · **Dépend de** : B03 · **Débloque** : B04b, B05, B06, B10, B11.
- **Objectif** : Vos prix sont aujourd'hui écrits dans le code du site (39,50 € après crédit d'impôt pour 3 dîners au mois) et dans des textes de FAQ qui peuvent diverger (« 49,50 € »). Cette PR met la grille de prix dans l'administration : un tableau par pack, formule et nombre de dîners, le taux de crédit d'impôt, les prix à la personne du chef privé et des cours. Quand vous changez un prix, le site se met à jour partout à la prochaine publication, textes compris grâce aux marqueurs de prix. Un client déjà engagé garde le prix qu'il a accepté : seuls les nouveaux engagements prennent le nouveau. Cette grille préremplira aussi le prix quand vous créerez un engagement (B11).
- **Les offres commerciales** : c'est l'autre moitié de cette PR. Votre métier ne se vend pas seulement par pack, il se vend par **moment de vie** — *Offre Post-partum*, *Offre Senior*, *Offre anniversaire*, *Offre de renouvellement*, et toutes celles que vous inventerez à Noël ou à la rentrée. Vous les créez **vous-même dans l'administration**, avec leur texte et leur éventuelle remise, sans développeur et sans attendre une mise en ligne. Deux bénéfices concrets : le devis se remplit d'un clic avec le bon texte et le bon prix, et **chaque engagement garde la trace de l'offre qui l'a vendu** — vous saurez dans un an laquelle rapporte.
- **Fonctionnalités et règles** (modèles : section 9.3)
  - **Données initiales** reprenant `PRICES` du code, et **test de parité** : les montants calculés sont comparés à ceux de `lib/lead/pricing.ts` pour toutes les combinaisons.
  - **Administration** : la grille s'édite en tableau, les offres en liste ordonnable.
  - **Grille de référence = `PRICES` du code** (39,50 € après crédit d'impôt pour 3 dîners au mois). Le prix d'un pack dépend **uniquement** du pack, de la formule et du nombre de dîners. Le sur mesure est toujours saisi à la main. Le site affiche le prix **après crédit avec le prix avant à côté**.
  - Packs : *Essentiel* = série Classiques ; *Signature* = Classiques + Signature ; *Sur mesure* = tout.
  - Chef privé et cours : prix **à la personne** (« à partir de 35 € » et « 45 € »), sans minimum de convives ; acompte du chef privé 30 %.
  - **Zones** : déplacement par zone saisi en administration (zone 1 = 0, zone 2 supplément, zone 3 sur demande avec minimum de commande).
  - Service de calcul `price_before`, `price_after`, `from_price` identique à `lib/lead/pricing.ts`. **Marqueurs de prix** dans le Markdown (liste en 9.3) remplacés par l'API ; un marqueur inconnu est une erreur.
  - Le changement d'un prix **n'affecte jamais** les engagements existants (avertissement dans l'administration).
  - **Offres commerciales** (`Offer`) : création libre en administration, avec un service visé, une phrase d'accroche, un paragraphe pour le devis, une **fenêtre de campagne** et, au choix, une remise en pourcentage, une remise fixe ou un prix forfaitaire. Une offre peut aussi **préremplir** le formulaire de devis (pack, formule, dîners, portions, convives) pour les prestations qu'elle vise.
  - **Quatre offres livrées en exemple**, inactives, à vous d'ajuster les textes et les montants : *Post-partum*, *Senior*, *Anniversaire*, *Renouvellement*. Ce sont des points de départ, pas des règles.
  - **Une offre ne contourne jamais les garde-fous** : le prix obtenu reste **figé dans l'engagement** à sa création, et une offre expirée n'apparaît plus dans le formulaire de devis — elle reste utilisable, mais avec un motif, et l'action est journalisée.
  - **Une offre remplace le motif libre d'une remise.** Jusqu'ici, un prix différent de la grille exigeait un texte libre ; désormais, si la remise vient d'une offre, le motif est l'offre elle-même. C'est ce qui rend la remise **dénombrable** au lieu d'être une note que personne ne relira.
- **Critères** : prix identiques à ceux du site pour toutes les combinaisons ; un marqueur inconnu échoue ; aucun flottant dans les calculs monétaires (centimes) ; une offre portant deux avantages tarifaires à la fois est refusée ; une remise d'offre donne exactement le même montant que la même remise saisie à la main.
- **Vous contrôlez** : modifier un prix, vérifier le résultat ; essayer un marqueur inconnu ; créer une offre « Fête des mères » valable un mois et vérifier qu'elle disparaît du formulaire de devis après sa date de fin.

#### B04b. Aide à la rédaction des devis (un modèle par service)
- **Branche** : `feat/b04b-quote-helper` · **Taille** : petite à moyenne · **Dépend de** : B01, B04 · **Débloque** : B04c.
- **Objectif** : Le devis est l'acte commercial du métier, et il reste écrit à la main dans Google Docs — c'est le bon choix à ce volume. Mais **recalculer les prix à chaque fois est exactement l'endroit où les erreurs apparaissent**, et une erreur sur un devis coûte soit de la marge, soit une correction embarrassante devant le client. Cette PR ne génère pas encore le document (c'est **B04c**) : elle construit **les chiffres justes et le texte du devis**, pour chacun des trois services. Elle vous fait gagner le calcul, la recherche du prochain numéro et la vérification des conditions propres à chaque prestation.
- **Pourquoi en deux PR** : B04b n'a besoin d'**aucun compte externe** et peut donc être livrée immédiatement ; B04c y ajoute la génération du Google Docs, qui demande un projet Google Cloud et une autorisation (M1.18). Ce découpage a un second intérêt : le texte à copier de B04b reste le **mode de secours** de B04c le jour où l'API Google est indisponible ou l'autorisation expirée. On n'est jamais bloqué pour faire un devis.
- **Fonctionnalités et règles** : page d'administration **A-Devis**, avec trois modèles choisis en haut de l'écran.
  - **Offre (facultatif)**, en premier champ : une liste des offres en cours pour ce service. La choisir **préremplit** les champs qu'elle définit et **applique son avantage tarifaire**, que l'écran affiche comme une ligne à part — « Offre Post-partum : −15 % » — pour que vous voyiez toujours le prix plein et la remise séparément. Vous pouvez tout modifier ensuite ; l'offre reste attachée au devis.
  - **Batch cooking** : pack, formule (1 semaine, 1 mois, sur mesure), nombre de dîners, portions, commune (qui donne la zone et le déplacement). Sortie : lignes de prestation, **total avant crédit d'impôt, crédit, total après crédit**, mention du crédit d'impôt, règle d'annulation à 48 h.
  - **Chef privé** : nombre de convives, prix par personne (prérempli), déplacement, options. Sortie : total, **acompte de 30 %**, règle d'annulation à 7 jours.
  - **Cours de cuisine** : nombre de convives, prix par personne (prérempli), déplacement. Sortie : total, règle d'annulation à 48 h.
  - **Lignes libres** ajoutables à chaque modèle : supplément, remise (motif obligatoire, **sauf si elle vient d'une offre** : l'offre est alors le motif), courses estimées, plat sur mesure. Chacune porte sa case « éligible au crédit d'impôt », par défaut décochée par prudence **[À VÉRIFIER]** avec le comptable (M1.14).
  - **Sortie** : un bloc de texte **prêt à coller**, avec un bouton « copier », plus la **version des CGV en vigueur** et la **phrase d'acceptation**. Une vue tableau sert à relire les montants. B04c réutilise exactement ces valeurs pour remplir le document.
  - **Numérotation** : l'écran attribue le premier numéro libre (`DEV-AAAA-NNN`) et **l'enregistre** dans un registre minimal (`IssuedQuote`, section 9.4). C'est la seule chose que cette PR écrit en base, et c'est nécessaire : sans elle, deux devis dont aucun n'est encore accepté recevraient le même numéro. **Cela remplace le registre manuel** de M1.1. Un trou dans la suite est sans conséquence pour des devis — contrairement aux factures, dont la numérotation continue est gérée par l'outil de facturation.
  - **Ce qui n'est pas enregistré** : **aucune donnée du prospect**. Le nom, l'adresse et le détail de la prestation traversent le formulaire, servent à composer le texte, et ne sont jamais écrits en base. Le registre ne porte que la référence, le service et la date (interdit 1, section 7.4). Un client n'existe dans Django qu'au moment où le dossier est créé en page A-Dossier (B11).
  - **Bandeau d'avertissement** tant que l'identité légale (`LegalIdentity`) est incomplète, puisque le devis doit la porter.
- **Critères** : les montants sont **identiques** à ceux de la grille et à ceux du site pour toutes les combinaisons ; **le registre ne contient aucun nom, e-mail ni téléphone** (test sur les champs du modèle) ; deux devis générés coup sur coup n'ont jamais le même numéro, y compris en parallèle (test de concurrence) ; chaque modèle rappelle la règle d'annulation propre à son service ; une remise sans motif est refusée.
- **Vous contrôlez** : produire un devis de chaque type, coller le texte dans un document, et vérifier les totaux à la main une fois pour chacun. **Avant** : **M1.14** (comptable, pour l'éligibilité des lignes au crédit d'impôt).

#### B04c. Générer le devis dans Google Docs
- **Branche** : `feat/b04c-quote-docs` · **Taille** : moyenne · **Dépend de** : B02, B04b, **M1.18** · **Débloque** : B21.
- **Objectif** : B04b vous donne les bons chiffres, mais il reste à ouvrir un document, le dupliquer, coller, renommer. Cette PR fait ce dernier pas : depuis la page A-Devis, un bouton **crée le devis dans votre Google Drive**, à partir de votre propre modèle, avec le numéro, l'identité du client, les lignes de prestation, les totaux avant et après crédit d'impôt, la date de validité et la version des CGV **déjà remplis**. Vous recevez un lien, vous ouvrez le document, et **vous l'éditez librement dans Google Docs** comme n'importe quel autre : ajouter une phrase, retoucher une formulation, adapter un détail. Le générateur fait la partie mécanique ; la rédaction reste la vôtre.
- **Pourquoi cette forme-là et pas un PDF** : un PDF généré est figé — la moindre phrase à ajouter oblige à repasser par l'outil, ou à tout refaire à la main. Un Google Docs reste **modifiable, commentable, exportable en PDF** d'un clic, et s'archive dans votre Drive comme aujourd'hui. C'est ce qui rend le générateur acceptable alors que la version « PDF scellé » du plan précédent avait été abandonnée : **le document reste à vous**, l'outil ne fait que le préparer.
- **Fonctionnalités et règles**
  - **Trois modèles dans votre Drive, créés depuis l'administration.** Un bouton « Créer les modèles » crée une fois pour toutes un dossier `Devis` et trois documents (batch cooking, chef privé, cours). **Vous les habillez ensuite dans Google Docs** : logo, polices, mise en page, parties fixes (identité, modalités, conditions d'annulation, CGV, phrase d'acceptation). Vous y laissez des **repères** de la forme `{{numero}}`, `{{client_nom}}`, `{{total_apres_credit}}`, `{{offre}}` (le paragraphe de l'offre, vide s'il n'y en a pas)… ; la page A-Devis affiche la liste des repères disponibles et signale ceux que le modèle n'utilise pas.
  - **Contrainte à connaître** : l'autorisation demandée (`drive.file`, voir plus bas) ne donne accès **qu'aux fichiers créés par l'application**. Les modèles doivent donc être créés par le bouton — vous ne pouvez pas désigner un document que vous auriez fait vous-même. En pratique : vous collez votre mise en page actuelle dans le modèle créé, une fois.
  - **Génération d'un devis** : la page A-Devis ajoute un bouton **« Générer le devis »**. L'enchaînement est : attribuer et réserver le numéro (`IssuedQuote`, en transaction) → **copier** le modèle du service dans le dossier `Devis` → le **renommer** `DEV-AAAA-NNN — Nom du client` → **remplacer les repères** par les valeurs calculées → rendre le lien. L'écran affiche le lien et un bouton pour ouvrir le document.
  - **Interface technique** : `GoogleDocsClient` (7.2) avec une implémentation réelle et une **implémentation factice** utilisée en local et en test, comme les autres intégrations. Appels : Drive `files.copy` et `files.create` (dossier), Docs `documents.batchUpdate` avec des requêtes `replaceAllText`. Les identifiants du dossier et des trois modèles sont rangés dans un singleton d'administration, pas dans l'environnement.
  - **Autorisation** : OAuth 2.0 sur **votre propre compte Google**, avec le seul périmètre **`drive.file`**, qui est **non sensible** chez Google et accepté par `documents.batchUpdate`. Conséquences voulues : les documents vous appartiennent et sont créés dans votre Drive ; l'application **ne peut pas lire le reste de votre Drive** ; et la mise en production de l'autorisation n'exige pas la procédure de validation des périmètres sensibles. Le jeton de rafraîchissement est un **secret d'environnement**, obtenu une fois par une **commande de première autorisation** (M1.18).
  - **Jamais bloquant** : si l'appel échoue (API indisponible, autorisation révoquée ou expirée, quota), l'écran **retombe sur le texte à copier de B04b** avec un message clair, et une alerte part sans aucune donnée personnelle. Un numéro réservé dont le document n'a pas pu être créé reste réservé et marqué « échec » : **relancer la génération réutilise le même numéro** au lieu d'en consommer un autre.
  - **Ce que Django ne fait pas** : il ne **relit jamais** le document, ne le modifie pas après coup, n'en garde pas de copie et ne suit pas son statut — le suivi du devis envoyé reste dans HubSpot (section 2.7). Le registre ne stocke que la référence, le service, la date, l'identifiant du document et son lien ; **aucun nom** (interdit 1, section 7.4).
  - **Bandeau d'avertissement** tant que l'identité légale (`LegalIdentity`) est incomplète, et tant que les modèles n'ont pas été créés.
- **Critères** : un devis généré ouvre un document **modifiable** dans votre Drive, portant le bon numéro et les bons montants ; **aucun repère non remplacé** ne subsiste (test de relecture du document produit) ; une génération en échec ne consomme pas de numéro et bascule sur le texte à copier ; aucune donnée personnelle dans les journaux ni dans l'alerte ; le client factice est utilisé par défaut en local et en test.
  - **Le deal passe à « Devis envoyé » tout seul**, à la génération, selon la même règle d'absence d'ambiguïté qu'en B11 : la page cherche les deals du contact et ne déplace que s'il y en a **un seul** dans une étape antérieure ; sinon elle vous demande lequel, et vous pouvez refuser.
    - **Un décalage assumé** : l'administration sait qu'un devis est **généré**, pas qu'il est **parti**, puisque c'est vous qui l'envoyez depuis HubSpot. Marquer « Devis envoyé » à la génération peut donc se tromper si vous générez un brouillon sans l'envoyer. Le coût de cette erreur est faible et ne sort pas de votre bureau : les relances de cette étape sont **vos tâches HubSpot**, pas des e-mails au client ; et vous ramenez le deal en arrière d'un clic. Le coût de l'erreur inverse — oublier l'étape et ne jamais être relancée sur un devis envoyé — est une vente perdue.
    - **Contrainte imposée par l'interdit 1 (section 7.4)** : le registre des devis ne porte aucune donnée de prospect, donc **aucun identifiant de deal n'est enregistré**. L'identifiant ne sert qu'à l'appel et n'est jamais écrit en base — l'opération ne peut donc pas être rejouée plus tard. La décision de confidentialité coûte cette commodité, pas davantage.
- **Vous contrôlez** : créer les modèles, habiller celui du batch cooking dans Google Docs, générer un devis, l'ouvrir, **y ajouter une phrase à la main**, l'exporter en PDF ; puis fausser volontairement le jeton et vérifier que la page vous rend quand même le texte à copier. **Avant** : **M1.18**, **M1.1**.

#### B05. API de lecture pour le site (construction)
- **Branche** : `feat/b05-read-api` · **Taille** : moyenne · **Dépend de** : B03, B04 · **Débloque** : B06, B06b, B09, S01.
- **Objectif** : Pour que le site lise ses contenus dans Django sans rien changer pour le visiteur, il faut une porte de lecture. Cette PR expose les contenus publiés (réalisations, avis, FAQ, zones, tarifs, recettes) sous une forme exactement identique à ce que le site attend aujourd'hui. Le visiteur ne verra rien : le site reste statique et rapide, car il ne lit Django qu'au moment de sa construction, jamais quand quelqu'un ouvre une page. C'est la condition pour que vos modifications dans l'administration puissent un jour devenir des pages du site.
- **Fonctionnalités et règles** : routes de la section 10.1, jeton `Bearer` en lecture seule (`BUILD_API_TOKEN`, comparaison en temps constant), clés en camelCase **identiques aux schémas Zod** du site, contenu **publié** seulement, `updatedAt` par objet, ETag, URL d'images absolues, marqueurs de prix déjà remplacés, schéma OpenAPI.
- **Critères** : sans jeton, 401 ; un brouillon n'apparaît jamais ; chaque réponse correspond au schéma Zod ; ETag renvoie 304 si rien n'a changé.
- **Vous contrôlez** : appeler les routes avec `curl` et le jeton local, publier puis dépublier un contenu.

#### B06. Import des contenus existants du site
- **Branche** : `feat/b06-imports` · **Taille** : moyenne · **Dépend de** : B03, B04, B05 · **Débloque** : B06b, S01.
- **Objectif** : Votre site est déjà rempli : 9 réalisations, des inspirations, une FAQ, des avis, des pages légales, des zones, des prix, 5 recettes. Hors de question de tout ressaisir. Cette PR charge automatiquement ce contenu existant dans l'administration, puis vérifie que ce que Django sert est identique à ce que le site affiche aujourd'hui. Vous retrouvez votre site à l'identique, désormais modifiable depuis l'administration. L'import peut être relancé sans risque de doublon.
- **Fonctionnalités et règles** : commandes de gestion idempotentes avec `--dry-run` et `--site-path` : `import_projects`, `import_inspirations`, `import_pages`, `import_faq`, `import_reviews`, `import_zones`, `import_pricing`, `import_site_settings` ; images copiées vers le stockage ; photos d'avis (associées par index aujourd'hui) devenues un champ.
  - **Où se trouve réellement chaque contenu**, car ce n'est pas uniforme : réalisations, inspirations et pages légales dans `content/` ; prix, packs, zones, communes et recettes dans `lib/*.ts` ; **la FAQ dans `messages/fr.json`**, et non dans `content/faq/`, qui est **un dossier vide**. Un import qui chercherait la FAQ dans `content/` n'importerait rien.
  - **`import_faq` lit neuf emplacements** : `faqPage.sections[].items[]` (52 entrées) et les blocs `faq.items[]` des pages accueil (10), batch cooking (14), chef privé (10), cours (10), tarifs (8), zones (5), recettes (5) et contact (4). Il **dédoublonne par question** : 118 exemplaires pour 70 questions distinctes, chaque question recevant la liste de ses emplacements.
  - **Treize questions ont aujourd'hui des réponses différentes selon la page** (adaptations rédactionnelles : plus courtes sur l'accueil, propres au service sur les pages de service). Une collection unique n'en garde qu'une. L'import **ne tranche pas** : il écrit la version de la page FAQ, marque l'entrée « à relire » et produit un rapport des variantes écartées, que vous arbitrez à l'étape **M1.20**.
- **Critères** : deux imports successifs donnent le même résultat ; `--dry-run` n'écrit rien ; la sortie de l'API est **identique** aux données d'origine pour chaque collection. **Chaque import crée au moins un objet, sinon il échoue** — sans cette règle, un import qui ne trouve pas sa source réussit et le contrôle de parité le confirme, puisque vide égale vide. Les comptes attendus sont vérifiés : 9 réalisations, 9 inspirations, 70 questions, 5 recettes, 3 zones. La FAQ cite encore « 49,50 € » : l'import la conserve, la correction par marqueurs est une décision de contenu ultérieure.
- **Vous contrôlez** : importer sur une base vide, parcourir l'administration, comparer quelques fiches avec le site.

#### B06b. Blocs vendeurs des pages dans le CMS
- **Branche** : `feat/b06b-page-blocks` · **Taille** : moyenne · **Dépend de** : B03, B05, B06 · **Débloque** : S01.
- **Objectif** : Les pages qui vendent — accueil, batch cooking, chef privé, cours, tarifs, zones — contiennent **environ 9 000 mots de prose** qui restent dans le code après B03, alors que ce sont précisément les textes qu'on veut retoucher après un appel client qui apprend quelque chose. Cette PR les fait passer dans l'administration, **sans toucher aux libellés d'interface** qui, eux, commandent le comportement des composants.
- **La décision qui rend la chose simple** : le site charge tous ses textes en **un seul point**, `lib/i18n.ts`. L'API ne renvoie donc pas des pages mais un **calque** : un objet de la même forme que `messages/fr.json`, limité aux clés éditées, que la construction **superpose** au fichier. Conséquences : aucun composant n'est modifié, les clés non migrées continuent de venir du fichier, le contrôle de parité est une égalité d'objets, et migrer un bloc de plus devient une opération de données, pas de code.
- **Fonctionnalités et règles** (modèles : section 9.1)
  - **`PageBlock`** : une ligne par couple page + section (par exemple `batchPage.audience`), avec `kicker`, `title`, `body` (Markdown), `seo_title` et `seo_description` pour les sections de référencement, plus `PageBlockItem` pour les listes d'arguments (`title`, `body`, `order`). Brouillon et publication comme le reste du contenu (B03), historique des modifications, aperçu du Markdown.
  - **Ce qui est éditable, et la règle qui le définit** : les champs **rédactionnels** — `kicker`, `title`, `intro`, `body`, `note`, `description`, `excerpt` et les `items` des sections d'argumentaire — ainsi que les `seo.title` et `seo.description` de chaque page. **Ce qui ne l'est pas** : tout ce qui pilote un comportement — appels à l'action, bascules, ouvrir/fermer, précédent/suivant, filtres, compteurs, unités, états vides, messages de formulaire.
  - **Garde-fou** : une clé ne peut être **créée** ni **renommée** depuis l'administration, seulement modifiée. Le calque ne contient que des clés déjà présentes dans `messages/fr.json`, sinon le composant qui les lirait n'existe pas. Un bloc vidé revient à la valeur du fichier plutôt que d'afficher du vide.
  - **`import_page_blocks`** (idempotente, `--dry-run`, `--site-path`) charge la prose existante des pages à partir de `messages/fr.json` : **319 chaînes de prose**, en ignorant les 1 231 libellés.
  - **Route** `GET /api/v1/content/page-texts` : le calque, `updatedAt`, ETag, contenu **publié** seulement, marqueurs de prix déjà remplacés (9.3).
- **Critères** : le calque ne porte **aucune clé absente** de `messages/fr.json` (test) ; sans aucune édition, le fichier fusionné est **identique** au fichier d'origine (test d'égalité profonde) ; un bloc dépublié revient à la valeur du fichier ; aucun libellé d'interface n'est exposé ; `import_page_blocks` crée au moins un objet.
- **Vous contrôlez** : modifier l'accroche de la page batch cooking et le titre de référencement de l'accueil, publier, et retrouver vos textes sur le site de test après la publication (palier 4).

#### B07. Déploiement de l'environnement de test
- **Branche** : `feat/b07-deploy-test` · **Taille** : moyenne · **Dépend de** : B02, **décision M1.9** · **Débloque** : B20b, S01, S02.
- **Objectif** : Jusqu'ici tout tourne sur l'ordinateur du développeur. Cette PR met le backend en ligne pour l'environnement de test, **pour que vous puissiez essayer l'administration depuis votre navigateur** au lieu d'attendre une démonstration. C'est elle qui rend tous les paliers suivants vérifiables par vous. Le site de test, lui, ne lira ces contenus qu'à partir de S01. Elle met aussi en place les sauvegardes quotidiennes de la base. Elle dépend d'une décision de votre part : où héberger Django et qui peut y accéder (si cela passe par Teads : #ask-devx et #ask-security). Tant que ce choix n'est pas fait, le développement continue en local.
- **Fonctionnalités et règles** : `Dockerfile` de production, migrations contrôlées, `/healthz` comme test de santé, variables de la section 11, **sauvegardes quotidiennes** de la base (30 jours), journaux sans donnée personnelle, domaine de test (hypothèse `api.test.tabletribu.com`), TLS, administration sous `ADMIN_URL_PREFIX`, workflow de déploiement vers `test` sur `main` (environnement GitHub `test`). Fichiers **génériques** : aucune hypothèse sur l'hébergeur tant qu'il n'est pas choisi. Hébergement dans l'UE. La PR livre aussi `docs/DEPLOY.md` : procédure de déploiement, restauration d'une sauvegarde, rotation des secrets.
- **Critères** : le conteneur démarre avec les variables d'un environnement vierge ; `/healthz` répond ; l'administration n'est joignable que sous son préfixe ; un déploiement s'exécute depuis GitHub.
- **Vous contrôlez** : ouvrir `/healthz` depuis votre navigateur, vous connecter à l'administration sous son préfixe, lancer un déploiement depuis GitHub, puis **demander une restauration de sauvegarde** — une sauvegarde jamais restaurée ne compte pas.
- **Bloquant** : attend votre **décision d'hébergement** (M1.9) ; sinon le développement continue en local, mais vous ne pouvez rien essayer vous-même. **Avant** : M1.9, M1.10, secrets de l'environnement `test`.

#### B08. Catalogue de recettes et ingrédients
- **Branche** : `feat/b08-catalog` · **Taille** : grande · **Dépend de** : B03 · **Débloque** : B13.
- **Objectif** : Pour que le client choisisse ses recettes et reçoive sa liste d'ingrédients, il faut un catalogue précis : chaque recette avec ses ingrédients, leurs quantités pour 4 personnes et leurs allergènes. Cette PR crée ce catalogue dans l'administration à partir de vos 5 recettes actuelles : vous complétez les quantités ingrédient par ingrédient, et le système calcule seul les allergènes de chaque recette. Une recette n'est proposée aux clients que lorsque ses quantités sont complètes, sinon la liste d'ingrédients serait fausse. Les quantités restent privées : seuls vous et la liste générée les utilisent, alors que les clients voient les ingrédients et les allergènes.
- **Fonctionnalités et règles** (modèles : section 9.2)
  - 14 allergènes UE, mêmes clés que `lib/recipes.ts`. **Allergènes d'une recette = union de ceux de ses ingrédients** + champ manuel pour les traces. Ils sont **affichés au client**, sur la recette et sur chaque ingrédient.
  - **4 portions de référence** par recette, quantités proportionnelles. **Aucun ingrédient n'est exclu** des listes (sel, huile et base compris). Prix des ingrédients : on garde le niveau 1 à 4. Pas de gestion de substitutions (la cheffe adapte et le note). Saison **indicative** seulement.
  - **Quantités saisies par la cheffe** ; une recette **ne peut pas être « disponible pour les clients »** tant qu'une quantité manque. Les quantités ne sortent **jamais** par l'API publique ni par la page de choix (9.2).
  - Administration : ingrédients en ligne, allergènes calculés en lecture seule, fusion de doublons, commande `import_recipes` depuis `lib/recipes.ts`.
- **Critères** : l'allergène d'un ingrédient apparaît sur la recette ; l'API ne renvoie aucune quantité ; l'activation « disponible » est refusée s'il manque une quantité.
- **Vous contrôlez** : importer les 5 recettes, ajouter leurs ingrédients, tenter d'activer sans quantité, lire l'API.

#### B09. Publication du site depuis l'administration
- **Branche** : `feat/b09-publish` · **Taille** : moyenne · **Dépend de** : B02, B05 · **Débloque** : S02.
- **Objectif** : Une fois votre contenu modifié dans l'administration, il faut le mettre en ligne. Cette PR ajoute un bouton « Publier » qui reconstruit le site sans passer par un développeur. Vous voyez si la publication est en cours, réussie ou en échec, avec l'historique des publications. Si vous cliquez plusieurs fois de suite, rien ne se dédouble, et un échec laisse en ligne le site précédent.
- **Fonctionnalités et règles** : page d'administration **A-Publier**. Bouton **Publier** : crée un `PublishRun`, **regroupe** les clics rapprochés (délai de 2 minutes, un seul appel), appelle `repository_dispatch` du dépôt `chefmeemz` (type `content-updated`, jeton à portée minimale), suit le statut via l'API GitHub (en attente, en cours, en ligne, échec, lien vers l'exécution), désactive le bouton pendant une construction, affiche l'historique et le nombre de modifications non publiées par collection ; action journalisée.
- **Critères** : 5 clics en 10 secondes = un seul appel ; un échec de GitHub est affiché et reprogrammé.
- **Vous contrôlez** : cliquer plusieurs fois, lire l'historique, simuler un échec. **Avant (test réel)** : M1.7.

#### B10. Clients, engagements, passages et réservations
- **Branche** : `feat/b10-clients-engagements` · **Taille** : grande · **Dépend de** : B01, B04 · **Débloque** : B11, B12, B13, B15, B16, B18, B19.
- **Objectif** : C'est le cœur de votre suivi client. Cette PR crée dans l'administration la fiche du client (e-mail, prénom, nom, lien vers sa fiche HubSpot), ses engagements (une semaine, un mois de 4 passages, ou sur mesure), les passages avec leurs dates, et les réservations de chef privé et de cours. Elle applique vos règles : annulation sans frais jusqu'à 48 h avant et facturable ensuite, prix figés à l'acceptation, pas deux engagements en même temps pour un même client sauf exception. Une seule page de fiche client montre tout : engagements, passages, pièces du devis, factures et paiements.
- **Fonctionnalités et règles** (modèles : sections 9.4 à 9.6)
  - **Client** : prénom, nom, e-mail (en minuscules, **un e-mail = un client**, c'est l'adresse à laquelle partent les propositions de menu), identifiant HubSpot, statut, compte URSSAF prêt ; ni téléphone, ni adresse, ni profil alimentaire. La note interne affiche « aucune allergie ni donnée de santé ici ».
  - **Fiche client** (une page) : identité, **bouton vers la fiche HubSpot**, engagements et passages, pièces du devis (téléchargement protégé), plans de repas et choix, factures et statut URSSAF (liens), paiements, cartes cadeaux, audit ; recherche par nom ou e-mail. Actions : **mettre à jour l'e-mail** (motif ; change l'adresse à laquelle partent les propositions de menu, invalide les liens de choix en cours, rappelle de faire la même modification dans HubSpot), désactiver, exporter (`owner`), anonymiser (`owner`).
  - **Engagement** : `upcoming` → `active` (à la première date) → `completed` (tous les passages terminés ou annulés) ; `cancelled` par la cheffe. Prix, taux de crédit et pièces du devis figés ; prix du passage différent de la grille = motif obligatoire.
  - **Passage** : `planned` → `done` ; `planned` → `postponed` (même numéro, nouvelle date) ; `planned` → `cancelled_free` (≥ 48 h) ou `cancelled_billable` (< 48 h ou absence, **au prix du passage**). Transitions par **services** (jamais de champ modifié directement). **Règle des 48 h** calculée depuis `scheduled_at` ; dérogation motivée et journalisée.
  - **Durée et dates** : durée libre, un seul champ date-heure par passage ; les 4 passages d'un mois ne sont pas forcément hebdomadaires mais tiennent dans une **fenêtre de 6 semaines** à compter du premier ; une seule cheffe. Un seul engagement actif par période (chevauchement signalé, dérogation possible). La cheffe date les passages dans la liste des passages « sans date » (modification rapide), avec une **aide à la saisie récurrente** (« tous les mardis à 18 h pendant N semaines ») qui remplit d'un coup les passages d'un engagement, chaque date restant modifiable ensuite. Indispensable pour un engagement long.
  - **Report ou annulation par le client** : il prévient la cheffe par e-mail ou par téléphone ; elle reporte ou annule depuis l'administration (même règle des 48 h). L'action est journalisée et le client reçoit la confirmation par e-mail.
  - **Réservations** (`Booking`, chef privé et cours) : **chef privé** : acompte (30 %), date confirmée seulement après paiement (B16), solde le soir, annulation sans frais plus de 7 jours avant sinon acompte conservé ; **cours** : sans frais jusqu'à 48 h. Écran de suivi : réservations à venir, acomptes en attente, menu à valider.
- **Critères** : une transition interdite lève une erreur ; l'annulation à 48 h est testée aux limites (47 h 59, 48 h 00) ; les prix d'un engagement ne changent pas quand la grille change ; une référence de devis déjà utilisée est refusée (mais le devis reste facultatif) ; aucun champ ne porte d'allergie.
- **Vous contrôlez** : créer un client et un engagement dans l'administration, planifier, annuler à 47 h puis 49 h, modifier un prix de grille, changer l'e-mail d'un client.

#### B11. Créer un client et un engagement depuis un devis accepté (page A-Dossier), notes HubSpot
- **Branche** : `feat/b11-create-from-quote` · **Taille** : moyenne à grande · **Dépend de** : B02, B04, B10 · **Débloque** : B12, B19.
- **Objectif** : C'est l'étape qui transforme un prospect en client. Aujourd'hui, quand le client répond « bon pour accord » à votre devis (fait dans Google Docs, envoyé depuis HubSpot), rien ne se passe dans un administration. Cette PR ajoute une page unique où vous créez, en quelques minutes, le client, son engagement et ses passages, en y joignant le PDF du devis et l'e-mail d'accord comme preuves. Le prix est prérempli depuis la grille ; si vous le modifiez, vous indiquez pourquoi. Pour un renouvellement, vous ajoutez un engagement au client existant, **sans devis obligatoire**. Django ne garde que le nécessaire : téléphone, adresse, allergies et historique restent dans HubSpot.
- **Le devis (hors Django)** : rédigé dans Google Docs depuis les modèles de **M1.1**, avec les chiffres et le texte fournis par la page A-Devis (**B04b**), puis envoyé depuis HubSpot. Ce qui compte pour cette PR : la **référence unique** `DEV-AAAA-NNN`, la **validité de 30 jours**, la version des CGV, et le fait que **l'accord se donne par e-mail seulement** (ni SMS ni oral), par la phrase « En répondant "bon pour accord", vous acceptez ce devis et nos conditions générales de vente ».
- **Fonctionnalités et règles** : page **A-Dossier** en quatre étapes, tout est saisi à la main (aucun fichier n'est lu automatiquement).
  1. **Client** : choisir un client existant (recherche nom ou e-mail) ou en créer un (e-mail, prénom, nom, identifiant ou lien de la fiche HubSpot). Si l'e-mail ou l'identifiant existe déjà, la page propose le client trouvé.
  2. **Prestation** : *batch* (**offre** si l'engagement en relève, pack, formule, dîners, nombre de passages 1 ou 4 ou saisi, **portions par passage** défaut 4, date de début, **prix par passage avant crédit** prérempli depuis la grille, **motif obligatoire** s'il est modifié) ; *chef privé ou cours* (date, convives, total, acompte prérempli à 30 % pour le chef privé, notes de menu).
  3. **Pièces (toutes facultatives)** : référence du devis (**unique si renseignée**), PDF du devis, e-mail d'accord (`.eml`, PDF, image ou texte), date d'accord, version des CGV (préremplie), plus une **note de source** libre (« accord oral », « reconduction à l'identique »…). **Un devis n'est pas obligatoire** : un renouvellement ou un engagement convenu sans devis se crée normalement ; la page affiche seulement un avertissement non bloquant « aucune pièce jointe ». Fichiers privés, type vérifié par le contenu, 10 Mo au plus.
  4. **Récapitulatif** : montants avant et après crédit pour vérification ; case « envoyer l'e-mail de bienvenue » (nouveau client) ou « envoyer l'e-mail de nouvel engagement » (client existant). Il n'y a pas d'invitation à envoyer : le client reçoit son lien de choix à chaque passage. La fiche client est créée dans tous les cas, y compris pour le chef privé et les cours : la réservation, l'acompte, le suivi de facture et l'avis y sont rattachés.
  - **À la création** (transaction atomique) : client si nouveau, engagement et passages non datés (ou réservation), audit. Ensuite : e-mail choisi, **note « dossier créé » dans HubSpot** (asynchrone, jamais bloquante ; notes seulement, **aucune lecture ni écriture d'identité**, aucune allergie), tâche « dater les passages » (relance du registre, B12) et **déplacement du deal HubSpot à « Dossier créé »**, qui arrête ses relances. Une double soumission est sans effet.
  - **Le déplacement du deal, et pourquoi il vaut la peine d'être automatisé** : l'oublier ne gêne pas votre travail, il fait relancer HubSpot à J+7 et J+14 **un client qui a déjà signé**. C'est la seule étape manuelle de cette page dont la conséquence sorte de votre bureau. Le droit existe déjà : l'application privée de M1.5 peut écrire des deals.
    - **« Gagné » est absorbé, pas automatisé** : la création du dossier **est** la preuve de l'accord, donc l'administration déplace le deal vers « Dossier créé » **depuis l'étape où il se trouve**, sans exiger qu'il soit passé par « Gagné ». Un pipeline HubSpot n'oblige pas à franchir les étapes une à une. Vous n'avez donc plus à marquer « Gagné » du tout : c'est une étape de moins à ne pas oublier.
    - **La page ne devine jamais** : elle cherche les deals du contact et ne décide que s'il n'y a **aucune ambiguïté**. Un seul deal dans une étape antérieure à « Dossier créé » : elle le déplace. Plusieurs ou aucun — le cas d'un client fidèle, dont chaque renouvellement a créé son deal — elle affiche la liste dans le récapitulatif et vous choisissez. **Vous ne collez jamais d'identifiant.**
    - **Asynchrone, jamais bloquant, idempotent** : le dossier se crée même si HubSpot est indisponible ; un deal déjà à « Dossier créé » ne bouge pas ; l'échec produit une ligne « intégration en échec » dans le registre (B12) et le rappel manuel reste le filet.
    - **L'identifiant de l'étape est une donnée de configuration**, modifiable dans l'administration : les identifiants de pipeline HubSpot sont opaques et vous pouvez recréer un pipeline. L'ancien `AuditEvent` enregistre l'étape avant et après.
  - **Ce que Django écrit dans HubSpot, et ce qu'il n'y écrit pas.** Cette PR élargit délibérément l'écriture de « des notes seulement » à « des notes et l'étape d'un deal ». Aucune donnée d'identité, de santé ou de paiement n'est écrite ni lue, donc aucun interdit de 7.4 n'est en cause — mais c'est un écart au principe « HubSpot fait foi sur la relation client » qu'il valait mieux écrire que glisser.

**Les six étapes du pipeline**, qui les pose et ce qui les clôt : **section 2.7**. Cette PR en livre une, « Dossier créé » ; B04c livre « Devis envoyé » et S00 « Nouveau ».
  - Notes HubSpot ultérieures (jeton d'application privée, droit d'écrire des notes) : nouvel engagement, passage réalisé, liste envoyée, facture émise, carte cadeau utilisée, avec reprises exponentielles. Limites de l'offre gratuite **[À VÉRIFIER]**.
- **Critères** : client, engagement et passages créés en une transaction (un échec ne crée rien) ; une référence déjà utilisée ou un e-mail déjà utilisé refusés ou rattachés sans doublon ; **création possible sans aucune pièce de devis** ; prix modifié sans motif refusé ; l'e-mail de bienvenue ou de nouvel engagement n'est envoyé que si la case est cochée ; un second engagement sur le même client ne crée aucun doublon ; l'échec de HubSpot ne bloque pas ; **un deal déjà à « Dossier créé » n'est pas redéplacé**, et deux deals éligibles déclenchent un choix au lieu d'une décision automatique.
- **Vous contrôlez** : créer un engagement d'un mois (4 passages non datés), en ajouter un second au même client, réutiliser la même référence, couper HubSpot ; puis vérifier dans HubSpot que le deal est passé à « Dossier créé » **et que ses relances se sont arrêtées**, et refaire l'opération sur un client qui a deux deals pour constater qu'on vous demande lequel. **Avant (test réel)** : M1.1, M1.2, M1.5, M1.17.

#### B12. Suivi et relances : tableau « à faire » et flux iCal
- **Branche** : `feat/b12-followups` · **Taille** : grande · **Dépend de** : B10, B11 · **Débloque** : B13, B15, B18, B21.
- **Objectif** : Votre process est fait d'attentes : un client qui ne répond pas, un menu non choisi, une facture non payée, un acompte oublié. Le risque n'est pas technique, c'est d'oublier. Cette PR crée **un registre unique de tout ce qui doit être suivi** et la page d'accueil de votre administration : chaque matin, trois chiffres vous disent ce qui est **en retard**, ce que vous devez faire **aujourd'hui** et ce qui **attend un client**, et chaque ligne indique son statut, son échéance, le nombre de relances déjà faites et la prochaine. Django envoie lui-même les relances simples aux clients (proposition de menu sans réponse, rappel de passage) et vous alerte pour le reste, **sans jamais doubler ce que HubSpot, l'URSSAF ou votre outil de facturation envoient déjà** (qui relance quoi : section 2.7). Elle ajoute aussi un lien d'abonnement pour voir vos passages dans Google Agenda.
- **Fonctionnalités et règles** (modèles : section 9.12)
  - **Registre `FollowUp`** : jamais saisi à la main. Une tâche planifiée **toutes les heures** (idempotente) compare l'état réel des objets aux règles de 2.7 : elle crée la ligne quand une situation apparaît, met à jour ses échéances, envoie l'e-mail au client quand le propriétaire est « client_email » (modèle de B02, `EmailLog`), et **clôt la ligne seule** quand la situation est résolue. Une situation = une ligne ; les limites d'envoi de 2.7 s'appliquent ; au-delà du nombre d'envois maximal d'un type, l'alerte passe à la cheffe. Délais et plages réglables dans `FollowUpSettings`.
  - **Chaque PR déclare ses relances**, et les 25 situations de 2.7 sont toutes attribuées. **B12** fournit le moteur et celles des objets déjà existants : passage sans date, passage réalisé non clôturé, **report ou annulation demandé par le client** (le client prévient par e-mail ou par téléphone, la ligne reste ouverte tant que vous ne l'avez pas saisi — B10 décrit la transition, B12 la suit), client sans engagement, engagement sans pièce, renouvellement à proposer, e-mails échoués, intégrations en échec. Les autres sont ajoutées par **B13** (menus et rappel de passage), **B15** (factures, URSSAF, attestation fiscale), **B16** (acompte), **B17** (cartes), **B18** (avis) et **B19** (RGPD) ; leurs compteurs s'activent à ce moment. **Les cinq relances d'avant-dossier ne sont déclarées par aucune PR** : elles vivent dans HubSpot et se règlent en M1.5 ; la page A-Suivi se contente d'afficher les liens des trois vues.
  - **Page A-Suivi**, intitulée « À faire » à l'écran (accueil de l'administration) : en haut trois totaux (**en retard**, **à faire aujourd'hui**, **en attente du client**) ; puis quatre blocs : **À faire par vous** (trié : retard en rouge, aujourd'hui en orange, à venir en gris ; chaque ligne : client, objet, depuis quand, échéance, boutons *Ouvrir*, *Fait*, *Reporter*, *Annuler avec motif*) ; **En attente du client** (relances automatiques : nombre d'envois, dernier et prochain envoi) ; **Dans HubSpot** (liens vers les vues « devis sans réponse » et « deals Gagné sans dossier ») ; **Résolu récemment** (7 jours).
  - **Liste « Relances »** de l'administration : filtres par type, propriétaire, statut, en retard, client ; actions groupées : marquer fait, reporter, annuler, envoyer maintenant (relances par e-mail), suspendre les relances d'un client.
  - **Résumé quotidien par e-mail** : une tâche planifiée à l'heure choisie envoie « ce qui est en retard » puis « ce qui est à faire aujourd'hui », une ligne par situation avec un lien direct. **Aucun envoi les jours où il n'y a rien** — c'est la règle qui empêche l'e-mail de devenir du bruit et d'être ignoré. L'objet porte les chiffres (« Table et Tribu — 2 en retard, 3 aujourd'hui ») pour trier sans ouvrir. Pas de section « à venir ». Le message se termine par un rappel des vues HubSpot, sans en recopier le contenu (Django ne lit pas HubSpot).
  - **Trois alertes immédiates**, parce qu'attendre le résumé du lendemain ferait rater l'échéance : menu non envoyé alors que le passage est dans 3 jours, passage demain dont le menu n'est pas relu, demande URSSAF refusée. Un seul interrupteur les couvre, actif par défaut, avec un avertissement explicite au moment de le couper.
  - **Écran de réglage des relances** (`FollowUpRule` en tableau + `FollowUpSettings`), deux sections : **relances aux clients** (actif, délai, nombre d'envois, modèle d'e-mail) et **mes e-mails de suivi** (résumé quotidien et alertes). Trois niveaux de coupure : **globale** (frein d'urgence), **par type**, **par client**. **Couper une relance client ne supprime jamais le suivi** : la ligne change de propriétaire et revient dans « à faire par vous » — sans cette règle, désactiver un e-mail créerait un trou silencieux. Les e-mails **du service** (proposition de menu, liste d'ingrédients, lien d'acompte, carte cadeau) ne figurent pas dans cet écran. Chaque changement est journalisé, un **bandeau permanent** s'affiche tant que la suspension globale est active, et la page A-Suivi indique en permanence « N relances désactivées » pour qu'un interrupteur oublié ne devienne pas invisible.
  - **Statut de suivi sur chaque fiche** (client, engagement, passage, plan de repas, facture, réservation) : un bandeau (vert *tout est à jour*, orange *à traiter*, bleu *en attente du client*, rouge *en retard*) et la **chronologie** des relances et des e-mails envoyés pour cet objet.
  - **Flux iCal** : `GET /ical/<jeton>.ics` en lecture seule, jeton `ICAL_FEED_TOKEN` (comparaison en temps constant, rotation en changeant la variable), passages datés des 12 prochains mois, titre « Passage : prénom », sans adresse ni donnée de santé, identifiant d'événement stable. À confirmer : l'agenda est bien Google Agenda.
- **Critères** : une même situation ne crée jamais deux lignes ni deux e-mails ; aucun résumé quotidien n'est envoyé un jour sans rien à faire ; une relance désactivée bascule en « à faire par vous » et reste suivie ; une situation résolue clôt sa ligne automatiquement ; au plus un e-mail de relance par client et par jour, jamais entre 21 h et 8 h ; une relance reportée réapparaît à la date choisie ; chaque total mène à la liste filtrée ; requêtes en nombre constant ; un mauvais jeton iCal donne 404 ; aucune donnée de santé dans le registre ni dans le flux.
- **Vous contrôlez** : créer des situations (passage sans date, menu non proposé), voir apparaître les lignes et leurs couleurs, reporter une ligne, régler un délai dans `FollowUpSettings`, confirmer qu'un deuxième e-mail n'est pas envoyé le même jour, couper une relance et vérifier qu'elle réapparaît dans vos actions, vous abonner au flux dans Google Agenda.

#### B13. Menus par passage : proposition, validation et listes d'ingrédients
- **Branche** : `feat/b13-meal-plans` · **Taille** : grande · **Dépend de** : B02, B08, B10, B12 · **Débloque** : B14.
- **Objectif** : C'est ce qui remplace les allers-retours d'e-mails et de SMS pour décider du menu. **Le menu appartient au passage, pas à l'engagement** : un engagement d'un mois donne quatre menus indépendants, un engagement d'un an en donne quarante-huit — les recettes dépendent de la saison et de ce que vous avez sous la main, un menu décidé à l'avance pour l'année ne tiendrait pas. Pour chaque passage, vous préparez une proposition de recettes, le client l'ajuste et la valide, puis le système produit **un seul PDF pour le client**, reprenant le menu retenu et la liste d'ingrédients (votre fiche de préparation, elle, est à part), additionnée recette par recette et mise à l'échelle des portions. S'il ne répond pas, votre proposition devient le menu : rien ne bloque jamais.
- **Fonctionnalités et règles** (modèles : section 9.7)
  - **Six états**, visibles dans l'administration : **brouillon** (créé 7 jours avant le passage par une tâche planifiée) → **proposition prête** (vous choisissez les recettes, ou partez du pré-remplissage) → **envoyée** (e-mail au client avec son lien de choix) → **validée** (par le lien, par e-mail, ou par vous faute de réponse) → **préparée** (PDF produit). L'état **à revoir** sert quand le client demande un changement : vous modifiez et renvoyez une **version 2**, avec un nouveau lien.
  - **Pré-remplissage de la proposition** : le système propose `quota` recettes des séries autorisées du pack, en évitant celles des deux derniers passages du même client. Vous remplacez librement ce que vous voulez avant d'envoyer.
  - **Quota et portions** : un dîner = une recette ; quota = nombre de dîners (3, 4 ou 5) ; portions = `Engagement.servings`.
  - **Allergènes** : affichés sur chaque recette et chaque ingrédient, dans le PDF comme sur la page de choix. **Aucun blocage automatique** : le client choisit sous sa responsabilité, et **son accord écrit vaut confirmation** — ce qui est plus solide qu'une case cochée. Vous relisez chaque menu validé avec la note HubSpot du client et le marquez **« relu »** (`reviewed_at`) ; un menu non relu reste dans « à faire » et passe **en retard 48 h avant le passage**.
  - **Échéance** : date limite 3 jours avant le passage. Sans réponse, une ligne « valider la proposition » apparaît dans « à faire » ; vous validez d'un clic (`validation_source = staff`). Aucun choix n'est fait automatiquement sans vous.
  - **Validation hors ligne** : si le client répond « d'accord » par e-mail plutôt que par le lien, vous cliquez **« Validé par le client »** en indiquant la date et, en pièce facultative, son e-mail (`validation_source = email`).
  - **PDF unique** (WeasyPrint), produit à la validation et envoyé au client : d'abord **le menu retenu** (plats, descriptions, allergènes), puis **la liste d'ingrédients** groupée par rayon. Votre **fiche de préparation** (passage, recettes, quantités) est produite dans tous les cas. Régénération idempotente.
  - **Calcul de la liste** : quantités de chaque recette × portions / portions de référence, **agrégées par ingrédient**, conversion des unités compatibles (g↔kg, ml↔l), unités incompatibles non fusionnées, arrondi (pièces à l'unité supérieure, poids au 5 g), **aucun ingrédient exclu**. Mode de courses configurable par engagement (défaut : la cheffe).
  - **Courses facturées au réel** (si la cheffe les fait) : saisie du montant et des justificatifs après le passage, ligne non éligible au crédit d'impôt sur la facture (B15), avertissement au-delà de +20 % de l'estimation.
  - **Relances déclarées** (2.7) : menu à proposer (7 jours avant, en retard à 4 jours), proposition sans réponse (**deux e-mails**, voir ci-dessous), menu à relire, rappel de passage 24 h avant.
  - **Les deux relances du menu** : la première **2 jours après l'envoi** du lien, la seconde **24 h avant la date limite** — dernier moment utile pour obtenir la trace écrite des allergènes acceptés, ce qui est la vraie raison de relancer : sans réponse la prestation a lieu quand même, mais le dossier n'a plus que votre validation (`validation_source = staff`). C'est la **seule relance du projet calculée à rebours d'une échéance** et non en avant d'un envoi ; les autres partent toutes d'une date de départ. Deux conséquences à traiter : si la proposition part tard, les deux envois peuvent tomber le même jour ou dans le désordre — on n'en envoie alors **qu'un seul**, le dernier ; et la règle « au plus un e-mail par client et par jour » s'applique comme partout.
  - **Actions d'administration** : préparer, envoyer, valider à la place du client, marquer « relu », rouvrir, régénérer le PDF. **Gabarits d'e-mail** : proposition avec lien, puis menu validé accompagné de la liste.
  - **`menu_mode`** est posé sur l'engagement mais une seule valeur est implémentée : « la cheffe propose ». La valeur « le client choisit » reste inerte, prête pour un éventuel espace client.
- **Critères** : une validation hors quota ou hors pack est refusée ; le PDF régénéré est identique ; un renvoi crée une version 2 avec un nouveau lien et invalide le précédent ; un menu non validé à l'échéance apparaît dans « à faire » et ne se valide jamais tout seul ; aucune donnée de santé n'entre dans le plan.
- **Vous contrôlez** : créer un engagement d'un mois, dater les passages, préparer et envoyer une proposition, valider à la place du client, ouvrir le PDF et vérifier les quantités à la main, demander une version 2. **Avant (test réel)** : M1.2.

#### B14. Page de choix du menu (lien à usage unique)
- **Branche** : `feat/b14-menu-choice-page` · **Taille** : petite à moyenne · **Dépend de** : B13 · **Débloque** : rien.
- **Objectif** : Donner au client la main sur la seule chose qui compte vraiment pour lui — ce qu'il va manger — **sans lui imposer un compte**. Il reçoit un e-mail, clique sur un lien, voit les plats que vous proposez avec leurs allergènes, remplace ceux qu'il ne veut pas, valide. Rien à créer, rien à retenir : un lien cliquable obtient toujours plus de réponses qu'une connexion à retrouver dans sa boîte mail. Pour vous, c'est l'étape qui transforme le menu d'un aller-retour par e-mail en une validation enregistrée, datée et tracée.
- **Fonctionnalités et règles** (accès : section 8)
  - **Page servie par Django**, gabarit aux couleurs du site (`styles/tokens.css`), **sans compte, sans session, sans cookie d'authentification**.
  - **Jeton** aléatoire de 32 octets, **stocké haché**, lié à un seul plan de repas, valable jusqu'à la date limite, **invalidé après validation** et à chaque nouvelle version de la proposition. Comparaison en temps constant, limitation de débit par adresse IP, `noindex` et `Referrer-Policy: no-referrer` pour que le lien ne fuite pas par le référent.
  - **Ce qu'elle expose** : prénom, date du passage, quota, recettes proposées et recettes disponibles du pack, avec ingrédients **sans quantités** et **allergènes de la recette et de chaque ingrédient**. Rien d'autre : ni adresse, ni téléphone, ni facture, ni autre passage, ni donnée de santé.
  - **Ce qu'elle accepte** : remplacement des recettes dans la limite du quota et des séries du pack, une note libre, puis la validation — qui verrouille le plan et déclenche le PDF (B13). Le serveur refuse tout dépassement et toute requête après la date limite, avec un message invitant à contacter la cheffe.
  - **Feuille de style** reprenant les couleurs du site (`styles/tokens.css`).
  - **États** : lien inconnu ou expiré, menu déjà validé (récapitulatif en lecture seule), date limite dépassée, erreur. Utilisable à 375 px, au clavier, et **sans JavaScript** (formulaire natif) — un client sur un téléphone ancien doit pouvoir valider.
- **Critères** : un jeton ne donne jamais accès au plan, au client ni aux documents d'un autre (404) ; aucune quantité ni donnée de santé n'est exposée ; un lien utilisé deux fois n'ouvre que le récapitulatif. **Cas à couvrir par les tests** : jeton inconnu, expiré, déjà utilisé, jeton d'un autre plan, dépassement de quota, recette hors pack, requête après l'échéance, validation sans JavaScript, limitation de débit.
- **Vous contrôlez** : envoyer une proposition à votre propre adresse, ouvrir le lien sur téléphone, changer un plat, valider, puis rouvrir le même lien et vérifier qu'il ne permet plus de modifier.

#### B15. Facturation par passage et suivi URSSAF (saisie manuelle)
- **Branche** : `feat/b15-billing` · **Taille** : moyenne · **Dépend de** : B10, B12, **décision M1.15** · **Débloque** : B16, B19, B21.
- **Objectif** : Aujourd'hui rien ne garantit qu'un passage réalisé a bien été facturé. Cette PR crée automatiquement, à chaque passage réalisé (ou annulé de façon facturable), une ligne « facture à émettre » avec le bon montant, la part prise en charge par le crédit d'impôt et la référence du devis. Vous émettez la facture dans votre outil de facturation (choix encore à faire), puis saisissez son numéro et son statut : le système ne numérote jamais les factures lui-même. Pour le batch cooking, elle suit aussi la demande d'avance immédiate URSSAF (envoyée, validée par le client sous 48 h, payée) et vous alerte si le client tarde, pour éviter les impayés.
- **Fonctionnalités et règles** (modèles : section 9.8)
  - À chaque passage `done` ou `cancelled_billable`, création **idempotente** d'un `InvoiceRecord` (`to_issue`) avec le prix figé, la part crédit, la part client et la référence du devis. **Montant éligible au crédit** : par défaut prix × taux figé, corrigeable avec motif si le devis contient des lignes non éligibles **[À VÉRIFIER]** avec le comptable.
  - Interface `InvoicingProvider`, une seule implémentation : **`ManualProvider`** : la cheffe émet dans l'outil externe puis saisit numéro, statut et lien (jamais numérotées par Django). Écran « factures à émettre », export CSV. Avoirs et annulations après facturation : gérés dans l'outil, Django garde le lien. Délai de paiement et pénalités : selon les CGV.
  - **Batch** : `UrssafPaymentRequest` suivie (envoyé, validé par le client, payé) ; statuts saisis à la main (aucun appel automatique à l'URSSAF) ; **avertissement non bloquant** si le client n'a pas activé son compte particulier.urssaf.fr avant le premier passage. **Attestation fiscale annuelle** : fournie par l'outil, Django envoie un rappel en janvier. Le client ne règle que sa part via l'URSSAF (pas de Stripe pour le batch). Facture d'acompte du chef privé via l'outil.
  - **Relances (2.7)** : **compte URSSAF non confirmé** 7 jours avant le premier passage (sans ce compte, l'avance immédiate est impossible et vous encaissez 100 % à la place de 50 % — c'est la relance la plus rentable de la PR) ; **attestation fiscale** : un rappel en janvier, une fois, pour vérifier que l'outil de facturation l'a bien envoyée ; facture à émettre (le lendemain du passage) ; **facture émise non payée** : alerte à l'échéance + 3 jours puis + 10 jours (`due_date`), l'enregistrement affichant « relance envoyée le … » que vous saisissez ; **demande URSSAF** refusée ou expirée : alerte immédiate, non validée : alerte à 72 h. **Django n'envoie aucun rappel de paiement au client** : l'outil de facturation et l'URSSAF le font déjà (à confirmer avec l'outil choisi) ; c'est vous qui relancez si besoin, depuis l'outil ou HubSpot.
- **Critères** : un passage réalisé génère exactement un enregistrement ; une annulation facturable génère le bon montant ; montants avant et après crédit cohérents ; une demande non validée à 72 h apparaît dans « à faire » (A-Suivi).
- **Vous contrôlez** : clôturer un passage et suivre la chaîne jusqu'à « payée ». **Avant** : M1.14, M1.15 (un branchement automatique ferait une PR dédiée).

#### B16. Paiements Stripe : acompte du chef privé
- **Branche** : `feat/b16-payments` · **Taille** : moyenne · **Dépend de** : B10, B15 · **Débloque** : B17.
- **Objectif** : Pour le chef privé, vous demandez 30 % d'acompte avant de bloquer la date. Cette PR permet d'envoyer au client un lien de paiement sécurisé (Stripe) directement depuis la réservation : il règle par carte ou prélèvement, sans qu'aucun numéro de carte ne passe par vos systèmes. La date n'est confirmée qu'une fois le paiement confirmé par Stripe, et vous pouvez rembourser depuis l'administration en indiquant un motif. Le batch cooking n'est pas concerné : il passe par l'URSSAF (B15).
- **Fonctionnalités et règles** (modèles : section 9.9)
  - Lien de paiement **Stripe Checkout** hébergé généré depuis la réservation et envoyé par e-mail ; **aucun numéro de carte ne passe par Django**. Moyens : carte et SEPA, frais pris par la cheffe. Pas d'acompte pour les cours.
  - **Relances de l'acompte (2.7)** : le lien de l'e-mail ouvre une page de Django qui crée la session Stripe **à la demande** (une session Stripe expire au plus tard après 24 h **[À VÉRIFIER]**, un lien direct serait vite périmé) ; relances e-mail au client à J+3 et J+7 ; à J+10 alerte pour vous : relancer par téléphone ou **libérer la date** (décision manuelle, jamais automatique). La date reste « non confirmée » tant que l'acompte n'est pas payé.
  - Webhook `/webhooks/stripe` : **signature vérifiée**, idempotence par `WebhookEvent.event_id` (un événement rejoué est sans effet), rejeu manuel ; la réservation passe à « acompte payé » **seulement après le webhook**. Remboursement par action d'administration avec motif.
- **Critères** : tests avec événements simulés (succès, échec, rejeu, signature invalide, remboursement).
- **Vous contrôlez** : payer un acompte avec une carte de test, rejouer l'événement. **Avant** : M1.6.

#### B17. Cartes cadeaux
- **Branche** : `feat/b17-giftcards` · **Taille** : grande · **Dépend de** : B16 · **Débloque** : B19, B21, S03.
- **Objectif** : Les cartes cadeaux ouvrent un nouveau canal de vente : un visiteur du site offre un montant (ou un cours), paie en ligne, et le destinataire reçoit un PDF avec un code personnel. Cette PR gère tout le cycle : paiement, émission du code uniquement après confirmation du paiement, envoi à la date choisie, utilisation partielle, appliquée par vous à la création d'un engagement ou d'une réservation, expiration et rappel avant échéance. Elle protège contre la fraude et contre le double usage. Le traitement comptable et la TVA sont à valider avec votre comptable avant l'ouverture à la vente.
- **Fonctionnalités et règles** (modèles : section 9.10)
  - **Achat invité** (aucun compte) : montant libre entre 20 € et 500 € plus un produit « cours » à prix fixe ; **seuil anti-fraude** : 500 € et 3 achats par jour par e-mail ; un seul modèle visuel, message libre ; **PDF et e-mail seulement** (pas de carte physique). Route serveur à serveur `POST /api/v1/giftcards/checkout` (secret partagé, jeton Turnstile, limitation de débit).
  - **Aucune carte émise avant le webhook de paiement confirmé**. Code de 16 caractères en base 32 sans caractères ambigus (`XXXX-XXXX-XXXX-XXXX`), généré avec `secrets` ; valable **12 mois**, prolongation possible par la cheffe ; par défaut valable sur **tous les services** (`scope` = "any"), restreignable à un seul. Envoi au destinataire immédiat ou à la date choisie, reçu à l'acheteur.
  - **Commandes abandonnées** : une commande non payée est annulée automatiquement après 48 h, **sans relance** (c'est un visiteur anonyme), et comptée en information dans « à faire ».
  - **Utilisation** par la cheffe, à la création d'un engagement ou d'une réservation (page A-Dossier) : contrôle de validité, solde et périmètre, **débit partiel**, cumul de plusieurs cartes autorisé, transaction atomique avec verrou de ligne (jamais de double débit, jamais de solde négatif). **Anti-essais** : 5 en 15 minutes par IP et par session, puis blocage temporaire ; même message pour code inconnu ou invalide. Batch avec avance immédiate : la carte s'impute sur la **part client** **[À VÉRIFIER]**.
  - **Expiration** : tâche quotidienne, rappel 30 jours avant. **Cessible** ; **remboursable seulement dans les 14 jours** (décision de la cheffe, via Stripe). Traitement comptable et TVA **[À VÉRIFIER]** avant l'ouverture à la vente.
  - Administration : renvoyer l'e-mail, ajuster le solde (motif), bloquer, prolonger, rembourser ; transactions en lecture seule.
- **Critères** : un même code utilisé en parallèle n'est débité qu'une fois (test de concurrence) ; une carte expirée est refusée ; vente bloquée en production tant que `LegalIdentity` est incomplète.
- **Vous contrôlez** : acheter avec une carte de test, recevoir le PDF, utiliser une partie du solde, rejouer et deviner un code. **Avant** : M1.4, M1.14.

#### B18. Avis des clients
- **Branche** : `feat/b18-reviews` · **Taille** : petite · **Dépend de** : B02, B10, B12 · **Débloque** : rien.
- **Objectif** : Les avis clients nourrissent la confiance dans votre site, mais les collecter à la main est fastidieux. Cette PR envoie la demande automatiquement et n'insiste qu'une fois. Le client répond par e-mail en autorisant la publication ; **rien ne paraît sans votre validation et son consentement**.
- **Fonctionnalités et règles** (modèle : section 9.11) : e-mail de demande **2 jours après le dernier passage** d'un engagement (ou une réservation), une relance à 7 jours. La demande part par e-mail ; le client répond par e-mail en autorisant la publication de son prénom et de son texte, et **la cheffe saisit l'avis dans l'administration** ; la cheffe valide, refuse ou publie ; un avis approuvé devient un `Review` publié à la prochaine publication, **avec le prénom et, si vous en ajoutez une, sa photo** ; jamais de lien externe.
  - Les envois (demande à J+2, relance à J+7) sont des **relances du registre** (B12, 2.7) : jamais plus de deux e-mails par prestation, arrêt dès réception de l'avis.
- **Critères** : aucun avis publié sans validation ni consentement ; une seule relance.
- **Vous contrôlez** : terminer un passage de test, déclencher la tâche, répondre, valider, publier.

#### B19. RGPD, conservation et exports
- **Branche** : `feat/b19-gdpr` · **Taille** : moyenne · **Dépend de** : B10, B11, B15, B17 · **Débloque** : rien.
- **Objectif** : Vous traitez des données de clients : vous devez pouvoir leur remettre une copie de leurs données, les effacer à leur demande, et ne pas conserver plus que nécessaire. Cette PR ajoute ces outils à l'administration : export d'un client, anonymisation (identité effacée, montants et documents légaux conservés), registre des consentements, durées de conservation appliquées automatiquement. Comme les données d'un client sont aussi dans HubSpot, Brevo, Stripe et votre outil de facturation, elle produit à chaque demande la liste des suppressions à faire à la main, avec une procédure écrite.
- **Fonctionnalités et règles**
  - **Export** des données d'un client (JSON et PDF) ; **anonymisation** (efface e-mail, prénom, nom, lien HubSpot ; conserve montants et documents de facturation exigés par la loi **[À VÉRIFIER]**) avec confirmation forte, `owner` seulement ; demande traitée sous **30 jours**.
  - Registre des consentements (marketing, publication d'avis) avec date ; journal d'audit non modifiable depuis l'administration.
  - **Demandes de données (`DataRequest`)** : reçues par e-mail ou par téléphone et saisies par la cheffe ; délai de **30 jours** à compter de la réception ; relance « à traiter » pour vous immédiatement, rappel à J+20, **en retard** à J+30 ; le traitement (export ou anonymisation) clôt la ligne et envoie la confirmation au client.
  - **Durées** : pièces du devis 10 ans ; journaux selon la politique ; **notes d'allergies dans HubSpot : 3 ans après le dernier passage** (effacement manuel).
  - Le rapport liste aussi **les suppressions à répéter à la main** dans HubSpot (dont les notes d'allergies), l'outil de facturation, Brevo et Stripe ; `docs/RGPD.md` décrit la procédure.
- **Critères** : après anonymisation, aucune donnée personnelle ne reste dans Django hors documents légaux ; l'opération est journalisée ; le rapport est exact.
- **Vous contrôlez** : exporter un client de test, l'anonymiser, vérifier qu'il ne reste rien d'identifiable, et relire le rapport des suppressions à faire à la main chez HubSpot, Brevo, Stripe et l'outil de facturation.
- **Avant** : M1.11, M1.14, M1.17.

#### B20. Durcissement et préparation de la production
- **Branche** : `feat/b20-production` · **Taille** : moyenne · **Dépend de** : toutes les PR précédentes, et les décisions **hébergement**, **outil de facturation** et **informations légales** (section 5.1) · **Débloque** : B20b.
- **Objectif** : Avant d'accueillir de vrais clients, il faut s'assurer que tout tient : sécurité vérifiée point par point, sauvegardes réellement restaurées (une sauvegarde jamais testée ne sert à rien), surveillance des erreurs (Sentry), alertes si une tâche automatique ne tourne pas, et un guide d'exploitation. C'est la PR du « go / no-go » : on y vérifie aussi que les informations légales sont saisies, que les clés Stripe sont passées en réel et que l'administration n'est joignable que sous son adresse non évidente, avec la double authentification.
- **Fonctionnalités et règles** : revue de sécurité selon la section 7.5 (`check --deploy` sans avertissement, en-têtes, cookies, limitations de débit, fichiers privés signés, secrets) ; **Sentry en région UE** sans donnée personnelle ; alertes e-mail (tâche planifiée manquée, intégration en échec répété, webhook rejeté, nombreuses tentatives de codes) ; **test de restauration des sauvegardes** (quotidiennes, 30 jours, base chiffrée) ; tests de charge légers (page de choix du menu sous 300 ms côté serveur) ; administration joignable **uniquement** sous son préfixe et avec 2FA ; vérification que la page de choix n'expose rien au-delà de son propre plan de repas ; `docs/RUNBOOK.md` ; environnement GitHub `production` avec approbation.
- **Critères** : sauvegarde restaurée avec succès ; aucune alerte critique ouverte ; tous les interdits de la section 7.4 testés ; couverture conforme à la section 11.3.
- **Vous contrôlez** : dérouler la checklist de la section 6, ligne par ligne. C'est le « go / no-go » : tant qu'une ligne résiste, on n'ouvre pas.
- **Avant** : M1.11, M1.13, M1.16, M1.9 (production), DNS et TLS de production, secrets `production`, clés Stripe réelles, SEPA.

#### B20b. Déploiement de la production et retour arrière
- **Branche** : `feat/b20b-deploy-prod` · **Taille** : moyenne · **Dépend de** : B07, B20 · **Débloque** : rien.
- **Objectif** : Deux manques que le reste du plan ne couvre pas. **B07 met le backend en ligne pour l'environnement de test seulement** : rien ne dit comment il atteint la production. Et surtout, **rien ne dit comment défaire un déploiement raté** — le plan sait restaurer une sauvegarde de base, ce qui est une opération lourde et perdante, mais pas revenir à la version d'avant. C'est le genre d'absence qu'on ne remarque que le soir où on en a besoin. Cette PR livre le chemin vers la production et le chemin du retour.
- **Fonctionnalités et règles**
  - **Workflow de production** : environnement GitHub `production` avec **votre approbation manuelle** avant tout déploiement (M0.3), journal des déploiements, et interdiction de déployer depuis une autre branche que `main`.
  - **On promeut l'image validée, on ne la reconstruit pas** : le conteneur déployé en production est **exactement celui** qui a été vérifié sur l'environnement de test, repris par son empreinte. Reconstruire, c'est déployer autre chose que ce qu'on a testé.
  - **Migrations compatibles en avant** : une migration ne doit jamais empêcher la version précédente de fonctionner, sinon le retour arrière devient impossible. Conséquence concrète et contraignante : **une suppression de colonne ou de table se fait en deux déploiements** — d'abord le code cesse de s'en servir, ensuite seulement la base la perd. La migration destructrice est toujours la seconde.
  - **Procédure de retour arrière**, écrite dans `docs/RUNBOOK.md` et **exécutée une fois pour de vrai** sur l'environnement de test : redéployer l'image précédente, et la conduite à tenir selon qu'une migration a tourné ou non. Une procédure jamais essayée ne compte pas, exactement comme une sauvegarde jamais restaurée.
  - **Ce que le retour arrière ne rattrape pas**, et qu'il faut savoir avant : un e-mail parti, un paiement encaissé, une note écrite dans HubSpot. Le retour arrière restaure le code, pas les effets. D'où l'intérêt des tâches idempotentes et du journal des webhooks.
  - **Ordre de bascule** le jour de l'ouverture : backend en production, vérification de `/healthz` et de l'administration, puis seulement la bascule du site (S02), pour que le site ne construise jamais ses pages contre un backend absent.
- **Critères** : aucun déploiement en production sans approbation ; l'image déployée est celle validée en test (empreinte identique) ; **un retour arrière a réellement été effectué sur l'environnement de test** et sa durée est notée ; toute migration de la PR est réversible ; `docs/RUNBOOK.md` décrit la bascule et le retour.
- **Vous contrôlez** : déclencher un déploiement et constater qu'il attend votre approbation ; puis demander un retour arrière sur l'environnement de test et vérifier que l'administration répond toujours. **Avant** : M1.9 (production), secrets `production`, DNS et TLS.

#### B21. Programme de fidélité par points
- **Branche** : `feat/b21-loyalty` · **Taille** : moyenne · **Dépend de** : B04c, B12, B15, B17 · **Débloque** : rien.
- **Objectif** : Le point faible commercial de ce métier est écrit noir sur blanc en section 2.3 : **il n'y a aucune reconduction automatique**, chaque mois est revendu. Un programme de points attaque précisément cet endroit. À chaque passage réalisé, le client accumule des points ; quand son solde devient convertible, il reçoit une carte cadeau à valoir sur sa prochaine commande. Mais le vrai levier n'est pas le cadeau, c'est **l'e-mail de renouvellement** : « vous avez 120 points, soit 24 € à faire valoir sur votre prochain mois » convainc mieux qu'une relance sèche. Les points existent pour donner une raison de revenir, au moment exact où la relance part.
- **Quand la faire** : **après B20**, donc après l'ouverture. Un programme de fidélité sans clients n'a aucun effet, et son traitement comptable doit être tranché avant d'être proposé (M1.14). Si vous voulez un levier de rétention **tout de suite**, il existe et il coûte presque rien : l'**offre de renouvellement** de B04, une remise nommée que la relance de fin d'engagement propose déjà. Les points sont le raffinement, pas le remède.
- **Le choix d'architecture** : les points ne sont **pas** une monnaie parallèle. Ils se convertissent en **carte cadeau** (B17), et c'est tout. Tout le reste existe déjà : solde, transactions, débit partiel, verrou de ligne contre le double usage, péremption, imputation sur la part client, traitement comptable en cours de validation. Autrement dit **cette PR n'invente qu'un compteur et un barème** — elle ne crée ni nouvelle facture, ni nouvelle remise, ni nouveau chemin d'encaissement. C'est ce qui la rend moyenne et non grande, et c'est ce qui évite de reposer au comptable une question déjà posée pour les cartes cadeaux.
- **Fonctionnalités et règles** (modèles : section 9.13)
  - **Acquisition automatique** : à chaque passage `done`, une transaction "earn" crédite `points_per_session` points, **une seule fois par passage** (unicité en base, donc rejouer la tâche ne double rien). Un passage annulé, même facturable, ne crédite rien.
  - **Barème par défaut proposé** : **10 points par passage réalisé**, **100 points = 20 €**, conversion à partir de 100 points. Un mois de quatre passages rapporte donc 40 points, soit environ **2,5 % du montant** — assez pour être agréable, assez peu pour ne jamais peser sur la marge. **Ce barème est une proposition** : il se règle entièrement dans l'administration (décision ouverte, section 5.1).
  - **Pourquoi par passage et non par euro dépensé** : des points indexés sur l'argent se rapprochent d'un moyen de paiement, avec les questions fiscales que cela traîne ; des points par passage récompensent **la régularité**, qui est exactement le comportement recherché, et restent trivialement vérifiables.
  - **Conversion** : à la demande du client ou de la cheffe, `conversion_points` points deviennent une carte cadeau de `conversion_cents`, émise par la machinerie de B17 (code, validité 12 mois, usage partiel). La transaction "convert" débite le solde et **pointe vers la carte émise** : on peut toujours retrouver d'où vient une carte. Opération atomique, avec verrou : **jamais de solde négatif, jamais de double conversion**.
  - **Péremption** : les points expirent après `expiry_months` sans aucun passage, avec un e-mail d'avertissement 30 jours avant. Sans cette règle, le solde cumulé devient une dette ouverte sans limite.
  - **Où le client voit son solde** : il n'y a pas d'espace client, donc nulle part en autonomie — et c'est assumé. Le solde apparaît **sur sa fiche dans l'administration**, dans le **repère `{{points}}` du devis** quand il est convertible, et surtout dans **l'e-mail de relance de renouvellement** (B12), qui est le seul endroit où il change quelque chose.
  - **Ajustements à la main** : accorder des points (parrainage abouti, geste commercial, erreur réparée) ou en retirer, **toujours avec un motif**, journalisé dans `AuditEvent` comme l'ajustement d'une carte cadeau.
  - **Interrupteur global** : le programme entier s'éteint d'un réglage, sans perdre les soldes. Tant qu'il est éteint, aucune acquisition, aucune mention dans les e-mails ni les devis.
  - **Aucune donnée nouvelle sur le client** : un solde de points, rien d'autre. Pas de profil, pas de segmentation, pas de score.
- **Critères** : un passage ne crédite jamais deux fois, même si la tâche est rejouée ; deux conversions simultanées n'émettent qu'une carte et ne rendent jamais le solde négatif ; un passage annulé ne crédite rien ; programme éteint = aucune acquisition et aucune mention nulle part ; le solde affiché égale toujours la somme des transactions (test de cohérence) ; un ajustement sans motif est refusé.
- **Vous contrôlez** : clôturer quatre passages et voir 40 points apparaître, convertir en carte cadeau, utiliser cette carte sur un nouvel engagement, accorder 50 points de parrainage avec motif, puis éteindre le programme et vérifier que plus rien n'en parle. **Avant** : **M1.14** (comptable : traitement des points convertis en carte cadeau).
- **Risque** : un programme de fidélité est facile à lancer et pénible à arrêter — les clients s'y habituent. D'où l'interrupteur global, la péremption, et un barème volontairement modeste au départ : il est plus facile d'être généreux ensuite que de reprendre.

### 3.3 Pull Requests du site (`chefmeemz`)

> **Consignes communes aux PR du site.** Lire `AGENTS.md` et, dans `node_modules/next/dist/docs/01-app/02-guides/`, `authentication.md`, `data-security.md`, `backend-for-frontend.md`, `forms.md`, `server-and-client-boundary.md`, `production-checklist.md` ; dans `03-api-reference/03-file-conventions/` : `proxy.md`, `route-groups.md`, `layout.md`. **Réutiliser l'existant** avant de créer : `components/ui/*` (`Button`, `Field`, `TextField`, `SelectField`, `ModalShell`, `Switch`, `FilterMenu`, `FaqAccordion`, `Icon`, `Section`, `RecipeCard`, `PickedChoice`, `ArrowScroller`), `styles/tokens.css`, CSS Modules, `lucide-react`, `clsx`, `zod`, `lib/i18n.ts` ; un composant par fichier, textes dans `messages/fr.json`. **L'API Django fait foi** : aucune règle métier (quota, 48 h, solde) n'est décidée seulement côté Next.js ; le site affiche et pré-vérifie, le backend refuse, ses messages d'erreur sont affichés tels quels. **Jamais** de jeton, de clé ni de donnée de santé dans le JavaScript du navigateur.

#### S00. Envoyer les demandes du site vers HubSpot
- **Branche** : `feat/s00-lead-to-hubspot` · **Taille** : petite à moyenne · **Dépend de** : rien (ni de Django, ni d'une autre PR) · **Débloque** : rien.
- **Objectif** : **C'est le seul chantier qui rapporte de l'argent dès la semaine suivante.** Aujourd'hui, un visiteur remplit le formulaire, le serveur du site vérifie sa saisie, affiche « merci »… et la demande est perdue : `app/api/lead/route.ts` se termine sur un `console.info` et un commentaire `TODO`. Autrement dit, le site génère peut-être déjà des demandes que personne ne voit. Chaque demande perdue, c'est un mois d'engagement en moins, soit plusieurs centaines d'euros. Cette PR fait arriver la demande à bon port — dans le CRM et dans votre boîte mail — et la protège contre les robots. Elle ne touche pas à Django : conformément au principe du projet, **aucun prospect n'entre dans l'administration** tant que rien n'est signé.
- **Contexte technique** : la route `app/api/lead/route.ts` existe déjà et fait la moitié du travail : lecture du corps, **champ piège** anti-spam (si `website` est rempli, elle répond « ok » sans rien traiter), validation du téléphone et de l'e-mail, construction d'un objet `lead` complet (source, service, prénom, téléphone, e-mail, pack, formule, dîners, prix après crédit, foyer, nombre de repas, date d'événement, convives, lieu, occasion, message). Elle est appelée par `lib/lead/submit.ts`. Elle s'exécute **côté serveur**, dans le Worker Cloudflare : c'est ce qui permet d'y mettre des secrets. **Turnstile n'existe nulle part dans le code** pour l'instant, malgré ce que laissait entendre la documentation.
- **Fonctionnalités et règles**
  - **Anti-robots** : widget **Cloudflare Turnstile** sur les formulaires (clé de site publique), jeton transmis avec la demande et **vérifié côté serveur** avec la clé secrète. Jeton absent ou invalide : refus avec un message clair. Le champ piège existant est **conservé** : les deux protections se complètent.
  - **Création du contact dans HubSpot** : jeton d'application privée (jamais exposé au navigateur), **création ou mise à jour par e-mail** pour ne jamais créer de doublon ; à défaut d'e-mail, par téléphone. Seules les **propriétés standard** sont renseignées (prénom, nom, e-mail, téléphone) : l'offre gratuite limite les propriétés personnalisées (une source cite 10) **[À VÉRIFIER]**. Tout le détail de la demande part donc dans une **note rattachée au contact**, mise en forme pour être lisible d'un coup d'œil : service demandé, pack, dîners, prix affiché, foyer, date, convives, lieu, occasion, message. Le deal est créé à l'étape « Nouveau » du pipeline, **avec une tâche « rappeler ce contact » à 24 h** (relance de 2.7, réglée dans HubSpot en M1.5). **[À VÉRIFIER]** : si l'offre gratuite ne crée pas cette tâche automatiquement, c'est S00 qui la crée par l'API au même moment — la créer à la main à chaque demande n'aurait aucun sens, puisque c'est justement l'oubli qu'elle évite.
  - **Ne jamais perdre une demande** — c'est l'exigence centrale de cette PR. Trois garde-fous :
    1. **La réponse au visiteur ne dépend jamais de HubSpot.** La demande est validée, le visiteur reçoit sa confirmation, et l'envoi vers HubSpot se fait ensuite.
    2. **Un e-mail de notification vous est envoyé à chaque demande**, avec son contenu complet. C'est le vrai filet : si HubSpot est indisponible ou si le jeton a expiré, vous avez quand même la demande sous les yeux et vous créez le contact à la main. Deux canaux indépendants valent mieux qu'un canal fiable.
    3. **Un échec d'envoi vers HubSpot déclenche une alerte** (Sentry), **sans aucune donnée personnelle** dans le message : seulement « échec d'envoi d'une demande », conformément à l'interdit 4 de la section 7.4.
  - **Accusé de réception au visiteur** : un e-mail court confirmant la réception et annonçant un délai de réponse. Le délai de réponse est un facteur de conversion direct (section 2.3, étape 3) : dire « je vous réponds sous 24 h » vaut mieux que le silence.
  - **Limitation de débit** par adresse IP, pour qu'un robot qui passerait Turnstile ne puisse pas saturer votre boîte ni votre quota d'e-mails.
  - **Variables d'environnement** : `TURNSTILE_SECRET_KEY`, `HUBSPOT_PRIVATE_APP_TOKEN`, `BREVO_API_KEY`, `LEAD_NOTIFY_EMAIL`. La page de confidentialité est mise à jour dans la même PR.
  - **RGPD** : la demande est traitée au titre des **mesures précontractuelles**, donc sans case à cocher — mais la page de confidentialité doit mentionner **HubSpot comme sous-traitant** et le transfert hors Union européenne **[À VÉRIFIER]**. Un lien vers cette page figure sous le formulaire. Aucun envoi commercial n'est fait sans consentement distinct, et ce projet n'en prévoit aucun.
- **Critères** : une demande valide crée **un seul** contact avec sa note ; une seconde demande du même e-mail met à jour le contact au lieu d'en créer un autre ; **une demande arrive toujours jusqu'à vous même si HubSpot est indisponible** (test avec un client HubSpot en échec) ; un jeton Turnstile absent ou invalide est refusé ; le champ piège fonctionne toujours ; aucun secret et aucune donnée personnelle dans les journaux ni dans Sentry ; le visiteur obtient sa réponse sans attendre les appels externes.
- **Vous contrôlez** : envoyer une vraie demande depuis le site de test, vérifier le contact et sa note dans HubSpot, recevoir les deux e-mails ; puis fausser volontairement le jeton HubSpot et vérifier que vous recevez quand même la notification.
- **Étapes manuelles avant** : **M1.4** (Turnstile), **M1.5** (application privée HubSpot et pipeline), **M1.2** (Brevo et domaine d'envoi authentifié).
- **Risque** : les limites de l'offre gratuite de HubSpot (propriétés, débit d'API) et de Brevo (300 e-mails par jour) ne sont pas vérifiées. À votre volume, la limite d'e-mails n'est pas un sujet ; celle des propriétés est contournée par l'usage des notes.

#### S00b. Skills de l'agent : Next.js, React, référencement et accessibilité
- **Branche** : `feat/s00b-agent-skills` · **Taille** : moyenne · **Dépend de** : rien (le dépôt existe déjà) · **Débloque** : **toutes les PR du site**, qui s'écrivent avec ces règles.
- **Objectif** : Toutes les PR de ce plan sont écrites par un agent. Aujourd'hui, la seule chose qui l'encadre est `AGENTS.md` et un paragraphe de consignes communes qu'il doit **penser** à lire. Un *skill* fait l'inverse : il se charge tout seul quand la tâche le concerne. L'enjeu n'est pas le confort, c'est la **régularité** — sur vingt PR écrites à des semaines d'intervalle, c'est ce qui fait la différence entre un code homogène et vingt styles différents à relire. Cette PR est la première du dépôt du site parce que tout ce qui la suit en bénéficie.
- **La contrainte qui décide de la forme** : cette version de Next.js **comporte des changements incompatibles avec ce que les modèles ont appris** — `AGENTS.md` le dit explicitement, et `middleware.ts` s'appelle désormais `proxy.ts`. Un skill qui recopierait l'API de mémoire **produirait du code faux**, et avec l'autorité d'une règle maison. Les skills `nextjs` et `react` sont donc des **cartes vers la documentation vendorisée** dans `node_modules/next/dist/docs/` : ils disent **quel guide lire avant quelle tâche**, et n'ajoutent de leur cru que les conventions du projet. Aucun skill ne décrit une API de framework.
- **Fonctionnalités et règles** : cinq skills dans `.claude/skills/<nom>/SKILL.md`, chacun avec une description qui déclenche son chargement.
  - **`nextjs`** — la carte des guides : `forms.md` avant un formulaire, `data-security.md` et `backend-for-frontend.md` avant tout appel serveur, `authentication.md` avant un jeton, `keeping-pages-static.md` avant d'ajouter une page, `environment-variables.md` avant un secret, `content-security-policy.md` et `json-ld.md` quand c'est le sujet, `03-api-reference/03-file-conventions/proxy.md`, `route-groups.md` et `layout.md` pour les conventions de fichiers. Conventions du projet : **site entièrement statique**, aucune règle métier décidée côté site (l'API Django fait foi), validation **Zod** de toute réponse d'API, aucun secret ni jeton dans le JavaScript du navigateur, et la limite de **temps de calcul** du Worker Cloudflare pour la seule page dynamique.
  - **`react`** — un composant par fichier ; **réutiliser `components/ui/*` avant de créer** (`Button`, `Field`, `TextField`, `SelectField`, `ModalShell`, `Switch`, `FilterMenu`, `FaqAccordion`, `Icon`, `Section`, `RecipeCard`, `PickedChoice`, `ArrowScroller`) ; CSS Modules et `styles/tokens.css`, jamais de valeur de couleur en dur ; textes dans `messages/fr.json`, jamais dans le composant ; frontière serveur/client explicite ; **aucune donnée de santé** ne transite par un composant.
  - **`seo`** — métadonnées par page, URL canonique, plan du site, **hiérarchie des titres**, `alt` obligatoire, et surtout les **données structurées `LocalBusiness` et `Service`** (guide `json-ld.md`) : pour une cheffe à domicile, c'est le référencement local qui amène les demandes que S00 capte. `npm run test:seo` doit passer. Cœurs de métrique web (*Core Web Vitals*) à ne pas dégrader.
  - **`accessibilite`** — **WCAG 2.2 AA en continu** plutôt qu'un audit tardif : clavier seul, focus visible, message d'erreur rattaché à son champ, aucune information portée par la seule couleur, utilisable à 375 px. S04 cesse d'être une découverte pour devenir une vérification.
  - **`tests`** — Vitest pour les unités, Playwright pour les parcours, `npm run test:seo` pour le référencement. **Un seul parcours mérite un test de bout en bout** : l'achat d'une carte cadeau, seule page dynamique ; tout le reste étant figé, un test de rendu suffit. Deux règles qui évitent des tests trompeurs : ne jamais vérifier une **règle métier** côté site (c'est l'API qui décide, le site affiche), et ne jamais simuler l'API dans un test de parcours sans vérifier que le schéma **Zod** est celui du vrai contrat. S01 ajoute le test de parité HTML avant/après migration.
  - **`revue-projet`** — la liste de contrôle propre au projet, en **complément** de la commande `/code-review` fournie par Claude Code, pas à sa place : interdits de la section 7.4, bonnes pratiques de 7.5, règles de revue de 1.4, et le rappel que le site ne décide d'aucune règle métier.
  - **Ce qu'un skill ne contient jamais** : une API de framework recopiée, un secret, une valeur de prix ou de délai (elles sont dans l'administration ou dans ce document, jamais figées dans un skill).
- **Critères** : chaque skill a une description qui le déclenche sur les bonnes tâches ; **aucun skill ne décrit une API de Next.js ou de React** (revue) ; un test de CI vérifie que **tous les chemins de documentation cités existent réellement** dans `node_modules/next/dist/docs/` — c'est ce qui révélera qu'un skill a vieilli à la prochaine montée de version ; `npm run test:seo` passe toujours.
- **Vous contrôlez** : demander à l'agent une petite modification de formulaire et vérifier qu'il cite `forms.md` avant d'écrire ; puis lui demander une nouvelle page et vérifier qu'il ne casse pas le caractère statique du site.

#### S01. Lire le contenu depuis l'API au moment de la construction
- **Branche** : `feat/s01-content-from-api` · **Taille** : grande · **Dépend de** : B05, B06, B06b, B07 · **Débloque** : rien.
- **Objectif** : Aujourd'hui le contenu de votre site est dans des fichiers du dépôt. Cette PR fait lire ce contenu à Django au moment de la construction du site : le visiteur ne verra aucune différence (mêmes pages, même vitesse, même référencement), mais c'est ce qui transforme vos modifications dans l'administration en pages du site. Si Django est indisponible pendant la construction, la construction échoue plutôt que de publier un site vide, et le site en ligne reste celui d'avant. **C'est cette PR qui supprime les anciens fichiers de contenu**, et seulement après comparaison des pages avant et après : laisser `content/` en place plus longtemps serait un piège, car le dossier ressemblerait encore à la source de vérité et quelqu'un y modifierait un fichier sans effet.
- **Fonctionnalités et règles** : remplacer la lecture de `content/`, de la FAQ, des avis, des zones, des tarifs, des recettes, des pages légales et des réglages par des appels à l'API **au moment de la construction**, avec **validation Zod** (`API_BASE_URL`, secret `BUILD_API_TOKEN`). **Suppression des anciens fichiers de contenu** (`content/`, FAQ, avis, zones, recettes, pages légales, réglages), **qu'après** contrôle de parité (HTML identique à la normalisation près). **Blocs vendeurs** : `lib/i18n.ts` superpose le calque de `page-texts` (B06b) à `messages/fr.json` avant toute lecture — un seul point de chargement à modifier, aucun composant touché ; les clés non migrées continuent de venir du fichier, qui **reste dans le dépôt** (contrairement à `content/`, puisqu'il porte encore les 1 231 libellés d'interface). Marqueurs de prix résolus par l'API. À savoir : la commande d'import de B06 lit ces fichiers (`--site-path`) ; elle a déjà tourné au palier 2, et s'il fallait réimporter, les fichiers se récupèrent dans l'historique git.
- **Critères** : site identique visuellement ; un échec de l'API **fait échouer la construction** sans publier ; `npm run test:seo` passe ; aucun fichier de contenu ne subsiste dans le dépôt après la PR, **à l'exception de `messages/fr.json`** qui garde les libellés d'interface ; sans aucune édition en base, le fichier fusionné est identique au fichier d'origine.
- **Vous contrôlez** : `npm run build` avec l'API locale puis en test, comparer des pages clés.

#### S02. Déclenchement de la publication et déploiement
- **Branche** : `feat/s02-publish-workflow` · **Taille** : petite à moyenne · **Dépend de** : B07, B09, M1.8 · **Débloque** : rien.
- **Objectif** : C'est le dernier maillon de la chaîne de publication : quand vous cliquez sur « Publier » dans l'administration, le site se reconstruit et se met en ligne tout seul, d'abord sur le site de test puis, avec votre approbation, en production. Un seul déploiement à la fois, et un déploiement qui échoue ne remplace jamais le site en ligne.
- **Fonctionnalités et règles** : workflow GitHub Actions déclenché par `repository_dispatch` (`content-updated`) et par `push` ; environnements `test` et `production` (approbation pour la production) ; déploiement avec `opennextjs-cloudflare` et les environnements de `wrangler.jsonc` ; secrets : jeton Cloudflare, identifiant de compte, jeton de lecture de l'API ; `concurrency` (une seule construction à la fois) ; une construction échouée ne remplace pas le site en ligne ; statut lisible par le backend.
- **Critères** : un dispatch de test déclenche une construction ; un échec n'écrase pas le site.
- **Vous contrôlez** : cliquer sur **Publier** dans l'administration et suivre la construction jusqu'au site de test ; puis provoquer volontairement un échec et vérifier que le site en ligne ne bouge pas.

#### S03. Carte cadeau : page publique d'achat
- **Branche** : `feat/s03-giftcard` · **Taille** : moyenne · **Dépend de** : B17 · **Débloque** : S04.
- **Objectif** : Cette PR ouvre la vente de cartes cadeaux au public : une page du site où un visiteur choisit un montant, renseigne l'acheteur et le destinataire, un message et une date d'envoi, puis paie via Stripe. Le code ne s'affiche jamais à l'écran : il part par e-mail une fois le paiement confirmé. Le formulaire est protégé contre les robots. C'est la seule page dynamique du site ; l'utilisation du code, elle, se fait par vous à la création de l'engagement.
- **Fonctionnalités et règles**
  - **Page « Acheter »** (`/carte-cadeau`) : montant (libre entre le minimum et le maximum), prénom et e-mail de l'acheteur et du destinataire, message, date d'envoi (immédiate ou programmée), acceptation des conditions, jeton Turnstile. L'action serveur appelle `POST /giftcards/checkout` puis redirige vers le paiement Stripe hébergé — le secret partagé et la clé Turnstile restent côté serveur, jamais dans le navigateur.
  - **Page « Merci »** (`/carte-cadeau/merci`) : confirmation et récapitulatif, sans jamais révéler le code. **Page « Annulé »** (`/carte-cadeau/annule`) : message neutre et lien pour réessayer.
- **Critères** : aucune carte annoncée comme émise avant le retour de paiement ; Turnstile et limitation de débit actifs ; erreurs par champ ; la page « merci » ne contient pas le code.
- **Vous contrôlez** : acheter une carte cadeau avec une carte de test depuis le site de test, vérifier que le code n'apparaît nulle part à l'écran, et le recevoir par e-mail. **Avant** : M1.4.

#### S04. Site : durcissement
- **Branche** : `feat/s04-hardening` · **Taille** : moyenne · **Dépend de** : S03 · **Débloque** : rien.
- **Objectif** : La dernière PR avant l'ouverture : on vérifie que le site est utilisable par tous (accessibilité, clavier, téléphone), que la sécurité tient, et que les parcours complets fonctionnent avec des tests automatiques. On met aussi à jour la page de confidentialité : qui reçoit les données, où sont les allergies, combien de temps on les garde.
- **Fonctionnalités et règles** : audit d'accessibilité **WCAG 2.2 AA** (clavier, focus visible, erreurs liées aux champs, pas d'information portée par la seule couleur, mobile d'abord) ; revue de sécurité ; tests de bout en bout Playwright sur le parcours de carte cadeau ; **page de confidentialité mise à jour** (sous-traitants, allergies conservées dans HubSpot avec consentement explicite, durées de conservation) ; erreurs du site envoyées à Sentry sans donnée personnelle. Le formulaire de demande reste inchangé (HubSpot direct).
- **Critères** : l'audit d'accessibilité ne laisse aucune anomalie bloquante ; tout le parcours de carte cadeau passe de bout en bout sous Playwright ; aucune donnée personnelle n'arrive dans Sentry ; la page de confidentialité cite chaque sous-traitant et chaque durée de conservation.
- **Vous contrôlez** : parcourir le site au clavier seul, puis sur téléphone ; acheter une carte cadeau de test de bout en bout ; relire la page de confidentialité.

## 4. Étapes manuelles : comptes, secrets, décisions

Chaque étape indique **avant quelle PR** elle est nécessaire. Les décisions encore ouvertes sont marquées **DÉCISION**.

### M0. Avant la première PR
- **M0.1 Créer le dépôt GitHub `chefmeemz-backend`** : privé, dans votre compte ou l'organisation voulue, branche par défaut `main`, **sans** README ni `.gitignore` initiaux (la PR B00 les apporte). Cloner à côté de `chefmeemz`.
- **M0.2 Protéger `main`** (Settings → Branches) : pull request obligatoire, au moins une approbation, vérifications de la CI obligatoires, branches à jour avant fusion, historique linéaire, interdiction du *force push*. Activer **Dependabot alerts** et **secret scanning**.
- **M0.3 Environnements GitHub** (Settings → Environments) : `test` et `production` ; pour `production`, exiger votre approbation avant déploiement.
- **M0.4 Poste de travail** : Docker Desktop, Python 3.12 ou plus, `uv`, Git, `make`. Node.js est déjà présent pour le site.
- **M0.5 Donner à Claude l'accès aux deux dépôts** : ouvrir la session avec `chefmeemz-backend` comme dossier de travail et `chefmeemz` en dossier supplémentaire.
- **M0.6 Copier ce document** dans `chefmeemz-backend/docs/PROJECT.md` (il sert de référence unique à Claude) et créer `docs/DECISIONS.md` vide avec un titre. *(La PR B00 vérifie leur présence.)*

### M1. Avant la PR indiquée
- **M1.1 Questionnaire client** (avant **B11**) :créer le **questionnaire client** (formulaire HubSpot ou document) : adresse, téléphone, foyer, allergies, régimes, goûts, compte URSSAF, avec une **case de consentement explicite** pour les allergies (voir M1.17).
- **M1.19 Habiller les trois modèles de devis** (**pendant B04c**, pas avant) : les trois documents (batch cooking, chef privé, cours) sont créés dans votre Drive par le bouton « Créer les modèles » de la page A-Devis — **ne les créez pas à la main**, l'application n'y aurait pas accès. Vous les habillez ensuite dans Google Docs : **parties fixes rédigées** (identité, modalités de paiement, conditions d'annulation propres au service, lien et version des CGV, phrase d'acceptation) et **repères** `{{…}}` aux emplacements variables, dont la page A-Devis donne la liste. Le numéro est attribué par l'administration, donc **aucun registre manuel à tenir**.
- **M1.20 Arbitrer les treize questions à double réponse** (**pendant B06b**, après l'import) : votre FAQ existe aujourd'hui en **118 exemplaires pour 70 questions**, et treize d'entre elles ont une réponse différente selon la page — souvent une version plus courte sur l'accueil, une version propre au service sur la page de service. En collection unique, une question n'a qu'une réponse. L'import garde celle de la page FAQ et vous remet la liste des variantes écartées : vous relisez ces treize entrées et gardez la formulation que vous préférez. **Ce que vous y gagnez** : aujourd'hui, corriger une réponse demande de la retrouver dans jusqu'à trois fichiers ; demain, vous l'écrivez une fois. Si une variante vous manque vraiment, la question peut être dédoublée en deux entrées placées différemment.
- **M1.2 Brevo** (avant **B02** pour les tests, **B13** pour l'envoi réel) : créer le compte, **authentifier le domaine d'envoi** (enregistrements DNS SPF, DKIM, DMARC chez votre gestionnaire de DNS), créer une clé d'API par environnement. Confirmer l'adresse d'expédition retenue, `contact@tabletribu.com`. **[À VÉRIFIER]** : limites de l'offre gratuite.
- **M1.3 Stockage de fichiers** (avant **B02**) : **DÉCISION** : fournisseur compatible S3, hébergé dans l'UE. Créer, par environnement, un espace **public** (images du site) et un espace **privé** (devis, preuves, PDF), des clés d'accès à portée limitée, la configuration CORS pour l'espace public. Tant que ce n'est pas fait, B02 et B03 utilisent le stockage local de développement.
- **M1.4 Cloudflare Turnstile** (avant **S00** pour le formulaire de demande, **S03** pour la carte cadeau) : créer un widget pour `tabletribu.com` et `test.tabletribu.com` ; noter la clé de site (publique) et la clé secrète (à garder côté serveur).
- **M1.5 HubSpot** (avant **S00** pour les demandes du site, **B11** pour les notes de dossier) : créer une **application privée** avec les droits d'**écrire des contacts, des notes et des deals** (S00 crée le contact ; B11 n'ajoute que des notes) ; noter le jeton ; **connecter votre messagerie** à HubSpot (enregistrement des e-mails) ; définir les étapes du pipeline (Nouveau, Qualifié, Devis envoyé, Gagné, **Dossier créé**, Perdu) et **relever les identifiants internes** des étapes « Devis envoyé » et « Dossier créé », que l'administration déplace elle-même (B04c, B11) : ces identifiants sont opaques et se saisissent dans l'administration, jamais dans le code. **Relances HubSpot (2.7)** : tâche **« rappeler ce contact » dès la création du deal, échéance à 24 h** (c'est l'étape dont le retard coûte le plus cher, et la seule relance portant sur un prospect pas encore appelé), tâche **« envoyer le devis » à 48 h** dès le passage à « Qualifié » (sans elle, un prospect qualifié et intéressé attend son devis sans que rien ne vous le rappelle — c'est le prospect le plus coûteux à perdre, puisque l'appel est déjà passé), tâches de relance du devis (J+7, J+14, expiration à J+30), du questionnaire (J+3) et « créer le dossier Django » dès « Gagné » ; **arrêter toute séquence ou tâche** quand le deal passe à « Dossier créé » ; enregistrer trois vues (« deals sans devis depuis plus de 3 jours », « devis sans réponse », « deals Gagné sans dossier ») dont les adresses se saisissent dans l'administration (`FollowUpSettings`). **[À VÉRIFIER]** : tâches automatiques disponibles ou non en offre gratuite ; sinon les créer à la main. **[À VÉRIFIER]** : limites de l'offre gratuite (propriétés, appels d'API) ; HubSpot n'a pas de bac à sable gratuit, donc un compte séparé pour les tests ou le client factice.
- **M1.6 Stripe** (avant **B16**) : créer le compte, rester en **mode test**, noter les clés de test, enregistrer plus tard l'adresse du webhook par environnement ; activer le prélèvement SEPA et personnaliser la page de paiement avant la production.
- **M1.7 Jeton de publication** (avant **B09**) : créer un **jeton GitHub à portée minimale** pour déclencher un workflow du dépôt `chefmeemz` (`repository_dispatch`), l'enregistrer comme secret du backend ; **à vérifier** : les droits exacts requis par ce jeton.
- **M1.8 Cloudflare** (avant **S02**) : vérifier votre **offre Workers** (limite de temps de calcul par requête), créer un **jeton d'API** pour le déploiement depuis GitHub Actions, enregistrer les secrets du dépôt `chefmeemz` (jeton, identifiant de compte).
- **M1.9 Hébergement de Django** (avant **B07**) : **DÉCISION, et la seule bloquante**. Il faut un hébergeur de conteneurs, une base PostgreSQL gérée avec sauvegardes, un stockage, des noms de domaine (hypothèse `api.test.tabletribu.com` et `api.tabletribu.com`), et un certificat TLS. Le choix doit tenir compte de l'exposition (page de choix du menu joignable publiquement par son lien signé ; administration derrière 2FA et préfixe non évident). **Si cela passe par Teads : #ask-devx pour le chemin approuvé et #ask-security pour la sécurité.** Aucune PR avant B07 n'en dépend.
- **M1.10 DNS** (avant **B07**) : créer les enregistrements des domaines du backend selon la décision d'hébergement (**M1.9**) ; vérifier ceux de `test.tabletribu.com` (déjà dans `wrangler.jsonc`).
- **M1.11 Sentry** (avant **B20**, optionnel plus tôt) : créer un projet en région UE par environnement ; noter les DSN.
- **M1.12 Votre compte** (après **B01**) : créer votre compte, activer l'authentification à deux facteurs avec une application TOTP, conserver les codes de secours.
- **M1.13 Informations légales** (avant la production) : **DÉCISION**. raison sociale, forme juridique, SIRET, adresse, numéro de déclaration de services à la personne, assurance, médiateur de la consommation. À saisir dans l'administration (`LegalIdentity`) ; tant qu'elles manquent, la vente de cartes cadeaux est bloquée en production (bandeau d'avertissement dans l'administration).
- **M1.14 Comptable** (avant **B04b** et **B04c** pour l'éligibilité des lignes au crédit d'impôt, **B11**, **B15**, **B17**, et avant **B21** pour les points) : valider par écrit les mentions du devis, la TVA, l'éligibilité au crédit d'impôt par ligne (déplacement, options, plats sur mesure), la valeur d'un accord par e-mail, le traitement des cartes cadeaux, l'articulation carte cadeau et avance immédiate, et — avant **B21** seulement — le traitement des **points de fidélité convertis en carte cadeau**.
- **M1.15 Outil de facturation** (avant **B15**) : **DÉCISION** (gère-t-il l'avance immédiate URSSAF, a-t-il une interface de programmation ?). Tant que ce n'est pas décidé, B15 livre la saisie manuelle.
- **M1.16 FAQ et CGV** (avant la production) : aligner les textes (règle des 48 h, changement de formule, délais d'annulation) ; reporté pour l'instant.
- **M1.17 Allergies et RGPD** (avant **B11**, et avant toute collecte réelle) : les allergies sont des données de santé gardées **dans HubSpot** (jamais dans Django). À faire : (1) **consentement explicite** dans le questionnaire (case dédiée, texte précis, retirable) ; (2) **registre des traitements** (même simple) ; (3) **politique de confidentialité** mise à jour (finalités, durée, HubSpot comme sous-traitant, transfert hors UE **[À VÉRIFIER]**) ; (4) **clause de responsabilité** des CGV (le client choisit ses recettes après lecture des allergènes) à faire valider **[À VÉRIFIER]** ; (5) vérifier si HubSpot gratuit permet de restreindre l'accès aux champs sensibles **[À VÉRIFIER]**.
- **M1.18 Compte Google pour la génération des devis** (avant **B04c**) : créer un **projet Google Cloud** (gratuit), y activer l'**API Drive** et l'**API Docs**, créer un **identifiant OAuth 2.0**, et demander le seul périmètre **`drive.file`**. Deux points qui font échouer l'installation si on les manque : (1) **publier l'écran de consentement en « production »** — tant qu'il reste en « test », Google **périme le jeton de rafraîchissement au bout de 7 jours** et la génération s'arrête toute seule chaque semaine ; (2) ne demander **aucun périmètre sensible** (`documents`, `drive`, `drive.readonly`), sans quoi la publication déclenche une procédure de validation. Puis exécuter la commande de première autorisation (B04c), accepter dans le navigateur, et enregistrer le **jeton de rafraîchissement** comme secret. **[À VÉRIFIER]** : si votre compte est un compte Google Workspace et non un Gmail personnel, l'écran de consentement peut rester « interne », ce qui évite la publication **[À VÉRIFIER]**.

## 5. Décisions ouvertes et points à vérifier

Toutes les autres décisions sont prises et intégrées aux PR (section 3). Seules restent celles-ci.

### 5.1 Décisions à prendre

Index des décisions encore ouvertes. Le **détail et le travail à faire** sont dans l'étape manuelle citée (section 4) : ils ne sont pas répétés ici.

| Décision | Bloque | Détail | Tant que ce n'est pas tranché |
| --- | --- | --- | --- |
| **Hébergement de l'administration** `[BLOQUANT]` | B07, B20 | M1.9 | développement local avec Docker |
| **Outil de facturation** | B15 | M1.15 | `ManualProvider` (saisie à la main) |
| **Informations légales** | production | M1.13 | vente de cartes cadeaux bloquée en production |
| **Comptable** : mentions du devis, TVA, crédit d'impôt par ligne | B04b, B04c, B11, B15, B17 | M1.14 | lignes supposées non éligibles par prudence |
| **FAQ et CGV à aligner** (48 h, changement de formule) | production | M1.16 | textes du site divergents (voir 2.6) |
| **Clause de responsabilité sur les allergènes** (juriste) | production | M1.17 | affichage des allergènes et accord écrit du client |
| **Domaine du backend** | B07 | 7.2 | `api.test.tabletribu.com`, `api.tabletribu.com` |
| **Version de Django (LTS)** | B00 | 3.1 | 5.2 LTS, à confirmer sur le site officiel |
| **Agenda de la cheffe** | B12 | — | Google Agenda supposé, à confirmer |
| **Durée de validité du lien de choix** | B13, B14 | — | jusqu'à la date limite du plan (environ 4 jours) |
| **Barème des points de fidélité** | B21 | B21 | 10 points par passage, 100 points = 20 €, conversion dès 100 points |
| **Espace client avec comptes** | — | 2.5 | reporté ; à reconsidérer au-delà d'une trentaine de clients actifs par mois, quand préparer les propositions à la main devient trop lourd. Les modèles l'accueillent sans rien défaire (`Engagement.menu_mode`) |

### 5.2 Points à vérifier
- **HubSpot Free** : limite de propriétés personnalisées (une source cite 10), connexion de la messagerie, notification par e-mail à chaque demande, formulaire gratuit pour le questionnaire, absence probable de droits par champ pour les données de santé, débit d'API.
- **E-mail** : limites de l'offre gratuite de Brevo, domaine d'envoi authentifié.
- **Cloudflare** : offre Workers et temps de calcul par requête pour la seule page dynamique restante, l'achat de carte cadeau (contrainte réelle : le temps de calcul, pas la taille).
- **Outil de facturation, Cal.com et autres tarifs** : chiffres issus de sites tiers, parfois contradictoires ; à confirmer sur les sites officiels.

**Sources consultées le 11/11/2026** : [HubSpot](https://www.spotdev.co.uk/blog/is-hubspot-free) · [HubSpot, devis et signature](https://knowledge.hubspot.com/quotes/use-e-signatures-with-quotes?tr=true) · [Stripe](https://stripe.com/fr/pricing/) · [Brevo](https://www.sendx.io/blog/brevo-pricing-plans-costs-alternatives-2026) · [Indy](https://www.indy.fr/guide/facturation/logiciel/gratuit/) · [comparatif facturation](https://digitiz.fr/facturation-electronique-gratuite/) · [Cal.com](https://costbench.com/software/scheduling/cal-com/free-plan/)

## 6. Checklist avant la mise en production
- Toutes les PR B00 à B20 et S00 à S04 fusionnées, CI verte.
- **S00 vérifiée sur le site réel** : une demande de test crée bien le contact et déclenche les deux e-mails.
- **M1.13** : informations légales saisies ; la vente de cartes cadeaux est débloquée en production.
- **M1.14** : réponses du comptable appliquées (mentions, TVA, crédit d'impôt par ligne, cartes cadeaux).
- **M1.15** : outil de facturation choisi, ou procédure manuelle documentée.
- **M1.16** : FAQ et CGV alignées sur les règles réelles (48 h, annulation, changement de formule).
- Sauvegardes restaurées avec succès, supervision active, accès administrateur protégé (2FA, préfixe).
- Stripe en mode réel, SEPA activé, webhooks de production enregistrés, domaine d'envoi authentifié.
- **M1.18** fait : écran de consentement Google **publié en production** (sinon le jeton expire tous les 7 jours), génération d'un devis vérifiée de bout en bout.
- **M1.1** et **M1.17** faits : modèle de devis, questionnaire avec consentement explicite, registre des traitements, politique de confidentialité et clause de responsabilité validées.
- La **page de choix du menu** testée depuis un téléphone, avec un lien expiré et un lien déjà utilisé ; relances et résumé quotidien activés un par un et vérifiés sur votre propre adresse.
- Dernier contrôle des **données de santé** : aucune allergie dans Django, Stripe, les journaux, les e-mails marketing ni les PDF ; les allergies sont dans HubSpot avec consentement explicite.

# Partie III — La technique

Les choix d'architecture, les données et les contrats. Destinée à qui écrit le code.


## 7. Stack et conventions

### 7.1 Choix par défaut
- **Python 3.12+**, **Django LTS courant** (5.2 LTS à la date de rédaction ; vérifier s'il existe une LTS plus récente), **PostgreSQL**.
- **API** : Django REST Framework + `drf-spectacular` (schéma OpenAPI) pour la **lecture par la construction du site** (authentifiée par `BUILD_API_TOKEN`, voir section 8), la route serveur à serveur de la carte cadeau et les webhooks. **Aucune route n'est ouverte sans authentification**, et **aucun JavaScript de navigateur n'appelle cette API** : elle n'est consommée que de serveur à serveur.
- **Page de choix du menu** : page servie par **Django** (gabarit et CSS aux couleurs du site), détaillée en **B14**.
- **Administration de la cheffe et édition du contenu (le « CMS », voir glossaire)** : **administration Django avec le thème Unfold** (aux couleurs du site), plus **4 pages sur mesure** — `A-Dossier`, `A-Suivi`, `A-Publier`, `A-Devis` (voir le glossaire) — construites en templates Django et HTMX (B04b, B04c, B09, B11, B12). **Pas d'API d'administration** : la cheffe n'utilise que l'administration, qui s'appuie sur les sessions Django.
- **Tâches asynchrones** : **Procrastinate** (file adossée à Postgres, pas de Redis).
- **PDF** : **WeasyPrint** (listes d'ingrédients, cartes cadeaux).
- **E-mail** : Brevo (API ou SMTP).
- **Stockage des fichiers** : stockage compatible S3 via `django-storages`, **privé** par défaut.
- **Qualité** : `pytest-django`, `factory-boy`, `ruff`, `mypy` (strict sur les apps métier), `pre-commit`, GitHub Actions.
- **Observabilité** : Sentry (offre gratuite) + route `/healthz`.

### 7.2 Conventions de code
- **Montants** : entiers en **centimes** (`amount_cents`), jamais de flottants. Taux en basis points ou `Decimal`.
- **Identifiants publics** : UUID (pas d'ID séquentiels exposés).
- **Dates** : toujours timezone-aware, stockées en UTC.
- **Configuration** par variables d'environnement (section 11.1) ; aucun secret dans le dépôt.
- **Services** : la logique métier va dans `services.py` par app (pas dans les vues ni les modèles), testée sans HTTP.
- **Intégrations externes** derrière une interface (`Protocol`) avec une implémentation réelle et une implémentation factice pour les tests (`HubSpotClient`, `StripeGateway`, `Mailer`, `InvoicingProvider`, `GoogleDocsClient`).
- Toute action sensible écrit une ligne dans `AuditEvent` (qui, quoi, quand, objet, avant/après).

### 7.3 Apps
`core` (utilitaires, audit, fichiers), `accounts` (staff), `content` (CMS), `catalog` (recettes, ingrédients, allergènes), `pricing` (packs, grille, zones), `clients` (dossier client), `engagements` (engagements, passages, réservations), `planning` (plans de repas, choix, listes d'ingrédients), `billing` (références de facture, URSSAF), `payments` (Stripe), `giftcards`, `loyalty` (points de fidélité), `notifications`, `integrations` (HubSpot, GitHub, Stripe, Brevo, Google Docs), `reviews`, `staffdesk` (registre de suivi et relances, tableau « à faire »), `mealchoice` (page de choix du menu, voir B14).

### 7.4 Interdits (à tester)
1. **Aucun prospect** dans la base avant la création manuelle du dossier (page A-Dossier). Le **registre des devis émis** (`IssuedQuote`) ne fait pas exception : il ne porte ni nom, ni e-mail, ni téléphone, ni montant.
2. **Aucune allergie, aucun régime, aucune donnée de santé de client** dans Django (ni champ, ni note interne), et aucune dans les journaux, Stripe, les e-mails marketing ni les PDF. Un test vérifie qu'aucun modèle ne porte ce type de champ ; la note interne du client affiche un avertissement.
3. **Aucun numéro de carte bancaire** ne passe par Django (Stripe Checkout hébergé).
4. **Aucun secret** dans les logs, les messages d'erreur, les fixtures.
5. Les **factures** ne sont pas numérotées par Django (c'est la suite continue de l'outil de facturation).

### 7.5 Bonnes pratiques officielles de Django et DRF
Ces règles viennent des recommandations officielles de Django et de DRF (sources en fin de section, consultées le 11/11/2026). Les règles marquées **(projet)** sont nos conventions, pas une recommandation de la documentation. Chacune est vérifiable par un test, par la CI ou en revue (voir 1.4 et B00).

**Django : réglages et sécurité**
1. **Production** : `DEBUG = False` ; `SECRET_KEY` lue dans l'environnement (rotation avec `SECRET_KEY_FALLBACKS`) ; `ALLOWED_HOSTS` explicite ; `DEFAULT_FROM_EMAIL` et `SERVER_EMAIL` définis ; `LOGGING` relu ; pages 400, 403, 404 et 500 personnalisées ; connexions persistantes (`CONN_MAX_AGE`). La CI exécute `manage.py check --deploy` avec les réglages de production : aucun avertissement non justifié.
2. **HTTPS** : redirection vers HTTPS, `SESSION_COOKIE_SECURE` et `CSRF_COOKIE_SECURE`, HSTS d'un an (sous-domaines et *preload* seulement quand tous les sous-domaines sont en HTTPS). `SECURE_PROXY_SSL_HEADER` uniquement derrière un proxy qui fixe et nettoie cet en-tête : à valider selon l'hébergement.
3. **Middlewares de sécurité actifs** : `SecurityMiddleware`, `CsrfViewMiddleware`, `XFrameOptionsMiddleware` ; politique de référent ; politique de sécurité du contenu (CSP) pour l'administration si la version de Django retenue la propose, sans exclure de chemins.
4. **ORM et gabarits** : pas de SQL brut, sinon paramétré (jamais de formatage de chaîne) ; `extra()` et `RawSQL` interdits sauf revue ; `mark_safe` et `|safe` interdits sauf contenu de confiance ; le Markdown public est assaini ; attributs de gabarit entre guillemets.
5. **Fichiers téléversés** : traités comme non fiables : extension et type vérifiés, jamais exécutés ni servis par Django, stockage privé par défaut ; taille aussi limitée par le serveur frontal ; images publiques servies depuis un domaine ou un stockage séparé.
6. **En-tête `Host`** : `request.get_host()`, jamais `META["HTTP_HOST"]`.
7. **Connexions** : Django ne limite pas les tentatives de connexion : `django-axes` (déjà prévu) et limitation applicative.
8. **Migrations (projet)** : jamais de migration fusionnée modifiée ; réversibles ; `makemigrations --check` en CI.

**DRF : réglages globaux**
1. **Permissions par défaut** : le défaut de DRF est `AllowAny`. On met `DEFAULT_PERMISSION_CLASSES = [IsAuthenticated]` ; toute route publique déclare `AllowAny` explicitement sur la vue et figure dans `docs/API.md`. Un test parcourt les routes et échoue si une vue n'a pas de permission explicite ou héritée du défaut sûr.
2. **Authentification** : par défaut DRF active `SessionAuthentication` et `BasicAuthentication`. Pour l'API on les retire et on déclare les classes par groupe de routes : jeton `Bearer` de construction, secret partagé du serveur à serveur, jeton signé de la page de choix.
3. **Pagination** : par défaut aucune. `DEFAULT_PAGINATION_CLASS` et `PAGE_SIZE` définis ; l'API de construction n'est pas paginée mais bornée (moins de 500 objets) et documentée comme exception.
4. **Limitation de débit** : par défaut aucune. Débits par portée (`ScopedRateThrottle`) pour la page de choix du menu, la saisie d'un code de carte cadeau et la route de commande de carte cadeau. `NUM_PROXIES` réglé selon l'hébergement. La documentation DRF précise que la limitation n'est **pas une mesure de sécurité à elle seule** et qu'elle utilise le cache de Django : les compteurs critiques (essais de code de carte cadeau) sont donc **aussi appliqués par la logique métier, comptés en base**, et un cache local à un processus ne suffit pas avec plusieurs processus.
5. **Rendu et JSON** : `BrowsableAPIRenderer` retiré en production ; `STRICT_JSON` conservé.
6. **Erreurs** : un seul gestionnaire d'exceptions au format `{code, message, fields}`, sans détail interne.
7. **Version** : `/api/v1/` avec `ALLOWED_VERSIONS` ; les versions inconnues sont refusées.

**DRF : vues, permissions et sérialiseurs**
1. **Permissions d'objet** : DRF n'applique pas `has_object_permission` aux listes ni aux créations. La page de choix ne lit donc **que le plan de repas désigné par son jeton**, les créations sont restreintes dans `perform_create()`, et tout `get_object()` surchargé appelle `check_object_permissions()`.
2. **Sérialiseurs (projet)** : champs listés explicitement (pas de `__all__`) ; sérialiseurs distincts en lecture et en écriture ; aucune logique métier dans les sérialiseurs ni les vues : elles appellent `services.py` (7.2).
3. **Filtrage (projet)** : champs filtrables et triables listés explicitement.
4. **Schéma** : `drf-spectacular` généré en CI avec validation stricte (`spectacular --validate --fail-on-warn`) ; le schéma documente l'API de lecture et les webhooks.
5. **Tests** : `APIClient` ; tests d'isolation entre clients ; `assertNumQueries` pour éviter les requêtes N+1 ; un test par code d'erreur du gestionnaire.

**Sources** : [Django, liste de contrôle de déploiement](https://docs.djangoproject.com/en/stable/howto/deployment/checklist/) · [Django, sécurité](https://docs.djangoproject.com/en/stable/topics/security/) · [DRF, réglages](https://www.django-rest-framework.org/api-guide/settings/) · [DRF, permissions](https://www.django-rest-framework.org/api-guide/permissions/) · [DRF, limitation de débit](https://www.django-rest-framework.org/api-guide/throttling/). La version de Django (LTS) reste à confirmer en B00.

## 8. Authentification et permissions

- **Équipe** : mot de passe + double authentification obligatoire en production, verrouillage après 5 échecs, groupes `owner` et `assistant` (détail : B01).
- **Client** : **aucun compte, aucun mot de passe.** Le client accède à sa page de choix par un **lien signé à usage unique** (jeton aléatoire stocké haché, lié à un seul plan de repas, valable jusqu'à la date limite, invalidé après validation), sans session. La page n'expose que le prénom et le menu : ni adresse, ni téléphone, ni donnée de paiement, ni allergie enregistrée.
- **API de construction** : jeton `Bearer` à portée lecture seule (`BUILD_API_TOKEN`), comparé en temps constant.
- **Route serveur à serveur** (création de session de carte cadeau) : secret partagé + vérification d'un jeton Turnstile.
- **Webhooks entrants** : signature vérifiée (Stripe), liste d'adresses ou secret pour les autres.

## 9. Modèle de données

Convention : `id` UUID, `created_at`, `updated_at` sur tous les modèles ; `is_published` et `published_at` sur le contenu public. Les champs entre guillemets sont des choix fermés.

### 9.1 `content` (CMS)
Les formes de sortie de l'API doivent **reproduire les schémas Zod existants** (`lib/content/schemas.ts`), clés en camelCase.

- **`Project`** (réalisation) : `slug` (unique), `title`, `order`, `date`, `excerpt`, `categories` (liste de textes), `image` (fichier + `alt` obligatoire, largeur et hauteur extraites automatiquement), `thumbnail` (optionnel), `gallery` (liste ordonnée de `ProjectImage` : fichier, `alt`, `order`), `service` ("batch", "chef", "cours"), `occasion`, `tags`, `city`, `guest_count`, `diets` (liste), `duration`, `guests`, `menu` (liste de lignes), `review_quote`, `review_author`, `client`, `location`, `url`, `related` (liste de slugs).
- **`Inspiration`** (photo indépendante des réalisations) : `title`, `order`, `image` (+ `alt`), `service`, `excerpt`, `location`, `occasion`, `tags`, `guests`, `duration`, `href` (lien interne optionnel, doit commencer par `/`), `is_published`.
- **`Review`** (avis) : `name`, `role`, `text`, `photo` (fichier, remplace l'association par index `media.reviews[i % …]`), `service` (optionnel), `order`, `is_published`.
- **`FaqSection`** : `slug`, `kicker`, `tab`, `title`, `order`. **`FaqEntry`** : `section`, `question`, `answer` (Markdown, liens internes autorisés), `order`, `is_published`. Plus une page FAQ distincte pour les FAQ de tarifs et de zones : champ `placement` ("faq", "tarifs", "zones", "batch", "chef", "cours").
- **`LegalPage`** : `slug` ("cgv", "confidentialite", "mentions-legales"), `title`, `description`, `body` (Markdown), `version` (texte, ex. `2026-11`), `updated`. Les CGV portent un numéro de version, recopié dans `cgv_version` de l'engagement pour tracer la version acceptée.
- **`SiteSettings`** (singleton) : `name`, `phone`, `phone_href`, `email`, `address`, `area`, `hours`, `provisional` (booléen), `social_links` (liste : nom, URL).
- **`LegalIdentity`** (singleton, **éditable en administration**, utilisé sur les cartes cadeaux et les pages légales, et comme référence pour remplir le modèle de devis) : `legal_name`, `legal_form`, `siret`, `legal_address`, `sap_declaration_number` (déclaration de services à la personne), `insurer_name`, `insurance_policy_number`, `mediator_name`, `mediator_contact`, `vat_mention`. Tous les champs sont **vides au départ** : les informations seront saisies plus tard.
- **`Zone`** : `code` ("z1", "z2", "z3"), `label`, `description`, `travel_fee_cents`, `min_order_cents` (optionnel). **`Commune`** : `name`, `zone`, `lat`, `lon`, `label_side` ("left", "right", "top", "bottom").
- **`PageBlock`** (B06b) : `page` ("home", "batchPage", "chefPage", "coursPage", "tarifsPage", "zonesPage", "contact", "servicesPage", "realisationsPage", "recipesPage", "inspirationsPage"), `section` (la clé de second niveau de `messages/fr.json`, par exemple "audience" ou "packages"), `kicker`, `title`, `body` (Markdown), `seo_title`, `seo_description`, `order`, `is_published`. Unicité `(page, section)`. **`PageBlockItem`** : `block`, `title`, `body` (Markdown), `order` — les listes d'arguments.
- **Libellés d'interface** (boutons, onglets, filtres, unités, messages de formulaire, navigation, pied de page) : **non migrés**, ils restent dans `messages/fr.json` et dans le code du site. Ils commandent le comportement des composants (voir « Ce que le CMS ne permet pas » en B03).

### 9.2 `catalog`
- **`Allergen`** : `code` (les 14 allergènes UE, mêmes clés que `ALLERGENS` dans `lib/recipes.ts`), `label`.
- **`Ingredient`** : `name` (unique), `default_unit` ("g", "kg", "ml", "l", "piece", "tbsp", "tsp"), `category` (rayon : fruits-légumes, boucherie, poissonnerie, crèmerie, épicerie, surgelés, autre), `allergens` (M2M).
- **`Recipe`** : `slug`, `title`, `alt`, `photo`, `dish_type` ("viande", "poisson", "vegetarien"), `pack_tier` ("classiques", "signature"), `description`, `diets` ("vegetarien", "vegan"), `origin`, `spice` ("doux", "releve", "epice"), `cost_level` (1 à 4), `season`, `fridge_days`, `freezable`, `reheat`, `base_servings` (nombre de portions de la fiche, défaut 4), `is_published` (visible sur le site), `is_available` (proposée aux clients), `main_ingredients` (liste de textes courts pour la fiche publique, sans quantités).
- **`RecipeIngredient`** : `recipe`, `ingredient`, `quantity` (Decimal), `unit`, `note` (ex. « émincé »), `order`. **Les quantités ne sont jamais exposées par l'API publique de build** ; elles servent aux listes d'ingrédients.
- **Calcul dérivé** : `Recipe.allergens` est l'**union** des allergènes de ses ingrédients, plus un champ manuel `extra_allergens` (traces, adaptations). Un test vérifie la cohérence.

### 9.3 `pricing`
- **`Pack`** : `code` ("essentiel", "signature", "surmesure"), `label`, `description`, `allowed_recipe_tiers` (liste : "classiques", "signature"), `is_custom` (vrai pour sur mesure).
- **`PriceEntry`** : `pack`, `period` ("week", "month"), `dinners` (3, 4, 5), `price_per_session_cents` (avant crédit d'impôt). Reproduit `PRICES` de `lib/lead/pricing.ts`. Unicité `(pack, period, dinners)`.
- **`Offer`** (offre commerciale, **créée et modifiée par la cheffe**) : `code`, `label` (« Offre Post-partum »), `service` ("batch", "chef", "cours", ou vide si elle vaut pour tous), `pitch` (une phrase pour le devis et le site), `description` (Markdown, le paragraphe inséré dans le devis), `valid_from` et `valid_until` (campagne, vides = permanente), `is_active`, `is_public` (visible sur le site ou réservée au devis), `order`.
  - **Préréglages facultatifs**, pour remplir le formulaire de devis d'un coup : `default_pack`, `default_formula`, `default_dinners`, `default_servings`, `default_guest_count`.
  - **Avantage facultatif**, au choix : `discount_rate_bp` (remise en pourcentage) **ou** `discount_cents` (remise fixe) **ou** `fixed_price_cents` (prix forfaitaire qui remplace la grille) — jamais deux à la fois, un test le vérifie. Une offre peut très bien n'avoir **aucun** avantage tarifaire et n'être qu'un habillage commercial.
  - **Ce qu'une offre n'est pas** : ni un service, ni un pack. Un mois de batch cooking « Post-partum » reste un mois de batch cooking — mêmes passages, mêmes menus, même crédit d'impôt. L'offre ne change que **le nom, le texte du devis et, éventuellement, le prix**.
- **`PricingSettings`** (singleton) : `tax_credit_rate_bp` (5000 = 50 %), `chef_price_per_person_cents` (« à partir de 35 € »), `course_price_per_person_cents` (« à partir de 45 € »), `chef_deposit_rate_bp` (3000).
- **Source de vérité** : les prix sont **ici**, jamais dans le code du site ; la gestion est **dynamique** (modifiable en administration, effet à la prochaine publication). Cette grille **préremplit** le prix d'un engagement (page A-Dossier) et alimente le site ; elle ne génère aucun devis. **La grille du code est la référence** (39,50 € après crédit d'impôt pour 3 dîners au mois) ; la FAQ qui annonce « 49,50 € » est obsolète. Pour éviter que des textes citent des prix périmés, le Markdown (FAQ, pages) accepte des **marqueurs de prix** que l'API remplace avant d'envoyer le contenu : `{{price.batch_from_after_credit}}`, `{{price.batch_from_before_credit}}`, `{{price.chef_per_person}}`, `{{price.course_per_person}}`, `{{tax_credit_percent}}`. Un test échoue si un marqueur inconnu est utilisé.

### 9.4 Pièces du devis (sur l'engagement et la réservation)
Aucune table de devis. Chaque `Engagement` et chaque `Booking` peut porter ses pièces, **toutes facultatives** (un devis n'est jamais un prérequis) : `quote_reference` (texte, **unique** quand renseigné ; format recommandé `DEV-AAAA-NNN`), `quote_file` (PDF envoyé, privé), `agreement_file` (e-mail d'accord : `.eml`, PDF, image ou texte, privé), `agreement_date`, `cgv_version`, `source_note` (texte libre : « accord oral », « reconduction à l'identique »…). Ces pièces n'existent qu'après la confirmation du client ; quand elles existent, elles sont conservées 10 ans.

**Registre des numéros émis** — **`IssuedQuote`** (B04b, B04c) : `reference` (unique, `DEV-AAAA-NNN`), `service` ("batch", "chef", "cours"), `issued_at`, `issued_by`, `status` ("reserved", "created", "failed"), `google_doc_id` et `google_doc_url` (vides tant que B04c n'est pas livrée). **Aucun champ d'identité** : ni nom, ni e-mail, ni téléphone, ni montant — ce registre sert uniquement à ne jamais réattribuer un numéro, pas à suivre une affaire (c'est le rôle de HubSpot). Un test vérifie l'absence de ces champs.

### 9.5 `clients`
- **`Client`** : `hubspot_contact_id` (unique, sert au lien vers la fiche HubSpot), `first_name`, `last_name`, `email` (unique, en minuscules, identifiant du client et adresse d'envoi), `status` ("active", "inactive", "archived"), `urssaf_account_ready` (booléen) et `urssaf_account_checked_at`, `marketing_consent` (booléen + date), `notes_internal` (texte libre réservé à l'équipe, **jamais d'allergie ni de donnée de santé**), `anonymized_at`. **Pas** de téléphone, d'adresse, de taille de foyer ni de profil alimentaire : HubSpot fait foi pour l'identité et la santé.
- Pas de journal des échanges : seulement le lien vers HubSpot.

### 9.6 `engagements`
- **`Engagement`** (batch cooking) : `client`, `pack`, `formula` ("week", "month", "custom"), `dinners_per_session` (3, 4, 5 ou libre en custom), `sessions_total` (1 pour une semaine, 4 pour un mois, saisi pour le sur mesure), `servings` (**portions par passage**, défaut 4, remplace la taille du foyer), `menu_mode` ("chef" par défaut : la cheffe propose ; "client" : réservé à un futur espace client, inutilisé aujourd'hui), `start_date`, `status` ("upcoming", "active", "completed", "cancelled"), `session_price_cents` (avant crédit, **prérempli depuis la grille**, modifiable à la création, figé ensuite), `offer` (l'offre commerciale qui a vendu l'engagement, facultative), `price_override_reason` (obligatoire si le prix diffère de la grille **et ne vient pas d'une offre**), `tax_credit_rate_bp` (taux figé à la création), les pièces du devis (9.4), `window_end_date` (date limite pour réaliser tous les passages : 6 semaines après le premier pour une formule mensuelle, **proportionnelle à la durée pour un sur mesure**, modifiable).
- **`Session`** (un passage) : `engagement`, `sequence` (1..N), `scheduled_at` (date et heure, peut être vide tant que non planifié), `status` ("planned", "done", "postponed", "cancelled_free", "cancelled_billable"), `done_at`, `billable` (booléen), `price_cents` (copié de l'engagement ; modifiable par la cheffe pour un sur mesure, avec motif), `notes_internal`.
- **`Booking`** (chef privé et cours) : `client`, `service` ("chef", "cours"), `event_date`, `guest_count`, `menu_notes`, les pièces du devis (9.4), `offer` (facultative), `total_cents` (saisi), `deposit_cents` (30 % pour le chef privé), `status` ("confirmed", "deposit_pending", "deposit_paid", "done", "cancelled_free", "cancelled_deposit_kept"), `cancellation_policy` (texte repris du devis, saisi).

### 9.7 `planning`
- **`MealPlan`** : `session` (1-1), `status` ("draft" brouillon, "proposed" proposition prête, "sent" envoyée au client, "validated" validée, "prepared" liste produite, "revision" à revoir), `opens_at`, `deadline_at`, `quota` (nombre de recettes à choisir, copié de l'engagement), `servings_per_recipe` (par défaut `Engagement.servings`), `proposal_sent_at`, `validated_at`, `validation_source` ("link" par le lien de choix, "email" accord par e-mail, "staff" validée par la cheffe faute de réponse), `validation_proof` (fichier facultatif : l'e-mail d'accord), `revision_number` (1, 2, 3… à chaque renvoi), `choice_token` (haché) et `token_expires_at`, `reviewed_at` et `reviewed_by` (la cheffe marque le menu « relu » après avoir contrôlé les allergies avec la note HubSpot).
- **`MealChoice`** : `meal_plan`, `recipe`, `servings`, `note`, `chosen_by` ("client", "staff", "default"), `created_at`.
- **`ShoppingList`** : `meal_plan`, `generated_at`, `lines` (JSON : ingrédient, quantité, unité, rayon), `pdf_file`, `sent_to_client_at`, `sent_to_chef_at`, `grocery_mode` ("chef_buys", "client_buys").
- **`GroceryReceipt`** (si la cheffe fait les courses, facturées au coût réel) : `session`, `file`, `amount_cents`, `note`.

### 9.8 `billing`
- **`InvoiceRecord`** : `session` ou `booking` (un seul des deux), `provider` ("manual", puis l'outil retenu), `external_id`, `number` (numéro attribué par l'outil), `amount_cents`, `credit_amount_cents`, `client_share_cents`, `status` ("to_issue", "issued", "paid", "overdue", "cancelled"), `pdf_url`, `issued_at`, `quote_reference`. `due_date` (échéance, base des relances d'impayé).
- **`UrssafPaymentRequest`** : `invoice_record`, `status` ("to_send", "sent", "client_validated", "paid", "rejected", "expired"), `sent_at`, `validated_at`, `paid_at`, `external_reference`, `error_message`. Le détail du flux dépend de l'outil.
- Interface `InvoicingProvider` : `issue_invoice(record)`, `send_urssaf_request(record)`, `get_status(record)`. Première implémentation **`ManualProvider`** : la cheffe saisit le numéro et le statut dans l'administration ; un écran liste les « factures à émettre » (passages réalisés sans facture).

### 9.9 `payments`
- **`Payment`** : `stripe_payment_intent_id`, `stripe_checkout_session_id`, `purpose` ("gift_card", "booking_deposit", "client_share"), `amount_cents`, `status` ("pending", "succeeded", "failed", "refunded", "partially_refunded"), `client` (optionnel), `booking` / `gift_card_order` / `invoice_record` (optionnels), `raw_event_ids`.
- **`WebhookEvent`** : `provider`, `event_id` (unique), `type`, `received_at`, `processed_at`, `status`, `payload` (JSON), `error`. Sert à l'idempotence.

### 9.10 `giftcards`
- **`GiftCardOrder`** : `buyer_name`, `buyer_email`, `recipient_name`, `recipient_email`, `message`, `amount_cents`, `send_at` (date d'envoi), `status` ("pending_payment", "paid", "issued", "refunded"), `payment`.
- **`GiftCard`** : `code` (unique, voir B17), `initial_cents`, `balance_cents`, `valid_until` (12 mois après l'achat), `status` ("active", "used", "expired", "refunded", "blocked"), `order`, `scope` ("any", ou un service), `issued_at`, `delivered_at`.
- **`GiftCardTransaction`** : `gift_card`, `type` ("issue", "redeem", "refund", "expire", "adjust"), `amount_cents` (signé), `balance_after_cents`, `related_object` (réf. vers devis/engagement/réservation), `actor`, `created_at`.
- **`GiftCardRedeemAttempt`** : `code_tried` (haché), `ip`, `success`, `created_at` (pour limiter les essais).

### 9.11 `reviews`, `notifications`, `core`, `integrations`
- **`ReviewRequest`** : `client`, `session` ou `booking`, `status` ("to_send", "sent", "received", "approved", "rejected"), `rating` (optionnel), `text`, `consent_publish` (booléen), `published_review` (FK `Review`).
- **`DataRequest`** (demande RGPD reçue par e-mail ou par téléphone, saisie par la cheffe) : `client`, `kind` ("export", "deletion"), `status` ("pending", "done", "refused"), `received_at`, `due_at` (réception + 30 jours), `handled_at`, `handled_by`.
- **`EmailTemplate`** : `key`, `subject`, `body_html`, `body_text`, modifiable en administration. **`EmailLog`** : destinataire, gabarit, statut, identifiant du fournisseur, objet lié (sans corps du message).
- **`HubSpotSettings`** (singleton, **éditable en administration**, livré par B02) : `pipeline_id`, `stage_quote_sent_id`, `stage_file_created_id`, `view_deals_without_quote_url`, `view_quotes_no_reply_url`, `view_won_without_file_url`. Champs vides au départ, bandeau tant qu'ils le sont ; un déplacement d'étape sans identifiant configuré échoue au lieu d'écrire au hasard. **Aucun identifiant de deal ni de contact n'y est stocké** (interdit 1).
- **`AuditEvent`** : `actor`, `action`, `object_type`, `object_id`, `changes` (JSON), `ip`, `created_at`. **`PublishRun`** : `triggered_by`, `status` ("queued", "running", "success", "failed"), `github_run_url`, `started_at`, `finished_at`.

### 9.12 `staffdesk` (suivi et relances)
- **`FollowUp`** : une ligne par situation à suivre (liste en 2.7). `kind`, `target` (objet concerné : passage, plan de repas, facture, réservation, demande URSSAF, carte, avis, demande de données…), `client` (optionnel), `owner` ("client_email", "staff"), `status` ("scheduled" à venir, "due" à traiter, "waiting" en attente du client, "done", "cancelled"), `due_at`, `deadline_at` (au-delà : « en retard »), `next_send_at`, `attempts`, `max_attempts`, `last_sent_at`, `snoozed_until`, `resolved_at`, `resolution` ("auto" situation résolue, "manual", "expired"), `note`. Unicité `(kind, target)`.
- **`FollowUpRule`** : une ligne par type de relance, modifiable en tableau dans l'administration : `kind`, `is_active`, `delay`, `max_attempts`, `email_template`, `family` ("client" ou "staff"). Les e-mails **du service** (proposition de menu, liste d'ingrédients, lien d'acompte, envoi d'une carte cadeau à son destinataire) n'y figurent pas : les couper casserait la prestation. Le **rappel d'expiration** d'une carte, lui, est bien une relance réglable.
- **`FollowUpSettings`** (singleton, administration) : **suspension globale** des envois automatiques (bandeau permanent tant qu'elle est active), plage et fréquence d'envoi (règles en 2.7), **résumé quotidien** (actif, heure d'envoi, week-end ou non, adresse de destination), **interrupteur des alertes immédiates** (les adresses des vues HubSpot sont dans `HubSpotSettings`, 9.11).
- **`Client.automatic_emails_enabled`** : permet de suspendre tous les envois automatiques à un client donné (il demande à n'être contacté que par téléphone, par exemple).

### 9.13 `loyalty` (points de fidélité)
- **`LoyaltyAccount`** : un compte par client (1-1). `client`, `balance_points`, `lifetime_points` (cumul historique, jamais décrémenté), `is_active`.
- **`LoyaltyTransaction`** : `account`, `type` ("earn" acquis sur un passage, "grant" accordé à la main, "convert" converti en carte cadeau, "expire", "adjust"), `points` (signé), `balance_after`, `session` (le passage qui l'a généré, pour les acquisitions), `gift_card` (la carte émise, pour les conversions), `reason` (obligatoire pour "grant" et "adjust"), `actor`, `created_at`. Unicité `(type, session)` pour les acquisitions : **un passage ne crédite jamais deux fois**.
- **`LoyaltySettings`** (singleton, administration) : `is_active` (le programme entier peut être éteint), `points_per_session`, `conversion_points` et `conversion_cents` (le barème : combien de points pour combien d'euros), `min_conversion_points`, `expiry_months` (péremption après inactivité), `email_on_threshold` (prévenir le client quand son solde devient convertible).
- **Pas de table de parrainage** : un parrainage se récompense par une transaction "grant" avec son motif. Automatiser le parrainage serait une autre PR, et rien ne dit qu'elle sera utile.

## 10. API et contrat avec le site Next.js

**Principe** : le site lit Django **au moment de la construction**, jamais au chargement d'une page. L'API de lecture est versionnée (`/api/v1/`), authentifiée par `BUILD_API_TOKEN`, et ne renvoie que le contenu **publié**.

### 10.1 Routes de lecture (pour la construction du site)
Toutes les clés en camelCase, identiques aux schémas Zod existants ; une collection par route, sans pagination pour moins de 500 éléments, avec `updatedAt` par objet et ETag.
- `GET /api/v1/content/projects` : liste (forme de `projectSchema`, avec `slug`, `modified`).
- `GET /api/v1/content/inspirations`, `/reviews`, `/zones` (zones + communes), `/faq` (sections et entrées, par `placement`), `/legal-pages` et `/legal-pages/{slug}`, `/site-settings`.
- `GET /api/v1/content/recipes` : fiches **publiques**, sans quantités, avec `allergens` calculés (forme de `Recipe` de `lib/recipes.ts`).
- `GET /api/v1/pricing` : packs, grille de prix, taux de crédit d'impôt, prix chef privé et cours (forme de `PACKS`, `PRICES`, `TAX_CREDIT`).
- `GET /api/v1/content/page-texts` : le **calque des blocs vendeurs** (B06b), de la même forme que `messages/fr.json`, limité aux clés éditées et publiées.
- `GET /api/v1/content/manifest` : `lastModified` par collection (utile au sitemap et au cache de construction).
- Les URL d'images sont **absolues** et servies par un CDN ou le stockage public.
- Le contenu Markdown (FAQ, pages) est renvoyé avec les marqueurs de prix déjà remplacés (voir 9.3).

### 10.2 Routes serveur à serveur (appelées par le site)
- `POST /api/v1/giftcards/checkout` : crée la commande et la session Stripe. Entrée : montant, acheteur, destinataire, message, date d'envoi, jeton Turnstile. Sortie : URL de paiement. Limité en débit.
- (Aucune route pour les demandes du site : elles vont directement dans HubSpot.)

### 10.2b Page de choix du menu (servie par Django)
La page de choix **n'est pas une API** : c'est une page publique servie par Django, atteinte par un lien signé (`GET /menu/<jeton>` affiche le menu, `POST /menu/<jeton>` le valide). Elle est entièrement décrite en **B14** ; l'accès et le jeton en section 8.

### 10.2c Pas d'API pour l'administration

La cheffe utilise l'**administration Django** (session et 2FA) ; il n'y a donc **aucune API d'administration** à construire ni à exposer. Ces quatre pages appellent des **vues internes** de Django (formulaires, fragments HTMX, téléchargement des pièces) et le **flux iCal** (adresse secrète, lecture seule) sous le préfixe `ADMIN_URL_PREFIX`, protégées par la session, le CSRF et les permissions. Les actions sensibles (annulation facturable, ajustement d'une carte cadeau, remboursement, prix différent de la grille, changement d'e-mail) exigent un **motif** et sont journalisées dans `AuditEvent`.

### 10.3 Webhooks entrants
- `POST /webhooks/stripe` : signature vérifiée, idempotence par `WebhookEvent`.
- `POST /webhooks/invoicing` : défini quand l'outil est choisi.

### 10.4 Sortants
- **GitHub** : `POST /repos/{owner}/{repo}/dispatches` (type `content-updated`) pour déclencher le déploiement du site, avec un jeton limité à ce dépôt.
- **HubSpot**, **Stripe**, **Brevo** : voir B11, B16 et B02.

### 10.5 Changements attendus côté site
Remplacer la lecture de `content/`, des FAQ, avis, zones, recettes et prix par des appels à l'API au moment de la construction ; garder Zod pour valider les réponses ; ajouter le workflow GitHub Actions qui répond à `repository_dispatch`.

## 11. Environnements, configuration et exigences transversales

### 11.1 Configuration (variables d'environnement)

`DJANGO_SECRET_KEY`, `DJANGO_ALLOWED_HOSTS`, `DATABASE_URL`, `STORAGE_*` (bucket, clés, URL publique), `BUILD_API_TOKEN`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `HUBSPOT_PRIVATE_APP_TOKEN`, `BREVO_API_KEY`, `EMAIL_FROM`, `GITHUB_DISPATCH_TOKEN`, `GITHUB_REPO`, `TURNSTILE_SECRET_KEY`, `SENTRY_DSN`, `SITE_BASE_URL`, `MENU_BASE_URL`, `ADMIN_URL_PREFIX`, `HUBSPOT_PORTAL_ID` (pour construire le lien vers la fiche), `ICAL_FEED_TOKEN` (adresse secrète du flux iCal), `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`, `GOOGLE_OAUTH_REFRESH_TOKEN` (génération des devis ; les identifiants du dossier et des modèles sont en base, pas ici). Fournir `.env.example` sans valeur secrète.

### 11.2 Environnements et domaines
- **local** : Docker, base locale, e-mails écrits dans la console, Stripe en mode test, HubSpot et GitHub remplacés par des clients factices.
- **test** (préproduction) : site sur `test.tabletribu.com`. **Backend : domaine à confirmer** ; hypothèse de travail `api.test.tabletribu.com`. Stripe en mode test, base de test séparée, e-mails **uniquement vers une liste d'adresses autorisées**, aucune donnée réelle de client, publication vers le site de test.
- **production** : site sur `tabletribu.com`. **Backend : domaine à confirmer** ; hypothèse de travail `api.tabletribu.com`. Administration sous un préfixe non évident (`ADMIN_URL_PREFIX`).
- Chaque environnement a ses propres secrets, sa base et son stockage. Aucune donnée réelle de client en local ni en test.
- La page de choix du menu est servie par Django (`MENU_BASE_URL`, par exemple `api.tabletribu.com/menu/...`) et son adresse figure dans les e-mails envoyés au client.

### 11.3 Exigences non fonctionnelles

- **Performance** : page de choix du menu < 300 ms côté serveur ; API de construction avec ETag ; pas de requêtes N+1 (tests `assertNumQueries`).
- **Fiabilité** : tâches rejouables et idempotentes ; reprises exponentielles ; aucune perte de webhook (journal).
- **Sécurité** : sections 7.4, 7.5 et 8, et B19 ; dépendances à jour (Dependabot) ; secrets en variables d'environnement.
- **Sauvegardes** : base chiffrée, quotidienne, rétention 30 jours, test de restauration documenté.
- **Hébergement** : non spécifié ; le backend doit tourner en conteneur (Dockerfile + compose pour dev).
- **Couverture de tests** : ≥ 85 % sur `engagements`, `planning`, `giftcards`, `payments`, `clients` — un **plancher**, pas un objectif ; la doctrine (quoi tester, à quel niveau, ce qu'on ne simule jamais) est dans le skill `tests` livré par B00b ; tests de bout en bout pour les flux B11 (page A-Dossier), B13 (plans de repas) et B17 (cartes cadeaux).

### 11.4 Données de démonstration et tests

- Fixtures de développement : 1 compte d'équipe, 3 clients, 5 recettes avec ingrédients et quantités, 1 pack de chaque, 1 engagement par formule, passages à différents états, 1 carte cadeau active et 1 expirée.
- Tests de non-régression des interdits de la section 7.4.

# Partie IV — Annexe


## 12. Glossaire

### 12.1 Termes du métier
- **Engagement** : contrat d'un client pour une formule de batch cooking (1 semaine, 1 mois de 4 passages, ou sur mesure).
- **Passage** (`Session`) : visite de la cheffe chez le client pour préparer les dîners.
- **Réservation** (`Booking`) : chef privé ou cours (hors packs).
- **Plan de repas** (`MealPlan`) : le menu d'un passage, de la proposition de la cheffe jusqu'à la validation du client.
- **Lien de choix** : adresse à usage unique, envoyée par e-mail, qui ouvre la page où le client ajuste et valide le menu d'un passage, sans compte ni mot de passe.
- **Avance immédiate URSSAF** : dispositif où l'URSSAF règle la part de crédit d'impôt (50 %) après validation du client sous 48 h.
- **Référence de devis** : identifiant unique (`DEV-AAAA-NNN`) attribué par la page A-Devis, inscrit dans le document généré et refusé en double par Django, distinct de la numérotation continue des factures.
- **Pages « A-… »** : les quatre écrans de l'administration **construits sur mesure**, par opposition aux listes et formulaires que Django génère tout seul. **A-Dossier** : créer un client et un engagement à partir d'un devis accepté. **A-Suivi** : le tableau « à faire », page d'accueil. **A-Publier** : mettre le site en ligne. **A-Devis** : calculer un devis et le générer dans Google Docs. Ce sont les étiquettes de ce document, pas les titres affichés à l'écran.
- **Point de fidélité** : unité gagnée à chaque passage réalisé, convertible en **carte cadeau** selon un barème réglable. Les points ne sont pas une monnaie : ils n'ont pas d'autre usage que cette conversion, et ils expirent après une période sans passage.
- **Relance** : situation suivie dans le registre de Django (`FollowUp`) ; elle a un propriétaire (HubSpot, Django ou vous), un statut (*à venir*, *à traiter*, *en attente du client*, *en retard*, *résolu*, *annulé*) et se clôt seule quand la situation est résolue.
- **Offre commerciale** (`Offer`) : un nom, un paragraphe de devis et, parfois, une remise, posés par-dessus un service existant pour le vendre à un moment de vie précis — *Post-partum*, *Senior*, *Anniversaire*, *Renouvellement*. Créée par la cheffe dans l'administration, attachée à l'engagement qu'elle a vendu, et sans aucun effet sur l'exécution de la prestation.
- **Marqueur de prix** : texte comme `{{price.batch_from_after_credit}}` remplacé par l'API avec le prix réel, pour éviter des chiffres périmés dans la FAQ et les pages.
### 12.2 Sigles et termes techniques
Par ordre alphabétique. Les termes de cette liste sont employés tels quels dans le reste du document.

- **API** (*interface de programmation*) : porte d'entrée par laquelle deux logiciels se parlent sans intervention humaine. Ici, celle par laquelle le site lit les contenus de Django.
- **BFF** (*Backend For Frontend*) : principe selon lequel le serveur du site appelle l'API à la place du navigateur, qui ne parle jamais directement à Django. Il ne subsiste que pour la page d'achat de carte cadeau (S03), seule page dynamique du site.
- **CGV** : conditions générales de vente, publiées sur le site et **versionnées** — la version acceptée est recopiée dans chaque engagement.
- **CMS** (*Content Management System*, système de gestion de contenu) : la partie de l'administration où la cheffe modifie elle-même le contenu du site — réalisations, avis, FAQ, pages légales — sans développeur. Ce n'est pas un logiciel séparé : c'est l'administration Django (B03).
- **Construction du site** (*build*) : l'opération qui transforme les contenus en pages figées. Elle lit Django **une fois**, au moment de la publication ; aucune page ne l'interroge ensuite quand un visiteur la consulte.
- **CRM** (*Customer Relationship Management*, gestion de la relation client) : l'outil qui garde les contacts, les échanges, les devis envoyés et les tâches de relance. Ici **HubSpot**, dans son offre gratuite.
- **Double authentification** (*2FA*, par *TOTP*) : en plus du mot de passe, un code à six chiffres qui change toutes les trente secondes, lu dans une application sur votre téléphone. Obligatoire en production.
- **Intégration continue** (*CI*) : les vérifications automatiques qui s'exécutent à chaque proposition de modification du code — tests, sécurité, migrations. Une PR dont l'intégration continue échoue n'est pas fusionnée.
- **LTS** (*Long Term Support*, support à long terme) : version de Django maintenue plusieurs années, choisie pour éviter une mise à jour majeure tous les six mois.
- **PR** (*Pull Request*, proposition de modification) : un lot de code cohérent, confié seul à Claude, relu puis fusionné. C'est l'unité de livraison de ce document : les PR du backend sont préfixées **B**, celles du site **S**.
- **Webhook** : appel que nous recevons d'un prestataire quand un événement survient chez lui — par exemple Stripe nous prévenant qu'un paiement a abouti. L'inverse d'une API que nous interrogeons.
