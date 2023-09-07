import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newMessages: [],
    notifications: [],
};

const notifications = createSlice({
    name: "notifications",
    initialState,
    reducers: {
      addNewMessages: function (state, action) {
        state.newMessages.push(action.payload);
      },
      deleteNewMessages: function(state) {
        state.newMessages = [];
      },
      addNotifications: function (state, action) {
        state.notifications = action.payload;
      },
      deleteNotifications: function(state) {
        state.notifications = [];
      },
    },
})


export const { addNewMessages, deleteNewMessages, addNotifications, deleteNotifications, setIsConnected, setIsStomp } = notifications.actions;

export default notifications.reducer;
