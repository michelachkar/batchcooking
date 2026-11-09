import { rich } from '@/components/ui/rich-text'
import styles from './faq-accordion.module.css'

export type FaqItem = { question: string; answer: string }

// Accordéon natif (<details name>, sans JS) : une seule question ouverte à la fois par groupe `name`.
export function FaqAccordion({
  items,
  name,
  openFirst = true,
}: {
  items: FaqItem[]
  name: string
  openFirst?: boolean
}) {
  return (
    <>
      {items.map((item, i) => (
        <details
          key={item.question}
          name={name}
          open={openFirst && i === 0}
          className={styles.item}
        >
          <summary className={styles.question}>
            <span>{item.question}</span>
            <svg viewBox="0 0 24 16" aria-hidden className={styles.icon}>
              <rect x="8" y="6.5" width="16" height="3" />
              <rect x="14.5" y="0" width="3" height="16" className={styles.plusBar} />
            </svg>
          </summary>
          <div className={styles.answer}>
            <p className={styles.answerText}>{rich(item.answer)}</p>
          </div>
        </details>
      ))}
    </>
  )
}
