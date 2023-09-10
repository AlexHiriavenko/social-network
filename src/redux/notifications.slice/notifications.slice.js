import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isConnectedSocket: false,
    newMessages: [],
    notifications: [],
};

const notifications = createSlice({
    name: "notifications",
    initialState,
    reducers: {
      setIsConnected: function (state, action) {
        state.isConnectedSocket = action.payload;
      },
      addNewMessages: function (state, action) {
        state.newMessages.push(action.payload);
      },
      deleteNewMessages: function(state) {
        state.newMessages = [];
      },
      addNotifications: function (state, action) {
        state.notifications.push(action.payload);
      },
      deleteAllNotifications: function(state) {
        state.notifications = [];
      },
      deleteNotification: function(state, action) {
        state.notifications = state.notifications.filter(el => el.id !== action.payload);
      },
    },
})


export const { addNewMessages, deleteNewMessages, addNotifications, deleteAllNotifications, deleteNotification, setIsConnected } = notifications.actions;

export default notifications.reducer;
