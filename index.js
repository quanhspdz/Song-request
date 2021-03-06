const express = require("express");
const { google } = require("googleapis");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  const {request, name} = req.body;

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  //Create client instance for auth
  const client = await auth.getClient();

  //Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1K61l0dqZpOuqT_iSfkR8kCMgnxFOhrjVhnAFWspkqeI";

  //Get metadata about spreadsheets
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  //Read rows from spreadsheet
  sheetName = "Song and Requester";
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: sheetName,
  });

  //Write row(s) to spreadsheet
  const requestedSong = request;
  const requesterName = name;
  await googleSheets.spreadsheets.values.append({
    auth, 
    spreadsheetId,
    range: sheetName + "!A:B",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [
        [requestedSong, requesterName],
      ]
    }
  });

  res.send("Successfully submitted!");
});

const port = 1337;
app.listen(port, (req, res) => console.log("Running on port " + port));