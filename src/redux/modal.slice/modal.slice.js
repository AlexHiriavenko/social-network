import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createPost: {
    isOpen: false,
  },
  editProfile: {
    isOpen: false,
  },
  commentPost: {
    isOpen: false,
    openedPostId: null,
  },
  sentFriendRequests: {
    isOpen: false,
  },
  deleteMessage: {
    isOpen: false,
  },
  editMessage: {
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
    openCreateCommentModal: function (state, action) {
      state.commentPost.isOpen = true;
      state.commentPost.post = action.payload;
    },
    closeCreateCommentModal: function (state) {
      state.commentPost.isOpen = false;
      state.commentPost.post = null;
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
    openEditMessageModal: function (state) {
      state.editMessage.isOpen = true;
    },
    closeEditMessageModal: function (state) {
      state.editMessage.isOpen = false;
    },
  },
});

export const {
  openCreateModal,
  closeCreateModal,
  openEditProfileModal,
  closeEditProfileModal,
  openCreateCommentModal,
  closeCreateCommentModal,
  openSentFriendRequests,
  closeSentFriendRequests,
  openDeleteMessageModal,
  closeDeleteMessageModal,
  openEditMessageModal,
  closeEditMessageModal,
} = modalSlice.actions;

export default modalSlice.reducer;
