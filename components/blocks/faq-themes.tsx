import { INK, SOFT, Shell } from '@/components/blocks/home-v2'

// Intro de la FAQ et liens vers chaque thème.
export function FaqThemes(p: {
  label: string
  intro: string
  themes: { id: string; label: string }[]
}) {
  return (
    <Shell name="faq-themes">
      <div className="-mb-6 max-md:-mb-4" data-reveal="up">
        <p className={`mb-6 max-w-[44rem] text-[17px] leading-[1.65] ${SOFT}`}>{p.intro}</p>
        <nav aria-label={p.label}>
          <ul className="flex flex-wrap gap-3">
            {p.themes.map((t) => (
              <li key={t.id}>
                <a
                  href={`#${t.id}`}
                  className={`inline-block rounded-full border border-[#e3d9cc] px-5 py-2.5 text-[16px] font-semibold [transition:border-color_0.2s_ease,color_0.2s_ease] hover:border-[#B04A2A] hover:text-[#B04A2A] ${INK}`}
                >
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Shell>
  )
}
