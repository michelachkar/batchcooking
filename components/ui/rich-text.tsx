import Link from 'next/link'
import styles from './rich-text.module.css'

// Texte des messages avec un peu de mise en forme : **gras** et [texte](/lien).
const TOKEN = /(\*\*.+?\*\*|\[[^\]]+\]\([^)]+\))/g

export function rich(s: string): React.ReactNode[] {
  return s.split(TOKEN).map((part, i) => {
    if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part)
    if (link)
      return (
        <Link key={i} href={link[2]} className={styles.link}>
          {link[1]}
        </Link>
      )
    return part
  })
}
