import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'h2a4cf',
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents (on, config) {
      // implement node event listeners here
    }
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite'
    }
  }
})
