import BasePage from "./BasePage";
import { Helper } from "../utils/helper";

export default class CheckinPage extends BasePage {
  constructor(page) {
    super(page);
    this.TEXT_HEADER_TITLE = '//div[contains(@class,"page-header--title") and contains(text(),"Here\'s your reservation")]';
    this.TEXT_BOOKING_CODE = '//div[contains(text(),"Booking Reference (PNR)")]/following-sibling::div';
    this.TEXT_RESERVATION_STATUS = '//div[contains(text(),"Reservation Status")]/following-sibling::div';

    //Chech-in banner
    this.BUTTON_START_CHECKIN ='//app-check-in-focus-banner//button[contains(text(),"Get started!")]';

    //Booking contact
    this.TEXT_CONTACT_EMAIL ='//div[contains(@class, "email-info-value")]';
    this.TEXT_CONTACT_EMAIL ='//div[contains(@class, "primary-phone-value")]';
    //Payment
    this.TEXT_PAYMENT_METHOD = '//div[contains(@class, "payment-method--name")]';
    this.TEXT_PAYMENT_METHOD = '//div[contains(@class, "payment-transaction-method-label") and contains(text() ,"Card:")]//following-sibling::div';
    this.TEXT_PAYMENT_METHOD = '//div[contains(@class, "payment-transaction-method-label") and contains(text() ,"Date & Time:")]//following-sibling::div';
    this.TEXT_PAYMENT_AMOUNT = '//div[contains(@class, "payment-transaction-method-label") and contains(text() ,"Amount")]//following-sibling::div';
    this.TEXT_TOTAL_BOOKING_PAYMENT = '//div[contains(text(),"Total Booking Payment")]//following-sibling::div';

    //Itinerary
    this.TEXT_FLIGHT_DATE = '(//app-journey-information-summary)[2]//span[contains(@class,"flight-date")]';
    this.TEXT_CITY_PAIR = '(//app-journey-information-summary)[2]//div[contains(@class,"cart-leg--citypairs")]';
    this.TEXT_DEPARTURE_TIME = '(//app-journey-information-summary)[2]//div[contains(@class,"leg-single")][1]';
    this.TEXT_ARRIVAL_TIME = '(//app-journey-information-summary)[2]//div[contains(@class,"leg-single")][2]';

    //Passengers list
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


  }
  async getBookingCode() {
    return await this.getText(this.TEXT_BOOKING_CODE);
  }

  async isValidBookingCode(){
    const actualBookingCode = await this.getText(this.TEXT_BOOKING_CODE);
    return Helper.isValidBookingCode(actualBookingCode);
  }

  //Verify booking contact


  //Verify Payment

  //Itinerary

  //Passengers list

  //Contacts

  //Reservation

  //Details

  //Charges Detail
}
