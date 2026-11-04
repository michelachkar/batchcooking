// Rectangles des sections de l'accueil dans la référence (coordonnées de page), à 3 largeurs.
// Usage : node sections.mjs > ../../tests/visual/fixtures/home-sections.json
import { chromium } from 'playwright'
const b = await chromium.launch()
const out = {}
for (const w of [375, 768, 1440]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' })).newPage()
  await p.goto('http://localhost:8080/', { waitUntil: 'load' })
  await p.waitForTimeout(500)
  // Même préparation que capture.mjs : défilement complet pour déclencher les contenus différés (grille des occasions à 375 px).
  await p.addStyleTag({ content: '*{animation-duration:.001s!important;animation-delay:0s!important;animation-iteration-count:1!important;animation-fill-mode:forwards!important;transition:none!important}.site-header.savrio-header-fade-in{opacity:1!important}.preloader,#preloader,[class*="preloader"]{display:none!important}' })
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)) }
    window.scrollTo(0, 0)
    document.querySelectorAll('.elementor-invisible').forEach((e) => e.classList.remove('elementor-invisible'))
  })
  await p.waitForTimeout(600)
  out[w] = await p.evaluate(() => {
    const root = document.querySelector('.elementor-6100') ?? document.querySelector('[data-elementor-type="wp-page"]')
    const top = [...root.querySelectorAll(':scope > .e-con, :scope > .elementor-section')]
    const f = (v) => Math.round(v * 100) / 100
    const r = (e) => { const q = e.getBoundingClientRect(); return { x: f(q.x), y: f(q.y + scrollY), w: f(q.width), h: f(q.height) } }
    const widgets = [...root.querySelectorAll('[class*="mtfe-"][class*="elementor-widget-"]')].map((e) => ({ widget: [...e.classList].find((c) => c.startsWith('elementor-widget-mtfe')), ...r(e) }))
    return { top: top.map((e, i) => ({ i, id: e.dataset.id, ...r(e) })), widgets, pageHeight: document.documentElement.scrollHeight }
  })
}
for (const w of [375, 768, 1440]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' })).newPage()
  await p.goto('http://localhost:8080/about/', { waitUntil: 'load' })
  out[w].footer = await p.evaluate(() => { const q = document.querySelector('footer').getBoundingClientRect(); return { y: Math.round((q.y + scrollY) * 100) / 100, h: Math.round(q.height * 100) / 100, pageHeight: document.documentElement.scrollHeight } })
}
console.log(JSON.stringify(out, null, 1))
await b.close()
