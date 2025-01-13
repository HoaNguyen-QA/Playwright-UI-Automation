// Import necessary modules
import { test as base } from '@playwright/test';
import GoogleSheetHelper from "../utils/googleSheetHelper.js";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// BaseTest class
class BaseTest {
  constructor() {
    const { GOOGLE_API_KEY, SPREADSHEET_ID } = process.env;
    this.sheetHelper = new GoogleSheetHelper(GOOGLE_API_KEY, SPREADSHEET_ID);
  }

  async setupTestData() {
    // Fetch all necessary data
    this.bookingDataOneWay = await this.sheetHelper.getOneWayReservationData();
    this.bookingDataReturn = await this.sheetHelper.getOneWayReservationData();
    this.adultsPaxInfo = await this.sheetHelper.getAdultsPaxInformation();
    this.childrenPaxInfo = await this.sheetHelper.getChildrenPaxInformation();
    this.infantPaxInfo = await this.sheetHelper.getInfantPaxInformation();
    this.creditCardInfo = await this.sheetHelper.getCreditCardInformation();
  }
}

// Extend Playwright's test fixture
const test = base.extend({
  baseTest: async ({}, use) => {
    const baseTest = new BaseTest();
    await baseTest.setupTestData();
    await use(baseTest);
  }
});

export { test };
