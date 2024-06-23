const spreadsheetId = process.env.NX_SPREADSHEET_ID;
const apiKey = process.env.NX_API_KEY;
const range = 'Sheet1!A3:F';
export const baseUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

export default {
  baseUrl,
};
