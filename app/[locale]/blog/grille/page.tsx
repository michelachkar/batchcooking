import { redirect } from 'next/navigation'

// Ancienne adresse de la grille : le Journal est désormais en grille sur /blog.
export default function BlogGridRedirect() {
  redirect('/blog')
}
