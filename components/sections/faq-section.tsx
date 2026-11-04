import { getTranslations } from 'next-intl/server'
import { Faq, type FaqItem } from '@/components/blocks/faq'
import { media } from '@/lib/media'

// FAQ : uniquement de vraies questions (messages faq.items) ; rien tant qu'il n'y en a pas.
export async function FaqSection() {
  const t = await getTranslations('faq')
  const items = t.raw('items') as FaqItem[]
  if (items.length === 0) return null
  const photos = (t.raw('photos') as { alt: string }[]).map((p, i) => ({
    alt: p.alt,
    image: media.faq[i],
  }))
  return (
    <Faq
      items={items}
      photos={photos}
      stats={t.raw('stats') as { label: string; value: number }[]}
      cta={{
        title: t('cta.title'),
        text: t('cta.text'),
        button: { label: t('cta.button'), href: '/contact' },
      }}
    />
  )
}
