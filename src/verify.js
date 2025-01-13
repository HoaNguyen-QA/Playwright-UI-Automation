import logger from './utils/logger';
class Verify {
    constructor() {
      this.failures = [];
    }
  
    /**
   * @param {any} actual
   * @param {string} expected
   * @param {string} message
   * @param {{ screenshot: (arg0: { path: string; }) => any; }} page
   */
    async assertEquals(actual, expected, message, page) {
      if (actual !== expected) {
        const screenshotPath = `screenshots/${Date.now()}_failed.png`;
        await page.screenshot({ path: screenshotPath });
        this.failures.push({ actual, expected, message, screenshotPath });
      }
    }

    async assertContains(actual, expected, message, page) {
      if (!actual.includes(expected)) {
        const screenshotPath = `screenshots/${Date.now()}_failed.png`;
        await page.screenshot({ path: screenshotPath });
        this.failures.push({ actual, expected, message, screenshotPath });
      }
    }

    /**
   * @param {any} result
   * @param {string} message
   * @param {{ screenshot: (arg0: { path: string; }) => any; }} page
   */
    async assertTrue(result, message, page) {
        if (!result) {
          const screenshotPath = `screenshots/${Date.now()}_failed.png`;
          await page.screenshot({ path: screenshotPath });
          this.failures.push({result, message, screenshotPath });
        }
      }
  
    async finalize() {
      if (this.failures.length > 0) {
        logger.error(`Verification failed: ${this.failures.map(f => f.message).join('; ')}`);
        throw new Error(`Verification failed: ${this.failures.map(f => f.message).join('; ')}`);
      }
    }
  }
  
  export default new Verify();
  