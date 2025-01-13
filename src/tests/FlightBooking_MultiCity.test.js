// @ts-nocheck
import { test } from "@playwright/test";
import FlightSearchPage from "../pages/FlightSearchPage.js";
import verify from "../verify.js";
import logger from "../utils/logger.js";
import GoogleSheetHelper from "../utils/googleSheetHelper.js";
import dotenv from "dotenv";
import SelectFlightPage from "../pages/SelectFlightPage.js";
import PassengerPage from "../pages/PassengerPage.js";
import SeatSelectionPage from "../pages/SeatSelectionPage.js";
import CustomizePage from "../pages/CustomizePage.js";
import ReviewAndPayPage from "../pages/ReviewAndPayPage.js";
import BookingCompletePage from "../pages/BookingCompletePage.js";
import HeaderComponent from "../pages/components/HeaderComponent.js";
dotenv.config();

// Environment variables for secure credentials
const apiKey = process.env.GOOGLE_API_KEY; // Use environment variables for API key
const spreadsheetId = process.env.SPREADSHEET_ID; // Use environment variables for spreadsheet ID

// Test suite
test.describe("Flight Booking Tests - Multi City", () => {
  // Before each test, initialize the page and logger
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    logger.info(`---------Starting test: ${testInfo.title}--------`);
    //await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(baseURL);
  });

  // After each test, finalize assertions and log results
  test.afterEach(async ({ context }, testInfo) => {
    await verify.finalize(); // Ensure all soft assertions are processed
    await context.close();
    logger.info(`------Finished test: ${testInfo.title}--------\n`);
  });
});
