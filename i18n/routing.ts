import { defineRouting } from 'next-intl/routing'

// Français seul pour l'instant. Ajouter 'en' ici (et messages/en.json) suffit à ouvrir la version anglaise :
// le préfixe n'apparaît que pour les langues non par défaut.
export const routing = defineRouting({
  locales: ['fr'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed',
})
