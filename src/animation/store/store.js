import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './eventSlice';
import matchReducer from './matchSlice';

const store = configureStore({
    reducer: {
        event: eventReducer,
        match: matchReducer,
    },
});

export default store;
