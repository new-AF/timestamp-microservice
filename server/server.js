import express from "express";
import { getResponse } from "./convert-times.js";

import cors from "cors";

/* workaround for no __dirname in when ES modules*/
/* for { fileURLToPath } */
import url from "url";
/* for { dirname, join } */
import path from "path";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;

const tempBaseURL =
    process.env.hasOwnProperty("VITE_MY_SERVER_URL_WITH_PORT") ||
    `http://localhost:${port}`;

const baseURL = tempBaseURL.endsWith("/")
    ? tempBaseURL.slice(0, tempBaseURL.length)
    : tempBaseURL;

/* join path s */
export function makeURL(...add) {
    /* remove leading and trailing "/" */
    const array = add.map((str) =>
        str.replace(/^\/+/g, "").replace(/\/+$/g, "")
    );
    const str = array.join("/");
    const res = `${baseURL}/${str};`;

    return res;
}
const app = express();

/* "dist" dir path */
const distPath = path.join(__dirname, "..", "dist");

/* get full path */
function getPathFromDist(str) {
    return path.join(distPath, str);
}

/* allow calls from anywhere? */
/* CC BY-SA 4.0 code by "Yashwardhan Pauranik" on https://stackoverflow.com/a/46988108 */
const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Use this after the variable declaration

/* make "dist" full path accessible */
app.use(express.static(distPath));

/* load the built index.html */
app.get("/", function (req, res) {
    res.sendFile(getPathFromDist("index.html"));
    if (protocol === undefined && hostname === undefined) {
    }
});

/* get time now */
app.get("/api", function (req, res) {
    const timestamp = Date.now();
    const json = getResponse(timestamp);
    res.json(json);
});

app.get("/api/:date", function (req, res) {
    /* get route parameters */
    const paramsObj = req.params;

    /* if path is missing date in /api/date */
    if (paramsObj.hasOwnProperty("date") === false) {
        return res.json(errorJSON);
    }

    /* can be either
        timestamp number or
        date time string */

    const str = paramsObj.date;
    const json = getResponse(str);
    res.json(json);
});

app.listen(port, () => console.log(`--- server is listening on ${port}`));
