import styles from './trusted-by.module.css'
import { ClientCarousel, type Logo } from '@/components/blocks/client-carousel'

type Props = {
  title: string
  logos: Logo[]
  /** Marge au-dessus du filet (26 px sur les pages intérieures). */
  topGap?: number
  /** Espace sous les logos, dans le cadre (80 px sur les pages intérieures). */
  tail?: number
  /** Hauteur des logos (40 px par défaut, 90 px sur la page équipe). */
  logoHeight?: number
  /** Marge sous la section. */
  bottomGap?: number
}

// Bandeau « ils nous font confiance » : filet, phrase et défilement de logos en niveaux de gris. À n'afficher qu'avec de vraies références.
export function TrustedStrip({
  title,
  logos,
  topGap = 0,
  tail = 0,
  logoHeight = 40,
  borderColor = '#e2e2e2',
}: Omit<Props, 'bottomGap'> & { borderColor?: string }) {
  return (
    <div style={{ marginTop: topGap, borderColor }} className={styles.strip}>
      <div className={styles.spacer} aria-hidden />
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.logos}>
        <ClientCarousel logos={logos} height={logoHeight} grayscale />
      </div>
      {tail > 0 && <div style={{ height: tail }} aria-hidden />}
    </div>
  )
}

export function TrustedBy({ bottomGap = 0, ...strip }: Props) {
  return (
    <section data-section="trusted" style={{ marginBottom: bottomGap }} className={styles.root}>
      <div className={styles.inner}>
        <TrustedStrip {...strip} />
      </div>
    </section>
  )
}
