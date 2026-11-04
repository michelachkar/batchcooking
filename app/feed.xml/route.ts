import { getPosts } from '@/lib/content/blog'
import { absoluteUrl } from '@/lib/seo'
import { site } from '@/lib/site'

export const dynamic = 'force-static'

const xml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Flux RSS 2.0 du blog, du plus récent au plus ancien.
export function GET() {
  const posts = getPosts().sort((a, b) => +b.data.date - +a.data.date)
  const items = posts
    .map(
      (p) => `    <item>
      <title>${xml(p.data.title)}</title>
      <link>${absoluteUrl(`/blog/${p.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/blog/${p.slug}`)}</guid>
      <pubDate>${p.data.date.toUTCString()}</pubDate>
      <description>${xml(p.data.excerpt)}</description>${p.data.categories.map((c) => `\n      <category>${xml(c)}</category>`).join('')}
    </item>`,
    )
    .join('\n')
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(site.name)}</title>
    <link>${absoluteUrl('/blog')}</link>
    <description>${xml(site.name)}</description>
    <language>fr-FR</language>
    <atom:link href="${absoluteUrl('/feed.xml')}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`
  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
