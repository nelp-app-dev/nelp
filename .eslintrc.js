module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: [
      './packages/server/tsconfig.json',
      './packages/common/tsconfig.json',
      './packages/clients/admin/tsconfig.json',
      './packages/clients/web-sales/tsconfig.json',
    ],
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', '**/dist/**/*'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
