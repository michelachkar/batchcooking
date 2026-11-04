import { expect, test } from '@playwright/test'
import homeSections from './fixtures/home-sections.json' with { type: 'json' }
import barSections from './fixtures/pages/mobile-bar.json' with { type: 'json' }
import { crop, diff, fullPageShot, loadReference, mask } from './compare'

// Deux pages ont les mêmes sections dans le même ordre : l'accueil et la page « Mobile Bar & Cocktails » (palette prune).
const PAGES = [
  { label: 'accueil', path: '/', ref: 'home', sections: homeSections },
  { label: 'bar', path: '/formule-evenement', ref: 'mobile-bar', sections: barSections },
] as const

// Une section de l'accueil = un conteneur de premier niveau d'Elementor (index dans `top`), repéré chez nous par data-section.
const MAX_DIFF = Number(process.env.VR_MAX_DIFF ?? 0.01)
const WIDTHS = [375, 768, 1440] as const
const SECTIONS = [
  { name: 'hero', index: 0 },
  { name: 'quick-inquiry', index: 1 },
  { name: 'experiences', index: 2 },
  { name: 'chef', index: 3 },
  { name: 'about', index: 4 },
  { name: 'menus', index: 5 },
  { name: 'photos', index: 6 },
  { name: 'included', index: 7 },
  { name: 'events', index: 8 },
  { name: 'steps', index: 9 },
  { name: 'partners', index: 10 },
  // À 375 px la démo affiche la grille des occasions tronquée (bogue de mise en page du thème) : on ne compare que l'en-tête.
  { name: 'occasions', index: 11, maxHeight: { 375: 470 } },
  { name: 'reviews', index: 12 },
  { name: 'team', index: 13 },
  { name: 'trusted', index: 14 },
  { name: 'proposal', index: 16 },
  { name: 'posts-intro', index: 17 },
  { name: 'posts', index: 18 },
] as { name: string; index: number; maxHeight?: Partial<Record<number, number>> }[]

for (const { label, path, ref: refName, sections } of PAGES)
  for (const { name, index, maxHeight } of SECTIONS) {
    for (const width of WIDTHS) {
      test(`${label} › ${name} ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 })
        await page.goto(path)
        await page.evaluate(() => document.fonts.ready)
        const el = page.locator(`[data-section="${name}"]`)
        await el.scrollIntoViewIfNeeded()
        await page.waitForTimeout(300)
        // Capture de la page entière puis recadrage : même phase de rendu (positions fractionnaires) que la référence.
        const box = (await el.boundingBox())!
        const oursY = box.y + (await page.evaluate(() => scrollY))
        const r = (sections as typeof homeSections)[String(width) as '375'].top[index]
        const full = await fullPageShot(page)
        const y0 = Math.round(r.y)
        const cap = maxHeight?.[width as keyof typeof maxHeight] ?? Infinity
        const height = Math.min(Math.round(r.y + r.h) - y0, cap)
        const actual = crop(full, {
          x: 0,
          y: Math.round(oursY),
          width,
          height: Math.min(Math.round(oursY + box.height) - Math.round(oursY), cap),
        })
        const ref = crop(loadReference(refName + '/' + width + '.png'), {
          x: 0,
          y: y0,
          width,
          height,
        })
        const rects = await el
          .locator('[data-vr-mask]')
          .evaluateAll(
            (els, o) =>
              els
                .map((e) => e.getBoundingClientRect())
                .map((q) => ({ x: q.x - o.x, y: q.y + scrollY - o.y, width: q.width, height: q.height })),
            { x: box.x, y: oursY },
          )
        mask(actual, rects)
        mask(ref, rects)
        const d = diff(`${refName}-${name}-${width}`, ref, actual)
        console.log(
          `  ${name} ${width}: écart ${(d.ratio * 100).toFixed(2)} % (${d.pixels} px sur ${d.compared}), hauteur ${d.heightDelta >= 0 ? '+' : ''}${d.heightDelta} px`,
        )
        expect(d.ratio).toBeLessThan(MAX_DIFF)
        expect(Math.abs(d.heightDelta)).toBeLessThanOrEqual(2)
      })
    }
  }
