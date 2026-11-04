// Rectangles des blocs d'une page intérieure dans la référence (coordonnées de page), à 3 largeurs.
// Usage : node page-sections.mjs <slug> <chemin>   → tests/visual/fixtures/pages/<slug>.json
import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'

const [slug, path] = process.argv.slice(2)
const b = await chromium.launch()
const out = {}
for (const w of [375, 768, 1440]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' })).newPage()
  await p.goto('http://localhost:8080' + path, { waitUntil: 'load' })
  await p.waitForTimeout(500)
  // Même préparation que capture.mjs : défilement complet pour déclencher les contenus différés.
  await p.addStyleTag({ content: '*{animation-duration:.001s!important;animation-delay:0s!important;animation-iteration-count:1!important;animation-fill-mode:forwards!important;transition:none!important}.site-header.savrio-header-fade-in{opacity:1!important}.preloader,#preloader,[class*="preloader"]{display:none!important}' })
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)) }
    window.scrollTo(0, 0)
    document.querySelectorAll('.elementor-invisible').forEach((e) => e.classList.remove('elementor-invisible'))
  })
  await p.waitForTimeout(600)
  out[w] = await p.evaluate(() => {
    const f = (v) => Math.round(v * 100) / 100
    const r = (e) => { if (!e) return null; const q = e.getBoundingClientRect(); return { x: f(q.x), y: f(q.y + scrollY), w: f(q.width), h: f(q.height) } }
    const root = document.querySelector('[data-elementor-type="wp-page"]')
    const top = root ? [...root.children].filter((e) => e.matches('.e-con, .elementor-section')) : []
    return { head: r(document.querySelector('.savrio-pagehead')), top: top.map(r), footer: r(document.querySelector('footer.site-footer')), pageHeight: document.documentElement.scrollHeight }
  })
}
mkdirSync(new URL('../../tests/visual/fixtures/pages/', import.meta.url), { recursive: true })
writeFileSync(new URL(`../../tests/visual/fixtures/pages/${slug}.json`, import.meta.url), JSON.stringify(out, null, 1) + '\n')
console.log(slug, JSON.stringify(Object.fromEntries(Object.entries(out).map(([w, v]) => [w, [v.head?.h, v.top.map((t) => Math.round(t.h)), v.pageHeight]]))))
await b.close()
