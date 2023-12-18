import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Rest of your config...

  // Run your local dev server before starting the tests
  webServer: {
    command: 'npm run test',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://127.0.0.1:3000',
  },
});