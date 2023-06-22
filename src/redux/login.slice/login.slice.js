import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logIn: function (state, action) {
      state.isLoggedIn = true;
    },
    logOut: function (state, action) {
      state.isLoggedIn = false;
    },
  },
});

export const {logIn, logOut} = loginSlice.actions;

export default loginSlice.reducer;