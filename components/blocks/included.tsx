import clsx from 'clsx'
import { MediaSplit, type MediaSplitProps } from '@/components/blocks/media-split'
import styles from './included.module.css'

// Section « ce qui est inclus » : fond blanc, photo à droite avec photo incrustée, liste à icônes et options.
export function Included({
  flush,
  ...props
}: Omit<MediaSplitProps, 'name' | 'tone' | 'imageSide'> & {
  /** Collé aux sections voisines : pas de bande crème au-dessus. */
  flush?: boolean
}) {
  return (
    <section data-section="included" className={clsx(styles.root, flush && styles.flush)}>
      <div className={styles.band}>
        <div className={styles.inner}>
          <MediaSplit {...props} name="included" tone="light" imageSide="right" imageWidth={44} />
        </div>
      </div>
    </section>
  )
}
