import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../instance";

export const getNotifications = createAsyncThunk(
  "Notifications/getNotifications",
  async function () {
    const { data } = await instance.get(`/notifications/user`);
    return data;
  }
);

export const getPagebleNotifications = createAsyncThunk(
  "Notifications/getNotifications",
  async function ({ page, size, status }) {
    const { data } = await instance.get(`/notifications/user/${page}/${size}?status=${status}`);
    return data;
  }
);

export const getNotificationsSize = createAsyncThunk(
  "Notifications/getNotificationsSize",
  async function () {
    const { data } = await instance.get(`/notifications/user/size`);
    return data;
  }
);

export const setViewNotification = createAsyncThunk(
  "Notifications/viewNotificationsSize",
  async function ({ notificationId }) {
    await instance.put(`/notifications/${notificationId}`);
    const { data } = await instance.get(`/notifications/user/size`);

    return { data, notificationId };
  }
);


const initialState = {
  isConnectedSocket: false,
  newMessages: [],
  newNotifications: [],
  allNotifications: [],
  unreadedNotificationsSize: 0,
  isLoading: false,
};

const notifications = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotificationInitialState(state){
      state.isConnectedSocket = false
          state.newMessages = []
          state.newNotifications = []
          state.allNotifications =[]
          state.unreadedNotificationsSize = 0
          state.isLoading = false
    },
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
      state.allNotifications.unshift(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getPagebleNotifications.fulfilled, (state, action) => {
      state.allNotifications = [...state.allNotifications, ...action.payload];
      state.isLoading = false;
    });
    builder.addCase(getNotificationsSize.fulfilled, (state, action) => {
      state.unreadedNotificationsSize = action.payload;
    });
    builder.addCase(getPagebleNotifications.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(setViewNotification.fulfilled, (state, action) => {
      state.allNotifications = state.allNotifications.map(el => {
        if (action.payload.notificationId === el.id) {
          el.status = "viewed";
        }
        return el;
      })
      state.unreadedNotificationsSize = action.payload.data;
    })
  },
})


export const { addNewMessages, deleteNewMessages, addNewNotifications, deleteAllNewNotifications, deleteNewNotification, setIsConnected, setAllNotifications, addToAllNotifications, setUnreadedNotificationsSize,setNotificationInitialState } = notifications.actions;

export default notifications.reducer;
