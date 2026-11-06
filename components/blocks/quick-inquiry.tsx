import { ArrowIcon, Icon, type IconName } from '@/components/ui/icon'

type Props = {
  kicker: string
  title: string
  action: string
  dateLabel: string
  guestsLabel: string
  guestsPlaceholder: string
  guestsOptions: string[]
  locationLabel: string
  locationPlaceholder: string
  button: string
  note: string
}

const label = 'text-[13px] leading-[1.3] font-bold tracking-[0.14em] text-forest-mid uppercase'
const control =
  'h-[54px] w-full rounded-xl border border-transparent bg-cream pr-4 pl-11 text-[16px] leading-none text-ink [transition:border-color_0.2s_ease,background-color_0.2s_ease] hover:border-[#DDC5B9] focus:border-forest-mid focus:bg-white focus:outline-none placeholder:text-[#6b716d]'

function Field({
  id,
  name,
  icon,
  text,
  children,
}: {
  id: string
  name: string
  icon: IconName
  text: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label htmlFor={id} className={label}>
        {text}
      </label>
      <span className="relative block">
        <Icon
          name={icon}
          className="text-forest-mid pointer-events-none absolute top-1/2 left-[15px] z-[1] size-[19px] -translate-y-1/2"
        />
        {children}
      </span>
    </div>
  )
}

// Formulaire de demande rapide : un <form method="get"> vers la page contact (aucun JS, fonctionne sans script).
export function QuickInquiry(p: Props) {
  return (
    <section data-section="quick-inquiry" className="bg-cream pt-[22px] max-md:pt-[14px]">
      <div className="max-w-site mx-auto w-full">
        <form
          method="get"
          action={p.action}
          aria-labelledby="qi-title"
          className="border-sand grid grid-cols-[minmax(170px,1.05fr)_repeat(3,minmax(0,1fr))_auto] items-end gap-4 rounded-[18px] border bg-white py-[22px] pr-[22px] pl-[30px] shadow-[0_22px_50px_rgba(47,43,38,0.07)] [transition:box-shadow_0.4s_ease,border-color_0.4s_ease] focus-within:border-[#DDC5B9] focus-within:shadow-[0_28px_60px_rgba(47,43,38,0.11)] hover:border-[#DDC5B9] hover:shadow-[0_28px_60px_rgba(47,43,38,0.11)] max-lg:grid-cols-3 max-lg:p-[22px] max-md:grid-cols-1 max-md:gap-[14px] max-md:px-[18px] max-md:py-5"
        >
          <div className="flex items-center gap-[14px] self-center max-lg:col-span-full">
            <span className="bg-forest text-sage-soft inline-flex size-12 flex-none items-center justify-center rounded-[14px]">
              <Icon name="chef-hat" />
            </span>
            <span className="flex flex-col gap-1">
              <span className={label}>{p.kicker}</span>
              <span
                id="qi-title"
                className="font-display text-ink text-2xl leading-[1.15] tracking-[-0.02em]"
              >
                {p.title}
              </span>
            </span>
          </div>
          <Field id="qi-date" name="event-date" icon="calendar-event" text={p.dateLabel}>
            <input type="date" id="qi-date" name="event-date" className={control} />
          </Field>
          <Field id="qi-guests" name="guests" icon="users" text={p.guestsLabel}>
            <select
              id="qi-guests"
              name="guests"
              className={`${control} bg-[url("data:image/svg+xml,%3Csvg_xmlns='http://www.w3.org/2000/svg'_viewBox='0 0 24 24'%3E%3Cpath_d='M6 9l6 6 6-6'_fill='none'_stroke='%231B1F1D'_stroke-width='2'_stroke-linecap='round'_stroke-linejoin='round'/%3E%3C/svg%3E")] appearance-none bg-[length:16px] bg-[position:right_14px_center] bg-no-repeat pr-10`}
            >
              <option value="">{p.guestsPlaceholder}</option>
              {p.guestsOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
          <Field id="qi-location" name="location" icon="map-pin" text={p.locationLabel}>
            <input
              type="text"
              id="qi-location"
              name="location"
              placeholder={p.locationPlaceholder}
              autoComplete="address-level2"
              className={control}
            />
          </Field>
          <button
            type="submit"
            className="group rounded-pill bg-forest text-ivory hover:bg-forest-dark focus-visible:outline-forest-mid inline-flex h-[54px] items-center justify-center gap-[10px] px-7 text-base leading-none font-semibold whitespace-nowrap [transition:background-color_0.25s_ease,translate_0.3s_cubic-bezier(0.2,0.7,0.2,1),box-shadow_0.3s_ease] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(176,74,42,0.3)] focus-visible:outline-2 focus-visible:outline-offset-[3px] max-lg:col-span-full"
          >
            {p.button}
            <ArrowIcon className="[transition:translate_0.35s_cubic-bezier(0.2,0.7,0.2,1)] group-hover:translate-x-[5px]" />
          </button>
        </form>
        <p className="text-body mt-3 pl-[30px] text-[14px] leading-[1.5] max-lg:pl-[22px] max-md:pl-1">
          {p.note}
        </p>
      </div>
    </section>
  )
}
