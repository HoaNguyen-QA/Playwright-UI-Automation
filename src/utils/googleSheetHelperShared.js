import fetch from 'node-fetch';

const API_KEY = "AIzaSyCuuwdyZa3NTzI0JFDOJ0ztV_mA9_KlGtY";
const SPREADSHEET_ID = "1TMjQMnE3lpkAbTrAlsbVRZspChWUd69RXOIvQLJ1mg4";
const RANGE = "OneWayReservation!A1:C10";
const URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

fetch(URL)
    .then(response => {
        if (!response.ok) {
            throw new Error("Error fetching data from Google Sheets");
        }
        return response.json();
    })
    .then(data => {
        console.log("Data from Google Sheets:", data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
