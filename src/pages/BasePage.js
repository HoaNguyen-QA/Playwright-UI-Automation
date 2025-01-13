import logger from "../utils/logger.js";

export default class BasePage {
  constructor(page) {
    this.page = page;
  }
  async clickElement(selector) {
    try {
      await this.page.waitForSelector(selector, {
        state: "visible",
      });
      const isEnabled = await this.page.$eval(selector, (el) => !el.disabled);
      const element = this.page.locator(selector);
      if (isEnabled) {
        await element.click();
        logger.info(`Clicked on element with selector: ${selector}`);
      } else {
        console.error("Element is disabled.");
        logger.error(`Failed to click on element with selector: ${selector}`);
      }
    } catch (error) {
      logger.error(
        `Failed to click on element with selector: ${selector} - ${error.message}`
      );
      throw error;
    }
  }

  async checkTheCheckbox(selector) {
    try {
      const checkbox = this.page.locator(selector);
      await checkbox.waitFor({ state: "visible" });
      // If the checkbox isn't checked, trigger a click
      if (!(await checkbox.isChecked())) {
        await checkbox.check({ force: true });
      }
      logger.info(`Check on the checkbox with selector: ${selector}`);
    } catch (error) {
      logger.error(
        `Failed to check on the checkbox with selector: ${selector} - ${error.message}`
      );
      throw error;
    }
  }

  async selectRadioButton(selector) {
    try {
      const radioButton = this.page.locator(selector);
      await radioButton.waitFor({ state: "visible" });
      // If the radio button isn't already checked, trigger a click
      if (!(await radioButton.isChecked())) {
        await radioButton.click({ force: true });
      }
      logger.info(`Selected the radio button with selector: ${selector}`);
    } catch (error) {
      logger.error(
        `Failed to select the radio button with selector: ${selector} - ${error.message}`
      );
      throw error;
    }
  }

  async uncheckTheCheckbox(selector) {
    try {
      await this.page.waitForSelector(selector, { state: "visible" });
      await this.page.locator(selector).uncheck();
      logger.info(`Check on the checkbox with selector: ${selector}`);
      return await this.page.locator(selector).isChecked;
    } catch (error) {
      logger.error(
        `Failed to check on the checkbox with selector: ${selector} - ${error.message}`
      );
      throw error;
    }
  }

  async sendKey(selector, text) {
    try {
      await this.page.waitForSelector(selector, { state: "visible" });
      const element = this.page.locator(selector);
      await this.page.waitForTimeout(200);
      await element.fill(text);
      logger.info(
        `Filled element with selector: ${selector} with text: "${text}"`
      );
    } catch (error) {
      logger.error(
        `Failed to fill element with selector: ${selector} - ${error.message}`
      );
      throw error;
    }
  }

  async getText(selector) {
    try {
      await this.page.waitForSelector(selector, { state: "visible" });
      const text = await this.page.locator(selector).innerText();
      logger.info(
        `Retrieved text from element with selector: ${selector} - Text: "${text}"`
      );
      return text.trim();
    } catch (error) {
      logger.error(
        `Failed to retrieve text from element with selector: ${selector} - ${error.message}`
      );
      throw error;
    }
  }

  async getInputValue(selector) {
    try {
      await this.page.waitForSelector(selector, { state: "visible" });
      const text = await this.page.locator(selector).inputValue();
      logger.info(
        `Retrieved text from element with selector: ${selector} - Text: "${text}"`
      );
      return text;
    } catch (error) {
      logger.error(
        `Failed to retrieve text from element with selector: ${selector} - ${error.message}`
      );
      throw error;
    }
  }

  async getAttributeInElement(selector, attrName) {
    try {
      const value = await this.page.locator(selector).getAttribute(attrName);
      logger.info(
        `Retrieved attribute ${attrName} form element with selector: ${selector} - text: "${value}"`
      );
      return value;
    } catch (error) {
      logger.error(
        `Failed to retrieve attribute from element with selector: ${selector} - ${error.message}`
      );
      throw error;
    }
  }

  async getAllTextForListElements(selector) {
    try {
      const texts = await this.page.locator(selector).allTextContents();
      logger.info(
        `Retrieved all texts from elements with selector: ${selector}`
      );
      return texts;
    } catch (error) {
      logger.error(
        `Failed to retrieve from elements with selector: ${selector}`
      );
      throw error;
    }
  }

  async getListElements(selector) {
    try {
      const elements = await this.page.locator(selector);
      logger.info(
        `Retrieved all elements with selector: ${selector}`
      );
      return elements;
    } catch (error) {
      logger.error(
        `Failed to retrieve all elements with selector: ${selector}`
      );
      throw error;
    }
  }

  async isElementVisibled(selector) {
    try {
      await this.page.waitForSelector(selector, { state: "visible" });
      const isVisible = await this.page.locator(selector).isVisible();
      logger.info(`The element is visible: ${selector}"`);
      return isVisible;
    } catch (error) {
      logger.error(
        `The element is not visible: ${selector} - ${error.message}`
      );
      throw error;
    }
  }

  async isElementEnabled(selector) {
    try {
      await this.page.waitForSelector(selector, { state: "visible" });
      const isEnabled = await this.page.locator(selector).isEnabled();
      logger.info(`The element is Enabled: ${selector}"`);
      return isEnabled;
    } catch (error) {
      logger.error(
        `The element is not Enabled: ${selector} - ${error.message}`
      );
      throw error;
    }
  }

  async selectOption(selector, option) {
    try {
      await this.page.waitForSelector(selector, { state: "visible" });
      await this.page.selectOption(selector, option);
      logger.info(`Select option with optionText is: ${option}`);
    } catch (error) {
      logger.error(`Can not select the option: ${option} - ${error.message}`);
      throw error;
    }
  }

  async selectOptionByValue(selector, optionValue) {
    try {
      await this.page.waitForSelector(selector, { state: "visible" });
      const selectElement = this.page.locator(selector);
      await selectElement.selectOption({ value: optionValue });
      logger.info(`Select option with optionText is: ${optionValue}`);
    } catch (error) {
      logger.error(
        `Can not select the option: ${optionValue} - ${error.message}`
      );
      throw error;
    }
  }

  async scrollToElement(selector) {
    try {
      await this.page.waitForSelector(selector, { state: "visible" });
      const element = this.page.locator(selector);
      await element.scrollIntoViewIfNeeded();
      logger.info(`Scroll to element with selector: ${selector}`);
    } catch (error) {
      logger.error(
        `Failed Scroll to element with selector: ${selector} - ${error.message}`
      );
      throw error;
    }
  }

  async waitLoadingSpinnerInvisibled() {
    const selector = '(//div[@class = "loadingSpinner"])[1]';
    try {
      await this.page.waitForSelector(selector, {
        state: "hidden",
        timeout: 30000,
      });
      logger.info(`Wait For Element Invisibled: ${selector}`);
    } catch (error) {
      logger.error(
        `Failed Wait For Element Invisibled: ${selector} - ${error.message}`
      );
      throw error;
    }
  }

  // Additional reusable actions like waitForElement, checkVisibility, etc.
}
