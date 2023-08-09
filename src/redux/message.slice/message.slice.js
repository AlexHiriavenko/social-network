import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../instance.js";

export const sendMessage = createAsyncThunk(
    "chat/sendMessage",
    async function (newMessage) {
        const { status } = await instance.post(`/messages`, newMessage);
        console.log(status);
    }
);

const initialState = {
    newMessage: {
        id: 0,
        content: "",
        sender: {
            createdBy: "uknown author",
            createdDate: new Date().toLocaleString(),
            updatedBy: "uknown author",
            updatedDate: new Date().toLocaleString(),
            id: null,
        },
        chat: {
            createdBy: "uknown user",
            createdDate: "2023-08-09T08:48:11.046Z",
            updatedBy: "string",
            updatedDate: "2023-08-09T08:48:11.046Z",
            id: 0,
            messages: [{}],
            users: [{}],
        },
    },
};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setNewMessage: function (state, action) {
            state.newMessage = action.payload;
        },
    },
    extraReducers: (builder) => {},
});

export const { setNewMessage } = messageSlice.actions;

export default messageSlice.reducer;
