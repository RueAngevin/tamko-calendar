// api/googleCalendarProxy.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const url = "https://calendar.google.com/calendar/ical/ruvindugamage%40gmail.com/public/basic.ics";

  try {
    const response = await fetch(url);
    const data = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/calendar");
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch calendar");
  }
}
