import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../instance.js";

export const getChats = createAsyncThunk("chat/getChats", async function () {
    const chats = await instance.get("/chats");
    return chats;
});

export const getChatsParticipants = createAsyncThunk(
    "chat/getParticipants",
    async function () {
        const { data } = await instance.get(`chats/participants`);
        return data;
    }
);

export const getChat = createAsyncThunk("chat/getChat", async function (id) {
    if (id) {
        const { data } = await instance.get(`/chats/${id}`);
        return data;
    } else {
        console.log("id is not valid");
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
        } else {
            console.log("id is not valid");
        }
    }
);

export const deleteChat = createAsyncThunk(
    "chat/deleteChat",
    async function (id) {
        if (id) {
            const { status } = await instance.delete(`/chats/${id}`);
            return status;
        } else {
            console.log("id is not valid");
        }
    }
);

export const getUnread = createAsyncThunk("chat/unread", async function () {
    const { data } = await instance.get(`chats/unreadExist`);
    return data;
});
