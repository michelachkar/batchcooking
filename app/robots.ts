import type { MetadataRoute } from 'next'
import { absoluteUrl, isProduction } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  // Hors production (dev, test, local) : tout est interdit aux robots, et le sitemap n'est pas annoncé.
  if (!isProduction) return { rules: { userAgent: '*', disallow: '/' } }
  return { rules: { userAgent: '*', allow: '/' }, sitemap: absoluteUrl('/sitemap.xml') }
}
