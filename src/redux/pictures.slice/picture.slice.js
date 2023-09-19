import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  showComments:false,
  pictures: {},
};

const picturesSlice = createSlice({
  name: "pictures",
  initialState,
  reducers: {
    showPictures: function (state,action) {
      state.isOpen = true;
      state.showComments = action.payload;
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
