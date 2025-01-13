import BasePage from "./BasePage";
import { Helper } from "../utils/helper";

export default class SelectFlightPage extends BasePage {
  constructor(page) {
    super(page);
    this.OPTION_FARE = '//app-journey-fare-option-summary[contains(@class,"fare-type-{0}")]/button';
    this.TEXT_ADULT_FARE =
      '//app-journey-fare-option-ptc-fare-summary[contains(@class,"fare-type-{0}")]//span[contains(text(), "Adult Fare")]//parent::div//following-sibling::div[contains(text(),"$")]';
    this.TEXT_CHILD_FARE =
      '//app-journey-fare-option-ptc-fare-summary[contains(@class,"fare-type-{0}")]//span[contains(text(), "Child Fare")]//parent::div//following-sibling::div[contains(text(),"$")]';
    this.TEXT_INFANT_FARE =
      '//app-journey-fare-option-ptc-fare-summary[contains(@class,"fare-type-{0}")]//span[contains(text(), "Infant Fare")]//parent::div//following-sibling::div[contains(text(),"$")]';
    this.BUTTON_CONTINUE = '//button[contains(text(), "Continue")]';
  }

  async clickSelectFareOption(fareType) {
    await this.clickElement(Helper.formatString(this.OPTION_FARE, fareType.toLowerCase()));
    await this.waitLoadingSpinnerInvisibled();
  }

  async getAdultFare(fareType) {
    return await this.getText(Helper.formatString(this.TEXT_ADULT_FARE, fareType.toLowerCase()));
  }

  async getChildFare(fareType) {
    return await this.getText(Helper.formatString(this.TEXT_CHILD_FARE, fareType.toLowerCase()));
  }

  async getInfantFare(fareType) {
    return await this.getText(Helper.formatString(this.TEXT_CHILD_FARE, fareType.toLowerCase()));
  }

  async clickContinueButton() {
    await this.clickElement(this.BUTTON_CONTINUE);
    await this.waitLoadingSpinnerInvisibled();
  }
}
