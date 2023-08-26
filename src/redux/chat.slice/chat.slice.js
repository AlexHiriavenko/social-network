import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../instance.js";

export const getChats = createAsyncThunk("chat/getChats", async function () {
    const chats = await instance.get("/chats");
    console.log(chats);
    return chats;
});

////////////////////
export const getChatsParticipants = createAsyncThunk("chat/getParticipants", async function () {
    const { data } = await instance.get(`chats/participants`);
    return data;
});
////////////////////
export const getChat = createAsyncThunk("chat/getChat", async function (id) {
    if (id) {
        const { data } = await instance.get(`/chats/${id}`);
        return data;
    }
});

export const addNewUser = createAsyncThunk("chat/addNewUser", async function ({ chatId, newUser }) {
    const { status } = await instance.put(`/chats/${chatId}/participants`, newUser);
    console.log(status);
});
export const initialState = {
    isOpened: false,
    chatsParticipants: [],
    currentChatCompanion: {},
    currentChat: {
        id: null,
        messages: [
            {
                createdBy: "",
                createdDate: "",
                updatedBy: "",
                updatedDate: "",
                id: null,
                content: "",
                chatId: null,
            },
        ],
        users: [],
    },
};

const temporaryPartisipantState = {
    id: null,
    userId: null,
    fullName: "New Chat",
    content: "",
    lastMessageDate: "",
    profilePicture:
        "https://www.facebook.com/images/mercury/clients/messenger/threadlist/NewMessage.png",
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
            state.isOpened = false;
        },
        setTemporaryParticipant: function (state, action) {
            const temporaryParticipant = temporaryPartisipantState;
            state.chatsParticipants.unshift(temporaryParticipant);
            state.currentChatCompanion = {
                fullName: "newPartcipant",
                profilePicture: temporaryPartisipantState.profilePicture,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getChatsParticipants.fulfilled, (state, action) => {
            if (typeof action.payload === "object") {
                state.chatsParticipants = action.payload;
            } else {
                state.chatsParticipants = [];
            }
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
    setTemporaryParticipant,
} = chatSlice.actions;

export const { openPageChat, closePageChat } = chatPageSlice.actions;

export default chatSlice.reducer;
export const chatPageReducer = chatPageSlice.reducer;
