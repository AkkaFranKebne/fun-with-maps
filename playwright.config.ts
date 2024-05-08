import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';


// See https://playwright.dev/docs/test-configuration.
const config: PlaywrightTestConfig = {
  testMatch: /.*.spec.ts/,
  // Maximum time one test can run for.   
  timeout: process.env.NODE_ENV === 'production' ? 40000 : 220000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: process.env.NODE_ENV === 'production' ? 40000 : 220000,
  }, 
  fullyParallel: true, // Run tests in files in parallel
  forbidOnly: !!process.env.CI, // Fail the build on CI if you accidentally left test.only in the source code.
  retries: process.env.CI ? 2 : 0, // Retry on CI only
  workers: process.env.CI ? 1 : undefined, // Opt out of parallel tests on CI.
  reporter: 'html', // See https://playwright.dev/docs/test-reporters
  use: {
    headless: true, // If set to false, you are gonna see a browser open when testing
    actionTimeout: 0, // Maximum time actions such as `click()` can take. Defaults to 0 (no limit). 
    // Base URL to use in actions like `await page.goto('/')`. 
    baseURL: process.env.VITE_CLIENT_URL,
    // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer 
    trace: 'on-first-retry',
    launchOptions: {
      slowMo: process.env.NODE_ENV === 'production' ? 0 : 50
    },
    storageState: 'storageState.json' // Load signed-in state from 'storageState.json' for all tests.
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari']
      }
    },

    // Test against mobile viewports. 
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12']
      }
    }
  ]
  // Folder for test artifacts such as screenshots, videos, traces, etc. 
  // outputDir: 'test-results/',
};

if (process.env.NODE_ENV !== 'production') {
  // Run your local dev server before starting the tests 
  config.webServer = {
    command: 'npm run dev',
    port: 5173
  };
  config.projects = [
    ...(config.projects || []),
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox']
      }
    },
    // Test against mobile viewports. 
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5']
      }
    },
    {
      name: 'Google Chrome',
      use: {
        channel: 'chrome'
      }
    }
  ];
}

export default config;