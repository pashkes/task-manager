// @ts-check
const eslint = require('@eslint/js')
const tseslint = require('@typescript-eslint/eslint-plugin')
const tsParser = require('@typescript-eslint/parser')
const importPlugin = require('eslint-plugin-import')
const simpleImportSort = require('eslint-plugin-simple-import-sort')
const { node: nodeGlobals } = require('globals')

// Nx plugin omitted: nx.configs['flat/base'] and plugins['@nx'] contain circular refs and break Nx lint executor.
module.exports = [
  eslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx,mjs}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
      globals: {
        ...nodeGlobals,
        RequestInit: 'readonly',
        Request: 'readonly',
        Response: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'import/no-relative-parent-imports': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
    settings: {
      'import/resolver': {
        node: {},
      },
    },
  },
  {
    files: ['tools/scripts/**/*.mjs'],
    rules: {
      'import/no-relative-parent-imports': 'off',
    },
  },
  {
    ignores: [
      '**/dist/**',
      '**/.next/**',
      '**/node_modules/**',
      '**/coverage/**',
    ],
  },
]
