import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    createPost: {
        isOpen: false,
    },
    editProfile: {
        isOpen: false,
    },
    sentFriendRequests: {
        isOpen: false,
    },
    deleteMessage: {
        isOpen: false,
    },
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openCreateModal: function (state) {
            state.createPost.isOpen = true;
        },
        closeCreateModal: function (state) {
            state.createPost.isOpen = false;
        },
        openEditProfileModal: function (state) {
            state.editProfile.isOpen = true;
        },
        closeEditProfileModal: function (state) {
            state.editProfile.isOpen = false;
        },
        openSentFriendRequests: function (state) {
            state.sentFriendRequests.isOpen = true;
        },
        closeSentFriendRequests: function (state) {
            state.sentFriendRequests.isOpen = false;
        },
        openDeleteMessageModal: function (state) {
            state.deleteMessage.isOpen = true;
        },
        closeDeleteMessageModal: function (state) {
            state.deleteMessage.isOpen = false;
        },
    },
});

export const {
    openCreateModal,
    closeCreateModal,
    openEditProfileModal,
    closeEditProfileModal,
    openSentFriendRequests,
    closeSentFriendRequests,
    openDeleteMessageModal,
    closeDeleteMessageModal,
} = modalSlice.actions;

export default modalSlice.reducer;
