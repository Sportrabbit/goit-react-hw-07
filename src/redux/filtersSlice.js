import { createSlice } from "@reduxjs/toolkit";

const filteredSlice = createSlice({
    name: "filters",
    initialState: {
        name: '',
    },
    reducers: {
        changeFilter(state, actions) {
            state.name = actions.payload.inputValue;
        },
    },
});

export const selectNameFilter = (state) => state.filters.name;
export const {changeFilter} = filteredSlice.actions;
export const filtersReducer = filteredSlice.reducer;