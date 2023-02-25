module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    cypress: true,
    jest: true
  },
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
