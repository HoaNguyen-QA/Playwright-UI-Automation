import fetch from "node-fetch";
export default class GoogleSheetHelper {
  constructor(apiKey, spreadsheetId) {
    this.apiKey = apiKey;
    this.spreadsheetId = spreadsheetId;
    this.ONE_WAY_DATA_SHEET = 'OneWayReservation';
    this.RETURN_DATA_SHEET = 'ReturnReservation';
    this.ADULTS_PAX_INFO_SHEET = 'AdultsPassengerInfo';
    this.CHILDREN_PAX_INFO_SHEET = 'ChildrenPassengerInfo'
    this.INFANT_PAX_INFO_SHEET ='InfantsPassengerInfo'
    this.CREDIT_CARD_SHEET = 'CreditCard';
  }
  async getTestData(range) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${range}?key=${this.apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.values) {
        const [headers, ...rows] = data.values;
        const result = rows.map((row) => {
          const obj = {};
          headers.forEach((key, index) => {
            obj[key] = row[index] || null;
          });
          return obj;
        });

        return result;
      } else {
        throw new Error(`Error fetching data: ${data.error.message}`);
      }
    } catch (error) {
      throw new Error(`Fetch error: ${error.message}`);
    }
  }

  async getOneWayReservationData(){
    return await this.getTestData(this.ONE_WAY_DATA_SHEET);
  }

  async getReturnReservationData(){
    return await this.getTestData(this.RETURN_DATA_SHEET);
  }

  async getAdultsPaxInformation(){
    return await this.getTestData(this.ADULTS_PAX_INFO_SHEET);
  }

  async getChildrenPaxInformation(){
    return await this.getTestData(this.CHILDREN_PAX_INFO_SHEET);
  }

  async getInfantPaxInformation(){
    return await this.getTestData(this.INFANT_PAX_INFO_SHEET);
  }

  async getCreditCardInformation(){
    return await this.getTestData(this.CREDIT_CARD_SHEET);
  }
}
