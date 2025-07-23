import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000', // Убедитесь, что порт совпадает с вашим приложением
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});