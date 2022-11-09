import Airtable from 'airtable';
import { Request, Response, NextFunction } from 'express'

require('dotenv').config();
const express = require("express");
const airtable = require('airtable');

const PORT = process.env.PORT || 3005;

const {AIRTABLE_API_KEY: API_KEY, BASE_ID: BASE, REQUEST_TABLE_ID: REQUEST_TABLE, EMPLOYEE_DATA_TABLE_ID: EMPLOYEE_TABLE, CALENDAR_TABLE_ID: CALENDAR_TABLE} = process.env

/* Airtable Authentication */
// Vacation Schedule = Table
// Vacation Calendar = View
// const base = require('airtable').base(BASE);
const base = new airtable({apiKey: API_KEY}).base(BASE);

// base(REQUEST_TABLE).select({
//     maxRecords: 10
// }).eachPage( (records, fetchNextPage) => {
//     // This function (`page`) will get called for each page of records.
//     records.forEach(function (record) {
//         console.log('Record: ', record);
//     });
//     // To fetch the next page of records, call `fetchNextPage`.
//     // If there are more records, `page` will get called again.
//     // If there are no more records, `done` will get called.
//     fetchNextPage();

// }, (err) => {
//         if (err) { console.error(err); return; }
//     });

/* Express Setup */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/create", (req: Request, res: Response) => {
    console.log(req.body)
    let recordID: any = 'record'

    /* Check Employee Data to see if request can be fulfilled */
    base(EMPLOYEE_TABLE).select({
        maxRecords: 10
    }).eachPage( (records: Airtable.Records<any>, fetchNextPage: any) => {
        records.forEach( (record: Airtable.Record<any>) => {
            console.log('<------------------------------->')
            console.log('record id: ', record.id)
            console.log('email: ', record.fields.Assignee.email);
            console.log('submitted email: ', req.body.username)

            recordID = () => {
                if (record.fields.Assignee.email == req.body.username) {
                    console.log("acquired correct record ID")
                    return record.id
                }
                else {return}
            }
        });
        fetchNextPage();
    
    }, (err: Airtable.Error) => {
            if (err) { console.error(err); return; }
        });

    /* Create record from body request object */
    base(REQUEST_TABLE).create([
        {
          "fields": {
            "Name": req.body.name, 
            "Start Date": req.body['start date'],
            "End Date": req.body['end date'],
            "Type": req.body.type, 
            "Status": "Todo", 
            "Collaborator": {
                email: req.body.username
              }
          }
        }
      ], (err: Airtable.Error, records: Airtable.Records<any>) => {
        if (err) {
          console.log(err)
        res.status(err.statusCode).send({ error: 'something blew up' })
          return;
        }
        // records.forEach( (record: Airtable.Record<any>) => {
        //     console.log(record.fields);
        // });
      });
  });

  /* Handle GET requests */
  app.get("/data", (req: Request, res: Response) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
});