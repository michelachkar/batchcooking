import next from 'eslint-config-next'

const config = [
  ...next,
  // Couches de composants : les dépendances vont dans un seul sens (ui ← blocks ← sections ← app).
  {
    files: ['components/ui/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/components/blocks/*',
                '@/components/sections/*',
                '@/components/layout/*',
                '@/components/features/*',
              ],
              message: 'ui/ ne dépend d’aucune autre couche de composants.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['components/blocks/**/*.{ts,tsx}', 'components/layout/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/components/sections/*'],
              message: 'Les blocs et le layout ne dépendent pas des sections de page.',
            },
          ],
        },
      ],
    },
  },
  {
    ignores: [
      '.next/**',
      '.next-*/**',
      '.open-next/**',
      '.wrangler/**',
      'playwright-report/**',
      'test-results/**',
    ],
  },
]

export default config
