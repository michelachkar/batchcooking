import Image from 'next/image'
import Link from 'next/link'
import { Icon, type IconName } from '@/components/ui/icon'
import { ProposalForm, type ProposalField } from '@/components/blocks/proposal-form'
import type { ProposalState } from '@/lib/proposal-schema'
import styles from './proposal.module.css'

type Props = {
  /** Photo d'arrière-plan (facultative), voilée de bordeaux. */
  background?: { src: string; unoptimized?: boolean }

  kicker: string
  title: string
  text: string
  points: { icon: IconName; text: string; href?: string }[]
  formTitle: string
  formIntro: string
  fields: ProposalField[]
  note: string
  submit: string
  messages: Record<Exclude<ProposalState['status'], 'idle'>, string>
}

// « Demander un devis » : cadre bordeaux, argumentaire à gauche, carte ivoire avec le formulaire à droite (ancre #proposal).
export function Proposal(p: Props) {
  return (
    <section id="proposal" data-section="proposal" className={styles.root}>
      <div className={styles.frame}>
        {p.background && (
          <Image
            src={p.background.src}
            alt=""
            fill
            sizes="100vw"
            unoptimized={p.background.unoptimized}
            className={styles.background}
          />
        )}
        <div className={styles.layout}>
          <div className={styles.pitch}>
            <p className={styles.kicker}>{p.kicker}</p>
            <h2 className={styles.title}>{p.title}</h2>
            <div className={styles.text}>
              <p className={styles.paragraph}>{p.text}</p>
            </div>
            <ul className={styles.points}>
              {p.points.map((pt) => {
                const inner = (
                  <>
                    <span className={styles.pointIconWrap}>
                      <Icon name={pt.icon} className={styles.pointIcon} />
                    </span>
                    <span className={styles.pointText}>{pt.text}</span>
                  </>
                )
                return (
                  <li key={pt.text} className={styles.point}>
                    {pt.href ? (
                      <Link href={pt.href} className={styles.pointLink}>
                        {inner}
                      </Link>
                    ) : (
                      inner
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>{p.formTitle}</h3>
            <div className={styles.cardIntro}>
              <p className={styles.cardParagraph}>{p.formIntro}</p>
            </div>
            <ProposalForm fields={p.fields} note={p.note} submit={p.submit} messages={p.messages} />
          </div>
        </div>
      </div>
    </section>
  )
}
