export class Helper {
  /**
   * Formats a string by replacing placeholders {0}, {1}, etc., with values.
   * @param {string} format - The format string with placeholders.
   * @param {...*} args - The values to replace placeholders with.
   * @returns {string} - The formatted string.
   */
  static formatString(format, ...args) {
    return format.replace(/{(\d+)}/g, (match, index) => args[index] ?? match);
  }

  //input date format will be MMM dd yyyy
  static splitStringBySpaces(string) {
    return string.split(" ");
  }

  static getCurrentMonth() {
    const currentDate = new Date();
    const currentMonth = new Intl.DateTimeFormat("en-US", { month: "long" }).format(currentDate);
    return currentMonth;
  }

  static getFullDate(date) {
    const inputDate = new Date(date);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long", // Full weekday name
      month: "long", // Full month name
      day: "numeric", // Numeric day of the month
      year: "numeric", // Full year
    }).format(inputDate);
  }

  static calculateTotalFare(adultFareText, numberOfAdult, childFareText, numberOfChild) {
    const totalAdultFare = +adultFareText.substring(1) * +numberOfAdult;
    const totalChildFare = +childFareText.substring(1) * +numberOfChild;
  }

  static isValidBookingCode(bookingCode) {
    const bookingCodeRegex = /^[A-Z0-9]{6}$/;
    return bookingCodeRegex.test(bookingCode);
  }

  static parseCurrency(value) {
    if (typeof value === "string") {
      return parseFloat(value.replace(/[$,]/g, ""));
    }
    return value; // Return the value as-is if it's already a number
  }

  static calculateTotalFlightCost(
    numberOfAdults,
    adultFare,
    numberOfChildren = 0,
    childrenFare = 0,
    numberOfInfants = 0,
    infantFare = 0
  ) {

    // Convert fares to numbers if they are strings
    const adultFareNumber = this.parseCurrency(adultFare);
    const childrenFareNumber = this.parseCurrency(childrenFare);
    const infantFareNumber = this.parseCurrency(infantFare);

    // Validate input values
    if (
      numberOfAdults < 0 ||
      adultFareNumber < 0 ||
      numberOfChildren < 0 ||
      childrenFareNumber < 0 ||
      numberOfInfants < 0 ||
      infantFareNumber < 0
    ) {
      throw new Error("All numbers must be non-negative.");
    }

    // Calculate the total cost
    const totalCost =
      numberOfAdults * adultFareNumber + numberOfChildren * childrenFareNumber + numberOfInfants * infantFareNumber;

    return totalCost;
  }
}
