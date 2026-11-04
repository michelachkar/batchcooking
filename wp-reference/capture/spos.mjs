// Positions des textes et blocs d'une section (relatives au haut de la section) : référence (8080) vs notre build de test (3100).
// Usage : node spos.mjs <largeur> <sélecteur référence> <sélecteur chez nous> [chemin]
import { chromium } from 'playwright'
const [width, refSel, oursSel, path = '/'] = process.argv.slice(2)
const b = await chromium.launch()
async function grab(url, sel) {
  const p = await (await b.newContext({ viewport: { width: +width, height: 900 }, reducedMotion: 'reduce' })).newPage()
  await p.goto(url, { waitUntil: 'load' })
  await p.waitForTimeout(400)
  return p.evaluate((sel) => {
    const [s0, n0] = sel.split('@'); const root = document.querySelectorAll(s0)[+(n0 ?? 0)]; const top = root.getBoundingClientRect().y + scrollY
    const out = [`H ${root.getBoundingClientRect().height.toFixed(1)}`]
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n
    while ((n = w.nextNode())) {
      const t = n.textContent.trim(); if (!t || getComputedStyle(n.parentElement).display === 'none') continue
      const r = document.createRange(); r.selectNodeContents(n); const q = r.getClientRects()[0]
      if (!q || !q.width) continue
      out.push(`${t.slice(0, 22).padEnd(22)} x${q.x.toFixed(0).padStart(4)} y${(q.y + scrollY - top).toFixed(0).padStart(5)} w${q.width.toFixed(0).padStart(4)} h${q.height.toFixed(0)}`)
    }
    root.querySelectorAll('img, svg, video, a, button, input, select').forEach((e) => { const q = e.getBoundingClientRect(); if (q.width && q.height) out.push(`~${(e.tagName + (e.className?.baseVal ?? e.className ?? '')).slice(0, 18).padEnd(19)} x${q.x.toFixed(0).padStart(4)} y${(q.y + scrollY - top).toFixed(0).padStart(5)} w${q.width.toFixed(0).padStart(4)} h${q.height.toFixed(0)}`) })
    return out
  }, sel)
}
const ref = await grab('http://localhost:8080' + path, refSel), ours = await grab('http://localhost:3100' + path, oursSel)
console.log('REF'.padEnd(54) + 'OURS')
const n = Math.max(ref.length, ours.length)
for (let i = 0; i < n; i++) {
  const a = ref[i] ?? '', c = ours[i] ?? ''
  const num = (s, k) => +(s.match(new RegExp(k + '\\s*(-?\\d+)'))?.[1] ?? NaN)
  const bad = a && c && a.slice(0, 5) === c.slice(0, 5) && (Math.abs(num(a, 'y') - num(c, 'y')) > 1 || Math.abs(num(a, 'x') - num(c, 'x')) > 1 || Math.abs(num(a, 'h') - num(c, 'h')) > 1)
  console.log(a.padEnd(54) + c + (bad ? ' <<<' : ''))
}
await b.close()
