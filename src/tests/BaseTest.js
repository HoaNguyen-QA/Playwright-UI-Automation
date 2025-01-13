import { airlinesConfig } from '../../airlines.config';

export class BaseTest {
  constructor() {
    this.airlineName = process.env.AIRLINE;
    this.environment = process.env.ENVIRONMENT;
    this.apiKey = process.env.GOOGLE_API_KEY;

    // Check if no value is provided
    if (!this.airlineName) {
      throw new Error('AIRLINE variable is required.');
    }

    if (!this.environment) {
      throw new Error('ENVIRONMENT variable is required.');
    }

    // Get airline information from the configuration
    this.airline = airlinesConfig[this.airlineName];
    if (!this.airline) {
      throw new Error(`Airline "${this.airlineName}" not found in the configuration.`);
    }

    // Build the appropriate URL
    this.url = this.buildUrl();
  }

  /**
   * Build URL based on the base URL of the airline and the environment
   */
  buildUrl() {
    let baseUrl = this.airline.baseUrl;
    const env = this.environment.toLowerCase();
  
    switch (env) {
      case 'qa':
        baseUrl = baseUrl.replace('intelisysmaint.ca', 'intelisysqa.ca');
        break;
      case 'training':
        baseUrl = baseUrl.replace('intelisysmaint.ca', 'intelisystraining.ca');
        break;
      default:
        baseUrl;
    }
    return baseUrl;
  }
  /**
   * Get the Spreadsheet ID of the airline
   */
  getSpreadsheetId() {
    return this.airline.spreadsheetId;
  }

  /**
   * Get the determined URL
   */
  getUrl() {
    return this.url;
  }
}
