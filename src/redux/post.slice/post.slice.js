import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCreated: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    createPost: function (state, action) {
      state.isCreated = true;
    },
    deletePost: function (state, action) {
      state.isCreated = false;
    },
  },
});

export const {createPost, deletePost} = postSlice.actions;

export default postSlice.reducer;