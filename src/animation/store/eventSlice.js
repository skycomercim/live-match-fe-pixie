import { configureStore, createSlice } from '@reduxjs/toolkit';
import {matchSlice} from "./matchSlice";

const eventsSlice = createSlice({
    name: 'events',
    initialState: null,
    reducers: {
        setEvent: (state, action) => {
            return action.payload;
        },
        clearEvent: () => {
            return null;
        },
    },
});

export const { setEvent, clearEvent } = eventsSlice.actions;

export default eventsSlice.reducer;