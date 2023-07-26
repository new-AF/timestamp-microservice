const express = require("express");
const app = express();

app.get("/api/:date", function (req, res) {
    const errorJSON = { errorJSON: "Invalid Date" };
    const obj = req.params;
    /* if path is missing date in /api/date */
    if (obj.hasOwnProperty("date") === false) res.json(errorJSON);

    /* timestamp to utc date time string */
    function getUTC(str) {
        console.log({ str });
        const num = Number(str);
        if (isNaN(num)) {
            return errorJSON;
        }

        const date = new Date(num);

        if (date === null) {
            return errorJSON;
        }

        const utc = date.toUTCString();
        return {
            unix: num,
            utc,
        };
    }

    /* date time string to timestamp */
    function getTimestamp(str) {
        const date = new Date(str);
        if (date === null) {
            return errorJSON;
        }

        const timestampStr = date.getTime();
        const timestamp = Number(timestampStr);

        return {
            unix: timestamp,
            utc: str,
        };
    }

    /* can be either
    number or
    date time string */
    const str = obj.date;

    if (/\d+/.test(str) === true) {
        /* its a timestamp */
        const json = getUTC(str);
        return res.json(json);
    }

    /* may be valid date time string */
    const json = getTimestamp(str);
    return res.json(json);

    res.send(JSON.stringify(str));
});

app.listen(3000, () => console.log("server is listening on 3000"));
