import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpened: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    openChat: function (state, action) {
      state.isOpened = true;
    },
    closeChat: function (state, action) {
      state.isOpened = false;
    },
  },
});

export const {openChat, closeChat} = chatSlice.actions;

export default chatSlice.reducer;