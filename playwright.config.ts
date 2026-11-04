import { defineConfig } from '@playwright/test'

const PORT = 3100

export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  reporter: [['list']],
  fullyParallel: false,
  use: { baseURL: `http://localhost:${PORT}`, reducedMotion: 'reduce', deviceScaleFactor: 1 },
  webServer: {
    command: `node tests/visual/prepare-fixtures.mjs && NEXT_PUBLIC_VR=1 NEXT_DIST_DIR=.next-vr npx next build && NEXT_PUBLIC_VR=1 NEXT_DIST_DIR=.next-vr npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    timeout: 240_000,
  },
})
