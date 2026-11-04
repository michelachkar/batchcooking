import { Mail, MapPin, Phone } from 'lucide-react'
import { DualHeader } from '@/components/blocks/dual-header'
import { ProposalForm, type ProposalField } from '@/components/blocks/proposal-form'
import type { ProposalState } from '@/lib/proposal-schema'

type Props = {
  kicker: string
  title: string
  highlight: string
  description: string
  address?: string
  phone?: { label: string; href: string }
  email?: string
  followTitle: string
  social: { name: string; href: string; path: string }[]
  socialLabel: string
  fields: ProposalField[]
  note: string
  submit: string
  messages: Record<Exclude<ProposalState['status'], 'idle'>, string>
}

const icon = 'mr-[5px] size-5 shrink-0 fill-current text-[#236c4b]'

// Page contact : coordonnées et réseaux à gauche, carte blanche avec le formulaire de demande à droite.
// Sous 1025 px les deux blocs s'empilent (la démo écrase la carte à 74 px de large en tablette : défaut non reproduit).
export function Contact(p: Props) {
  return (
    <section
      id="contact"
      data-section="contact"
      className="mx-auto flex w-[min(1320px,100%-120px)] items-start gap-x-14 gap-y-8 py-[90px] leading-normal max-lg:w-full max-lg:flex-col max-md:pt-12 max-md:pb-5"
    >
      <div className="flex flex-col justify-center max-lg:mt-20 max-lg:px-[15px] max-md:mt-0 max-md:px-5 lg:shrink-0 lg:basis-[528px]">
        <DualHeader
          size="compact"
          align="left"
          kicker={p.kicker}
          title={p.title}
          highlight={p.highlight}
          description={p.description}
          className="mb-5"
        />
        <ul className="m-0 mb-10 list-none p-0 font-medium text-[#5a5a5a]">
          {p.address && (
            <li className="flex items-center pb-[10.5px]">
              <MapPin className={icon} aria-hidden />
              <span className="pl-[5px]">{p.address}</span>
            </li>
          )}
          {p.phone && (
            <li className="flex items-center not-first:mt-[10.5px] not-last:pb-[10.5px]">
              <a href={p.phone.href} className="flex items-center text-[#234a3a]">
                <Phone className={icon} aria-hidden />
                <span className="pl-[5px] text-[#5a5a5a]">{p.phone.label}</span>
              </a>
            </li>
          )}
          {p.email && (
            <li className="flex items-center not-first:mt-[10.5px]">
              <a href={`mailto:${p.email}`} className="flex items-center text-[#234a3a]">
                <Mail className={icon} aria-hidden />
                <span className="pl-[5px] text-[#5a5a5a]">{p.email}</span>
              </a>
            </li>
          )}
        </ul>
        {p.social.length > 0 && (
          <>
            <h4 className="font-display mt-[25px] mb-5 text-[24px] leading-6 font-semibold tracking-[-0.02em] text-[#242424] max-lg:text-[20px]">
              {p.followTitle}
            </h4>
            <ul
              data-vr-mask
              aria-label={p.socialLabel}
              className="m-0 mt-[10px] flex list-none gap-[15px] p-0 text-[#69727d]"
            >
              {p.social.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    aria-label={s.name}
                    className="flex size-6 items-center justify-center rounded-full transition-colors hover:text-[#234a3a]"
                  >
                    <svg viewBox="0 0 24 24" className="size-6 fill-current" aria-hidden>
                      <path d={s.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="flex flex-col gap-5 rounded-[18px] border border-[#e6e4dd] bg-white p-9 max-lg:mx-[15px] max-md:mx-0 max-md:p-[22px_18px] lg:flex-1">
        <ProposalForm
          tone="forest"
          fields={p.fields}
          note={p.note}
          submit={p.submit}
          messages={p.messages}
        />
      </div>
    </section>
  )
}
