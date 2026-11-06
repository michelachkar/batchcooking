import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })

const config: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR ?? '.next',
  turbopack: { root: import.meta.dirname },
  reactCompiler: true,
  images: { formats: ['image/avif'] },
  poweredByHeader: false,
}

export default withBundleAnalyzer(config)
