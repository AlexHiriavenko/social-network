import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOn: localStorage.getItem("darkMode") === "true" ? true : false,
};

const darkModeSlice = createSlice({
    name: "darkMode",
    initialState,
    reducers: {
        toggleMode: function (state, action) {
            state.isOn = !state.isOn;
            // При изменении состояния записываем его в localStorage
            localStorage.setItem("darkMode", state.isOn);
        },
    },
});

export const { toggleMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
