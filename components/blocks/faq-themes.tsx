import styles from './faq-themes.module.css'
import { Shell } from '@/components/blocks/home-v2'

// Intro de la FAQ et liens vers chaque thème.
export function FaqThemes(p: {
  label: string
  intro: string
  themes: { id: string; label: string }[]
}) {
  return (
    <Shell name="faq-themes">
      <div className={styles.root} data-reveal="up">
        <p className={styles.intro}>{p.intro}</p>
        <nav aria-label={p.label}>
          <ul className={styles.list}>
            {p.themes.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className={styles.link}>
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Shell>
  )
}
