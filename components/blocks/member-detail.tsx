import { Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import { CptAnim } from '@/components/blocks/cpt-anim'
import { BrandIcon } from '@/components/ui/brand-icon'
import styles from './member-detail.module.css'

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

// Fiche d'un membre : carte de profil à gauche (photo, fonction, réseaux, contact), biographie, repères et compétences à droite.
export function MemberDetail(p: Props) {
  const quick = [
    { label: p.labels.responsibility, value: p.responsibility },
    { label: p.labels.experience, value: p.experience },
  ].filter((q) => q.value)
  return (
    <div className={styles.root}>
      <div className="container-x">
        <CptAnim />
        <div className={styles.columns}>
          <div className={styles.aside}>
            <div className={styles.profile}>
              <div data-cm-section="fade-up" data-cm-dist="30" className={styles.photo}>
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  width={p.image.width}
                  height={p.image.height}
                  unoptimized={p.image.unoptimized}
                  sizes="(min-width: 1025px) 427px, 100vw"
                  priority
                  className={styles.photoImage}
                />
              </div>
              <div data-cm-section="fade-up" data-cm-delay="0.1" className={styles.identity}>
                <p className={styles.role}>{p.role}</p>
                {p.social.length > 0 && (
                  <ul className={styles.socials}>
                    {p.social.map((s) => {
                      return (
                        <li key={s.type}>
                          <a
                            href={s.href}
                            aria-label={p.socialLabels[s.type]}
                            className={styles.socialLink}
                          >
                            <BrandIcon name={s.type} className={styles.socialIcon} />
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
              {(p.email || p.phone) && (
                <div data-cm-section="fade-up" data-cm-delay="0.15" className={styles.contact}>
                  {p.email && (
                    <ContactRow icon={<Mail className={styles.contactSvg} />}>
                      <a href={`mailto:${p.email}`}>{p.email}</a>
                    </ContactRow>
                  )}
                  {p.phone && (
                    <ContactRow icon={<Phone className={styles.contactSvg} />}>
                      <a href={`tel:${p.phone.replace(/\D/g, '')}`}>{p.phone}</a>
                    </ContactRow>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className={styles.main}>
            <div data-cm-section="fade-up" className={styles.about}>
              <h2 className={styles.aboutTitle}>{p.labels.about}</h2>
              <div className={styles.bio}>{p.children}</div>
            </div>
            {quick.length > 0 && (
              <div
                data-cm-section="fade-up"
                data-cm-children
                data-cm-stagger="0.1"
                className={styles.quick}
              >
                {quick.map((q) => (
                  <div key={q.label} data-cm-child className={styles.quickItem}>
                    <span className={styles.quickLabel}>{q.label}</span>
                    <span className={styles.quickValue}>{q.value}</span>
                  </div>
                ))}
              </div>
            )}
            {p.skills.length > 0 && (
              <div data-cm-section="fade-up" className={styles.skills}>
                <h2 className={styles.skillsTitle}>{p.labels.skills}</h2>
                <ul className={styles.skillList}>
                  {p.skills.map((s) => (
                    <li key={s.name} className={styles.skill}>
                      <div className={styles.skillHead}>
                        <span className={styles.skillName}>{s.name}</span>
                        <span className={styles.skillValue}>{s.value}%</span>
                      </div>
                      <div
                        role="progressbar"
                        aria-label={s.name}
                        aria-valuenow={s.value}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        className={styles.bar}
                      >
                        <div className={styles.barFill} style={{ width: `${s.value}%` }} />
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
    <div className={styles.contactRow}>
      <span className={styles.contactIcon}>{icon}</span>
      {children}
    </div>
  )
}
