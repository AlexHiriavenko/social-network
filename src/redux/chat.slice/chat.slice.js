import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../instance.js";

export const getChats = createAsyncThunk(
    'chat/getChats',
    async function() {
      const chats   =  await instance.get('/chats').then(response=>response.json());
      console.log(chats)
      return chats;
    }
)
export const getChat = createAsyncThunk(
    'chat/getChat',
    async function(id) {
      const {data}    =  await instance.get(`/chats/${id}`);
      console.log(data)
      return data;
    }
)
export const getUserChats = createAsyncThunk(
    'chat/getUserChats',
    async function(id) {
        const chats   =  await instance.get(`/users/${id}/chats`);
        console.log(chats)
        return chats;
    }
)
export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async function({sender,chat,content}) {
      let message ={
          id:0,
          content:content,
          sender:sender,
          chat:chat

      }
      const {status}    =  await instance.post(`/messages`,message);
      console.log(status)

    }
)
export const addNewUser = createAsyncThunk(
    'chat/addNewUser',
    async function({chatId,newUser}) {

        const {status}    =  await instance.put(`/messages/${chatId}/participants`,newUser);
        console.log(status)
    }
)
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

export const { openChat, closeChat } = chatSlice.actions;

export default chatSlice.reducer;
