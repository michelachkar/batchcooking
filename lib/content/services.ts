/**
 * Pages de service du site : trois pages dédiées (`app/services/<adresse>/page.tsx`) dont les textes sont dans messages/fr.json (espace `ns`).
 */
export const servicePages = [
  { slug: 'batch-cooking', ns: 'batchPage' },
  { slug: 'chef-prive', ns: 'chefPage' },
  { slug: 'cours-de-cuisine', ns: 'coursPage' },
] as const
