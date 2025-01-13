import BasePage from "./BasePage";
import { Helper } from "../utils/helper";

export default class SeatSelectionPage extends BasePage {
  constructor(page) {
    super(page);
    this.BUTTON_SEAT_SELECTION_NEXT = '//app-seats-selection//button[contains(text(),"Next")]';
    this.BUTTON_COMPLETE_SELECTION = '//app-seats-selection//button[contains(text(),"Complete selection")]';
  }
  async clickNextButton() {
    await this.page.click(this.BUTTON_SEAT_SELECTION_NEXT);
    await this.waitLoadingSpinnerInvisibled();
  }

  async clickCompleteSelectionButton() {
    await this.page.click(this.BUTTON_COMPLETE_SELECTION);
    await this.waitLoadingSpinnerInvisibled();
  }
}
