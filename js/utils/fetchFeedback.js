import { GOOGLE_SHEET_ID, GOOGLE_API_KEY } from '../config.js';

const SHEET_ID = GOOGLE_SHEET_ID;
const API_KEY = GOOGLE_API_KEY;
const SHEET_NAME = "Form Responses 1";

// const URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
const URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

let cachedData = null;

export async function fetchFormResponses() {
  if (cachedData) {
    return cachedData;
  }

  try {
    const res = await fetch(URL);
    const data = await res.json();

    const [headers, ...rows] = data.values;
    const formatted = rows.map(row => Object.fromEntries(headers.map((header, i) => [header, row[i] || ""])));

    console.log("formatted google form data:", formatted);
    cachedData = formatted;
    return formatted;
  } catch (error) {
    console.error("failed to fetch Google Sheet: ", error);
    return [];
  }
}
