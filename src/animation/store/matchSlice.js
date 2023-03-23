import { createSlice } from '@reduxjs/toolkit';

export const matchSlice = createSlice({
    name: 'match',
    initialState: {
        data: null,
    },
    reducers: {
        setMatchData: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { setMatchData } = matchSlice.actions;

export const selectMatchData = state => state.match.data;

export default matchSlice.reducer;
