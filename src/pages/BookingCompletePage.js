import BasePage from "./BasePage";
import { Helper } from "../utils/helper";

export default class BookingCompletePage extends BasePage {
  constructor(page) {
    super(page);

    //#region locators
    this.TEXT_PAGE_TITLE = '//div[@class = "h1" and text() = "Your booking is complete"]'
    this.TEXT_BOOKING_CODE = '//span[@class = "pnr"]';
    this.TEXT_PAYMENT_SUCCESSFUL = '//h4[contains(@class,"alert-success") and text() = " Payment Successful " ]';
    this.ELEMENT_RESEND_EMAIL = '//div[contains(@class, "page--action")]/div[text() = "Resend Email"]';
    this.ELEMENT_DOWNLOAD_ITINERARY = '//app-next-steps//span[contains(text(),"Download Itinerary")]';
    this.ELEMENT_DOWNLOAD_ITINERARY = '//app-next-steps//span[contains(text(),"Manage booking")]';
    this.ELEMENT_MAKE_A_NEW_BOOKING = '//app-next-steps//span[contains(text(),"Make a new booking")]'

    //Booking contact
    this.TEXT_BOOKING_CONTACT_EMAIL ='//div[contains(@class, "email-info-value")]';
    this.TEXT_BOOKING_CONTACT_PHONE ='//div[contains(@class, "primary-phone-value")]';

    //Payment
    this.TEXT_PAYMENT_METHOD = '//div[contains(@class, "payment-method--name")]';
    this.TEXT_PAYMENT_METHOD = '//div[contains(@class, "payment-transaction-method-label") and contains(text() ,"Card:")]//following-sibling::div';
    this.TEXT_PAYMENT_TIME = '//div[contains(@class, "payment-transaction-method-label") and contains(text() ,"Date & Time:")]//following-sibling::div';
    this.TEXT_PAYMENT_AMOUNT = '//div[contains(@class, "payment-transaction-method-label") and contains(text() ,"Amount")]//following-sibling::div';
    this.TEXT_TOTAL_BOOKING_PAYMENT = '//div[contains(text(),"Total Booking Payment")]//following-sibling::div';

    //Itinerary
    this.TEXT_FLIGHT_DATE = '//div[contains(@class,"cart--outbound")]//div[contains(@class,"flight-date")]';
    this.TEXT_DEPARTURE_AIRPORT = '//div[contains(@class,"cart--outbound")]//span[contains(@class,"airport")][1]';
    this.TEXT_ARRIVAL_AIRPORT = '//div[contains(@class,"cart--outbound")]//span[contains(@class,"airport")][2]';
    this.TEXT_DEPARTURE_TIME = '//div[contains(@class,"cart--outbound")]//div[contains(@class,"leg-single")][1]';
    this.TEXT_ARRIVAL_TIME = '//div[contains(@class,"cart--outbound")]//div[contains(@class,"leg-single")][2]';

    //Passengers list
    this.ELEMENT_PAX_LIST = '//app-passenger-information-summary';
    this.TEXT_PAX_NAME = '//app-passenger-information-summary//div[contains(@class, "card-title")]';
    this.TEXT_PAX_BIRTHDAY = '//app-passenger-information-summary//div[contains(@class, "card-title")]//following-sibling::p'
    this.TEXT_PAX_EMAIL = '//app-passenger-information-summary//div[contains(text(), "Email")]//following-sibling::div';
    this.TEXT_PAX_PHONE = '//app-passenger-information-summary//div[contains(text(), "Phone")]//following-sibling::div';
    this.TEXT_PAX_MOBILE = '//app-passenger-information-summary//div[contains(text(), "Mobile")]//following-sibling::div';

    //Contacts
    this.TEXT_CONTACT_EMAIL = '//div[contains(@class, "contact--list")]//div[contains(text(), "Email")]//following-sibling::div';
    this.TEXT_CONTACT_PHONE = '//div[contains(@class, "contact--list")]//div[contains(text(), "Phone")]//following-sibling::div';
    this.TEXT_CONTACT_MOBILE = '//div[contains(@class, "contact--list")]//div[contains(text(), "Mobile")]//following-sibling::div';

    //Reservation
    this.TEXT_RES_FLIGHT_DATE = '//app-reservation-charges//div[contains(@class,"flight-date")]';
    this.TEXT_RES_DEPARTURE_AIRPORT = '//app-reservation-charges//div[contains(@class,"departure")]/div[contains(@class,"airport")]';
    this.TEXT_RES_ARRIVAL_AIRPORT = '//app-reservation-charges//div[contains(@class,"arrival")]/div[contains(@class,"airport")]';
    this.TEXT_RES_FLIGHT_NUMBER = '//app-reservation-charges//div[contains(@class,"flight-number")]';
    this.TEXT_RES_DEPARTURE_TIME = '//app-reservation-charges//div[contains(@class,"leg-single")][1]';
    this.TEXT_RES_ARRIVAL_TIME = '//app-reservation-charges//div[contains(@class,"leg-single")][2]';
    this.TEXT_RES_PASSENGERS = '//app-reservation-charges//div[contains(@class,"leg-recap")]/div[contains(text(), "Passengers")]';
    this.TEXT_RES_CUSTOMIZATIONS = '//app-reservation-charges//div[contains(@class,"leg-recap")]/div[contains(text(), "Customizations")]';

    //Details
    this.ICON_EXPAND_COLLAPSE_DETAILS = '//app-reservation-charges//small[contains(@class,"pointer")]';
    this.TEXT_FLIGHT_DETAIL_FIRST = '//app-flight-detail//div[contains(@class,"flight--leg-row-first")]//div[contains(text(),"{0}")]';
    this.TEXT_FLIGHT_DETAIL_LAST = '//app-flight-detail//div[contains(@class,"flight--leg-row-last")]//div[contains(text(),"{0}")]'

    //Charges Detail
    this.TEXT_JOURNEY_TOTAL ='//div[contains(@class,"charges-journey-total")]//div[text() = "Journey Total"]/following-sibling::div';
    // #endregion
    this.TEXT_THANKYOU_MESSAGE = '//div[contains(text(),"Thank you for booking with InteliSys Airways.")]';

  }

  async isPageTitleDisplayed(){
    return await this.isElementVisibled(this.TEXT_PAGE_TITLE);
  }

  async getBookingCode() {
    return await this.getText(this.TEXT_BOOKING_CODE);
  }

  async isPaymentSuccessfulDisplayed() {
    return await this.isElementVisibled(this.TEXT_PAYMENT_SUCCESSFUL);
  }

  async isValidBookingCode(){
    const actualBookingCode = await this.getText(this.TEXT_BOOKING_CODE);
    return Helper.isValidBookingCode(actualBookingCode);
  }

  async isResendEmailDisplayed(){
    return await this.isElementVisibled(this.ELEMENT_RESEND_EMAIL);
  }

  //Verify booking contact
  async getBookingContactEmail(){
    return await this.getText(this.TEXT_BOOKING_CONTACT_EMAIL);
  }

  async getBookingContactPhone(){
    return await this.getText(this.TEXT_BOOKING_CONTACT_PHONE);
  }

  //Verify Payment
  async getPaymentMethod(){
    return await this.getText(this.TEXT_PAYMENT_METHOD);
  }

  async getPaymentTime(){
    return await this.getText(this.TEXT_PAYMENT_TIME);
  }

  async getPaymentAmount(){
    return await this.getText(this.TEXT_PAYMENT_AMOUNT);
  }

  async getTotalBookingPayment(){
    return await this.getText(this.TEXT_TOTAL_BOOKING_PAYMENT);
  }
  //Itinerary
  async getItineraryFlightDate(){
    return await this.getText(this.TEXT_FLIGHT_DATE);
  }

  async getItineraryDepartureAirport(){
    return await this.getText(this.TEXT_DEPARTURE_AIRPORT);
  }

  async getItineraryArrivalAirport(){
    return await this.getText(this.TEXT_ARRIVAL_AIRPORT);
  }

  async getItineraryDepartureTime(){
    return await this.getText(this.TEXT_DEPARTURE_TIME);
  }

  async getItineraryArrivalTime(){
    return await this.getText(this.TEXT_ARRIVAL_TIME);
  }
  //Passengers list
  async getPassengersList(){
    return this.getListElements(this.ELEMENT_PAX_LIST);
  }

  //Contacts

  //Reservation

  //Details

  //Charges Detail
  async getJourneyTotal(){
    return await this.getText(this.TEXT_JOURNEY_TOTAL);
  }
}
