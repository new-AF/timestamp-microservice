const errorJSON = { error: "Invalid Date" };

function isInvalidDateObj(date) {
    return date.toString() === "Invalid Date";
}

/* timestamp to utc date time string */
export function getUTC(timestamp) {
    const number = Number(timestamp);
    if (isNaN(number)) {
        return [false, undefined, undefined];
    }

    const date = new Date(number);

    if (isInvalidDateObj(date)) {
        return [false, undefined, undefined];
    }

    const dateString = date.toUTCString();
    return [true, dateString, number];
}

/* date time string to timestamp */
export function getTimestamp(oldDateString) {
    const date = new Date(oldDateString);
    // console.log({ date }, typeof date);
    if (isInvalidDateObj(date)) {
        return [false, undefined, undefined];
    }

    const timestampStr = date.getTime();

    /* "2016-12-25" must return
    Sun, 25 Dec 2016 00:00:00 GMT  */
    const dateString = date.toUTCString();
    const number = Number(timestampStr);

    return [true, number, dateString];
}

/* construct response json */
export function makeJSON(timestampNumber, timestampStr) {
    return { unix: timestampNumber, utc: timestampStr };
}

/* decide if input str
is timestamp or date time string
and return json accordingly */
export function getResponse(str) {
    if (/^\d+$/.test(str) === true) {
        /* may be a timestamp */

        // console.log("--- input is timestamp");

        const [ok, dateString, timestampNumber] = getUTC(str);
        const json = ok ? makeJSON(timestampNumber, dateString) : errorJSON;
        return json;
    }

    /* may be valid date string */
    const [ok, timestampNumber, dateString] = getTimestamp(str);
    /*     console.log("--- input is date string", {
        str,
        ok,
        timestampNumber,
        dateString,
    }); */
    const json = ok ? makeJSON(timestampNumber, dateString) : errorJSON;
    return json;
}
