import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true" ? true : false,
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logIn: function (state, action) {
            state.isLoggedIn = true;
            localStorage.setItem("isLoggedIn", true);
        },
        logOut: function (state, action) {
            state.isLoggedIn = false;
            localStorage.setItem("isLoggedIn", false);
        },
    },
});

export const { logIn, logOut } = loginSlice.actions;

export default loginSlice.reducer;
