import clsx from 'clsx'
import styles from './icon.module.css'

// Icônes de contour (jeu Tabler, trait 1,6 px, grille 24); une icône = un chemin.
const paths = {
  'calendar-event': (
    <>
      <path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm12-4v4M8 3v4m-4 4h16" />
      <path d="M8 15h2v2H8z" />
    </>
  ),
  users: (
    <path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0-8 0M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2m1-17.87a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.85" />
  ),
  'map-pin': (
    <>
      <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0-6 0" />
      <path d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0" />
    </>
  ),
  'chef-hat': (
    <path d="M12 3c1.918 0 3.52 1.35 3.91 3.151A4 4 0 0 1 18 13.874V21H6v-7.126a4 4 0 1 1 2.092-7.723A4 4 0 0 1 12 3M6.161 17.009L18 17" />
  ),
  'tools-kitchen-2': (
    <path d="M19 3v12h-5c-.023-3.681.184-7.406 5-12m0 12v6h-1v-3M8 4v17M5 4v3a3 3 0 1 0 6 0V4" />
  ),
  cake: (
    <>
      <path d="M3 20h18v-8a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3z" />
      <path d="M3 14.803A2.4 2.4 0 0 0 4 15a2.4 2.4 0 0 0 2-1a2.4 2.4 0 0 1 2-1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2-1a2.4 2.4 0 0 1 2-1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1c.35.007.692-.062 1-.197M12 4l1.465 1.638a2 2 0 1 1-3.015.099z" />
    </>
  ),
  'building-cottage': (
    <>
      <path d="M3 21h18M4 21V10l2.5-4.5L12 3l5.5 2.5L20 10v11" />
      <path d="M10 9a2 2 0 1 0 4 0a2 2 0 1 0-4 0M9 21v-5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 21c.5-4.5 2.5-8 7-10" />
      <path d="M9 18c6.218 0 10.5-3.288 11-12V4h-4.014c-9 0-11.986 4-12 9c0 1 0 3 2 5z" />
    </>
  ),
  award: (
    <>
      <path d="M6 9a6 6 0 1 0 12 0A6 6 0 1 0 6 9" />
      <path d="m12 15l3.4 5.89l1.598-3.233l3.598.232l-3.4-5.889M6.802 12l-3.4 5.89L7 17.657l1.598 3.232l3.4-5.889" />
    </>
  ),
  quote: (
    <path d="M10 11H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6q0 4-4 5m13-7h-4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6q0 4-4 5" />
  ),
  clock: (
    <>
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0" />
      <path d="M12 7v5l3 3" />
    </>
  ),
  lotus: (
    <>
      <path d="M2 9a10 10 0 1 0 20 0" />
      <path d="M12 19A10 10 0 0 1 22 9M2 9a10 10 0 0 1 10 10" />
      <path d="M12 4a9.7 9.7 0 0 1 2.99 7.5m-5.98 0A9.7 9.7 0 0 1 12 4" />
    </>
  ),
  fish: (
    <>
      <path d="M16.69 7.44A6.97 6.97 0 0 0 15 12a6.97 6.97 0 0 0 1.699 4.571" />
      <path d="M2 9.504c7.715 8.647 14.75 10.265 20 2.498C16.75 4.241 9.715 5.86 2 14.506M18 11v.01" />
      <path d="M11.5 10.5q-1 1.5 0 3" />
    </>
  ),
  'glass-cocktail': (
    <>
      <path d="M9 21h6m-3-5v5M8 5a4 2 0 1 0 8 0a4 2 0 1 0-8 0" />
      <path d="M8 5c0 6.075 1.79 11 4 11s4-4.925 4-11" />
    </>
  ),
  basket: (
    <>
      <path d="M10 14a2 2 0 1 0 4 0a2 2 0 0 0-4 0" />
      <path d="M5.001 8H19a2 2 0 0 1 1.977 2.304l-1.255 7.152A3 3 0 0 1 16.756 20H7.244a3 3 0 0 1-2.965-2.544l-1.255-7.152A2 2 0 0 1 5.001 8M17 10l-2-6m-8 6l2-6" />
    </>
  ),
  heart: <path d="M19.5 12.572L12 20l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572" />,
  soup: (
    <path d="M4 8h16a1 1 0 0 1 1 1v.5c0 1.5-2.517 5.573-4 6.5v1a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-1c-1.687-1.054-4-5-4-6.5V9a1 1 0 0 1 1-1" />
  ),
  confetti: (
    <path d="M4 5h2M5 4v2m6.5-2L11 6m7-1h2m-1-1v2m-4 3l-1 1m4 3l2-.5M18 19h2m-1-1v2m-5-3.482L7.482 10l-4.39 9.58a1 1 0 0 0 1.329 1.329z" />
  ),
  instagram: (
    <>
      <path d="M3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" />
      <path d="M8.5 12a3.5 3.5 0 1 0 7 0a3.5 3.5 0 0 0-7 0M17 7v.01" />
    </>
  ),
  'message-circle': (
    <path d="m3 20l1.3-3.9C1.976 12.663 2.874 8.228 6.4 5.726c3.526-2.501 8.59-2.296 11.845.48c3.255 2.777 3.695 7.266 1.029 10.501S11.659 20.922 7.7 19z" />
  ),
  notebook: (
    <path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1m3 0v18m4-14h2m-2 4h2" />
  ),
  'shopping-cart': (
    <>
      <path d="M4 19a2 2 0 1 0 4 0a2 2 0 1 0-4 0m11 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
      <path d="M17 17H6V3H4" />
      <path d="m6 5l14 1l-1 7H6" />
    </>
  ),
  flame: (
    <path d="M12 10.941c2.333-3.308.167-7.823-1-8.941c0 3.395-2.235 5.299-3.667 6.706C5.903 10.114 5 12 5 14.294C5 17.998 8.134 21 12 21s7-3.002 7-6.706c0-1.712-1.232-4.403-2.333-5.588c-2.084 3.353-3.257 3.353-4.667 2.235" />
  ),
  sparkles: (
    <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2-2a2 2 0 0 1-2-2a2 2 0 0 1-2 2m0-12a2 2 0 0 1 2 2a2 2 0 0 1 2-2a2 2 0 0 1-2-2a2 2 0 0 1-2 2M9 18a6 6 0 0 1 6-6a6 6 0 0 1-6-6a6 6 0 0 1-6 6a6 6 0 0 1 6 6" />
  ),
  fridge: (
    <path d="M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2zm0 5h14M9 13v3M9 6v1" />
  ),
  'shield-check': (
    <path d="M11.46 20.846A12 12 0 0 1 3.5 6A12 12 0 0 0 12 3a12 12 0 0 0 8.5 3a12 12 0 0 1-.09 7.06M15 19l2 2l4-4" />
  ),
  'user-plus': <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0m8 12h6m-3-3v6M6 21v-2a4 4 0 0 1 4-4h4" />,
  bottle: (
    <>
      <path d="M10 5h4V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1z" />
      <path d="M14 3.5c0 1.626.507 3.212 1.45 4.537l.05.07a8.1 8.1 0 0 1 1.5 4.694V19a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-6.2c0-1.682.524-3.322 1.5-4.693l.05-.07A7.82 7.82 0 0 0 10 3.5" />
      <path d="M7 14.803A2.4 2.4 0 0 0 8 14a2.4 2.4 0 0 1 2-1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2-1a2.4 2.4 0 0 1 1-.805" />
    </>
  ),
  'glass-wine': (
    <>
      <path d="M8 21h8m-4-6v6m5-18l1 7c0 3.012-2.686 5-6 5s-6-1.988-6-5l1-7z" />
      <path d="M6 10a5 5 0 0 1 6 0a5 5 0 0 0 6 0" />
    </>
  ),
  stove: (
    <path d="M12 7h.01M15 7h.01M9 7h.01M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2zm4 10h6M5 11h14" />
  ),
  bell: <path d="M3 17h18a9 9 0 0 0-18 0M12 8V6m-1-1h2M5 17v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1" />,
  briefcase: (
    <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm5-2V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-6 6h4M3 13h18" />
  ),
  utensils: (
    <path d="M19 3v12h-5c-.023-3.681.184-7.406 5-12m0 12v6h-1v-3M8 4v17M5 4v3a3 3 0 1 0 6 0V4" />
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  ),
  'clipboard-check': (
    <>
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2m0 9l2 2l4-4" />
    </>
  ),
} as const

export type IconName = keyof typeof paths

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      className={clsx(styles.icon, className)}
    >
      {paths[name]}
    </svg>
  )
}

/** Flèche des boutons (trait 2 px). */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      className={clsx(styles.arrow, className)}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}
