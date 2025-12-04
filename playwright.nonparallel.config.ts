import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config({ debug: false });

/**
 * Configuration for non-parallel test execution
 * This config is optimized for running tests that cannot be parallelized
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests sequentially */
  fullyParallel: false,
  /* Use single worker for sequential execution */
  workers: 1,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter:[ 
    ['list'],
    ['junit', {outputFile: './test-results/nonparallel-report.xml', embedAnnotationsAsProperties: true}],
    ['html', {outputFolder: './reports/nonparallel-html', open: 'never'}]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  expect: {
    timeout: 30 * 1000,
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
