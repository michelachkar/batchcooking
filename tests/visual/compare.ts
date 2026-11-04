import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Page } from '@playwright/test'
import pixelmatch from 'pixelmatch'
import { PNG } from 'pngjs'

export const REFERENCE_DIR = join(import.meta.dirname, '../../reference')
export const OUTPUT_DIR = join(import.meta.dirname, '__output__')

/** Capture de la page entière par tranches : Chromium rend blanc tout ce qui dépasse 16 384 px de haut. */
export async function fullPageShot(page: Page) {
  // Défilement complet : les images différées de next/image ne se chargent qu'à l'approche du viewport.
  await page.evaluate(async () => {
    // Les images différées hors écran (carrousels, boîtes de dialogue) ne se chargeraient jamais : on les force.
    document
      .querySelectorAll('img[loading="lazy"]')
      .forEach((i) => ((i as HTMLImageElement).loading = 'eager'))
    for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
      scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 60))
    }
    await Promise.race([
      Promise.all(
        [...document.images].map((i) =>
          i.complete ? 0 : new Promise((r) => (i.onload = i.onerror = r)),
        ),
      ),
      new Promise((r) => setTimeout(r, 8000)),
    ])
    // Décodage terminé avant la capture (sinon une image encore en cours de rendu apparaît en bandes).
    await Promise.race([
      Promise.all([...document.images].map((i) => i.decode().catch(() => undefined))),
      new Promise((r) => setTimeout(r, 8000)),
    ])
    scrollTo(0, 0)
  })
  await page.waitForTimeout(100)
  const size = await page.evaluate(() => ({
    w: innerWidth,
    h: document.documentElement.scrollHeight,
  }))
  const out = new PNG({ width: size.w, height: size.h })
  for (let y = 0; y < size.h; y += 6000) {
    const height = Math.min(6000, size.h - y)
    const tile = PNG.sync.read(
      await page.screenshot({ fullPage: true, clip: { x: 0, y, width: size.w, height } }),
    )
    PNG.bitblt(tile, out, 0, 0, Math.min(tile.width, size.w), tile.height, 0, y)
  }
  return out
}

export type Rect = { x: number; y: number; width: number; height: number }

export function readPng(buffer: Buffer) {
  return PNG.sync.read(buffer)
}

/** Recadre une image PNG (x, y, largeur, hauteur), bornée à ses dimensions. */
export function crop(src: PNG, r: Rect) {
  const x0 = Math.max(0, Math.round(r.x))
  const y0 = Math.max(0, Math.round(r.y))
  const w = Math.min(Math.round(r.width), src.width - x0)
  const h = Math.min(Math.round(r.height), src.height - y0)
  const out = new PNG({ width: w, height: h })
  PNG.bitblt(src, out, x0, y0, w, h, 0, 0)
  return out
}

/** Peint des rectangles (contenus remplacés : textes, logo) d'une couleur unie, des deux côtés de la comparaison. */
export function mask(img: PNG, rects: Rect[]) {
  for (const r of rects) {
    const x1 = Math.min(img.width, Math.round(r.x + r.width))
    const y1 = Math.min(img.height, Math.round(r.y + r.height))
    for (let y = Math.max(0, Math.round(r.y)); y < y1; y++)
      for (let x = Math.max(0, Math.round(r.x)); x < x1; x++) {
        const i = (img.width * y + x) << 2
        img.data[i] = 255
        img.data[i + 1] = 0
        img.data[i + 2] = 255
        img.data[i + 3] = 255
      }
  }
}

export type DiffResult = { ratio: number; heightDelta: number; pixels: number; compared: string }

/**
 * Compare deux images sur leur zone commune (en haut à gauche) ; l'écart de hauteur est rapporté à part.
 * Les positions fractionnaires de la référence (hauteurs en 0,4 px, etc.) font tomber le texte sur un pixel ou le suivant :
 * on retient le meilleur des décalages verticaux de −1, 0 et +1 px de l'image testée, sans jamais tolérer plus.
 */
export function diff(name: string, ref: PNG, actual: PNG): DiffResult {
  let best: { ratio: number; pixels: number; out: PNG; compared: string; dy: number } | undefined
  for (const dy of [0, -1, 1]) {
    const width = Math.min(ref.width, actual.width)
    const height = Math.min(ref.height, actual.height) - 1
    const a = crop(ref, { x: 0, y: Math.max(0, dy), width, height })
    const b = crop(actual, { x: 0, y: Math.max(0, -dy), width, height })
    const out = new PNG({ width, height })
    const pixels = pixelmatch(a.data, b.data, out.data, width, height, { threshold: 0.1 })
    const ratio = pixels / (width * height)
    if (!best || ratio < best.ratio)
      best = { ratio, pixels, out, compared: `${width}x${height}`, dy }
  }
  const r = best!
  mkdirSync(OUTPUT_DIR, { recursive: true })
  writeFileSync(join(OUTPUT_DIR, `${name}.diff.png`), PNG.sync.write(r.out))
  writeFileSync(join(OUTPUT_DIR, `${name}.actual.png`), PNG.sync.write(actual))
  return {
    ratio: r.ratio,
    heightDelta: actual.height - ref.height,
    pixels: r.pixels,
    compared: r.compared,
  }
}

export function loadReference(file: string) {
  return PNG.sync.read(readFileSync(join(REFERENCE_DIR, file)))
}
