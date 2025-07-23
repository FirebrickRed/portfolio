import fetch from 'node-fetch';

export const handler = async function(event, context) {
  const {
    GOOGLE_API_KEY,
    GOOGLE_SHEET_ID
  } = process.env;
  const SHEET_NAME = "Form Responses 1";
  const URL = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${SHEET_NAME}?key=${GOOGLE_API_KEY}`;
  console.log(GOOGLE_API_KEY);

  try {
    const res = await fetch(URL);
    const data = await res.json();

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: `Failed to fetch from Google Sheets: ${data.error.message}` })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Failed to fetch Google Sheet: ${error.message}` })
    };
  }
};