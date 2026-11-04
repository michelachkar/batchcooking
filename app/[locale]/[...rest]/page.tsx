import { notFound } from 'next/navigation'

// Toute adresse inconnue passe par la page 404 du site (app/[locale]/not-found.tsx), dans la mise en page avec en-tête et pied.
export default function CatchAll() {
  notFound()
}
