import { MDXRemote } from 'next-mdx-remote/rsc'

// Corps d'un contenu MDX, rendu sur le serveur (aucun JavaScript envoyé au navigateur).
export function Mdx({ source }: { source: string }) {
  return <MDXRemote source={source} />
}
