module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
    'cypress/globals': true
  },
  ignorePatterns: ['node_modules', 'dist', 'coverage', 'cypress'],
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:cypress/recommended'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    'cypress'
  ],
  rules: {
    'react/prop-types': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
