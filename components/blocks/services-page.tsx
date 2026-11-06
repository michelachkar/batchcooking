import { Heading, INK, Shell, SOFT } from '@/components/blocks/home-v2'

// 2. Tableau comparatif (cartes empilées en mobile).
export function Compare(p: {
  kicker: string
  title: string
  columns: string[]
  rows: { label: string; values: string[] }[]
  note: string
}) {
  return (
    <Shell name="compare" tone="beige">
      <Heading kicker={p.kicker} title={p.title} />
      <div
        data-reveal="up"
        className="overflow-hidden rounded-[18px] bg-white shadow-[0_10px_30px_rgba(85,80,68,0.08)]"
      >
        <table className="w-full border-collapse text-left max-md:block">
          <thead className="max-md:hidden">
            <tr>
              <th scope="col" className="w-[18%] p-5" />
              {p.columns.map((c) => (
                <th
                  key={c}
                  scope="col"
                  className={`font-display p-5 text-[18px] font-semibold ${INK} border-l border-[#efe7dc]`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="max-md:block">
            {p.rows.map((r) => (
              <tr key={r.label} className="border-t border-[#efe7dc] max-md:block max-md:p-5">
                <th
                  scope="row"
                  className="p-5 text-[13px] font-bold tracking-[0.14em] text-[#B04A2A] uppercase max-md:block max-md:p-0 max-md:pb-3"
                >
                  {r.label}
                </th>
                {r.values.map((v, i) => (
                  <td
                    key={i}
                    className={`border-l border-[#efe7dc] p-5 text-[16px] leading-[1.5] ${SOFT} max-md:block max-md:border-l-0 max-md:p-0 max-md:pb-3`}
                  >
                    <span className={`mb-0.5 hidden text-[14px] font-semibold max-md:block ${INK}`}>
                      {p.columns[i]}
                    </span>
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={`mt-4 text-[15px] ${SOFT}`}>{p.note}</p>
    </Shell>
  )
}
