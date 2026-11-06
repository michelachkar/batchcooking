import { defineCloudflareConfig } from '@opennextjs/cloudflare'
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache'

// Site entièrement statique : les pages prérendues sont servies depuis les assets Cloudflare (pas de R2 ni de KV).
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
})
