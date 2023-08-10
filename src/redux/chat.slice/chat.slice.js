import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../instance.js";

export const getChats = createAsyncThunk("chat/getChats", async function () {
    const chats = await instance
        .get("/chats")
        .then((response) => response.json());
    console.log(chats);
    return chats;
});

////////////////////
export const getChatsParticipants = createAsyncThunk(
    "chat/getParticipants",
    async function () {
        const { data } = await instance.get(`chats/participants`);
        return data;
    }
);
////////////////////
export const getChat = createAsyncThunk("chat/getChat", async function (id) {
    const { data } = await instance.get(`/chats/${id}`);
    return data;
});

export const addNewUser = createAsyncThunk(
    "chat/addNewUser",
    async function ({ chatId, newUser }) {
        const { status } = await instance.put(
            `/messages/${chatId}/participants`,
            newUser
        );
        console.log(status);
    }
);
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
        setCurrentChatCompanion: function (state, action) {
            state.currentChatCompanion = action.payload;
        },
        resetCurrentChat: function (state, action) {
            state.currentChat = initialState.currentChat;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getChatsParticipants.fulfilled, (state, action) => {
            state.chatsParticipants = action.payload;
        });
        builder.addCase(getChat.fulfilled, (state, action) => {
            state.currentChat = action.payload;
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

export const {
    openChat,
    closeChat,
    setCurrentChatCompanion,
    resetCurrentChat,
} = chatSlice.actions;

export const { openPageChat, closePageChat } = chatPageSlice.actions;

export default chatSlice.reducer;
export const chatPageReducer = chatPageSlice.reducer;
