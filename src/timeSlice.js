/* workaround for node.js error
import { createSlice } from "@reduxjs/toolkit";
         ^^^^^^^^^^^
SyntaxError: Named export 'createSlice' not found. The requested module '@reduxjs/toolkit' is a CommonJ
S module, which may not support all module.exports as named exports.

*/
import * as toolkitRaw from "@reduxjs/toolkit";
const { createSlice } = toolkitRaw.default ?? toolkitRaw;

import { getResponse } from "../server/convert-times.js";

const timestampStr = "1690452662026";
const json = getResponse(timestampStr);

const slice = createSlice({
    name: "time",
    initialState: {
        example: true,
        request: "/api/" + timestampStr,
        json: json,
    },
    reducers: {
        setRequestAndJSON: (state, action) => {
            const [input, json] = action.payload;
            state.request = "/api/" + input;
            state.json = JSON.stringify(json);
            // console.log("---new state", state);
        },
    },
});

export const { setRequestAndJSON } = slice.actions;
export default slice.reducer;
