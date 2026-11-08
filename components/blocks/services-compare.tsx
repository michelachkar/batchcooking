import { SectionHeading } from '@/components/ui/section-heading'
import { Section } from '@/components/ui/section'
import styles from './services-compare.module.css'

// 2. Tableau comparatif (cartes empilées en mobile).
export function ServicesCompare(p: {
  kicker: string
  title: string
  columns: string[]
  rows: { label: string; values: string[] }[]
  note: string
}) {
  return (
    <Section name="compare" tone="beige">
      <SectionHeading kicker={p.kicker} title={p.title} />
      <div data-reveal="up" className={styles.wrap}>
        <table className={styles.table}>
          <thead className={styles.head}>
            <tr>
              <th scope="col" className={styles.corner} />
              {p.columns.map((c) => (
                <th key={c} scope="col" className={styles.columnHead}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.body}>
            {p.rows.map((r) => (
              <tr key={r.label} className={styles.row}>
                <th scope="row" className={styles.rowLabel}>
                  {r.label}
                </th>
                {r.values.map((v, i) => (
                  <td key={i} className={styles.cell}>
                    <span className={styles.cellLabel}>{p.columns[i]}</span>
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={styles.note}>{p.note}</p>
    </Section>
  )
}
