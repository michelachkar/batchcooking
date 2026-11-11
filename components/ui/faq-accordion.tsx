import { rich, typo } from '@/components/ui/rich-text'
import styles from './faq-accordion.module.css'

export type FaqItem = { question: string; answer: string }

// Ligne « **Service :** texte » : un service par ligne, présenté avec une pastille.
const SERVICE_LINE = /^\*\*(.+?:)\*\*\s*(.+)$/

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
            <span>{typo(item.question)}</span>
            <span className={styles.toggle} aria-hidden>
              <svg viewBox="8 0 16 16" className={styles.icon}>
                <rect x="8" y="6.5" width="16" height="3" />
                <rect x="14.5" y="0" width="3" height="16" className={styles.plusBar} />
              </svg>
            </span>
          </summary>
          <div className={styles.answer}>
            {item.answer.split('\n').map((line, n) => {
              const service = SERVICE_LINE.exec(line)
              return service ? (
                <div key={n} className={styles.service}>
                  <span className={styles.serviceLabel}>
                    {rich(service[1].replace(/\s*:$/, ''))}
                  </span>
                  <span className={styles.serviceText}>{rich(service[2])}</span>
                </div>
              ) : (
                <p key={n} className={styles.answerText}>
                  {rich(line)}
                </p>
              )
            })}
          </div>
        </details>
      ))}
    </>
  )
}
