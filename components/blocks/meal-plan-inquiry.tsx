'use client'

import { useState } from 'react'
import { Phone } from 'lucide-react'
import { ArrowIcon, Icon, type IconName } from '@/components/ui/icon'
import { submitLead } from '@/lib/lead/submit'

type Option = { value: string; label: string }

type Props = {
  kicker: string
  title: string
  action: string
  householdLabel: string
  householdPlaceholder: string
  householdOptions: Option[]
  mealsLabel: string
  mealsPlaceholder: string
  mealsOptions: Option[]
  phoneLabel: string
  phonePlaceholder: string
  button: string
  note: string
  success: string
  error: string
}

const label = 'text-[13px] leading-[1.3] font-bold tracking-[0.14em] text-[#B04A2A] uppercase'
const control =
  "h-[54px] w-full rounded-xl border border-transparent bg-[rgba(240,235,227,1)] pr-10 pl-11 text-[16px] leading-none text-[rgba(85,80,68,1)] [transition:border-color_0.2s_ease,background-color_0.2s_ease] hover:border-[#e3c4b6] focus:border-[#B04A2A] focus:bg-white focus:outline-none appearance-none bg-no-repeat bg-[length:16px] bg-[position:right_14px_center] bg-[url(\"data:image/svg+xml,%3Csvg_xmlns='http://www.w3.org/2000/svg'_viewBox='0 0 24 24'%3E%3Cpath_d='M6 9l6 6 6-6'_fill='none'_stroke='%23555044'_stroke-width='2'_stroke-linecap='round'_stroke-linejoin='round'/%3E%3C/svg%3E\")]"

const inputControl =
  'h-[54px] w-full rounded-xl border border-transparent bg-[rgba(240,235,227,1)] pr-4 pl-11 text-[16px] leading-none text-[rgba(85,80,68,1)] placeholder:text-[rgba(85,80,68,0.5)] [transition:border-color_0.2s_ease,background-color_0.2s_ease] hover:border-[#e3c4b6] focus:border-[#B04A2A] focus:bg-white focus:outline-none'

function SelectField({
  id,
  name,
  icon,
  text,
  placeholder,
  options,
}: {
  id: string
  name: string
  icon: IconName
  text: string
  placeholder: string
  options: Option[]
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label htmlFor={id} className={label}>
        {text}
      </label>
      <span className="relative block">
        <Icon
          name={icon}
          className="pointer-events-none absolute top-1/2 left-[15px] z-[1] size-[19px] -translate-y-1/2 text-[#B04A2A]"
        />
        <select id={id} name={name} required defaultValue="" className={control}>
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </span>
    </div>
  )
}

// Demande rapide « batch cooking » : foyer, repas par semaine, téléphone. <form method="get"> vers la page contact, sans JS.
export function MealPlanInquiry(p: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  // Avec JavaScript, la demande part directement à /api/lead (même circuit que le modal) ; sans JavaScript, le formulaire GET renvoie vers la page contact.
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    setStatus('sending')
    const ok = await submitLead({
      source: 'quick-form',
      phone: String(f.get('phone') ?? ''),
      household: String(f.get('household') ?? ''),
      meals: String(f.get('meals') ?? ''),
    })
    setStatus(ok ? 'done' : 'error')
    if (ok) form.reset()
  }
  return (
    <section
      data-section="quick-inquiry"
      className="relative z-[1] -mb-[22px] bg-[rgba(240,235,227,1)] pt-[22px] pb-[44px] max-md:pt-[14px]"
    >
      <div className="max-w-site mx-auto w-full">
        <form
          method="get"
          action={p.action}
          onSubmit={onSubmit}
          aria-labelledby="qi-title"
          className="grid grid-cols-[minmax(170px,1.05fr)_repeat(3,minmax(0,1fr))_auto] items-end gap-4 rounded-[18px] border border-[#e3d9cc] bg-white py-[22px] pr-[22px] pl-[30px] shadow-[0_22px_50px_rgba(47,43,38,0.07)] [transition:box-shadow_0.4s_ease,border-color_0.4s_ease] focus-within:border-[#e3c4b6] focus-within:shadow-[0_28px_60px_rgba(47,43,38,0.11)] hover:border-[#e3c4b6] hover:shadow-[0_28px_60px_rgba(47,43,38,0.11)] max-lg:grid-cols-2 max-lg:p-[22px] max-md:grid-cols-1 max-md:gap-[14px] max-md:px-[18px] max-md:py-5"
        >
          <div className="flex items-center gap-[14px] self-center max-lg:col-span-full">
            <span className="text-ivory inline-flex size-12 flex-none items-center justify-center rounded-[14px] bg-[#B04A2A]">
              <Icon name="chef-hat" />
            </span>
            <span className="flex flex-col gap-1">
              <span className={label}>{p.kicker}</span>
              <span
                id="qi-title"
                className="font-display text-2xl leading-[1.15] tracking-[-0.02em] text-[rgba(85,80,68,1)]"
              >
                {p.title}
              </span>
            </span>
          </div>
          <SelectField
            id="qi-household"
            name="household"
            icon="users"
            text={p.householdLabel}
            placeholder={p.householdPlaceholder}
            options={p.householdOptions}
          />
          <SelectField
            id="qi-meals"
            name="meals"
            icon="calendar-event"
            text={p.mealsLabel}
            placeholder={p.mealsPlaceholder}
            options={p.mealsOptions}
          />
          <div className="flex min-w-0 flex-col gap-2">
            <label htmlFor="qi-phone" className={label}>
              {p.phoneLabel}
            </label>
            <span className="relative block">
              <Phone
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-[15px] z-[1] size-[19px] -translate-y-1/2 text-[#B04A2A]"
              />
              <input
                id="qi-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder={p.phonePlaceholder}
                className={inputControl}
              />
            </span>
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="group rounded-pill text-ivory inline-flex h-[54px] items-center justify-center gap-[10px] bg-[#B04A2A] px-7 text-base leading-none font-semibold whitespace-nowrap [transition:background-color_0.25s_ease,translate_0.3s_cubic-bezier(0.2,0.7,0.2,1),box-shadow_0.3s_ease] hover:-translate-y-0.5 hover:bg-[#8F3B20] hover:shadow-[0_12px_24px_rgba(176,74,42,0.3)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#B04A2A] max-lg:col-span-full"
          >
            {p.button}
            <ArrowIcon className="[transition:translate_0.35s_cubic-bezier(0.2,0.7,0.2,1)] group-hover:translate-x-[5px]" />
          </button>
        </form>
        <p
          role="status"
          className={`mt-3 pl-[30px] text-[14px] leading-[1.5] text-[rgba(85,80,68,0.88)] max-lg:pl-[22px] max-md:pl-1 ${status === 'done' ? 'font-semibold text-[#7D472C]' : status === 'error' ? 'font-semibold text-[#B04A2A]' : ''}`}
        >
          {status === 'done' ? p.success : status === 'error' ? p.error : p.note}
        </p>
      </div>
    </section>
  )
}
