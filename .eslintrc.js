const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

const styleGuide = [
  '@vercel/style-guide/eslint/node',
  '@vercel/style-guide/eslint/browser',
  '@vercel/style-guide/eslint/typescript',
  '@vercel/style-guide/eslint/react',
].map(require.resolve)

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [...styleGuide, 'plugin:@next/next/recommended'],
  globals: {
    JSX: true,
    React: true,
  },
  ignorePatterns: ['node_modules/', 'dist/', 'build/'],
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-misused-promises': 'off',
      },
    },
  ],
  parserOptions: {
    project,
  },
  plugins: [
    'sort-keys-fix',
    'sort-destructure-keys',
    'simple-import-sort',
    'typescript-sort-keys',
  ],
  rules: {
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'generic',
      },
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    'import/no-default-export': 'off',
    'import/no-extraneous-dependencies': 'error',
    'import/order': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-nested-ternary': 'off',
    'react/jsx-sort-props': 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sort-destructure-keys/sort-destructure-keys': 'error',
    'sort-keys-fix/sort-keys-fix': 'error',
    'typescript-sort-keys/interface': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
}
