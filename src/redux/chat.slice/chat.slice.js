import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../instance.js";

export const getChats = createAsyncThunk("chat/getChats", async function () {
    const chats = await instance.get("/chats").then((response) => response.json());
    console.log(chats);
    return chats;
});

////////////////////
export const getChatsParticipants = createAsyncThunk("chat/getParticipants", async function () {
    const { data } = await instance.get(`chats/participants`);
    console.log(data);
    return data;
});
////////////////////
export const getChat = createAsyncThunk("chat/getChat", async function (id) {
    const { data } = await instance.get(`/chats/${id}`);
    console.log(data);
    return data;
});

export const sendMessage = createAsyncThunk(
    "chat/sendMessage",
    async function ({ sender, chat, content }) {
        let message = {
            id: 0,
            content: content,
            sender: sender,
            chat: chat,
        };
        const { status } = await instance.post(`/messages`, message);
        console.log(status);
    }
);

export const addNewUser = createAsyncThunk("chat/addNewUser", async function ({ chatId, newUser }) {
    const { status } = await instance.put(`/messages/${chatId}/participants`, newUser);
    console.log(status);
});
const initialState = {
    isOpened: false,
    chatsParticipants: [],
    currentChat: {},
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
    extraReducers: (builder) => {
        builder.addCase(getChatsParticipants.fulfilled, (state, action) => {
            state.chatsParticipants = action.payload;
        });
        builder.addCase(getChat.fulfilled, (state, action) => {
            // Обработка успешного выполнения getChat
            state.currentChat = action.payload; // Например, сохранение данных чата
        });
    },
});

const chatPageSlice = createSlice({
    name: "chatPage",
    initialState,
    reducers: {
        openPageChat: function (state, action) {
            state.isOpened = true;
        },
        closePageChat: function (state, action) {
            state.isOpened = false;
        },
    },
});

export const { openChat, closeChat } = chatSlice.actions;
export const { openPageChat, closePageChat } = chatPageSlice.actions;

export default chatSlice.reducer;
export const chatPageReducer = chatPageSlice.reducer;
