/* eslint-disable no-undef */
const functions = require("firebase-functions");
const fetch = require("node-fetch");

exports.googleCalendarProxy = functions.https.onRequest(async (req, res) => {
  const url =
    "https://calendar.google.com/calendar/ical/ruvindugamage%40gmail.com/public/basic.ics";

  try {
    const response = await fetch(url);
    const data = await response.text();

    res.set("Access-Control-Allow-Origin", "*");
    res.set("Content-Type", "text/calendar");
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch calendar");
  }
});
