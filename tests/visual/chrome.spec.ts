import { expect, test, type Page } from '@playwright/test'
import homeSections from './fixtures/home-sections.json' with { type: 'json' }
import { crop, diff, loadReference, mask, readPng, type Rect } from './compare'

// Seuil du brief : < 1 % d'écart, hors contenus remplacés (masqués via data-vr-mask).
const MAX_DIFF = Number(process.env.VR_MAX_DIFF ?? 0.01)
const WIDTHS = [375, 768, 1440] as const

// Hauteurs de référence mesurées sur le WordPress de référence (page /about/).
const HEADER_H = { 375: 72, 768: 148, 1440: 121 } as const
const FOOTER_H = { 375: 1698, 768: 1596, 1440: 1122 } as const

async function maskRects(
  page: Page,
  origin: { x: number; y: number },
  within: Rect,
): Promise<Rect[]> {
  const rects = await page.locator('[data-vr-mask]').evaluateAll((els) =>
    els
      .map((e) => e.getBoundingClientRect())
      .filter((r) => r.width > 0 && r.height > 0)
      .map((r) => ({ x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height })),
  )
  return rects
    .filter((r) => r.y + r.height > within.y && r.y < within.y + within.height)
    .map((r) => ({ x: r.x - origin.x, y: r.y - origin.y, width: r.width, height: r.height }))
}

async function load(page: Page, width: number) {
  await page.setViewportSize({ width, height: 900 })
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
}

function report(name: string, r: ReturnType<typeof diff>) {
  console.log(
    `  ${name}: écart ${(r.ratio * 100).toFixed(2)} % (${r.pixels} px sur ${r.compared}), hauteur ${r.heightDelta >= 0 ? '+' : ''}${r.heightDelta} px`,
  )
}

for (const width of WIDTHS) {
  test(`header ${width}px`, async ({ page }) => {
    await load(page, width)
    const clip = { x: 0, y: 0, width, height: HEADER_H[width] }
    const actual = readPng(await page.screenshot({ clip }))
    const ref = crop(loadReference(`about/${width}.png`), clip)
    const rects = await maskRects(page, { x: 0, y: 0 }, clip)
    mask(actual, rects)
    mask(ref, rects)
    const r = diff(`header-${width}`, ref, actual)
    report(`header ${width}`, r)
    expect(r.ratio).toBeLessThan(MAX_DIFF)
  })

  test(`footer ${width}px`, async ({ page }) => {
    await load(page, width)
    const footer = page.locator('footer')
    // La référence a le haut du footer à une position fractionnaire propre (page /about/) : on décale notre page
    // de la différence modulo 1 px pour comparer des pixels échantillonnés à la même phase.
    const refTop = (homeSections as Record<string, { footer: { y: number } }>)[String(width)].footer
      .y
    const oursTop = await footer.evaluate((e) => e.getBoundingClientRect().y + scrollY)
    const shift = (((refTop - oursTop) % 1) + 1) % 1
    await page.addStyleTag({ content: `main{padding-bottom:${shift}px}` })
    const box = (await footer.boundingBox())!
    const top = box.y + (await page.evaluate(() => scrollY))
    // page entière puis recadrage : même phase de rendu que la référence
    const shot = readPng(await page.screenshot({ fullPage: true }))
    const actual = crop(shot, {
      x: 0,
      y: Math.round(top),
      width,
      height: Math.round(top + box.height) - Math.round(top),
    })
    const full = loadReference(`about/${width}.png`)
    const ref = crop(full, {
      x: 0,
      y: full.height - FOOTER_H[width],
      width,
      height: FOOTER_H[width],
    })
    const rects = await maskRects(
      page,
      { x: 0, y: top },
      { x: 0, y: top, width, height: box.height },
    )
    mask(actual, rects)
    mask(ref, rects)
    const r = diff(`footer-${width}`, ref, actual)
    report(`footer ${width}`, r)
    expect(r.ratio).toBeLessThan(MAX_DIFF)
    expect(Math.abs(r.heightDelta)).toBeLessThanOrEqual(2)
  })
}

// États : sous-menu desktop au survol, menu mobile ouvert. On compare les zones opaques (le contenu derrière diffère).
test('menu desktop : survol de « Services » (1440px)', async ({ page }) => {
  await load(page, 1440)
  await page
    .locator('header nav a', { hasText: /^Services$/ })
    .first()
    .hover()
  await page.waitForTimeout(600)
  const full = loadReference('home/states/menu-hover-submenu-services-1440.png')
  const shot = readPng(await page.screenshot({ clip: { x: 0, y: 0, width: 1440, height: 200 } }))
  // barre de navigation (lien survolé coloré) puis liste déroulante
  for (const [name, clip] of [
    ['bar', { x: 0, y: 0, width: 1440, height: 101 }],
    ['dropdown', { x: 577, y: 101, width: 192, height: 89 }],
  ] as const) {
    const rects = await maskRects(page, { x: clip.x, y: clip.y }, clip)
    const a = crop(full, clip)
    const b = crop(shot, clip)
    mask(a, rects)
    mask(b, rects)
    const r = diff(`menu-hover-services-${name}`, a, b)
    report(`menu survol ${name}`, r)
    expect(r.ratio).toBeLessThan(MAX_DIFF)
  }
})

for (const width of [375, 768] as const) {
  test(`menu mobile ouvert (${width}px)`, async ({ page }) => {
    await load(page, width)
    await page.getByRole('button', { name: 'Open menu' }).click()
    await page.waitForTimeout(700)
    const clip = { x: 0, y: 0, width: 300, height: 900 } // le panneau est opaque ; l'overlay laisse voir le contenu provisoire
    const actual = readPng(await page.screenshot({ clip }))
    const ref = crop(loadReference(`home/states/menu-open-${width}.png`), clip)
    const rects = await page
      .locator('[role="dialog"] [data-vr-mask]')
      .evaluateAll((els) =>
        els
          .map((e) => e.getBoundingClientRect())
          .map((r) => ({ x: r.x, y: r.y, width: r.width, height: r.height })),
      )
    mask(actual, rects)
    mask(ref, rects)
    const r = diff(`menu-open-${width}`, ref, actual)
    report(`menu ouvert ${width}`, r)
    expect(r.ratio).toBeLessThan(MAX_DIFF)
  })
}
