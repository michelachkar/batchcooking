import { CheckCircle2, Clock, Hourglass, Mail, MapPin, Phone } from 'lucide-react'
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
  hours?: string
  reassure: string[]
  labels: {
    hours: string
    response: string
    responseValue: string
    info: string
    form: string
    formIntro: string
  }
  followTitle: string
  social: { name: string; href: string; path: string }[]
  socialLabel: string
  fields: ProposalField[]
  note: string
  submit: string
  messages: Record<Exclude<ProposalState['status'], 'idle'>, string>
}

const icon = 'mr-[5px] size-5 shrink-0 fill-current text-[#50453F]'

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
        <ul className="m-0 mb-8 flex list-none flex-wrap gap-2 p-0">
          {p.reassure.map((r) => (
            <li
              key={r}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#B04A2A]/10 px-3.5 py-1.5 text-[14px] font-semibold text-[#8A3A20]"
            >
              <CheckCircle2 aria-hidden className="size-4" />
              {r}
            </li>
          ))}
        </ul>
        <h2 className="font-display mb-4 text-[24px] leading-6 font-semibold tracking-[-0.02em] text-[#242424] max-lg:text-[20px]">
          {p.labels.info}
        </h2>
        <ul className="m-0 mb-10 list-none p-0 font-medium text-[#5a5a5a]">
          {p.address && (
            <li className="flex items-center pb-[10.5px]">
              <MapPin className={icon} aria-hidden />
              <span className="pl-[5px]">{p.address}</span>
            </li>
          )}
          {p.phone && (
            <li className="flex items-center not-first:mt-[10.5px] not-last:pb-[10.5px]">
              <a href={p.phone.href} className="flex items-center text-[#B04A2A]">
                <Phone className={icon} aria-hidden />
                <span className="pl-[5px] text-[#5a5a5a]">{p.phone.label}</span>
              </a>
            </li>
          )}
          {p.email && (
            <li className="flex items-center not-first:mt-[10.5px]">
              <a href={`mailto:${p.email}`} className="flex items-center text-[#B04A2A]">
                <Mail className={icon} aria-hidden />
                <span className="pl-[5px] text-[#5a5a5a]">{p.email}</span>
              </a>
            </li>
          )}
          {p.hours && (
            <li className="flex items-center not-first:mt-[10.5px]">
              <Clock className={icon} aria-hidden />
              <span className="pl-[5px]">
                <span className="sr-only">{p.labels.hours} : </span>
                {p.hours}
              </span>
            </li>
          )}
          <li className="flex items-center not-first:mt-[10.5px]">
            <Hourglass className={icon} aria-hidden />
            <span className="pl-[5px]">
              {p.labels.response} : {p.labels.responseValue}
            </span>
          </li>
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
                    className="flex size-6 items-center justify-center rounded-full transition-colors hover:text-[#B04A2A]"
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
      <div
        id="devis"
        className="flex scroll-mt-28 flex-col gap-5 rounded-[18px] border border-[#E3D9CC] bg-white p-9 max-lg:mx-[15px] max-md:mx-0 max-md:p-[22px_18px] lg:flex-1"
      >
        <span id="inquiry" aria-hidden className="scroll-mt-28" />
        <div>
          <h2 className="font-display m-0 text-[28px] leading-[1.2] font-semibold text-[#242424]">
            {p.labels.form}
          </h2>
          <p className="mt-2 mb-0 text-[15px] leading-normal text-[#625C50]">
            {p.labels.formIntro}
          </p>
        </div>
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
