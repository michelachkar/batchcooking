// Arbre compact d'un composant (rects + styles calculés utiles) : usage node dump.mjs <largeur> <sélecteur> [port=8080] [chemin=/] [profondeur=12]
import { chromium } from 'playwright'
const [width, sel, port = '8080', path = '/', depth = '12'] = process.argv.slice(2)
const b = await chromium.launch()
const p = await (await b.newContext({ viewport: { width: +width, height: 900 }, reducedMotion: 'reduce' })).newPage()
await p.goto(`http://localhost:${port}${path}`, { waitUntil: 'load' })
await p.evaluate(() => document.fonts.ready)
await p.waitForTimeout(500)
const out = await p.evaluate(([sel, maxDepth]) => {
  const [s0, n0] = sel.split('@'); const root = document.querySelectorAll(s0)[+(n0 ?? 0)]
  const r0 = root.getBoundingClientRect()
  const lines = []
  const zero = (v) => !v || v === '0px' || v === 'none' || v === 'normal' || v === 'auto' || v === 'rgba(0, 0, 0, 0)' || v === '0px 0px' || v === '0px 0px 0px 0px'
  const walk = (e, d, ps) => {
    if (d > maxDepth) return
    const s = getComputedStyle(e)
    if (s.display === 'none') { lines.push('  '.repeat(d) + e.tagName.toLowerCase() + '.' + String(e.className?.baseVal ?? e.className).split(' ')[0] + ' [display:none]'); return }
    const r = e.getBoundingClientRect()
    const f = []
    const add = (k, v) => { if (!zero(v)) f.push(k + ':' + v) }
    if (!['block', 'inline'].includes(s.display)) f.push('d:' + s.display)
    if (s.position !== 'static') f.push('pos:' + s.position + (s.position === 'absolute' || s.position === 'relative' ? `(${s.top} ${s.right} ${s.bottom} ${s.left})` : ''))
    const m = [s.marginTop, s.marginRight, s.marginBottom, s.marginLeft].join(' '); add('m', m === '0px 0px 0px 0px' ? '' : m)
    const pd = [s.paddingTop, s.paddingRight, s.paddingBottom, s.paddingLeft].join(' '); add('p', pd === '0px 0px 0px 0px' ? '' : pd)
    for (const k of ['fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color', 'textTransform', 'fontStyle', 'textAlign', 'fontFamily']) {
      const v = s[k]; if (v !== ps[k]) f.push(k.replace('fontSize', 'fs').replace('fontWeight', 'fw').replace('lineHeight', 'lh').replace('letterSpacing', 'ls').replace('fontFamily', 'ff') + ':' + (k === 'fontFamily' ? v.split(',')[0] : v))
    }
    add('bg', s.backgroundColor); add('bgi', s.backgroundImage.slice(0, 90))
    const bw = [s.borderTopWidth, s.borderRightWidth, s.borderBottomWidth, s.borderLeftWidth]
    if (bw.some((v) => v !== '0px')) f.push('bd:' + bw.join('/') + ' ' + s.borderTopStyle + ' ' + s.borderTopColor + (s.borderLeftColor !== s.borderTopColor ? ' L' + s.borderLeftColor : ''))
    add('r', s.borderRadius); add('sh', s.boxShadow.slice(0, 80)); add('op', s.opacity === '1' ? '' : s.opacity)
    if (s.display.includes('flex')) { f.push('fl:' + s.flexDirection + '/' + s.alignItems + '/' + s.justifyContent + '/' + s.flexWrap + ' g:' + s.rowGap + ' ' + s.columnGap); if (s.flexGrow !== '0') f.push('grow:' + s.flexGrow) }
    if (s.display.includes('grid')) f.push('cols:' + s.gridTemplateColumns + ' g:' + s.rowGap + ' ' + s.columnGap + ' ai:' + s.alignItems)
    if (s.overflow !== 'visible') f.push('ov:' + s.overflow)
    if (s.zIndex !== 'auto') f.push('z:' + s.zIndex)
    if (s.objectFit !== 'fill') f.push('of:' + s.objectFit)
    if (s.aspectRatio !== 'auto') f.push('ar:' + s.aspectRatio)
    if (s.transform !== 'none') f.push('tr:' + s.transform)
    if (s.maxWidth !== 'none') f.push('maxw:' + s.maxWidth)
    if (s.minHeight !== '0px' && s.minHeight !== 'auto') f.push('minh:' + s.minHeight)
    const own = [...e.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).filter(Boolean).join(' ').slice(0, 28)
    const cls = String(e.className?.baseVal ?? e.className).split(' ').filter((c) => !/^(elementor|e-con|reveal|in-view|d-\d)/.test(c)).slice(0, 2).join('.')
    lines.push('  '.repeat(d) + e.tagName.toLowerCase() + (cls ? '.' + cls : '') + ` [${(r.x - r0.x).toFixed(0)},${(r.y - r0.y).toFixed(0)} ${r.width.toFixed(0)}x${r.height.toFixed(1)}] ` + f.join(' ') + (own ? ` "${own}"` : ''))
    if (e.tagName.toLowerCase() === 'svg') return
    for (const c of e.children) walk(c, d + 1, s)
  }
  walk(root, 0, getComputedStyle(root.parentElement))
  return lines.join('\n')
}, [sel, +depth])
console.log(out)
await b.close()
