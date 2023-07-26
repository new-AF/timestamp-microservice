const errorJSON = { errorJSON: "Invalid Date" };

/* timestamp to utc date time string */
export function getUTC(str) {
    const num = Number(str);
    if (isNaN(num)) {
        return errorJSON;
    }

    const date = new Date(num);

    if (date === null) {
        return errorJSON;
    }

    const utc = date.toUTCString();
    return utc;
}

/* date time string to timestamp */
export function getTimestamp(str) {
    const date = new Date(str);
    if (date === null) {
        return errorJSON;
    }

    const timestampStr = date.getTime();
    const timestamp = Number(timestampStr);

    return timestamp;
}

// export default { getTimestamp, getUTC };

/* construct response json */
export function makeJSON(timestamp, utc) {
    return { unix: timestamp, utc: utc };
}
