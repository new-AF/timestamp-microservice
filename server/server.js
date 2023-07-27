import express from "express";
import { getTimestamp, getUTC, getResponse } from "./convert-times.js";

const app = express();

app.get("/api/:date", function (req, res) {
    const paramsObj = req.params;

    /* if path is missing date in /api/date */
    if (paramsObj.hasOwnProperty("date") === false) {
        return errorJSON;
    }

    /* can be either
        timestamp number or
        date time string */

    const str = paramsObj.date;

    const response = getResponse(str);
    res.json(response);
});

app.listen(3000, () => console.log("server is listening on 3000"));
