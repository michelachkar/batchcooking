import { Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import { CptAnim } from '@/components/blocks/cpt-anim'
import { BrandIcon } from '@/components/ui/brand-icon'

type Img = { src: string; width: number; height: number; alt: string; unoptimized?: boolean }
type Props = {
  name: string
  role: string
  image: Img
  email?: string
  phone?: string
  social: { type: 'linkedin' | 'facebook' | 'instagram'; href: string }[]
  socialLabels: Record<'linkedin' | 'facebook' | 'instagram', string>
  responsibility?: string
  experience?: string
  skills: { name: string; value: number }[]
  labels: { about: string; responsibility: string; experience: string; skills: string }
  /** Biographie MDX déjà rendue. */
  children: React.ReactNode
}

const card =
  'rounded-xl border border-[#e5e7eb] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)]'

// Fiche d'un membre : carte de profil à gauche (photo, fonction, réseaux, contact), biographie, repères et compétences à droite.
export function MemberDetail(p: Props) {
  const quick = [
    { label: p.labels.responsibility, value: p.responsibility },
    { label: p.labels.experience, value: p.experience },
  ].filter((q) => q.value)
  return (
    <div className="py-[110px] leading-normal max-md:py-[70px]">
      <div className="container-x">
        <CptAnim />
        <div className="-mx-3 flex flex-wrap">
          <div className="w-full px-3 md:w-1/3">
            <div className={`${card} overflow-hidden md:sticky md:top-28`}>
              <div
                data-cm-section="fade-up"
                data-cm-dist="30"
                className="aspect-square overflow-hidden"
              >
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  width={p.image.width}
                  height={p.image.height}
                  unoptimized={p.image.unoptimized}
                  sizes="(min-width: 1025px) 427px, 100vw"
                  priority
                  className="size-full max-w-none object-cover object-top"
                />
              </div>
              <div data-cm-section="fade-up" data-cm-delay="0.1" className="px-6 pt-6 text-center">
                <p className="text-ink m-0 mb-0 text-[19px] leading-[28.5px] font-medium">
                  {p.role}
                </p>
                {p.social.length > 0 && (
                  <ul className="m-0 mb-5 flex list-none justify-center gap-2 p-0">
                    {p.social.map((s) => {
                      return (
                        <li key={s.type}>
                          <a
                            href={s.href}
                            aria-label={p.socialLabels[s.type]}
                            className="flex size-[38px] items-center justify-center rounded-full bg-[#F0EBE3] text-[#625C50] transition-colors hover:text-[#B04A2A]"
                          >
                            <BrandIcon name={s.type} className="size-[14px]" />
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
              {(p.email || p.phone) && (
                <div
                  data-cm-section="fade-up"
                  data-cm-delay="0.15"
                  className="border-t border-[#e5e7eb] px-6 py-4"
                >
                  {p.email && (
                    <ContactRow icon={<Mail className="size-[13px] fill-current" />}>
                      <a href={`mailto:${p.email}`}>{p.email}</a>
                    </ContactRow>
                  )}
                  {p.phone && (
                    <ContactRow icon={<Phone className="size-[13px] fill-current" />}>
                      <a href={`tel:${p.phone.replace(/\D/g, '')}`}>{p.phone}</a>
                    </ContactRow>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="w-full px-3 md:w-2/3">
            <div data-cm-section="fade-up" className="pl-4 max-lg:mt-[30px] max-lg:pl-0">
              <h2 className="font-display m-0 mb-5 border-b-2 border-[#e5e7eb] pb-4 text-[32px] leading-[70px] font-bold tracking-[-0.02em] text-[#3A352E] max-lg:text-[45px] max-lg:leading-[56px]">
                {p.labels.about}
              </h2>
              <div className="text-base leading-7 text-[#3A352E] [&_p]:mt-0 [&_p]:mb-4 [&_strong]:font-bold">
                {p.children}
              </div>
            </div>
            {quick.length > 0 && (
              <div
                data-cm-section="fade-up"
                data-cm-children
                data-cm-stagger="0.1"
                className="mb-10 flex flex-wrap gap-6 pl-4"
              >
                {quick.map((q) => (
                  <div
                    key={q.label}
                    data-cm-child
                    className="grow basis-[calc(50%-12px)] rounded-xl border border-[#e5e7eb] bg-[#F0EBE3] px-5 py-[18px] max-md:basis-full"
                  >
                    <span className="mb-1 block text-[11px] leading-[16.5px] font-semibold tracking-[0.8px] text-[#625C50] uppercase">
                      {q.label}
                    </span>
                    <span className="block font-bold text-[#3A352E]">{q.value}</span>
                  </div>
                ))}
              </div>
            )}
            {p.skills.length > 0 && (
              <div data-cm-section="fade-up" className="mb-[52px] pl-4 max-md:pl-0">
                <h2 className="font-display m-0 mb-6 text-xl leading-[70px] font-extrabold tracking-[0.025em] text-[#3A352E] uppercase max-lg:text-[45px] max-lg:leading-[56px]">
                  {p.labels.skills}
                </h2>
                <ul className="m-0 list-none p-0">
                  {p.skills.map((s) => (
                    <li key={s.name} className="mb-[22px] last:mb-0">
                      <div className="mb-2 flex items-baseline justify-between">
                        <span className="text-[13px] leading-[19.5px] font-semibold tracking-[0.4px] text-[#3A352E] uppercase">
                          {s.name}
                        </span>
                        <span className="text-sm leading-[21px] font-bold text-[#625C50]">
                          {s.value}%
                        </span>
                      </div>
                      <div
                        role="progressbar"
                        aria-label={s.name}
                        aria-valuenow={s.value}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        className="h-[6px] overflow-hidden rounded-[3px] bg-[#e2e2e2]"
                      >
                        <div
                          className="h-full rounded-[3px] bg-[#3A352E]"
                          style={{ width: `${s.value}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ContactRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 py-2 text-[17px] leading-[25.5px] text-[#3A352E]">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#F0EBE3] text-[#3A352E]">
        {icon}
      </span>
      {children}
    </div>
  )
}
