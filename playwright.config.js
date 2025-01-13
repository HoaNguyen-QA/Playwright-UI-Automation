import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  workers: 1,
  timeout: 90000, // Timeout per test
  retries: 0, // Number of retries for failed tests
  use: {
    headless: false, // Run in headless mode
    //baseURL: 'https://intelisys-soar.intelisysmaint.ca/',
    screenshot: "on", // Capture screenshots only on test failure
    video: "retain-on-failure", // Record video on failure
  },
  reporter: [
    ["dot"], // Simple console reporter
    ["allure-playwright"], // Allure reporter integration
  ],
  projects: [
    /* Test against desktop browsers */
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    /*{
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },*/
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    // /* Test against mobile viewports. */
    // {
    //   name: "Mobile Chrome",
    //   use: {
    //     ...devices["Pixel 5"]
    //   }
    // },
    // {
    //   name: "Mobile Safari",
    //   use: {
    //     ...devices["iPhone 13"]
    //   }
    // },
  ],
});
