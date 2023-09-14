import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    notifications: [],
};

const notifications = createSlice({
    name: "notifications",
    initialState,
    reducers: {
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


export const {  addNotifications, deleteAllNotifications, deleteNotification } = notifications.actions;

export default notifications.reducer;
