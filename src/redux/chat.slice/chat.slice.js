import { createSlice } from "@reduxjs/toolkit";
import {
    getChats,
    getChat,
    getChatsParticipants,
    createChat,
    addToChatNewUser,
    deleteChat,
    getUnread,
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
        resetСhatsParticipants: function (state, action) {
            state.chatsParticipants = initialState.chatsParticipants;
        },
        setChatsParticipants: function (state, action) {
            state.chatsParticipants = action.payload;
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
        setLoading: function (state, action) {
            state.isLoading = action.payload;
        },
        addMessageToChat: function (state, action) {
            const parsedPayload = JSON.parse(action.payload);
            
            state.chatsParticipants = state.chatsParticipants.map(el => {
                if (el.id === parsedPayload.message.chatId) {
                    if(parsedPayload.status === 'edited' && el.messageId === parsedPayload.message.id) {
                        el.content = parsedPayload.message.content;
                    } else if (parsedPayload.status === 'new') {
                        el.content = parsedPayload.message.content;
                        el.fullName = parsedPayload.message.sender.fullName;
                        el.userId = parsedPayload.message.sender.id;
                    } else if (parsedPayload.status === 'deleted' && el.messageId === parsedPayload.message.id) {
                        el.content = '';
                    }
                    if (state.currentChat.id !== parsedPayload.message.chatId && parsedPayload.status === 'deleted') {
                        el.messageCount =
                            el.messageCount == undefined
                                ? 0
                                : el.messageCount - 1;
                    } else if (state.currentChat.id !== parsedPayload.message.chatId){
                        el.messageCount =
                        el.messageCount == undefined
                            ? 1
                            : el.messageCount + 1;
                    }
                }
                return el;
            });

            if (state.currentChat.id === parsedPayload.message.chatId) {
                if (parsedPayload.status === 'new') {
                    state.currentChat.messages.push(parsedPayload.message);
                } else {
                    const index = state.currentChat.messages.findLastIndex(
                        (el) => el.id === parsedPayload.message.id
                    );
                    if(parsedPayload.status === 'edited' && index >=0) {
                        state.currentChat.messages[index].content =
                        parsedPayload.message.content;
                    }else if (parsedPayload.status === 'deleted' && index >=0) {
                        state.currentChat.messages.splice(index);
                    }
                }  

            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getChatsParticipants.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getChatsParticipants.fulfilled, (state, action) => {
            if (typeof action.payload === "object") {
                state.chatsParticipants = action.payload;
            } else {
                state.chatsParticipants = [];
            }
            state.isLoading = false;
        });
        builder.addCase(getChat.pending, (state, action) => {
            state.isLoadingChat = true;
        });
        builder.addCase(getChat.fulfilled, (state, action) => {
            state.isLoadingChat = false;
            state.currentChat = action.payload;
        });
        builder.addCase(createChat.fulfilled, (state, action) => {
            state.currentChat = action.payload;
        });
        builder.addCase(getUnread.fulfilled, (state, action) => {
            state.unread = action.payload ? "new" : 0;
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
    setChatsParticipants,
    setTemporaryParticipant,
    deleteTemporaryParticipant,
    setChatsList,
    setUnread,
    addMessageToChat,
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
