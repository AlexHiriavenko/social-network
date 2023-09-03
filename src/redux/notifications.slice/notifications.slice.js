import { createSlice } from "@reduxjs/toolkit";
/* import { createAsyncThunk } from "@reduxjs/toolkit"; */

/* export const messageSubscribe = createAsyncThunk(
    'notifications/messageSubscribe',
    async function(payload) {

    }
  ); */

const initialState = {
    newMessages: [],
    notifications: [],
    isConnected: false,
    stomp: null,
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
      setIsConnected: function(state, action) {
        state.isConnected = action.payload;
      },
      setIsStomp: function(state, action) {
        state.isConnected = action.payload;
      },
    },
})


export const { addNewMessages, deleteNewMessages, addNotifications, deleteNotifications, setIsConnected, setIsStomp } = notifications.actions;

export default notifications.reducer;
