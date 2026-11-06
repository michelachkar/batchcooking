'use client'

import { useActionState } from 'react'
import { submitProposal } from '@/app/[locale]/actions'
import type { ProposalState } from '@/lib/proposal-schema'
import { cn } from '@/lib/utils'

export type ProposalField = {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'date' | 'select' | 'textarea'
  placeholder?: string
  options?: string[]
  required?: boolean
  full?: boolean
  /** Un tiers de la largeur (sinon la moitié). */
  third?: boolean
}

type Props = {
  fields: ProposalField[]
  note: string
  submit: string
  messages: Record<Exclude<ProposalState['status'], 'idle'>, string>
  /** Teinte : « wine » (cadre bordeaux de l'accueil) ou « forest » (page contact). */
  tone?: 'wine' | 'forest'
}

const base =
  'w-full m-0 h-[54px] rounded-xl border px-4 text-[15px] font-normal normal-case tracking-normal placeholder:text-[#6b716d] focus:outline-none aria-invalid:border-[#b4233c] [transition:border-color_0.2s_ease,background-color_0.2s_ease,box-shadow_0.2s_ease]'
const tones = {
  wine: {
    control:
      'border-[#e3d5d0] bg-white text-[#2a1a1e] hover:border-[#c9a3ac] focus:border-[#5a1e2b] focus:shadow-[0_0_0_3px_rgba(90,30,43,0.14)]',
    label: 'text-[#5a1e2b]',
    note: 'text-[#6e5a5f]',
    submit:
      'border-[#5a1e2b] bg-[#5a1e2b] text-[#f6f1e7] hover:border-[#3f1420] hover:bg-[#3f1420] hover:shadow-[0_14px_28px_rgba(63,20,32,0.3)] focus-visible:border-[#3f1420] focus-visible:bg-[#3f1420]',
  },
  forest: {
    control:
      'border-transparent bg-[#F0EBE3] text-[#2F2B26] hover:border-[#E8A98E] focus:border-[#B04A2A] focus:shadow-[0_0_0_3px_rgba(176,74,42,0.14)]',
    label: 'text-[#B04A2A]',
    note: 'text-[#625C50]',
    submit:
      'border-[#B04A2A] bg-[#B04A2A] text-[#FAF7F2] hover:border-[#302925] hover:bg-[#302925] hover:shadow-[0_14px_28px_rgba(176,74,42,0.3)] focus-visible:border-[#302925] focus-visible:bg-[#302925]',
  },
}

// Formulaire de devis : Server Action, fonctionne sans JavaScript ; le client ne fait qu'afficher le résultat.
export function ProposalForm({ fields, note, submit, messages, tone = 'wine' }: Props) {
  const t = tones[tone]
  const [state, action, pending] = useActionState<ProposalState, FormData>(submitProposal, {
    status: 'idle',
  })
  const invalid = new Set(state.fields)

  return (
    <form
      action={action}
      noValidate={false}
      className="grid grid-cols-6 gap-x-4 gap-y-[18px] max-md:grid-cols-1"
    >
      {fields.map((f) => (
        <label
          key={f.name}
          className={cn(
            'flex flex-col gap-2 text-[11px] leading-[1.3] font-bold tracking-[0.14em] uppercase',
            t.label,
            f.full
              ? 'col-span-full'
              : f.third
                ? 'col-span-2 max-md:col-span-full'
                : 'col-span-3 max-md:col-span-full',
          )}
        >
          {f.label}
          {f.type === 'select' ? (
            <select
              name={f.name}
              defaultValue=""
              required={f.required}
              aria-invalid={invalid.has(f.name) || undefined}
              className={cn(base, t.control, 'select-chevron appearance-none pr-10')}
            >
              <option value="">{f.placeholder}</option>
              {f.options?.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          ) : f.type === 'textarea' ? (
            <textarea
              name={f.name}
              placeholder={f.placeholder}
              aria-invalid={invalid.has(f.name) || undefined}
              className={cn(base, t.control, 'mb-1 h-[140px] resize-y px-4 py-[14px]')}
            />
          ) : (
            <input
              type={f.type}
              name={f.name}
              placeholder={f.placeholder}
              required={f.required}
              autoComplete={
                f.type === 'email'
                  ? 'email'
                  : f.name === 'name'
                    ? 'name'
                    : f.type === 'tel'
                      ? 'tel'
                      : undefined
              }
              aria-invalid={invalid.has(f.name) || undefined}
              className={cn(base, t.control)}
            />
          )}
        </label>
      ))}
      {/* Champ piège : invisible pour les personnes, rempli par les robots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px]"
      />
      <div
        className={cn(
          'col-span-full flex flex-wrap items-center justify-between gap-x-6 gap-y-[14px]',
          tone === 'forest' && 'lg:pb-[38px]',
        )}
      >
        <p className={cn('m-0 max-w-[26rem] text-[13px] leading-normal', t.note)}>{note}</p>
        <button
          type="submit"
          disabled={pending}
          className={cn(
            'h-[54px] cursor-pointer rounded-full border px-8 text-base leading-4 font-semibold tracking-[0.5px] capitalize [transition:background-color_0.25s_ease,border-color_0.25s_ease,translate_0.3s_cubic-bezier(0.2,0.7,0.2,1),box-shadow_0.3s_ease] hover:-translate-y-0.5 focus-visible:-translate-y-0.5 disabled:opacity-60 motion-reduce:hover:translate-y-0',
            t.submit,
          )}
        >
          {submit}
        </button>
      </div>
      <p
        role="status"
        className={cn(
          'col-span-full m-0 text-sm leading-normal',
          state.status === 'success' ? 'text-[#B04A2A]' : 'text-[#b4233c]',
          state.status === 'idle' && 'hidden',
        )}
      >
        {state.status !== 'idle' && messages[state.status]}
      </p>
    </form>
  )
}
