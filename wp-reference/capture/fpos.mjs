// Positions des textes du footer (relatives au haut du footer) : référence vs notre build de test
import { chromium } from 'playwright'
const width = Number(process.argv[2] ?? 1440)
const b = await chromium.launch()
async function grab(url) {
  const p = await (await b.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })).newPage()
  await p.goto(url, { waitUntil: 'load' })
  return p.evaluate(() => {
    const f = document.querySelector('footer'); const top = f.getBoundingClientRect().y + scrollY
    const out = [`H ${f.getBoundingClientRect().height.toFixed(0)}`]
    const w = document.createTreeWalker(f, NodeFilter.SHOW_TEXT); let n
    while ((n = w.nextNode())) {
      const t = n.textContent.trim(); if (!t) continue
      const r = document.createRange(); r.selectNodeContents(n); const q = r.getBoundingClientRect()
      if (!q.width) continue
      out.push(`${t.slice(0, 20).padEnd(20)} x${q.x.toFixed(0).padStart(4)} y${(q.y + scrollY - top).toFixed(0).padStart(5)} w${q.width.toFixed(0).padStart(4)} h${q.height.toFixed(0)}`)
    }
    f.querySelectorAll('svg, img, i').forEach((e) => { const q = e.getBoundingClientRect(); if (q.width) out.push(`~${e.tagName.padEnd(19)} x${q.x.toFixed(0).padStart(4)} y${(q.y + scrollY - top).toFixed(0).padStart(5)} w${q.width.toFixed(0).padStart(4)} h${q.height.toFixed(0)}`) })
    return out
  })
}
const ref = await grab('http://localhost:8080/about/'), ours = await grab('http://localhost:3100/')
const key = (l) => l.slice(0, 20)
const o = new Map(ours.map((l) => [key(l), l]))
console.log('REF'.padEnd(52) + 'OURS')
for (const l of ref) { const m = o.get(key(l)); const flag = m && m !== l ? (Math.abs(+l.match(/y\s*(-?\d+)/)?.[1] - +m.match(/y\s*(-?\d+)/)?.[1]) > 1 || Math.abs(+l.match(/x\s*(-?\d+)/)?.[1] - +m.match(/x\s*(-?\d+)/)?.[1]) > 1 ? ' <<<' : '') : ''; console.log(l.padEnd(52) + (m ?? '(absent)') + flag) }
await b.close()
