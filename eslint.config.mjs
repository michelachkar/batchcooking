import next from 'eslint-config-next'

const config = [
  ...next,
  {
    ignores: [
      '.next/**',
      '.open-next/**',
      '.wrangler/**',
      'playwright-report/**',
      'test-results/**',
    ],
  },
]

export default config
