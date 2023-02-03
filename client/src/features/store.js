import { configureStore } from "@reduxjs/toolkit";
import streamsReducer from './streams/StreamSlice'

export const store = configureStore({
    reducer: {
       streams:  streamsReducer,
    },
});