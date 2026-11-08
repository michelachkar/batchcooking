import { getTranslations } from '@/lib/i18n'
import { StoryBlock } from '@/components/blocks/story-block'
import { media } from '@/lib/media'

// « Comment ça marche » en 3 étapes (messages `${ns}`, photos `photos`) : titre, cartes, puis boutons.
export async function ProcessSection({
  ns,
  photos,
  extraButton,
}: {
  ns: string
  /** Bouton supplémentaire : libellé lu dans `${ns}.extraButton`, lien fourni ici. */
  extraButton?: { href: string }
  photos: { src: string; width: number; height: number }[]
}) {
  const a = await getTranslations(ns)
  return (
    <StoryBlock
      label={a('label')}
      title={a('title')}
      intro={a.has('intro') ? a('intro') : undefined}
      stepCards={(
        a.raw('steps') as { icon: string; title: string; text: string; alt: string }[]
      ).map(({ alt, ...st }, i) => ({ ...st, image: { ...photos[i], alt } }))}
      button={{ label: a('button'), href: a('buttonHref'), accent: true }}
      extraButton={extraButton ? { label: a('extraButton'), href: extraButton.href } : undefined}
    />
  )
}
