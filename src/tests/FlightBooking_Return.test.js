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

// Initialize Google Sheet Helper
const sheetHelper = new GoogleSheetHelper(apiKey, spreadsheetId);
const bookingDataOneWay = await sheetHelper.getOneWayReservationData();
const bookingDataReturn = await sheetHelper.getReturnReservationData();
const adultsPaxInfo = await sheetHelper.getAdultsPaxInformation();
const childrenPaxInfo = await sheetHelper.getChildrenPaxInformation();
const infantPaxInfo = await sheetHelper.getInfantPaxInformation();
const creditCardInfo = await sheetHelper.getCreditCardInformation();

// Test suite
test.describe("Flight Booking Tests - Return Trip", () => {
  // Before each test, initialize the page and logger
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    logger.info(`---------Starting test: ${testInfo.title}--------`);
    await page.setViewportSize({ width: 1536, height: 960 });
    await page.goto(baseURL);
  });

  // After each test, finalize assertions and log results
  test.afterEach(async ({ context }, testInfo) => {
    await verify.finalize(); // Ensure all soft assertions are processed
    await context.close();
    logger.info(`------Finished test: ${testInfo.title}--------\n`);
  });

  for (const [index, data] of bookingDataReturn.entries()) {
    test(`Should Book a Return Reservation from ${data.Departure} to ${data.Arrival} Successfully: ${data.FareOption} FareOption:`, async ({
      page,
    }) => {
      // Search Flights
      logger.info("Starting flight search");
      const flightSearchPage = new FlightSearchPage(page);
      const pageHeader = new HeaderComponent(page);
      await flightSearchPage.searchReturnFlight(data);

      // Select Flight
      logger.info("Selecting flight");
      const selectFlightPage = new SelectFlightPage(page);
      await selectFlightPage.clickSelectFareOption(data.FareOption);
      await selectFlightPage.clickContinueButton();

      logger.info("Selecting return flight");
      await selectFlightPage.clickSelectFareOption(data.FareOption);
      await selectFlightPage.clickContinueButton();

      // Enter Passenger Details
      logger.info("Entering passenger details");
      const passengerPage = new PassengerPage(page);
      //fill adults passenger information
      for (let i = 0; i < +data.Adults; i++) {
        await passengerPage.enterAdultPassengerInfo(adultsPaxInfo[i], i);
      }
      //fill children passenger information
      for (let j = 0; j < +data.Children; j++) {
        await passengerPage.enterChildPassengerInfo(childrenPaxInfo[j], +data.Adults + j);
      }
      //fill adults passenger information
      for (let k = 0; k < +data.Infants; k++) {
        await passengerPage.enterInfantPassengerInfo(infantPaxInfo[k], k);
      }
      await passengerPage.clickNextButton();
      // Select Seat
      logger.info("Select Seat");
      const seatSelectionPage = new SeatSelectionPage(page);
      await seatSelectionPage.clickNextButton();

      // Customize Flight
      logger.info("Customize Flight");
      const customizePage = new CustomizePage(page);
      await customizePage.clickNextButton();

      // Review and Pay
      logger.info("Processing payment");
      const reviewAndPayPage = new ReviewAndPayPage(page);
      //const summary = await pageHeader.getSummary();
      //logger.info(summary);
      await reviewAndPayPage.enterPaymentDetails(creditCardInfo[0]);
      await reviewAndPayPage.clickConfirmAndPayButton();

      // Verify Booking
      const bookingCompletePage = new BookingCompletePage(page);
      const bookingCode = await bookingCompletePage.getBookingCode();
      await verify.assertTrue(
        await bookingCompletePage.isPaymentSuccessfulDisplayed(),
        "Verify Payment Successful message",
        page
      );
      await verify.assertTrue(await bookingCompletePage.isValidBookingCode(), "Verify The Booking Code is Valid", page);
      //Verify booking contact
      await verify.assertEquals(await bookingCompletePage.getBookingContactEmail(),adultsPaxInfo[0].Email,
        "Verify Contact Email",page
      );
      //Itinerary
      await verify.assertContains(await bookingCompletePage.getItineraryFlightDate(),data.DepartureDate,
        "Verify Itinerary Outbound Flight",page
      );
      console.log("Booking complete");
    });
  }
});
