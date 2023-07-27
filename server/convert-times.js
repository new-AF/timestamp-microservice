const errorJSON = { error: "Invalid Date" };

/* timestamp to utc date time string */
export function getUTC(timestamp) {
    const number = Number(timestamp);
    if (isNaN(number)) {
        return [false, undefined, undefined];
    }

    const date = new Date(number);

    if (date === null) {
        return [false, undefined, undefined];
    }

    const dateString = date.toUTCString();
    return [true, dateString, number];
}

/* date time string to timestamp */
export function getTimestamp(dateString) {
    const date = new Date(dateString);
    // console.log({ date });
    if (date === null) {
        return [false, undefined, undefined];
    }

    const timestampStr = date.getTime();
    const number = Number(timestampStr);

    return [true, number, dateString];
}

// export default { getTimestamp, getUTC };

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

    // console.log("--- input is date string");

    /* may be valid date string */
    const [ok, timestampNumber, dateString] = getTimestamp(str);
    const json = ok ? makeJSON(timestampNumber, dateString) : errorJSON;
    return json;
}
