require('dotenv').config();
const express = require("express");
const Airtable = require('airtable');

const PORT = process.env.PORT || 3005;

const {AIRTABLE_API_KEY: API_KEY, BASE_ID: BASE, TABLE_ID: TABLE} = process.env

/* Airtable Authentication */
// Vacation Schedule = Table
// Vacation Calendar = View
// const base = require('airtable').base(BASE);
const base = new Airtable({apiKey: API_KEY}).base(BASE);

base(TABLE).select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 10
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        console.log('Record: ', record);
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});

/* Express Setup */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/create", (req, res) => {
    res.json({ message: "request endpoint reached" });
    console.log(req.body)

    /* Create record from body request object */
    base(TABLE).create([
        {
          "fields": {
            "Name": req.body.name, 
            "Start Date": req.body['start date'],
            "End Date": req.body['end date'],
            "Type": req.body.type, 
            "Status": "Todo", 
            "Collaborator": {
                id: 'usrXqdzC1eVzlvmQr',
                email: 'placeholder@yourmom.com',
                name: 'Tristan Hitt'
              }
          }
        }
      ], (err, records) => {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach( (record) => {
            console.log(record.fields);
        });
      });
  });

  /* Handle GET requests */
  app.get("/data", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
});