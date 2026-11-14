import { z } from 'zod'

// Schémas du frontmatter MDX : un fichier mal formé fait échouer le build avec le chemin et le champ fautif.
const image = z.object({
  src: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: z.string(),
})

export const projectSchema = z.object({
  title: z.string().min(1),
  /** Rang dans la liste (0 = premier). */
  order: z.number().int().default(0),
  date: z.coerce.date(),
  excerpt: z.string().min(1),
  categories: z.array(z.string()).default([]),
  /** Photo de la page du projet. */
  image: image,
  /** Photo des cartes (format portrait recadré par la carte ; à défaut, `image`). */
  thumbnail: image.optional(),
  gallery: z.array(image).default([]),
  /** Service concerné : sert au filtre de la galerie et au lien de devis. */
  service: z.enum(['batch', 'chef', 'cours']).default('chef'),
  /** Occasion (filtre) : Au quotidien, Anniversaire, Fête de famille, Entre amis, En couple, Enfants, Entreprise… */
  occasion: z.string().optional(),
  /** Tags libres (filtre) : style de prestation, plats, ambiance… */
  tags: z.array(z.string()).default([]),
  /** Commune (filtre). */
  city: z.string().optional(),
  /** Nombre de personnes (filtre par taille de groupe). */
  guestCount: z.number().int().positive().optional(),
  /** Régimes pris en compte (filtre) : Sans gluten, Végétarien, Sans lactose… */
  diets: z.array(z.string()).default([]),
  /** Durée de la prestation (ex. « 4 h sur place »). */
  duration: z.string().optional(),
  /** Convives ou participants (ex. « 8 convives »). */
  guests: z.string().optional(),
  /** Menu servi, plats préparés ou programme du cours, un élément par ligne. */
  menu: z.array(z.string()).default([]),
  /** Avis du client. */
  review: z.object({ quote: z.string().min(1), author: z.string().min(1) }).optional(),
  client: z.string().optional(),
  location: z.string().optional(),
  /** Adresse du projet (site du client, par exemple). */
  url: z.string().optional(),
  /** Projets à montrer en fin de page (adresses de fichier) ; à défaut, ceux de la même catégorie puis les suivants. */
  related: z.array(z.string()).default([]),
})
export type Project = z.infer<typeof projectSchema>

export const pageSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  /** Dernière mise à jour (sitemap). */
  updated: z.coerce.date(),
})
export type PageData = z.infer<typeof pageSchema>

// Photo de la galerie d'inspiration : indépendante des réalisations (un lien vers une réalisation reste possible).
export const inspirationSchema = z.object({
  title: z.string().min(1),
  /** Rang dans la galerie (0 = premier). */
  order: z.number().int().default(0),
  image: image,
  service: z.enum(['batch', 'chef', 'cours']),
  excerpt: z.string().optional(),
  /** Commune ou lieu. */
  location: z.string().optional(),
  occasion: z.string().optional(),
  tags: z.array(z.string()).default([]),
  guests: z.string().optional(),
  duration: z.string().optional(),
  /** Adresse interne du bouton du diaporama (ex. `/realisations/mon-projet`) ; sans lien, le bouton est masqué. */
  href: z.string().regex(/^\//, 'Adresse interne : doit commencer par /').optional(),
  /** Mettre à `false` pour masquer la photo sans supprimer le fichier. */
  published: z.boolean().default(true),
})
export type Inspiration = z.infer<typeof inspirationSchema>
