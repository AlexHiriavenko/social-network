import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../instance.js";

export const sendMessage = createAsyncThunk(
    "chat/sendMessage",
    async function (newMessage) {
        const { status } = await instance.post(`/messages`, newMessage);
        console.log(status);
    }
);

export const editMessage = createAsyncThunk(
    "chat/editMessage",
    async function (message) {
        const { status } = await instance.put(`/messages`, message);
        console.log(status);
    }
);

export const deleteMessage = createAsyncThunk(
    "chat/deleteMessage",
    async function (id) {
        console.log(id);
        const { status } = await instance.delete(`/messages/${id}`);
        console.log(status);
    }
);

const initialState = {
    newMessage: {
        id: 0,
        content: "",
        chatId: 0,
    },
    currentMessageId: 0,
    currentMessageContent: "",
};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setNewMessage: function (state, action) {
            state.newMessage = action.payload;
        },
        setMessageId: function (state, action) {
            state.currentMessageId = action.payload;
        },
        setMessageContent: function (state, action) {
            state.currentMessageContent = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            state.newMessage = initialState.newMessage;
        });
        builder.addCase(deleteMessage.fulfilled, (state, action) => {
            state.currentMessageId = initialState.currentMessageId;
        });
    },
});

export const { setNewMessage, setMessageId, setMessageContent } =
    messageSlice.actions;

export default messageSlice.reducer;
