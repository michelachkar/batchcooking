import Link from 'next/link'

// Texte des messages avec un peu de mise en forme : **gras** et [texte](/lien).
const TOKEN = /(\*\*.+?\*\*|\[[^\]]+\]\([^)]+\))/g

export function rich(s: string): React.ReactNode[] {
  return s.split(TOKEN).map((part, i) => {
    if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part)
    if (link)
      return (
        <Link
          key={i}
          href={link[2]}
          className="font-semibold text-[#B04A2A] underline decoration-[#B04A2A]/40 underline-offset-2 hover:decoration-[#B04A2A]"
        >
          {link[1]}
        </Link>
      )
    return part
  })
}
