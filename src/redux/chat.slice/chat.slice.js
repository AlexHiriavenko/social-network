import { createSlice } from "@reduxjs/toolkit";
import {
    getChats,
    getChat,
    getChatsParticipants,
    createChat,
    addToChatNewUser,
    deleteChat,
} from "./chatActions.js";
import { initialState, temporaryPartisipantState } from "./chatInitialStates.js";

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
            state.chatsParticipants = [action.payload, ...state.chatsParticipants];
        },
        resetCurrentChat: function (state, action) {
            state.currentChat = initialState.currentChat;
            state.isOpened = false;
        },
        resetСhatsParticipants: function (state, action) {
            state.chatsParticipants = initialState.chatsParticipants;
        },
        setTemporaryParticipant: function (state, action) {
            state.chatsParticipants = [temporaryPartisipantState, ...state.chatsParticipants];
        },
        deleteTemporaryParticipant: function (state) {
            const targetIndex = state.chatsParticipants.findIndex((el) => el.id === null);
            if (targetIndex !== -1) {
                state.chatsParticipants.splice(targetIndex, 1);
            }
        },
        addMessageToChat: function (state, action) {
            state.chatsParticipants = state.chatsParticipants.map(el => {if (el.id === action.payload.chatId) {
                    el.content = action.payload.content;
                    el.fullName = action.payload.sender.fullName;
                    el.userId = action.payload.sender.fullName;
                    if (state.currentChat.id !== action.payload.chatId) {
                        el.messageCount = el.messageCount == undefined ? 1 : el.messageCount + 1;
                        // el.messageCount = (el.messageCount || 0) + 1;
                    }
                }
                return el;
            });

            if (state.currentChat.id === action.payload.chatId) {
                const index = state.currentChat.messages.findLastIndex(
                    (el) => el.id === action.payload.id
                );
                if (index !== -1) {
                    state.currentChat.messages[index].content = action.payload.content;
                } else {
                    state.currentChat.messages.push(action.payload);
                }
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
            state.currentChat = action.payload;
        });
        builder.addCase(createChat.fulfilled, (state, action) => {
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
    resetСhatsParticipants,
    setTemporaryParticipant,
    deleteTemporaryParticipant,
    setChatsList,
    addMessageToChat,
} = chatSlice.actions;

export const { openPageChat, closePageChat, setChatInitialState } = chatPageSlice.actions;

export { getChats, getChat, getChatsParticipants, createChat, addToChatNewUser, deleteChat };

export default chatSlice.reducer;
export const chatPageReducer = chatPageSlice.reducer;
