// Source de vérité des formules et de leurs prix (avant crédit d'impôt, par semaine).
// Les cartes de la page batch cooking et le modal de demande de rappel lisent tous deux ce fichier.
export const PACKS = ['serenite', 'signature'] as const
export type PackId = (typeof PACKS)[number]

export const PERIODS = ['week', 'month'] as const
export type Period = (typeof PERIODS)[number]

export const DINNERS = [3, 4, 5] as const
export type Dinners = (typeof DINNERS)[number]

// Prix par semaine avant crédit d'impôt : [3 dîners, 4 dîners, 5 dîners].
const PRICES: Record<PackId, Record<Period, readonly [number, number, number]>> = {
  serenite: { month: [99, 109, 119], week: [139, 149, 159] },
  signature: { month: [119, 129, 139], week: [159, 169, 179] },
}

export const TAX_CREDIT = 0.5

export const isPack = (v: unknown): v is PackId => PACKS.includes(v as PackId)

/** Prix hebdomadaire avant crédit d'impôt. */
export const priceBefore = (pack: PackId, period: Period, dinners: Dinners) =>
  PRICES[pack][period][DINNERS.indexOf(dinners)]

/** Prix hebdomadaire après crédit d'impôt. */
export const priceAfter = (pack: PackId, period: Period, dinners: Dinners) =>
  priceBefore(pack, period, dinners) * (1 - TAX_CREDIT)

/** Prix d'appel d'une formule (le plus bas, après crédit d'impôt). */
export const fromPrice = (pack: PackId) =>
  Math.min(...PERIODS.map((p) => priceAfter(pack, p, DINNERS[0])))

/** « 49,50 » / « 77 ». */
export const euro = (n: number) =>
  Number.isInteger(n) ? String(n) : n.toFixed(2).replace('.', ',')
