import Script from 'next/script'

// Mesure d'audience légère (Plausible), chargée après tout le reste ; absente tant que le domaine n'est pas configuré.
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  if (!domain) return null
  return (
    <Script
      defer
      strategy="lazyOnload"
      data-domain={domain}
      src={process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ?? 'https://plausible.io/js/script.js'}
    />
  )
}
