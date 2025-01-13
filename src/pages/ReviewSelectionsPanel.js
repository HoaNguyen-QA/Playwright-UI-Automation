import BasePage from "./BasePage";
import { Helper } from "../utils/helper";

export default class ReviewSelectionsPanel extends BasePage {
  constructor(page) {
    super(page);
    this.TEXT_TITLE = '//app-reservation-charges-breakdown//div[text() = "Review your selections"]';
    this.TEXT_FLIGHT_DATE = '//app-reservation-charges-breakdown//span[contains(@class,"flight-date")]';
    this.TEXT_CITY_PAIR = '//app-reservation-charges-breakdown//div[contains(@class,"city-pair")]';
    this.TEXT_TOTAL_FLIGHT_COST =
      '//app-reservation-booking-cost-summary[@class ="ng-star-inserted"]//div[contains(@class,"total--amount")]';
    this.TEXT_DEPARTURE_ARRIVAL_TIME =
      '//app-reservation-charges-breakdown//div[contains(@class,"city-pair")]//following-sibling::div/span[1]';
  }
  async isTitleDisplayed() {
    return await this.isElementVisibled(this.TEXT_TITLE);
  }

  async getFlightDate() {
    return await this.getText(this.TEXT_FLIGHT_DATE);
  }

  async getCityPair() {
    return await this.getText(this.TEXT_CITY_PAIR);
  }

  async getDepartureArrivalTime(){
    return await this.getText(this.TEXT_CITY_PAIR);
  }

  async getTotalFlightCost() {
    return await this.getText(this.TEXT_TOTAL_FLIGHT_COST);
  }
}
