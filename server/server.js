import express from "express";
import { getTimestamp, getUTC, makeJSON } from "./convert-times.js";

const app = express();

app.get("/api/:date", function (req, res) {
    const obj = req.params;
    /* if path is missing date in /api/date */
    if (obj.hasOwnProperty("date") === false) res.json(errorJSON);

    /* can be either
    number or
    date time string */
    const str = obj.date;

    if (/\d+/.test(str) === true) {
        /* its a timestamp */
        const utc = getUTC(str);
        const json = makeJSON(str, utc);
        return res.json(json);
    }

    /* may be valid date time string */
    const timestamp = getTimestamp(str);
    const json = makeJSON(timestamp, utc);
    return res.json(json);
});

app.listen(3000, () => console.log("server is listening on 3000"));
