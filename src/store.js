import { configureStore } from "@reduxjs/toolkit";
import timeReducer from "./timeSlice";

const store = configureStore({
    reducer: {
        time: timeReducer,
    },
});

export default store;
