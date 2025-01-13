import BasePage from "../BasePage";
import { Helper } from "../../utils/helper";

export default class HeaderComponent extends BasePage {
  constructor(page) {
    super(page);
    this.LANGUAGE_PICKER = '//a[@id = "language-picker"]';
    this.LANGUAGE_OPTION = '//div[@aria-labelledby="language-picker"]//div[text() = "{0}"]';
    this.TEXT_ORIGIN = '//app-site-header-flight-summary//span[@title= "Origin"]/span';
    this.TEXT_DESTINATION = '//app-site-header-flight-summary//span[@title= "Destination"]/span';
    this.TEXT_DEPARTURE_DATE = '//app-site-header-flight-summary//span[@title= "Departure Date From"]';
    this.TEXT_RETURN_DATE = '//app-site-header-flight-summary//span[@title= "Return Date"]/span';
    this.TEXT_SUMMARY = '//app-site-header-flight-summary';
    this.BUTTON_YOUR_CART = '(//app-common-cart//button[@id="cart-details-dropdown"])[1]';
    this.TEXT_TOTAL_AMOUNT = '(//app-common-cart//button[@id="cart-details-dropdown"])[1]//span';
    //Flight Summary
    this.TEXT_CITY_PAIR = '//app-shopping-cart-summary-mobile//app-reservation-flight-charges-breakdown//div[contains(@class,"city-pair")]';
    this.TEXT_FLIGHT_TIME = '//following-sibling::div/span[1]';
    this.TEXT_FARE_TYPE = '//app-shopping-cart-summary-mobile//app-reservation-flight-charges-breakdown//div[contains(@class,"cart-fare")]//span';
    //Booking Cost Summary
    this.TEXT_TOTAL_FLIGHT_COST = '//app-shopping-cart-summary-mobile//app-reservation-booking-cost-summary//div[text() ="Total Flight Cost"]//following-sibling::div';

  }

  async selectLanguage(language){
    await this.clickElement(this.LANGUAGE_PICKER);
    await this.clickElement(Helper.formatString(this.LANGUAGE_OPTION, language));
  }

  async getSummary(){
    return await this.getText(this.TEXT_SUMMARY);
  }
}
