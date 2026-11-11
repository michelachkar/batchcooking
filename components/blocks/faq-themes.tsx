import styles from './faq-themes.module.css'
import { Section } from '@/components/ui/section'
import { rich } from '@/components/ui/rich-text'

// Intro de la FAQ et liens vers chaque thème (un par service).
export function FaqThemes(p: {
  label: string
  intro: string
  themes: { id: string; label: string; count: number }[]
}) {
  return (
    <Section name="faq-themes">
      <div className={styles.root} data-reveal="up">
        <p className={styles.intro}>{rich(p.intro)}</p>
        <nav aria-label={p.label}>
          <ul className={styles.list}>
            {p.themes.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className={styles.link}>
                  {t.label}
                  <span className={styles.count}>{t.count}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Section>
  )
}
