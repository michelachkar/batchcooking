// Capture les pages du WordPress de référence à 375 / 768 / 1440 px, plus les états du menu.
// Usage : node capture.mjs [slug ...]   (sans argument : toutes les pages)
//   <page>/<largeur>.png            page entière, header inclus
//   home/states/<état>-<largeur>.png  menu au survol (1440) et menu mobile ouvert (375, 768)
import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'
import { PNG } from '../../node_modules/pngjs/lib/png.js'

const BASE = 'http://localhost:8080'
const OUT = new URL('../../reference/', import.meta.url).pathname
const WIDTHS = [375, 768, 1440]
const PAGES = {
  home: '/',
  'mobile-bar': '/mobile-bar-cocktails/',
  about: '/about/',
  services: '/services/',
  'service-detail': '/service/private-chef-dinners/',
  team: '/our-team/',
  'team-member': '/team/theo-ramirez/',
  pricing: '/pricing-plans/',
  faq: '/faq/',
  contact: '/contact/',
  blog: '/blog/',
  'blog-no-sidebar': '/blog-no-sidebar/',
  'blog-left-sidebar': '/blog-left-sidebar/',
  'blog-post': '/planning-a-mobile-bar-for-your-party/',
  'blog-grid': '/blog-grid-2/',
  portfolio: '/portfolio/',
  'portfolio-detail': '/portfolio/rooftop-launch-cocktail-party/',
  'not-found': '/page-qui-nexiste-pas/',
}
// Les animations vont à leur état final au lieu d'être supprimées : le header est à opacity 0 sans elles.
const FREEZE = `*{animation-duration:.001s!important;animation-delay:0s!important;animation-iteration-count:1!important;animation-fill-mode:forwards!important}
.site-header.savrio-header-fade-in{opacity:1!important}.preloader,#preloader,[class*="preloader"]{display:none!important}
/* Entrées animées de la démo (déclenchées au défilement) : on force l'état final. */
[class*="mtfe-savrio-services-core__"],[class*="mt-team-"],[class*="mt-service-"],[class*="mt-post-"],[class*="mt-related"]{transform:none!important;opacity:1!important}`

const browser = await chromium.launch()

// Chromium tronque les captures « page entière » au-delà de 16 384 px (le bas reste blanc) : on assemble des tranches.
export async function stitched(page, width) {
  const total = await page.evaluate(() => document.documentElement.scrollHeight)
  const out = new PNG({ width, height: total })
  for (let y = 0; y < total; y += 6000) {
    const h = Math.min(6000, total - y)
    const tile = PNG.sync.read(await page.screenshot({ fullPage: true, clip: { x: 0, y, width, height: h } }))
    PNG.bitblt(tile, out, 0, 0, Math.min(tile.width, width), tile.height, 0, y)
  }
  return PNG.sync.write(out)
}

async function open(width, path, extraCss = '') {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce', deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  const res = await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 60000 })
  await page.addStyleTag({ content: FREEZE + extraCss })
  return { ctx, page, status: res.status() }
}

async function fullPage(name, path) {
  mkdirSync(`${OUT}${name}`, { recursive: true })
  for (const width of WIDTHS) {
    const { ctx, page, status } = await open(width, path, '*{transition:none!important}')
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)) }
      window.scrollTo(0, 0)
      document.querySelectorAll('.elementor-invisible').forEach((e) => e.classList.remove('elementor-invisible'))
      // Elementor ne charge les fonds photo qu'à l'entrée dans l'écran : on force le chargement de tous.
      document.querySelectorAll('.e-con').forEach((e) => e.classList.add('e-lazyloaded'))
    })
    await page.waitForTimeout(600)
    writeFileSync(`${OUT}${name}/${width}.png`, await stitched(page, width))
    console.log(name, width, status)
    await ctx.close()
  }
}

// États du menu : survol desktop, menu mobile ouvert. Transitions conservées pour voir le vrai état de survol.
async function menuStates() {
  const dir = `${OUT}home/states/`
  mkdirSync(dir, { recursive: true })
  const nav = 'header#masthead nav#site-navigation'
  const clip = (h) => ({ x: 0, y: 0, width: 0, height: h })
  const shot = async (page, file, h) => {
    const w = page.viewportSize().width
    await page.screenshot({ path: dir + file, clip: { x: 0, y: 0, width: w, height: h } })
    console.log('state', file)
  }
  // Desktop 1440
  {
    const { ctx, page } = await open(1440, '/')
    const link = (t) => page.locator(`${nav} ul.nav-menu > li > a`, { hasText: new RegExp(`^\\s*${t}\\s*$`) }).filter({ visible: true }).first()
    await shot(page, 'menu-rest-1440.png', 420)
    await link('About').hover(); await page.waitForTimeout(500)
    await shot(page, 'menu-hover-link-1440.png', 420)
    for (const t of ['Home', 'Services', 'Pages', 'Journal']) {
      await link(t).hover(); await page.waitForTimeout(700)
      await shot(page, `menu-hover-submenu-${t.toLowerCase()}-1440.png`, 560)
    }
    const sub = page.locator(`${nav} li.menu-item-has-children ul.sub-menu a`).filter({ visible: true }).first()
    if (await sub.count()) { await sub.hover(); await page.waitForTimeout(400); await shot(page, 'menu-hover-submenu-item-1440.png', 560) }
    await page.locator('header#masthead .mtfe-animated-btn').filter({ visible: true }).first().hover(); await page.waitForTimeout(600)
    await shot(page, 'button-hover-1440.png', 200)
    await page.locator('header#masthead .mtfe-search-trigger, header#masthead [class*="search"] button').first().click({ timeout: 3000 }).catch(() => {})
    await page.waitForTimeout(600); await shot(page, 'search-open-1440.png', 900)
    await ctx.close()
  }
  // Mobile 375 et tablette 768 : burger fermé / ouvert, sous-menu déplié
  for (const width of [375, 768]) {
    const { ctx, page } = await open(width, '/')
    await shot(page, `menu-closed-${width}.png`, 200)
    // clic sur le wrapper : un clic sur le burger lui-même déclenche le handler deux fois (bug du thème, net zéro)
    await page.locator('.mtfe-nav-mobile-burger-wrapper').filter({ visible: true }).first().click()
    await page.waitForTimeout(900)
    await page.screenshot({ path: `${dir}menu-open-${width}.png` }); console.log('state', `menu-open-${width}.png`)
    // le chevron est à droite de l'entrée « Services » ; un clic sur le texte suivrait le lien
    const li = page.locator('.mtfe-off-canvas-body li.menu-item-has-children').filter({ visible: true }).nth(2)
    const box = await li.boundingBox()
    if (box) {
      await page.mouse.click(box.x + box.width - 14, box.y + 20); await page.waitForTimeout(900)
      await page.screenshot({ path: `${dir}menu-open-submenu-${width}.png` }); console.log('state', `menu-open-submenu-${width}.png`)
    }
    await ctx.close()
  }
}

const wanted = process.argv.slice(2)
if (!wanted.length || wanted.includes('states')) await menuStates()
for (const [name, path] of Object.entries(PAGES)) if (!wanted.length || wanted.includes(name)) await fullPage(name, path)
await browser.close()
