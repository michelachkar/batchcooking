export type FaqItem = { question: string; answer: string }

// Accordéon natif (<details name>, sans JS) : une seule question ouverte à la fois par groupe `name`.
export function FaqAccordion({
  items,
  name,
  openFirst = true,
}: {
  items: FaqItem[]
  name: string
  openFirst?: boolean
}) {
  return (
    <>
      {items.map((item, i) => (
        <details
          key={item.question}
          name={name}
          open={openFirst && i === 0}
          className="mtm-faq group border border-[#E3D9CC] bg-white not-first:border-t-0"
        >
          <summary className="font-display flex cursor-pointer list-none items-center justify-between p-[25px] text-[16px] leading-[19.5px] font-bold text-[#555044] uppercase group-open:text-[#625C50] [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <svg
              viewBox="0 0 24 16"
              aria-hidden
              className="h-4 w-6 shrink-0 fill-current group-open:text-[#B04A2A]"
            >
              <rect x="8" y="6.5" width="16" height="3" />
              <rect x="14.5" y="0" width="3" height="16" className="group-open:hidden" />
            </svg>
          </summary>
          <div className="border-t border-[#E3D9CC] p-[25px] leading-[27px] text-[#625C50]">
            <p className="m-0 mb-4">{item.answer}</p>
          </div>
        </details>
      ))}
    </>
  )
}
