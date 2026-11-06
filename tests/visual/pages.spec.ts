import { expect, test } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { crop, diff, fullPageShot, loadReference, mask } from './compare'

// Pages intérieures : chaque bloc (data-section) est comparé à son rectangle dans la référence (fixtures/pages/<page>.json,
// produit par wp-reference/capture/page-sections.mjs). `index` : rang du conteneur de premier niveau d'Elementor ;
// `head` : le bandeau de titre.
const MAX_DIFF = Number(process.env.VR_MAX_DIFF ?? 0.01)
const WIDTHS = [375, 768, 1440] as const

type Block = {
  name: string
  index: number | 'head' | 'body'
  maxHeight?: Partial<Record<number, number>>
}
// `skip` : largeurs où la référence est cassée (non reproduite volontairement, voir la raison).
const PAGES: Record<
  string,
  { path: string; blocks: Block[]; skip?: Partial<Record<number, string>> }
> = {
  services: {
    path: '/services',
    blocks: [
      { name: 'head', index: 'head' },
      { name: 'services', index: 0 },
      { name: 'reviews', index: 1 },
      { name: 'posts-intro', index: 2 },
      { name: 'posts', index: 3 },
    ],
  },
  pricing: {
    path: '/tarifs',
    blocks: [
      { name: 'head', index: 'head' },
      { name: 'pricing', index: 0 },
      { name: 'reviews', index: 1 },
      { name: 'dropdown', index: 2 },
    ],
  },
  'service-detail': {
    path: '/services/private-chef-dinners',
    blocks: [
      { name: 'head', index: 'head' },
      { name: 'body', index: 'body' },
    ],
  },
  'team-member': {
    path: '/equipe/theo-ramirez',
    blocks: [
      { name: 'head', index: 'head' },
      // Sous 1025 px, la démo affiche « autres membres » en quatre colonnes de 260 px qui débordent de l'écran (défaut) : comparaison limitée à ce qui précède.
      { name: 'body', index: 'body', maxHeight: { 375: 1969, 768: 1302 } },
    ],
  },
  blog: {
    path: '/blog',
    blocks: [
      { name: 'head', index: 'head' },
      { name: 'body', index: 'body' },
    ],
  },
  'blog-post': {
    path: '/blog/planning-a-mobile-bar-for-your-party',
    blocks: [
      { name: 'head', index: 'head' },
      // Le formulaire de commentaires n'existe pas ici : on compare jusqu'aux mots-clés.
      { name: 'body', index: 'body', maxHeight: { 375: 1435, 768: 1604, 1440: 1700 } },
    ],
  },
  'blog-grid': {
    path: '/blog/grille',
    blocks: [
      { name: 'head', index: 'head' },
      { name: 'body', index: 'body' },
    ],
  },
  portfolio: {
    path: '/realisations',
    blocks: [
      { name: 'head', index: 'head' },
      { name: 'body', index: 'body' },
    ],
  },
  'portfolio-detail': {
    path: '/realisations/rooftop-launch-cocktail-party',
    blocks: [
      { name: 'head', index: 'head' },
      { name: 'body', index: 'body' },
    ],
  },
  'not-found': {
    path: '/page-qui-nexiste-pas',
    blocks: [
      { name: 'head', index: 'head' },
      { name: 'body', index: 'body' },
    ],
  },
  faq: {
    path: '/faq',
    blocks: [
      { name: 'head', index: 'head' },
      { name: 'faq', index: 0 },
      { name: 'reviews', index: 1 },
      { name: 'events', index: 2 },
    ],
  },
  contact: {
    path: '/contact',
    skip: {
      768: 'la démo écrase la carte du formulaire à 74 px de large en tablette (défaut de mise en page)',
    },
    blocks: [
      { name: 'head', index: 'head' },
      { name: 'contact', index: 0 },
    ],
  },
  team: {
    path: '/equipe',
    blocks: [
      { name: 'head', index: 'head' },
      { name: 'team', index: 0 },
      { name: 'trusted', index: 1 },
      { name: 'proposal', index: 2 },
      { name: 'occasions', index: 3, maxHeight: { 375: 470 } },
    ],
  },
}

type Rect = { y: number; h: number }
type Measured = Record<string, { head: Rect; top: Rect[]; footer: Rect }>

for (const [slug, { path, blocks, skip }] of Object.entries(PAGES)) {
  const measured = JSON.parse(
    readFileSync(new URL(`./fixtures/pages/${slug}.json`, import.meta.url), 'utf8'),
  ) as Measured
  for (const { name, index, maxHeight } of blocks) {
    for (const width of WIDTHS) {
      test(`${slug} › ${name} ${width}px`, async ({ page }) => {
        test.skip(name !== 'head' && Boolean(skip?.[width]), skip?.[width])
        await page.setViewportSize({ width, height: 900 })
        await page.goto(path)
        await page.evaluate(() => document.fonts.ready)
        const el = page.locator(`main [data-section="${name}"]`).first()
        await el.scrollIntoViewIfNeeded()
        await page.waitForTimeout(300)
        const box = (await el.boundingBox())!
        const oursY = box.y + (await page.evaluate(() => scrollY))
        const m = measured[String(width)]
        // `body` : tout ce qui sépare le bandeau du pied de page (gabarits PHP de la démo, sans conteneurs de premier niveau).
        const r =
          index === 'head'
            ? m.head
            : index === 'body'
              ? { y: m.head.y + m.head.h, h: m.footer.y - (m.head.y + m.head.h) }
              : m.top[index]
        const full = await fullPageShot(page)
        const y0 = Math.round(r.y)
        const cap = maxHeight?.[width] ?? Infinity
        const actual = crop(full, {
          x: 0,
          y: Math.round(oursY),
          width,
          height: Math.min(Math.round(oursY + box.height) - Math.round(oursY), cap),
        })
        const ref = crop(loadReference(`${slug}/${width}.png`), {
          x: 0,
          y: y0,
          width,
          height: Math.min(Math.round(r.y + r.h) - y0, cap),
        })
        const rects = await el.locator('[data-vr-mask]').evaluateAll(
          (els, o) =>
            els
              .map((e) => e.getBoundingClientRect())
              .map((q) => ({
                x: q.x - o.x,
                y: q.y + scrollY - o.y,
                width: q.width,
                height: q.height,
              })),
          { x: box.x, y: oursY },
        )
        mask(actual, rects)
        mask(ref, rects)
        const d = diff(`${slug}-${name}-${width}`, ref, actual)
        console.log(
          `  ${slug} ${name} ${width}: écart ${(d.ratio * 100).toFixed(2)} % (${d.pixels} px sur ${d.compared}), hauteur ${d.heightDelta >= 0 ? '+' : ''}${d.heightDelta} px`,
        )
        expect(d.ratio).toBeLessThan(MAX_DIFF)
        expect(Math.abs(d.heightDelta)).toBeLessThanOrEqual(2)
      })
    }
  }
}
