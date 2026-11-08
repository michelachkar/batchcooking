import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import styles from './rich-text.module.css'

// Texte des messages avec un peu de mise en forme : **gras** et [texte](/lien).
const TOKEN = /(\*\*.+?\*\*|\[[^\]]+\]\([^)]+\))/g

type RichOptions = {
  /** Ouvre les liens dans un nouvel onglet (avec cette mention pour les lecteurs d'écran). */
  newTab?: string
}

export function rich(s: string, options?: RichOptions): React.ReactNode[] {
  return s.split(TOKEN).map((part, i) => {
    if (part.startsWith('**')) {
      const text = part.slice(2, -2)
      // « Signature » est la marque de la formule haut de gamme : écriture cursive entre guillemets rouges.
      if (text === 'Signature')
        return (
          <span key={i}>
            <span className={styles.quote}>«&nbsp;</span>
            <strong className={styles.signature}>{text}</strong>
            <span className={styles.quote}>&nbsp;»</span>
          </span>
        )
      return <strong key={i}>{text}</strong>
    }
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part)
    if (link && options?.newTab)
      return (
        <a key={i} href={link[2]} target="_blank" rel="noopener" className={styles.link}>
          {rich(link[1])}
          <ExternalLink aria-hidden className={styles.linkIcon} />
          <span className="sr-only"> {options.newTab}</span>
        </a>
      )
    if (link)
      return (
        <Link key={i} href={link[2]} className={styles.link}>
          {rich(link[1])}
        </Link>
      )
    return part
  })
}
