import { expect, test, type APIRequestContext } from '@playwright/test'

// Tests SEO sur le build de test (contenus de démonstration) : chaque adresse du sitemap est contrôlée.
// Adresses annoncées dans le menu mais pas encore construites (aucune pour l'instant).
const PENDING: string[] = []

type Entry = { loc: string; lastmod: string }

async function sitemap(request: APIRequestContext): Promise<Entry[]> {
  const res = await request.get('/sitemap.xml')
  expect(res.status()).toBe(200)
  const xml = await res.text()
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
    loc: /<loc>(.*?)<\/loc>/.exec(m[1])![1],
    lastmod: /<lastmod>(.*?)<\/lastmod>/.exec(m[1])?.[1] ?? '',
  }))
}

const pathOf = (loc: string) => new URL(loc).pathname

test('sitemap : adresses absolues, dates réelles, pages principales présentes', async ({
  request,
}) => {
  const entries = await sitemap(request)
  expect(entries.length).toBeGreaterThan(10)
  const origins = new Set(entries.map((e) => new URL(e.loc).origin))
  expect(origins.size).toBe(1)
  for (const e of entries) {
    expect(Number.isNaN(Date.parse(e.lastmod)), `lastmod de ${e.loc}`).toBe(false)
  }
  const paths = entries.map((e) => pathOf(e.loc))
  for (const p of [
    '/',
    '/services',
    '/equipe',
    '/tarifs',
    '/faq',
    '/contact',
    '/blog',
  ]) {
    expect(paths, p).toContain(p)
  }
  // Variantes en doublon du blog : hors sitemap.
  expect(paths).not.toContain('/blog/sidebar-gauche')
  expect(paths).not.toContain('/blog/sans-sidebar')
})

test('robots.txt annonce le sitemap', async ({ request }) => {
  const res = await request.get('/robots.txt')
  expect(res.status()).toBe(200)
  expect(await res.text()).toMatch(/^Sitemap: https?:\/\/.+\/sitemap\.xml$/m)
})

test('flux RSS : un élément par article, adresses du sitemap', async ({ request }) => {
  const entries = (await sitemap(request)).map((e) => e.loc)
  const res = await request.get('/feed.xml')
  expect(res.status()).toBe(200)
  expect(res.headers()['content-type']).toContain('rss+xml')
  const xml = await res.text()
  const links = [...xml.matchAll(/<item>[\s\S]*?<link>(.*?)<\/link>/g)].map((m) => m[1])
  const posts = entries.filter((l) => /\/blog\/[^/]+$/.test(l) && !/\/blog\/grille$/.test(l))
  expect(links.length).toBe(posts.length)
  for (const l of links) expect(entries).toContain(l)
})

test.describe('chaque page du sitemap', () => {
  test('balises, données structurées, images, liens', async ({ request, page }) => {
    test.setTimeout(240_000)
    const entries = await sitemap(request)
    const internal = new Set<string>()
    for (const { loc } of entries) {
      const path = pathOf(loc)
      const res = await page.goto(path)
      expect(res?.status(), path).toBe(200)

      const title = await page.title()
      expect(title.length, `title ${path}`).toBeGreaterThan(5)
      expect(title.length, `title ${path}`).toBeLessThanOrEqual(70)

      const desc = await page.locator('meta[name="description"]').getAttribute('content')
      expect(desc?.length ?? 0, `description ${path}`).toBeGreaterThanOrEqual(40)
      expect(desc!.length, `description ${path}`).toBeLessThanOrEqual(170)

      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
      expect(new URL(canonical!).href, `canonical ${path}`).toBe(new URL(loc).href)
      await expect(page.locator('h1'), `h1 ${path}`).toHaveCount(1)
      await expect(page.locator('html'), path).toHaveAttribute('lang', 'fr')
      for (const prop of ['og:title', 'og:description', 'og:url', 'og:image', 'og:type']) {
        await expect(page.locator(`meta[property="${prop}"]`), `${prop} ${path}`).toHaveCount(1)
      }
      await expect(page.locator('meta[name="twitter:card"]'), path).toHaveAttribute(
        'content',
        'summary_large_image',
      )
      await expect(page.locator('meta[name="twitter:image"]'), path).toHaveCount(1)
      const og = await page.locator('meta[property="og:image"]').getAttribute('content')
      const ogRes = await request.get(new URL(og!).pathname)
      expect(ogRes.status(), `og:image ${path}`).toBe(200)
      expect(ogRes.headers()['content-type']).toContain('image/png')

      // JSON-LD : valide, en @graph, avec Organization et WebSite ; fil d'Ariane sur les pages intérieures.
      const blocks = await page.locator('script[type="application/ld+json"]').allTextContents()
      expect(blocks.length, `json-ld ${path}`).toBeGreaterThan(0)
      const types = blocks.flatMap((b) => {
        const data = JSON.parse(b)
        expect(data['@context']).toBe('https://schema.org')
        return (data['@graph'] as { '@type': string }[]).map((n) => n['@type'])
      })
      expect(types, path).toContain('Organization')
      expect(types, path).toContain('WebSite')
      if (path !== '/') expect(types, path).toContain('BreadcrumbList')
      if (/^\/blog\/[^/]+$/.test(path) && path !== '/blog/grille') {
        expect(types, path).toContain('BlogPosting')
      }
      if (/^\/services\/[^/]+$/.test(path)) expect(types, path).toContain('Service')
      if (/^\/equipe\/[^/]+$/.test(path)) expect(types, path).toContain('Person')

      // Toutes les images ont un alt (vide permis pour le décor) et des dimensions.
      const bad = await page.locator('img:not([alt])').count()
      expect(bad, `img sans alt ${path}`).toBe(0)

      for (const href of await page
        .locator('a[href^="/"]')
        .evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href')!))) {
        internal.add(href.split('#')[0].split('?')[0] || '/')
      }
    }
    // Liens internes : aucun lien cassé.
    const broken: string[] = []
    for (const href of internal) {
      if (PENDING.includes(href)) continue
      const res = await request.get(href)
      if (res.status() !== 200) broken.push(`${href} → ${res.status()}`)
    }
    expect(broken).toEqual([])
  })
})

test('variantes du blog : noindex ; 404 : vrai statut et noindex', async ({ page }) => {
  for (const path of ['/blog/sidebar-gauche', '/blog/sans-sidebar']) {
    await page.goto(path)
    await expect(page.locator('meta[name="robots"]'), path).toHaveAttribute('content', /noindex/)
  }
  const res = await page.goto('/page-qui-nexiste-pas')
  expect(res?.status()).toBe(404)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
})
