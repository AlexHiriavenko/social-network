import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../instance";

export const getNotifications = createAsyncThunk(
  "Notifications/getNotifications",
  async function () {
    const { data } = await instance.get(`/notifications/user`);
    console.log(data);
    return data;
  }
);

export const getPagebleNotifications = createAsyncThunk(
  "Notifications/getNotifications",
  async function ({ page, size }) {
    const { data } = await instance.get(`/notifications/user/${page}/${size}`);
    console.log(data);
    return data;
  }
);


const initialState = {
  isConnectedSocket: false,
  newMessages: [],
  newNotifications: [],
  allNotifications: [],
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
    deleteNewMessages: function (state) {
      state.newMessages = [];
    },
    addNewNotifications: function (state, action) {
      state.newNotifications.push(action.payload);
    },
    deleteAllNewNotifications: function (state) {
      state.newNotifications = [];
    },
    deleteNewNotification: function (state, action) {
      state.newNotifications = state.newNotifications.filter(el => el.id !== action.payload);
    },
    setAllNotifications: function (state, action) {
      state.allNotifications = action.payload;
    },
    addToAllNotifications: function (state, action) {
      state.allNotifications.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getPagebleNotifications.fulfilled, (state, action) => {
      state.allNotifications = [...state.allNotifications, ...action.payload];
    });
  },
})


export const { addNewMessages, deleteNewMessages, addNewNotifications, deleteAllNewNotifications, deleteNewNotification, setIsConnected, setAllNotifications, addToAllNotifications } = notifications.actions;

export default notifications.reducer;
