const express = require("express");
const { google } = require("googleapis");

const app = express();

app.get("/", async (req, res) => {  

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1K61l0dqZpOuqT_iSfkR8kCMgnxFOhrjVhnAFWspkqeI";

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  res.send(metaData);
});

app.listen(1377, (req, res) => console.log("running on 1377"));