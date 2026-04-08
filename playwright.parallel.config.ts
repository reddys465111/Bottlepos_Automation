import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config({ debug: false });

/**
 * Configuration for parallel test execution
 * This config is optimized for running tests that can be parallelized
 */
export default defineConfig({
  testDir: './tests',
  /* Output directory for test artifacts (traces, screenshots, etc.) */
  outputDir: './test-results/artifacts',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Test timeout (includes beforeEach/beforeAll); default 30s was too short for Init. */
  timeout: 75 * 1000,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Stop test execution after 20% of smoke tests fail (15 out of 73) */
  maxFailures: 15,
  /* Use more workers for parallel execution */
  workers: process.env.CI ? 7 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter:[ 
    ['list'],
    ['junit', {outputFile: './test-results/parallel/parallel-report.xml', embedAnnotationsAsProperties: true}],
    ['html', {outputFolder: './reports/parallel-html', open: 'never'}]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  expect: {
    timeout: 60 * 1000,
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});