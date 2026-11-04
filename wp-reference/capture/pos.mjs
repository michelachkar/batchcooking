// Compare les positions des éléments de header : référence (8080) vs notre build de test (3100)
import { chromium } from 'playwright'
const width = Number(process.argv[2] ?? 1440)
const b = await chromium.launch()
async function grab(url, sel) {
  const p = await (await b.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })).newPage()
  await p.goto(url, { waitUntil: 'load' })
  await p.addStyleTag({ content: '.site-header.savrio-header-fade-in{opacity:1!important}.preloader{display:none!important}' })
  return p.evaluate((sel) => {
    const out = []
    const root = document.querySelector(sel)
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    let n; while ((n = walker.nextNode())) {
      const t = n.textContent.trim(); if (!t) continue
      const r = document.createRange(); r.selectNodeContents(n); const q = r.getBoundingClientRect()
      if (q.width && q.y < 160 + 0 && getComputedStyle(n.parentElement).visibility !== 'hidden' && q.x >= 0) out.push(`T ${t.slice(0, 22).padEnd(22)} x${q.x.toFixed(1)} y${q.y.toFixed(1)} w${q.width.toFixed(1)} h${q.height.toFixed(1)}`)
    }
    root.querySelectorAll('svg, img, i').forEach((e) => { const q = e.getBoundingClientRect(); if (q.width && q.y < 160 && q.x >= 0 && !e.closest('.mtfe-off-canvas-panel')) out.push(`I ${e.tagName.padEnd(22)} x${q.x.toFixed(1)} y${q.y.toFixed(1)} w${q.width.toFixed(1)} h${q.height.toFixed(1)}`) })
    return out
  }, sel)
}
const ref = (await grab('http://localhost:8080/about/', 'header#masthead')).filter(l => !/^T (Search|\s)/.test(l))
const ours = await grab('http://localhost:3100/', '#site-header')
console.log('REF'.padEnd(62) + 'OURS')
const n = Math.max(ref.length, ours.length)
for (let i = 0; i < n; i++) console.log((ref[i] ?? '').padEnd(62) + (ours[i] ?? ''))
await b.close()
