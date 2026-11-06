import { MediaSplit, type MediaSplitProps } from '@/components/blocks/media-split'
import styles from './chef-intro.module.css'

// Section « présentation de la cheffe ou du chef » : fond blanc, media-split ton clair.
export function ChefIntro(props: Omit<MediaSplitProps, 'name' | 'tone'>) {
  return (
    <section data-section="chef" className={styles.root}>
      <div className={styles.band}>
        <div className={styles.inner}>
          <MediaSplit {...props} name="chef" tone="light" imageWidth={44} />
        </div>
      </div>
    </section>
  )
}
