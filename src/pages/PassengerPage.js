import BasePage from "./BasePage";
import { Helper } from "../utils/helper";

export default class PassengerPage extends BasePage {
  constructor(page) {
    super(page);
    this.TITLE_DROPDOWN = '//select[@id = "title_{0}"]';
    this.TEXTBOX_FIRSTNAME = '//input[@id="firstName_{0}"]';
    this.TEXTBOX_LASTNAME = '//input[@id="lastName_{0}"]';
    this.TEXTBOX_DAY = '//input[@id="day_{0}"]';
    this.TEXTBOX_MONTH = '//input[@id="month_{0}"]';
    this.TEXTBOX_YEAR = '//input[@id="year_{0}"]';
    this.TEXTBOX_ADDRESS = '//input[@id="address1_{0}"]';
    this.COUNTRY_DROPDOWN = '(//select[contains(@id,"country_picker")])[{0}]';
    this.PROVINCE_DROPDOWN = '(//select[contains(@id,"province_picker")])[{0}]';
    this.TEXTBOX_EMAIL = '//input[@id="email_{0}"]';
    this.TEXTBOX_PHONENUMBER = '//input[@id="phoneNumber_{0}"]';
    this.TEXTBOX_MOBILENUMBER = '//input[@id="mobileNumber_{0}"]';
    this.INFANT_GENDER = '//input[contains(@id,"gender_10{0}") and @value="{1}"]';
    this.TEXTBOX_INFANT_FIRSTNAME = '//input[@id="firstName_10{0}"]';
    this.TEXTBOX_INFANT_LASTNAME = '//input[@id="lastName_10{0}"]';
    this.TEXTBOX_INFANT_DAY = '//input[@id="day_10{0}"]';
    this.TEXTBOX_INFANT_MONTH = '//input[@id="month_10{0}"]';
    this.TEXTBOX_INFANT_YEAR = '//input[@id="year_10{0}"]';
    this.BUTTON_NEXT = '//button[@form = "ngPassengersForm"]';
  }
  async selectTitle(title, index = 0) {
    await this.selectOptionByValue(Helper.formatString(this.TITLE_DROPDOWN, index), title);
  }

  async enterFirstName(firstName, index = 1) {
    await this.sendKey(Helper.formatString(this.TEXTBOX_FIRSTNAME, index), firstName);
  }

  async enterLastName(lastName) {
    await this.sendKey(this.TEXTBOX_LASTNAME, lastName);
  }

  async enterDateOfBirth(dateOfBirth) {
    const dateParts = dateOfBirth.split("/");
    await this.sendKey(this.TEXTBOX_DAY, dateParts[0]);
    await this.sendKey(this.TEXTBOX_MONTH, dateParts[1]);
    await this.sendKey(this.TEXTBOX_YEAR, dateParts[2]);
  }

  async enterAddress(address) {
    await this.sendKey(this.TEXTBOX_ADDRESS, address);
  }

  async enterEmail(email) {
    await this.sendKey(this.TEXTBOX_EMAIL, email);
  }

  async enterPhoneNumber(phoneNumber) {
    await this.sendKey(this.TEXTBOX_PHONENUMBER, phoneNumber);
  }

  async enterMobileNumber(mobileNumber) {
    await this.sendKey(this.TEXTBOX_MOBILENUMBER, mobileNumber);
  }

  async clickNextButton() {
    await this.clickElement(this.BUTTON_NEXT);
    await this.waitLoadingSpinnerInvisibled();
  }

  async enterAdultPassengerInfo(passengerInfo, index = 0) {
    // Fill passenger passengerInfo
    console.log(`Filling Adult passenger ${index + 1}`);
    const passengerDOB = passengerInfo.DOB.split("/");
    await this.selectOptionByValue(Helper.formatString(this.TITLE_DROPDOWN, index), passengerInfo.Title);
    await this.sendKey(Helper.formatString(this.TEXTBOX_FIRSTNAME, index), passengerInfo.FirstName);
    await this.sendKey(Helper.formatString(this.TEXTBOX_LASTNAME, index), passengerInfo.LastName);
    await this.sendKey(Helper.formatString(this.TEXTBOX_DAY, index), passengerDOB[0]);
    await this.sendKey(Helper.formatString(this.TEXTBOX_MONTH, index), passengerDOB[1]);
    await this.sendKey(Helper.formatString(this.TEXTBOX_YEAR, index), passengerDOB[2]);
    await this.sendKey(Helper.formatString(this.TEXTBOX_ADDRESS, index), passengerInfo.Address);
    await this.selectOption(Helper.formatString(this.COUNTRY_DROPDOWN, index + 1), passengerInfo.Country);
    await this.selectOption(Helper.formatString(this.PROVINCE_DROPDOWN, index + 1), passengerInfo.Province);
    await this.sendKey(Helper.formatString(this.TEXTBOX_EMAIL, index), passengerInfo.Email);
    //Phone number is only a required field for the first passenger.
    if (index === 0) {
      await this.sendKey(Helper.formatString(this.TEXTBOX_PHONENUMBER, index), passengerInfo.PhoneNumber);
    }
    await this.sendKey(Helper.formatString(this.TEXTBOX_MOBILENUMBER, index), passengerInfo.MobileNumber);
    await this.page.waitForTimeout(200);
    // Log successful entry
    console.log(`Passenger ${index + 1} filled successfully`);
  }

  async enterChildPassengerInfo(passengerInfo, index = 0) {
    // Fill passenger passengerInfo
    console.log(`Filling Child passenger ${index + 1}`);
    const passengerDOB = passengerInfo.DOB.split("/");
    await this.selectOptionByValue(Helper.formatString(this.TITLE_DROPDOWN, index), passengerInfo.Title);
    await this.sendKey(Helper.formatString(this.TEXTBOX_FIRSTNAME, index), passengerInfo.FirstName);
    await this.sendKey(Helper.formatString(this.TEXTBOX_LASTNAME, index), passengerInfo.LastName);
    await this.sendKey(Helper.formatString(this.TEXTBOX_DAY, index), passengerDOB[0]);
    await this.sendKey(Helper.formatString(this.TEXTBOX_MONTH, index), passengerDOB[1]);
    await this.sendKey(Helper.formatString(this.TEXTBOX_YEAR, index), passengerDOB[2]);
    await this.sendKey(Helper.formatString(this.TEXTBOX_EMAIL, index), passengerInfo.Email);
    await this.sendKey(Helper.formatString(this.TEXTBOX_MOBILENUMBER, index), passengerInfo.MobileNumber);
    await this.page.waitForTimeout(200);
    // Log successful entry
    console.log(`Child Passenger ${index + 1} filled successfully`);
  }

  async enterInfantPassengerInfo(passengerInfo, index = 0) {
    // Fill passenger passengerInfo
    console.log(`Filling Infant passenger ${index + 1}`);
    const passengerDOB = passengerInfo.DOB.split("/");
    await this.selectRadioButton(Helper.formatString(this.INFANT_GENDER, index, passengerInfo.Gender));
    await this.sendKey(Helper.formatString(this.TEXTBOX_INFANT_FIRSTNAME, index), passengerInfo.FirstName);
    await this.sendKey(Helper.formatString(this.TEXTBOX_INFANT_LASTNAME, index), passengerInfo.LastName);
    await this.sendKey(Helper.formatString(this.TEXTBOX_INFANT_DAY, index), passengerDOB[0]);
    await this.sendKey(Helper.formatString(this.TEXTBOX_INFANT_MONTH, index), passengerDOB[1]);
    await this.sendKey(Helper.formatString(this.TEXTBOX_INFANT_YEAR, index), passengerDOB[2]);
    await this.page.waitForTimeout(200);
    // Log successful entry
    console.log(`Infant Passenger ${index + 1} filled successfully`);
  }
}
