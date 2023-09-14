import { createSlice } from "@reduxjs/toolkit";
import {
    getChats,
    getChat,
    getChatsParticipants,
    createChat,
    addToChatNewUser,
    deleteChat,
} from "./chatActions.js";
import {
    initialState,
    temporaryPartisipantState,
} from "./chatInitialStates.js";

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChatInitialState: function (state) {
            state.chatsParticipants = [];
            state.currentChatCompanion = null;
            state.currentChat = null;
        },
        openChat: function (state, action) {
            state.isOpened = true;
        },
        closeChat: function (state, action) {
            state.isOpened = false;
        },
        setCurrentChatCompanion: function (state, action) {
            state.currentChatCompanion = action.payload;
        },
        setChatsList: function (state, action) {
            state.chatsParticipants = [
                action.payload,
                ...state.chatsParticipants,
            ];
        },
        resetCurrentChat: function (state, action) {
            state.currentChat = initialState.currentChat;
            state.isOpened = false;
        },
        setTemporaryParticipant: function (state, action) {
            state.chatsParticipants = [
                temporaryPartisipantState,
                ...state.chatsParticipants,
            ];
        },
        deleteTemporaryParticipant: function (state) {
            const targetIndex = state.chatsParticipants.findIndex(
                (el) => el.id === null
            );
            if (targetIndex !== -1) {
                state.chatsParticipants.splice(targetIndex, 1);
            }
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
            console.log(action.payload);
            state.currentChat = action.payload;
        });
        builder.addCase(createChat.fulfilled, (state, action) => {
            state.currentChat = action.payload;
        });
        builder.addCase(addToChatNewUser.fulfilled, (state, action) => {});
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
    deleteTemporaryParticipant,
    setChatsList,
} = chatSlice.actions;

export const { openPageChat, closePageChat, setChatInitialState } =
    chatPageSlice.actions;

export {
    getChats,
    getChat,
    getChatsParticipants,
    createChat,
    addToChatNewUser,
    deleteChat,
};

export default chatSlice.reducer;
export const chatPageReducer = chatPageSlice.reducer;
