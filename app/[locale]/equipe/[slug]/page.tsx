import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Mdx } from '@/components/mdx'
import { MemberDetail } from '@/components/blocks/member-detail'
import { PageHead } from '@/components/blocks/page-head'
import { PostNav } from '@/components/blocks/post-nav'
import { RelatedTeam } from '@/components/blocks/related-team'
import { getMember, getTeam } from '@/lib/content/team'
import { toTeamCard } from '@/lib/content/team-card'
import { vr } from '@/lib/flags'
import { media } from '@/lib/media'
import { PageJsonLd } from '@/components/seo/page-json-ld'
import { pageMetadata } from '@/lib/seo'
import * as ld from '@/lib/jsonld'

export const dynamicParams = false

export function generateStaticParams() {
  return getTeam().map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const found = getMember(slug)
  if (!found) return {}
  const { name, role } = found.entry.data
  const t = await getTranslations({ locale, namespace: 'member' })
  return pageMetadata({
    title: name,
    description: t('metaDescription', { name, role }),
    path: `/equipe/${slug}`,
  })
}

export default async function MemberPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const found = getMember(slug)
  if (!found) notFound()
  const { entry, prev, next, others } = found
  const d = entry.data
  const p = await getTranslations('pages')
  const t = await getTranslations('member')
  const tm = await getTranslations('home.team')
  const nav = (e: typeof prev, label: string) =>
    e && { label, title: e.data.name, href: `/equipe/${e.slug}` }
  return (
    <main id="contenu">
      <PageJsonLd
        path={`/equipe/${slug}`}
        title={d.name}
        description={t('metaDescription', { name: d.name, role: d.role })}
        crumbs={[{ label: t('crumb'), path: '/equipe' }, { label: d.name }]}
        extra={[
          ld.personNode({
            path: `/equipe/${slug}`,
            name: d.name,
            role: d.role,
            image: d.image.src,
          }),
        ]}
      />
      <PageHead
        title={d.name}
        crumbs={[
          { label: p('home'), href: '/' },
          { label: t('crumb'), href: '/equipe' },
          { label: d.name },
        ]}
        navLabel={p('navLabel')}
        background={media.heads.member}
        inset
      />
      <div data-section="body">
        <MemberDetail
          name={d.name}
          role={d.role}
          image={{ ...d.image, unoptimized: vr }}
          email={d.email}
          phone={d.phone}
          social={d.social}
          socialLabels={{ linkedin: 'LinkedIn', facebook: 'Facebook', instagram: 'Instagram' }}
          responsibility={d.responsibility}
          experience={d.experience}
          skills={d.skills}
          labels={{
            about: t('about'),
            responsibility: t('responsibility'),
            experience: t('experience'),
            skills: t('skills'),
          }}
        >
          <Mdx source={entry.body} />
        </MemberDetail>
        <PostNav prev={nav(prev, t('prev'))} next={nav(next, t('next'))} />
        <RelatedTeam
          title={t('related')}
          members={others.map(toTeamCard)}
          vertical={tm('vertical')}
          profileLabel={(name) => tm('profile', { name })}
        />
      </div>
    </main>
  )
}
