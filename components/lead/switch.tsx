'use client'

// Sélecteur à bascule (radio) partagé : page des formules et modal de demande de rappel.
export function Switch<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { value: T; text: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="inline-flex rounded-full border border-[#B04A2A]/30 bg-white p-1"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={`cursor-pointer rounded-full border-0 px-6 py-2.5 text-[16px] font-semibold transition-colors max-md:px-4 ${
            value === o.value
              ? 'bg-[#B04A2A] text-white'
              : 'bg-transparent text-[rgba(85,80,68,1)] hover:text-[#B04A2A]'
          }`}
        >
          {o.text}
        </button>
      ))}
    </div>
  )
}
