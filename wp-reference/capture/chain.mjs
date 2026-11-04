// Chaîne de conteneurs Elementor entre le haut de page et un widget : usage node chain.mjs <classe-widget> [slug-page]
import { chromium } from 'playwright'
const [widget, path = '/'] = process.argv.slice(2)
const b = await chromium.launch()
for (const w of [1440, 768, 375]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' })).newPage()
  await p.goto('http://localhost:8080' + path, { waitUntil: 'load' })
  console.log('==', w)
  console.log(await p.evaluate((widget) => {
    const el = document.querySelector('.elementor-widget-' + widget); const L = []
    for (let e = el; e && !e.matches('.elementor[data-elementor-type]'); e = e.parentElement) {
      const r = e.getBoundingClientRect(), s = getComputedStyle(e)
      L.unshift(`${e.tagName.toLowerCase()}.${[...e.classList].filter((c) => /^(e-con|elementor-widget|mtfe)/.test(c)).join('.').slice(0, 40)} x${r.x.toFixed(0)} y${(r.y + scrollY).toFixed(0)} ${r.width.toFixed(0)}x${r.height.toFixed(0)} pad:${s.padding} mar:${s.margin} bg:${s.backgroundColor} img:${s.backgroundImage.slice(0, 30)} rad:${s.borderRadius} flex:${s.flexDirection}/${s.alignItems} maxw:${s.maxWidth} gap:${s.rowGap}`)
    }
    return L.join('\n')
  }, widget))
}
await b.close()
