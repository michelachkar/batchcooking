import Link from 'next/link'
import { SectionShell } from '@/components/blocks/section-shell'
import { ArrowIcon, Icon, type IconName } from '@/components/ui/icon'
import styles from './evening-steps.module.css'

type Props = {
  kicker: string
  title: string
  button: { label: string; href: string }
  steps: { icon: IconName; title: string; text: string }[]
}

// Section « comment ça marche » : fond vert, quatre étapes reliées par un filet (colonne unique et filet vertical en mobile).
export function EveningSteps({ kicker, title, button, steps }: Props) {
  return (
    <SectionShell name="steps" className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>{kicker}</p>
            <h2 className={styles.title}>{title}</h2>
          </div>
          <Link href={button.href} className={styles.button}>
            {button.label}
            <ArrowIcon className={styles.buttonArrow} />
          </Link>
        </header>
        <ol className={styles.steps}>
          {steps.map((s, i) => (
            <li key={s.title} className={styles.step}>
              <span aria-hidden className={styles.dot}>
                <Icon name={s.icon} className={styles.dotIcon} />
                <em className={styles.number}>{String(i + 1).padStart(2, '0')}</em>
              </span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepText}>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  )
}
