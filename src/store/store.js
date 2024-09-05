import { configureStore } from "@reduxjs/toolkit";
import { uiSlice, calendarSlice } from "src/store";

const storeConfig = {
    reducer: {
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
};

export const store = configureStore(storeConfig);
