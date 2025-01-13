import BasePage from "./BasePage";
import { Helper } from "../utils/helper";

export default class ReviewAndPayPage extends BasePage {
  constructor(page) {
    super(page);
    this.TEXT_HEADER = '//div[@class = "h2" and text() = "Review your Itinerary"]';
    this.TEXT_FLIGHT_DATE = '//app-journey-origin-destination-with-details//div[contains(@class,"flight-date")]'
    this.TEXT_DEPARTURE_AIRPORT = '//app-journey-origin-destination-with-details//div[contains(@class,"departure")]/div';
    this.TEXT_ARRIVAL_AIRPORT = '//app-journey-origin-destination-with-details//div[contains(@class,"arrival")]/div';
    this.TEXT_FLIGHT_NUMBER = '//app-journey-origin-destination-with-details//div[contains(@class,"flight-number")]';
    this.TEXT_JOURNEY_TOTAL = '//div[contains(@class,"charges-journey-total")]//div[contains(text(),"$")]';
    this.RADIO_CREDIT_CART = '//form//input[@name = "paymentMethodType"]';
    this.RADIO_PAYMENT_STRIPE = '//form//input[@name="paymentMethod"]';
    this.RADIO_VISA_PAYMENT_METHOD = '//input[@id= "VI"]';
    this.TEXTBOX_CARD_NUMBER = '//input[@id= "number"]';
    this.TEXTBOX_CARD_HOLDER = '//input[@id= "cardHolder"]';
    this.TEXTBOX_EXPIRATION_MONTH = '//input[@inputid= "expiryMonth"]';
    this.TEXTBOX_EXPIRATION_YEAR = '//input[@inputid= "expiryYear"]';
    this.TEXTBOX_CVV = '//input[@id= "verificationNumber"]';
    this.TEXTBOX_PAX_PHONE_NUMBER = '//input[@id="phoneNumber"]';
    this.CHECKBOX_USE_PAX_INFORMATION =
      '//app-pm-credit-card-input//input[@id= "usePassenger1AddressForBillingAddress"]';
    this.CHECKBOX_TERMS_AND_CONDITIONS =
      '//app-pm-credit-card-input//following-sibling::div//input[@id="termsAndConditionsCheckbox"]';
    this.BUTTON_CONFIRM_AND_PAY = '//app-payment-methods-group//button[text() = " Confirm and Pay "]';
    this.LOADING_SPINNER = '(//div[@class = "loadingSpinner"])[1]';
  }

  async isPageHeaderDisplayed(){
    return this.isElementVisibled(this.TEXT_HEADER);
  }

  async getFlightDate(){
    return this.getText(this.TEXT_FLIGHT_DATE);
  }

  async getDepartureAirport(){
    return this.getText(this.TEXT_DEPARTURE_AIRPORT);
  }

  async getArrivalAirport(){
    return this.getText(this.TEXT_ARRIVAL_AIRPORT);
  }

  async getJourneyTotal(){
    return this.getText(this.TEXT_JOURNEY_TOTAL);
  }

  async clickConfirmAndPayButton() {
    await this.clickElement(this.BUTTON_CONFIRM_AND_PAY);
    await this.waitLoadingSpinnerInvisibled();
    //await this.page.waitForSelector(this.LOADING_SPINNER, { state: 'hidden', timeout: 60000 });
  }

  async selectCreditPaymentMethod() {
    await this.waitLoadingSpinnerInvisibled();
    await this.clickElement(this.RADIO_CREDIT_CART);
    await this.waitLoadingSpinnerInvisibled();
  }

  async selectVisaPaymentMethod() {
    await this.clickElement(this.RADIO_VISA_PAYMENT_METHOD);
    await this.waitLoadingSpinnerInvisibled();
  }

  async enterCardNumber(cardNumber) {
    await this.sendKey(this.TEXTBOX_CARD_NUMBER, cardNumber);
  }
  async enterCarHolder(cardHolder) {
    await this.sendKey(this.TEXTBOX_CARD_HOLDER, cardHolder);
  }
  async enterExpirationMonth(month) {
    await this.sendKey(this.TEXTBOX_EXPIRATION_MONTH, month);
  }

  async enterExpirationYear(year) {
    await this.sendKey(this.TEXTBOX_EXPIRATION_YEAR, year);
  }
  async enterCVV(CVV) {
    await this.sendKey(this.TEXTBOX_CVV, CVV);
  }

  async checkUsePaxInformation() {
    await this.checkTheCheckbox(this.CHECKBOX_USE_PAX_INFORMATION);
  }

  async enterPaxPhoneNumber(phoneNumber) {
    await this.sendKey(this.TEXTBOX_PAX_PHONE_NUMBER, phoneNumber);
  }
  async clickStripePaymentMethod() {
    await this.clickElement(this.RADIO_PAYMENT_STRIPE);
  }

  async checkPaymentTermsAndConditionsCheckbox() {
    await this.clickElement(this.CHECKBOX_TERMS_AND_CONDITIONS);
  }

  async enterPaymentDetails(paymentInfo) {
    try {
      await this.page.click(this.RADIO_CREDIT_CART, paymentInfo.Method);
      await this.waitLoadingSpinnerInvisibled();
      await this.page.click(this.RADIO_VISA_PAYMENT_METHOD, paymentInfo.CardType);
      await this.waitLoadingSpinnerInvisibled();
      await this.page.fill(this.TEXTBOX_CARD_NUMBER, paymentInfo.CardNumber);
      await this.page.fill(this.TEXTBOX_EXPIRATION_MONTH, paymentInfo.ExpirationMonth);
      await this.page.fill(this.TEXTBOX_EXPIRATION_YEAR, paymentInfo.ExpirationYear);
      await this.page.fill(this.TEXTBOX_CVV, paymentInfo.CVV);
      console.log("Payment details entered successfully");
      await this.checkTheCheckbox(this.CHECKBOX_USE_PAX_INFORMATION);
      await this.checkTheCheckbox(this.CHECKBOX_TERMS_AND_CONDITIONS);
    } catch (error) {
      // Log and rethrow error for debugging
      console.error(`Failed to enter payment details: ${error.message}`);
      throw error;
    }
  }
}
