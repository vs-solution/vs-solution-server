require('dotenv').config();

const { google } = require('googleapis');

const googleSheets = async (sheetPageName, columnTo, dataValues) => {
	const auth = new google.auth.GoogleAuth({
		keyFile: "credentials.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets"
	});

	// Create client instance for auth
	const client = await auth.getClient();
	
	// Instance of Google Sheets API
	const googleSheets = google.sheets({version: "v4", auth: client});

	// Write rows to spreadsheet
	const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

	await googleSheets.spreadsheets.values.append({
		auth,
		spreadsheetId: process.env.SPREAD_SHEET_ID,
		range: `${sheetPageName}!A:${columns[columnTo - 1]}`,
		valueInputOption: "USER_ENTERED",
		resource: {
			values: [
				dataValues
			]
		}
	})
};

module.exports = googleSheets;