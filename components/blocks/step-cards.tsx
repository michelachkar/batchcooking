import Image from 'next/image'
import { Check } from 'lucide-react'
import { rich } from '@/components/ui/rich-text'
import { contentIcon } from '@/components/ui/icon-registry'
import styles from './step-cards.module.css'

export type StepCard = {
  icon: string
  title: string
  text: string
  image: { src: string; width: number; height: number; alt: string }
}

// Étapes en cartes : pastille numérotée, pictogramme, titre, texte et photo.
export function StepCards({ steps }: { steps: StepCard[] }) {
  return (
    <ol className={styles.stepCards}>
      {steps.map((s, i) => {
        const Icon = contentIcon(s.icon) ?? Check
        return (
          <li key={s.title} data-reveal="up" data-d={i + 1} className={styles.stepCardItem}>
            <span className={styles.stepBadge}>{i + 1}</span>
            <div className={styles.stepCardBody}>
              <Icon aria-hidden className={styles.stepCardIcon} strokeWidth={1.6} />
              <h3 className={styles.stepCardTitle}>{s.title}</h3>
              <p className={styles.stepCardText}>{rich(s.text)}</p>
            </div>
            <div className={styles.stepCardPhoto}>
              <Image
                src={s.image.src}
                alt={s.image.alt}
                width={s.image.width}
                height={s.image.height}
                sizes="(min-width: 1025px) 30vw, 100vw"
                className={styles.stepCardImage}
              />
            </div>
          </li>
        )
      })}
    </ol>
  )
}
