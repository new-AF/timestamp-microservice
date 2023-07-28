import express from "express";
import { getResponse } from "./convert-times.js";

import store from "../src/store.js";
import { setRequestAndJSON } from "../src/timeSlice.js";

import cors from "cors";
const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions)); // Use this after the variable declaration

app.get("/api/open", function (req, res) {
    const headers = {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
    };
    // res.writeHead(200, headers);
    const str = new Date().toLocaleString();
    res.json({ str: str });
    //console.log(req);
});

app.get("/api/:date", function (req, res) {
    /*  */
    const paramsObj = req.params;

    /* if path is missing date in /api/date */
    if (paramsObj.hasOwnProperty("date") === false) {
        store.dispatch(setRequestAndJSON(["", errorJSON]));
        return res.json(errorJSON);
    }

    /* can be either
        timestamp number or
        date time string */

    const str = paramsObj.date;

    const response = getResponse(str);
    store.dispatch(setRequestAndJSON([str, response]));
    res.json(response);
});

app.listen(3000, () => console.log("server is listening on 3000"));
