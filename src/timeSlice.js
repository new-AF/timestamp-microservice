/* workaround for node.js error
import { createSlice } from "@reduxjs/toolkit";
         ^^^^^^^^^^^
SyntaxError: Named export 'createSlice' not found. The requested module '@reduxjs/toolkit' is a CommonJ
S module, which may not support all module.exports as named exports.

*/
import * as toolkitRaw from "@reduxjs/toolkit";
const { createSlice, createAsyncThunk } = toolkitRaw.default ?? toolkitRaw;

import { getResponse } from "../server/convert-times.js";

/*  */
export function makeURL(...add) {
    /* remove leading and trailing "/" */
    const array = add.map((str) =>
        str.replace(/^\/+/g, "").replace(/\/+$/g, "")
    );
    const str = array.join("/");
    const res = `${import.meta.env.VITE_MY_SERVER_URL_WITH_PORT}/${str}`;

    return res;
}

const timestampStr = "1690452662026";
const json = getResponse(timestampStr);

const callServer = createAsyncThunk("time/callServer", async (str) => {
    /* str is /api/...  */
    const res = await fetch(makeURL(str));
    const json = res.json();
    return json;
});

const slice = createSlice({
    name: "time",
    initialState: {
        example: true,
        input: "/api/" + timestampStr,
        json: json,
    },
    reducers: {
        setInput: (state, action) => {
            state.input = action.payload;
        },
        setRequestAndJSON: (state, action) => {
            const [input, json] = action.payload;
            state.input = "/api/" + input;
            state.json = JSON.stringify(json);
            // console.log("---new state", state);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(callServer.fulfilled, (state, action) => {
            const json = action.payload;
            state.json = json;
        });
    },
});

export const { setRequestAndJSON, setInput } = slice.actions;
export { callServer };
export default slice.reducer;
