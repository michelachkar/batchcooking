# Table et Tribu : plateforme Django et site — document unique

> **Ce document est la seule référence du projet.** Il décrit le métier (Partie I, validée), puis **ce qu'il faut préparer** (chapitre 2), **le plan de livraison et les Pull Requests à confier une par une à Claude** (chapitre 3), l'architecture et les données : chaque PR contient ses fonctionnalités détaillées, ses règles métier (décisions déjà prises) et ses critères de contrôle. Les mentions « **[À VÉRIFIER]** » signalent un fait externe (tarif, loi, limite d'un outil) que personne ne doit supposer.

**Table des matières**

- **[Avant-propos](#avant-propos)**
  - [Utiliser ce document](#utiliser-ce-document)
    - [Deux dépôts](#deux-dépôts)
    - [Demande type à Claude (à copier pour chaque PR)](#demande-type-à-claude-à-copier-pour-chaque-pr)
    - [Consignes permanentes pour Claude](#consignes-permanentes-pour-claude)
    - [Règles de revue et conventions](#règles-de-revue-et-conventions)
- **[Partie I — Le métier](#partie-i--le-métier)**
  - [1. Activité, règles et process](#1-activité-règles-et-process)
    - [1.1 Activité](#11-activité)
    - [1.2 Principes retenus](#12-principes-retenus)
    - [1.3 Le process de bout en bout](#13-le-process-de-bout-en-bout)
    - [1.4 Les e-mails automatiques au client](#14-les-e-mails-automatiques-au-client)
    - [1.5 Votre routine du matin](#15-votre-routine-du-matin)
    - [1.6 Le tableau de bord, les vues et les filtres](#16-le-tableau-de-bord-les-vues-et-les-filtres)
    - [1.7 Les indicateurs d'affaires](#17-les-indicateurs-daffaires)
    - [1.8 Hors périmètre](#18-hors-périmètre)
    - [1.9 Fragilités à surveiller](#19-fragilités-à-surveiller)
    - [1.10 Les outils et ce qu'ils coûtent](#110-les-outils-et-ce-quils-coûtent)
- **[Partie II — Le plan de livraison](#partie-ii--le-plan-de-livraison)**
  - [2. Prérequis : comptes, décisions et réglages avant les PR](#2-prérequis--comptes-décisions-et-réglages-avant-les-pr)
    - [Au démarrage du projet](#au-démarrage-du-projet)
    - [Avant le palier 0 : les demandes du site arrivent par e-mail](#avant-le-palier-0--les-demandes-du-site-arrivent-par-e-mail)
    - [Avant le palier 1 : l'outil est en ligne](#avant-le-palier-1--loutil-est-en-ligne)
    - [Avant les paliers 2 à 4 : contenu, prospects, devis, publication](#avant-les-paliers-2-à-4--contenu-prospects-devis-publication)
    - [Avant les paliers 5 à 10 : dossiers, facturation, paiement](#avant-les-paliers-5-à-10--dossiers-facturation-paiement)
    - [Avant le palier 12 : la production](#avant-le-palier-12--la-production)
  - [3. Paliers et Pull Requests](#3-paliers-et-pull-requests)
    - [3.1 Plan de livraison par paliers](#31-plan-de-livraison-par-paliers)
    - [3.2 Pull Requests du backend (`chefmeemz-backend`)](#32-pull-requests-du-backend-chefmeemz-backend)
      - [B00. Squelette du projet et intégration continue](#b00-squelette-du-projet-et-intégration-continue)
      - [B00b. Skills de l'agent : Django, DRF, données sensibles et e-mails](#b00b-skills-de-lagent--django-drf-données-sensibles-et-e-mails)
      - [B01. Authentification de l'équipe, thème Unfold et journal d'audit](#b01-authentification-de-léquipe-thème-unfold-et-journal-daudit)
      - [B02. Infrastructure transversale : tâches, e-mails, fichiers, intégrations factices](#b02-infrastructure-transversale--tâches-e-mails-fichiers-intégrations-factices)
      - [B03. Contenu du site (CMS) : modèles et administration](#b03-contenu-du-site-cms--modèles-et-administration)
      - [B04. Tarifs, packs, offres commerciales et marqueurs de prix](#b04-tarifs-packs-offres-commerciales-et-marqueurs-de-prix)
      - [B05. CRM : contacts, deals et pipeline](#b05-crm--contacts-deals-et-pipeline)
      - [B06. Vue Pipeline et filtres](#b06-vue-pipeline-et-filtres)
      - [B07. Devis internes : éditeur, versions et PDF](#b07-devis-internes--éditeur-versions-et-pdf)
      - [B08. Lien d'acceptation du devis (facultatif)](#b08-lien-dacceptation-du-devis-facultatif)
      - [B09. API de lecture pour le site (construction)](#b09-api-de-lecture-pour-le-site-construction)
      - [B10. Import des contenus existants du site](#b10-import-des-contenus-existants-du-site)
      - [B11. Blocs vendeurs des pages dans le CMS](#b11-blocs-vendeurs-des-pages-dans-le-cms)
      - [B12. Déploiement de l'environnement de test](#b12-déploiement-de-lenvironnement-de-test)
      - [B13. Catalogue de recettes et ingrédients](#b13-catalogue-de-recettes-et-ingrédients)
      - [B14. Publication du site depuis l'administration](#b14-publication-du-site-depuis-ladministration)
      - [B15. Clients, engagements, passages et réservations](#b15-clients-engagements-passages-et-réservations)
      - [B16. Créer un client et un engagement depuis un deal gagné (page A-Dossier)](#b16-créer-un-client-et-un-engagement-depuis-un-deal-gagné-page-a-dossier)
      - [B17. Suivi : tableau de bord, vues, filtres et flux iCal](#b17-suivi--tableau-de-bord-vues-filtres-et-flux-ical)
      - [B18. Menus par passage : choix par le client, validation et listes d'ingrédients](#b18-menus-par-passage--choix-par-le-client-validation-et-listes-dingrédients)
      - [B19. Page de choix du menu (lien à usage unique)](#b19-page-de-choix-du-menu-lien-à-usage-unique)
      - [B20. Facturation par passage et suivi URSSAF (saisie manuelle)](#b20-facturation-par-passage-et-suivi-urssaf-saisie-manuelle)
      - [B21. Paiements Stripe : acompte du chef privé](#b21-paiements-stripe--acompte-du-chef-privé)
      - [B22. Avis des clients](#b22-avis-des-clients)
      - [B23. RGPD, conservation et exports](#b23-rgpd-conservation-et-exports)
      - [B24. Durcissement et préparation de la production](#b24-durcissement-et-préparation-de-la-production)
      - [B25. Déploiement de la production et retour arrière](#b25-déploiement-de-la-production-et-retour-arrière)
    - [3.3 Pull Requests du site (`chefmeemz`)](#33-pull-requests-du-site-chefmeemz)
      - [S00. Recevoir les demandes du site par e-mail](#s00-recevoir-les-demandes-du-site-par-e-mail)
      - [S00b. Skills de l'agent : Next.js, React, référencement et accessibilité](#s00b-skills-de-lagent--nextjs-react-référencement-et-accessibilité)
      - [S01. Envoyer les demandes du site vers l'administration](#s01-envoyer-les-demandes-du-site-vers-ladministration)
      - [S02. Lire le contenu depuis l'API au moment de la construction](#s02-lire-le-contenu-depuis-lapi-au-moment-de-la-construction)
      - [S03. Déclenchement de la publication et déploiement](#s03-déclenchement-de-la-publication-et-déploiement)
      - [S04. Site : durcissement](#s04-site--durcissement)
  - [4. Décisions ouvertes et points à vérifier](#4-décisions-ouvertes-et-points-à-vérifier)
    - [4.1 Décisions à prendre](#41-décisions-à-prendre)
    - [4.2 Points à vérifier](#42-points-à-vérifier)
  - [5. Checklist avant la mise en production](#5-checklist-avant-la-mise-en-production)
- **[Partie III — La technique](#partie-iii--la-technique)**
  - [6. Stack et conventions](#6-stack-et-conventions)
    - [6.1 Choix par défaut](#61-choix-par-défaut)
    - [6.2 Conventions de code](#62-conventions-de-code)
    - [6.3 Apps](#63-apps)
    - [6.4 Interdits (à tester)](#64-interdits-à-tester)
    - [6.5 Bonnes pratiques officielles de Django et DRF](#65-bonnes-pratiques-officielles-de-django-et-drf)
  - [7. Authentification et permissions](#7-authentification-et-permissions)
  - [8. Modèle de données](#8-modèle-de-données)
    - [8.1 `content` (CMS)](#81-content-cms)
    - [8.2 `catalog`](#82-catalog)
    - [8.3 `pricing`](#83-pricing)
    - [8.4 Pièces du devis (sur l'engagement et la réservation)](#84-pièces-du-devis-sur-lengagement-et-la-réservation)
    - [8.5 `crm` (contacts, deals, pipeline)](#85-crm-contacts-deals-pipeline)
    - [8.6 `clients`](#86-clients)
    - [8.7 `engagements`](#87-engagements)
    - [8.8 `planning`](#88-planning)
    - [8.9 `billing`](#89-billing)
    - [8.10 `payments`](#810-payments)
    - [8.11 `reviews`, `notifications`, `core`, `integrations`](#811-reviews-notifications-core-integrations)
    - [8.12 `staffdesk` (tableau de bord et relances aux clients)](#812-staffdesk-tableau-de-bord-et-relances-aux-clients)
  - [9. API et contrat avec le site Next.js](#9-api-et-contrat-avec-le-site-nextjs)
    - [9.1 Routes de lecture (pour la construction du site)](#91-routes-de-lecture-pour-la-construction-du-site)
    - [9.2 Routes serveur à serveur (appelées par le site)](#92-routes-serveur-à-serveur-appelées-par-le-site)
    - [9.3 Page de choix du menu (servie par Django)](#93-page-de-choix-du-menu-servie-par-django)
    - [9.4 Pas d'API pour l'administration](#94-pas-dapi-pour-ladministration)
    - [9.5 Webhooks entrants](#95-webhooks-entrants)
    - [9.6 Sortants](#96-sortants)
    - [9.7 Changements attendus côté site](#97-changements-attendus-côté-site)
  - [10. Environnements, configuration et exigences transversales](#10-environnements-configuration-et-exigences-transversales)
    - [10.1 Configuration (variables d'environnement)](#101-configuration-variables-denvironnement)
    - [10.2 Environnements et domaines](#102-environnements-et-domaines)
    - [10.3 Exigences non fonctionnelles](#103-exigences-non-fonctionnelles)
    - [10.4 Données de démonstration et tests](#104-données-de-démonstration-et-tests)
- **[Partie IV — Annexe](#partie-iv--annexe)**
  - [11. Glossaire](#11-glossaire)
    - [11.1 Termes du métier](#111-termes-du-métier)
    - [11.2 Sigles et termes techniques](#112-sigles-et-termes-techniques)

# Avant-propos

Comment lire ce document et comment confier une Pull Request à Claude.


## Utiliser ce document

### Deux dépôts
- **`chefmeemz-backend`** (Django, à créer ; PR préfixées **B**) : l'administration de la cheffe, la logique métier, l'API.
- **`chefmeemz`** (le site Next.js existant ; PR préfixées **S**) : le site public, entièrement statique.

### Demande type à Claude (à copier pour chaque PR)
> Implémente la PR **Bxx** décrite dans `docs/PROJECT.md`. **Commence par lister les skills de `.claude/skills/` et charge tous ceux qui concernent cette PR** — au minimum `django-drf` et `revue-projet`, plus `donnees-sensibles` dès qu'un client, un e-mail, un journal ou une intégration est touché, et `tests` avant d'écrire les tests. Lis ensuite la PR, les sections qu'elle cite, la section 6.4 (interdits) et `docs/DECISIONS.md`. Crée la branche indiquée, fais des commits atomiques, écris les tests demandés, puis ouvre la PR avec le gabarit du dépôt. **Reste dans le périmètre** : ne fais rien de ce qui figure dans « Hors périmètre ». Si une règle manque, applique le choix le plus simple et note-le dans `docs/DECISIONS.md`. Ne me demande pas de valider un détail mineur ; arrête-toi seulement s'il manque un secret, un compte ou une décision marquée **BLOQUANT**.

Pour une PR du site, remplacez `Bxx` par `Sxx`, travaillez dans `chefmeemz`, chargez les skills du site (`nextjs` et `react` toujours, `seo` et `accessibilite` dès qu'une page change) et lisez d'abord `AGENTS.md` et la documentation de `node_modules/next/dist/docs/` (cette version de Next.js a des changements incompatibles : `middleware.ts` s'appelle `proxy.ts`). Claude doit avoir accès aux **deux dépôts** côte à côte.

**Deux exceptions, et une seule fois chacune** : B00b et S00b *créent* les skills, elles ne peuvent pas les charger. Pour ces deux PR, la demande type s'applique sans la première phrase, et la lecture de la section 6.5 (bonnes pratiques) remplace celle des skills — c'est d'ailleurs la matière qu'elles ont à transformer en skills.

### Consignes permanentes pour Claude
1. **Ne rien inventer** : si une règle manque, choisir le plus simple, le noter dans `docs/DECISIONS.md` avec la date, et continuer.
2. **Lire avant d'écrire** dans le site : `lib/content/schemas.ts`, `lib/recipes.ts`, `lib/lead/pricing.ts`, `lib/zones.ts`, `lib/site.ts`, `messages/fr.json`, `content/**/*.mdx`.
3. **Les skills du dépôt font foi** (`.claude/skills/`, livrés par B00b et S00b) : ils se chargent tout seuls et portent la liste de contrôle opérationnelle. Ce document garde les principes et les décisions ; le skill garde la règle d'écriture.
4. Texte visible en **français** ; code, modèles et champs en **anglais**.
5. **Ce que toute PR livre, en plus de ses fonctionnalités** : les tests nommés dans ses « Critères » ; une **implémentation factice** pour chaque intégration externe qu'elle introduit ; les migrations correspondantes ; et la mise à jour de `README.md`, `docs/DECISIONS.md` et `docs/API.md` (généré par `drf-spectacular`). Ces livrables ne sont plus répétés PR par PR.
6. **Flexibilité d'abord** (1.2) : ne jamais placer un élément de confort sur le chemin critique ; tout calcul est une suggestion modifiable (avec trace) ; toute intégration a un mode dégradé ; tout automatisme se désactive.

### Règles de revue et conventions
- **CI verte**, description de PR conforme au gabarit (contexte métier, changements, comment tester, risques, captures de l'administration), migrations lisibles et réversibles, aucun secret.
- **Interdits** (6.4) toujours testés. La liste de contrôle de la revue est le skill **`revue-projet`**, pas cette section : elle n'est écrite qu'une fois, là où elle se charge au moment d'écrire comme au moment de relire. La section 6.5 garde les principes et les sources officielles.
- Deux vérifications que la revue garde en propre, parce qu'elles portent sur la PR entière et non sur une ligne de code : **aucun nouvel avertissement à `check --deploy`** (la CI de B00 l'exécute, la revue constate qu'on ne l'a pas contournée), et la question qui prime sur toutes les autres — **cette PR enregistre-t-elle quelque chose qu'elle ne devrait pas ?**
- **Pas de fonctionnalité hors périmètre** ; tout écart est justifié. Vous testez **dans l'administration** ce que la PR annonce (« Vous contrôlez »), pas seulement les tests automatiques.
- **Branches** `feat/bxx-nom-court`, commits atomiques, fusion en un seul commit (*squash*) après votre accord. **Fini** = critères remplis, tests verts, documentation à jour, bandeau d'environnement visible.

# Partie I — Le métier

Ce que fait l'entreprise, comment elle vend, comment elle sert. **Une lectrice ou un lecteur non technique peut s'arrêter à la fin de la partie II.**


## 1. Activité, règles et process

### 1.1 Activité
**Table et Tribu**, cheffe à domicile à Montpellier et alentours, trois services : **batch cooking** (3 à 5 dîners par semaine préparés chez le client en un passage ; packs *Essentiel*, *Signature*, *Sur mesure*), **chef privé** (dîner pour des convives, prix à la personne, acompte de 30 %), **cours de cuisine** (à domicile, prix à la personne). Le site Next.js 16 est statique sur Cloudflare (dépôt `chefmeemz`) ; son contenu est aujourd'hui dans des fichiers (`content/`, `messages/fr.json`, `lib/*.ts`). Utilisateurs : la cheffe (un compte au départ), ses clients (qui valident leur menu par un lien reçu par e-mail, sans compte), les visiteurs (qui demandent un devis), le système de build du site.

### 1.2 Principes retenus
**Qui détient quoi**
- **Django (CRM et exécution)** : tout le suivi commercial et l'exécution, **une seule fiche par personne**. Les **prospects** : contact (identité, téléphone, adresse, notes), deal et pipeline, **devis rattachés au deal**, historique des étapes. Puis, une fois le deal gagné, le **client** : engagements (avec **portions par passage**), passages, plans de repas, listes d'ingrédients, pièces du devis, suivi de facturation. Vos échanges (e-mails, appels) restent dans votre messagerie : Django garde seulement vos **notes** par contact et par deal, et ne lit jamais votre boîte.
- **Données personnelles et durée** : un prospect perdu ou resté sans suite n'est pas conservé indéfiniment (règle de conservation, B23).
- **Identité** : la fiche du contact fait foi, **une seule modification** à faire (y compris un changement d'e-mail, qui change l'adresse d'envoi) ; le client ne modifie pas son identité.
- **Allergies et régimes** : **jamais dans Django** (ni champ, ni note). Vous les recueillez au téléphone pendant la qualification, avec le consentement explicite de la personne, et vous les gardez **hors de l'outil**, dans votre propre support privé (carnet ou note protégée). Les recettes affichent leurs allergènes ; le client choisit sous sa responsabilité et le confirme à chaque validation ; vous relisez chaque menu avec votre note. Un filtre automatique pourra venir plus tard (PR dédiée).
- **Outil de facturation** : factures, avoirs, attestation fiscale. **Stripe** : paiements (acompte du chef privé).

**Philosophie : flexible, jamais sur le chemin critique**
- **Tout est facultatif, sauf ce que la loi ou la sécurité exigent.** Un devis, un lien d'acceptation, une pièce jointe, un motif (hors remise et deal perdu) ne sont jamais des prérequis pour avancer.
- **Le chemin critique reste court** : demande → deal → dossier → passages → menu → réalisé → facturé. Tout ce qui est confort (éditeur de devis, lien d'acceptation, envoi automatique du lien de choix, relances, flux iCal) peut être désactivé ou tomber en panne sans bloquer ce chemin.
- **Tout se corrige à la main** (étape, statut, date, prix, dossier), avec une trace. Le système propose et calcule ; il n'impose jamais : un calcul est une suggestion que vous pouvez modifier.
- **Les automatismes sont des options**, désactivables globalement, par type ou par client. **Une intégration externe n'est jamais bloquante** : en cas de panne, un mode dégradé permet de continuer à la main.

**Architecture**
- **Administration et gestion du contenu = administration Django (thème Unfold)** avec 3 pages sur mesure : **A-Dossier** (créer un client et un engagement), **A-Publier** (mettre le site en ligne), **A-Devis** (créer, modifier et finaliser un devis). Pas d'API d'administration.
- **Next.js porte** : le site public, **entièrement statique**. Le site lit Django **au moment de sa construction** ; aucune page publique n'appelle Django à l'exécution. **Il n'y a pas d'espace client avec comptes** : le client valide son menu depuis une **page de choix servie par Django**, atteinte par un lien à usage unique reçu par e-mail.
- **Menus par passage** : le client choisit **lui-même** ses recettes depuis un **lien de choix** reçu par e-mail (liste de recettes prédéfinie qu'il garde ou modifie, date limite par défaut 2 jours avant le passage) ; un **PDF unique** reprend ensuite le menu retenu et la liste d'ingrédients (B18).
- **Suivi par vues et filtres** : pas de page « à faire ». Une vue **Clients** (statut Actif / Inactif, passages créés sur passages prévus) et une vue **Semaines** (statut de chaque passage) portent des filtres ; un **tableau de bord** d'accueil compte ce qui demande votre attention et renvoie vers elles (B17). **Django n'envoie aucune notification à la cheffe.**
- **Calendrier** : les dates des passages sont dans Django (elles pilotent menus, rappels et facturation) ; un **flux iCal en lecture seule** les affiche dans Google Agenda. Pas de page calendrier.
- **Prix dynamiques** (administration, jamais dans le code) : grille de référence 39,50 € après crédit d'impôt pour 3 dîners au mois (la FAQ « 49,50 € » est obsolète) ; elle préremplit le prix d'un engagement, modifiable avec un motif.
- **Trois environnements** : local, test (`test.tabletribu.com`), production (`tabletribu.com`). **Outils gratuits d'abord** (liste et coûts : section 1.10). À décider : hébergement de Django, outil de facturation, informations légales (section 4).

**Règles métier**
- **Engagement** : 1 semaine (1 passage), 1 mois (4 passages) ou sur mesure. **Pas de reconduction automatique** : un renouvellement est un nouvel engagement (pack éventuellement différent) sur le même client ; **un devis n'est jamais un prérequis** pour créer un engagement, les pièces du devis sont facultatives ; la fin d'un engagement est signalée par le compteur « Engagements bientôt terminés ».
- **Facturation au passage réalisé**, jamais le mois d'avance ; prix figés dans l'engagement. Pas de pause, de résiliation ni de préavis ; **report ou annulation : la cheffe fixe elle-même ce qui est dû, aucune règle de montant automatique**. Changement de pack ou de formule en cours : non proposé (exception manuelle journalisée).
- **Chef privé et cours** : réservations sur devis, sans pack ; acompte de 30 % pour le chef privé. **Batch cooking** : avance immédiate URSSAF (le client valide sous 48 h, l'URSSAF règle 50 %).
- **Offres commerciales** : les prestations se vendent aussi par moment de vie (Post-partum, senior, anniversaire, renouvellement…). Une offre est un **habillage du devis** — un nom, un paragraphe, parfois une remise — par-dessus un service existant ; elle ne change ni les passages, ni les menus, ni la facturation. La cheffe les crée elle-même dans l'administration, et l'offre reste attachée à l'engagement vendu.
- **Numérotation** : le devis porte une **référence unique** (`DEV-AAAA-NNN`, attribuée à la première finalisation par l'éditeur de devis), refusée en double par Django ; les **factures** ont la numérotation continue de l'outil de facturation.

### 1.3 Le process de bout en bout

**Le cycle d'une semaine** (batch cooking ; le chef privé et les cours de cuisine n'en ont pas pour l'instant)

| Statut | Ce que ça veut dire | Ce qui le fait passer au suivant |
| --- | --- | --- |
| **À dater** | passage créé, sans date | vous saisissez la date |
| **Planifiée** | date fixée, le client n'a pas encore son lien | vous cliquez « Envoyer le lien de choix » |
| **Menu envoyé** | le client ajuste la liste prédéfinie | il valide, ou vous validez d'un clic à la date limite |
| **Menu prêt** | recettes validées | vous cuisinez et marquez le passage réalisé |
| **Réalisée** | passage fait | vous saisissez la facture |
| **Facturée** | facture émise | la facture est marquée payée |
| **Clôturée** | payée, tout est bon | — |

**Annulée** n'est pas une étape du cycle : c'est l'état d'un passage annulé (étape 12), hors cycle, qui ne compte plus dans les passages créés. Tout statut se corrige à la main, avec une trace.

**Les étapes du process**

| Étape | Ce que vous faites | Étape du pipeline |
| --- | --- | --- |
| **Phase A — Attirer** | || 
| **1. Faire vivre le site** | Quand un prix, une recette, une photo ou un texte change, vous le modifiez dans l'administration Django : le contenu, les prix et les recettes ne sont plus dans le code.<br>Puis vous ouvrez la **page A-Publier** et vous cliquez **Publier** : le site se reconstruit tout seul et affiche les changements quelques minutes plus tard.<br>Vous ne touchez à aucun fichier et vous n'appelez personne. | — |
| **2. Recevoir une demande** | **Rien à faire pour déclencher l'étape** : le visiteur remplit le formulaire du site, un **contact** et un **deal « Nouveau »** sont créés dans Django avec le détail de la demande. Le site vous envoie aussi, **à chaque demande, un e-mail avec son contenu complet** (filet de sécurité si Django est indisponible : vous créez alors le prospect à la main).<br>Votre geste : chaque jour, vous ouvrez la vue **Pipeline** et vous **rappelez vite** les demandes de la colonne Nouveau (filtre « À rappeler »). C'est l'étape dont le retard se paie directement en affaires perdues.<br>De temps en temps, vérifiez que l'e-mail du site vous arrive toujours. | **Nouveau**<br>&nbsp;&nbsp;↳ *Posée par* : **le site** (S01)<br>&nbsp;&nbsp;↳ *Déclencheur* : le visiteur envoie le formulaire |
| **3. Qualifier** | Vous appelez la personne et vous notez dans la **fiche du contact et du deal** tout ce que vous apprenez : zone, nombre de convives, budget, contraintes, compte URSSAF.<br>Les **allergies et les régimes** ne se notent **pas** dans l'outil : vous les consignez dans votre support privé, avec le consentement explicite de la personne ; pour un **sur mesure**, vous remplissez aussi le questionnaire à ce moment-là (sans les allergies).<br>Vous déplacez le deal à **Qualifié**. | **Qualifié**<br>&nbsp;&nbsp;↳ *Posée par* : **vous**<br>&nbsp;&nbsp;↳ *Déclencheur* : votre appel de qualification |
| **Phase B — Convertir** | || 
| **4. Établir le devis** | Depuis la fiche du deal, vous cliquez **« Faire un devis »** : l'éditeur **A-Devis** s'ouvre avec le service, le nom et la commune repris, et des lignes **proposées** par la grille.<br>Vous modifiez tout ce que vous voulez (lignes, textes, remise avec motif, totaux eux-mêmes avec un motif), vous relisez, puis vous cliquez **« Finaliser »** : le devis reçoit son numéro unique `DEV-AAAA-NNN` et son PDF, rattachés au deal. Une modification ultérieure crée une nouvelle version.<br>Un devis fait ailleurs s'**importe en PDF**. Le devis n'est jamais obligatoire pour la suite. | — |
| **5. Envoyer le devis** | Vous envoyez le PDF depuis votre messagerie (`contact@`), avec la phrase d'acceptation prévue (« En répondant "bon pour accord"… »). **Option** : vous ajoutez un **lien d'acceptation** (B08) que le client peut cliquer à la place de répondre.<br>Vous déplacez le deal à **Devis envoyé**.<br>Aucun rappel n'est posé : vous suivez vos devis chaque jour dans la vue Pipeline (filtre « Devis sans réponse », section 1.5). | **Devis envoyé**<br>&nbsp;&nbsp;↳ *Posée par* : **vous**<br>&nbsp;&nbsp;↳ *Déclencheur* : l'envoi du devis au client |
| **6. Obtenir l'accord** | Vous attendez le « bon pour accord » **par e-mail**, ou le clic sur le lien d'acceptation (signalé sur la fiche du deal) ; ni SMS, ni oral.<br>**C'est toujours vous qui passez le deal à Gagné**, le clic ne le fait pas à votre place :, puis vous ouvrez le dossier (étape 7).<br>Si le client refuse ou disparaît, vous passez le deal à **Perdu** avec un motif, à tout moment : un devis expiré n'est pas forcément un devis perdu, c'est votre jugement. | **1. Gagné**<br>&nbsp;&nbsp;↳ *Posée par* : **vous**<br>&nbsp;&nbsp;↳ *Déclencheur* : le « bon pour accord » reçu<br><br>**2. Perdu**<br>&nbsp;&nbsp;↳ *Posée par* : **vous**<br>&nbsp;&nbsp;↳ *Déclencheur* : votre jugement, à tout moment — fin du cycle |
| **Phase C — Servir** | || 
| **7. Ouvrir le dossier** | Depuis le deal **Gagné**, vous cliquez **« Ouvrir le dossier »** : la **page A-Dossier**, **une seule page** avec quatre blocs :<br>(1) **le client** : prénom, nom, e-mail, téléphone et adresse viennent déjà du contact, vous les vérifiez ; pour un renouvellement, vous choisissez le client existant ;<br>(2) **la prestation vendue** : pack, formule, nombre de passages, portions, date de début, prix (prérempli depuis la grille, avec motif si vous le modifiez) ;<br>(3) **les pièces**, toutes facultatives et repliées : le devis du deal (déjà rattaché), l'e-mail d'accord ;<br>(4) **le récapitulatif**, qui se met à jour en direct, avec la case « envoyer l'e-mail de bienvenue ».<br>Vous cliquez **Créer**. Le client devient **Actif**, ses passages sont créés **À dater**, et le dossier est lié au deal. | — |
| **8. Planifier les passages** | Vous convenez les dates avec le client au téléphone.<br>Vous saisissez ensuite **toutes les dates d'un seul coup** avec l'aide à la saisie récurrente (« tous les mardis à 18 h pendant 4 semaines »), quitte à corriger une date après coup.<br>La vue Clients affiche **passages créés / passages du package** (2/4) : tant que ce n'est pas complet, le client reste dans le compteur « Clients à planifier » du tableau de bord.<br>**Avant le premier passage d'un client en batch cooking**, vous vérifiez son inscription à l'avance immédiate sur votre espace URSSAF et vous cochez « compte URSSAF prêt » (filtre « Compte URSSAF non prêt » de la vue Clients). | — |
| **9. Envoyer le lien de choix** | Sur la fiche d'un passage **Planifiée**, vous cliquez **« Envoyer le lien de choix »** : le système prépare une **liste de recettes prédéfinie** (qui évite les recettes des deux derniers passages), envoie l'e-mail au client, et le passage passe à **Menu envoyé**.<br>Vous pouvez aussi copier le lien (SMS, WhatsApp) ou en envoyer plusieurs d'un coup depuis la vue Semaines.<br>La **date limite** de choix est par défaut **2 jours avant le passage**, modifiable passage par passage.<br>**Option d'envoi automatique** (désactivée par défaut) : si vous l'activez, le lien part tout seul **7 jours avant chaque passage Planifiée**, avec la même liste prédéfinie. Vous gardez le contrôle : l'option se règle globalement ou client par client, et vous pouvez toujours envoyer un lien à la main avant. | — |
| **10. Faire choisir le menu** | **Rien** : le client ouvre son lien, voit la liste prédéfinie avec les allergènes, remplace les recettes qu'il ne veut pas et valide. Le passage passe à **Menu prêt**.<br>S'il n'a pas répondu à la date limite, vous **validez la liste prédéfinie d'un clic** (ou vous la retouchez avant).<br>S'il répond « d'accord » par e-mail plutôt que par le lien, vous cliquez « Validé par le client » et vous joignez son e-mail. | — |
| **11. Produire la liste d'ingrédients** | **Rien pour la liste** : elle se calcule seule, recette par recette, mise à l'échelle des portions, et part au client dans un PDF avec le menu retenu. Votre propre fiche de préparation est produite à part.<br>Votre **seul geste de sécurité, obligatoire** : vous relisez le menu validé avec **votre note d'allergies du client** (hors de l'outil), et vous le marquez **« relu »**.<br>Si un allergène pose problème, vous **rouvrez le menu** : le client rechoisit par un nouveau lien. | — |
| **12. Gérer un imprévu** | Le client vous prévient par e-mail ou par téléphone ; vous agissez dans l'administration.<br>**Reporter** : vous changez la date ; le statut, le lien et le menu déjà validé sont conservés.<br>**Annuler** : le passage passe à **Annulée** avec un motif ; il ne compte plus dans les passages créés, et vous pouvez le replanifier.<br>**Vous fixez vous-même ce qui est dû** : aucune règle de montant n'est appliquée automatiquement. Le client reçoit la confirmation par e-mail. | — |
| **13. Réaliser le passage** | Vous faites les courses et vous cuisinez chez le client avec votre fiche de préparation et la liste d'ingrédients.<br>Le soir même ou le lendemain, vous marquez le passage **Réalisée** dans l'administration. | — |
| **Phase D — Encaisser** | || 
| **14. Facturer le passage** | Le passage marqué **Réalisée** apparaît dans le compteur « Semaines à facturer » du tableau de bord.<br>Vous émettez la facture dans votre **outil de facturation**, puis vous saisissez son **numéro**, son statut et son échéance dans l'administration : le passage passe à **Facturée**. Django ne numérote jamais les factures lui-même. | — |
| **15. Être payée** | Quand le paiement est reçu, vous marquez la facture payée : le passage passe à **Clôturée**. Rien d'autre pour le moment.<br>Tant que ce n'est pas fait, le passage reste dans le compteur « Factures à suivre ».<br>En batch cooking, la demande d'avance immédiate URSSAF se suit dans l'écran de facturation (B20) ; elle ne change pas cette règle. | — |
| **16. Envoyer l'attestation fiscale** | **Rien** : l'outil de facturation l'envoie. En janvier, pensez à vérifier que c'est bien parti. | — |
| **Phase E — Fidéliser et piloter** | || 
| **17. Recueillir les avis** | La demande d'avis part seule après le dernier passage.<br>Quand un client répond, vous saisissez son avis dans l'administration, avec son autorisation de publier son prénom et son texte.<br>Vous le **validez**, et il paraît à la prochaine publication du site. | — |
| **18. Proposer un renouvellement** | Le compteur **« Engagements bientôt terminés »** du tableau de bord vous prévient **avant** la fin : dès que le dernier passage d'un engagement tombe dans les 10 jours et que le client n'a pas de suite. C'est le moment d'en parler, souvent chez le client lors de l'avant-dernier passage.<br>Depuis la vue Clients (filtre « Fin d'engagement proche »), vous voyez le client, la date de son dernier passage et l'**offre de renouvellement** disponible.<br>Vous avez deux actions sur sa fiche : **« Créer un deal de renouvellement »** (un deal « Nouveau » est créé sur son contact, sans ressaisie) ou **« Pas de renouvellement »** avec un motif court, qui le sort du compteur.<br>Un renouvellement repart pour un cycle de vente complet : devis, accord, **Gagné**, puis un nouvel engagement sur le même client à l'étape 7. Le client quitte le compteur dès que ce nouvel engagement est créé. | **Nouveau**<br>&nbsp;&nbsp;↳ *Posée par* : **le bouton « Créer un deal de renouvellement »** (B17), ou **vous**<br>&nbsp;&nbsp;↳ *Déclencheur* : votre décision de proposer la suite |
| **19. Ne rien oublier** | Chaque matin, vous suivez votre **routine** : vue Pipeline, puis tableau de bord, puis vues filtrées (section 1.5). **Ce sont les seules habitudes que le système vous demande de prendre** : la routine du matin et, une fois par mois, vos indicateurs (section 1.7). | — |
| **20. Garder l'œil ouvert** | **Rien tant que rien ne casse.** Sentry et UptimeRobot (outils externes, B24) vous préviennent en cas de panne ; Django ne vous envoie rien. | — |
| **Hébergement de l'administration** | Vous tranchez où héberger l'outil et qui peut l'atteindre (étape **M5**). Rien d'autre ne dépend de vous ici. | — |

**Chef privé et cours de cuisine** suivent les étapes 1 à 7 et 13 à 17, **sans** cycle de statuts de semaine ni lien de choix pour l'instant (étapes 8 à 11 : batch cooking seulement). Pour le chef privé, la réservation est **confirmée à la réception de l'acompte de 30 %** (lien Stripe envoyé à la main par e-mail, B21, aucune relance automatique). Des fonctions seront ajoutées plus tard.

**Une demande RGPD** (export ou suppression de données) se saisit dans l'administration (B23) : délai de 30 jours, échéance affichée dans la liste des demandes, sans notification.

### 1.4 Les e-mails automatiques au client

Django n'écrit **qu'à vos clients**, jamais à un prospect ni à vous. Chaque e-mail ci-dessous part tout seul, s'arrête tout seul, et se règle dans l'administration (B17).

**Règles communes**
- **Au plus une relance par client et par jour** (suivi du menu, rappel de passage, avis), jamais entre **21 h et 8 h**. Les e-mails **du service** (lien de choix, liste d'ingrédients, confirmations) ne sont pas concernés.
- **Une situation = une ligne** dans le registre `FollowUp` (section 8.12) : jamais deux e-mails pour la même situation, et la ligne se **clôt seule** dès que la situation est résolue.
- **Trois niveaux de coupure** : globale (frein d'urgence, avec bandeau permanent), par type d'e-mail, par client. Les e-mails **du service** (lien de choix, liste d'ingrédients) ne se coupent pas : les couper casserait la prestation.
- **Aucun doublon avec les outils externes** : l'URSSAF et l'outil de facturation envoient déjà leurs rappels de paiement.
- Les délais ci-dessous sont des **valeurs par défaut**, modifiables dans l'administration.

| E-mail | Quand il part | Quand il s'arrête | Étape | PR |
| --- | --- | --- | --- | --- |
| **E-mail de bienvenue / de nouvel engagement** | à la création du dossier, **si la case est cochée** | — (un seul envoi) | 7 | B16 |
| **Lien de choix du menu** (e-mail du service) | quand vous cliquez « Envoyer le lien de choix », ou **7 jours avant le passage si l'envoi automatique est activé** | — (un seul envoi ; un nouvel envoi crée un nouveau lien) | 9 | B18, B19 |
| **Suivi du menu non rempli** | **3 e-mails au plus, un tous les 2 jours** à partir de l'envoi du lien (J+2, J+4, J+6) | le menu est rempli et validé (par le client, ou par vous d'un clic), le passage est annulé ou a eu lieu, ou les 3 envois sont faits | 10 | B18 |
| **Menu validé et liste d'ingrédients** (e-mail du service) | à la validation du menu | — (un seul envoi) | 11 | B18 |
| **Rappel de passage** | **24 h avant** la date du passage | le passage est réalisé ou annulé | 13 | B18 |
| **Confirmation de report ou d'annulation** | dès que vous enregistrez l'action | — (un seul envoi) | 12 | B15 |
| **Demande d'avis** | **J+2** après le dernier passage, puis **une** relance à **J+7** | l'avis est reçu, ou les deux envois sont faits | 17 | B22 |

### 1.5 Votre routine du matin

**Environ dix minutes, dans cet ordre.** Django ne vous envoie aucune notification (seules les demandes du site vous parviennent par e-mail, étape 2) : tout ce qui demande votre attention se lit dans la vue Pipeline et sur le tableau de bord.

**1. Votre pipeline (prospects)**, vue Pipeline de l'administration (section 1.6)

| Colonne | Ce que vous regardez | Ce que vous faites |
| --- | --- | --- |
| **Nouveau** | le nombre de demandes arrivées depuis la veille, et la **plus ancienne** : au-delà de 24 h, c'est la priorité | vous rappelez, puis vous déplacez le deal à Qualifié (étape 3) ; filtre « À rappeler » |
| **Qualifié** | les deals qualifiés **sans devis envoyé** : plus un deal y reste, plus il risque de refroidir | vous cliquez « Faire un devis » (étape 4) ; filtre « Qualifié sans devis » |
| **Devis envoyé** | la **date d'envoi** de chaque devis, surtout ceux sans réponse depuis plus d'une semaine, et ceux qui approchent de leur validité de 30 jours | vous relancez par e-mail ou par téléphone, ou vous passez le deal à Perdu ; filtre « Devis sans réponse » |
| **Gagné** | tout deal « Gagné » **sans dossier** (filtre « Gagné sans dossier ») | vous cliquez « Ouvrir le dossier » (étape 7) |
| **Perdu** | rien de quotidien ; de temps en temps, le motif de perte | — |

Vous consultez aussi l'**e-mail de notification du site** pour toute nouvelle demande reçue dans la nuit. Ce sont des repères de lecture : aucun délai n'est imposé par le système.

**2. Le tableau de bord Django (clients)**

Six compteurs ; chacun est un lien vers la liste filtrée.

| Compteur | Vous cliquez, vous voyez | Ce que vous faites |
| --- | --- | --- |
| **Clients à planifier** | vue Clients, filtre « À planifier », avec créés / prévus (2/4) | vous appelez le client pour convenir des dates, puis vous créez les passages (étape 8) |
| **Liens de choix à envoyer** | vue Clients, filtre « Lien à envoyer » | vous envoyez les liens, un par un ou en lot (étape 9) |
| **Mes semaines à préparer** | vue Semaines, filtre « Menu prêt » avec la période « 7 prochains jours », avec l'indication « relu » ou non | vous relisez les allergies avec votre note d'allergies et vous marquez « relu » ; vous faites les courses (étapes 11 et 13) |
| **Semaines à facturer** | vue Semaines, filtre « Réalisée » | vous émettez la facture dans votre outil et vous saisissez son numéro (étape 14) |
| **Factures à suivre** | vue Semaines, filtre « Facturée » | vous vérifiez le paiement et vous marquez la facture payée : le passage passe à Clôturée (étape 15) |
| **Engagements bientôt terminés** | vue Clients, filtre « Fin d'engagement proche », avec la date du dernier passage et l'offre disponible | vous proposez la suite ; vous cliquez « Créer un deal de renouvellement » ou « Pas de renouvellement » (étape 18) |

Ce que mesure chaque compteur est défini en section 1.6.

**3. Un coup d'œil dans la vue Semaines**
- Filtre **Menu envoyé** : les menus que le client n'a pas encore rempli, surtout ceux dont la date limite approche ou est dépassée, et ceux qui ont déjà reçu leurs **3 e-mails** de suivi sans réponse : vous l'appelez, ou vous validez la liste prédéfinie d'un clic.
- Filtre **« Seulement les en retard »** : en particulier les passages **dont la date est dépassée** sans être marqués Réalisée, que vous marquez réalisés ou annulés.
- Les passages de la journée et de la semaine, dans votre **Google Agenda** (flux iCal en lecture seule).

**4. Plus rarement**
- Avant le premier passage d'un nouveau client en batch cooking : vue Clients, filtre **Compte URSSAF non prêt**, pour vérifier son inscription sur votre espace URSSAF et cocher la case.
- Liste des **demandes de données RGPD** : l'échéance de 30 jours s'y affiche, en rouge une fois dépassée.
- **En janvier** : vérifier que l'attestation fiscale est bien partie (étape 16).
- Après toute modification de contenu : cliquer **Publier** (étape 1).

**5. Une fois par mois, vos indicateurs (environ cinq minutes)**

Le premier jour du mois, vous regardez la santé du commerce, pas seulement les tâches. Cinq chiffres (détail et définitions : section 1.7) :
- **Dans Django**, la page **Indicateurs** : le **nombre de demandes** du mois et le **taux de conversion** (demande → devis envoyé → accord), puis **clients actifs**, **chiffre d'affaires facturé** et **taux de renouvellement**, comparés aux mois précédents.

Ce que vous cherchez : un mois où les demandes baissent (l'acquisition faiblit), où la conversion baisse (le devis ou le suivi pose problème), où les renouvellements baissent (la fidélisation faiblit), ou où le chiffre d'affaires ne suit pas les clients actifs (la marge ou la facturation pose problème).

### 1.6 Le tableau de bord, les vues et les filtres

Cette section décrit ce que vous voyez à l'écran. Les maquettes sont **indicatives** : elles fixent le contenu et le comportement, pas le dessin exact (le thème Unfold décide de l'habillage). Tout est livré par B15 (fiches et statuts) et B17 (tableau de bord, vues et filtres).

**Principes communs**
- **Le tableau de bord est la page d'accueil** de l'administration. Chaque compteur est un lien : un clic ouvre la liste déjà filtrée.
- **Trois listes, trois regards** : la vue **Pipeline** répond à « quels prospects ? » (une ligne par deal), la vue **Clients** à « qui ? » (une ligne par client), la vue **Semaines** à « quel passage ? » (une ligne par passage, avec son client).
- **Les filtres sont au-dessus du tableau**, en une barre horizontale de menus, se combinent entre eux, et affichent leur **compteur**. Le filtre actif est rappelé au-dessus de la liste, avec un bouton pour l'effacer.
- **Les listes de filtres de cette section sont des propositions de départ, pas un cahier des charges.** Au moment d'implémenter B06 et B17, Claude **vous montre la liste proposée et vous demande** lesquels garder, ajouter ou retirer, avant de les construire. Les filtres s'ajoutent ensuite sans développement lourd.
- **Le chiffre d'un compteur du tableau de bord est toujours égal au nombre de lignes de la liste qu'il ouvre.** Si ce n'est pas le cas, c'est un défaut.
- **En retard** s'affiche en **rouge**, jamais par la couleur seule (une icône et le mot « en retard » l'accompagnent).
- Tout se corrige à la main : un statut, une date, une date limite, avec une trace dans le journal d'audit.

#### Le tableau de bord

```
┌──────────────────────────────────────────────────────────────────────┐
│  Bonjour — tableau de bord                                           │
│  ⚠ 2 relances désactivées  ·  Envois automatiques : actifs           │
├──────────────────────────────────────────────────────────────────────┤
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐               │
│  │ Clients à     │ │ Liens de      │ │ Mes semaines  │               │
│  │ planifier     │ │ choix à       │ │ à préparer    │               │
│  │      3   →    │ │ envoyer       │ │      4   →    │               │
│  │               │ │      2   →    │ │ dont 1 non    │               │
│  │               │ │               │ │ relue         │               │
│  └───────────────┘ └───────────────┘ └───────────────┘               │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐               │
│  │ Semaines à    │ │ Factures à    │ │ Engagements   │               │
│  │ facturer      │ │ suivre        │ │ bientôt       │               │
│  │      5   →    │ │      3   →    │ │ terminés      │               │
│  │               │ │               │ │      2   →    │               │
│  └───────────────┘ └───────────────┘ └───────────────┘               │
├──────────────────────────────────────────────────────────────────────┤
│  Ce mois : 12 clients actifs · 3 840 € facturés · renouvellement 67 %│
│                                              Voir les indicateurs →  │
└──────────────────────────────────────────────────────────────────────┘
```

| Compteur | Ce qu'il compte | Lien vers |
| --- | --- | --- |
| **Clients à planifier** | clients **Actifs** dont les passages créés sont moins nombreux que ceux du package | vue Clients, filtre « À planifier » |
| **Liens de choix à envoyer** | clients ayant un passage **Planifiée** sans lien envoyé dont la date tombe dans les 7 prochains jours (ou déjà passée) | vue Clients, filtre « Lien à envoyer » |
| **Mes semaines à préparer** | passages à **Menu prêt** dont la date tombe dans les 7 prochains jours (ou déjà passée) ; sous le chiffre, combien ne sont pas encore **relus** | vue Semaines, filtre « Menu prêt » + période « 7 prochains jours » |
| **Semaines à facturer** | passages **Réalisée**, sans facture | vue Semaines, filtre « Réalisée » |
| **Factures à suivre** | passages **Facturée**, sans paiement reçu | vue Semaines, filtre « Facturée » |
| **Engagements bientôt terminés** | engagements dont **tous les passages sont datés** et dont le **dernier passage non annulé** tombe dans les 10 prochains jours (ou est déjà passé), sans nouvel engagement à venir ni « Pas de renouvellement » | vue Clients, filtre « Fin d'engagement proche » |

Sous les compteurs, **trois chiffres du mois** (clients actifs, chiffre d'affaires facturé, taux de renouvellement) renvoient à la page **Indicateurs** (section 1.7). Le bandeau du haut rappelle l'état des **envois automatiques** : « N relances désactivées » et la suspension globale si elle est active. Un compteur à zéro reste affiché, en grisé.

#### Le CRM : le concept

Le CRM est un **petit outil de suivi commercial pour une seule personne** : il garde la trace de chaque personne, de chaque demande et de chaque devis, depuis le premier contact jusqu'à l'ouverture du dossier. Il ne remplace ni votre messagerie, ni votre téléphone : il garde ce qu'ils ne retiennent pas.

```
 Demande du site ─┐
 Saisie à la main ─┴─► CONTACT ────1 : n────► DEAL ────1 : n────► DEVIS
                    (la personne)          (l'affaire)         (versions, PDF)
                          ▲                      │                    │
                          │                      │ Gagné              └─ lien d'acceptation (option)
                          │                      ▼
                          │               CLIENT + DOSSIER ──► engagements ──► passages
                          │                      │
                          └──── renouvellement : un nouveau deal sur le même contact
```

**Quatre objets, quatre questions**

| Objet | Question à laquelle il répond | Ce qu'il porte |
| --- | --- | --- |
| **Contact** | Qui est cette personne ? | prénom, nom, e-mail, téléphone, adresse, source, notes |
| **Deal** | Quelle affaire est en cours avec elle ? | service, étape, montant estimé, détail de la demande, motif de perte, historique des étapes |
| **Devis** | Qu'est-ce que je lui ai proposé ? | versions, lignes, totaux, PDF, acceptation éventuelle |
| **Client et dossier** | Qu'est-ce que je lui ai vendu et où en est-on ? | engagements, passages, menus, facturation (le reste de la plateforme) |

**Le cycle de vie d'une personne** : *prospect* (un contact avec un deal ouvert) → *client* (un deal Gagné et un dossier ouvert) → *client inactif* (plus de passages à venir) → *renouvellement* (un nouveau deal, sur le même contact, qui repart d'« Nouveau »). Un deal Perdu laisse le contact intact : il pourra avoir un autre deal plus tard.

**Les règles du concept**
- **Un contact, plusieurs deals** : une même personne peut demander un batch cooking, puis un chef privé, puis renouveler.
- **Vous seule déplacez le deal** : cinq étapes (Nouveau, Qualifié, Devis envoyé, Gagné, Perdu), aucune ne change toute seule, chaque changement est historisé et se corrige à la main.
- **Rien ne vous relance** : le CRM n'envoie rien, ne crée aucune tâche. Il vous montre ce qui attend, par des filtres (« À rappeler », « Devis sans réponse »…).
- **Rien n'est obligatoire pour avancer** (1.2) : un deal peut passer à Gagné sans devis dans l'outil, un dossier se crée sans pièce.
- **Aucune allergie ni donnée de santé** dans le CRM (1.2).
- **Volontairement simple** : pas de lecture de votre messagerie, pas de score, pas de séquence d'e-mails ; vos échanges restent dans votre boîte, seules vos notes entrent dans la fiche.

#### La vue Pipeline (prospects)

Une ligne par **deal**, en deux présentations : **colonnes** (Nouveau, Qualifié, Devis envoyé, Gagné, Perdu, avec glisser-déposer pour changer d'étape) ou **liste**. Un clic ouvre la **fiche du deal** : coordonnées du contact, détail de la demande, notes datées, **devis** rattachés (référence, lien du document, PDF envoyé), historique des étapes. Deux boutons : **« Faire un devis »** (A-Devis prérempli) et, sur un deal Gagné, **« Ouvrir le dossier »** (A-Dossier). Un deal passé à Perdu demande un **motif**.

- **Colonnes de la liste** : contact, service, étape, **âge dans l'étape**, commune ou zone, montant estimé, date du dernier devis, source, date de création.
- **Tri** : par âge dans l'étape (le plus ancien d'abord, par défaut), par date de création, par montant.
- **Recherche** : par nom, e-mail, téléphone ou texte des notes.

| Filtre | Ce qu'il garde |
| --- | --- |
| **Étape** | une ou plusieurs étapes (par défaut : tout sauf Perdu) |
| **Service** | batch cooking, chef privé ou cours |
| **À rappeler** | deals « Nouveau » depuis plus de 24 h (`lead_callback_hours`) |
| **Qualifié sans devis** | deals Qualifié sans aucun devis émis |
| **Devis sans réponse** | deals « Devis envoyé » depuis plus de 7 jours (`quote_waiting_days`) |
| **Gagné sans dossier** | deals Gagné dont le dossier n'est pas créé |
| **Source** | site, bouche-à-oreille, autre |
| **Zone ou commune** | zone 1, 2 ou 3 ; commune |
| **Période** | date de création : ce mois-ci, le mois précédent, plage libre |
| **Montant** | tranche de montant estimé |
| **Offre** | offre commerciale associée |
| **Motif de perte** | pour les deals Perdu |
| **Renouvellement** | deals de renouvellement, ou nouveaux clients seulement |

Les filtres se combinent et affichent leur compteur ; une combinaison s'**enregistre comme vue nommée** (« Chef privé de Montpellier », « Devis à relancer »). **Aucun compteur n'est ajouté au tableau de bord** : la vue Pipeline est la première étape de votre routine (1.5).

#### La vue Clients

```
┌─ Clients ────────────────────────────────────────────────────────────┐
│ 🔍 Rechercher par nom ou e-mail                                      │
├──────────────┬───────────────────────────────────────────────────────┤
│ FILTRES      │ Client        Statut  Engagement     Passages  Suivant│
│              │ ───────────────────────────────────────────────────── │
│ Statut       │ M. Martin     Actif   Mois · Signat.  2 / 4    mar 12 │
│  ○ Tous      │ Mme Durand    Actif   Semaine         1 / 1    jeu 14 │
│  ● Actif     │ Mme Petit     Actif   Mois · Essent.  4 / 4    mar 19 │
│  ○ Inactif   │ M. Bernard    Inactif —               —        —      │
│              │                                                       │
│ À traiter    │                                                       │
│  ☐ À planifier (3)                                                   │
│  ☐ Lien à envoyer (2)                                                │
│  ☐ Compte URSSAF non prêt (1)                                        │
│  ☐ Fin d'engagement proche (2)                                       │
│              │                                                       │
│ Une semaine  │                                                       │
│ en statut…   │                                                       │
│  ☐ À dater (3)   ☐ Planifiée (2)  ☐ Menu envoyé (4)                  │
│  ☐ Menu prêt (4) ☐ Réalisée (5)   ☐ Facturée (3)  ☐ Clôturée (12)   │
└──────────────┴───────────────────────────────────────────────────────┘
```

- **Colonnes** : nom, statut (**Actif** ou **Inactif**, calculé), engagement (formule et pack), **passages créés / passages du package** (2/4), date du prochain passage. Un clic sur la ligne ouvre la fiche client.
- **Tri** : par nom, par prochain passage, par passages manquants.
- **Recherche** : par nom ou par e-mail.

| Filtre | Ce qu'il garde |
| --- | --- |
| **Statut : Actif / Inactif** | les clients Actifs (un engagement avec des passages non clôturés) ou Inactifs |
| **À planifier** | clients Actifs dont les passages créés (hors annulés) sont moins nombreux que ceux du package |
| **Lien à envoyer** | clients ayant un passage **Planifiée** sans lien envoyé dont la date tombe dans les 7 prochains jours (ou déjà passée) |
| **Fin d'engagement proche** | clients dont l'engagement se termine : dernier passage non annulé dans les 10 prochains jours (ou passé), tous passages datés, sans suite. Ajoute les colonnes **date du dernier passage** et **offre de renouvellement disponible**, et les actions **« Créer un deal de renouvellement »** et **« Pas de renouvellement »** |
| **Compte URSSAF non prêt** | clients Actifs en batch cooking dont la case « compte URSSAF prêt » n'est pas cochée : à vérifier avant leur premier passage (avance immédiate). **Aucun compteur sur le tableau de bord**, aucune notification : c'est un filtre à consulter |
| **Une semaine en statut X** | clients ayant **au moins une** semaine dans ce statut : À dater, Planifiée, Menu envoyé, Menu prêt, Réalisée, Facturée, Clôturée |

#### La vue Semaines

```
┌─ Semaines ───────────────────────────────────────────────────────────┐
│ 🔍 Client…        Du [____] au [____]      ☐ Seulement les en retard │
├──────────────┬───────────────────────────────────────────────────────┤
│ FILTRES      │ ☐ Date     Client       Service  Statut      Menu Fact│
│              │ ───────────────────────────────────────────────────── │
│ Statut       │ ☐ mar 12   M. Martin    Batch    Menu prêt   relu  —  │
│  ☐ À dater   │ ☐ mar 12   Mme Petit    Batch    Menu prêt   ⚠ non  — │
│  ☐ Planifiée │ ☐ jeu 14   Mme Durand   Batch    Menu envoyé limite  — │
│  ☐ Menu env. │                         ⚠ en retard : limite dépassée  │
│  ☐ Menu prêt │ ☐ lun 04   M. Bernard   Batch    Réalisée    —    à  │
│  ☐ Réalisée  │                                                 émettre│
│  ☐ Facturée  │                                                       │
│  ☐ Clôturée  │ Actions sur la sélection :                            │
│  ☐ Annulée   │  [Envoyer le lien de choix] [Reporter] [Annuler]      │
│              │  [Marquer réalisée]                                   │
│ Période      │                                                       │
│  ○ 7 prochains jours                                                 │
│  ○ Cette sem.│                                                       │
│  ○ Ce mois   │                                                       │
└──────────────┴───────────────────────────────────────────────────────┘
```

- **Colonnes** : date et heure du passage, client, service, **statut**, état du menu (liste prédéfinie, date limite, validé, **relu** ou non), état de la facture (à émettre, numéro, payée). Un clic sur la ligne ouvre la fiche du passage.
- **Tri** : par date (défaut, le plus proche d'abord), par client, par statut.
- **Actions groupées** sur les lignes cochées : envoyer le lien de choix, reporter, annuler avec motif, marquer réalisée.

| Filtre | Ce qu'il garde |
| --- | --- |
| **Statut** (un par statut du cycle, plus **Annulée**) | les passages dans ce statut ; plusieurs statuts se combinent |
| **Période** : **7 prochains jours**, cette semaine, ce mois, dates libres | les passages dont la date tombe dans la période |
| **Client** | les passages d'un client (recherche par nom) |
| **Seulement les en retard** | voir ci-dessous |

**Ce qui est « en retard »** (rouge, avec icône et mot) :
- un passage **Menu envoyé** dont la **date limite** est dépassée ;
- un passage **Menu prêt** pas encore **relu** à moins de 48 h de la date ;
- un passage dont la **date est passée** sans être marqué Réalisée ou Annulée ;
- une **facture** dont l'échéance est dépassée sans paiement.

#### La fiche d'un passage

```
┌─ Passage 2 sur 4 — M. Martin — mardi 12 à 18 h ──────────────────────┐
│ Statut : Menu prêt ▾   (modifiable à la main, avec trace d'audit)    │
│ Date limite de choix : 10 · [modifier]     Menu : relu ☐             │
│ Recettes : …  · liste d'ingrédients (PDF) · fiche de préparation     │
│ Facture : à émettre                                                   │
│ [Envoyer le lien de choix] [Reporter] [Annuler] [Marquer réalisée]   │
│ Historique : dates, statuts, e-mails envoyés                         │
└──────────────────────────────────────────────────────────────────────┘
```

Le menu déroulant du statut permet de **corriger à la main** n'importe quel statut : c'est ce qui garde le système flexible quand un cas sort du cycle prévu.

### 1.7 Les indicateurs d'affaires

Le tableau de bord (section 1.6) montre des **tâches** ; ces cinq chiffres montrent la **santé du commerce**. Sans eux, vous ne saurez pas quel levier tirer : plus de demandes, un meilleur suivi des devis, une meilleure fidélisation, ou une meilleure facturation. Ils se regardent **une fois par mois** (section 1.5, point 5), jamais au quotidien, et **ne déclenchent aucune notification**.

**Une seule source** : tout se calcule dans Django, à la demande, à partir des deals, des historiques d'étapes, des factures et des engagements.

| Indicateur | Source | Définition | Comment le lire |
| --- | --- | --- | --- |
| **Nombre de demandes** | Django | deals créés dans le mois à l'étape « Nouveau » (site ou saisie manuelle), **hors** deals de renouvellement (nommés « Renouvellement — … ») | si ce nombre baisse, c'est l'acquisition qui faiblit (site, bouche-à-oreille, offres) |
| **Taux de conversion** | Django | pour les demandes **créées dans le mois** : la part passée à « Devis envoyé » (demande → devis), la part des devis envoyés passée à « Gagné » (devis → accord), et la part des demandes devenues « Gagné » (demande → accord) | demande → devis qui baisse : vous qualifiez ou chiffrez trop lentement ; devis → accord qui baisse : le devis ou le suivi pose problème |
| **Clients actifs** | Django | nombre de clients **Actifs** à la fin du mois, avec les nouveaux du mois et ceux devenus Inactifs | c'est la taille de votre activité récurrente ; votre capacité à cuisiner reste le plafond : surveillez l'écart entre clients actifs et passages que vous pouvez assurer |
| **Chiffre d'affaires facturé** | Django | somme des montants des **factures saisies dans le mois** (par date d'émission), avec la part **déjà encaissée** | s'il ne suit pas les clients actifs, des passages ne sont pas facturés, ou les prix sont trop bas |
| **Taux de renouvellement** | Django | parmi les engagements dont le **dernier passage a eu lieu dans le mois** : la part des clients qui ont un **nouvel engagement dans les 30 jours**, avec le nombre de « Pas de renouvellement » et leurs motifs | s'il baisse, c'est la fidélisation : regardez les motifs de refus |

**Précautions de lecture**
- **Les chiffres d'un mois récent sont provisoires** : un devis envoyé le 28 peut être accepté le 10 du mois suivant, et un renouvellement arrive parfois après la fin du mois.
- Le **chiffre d'affaires** est le montant saisi sur les factures. Ce qui compte comme chiffre d'affaires avec l'avance immédiate (part URSSAF, crédit d'impôt) est à valider avec le comptable (M10, **[À VÉRIFIER]**).
- Aucun de ces chiffres ne remplace votre comptabilité.

**Où ils se lisent**
- **Dans Django**, la page **Indicateurs** (B17), atteinte depuis les trois chiffres affichés sous les compteurs du tableau de bord : un **sélecteur de mois**, un **tableau des six derniers mois** (demandes et conversion, clients actifs, chiffre d'affaires facturé et encaissé, renouvellements, refus avec motifs), et, en cliquant un chiffre, la **liste des clients ou des deals** concernés. Un export CSV est disponible. Les chiffres sont **calculés à la demande** à partir des données existantes (historique des statuts, factures, engagements) : aucune table de plus.
- Pas de tableau de bord externe : les cinq chiffres sont tous sur la page Indicateurs.

### 1.8 Hors périmètre
Pas de CRM externe : le **CRM est dans Django et reste volontairement simple** (contacts, deals, notes, devis, filtres ; pas de lecture de votre messagerie, pas de tâches ni de relances automatiques, pas de score, pas de formulaire ou de séquence d'e-mails, pas de multi-utilisateur au-delà de `owner` et `assistant`) ; **devis internes simples** (éditeur, versions, PDF, B07) mais **pas de signature électronique qualifiée** : l'acceptation est un e-mail ou un lien d'acceptation facultatif (B08), et l'envoi du devis se fait depuis votre messagerie ; **pas de page calendrier** (flux iCal seulement) ; **pas d'espace client avec comptes** (ni connexion, ni mot de passe, ni historique consultable par le client : il reçoit ses documents par e-mail et valide son menu par un lien à usage unique) ; **pas de profil alimentaire structuré** ni de filtre automatique par allergie (les allergies restent hors de l'outil, 1.2) ; pas de création de factures conformes (outil externe, Django déclenche et suit) ; **pas de cartes cadeaux ni de programme de fidélité pour l'instant** ; **pas de notification à la cheffe** (e-mail, SMS ou autre) : un tableau de bord à ouvrir ; **pas de cycle de statuts de semaine pour le chef privé et les cours** pour l'instant ; **une seule cheffe** (aucune affectation d'un passage à une personne) ; pas de SMS ni WhatsApp envoyés par Django (vous pouvez copier un lien pour l'envoyer vous-même) ; pas de comptabilité, de stocks ni de commandes fournisseurs ; pas d'application mobile native.

### 1.9 Fragilités à surveiller
- **Étapes manuelles** (envoyer, changer l'étape du deal, créer le dossier, dater les passages, marquer « réalisé ») : le tableau de bord et les vues filtrées (1.5, B17) les rendent visibles. **Un deal « Gagné » sans dossier** ne déclenche rien : il se retrouve par le filtre « Gagné sans dossier » de la vue Pipeline.
- **Double saisie** : une faute de frappe dans l'e-mail empêche le client de recevoir ses liens de choix, un prix peut s'écarter du devis. Atténué par les coordonnées reprises du contact, le prix prérempli, la référence unique, le devis rattaché au deal et à l'engagement et l'e-mail de bienvenue qui révèle une adresse fausse.
- **Allergies** : aucune barrière automatique ; la sécurité repose sur l'affichage des allergènes, la confirmation du client et la relecture de la cheffe. **Quand la cheffe valide la liste prédéfinie à la place du client, il n'y a pas de confirmation de sa part** : la relecture « relu » est alors la seule protection, et elle ne bloque rien si elle est oubliée. Clause de responsabilité des CGV à faire valider **[À VÉRIFIER]**.
- **Avance immédiate URSSAF** : le client doit avoir activé son compte sur particulier.urssaf.fr avant le premier passage ; rien ne le vérifie automatiquement (avertissement dans B20).
- **Routine quotidienne** : Django ne vous envoie aucune notification (hors demandes du site), donc rien ne vous prévient si vous sautez votre routine (maladie, congés) : une demande « Nouveau » peut attendre, un lien de choix ne pas partir. L'envoi automatique du lien (étape 9) et les e-mails aux clients continuent, mais pas le suivi des prospects.
- **Offres gratuites** : limites susceptibles de changer (Brevo, Sentry).
- **RGPD** : suppression à répéter dans Django (contacts, deals), outil de facturation, Brevo et Stripe, et dans **votre support privé d'allergies** ; les allergies sont des données de santé, recueillies avec consentement explicite et jamais saisies dans l'outil (1.2). Les prospects perdus ne se conservent pas indéfiniment (B23).
- **Délivrabilité** : liens de choix du menu classés en spam si SPF, DKIM et DMARC ne sont pas configurés. Procédure en **M4** ; un domaine neuf reste suspect pour Gmail et Outlook, donc envoyer peu de volume les premiers jours.
- **FAQ et CGV** : la FAQ dit qu'on peut « changer de formule » et annule à 48 h ; les CGV (article sur l'annulation) proposent encore 15 et 7 jours, alors que le système n'applique plus aucune règle de montant automatique. À aligner avant la production.

### 1.10 Les outils et ce qu'ils coûtent

**Le principe : gratuit d'abord.** Tous les outils de cette liste sont pris dans leur offre gratuite, sauf deux lignes — les commissions de Stripe, qui ne se paient que sur un encaissement, et l'hébergement de l'administration, seul poste à la fois payant et non tranché.

| Outil | Coût | À quoi il sert | Étapes |
| --- | --- | --- | --- |
| **Administration Django** | gratuit (le logiciel) | Votre outil de travail : prospects et pipeline, devis, contenu, clients, engagements, passages, menus, facturation, suivi | 1 à 19 |
| **Brevo** | gratuit, 300 e-mails par jour **[À VÉRIFIER]** | Tous les e-mails envoyés à vos clients | 7, 9 à 13, 17 |
| **Cloudflare** | déjà en place | Hébergement du site figé, et **Turnstile** contre les robots du formulaire | 1, 2 |
| **GitHub Actions** | gratuit | Construit et publie le site quand vous cliquez sur « Publier » | 1 |
| **Stripe** | 1,5 % + 0,25 € par carte ; 0,35 € par prélèvement **[À VÉRIFIER]** | Acompte du chef privé. **Aucun abonnement** : vous ne payez que sur un encaissement | 7 (chef privé) |
| **URSSAF (avance immédiate)** | gratuit | Règle 50 % du passage après validation du client sous 48 h | 15 |
| **Outil de facturation** | **à choisir (M14)** | Factures, avoirs, attestation fiscale annuelle, numérotation continue | 14, 16 |
| **Google Agenda** | gratuit | Voir vos passages dans votre agenda, par un **flux en lecture seule** produit par l'administration ; et vos rendez-vous de qualification | 3, 8 |
| **WeasyPrint** | gratuit (bibliothèque) | Les PDF : devis, listes d'ingrédients | 4, 11 |
| **Sentry** | gratuit | Vous prévient quand quelque chose casse | 20 |
| **UptimeRobot** | gratuit **[À VÉRIFIER]** | Vous prévient quand le site ne répond plus | 20 |
| **Hébergement de l'administration** | **à décider (M5)** | Faire tourner l'administration et la page de choix. **Le seul poste à la fois payant et non tranché**, et celui dont dépendent tous les paliers testables | — |

**Ce qui n'est pas gratuit mais n'est pas un abonnement** : les commissions Stripe se prélèvent sur un paiement reçu, donc un mois sans vente ne coûte rien. **Ce qui pourrait le devenir** : les offres gratuites de Brevo et Sentry ont des limites (e-mails par jour, événements) marquées **[À VÉRIFIER]** et susceptibles de changer ; les atteindre déclencherait un abonnement, pas une panne.

# Partie II — Le plan de livraison

Ce qu'on construit, dans quel ordre, et ce que vous pourrez essayer à chaque étape. C'est la partie à ouvrir au quotidien.

## 2. Prérequis : comptes, décisions et réglages avant les PR

Tout ce que vous mettez en place **vous-même**, avant la PR qui en dépend. Chaque prérequis dit **quand** il est nécessaire (palier, section 3.1) et **quelle PR** il débloque. Les décisions encore ouvertes sont marquées **DÉCISION**.

### Au démarrage du projet
- **M1 Dépôt et règles GitHub** (avant **B00**) : créer le dépôt privé `chefmeemz-backend` (branche `main`, **sans** README ni `.gitignore`, la PR B00 les apporte), le cloner à côté de `chefmeemz`. Protéger `main` : pull request et une approbation obligatoires, vérifications de la CI obligatoires, branche à jour, historique linéaire, *force push* interdit. Activer Dependabot alerts et secret scanning. Créer les environnements `test` et `production` (approbation de votre part avant tout déploiement en production).
- **M2 Poste et accès de Claude** (avant **B00**) : Docker Desktop, Python 3.12 ou plus, `uv`, Git, `make`. Ouvrir la session de Claude avec `chefmeemz-backend` comme dossier de travail et `chefmeemz` en dossier supplémentaire. Copier ce document dans `chefmeemz-backend/docs/PROJECT.md` et créer `docs/DECISIONS.md` (B00 vérifie leur présence).

### Avant le palier 0 : les demandes du site arrivent par e-mail
- **M3 Cloudflare Turnstile** (avant **S00**) : créer un widget pour `tabletribu.com` et `test.tabletribu.com` ; noter la clé de site (publique) et la clé secrète (côté serveur).
- **M4 Brevo et domaine d'envoi** (avant **S00** pour l'e-mail de demande, **B02** pour les tests, **B18** pour l'envoi réel aux clients) : créer le compte et une clé d'API par environnement ; adresse d'expédition `contact@tabletribu.com` (jamais une adresse gmail.com). **[À VÉRIFIER]** : limites de l'offre gratuite. **Authentifier le domaine** :
  1. Dans Brevo, « Expéditeurs, domaines et IP dédiées » : ajouter `tabletribu.com` (ou un sous-domaine d'envoi comme `mail.tabletribu.com`, qui protège la réputation du domaine principal) ; Brevo affiche les enregistrements à créer, **à recopier tels quels**.
  2. Chez le gestionnaire de DNS : le code de vérification Brevo (TXT), le ou les enregistrements **DKIM** de Brevo (CNAME ou TXT), le **SPF** (TXT, de la forme `v=spf1 include:spf.brevo.com ~all` ; **un seul SPF par domaine** : s'il en existe un, y ajouter l'`include`), le **DMARC** (TXT sur `_dmarc.tabletribu.com`, par exemple `v=DMARC1; p=none; rua=mailto:contact@tabletribu.com`, à durcir quand les rapports sont propres).
  3. Si Cloudflare gère le DNS, laisser les CNAME de Brevo en **« DNS seulement »** (nuage gris).
  4. Valider dans Brevo, puis s'envoyer un e-mail de test : dans Gmail, « Afficher l'original » doit montrer **SPF, DKIM et DMARC : PASS** (mail-tester.com donne aussi une note). Limiter le volume les premiers jours.

### Avant le palier 1 : l'outil est en ligne
- **M5 Hébergement de Django** (avant **B12**) : **DÉCISION, la seule bloquante.** Un hébergeur de conteneurs, une base PostgreSQL gérée avec sauvegardes, un stockage, des noms de domaine (hypothèse `api.test.tabletribu.com` et `api.tabletribu.com`) et un certificat TLS. Tenir compte de l'exposition : la page de choix du menu est joignable publiquement par son lien signé ; l'administration reste derrière 2FA et préfixe non évident. **Si cela passe par Teads : #ask-devx (chemin approuvé) et #ask-security.** Aucune PR avant B12 n'en dépend.
- **M6 DNS du backend** (avant **B12**) : créer les enregistrements des domaines du backend selon M5 ; vérifier ceux de `test.tabletribu.com` (déjà dans `wrangler.jsonc`).
- **M7 Stockage de fichiers** (avant **B02**) : **DÉCISION** : fournisseur compatible S3 hébergé dans l'UE. Par environnement, un espace **public** (images du site, CORS) et un espace **privé** (devis, preuves, PDF), avec des clés à portée limitée. Tant que ce n'est pas fait, B02 et B03 utilisent le stockage local.
- **M8 Votre compte** (après **B01**) : créer votre compte, activer le 2FA avec une application TOTP, conserver les codes de secours.

### Avant les paliers 2 à 4 : contenu, prospects, devis, publication
- **M9 Arbitrer les treize questions à double réponse** (pendant **B11**, après l'import) : la FAQ existe en 118 exemplaires pour 70 questions, treize ont une réponse différente selon la page. L'import garde celle de la page FAQ et vous remet la liste des variantes écartées : vous relisez ces treize entrées et gardez la formulation voulue (une question peut être dédoublée si une variante vous manque).
- **M10 Comptable** (avant **B07**, **B16**, **B20**, **B21**) : valider par écrit les mentions du devis, la TVA, l'éligibilité au crédit d'impôt par ligne (déplacement, options, plats sur mesure), la valeur d'un accord par e-mail, et ce qui compte comme chiffre d'affaires avec l'avance immédiate (section 1.7).
- **M13 Allergies et RGPD** (avant **B05**, et avant toute collecte réelle) : les allergies sont des données de santé que **vous gardez hors de l'outil**. À faire : (1) choisir votre **support privé** (carnet rangé, ou note protégée par mot de passe, jamais dans un tableur partagé ni dans un e-mail) ; (2) **consentement explicite** (texte précis, retirable), recueilli pendant la qualification, avec le questionnaire facultatif du sur mesure (adresse, foyer, goûts, compte URSSAF) ; (3) **registre des traitements**, prospects compris, avec leur durée de conservation (3 ans après le dernier échange, à valider) et celle de votre support privé ; (4) **politique de confidentialité** mise à jour (finalités, durées, hébergeur de Django comme sous-traitant) ; (5) **clause de responsabilité** des CGV (le client choisit ses recettes après lecture des allergènes ; la cheffe valide à sa place) à faire valider **[À VÉRIFIER]**.
- **M11 Jeton de publication** (avant **B14**) : jeton GitHub à portée minimale pour déclencher un workflow du dépôt `chefmeemz` (`repository_dispatch`), enregistré comme secret du backend. **[À VÉRIFIER]** : les droits exacts requis.
- **M12 Déploiement Cloudflare** (avant **S03**) : vérifier votre offre Workers (temps de calcul par requête), créer un jeton d'API de déploiement et enregistrer les secrets du dépôt `chefmeemz`.

### Avant les paliers 5 à 10 : dossiers, facturation, paiement
- **M14 Outil de facturation** (avant **B20**) : **DÉCISION** : gère-t-il l'avance immédiate URSSAF, a-t-il une interface de programmation ? Tant que ce n'est pas décidé, B20 livre la saisie manuelle.
- **M15 Espace prestataire URSSAF** (avant **B20**) : vérifier que votre compte prestataire est ouvert pour l'avance immédiate et savoir y inscrire un client et suivre ses demandes (section 1.3, étape 8). **[À VÉRIFIER]**.
- **M16 Stripe** (avant **B21**) : créer le compte, rester en **mode test**, noter les clés, enregistrer plus tard l'adresse du webhook par environnement ; activer le prélèvement SEPA et personnaliser la page de paiement avant la production.

### Avant le palier 12 : la production
- **M17 Supervision** (avant **B24**, optionnel plus tôt) : projet Sentry en région UE par environnement (noter les DSN) et sonde UptimeRobot **[À VÉRIFIER]**.
- **M18 Informations légales** (avant la production) : **DÉCISION.** Raison sociale, forme juridique, SIRET, adresse, numéro de déclaration de services à la personne, assurance, médiateur de la consommation, à saisir dans l'administration (`LegalIdentity`) ; tant qu'elles manquent, un bandeau d'avertissement s'affiche.
- **M19 FAQ et CGV alignées** (avant la production) : aligner les textes sur les règles réelles (annulation et report laissés à votre décision, changement de formule, délais).

## 3. Paliers et Pull Requests

Chaque PR est conçue pour être confiée **seule** à Claude, puis contrôlée par vous : objectif métier, **fonctionnalités et règles** (décisions déjà prises), critères et contrôle. Les modèles sont en section 8, l'API en section 9, les prérequis (« M1 à M19 ») au chapitre 2.

### 3.1 Plan de livraison par paliers

**Le principe** : chaque palier se termine par **quelque chose que vous pouvez essayer vous-même**, dans votre navigateur. Vous ne passez au suivant qu'une fois le précédent en ligne et validé. Les prérequis de chaque palier sont dans le chapitre 2 ; ils se font **avant** la première PR du palier.

**Trois règles de lecture**
- Le **palier 0 est indépendant de tout le reste** et part directement en production : il arrête une perte d'argent qui a lieu aujourd'hui.
- Tous les autres **s'accumulent sur l'environnement de test** et ne basculent en production qu'au palier 12, après validation de S02 (pas de double fonctionnement de l'ancien et du nouveau site).
- **Le seul verrou** est la décision d'hébergement (**M5**, palier 1). Tant qu'elle n'est pas prise, le développement continue en local mais vous ne pouvez rien essayer vous-même : c'est la première décision à prendre.

**Comment lire les étapes.** Chaque palier est découpé en **étapes numérotées** (palier.étape), classées dans l'ordre de réalisation. Une étape est soit un **prérequis** que vous faites vous-même (« Vous », M1 à M19, chapitre 2), soit une **tranche de PR** confiée à Claude (« Claude »). Une PR de taille « grande » se confie **en tranches** : chaque tranche reprend une partie des « Fonctionnalités et règles » de la PR, se contrôle seule, et la suivante ne démarre qu'une fois la précédente validée. Une PR « petite » ou « moyenne » reste en une seule étape. Rien n'interdit de confier une PR d'un bloc si vous préférez.

**Palier 0 — Les demandes arrivent, l'agent connaît vos règles** (indépendant, directement en production)

| N° | Étape | Qui | Vous validez |
| --- | --- | --- | --- |
| 0.1 | **M3** : widget Cloudflare Turnstile | Vous | les deux clés (site et secrète) sont notées |
| 0.2 | **M4** : compte Brevo et domaine d'envoi authentifié | Vous | un e-mail de test montre SPF, DKIM et DMARC « PASS » |
| 0.3 | **S00b** : skills de l'agent pour le site | Claude | l'agent cite la bonne documentation avant d'écrire |
| 0.4 | **S00** (1/2) : e-mail à la cheffe et accusé de réception | Claude | une demande du site vous arrive par e-mail avec tout son contenu, le visiteur reçoit son accusé |
| 0.5 | **S00** (2/2) : Turnstile, champ piège, limitation de débit, alerte d'échec | Claude | un jeton faux est refusé ; avec une clé Brevo faussée, l'alerte part |

**Palier 1 — L'outil est en ligne et il est à vous**

| N° | Étape | Qui | Vous validez |
| --- | --- | --- | --- |
| 1.1 | **M1** : dépôt `chefmeemz-backend`, protection de `main`, environnements GitHub | Vous | une PR de test ne peut pas être fusionnée sans CI ni approbation |
| 1.2 | **M2** : poste de travail et accès de Claude aux deux dépôts | Vous | `docker`, `uv` et `make` répondent ; Claude voit les deux dépôts |
| 1.3 | **B00** : squelette Django, CI | Claude | `make dev` démarre, `/healthz` répond, la CI est verte |
| 1.4 | **B00b** : skills de l'agent pour le backend | Claude | l'agent refuse d'ajouter une allergie à une fiche client |
| 1.5 | **B01** (1/2) : comptes, 2FA, blocage après 5 échecs | Claude | vous vous connectez avec le code de votre téléphone, cinq échecs bloquent le compte |
| 1.6 | **M8** : votre compte et vos codes de secours | Vous | vous êtes `owner` avec le 2FA actif |
| 1.7 | **B01** (2/2) : thème Unfold, bandeau d'environnement, journal d'audit | Claude | l'administration est à vos couleurs, une action écrit une ligne d'audit |
| 1.8 | **M7** : stockage de fichiers (DÉCISION) | Vous | deux espaces (public, privé) et leurs clés par environnement |
| 1.9 | **B02** (1/3) : tâches planifiées (Procrastinate) | Claude | une tâche échouée est reprogrammée puis visible |
| 1.10 | **B02** (2/3) : e-mails (`Mailer`, gabarits, journal) | Claude | un e-mail de test part vers une adresse autorisée et pas vers une autre |
| 1.11 | **B02** (3/3) : fichiers et intégrations factices | Claude | un fichier valide est accepté, un faux refusé ; les clients factices sont utilisés en test |
| 1.12 | **M5** : hébergement de Django (DÉCISION, la seule bloquante) et **M6** : DNS | Vous | hébergeur, base avec sauvegardes, domaines et TLS décidés |
| 1.13 | **B12** : déploiement de l'environnement de test | Claude | vous ouvrez l'administration depuis votre navigateur, sous son préfixe |
| 1.14 | Restauration d'une sauvegarde (contrôle de B12) | Vous et Claude | une sauvegarde est réellement restaurée sur le test |

**Palier 2 — Votre contenu est dans l'outil** (le site public ne change qu'au palier 4)

| N° | Étape | Qui | Vous validez |
| --- | --- | --- | --- |
| 2.1 | **B03** (1/2) : réalisations, inspirations, avis, publier et dépublier, historique | Claude | vous créez une réalisation avec galerie, vous lisez son historique |
| 2.2 | **B03** (2/2) : FAQ à emplacements multiples, pages légales versionnées, coordonnées, identité légale, zones | Claude | une FAQ de trois entrées, une page légale en deux versions |
| 2.3 | **B04** (1/2) : grille de prix, packs, zones, service de calcul | Claude | les prix sont identiques à ceux du site pour toutes les combinaisons |
| 2.4 | **B04** (2/2) : offres commerciales et marqueurs de prix | Claude | une offre expire du formulaire à sa date de fin ; un marqueur inconnu échoue |
| 2.5 | **B09** : API de lecture pour le site | Claude | `curl` avec le jeton rend le contenu publié, jamais un brouillon |
| 2.6 | **B10** : import des contenus existants | Claude | vos 9 réalisations, 70 questions, avis et zones sont dans l'administration |
| 2.7 | **M9** : arbitrer les treize questions à double réponse | Vous | les treize variantes sont relues et tranchées |
| 2.8 | **B11** : blocs vendeurs des pages | Claude | vous modifiez l'accroche d'une page et le titre SEO de l'accueil |

**Palier 3 — Vous suivez vos prospects et faites vos devis** (demande le palier 1 : S01 appelle Django)

| N° | Étape | Qui | Vous validez |
| --- | --- | --- | --- |
| 3.1 | **M13** : support privé des allergies, consentement, registre des traitements, politique de confidentialité | Vous | les cinq points de M13 sont faits avant la première saisie réelle |
| 3.2 | **B05** (1/3) : contact, deal, cinq étapes, historique des étapes | Claude | vous créez un contact et un deal à la main et le faites avancer ; Perdu exige un motif |
| 3.3 | **B05** (2/3) : notes, doublons par e-mail, avertissement « aucune allergie » | Claude | le même e-mail deux fois ne crée qu'un contact |
| 3.4 | **B05** (3/3) : route d'intake `POST /api/v1/leads` | Claude | sans jeton, 401 ; rejouer une demande ne crée rien de plus |
| 3.5 | **S01** : le site envoie les demandes à Django | Claude | une demande du site de test arrive dans « Nouveau » ; Django coupé, l'e-mail arrive quand même |
| 3.6 | **B06** (1/3) : pipeline en colonnes avec déplacement (glisser-déposer et menu) | Claude | vous déplacez un deal des deux façons, l'historique est identique |
| 3.7 | **B06** (2/3) : liste, tri, recherche | Claude | vous retrouvez un deal par nom, e-mail ou téléphone |
| 3.8 | **B06** (3/3) : filtres au-dessus du tableau et vues enregistrées | Claude | Claude vous montre la liste proposée, vous la validez ; vous enregistrez une vue |
| 3.9 | **M10** : réponses du comptable (mentions, TVA, crédit d'impôt par ligne) | Vous | les réponses sont écrites |
| 3.10 | **B07** (1/3) : éditeur de devis (lignes, textes, offre, totaux proposés) | Claude | un devis de chaque service ; les totaux sont justes, un total forcé exige un motif |
| 3.11 | **B07** (2/3) : finaliser (numéro, PDF) et versions | Claude | une version 2 garde le numéro ; la version 1 n'est plus modifiable |
| 3.12 | **B07** (3/3) : import de PDF, blocs de texte réutilisables | Claude | un PDF fait ailleurs se rattache au deal ; vous réutilisez un bloc |
| 3.13 | **B08** (facultative) : lien d'acceptation | Claude | un lien cliqué s'affiche sur le deal sans le déplacer |

**Palier 4 — Vous publiez votre site vous-même**

| N° | Étape | Qui | Vous validez |
| --- | --- | --- | --- |
| 4.1 | **M11** : jeton GitHub de publication | Vous | le jeton est enregistré comme secret du backend |
| 4.2 | **M12** : Cloudflare (offre, jeton de déploiement) | Vous | les secrets du dépôt `chefmeemz` sont en place |
| 4.3 | **S02** : le site lit le contenu depuis l'API à la construction | Claude | le site construit en local est identique à l'ancien |
| 4.4 | **B14** : bouton Publier (A-Publier) | Claude | cinq clics rapprochés = un seul appel ; un échec est affiché |
| 4.5 | **S03** : déclenchement de la publication et déploiement | Claude | vous changez un prix, vous publiez, le site de test l'affiche quelques minutes plus tard |

**Palier 5 — Vous ouvrez un dossier client**

| N° | Étape | Qui | Vous validez |
| --- | --- | --- | --- |
| 5.1 | **B15** (1/3) : client, engagement, passages créés « À dater » | Claude | vous créez un engagement d'un mois : 4 passages, le client est Actif |
| 5.2 | **B15** (2/3) : statuts, corrections manuelles, saisie récurrente des dates | Claude | « tous les mardis à 18 h pendant 4 semaines » date les 4 passages |
| 5.3 | **B15** (3/3) : report, annulation, réservations chef privé et cours | Claude | un passage annulé ne compte plus ; une réservation s'enregistre |
| 5.4 | **B16** (1/2) : page A-Dossier depuis un deal Gagné | Claude | « Ouvrir le dossier » reprend les coordonnées du contact et crée client, engagement, passages |
| 5.5 | **B16** (2/2) : pièces facultatives, e-mail de bienvenue | Claude | le dossier se crée sans aucun devis ; l'e-mail part si la case est cochée |

**Palier 6 — Votre tableau de bord**

| N° | Étape | Qui | Vous validez |
| --- | --- | --- | --- |
| 6.1 | **B17** (1/6) : tableau de bord et ses six compteurs | Claude | « Clients à planifier » passe de 2/4 à 4/4 et le compteur tombe à zéro |
| 6.2 | **B17** (2/6) : vue Clients et ses filtres (à confirmer avec vous) | Claude | vous validez la liste de filtres, puis chacun renvoie les bons clients |
| 6.3 | **B17** (3/6) : vue Semaines et ses filtres (à confirmer avec vous) | Claude | un « en retard » s'affiche en rouge avec son icône ; actions groupées |
| 6.4 | **B17** (4/6) : renouvellement (créer un deal, « Pas de renouvellement ») | Claude | un client en fin d'engagement entre dans le compteur ; le bouton crée un deal « Nouveau » une seule fois |
| 6.5 | **B17** (5/6) : page Indicateurs | Claude | demandes, conversion, clients actifs et renouvellement se recalculent depuis l'historique |
| 6.6 | **B17** (6/6) : flux iCal et registre des e-mails aux clients (coupures) | Claude | vous vous abonnez dans Google Agenda ; vous coupez les relances d'un client |

**Palier 7 — Vos recettes sont dans l'outil**

| N° | Étape | Qui | Vous validez |
| --- | --- | --- | --- |
| 7.1 | **B13** (1/2) : ingrédients, allergènes, recettes sans quantités | Claude | l'allergène d'un ingrédient apparaît sur la recette |
| 7.2 | **B13** (2/2) : quantités, activation « disponible », import des 5 recettes | Claude | une recette sans quantité refuse de devenir « disponible » |

**Palier 8 — Le cycle du menu tourne** (la routine de la Partie I devient utilisable, hors facturation)

| N° | Étape | Qui | Vous validez |
| --- | --- | --- | --- |
| 8.1 | **B18** (1/3) : plan de repas, liste prédéfinie, envoi du lien de choix | Claude | « Envoyer le lien de choix » passe le passage à « Menu envoyé » |
| 8.2 | **B19** : page de choix du menu (lien à usage unique) | Claude | vous choisissez vos recettes sur votre téléphone ; un lien rouvert ne permet plus de modifier |
| 8.3 | **B18** (2/3) : validation, liste d'ingrédients, PDF, case « relu » | Claude | le passage passe à « Menu prêt » ; le PDF est vérifié à la main |
| 8.4 | **B18** (3/3) : e-mails de suivi, rappel de passage, envoi automatique du lien | Claude | les relances s'arrêtent à la validation ; l'envoi automatique se coupe d'un clic |

**Palier 9 — Vous facturez et suivez l'URSSAF** (la routine complète est en service)

| N° | Étape | Qui | Vous validez |
| --- | --- | --- | --- |
| 9.1 | **M14** : outil de facturation (DÉCISION) et **M15** : espace prestataire URSSAF | Vous | l'outil est choisi (ou la saisie manuelle est assumée), votre compte URSSAF est prêt |
| 9.2 | **B20** (1/2) : facture par passage (numéro, statut, échéance) | Claude | un passage « Réalisée » entre dans « Semaines à facturer » puis passe à « Facturée » |
| 9.3 | **B20** (2/2) : suivi de l'avance immédiate URSSAF, « Clôturée » | Claude | la demande se suit jusqu'à « payée » et le passage passe à « Clôturée » |

**Palier 10 — Vous encaissez l'acompte du chef privé**

| N° | Étape | Qui | Vous validez |
| --- | --- | --- | --- |
| 10.1 | **M16** : compte Stripe en mode test | Vous | les clés de test sont notées |
| 10.2 | **B21** : acompte du chef privé | Claude | un acompte payé avec une carte de test confirme la date |

**Palier 11 — Avis et conformité**

| N° | Étape | Qui | Vous validez |
| --- | --- | --- | --- |
| 11.1 | **B22** : avis des clients | Claude | un avis saisi et validé paraît à la publication suivante |
| 11.2 | **B23** (1/2) : export et anonymisation | Claude | un client de test exporté puis anonymisé ne laisse rien d'identifiable |
| 11.3 | **B23** (2/2) : durées de conservation, purge des prospects périmés | Claude | l'action de purge produit son rapport avant d'effacer |

**Palier 12 — Vous ouvrez aux vrais clients**

| N° | Étape | Qui | Vous validez |
| --- | --- | --- | --- |
| 12.1 | **M17** : supervision (Sentry, sonde de disponibilité) | Vous | une alerte de test arrive |
| 12.2 | **M18** : informations légales et **M19** : FAQ et CGV alignées | Vous | `LegalIdentity` est complète, les textes de la FAQ et des CGV concordent |
| 12.3 | **B24** : durcissement et go / no-go | Claude | la checklist du chapitre 5 passe ligne par ligne |
| 12.4 | **B25** : déploiement de la production et retour arrière | Claude | un déploiement attend votre approbation ; un retour arrière réel est fait sur le test |
| 12.5 | **S04** : durcissement du site | Claude | les contrôles de sécurité et d'accessibilité du site passent |
| 12.6 | Bascule du site vers la production | Vous et Claude | backend vérifié (`/healthz`, administration), puis site basculé |

**Dépendances à connaître**
- Le palier 6 ne dépend ni des recettes ni de la facturation : les compteurs concernés s'allument au fil des paliers 8 et 9.
- La page Indicateurs (chiffre d'affaires, encaissé) est vide avant B20.
- Les paliers 3 (prospects et devis) et 4 (publication) sont **indépendants** : commencez par celui qui vous coûte le plus de temps. Les paliers 5-6 (dossiers, tableau de bord) et 7 (recettes) sont aussi indépendants entre eux ; le reste suit l'ordre du tableau. Le palier 3 demande le palier 1 (S01 appelle Django).
- **Points d'arrêt confortables** : fin du palier 3 (vous suivez prospects et devis sans outil externe), fin du palier 4 (vous gérez votre site seule), fin du palier 6 (vous suivez vos dossiers, la facturation reste dans votre outil) et fin du palier 9 (tout le cycle de la prestation, sauf l'acompte en ligne).

### 3.2 Pull Requests du backend (`chefmeemz-backend`)

#### B00. Squelette du projet et intégration continue
- **Branche** : `feat/b00-bootstrap` · **Taille** : moyenne · **Débloque** : **toutes les PR du backend** · **Prérequis** : M1 à M2.
- **Objectif** : créer le dépôt `chefmeemz-backend` et son filet de sécurité : un projet Django vide qui démarre en une commande avec PostgreSQL, et une CI qui refuse tout code qui casse les tests, la sécurité ou les migrations. Aucune fonctionnalité visible.
- **Fonctionnalités et règles**
  - Stack de la section 6.1 : Python 3.12+, Django LTS (**version à confirmer sur le site officiel de Django**), PostgreSQL, DRF, `uv`. Layout `config/settings/{base,dev,test,prod}.py` et `apps/<domaine>/`. Langue `fr-fr`, fuseau `Europe/Paris`, devise EUR.
  - Socle conforme à la section 6.5 : réglages DRF (permission par défaut `IsAuthenticated`, authentification explicite, pagination, limitation de débit, gestionnaire d'erreurs) et réglages de sécurité de production.
  - Le dépôt contient : `README.md`, `Makefile` (`make dev`, `test`, `lint`, `migrate`), `Dockerfile` et `docker-compose.yml` (Django + PostgreSQL), `.env.example` sans secret (liste de la section 10), `.gitignore`, gabarit de PR, `CODEOWNERS`, `/healthz`, `docs/DECISIONS.md`.
  - CI (GitHub Actions) : `ruff` (règles `DJ` et `S`), `mypy` (`django-stubs`, `djangorestframework-stubs`), `pytest`, `makemigrations --check`, `check --deploy` en réglages de production, `pip-audit`, `spectacular --validate --fail-on-warn`, détection de secrets.
  - **Un test échoue si une vue n'a pas de permission explicite.**
  - Maintenance des versions par vous, sans date cible.
- **Critères** : `make dev` démarre l'application et la base ; `make test` passe ; la CI est verte ; `/healthz` répond 200 ; aucun secret dans le dépôt ; une vue sans permission explicite fait échouer le test.
- **Vous contrôlez** : cloner, `cp .env.example .env`, `make dev`, ouvrir `/healthz`, lire la CI, ouvrir une PR de test pour voir le gabarit. Versions de Django et Python figées ici, à noter dans `DECISIONS.md`.

#### B00b. Skills de l'agent : Django, DRF, données sensibles et e-mails
- **Branche** : `feat/b00b-agent-skills` · **Taille** : moyenne · **Dépend de** : B00 · **Débloque** : **toutes les PR du backend**.
- **Objectif** : les interdits du projet se violent sans que rien ne plante (allergie dans une note, e-mail client dans Sentry, prospect conservé sans limite). Des skills qui se chargent au moment d'écrire le code sont le meilleur rempart, avant la revue.
- **Fonctionnalités et règles** : cinq skills dans `.claude/skills/<nom>/SKILL.md` (lecture de la section 6.5 à la place du chargement de skills, cf. Avant-propos).
  - **`django-drf`** : liste de contrôle opérationnelle issue des recommandations officielles. Django : réglages de production et de sécurité, ORM et gabarits (pas de SQL brut, `mark_safe` interdit sauf contenu de confiance), fichiers téléversés non fiables, `request.get_host()`, migrations réversibles. DRF : permission explicite sur **chaque** vue, authentification par groupe de routes, pagination et limitation de débit, `has_object_permission` qui ne couvre ni listes ni créations, sérialiseurs aux champs listés, logique métier dans `services.py`, `assertNumQueries` contre les N+1. **Référence opérationnelle unique** : la section 6.5 garde les principes et les sources, et pointe vers lui.
  - **`donnees-sensibles`** : se déclenche dès qu'une tâche touche un client, un e-mail, un journal ou une intégration ; reprend les interdits de la section 6.4 (aucune allergie, régime ou donnée de santé dans Django, ni champ, ni note, ni journal, ni PDF, ni Stripe ; prospects conservés pour une durée limitée ; aucun numéro de carte ; aucun secret dans journaux, erreurs ou fixtures ; aucune donnée personnelle dans Sentry ni dans une URL ; factures non numérotées par Django). Chaque interdit cite le test qui le vérifie.
  - **`emails`** : vouvoiement, signature de la cheffe, expéditeur et réponse sur l'adresse du domaine, aucun envoi marketing, pas de copie cachée, pas de SMS ni WhatsApp ; en test, envoi uniquement vers des adresses autorisées ; `EmailLog` sans le corps ; gabarits modifiables en administration avec aperçu et envoi de test ; relances soumises aux règles communes de 1.4 (une par client et par jour, jamais entre 21 h et 8 h, une ligne `FollowUp` par situation, trois niveaux de coupure).
  - **`tests`** : doctrine de test.
    - Pyramide : la logique vit dans `services.py` et se teste **sans HTTP** ; l'API se teste avec `APIClient` ; **trois parcours seulement** de bout en bout (B16 ouverture d'un dossier, B18 cycle du menu, B20 facturation).
    - Jamais simulés : la base (vrai PostgreSQL en CI) et l'arithmétique monétaire. Toujours simulés : Stripe, Brevo, GitHub, via leur `Protocol` et leur implémentation factice.
    - Cinq familles à écrire sans qu'on les redemande : **idempotence** (rejouer une tâche ne double rien), **concurrence** (numéro de devis, double soumission d'un dossier), **bornes** (frontières de dates : date limite de choix, créneaux d'envoi 8 h-21 h, seuil de 10 jours), **isolation** (un jeton n'atteint jamais le plan d'un autre), **nombre de requêtes**.
    - Les interdits de 6.4 sont des tests de non-régression ; fabriques `factory-boy` par modèle ; aucune donnée réelle de client dans une fixture ; la couverture de 10.3 est un plancher, pas un objectif.
  - **`revue-projet`** : liste de contrôle de revue backend, en complément de `/code-review` : interdits, bonnes pratiques, migrations lisibles et réversibles, et d'abord *cette PR enregistre-t-elle quelque chose qu'elle ne devrait pas ?*
- **Critères** : chaque skill se déclenche sur les tâches visées ; `donnees-sensibles` cite le test de chaque interdit ; aucun skill ne contient de secret, de prix ni de délai figé ; la section 6.5 ne duplique plus la liste opérationnelle.
- **Vous contrôlez** : demander à l'agent d'ajouter un champ à la fiche client et vérifier qu'il refuse d'y mettre une allergie en citant la règle.

#### B01. Authentification de l'équipe, thème Unfold et journal d'audit
- **Branche** : `feat/b01-staff-admin` · **Taille** : moyenne · **Dépend de** : B00 · **Débloque** : B02, B07, B15 · **Prérequis** : M8 (après la PR).
- **Objectif** : verrouiller l'accès à l'administration avant d'y mettre des données, et tracer chaque modification (qui, quoi, quand).
- **Fonctionnalités et règles**
  - `StaffUser` (extension de `AbstractUser`, créé dès le début). Connexion mot de passe + **2FA TOTP obligatoire en production** (pas de clé matérielle ; QR code à l'enrôlement, codes de secours imprimables), `django-axes` (blocage après 5 échecs), session de 8 h avec inactivité de 30 min, cookies `Secure` et `HttpOnly`.
  - Groupes `owner` (tout) et `assistant` (lecture et saisie, ni suppression ni export RGPD). **Un seul compte `owner` au départ** ; l'assistant est prévu, non créé. Commande `create_owner`.
  - Administration **Unfold** aux couleurs du site (`styles/tokens.css`, `public/assets/logo/table-et-tribu.svg`), **bandeau d'environnement** (local, test, production), menu latéral par domaine, utilisable sur téléphone, sous `ADMIN_URL_PREFIX` (préfixe non évident). Pas de restriction par IP par défaut ; si l'hébergement passe par Teads : #ask-devx (chemin approuvé) et #ask-security.
  - `AuditEvent` (qui, quoi, quand, objet, avant/après) avec utilitaire d'écriture ; `django-simple-history` sur les modèles sensibles et le contenu.
- **Critères** : pas d'accès à l'administration sans 2FA en configuration de production ; 5 échecs bloquent temporairement ; un `assistant` ne supprime rien ; une action écrit une ligne d'audit ; le bandeau affiche l'environnement.
- **Vous contrôlez** : créer le compte, activer le 2FA, rater 5 connexions, voir une ligne d'audit.

#### B02. Infrastructure transversale : tâches, e-mails, fichiers, intégrations factices
- **Branche** : `feat/b02-infra` · **Taille** : moyenne à grande · **Dépend de** : B01 · **Débloque** : B03, B05, B07, B12, B14, B16, B18, B22 · **Prérequis** : M4, M7 (pour un test réel).
- **Objectif** : installer une fois les briques communes (tâches planifiées, e-mails, fichiers, intégrations) avec des versions factices, pour tester sans jamais écrire à un vrai client.
- **Fonctionnalités et règles**
  - **Tâches** : Procrastinate (file adossée à PostgreSQL, pas de Redis) ; tâches idempotentes avec reprises exponentielles ; une tâche planifiée de démonstration.
  - **E-mail** : interface `Mailer` (Brevo par l'API ; console en développement ; **en test, envoi uniquement vers des adresses autorisées**). `EmailTemplate` modifiable en administration (variables autorisées, aperçu avec données d'exemple, envoi de test) et `EmailLog` (sans le corps). Vouvoiement, signature de la cheffe, expéditeur et réponse `contact@tabletribu.com`, pas de copie cachée, **aucun envoi marketing**, pas de SMS ni WhatsApp. Django n'envoie aucun e-mail à la cheffe (1.4) ; seul le site la prévient d'une nouvelle demande (S00). Les e-mails automatiques des PR suivantes sont actifs par défaut.
  - **Fichiers** : stockage compatible S3 hébergé dans l'UE, deux espaces : **public** (images du site, via CDN) et **privé** (devis, preuves, PDF, liens signés de courte durée). Type vérifié par le **contenu**, la taille et l'extension, sans antivirus.
  - **Intégrations** : interfaces `StripeGateway`, `Mailer`, `InvoicingProvider`, `GitHubDispatcher` chacune avec une implémentation **factice** utilisée en local et en test.
  - `/healthz` étendu (file de tâches, dernière exécution de la tâche planifiée).
- **Critères** : une tâche échouée est reprogrammée puis visible ; un e-mail de test part vers une adresse autorisée et pas vers une autre ; un fichier dont le type réel ne correspond pas est refusé ; les clients factices sont utilisés par défaut en test.
- **Vous contrôlez** : lancer le worker, déclencher la tâche, envoyer un e-mail de test, téléverser un fichier valide puis un faux.

#### B03. Contenu du site (CMS) : modèles et administration
- **Branche** : `feat/b03-content` · **Taille** : grande · **Dépend de** : B02 · **Débloque** : B04, B09, B10, B11, B13.
- **Objectif** : sortir des fichiers le contenu éditable du site (réalisations, inspirations, avis, FAQ, pages légales, coordonnées, zones) pour le modifier sans développeur. Brouillon par défaut ; rien n'est visible avant la publication (B14).
- **Fonctionnalités et règles** (modèles : section 8.1)
  - **Brouillon par défaut** ; seul le contenu publié sort par l'API ; ordre au glisser-déposer ; historique ; actions publier et dépublier ; filtres publié/brouillon et service.
  - **Images** : original stocké (variantes laissées à Next.js), 10 Mo au plus, `alt` obligatoire, dimensions extraites automatiquement. Lien interne : doit commencer par `/`.
  - **FAQ** : une seule collection avec un champ d'**emplacement multiple** (neuf emplacements : page FAQ en 5 rubriques et blocs des pages accueil, batch cooking, chef privé, cours, tarifs, zones, recettes, contact). 70 questions distinctes sont aujourd'hui recopiées en 118 exemplaires ; une question éditée une fois se répercute partout.
  - **Pages légales** : éditées dans Django, **versionnées**, anciennes versions conservées. Texte en **Markdown** (zone de texte avec aperçu, pas d'éditeur riche) ; français uniquement.
  - **`LegalIdentity`** (singleton, champs vides au départ, bandeau d'avertissement tant qu'elle est incomplète).
  - **Périmètre** : première moitié du contenu éditable (réalisations, inspirations, avis, FAQ, pages légales, coordonnées, identité légale, zones et communes) ; B04, B11 et B13 complètent ; les textes des e-mails viennent de B02.
- **Critères** : pas d'image sans `alt` ; un brouillon n'est jamais publié ; l'ordre se modifie au glisser-déposer ; un `assistant` ne supprime pas ; chaque modification est tracée.
- **Vous contrôlez** : créer un projet avec galerie, une inspiration, une FAQ de trois entrées, modifier les réglages, lire l'historique.

#### B04. Tarifs, packs, offres commerciales et marqueurs de prix
- **Branche** : `feat/b04-pricing` · **Taille** : moyenne · **Dépend de** : B03 · **Débloque** : B05, B07, B09, B10, B15, B16.
- **Objectif** : mettre la grille de prix et les offres commerciales dans l'administration (plus de prix dans le code ni dans des textes divergents), pour que le site se mette à jour partout à la publication suivante, et que la grille préremplisse le prix d'un engagement (B16). Un engagement existant garde son prix.
- **Fonctionnalités et règles** (modèles : section 8.3)
  - **Données initiales** reprenant `PRICES` du code, et **test de parité** avec `lib/lead/pricing.ts` pour toutes les combinaisons. Grille de référence : 39,50 € après crédit d'impôt pour 3 dîners au mois.
  - **Administration** : grille en tableau, offres en liste ordonnable.
  - Le prix d'un pack dépend **uniquement** du pack, de la formule et du nombre de dîners ; le sur mesure est toujours saisi à la main. Le site affiche le prix **après crédit avec le prix avant à côté**.
  - Packs : *Essentiel* = série Classiques ; *Signature* = Classiques + Signature ; *Sur mesure* = tout.
  - Chef privé et cours : prix **à la personne** (« à partir de 35 € » et « 45 € »), sans minimum de convives ; acompte du chef privé 30 %.
  - **Zones** : déplacement saisi en administration (zone 1 = 0, zone 2 supplément, zone 3 sur demande avec minimum de commande).
  - Service de calcul `price_before`, `price_after`, `from_price` identique à `lib/lead/pricing.ts`. **Marqueurs de prix** dans le Markdown (liste en 8.3) remplacés par l'API ; un marqueur inconnu est une erreur.
  - Changer un prix **n'affecte jamais** les engagements existants (avertissement dans l'administration).
  - **Offres commerciales** (`Offer`), créées par la cheffe : service visé, phrase d'accroche, paragraphe pour le devis, **fenêtre de campagne**, et au choix une remise en pourcentage, une remise fixe ou un prix forfaitaire. Une offre peut **préremplir** le formulaire de devis (pack, formule, dîners, portions, convives). Une offre est un habillage : elle ne change ni passages, ni menus, ni facturation, et reste attachée à l'engagement vendu.
  - **Quatre offres livrées en exemple**, inactives, à ajuster : *Post-partum*, *Senior*, *Anniversaire*, *Renouvellement*.
  - Une offre ne contourne jamais les garde-fous : le prix reste **figé dans l'engagement** à sa création ; une offre expirée disparaît du formulaire de devis, reste utilisable avec un motif, et l'action est journalisée.
  - **Une offre remplace le motif libre d'une remise** : si la remise vient d'une offre, l'offre est le motif, ce qui rend la remise dénombrable.
- **Critères** : prix identiques à ceux du site pour toutes les combinaisons ; un marqueur inconnu échoue ; aucun flottant dans les calculs monétaires (centimes) ; une offre à deux avantages tarifaires est refusée ; une remise d'offre donne le même montant que la même remise saisie à la main.
- **Vous contrôlez** : modifier un prix et vérifier le résultat ; essayer un marqueur inconnu ; créer une offre « Fête des mères » valable un mois et vérifier qu'elle disparaît du formulaire de devis après sa date de fin.

#### B05. CRM : contacts, deals et pipeline
- **Branche** : `feat/b05-crm` · **Taille** : grande · **Dépend de** : B02, B04 · **Débloque** : B06, B07, B15, B16, S01 · **Prérequis** : M13 (allergies et RGPD, avant toute saisie réelle).
- **Objectif** : Gérer les prospects dans l'administration, sans outil externe : une fiche par personne (contact), une affaire par demande (deal) et tout ce qui s'y rattache (notes, devis, historique). Aucune relance, aucune tâche, aucune automatisation : la cheffe change l'étape elle-même.
- **Fonctionnalités et règles** (modèles : 8.5)
  - **Contact** : prénom, nom, e-mail (unique, en minuscules), téléphone, adresse, commune et zone, taille du foyer, source. Un contact devient **client** à la création de son premier dossier (B16). Un même contact peut avoir plusieurs deals (renouvellement, chef privé, cours).
  - **Deal** : service, étape (Nouveau, Qualifié, Devis envoyé, Gagné, Perdu), montant estimé, offre éventuelle, détail de la demande (texte lisible), source, motif de perte (**obligatoire** pour Perdu). **Aucune étape ne change toute seule** (seul « Nouveau » est posé à l'arrivée d'une demande) ; chaque changement est historisé (qui, quand, de quelle étape à laquelle) et se corrige à la main.
  - **Notes** datées sur le contact et sur le deal (appel de qualification, échanges importants) ; aucune lecture de votre messagerie.
  - **Aucune donnée de santé** : ni champ, ni note. Les zones de notes affichent l'avertissement « aucune allergie ni donnée de santé ici » ; un test vérifie qu'aucun modèle ne porte ce type de champ.
  - **Doublons** : un e-mail = un contact ; une seconde demande avec le même e-mail ajoute un deal « Nouveau » à la fiche existante, sans écraser ses coordonnées (la différence est notée).
  - **Création manuelle** d'un contact et d'un deal (bouche-à-oreille, appel direct).
  - **Route d'intake** `POST /api/v1/leads` (9.2) : jeton serveur à serveur, validation, idempotente par identifiant de demande ; crée le contact, le deal « Nouveau » et sa note de détail. Seul le site (S01) l'appelle.
- **Critères** : une demande crée un contact et un deal « Nouveau » ; le même e-mail deux fois ne crée qu'un contact ; un deal ne passe pas à Perdu sans motif ; tout changement d'étape est historisé ; aucun modèle ne porte de champ de santé ; sans jeton, la route d'intake répond 401 ; rejouer le même identifiant de demande ne crée rien de plus.
- **Vous contrôlez** : créer un contact et un deal à la main, les faire passer d'étape en étape, vérifier que l'avertissement « aucune allergie » s'affiche dans les notes.

#### B06. Vue Pipeline et filtres
- **Branche** : `feat/b06-pipeline-view` · **Taille** : moyenne à grande · **Dépend de** : B05 · **Débloque** : B17.
- **Objectif** : Suivre ses prospects d'un coup d'œil et retrouver n'importe quel deal en deux clics. C'est la première étape de la routine du matin (1.5).
- **Fonctionnalités et règles** (contenu à l'écran : 1.6, « La vue Pipeline »)
  - **Colonnes** par étape avec glisser-déposer (demande le motif pour Perdu) et **liste** triable ; fiche du deal avec notes, devis rattachés et historique ; boutons « Faire un devis » (ajouté par B07) et « Ouvrir le dossier » (deal Gagné, ajouté par B16).
  - **Filtres** de 1.6, **au-dessus du tableau**, combinables ; **avant de les construire, montrer la liste proposée et demander à la cheffe** lesquels garder, ajouter ou retirer, avec compteur sur chacun ; **vues enregistrées** nommées. Seuils `lead_callback_hours` (24) et `quote_waiting_days` (7) dans `FollowUpSettings`.
  - **Recherche** par nom, e-mail, téléphone et texte des notes.
  - Un deal se déplace aussi par menu déroulant : le glisser-déposer n'est pas la seule voie (accessibilité, téléphone).
- **Critères** : chaque filtre renvoie exactement les deals décrits en 1.6 (un test par filtre) ; filtres combinés = intersection ; un compteur égale le nombre de lignes de sa liste ; glisser-déposer et menu donnent le même historique ; nombre de requêtes constant quelle que soit la taille de la liste.
- **Vous contrôlez** : créer une quinzaine de deals variés, appliquer chaque filtre, enregistrer une vue « Chef privé de Montpellier », déplacer un deal à Perdu avec et sans motif.

#### B07. Devis internes : éditeur, versions et PDF
- **Branche** : `feat/b07-quotes` · **Taille** : grande · **Dépend de** : B01, B02, B04, B05 · **Débloque** : B08 · **Prérequis** : M10 (comptable : mentions, TVA, éligibilité des lignes au crédit d'impôt).
- **Objectif** : Créer, modifier et finaliser un devis depuis le deal, entièrement dans l'administration, sans service externe. **Hors chemin critique** (1.2) : un deal passe à Gagné et un dossier se crée (B16) sans aucun devis dans l'outil ; un devis fait ailleurs s'importe en PDF.
- **Fonctionnalités et règles** (modèle : 8.4)
  - **Page A-Devis**, ouverte depuis la fiche d'un deal (« Faire un devis ») ; le service, le nom et la commune sont repris du deal. Trois **modèles de départ** (batch cooking, chef privé, cours) précréent les lignes et les textes.
  - **Lignes entièrement modifiables** : ajouter, supprimer, réordonner, changer libellé, quantité, prix et case « éligible au crédit d'impôt » (décochée par défaut **[À VÉRIFIER]**, M10). La grille et le service de calcul **proposent** des lignes et des totaux ; vous pouvez tout écraser.
  - **Calculs** : total avant crédit d'impôt, crédit, total après crédit, acompte de 30 % (chef privé), mis à jour en direct. **Forcer un total** est possible, avec un motif, tracé dans l'audit : le calcul est une suggestion, jamais une contrainte.
  - **Offre (facultative)** : la choisir préremplit ses champs et applique son avantage sur une ligne à part (« Offre Post-partum : −15 % ») ; tout reste modifiable, l'offre reste attachée au devis. Une **remise** exige un motif, **sauf si elle vient d'une offre** (l'offre est le motif).
  - **Textes libres** en Markdown (introduction, conditions, remarques) et **blocs réutilisables** modifiables en administration (en-tête, mentions, conditions d'annulation du service : texte des CGV, à aligner : M19).
  - **Brouillon puis version finalisée** : un brouillon se modifie librement et n'a pas de numéro. **« Finaliser »** attribue le numéro `DEV-AAAA-NNN` (le premier libre, jamais réattribué, un trou est sans conséquence), fige la version, génère le **PDF** (WeasyPrint, aux couleurs du site, version des CGV et phrase d'acceptation incluses) et le range sur le deal. Modifier ensuite crée une **nouvelle version** du même numéro ; les anciennes restent consultables.
  - **Import** : un PDF fait ailleurs se rattache au deal (référence saisie ou numéro attribué), sans passer par l'éditeur.
  - **Envoi** : vous téléchargez le PDF et l'envoyez depuis votre messagerie ; l'éditeur propose un **texte d'e-mail à copier**. Django n'envoie rien à un prospect (1.4). Passer le deal à « Devis envoyé » reste un geste de votre part.
  - **Bandeau d'avertissement** tant que `LegalIdentity` est incomplète.
  - Aucune donnée de santé dans un devis (6.4).
- **Critères** : montants proposés identiques à la grille et au site pour toutes les combinaisons ; un total forcé sans motif est refusé et tracé ; une version finalisée n'est plus modifiable (une nouvelle version est créée) ; deux finalisations en parallèle n'ont jamais le même numéro (test de concurrence) ; le PDF porte numéro, version des CGV et mentions légales ; un PDF importé se rattache au deal ; **créer un dossier sans aucun devis reste possible** ; une remise sans motif est refusée.
- **Vous contrôlez** : produire un devis de chaque type, modifier librement lignes et textes, finaliser, créer une version 2, vérifier les totaux à la main une fois par type, importer un PDF, ouvrir le dossier sans devis.

#### B08. Lien d'acceptation du devis (facultatif)
- **Branche** : `feat/b08-quote-acceptance` · **Taille** : petite · **Dépend de** : B07, B12 · **Débloque** : rien. **Facultative** : peut être livrée en dernier ou jamais ; rien ne dépend d'elle.
- **Objectif** : Permettre au client d'accepter un devis d'un clic, en plus de l'e-mail « bon pour accord ». L'e-mail reste valable, et **l'acceptation ne déplace jamais le deal**.
- **Fonctionnalités et règles**
  - Sur une version finalisée, le bouton **« Créer un lien d'acceptation »** produit une URL signée à **usage unique** (jeton aléatoire stocké haché), à coller dans votre e-mail. Pas de compte client.
  - **Page publique** : référence, lignes, totaux, conditions, PDF téléchargeable, et un bouton **« J'accepte ce devis et les conditions générales de vente »** avec saisie du nom. Aucune coordonnée ni donnée de santé n'est exposée.
  - **À l'acceptation** : date, heure, version et nom saisi sont enregistrés ; la fiche du deal affiche **« Accepté en ligne le … »**. Rien d'autre ne change : vous passez le deal à Gagné vous-même (1.3 étape 6). La valeur juridique de ce clic est à valider **[À VÉRIFIER]**.
  - Le lien **expire** à la fin de la validité du devis ; une nouvelle version **invalide** le lien de l'ancienne ; un lien déjà utilisé affiche l'acceptation enregistrée.
  - Panne ou lien désactivé : le circuit par e-mail continue de fonctionner (1.2).
- **Critères** : un lien ne s'utilise qu'une fois ; un lien périmé ou d'une version remplacée refuse l'acceptation ; l'acceptation n'écrit rien d'autre que ses quatre champs ; le deal ne change pas d'étape ; la page n'expose aucune coordonnée.
- **Vous contrôlez** : créer un lien, l'ouvrir sur téléphone, accepter, vérifier le badge sur le deal, rouvrir le lien, puis créer une version 2 et vérifier que l'ancien lien ne marche plus.


#### B09. API de lecture pour le site (construction)
- **Branche** : `feat/b09-read-api` · **Taille** : moyenne · **Dépend de** : B03, B04 · **Débloque** : B10, B11, B14, S02.
- **Objectif** : Exposer les contenus publiés (réalisations, avis, FAQ, zones, tarifs, recettes) sous la forme exacte que le site attend, pour qu'il les lise à sa construction. Aucune page publique n'appelle Django à l'exécution (1.2).
- **Fonctionnalités et règles** : routes de la section 9.1 ; jeton `Bearer` en lecture seule (`BUILD_API_TOKEN`, comparaison en temps constant) ; clés en camelCase **identiques aux schémas Zod** du site ; contenu **publié** seulement ; `updatedAt` par objet, ETag ; URL d'images absolues ; marqueurs de prix déjà remplacés ; schéma OpenAPI.
- **Critères** : sans jeton, 401 ; un brouillon n'apparaît jamais ; chaque réponse correspond au schéma Zod ; ETag renvoie 304 si rien n'a changé.
- **Vous contrôlez** : appeler les routes avec `curl` et le jeton local, publier puis dépublier un contenu.

#### B10. Import des contenus existants du site
- **Branche** : `feat/b10-imports` · **Taille** : moyenne · **Dépend de** : B03, B04, B09 · **Débloque** : B11, S02 · **Prérequis** : M9 (arbitrage des variantes de FAQ, après l'import).
- **Objectif** : Charger le contenu existant du site (9 réalisations, inspirations, FAQ, avis, pages légales, zones, prix, 5 recettes) dans l'administration sans ressaisie, et prouver que Django sert des données identiques à celles du site actuel. Import relançable sans doublon.
- **Fonctionnalités et règles** : commandes idempotentes avec `--dry-run` et `--site-path` : `import_projects`, `import_inspirations`, `import_pages`, `import_faq`, `import_reviews`, `import_zones`, `import_pricing`, `import_site_settings` ; images copiées vers le stockage ; photos d'avis (associées par index aujourd'hui) devenues un champ.
  - **Sources** : réalisations, inspirations, pages légales dans `content/` ; prix, packs, zones, communes, recettes dans `lib/*.ts` ; **FAQ dans `messages/fr.json`** (`content/faq/` est vide).
  - **`import_faq`** lit neuf emplacements : `faqPage.sections[].items[]` (52) et les blocs `faq.items[]` de accueil (10), batch cooking (14), chef privé (10), cours (10), tarifs (8), zones (5), recettes (5), contact (4). Dédoublonnage par question : 118 exemplaires pour 70 questions, chacune avec la liste de ses emplacements.
  - **Treize questions ont des réponses différentes selon la page** : l'import ne tranche pas ; il écrit la version de la page FAQ, marque l'entrée « à relire » et produit un rapport des variantes écartées, arbitré à l'étape M9.
- **Critères** : deux imports successifs donnent le même résultat ; `--dry-run` n'écrit rien ; la sortie de l'API est identique aux données d'origine pour chaque collection ; **chaque import crée au moins un objet, sinon il échoue** (vide égale vide au contrôle de parité) ; comptes vérifiés : 9 réalisations, 9 inspirations, 70 questions, 5 recettes, 3 zones. La FAQ cite encore « 49,50 € » : l'import la conserve (correction par marqueurs = décision de contenu ultérieure).
- **Vous contrôlez** : importer sur une base vide, parcourir l'administration, comparer quelques fiches avec le site.

#### B11. Blocs vendeurs des pages dans le CMS
- **Branche** : `feat/b11-page-blocks` · **Taille** : moyenne · **Dépend de** : B03, B09, B10 · **Débloque** : S02.
- **Objectif** : Rendre éditables dans l'administration les ~9 000 mots de prose des pages qui vendent (accueil, batch cooking, chef privé, cours, tarifs, zones), sans toucher aux libellés d'interface qui commandent le comportement des composants.
- **Principe** : le site charge tous ses textes via `lib/i18n.ts`. L'API renvoie un **calque** (objet de même forme que `messages/fr.json`, limité aux clés éditées) que la construction superpose au fichier : aucun composant modifié, clés non migrées inchangées, parité = égalité d'objets.
- **Fonctionnalités et règles** (modèles : 8.1)
  - **`PageBlock`** : une ligne par page + section (ex. `batchPage.audience`) avec `kicker`, `title`, `body` (Markdown), `seo_title`, `seo_description` ; `PageBlockItem` pour les listes d'arguments (`title`, `body`, `order`). Brouillon/publication (B03), historique, aperçu Markdown.
  - **Éditable** : champs rédactionnels (`kicker`, `title`, `intro`, `body`, `note`, `description`, `excerpt`, `items` des argumentaires) et `seo.title` / `seo.description` de chaque page. **Non éditable** : tout ce qui pilote un comportement (appels à l'action, bascules, précédent/suivant, filtres, compteurs, unités, états vides, messages de formulaire).
  - **Garde-fou** : une clé ne peut être ni créée ni renommée, seulement modifiée ; le calque ne contient que des clés de `messages/fr.json`. Un bloc vidé revient à la valeur du fichier.
  - **`import_page_blocks`** (idempotente, `--dry-run`, `--site-path`) : **319 chaînes de prose**, en ignorant les 1 231 libellés.
  - **Route** `GET /api/v1/content/page-texts` : calque, `updatedAt`, ETag, contenu publié seulement, marqueurs de prix remplacés (8.3).
- **Critères** : aucune clé absente de `messages/fr.json` dans le calque ; sans édition, le fichier fusionné est identique à l'original (égalité profonde) ; un bloc dépublié revient à la valeur du fichier ; aucun libellé exposé ; `import_page_blocks` crée au moins un objet.
- **Vous contrôlez** : modifier l'accroche de la page batch cooking et le titre SEO de l'accueil, publier, retrouver les textes sur le site de test (palier 4).

#### B12. Déploiement de l'environnement de test
- **Branche** : `feat/b12-deploy-test` · **Taille** : moyenne · **Dépend de** : B02, **décision M5** · **Débloque** : B08, B25, S01, S02, S03 · **Prérequis** : M5, M6, secrets de l'environnement `test`.
- **Objectif** : Mettre le backend en ligne pour l'environnement de test, afin que la cheffe essaie l'administration depuis son navigateur, avec sauvegardes quotidiennes. **Bloquant** : attend la décision d'hébergement (M5, et si Teads : #ask-devx et #ask-security) ; sinon le développement continue en local.
- **Fonctionnalités et règles** : `Dockerfile` de production ; migrations contrôlées ; `/healthz` ; variables de la section 10 ; **sauvegardes quotidiennes** (30 jours) ; journaux sans donnée personnelle ; domaine de test (hypothèse `api.test.tabletribu.com`), TLS ; administration sous `ADMIN_URL_PREFIX` ; déploiement vers `test` sur `main` (environnement GitHub `test`) ; hébergement dans l'UE ; fichiers génériques, sans hypothèse sur l'hébergeur. Livre `docs/DEPLOY.md` (déploiement, restauration, rotation des secrets).
- **Critères** : le conteneur démarre avec les variables d'un environnement vierge ; `/healthz` répond ; l'administration n'est joignable que sous son préfixe ; un déploiement s'exécute depuis GitHub.
- **Vous contrôlez** : ouvrir `/healthz`, vous connecter à l'administration sous son préfixe, lancer un déploiement, puis **demander une restauration de sauvegarde** (une sauvegarde jamais restaurée ne compte pas).

#### B13. Catalogue de recettes et ingrédients
- **Branche** : `feat/b13-catalog` · **Taille** : grande · **Dépend de** : B03 · **Débloque** : B18.
- **Objectif** : Créer le catalogue (recettes, ingrédients, quantités pour 4 personnes, allergènes) qui alimente la liste de recettes prédéfinie du lien de choix (1.3 étape 9) et la liste d'ingrédients (étape 11), à partir des 5 recettes actuelles. Une recette n'est proposée aux clients que si ses quantités sont complètes.
- **Fonctionnalités et règles** (modèles : 8.2)
  - 14 allergènes UE, mêmes clés que `lib/recipes.ts`. **Allergènes d'une recette = union de ceux de ses ingrédients** + champ manuel pour les traces ; affichés au client sur la recette et chaque ingrédient.
  - **4 portions de référence**, quantités proportionnelles ; **aucun ingrédient exclu** des listes (sel, huile, base compris) ; prix des ingrédients : niveau 1 à 4 ; pas de gestion de substitutions ; saison **indicative**.
  - **Quantités saisies par la cheffe** ; une recette **ne peut pas être « disponible pour les clients »** tant qu'une quantité manque. Les quantités ne sortent **jamais** par l'API publique ni par la page de choix (8.2) ; les clients voient ingrédients et allergènes.
  - Administration : ingrédients en ligne, allergènes calculés en lecture seule, fusion de doublons, commande `import_recipes` depuis `lib/recipes.ts`.
- **Critères** : l'allergène d'un ingrédient apparaît sur la recette ; l'API ne renvoie aucune quantité ; l'activation « disponible » est refusée s'il manque une quantité.
- **Vous contrôlez** : importer les 5 recettes, ajouter leurs ingrédients, tenter d'activer sans quantité, lire l'API.

#### B14. Publication du site depuis l'administration
- **Branche** : `feat/b14-publish` · **Taille** : moyenne · **Dépend de** : B02, B09 · **Débloque** : S03 · **Prérequis** : M11 (pour le test réel).
- **Objectif** : Un bouton « Publier » reconstruit le site sans développeur (1.3 étape 1), avec statut et historique ; aucun doublon en cas de clics répétés, et un échec laisse en ligne le site précédent.
- **Fonctionnalités et règles** : page **A-Publier**. Bouton **Publier** : crée un `PublishRun`, **regroupe** les clics rapprochés (délai de 2 minutes, un seul appel), appelle `repository_dispatch` du dépôt `chefmeemz` (type `content-updated`, jeton à portée minimale), suit le statut via l'API GitHub (en attente, en cours, en ligne, échec, lien vers l'exécution), désactive le bouton pendant une construction, affiche l'historique et le nombre de modifications non publiées par collection ; action journalisée.
- **Critères** : 5 clics en 10 secondes = un seul appel ; un échec de GitHub est affiché et reprogrammé.
- **Vous contrôlez** : cliquer plusieurs fois, lire l'historique, simuler un échec.

#### B15. Clients, engagements, passages et réservations
- **Branche** : `feat/b15-clients-engagements` · **Taille** : grande · **Dépend de** : B01, B04, B05 · **Débloque** : B16, B17, B18, B20, B21, B22, B23.
- **Objectif** : Créer le cœur du suivi dans l'administration : fiche client, engagements, passages (cycle d'une semaine, 1.3) et réservations de chef privé et de cours. Report et annulation restent à la main de la cheffe, sans règle de montant automatique.
- **Fonctionnalités et règles** (modèles : 8.4, 8.6 et 8.7)
  - **Client** : lié à un **contact** (B05) qui porte prénom, nom, e-mail, téléphone et adresse ; compte URSSAF prêt ; **statut Actif / Inactif calculé** (Actif tant qu'un engagement a des passages non clôturés, jamais saisi). Le client est créé à l'ouverture du premier dossier (B16). Pas de profil alimentaire ; les allergies restent hors de l'outil (1.2).
  - **Fiche client** (une seule page) : identité (celle du contact), deals et devis, engagements et passages, pièces du devis (téléchargement protégé), plans de repas et choix, factures et statut URSSAF (liens), paiements, audit ; recherche par nom ou e-mail. Actions : **mettre à jour l'e-mail** (motif ; modifie le contact ; invalide les liens de choix en cours), désactiver, exporter et anonymiser (`owner`).
  - **Engagement** : `upcoming` → `active` (à la première date) → `completed` (tous les passages terminés ou annulés) ; `cancelled` par la cheffe. Prix, taux de crédit et pièces du devis figés ; prix différent de la grille = motif obligatoire. Un seul engagement actif par période (chevauchement signalé, dérogation possible).
  - **Passage** : `to_date` → `scheduled` → `menu_sent` → `menu_ready` → `done` → `invoiced` → `closed` ; `cancelled` hors cycle (statuts : 1.3). `menu_sent` et `menu_ready` suivent le plan de repas (B18), `invoiced` et `closed` la facture (B20). Transitions par **services** (jamais de champ modifié directement) ; **tout statut est corrigeable à la main**, avec motif et audit.
  - **Dates** : durée libre, une date-heure par passage ; les 4 passages d'un mois tiennent dans une **fenêtre de 6 semaines** à compter du premier. La cheffe crée les passages « À dater », puis les date d'un coup avec l'**aide à la saisie récurrente** (« tous les mardis à 18 h pendant N semaines »), chaque date restant modifiable.
  - **Passages créés / prévus** : pour chaque client Actif, passages créés (hors annulés) sur `sessions_total` ; tant que c'est inférieur, le client est dans le filtre « À planifier » (compteur du tableau de bord : B17).
  - **Report** (étape 12) : change la date ; statut, lien de choix et menu validé sont conservés, l'ancienne date est gardée dans l'historique. **Annulation** : statut `cancelled`, motif obligatoire, indicateur `billable` et prix décidés par la cheffe, **aucune règle de montant** ; le passage sort des passages créés (le filtre « À planifier » se rouvre) et peut être replanifié (nouveau passage « À dater »). Action journalisée ; le client reçoit la confirmation par e-mail.
  - **Réservations** (`Booking`, chef privé et cours) : chef privé = acompte de 30 %, date confirmée après paiement (B21), solde le soir ; cours = sans acompte. Conditions d'annulation (ex. chef privé : sans frais plus de 7 jours avant, sinon acompte conservé ; cours : sans frais jusqu'à 48 h) = **texte informatif** repris du devis (`cancellation_policy`) ; la cheffe choisit le statut d'annulation et le montant à la main. Écran : réservations à venir, acomptes en attente. **Pas de cycle de statuts de semaine ni de lien de choix** pour le chef privé et les cours.
- **Critères** :
  - Une transition interdite lève une erreur ; un statut se corrige à la main avec trace d'audit.
  - Un report conserve statut, lien et menu.
  - Un passage annulé sort de « passages créés », et aucun montant n'est calculé automatiquement.
  - Le statut Actif / Inactif suit les passages non clôturés.
  - Les prix d'un engagement ne changent pas quand la grille change.
  - Une référence de devis déjà utilisée est refusée, le devis restant facultatif.
  - Aucun champ ne porte d'allergie.
- **Vous contrôlez** : créer un client et un engagement, planifier, reporter puis annuler un passage, voir le compteur 2/4 changer, modifier un prix de grille, changer l'e-mail d'un client.

#### B16. Créer un client et un engagement depuis un deal gagné (page A-Dossier)
- **Branche** : `feat/b16-create-from-deal` · **Taille** : moyenne à grande · **Dépend de** : B02, B04, B05, B15 · **Débloque** : B17, B23 · **Prérequis** : M4 (e-mails).
- **Objectif** : Transformer un deal « Gagné » (accord reçu par e-mail) en client Actif avec son engagement et ses passages, en quelques minutes et sans ressaisie. Un renouvellement ajoute un engagement à un client existant, sans devis obligatoire.
- **Le devis** : créé depuis A-Devis (B07) ou importé en PDF, **rattaché au deal**, envoyé par vous depuis votre messagerie ; l'acceptation vient d'un e-mail ou du lien facultatif (B08). Retenir : référence unique `DEV-AAAA-NNN`, validité de 30 jours, version des CGV, accord **par e-mail seulement** (ni SMS ni oral) via « En répondant "bon pour accord", vous acceptez ce devis et nos conditions générales de vente ».
- **Fonctionnalités et règles** : page **A-Dossier** unique (1.3 étape 7), ouverte par « Ouvrir le dossier » sur un deal Gagné, quatre blocs affichés ensemble, récapitulatif mis à jour en direct.
  1. **Client** : prénom, nom, e-mail, téléphone et adresse repris du **contact** du deal, modifiables ; ou choix d'un client existant (renouvellement ou second service). Un e-mail déjà connu rattache au client trouvé, sans doublon.
  2. **Prestation** : *batch* = offre (si elle s'applique), pack, formule, dîners, passages (1, 4 ou saisi), **portions par passage** (défaut 4), date de début, **prix par passage avant crédit** prérempli depuis la grille (**motif obligatoire** si modifié), envoi automatique du lien de choix (selon le réglage global, activé ou désactivé pour ce client) ; *chef privé ou cours* = date, convives, total, acompte prérempli à 30 % (chef privé), notes de menu.
  3. **Pièces** (facultatives, bloc replié) : le **devis du deal** (déjà rattaché, on choisit la version acceptée), e-mail d'accord (`.eml`, PDF, image ou texte), date d'accord, version des CGV (préremplie), note de source libre. **Un devis n'est jamais obligatoire** : seul un avertissement non bloquant « aucune pièce jointe » s'affiche. Fichiers privés, type vérifié par le contenu, 10 Mo au plus.
  4. **Récapitulatif** : montants avant et après crédit ; case « envoyer l'e-mail de bienvenue » (nouveau client) ou « de nouvel engagement » (client existant). Pas d'invitation : le client reçoit un lien de choix à chaque passage. La fiche client est créée aussi pour le chef privé et les cours (réservation, acompte, facture, avis).
  - **À la création** (transaction atomique) : `Client` si nouveau (**Actif**), engagement et passages **À dater** (ou réservation) liés au deal, note « dossier créé » sur le deal, audit ; puis e-mail choisi. Une double soumission est sans effet. Le deal reste **Gagné**.
- **Critères** :
  - Client, engagement et passages sont créés en une transaction (un échec ne crée rien) ; le client créé est Actif.
  - Création possible sans aucune pièce de devis, et seulement depuis un deal Gagné ou un client existant.
  - Un second engagement ne crée aucun doublon ; référence ou e-mail déjà utilisé : refusé ou rattaché sans doublon.
  - Prix modifié sans motif refusé.
  - E-mail de bienvenue ou de nouvel engagement envoyé seulement si la case est cochée.
- **Vous contrôlez** : ouvrir le dossier depuis un deal Gagné de test (coordonnées reprises) ; créer un engagement d'un mois (4 passages non datés) puis un second au même client ; vérifier le devis rattaché et la note « dossier créé » sur le deal.

#### B17. Suivi : tableau de bord, vues, filtres et flux iCal
- **Branche** : `feat/b17-followups` · **Taille** : grande · **Dépend de** : B06, B15, B16 · **Débloque** : B18, B20, B22
- **Objectif** : Rendre visible ce qui demande l'attention de la cheffe sans lui envoyer aucune notification : tableau de bord à six compteurs, vues Clients et Semaines filtrables, page Indicateurs, registre des e-mails automatiques aux clients, flux iCal. Contenu à l'écran : 1.5 à 1.7.
- **Fonctionnalités et règles** (modèles : 8.12)
  - **Tableau de bord** (accueil de l'administration) : les **six compteurs** de 1.6, chacun lien vers sa liste filtrée, calculés à l'ouverture, un compteur à zéro restant affiché en grisé. Fenêtres réglables : `dashboard_window_days` (7 j, compteurs « Liens de choix à envoyer » et « Mes semaines à préparer ») et `renewal_window_days` (10 j, « Engagements bientôt terminés »). Avec l'envoi automatique du lien activé, « Liens de choix à envoyer » ne montre plus que les cas où cet envoi est coupé ou en échec. Le bandeau affiche « N relances désactivées » et la suspension globale.
  - **Vue Clients** : colonnes, tri, recherche et filtres de 1.6 (**à confirmer avec la cheffe avant de les construire** ; proposition : Actif / Inactif, À planifier, Lien à envoyer, Fin d'engagement proche, Compte URSSAF non prêt sans compteur, statut de semaine), au-dessus du tableau, avec compteur sur chaque filtre.
  - **Vue Semaines** : colonnes, tri, filtres et définition du **« en retard »** de 1.6 ; actions groupées reporter, annuler avec motif, marquer réalisée (l'envoi groupé du lien de choix est ajouté par B18) ; correction manuelle de statut, date et date limite, avec audit.
  - **Renouvellement** (fiche client, filtre « Fin d'engagement proche », 1.3 étape 18) :
    - **« Créer un deal de renouvellement »** : crée sur le contact un deal « Nouveau » nommé « Renouvellement — prénom nom », lié à l'engagement terminé, **idempotent** (`renewal_deal_created_at` affiché, bouton « Deal déjà créé »). Il n'est jamais déplacé par le système.
    - **« Pas de renouvellement »** : motif court (`renewal_declined_reason`, horodaté), sort le client du compteur.
    - Les deux actions sont journalisées et n'envoient aucun e-mail.
  - **Page Indicateurs** (1.7) : liée depuis les trois chiffres du mois sous les compteurs ; sélecteur de mois, six derniers mois, clic sur un chiffre = liste des clients, export CSV. Calcul à la demande (historique `django-simple-history`, `InvoiceRecord`, engagements), sans table dédiée, deals compris (demandes, conversion). Le chiffre d'affaires ne se calcule qu'une fois B20 livrée (nul avant).
  - **Registre `FollowUp`** (e-mails au client uniquement, jamais saisi à la main) : une tâche **horaire** idempotente compare l'état réel aux règles de 1.4, crée la ligne, envoie l'e-mail (`EmailLog`) et **clôt la ligne** quand la situation est résolue. Une situation = une ligne ; limites de 1.4 (un e-mail par client et par jour, jamais entre 21 h et 8 h). Chaque PR déclare ses e-mails : B18 (suivi du menu, rappel de passage), B22 (avis).
  - **Liste « Relances »** : filtres par type, statut, client ; actions groupées reporter, annuler, envoyer maintenant, suspendre les relances d'un client.
  - **Réglage des relances** (`FollowUpRule` en tableau + `FollowUpSettings`) : actif, délai, nombre d'envois, modèle ; coupure **globale** (bandeau permanent tant qu'elle est active), **par type**, **par client** (`Client.automatic_emails_enabled`). Les e-mails du service (lien de choix, liste d'ingrédients) n'y figurent pas. Chaque changement est journalisé.
  - **Chronologie** des e-mails automatiques envoyés, sur chaque fiche (client, engagement, passage, plan de repas, facture, réservation).
  - **Flux iCal** : `GET /ical/<jeton>.ics`, lecture seule, `ICAL_FEED_TOKEN` (comparaison en temps constant, rotation par changement de variable), passages datés des 12 prochains mois, titre « Passage : prénom », sans adresse ni donnée de santé, identifiant d'événement stable. À confirmer : l'agenda est Google Agenda.
- **Critères** :
  - Une situation ne crée jamais deux lignes ni deux e-mails.
  - **Aucun e-mail ni alerte à la cheffe** (test).
  - Chaque compteur est égal au nombre de lignes de sa liste filtrée.
  - Un client sort de « À planifier » dès créés = prévus.
  - Un client entre dans « Engagements bientôt terminés » quand le dernier passage non annulé tombe dans la fenêtre, et en sort au nouvel engagement ou à « Pas de renouvellement ».
  - « Créer un deal de renouvellement » ne crée jamais deux deals et n'écrit que le nom et le rattachement.
  - Les indicateurs sont cohérents avec leurs listes et se recalculent à l'identique depuis les historiques d'étapes.
  - Chaque filtre de statut ne renvoie que les lignes concernées.
  - Relance désactivée = non envoyée ; au plus un e-mail par client et par jour, jamais entre 21 h et 8 h.
  - Requêtes en nombre constant ; mauvais jeton iCal = 404 ; aucune donnée de santé dans le registre ni le flux.
- **Vous contrôlez** : créer 2 passages sur 4 et voir « Clients à planifier » monter (2/4), puis disparaître ; dater le dernier passage dans les 10 jours, voir « Engagements bientôt terminés » monter, créer le deal de renouvellement (un second clic n'en crée pas), puis le nouvel engagement ; tester « Pas de renouvellement » ; recouper un mois sur la page Indicateurs ; filtrer par chaque statut ; couper une relance client ; s'abonner au flux dans Google Agenda.

#### B18. Menus par passage : choix par le client, validation et listes d'ingrédients
- **Branche** : `feat/b18-meal-plans` · **Taille** : grande · **Dépend de** : B02, B13, B15, B17 · **Débloque** : B19 · **Prérequis** : M4 (e-mails).
- **Objectif** : Remplacer les échanges d'e-mails et de SMS sur le menu. Le menu appartient au **passage** (un mois = quatre menus indépendants) ; la cheffe ne compose rien : le client reçoit un lien avec une liste de recettes prédéfinie, la garde ou la modifie, valide, et reçoit un PDF unique (menu retenu + liste d'ingrédients). Sans réponse, la cheffe valide la liste d'un clic : rien ne bloque.
- **Fonctionnalités et règles** (modèles : 8.8 ; process : 1.3 étapes 9 à 11)
  - **États du plan de repas**, reportés sur le statut du passage : **envoyé** (Menu envoyé) → **validé** (par le lien, par e-mail ou par la cheffe ; Menu prêt) → **préparé** (PDF produit) ; **à revoir** quand le client demande un changement : réouverture, nouveau lien.
  - **Envoyer le lien de choix** : bouton sur un passage **Planifiée** ; crée le plan avec sa liste prédéfinie, génère le lien, envoie l'e-mail, passe à **Menu envoyé**. Lien copiable (SMS, WhatsApp) ; **envoi en lot** depuis la vue Semaines (B17). **Date limite** par défaut 2 jours avant le passage (`menu_deadline_days`), modifiable par passage.
  - **Envoi automatique (option, désactivée par défaut)** : si `auto_menu_link` est activée, la tâche planifiée envoie le lien `auto_menu_link_days` jours avant (7 par défaut) pour chaque passage Planifiée sans lien, même liste, même e-mail, passage à Menu envoyé. Réglage global (`FollowUpSettings`), forçable ou coupable par engagement ; un passage planifié à moins de 7 jours reçoit son lien à la prochaine exécution, jamais entre 21 h et 8 h ; ignore les passages annulés ou déjà envoyés à la main ; arrêté par la suspension globale ; un report après envoi ne renvoie rien. Envois journalisés (`validation_source`, audit). Le bouton manuel reste toujours disponible.
  - **Liste prédéfinie** : `quota` recettes des séries autorisées du pack, **en évitant celles des deux derniers passages du client** (`chosen_by = default`) ; modifiable par la cheffe avant l'envoi, par le client dans la limite du quota. Quota = nombre de dîners (3, 4 ou 5), un dîner = une recette ; portions = `Engagement.servings`.
  - **Validation** : par le lien (B19), **hors ligne** (bouton « Validé par le client », date et e-mail en pièce facultative, `validation_source = email`), ou **par la cheffe d'un clic** à la date limite (`staff`) ; jamais automatique.
  - **Allergènes** : affichés sur chaque recette et ingrédient, page et PDF. Aucun blocage automatique : le client choisit sous sa responsabilité (son accord écrit vaut confirmation). La cheffe relit chaque menu validé avec sa note d'allergies (hors de l'outil) et le marque **« relu »** (`reviewed_at`) ; non relu, il passe **en retard 48 h avant le passage** (colonne « relu » de la vue Semaines), sans notification.
  - **PDF unique** (WeasyPrint) à la validation, envoyé au client : menu retenu (plats, descriptions, allergènes) puis liste d'ingrédients par rayon. La fiche de préparation de la cheffe est produite à part, dans tous les cas. Régénération idempotente.
  - **Liste d'ingrédients** : quantités × portions / portions de référence, agrégées par ingrédient, conversion g↔kg et ml↔l, unités incompatibles non fusionnées, arrondi (pièces à l'unité supérieure, poids au 5 g), aucun ingrédient exclu. Mode de courses par engagement (défaut : la cheffe).
  - **Courses facturées au réel** : montant et justificatifs saisis après le passage, ligne non éligible au crédit d'impôt (B20), avertissement au-delà de +20 % de l'estimation.
  - **E-mails automatiques au client** (1.4) : **suivi du menu non rempli, 3 au plus, un tous les 2 jours** (J+2, J+4, J+6), chacun rappelant la date limite avec le lien ; arrêt à la validation, à l'annulation ou au passage ; les 3 envois faits, le client reste dans le filtre « Menu envoyé » et la cheffe l'appelle. Un report déplace la date limite sans remettre le compte à zéro. **Rappel de passage 24 h avant**. Nombre d'envois et intervalle réglables dans `FollowUpRule`. Aucune notification à la cheffe.
  - **Actions d'administration** : envoyer le lien (un ou lot), copier le lien, choisir ou valider à la place du client, marquer « relu », rouvrir, régénérer le PDF. **Gabarits** : lien de choix ; menu validé avec la liste.
- **Critères** :
  - Une validation hors quota ou hors pack est refusée ; le PDF régénéré est identique.
  - Une réouverture crée un nouveau lien et invalide le précédent.
  - Envoi du lien (manuel ou automatique) = Menu envoyé ; validation = Menu prêt.
  - L'envoi automatique est désactivé par défaut, ne concerne que les passages Planifiée à `auto_menu_link_days` jours ou moins, ne part jamais entre 21 h et 8 h, ne renvoie jamais un lien déjà envoyé et respecte la suspension globale.
  - Date limite par défaut 2 jours, modifiable.
  - La liste prédéfinie évite les recettes des deux derniers passages.
  - Au plus 3 e-mails de suivi, un tous les 2 jours, aucun après validation, annulation ou passage.
  - Un menu non validé à l'échéance reste dans « Menu envoyé » et ne se valide jamais seul.
  - Aucune donnée de santé dans le plan.
- **Vous contrôlez** : créer un engagement d'un mois, dater les passages, envoyer le lien, vérifier la liste prédéfinie reçue, remplacer une recette, valider, contrôler à la main les quantités du PDF, rouvrir pour un second choix, changer une date limite.

#### B19. Page de choix du menu (lien à usage unique)
- **Branche** : `feat/b19-menu-choice-page` · **Taille** : petite à moyenne · **Dépend de** : B18 · **Débloque** : rien.
- **Objectif** : Laisser le client choisir ses recettes **sans compte** : il ouvre son lien, voit la liste prédéfinie avec les allergènes, remplace ce qu'il ne veut pas, valide. La validation est enregistrée, datée et tracée.
- **Fonctionnalités et règles** (accès : section 7)
  - **Page servie par Django**, aux couleurs du site (`styles/tokens.css`), **sans compte, session ni cookie d'authentification**.
  - **Jeton** aléatoire de 32 octets, **stocké haché**, lié à un seul plan de repas, valable jusqu'à la date limite, **invalidé après validation** et à chaque nouvelle version du plan. Comparaison en temps constant, limitation de débit par IP, `noindex` et `Referrer-Policy: no-referrer`.
  - **Expose** : prénom, date du passage, quota, **liste prédéfinie** et recettes disponibles du pack, ingrédients **sans quantités**, **allergènes de la recette et de chaque ingrédient**. Rien d'autre (ni adresse, téléphone, facture, autre passage, donnée de santé).
  - **Accepte** : remplacement de recettes dans le quota et les séries du pack, une note libre, puis la validation, qui verrouille le plan et déclenche le PDF (B18). Le serveur refuse tout dépassement et toute requête après la date limite, avec un message invitant à contacter la cheffe.
  - **États** : lien inconnu ou expiré, menu déjà validé (récapitulatif en lecture seule), date limite dépassée, erreur. Utilisable à 375 px, au clavier et **sans JavaScript** (formulaire natif).
- **Critères** :
  - Un jeton ne donne jamais accès au plan, au client ni aux documents d'un autre (404).
  - Aucune quantité ni donnée de santé exposée.
  - Un lien déjà utilisé n'ouvre que le récapitulatif.
  - Tests : jeton inconnu, expiré, déjà utilisé, d'un autre plan ; dépassement de quota ; recette hors pack ; requête après l'échéance ; validation sans JavaScript ; limitation de débit.
- **Vous contrôlez** : envoyer un lien à votre adresse, l'ouvrir sur téléphone, choisir, valider, rouvrir le lien et vérifier qu'il ne permet plus de modifier.

#### B20. Facturation par passage et suivi URSSAF (saisie manuelle)
- **Branche** : `feat/b20-billing` · **Taille** : moyenne · **Dépend de** : B15, B17, **décision M14** · **Débloque** : B21, B23. **Prérequis** : M10, M14.
- **Objectif** : Garantir qu'aucun passage réalisé n'échappe à la facturation. Vous émettez la facture dans votre outil externe et saisissez son numéro et son statut (étapes 14 et 15) ; Django ne numérote jamais les factures. Pour le batch cooking, la PR suit aussi la demande d'avance immédiate URSSAF.
- **Fonctionnalités et règles** (modèles : section 8.9)
  - Quand un passage `done` (ou `cancelled` que la cheffe marque **facturable**) apparaît, création **idempotente** d'un `InvoiceRecord` (`to_issue`) avec prix figé, part crédit d'impôt, part client et référence du devis. Montant éligible au crédit : prix × taux figé, corrigeable avec motif **[À VÉRIFIER]** avec le comptable (lignes non éligibles).
  - Interface `InvoicingProvider`, une seule implémentation : **`ManualProvider`** (numéro, statut et lien saisis à la main). Export CSV.
  - Statuts du passage (1.3) : numéro saisi → **Facturée** ; facture marquée payée → **Clôturée**. Avoirs et annulations après facturation : gérés dans l'outil, Django garde le lien.
  - Alimente les compteurs **« Semaines à facturer »** (filtre Réalisée) et **« Factures à suivre »** (filtre Facturée) de B17 ; aucune alerte, aucun rappel de paiement au client (l'outil et l'URSSAF s'en chargent).
  - **Batch** : `UrssafPaymentRequest` à statuts saisis à la main (envoyée, validée par le client, refusée, expirée, payée), affichée dans l'écran de facturation ; aucun appel à l'URSSAF ; **avertissement non bloquant** si le compte particulier.urssaf.fr n'est pas prêt avant le premier passage (case « compte URSSAF prêt », B17). Le client ne règle que sa part via l'URSSAF (pas de Stripe pour le batch).
  - Acompte du chef privé : facture via l'outil. **Attestation fiscale** : envoyée par l'outil ; Django n'envoie rien (1.3 étape 16).
- **Critères** : un passage réalisé génère exactement un enregistrement ; une annulation facturable génère le bon montant ; montants avant/après crédit cohérents ; saisie de facture → Facturée, paiement → Clôturée ; aucune alerte envoyée.
- **Vous contrôlez** : marquer un passage réalisé, le retrouver dans « Semaines à facturer », saisir la facture puis la marquer payée, et vérifier le passage à Clôturée.

#### B21. Paiements Stripe : acompte du chef privé
- **Branche** : `feat/b21-payments` · **Taille** : moyenne · **Dépend de** : B15, B20 · **Débloque** : B23. **Prérequis** : M10, M16.
- **Objectif** : Permettre au client du chef privé de régler l'acompte de 30 % par un lien Stripe sécurisé, la date n'étant confirmée qu'une fois le paiement validé. Le batch cooking n'est pas concerné (URSSAF, B20) ; pas d'acompte pour les cours.
- **Fonctionnalités et règles** (modèles : section 8.10)
  - Lien envoyé par e-mail (à la main, depuis la réservation) vers une page Django qui crée la **session Stripe Checkout à la demande** (une session expire au plus tard après 24 h **[À VÉRIFIER]**). Carte et SEPA, frais à la charge de la cheffe. Aucun numéro de carte ne passe par Django.
  - **Aucune relance automatique, aucune alerte** : l'acompte en attente se lit dans l'écran de suivi des réservations ; relancer ou **libérer la date** est une décision manuelle. La date reste « non confirmée » tant que l'acompte n'est pas payé.
  - Webhook `/webhooks/stripe` : **signature vérifiée**, idempotence par `WebhookEvent.event_id`, rejeu manuel ; la réservation passe à « acompte payé » **seulement après le webhook**.
  - Remboursement par action d'administration, avec motif.
- **Critères** : tests avec événements simulés (succès, échec, rejeu, signature invalide, remboursement) ; aucune relance automatique créée.
- **Vous contrôlez** : payer un acompte avec une carte de test, puis rejouer l'événement.

#### B22. Avis des clients
- **Branche** : `feat/b22-reviews` · **Taille** : petite · **Dépend de** : B02, B15, B17 · **Débloque** : rien.
- **Objectif** : Collecter des avis sans effort et n'en publier aucun sans votre validation ni le consentement du client (1.3 étape 17).
- **Fonctionnalités et règles** (modèle : section 8.11)
  - E-mail de demande à **J+2** après le dernier passage d'un engagement (ou une réservation), **une seule** relance à **J+7** ; ce sont des lignes du registre `FollowUp` (1.4) : au plus deux e-mails par prestation, arrêt dès réception de l'avis.
  - Le client répond par e-mail en autorisant la publication de son prénom et de son texte ; **la cheffe saisit l'avis** dans l'administration (`ReviewRequest`), puis le valide, le refuse ou le publie.
  - Un avis approuvé devient un `Review` publié à la prochaine publication (A-Publier), avec le prénom et, si ajoutée, une photo ; jamais de lien externe.
- **Critères** : aucun avis publié sans validation ni consentement ; une seule relance ; arrêt des envois à la réception de l'avis.
- **Vous contrôlez** : terminer un passage de test, déclencher l'envoi, saisir une réponse, valider, publier.

#### B23. RGPD, conservation et exports
- **Branche** : `feat/b23-gdpr` · **Taille** : moyenne · **Dépend de** : B15, B16, B20, B21 · **Débloque** : rien. **Prérequis** : M10, M13.
- **Objectif** : Pouvoir remettre ou effacer les données d'un client à sa demande et ne pas conserver plus que nécessaire. Les données étant aussi dans Brevo, Stripe et l'outil de facturation, chaque demande produit la liste des suppressions à faire à la main.
- **Fonctionnalités et règles**
  - **Export** des données d'un client (JSON et PDF) ; **anonymisation** (efface e-mail, prénom, nom, téléphone, adresse, notes du contact, et les textes de ses deals ; conserve montants et documents de facturation exigés par la loi **[À VÉRIFIER]**), confirmation forte, `owner` seulement.
  - **`DataRequest`** (8.11) : reçue par e-mail ou téléphone, saisie par la cheffe ; échéance de **30 jours** affichée dans la liste (rouge une fois dépassée), **sans notification** ; le traitement clôt la demande, sans e-mail automatique.
  - Registre des consentements (marketing, publication d'avis) avec date ; journal d'audit non modifiable depuis l'administration.
  - **Durées** : pièces du devis 10 ans ; journaux selon la politique ; **prospects** (deals Perdu, ou sans suite, et contacts sans client) : **3 ans après le dernier échange** **[À VÉRIFIER]**, via une action « Purger les prospects périmés » qui produit d'abord son rapport.
  - Le rapport liste les **suppressions manuelles** (outil de facturation, Brevo, Stripe) ; `docs/RGPD.md` décrit la procédure.
- **Critères** : après anonymisation, aucune donnée personnelle ne reste dans Django hors documents légaux ; l'opération est journalisée ; le rapport est exact.
- **Vous contrôlez** : exporter puis anonymiser un client de test, vérifier qu'il ne reste rien d'identifiable, relire le rapport des suppressions manuelles.

#### B24. Durcissement et préparation de la production
- **Branche** : `feat/b24-production` · **Taille** : moyenne · **Dépend de** : toutes les PR précédentes (B08 facultative), et les décisions **hébergement**, **outil de facturation** et **informations légales** (section 4.1) · **Débloque** : B25. **Prérequis** : M17, M18, M19, M5 (production), DNS et TLS de production, secrets `production`, clés Stripe réelles, SEPA.
- **Objectif** : PR du « go / no-go » : vérifier que tout tient avant les vrais clients (sécurité, sauvegardes réellement restaurées, surveillance, informations légales saisies, clés Stripe réelles, administration joignable seulement sous son préfixe avec 2FA).
- **Fonctionnalités et règles**
  - Revue de sécurité selon 6.5 : `check --deploy` sans avertissement, en-têtes, cookies, limitations de débit, fichiers privés signés, secrets.
  - **Sentry en région UE** sans donnée personnelle ; alertes techniques (tâche planifiée manquée, intégration en échec répété, webhook rejeté, nombreuses tentatives de codes), adressées à l'exploitation et non à la cheffe (1.3 étape 20).
  - **Sauvegardes** quotidiennes, 30 jours, base chiffrée, avec **test de restauration**.
  - Test de charge léger : page de choix sous 300 ms côté serveur ; elle n'expose rien au-delà de son propre plan de repas.
  - Administration **uniquement** sous son préfixe et avec 2FA ; `docs/RUNBOOK.md` ; environnement GitHub `production` avec approbation.
- **Critères** : sauvegarde restaurée avec succès ; aucune alerte critique ouverte ; tous les interdits de 6.4 testés ; couverture conforme à 10.3.
- **Vous contrôlez** : dérouler la checklist de la section 5 ligne par ligne ; tant qu'une ligne résiste, on n'ouvre pas.

#### B25. Déploiement de la production et retour arrière
- **Branche** : `feat/b25-deploy-prod` · **Taille** : moyenne · **Dépend de** : B12, B24 · **Débloque** : rien. **Prérequis** : M5 (production), M1, secrets `production`, DNS et TLS.
- **Objectif** : B12 ne met le backend en ligne que pour le test, et rien ne dit comment défaire un déploiement raté (restaurer une sauvegarde est lourd et perdant). Cette PR livre le chemin vers la production et le chemin du retour.
- **Fonctionnalités et règles**
  - **Workflow de production** : environnement GitHub `production` avec **approbation manuelle** (M1), journal des déploiements, déploiement depuis `main` uniquement.
  - **On promeut l'image validée, on ne la reconstruit pas** : la production reçoit le conteneur vérifié en test, repris par son empreinte.
  - **Migrations compatibles en avant** : jamais de migration qui empêche la version précédente de tourner ; **une suppression de colonne ou de table se fait en deux déploiements** (le code cesse de s'en servir, puis la migration destructrice).
  - **Retour arrière** décrit dans `docs/RUNBOOK.md` et **exécuté une fois pour de vrai** sur le test : redéployer l'image précédente, avec la conduite à tenir selon qu'une migration a tourné ou non.
  - Le retour arrière restaure le code, pas les effets (e-mail parti, paiement encaissé) : d'où des tâches idempotentes et le journal des webhooks.
  - **Ordre de bascule** : backend en production, vérification de `/healthz` et de l'administration, puis seulement la bascule du site (S03).
- **Critères** : aucun déploiement en production sans approbation ; image de production = image validée en test (empreinte identique) ; un retour arrière réellement effectué sur le test, durée notée ; migrations réversibles ; `docs/RUNBOOK.md` décrit bascule et retour.
- **Vous contrôlez** : déclencher un déploiement et constater qu'il attend votre approbation ; demander un retour arrière sur le test et vérifier que l'administration répond.

### 3.3 Pull Requests du site (`chefmeemz`)

> **Consignes communes aux PR du site.** Lire `AGENTS.md` et, dans `node_modules/next/dist/docs/01-app/02-guides/`, `authentication.md`, `data-security.md`, `backend-for-frontend.md`, `forms.md`, `server-and-client-boundary.md`, `production-checklist.md` ; dans `03-api-reference/03-file-conventions/` : `proxy.md`, `route-groups.md`, `layout.md`. **Réutiliser l'existant** avant de créer : `components/ui/*` (`Button`, `Field`, `TextField`, `SelectField`, `ModalShell`, `Switch`, `FilterMenu`, `FaqAccordion`, `Icon`, `Section`, `RecipeCard`, `PickedChoice`, `ArrowScroller`), `styles/tokens.css`, CSS Modules, `lucide-react`, `clsx`, `zod`, `lib/i18n.ts` ; un composant par fichier, textes dans `messages/fr.json`. **L'API Django fait foi** : aucune règle métier (quota, solde, délai) n'est décidée seulement côté Next.js ; le site affiche et pré-vérifie, le backend refuse, ses messages d'erreur sont affichés tels quels. **Jamais** de jeton, de clé ni de donnée de santé dans le JavaScript du navigateur.

#### S00. Recevoir les demandes du site par e-mail
- **Branche** : `feat/s00-lead-by-email` · **Taille** : petite · **Dépend de** : rien (ni de Django, ni d'une autre PR) · **Débloque** : S01. **Prérequis** : M3 (Turnstile), M4 (Brevo et domaine d'envoi authentifié).
- **Objectif** : `app/api/lead/route.ts` se termine aujourd'hui sur un `console.info` et un `TODO` : les demandes du formulaire sont perdues. Cette PR les fait arriver dans votre boîte mail, avec tout leur contenu, et les protège des robots. Le pipeline de Django (S01) prend le relais au palier 3 ; d'ici là, vous suivez vos demandes depuis votre boîte.
- **Fonctionnalités et règles**
  - **Anti-robots** : **Cloudflare Turnstile** sur les formulaires (clé de site publique), jeton **vérifié côté serveur** avec la clé secrète ; jeton absent ou invalide : refus avec message clair. Le **champ piège** `website` existant est conservé.
  - **E-mail à la cheffe** à chaque demande, avec son contenu complet et lisible (service, pack, dîners, prix affiché, foyer, date, convives, lieu, occasion, message, coordonnées), envoyé par Brevo à `LEAD_NOTIFY_EMAIL`.
  - **Accusé de réception** au visiteur : e-mail court annonçant un délai de réponse (« sous 24 h », 1.3 étape 2).
  - **La réponse au visiteur ne dépend jamais de l'envoi** : la demande est validée, le visiteur reçoit sa confirmation, puis l'e-mail part ; un échec d'envoi déclenche une **alerte Sentry sans donnée personnelle** (6.4, interdit 4) et une nouvelle tentative.
  - **Limitation de débit** par IP.
  - Variables : `TURNSTILE_SECRET_KEY`, `BREVO_API_KEY`, `LEAD_NOTIFY_EMAIL`.
  - **RGPD** : traitement au titre des mesures précontractuelles, sans case à cocher ; la page de confidentialité est mise à jour dans cette PR (lien sous le formulaire). Aucun envoi commercial.
- **Critères** : une demande valide arrive dans votre boîte avec tout son contenu ; le visiteur reçoit son accusé ; jeton Turnstile absent ou invalide refusé ; champ piège toujours actif ; aucun secret ni donnée personnelle dans les journaux ou Sentry ; le visiteur n'attend pas l'envoi.
- **Vous contrôlez** : envoyer une vraie demande depuis le site de test, recevoir les deux e-mails ; fausser le jeton Brevo et vérifier l'alerte et la nouvelle tentative.
- **Risque** : limite de Brevo (300 e-mails par jour) non vérifiée ; sans conséquence à votre volume.

#### S00b. Skills de l'agent : Next.js, React, référencement et accessibilité
- **Branche** : `feat/s00b-agent-skills` · **Taille** : moyenne · **Dépend de** : rien · **Débloque** : **toutes les PR du site**.
- **Objectif** : Rendre le code des PR du site homogène : un *skill* se charge tout seul quand la tâche le concerne, alors qu'`AGENTS.md` et les consignes communes doivent être pensés. Cette version de Next.js a des changements incompatibles avec ce que les modèles ont appris (`middleware.ts` devient `proxy.ts`) : les skills `nextjs` et `react` sont des **cartes vers la documentation vendorisée** (`node_modules/next/dist/docs/`) et n'ajoutent que les conventions du projet ; **aucun skill ne décrit une API de framework**.
- **Fonctionnalités et règles** : cinq skills dans `.claude/skills/<nom>/SKILL.md`, chacun avec une description qui déclenche son chargement.
  - **`nextjs`** : quel guide lire avant quelle tâche (`forms.md` avant un formulaire ; `data-security.md` et `backend-for-frontend.md` avant tout appel serveur ; `authentication.md` avant un jeton ; `keeping-pages-static.md` avant une page ; `environment-variables.md` avant un secret ; `content-security-policy.md` et `json-ld.md` selon le sujet ; `proxy.md`, `route-groups.md`, `layout.md` pour les conventions de fichiers). Conventions : site **entièrement statique**, aucune règle métier côté site, **Zod** sur toute réponse d'API, aucun secret dans le JavaScript du navigateur, limite de temps de calcul du Worker Cloudflare pour la seule page dynamique.
  - **`react`** : un composant par fichier ; réutiliser `components/ui/*` ; CSS Modules et `styles/tokens.css`, aucune couleur en dur ; textes dans `messages/fr.json` ; frontière serveur/client explicite ; aucune donnée de santé dans un composant.
  - **`seo`** : métadonnées par page, URL canonique, plan du site, hiérarchie des titres, `alt` obligatoire, données structurées `LocalBusiness` et `Service` (`json-ld.md`), Core Web Vitals non dégradés ; `npm run test:seo` doit passer.
  - **`accessibilite`** : WCAG 2.2 AA en continu (clavier, focus visible, erreur rattachée au champ, information jamais portée par la seule couleur, 375 px).
  - **`tests`** : Vitest (unités), Playwright (parcours), `npm run test:seo`. **Un seul parcours de bout en bout** : le formulaire de demande ; le reste, un test de rendu. Ne jamais vérifier une règle métier côté site ; ne jamais simuler l'API sans vérifier que le schéma Zod est celui du vrai contrat. S02 ajoute le test de parité HTML.
  - **`revue-projet`** : liste de contrôle du projet, en **complément** de `/code-review` : interdits 6.4, bonnes pratiques 6.5, règles de revue de l'Avant-propos, site sans règle métier.
  - Un skill ne contient jamais : une API de framework recopiée, un secret, une valeur de prix ou de délai.
- **Critères** : chaque skill se déclenche sur les bonnes tâches ; aucun skill ne décrit une API de Next.js ou de React (revue) ; un test de CI vérifie que **tous les chemins de documentation cités existent** dans `node_modules/next/dist/docs/` ; `npm run test:seo` passe.
- **Vous contrôlez** : demander une petite modification de formulaire et vérifier que l'agent cite `forms.md` avant d'écrire ; demander une nouvelle page et vérifier que le site reste statique.

#### S01. Envoyer les demandes du site vers l'administration
- **Branche** : `feat/s01-lead-to-django` · **Taille** : petite · **Dépend de** : S00, B05, B12 · **Débloque** : rien.
- **Objectif** : Remplacer le seul e-mail de S00 : chaque demande crée un contact et un deal « Nouveau » dans le pipeline de Django. L'e-mail complet à la cheffe continue de partir.
- **Fonctionnalités et règles**
  - `app/api/lead/route.ts` appelle `POST /api/v1/leads` (9.2) avec un jeton serveur à serveur (jamais exposé au navigateur) et un **identifiant de demande** (rejeu sans doublon).
  - **Ne jamais perdre une demande** : la réponse au visiteur ne dépend jamais de Django ; l'e-mail complet part **avant** l'appel et n'en dépend pas ; un échec de Django déclenche une alerte Sentry sans donnée personnelle et une **nouvelle tentative** ; la demande reste dans l'e-mail pour une saisie manuelle.
  - Turnstile, champ piège, accusé de réception, limitation de débit : inchangés (S00).
  - **Page de confidentialité** : Django, hébergé dans l'UE, comme outil de gestion des prospects.
  - Variable : `LEAD_API_TOKEN`.
- **Critères** : une demande valide crée **un seul** contact et un deal « Nouveau » ; une seconde du même e-mail ajoute un deal au même contact ; **la demande arrive jusqu'à vous même si Django est en échec** (test avec Django factice en échec) ; aucun secret ni donnée personnelle dans les journaux ou Sentry ; le visiteur n'attend pas l'appel à Django.
- **Vous contrôlez** : envoyer une vraie demande depuis le site de test et la retrouver dans la colonne « Nouveau » ; couper Django et vérifier que l'e-mail arrive quand même.

#### S02. Lire le contenu depuis l'API au moment de la construction
- **Branche** : `feat/s02-content-from-api` · **Taille** : grande · **Dépend de** : B09, B10, B11, B12 · **Débloque** : rien.
- **Objectif** : Faire lire à la construction du site son contenu à Django, pour que vos modifications dans l'administration deviennent des pages, sans différence visible (mêmes pages, vitesse, référencement). Si Django est indisponible, la construction échoue et le site en ligne reste celui d'avant. Cette PR supprime les anciens fichiers de contenu, **seulement après comparaison avant/après** : les laisser serait un piège (on y modifierait un fichier sans effet).
- **Fonctionnalités et règles**
  - Remplacer la lecture de `content/`, de la FAQ, des avis, des zones, des tarifs, des recettes, des pages légales et des réglages par des appels à l'API (9.1) **à la construction**, avec **validation Zod** (`API_BASE_URL`, secret `BUILD_API_TOKEN`). Marqueurs de prix résolus par l'API.
  - **Blocs vendeurs** : `lib/i18n.ts` superpose le calque `page-texts` (B11) à `messages/fr.json` avant toute lecture (un seul point de chargement, aucun composant touché). `messages/fr.json` **reste dans le dépôt** (1 231 libellés d'interface) ; les clés non migrées en viennent.
  - **Suppression des anciens fichiers de contenu** uniquement après contrôle de parité (HTML identique à la normalisation près). La commande d'import de B10 (`--site-path`) lit ces fichiers : s'il fallait réimporter, les récupérer dans l'historique git.
- **Critères** : site visuellement identique ; un échec de l'API **fait échouer la construction** sans publier ; `npm run test:seo` passe ; aucun fichier de contenu ne subsiste hors `messages/fr.json` ; sans édition en base, le fichier fusionné est identique au fichier d'origine.
- **Vous contrôlez** : `npm run build` avec l'API locale puis en test, et comparer des pages clés.

#### S03. Déclenchement de la publication et déploiement
- **Branche** : `feat/s03-publish-workflow` · **Taille** : petite à moyenne · **Dépend de** : B12, B14 · **Débloque** : S04. **Prérequis** : M12.
- **Objectif** : Dernier maillon de la publication : le clic sur « Publier » (A-Publier) reconstruit et met le site en ligne, d'abord sur le test puis, avec votre approbation, en production. Un déploiement raté ne remplace jamais le site en ligne.
- **Fonctionnalités et règles**
  - Workflow GitHub Actions déclenché par `repository_dispatch` (`content-updated`) et par `push` ; environnements `test` et `production` (approbation pour la production).
  - Déploiement par `opennextjs-cloudflare` et les environnements de `wrangler.jsonc` ; secrets : jeton Cloudflare, identifiant de compte, jeton de lecture de l'API.
  - `concurrency` : une seule construction à la fois ; statut lisible par le backend.
- **Critères** : un dispatch de test déclenche une construction ; un échec n'écrase pas le site en ligne.
- **Vous contrôlez** : cliquer sur **Publier** et suivre la construction jusqu'au site de test ; provoquer un échec et vérifier que le site en ligne ne bouge pas.

#### S04. Site : durcissement
- **Branche** : `feat/s04-hardening` · **Taille** : moyenne · **Dépend de** : S03 · **Débloque** : rien.
- **Objectif** : Dernière PR avant l'ouverture : vérifier que le site est utilisable par tous, que la sécurité tient et que le parcours du formulaire est couvert par un test de bout en bout ; mettre à jour la page de confidentialité.
- **Fonctionnalités et règles**
  - Audit **WCAG 2.2 AA** (clavier, focus visible, erreurs liées aux champs, pas d'information par la seule couleur, mobile d'abord) ; revue de sécurité.
  - Test Playwright de bout en bout du formulaire de demande (S00, puis S01).
  - **Page de confidentialité** : sous-traitants, allergies recueillies avec consentement et conservées hors de l'outil, durées de conservation (prospects compris).
  - Erreurs du site envoyées à Sentry sans donnée personnelle.
- **Critères** : aucune anomalie d'accessibilité bloquante ; parcours du formulaire vert sous Playwright ; aucune donnée personnelle dans Sentry ; la page de confidentialité cite chaque sous-traitant et chaque durée.
- **Vous contrôlez** : parcourir le site au clavier seul puis sur téléphone ; envoyer une demande de test de bout en bout ; relire la page de confidentialité.

## 4. Décisions ouvertes et points à vérifier

Toutes les autres décisions sont prises et intégrées aux PR. Seules restent celles-ci ; le détail de chacune est dans le prérequis cité.

### 4.1 Décisions à prendre

| Décision | Bloque | Prérequis | Tant que ce n'est pas tranché |
| --- | --- | --- | --- |
| **Hébergement de l'administration** `[BLOQUANT]` | B12, B24 | M5 | développement local avec Docker |
| **Stockage de fichiers** | B02 | M7 | stockage local |
| **Outil de facturation** | B20 | M14 | `ManualProvider` (saisie à la main) |
| **Informations légales** | production | M18 | bandeau d'avertissement dans l'administration |
| **Comptable** : mentions du devis, TVA, crédit d'impôt par ligne | B07, B16, B20, B21 | M10 | lignes supposées non éligibles par prudence |
| **FAQ et CGV à aligner** (annulation, changement de formule) | production | M19 | textes du site divergents (voir 1.9) |
| **Domaine du backend** | B12 | M6 | `api.test.tabletribu.com`, `api.tabletribu.com` |
| **Version de Django (LTS)** | B00 | 6.1 | 5.2 LTS, à confirmer sur le site officiel |
| **Agenda de la cheffe** | B17 | — | Google Agenda supposé, à confirmer |
| **Espace client avec comptes** | — | 1.8 | reporté ; à reconsidérer au-delà d'une trentaine de clients actifs par mois. Les modèles l'accueillent sans rien défaire |

### 4.2 Points à vérifier
- **Vie privée** : durée de conservation des prospects (3 ans proposés) et de votre support privé d'allergies, à valider.
- **E-mail** : limites de l'offre gratuite de Brevo, domaine d'envoi authentifié.
- **Outil de facturation, Cal.com et autres tarifs** : chiffres de sites tiers, parfois contradictoires ; à confirmer sur les sites officiels.

**Sources consultées le 11/11/2026** : [Stripe](https://stripe.com/fr/pricing/) · [Brevo](https://www.sendx.io/blog/brevo-pricing-plans-costs-alternatives-2026) · [Indy](https://www.indy.fr/guide/facturation/logiciel/gratuit/) · [comparatif facturation](https://digitiz.fr/facturation-electronique-gratuite/) · [Cal.com](https://costbench.com/software/scheduling/cal-com/free-plan/)

## 5. Checklist avant la mise en production
- Toutes les PR B00 à B25 et S00 à S04 fusionnées, CI verte.
- **S00 et S01 vérifiées sur le site réel** : une demande de test arrive par e-mail avec tout son contenu, l'accusé part au visiteur, et la demande apparaît dans la colonne « Nouveau » du pipeline.
- **M18** : informations légales saisies. **M10** : réponses du comptable appliquées. **M14** : outil de facturation choisi, ou procédure manuelle documentée. **M19** : FAQ et CGV alignées.
- **M13** : support privé des allergies choisi, consentement explicite, registre des traitements, politique de confidentialité et clause de responsabilité validés.
- Sauvegardes restaurées avec succès, supervision active, accès administrateur protégé (2FA, préfixe).
- Stripe en mode réel, SEPA activé, webhooks de production enregistrés, domaine d'envoi authentifié (SPF, DKIM, DMARC : PASS).
- **Page de choix du menu** testée depuis un téléphone, avec un lien expiré et un lien déjà utilisé ; relances client activées une par une et vérifiées sur votre adresse ; tableau de bord et liens de ses compteurs vérifiés.
- Dernier contrôle des **données de santé** : aucune allergie dans Django, l'API, l'historique, les journaux, Stripe, les e-mails ni les PDF ; elles sont uniquement dans votre support privé, avec consentement.

# Partie III — La technique

Les choix d'architecture, les données et les contrats. Destinée à qui écrit le code.


## 6. Stack et conventions

### 6.1 Choix par défaut
- **Python 3.12+**, **Django LTS courant** (5.2 LTS à la date de rédaction ; vérifier s'il existe une LTS plus récente), **PostgreSQL**.
- **API** : Django REST Framework + `drf-spectacular` (schéma OpenAPI) pour la **lecture par la construction du site** (authentifiée par `BUILD_API_TOKEN`, voir section 7), les webhooks. **Aucune route n'est ouverte sans authentification**, et **aucun JavaScript de navigateur n'appelle cette API** : elle n'est consommée que de serveur à serveur.
- **Page de choix du menu** : page servie par **Django** (gabarit et CSS aux couleurs du site), détaillée en **B19**.
- **Administration de la cheffe et édition du contenu (le « CMS », voir glossaire)** : **administration Django avec le thème Unfold** (aux couleurs du site), plus **3 pages sur mesure** — `A-Dossier`, `A-Publier`, `A-Devis` (voir le glossaire) — construites en templates Django et HTMX (B07, B14, B16), et **deux vues avec filtres** (Clients, Semaines) livrées par B17 dans l'administration. **Pas d'API d'administration** : la cheffe n'utilise que l'administration, qui s'appuie sur les sessions Django.
- **Tâches asynchrones** : **Procrastinate** (file adossée à Postgres, pas de Redis).
- **PDF** : **WeasyPrint** (listes d'ingrédients).
- **E-mail** : Brevo (API ou SMTP).
- **Stockage des fichiers** : stockage compatible S3 via `django-storages`, **privé** par défaut.
- **Qualité** : `pytest-django`, `factory-boy`, `ruff`, `mypy` (strict sur les apps métier), `pre-commit`, GitHub Actions.
- **Observabilité** : Sentry (offre gratuite) + route `/healthz`.

### 6.2 Conventions de code
- **Montants** : entiers en **centimes** (`amount_cents`), jamais de flottants. Taux en basis points ou `Decimal`.
- **Identifiants publics** : UUID (pas d'ID séquentiels exposés).
- **Dates** : toujours timezone-aware, stockées en UTC.
- **Configuration** par variables d'environnement (section 10.1) ; aucun secret dans le dépôt.
- **Services** : la logique métier va dans `services.py` par app (pas dans les vues ni les modèles), testée sans HTTP.
- **Intégrations externes** derrière une interface (`Protocol`) avec une implémentation réelle et une implémentation factice pour les tests (`StripeGateway`, `Mailer`, `InvoicingProvider`).
- Toute action sensible écrit une ligne dans `AuditEvent` (qui, quoi, quand, objet, avant/après).

### 6.3 Apps
`core` (utilitaires, audit, fichiers), `accounts` (staff), `content` (CMS), `catalog` (recettes, ingrédients, allergènes), `pricing` (packs, grille, zones), `crm` (contacts, deals, pipeline), `clients` (dossier client), `engagements` (engagements, passages, réservations), `planning` (plans de repas, choix, listes d'ingrédients), `billing` (références de facture, URSSAF), `payments` (Stripe), `notifications`, `integrations` (GitHub, Stripe, Brevo), `reviews`, `staffdesk` (tableau de bord, vues Clients et Semaines, registre des relances aux clients), `mealchoice` (page de choix du menu, voir B19).

### 6.4 Interdits (à tester)
1. **Prospects : conservation limitée.** Un prospect perdu ou sans suite est purgé après la durée de conservation (3 ans après le dernier échange **[À VÉRIFIER]**) ; l'export et la suppression sur demande fonctionnent sur le contact et ses deals (B23). Le **registre des devis émis** (`IssuedQuote`) est rattaché à un deal et tombe avec lui à l'anonymisation, hors pièces légales.
2. **Aucune allergie, aucun régime, aucune donnée de santé de client** dans Django (ni champ, ni note de contact, de deal ou de client), et aucune dans les journaux, Stripe, les e-mails marketing ni les PDF. Un test vérifie qu'aucun modèle ne porte ce type de champ ; les zones de notes affichent un avertissement.
3. **Aucun numéro de carte bancaire** ne passe par Django (Stripe Checkout hébergé).
4. **Aucun secret** dans les logs, les messages d'erreur, les fixtures.
5. Les **factures** ne sont pas numérotées par Django (c'est la suite continue de l'outil de facturation).

### 6.5 Bonnes pratiques officielles de Django et DRF
Ces règles viennent des recommandations officielles de Django et de DRF (sources en fin de section, consultées le 11/11/2026). Les règles marquées **(projet)** sont nos conventions, pas une recommandation de la documentation. Chacune est vérifiable par un test, par la CI ou en revue (voir l'Avant-propos et B00).

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
4. **Limitation de débit** : par défaut aucune. Débits par portée (`ScopedRateThrottle`) pour la page de choix du menu. `NUM_PROXIES` réglé selon l'hébergement. La documentation DRF précise que la limitation n'est **pas une mesure de sécurité à elle seule** et qu'elle utilise le cache de Django : les compteurs critiques (essais sur un lien de choix) sont donc **aussi appliqués par la logique métier, comptés en base**, et un cache local à un processus ne suffit pas avec plusieurs processus.
5. **Rendu et JSON** : `BrowsableAPIRenderer` retiré en production ; `STRICT_JSON` conservé.
6. **Erreurs** : un seul gestionnaire d'exceptions au format `{code, message, fields}`, sans détail interne.
7. **Version** : `/api/v1/` avec `ALLOWED_VERSIONS` ; les versions inconnues sont refusées.

**DRF : vues, permissions et sérialiseurs**
1. **Permissions d'objet** : DRF n'applique pas `has_object_permission` aux listes ni aux créations. La page de choix ne lit donc **que le plan de repas désigné par son jeton**, les créations sont restreintes dans `perform_create()`, et tout `get_object()` surchargé appelle `check_object_permissions()`.
2. **Sérialiseurs (projet)** : champs listés explicitement (pas de `__all__`) ; sérialiseurs distincts en lecture et en écriture ; aucune logique métier dans les sérialiseurs ni les vues : elles appellent `services.py` (6.2).
3. **Filtrage (projet)** : champs filtrables et triables listés explicitement.
4. **Schéma** : `drf-spectacular` généré en CI avec validation stricte (`spectacular --validate --fail-on-warn`) ; le schéma documente l'API de lecture et les webhooks.
5. **Tests** : `APIClient` ; tests d'isolation entre clients ; `assertNumQueries` pour éviter les requêtes N+1 ; un test par code d'erreur du gestionnaire.

**Sources** : [Django, liste de contrôle de déploiement](https://docs.djangoproject.com/en/stable/howto/deployment/checklist/) · [Django, sécurité](https://docs.djangoproject.com/en/stable/topics/security/) · [DRF, réglages](https://www.django-rest-framework.org/api-guide/settings/) · [DRF, permissions](https://www.django-rest-framework.org/api-guide/permissions/) · [DRF, limitation de débit](https://www.django-rest-framework.org/api-guide/throttling/). La version de Django (LTS) reste à confirmer en B00.

## 7. Authentification et permissions

- **Équipe** : mot de passe + double authentification obligatoire en production, verrouillage après 5 échecs, groupes `owner` et `assistant` (détail : B01).
- **Client** : **aucun compte, aucun mot de passe.** Le client accède à sa page de choix par un **lien signé à usage unique** (jeton aléatoire stocké haché, lié à un seul plan de repas, valable jusqu'à la date limite, invalidé après validation), sans session. La page n'expose que le prénom et le menu : ni adresse, ni téléphone, ni donnée de paiement, ni allergie enregistrée.
- **API de construction** : jeton `Bearer` à portée lecture seule (`BUILD_API_TOKEN`), comparé en temps constant.
- **Webhooks entrants** : signature vérifiée (Stripe), liste d'adresses ou secret pour les autres.

## 8. Modèle de données

Convention : `id` UUID, `created_at`, `updated_at` sur tous les modèles ; `is_published` et `published_at` sur le contenu public. Les champs entre guillemets sont des choix fermés.

### 8.1 `content` (CMS)
Les formes de sortie de l'API doivent **reproduire les schémas Zod existants** (`lib/content/schemas.ts`), clés en camelCase.

- **`Project`** (réalisation) : `slug` (unique), `title`, `order`, `date`, `excerpt`, `categories` (liste de textes), `image` (fichier + `alt` obligatoire, largeur et hauteur extraites automatiquement), `thumbnail` (optionnel), `gallery` (liste ordonnée de `ProjectImage` : fichier, `alt`, `order`), `service` ("batch", "chef", "cours"), `occasion`, `tags`, `city`, `guest_count`, `diets` (liste), `duration`, `guests`, `menu` (liste de lignes), `review_quote`, `review_author`, `client`, `location`, `url`, `related` (liste de slugs).
- **`Inspiration`** (photo indépendante des réalisations) : `title`, `order`, `image` (+ `alt`), `service`, `excerpt`, `location`, `occasion`, `tags`, `guests`, `duration`, `href` (lien interne optionnel, doit commencer par `/`), `is_published`.
- **`Review`** (avis) : `name`, `role`, `text`, `photo` (fichier, remplace l'association par index `media.reviews[i % …]`), `service` (optionnel), `order`, `is_published`.
- **`FaqSection`** : `slug`, `kicker`, `tab`, `title`, `order`. **`FaqEntry`** : `section`, `question`, `answer` (Markdown, liens internes autorisés), `order`, `is_published`. Plus une page FAQ distincte pour les FAQ de tarifs et de zones : champ `placement` ("faq", "tarifs", "zones", "batch", "chef", "cours").
- **`LegalPage`** : `slug` ("cgv", "confidentialite", "mentions-legales"), `title`, `description`, `body` (Markdown), `version` (texte, ex. `2026-11`), `updated`. Les CGV portent un numéro de version, recopié dans `cgv_version` de l'engagement pour tracer la version acceptée.
- **`SiteSettings`** (singleton) : `name`, `phone`, `phone_href`, `email`, `address`, `area`, `hours`, `provisional` (booléen), `social_links` (liste : nom, URL).
- **`LegalIdentity`** (singleton, **éditable en administration**, utilisé sur les pages légales, et comme référence pour remplir le modèle de devis) : `legal_name`, `legal_form`, `siret`, `legal_address`, `sap_declaration_number` (déclaration de services à la personne), `insurer_name`, `insurance_policy_number`, `mediator_name`, `mediator_contact`, `vat_mention`. Tous les champs sont **vides au départ** : les informations seront saisies plus tard.
- **`Zone`** : `code` ("z1", "z2", "z3"), `label`, `description`, `travel_fee_cents`, `min_order_cents` (optionnel). **`Commune`** : `name`, `zone`, `lat`, `lon`, `label_side` ("left", "right", "top", "bottom").
- **`PageBlock`** (B11) : `page` ("home", "batchPage", "chefPage", "coursPage", "tarifsPage", "zonesPage", "contact", "servicesPage", "realisationsPage", "recipesPage", "inspirationsPage"), `section` (la clé de second niveau de `messages/fr.json`, par exemple "audience" ou "packages"), `kicker`, `title`, `body` (Markdown), `seo_title`, `seo_description`, `order`, `is_published`. Unicité `(page, section)`. **`PageBlockItem`** : `block`, `title`, `body` (Markdown), `order` — les listes d'arguments.
- **Libellés d'interface** (boutons, onglets, filtres, unités, messages de formulaire, navigation, pied de page) : **non migrés**, ils restent dans `messages/fr.json` et dans le code du site. Ils commandent le comportement des composants (voir « Ce que le CMS ne permet pas » en B03).

### 8.2 `catalog`
- **`Allergen`** : `code` (les 14 allergènes UE, mêmes clés que `ALLERGENS` dans `lib/recipes.ts`), `label`.
- **`Ingredient`** : `name` (unique), `default_unit` ("g", "kg", "ml", "l", "piece", "tbsp", "tsp"), `category` (rayon : fruits-légumes, boucherie, poissonnerie, crèmerie, épicerie, surgelés, autre), `allergens` (M2M).
- **`Recipe`** : `slug`, `title`, `alt`, `photo`, `dish_type` ("viande", "poisson", "vegetarien"), `pack_tier` ("classiques", "signature"), `description`, `diets` ("vegetarien", "vegan"), `origin`, `spice` ("doux", "releve", "epice"), `cost_level` (1 à 4), `season`, `fridge_days`, `freezable`, `reheat`, `base_servings` (nombre de portions de la fiche, défaut 4), `is_published` (visible sur le site), `is_available` (proposée aux clients), `main_ingredients` (liste de textes courts pour la fiche publique, sans quantités).
- **`RecipeIngredient`** : `recipe`, `ingredient`, `quantity` (Decimal), `unit`, `note` (ex. « émincé »), `order`. **Les quantités ne sont jamais exposées par l'API publique de build** ; elles servent aux listes d'ingrédients.
- **Calcul dérivé** : `Recipe.allergens` est l'**union** des allergènes de ses ingrédients, plus un champ manuel `extra_allergens` (traces, adaptations). Un test vérifie la cohérence.

### 8.3 `pricing`
- **`Pack`** : `code` ("essentiel", "signature", "surmesure"), `label`, `description`, `allowed_recipe_tiers` (liste : "classiques", "signature"), `is_custom` (vrai pour sur mesure).
- **`PriceEntry`** : `pack`, `period` ("week", "month"), `dinners` (3, 4, 5), `price_per_session_cents` (avant crédit d'impôt). Reproduit `PRICES` de `lib/lead/pricing.ts`. Unicité `(pack, period, dinners)`.
- **`Offer`** (offre commerciale, **créée et modifiée par la cheffe**) : `code`, `label` (« Offre Post-partum »), `service` ("batch", "chef", "cours", ou vide si elle vaut pour tous), `pitch` (une phrase pour le devis et le site), `description` (Markdown, le paragraphe inséré dans le devis), `valid_from` et `valid_until` (campagne, vides = permanente), `is_active`, `is_public` (visible sur le site ou réservée au devis), `order`.
  - **Préréglages facultatifs**, pour remplir le formulaire de devis d'un coup : `default_pack`, `default_formula`, `default_dinners`, `default_servings`, `default_guest_count`.
  - **Avantage facultatif**, au choix : `discount_rate_bp` (remise en pourcentage) **ou** `discount_cents` (remise fixe) **ou** `fixed_price_cents` (prix forfaitaire qui remplace la grille) — jamais deux à la fois, un test le vérifie. Une offre peut très bien n'avoir **aucun** avantage tarifaire et n'être qu'un habillage commercial.
  - **Ce qu'une offre n'est pas** : ni un service, ni un pack. Un mois de batch cooking « Post-partum » reste un mois de batch cooking — mêmes passages, mêmes menus, même crédit d'impôt. L'offre ne change que **le nom, le texte du devis et, éventuellement, le prix**.
- **`PricingSettings`** (singleton) : `tax_credit_rate_bp` (5000 = 50 %), `chef_price_per_person_cents` (« à partir de 35 € »), `course_price_per_person_cents` (« à partir de 45 € »), `chef_deposit_rate_bp` (3000).
- **Source de vérité** : les prix sont **ici**, jamais dans le code du site ; la gestion est **dynamique** (modifiable en administration, effet à la prochaine publication). Cette grille **préremplit** le prix d'un engagement (page A-Dossier) et alimente le site ; elle ne génère aucun devis. **La grille du code est la référence** (39,50 € après crédit d'impôt pour 3 dîners au mois) ; la FAQ qui annonce « 49,50 € » est obsolète. Pour éviter que des textes citent des prix périmés, le Markdown (FAQ, pages) accepte des **marqueurs de prix** que l'API remplace avant d'envoyer le contenu : `{{price.batch_from_after_credit}}`, `{{price.batch_from_before_credit}}`, `{{price.chef_per_person}}`, `{{price.course_per_person}}`, `{{tax_credit_percent}}`. Un test échoue si un marqueur inconnu est utilisé.

### 8.4 Pièces du devis (sur l'engagement et la réservation)
Aucune table de devis. Chaque `Engagement` et chaque `Booking` peut porter ses pièces, **toutes facultatives** (un devis n'est jamais un prérequis) : `quote_reference` (texte, **unique** quand renseigné ; format recommandé `DEV-AAAA-NNN`), `quote_file` (PDF envoyé, privé), `agreement_file` (e-mail d'accord : `.eml`, PDF, image ou texte, privé), `agreement_date`, `cgv_version`, `source_note` (texte libre : « accord oral », « reconduction à l'identique »…). Ces pièces n'existent qu'après la confirmation du client ; quand elles existent, elles sont conservées 10 ans.

**Devis** — **`Quote`** (B07, B08) : `deal` (obligatoire), `reference` (unique, `DEV-AAAA-NNN`, attribuée à la première finalisation, jamais réattribuée), `version` (1, 2, 3… par référence), `status` ("draft" brouillon sans numéro, "final" figé, "imported" PDF fait ailleurs), `service` ("batch", "chef", "cours"), `lines` (JSON : libellé, quantité, prix, éligibilité au crédit), `text_blocks` (JSON, Markdown), `offer` (facultative), `total_before_credit_cents`, `total_after_credit_cents`, `deposit_cents`, `totals_forced_reason` (motif quand un total est forcé à la main), `cgv_version`, `valid_until`, `pdf_file` (privé), `finalized_at`, `finalized_by`, `accepted_online_at`, `accepted_online_name` et `acceptance_token` (haché, B08). Le nom du client se lit sur le contact du deal. **`QuoteTextBlock`** : bibliothèque de textes réutilisables (`key`, `service`, `body` Markdown). Quand le dossier est créé, le devis retenu alimente `quote_reference` et `quote_file` de l'engagement (ci-dessus).

### 8.5 `crm` (contacts, deals, pipeline)
- **`Contact`** (la personne, prospect ou client) : `first_name`, `last_name`, `email` (unique, en minuscules), `phone`, `address`, `city`, `postal_code`, `zone` (optionnelle), `household_size` (optionnel), `source` ("site", "word_of_mouth", "other"), `marketing_consent` (booléen + date), `notes_internal` (texte libre, avertissement « aucune allergie ni donnée de santé ici »), `anonymized_at`. Le `Client` (8.6) lui est lié en 1-1 à l'ouverture du premier dossier.
- **`Deal`** : `contact`, `service` ("batch", "chef", "cours"), `stage` ("new" Nouveau, "qualified" Qualifié, "quote_sent" Devis envoyé, "won" Gagné, "lost" Perdu), `stage_changed_at`, `request_detail` (texte lisible : pack, dîners, prix affiché, foyer, date, convives, lieu, occasion, message), `estimated_cents` (optionnel), `offer` (optionnelle), `source`, `lost_reason` (**obligatoire** si Perdu), `is_renewal` et `renewed_engagement` (renouvellement), `request_id` (unique, idempotence de l'intake), `created_at`.
- **`DealStageChange`** : `deal`, `from_stage`, `to_stage`, `changed_by` (ou « site »), `changed_at`. Aucune étape ne change toute seule.
- **`CrmNote`** : `contact` et/ou `deal`, `text`, `author`, `created_at` (avec le même avertissement : aucune donnée de santé).
- **`SavedView`** : `owner`, `name`, `filters` (JSON des filtres de la vue Pipeline, 1.6).
- Un deal « Gagné » ne crée rien tout seul : le `Client` naît à l'ouverture du dossier (B16).

### 8.6 `clients`
- **`Client`** : `contact` (1-1, porte l'identité : prénom, nom, e-mail, téléphone, adresse), `status` ("active" Actif, "inactive" Inactif — **calculé** : Actif tant qu'un engagement a des passages non clôturés), `urssaf_account_ready` (booléen) et `urssaf_account_checked_at`, `automatic_emails_enabled` (8.12). **Pas** de profil alimentaire : les allergies restent hors de l'outil (1.2).
- Pas de journal des échanges : vos e-mails restent dans votre messagerie ; les notes se trouvent sur le contact et le deal (8.5).

### 8.7 `engagements`
- **`Engagement`** (batch cooking) : `client`, `pack`, `formula` ("week", "month", "custom"), `dinners_per_session` (3, 4, 5 ou libre en custom), `sessions_total` (1 pour une semaine, 4 pour un mois, saisi pour le sur mesure), `servings` (**portions par passage**, défaut 4, remplace la taille du foyer), `renewal_declined_at` et `renewal_declined_reason` (« Pas de renouvellement »), `renewal_deal_created_at` (date de création du deal de renouvellement, jamais l'identifiant du deal), `auto_menu_link` (« selon le réglage global » par défaut, ou forcé activé / désactivé pour cet engagement), `start_date`, `status` ("upcoming", "active", "completed", "cancelled"), `session_price_cents` (avant crédit, **prérempli depuis la grille**, modifiable à la création, figé ensuite), `offer` (l'offre commerciale qui a vendu l'engagement, facultative), `price_override_reason` (obligatoire si le prix diffère de la grille **et ne vient pas d'une offre**), `tax_credit_rate_bp` (taux figé à la création), les pièces du devis (8.4), `window_end_date` (date limite pour réaliser tous les passages : 6 semaines après le premier pour une formule mensuelle, **proportionnelle à la durée pour un sur mesure**, modifiable).
- **`Session`** (un passage) : `engagement`, `sequence` (1..N), `scheduled_at` (date et heure, vide tant que « À dater »), `status` ("to_date" À dater, "scheduled" Planifiée, "menu_sent" Menu envoyé, "menu_ready" Menu prêt, "done" Réalisée, "invoiced" Facturée, "closed" Clôturée, "cancelled" Annulée ; **corrigeable à la main, avec trace d'audit**), `rescheduled_from` (ancienne date lors d'un report, détail dans `AuditEvent`), `cancel_reason`, `done_at`, `billable` (booléen décidé par la cheffe, en cas d'annulation aussi), `price_cents` (copié de l'engagement ; modifiable par la cheffe, avec motif), `menu_deadline_at` (date limite de choix, défaut `scheduled_at` − 2 jours, modifiable), `notes_internal`. **Passages créés** d'un engagement = ses passages non annulés ; comparés à `sessions_total`.
- **`Booking`** (chef privé et cours) : `client`, `service` ("chef", "cours"), `event_date`, `guest_count`, `menu_notes`, les pièces du devis (8.4), `offer` (facultative), `total_cents` (saisi), `deposit_cents` (30 % pour le chef privé), `status` ("confirmed", "deposit_pending", "deposit_paid", "done", "cancelled_free", "cancelled_deposit_kept"), `cancellation_policy` (texte repris du devis, saisi).

### 8.8 `planning`
- **`MealPlan`** : `session` (1-1), `status` ("sent" lien envoyé, "validated" validé, "prepared" liste produite, "revision" à revoir ; le statut du passage suit : Menu envoyé puis Menu prêt), `deadline_at` (copiée de `Session.menu_deadline_at`), `quota` (nombre de recettes à choisir, copié de l'engagement), `servings_per_recipe` (par défaut `Engagement.servings`), `link_sent_at`, `validated_at`, `validation_source` ("link" par le lien de choix, "email" accord par e-mail, "staff" validé par la cheffe faute de réponse), `validation_proof` (fichier facultatif : l'e-mail d'accord), `revision_number` (1, 2, 3… à chaque réouverture), `choice_token` (haché) et `token_expires_at`, `reviewed_at` et `reviewed_by` (la cheffe marque le menu « relu » après avoir contrôlé les allergies avec sa propre note d'allergies, hors de l'outil).
- **`MealChoice`** : `meal_plan`, `recipe`, `servings`, `note`, `chosen_by` ("client", "staff", "default"), `created_at`.
- **`ShoppingList`** : `meal_plan`, `generated_at`, `lines` (JSON : ingrédient, quantité, unité, rayon), `pdf_file`, `sent_to_client_at`, `sent_to_chef_at`, `grocery_mode` ("chef_buys", "client_buys").
- **`GroceryReceipt`** (si la cheffe fait les courses, facturées au coût réel) : `session`, `file`, `amount_cents`, `note`.

### 8.9 `billing`
- **`InvoiceRecord`** : `session` ou `booking` (un seul des deux), `provider` ("manual", puis l'outil retenu), `external_id`, `number` (numéro attribué par l'outil), `amount_cents`, `credit_amount_cents`, `client_share_cents`, `status` ("to_issue", "issued", "paid", "cancelled" ; le retard est **calculé** à partir de `due_date`), `pdf_url`, `issued_at`, `quote_reference`. `due_date` (échéance, sert à l'indicateur « en retard » et au compteur « Factures à suivre »).
- **`UrssafPaymentRequest`** : `invoice_record`, `status` ("sent", "client_validated", "paid", "rejected", "expired"), `sent_at`, `validated_at`, `paid_at`, `external_reference`, `error_message`. Le détail du flux dépend de l'outil.
- Interface `InvoicingProvider` : `get_status(record)` (les autres méthodes sont ajoutées avec l'outil retenu). Première implémentation **`ManualProvider`** : la cheffe saisit le numéro et le statut dans l'administration ; un écran liste les « factures à émettre » (passages réalisés sans facture).

### 8.10 `payments`
- **`Payment`** : `stripe_payment_intent_id`, `stripe_checkout_session_id`, `purpose` ("booking_deposit", "client_share"), `amount_cents`, `status` ("pending", "succeeded", "failed", "refunded", "partially_refunded"), `client` (optionnel), `booking` / `invoice_record` (optionnels), `raw_event_ids`.
- **`WebhookEvent`** : `provider`, `event_id` (unique), `type`, `received_at`, `processed_at`, `status`, `payload` (JSON), `error`. Sert à l'idempotence.

### 8.11 `reviews`, `notifications`, `core`, `integrations`
- **`ReviewRequest`** : `client`, `session` ou `booking`, `status` ("sent", "received", "approved", "rejected"), `rating` (optionnel), `text`, `consent_publish` (booléen), `published_review` (FK `Review`).
- **`DataRequest`** (demande RGPD reçue par e-mail ou par téléphone, saisie par la cheffe) : `client`, `kind` ("export", "deletion"), `status` ("pending", "done", "refused"), `received_at`, `due_at` (réception + 30 jours), `handled_at`, `handled_by`.
- **`EmailTemplate`** : `key`, `subject`, `body_html`, `body_text`, modifiable en administration. **`EmailLog`** : destinataire, gabarit, statut, identifiant du fournisseur, objet lié (sans corps du message).
- **`AuditEvent`** : `actor`, `action`, `object_type`, `object_id`, `changes` (JSON), `ip`, `created_at`. **`PublishRun`** : `triggered_by`, `status` ("queued", "running", "success", "failed"), `github_run_url`, `started_at`, `finished_at`.

### 8.12 `staffdesk` (tableau de bord et relances aux clients)
- **`FollowUp`** : une ligne par **e-mail automatique à suivre pour un client** (liste en 1.4). `kind`, `target` (objet concerné : plan de repas, passage, réservation, avis), `client`, `status` ("scheduled" à venir, "waiting" envoyé en attente du client, "done", "cancelled"), `due_at`, `next_send_at`, `attempts`, `max_attempts`, `last_sent_at`, `snoozed_until`, `resolved_at`, `resolution` ("auto" situation résolue, "manual", "expired"), `note`. Unicité `(kind, target)`. **Aucune ligne n'est destinée à la cheffe.**
- **`FollowUpRule`** : une ligne par type de relance aux clients, modifiable en tableau dans l'administration : `kind`, `is_active`, `delay`, `max_attempts`, `email_template`. Les e-mails **du service** (lien de choix du menu, liste d'ingrédients) n'y figurent pas : les couper casserait la prestation.
- **`FollowUpSettings`** (singleton, administration) : **suspension globale** des envois automatiques (bandeau permanent tant qu'elle est active), plage et fréquence d'envoi (règles en 1.4), `menu_deadline_days` (date limite de choix par défaut, 2 jours avant le passage), `auto_menu_link` (envoi automatique du lien de choix, **désactivé par défaut**) et `auto_menu_link_days` (7 par défaut), `renewal_window_days` (fenêtre du compteur « Engagements bientôt terminés », 10 jours par défaut), `dashboard_window_days` (fenêtre des compteurs « Liens de choix à envoyer » et « Mes semaines à préparer », 7 jours par défaut). **Aucun réglage de notification pour la cheffe.**
- **`Client.automatic_emails_enabled`** : permet de suspendre tous les envois automatiques à un client donné (il demande à n'être contacté que par téléphone, par exemple).

## 9. API et contrat avec le site Next.js

**Principe** : le site lit Django **au moment de la construction**, jamais au chargement d'une page. L'API de lecture est versionnée (`/api/v1/`), authentifiée par `BUILD_API_TOKEN`, et ne renvoie que le contenu **publié**.

### 9.1 Routes de lecture (pour la construction du site)
Toutes les clés en camelCase, identiques aux schémas Zod existants ; une collection par route, sans pagination pour moins de 500 éléments, avec `updatedAt` par objet et ETag.
- `GET /api/v1/content/projects` : liste (forme de `projectSchema`, avec `slug`, `modified`).
- `GET /api/v1/content/inspirations`, `/reviews`, `/zones` (zones + communes), `/faq` (sections et entrées, par `placement`), `/legal-pages` et `/legal-pages/{slug}`, `/site-settings`.
- `GET /api/v1/content/recipes` : fiches **publiques**, sans quantités, avec `allergens` calculés (forme de `Recipe` de `lib/recipes.ts`).
- `GET /api/v1/pricing` : packs, grille de prix, taux de crédit d'impôt, prix chef privé et cours (forme de `PACKS`, `PRICES`, `TAX_CREDIT`).
- `GET /api/v1/content/page-texts` : le **calque des blocs vendeurs** (B11), de la même forme que `messages/fr.json`, limité aux clés éditées et publiées.
- `GET /api/v1/content/manifest` : `lastModified` par collection (utile au sitemap et au cache de construction).
- Les URL d'images sont **absolues** et servies par un CDN ou le stockage public.
- Le contenu Markdown (FAQ, pages) est renvoyé avec les marqueurs de prix déjà remplacés (voir 8.3).

### 9.2 Routes serveur à serveur (appelées par le site)
- `POST /api/v1/leads` (B05) : reçoit une demande du site (S01). Jeton serveur à serveur (`LEAD_API_TOKEN`, comparaison en temps constant), identifiant de demande pour l'idempotence, limitation de débit ; crée le contact, le deal « Nouveau » et sa note de détail ; ne renvoie aucune donnée de la base.

### 9.3 Page de choix du menu (servie par Django)
La page de choix **n'est pas une API** : c'est une page publique servie par Django, atteinte par un lien signé (`GET /menu/<jeton>` affiche le menu, `POST /menu/<jeton>` le valide). Elle est entièrement décrite en **B19** ; l'accès et le jeton en section 7.

### 9.4 Pas d'API pour l'administration

La cheffe utilise l'**administration Django** (session et 2FA) ; il n'y a donc **aucune API d'administration** à construire ni à exposer. Les pages de l'administration appellent des **vues internes** de Django (formulaires, fragments HTMX, téléchargement des pièces) et le **flux iCal** (adresse secrète, lecture seule) sous le préfixe `ADMIN_URL_PREFIX`, protégées par la session, le CSRF et les permissions. Les actions sensibles (annulation d'un passage, remboursement, prix différent de la grille, changement d'e-mail) exigent un **motif** et sont journalisées dans `AuditEvent`.

### 9.5 Webhooks entrants
- `POST /webhooks/stripe` : signature vérifiée, idempotence par `WebhookEvent`.
- `POST /webhooks/invoicing` : défini quand l'outil est choisi.

### 9.6 Sortants
- **GitHub** : `POST /repos/{owner}/{repo}/dispatches` (type `content-updated`) pour déclencher le déploiement du site, avec un jeton limité à ce dépôt.
- **Stripe** (B21), **Brevo** (B02).

### 9.7 Changements attendus côté site
Remplacer la lecture de `content/`, des FAQ, avis, zones, recettes et prix par des appels à l'API au moment de la construction ; garder Zod pour valider les réponses ; ajouter le workflow GitHub Actions qui répond à `repository_dispatch`.

## 10. Environnements, configuration et exigences transversales

### 10.1 Configuration (variables d'environnement)

`DJANGO_SECRET_KEY`, `DJANGO_ALLOWED_HOSTS`, `DATABASE_URL`, `STORAGE_*` (bucket, clés, URL publique), `BUILD_API_TOKEN`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `LEAD_API_TOKEN`, `BREVO_API_KEY`, `EMAIL_FROM`, `GITHUB_DISPATCH_TOKEN`, `GITHUB_REPO`, `SENTRY_DSN`, `SITE_BASE_URL`, `MENU_BASE_URL`, `ADMIN_URL_PREFIX`, `ICAL_FEED_TOKEN` (adresse secrète du flux iCal). Fournir `.env.example` sans valeur secrète.

### 10.2 Environnements et domaines
- **local** : Docker, base locale, e-mails écrits dans la console, Stripe en mode test, GitHub remplacé par des clients factices.
- **test** (préproduction) : site sur `test.tabletribu.com`. **Backend : domaine à confirmer** ; hypothèse de travail `api.test.tabletribu.com`. Stripe en mode test, base de test séparée, e-mails **uniquement vers une liste d'adresses autorisées**, aucune donnée réelle de client, publication vers le site de test.
- **production** : site sur `tabletribu.com`. **Backend : domaine à confirmer** ; hypothèse de travail `api.tabletribu.com`. Administration sous un préfixe non évident (`ADMIN_URL_PREFIX`).
- Chaque environnement a ses propres secrets, sa base et son stockage. Aucune donnée réelle de client en local ni en test.
- La page de choix du menu est servie par Django (`MENU_BASE_URL`, par exemple `api.tabletribu.com/menu/...`) et son adresse figure dans les e-mails envoyés au client.

### 10.3 Exigences non fonctionnelles

- **Performance** : page de choix du menu < 300 ms côté serveur ; API de construction avec ETag ; pas de requêtes N+1 (tests `assertNumQueries`).
- **Fiabilité** : tâches rejouables et idempotentes ; reprises exponentielles ; aucune perte de webhook (journal).
- **Sécurité** : sections 6.4, 6.5 et 7, et B24 ; dépendances à jour (Dependabot) ; secrets en variables d'environnement.
- **Sauvegardes** : base chiffrée, quotidienne, rétention 30 jours, test de restauration documenté.
- **Hébergement** : non spécifié ; le backend doit tourner en conteneur (Dockerfile + compose pour dev).
- **Couverture de tests** : ≥ 85 % sur `engagements`, `planning`, `payments`, `clients` — un **plancher**, pas un objectif ; la doctrine (quoi tester, à quel niveau, ce qu'on ne simule jamais) est dans le skill `tests` livré par B00b ; tests de bout en bout pour les flux B16 (page A-Dossier), B18 (plans de repas) et B20 (facturation).

### 10.4 Données de démonstration et tests

- Fixtures de développement : 1 compte d'équipe, 3 clients, 5 recettes avec ingrédients et quantités, 1 pack de chaque, 1 engagement par formule, passages à différents états.
- Tests de non-régression des interdits de la section 6.4.

# Partie IV — Annexe


## 11. Glossaire

### 11.1 Termes du métier
- **Engagement** : contrat d'un client pour une formule de batch cooking (1 semaine, 1 mois de 4 passages, ou sur mesure).
- **Passage** (`Session`) : visite de la cheffe chez le client pour préparer les dîners.
- **Réservation** (`Booking`) : chef privé ou cours (hors packs).
- **Plan de repas** (`MealPlan`) : le menu d'un passage, de la proposition de la cheffe jusqu'à la validation du client.
- **Lien de choix** : adresse à usage unique, envoyée par e-mail, qui ouvre la page où le client ajuste et valide le menu d'un passage, sans compte ni mot de passe.
- **Avance immédiate URSSAF** : dispositif où l'URSSAF règle la part de crédit d'impôt (50 %) après validation du client sous 48 h.
- **Référence de devis** : identifiant unique (`DEV-AAAA-NNN`) attribué par l'éditeur de devis à la finalisation, inscrit dans le PDF et refusé en double par Django, distinct de la numérotation continue des factures.
- **Pages « A-… »** : les trois écrans de l'administration **construits sur mesure**, par opposition aux listes et formulaires que Django génère tout seul. **A-Dossier** : créer un client et un engagement à partir d'un devis accepté. **A-Publier** : mettre le site en ligne. **A-Devis** : créer, modifier et finaliser un devis. Ce sont les étiquettes de ce document, pas les titres affichés à l'écran.
- **Relance** : e-mail automatique envoyé à un client (menu non rempli, rappel de passage, acompte, avis…), suivi dans le registre de Django (`FollowUp`) ; elle se clôt seule quand la situation est résolue. La cheffe ne reçoit aucune relance : elle lit un **tableau de bord**.
- **Offre commerciale** (`Offer`) : un nom, un paragraphe de devis et, parfois, une remise, posés par-dessus un service existant pour le vendre à un moment de vie précis — *Post-partum*, *Senior*, *Anniversaire*, *Renouvellement*. Créée par la cheffe dans l'administration, attachée à l'engagement qu'elle a vendu, et sans aucun effet sur l'exécution de la prestation.
- **Marqueur de prix** : texte comme `{{price.batch_from_after_credit}}` remplacé par l'API avec le prix réel, pour éviter des chiffres périmés dans la FAQ et les pages.
### 11.2 Sigles et termes techniques
Par ordre alphabétique. Les termes de cette liste sont employés tels quels dans le reste du document.

- **API** (*interface de programmation*) : porte d'entrée par laquelle deux logiciels se parlent sans intervention humaine. Ici, celle par laquelle le site lit les contenus de Django.
- **BFF** (*Backend For Frontend*) : principe selon lequel le serveur du site appelle l'API à la place du navigateur, qui ne parle jamais directement à Django. Aucune page du site n'en a besoin pour l'instant : le site est entièrement statique.
- **CGV** : conditions générales de vente, publiées sur le site et **versionnées** — la version acceptée est recopiée dans chaque engagement.
- **CMS** (*Content Management System*, système de gestion de contenu) : la partie de l'administration où la cheffe modifie elle-même le contenu du site — réalisations, avis, FAQ, pages légales — sans développeur. Ce n'est pas un logiciel séparé : c'est l'administration Django (B03).
- **Construction du site** (*build*) : l'opération qui transforme les contenus en pages figées. Elle lit Django **une fois**, au moment de la publication ; aucune page ne l'interroge ensuite quand un visiteur la consulte.
- **CRM** (*Customer Relationship Management*, gestion de la relation client) : l'outil qui garde les contacts, les affaires en cours (deals), les notes et les devis envoyés. Ici, le **CRM interne** de l'administration Django (B05, B06).
- **Double authentification** (*2FA*, par *TOTP*) : en plus du mot de passe, un code à six chiffres qui change toutes les trente secondes, lu dans une application sur votre téléphone. Obligatoire en production.
- **Intégration continue** (*CI*) : les vérifications automatiques qui s'exécutent à chaque proposition de modification du code — tests, sécurité, migrations. Une PR dont l'intégration continue échoue n'est pas fusionnée.
- **LTS** (*Long Term Support*, support à long terme) : version de Django maintenue plusieurs années, choisie pour éviter une mise à jour majeure tous les six mois.
- **PR** (*Pull Request*, proposition de modification) : un lot de code cohérent, confié seul à Claude, relu puis fusionné. C'est l'unité de livraison de ce document : les PR du backend sont préfixées **B**, celles du site **S**.
- **Webhook** : appel que nous recevons d'un prestataire quand un événement survient chez lui — par exemple Stripe nous prévenant qu'un paiement a abouti. L'inverse d'une API que nous interrogeons.
