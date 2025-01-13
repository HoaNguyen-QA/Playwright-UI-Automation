import BasePage from "./BasePage";
import { Helper } from "../utils/helper";

export default class FlightSearchPage extends BasePage {
  constructor(page) {
    super(page);
    this.PROGRESS_BAR_STEP = '//app-progress-bar//div[contains(@class,"step pointer")][{0}]';
    this.STEP_LABEL =
      '//app-progress-bar//div[contains(@class,"step pointer")][{0}]//div[@class = "step--label" and text() = "{1}"]';
    this.STEP_INDEX =
      '//app-progress-bar//div[contains(@class,"step pointer")][{0}]//div[contains(@class,"step--index")]';
    this.PAGE_HEADER = '//main//div[@class = "h2" and text() = "Where are you flying?"]';
    this.TEXTBOX_ORIGIN =
      '//app-flight-search//input[contains(@id,"airport_picker") and @placeholder = "Choose Origin"]';
    this.TEXTBOX_DESTINATION =
      '//app-flight-search//input[contains(@id,"airport_picker") and @placeholder = "Choose Destination"]';
    this.OPTION_AIRPORT = '//li//div[@class = "airport-info__airport-name"]/b[text() = "{0}"]';
    this.TEXTBOX_DEPARTURE_DATE = '//input[@id = "dateRange"]';
    this.TEXTBOX_RETURN_DATE = '//input[@id = "dateRangeEnd"]';
    this.ICON_SELECT_MONTH_LEFT = '(//div[contains(@class,"calendar")])[2]//div[contains(@class,"left")]';
    this.ICON_SELECT_MONTH_RIGHT = '(//div[contains(@class,"calendar")])[2]//div[contains(@class,"right")]';
    this.BUTTON_TRIP_TYPE = '//app-trip-type-picker/div//label[contains(text(),"{0}")]';
    this.TEXTBOX_CURRENCY = '//input[contains(@id,"currency_picker")]';
    this.ICON_SELECT_CURRENCY = "//app-currency-picker//fa-icon";
    this.OPTION_CURRENCY = '//app-currency-picker//button[contains(text(),"{0}")]';
    this.TEXTBOX_PROMOCODE = '//input[@name="promoCode"]';
    this.BUTTON_FIND_FLIGHTS = '//button[contains(text(),"Find Flights")]';
    this.BUTTON_QUICK_ACTION = '//app-quick-actions//div[@class = "col mb-3"]//span[text() = "{0}"]';
    this.CALENDER_MONTH = '//span[text() = "{0}"]//ancestor::div[contains(@class, "header")]';
    this.CALENDER_DATE =
      '//following-sibling::div[contains(@class, "body")]//span[@class = "number" and text() = "{1}"]';
    this.TEXTBOX_PAX_TYPE = '//input[@aria-label="{0}"]';
    this.BUTTON_DECREASE = "//preceding-sibling::button";
    this.BUTTON_INCREASE = "//following-sibling::button";
  }
  async searchOneWayFlight(searchInfo) {
    //enter origin airport
    await this.selectOriginAirport(searchInfo.Departure);
    //enter destination airport
    await this.selectDestinationAirport(searchInfo.Arrival);
    //Select One Way trip type
    await this.clickElement(Helper.formatString(this.BUTTON_TRIP_TYPE, searchInfo.TripType));
    //select departure date
    await this.selectDepartureDate(searchInfo.DepartureDate);
    //fill the number of passenger
    await this.enterPassengerCount('Adults', searchInfo.Adults);
    await this.enterPassengerCount('Children', searchInfo.Children);
    await this.enterPassengerCount('Infants', searchInfo.Infants);
    await this.clickElement(this.BUTTON_FIND_FLIGHTS);
  }

  async searchReturnFlight(searchInfo) {
    //enter origin airport
    await this.selectOriginAirport(searchInfo.Departure);
    //enter destination airport
    await this.selectDestinationAirport(searchInfo.Arrival);
    //Select Return trip type
    await this.clickElement(Helper.formatString(this.BUTTON_TRIP_TYPE, searchInfo.TripType));
    //select departure date and return date
    await this.selectDepartureDate(searchInfo.DepartureDate,true);
    await this.selectReturnDate(searchInfo.ReturnDate);
    //fill the number of passenger
    await this.enterPassengerCount('Adults', searchInfo.Adults);
    await this.enterPassengerCount('Children', searchInfo.Children);
    await this.enterPassengerCount('Infants', searchInfo.Infants);
    await this.clickElement(this.BUTTON_FIND_FLIGHTS);
  }

  async getPassengerCount(passengerType) {
    const locator = Helper.formatString(this.TEXTBOX_PAX_TYPE, passengerType);
    return this.getInputValue(locator);
  }

  async enterPassengerCount(passengerType, number) {
    const inputLocator = Helper.formatString(this.TEXTBOX_PAX_TYPE, passengerType);
    const buttonIncrease = Helper.formatString(this.TEXTBOX_PAX_TYPE + this.BUTTON_INCREASE, passengerType);
    while (+(await this.getInputValue(inputLocator)) !== +number) {
      await this.clickElement(buttonIncrease);
    }
  }

  async isProgressBarStepDisplayed(index, title) {
    return await this.isElementVisibled(Helper.formatString(this.STEP_LABEL, index, title));
  }

  async isOriginTextboxDisplayed() {
    return await this.isElementVisibled(this.TEXTBOX_ORIGIN);
  }

  async selectOriginAirport(airport) {
    const airportName = airport.split(" ")[0];
    await this.sendKey(this.TEXTBOX_ORIGIN, airportName);
    await this.clickElement(Helper.formatString(this.OPTION_AIRPORT, airportName));
  }

  async selectDestinationAirport(airport) {
    const airportName = airport.split(" ")[0];
    await this.sendKey(this.TEXTBOX_DESTINATION, airportName);
    await this.clickElement(Helper.formatString(this.OPTION_AIRPORT, airportName));
  }

  async isDestinationTextboxDisplayed() {
    return await this.isElementVisibled(this.TEXTBOX_DESTINATION);
  }

  async isDestinationTextboxEnabled() {
    return await this.isElementEnabled(this.TEXTBOX_DESTINATION);
  }

  async isDepartureDateTextboxDisplayed() {
    return await this.isElementVisibled(this.TEXTBOX_DEPARTURE_DATE);
  }

  async selectDepartureDate(date, isReturnTrip = false) {
    const datePart = date.split(" ");
    const locator = Helper.formatString(this.CALENDER_MONTH + this.CALENDER_DATE, datePart[1], datePart[2].replace(',', ''));
    await this.clickElement(this.TEXTBOX_DEPARTURE_DATE);
    await this.clickElement(locator);
    if(isReturnTrip){
      await this.clickElement(locator);
    }
  }

  async selectReturnDate(date) {
    const datePart = date.split(" ");
    const locator = Helper.formatString(this.CALENDER_MONTH + this.CALENDER_DATE, datePart[1], datePart[2].replace(',', ''));
    await this.clickElement(this.TEXTBOX_RETURN_DATE);
    await this.clickElement(locator);
  }

  async selectCurrency(currency) {
    await this.clickElement(this.ICON_SELECT_CURRENCY);
    await this.clickElement(Helper.formatString(this.OPTION_CURRENCY, currency));
  }

  async isReturnDateTextboxDisplayed() {
    return await this.isElementVisibled(this.TEXTBOX_RETURN_DATE);
  }

  async isTripTypeDisplayed(tripType) {
    return await this.isElementVisibled(Helper.formatString(this.BUTTON_TRIP_TYPE, tripType));
  }

  async selectTripType(tripType) {
    await this.clickElement(Helper.formatString(this.BUTTON_TRIP_TYPE, tripType));
  }

  async clickFindFlightsButton() {
    await this.clickElement(this.BUTTON_FIND_FLIGHTS);
    await this.waitLoadingSpinnerInvisibled();
  }
}
