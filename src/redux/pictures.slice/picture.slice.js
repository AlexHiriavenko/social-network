import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  pictures: {},
};

const picturesSlice = createSlice({
  name: "pictures",
  initialState,
  reducers: {
    showPictures: function (state) {
      state.isOpen = true;
    },
    closePictures: function (state) {
      state.isOpen = false;
      state.pictures = [];
    },
    setPictures: function (state, action) {
      state.pictures = action.payload;
    },
  },
});

export const { showPictures, closePictures, setPictures } = picturesSlice.actions;

export default picturesSlice.reducer;
