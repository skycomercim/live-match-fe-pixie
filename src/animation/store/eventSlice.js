import { createSlice } from '@reduxjs/toolkit';
import {createAnimationTimeline} from "../utils/utils";
import events from "../assets/fakeEvents.json";

const initialState = {};

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        addEvent(state, action) {
            return action.payload;
        },
        addEventToQueue: (state, action) => {
            state.push(action.payload);
        }
    }
});

export const { addEvent } = eventSlice.actions;
export default eventSlice.reducer;
