import next from 'eslint-config-next'

const config = [
  ...next,
  {
    ignores: [
      'wp-reference/**',
      'reference/**',
      '.next/**',
      '.next-vr/**',
      'playwright-report/**',
      'test-results/**',
      'tests/visual/__output__/**',
    ],
  },
]

export default config
