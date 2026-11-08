// Zones d'intervention : communes desservies, zone tarifaire et position (lat/lon) pour la carte schématique.
export type ZoneId = 'z1' | 'z2' | 'z3'

export type Commune = {
  name: string
  zone: ZoneId
  lat: number
  lon: number
  /** Côté du libellé sur la carte (par défaut : à droite du point). */
  label?: 'left' | 'right' | 'top' | 'bottom'
}

export const communes: Commune[] = [
  // Zone 1 : Montpellier et première couronne
  { name: 'Montpellier', zone: 'z1', lat: 43.611, lon: 3.877, label: 'bottom' },
  { name: 'Castelnau-le-Lez', zone: 'z1', lat: 43.633, lon: 3.913, label: 'right' },
  { name: 'Le Crès', zone: 'z1', lat: 43.642, lon: 3.935, label: 'right' },
  { name: 'Lattes', zone: 'z1', lat: 43.568, lon: 3.934, label: 'left' },
  { name: 'Juvignac', zone: 'z1', lat: 43.613, lon: 3.809, label: 'left' },
  { name: 'Saint-Jean-de-Védas', zone: 'z1', lat: 43.577, lon: 3.833, label: 'left' },
  { name: 'Clapiers', zone: 'z1', lat: 43.66, lon: 3.885, label: 'left' },
  { name: 'Jacou', zone: 'z1', lat: 43.668, lon: 3.912, label: 'right' },
  { name: 'Montferrier-sur-Lez', zone: 'z1', lat: 43.665, lon: 3.85, label: 'left' },
  { name: 'Saint-Clément-de-Rivière', zone: 'z1', lat: 43.68, lon: 3.835, label: 'left' },
  { name: 'Grabels', zone: 'z1', lat: 43.64, lon: 3.8, label: 'left' },
  // Zone 2 : 15 à 30 min
  { name: 'Vendargues', zone: 'z2', lat: 43.657, lon: 3.972, label: 'bottom' },
  { name: 'Castries', zone: 'z2', lat: 43.678, lon: 3.985, label: 'top' },
  { name: 'Baillargues', zone: 'z2', lat: 43.659, lon: 4.007, label: 'right' },
  { name: 'Saint-Gély-du-Fesc', zone: 'z2', lat: 43.692, lon: 3.808, label: 'left' },
  { name: 'Prades-le-Lez', zone: 'z2', lat: 43.695, lon: 3.866, label: 'right' },
  { name: 'Pérols', zone: 'z2', lat: 43.563, lon: 3.953, label: 'right' },
  { name: 'Fabrègues', zone: 'z2', lat: 43.547, lon: 3.777, label: 'left' },
  { name: 'Pignan', zone: 'z2', lat: 43.585, lon: 3.757, label: 'left' },
  { name: 'Mauguio', zone: 'z2', lat: 43.617, lon: 4.009, label: 'right' },
  { name: 'Palavas-les-Flots', zone: 'z2', lat: 43.529, lon: 3.928, label: 'bottom' },
  { name: 'Carnon', zone: 'z2', lat: 43.545, lon: 4.0, label: 'right' },
  { name: 'La Grande-Motte', zone: 'z2', lat: 43.565, lon: 4.083, label: 'bottom' },
  // Zone 3 : sur demande (celles qui tiennent dans le cadre de la carte)
  { name: 'Lunel', zone: 'z3', lat: 43.675, lon: 4.135, label: 'left' },
  { name: 'Cournonterral', zone: 'z3', lat: 43.56, lon: 3.725, label: 'right' },
  { name: 'Saint-Mathieu-de-Tréviers', zone: 'z3', lat: 43.774, lon: 3.862, label: 'right' },
  { name: 'Pic Saint-Loup', zone: 'z3', lat: 43.775, lon: 3.78, label: 'right' },
]

// Zone 3 hors cadre : indiquées par une flèche sur le bord de la carte.
export const offMap = [
  { name: 'Sète', km: 35, x: 40, y: 640, arrow: '↙' },
  { name: 'Cap d’Agde', km: 60, x: 150, y: 640, arrow: '↙' },
] as const

// Cadre de la carte (degrés) et taille du viewBox (px) : 1 km ≈ 20 px.
export const bounds = { west: 3.68, east: 4.16, north: 43.8, south: 43.5 }
export const view = { width: 770, height: 670 }

export function project(lat: number, lon: number) {
  return {
    x: ((lon - bounds.west) / (bounds.east - bounds.west)) * view.width,
    y: ((bounds.north - lat) / (bounds.north - bounds.south)) * view.height,
  }
}

export const center = project(43.611, 3.877)
export const KM = 20 // pixels par kilomètre

/** Couleur d'affichage de chaque zone (carte, pastilles, bandeaux). */
export const ZONE_COLOR: Record<ZoneId, string> = {
  z1: '#B04A2A',
  z2: '#C9894A',
  z3: '#8A8174',
}
