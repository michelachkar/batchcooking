type Node = Record<string, unknown>

// Données structurées en @graph ; « < » est échappé pour qu'un texte ne puisse pas fermer la balise script.
export function JsonLd({ graph }: { graph: (Node | null | undefined)[] }) {
  const data = { '@context': 'https://schema.org', '@graph': graph.filter(Boolean) }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
