import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../instance.js";
import axios from "axios";

export const sendMessage = createAsyncThunk(
    "chat/sendMessage",
    async function ({ files }) {
        let accessToken = JSON.parse(localStorage.getItem("token"));
        await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/messages`,
            files,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    AUTHORIZATION: `Bearer ${accessToken}`,
                },
            }
        );
    }
);

export const editMessage = createAsyncThunk(
    "chat/editMessage",
    async function (message) {
        const { status } = await instance.put(`/messages`, message);
        return status;
    }
);

export const deleteMessage = createAsyncThunk(
    "chat/deleteMessage",
    async function (id) {
        const { status } = await instance.delete(`/messages/${id}`);
        return status;
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
