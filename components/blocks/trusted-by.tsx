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
    <div
      style={{ marginTop: topGap, borderColor }}
      className="flex flex-col gap-5 border-t p-[10px]"
    >
      <div className="h-6" aria-hidden />
      <h4 className="font-display text-ink m-0 text-center text-[16px] leading-[15px] font-semibold tracking-[-0.02em] max-lg:text-xl max-lg:leading-6">
        {title}
      </h4>
      <div className="mx-auto mt-[5px] w-4/5 pb-0">
        <ClientCarousel logos={logos} height={logoHeight} grayscale />
      </div>
      {tail > 0 && <div style={{ height: tail }} aria-hidden />}
    </div>
  )
}

export function TrustedBy({ bottomGap = 0, ...strip }: Props) {
  return (
    <section data-section="trusted" style={{ marginBottom: bottomGap }} className="leading-normal">
      <div className="mx-auto flex max-w-[1350px] flex-col gap-5 py-[10px]">
        <TrustedStrip {...strip} />
      </div>
    </section>
  )
}
