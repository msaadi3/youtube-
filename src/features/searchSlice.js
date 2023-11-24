import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    query: ''
}

export const searchSlice = createSlice({
    name: 'query',
    initialState,
    reducers: {
        setQuery: (state, action) => {
            const text = action.payload;
            state.query = ''
            state.query = text;
        }
    }

})

export const { setQuery } = searchSlice.actions

export default searchSlice.reducer