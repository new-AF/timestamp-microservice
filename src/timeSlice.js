import { createSlice } from "@reduxjs/toolkit";
import { getTimestamp, getUTC, makeJSON } from "../server/convert-times.js";

const timestamp = new Date().getTime();
const utc = getUTC(timestamp);
const json = makeJSON(timestamp, utc);

const initialState = {
    example: true,
    request: "/api/" + timestamp,
    json: json,
};

const slice = createSlice({
    name: "time",
    initialState: initialState,
    reducers: {
        setInput: (state, action) => {
            const text = action.payload;
            state.input = text;
            state.output = marked.parse(text);
        },
    },
});

export const { setInput } = slice.actions;
export default slice.reducer;
