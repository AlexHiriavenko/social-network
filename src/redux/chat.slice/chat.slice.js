import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../instance.js";

export const getChats = createAsyncThunk("chat/getChats", async function () {
    const chats = await instance.get("/chats");
    console.log(chats);
    return chats;
});

////////////////////
export const getChatsParticipants = createAsyncThunk(
    "chat/getParticipants",
    async function () {
        const { data } = await instance.get(`chats/participants`);
        console.log(data);
        return data;
    }
);
////////////////////
export const getChat = createAsyncThunk("chat/getChat", async function (id) {
    if (id) {
        const { data } = await instance.get(`/chats/${id}`);
        return data;
    }
});

export const addToChatNewUser = createAsyncThunk(
    "chat/addNewUser",
    async function ({ chatId, userId }) {
        const { status } = await instance.put(
            `/chats/${chatId}/participants/${userId}`
        );
        return status;
    }
);

export const createChat = createAsyncThunk(
    "chat/createChat",
    async function (id) {
        if (id) {
            const { data } = await instance.get(`/chats/search/${id}`);
            return data;
        }
    }
);

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
                // const uniqueIdMap = new Map();
                // const idCountMap = {};

                // action.payload.forEach((item) => {
                //     if (!uniqueIdMap.has(item.id)) {
                //         uniqueIdMap.set(item.id, item);
                //         idCountMap[item.id] = 0;
                //     } else {
                //         idCountMap[item.id] += 1;
                //     }
                // });

                // uniqueIdMap.forEach((item) => {
                //     // количество пользователей кроме авторизированного юзера и 1го участника чата
                //     // чтобы показать в групповом чате например "Alex Smith and 2 more"
                //     item.quantityUsers = idCountMap[item.id];
                // });

                // state.chatsParticipants = Array.from(uniqueIdMap.values());
                state.chatsParticipants = action.payload;
                console.log(state.chatsParticipants);
            } else {
                state.chatsParticipants = [];
            }
        });
        builder.addCase(getChat.fulfilled, (state, action) => {
            state.currentChat = action.payload;
        });
        builder.addCase(createChat.fulfilled, (state, action) => {
            console.log(action.payload);
            // console.log(action.payload[0]);
            // state.currentChat = action.payload[0];
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
} = chatSlice.actions;

export const { openPageChat, closePageChat } = chatPageSlice.actions;

export default chatSlice.reducer;
export const chatPageReducer = chatPageSlice.reducer;
