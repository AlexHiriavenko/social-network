import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    lightMode: function (state, action) {
      state.mode = "light";
    },
    darkMode: function (state, action) {
      state.mode = "dark";
    },
  },
});

export const { lightMode, darkMode } = themeSlice.actions;

export default themeSlice.reducer;
