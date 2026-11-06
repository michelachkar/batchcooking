import { Check } from 'lucide-react'
import { Cta, Heading, INK, Shell, SOFT } from '@/components/blocks/home-v2'
import { FormulaCards } from '@/components/blocks/chef-page'

// Idée cadeau et bons cadeaux.
export function GiftSection(p: {
  kicker: string
  title: string
  intro: string
  items: { icon: string; title: string; text: string }[]
  validity: string
  cta: { label: string; href: string }
}) {
  return (
    <FormulaCards
      name="gift"
      tone="terracotta"
      columns={3}
      kicker={p.kicker}
      title={p.title}
      intro={p.intro}
      items={p.items}
      footer={
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <Cta href={p.cta.href} label={p.cta.label} light />
          <p className="flex items-center gap-2 text-[15px] text-white/85">
            <Check aria-hidden className="size-4" strokeWidth={3} />
            {p.validity}
          </p>
        </div>
      }
    />
  )
}
