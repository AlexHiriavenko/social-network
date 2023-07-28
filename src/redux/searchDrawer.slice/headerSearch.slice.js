import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isVisible: false,
};

const searchDrawerSlice = createSlice({
    name: "searchDrawer",
    initialState,
    reducers: {
        toggleVisible: function (state, action) {
            state.isVisible = !state.isVisible;
        },
    },
});

export const { toggleVisible } = searchDrawerSlice.actions;

export default searchDrawerSlice.reducer;
