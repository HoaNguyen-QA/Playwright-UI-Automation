import BasePage from "./BasePage";
import { Helper } from "../utils/helper";

export default class CustomizePage extends BasePage {
  constructor(page) {
    super(page);
    this.BUTTON_CUSTOMIZE_NEXT = '//button[contains(text(),"Next")]';
  }
  async clickNextButton() {
    await this.clickElement(this.BUTTON_CUSTOMIZE_NEXT);
    await this.waitLoadingSpinnerInvisibled();
  }
}
