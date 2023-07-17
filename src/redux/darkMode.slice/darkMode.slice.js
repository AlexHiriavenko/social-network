import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOn: false,
};

const darkModeSlice = createSlice({
    name: "darkMode",
    initialState,
    reducers: {
        toggleMode: function (state, action) {
            state.isOn = !state.isOn;
        },
    },
});

export const { toggleMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
